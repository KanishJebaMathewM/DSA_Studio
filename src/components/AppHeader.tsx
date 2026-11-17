import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Moon, Search, Sun, X } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { useGlobalSearch } from "@/lib/search-context";
import { useProgress } from "@/lib/progress-store";
import { ALL_PLACEMENTS, PROBLEM_MAP, UNIQUE_PROBLEM_IDS } from "@/data/problems";
import { ROADMAP } from "@/data/roadmap";
import { DifficultyBadge } from "./DifficultyBadge";
import { PlatformBadge } from "./PlatformBadge";

export function AppHeader({ title }: { title: string }) {
  const { theme, toggle } = useTheme();
  const { query, setQuery } = useGlobalSearch();
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const progress = useProgress();

  const total = UNIQUE_PROBLEM_IDS.length;
  const solved = UNIQUE_PROBLEM_IDS.filter((id) => progress[id]?.completed).length;
  const pct = total ? Math.round((solved / total) * 100) : 0;

  const trimmed = query.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!trimmed) return { topics: [], problems: [] };

    const topics = ROADMAP.filter(
      (r) =>
        r.name.toLowerCase().includes(trimmed) ||
        r.tagline.toLowerCase().includes(trimmed) ||
        r.slug.toLowerCase().includes(trimmed) ||
        r.phase.toLowerCase().includes(trimmed),
    ).slice(0, 4);

    const seenIds = new Set<string>();
    const problems: Array<{
      placement: (typeof ALL_PLACEMENTS)[0];
      problem: (typeof PROBLEM_MAP)[string];
    }> = [];

    for (const pl of ALL_PLACEMENTS) {
      if (seenIds.has(pl.problemId)) continue;
      const prob = PROBLEM_MAP[pl.problemId];
      if (!prob) continue;

      if (
        prob.title.toLowerCase().includes(trimmed) ||
        pl.topicName.toLowerCase().includes(trimmed) ||
        pl.levelTitle.toLowerCase().includes(trimmed) ||
        prob.difficulty.toLowerCase().includes(trimmed)
      ) {
        seenIds.add(pl.problemId);
        problems.push({ placement: pl, problem: prob });
        if (problems.length >= 8) break;
      }
    }

    return { topics, problems };
  }, [trimmed]);

  // Click outside to close search popover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut listener: Ctrl+K or Cmd+K or '/' to focus search, Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        searchInputRef.current?.blur();
      } else if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" &&
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA")
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        if (trimmed) setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [trimmed]);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/80 bg-background/80 px-4 backdrop-blur-md transition-colors">
      <SidebarTrigger className="h-8 w-8 text-muted-foreground transition-colors hover:text-foreground" />

      <div className="hidden min-w-0 flex-1 items-center gap-2 md:flex overflow-hidden">
        <span className="font-accent text-xs font-medium text-muted-foreground shrink-0">
          DSA Studio
        </span>
        <span className="font-mono text-muted-foreground/40 shrink-0">/</span>
        <h1 className="truncate font-display text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h1>
      </div>

      {/* Global Quick Progress Stat Pill */}
      <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-surface/60 px-2.5 py-1 text-xs text-muted-foreground transition-all hover:border-primary/40 xl:flex shrink-0">
        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
        <span className="font-mono tabular-nums font-medium text-foreground">
          {solved} <span className="font-normal text-muted-foreground">/ {total}</span>
        </span>
        <span className="rounded-full bg-primary-soft px-1.5 py-0.2 font-mono text-[10px] font-semibold text-primary tabular-nums">
          {pct}%
        </span>
      </div>

      {/* Global Search Input & Dropdown */}
      <div
        ref={searchContainerRef}
        className="relative ml-auto flex w-full min-w-0 max-w-[200px] sm:max-w-xs md:max-w-sm shrink-0 items-center"
      >
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={searchInputRef}
          value={query}
          onFocus={() => {
            if (trimmed) setIsOpen(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search problems, topics, patterns…"
          className="h-8.5 rounded-lg border-border/80 bg-surface/80 pl-8 pr-14 text-xs transition-colors focus-visible:border-primary/50"
        />
        {query ? (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden items-center gap-0.5 sm:flex">
            <kbd className="rounded border border-border/70 bg-surface-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
              /
            </kbd>
          </div>
        )}

        {/* Floating Results Popover - Out-of-flow absolute positioning bounded below input */}
        {isOpen && trimmed && (
          <div className="fixed inset-x-3 top-16 z-50 mt-1.5 w-[min(420px,calc(100vw-2rem))] max-h-[min(420px,calc(100vh-5rem))] overflow-y-auto rounded-xl border border-border/80 bg-surface/98 p-2 shadow-2xl backdrop-blur-2xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full">
            {searchResults.topics.length === 0 && searchResults.problems.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted-foreground">
                No topics or problems found matching{" "}
                <span className="font-semibold text-foreground">"{query}"</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                {searchResults.topics.length > 0 && (
                  <div>
                    <div className="px-2 py-1 font-accent text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Topics ({searchResults.topics.length})
                    </div>
                    <div className="space-y-0.5">
                      {searchResults.topics.map((t) => (
                        <Link
                          key={t.slug}
                          to="/topics/$slug"
                          params={{ slug: t.slug }}
                          onClick={() => {
                            setIsOpen(false);
                            setQuery("");
                          }}
                          className="group flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors hover:bg-hover"
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-2">
                            <span className="truncate font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                              {t.name}
                            </span>
                            <span className="shrink-0 rounded bg-surface-muted px-1.5 py-0.2 font-mono text-[10px] text-muted-foreground">
                              #{t.order}
                            </span>
                          </div>
                          <span className="shrink-0 font-accent text-[10px] text-muted-foreground">
                            {t.phase} Tier →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.problems.length > 0 && (
                  <div>
                    <div className="px-2 py-1 font-accent text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Problems ({searchResults.problems.length})
                    </div>
                    <div className="space-y-0.5">
                      {searchResults.problems.map(({ placement, problem }) => (
                        <Link
                          key={`${placement.topicSlug}-${problem.id}`}
                          to="/topics/$slug"
                          params={{ slug: placement.topicSlug }}
                          onClick={() => {
                            setIsOpen(false);
                            setQuery("");
                          }}
                          className="group flex items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-xs transition-colors hover:bg-hover"
                        >
                          <div className="min-w-0 flex-1 overflow-hidden">
                            <div className="truncate font-medium text-foreground group-hover:text-primary transition-colors">
                              {problem.title}
                            </div>
                            <div className="flex items-center gap-1.5 pt-0.5 text-[10.5px] text-muted-foreground overflow-hidden">
                              <span className="truncate">{placement.topicName}</span>
                              <span className="shrink-0">•</span>
                              <span className="shrink-0">L{placement.levelNumber}</span>
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-1.5">
                            <DifficultyBadge difficulty={problem.difficulty} />
                            <PlatformBadge platform={problem.platform} short />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Theme Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        className="h-8.5 w-8.5 text-muted-foreground transition-colors hover:bg-hover hover:text-foreground"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4 transition-transform hover:rotate-45" />
        ) : (
          <Moon className="h-4 w-4 transition-transform hover:-rotate-12" />
        )}
      </Button>
    </header>
  );
}
