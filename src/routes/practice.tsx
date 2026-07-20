import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProgressBar } from "@/components/ProgressBar";
import { TOPICS } from "@/data/problems";
import { useProgress } from "@/lib/progress-store";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice — DSA Sheet" },
      { name: "description", content: "Browse DSA topics and pick a track to practice." },
      { property: "og:title", content: "Practice — DSA Sheet" },
      { property: "og:description", content: "Choose a topic to start practicing." },
    ],
  }),
  component: PracticePage,
});

function PracticePage() {
  const progress = useProgress();

  return (
    <AppShell title="Practice">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Topics</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Structured practice tracks organized by pattern and level.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
              className="group rounded-lg border bg-surface p-5 transition-colors hover:border-primary/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {t.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{t.short}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {ts} / {tt} solved
                  </span>
                  <span>{tp}%</span>
                </div>
                <ProgressBar value={tp} />
              </div>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
