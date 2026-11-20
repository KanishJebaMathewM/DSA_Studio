// Local progress store. Keyed by canonical problem id so completion
// synchronizes across every track a problem appears in.
// Backed by localStorage but exposed through a repository so a Supabase
// implementation can replace it later without touching UI code.

import { useSyncExternalStore } from "react";

export interface ProgressEntry {
  completed: boolean;
  needsRevision: boolean;
  bookmarked: boolean;
  notes: string;
  completedAt: string | null;
  lastRevisedAt: string | null;
}

export type ProgressMap = Record<string, ProgressEntry>;

const STORAGE_KEY = "dsa-sheet-progress-v1";

const EMPTY_MAP: ProgressMap = Object.freeze({});

function getServerSnapshot(): ProgressMap {
  return EMPTY_MAP;
}

const listeners = new Set<() => void>();
let cache: ProgressMap | null = null;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function read(): ProgressMap {
  if (!isBrowser()) return EMPTY_MAP;
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return (cache = EMPTY_MAP);
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return (cache = EMPTY_MAP);
    }
    const normalized: ProgressMap = {};
    for (const [id, entry] of Object.entries(parsed)) {
      if (entry && typeof entry === "object" && !Array.isArray(entry)) {
        normalized[id] = { ...defaultEntry(), ...(entry as ProgressEntry) };
      }
    }
    cache = normalized;
  } catch {
    cache = EMPTY_MAP;
  }
  return cache;
}

function write(next: ProgressMap): void {
  cache = next;
  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota errors
    }
  }
  listeners.forEach((l) => l());
}

export function defaultEntry(): ProgressEntry {
  return {
    completed: false,
    needsRevision: false,
    bookmarked: false,
    notes: "",
    completedAt: null,
    lastRevisedAt: null,
  };
}

export function getEntry(id: string): ProgressEntry {
  const entry = read()[id];
  return entry ? { ...defaultEntry(), ...entry } : defaultEntry();
}

/** True when a note contains more than whitespace. */
export function hasNotes(notes: string | undefined): boolean {
  return !!notes && notes.trim() !== "";
}

export function getAllProgress(): ProgressMap {
  return read();
}

type EntryPatch = Partial<ProgressEntry> | ((entry: ProgressEntry) => Partial<ProgressEntry>);

function update(id: string, patch: EntryPatch): void {
  // Re-read from storage before writing so we build on the latest data,
  // not a stale in-memory copy. Otherwise a write from this tab could
  // overwrite changes another tab saved since we last read.
  cache = null;
  const current = read();
  const existing = current[id] ? { ...defaultEntry(), ...current[id] } : defaultEntry();
  // Updater functions receive the freshly read entry, so toggles flip the
  // latest stored value rather than a stale cached one.
  const changes = typeof patch === "function" ? patch(existing) : patch;
  const next: ProgressMap = { ...current, [id]: { ...existing, ...changes } };
  write(next);
}

export const progressRepo = {
  toggleCompleted(id: string): void {
    update(id, (e) => ({
      completed: !e.completed,
      completedAt: !e.completed ? new Date().toISOString() : null,
    }));
  },
  toggleBookmarked(id: string): void {
    update(id, (e) => ({ bookmarked: !e.bookmarked }));
  },
  toggleNeedsRevision(id: string): void {
    update(id, (e) => ({
      needsRevision: !e.needsRevision,
      lastRevisedAt: !e.needsRevision ? null : new Date().toISOString(),
    }));
  },
  setNotes(id: string, notes: string): void {
    update(id, { notes });
  },
  resetAll(): void {
    write({});
  },
};

// The browser fires `storage` in every *other* tab of the same origin when
// localStorage changes. Drop our cache and re-render so this tab shows the
// new progress. `key === null` means the other tab called localStorage.clear().
function onStorage(e: StorageEvent): void {
  if (e.key !== null && e.key !== STORAGE_KEY) return;
  cache = null;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void): () => void {
  if (listeners.size === 0 && isBrowser()) {
    // No listener was attached while there were no subscribers, so storage
    // events from other tabs may have been missed. Drop the cache so the
    // next read loads fresh data from localStorage.
    cache = null;
    window.addEventListener("storage", onStorage);
  }
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && isBrowser()) {
      window.removeEventListener("storage", onStorage);
    }
  };
}

// Hook: subscribe components to progress changes.
export function useProgress(): ProgressMap {
  return useSyncExternalStore(subscribe, read, getServerSnapshot);
}

export function useProgressEntry(id: string): ProgressEntry {
  const all = useProgress();
  const entry = all[id];
  return entry ? { ...defaultEntry(), ...entry } : defaultEntry();
}
