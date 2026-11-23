import { useTheme, THEME_PRESETS } from "@/lib/theme";

export function ThemeBackground() {
  const { mode, preset, isArtworkEnabled, isPreferenceRestored } = useTheme();
  const currentPreset = THEME_PRESETS.find((p) => p.id === preset) || THEME_PRESETS[0];

  if (!isPreferenceRestored || !isArtworkEnabled || !currentPreset.hasArtwork || !currentPreset.background) {
    return null;
  }

  const isDark = mode === "dark";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Day illustration layer */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${currentPreset.background.light})` }}
      />

      {/* Night illustration layer */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${currentPreset.background.dark})` }}
      />

      {/* Ambient overlay: crystal-clear in light mode, subtle ambient depth in dark mode */}
      <div className="absolute inset-0 bg-transparent dark:bg-black/30 transition-colors duration-500" />
    </div>
  );
}

