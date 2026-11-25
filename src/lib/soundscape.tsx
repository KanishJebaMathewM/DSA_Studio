import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const TRACK_URL =
  "https://archive.org/download/gs_lo-fi-hip-hop-late-night-lofi-hiphop-focus-music-for-streaming-gaming-working/01%20Background%20Lofi%20Music.mp3";
const STORAGE_KEY = "dsa-studio-soundscape-enabled";

interface SoundscapeContextValue {
  isOn: boolean;
  toggle: () => void;
}

const SoundscapeContext = createContext<SoundscapeContextValue | null>(null);

export function SoundscapeProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOn, setIsOn] = useState(false);

  // Create the audio element once and restore persisted preference.
  useEffect(() => {
    const audio = new Audio(TRACK_URL);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "true") {
      setIsOn(true);
      audio.play().catch(() => {
        // Autoplay may be blocked by the browser; silently fall back to off.
        setIsOn(false);
        localStorage.setItem(STORAGE_KEY, "false");
      });
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isOn) {
      audio.pause();
      setIsOn(false);
      localStorage.setItem(STORAGE_KEY, "false");
    } else {
      audio.play().catch(() => {
        // If play is rejected, keep state as off.
        return;
      });
      setIsOn(true);
      localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  return (
    <SoundscapeContext.Provider value={{ isOn, toggle }}>
      {children}
    </SoundscapeContext.Provider>
  );
}

export function useSoundscape(): SoundscapeContextValue {
  const ctx = useContext(SoundscapeContext);
  if (!ctx) {
    throw new Error("useSoundscape must be used within a SoundscapeProvider");
  }
  return ctx;
}
