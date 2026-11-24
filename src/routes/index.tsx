import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ListTodo,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProgressBar } from "@/components/ProgressBar";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { PlatformBadge } from "@/components/PlatformBadge";
import { ALL_PLACEMENTS, PROBLEM_MAP, TOPICS, UNIQUE_PROBLEM_IDS } from "@/data/problems";
import { useProgress } from "@/lib/progress-store";
import { useGlobalSearch } from "@/lib/search-context";
import { DashboardSkeleton } from "@/components/LoadingSkeletons";

function DashboardPending() {
  return (
    <AppShell title="Dashboard">
      <DashboardSkeleton />
    </AppShell>
  );
}

export const Route = createFileRoute("/")({
  pendingComponent: DashboardPending,
  head: () => ({
    meta: [
      { title: "Dashboard — DSA Studio" },
      {
        name: "description",
        content:
          "Track your DSA practice progress across graphs, DP, trees, sliding window, and more.",
      },
      { property: "og:title", content: "DSA Studio — Practice Tracker" },
      {
        property: "og:description",
        content:
          "A clean workspace for structured DSA practice with per-topic progress and revision.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const progress = useProgress();
  const { query, setQuery } = useGlobalSearch();
  const [showAllProblems, setShowAllProblems] = useState(false);
  const q = query.trim().toLowerCase();

  const total = UNIQUE_PROBLEM_IDS.length;
  const solvedIds = UNIQUE_PROBLEM_IDS.filter((id) => progress[id]?.completed);
  const solved = solvedIds.length;
  const remaining = total - solved;
  const pct = total ? Math.round((solved / total) * 100) : 0;

  const byDifficulty = (d: "Easy" | "Medium" | "Hard") =>
    solvedIds.filter((id) => PROBLEM_MAP[id].difficulty === d).length;

  // Count only problems that still exist in the catalog, so this matches
  // the Revision page (storage may hold IDs that were since removed).
  const revisionCount = UNIQUE_PROBLEM_IDS.filter((id) => progress[id]?.needsRevision).length;

  // Next unsolved problem (Continue Practicing)
  const nextPlacement = ALL_PLACEMENTS.find((pl) => !progress[pl.problemId]?.completed);
  const nextProblem = nextPlacement && PROBLEM_MAP[nextPlacement.problemId];

  // Recently practiced
  const recent = Object.entries(progress)
    .filter(([, e]) => e.completedAt)
    .sort((a, b) => new Date(b[1].completedAt!).getTime() - new Date(a[1].completedAt!).getTime())
    .slice(0, 5);

  const searchResults = useMemo(() => {
    if (!q) return { topics: [], problems: [] };

    const topics = TOPICS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.short.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q),
    );

    const seen = new Set<string>();
    const problems: Array<{
      placement: (typeof ALL_PLACEMENTS)[0];
      problem: (typeof PROBLEM_MAP)[string];
    }> = [];

    for (const pl of ALL_PLACEMENTS) {
      if (seen.has(pl.problemId)) continue;
      const pr = PROBLEM_MAP[pl.problemId];
      if (!pr) continue;
      if (
        pr.title.toLowerCase().includes(q) ||
        pl.topicName.toLowerCase().includes(q) ||
        pl.levelTitle.toLowerCase().includes(q)
      ) {
        seen.add(pl.problemId);
        problems.push({ placement: pl, problem: pr });
      }
    }

    return { topics, problems };
  }, [q]);

  return (
    <AppShell title="Dashboard">
      {q ? (
        <div className="space-y-[clamp(0.75rem,2vh,1.5rem)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Search Results
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Showing matches for <span className="font-semibold text-foreground">"{query}"</span>
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setQuery("")}>
              Clear search
            </Button>
          </div>

          {searchResults.topics.length === 0 && searchResults.problems.length === 0 ? (
            <EmptyState
              title="No matches found"
              description={`No topics or problems match "${query}". Try searching for another topic or pattern.`}
              action={
                <Button variant="outline" size="sm" onClick={() => setQuery("")}>
                  Clear search
                </Button>
              }
            />
          ) : (
            <div className="space-y-[clamp(0.75rem,2vh,1.5rem)]">
              {searchResults.topics.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-foreground">
                    Topics ({searchResults.topics.length})
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {searchResults.topics.map((t) => (
                      <Link
                        key={t.slug}
                        to="/topics/$slug"
                        params={{ slug: t.slug }}
                        className="group rounded-xl border border-border/70 bg-surface backdrop-blur-md p-4 transition-all duration-250 ease-out hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-semibold text-foreground transition-colors group-hover:text-primary">
                              {t.name}
                            </div>
                            <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                              {t.short}
                            </div>
                          </div>
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-all duration-200 ease-out group-hover:text-primary group-hover:translate-x-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.problems.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-foreground">
                    Problems ({searchResults.problems.length})
                  </h3>
                  <div className="divide-y rounded-lg border border-border/70 bg-surface shadow-xs backdrop-blur-md">
                    {(showAllProblems
                      ? searchResults.problems
                      : searchResults.problems.slice(0, 10)
                    ).map(({ placement, problem }) => (
                      <Link
                        key={`${placement.topicSlug}-${problem.id}`}
                        to="/topics/$slug"
                        params={{ slug: placement.topicSlug }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 p-3 text-sm transition-colors hover:bg-hover first:rounded-t-lg last:rounded-b-lg"
                      >
                        <div className="min-w-0">
                          <div className="break-words sm:truncate font-medium text-foreground transition-colors hover:text-primary">
                            {problem.title}
                          </div>
                          <div className="mt-0.5 text-xs text-muted-foreground">
                            {placement.topicName} • {placement.levelTitle}
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2 self-start sm:self-auto">
                          <DifficultyBadge difficulty={problem.difficulty} />
                          <PlatformBadge platform={problem.platform} />
                        </div>
                      </Link>
                    ))}
                  </div>
                  {searchResults.problems.length > 10 && (
                    <div className="mt-3 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllProblems((prev) => !prev)}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        {showAllProblems
                          ? "Show fewer"
                          : `Show all ${searchResults.problems.length} matching problems`}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-[clamp(0.75rem,2vh,1.5rem)]">
          {/* Welcome Hero Banner */}
          <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card px-4 sm:px-5 py-[clamp(0.75rem,1.8vh,1.25rem)] shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between card-glass-line hover-lift-glow">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Welcome back
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Here's a snapshot of your DSA practice.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 sm:px-3 py-1 text-xs font-medium text-primary shadow-xs">
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {solved} / {total} Solved
                </span>
              </span>
            </div>
          </div>

          {/* Overall progress */}
          <div className="rounded-xl border border-border/70 bg-surface px-4 sm:px-5 py-[clamp(0.75rem,1.8vh,1.25rem)] shadow-xs backdrop-blur-md card-glass-line hover-lift-glow">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  DSA Progress
                </div>
                <div className="mt-1 text-xl sm:text-2xl font-semibold text-foreground">
                  {solved}{" "}
                  <span className="text-sm sm:text-base font-normal text-muted-foreground">
                    / {total} problems
                  </span>
                </div>
              </div>
              <div className="text-sm font-medium text-primary">{pct}%</div>
            </div>
            <ProgressBar
              value={pct}
              className="mt-[clamp(0.5rem,1.2vh,0.75rem)] h-[clamp(0.5rem,1vh,0.625rem)]"
            />
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
            <StatCard label="Total" value={total} icon={<ListTodo className="h-4 w-4" />} />
            <StatCard
              label="Solved"
              value={solved}
              icon={<CheckCircle2 className="h-4 w-4 text-success" />}
            />
            <StatCard
              label="Remaining"
              value={remaining}
              icon={<BookOpenCheck className="h-4 w-4" />}
            />
            <StatCard
              label="Needs Revision"
              value={revisionCount}
              icon={<RotateCcw className="h-4 w-4 text-warning" />}
            />
          </div>

          {/* Difficulty split */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <DiffCard label="Easy" value={byDifficulty("Easy")} tone="easy" />
            <DiffCard label="Medium" value={byDifficulty("Medium")} tone="medium" />
            <DiffCard label="Hard" value={byDifficulty("Hard")} tone="hard" />
          </div>

          <div className="grid gap-[clamp(0.75rem,2vh,1.25rem)] lg:grid-cols-3">
            {/* Continue practicing */}
            <div className="lg:col-span-2 rounded-xl border border-border/70 bg-surface px-4 sm:px-5 py-[clamp(0.875rem,2vh,1.35rem)] min-h-[clamp(140px,20vh,220px)] flex flex-col justify-between shadow-xs backdrop-blur-md card-glass-line hover-lift-glow">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Continue Practicing</h3>
                  <span className="text-xs text-muted-foreground">Next unsolved problem</span>
                </div>
                {nextProblem && nextPlacement ? (
                  <div className="mt-[clamp(0.5rem,1.2vh,0.875rem)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-border/70 bg-surface-muted/60 p-[clamp(0.75rem,1.5vh,1rem)] backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:shadow-xs">
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">
                        {nextPlacement.topicName} • Level {nextPlacement.levelNumber}
                      </div>
                      <div className="mt-1 break-words sm:truncate text-base font-semibold text-foreground">
                        {nextProblem.title}
                      </div>
                      <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                        {!["Easy", "Medium", "Hard"].includes(nextPlacement.levelTitle) && (
                          <span>{nextPlacement.levelTitle}</span>
                        )}
                        <DifficultyBadge difficulty={nextProblem.difficulty} />
                      </div>
                    </div>
                    <Link
                      to="/topics/$slug"
                      params={{ slug: nextPlacement.topicSlug }}
                      className="self-start sm:self-auto inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
                    >
                      Continue
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">
                    🎉 All problems completed. Excellent work.
                  </p>
                )}
              </div>
            </div>

            {/* Recently practiced */}
            <div className="rounded-xl border border-border/70 bg-surface px-4 sm:px-5 py-[clamp(0.875rem,2vh,1.35rem)] min-h-[clamp(140px,20vh,220px)] flex flex-col justify-between shadow-xs backdrop-blur-md card-glass-line hover-lift-glow">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Recently Practiced</h3>
                {recent.length === 0 ? (
                  <p className="mt-[clamp(0.5rem,1.2vh,0.75rem)] text-sm text-muted-foreground">
                    Nothing yet — check off your first problem to see it here.
                  </p>
                ) : (
                  <ul className="mt-[clamp(0.5rem,1.2vh,0.75rem)] space-y-[clamp(0.375rem,1vh,0.625rem)]">
                    {recent.map(([id, e]) => {
                      const pr = PROBLEM_MAP[id];
                      if (!pr) return null;
                      return (
                        <li key={id} className="flex items-center justify-between gap-2 text-sm">
                          <a
                            href={pr.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-w-0 truncate text-foreground hover:text-primary"
                          >
                            {pr.title}
                          </a>
                          <span className="shrink-0 text-[11px] text-muted-foreground">
                            {new Date(e.completedAt!).toLocaleDateString()}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/70 bg-surface backdrop-blur-md px-3 sm:px-4 py-[clamp(0.625rem,1.6vh,1.125rem)] min-h-[clamp(74px,11vh,100px)] flex flex-col justify-between shadow-xs card-glass-line hover-lift-glow">
      <div className="flex items-center justify-between text-[11px] sm:text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span className="truncate pr-1">{label}</span>
        <span className="shrink-0">{icon}</span>
      </div>
      <div className="mt-[clamp(0.25rem,0.8vh,0.5rem)] text-xl sm:text-2xl font-semibold text-foreground">
        {value}
      </div>
    </div>
  );
}

function DiffCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "easy" | "medium" | "hard";
}) {
  const toneMap = {
    easy: "bg-easy-bg text-easy-foreground",
    medium: "bg-medium-bg text-medium-foreground",
    hard: "bg-hard-bg text-hard-foreground",
  } as const;
  return (
    <div className="rounded-xl border border-border/70 bg-surface backdrop-blur-md px-2.5 sm:px-4 py-[clamp(0.625rem,1.6vh,1.125rem)] min-h-[clamp(74px,11vh,100px)] flex flex-col justify-between shadow-xs card-glass-line hover-lift-glow">
      <div className="flex items-center justify-between gap-1">
        <span className="truncate text-[10px] sm:text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
          <span className="hidden sm:inline"> solved</span>
        </span>
        <span
          className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold ${toneMap[tone]}`}
        >
          {label}
        </span>
      </div>
      <div className="mt-[clamp(0.25rem,0.8vh,0.5rem)] text-lg sm:text-2xl font-semibold text-foreground">
        {value}
      </div>
    </div>
  );
}
