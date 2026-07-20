import { Moon, Search, Sun } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { useGlobalSearch } from "@/lib/search-context";

export function AppHeader({ title }: { title: string }) {
  const { theme, toggle } = useTheme();
  const { query, setQuery } = useGlobalSearch();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-sm">
      <SidebarTrigger className="text-muted-foreground" />
      <div className="hidden min-w-0 flex-1 items-center md:flex">
        <h1 className="truncate text-sm font-semibold text-foreground">
          {title}
        </h1>
      </div>
      <div className="relative ml-auto w-full max-w-sm">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search problems, topics, patterns…"
          className="h-9 border-border bg-surface pl-8 text-sm"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        className="h-9 w-9 text-muted-foreground"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </header>
  );
}
