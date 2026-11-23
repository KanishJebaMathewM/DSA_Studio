import { useEffect, useMemo } from "react";
import { useTheme, THEME_PRESETS } from "@/lib/theme";

export function ThemeBackground() {
  const { mode, preset, isArtworkEnabled, isPreferenceRestored } = useTheme();

  // Preload and decode all theme illustrations in advance to prevent any network latency or decoding flickers
  useEffect(() => {
    if (typeof window === "undefined") return;

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
  }, []);

  const artworkPresets = useMemo(
    () => THEME_PRESETS.filter((p) => p.hasArtwork && !!p.background),
    []
  );

  if (!isPreferenceRestored) {
    return null;
  }

  const isDark = mode === "dark";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 -top-12 -bottom-12 z-0 overflow-hidden select-none bg-background transition-colors duration-500"
      style={{
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform",
      }}
    >
      {/* Base theme background wash: guarantees zero white flash under all lighting modes */}
      <div className="absolute inset-0 bg-background transition-colors duration-500" />

      {/* Stacked crossfading preset layers */}
      {artworkPresets.map((p) => {
        const isPresetActive = isArtworkEnabled && p.id === preset;
        return (
          <div
            key={p.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isPresetActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            style={{
              transform: "translate3d(0, 0, 0)",
              WebkitTransform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              willChange: "opacity",
            }}
          >
            {/* Day illustration layer */}
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
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
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
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

      {/* Ambient depth overlay: clean in light mode, soft ambient depth in dark mode */}
      <div className="absolute inset-0 z-20 bg-transparent dark:bg-black/30 transition-colors duration-500" />
    </div>
  );
}

