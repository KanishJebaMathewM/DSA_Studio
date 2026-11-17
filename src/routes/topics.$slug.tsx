import { useEffect, useMemo, useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Layers,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { LevelAccordion } from "@/components/LevelAccordion";
import { ProgressBar } from "@/components/ProgressBar";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTopic, PROBLEM_MAP } from "@/data/problems";
import { ROADMAP } from "@/data/roadmap";
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
  const { query: globalQuery, setQuery: setGlobalQuery } = useGlobalSearch();

  const [localSearch, setLocalSearch] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [platform, setPlatform] = useState<string>("all");

  const allLevels = useMemo(
    () => topic.levels ?? topic.parts?.flatMap((p) => p.levels) ?? [],
    [topic],
  );

  // Exclusive single-open accordion state: only one level table is open at a time
  const [openLevelKey, setOpenLevelKey] = useState<string | null>(() => {
    return allLevels[0] ? `${allLevels[0].number}-${allLevels[0].title}` : null;
  });

  // Reset to first level on topic change
  useEffect(() => {
    if (allLevels.length > 0) {
      setOpenLevelKey(`${allLevels[0].number}-${allLevels[0].title}`);
    } else {
      setOpenLevelKey(null);
    }
  }, [topic.slug, allLevels]);

  const allIds = useMemo(() => {
    const set = new Set<string>();
    allLevels.forEach((lvl) => lvl.problems.forEach((lp) => set.add(lp.id)));
    return set;
  }, [allLevels]);

  const total = allIds.size;
  const solved = Array.from(allIds).filter((id) => progress[id]?.completed).length;
  const pct = total ? Math.round((solved / total) * 100) : 0;

  const easyCount = Array.from(allIds).filter(
    (id) => PROBLEM_MAP[id]?.difficulty === "Easy",
  ).length;
  const medCount = Array.from(allIds).filter(
    (id) => PROBLEM_MAP[id]?.difficulty === "Medium",
  ).length;
  const hardCount = Array.from(allIds).filter(
    (id) => PROBLEM_MAP[id]?.difficulty === "Hard",
  ).length;

  const roadmapItem = ROADMAP.find((r) => r.slug === topic.slug);
  const currentIndex = ROADMAP.findIndex((r) => r.slug === topic.slug);
  const prevTopic = currentIndex > 0 ? ROADMAP[currentIndex - 1] : null;
  const nextTopic = currentIndex < ROADMAP.length - 1 ? ROADMAP[currentIndex + 1] : null;

  const activeQuery = (localSearch || globalQuery).trim().toLowerCase();

  const filtersActive =
    activeQuery !== "" || difficulty !== "all" || status !== "all" || platform !== "all";

  const filteredLevels = useMemo(() => {
    const q = activeQuery;
    return allLevels
      .map((lvl) => {
        const topicMatch =
          topic.name.toLowerCase().includes(q) ||
          topic.slug.toLowerCase().includes(q) ||
          (roadmapItem && roadmapItem.phase.toLowerCase().includes(q)) ||
          (roadmapItem && roadmapItem.tagline.toLowerCase().includes(q));

        const problems = lvl.problems.filter((lp) => {
          const pr = PROBLEM_MAP[lp.id];
          if (!pr) return false;
          if (
            q &&
            !pr.title.toLowerCase().includes(q) &&
            !lvl.title.toLowerCase().includes(q) &&
            !topicMatch
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
  }, [
    allLevels,
    activeQuery,
    difficulty,
    status,
    platform,
    progress,
    topic.name,
    topic.slug,
    roadmapItem,
  ]);

  // When filters are active and current open level is not in the filtered set, auto-open first match
  useEffect(() => {
    if (filteredLevels.length > 0 && openLevelKey !== null) {
      const isCurrentVisible = filteredLevels.some(
        (lvl) => `${lvl.number}-${lvl.title}` === openLevelKey,
      );
      if (!isCurrentVisible) {
        setOpenLevelKey(`${filteredLevels[0].number}-${filteredLevels[0].title}`);
      }
    }
  }, [filteredLevels, openLevelKey]);

  const clear = () => {
    setLocalSearch("");
    setDifficulty("all");
    setStatus("all");
    setPlatform("all");
    setGlobalQuery("");
  };

  const statusOptions = [
    { id: "all", label: "All" },
    { id: "unsolved", label: "Unsolved" },
    { id: "solved", label: "Solved" },
    { id: "revision", label: "Revision" },
    { id: "bookmarked", label: "Bookmarked" },
  ];

  return (
    <AppShell title={topic.name}>
      <div className="space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/practice"
            className="inline-flex items-center gap-1.5 font-accent text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Practice Tracks</span>
          </Link>
          {roadmapItem && (
            <span className="rounded-full border border-primary/20 bg-primary-soft px-2.5 py-0.5 font-accent text-[11px] font-semibold text-primary">
              #{roadmapItem.order} of 22 • {roadmapItem.phase} Tier
            </span>
          )}
        </div>

        {/* Topic Header Card */}
        <div className="premium-card animate-card-enter rounded-xl border p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-1.5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                {topic.name}
              </h2>
              <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {topic.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-easy-foreground">
                  <span className="h-2 w-2 rounded-full bg-easy" />
                  {easyCount} Easy
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-medium-foreground">
                  <span className="h-2 w-2 rounded-full bg-medium" />
                  {medCount} Medium
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-hard-foreground">
                  <span className="h-2 w-2 rounded-full bg-hard" />
                  {hardCount} Hard
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="text-right">
                <div className="font-mono text-2xl font-bold tabular-nums text-foreground">
                  {solved}
                  <span className="text-sm font-normal text-muted-foreground"> / {total}</span>
                </div>
                <div className="font-accent text-xs text-muted-foreground">solved</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="font-mono text-sm font-bold tabular-nums">{pct}%</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <ProgressBar value={pct} className="h-2 rounded-full" />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{ animationDelay: "100ms" }}
          className="premium-card animate-card-enter flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3"
        >
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {/* Local Search Input */}
            <div className="relative min-w-[180px] max-w-xs">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search in this topic..."
                className="h-8.5 rounded-lg border-border/70 bg-surface pl-8 text-xs focus-visible:border-primary/50"
              />
            </div>

            {/* Quick Status Segmented Buttons */}
            <div className="flex items-center rounded-lg border border-border/70 bg-surface-muted/40 p-0.5">
              {statusOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setStatus(opt.id)}
                  className={`rounded-md px-2.5 py-1 font-accent text-[11px] font-medium transition-colors ${
                    status === opt.id
                      ? "bg-surface font-semibold text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <FilterSelect
              value={difficulty}
              onChange={setDifficulty}
              placeholder="Difficulty"
              options={[
                { v: "all", l: "All Difficulties" },
                { v: "Easy", l: "Easy" },
                { v: "Medium", l: "Medium" },
                { v: "Hard", l: "Hard" },
              ]}
            />

            {/* Platform Filter */}
            <FilterSelect
              value={platform}
              onChange={setPlatform}
              placeholder="Platform"
              options={[
                { v: "all", l: "All Platforms" },
                { v: "LeetCode", l: "LeetCode" },
                { v: "GFG", l: "GeeksforGeeks" },
                { v: "CSES", l: "CSES" },
                { v: "AtCoder", l: "AtCoder" },
              ]}
            />
          </div>

          {filtersActive && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clear}
              className="h-8 gap-1 font-accent text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
              Reset filters
            </Button>
          )}
        </div>

        {/* Level Accordions or Empty State */}
        {filteredLevels.length === 0 ? (
          <EmptyState
            title="No problems match your current filters."
            description="Try relaxing your difficulty or platform filter to see more problems."
            action={
              <Button variant="outline" size="sm" onClick={clear}>
                Clear all filters
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredLevels.map((lvl, index) => {
              const levelKey = `${lvl.number}-${lvl.title}`;
              const isOpen = openLevelKey === levelKey;
              const fullLevel = allLevels.find(
                (l) => l.number === lvl.number && l.title === lvl.title,
              );
              return (
                <div
                  key={`${topic.slug}-${lvl.number}-${lvl.title}`}
                  style={{ animationDelay: `${150 + index * 40}ms` }}
                  className="animate-card-enter"
                >
                  <LevelAccordion
                    level={lvl}
                    fullLevel={fullLevel}
                    isOpen={isOpen}
                    onToggle={() => {
                      setOpenLevelKey((prev) => (prev === levelKey ? null : levelKey));
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Topic Pagination (Prev / Next Topic) */}
        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-border/70 pt-6 sm:flex-row">
          {prevTopic ? (
            <Link
              to="/topics/$slug"
              params={{ slug: prevTopic.slug }}
              className="premium-card flex flex-1 items-center gap-3 rounded-xl border p-3.5 transition-all hover:border-primary/50"
            >
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
              <div className="min-w-0">
                <span className="font-accent text-[10.5px] uppercase tracking-wider text-muted-foreground">
                  Previous Track
                </span>
                <div className="truncate font-display text-xs font-semibold text-foreground">
                  {prevTopic.name}
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextTopic ? (
            <Link
              to="/topics/$slug"
              params={{ slug: nextTopic.slug }}
              className="premium-card flex flex-1 items-center justify-end gap-3 rounded-xl border p-3.5 text-right transition-all hover:border-primary/50"
            >
              <div className="min-w-0">
                <span className="font-accent text-[10.5px] uppercase tracking-wider text-muted-foreground">
                  Next Track
                </span>
                <div className="truncate font-display text-xs font-semibold text-foreground">
                  {nextTopic.name}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
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
      <SelectTrigger className="h-8.5 w-[140px] rounded-lg border-border/70 bg-surface text-xs font-medium">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.v} value={o.v} className="text-xs">
            {o.l}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
