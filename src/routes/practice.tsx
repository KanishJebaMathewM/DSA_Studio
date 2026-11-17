import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Search,
  SlidersHorizontal,
  Share2,
  Network,
  Sigma,
  MoveHorizontal,
  ArrowLeftRight,
  ArrowDownAZ,
  GitFork,
  Link2,
  Layers,
  SearchCode,
  Layers3,
  ListOrdered,
  GitBranch,
  TrendingUp,
  TreePine,
  Binary,
  CaseSensitive,
  Grid3x3,
  Calculator,
  LayoutList,
  Type,
  Hash,
  AppWindow,
  X,
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProgressBar } from "@/components/ProgressBar";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TOPICS, PROBLEM_MAP } from "@/data/problems";
import { ROADMAP, type RoadmapPhase } from "@/data/roadmap";
import { useProgress } from "@/lib/progress-store";
import { useGlobalSearch } from "@/lib/search-context";

const iconMap: Record<string, LucideIcon> = {
  Share2,
  Network,
  Sigma,
  MoveHorizontal,
  ArrowLeftRight,
  ArrowDownAZ,
  GitFork,
  Link2,
  Layers,
  SearchCode,
  Layers3,
  ListOrdered,
  GitBranch,
  TrendingUp,
  TreePine,
  Binary,
  CaseSensitive,
  Grid3x3,
  Calculator,
  LayoutList,
  Type,
  Hash,
  AppWindow,
};

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice Roadmap — DSA Studio" },
      { name: "description", content: "Browse DSA topics and pick a track to practice." },
      { property: "og:title", content: "Practice Roadmap — DSA Studio" },
      { property: "og:description", content: "Choose a topic to start practicing." },
    ],
  }),
  component: PracticePage,
});

function PracticePage() {
  const progress = useProgress();
  const { query: globalQuery, setQuery: setGlobalQuery } = useGlobalSearch();
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase | "All">("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"order" | "progress" | "name">("order");

  // Pre-calculate topic stats
  const topicData = useMemo(() => {
    return ROADMAP.map((roadmapItem) => {
      const topic = TOPICS.find((t) => t.slug === roadmapItem.slug);
      const ids = new Set<string>();
      topic?.levels?.forEach((lvl) => lvl.problems.forEach((lp) => ids.add(lp.id)));
      topic?.parts?.forEach((p) =>
        p.levels.forEach((lvl) => lvl.problems.forEach((lp) => ids.add(lp.id))),
      );

      const allIds = Array.from(ids);
      const total = allIds.length;
      const solved = allIds.filter((id) => progress[id]?.completed).length;
      const pct = total ? Math.round((solved / total) * 100) : 0;

      const easy = allIds.filter((id) => PROBLEM_MAP[id]?.difficulty === "Easy").length;
      const medium = allIds.filter((id) => PROBLEM_MAP[id]?.difficulty === "Medium").length;
      const hard = allIds.filter((id) => PROBLEM_MAP[id]?.difficulty === "Hard").length;

      return {
        ...roadmapItem,
        topic,
        total,
        solved,
        pct,
        easy,
        medium,
        hard,
      };
    });
  }, [progress]);

  const filteredTopics = useMemo(() => {
    let list = topicData;

    if (selectedPhase !== "All") {
      list = list.filter((t) => t.phase === selectedPhase);
    }

    const tq = search.trim().toLowerCase();
    const gq = globalQuery.trim().toLowerCase();

    if (gq) {
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(gq) ||
          t.tagline.toLowerCase().includes(gq) ||
          t.slug.toLowerCase().includes(gq) ||
          t.phase.toLowerCase().includes(gq),
      );
    }

    if (tq) {
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(tq) ||
          t.tagline.toLowerCase().includes(tq) ||
          t.slug.toLowerCase().includes(tq),
      );
    }

    if (sortBy === "progress") {
      list = [...list].sort((a, b) => b.pct - a.pct);
    } else if (sortBy === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list = [...list].sort((a, b) => a.order - b.order);
    }

    return list;
  }, [topicData, selectedPhase, search, globalQuery, sortBy]);

  // Dynamically calculated phase counts (Bug #9 fix)
  const phases = useMemo(
    () => [
      { id: "All" as const, label: "All Tracks", count: ROADMAP.length },
      {
        id: "Foundation" as const,
        label: "Foundation",
        count: ROADMAP.filter((r) => r.phase === "Foundation").length,
      },
      {
        id: "Intermediate" as const,
        label: "Intermediate",
        count: ROADMAP.filter((r) => r.phase === "Intermediate").length,
      },
      {
        id: "Advanced" as const,
        label: "Advanced",
        count: ROADMAP.filter((r) => r.phase === "Advanced").length,
      },
    ],
    [],
  );

  return (
    <AppShell title="Practice Roadmap">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Curated Practice Tracks
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A complete, zero-to-hero curriculum organized into 3 tiers of mastery.
            </p>
          </div>

          {/* Quick Filter Search */}
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter topics..."
              className="h-8.5 rounded-lg border-border/80 bg-surface pl-8 text-xs focus-visible:border-primary/50"
            />
          </div>
        </div>

        {/* Global search active banner */}
        {globalQuery.trim() && (
          <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary-soft px-3.5 py-2 text-xs text-muted-foreground">
            <span>
              Global search active: <strong className="text-foreground">"{globalQuery}"</strong>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setGlobalQuery("")}
              className="h-6 px-2 text-xs text-primary hover:text-primary"
            >
              Clear global search
            </Button>
          </div>
        )}

        {/* Phase Filter Tabs & Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {phases.map((phase) => {
              const active = selectedPhase === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhase(phase.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-accent text-xs font-medium transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                      : "text-muted-foreground hover:bg-hover hover:text-foreground"
                  }`}
                >
                  <span>{phase.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] tabular-nums ${
                      active ? "bg-white/20 text-white" : "bg-surface-muted text-muted-foreground"
                    }`}
                  >
                    {phase.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-accent text-xs text-muted-foreground">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "order" | "progress" | "name")}
              className="h-8 rounded-lg border border-border/80 bg-surface px-2.5 font-accent text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="order">Roadmap Sequence</option>
              <option value="progress">Highest Completion</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Topic Grid or Empty State */}
        {filteredTopics.length === 0 ? (
          <EmptyState
            title="No practice tracks found"
            description="No topics match your current filter criteria. Try clearing filters or searching for something else."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setGlobalQuery("");
                  setSelectedPhase("All");
                }}
              >
                Clear all filters
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredTopics.map((item, index) => {
              const Icon = iconMap[item.icon] ?? Layers;
              const isCompleted = item.solved === item.total && item.total > 0;

              const phaseStyles = {
                Foundation: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
                Intermediate: "text-sky-500 bg-sky-500/10 border-sky-500/20",
                Advanced: "text-violet-500 bg-violet-500/10 border-violet-500/20",
              }[item.phase];

              return (
                <Link
                  key={item.slug}
                  to="/topics/$slug"
                  params={{ slug: item.slug }}
                  onClick={() => setGlobalQuery("")}
                  style={{ animationDelay: `${Math.min(index * 30, 420)}ms` }}
                  className="premium-card animate-card-enter group relative flex flex-col justify-between rounded-xl border p-5 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-surface-muted/50 text-foreground transition-all duration-200 group-hover:scale-105 group-hover:border-primary/40 group-hover:bg-primary-soft group-hover:text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded border px-1.5 py-0.2 font-accent text-[10px] font-semibold uppercase tracking-wider ${phaseStyles}`}
                            >
                              {item.phase}
                            </span>
                            <span className="font-mono text-[11px] text-muted-foreground">
                              #{item.order}
                            </span>
                          </div>
                          <h3 className="mt-1 font-display text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                            {item.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {isCompleted ? (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/15 text-success">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                        ) : (
                          <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                        )}
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Difficulty dots & Progress Bar */}
                  <div className="mt-5 border-t border-border/50 pt-3">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-easy" />
                          <span className="tabular-nums">{item.easy}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-medium" />
                          <span className="tabular-nums">{item.medium}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-hard" />
                          <span className="tabular-nums">{item.hard}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="text-xs font-semibold tabular-nums text-foreground">
                          {item.solved}
                          <span className="font-normal text-muted-foreground">/{item.total}</span>
                        </span>
                        <span className="rounded bg-surface-muted px-1 py-0.2 text-[10px] font-medium text-muted-foreground tabular-nums">
                          {item.pct}%
                        </span>
                      </div>
                    </div>
                    <ProgressBar value={item.pct} className="h-1.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
