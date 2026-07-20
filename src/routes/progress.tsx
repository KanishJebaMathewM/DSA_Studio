import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ProgressBar } from "@/components/ProgressBar";
import {
  PROBLEM_MAP,
  TOPICS,
  UNIQUE_PROBLEM_IDS,
} from "@/data/problems";
import { useProgress } from "@/lib/progress-store";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — DSA Sheet" },
      { name: "description", content: "Your DSA practice progress by topic, difficulty, and level." },
      { property: "og:title", content: "Progress — DSA Sheet" },
      { property: "og:description", content: "Detailed DSA practice progress overview." },
    ],
  }),
  component: ProgressPage,
});

function topicStats(slug: string, progress: ReturnType<typeof useProgress>) {
  const t = TOPICS.find((x) => x.slug === slug)!;
  const ids = new Set<string>();
  t.levels?.forEach((lvl) => lvl.problems.forEach((lp) => ids.add(lp.id)));
  t.parts?.forEach((p) =>
    p.levels.forEach((lvl) => lvl.problems.forEach((lp) => ids.add(lp.id))),
  );
  const total = ids.size;
  const solved = Array.from(ids).filter((id) => progress[id]?.completed).length;
  return { total, solved, pct: total ? Math.round((solved / total) * 100) : 0 };
}

function ProgressPage() {
  const progress = useProgress();

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

  const topicRows = TOPICS.map((t) => ({
    topic: t,
    ...topicStats(t.slug, progress),
  }));

  const strongest = [...topicRows].sort((a, b) => b.pct - a.pct).slice(0, 3);
  const weakest = [...topicRows]
    .filter((r) => r.total > 0)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3);

  const recent = Object.entries(progress)
    .filter(([, e]) => e.completedAt)
    .sort(
      (a, b) =>
        new Date(b[1].completedAt!).getTime() -
        new Date(a[1].completedAt!).getTime(),
    )
    .slice(0, 8);

  return (
    <AppShell title="Progress">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Progress</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your overall stats and topic-by-topic completion.
        </p>
      </div>

      <div className="rounded-lg border bg-surface p-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Overall
            </div>
            <div className="mt-1 text-2xl font-semibold">
              {solved} <span className="text-muted-foreground">/ {total}</span>
            </div>
          </div>
          <div className="text-sm font-medium text-primary">{pct}%</div>
        </div>
        <ProgressBar value={pct} className="mt-3 h-2" />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <DiffProgress label="Easy" tone="easy" {...easy} />
        <DiffProgress label="Medium" tone="medium" {...medium} />
        <DiffProgress label="Hard" tone="hard" {...hard} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-lg border bg-surface p-5">
          <h3 className="text-sm font-semibold">Topic progress</h3>
          <div className="mt-3 space-y-3">
            {topicRows.map((r) => (
              <Link
                key={r.topic.slug}
                to="/topics/$slug"
                params={{ slug: r.topic.slug }}
                className="block"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{r.topic.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {r.solved} / {r.total} • {r.pct}%
                  </span>
                </div>
                <ProgressBar value={r.pct} className="mt-1.5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border bg-surface p-5">
            <h3 className="text-sm font-semibold">Strongest topics</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {strongest.map((r) => (
                <li key={r.topic.slug} className="flex justify-between">
                  <span className="truncate text-foreground">{r.topic.name}</span>
                  <span className="text-muted-foreground">{r.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border bg-surface p-5">
            <h3 className="text-sm font-semibold">Needs practice</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {weakest.map((r) => (
                <li key={r.topic.slug} className="flex justify-between">
                  <span className="truncate text-foreground">{r.topic.name}</span>
                  <span className="text-muted-foreground">{r.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border bg-surface p-5">
        <h3 className="text-sm font-semibold">Recently completed</h3>
        {recent.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Complete a problem to see it here.
          </p>
        ) : (
          <ul className="mt-3 divide-y">
            {recent.map(([id, e]) => {
              const pr = PROBLEM_MAP[id];
              if (!pr) return null;
              return (
                <li key={id} className="flex items-center justify-between py-2 text-sm">
                  <a
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-foreground hover:text-primary"
                  >
                    {pr.title}
                  </a>
                  <span className="text-xs text-muted-foreground">
                    {new Date(e.completedAt!).toLocaleDateString()}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </AppShell>
  );
}

function DiffProgress({
  label,
  tone,
  solved,
  total,
  pct,
}: {
  label: string;
  tone: "easy" | "medium" | "hard";
  solved: number;
  total: number;
  pct: number;
}) {
  const toneMap = {
    easy: "text-easy-foreground bg-easy-bg",
    medium: "text-medium-foreground bg-medium-bg",
    hard: "text-hard-foreground bg-hard-bg",
  } as const;
  return (
    <div className="rounded-lg border bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${toneMap[tone]}`}>
          {label}
        </span>
        <span className="text-xs text-muted-foreground">{pct}%</span>
      </div>
      <div className="mt-2 text-lg font-semibold">
        {solved} <span className="text-sm text-muted-foreground">/ {total}</span>
      </div>
      <ProgressBar value={pct} className="mt-2" />
    </div>
  );
}
