import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Eye, Sparkles } from "lucide-react";
import { getVisualizationsForTopic } from "@/lib/visualizations/registry";
import { VisualizationDialog } from "./VisualizationDialog";

export function TopicVisualizations({ topicSlug }: { topicSlug: string }) {
  const items = getVisualizationsForTopic(topicSlug);
  const [activeId, setActiveId] = useState<string | null>(null);

  if (items.length === 0) return null;

  const active = items.find((item) => item.id === activeId) ?? null;

  return (
    <div className="flex flex-col gap-2 shrink-0 md:items-end md:self-start">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        <span>Interactive Lab</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:justify-end">
        {items.map((item) => (
          <div
            key={item.id}
            className="group inline-flex items-center rounded-lg border border-border/80 bg-surface/90 p-0.5 shadow-xs transition-all hover:border-primary/50 hover:shadow-sm backdrop-blur-xs"
          >
            {/* Quick Interactive Preview Trigger */}
            <button
              type="button"
              onClick={() => setActiveId(item.id)}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-primary-soft hover:text-primary transition-colors cursor-pointer"
              title={`Open interactive ${item.name} modal`}
              aria-label={`Visualize ${item.name}`}
            >
              <Eye className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>{item.algorithm}</span>
            </button>

            <span className="h-3.5 w-px bg-border/80" aria-hidden="true" />

            {/* Dedicated Page Guide Link */}
            <Link
              to="/visualizations/$id"
              params={{ id: item.id }}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              title={`Read ${item.name} learning guide & theory`}
            >
              <BookOpen className="h-3 w-3" aria-hidden="true" />
              <span>Learn</span>
            </Link>
          </div>
        ))}
      </div>

      {active && (
        <VisualizationDialog
          key={active.id}
          definition={active}
          open={!!active}
          onOpenChange={(open) => {
            if (!open) setActiveId(null);
          }}
        />
      )}
    </div>
  );
}
