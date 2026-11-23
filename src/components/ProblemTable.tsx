import { Bookmark, Check, ExternalLink, RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DifficultyBadge } from "./DifficultyBadge";
import { PlatformBadge } from "./PlatformBadge";
import { ProblemNotes } from "./ProblemNotes";
import { hasNotes, progressRepo, useProgress } from "@/lib/progress-store";
import type { Problem } from "@/data/problems";

export interface ProblemTableRow {
  problem: Problem;
  pattern?: string; // optional level/category name
}

export function ProblemTable({
  rows,
  showNotes = false,
}: {
  rows: ProblemTableRow[];
  /** Show a short preview of each problem's notes under its title. */
  showNotes?: boolean;
}) {
  const progress = useProgress();

  if (rows.length === 0) return null;

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-lg border border-border/70 bg-surface shadow-xs backdrop-blur-md md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-surface-muted/80 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <th className="w-10 px-3 py-2.5"></th>
              <th className="px-3 py-2.5">Problem</th>
              <th className="w-24 px-3 py-2.5">Difficulty</th>
              <th className="w-20 px-3 py-2.5">Platform</th>
              <th className="w-16 px-3 py-2.5 text-center">Revision</th>
              <th className="w-20 px-3 py-2.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ problem }, i) => {
              const entry = progress[problem.id];
              const done = !!entry?.completed;
              const rev = !!entry?.needsRevision;
              const bookmarked = !!entry?.bookmarked;
              return (
                <tr
                  key={`${problem.id}-${i}`}
                  className="group border-b border-border/60 last:border-b-0 transition-colors duration-150 hover:bg-hover/80"
                >
                  <td className="px-3 py-2 align-middle">
                    <Checkbox
                      checked={done}
                      onCheckedChange={() => progressRepo.toggleCompleted(problem.id)}
                      aria-label={`Mark ${problem.title} as completed`}
                      className="transition-transform duration-150 active:scale-90 cursor-pointer"
                    />
                  </td>
                  <td className="px-3 py-2 align-middle">
                    <div className="flex items-center gap-2">
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium text-foreground transition-colors duration-150 hover:text-primary ${
                          done ? "text-muted-foreground" : ""
                        }`}
                      >
                        {problem.title}
                      </a>
                      {done && (
                        <Check aria-hidden="true" className="h-3.5 w-3.5 text-success animate-in fade-in-50 duration-200" />
                      )}
                      <div className="ml-auto flex items-center gap-2">
                        <ProblemNotes
                          problemId={problem.id}
                          problemTitle={problem.title}
                          variant="desktop"
                        />
                        <button
                          aria-label={`Bookmark ${problem.title}`}
                          aria-pressed={bookmarked}
                          onClick={() => progressRepo.toggleBookmarked(problem.id)}
                          className={`cursor-pointer transition-all duration-200 hover:scale-115 active:scale-90 focus-visible:opacity-100 ${
                            bookmarked
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <Bookmark
                            aria-hidden="true"
                            className={`h-3.5 w-3.5 transition-colors duration-150 ${
                              bookmarked
                                ? "fill-gold text-gold"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    {showNotes && hasNotes(entry?.notes) && (
                      <p className="mt-1 line-clamp-2 whitespace-pre-line text-xs text-muted-foreground">
                        {entry!.notes}
                      </p>
                    )}
                  </td>
                  <td className="px-3 py-2 align-middle">
                    <DifficultyBadge difficulty={problem.difficulty} />
                  </td>
                  <td className="px-3 py-2 align-middle">
                    <PlatformBadge platform={problem.platform} />
                  </td>
                  <td className="px-3 py-2 text-center align-middle">
                    <button
                      onClick={() => progressRepo.toggleNeedsRevision(problem.id)}
                      aria-label={`Mark ${problem.title} as needs revision`}
                      aria-pressed={rev}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-all duration-150 hover:bg-hover hover:text-foreground hover:scale-115 active:scale-90 cursor-pointer"
                    >
                      <RotateCcw
                        aria-hidden="true"
                        className={`h-3.5 w-3.5 transition-colors duration-150 ${
                          rev ? "text-warning" : ""
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-3 py-2 text-right align-middle">
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary-soft transition-all duration-150 hover:translate-x-0.5"
                    >
                      Solve
                      <ExternalLink aria-hidden="true" className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-2 md:hidden">
        {rows.map(({ problem }, i) => {
          const entry = progress[problem.id];
          const done = !!entry?.completed;
          const rev = !!entry?.needsRevision;
          const bookmarked = !!entry?.bookmarked;
          return (
            <div
              key={`${problem.id}-m-${i}`}
              className="flex items-start gap-3 rounded-lg border border-border/60 bg-surface backdrop-blur-md p-3 transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
            >
              <Checkbox
                checked={done}
                onCheckedChange={() => progressRepo.toggleCompleted(problem.id)}
                aria-label={`Mark ${problem.title} as completed`}
                className="mt-0.5 transition-transform duration-150 active:scale-90 cursor-pointer"
              />
              <div className="min-w-0 flex-1">
                <a
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {problem.title}
                </a>
                <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                  <DifficultyBadge difficulty={problem.difficulty} />
                  <PlatformBadge platform={problem.platform} />
                </div>
                {showNotes && hasNotes(entry?.notes) && (
                  <p className="mt-1.5 line-clamp-2 whitespace-pre-line text-xs text-muted-foreground">
                    {entry!.notes}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <ProblemNotes
                  problemId={problem.id}
                  problemTitle={problem.title}
                  variant="mobile"
                />
                <button
                  aria-label={`Bookmark ${problem.title}`}
                  aria-pressed={bookmarked}
                  onClick={() => progressRepo.toggleBookmarked(problem.id)}
                  className="transition-transform duration-150 hover:scale-115 active:scale-90 cursor-pointer"
                >
                  <Bookmark
                    aria-hidden="true"
                    className={`h-4 w-4 transition-colors ${
                      bookmarked ? "fill-gold text-gold" : "text-muted-foreground"
                    }`}
                  />
                </button>
                <button
                  aria-label={`Mark ${problem.title} as needs revision`}
                  aria-pressed={rev}
                  onClick={() => progressRepo.toggleNeedsRevision(problem.id)}
                  className="transition-transform duration-150 hover:scale-115 active:scale-90 cursor-pointer"
                >
                  <RotateCcw
                    aria-hidden="true"
                    className={`h-4 w-4 transition-colors ${rev ? "text-warning" : "text-muted-foreground"}`}
                  />
                </button>
                <a
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 text-xs font-medium text-primary hover:underline"
                >
                  Solve ↗
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}