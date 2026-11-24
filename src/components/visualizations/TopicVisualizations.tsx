import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getVisualizationsForTopic } from "@/lib/visualizations/registry";
import { VisualizationDialog } from "./VisualizationDialog";

export function TopicVisualizations({ topicSlug }: { topicSlug: string }) {
  const items = getVisualizationsForTopic(topicSlug);
  const [activeId, setActiveId] = useState<string | null>(null);

  if (items.length === 0) return null;

  const active = items.find((item) => item.id === activeId) ?? null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-border/60 pt-4">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Interactive Lab
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="inline-flex items-center rounded-md border border-border/80 bg-surface shadow-xs"
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 rounded-r-none border-r border-border/60 px-2.5 text-xs font-medium cursor-pointer"
              onClick={() => setActiveId(item.id)}
              aria-label={`Preview ${item.name} in modal`}
              title={`Quick preview of ${item.name}`}
            >
              <Eye className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>{item.algorithm}</span>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="h-8 gap-1 rounded-l-none px-2 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
              title={`Open dedicated ${item.name} learning page`}
            >
              <Link to="/visualizations/$id" params={{ id: item.id }}>
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Learn</span>
              </Link>
            </Button>
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
