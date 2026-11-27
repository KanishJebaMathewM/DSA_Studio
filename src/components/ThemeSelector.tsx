import { useEffect, useState } from "react";
import { Check, Moon, Palette, Sparkles, Sun, ChevronRight } from "lucide-react";
import { useTheme, THEME_PRESETS, getThemePreset, type ThemePresetId } from "@/lib/theme";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ThemeSelector() {
  const { mode, preset, isArtworkEnabled, toggle, setPreset, cyclePreset, setIsArtworkEnabled } =
    useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const isDark = mode === "dark";
  const currentPreset = getThemePreset(preset);

  // Global keyboard shortcut: Press "T" outside input to cycle theme atmospheres
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }
      if ((e.key === "t" || e.key === "T") && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        cyclePreset();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cyclePreset]);

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Quick Day / Night Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        className="h-[var(--ctrl-sm)] w-[var(--ctrl-sm)] sm:h-[var(--ctrl-md)] sm:w-[var(--ctrl-md)] text-muted-foreground hover:text-foreground cursor-pointer"
        aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
        title={isDark ? "Switch to day mode" : "Switch to night mode"}
      >
        {isDark ? (
          <Sun className="h-[var(--icon-sm)] w-[var(--icon-sm)]" />
        ) : (
          <Moon className="h-[var(--icon-sm)] w-[var(--icon-sm)]" />
        )}
      </Button>

      {/* Theme Library Popover Trigger */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-[var(--ctrl-sm)] sm:h-[var(--ctrl-md)] px-1.5 sm:gap-1.5 sm:px-3 text-fluid-xs text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Open theme library"
            title={`Atmosphere: ${currentPreset.name} (Press T to cycle)`}
          >
            <Palette className="h-[var(--icon-sm)] w-[var(--icon-sm)] text-primary shrink-0" />
            <span className="hidden sm:inline-flex items-center gap-1.5 font-medium text-foreground">
              {currentPreset.name}
              <span
                className="h-[clamp(0.5rem,0.55vw,0.65rem)] w-[clamp(0.5rem,0.55vw,0.65rem)] rounded-full shrink-0 shadow-xs"
                style={{
                  backgroundColor: isDark
                    ? currentPreset.accentColor.dark
                    : currentPreset.accentColor.light,
                }}
              />
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="w-[calc(100vw-24px)] max-w-sm p-3.5 sm:p-4 shadow-xl backdrop-blur-md"
        >
          {/* Header */}
          <div className="mb-3 flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-sm">Theme Library</h3>
            </div>
            <span className="text-[11px] text-muted-foreground">Study Atmosphere</span>
          </div>

          {/* Theme Presets List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Select Environment</p>
              <button
                type="button"
                onClick={cyclePreset}
                className="text-[11px] text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                title="Cycle to next theme preset"
              >
                <span>Next</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {THEME_PRESETS.map((p) => {
                const isSelected = preset === p.id;
                const thumbUrl = p.thumb ? (isDark ? p.thumb.dark : p.thumb.light) : null;

                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setPreset(p.id)}
                    className={`group relative flex flex-col overflow-hidden rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/20 shadow-sm"
                        : "border-border hover:border-border/80 hover:bg-muted/30"
                    }`}
                  >
                    {/* Thumbnail preview */}
                    <div className="relative h-16 w-full overflow-hidden bg-muted/60">
                      {thumbUrl ? (
                        <img
                          src={thumbUrl}
                          alt={p.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-800 dark:to-slate-950 p-2">
                          <div className="h-6 w-full rounded border border-white/20 bg-white/40 dark:border-white/10 dark:bg-white/5" />
                        </div>
                      )}

                      {/* Accent color dot indicator */}
                      <span
                        className="absolute left-2 top-2 h-2.5 w-2.5 rounded-full border border-white/40 shadow-sm"
                        style={{
                          backgroundColor: isDark ? p.accentColor.dark : p.accentColor.light,
                        }}
                        title={`Theme accent color: ${p.name}`}
                      />

                      {isSelected && (
                        <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                          <Check className="h-2.5 w-2.5" />
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="p-2">
                      <div className="font-medium text-xs text-foreground truncate">{p.name}</div>
                      <div className="text-[10px] text-muted-foreground line-clamp-1">
                        {p.tagline}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Artwork Toggle (if current preset supports artwork) */}
          {preset !== "clean-slate" && (
            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <div className="space-y-0.5">
                <Label htmlFor="artwork-toggle" className="text-xs font-medium cursor-pointer">
                  Background Artwork
                </Label>
                <p className="text-[10px] text-muted-foreground">
                  {preset === "greenhouse-studio"
                    ? "Botanical greenhouse environment"
                    : preset === "mountain-observatory"
                      ? "Mountain observatory environment"
                      : "Lofi window study environment"}
                </p>
              </div>
              <Switch
                id="artwork-toggle"
                checked={isArtworkEnabled}
                onCheckedChange={setIsArtworkEnabled}
              />
            </div>
          )}

          {/* Quick Tip / Keyboard Shortcut Footer */}
          <div className="mt-3 flex items-center justify-between border-t pt-2.5 text-[11px] text-muted-foreground">
            <span>
              Tip: Press{" "}
              <kbd className="rounded border bg-muted/60 px-1 py-0.5 text-[10px] font-mono">T</kbd>{" "}
              to cycle
            </span>
            <span className="text-[10px] text-muted-foreground/80">
              {isDark ? "Night Mode" : "Day Mode"}
            </span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
