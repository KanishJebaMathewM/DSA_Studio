import { useCallback, useEffect, useState } from "react";

export function useStepPlayer(totalSteps: number, speed: number) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
  }, [totalSteps]);

  useEffect(() => {
    if (!playing) return;
    if (index >= totalSteps - 1) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setIndex((i) => Math.min(i + 1, totalSteps - 1));
    }, 700 / speed);
    return () => clearTimeout(timer);
  }, [playing, index, totalSteps, speed]);

  const next = useCallback(() => {
    setPlaying(false);
    setIndex((i) => Math.min(i + 1, Math.max(totalSteps - 1, 0)));
  }, [totalSteps]);

  const prev = useCallback(() => {
    setPlaying(false);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setPlaying(false);
    setIndex(0);
  }, []);

  const toggle = useCallback(() => {
    setPlaying((p) => {
      if (!p && index >= totalSteps - 1) {
        setIndex(0);
        return true;
      }
      return !p;
    });
  }, [index, totalSteps]);

  return {
    index,
    playing,
    next,
    prev,
    reset,
    toggle,
    atStart: index <= 0,
    atEnd: index >= totalSteps - 1,
  };
}
