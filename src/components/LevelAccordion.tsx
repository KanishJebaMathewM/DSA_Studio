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

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen((o) => !o);
    }
  };

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
    <div className="overflow-hidden rounded-lg border border-border/70 bg-surface shadow-xs backdrop-blur-md transition-colors duration-200">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        aria-controls={`level-panel-${level.number}`}
        className="group flex w-full items-center gap-4 px-4 py-3 text-left hover:bg-hover/80 transition-colors duration-150 cursor-pointer"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-xs font-semibold text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
          {level.number}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
              Level {level.number} — {level.title}
            </span>
            {done && (
              <Check aria-hidden="true" className="h-3.5 w-3.5 text-success" />
            )}
          </div>
          <div className="mt-1.5 flex items-center gap-3">
            <ProgressBar
              value={pct}
              label={`Level ${level.number} progress`}
              className="max-w-[240px]"
            />
            <span className="shrink-0 text-xs text-muted-foreground">
              {solved} / {total} completed
            </span>
          </div>
        </div>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out ${
            open ? "rotate-180 text-foreground" : "group-hover:text-foreground"
          }`}
        />
      </button>
      {open && (
        <div
          id={`level-panel-${level.number}`}
          className="border-t border-border/50 bg-surface/40 backdrop-blur-md p-3 md:p-4 animate-in fade-in-50 duration-200"
        >
          <ProblemTable rows={rows} />
        </div>
      )}
    </div>
  );
}
