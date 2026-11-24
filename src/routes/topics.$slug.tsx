import { useEffect, useMemo, useRef, useState } from "react";
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
import { TopicSkeleton } from "@/components/LoadingSkeletons";

export const Route = createFileRoute("/topics/$slug")({
  pendingComponent: TopicSkeleton,
  loader: ({ params }) => {
    const topic = getTopic(params.slug);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.topic;
    const title = t ? `${t.name} — DSA Studio` : "Topic — DSA Studio";
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
  const { topic } = Route.useLoaderData() as { topic: import("@/data/problems").Topic };
  const progress = useProgress();
  const { query, setQuery } = useGlobalSearch();

  const [difficulty, setDifficulty] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [platform, setPlatform] = useState<string>("all");

  const allLevels = topic.levels ?? topic.parts?.flatMap((p) => p.levels) ?? [];

  const [openLevelId, setOpenLevelId] = useState<string | null>(() => {
    const first = allLevels[0];
    return first ? `${first.number}-${first.title}` : null;
  });

  // Reset to first level when navigating between topics
  useEffect(() => {
    const first = allLevels[0];
    setOpenLevelId(first ? `${first.number}-${first.title}` : null);
  }, [topic.slug]);

  const allIds = new Set<string>();
  allLevels.forEach((lvl) => lvl.problems.forEach((lp) => allIds.add(lp.id)));
  const total = allIds.size;
  const solved = Array.from(allIds).filter((id) => progress[id]?.completed).length;
  const pct = total ? Math.round((solved / total) * 100) : 0;

  const filtersActive =
    query.trim() !== "" || difficulty !== "all" || status !== "all" || platform !== "all";

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

  const filterKey = `${query}|${difficulty}|${status}|${platform}`;
  const prevFilterKeyRef = useRef(filterKey);

  // When filters or search criteria change, automatically open the first matching level.
  // When results change and invalidate a previously selected level, select the first match.
  // If the user explicitly closes the level (openLevelId === null), keep it closed!
  useEffect(() => {
    const filterChanged = prevFilterKeyRef.current !== filterKey;
    prevFilterKeyRef.current = filterKey;

    if (filtersActive && filteredLevels.length > 0) {
      const isCurrentInFiltered =
        openLevelId !== null &&
        filteredLevels.some((lvl) => `${lvl.number}-${lvl.title}` === openLevelId);

      if (filterChanged) {
        if (!isCurrentInFiltered) {
          setOpenLevelId(`${filteredLevels[0].number}-${filteredLevels[0].title}`);
        }
      } else if (openLevelId !== null && !isCurrentInFiltered) {
        setOpenLevelId(`${filteredLevels[0].number}-${filteredLevels[0].title}`);
      }
    }
  }, [filtersActive, filteredLevels, openLevelId, filterKey]);

  const clear = () => {
    setDifficulty("all");
    setStatus("all");
    setPlatform("all");
    setQuery("");
  };

  return (
    <AppShell title={topic.name}>
      <div className="mb-[clamp(0.75rem,2vh,1.5rem)] rounded-xl border border-border/60 bg-card px-4 sm:px-5 py-[clamp(0.75rem,2vh,1.35rem)] shadow-sm backdrop-blur-md card-glass-line hover-lift-glow">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground break-words">
          {topic.name}
        </h2>
        <p className="mt-1 max-w-2xl text-xs sm:text-sm text-muted-foreground">
          {topic.description}
        </p>
        <div className="mt-[clamp(0.5rem,1.4vh,1rem)] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <ProgressBar value={pct} className="w-full sm:max-w-md" />
          <div className="text-xs font-medium text-muted-foreground shrink-0">
            {solved} / {total} completed •{" "}
            <span className="text-primary font-semibold">{pct}%</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-[clamp(0.5rem,1.5vh,1rem)] flex flex-wrap items-center gap-2">
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
            { v: "CSES", l: "CSES" },
            { v: "AtCoder", l: "AtCoder" },
          ]}
        />
        <FilterSelect
          value={status}
          onChange={setStatus}
          placeholder="Status"
          options={[
            { v: "all", l: "All status" },
            { v: "solved", l: "Solved" },
            { v: "unsolved", l: "Unsolved" },
            { v: "revision", l: "Needs Revision" },
            { v: "bookmarked", l: "Bookmarked" },
          ]}
        />
        {filtersActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clear}
            className="h-9 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
          >
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
        <div className="space-y-[clamp(0.5rem,1.4vh,0.875rem)]">
          {filteredLevels.map((lvl) => {
            const levelId = `${lvl.number}-${lvl.title}`;
            return (
              <LevelAccordion
                key={`${topic.slug}-${levelId}`}
                level={lvl}
                isOpen={openLevelId === levelId}
                onToggle={() => setOpenLevelId((prev) => (prev === levelId ? null : levelId))}
              />
            );
          })}
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
      <SelectTrigger className="h-9 w-[calc(50%-0.25rem)] sm:w-[150px] md:w-[160px] border-border/70 bg-surface shadow-xs backdrop-blur-md text-xs sm:text-sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[min(15rem,var(--radix-select-content-available-height))] max-w-[calc(100vw-2rem)]">
        {options.map((o) => (
          <SelectItem key={o.v} value={o.v}>
            {o.l}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
