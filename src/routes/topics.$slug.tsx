import { useMemo, useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { LevelAccordion } from "@/components/LevelAccordion";
import { ProgressBar } from "@/components/ProgressBar";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTopic, PROBLEM_MAP } from "@/data/problems";
import { useProgress } from "@/lib/progress-store";
import { useGlobalSearch } from "@/lib/search-context";

export const Route = createFileRoute("/topics/$slug")({
  loader: ({ params }) => {
    const topic = getTopic(params.slug);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.topic;
    const title = t ? `${t.name} — DSA Sheet` : "Topic — DSA Sheet";
    const desc = t?.description ?? "DSA practice topic.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: TopicPage,
});

function TopicPage() {
  const { topic } = Route.useLoaderData();
  const progress = useProgress();
  const { query } = useGlobalSearch();

  const [difficulty, setDifficulty] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [platform, setPlatform] = useState<string>("all");

  const allLevels = topic.levels ?? topic.parts?.flatMap((p) => p.levels) ?? [];

  const allIds = new Set<string>();
  allLevels.forEach((lvl) => lvl.problems.forEach((lp) => allIds.add(lp.id)));
  const total = allIds.size;
  const solved = Array.from(allIds).filter((id) => progress[id]?.completed).length;
  const pct = total ? Math.round((solved / total) * 100) : 0;

  const filtersActive =
    query.trim() !== "" ||
    difficulty !== "all" ||
    status !== "all" ||
    platform !== "all";

  const filteredLevels = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allLevels
      .map((lvl) => {
        const problems = lvl.problems.filter((lp) => {
          const pr = PROBLEM_MAP[lp.id];
          if (!pr) return false;
          if (
            q &&
            !pr.title.toLowerCase().includes(q) &&
            !lvl.title.toLowerCase().includes(q) &&
            !topic.name.toLowerCase().includes(q)
          )
            return false;
          if (difficulty !== "all" && pr.difficulty !== difficulty) return false;
          if (platform !== "all" && pr.platform !== platform) return false;
          const e = progress[pr.id];
          if (status === "solved" && !e?.completed) return false;
          if (status === "unsolved" && e?.completed) return false;
          if (status === "revision" && !e?.needsRevision) return false;
          if (status === "bookmarked" && !e?.bookmarked) return false;
          return true;
        });
        return { ...lvl, problems };
      })
      .filter((lvl) => lvl.problems.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLevels, query, difficulty, status, platform, progress]);

  const clear = () => {
    setDifficulty("all");
    setStatus("all");
    setPlatform("all");
  };

  return (
    <AppShell title={topic.name}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{topic.name}</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          {topic.description}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <ProgressBar value={pct} className="max-w-md" />
          <div className="text-xs font-medium text-muted-foreground">
            {solved} / {total} completed •{" "}
            <span className="text-primary">{pct}%</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <FilterSelect
          value={difficulty}
          onChange={setDifficulty}
          placeholder="Difficulty"
          options={[
            { v: "all", l: "All difficulties" },
            { v: "Easy", l: "Easy" },
            { v: "Medium", l: "Medium" },
            { v: "Hard", l: "Hard" },
          ]}
        />
        <FilterSelect
          value={platform}
          onChange={setPlatform}
          placeholder="Platform"
          options={[
            { v: "all", l: "All platforms" },
            { v: "LeetCode", l: "LeetCode" },
            { v: "GFG", l: "GFG" },
          ]}
        />
        <FilterSelect
          value={status}
          onChange={setStatus}
          placeholder="Status"
          options={[
            { v: "all", l: "All" },
            { v: "solved", l: "Solved" },
            { v: "unsolved", l: "Unsolved" },
            { v: "revision", l: "Needs Revision" },
            { v: "bookmarked", l: "Bookmarked" },
          ]}
        />
        {filtersActive && (
          <Button variant="ghost" size="sm" onClick={clear} className="text-muted-foreground">
            Clear filters
          </Button>
        )}
      </div>

      {filteredLevels.length === 0 ? (
        <EmptyState
          title="No problems match your filters."
          action={
            <Button variant="outline" size="sm" onClick={clear}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {filteredLevels.map((lvl) => (
            <LevelAccordion
              key={`${topic.slug}-${lvl.number}-${lvl.title}`}
              level={lvl}
              defaultOpen={filtersActive || lvl.number === 1}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { v: string; l: string }[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-9 w-[160px] bg-surface text-sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.v} value={o.v}>
            {o.l}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
