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
  const userDisabledRef = useRef<boolean>(false);
  const cleanupGestureRef = useRef<(() => void) | null>(null);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // Default to enabled (playing) unless explicitly disabled by user
    const shouldPlayByDefault = saved !== "false";

    const audio = new Audio(TRACK_URL);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    if (!shouldPlayByDefault) {
      userDisabledRef.current = true;
      setIsOn(false);
    } else {
      userDisabledRef.current = false;
      setIsOn(true);

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser autoplay policy prevents unmuted playback without interaction,
          // attach a one-time gesture listener so it starts on the user's first click or keystroke.
          if (userDisabledRef.current) return;

          const startOnGesture = () => {
            if (userDisabledRef.current || !audioRef.current) return;
            audioRef.current.play().catch((playErr) => {
              console.warn("Failed to start soundscape on interaction:", playErr);
            });
            cleanup();
          };

          const cleanup = () => {
            window.removeEventListener("pointerdown", startOnGesture);
            window.removeEventListener("keydown", startOnGesture);
            cleanupGestureRef.current = null;
          };

          cleanupGestureRef.current = cleanup;
          window.addEventListener("pointerdown", startOnGesture, { once: true, passive: true });
          window.addEventListener("keydown", startOnGesture, { once: true, passive: true });
        });
      }
    }

    // Sync state across multiple tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && audioRef.current) {
        if (e.newValue === "false") {
          userDisabledRef.current = true;
          cleanupGestureRef.current?.();
          audioRef.current.pause();
          setIsOn(false);
        } else if (e.newValue === "true") {
          userDisabledRef.current = false;
          setIsOn(true);
          audioRef.current.play().catch(() => {});
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      cleanupGestureRef.current?.();
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isOn) {
      userDisabledRef.current = true;
      cleanupGestureRef.current?.();
      audio.pause();
      setIsOn(false);
      localStorage.setItem(STORAGE_KEY, "false");
    } else {
      userDisabledRef.current = false;
      audio
        .play()
        .then(() => {
          setIsOn(true);
          localStorage.setItem(STORAGE_KEY, "true");
        })
        .catch((err) => {
          console.warn("Failed to play soundscape:", err);
          setIsOn(false);
          userDisabledRef.current = true;
          localStorage.setItem(STORAGE_KEY, "false");
        });
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
