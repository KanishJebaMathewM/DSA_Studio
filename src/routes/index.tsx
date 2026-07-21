import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, CheckCircle2, ListTodo, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProgressBar } from "@/components/ProgressBar";
import {
  ALL_PLACEMENTS,
  PROBLEM_MAP,
  TOPICS,
  UNIQUE_PROBLEM_IDS,
} from "@/data/problems";
import { useProgress } from "@/lib/progress-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — DSA Sheet" },
      {
        name: "description",
        content:
          "Track your DSA practice progress across graphs, DP, trees, sliding window, and more.",
      },
      { property: "og:title", content: "DSA Sheet — Practice Tracker" },
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

  const total = UNIQUE_PROBLEM_IDS.length;
  const solvedIds = UNIQUE_PROBLEM_IDS.filter((id) => progress[id]?.completed);
  const solved = solvedIds.length;
  const remaining = total - solved;
  const pct = total ? Math.round((solved / total) * 100) : 0;

  const byDifficulty = (d: "Easy" | "Medium" | "Hard") =>
    solvedIds.filter((id) => PROBLEM_MAP[id].difficulty === d).length;

  const revision = Object.entries(progress).filter(([, e]) => e.needsRevision);

  // Next unsolved problem (Continue Practicing)
  const nextPlacement = ALL_PLACEMENTS.find(
    (pl) => !progress[pl.problemId]?.completed,
  );
  const nextProblem = nextPlacement && PROBLEM_MAP[nextPlacement.problemId];

  // Recently practiced
  const recent = Object.entries(progress)
    .filter(([, e]) => e.completedAt)
    .sort(
      (a, b) =>
        new Date(b[1].completedAt!).getTime() -
        new Date(a[1].completedAt!).getTime(),
    )
    .slice(0, 5);

  return (
    <AppShell title="Dashboard">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Here's a snapshot of your DSA practice.
          </p>
        </div>

        {/* Overall progress */}
        <div className="rounded-lg border bg-surface p-5">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                DSA Progress
              </div>
              <div className="mt-1 text-2xl font-semibold text-foreground">
                {solved}{" "}
                <span className="text-muted-foreground">/ {total} problems</span>
              </div>
            </div>
            <div className="text-sm font-medium text-primary">{pct}%</div>
          </div>
          <ProgressBar value={pct} className="mt-3 h-2" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Total" value={total} icon={<ListTodo className="h-4 w-4" />} />
          <StatCard
            label="Solved"
            value={solved}
            icon={<CheckCircle2 className="h-4 w-4 text-success" />}
          />
          <StatCard label="Remaining" value={remaining} icon={<BookOpenCheck className="h-4 w-4" />} />
          <StatCard
            label="Needs Revision"
            value={revision.length}
            icon={<RotateCcw className="h-4 w-4 text-warning" />}
          />
        </div>

        {/* Difficulty split */}
        <div className="grid grid-cols-3 gap-3">
          <DiffCard label="Easy" value={byDifficulty("Easy")} tone="easy" />
          <DiffCard label="Medium" value={byDifficulty("Medium")} tone="medium" />
          <DiffCard label="Hard" value={byDifficulty("Hard")} tone="hard" />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Continue practicing */}
          <div className="lg:col-span-2 rounded-lg border bg-surface p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                Continue Practicing
              </h3>
              <span className="text-xs text-muted-foreground">
                Next unsolved problem
              </span>
            </div>
            {nextProblem && nextPlacement ? (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-md border bg-background p-4">
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">
                    {nextPlacement.topicName} • Level {nextPlacement.levelNumber}
                  </div>
                  <div className="mt-1 truncate text-base font-semibold text-foreground">
                    {nextProblem.title}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {nextPlacement.levelTitle} • {nextProblem.difficulty}
                  </div>
                </div>
                <Link
                  to="/topics/$slug"
                  params={{ slug: nextPlacement.topicSlug }}
                  className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
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

          {/* Recently practiced */}
          <div className="rounded-lg border bg-surface p-5">
            <h3 className="text-sm font-semibold text-foreground">
              Recently Practiced
            </h3>
            {recent.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Nothing yet — check off your first problem to see it here.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
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

        {/* Topic progress */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">Topic Progress</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {TOPICS.map((t) => {
              const ids = new Set<string>();
              t.levels?.forEach((lvl) => lvl.problems.forEach((lp) => ids.add(lp.id)));
              t.parts?.forEach((p) =>
                p.levels.forEach((lvl) => lvl.problems.forEach((lp) => ids.add(lp.id))),
              );
              const tt = ids.size;
              const ts = Array.from(ids).filter((id) => progress[id]?.completed).length;
              const tp = tt ? Math.round((ts / tt) * 100) : 0;
              return (
                <Link
                  key={t.slug}
                  to="/topics/$slug"
                  params={{ slug: t.slug }}
                  className="group flex items-center justify-between gap-4 rounded-lg border bg-surface p-4 transition-colors hover:border-primary/50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="mt-1 flex items-center gap-3">
                      <ProgressBar value={tp} className="max-w-[240px]" />
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {ts} / {tt}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-surface p-4">
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>{label}</span>
        {icon}
      </div>
      <div className="mt-2 text-2xl font-semibold text-foreground">{value}</div>
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
    <div className="rounded-lg border bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label} solved
        </span>
        <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${toneMap[tone]}`}>
          {label}
        </span>
      </div>
      <div className="mt-2 text-2xl font-semibold text-foreground">{value}</div>
    </div>
  );
}
