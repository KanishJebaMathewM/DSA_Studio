import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ProblemTable, type ProblemTableRow } from "@/components/ProblemTable";
import { EmptyState } from "@/components/EmptyState";
import { ALL_PLACEMENTS, PROBLEM_MAP } from "@/data/problems";
import { useProgress } from "@/lib/progress-store";
import { useGlobalSearch } from "@/lib/search-context";

export const Route = createFileRoute("/revision")({
  head: () => ({
    meta: [
      { title: "Revision — DSA Sheet" },
      { name: "description", content: "Problems flagged for revision." },
      { property: "og:title", content: "Revision — DSA Sheet" },
      { property: "og:description", content: "Problems flagged for revision." },
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
    <AppShell title="Revision">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Needs Revision</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Problems you've marked to revisit. Click the revision icon on any row to add or remove it.
        </p>
      </div>
      {rows.length === 0 ? (
        <EmptyState
          title="No revision problems"
          description="You're caught up with your revision list."
        />
      ) : (
        <ProblemTable rows={rows} />
      )}
    </AppShell>
  );
}
