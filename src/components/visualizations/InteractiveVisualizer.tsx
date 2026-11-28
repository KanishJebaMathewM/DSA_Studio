import { useMemo, useState } from "react";
import { ChevronDown, RotateCcw, Sparkles } from "lucide-react";
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

export function InteractiveVisualizer({
  definition,
  className = "",
}: {
  definition: VisualizationDefinition;
  className?: string;
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
    <div className={`space-y-3.5 ${className}`}>
      {/* Visual Canvas Area */}
      {definition.kind === "graph" && step ? (
        <GraphVisualization input={input as GraphInput} step={step as GraphStep} />
      ) : step ? (
        <SortingVisualization input={input as SortingInput} step={step as SortingStep} />
      ) : null}

      {/* Step Explanation Status Banner */}
      <div
        className="rounded-lg border border-border/80 bg-surface-muted/80 px-3.5 py-2.5 text-sm text-foreground shadow-xs"
        role="status"
        aria-live="polite"
      >
        <span className="font-semibold text-primary mr-1.5">Step {player.index + 1}:</span>
        {step?.message}
      </div>

      {/* Playback Controls */}
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

      {/* Custom Input Accordion */}
      <Collapsible
        open={customOpen}
        onOpenChange={setCustomOpen}
        className="rounded-lg border border-border/70 bg-surface/80 p-3"
      >
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full justify-between text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Custom input configuration
            </span>
            <ChevronDown
              aria-hidden="true"
              className={`h-4 w-4 transition-transform ${customOpen ? "rotate-180" : ""}`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="space-y-2">
            <label
              htmlFor={`visualization-input-${definition.id}`}
              className="text-xs font-medium text-foreground"
            >
              {definition.inputHint}
            </label>
            <Textarea
              id={`visualization-input-${definition.id}`}
              value={raw}
              onChange={(e) => {
                setRaw(e.target.value);
                if (error) setError(null);
              }}
              rows={3}
              className="font-mono text-xs bg-surface border-border text-foreground"
              aria-invalid={!!error}
              aria-describedby={error ? `visualization-input-error-${definition.id}` : undefined}
            />
            {error && (
              <p
                id={`visualization-input-error-${definition.id}`}
                className="text-xs font-medium text-destructive"
              >
                {error}
              </p>
            )}
            <div className="flex flex-wrap gap-2 pt-1">
              <Button type="button" size="sm" onClick={applyCustomInput}>
                Apply input
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={restoreDefault}>
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Restore default
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
