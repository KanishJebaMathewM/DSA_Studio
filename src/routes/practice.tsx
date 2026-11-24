import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ProgressBar } from "@/components/ProgressBar";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { TOPICS } from "@/data/problems";
import { useProgress } from "@/lib/progress-store";
import { useGlobalSearch } from "@/lib/search-context";
import { PracticeSkeleton } from "@/components/LoadingSkeletons";

function PracticePending() {
  return (
    <AppShell title="Practice">
      <PracticeSkeleton />
    </AppShell>
  );
}

export const Route = createFileRoute("/practice")({
  pendingComponent: PracticePending,
  head: () => ({
    meta: [
      { title: "Practice — DSA Studio" },
      { name: "description", content: "Browse DSA topics and pick a track to practice." },
      { property: "og:title", content: "Practice — DSA Studio" },
      { property: "og:description", content: "Choose a topic to start practicing." },
    ],
  }),
  component: PracticePage,
});

function PracticePage() {
  const progress = useProgress();
  const { query, setQuery } = useGlobalSearch();
  const q = query.trim().toLowerCase();

  const filteredTopics = useMemo(() => {
    if (!q) return TOPICS;
    return TOPICS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.short.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q),
    );
  }, [q]);

  return (
    <AppShell title="Practice">
      <div className="mb-[clamp(0.75rem,2vh,1.5rem)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-border/60 bg-card px-4 sm:px-5 py-[clamp(0.75rem,2vh,1.25rem)] shadow-sm backdrop-blur-md card-glass-line hover-lift-glow">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Topics</h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Structured practice tracks organized by pattern and level.
          </p>
        </div>
        {q && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground self-start sm:self-auto">
            <span>
              Showing {filteredTopics.length} of {TOPICS.length} topics
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuery("")}
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear search
            </Button>
          </div>
        )}
      </div>

      {filteredTopics.length === 0 ? (
        <EmptyState
          title="No topics match your search"
          description={`No topics found matching "${query}". Try adjusting your keywords.`}
          action={
            <Button variant="outline" size="sm" onClick={() => setQuery("")}>
              Clear search
            </Button>
          }
        />
      ) : (
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredTopics.map((t) => {
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
                className="group relative rounded-xl border border-border/70 bg-surface backdrop-blur-md p-4 sm:p-5 shadow-xs transition-all duration-250 ease-out hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 card-glass-line hover-lift-glow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                      {t.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">{t.short}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-all duration-200 ease-out group-hover:text-primary group-hover:translate-x-1" />
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
      )}
    </AppShell>
  );
}
