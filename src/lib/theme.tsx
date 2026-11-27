import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

const STORAGE_KEY_MODE = "dsa-sheet-theme";
const STORAGE_KEY_PRESET = "dsa-studio-theme-preset";
const STORAGE_KEY_ARTWORK = "dsa-studio-theme-artwork";

export type ThemeMode = "light" | "dark";
export type Theme = ThemeMode; // backward compatibility
export type ThemePresetId = "cozy-room" | "greenhouse-studio" | "mountain-observatory" | "clean-slate";

export interface ThemePreset {
  id: ThemePresetId;
  name: string;
  tagline: string;
  description: string;
  hasArtwork: boolean;
  accentColor: {
    light: string;
    dark: string;
  };
  background?: {
    light: string;
    dark: string;
  };
  thumb?: {
    light: string;
    dark: string;
  };
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "cozy-room",
    name: "Cozy Room",
    tagline: "Day & Night Artwork",
    description: "Lofi study room with rolling hills by day and moonlit serenity by night.",
    hasArtwork: true,
    accentColor: {
      light: "#D97706",
      dark: "#FBBF24",
    },
    background: {
      light: "/themes/cozy-room/day.webp",
      dark: "/themes/cozy-room/night.webp",
    },
    thumb: {
      light: "/themes/cozy-room/thumb-day.webp",
      dark: "/themes/cozy-room/thumb-night.webp",
    },
  },
  {
    id: "greenhouse-studio",
    name: "Greenhouse",
    tagline: "Botanical Day & Night",
    description: "Sun-drenched botanical greenhouse studio by day, starlit garden by night.",
    hasArtwork: true,
    accentColor: {
      light: "#059669",
      dark: "#34D399",
    },
    background: {
      light: "/themes/greenhouse-studio/day.webp",
      dark: "/themes/greenhouse-studio/night.webp",
    },
    thumb: {
      light: "/themes/greenhouse-studio/thumb-day.webp",
      dark: "/themes/greenhouse-studio/thumb-night.webp",
    },
  },
  {
    id: "mountain-observatory",
    name: "Observatory",
    tagline: "Celestial Peaks",
    description: "High-altitude mountain observatory study by day, starry constellation deck by night.",
    hasArtwork: true,
    accentColor: {
      light: "#2563EB",
      dark: "#818CF8",
    },
    background: {
      light: "/themes/mountain-observatory/day.webp",
      dark: "/themes/mountain-observatory/night.webp",
    },
    thumb: {
      light: "/themes/mountain-observatory/thumb-day.webp",
      dark: "/themes/mountain-observatory/thumb-night.webp",
    },
  },
  {
    id: "clean-slate",
    name: "Clean Slate",
    tagline: "Minimalist Focus",
    description: "Classic distraction-free dark and light surfaces without illustration.",
    hasArtwork: false,
    accentColor: {
      light: "#4F46E5",
      dark: "#6366F1",
    },
  },
];

interface ThemeContextType {
  theme: ThemeMode;
  mode: ThemeMode;
  preset: ThemePresetId;
  isArtworkEnabled: boolean;
  isPreferenceRestored: boolean;
  setTheme: (m: ThemeMode) => void;
  setMode: (m: ThemeMode) => void;
  toggle: () => void;
  setPreset: (p: ThemePresetId) => void;
  cyclePreset: () => void;
  setIsArtworkEnabled: (enabled: boolean) => void;
}

const DEFAULT_THEME_PRESET: ThemePresetId = "clean-slate";

export function getThemePreset(presetId: ThemePresetId): ThemePreset {
  return (
    THEME_PRESETS.find((p) => p.id === presetId) ??
    THEME_PRESETS.find((p) => p.id === DEFAULT_THEME_PRESET) ??
    THEME_PRESETS[0]
  );
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function apply(mode: ThemeMode, presetId: ThemePresetId, isArtworkEnabled: boolean) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
  root.setAttribute("data-theme", presetId);

  const preset = getThemePreset(presetId);
  const activeArtwork = preset.hasArtwork && isArtworkEnabled;
  root.setAttribute("data-theme-artwork", activeArtwork ? "true" : "false");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [preset, setPresetState] = useState<ThemePresetId>(DEFAULT_THEME_PRESET);
  const [isArtworkEnabled, setIsArtworkEnabledState] = useState<boolean>(true);
  const [isPreferenceRestored, setIsPreferenceRestored] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedMode = localStorage.getItem(STORAGE_KEY_MODE) as ThemeMode | null;
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches;
      const initialMode: ThemeMode = storedMode ?? (prefersDark ? "dark" : "light");

      const storedPreset = localStorage.getItem(STORAGE_KEY_PRESET) as ThemePresetId | null;
      const initialPreset: ThemePresetId =
        storedPreset && THEME_PRESETS.some((p) => p.id === storedPreset)
          ? storedPreset
          : DEFAULT_THEME_PRESET;

      const storedArtwork = localStorage.getItem(STORAGE_KEY_ARTWORK);
      const initialArtwork = storedArtwork !== null ? storedArtwork === "true" : true;

      setModeState(initialMode);
      setPresetState(initialPreset);
      setIsArtworkEnabledState(initialArtwork);
      setIsPreferenceRestored(true);
      apply(initialMode, initialPreset, initialArtwork);
    } catch {
      setIsPreferenceRestored(true);
      apply("light", DEFAULT_THEME_PRESET, true);
    }
  }, []);

  const setMode = (m: ThemeMode) => {
    setModeState(m);
    apply(m, preset, isArtworkEnabled);
    try {
      localStorage.setItem(STORAGE_KEY_MODE, m);
    } catch {
      // ignore
    }
  };

  const setPreset = (p: ThemePresetId) => {
    setPresetState(p);
    apply(mode, p, isArtworkEnabled);
    try {
      localStorage.setItem(STORAGE_KEY_PRESET, p);
    } catch {
      // ignore
    }
  };

  const setIsArtworkEnabled = (enabled: boolean) => {
    setIsArtworkEnabledState(enabled);
    apply(mode, preset, enabled);
    try {
      localStorage.setItem(STORAGE_KEY_ARTWORK, String(enabled));
    } catch {
      // ignore
    }
  };

  const toggle = () => setMode(mode === "dark" ? "light" : "dark");

  const cyclePreset = () => {
    const currentIndex = THEME_PRESETS.findIndex((p) => p.id === preset);
    const nextIndex = (currentIndex + 1) % THEME_PRESETS.length;
    setPreset(THEME_PRESETS[nextIndex].id);
  };

  const value = useMemo(
    () => ({
      theme: mode,
      mode,
      preset,
      isArtworkEnabled,
      isPreferenceRestored,
      setTheme: setMode,
      setMode,
      toggle,
      setPreset,
      cyclePreset,
      setIsArtworkEnabled,
    }),
    [mode, preset, isArtworkEnabled, isPreferenceRestored]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "light" as ThemeMode,
      mode: "light" as ThemeMode,
      preset: DEFAULT_THEME_PRESET,
      isArtworkEnabled: true,
      isPreferenceRestored: false,
      setTheme: () => {},
      setMode: () => {},
      toggle: () => {},
      setPreset: () => {},
      cyclePreset: () => {},
      setIsArtworkEnabled: () => {},
    };
  }
  return context;
}

