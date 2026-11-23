import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getVisualizationsForTopic } from "@/lib/visualizations/registry";
import { VisualizationDialog } from "./VisualizationDialog";

export function TopicVisualizations({ topicSlug }: { topicSlug: string }) {
  const items = getVisualizationsForTopic(topicSlug);
  const [activeId, setActiveId] = useState<string | null>(null);

  if (items.length === 0) return null;

  const active = items.find((item) => item.id === activeId) ?? null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/50 pt-4">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Visualize
      </span>
      {items.map((item) => (
        <Button
          key={item.id}
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setActiveId(item.id)}
          aria-label={`Visualize ${item.name}`}
        >
          <Eye aria-hidden="true" />
          {item.algorithm}
        </Button>
      ))}
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
