import type { SortingInput, SortingStep } from "@/lib/visualizations/types";

export function SortingVisualization({ input, step }: { input: SortingInput; step: SortingStep }) {
  const maxMagnitude = Math.max(1, ...step.array.map((v) => Math.abs(v)));
  const comparing = new Set(step.comparing ?? []);
  const sorted = new Set(step.sortedIndices);

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-border/70 bg-surface p-3">
        <div
          className="flex h-52 items-end justify-center gap-1.5 sm:h-64 sm:gap-2"
          role="img"
          aria-label="Sorting visualization"
        >
          {step.array.map((value, i) => {
            const height = Math.max(4, (Math.abs(value) / maxMagnitude) * 100);
            const isComparing = comparing.has(i);
            const isSorted = sorted.has(i);
            const color = isComparing ? "bg-warning" : isSorted ? "bg-success" : "bg-primary/70";
            return (
              <div
                key={`${i}-${input.values.length}`}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1"
              >
                <span className="text-[10px] font-medium tabular-nums text-muted-foreground sm:text-xs">
                  {value}
                </span>
                <div
                  className={`w-full max-w-10 rounded-t transition-all duration-200 ${color}`}
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] tabular-nums text-muted-foreground/70">{i}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <LegendItem className="bg-primary/70" label="Unsorted" />
        <LegendItem className="bg-warning" label="Comparing" />
        <LegendItem className="bg-success" label="Sorted" />
      </div>

      <div className="rounded-lg border border-border/60 bg-surface-muted/50 p-2.5">
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Array state
        </div>
        <p className="break-words font-mono text-xs text-foreground">[{step.array.join(", ")}]</p>
      </div>
    </div>
  );
}

function LegendItem({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-3 w-3 rounded-sm ${className}`} />
      {label}
    </span>
  );
}
