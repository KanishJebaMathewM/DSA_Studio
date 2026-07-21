import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ProblemTable, type ProblemTableRow } from "@/components/ProblemTable";
import { EmptyState } from "@/components/EmptyState";
import { ALL_PLACEMENTS, PROBLEM_MAP } from "@/data/problems";
import { useProgress } from "@/lib/progress-store";
import { useGlobalSearch } from "@/lib/search-context";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({
    meta: [
      { title: "Bookmarks — DSA Sheet" },
      { name: "description", content: "Bookmarked DSA problems." },
      { property: "og:title", content: "Bookmarks — DSA Sheet" },
      { property: "og:description", content: "Bookmarked DSA problems." },
    ],
  }),
  component: BookmarksPage,
});

function BookmarksPage() {
  const progress = useProgress();
  const { query } = useGlobalSearch();
  const q = query.trim().toLowerCase();

  const seen = new Set<string>();
  const rows: ProblemTableRow[] = [];
  for (const pl of ALL_PLACEMENTS) {
    if (seen.has(pl.problemId)) continue;
    if (!progress[pl.problemId]?.bookmarked) continue;
    const pr = PROBLEM_MAP[pl.problemId];
    if (!pr) continue;
    if (q && !pr.title.toLowerCase().includes(q)) continue;
    seen.add(pl.problemId);
    rows.push({ problem: pr, pattern: `${pl.topicName} • ${pl.levelTitle}` });
  }

  return (
    <AppShell title="Bookmarks">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Bookmarks</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Save problems for quick access. Toggle the bookmark icon on any row.
        </p>
      </div>
      {rows.length === 0 ? (
        <EmptyState
          title="No bookmarks yet"
          description="Star problems from any topic to keep them here for quick access."
        />
      ) : (
        <ProblemTable rows={rows} />
      )}
    </AppShell>
  );
}
