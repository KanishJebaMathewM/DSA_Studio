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
      <div className="hidden overflow-hidden rounded-lg border bg-surface md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-surface-muted/60 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
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
                  className="group border-b border-border/60 last:border-b-0 transition-colors hover:bg-hover"
                >
                  <td className="px-3 py-2 align-middle">
                    <Checkbox
                      checked={done}
                      onCheckedChange={() => progressRepo.toggleCompleted(problem.id)}
                      aria-label="Mark completed"
                    />
                  </td>
                  <td className="px-3 py-2 align-middle">
                    <div className="flex items-center gap-2">
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium text-foreground hover:text-primary ${
                          done ? "text-muted-foreground" : ""
                        }`}
                      >
                        {problem.title}
                      </a>
                      {done && (
                        <Check className="h-3.5 w-3.5 text-success" />
                      )}
                      <button
                        aria-label="Toggle bookmark"
                        onClick={() => progressRepo.toggleBookmarked(problem.id)}
                        className={`ml-auto opacity-0 transition-opacity group-hover:opacity-100 ${
                          bookmarked ? "opacity-100" : ""
                        }`}
                      >
                        <Bookmark
                          className={`h-3.5 w-3.5 ${
                            bookmarked
                              ? "fill-gold text-gold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        />
                      </button>
                    </div>
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
                      aria-label="Toggle needs revision"
                      className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-hover hover:text-foreground"
                    >
                      <RotateCcw
                        className={`h-3.5 w-3.5 ${
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
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary-soft"
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
      <div className="space-y-2 md:hidden">
        {rows.map(({ problem }, i) => {
          const entry = progress[problem.id];
          const done = !!entry?.completed;
          const rev = !!entry?.needsRevision;
          const bookmarked = !!entry?.bookmarked;
          return (
            <div
              key={`${problem.id}-m-${i}`}
              className="flex items-start gap-3 rounded-lg border bg-surface p-3"
            >
              <Checkbox
                checked={done}
                onCheckedChange={() => progressRepo.toggleCompleted(problem.id)}
                className="mt-0.5"
              />
              <div className="min-w-0 flex-1">
                <a
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-sm font-medium text-foreground"
                >
                  {problem.title}
                </a>
                <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                  <DifficultyBadge difficulty={problem.difficulty} />
                  <PlatformBadge platform={problem.platform} />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <button onClick={() => progressRepo.toggleBookmarked(problem.id)}>
                  <Bookmark
                    className={`h-4 w-4 ${
                      bookmarked ? "fill-gold text-gold" : "text-muted-foreground"
                    }`}
                  />
                </button>
                <button onClick={() => progressRepo.toggleNeedsRevision(problem.id)}>
                  <RotateCcw
                    className={`h-4 w-4 ${rev ? "text-warning" : "text-muted-foreground"}`}
                  />
                </button>
                <a
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-xs font-medium text-primary"
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
