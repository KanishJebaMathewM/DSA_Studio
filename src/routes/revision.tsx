import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProblemTable, type ProblemTableRow } from "@/components/ProblemTable";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { ALL_PLACEMENTS, PROBLEM_MAP } from "@/data/problems";
import { useProgress } from "@/lib/progress-store";
import { useGlobalSearch } from "@/lib/search-context";

export const Route = createFileRoute("/revision")({
  head: () => ({
    meta: [
      { title: "Revision Queue — DSA Studio" },
      { name: "description", content: "Problems flagged for revision and spaced practice." },
      { property: "og:title", content: "Revision Queue — DSA Studio" },
      { property: "og:description", content: "Problems flagged for revision and spaced practice." },
    ],
  }),
  component: RevisionPage,
});

function RevisionPage() {
  const progress = useProgress();
  const { query } = useGlobalSearch();
  const q = query.trim().toLowerCase();

  const ids = new Set<string>();
  const rows: ProblemTableRow[] = [];
  for (const pl of ALL_PLACEMENTS) {
    if (ids.has(pl.problemId)) continue;
    if (!progress[pl.problemId]?.needsRevision) continue;
    const pr = PROBLEM_MAP[pl.problemId];
    if (!pr) continue;
    if (q && !pr.title.toLowerCase().includes(q) && !pl.topicName.toLowerCase().includes(q))
      continue;
    ids.add(pl.problemId);
    rows.push({ problem: pr, pattern: `${pl.topicName} • ${pl.levelTitle}` });
  }

  return (
    <AppShell title="Revision Queue">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Revision Queue
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Problems marked for reinforcement. Spaced repetition solidifies algorithmic intuition.
            </p>
          </div>
          {rows.length > 0 && (
            <span className="self-start rounded-full border border-warning/25 bg-warning/10 px-3 py-1 font-mono text-xs font-semibold text-warning tabular-nums sm:self-auto">
              {rows.length} {rows.length === 1 ? "problem" : "problems"} to revisit
            </span>
          )}
        </div>

        {rows.length === 0 ? (
          <EmptyState
            icon={<RotateCcw className="h-6 w-6 text-warning" />}
            title="All caught up!"
            description="You don't have any problems waiting in your revision queue. Mark tricky problems to revisit them later."
            action={
              <Link to="/practice">
                <Button className="gap-1.5 font-semibold">
                  <span>Practice More Problems</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            }
          />
        ) : (
          <ProblemTable rows={rows} />
        )}
      </div>
    </AppShell>
  );
}
