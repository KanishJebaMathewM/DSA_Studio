import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function VisualizationControls({
  index,
  total,
  playing,
  speed,
  atStart,
  atEnd,
  onToggle,
  onNext,
  onPrev,
  onReset,
  onSpeedChange,
}: {
  index: number;
  total: number;
  playing: boolean;
  speed: number;
  atStart: boolean;
  atEnd: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border/70 bg-surface-muted/60 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          onClick={onToggle}
          aria-label={playing ? "Pause execution" : "Play execution"}
        >
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          {playing ? "Pause" : atEnd ? "Replay" : "Play"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onPrev}
          disabled={atStart}
          aria-label="Previous step"
        >
          <SkipBack aria-hidden="true" />
          Prev
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={onNext}
          disabled={atEnd}
          aria-label="Next step"
        >
          Next
          <SkipForward aria-hidden="true" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={onReset}
          disabled={atStart && !playing}
          aria-label="Reset visualization"
        >
          <RotateCcw aria-hidden="true" />
          Reset
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
          Step {index + 1} / {total}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Speed</span>
          <Slider
            value={[speed]}
            min={0.5}
            max={3}
            step={0.5}
            onValueChange={(values) => onSpeedChange(values[0] ?? 1)}
            aria-label="Execution speed"
            className="w-24"
          />
          <span className="w-8 shrink-0 text-xs font-medium tabular-nums">{speed}x</span>
        </div>
      </div>
    </div>
  );
}
