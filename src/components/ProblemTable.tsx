import { Bookmark, Check, ExternalLink, RotateCcw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DifficultyBadge } from "./DifficultyBadge";
import { PlatformBadge } from "./PlatformBadge";
import { progressRepo, useProgress } from "@/lib/progress-store";
import type { Problem } from "@/data/problems";

export interface ProblemTableRow {
  problem: Problem;
  pattern?: string; // optional level/category name
}

export function ProblemTable({ rows }: { rows: ProblemTableRow[] }) {
  const progress = useProgress();

  if (rows.length === 0) return null;

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-border/70 bg-surface shadow-xs md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/70 bg-surface-muted/50 text-left font-accent text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="w-11 px-3.5 py-3"></th>
              <th className="px-3.5 py-3">Problem Title</th>
              <th className="w-28 px-3.5 py-3">Difficulty</th>
              <th className="w-24 px-3.5 py-3">Platform</th>
              <th className="w-20 px-3.5 py-3 text-center">Revision</th>
              <th className="w-24 px-3.5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map(({ problem }, i) => {
              const entry = progress[problem.id];
              const done = !!entry?.completed;
              const rev = !!entry?.needsRevision;
              const bookmarked = !!entry?.bookmarked;
              return (
                <tr
                  key={`${problem.id}-${i}`}
                  className={`group transition-colors duration-150 ${
                    done ? "bg-surface-muted/20 hover:bg-surface-muted/40" : "hover:bg-hover"
                  }`}
                >
                  <td className="px-3.5 py-2.5 align-middle">
                    <Checkbox
                      checked={done}
                      onCheckedChange={() => progressRepo.toggleCompleted(problem.id)}
                      aria-label="Mark completed"
                      className="transition-transform active:scale-95"
                    />
                  </td>
                  <td className="px-3.5 py-2.5 align-middle">
                    <div className="flex items-center gap-2">
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium transition-colors hover:text-primary ${
                          done
                            ? "text-muted-foreground/80 line-through decoration-muted-foreground/40"
                            : "text-foreground"
                        }`}
                      >
                        {problem.title}
                      </a>
                      {done && (
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                      <button
                        title={bookmarked ? "Remove bookmark" : "Bookmark problem"}
                        aria-label="Toggle bookmark"
                        onClick={() => progressRepo.toggleBookmarked(problem.id)}
                        className={`ml-auto rounded p-1 transition-opacity group-hover:opacity-100 ${
                          bookmarked ? "opacity-100" : "opacity-0 hover:bg-hover"
                        }`}
                      >
                        <Bookmark
                          className={`h-3.5 w-3.5 transition-transform active:scale-125 ${
                            bookmarked
                              ? "fill-amber-400 text-amber-500"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-3.5 py-2.5 align-middle">
                    <DifficultyBadge difficulty={problem.difficulty} />
                  </td>
                  <td className="px-3.5 py-2.5 align-middle">
                    <PlatformBadge platform={problem.platform} />
                  </td>
                  <td className="px-3.5 py-2.5 text-center align-middle">
                    <button
                      onClick={() => progressRepo.toggleNeedsRevision(problem.id)}
                      title={rev ? "Remove from revision" : "Flag for revision"}
                      aria-label="Toggle needs revision"
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                        rev
                          ? "bg-amber-500/15 text-amber-500"
                          : "text-muted-foreground hover:bg-hover hover:text-foreground"
                      }`}
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </td>
                  <td className="px-3.5 py-2.5 text-right align-middle">
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface px-2.5 py-1 font-accent text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary-soft hover:text-primary"
                    >
                      Solve
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-2.5 md:hidden">
        {rows.map(({ problem }, i) => {
          const entry = progress[problem.id];
          const done = !!entry?.completed;
          const rev = !!entry?.needsRevision;
          const bookmarked = !!entry?.bookmarked;
          return (
            <div
              key={`${problem.id}-m-${i}`}
              className={`rounded-xl border border-border/70 p-3.5 transition-colors ${
                done ? "bg-surface-muted/30" : "bg-surface"
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={done}
                  onCheckedChange={() => progressRepo.toggleCompleted(problem.id)}
                  className="mt-1"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`truncate text-sm font-semibold transition-colors ${
                        done ? "text-muted-foreground line-through" : "text-foreground"
                      }`}
                    >
                      {problem.title}
                    </a>
                    {done && <Check className="h-3.5 w-3.5 text-success shrink-0" />}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <DifficultyBadge difficulty={problem.difficulty} />
                    <PlatformBadge platform={problem.platform} />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => progressRepo.toggleBookmarked(problem.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-hover"
                    aria-label="Bookmark"
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        bookmarked ? "fill-amber-400 text-amber-500" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => progressRepo.toggleNeedsRevision(problem.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-hover"
                    aria-label="Revision"
                  >
                    <RotateCcw
                      className={`h-4 w-4 ${rev ? "text-amber-500" : "text-muted-foreground"}`}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex justify-end border-t border-border/50 pt-2.5">
                <a
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md bg-primary-soft px-3 py-1 text-xs font-semibold text-primary"
                >
                  Solve on {problem.platform}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
