import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { ProblemTable, type ProblemTableRow } from "./ProblemTable";
import { ProgressBar } from "./ProgressBar";
import { useProgress } from "@/lib/progress-store";
import type { Level } from "@/data/problems";
import { PROBLEM_MAP } from "@/data/problems";

export function LevelAccordion({
  level,
  defaultOpen = false,
}: {
  level: Level;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const progress = useProgress();

  const rows: ProblemTableRow[] = level.problems.map((lp) => ({
    problem: PROBLEM_MAP[lp.id],
    pattern: level.title,
  }));

  const total = rows.length;
  const solved = rows.filter((r) => progress[r.problem.id]?.completed).length;
  const pct = total ? Math.round((solved / total) * 100) : 0;
  const done = solved === total && total > 0;

  return (
    <div className="overflow-hidden rounded-lg border bg-surface">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 px-4 py-3 text-left hover:bg-hover"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-xs font-semibold text-primary">
          {level.number}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              Level {level.number} — {level.title}
            </span>
            {done && <Check className="h-3.5 w-3.5 text-success" />}
          </div>
          <div className="mt-1.5 flex items-center gap-3">
            <ProgressBar value={pct} className="max-w-[240px]" />
            <span className="shrink-0 text-xs text-muted-foreground">
              {solved} / {total} completed
            </span>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="border-t bg-background p-3 md:p-4">
          <ProblemTable rows={rows} />
        </div>
      )}
    </div>
  );
}
