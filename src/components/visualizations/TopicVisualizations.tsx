import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getVisualizationsForTopic } from "@/lib/visualizations/registry";
import { VisualizationDialog } from "./VisualizationDialog";

export function TopicVisualizations({ topicSlug }: { topicSlug: string }) {
  const items = getVisualizationsForTopic(topicSlug);
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 shrink-0 md:items-end md:self-start">
      <Button
        type="button"
        variant="default"
        size="sm"
        onClick={() => setOpen(true)}
        className="h-8 gap-1.5 px-3 text-xs font-semibold shadow-xs cursor-pointer"
        title="Open interactive algorithm visualizer"
        aria-label="Visualize algorithms"
      >
        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Visualize</span>
      </Button>

      {open && (
        <VisualizationDialog
          items={items}
          open={open}
          onOpenChange={setOpen}
        />
      )}
    </div>
  );
}

