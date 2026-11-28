import { useEffect, useMemo } from "react";
import { useTheme, THEME_PRESETS, getThemePreset } from "@/lib/theme";

let hasPreloadedArtwork = false;

export function ThemeBackground() {
  const { mode, preset, isArtworkEnabled, isPreferenceRestored } = useTheme();

  const currentPreset = getThemePreset(preset);
  const shouldEnableArtwork = isPreferenceRestored && isArtworkEnabled && currentPreset.hasArtwork;

  // Preload and decode theme illustrations only once preferences are restored with artwork enabled
  useEffect(() => {
    if (typeof window === "undefined" || !shouldEnableArtwork || hasPreloadedArtwork) return;
    hasPreloadedArtwork = true;

    THEME_PRESETS.forEach((p) => {
      if (p.background) {
        const lightImg = new Image();
        lightImg.src = p.background.light;
        if ("decode" in lightImg) {
          lightImg.decode().catch(() => {});
        }
        const darkImg = new Image();
        darkImg.src = p.background.dark;
        if ("decode" in darkImg) {
          darkImg.decode().catch(() => {});
        }
      }
    });
  }, [shouldEnableArtwork]);

  const artworkPresets = useMemo(
    () => THEME_PRESETS.filter((p) => p.hasArtwork && !!p.background),
    [],
  );

  const isDark = mode === "dark";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 -top-12 h-[calc(100lvh+6rem)] z-0 overflow-hidden select-none transition-colors duration-200 ease-out"
      style={{
        backgroundColor: "var(--canvas)",
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform",
      }}
    >
      {/* Solid opaque base canvas wash: guarantees zero white flash before hydration or artwork load */}
      <div
        className="absolute inset-0 transition-colors duration-200 ease-out"
        style={{ backgroundColor: "var(--canvas)" }}
      />

      {/* Stacked crossfading preset layers — rendered only after preference restoration when artwork is enabled */}
      {shouldEnableArtwork &&
        artworkPresets.map((p) => {
          const isPresetActive = p.id === preset;
          return (
            <div
              key={p.id}
              className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                isPresetActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              style={{
                transform: "translate3d(0, 0, 0)",
                WebkitTransform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                willChange: isPresetActive ? "opacity" : undefined,
              }}
            >
              {/* Day illustration layer */}
              <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-200 ease-out ${
                  isDark ? "opacity-0" : "opacity-100"
                }`}
                style={{
                  backgroundImage: `url(${p.background!.light})`,
                  transform: "translate3d(0, 0, 0)",
                  WebkitTransform: "translate3d(0, 0, 0)",
                }}
              />

              {/* Night illustration layer */}
              <div
                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-200 ease-out ${
                  isDark ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage: `url(${p.background!.dark})`,
                  transform: "translate3d(0, 0, 0)",
                  WebkitTransform: "translate3d(0, 0, 0)",
                }}
              />
            </div>
          );
        })}

      {/* Ambient depth overlay when artwork is active */}
      {shouldEnableArtwork && (
        <div className="absolute inset-0 z-20 bg-transparent dark:bg-black/30 transition-colors duration-200 ease-out" />
      )}
    </div>
  );
}
