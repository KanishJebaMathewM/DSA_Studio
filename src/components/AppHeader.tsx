import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeSelector } from "./ThemeSelector";
import { SoundscapeControl } from "./SoundscapeControl";
import { useGlobalSearch } from "@/lib/search-context";

export function AppHeader({ title }: { title: string }) {
  const { query, setQuery } = useGlobalSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  // Detected after mount so the server render and first client render match.
  const [isMac, setIsMac] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  // When query is non-empty, keep mobile search open so the user sees results
  useEffect(() => {
    if (query.trim()) {
      setIsMobileSearchOpen(true);
    }
  }, [query]);

  // Focus input when mobile search opens
  useEffect(() => {
    if (isMobileSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isMobileSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" &&
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA")
      ) {
        e.preventDefault();
        const isMobileScreen = typeof window !== "undefined" && window.innerWidth < 768;
        if (isMobileScreen) {
          setIsMobileSearchOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        } else {
          desktopInputRef.current?.focus();
          desktopInputRef.current?.select();
        }
      } else if (e.key === "Escape") {
        if (query) {
          setQuery("");
        }
        setIsMobileSearchOpen(false);
        inputRef.current?.blur();
        desktopInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setQuery, query]);

  const handleCloseMobileSearch = () => {
    setQuery("");
    setIsMobileSearchOpen(false);
  };

  return (
    <header className="sticky top-2 md:top-3 z-30 flex w-full items-center gap-2 sm:gap-3">
      {/* Standalone sidebar toggle button, separated from the navbar card on mobile */}
      <SidebarTrigger
        className="flex md:hidden h-[var(--header-h)] w-[var(--header-h)] shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-card shadow-md backdrop-blur-xl text-muted-foreground hover:text-foreground hover:bg-card/90 transition-all cursor-pointer [&>svg]:size-[var(--icon-md)]"
        title="Toggle sidebar"
      />

      {/* Main navigation bar container */}
      <div className="flex flex-1 h-[var(--header-h)] items-center gap-2 sm:gap-3 rounded-2xl border border-border/60 bg-card px-3 sm:px-4 shadow-md backdrop-blur-xl min-w-0">
        {/* --- MOBILE VIEW (< md): Toggles between Title+Icon and Inline Search --- */}
        <div className="flex md:hidden flex-1 items-center gap-2 min-w-0">
          {isMobileSearchOpen ? (
            <div className="flex flex-1 items-center gap-1.5 min-w-0">
              <div className="flex flex-1 items-center gap-1.5 min-w-0 rounded-lg border border-border/50 bg-surface/60 px-2 transition-all focus-within:border-primary/60 focus-within:bg-surface focus-within:ring-1 focus-within:ring-primary">
                <Search className="h-[var(--icon-sm)] w-[var(--icon-sm)] shrink-0 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search problems, topics…"
                  className="h-[var(--ctrl-sm)] min-w-0 flex-1 border-0 bg-transparent px-1 text-fluid-sm shadow-none focus-visible:ring-0 focus-visible:outline-none placeholder:text-muted-foreground/70"
                  aria-label="Search problems and topics"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    className="p-1 text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
                    aria-label="Clear search query"
                  >
                    <X className="h-[var(--icon-xs)] w-[var(--icon-xs)]" />
                  </button>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseMobileSearch}
                className="h-[var(--ctrl-sm)] px-2 text-fluid-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <div className="flex min-w-0 flex-1 items-center">
                <h1 className="truncate text-fluid-base font-semibold text-foreground tracking-tight">
                  {title}
                </h1>
              </div>

              {/* Mobile Search Icon Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSearchOpen(true)}
                className="h-[var(--ctrl-sm)] w-[var(--ctrl-sm)] text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
                aria-label="Search problems and topics"
                title="Search problems, topics…"
              >
                <Search className="h-[var(--icon-sm)] w-[var(--icon-sm)]" />
              </Button>
            </>
          )}
        </div>

        {/* --- DESKTOP VIEW (>= md): Permanent Title + Search Input --- */}
        <div className="hidden md:flex flex-1 items-center gap-3 min-w-0">
          <div className="min-w-0 shrink">
            <h1 className="truncate text-fluid-base font-semibold text-foreground tracking-tight">
              {title}
            </h1>
          </div>

          <div className="relative ml-auto w-full max-w-[clamp(16rem,24vw,28rem)]">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 z-10 h-[var(--icon-sm)] w-[var(--icon-sm)] -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={desktopInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search problems, topics…"
              className={`h-[var(--ctrl-md)] border-border/60 bg-surface/70 pl-[clamp(2rem,2.4vw,2.5rem)] pr-7 text-fluid-xs backdrop-blur-sm transition-all focus:bg-surface focus:ring-1 focus:ring-primary ${
                query ? "" : "md:pr-[clamp(4rem,5.2vw,5.25rem)]"
              }`}
              aria-label="Search problems and topics"
              aria-keyshortcuts={isMac ? "Meta+K /" : "Control+K /"}
            />
            {!query && (
              <kbd className="pointer-events-none absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center rounded border bg-muted/80 px-1.5 py-0.5 font-sans text-fluid-2xs font-medium text-muted-foreground md:inline-flex">
                {isMac ? "⌘K" : "Ctrl K"}
              </kbd>
            )}
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  desktopInputRef.current?.focus();
                }}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="h-[var(--icon-xs)] w-[var(--icon-xs)]" />
              </button>
            )}
          </div>
        </div>

        {/* Theme Selector (Always visible on all screens) */}
        <div className="shrink-0">
          <SoundscapeControl />
        </div>
        <div className="shrink-0">
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
