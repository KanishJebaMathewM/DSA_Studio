import { Link } from "@tanstack/react-router";
import { BookOpen, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InteractiveVisualizer } from "./InteractiveVisualizer";
import type { VisualizationDefinition } from "@/lib/visualizations/types";

export function VisualizationDialog({
  definition,
  open,
  onOpenChange,
}: {
  definition: VisualizationDefinition;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const primaryResource = definition.theory.resources[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100%-1rem)] max-w-3xl overflow-y-auto p-4 sm:p-6 bg-white dark:bg-surface text-slate-900 dark:text-foreground border border-border shadow-2xl">
        <DialogHeader className="space-y-2 border-b border-border/60 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
                {definition.name}
              </DialogTitle>
              <Badge variant="secondary" className="text-xs font-semibold">
                {definition.algorithm}
              </Badge>
            </div>
            <Button
              asChild
              variant="default"
              size="sm"
              className="h-8 gap-1.5 text-xs font-medium cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              <Link to="/visualizations/$id" params={{ id: definition.id }}>
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Dedicated Learning Page</span>
              </Link>
            </Button>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {definition.description}
          </DialogDescription>
        </DialogHeader>

        {/* Quick Concept & Complexity Pill Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border/70 bg-surface-muted/60 p-2.5 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-muted-foreground">Time Complexity:</span>
            <span className="rounded bg-primary-soft px-1.5 py-0.5 font-mono text-[11px] font-semibold text-primary">
              {definition.theory.complexity.timeWorst}
            </span>
            <span className="font-semibold text-muted-foreground ml-1">Space:</span>
            <span className="rounded bg-primary-soft px-1.5 py-0.5 font-mono text-[11px] font-semibold text-primary">
              {definition.theory.complexity.space}
            </span>
          </div>

          {primaryResource && (
            <a
              href={primaryResource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
              title={`Read about ${definition.name} on ${primaryResource.source}`}
            >
              <span>{primaryResource.source} Guide</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
        </div>

        {/* Interactive Visualization Engine & Step Controls */}
        <InteractiveVisualizer definition={definition} />
      </DialogContent>
    </Dialog>
  );
}
