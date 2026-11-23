import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useStepPlayer } from "@/hooks/use-step-player";
import { GraphVisualization } from "./GraphVisualization";
import { SortingVisualization } from "./SortingVisualization";
import { VisualizationControls } from "./VisualizationControls";
import type {
  GraphInput,
  GraphStep,
  SortingInput,
  SortingStep,
  VisualizationDefinition,
} from "@/lib/visualizations/types";

export function VisualizationDialog({
  definition,
  open,
  onOpenChange,
}: {
  definition: VisualizationDefinition;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [input, setInput] = useState<GraphInput | SortingInput>(definition.defaultInput);
  const [raw, setRaw] = useState(definition.defaultValueText);
  const [error, setError] = useState<string | null>(null);
  const [speed, setSpeed] = useState(1);
  const [customOpen, setCustomOpen] = useState(false);

  const steps = useMemo(() => {
    if (definition.kind === "graph") {
      return definition.generateSteps(input as GraphInput) as GraphStep[];
    }
    return definition.generateSteps(input as SortingInput) as SortingStep[];
  }, [definition, input]);

  const player = useStepPlayer(steps.length, speed);
  const step = steps[Math.min(player.index, steps.length - 1)];

  const applyCustomInput = () => {
    const result = definition.parseInput(raw);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    setInput(result.input);
    setCustomOpen(false);
  };

  const restoreDefault = () => {
    setInput(definition.defaultInput);
    setRaw(definition.defaultValueText);
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100%-1rem)] max-w-3xl overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>{definition.name}</DialogTitle>
          <DialogDescription>{definition.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {definition.kind === "graph" && step ? (
            <GraphVisualization input={input as GraphInput} step={step as GraphStep} />
          ) : step ? (
            <SortingVisualization input={input as SortingInput} step={step as SortingStep} />
          ) : null}

          <div
            className="rounded-lg border border-border/60 bg-surface-muted/50 px-3 py-2 text-sm text-foreground"
            role="status"
            aria-live="polite"
          >
            {step?.message}
          </div>

          <VisualizationControls
            index={player.index}
            total={steps.length}
            playing={player.playing}
            speed={speed}
            atStart={player.atStart}
            atEnd={player.atEnd}
            onToggle={player.toggle}
            onNext={player.next}
            onPrev={player.prev}
            onReset={player.reset}
            onSpeedChange={setSpeed}
          />

          <Collapsible open={customOpen} onOpenChange={setCustomOpen}>
            <CollapsibleTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full justify-between text-muted-foreground"
              >
                Custom input
                <ChevronDown
                  aria-hidden="true"
                  className={`transition-transform ${customOpen ? "rotate-180" : ""}`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="space-y-2">
                <label htmlFor="visualization-input" className="text-xs font-medium">
                  {definition.inputHint}
                </label>
                <Textarea
                  id="visualization-input"
                  value={raw}
                  onChange={(e) => {
                    setRaw(e.target.value);
                    if (error) setError(null);
                  }}
                  rows={3}
                  className="font-mono text-sm"
                  aria-invalid={!!error}
                  aria-describedby={error ? "visualization-input-error" : undefined}
                />
                {error && (
                  <p id="visualization-input-error" className="text-xs text-destructive">
                    {error}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" onClick={applyCustomInput}>
                    Apply input
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={restoreDefault}>
                    Restore default
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </DialogContent>
    </Dialog>
  );
}
