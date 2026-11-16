import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  Flame,
  PieChart,
  Search,
  Sparkles,
  Trophy,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProgressBar } from "@/components/ProgressBar";
import { Input } from "@/components/ui/input";
import { PROBLEM_MAP, TOPICS, UNIQUE_PROBLEM_IDS, type Platform } from "@/data/problems";
import { ROADMAP, type RoadmapPhase } from "@/data/roadmap";
import { useProgress } from "@/lib/progress-store";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress Analytics — DSA Studio" },
      {
        name: "description",
        content: "Your DSA practice progress by topic, difficulty, and tier.",
      },
      { property: "og:title", content: "Progress Analytics — DSA Studio" },
      {
        property: "og:description",
        content: "Detailed DSA practice progress and completion metrics.",
      },
    ],
  }),
  component: ProgressPage,
});

function topicStats(slug: string, progress: ReturnType<typeof useProgress>) {
  const t = TOPICS.find((x) => x.slug === slug)!;
  const ids = new Set<string>();
  t.levels?.forEach((lvl) => lvl.problems.forEach((lp) => ids.add(lp.id)));
  t.parts?.forEach((p) => p.levels.forEach((lvl) => lvl.problems.forEach((lp) => ids.add(lp.id))));
  const total = ids.size;
  const solved = Array.from(ids).filter((id) => progress[id]?.completed).length;
  return { total, solved, pct: total ? Math.round((solved / total) * 100) : 0 };
}

function ProgressPage() {
  const progress = useProgress();
  const [topicFilter, setTopicFilter] = useState("");

  const total = UNIQUE_PROBLEM_IDS.length;
  const solvedIds = UNIQUE_PROBLEM_IDS.filter((id) => progress[id]?.completed);
  const solved = solvedIds.length;
  const pct = total ? Math.round((solved / total) * 100) : 0;

  const byDifficulty = (d: "Easy" | "Medium" | "Hard") => {
    const tot = UNIQUE_PROBLEM_IDS.filter((id) => PROBLEM_MAP[id].difficulty === d).length;
    const sol = solvedIds.filter((id) => PROBLEM_MAP[id].difficulty === d).length;
    return { total: tot, solved: sol, pct: tot ? Math.round((sol / tot) * 100) : 0 };
  };
  const easy = byDifficulty("Easy");
  const medium = byDifficulty("Medium");
  const hard = byDifficulty("Hard");

  // Platform Breakdown
  const platforms: Platform[] = ["LeetCode", "GFG", "CSES", "AtCoder"];
  const platformStats = platforms.map((plat) => {
    const platTotal = UNIQUE_PROBLEM_IDS.filter((id) => PROBLEM_MAP[id]?.platform === plat).length;
    const platSolved = solvedIds.filter((id) => PROBLEM_MAP[id]?.platform === plat).length;
    return {
      platform: plat,
      total: platTotal,
      solved: platSolved,
      pct: platTotal ? Math.round((platSolved / platTotal) * 100) : 0,
    };
  });

  // Phase / Tier Breakdown
  const phases: RoadmapPhase[] = ["Foundation", "Intermediate", "Advanced"];
  const phaseStats = phases.map((phase) => {
    const roadmapItems = ROADMAP.filter((r) => r.phase === phase);
    const ids = new Set<string>();
    roadmapItems.forEach((item) => {
      const t = TOPICS.find((x) => x.slug === item.slug);
      t?.levels?.forEach((lvl) => lvl.problems.forEach((lp) => ids.add(lp.id)));
      t?.parts?.forEach((p) =>
        p.levels.forEach((lvl) => lvl.problems.forEach((lp) => ids.add(lp.id))),
      );
    });
    const pTotal = ids.size;
    const pSolved = Array.from(ids).filter((id) => progress[id]?.completed).length;
    return {
      phase,
      topicsCount: roadmapItems.length,
      total: pTotal,
      solved: pSolved,
      pct: pTotal ? Math.round((pSolved / pTotal) * 100) : 0,
    };
  });

  const topicRows = useMemo(() => {
    return TOPICS.map((t) => ({
      topic: t,
      roadmap: ROADMAP.find((r) => r.slug === t.slug),
      ...topicStats(t.slug, progress),
    }));
  }, [progress]);

  const filteredTopicRows = useMemo(() => {
    if (!topicFilter.trim()) return topicRows;
    const q = topicFilter.toLowerCase();
    return topicRows.filter((r) => r.topic.name.toLowerCase().includes(q));
  }, [topicRows, topicFilter]);

  const strongest = [...topicRows].sort((a, b) => b.pct - a.pct).slice(0, 4);
  const weakest = [...topicRows]
    .filter((r) => r.total > 0 && r.pct < 100)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 4);

  const recent = Object.entries(progress)
    .filter(([, e]) => e.completedAt)
    .sort((a, b) => new Date(b[1].completedAt!).getTime() - new Date(a[1].completedAt!).getTime())
    .slice(0, 6);

  return (
    <AppShell title="Progress Analytics">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Analytics & Progress
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Comprehensive breakdown of your problem-solving metrics across tiers and platforms.
          </p>
        </div>

        {/* Overall Hero Card */}
        <div className="premium-card animate-card-enter rounded-xl border p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="font-accent text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Total Solved Rate
              </div>
              <div className="mt-1 font-mono text-3xl font-extrabold tabular-nums text-foreground">
                {solved}{" "}
                <span className="text-base font-normal text-muted-foreground">
                  / {total} problems
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-2xl font-bold tabular-nums text-primary">{pct}%</span>
              <span className="font-accent text-xs text-muted-foreground">overall</span>
            </div>
          </div>
          <ProgressBar value={pct} className="mt-4 h-2.5 rounded-full" />
        </div>

        {/* 3 Tier Mastery Progress Cards */}
        <div className="grid gap-3 sm:grid-cols-3">
          {phaseStats.map((ps, index) => {
            const toneColor = {
              Foundation: "text-emerald-500 bg-emerald-500/10 border-emerald-500/25",
              Intermediate: "text-sky-500 bg-sky-500/10 border-sky-500/25",
              Advanced: "text-violet-500 bg-violet-500/10 border-violet-500/25",
            }[ps.phase];

            return (
              <div
                key={ps.phase}
                style={{ animationDelay: `${100 + index * 50}ms` }}
                className="premium-card animate-card-enter rounded-xl border p-4"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-md border px-2 py-0.5 font-accent text-xs font-semibold ${toneColor}`}
                  >
                    {ps.phase} Tier
                  </span>
                  <span className="font-mono text-xs font-bold tabular-nums text-foreground">
                    {ps.pct}%
                  </span>
                </div>
                <div className="mt-3 font-mono text-lg font-bold tabular-nums text-foreground">
                  {ps.solved}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    / {ps.total} solved
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {ps.topicsCount} specialized topics
                </div>
                <ProgressBar value={ps.pct} className="mt-3 h-1.5" />
              </div>
            );
          })}
        </div>

        {/* Difficulty Breakdown & Platform Breakdown */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Difficulty Split */}
          <div
            style={{ animationDelay: "250ms" }}
            className="premium-card animate-card-enter rounded-xl border p-5"
          >
            <h3 className="font-display text-sm font-semibold tracking-tight text-foreground">
              Difficulty Mastery
            </h3>
            <div className="mt-4 space-y-3.5">
              <DiffBar label="Easy" color="bg-easy" text="text-easy-foreground" {...easy} />
              <DiffBar label="Medium" color="bg-medium" text="text-medium-foreground" {...medium} />
              <DiffBar label="Hard" color="bg-hard" text="text-hard-foreground" {...hard} />
            </div>
          </div>

          {/* Platform Split */}
          <div
            style={{ animationDelay: "300ms" }}
            className="premium-card animate-card-enter rounded-xl border p-5"
          >
            <h3 className="font-display text-sm font-semibold tracking-tight text-foreground">
              Platform Distribution
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {platformStats.map((p) => (
                <div
                  key={p.platform}
                  className="rounded-lg border border-border/70 bg-surface-muted/30 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-accent text-xs font-semibold text-foreground">
                      {p.platform}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {p.pct}%
                    </span>
                  </div>
                  <div className="mt-2 font-mono text-base font-bold tabular-nums text-foreground">
                    {p.solved}{" "}
                    <span className="text-xs font-normal text-muted-foreground">/ {p.total}</span>
                  </div>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${p.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strongest & Focus Areas */}
        <div className="grid gap-4 md:grid-cols-2">
          <div
            style={{ animationDelay: "350ms" }}
            className="premium-card animate-card-enter rounded-xl border p-5"
          >
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-emerald-500" />
              <h3 className="font-display text-sm font-semibold tracking-tight text-foreground">
                Strongest Tracks
              </h3>
            </div>
            <ul className="mt-3.5 divide-y divide-border/60">
              {strongest.map((r) => (
                <li key={r.topic.slug} className="flex items-center justify-between py-2 text-xs">
                  <Link
                    to="/topics/$slug"
                    params={{ slug: r.topic.slug }}
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {r.topic.name}
                  </Link>
                  <span className="font-mono font-semibold tabular-nums text-emerald-500">
                    {r.pct}% ({r.solved}/{r.total})
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{ animationDelay: "400ms" }}
            className="premium-card animate-card-enter rounded-xl border p-5"
          >
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-amber-500" />
              <h3 className="font-display text-sm font-semibold tracking-tight text-foreground">
                Focus Recommendations
              </h3>
            </div>
            <ul className="mt-3.5 divide-y divide-border/60">
              {weakest.map((r) => (
                <li key={r.topic.slug} className="flex items-center justify-between py-2 text-xs">
                  <Link
                    to="/topics/$slug"
                    params={{ slug: r.topic.slug }}
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {r.topic.name}
                  </Link>
                  <span className="font-mono font-semibold tabular-nums text-muted-foreground">
                    {r.pct}% ({r.solved}/{r.total})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* All Topic Completion Breakdown Table */}
        <div
          style={{ animationDelay: "450ms" }}
          className="premium-card animate-card-enter rounded-xl border p-5"
        >
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h3 className="font-display text-sm font-semibold tracking-tight text-foreground">
              All Topic Tracks ({topicRows.length})
            </h3>
            <div className="relative w-full sm:w-60">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                placeholder="Search topic..."
                className="h-8 rounded-lg border-border/70 bg-surface pl-8 text-xs focus-visible:border-primary/50"
              />
            </div>
          </div>

          <div className="mt-4 divide-y divide-border/60">
            {filteredTopicRows.map((r) => (
              <Link
                key={r.topic.slug}
                to="/topics/$slug"
                params={{ slug: r.topic.slug }}
                className="group flex flex-col justify-between gap-2 py-3 sm:flex-row sm:items-center hover:bg-hover/50 rounded-lg px-2 -mx-2 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-medium text-xs text-foreground group-hover:text-primary transition-colors">
                      {r.topic.name}
                    </span>
                    {r.roadmap && (
                      <span className="rounded bg-surface-muted px-1.5 py-0.2 font-accent text-[10px] text-muted-foreground">
                        {r.roadmap.phase}
                      </span>
                    )}
                  </div>
                  <ProgressBar value={r.pct} className="mt-2 h-1.5 max-w-sm" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {r.solved} / {r.total}
                  </span>
                  <span className="w-10 text-right font-mono text-xs font-semibold tabular-nums text-foreground">
                    {r.pct}%
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function DiffBar({
  label,
  color,
  text,
  solved,
  total,
  pct,
}: {
  label: string;
  color: string;
  text: string;
  solved: number;
  total: number;
  pct: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className={`font-semibold ${text}`}>{label}</span>
        <div className="flex items-center gap-2 font-mono tabular-nums">
          <span className="text-foreground font-semibold">{solved}</span>
          <span className="text-muted-foreground">/ {total}</span>
          <span className="text-muted-foreground">({pct}%)</span>
        </div>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted/60">
        <div
          className={`h-full rounded-full ${color} transition-all duration-300`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
