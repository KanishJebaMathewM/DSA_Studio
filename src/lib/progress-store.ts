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

const listeners = new Set<() => void>();
let cache: ProgressMap | null = null;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function read(): ProgressMap {
  if (!isBrowser()) return {};
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    cache = {};
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
  return read()[id] ?? defaultEntry();
}

export function getAllProgress(): ProgressMap {
  return read();
}

function update(id: string, patch: Partial<ProgressEntry>): void {
  const current = read();
  const existing = current[id] ?? defaultEntry();
  const next: ProgressMap = { ...current, [id]: { ...existing, ...patch } };
  write(next);
}

export const progressRepo = {
  toggleCompleted(id: string): void {
    const e = getEntry(id);
    update(id, {
      completed: !e.completed,
      completedAt: !e.completed ? new Date().toISOString() : null,
    });
  },
  toggleBookmarked(id: string): void {
    const e = getEntry(id);
    update(id, { bookmarked: !e.bookmarked });
  },
  toggleNeedsRevision(id: string): void {
    const e = getEntry(id);
    update(id, {
      needsRevision: !e.needsRevision,
      lastRevisedAt: !e.needsRevision ? null : new Date().toISOString(),
    });
  },
  setNotes(id: string, notes: string): void {
    update(id, { notes });
  },
  resetAll(): void {
    write({});
  },
};

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// Hook: subscribe components to progress changes.
export function useProgress(): ProgressMap {
  return useSyncExternalStore(subscribe, read, () => ({}));
}

export function useProgressEntry(id: string): ProgressEntry {
  const all = useProgress();
  return all[id] ?? defaultEntry();
}
