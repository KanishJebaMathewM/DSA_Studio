import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ExternalLink,
  Flame,
  ListTodo,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProgressBar } from "@/components/ProgressBar";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { PlatformBadge } from "@/components/PlatformBadge";
import { ALL_PLACEMENTS, PROBLEM_MAP, TOPICS, UNIQUE_PROBLEM_IDS } from "@/data/problems";
import { ROADMAP } from "@/data/roadmap";
import { useProgress } from "@/lib/progress-store";

export const Route = createFileRoute("/")({
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

function getMasteryRank(solved: number) {
  if (solved >= 300)
    return {
      title: "Grandmaster",
      tier: "Tier V",
      color: "text-amber-500",
      bg: "bg-amber-500/10 border-amber-500/25",
    };
  if (solved >= 175)
    return {
      title: "Interview Contender",
      tier: "Tier IV",
      color: "text-violet-500",
      bg: "bg-violet-500/10 border-violet-500/25",
    };
  if (solved >= 75)
    return {
      title: "Algorithm Specialist",
      tier: "Tier III",
      color: "text-sky-500",
      bg: "bg-sky-500/10 border-sky-500/25",
    };
  if (solved >= 25)
    return {
      title: "Code Challenger",
      tier: "Tier II",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 border-emerald-500/25",
    };
  return {
    title: "Apprentice",
    tier: "Tier I",
    color: "text-primary",
    bg: "bg-primary-soft border-primary/25",
  };
}

function Dashboard() {
  const progress = useProgress();

  const total = UNIQUE_PROBLEM_IDS.length;
  const solvedIds = UNIQUE_PROBLEM_IDS.filter((id) => progress[id]?.completed);
  const solved = solvedIds.length;
  const remaining = total - solved;
  const pct = total ? Math.round((solved / total) * 100) : 0;

  const totalByDiff = (d: "Easy" | "Medium" | "Hard") =>
    UNIQUE_PROBLEM_IDS.filter((id) => PROBLEM_MAP[id].difficulty === d).length;

  const solvedByDiff = (d: "Easy" | "Medium" | "Hard") =>
    solvedIds.filter((id) => PROBLEM_MAP[id].difficulty === d).length;

  const easySolved = solvedByDiff("Easy");
  const easyTotal = totalByDiff("Easy");
  const easyPct = easyTotal ? Math.round((easySolved / easyTotal) * 100) : 0;

  const medSolved = solvedByDiff("Medium");
  const medTotal = totalByDiff("Medium");
  const medPct = medTotal ? Math.round((medSolved / medTotal) * 100) : 0;

  const hardSolved = solvedByDiff("Hard");
  const hardTotal = totalByDiff("Hard");
  const hardPct = hardTotal ? Math.round((hardSolved / hardTotal) * 100) : 0;

  const revision = Object.entries(progress).filter(([, e]) => e.needsRevision);
  const rank = getMasteryRank(solved);

  // Next unsolved problem (Continue Practicing)
  const nextPlacement = ALL_PLACEMENTS.find((pl) => !progress[pl.problemId]?.completed);
  const nextProblem = nextPlacement && PROBLEM_MAP[nextPlacement.problemId];

  // Recently practiced
  const recent = Object.entries(progress)
    .filter(([, e]) => e.completedAt)
    .sort((a, b) => new Date(b[1].completedAt!).getTime() - new Date(a[1].completedAt!).getTime())
    .slice(0, 5);

  return (
    <AppShell title="Dashboard">
      <div className="space-y-6">
        {/* Welcome & Mastery Banner */}
        <div className="premium-card animate-card-enter relative overflow-hidden rounded-xl border p-6">
          <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                  Welcome back
                </h2>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-accent text-xs font-semibold ${rank.bg} ${rank.color}`}
                >
                  <Trophy className="h-3 w-3" />
                  {rank.title} • {rank.tier}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Your structured DSA journey across 22 curated topics and 3 mastery tiers.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="text-right">
                <div className="font-mono text-2xl font-bold tabular-nums text-foreground">
                  {solved}
                  <span className="text-sm font-normal text-muted-foreground"> / {total}</span>
                </div>
                <div className="font-accent text-xs text-muted-foreground">problems solved</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="font-mono text-sm font-bold tabular-nums">{pct}%</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <ProgressBar value={pct} className="h-2.5 rounded-full" />
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            label="Curated Problems"
            value={total}
            sub="Across 22 tracks"
            icon={<ListTodo className="h-4 w-4 text-primary" />}
            delay={60}
          />
          <StatCard
            label="Problems Solved"
            value={solved}
            sub={`${pct}% completed`}
            icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
            delay={120}
          />
          <StatCard
            label="In Backlog"
            value={remaining}
            sub="Ready to solve"
            icon={<BookOpenCheck className="h-4 w-4 text-sky-500" />}
            delay={180}
          />
          <StatCard
            label="Revision Queue"
            value={revision.length}
            sub={revision.length === 0 ? "All caught up" : "Need review"}
            icon={<RotateCcw className="h-4 w-4 text-amber-500" />}
            delay={240}
          />
        </div>

        {/* Difficulty Segmented Breakdown */}
        <div
          style={{ animationDelay: "280ms" }}
          className="premium-card animate-card-enter rounded-xl border p-5"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold tracking-tight text-foreground">
              Difficulty Breakdown
            </h3>
            <span className="font-accent text-xs text-muted-foreground">Completion by tier</span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-easy/25 bg-easy-bg/30 p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-accent text-xs font-semibold text-easy-foreground">Easy</span>
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {easyPct}%
                </span>
              </div>
              <div className="mt-2 font-mono text-xl font-bold tabular-nums text-foreground">
                {easySolved}{" "}
                <span className="text-xs font-normal text-muted-foreground">/ {easyTotal}</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
                <div
                  className="h-full rounded-full bg-easy transition-all"
                  style={{ width: `${easyPct}%` }}
                />
              </div>
            </div>

            <div className="rounded-lg border border-medium/25 bg-medium-bg/30 p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-accent text-xs font-semibold text-medium-foreground">
                  Medium
                </span>
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {medPct}%
                </span>
              </div>
              <div className="mt-2 font-mono text-xl font-bold tabular-nums text-foreground">
                {medSolved}{" "}
                <span className="text-xs font-normal text-muted-foreground">/ {medTotal}</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
                <div
                  className="h-full rounded-full bg-medium transition-all"
                  style={{ width: `${medPct}%` }}
                />
              </div>
            </div>

            <div className="rounded-lg border border-hard/25 bg-hard-bg/30 p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-accent text-xs font-semibold text-hard-foreground">Hard</span>
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {hardPct}%
                </span>
              </div>
              <div className="mt-2 font-mono text-xl font-bold tabular-nums text-foreground">
                {hardSolved}{" "}
                <span className="text-xs font-normal text-muted-foreground">/ {hardTotal}</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
                <div
                  className="h-full rounded-full bg-hard transition-all"
                  style={{ width: `${hardPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Continue Practicing & Recently Practiced */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Continue practicing */}
          <div
            style={{ animationDelay: "320ms" }}
            className="premium-card animate-card-enter rounded-xl border p-5 lg:col-span-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-primary" />
                <h3 className="font-display text-sm font-semibold tracking-tight text-foreground">
                  Continue Practicing
                </h3>
              </div>
              <span className="font-accent text-xs text-muted-foreground">
                Next in learning sequence
              </span>
            </div>

            {nextProblem && nextPlacement ? (
              <div className="mt-4 flex flex-col justify-between gap-4 rounded-lg border border-border/70 bg-surface-muted/30 p-4 sm:flex-row sm:items-center">
                <div className="min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-primary-soft px-1.5 py-0.5 font-accent text-[10.5px] font-semibold text-primary">
                      {nextPlacement.topicName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Level {nextPlacement.levelNumber}: {nextPlacement.levelTitle}
                    </span>
                  </div>
                  <h4 className="truncate font-display text-base font-semibold text-foreground">
                    {nextProblem.title}
                  </h4>
                  <div className="flex items-center gap-2 pt-0.5">
                    <DifficultyBadge difficulty={nextProblem.difficulty} />
                    <PlatformBadge platform={nextProblem.platform} />
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={nextProblem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-border/70 bg-surface px-3 py-1.5 font-accent text-xs font-medium text-foreground transition-all hover:bg-hover hover:border-primary/40"
                  >
                    Solve
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <Link
                    to="/topics/$slug"
                    params={{ slug: nextPlacement.topicSlug }}
                    className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 font-accent text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90"
                  >
                    View Track
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-3 rounded-lg border border-success/30 bg-success/10 p-4 text-sm text-success">
                <Sparkles className="h-5 w-5" />
                <span>All problems completed! Outstanding milestone achievement.</span>
              </div>
            )}
          </div>

          {/* Recently practiced */}
          <div
            style={{ animationDelay: "360ms" }}
            className="premium-card animate-card-enter rounded-xl border p-5"
          >
            <h3 className="font-display text-sm font-semibold tracking-tight text-foreground">
              Recently Completed
            </h3>
            {recent.length === 0 ? (
              <p className="mt-4 text-xs text-muted-foreground">
                No completed problems yet. Check off a challenge to build your history!
              </p>
            ) : (
              <ul className="mt-3 divide-y divide-border/60">
                {recent.map(([id, e]) => {
                  const pr = PROBLEM_MAP[id];
                  if (!pr) return null;
                  return (
                    <li key={id} className="flex items-center justify-between gap-2 py-2 text-xs">
                      <a
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-0 truncate font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {pr.title}
                      </a>
                      <span className="shrink-0 font-mono text-[10.5px] text-muted-foreground">
                        {new Date(e.completedAt!).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Quick Topic Jump */}
        <div style={{ animationDelay: "400ms" }} className="animate-card-enter">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold tracking-tight text-foreground">
              Topic Quick Jump
            </h3>
            <Link
              to="/practice"
              className="font-accent text-xs font-medium text-primary hover:underline"
            >
              View full curriculum →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ROADMAP.slice(0, 6).map((r, index) => {
              const t = TOPICS.find((x) => x.slug === r.slug);
              if (!t) return null;
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
                  style={{ animationDelay: `${400 + index * 30}ms` }}
                  className="premium-card animate-card-enter group flex items-center justify-between gap-3 rounded-lg border p-3.5 transition-all hover:border-primary/50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs font-semibold tracking-tight text-foreground group-hover:text-primary">
                        {t.name}
                      </span>
                      <span className="font-mono text-[10.5px] tabular-nums text-muted-foreground">
                        {tp}%
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <ProgressBar value={tp} className="h-1.5 flex-1" />
                      <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                        {ts}/{tt}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
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
  sub,
  icon,
  delay = 0,
}: {
  label: string;
  value: number;
  sub: string;
  icon: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="premium-card animate-card-enter rounded-xl border p-4"
    >
      <div className="flex items-center justify-between font-accent text-xs font-medium text-muted-foreground">
        <span>{label}</span>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-muted/60">
          {icon}
        </div>
      </div>
      <div className="mt-2 font-mono text-2xl font-bold tabular-nums text-foreground">{value}</div>
      <div className="mt-0.5 text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}
