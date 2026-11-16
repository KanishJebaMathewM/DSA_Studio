import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProblemTable, type ProblemTableRow } from "@/components/ProblemTable";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { ALL_PLACEMENTS, PROBLEM_MAP } from "@/data/problems";
import { useProgress } from "@/lib/progress-store";
import { useGlobalSearch } from "@/lib/search-context";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({
    meta: [
      { title: "Bookmarks — DSA Studio" },
      { name: "description", content: "Bookmarked DSA problems for quick reference." },
      { property: "og:title", content: "Bookmarks — DSA Studio" },
      { property: "og:description", content: "Bookmarked DSA problems for quick reference." },
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
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Bookmarked Problems
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your starred challenges saved for quick access and deep-dive review.
            </p>
          </div>
          {rows.length > 0 && (
            <span className="self-start rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold text-amber-500 tabular-nums sm:self-auto">
              {rows.length} {rows.length === 1 ? "problem" : "problems"} saved
            </span>
          )}
        </div>

        {rows.length === 0 ? (
          <EmptyState
            icon={<Bookmark className="h-6 w-6 text-amber-500" />}
            title="No bookmarked problems yet"
            description="Star any problem from your practice topics to keep it here for quick access."
            action={
              <Link to="/practice">
                <Button className="gap-1.5 font-semibold">
                  <span>Explore Practice Tracks</span>
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
