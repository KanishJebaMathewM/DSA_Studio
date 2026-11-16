import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { ProblemTable, type ProblemTableRow } from "./ProblemTable";
import { ProgressBar } from "./ProgressBar";
import { useProgress } from "@/lib/progress-store";
import type { Level } from "@/data/problems";
import { PROBLEM_MAP } from "@/data/problems";

export function LevelAccordion({
  level,
  isOpen,
  onToggle,
  defaultOpen = false,
}: {
  level: Level;
  isOpen?: boolean;
  onToggle?: () => void;
  defaultOpen?: boolean;
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const progress = useProgress();

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen((o) => !o);
    }
  };

  const rows: ProblemTableRow[] = level.problems.map((lp) => ({
    problem: PROBLEM_MAP[lp.id],
    pattern: level.title,
  }));

  const total = rows.length;
  const solved = rows.filter((r) => progress[r.problem.id]?.completed).length;
  const pct = total ? Math.round((solved / total) * 100) : 0;
  const done = solved === total && total > 0;

  return (
    <div
      className={`premium-card overflow-hidden rounded-xl border transition-all duration-200 ${
        open ? "border-primary/40 shadow-sm" : "border-border/70"
      }`}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-controls={`accordion-panel-${level.number}`}
        id={`accordion-header-${level.number}`}
        className={`flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors select-none ${
          open ? "bg-surface-muted/30" : "hover:bg-hover"
        }`}
      >
        <div
          className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-bold tabular-nums transition-colors ${
            open
              ? "border-primary/40 bg-primary/15 text-primary shadow-xs"
              : "border-primary/20 bg-primary-soft text-primary"
          }`}
        >
          L{level.number}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`font-display text-sm font-semibold tracking-tight transition-colors ${
                open ? "text-primary" : "text-foreground"
              }`}
            >
              {level.title}
            </span>
            {done ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/15 px-2 py-0.2 font-accent text-[10px] font-semibold text-success">
                <Check className="h-3 w-3" />
                Completed
              </span>
            ) : null}
          </div>
          <div className="mt-1.5 flex items-center gap-3">
            <ProgressBar value={pct} className="max-w-[200px] h-1.5" />
            <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
              {solved} / {total} solved
            </span>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      <div
        id={`accordion-panel-${level.number}`}
        role="region"
        aria-labelledby={`accordion-header-${level.number}`}
        className={`accordion-collapse-grid ${open ? "is-open" : ""}`}
      >
        <div>
          <div className="border-t border-border/70 bg-background/50 p-3 md:p-4">
            <ProblemTable rows={rows} />
          </div>
        </div>
      </div>
    </div>
  );
}
