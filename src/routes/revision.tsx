import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ProblemTable, type ProblemTableRow } from "@/components/ProblemTable";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [topic, setTopic] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [view, setView] = useState("list");
  const q = query.trim().toLowerCase();
  const filtersActive = q !== "" || topic !== "all" || difficulty !== "all";

  const seenMatching = new Set<string>();
  const seenRevision = new Set<string>();
  const topics = new Map<string, string>();
  const rows: ProblemTableRow[] = [];
  const groups = new Map<string, { name: string; rows: ProblemTableRow[] }>();

  for (const pl of ALL_PLACEMENTS) {
    if (!progress[pl.problemId]?.needsRevision) continue;
    const pr = PROBLEM_MAP[pl.problemId];
    if (!pr) continue;
    seenRevision.add(pl.problemId);
    topics.set(pl.topicSlug, pl.topicName);

    if (seenMatching.has(pl.problemId)) continue;
    if (topic !== "all" && pl.topicSlug !== topic) continue;
    if (difficulty !== "all" && pr.difficulty !== difficulty) continue;
    if (q && !pr.title.toLowerCase().includes(q) && !pl.topicName.toLowerCase().includes(q))
      continue;

    seenMatching.add(pl.problemId);
    const row = { problem: pr, pattern: `${pl.topicName} • ${pl.levelTitle}` };
    rows.push(row);
    if (view === "topic") {
      const group = groups.get(pl.topicSlug) ?? { name: pl.topicName, rows: [] };
      group.rows.push(row);
      groups.set(pl.topicSlug, group);
    }
  }

  const totalRevisionCount = seenRevision.size;
  // Keep the selected option available if its last flagged problem is removed.
  if (topic !== "all" && !topics.has(topic)) {
    const placement = ALL_PLACEMENTS.find((entry) => entry.topicSlug === topic);
    if (placement) topics.set(topic, placement.topicName);
  }
  const controls = [
    {
      label: "Topic",
      value: topic,
      onChange: setTopic,
      options: [["all", "All topics"], ...topics],
    },
    {
      label: "Difficulty",
      value: difficulty,
      onChange: setDifficulty,
      options: [
        ["all", "All difficulties"],
        ["Easy", "Easy"],
        ["Medium", "Medium"],
        ["Hard", "Hard"],
      ],
    },
    {
      label: "View",
      value: view,
      onChange: setView,
      options: [
        ["list", "List view"],
        ["topic", "Group by topic"],
      ],
    },
  ];

  const clearFilters = () => {
    setQuery("");
    setTopic("all");
    setDifficulty("all");
  };

  return (
    <AppShell title="Revision">
      <div className="mb-[clamp(0.75rem,2vh,1.5rem)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-border/60 bg-card px-4 sm:px-5 py-[clamp(0.75rem,2vh,1.25rem)] shadow-sm backdrop-blur-md card-glass-line hover-lift-glow">
        <div>
          <h2 className="text-fluid-2xl font-bold tracking-tight text-foreground">
            Needs Revision
          </h2>
          <p className="mt-1 text-fluid-sm text-muted-foreground">
            Problems you've marked to revisit. Click the revision icon on any row to add or remove
            it.
          </p>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {controls.map(({ label, value, onChange, options }) => (
          <Select key={label} value={value} onValueChange={onChange}>
            <SelectTrigger
              aria-label={label}
              className="h-[var(--ctrl-md)] w-auto min-w-32 max-w-full gap-2 bg-surface text-fluid-xs"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-w-[calc(100vw-2rem)]">
              {options.map(([id, name]) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
        {filtersActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-[var(--ctrl-md)] text-fluid-xs text-muted-foreground hover:text-foreground"
          >
            Clear filters
          </Button>
        )}
        <p role="status" className="basis-full text-fluid-xs text-muted-foreground">
          Showing {rows.length} of {totalRevisionCount} revision problems
        </p>
      </div>
      {rows.length === 0 ? (
        filtersActive ? (
          <EmptyState
            title="No revision problems match your filters"
            description="Try another topic, difficulty or search term."
          />
        ) : (
          <EmptyState
            title="No revision problems"
            description="You're caught up with your revision list."
          />
        )
      ) : view === "topic" ? (
        <div className="space-y-5">
          {[...groups].map(([slug, group]) => (
            <section key={slug} aria-labelledby={`revision-topic-${slug}`}>
              <h3 id={`revision-topic-${slug}`} className="mb-2 text-fluid-sm font-semibold">
                {group.name} ({group.rows.length})
              </h3>
              <ProblemTable rows={group.rows} showNotes />
            </section>
          ))}
        </div>
      ) : (
        <ProblemTable rows={rows} showNotes />
      )}
    </AppShell>
  );
}
