import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { ThemeSelector } from "./ThemeSelector";
import { useGlobalSearch } from "@/lib/search-context";

export function AppHeader({ title }: { title: string }) {
  const { query, setQuery } = useGlobalSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  // Detected after mount so the server render and first client render match.
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" &&
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA")
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setQuery("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setQuery]);

  return (
    <header className="sticky top-2 md:top-3 z-30 w-full">
      <div className="flex h-13 sm:h-14 items-center gap-2 sm:gap-3 rounded-2xl border border-border/60 bg-card px-2.5 sm:px-4 shadow-md backdrop-blur-xl">
        <SidebarTrigger className="md:hidden shrink-0 text-muted-foreground hover:text-foreground cursor-pointer" />
        <div className="hidden min-w-0 items-center md:flex">
          <h1 className="truncate text-sm font-semibold text-foreground">{title}</h1>
        </div>
        <div className="relative ml-auto w-full max-w-[200px] xs:max-w-xs sm:max-w-sm">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems, topics…"
            className={`h-9 border-border/60 bg-surface/70 pl-8 pr-7 text-xs sm:text-sm backdrop-blur-sm transition-all focus:bg-surface focus:ring-1 focus:ring-primary ${
              query ? "" : "md:pr-16"
            }`}
            aria-label="Search problems and topics"
            aria-keyshortcuts={isMac ? "Meta+K /" : "Control+K /"}
          />
          {!query && (
            // Shortcut hint: keyboard users only, so hidden on small (touch) screens.
            <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center rounded border bg-muted/80 px-1.5 py-0.5 font-sans text-[10px] font-medium text-muted-foreground md:inline-flex">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          )}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              aria-label="Clear search query"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <div className="shrink-0">
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
