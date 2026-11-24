import { createFileRoute } from "@tanstack/react-router";
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
      { title: "Revision — DSA Studio" },
      { name: "description", content: "Problems flagged for revision." },
      { property: "og:title", content: "Revision — DSA Studio" },
      { property: "og:description", content: "Problems flagged for revision." },
    ],
  }),
  component: RevisionPage,
});

function RevisionPage() {
  const progress = useProgress();
  const { query, setQuery } = useGlobalSearch();
  const q = query.trim().toLowerCase();

  const seenMatching = new Set<string>();
  const seenRevision = new Set<string>();
  const rows: ProblemTableRow[] = [];

  for (const pl of ALL_PLACEMENTS) {
    if (!progress[pl.problemId]?.needsRevision) continue;
    const pr = PROBLEM_MAP[pl.problemId];
    if (!pr) continue;
    seenRevision.add(pl.problemId);

    if (seenMatching.has(pl.problemId)) continue;
    if (q && !pr.title.toLowerCase().includes(q) && !pl.topicName.toLowerCase().includes(q))
      continue;

    seenMatching.add(pl.problemId);
    rows.push({ problem: pr, pattern: `${pl.topicName} • ${pl.levelTitle}` });
  }

  const totalRevisionCount = seenRevision.size;

  return (
    <AppShell title="Revision">
      <div className="mb-[clamp(0.75rem,2vh,1.5rem)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-border/60 bg-card px-4 sm:px-5 py-[clamp(0.75rem,2vh,1.25rem)] shadow-sm backdrop-blur-md">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Needs Revision
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Problems you've marked to revisit. Click the revision icon on any row to add or remove
            it.
          </p>
        </div>
        {q && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuery("")}
            className="self-start sm:self-auto h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear search
          </Button>
        )}
      </div>
      {rows.length === 0 ? (
        totalRevisionCount > 0 && q ? (
          <EmptyState
            title="No revision problems match your search"
            description={`No revision problems match "${query}".`}
            action={
              <Button variant="outline" size="sm" onClick={() => setQuery("")}>
                Clear search
              </Button>
            }
          />
        ) : (
          <EmptyState
            title="No revision problems"
            description="You're caught up with your revision list."
          />
        )
      ) : (
        <ProblemTable rows={rows} showNotes />
      )}
    </AppShell>
  );
}
