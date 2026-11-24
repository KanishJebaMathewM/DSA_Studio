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
  try {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  } catch {
    // Accessing localStorage can throw in privacy-restricted browser contexts.
    return false;
  }
}

function read(): ProgressMap {
  if (typeof window === "undefined") return EMPTY_MAP;
  if (cache) return cache;
  if (!isBrowser()) return EMPTY_MAP;
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

// Edits that have not reached localStorage yet, as field-level patches. They
// stay here until a save succeeds, so a failed save never discards them.
const pending = new Map<string, Partial<ProgressEntry>>();
let pendingReset = false;

let view: ProgressMap | null = null;
let viewBase: ProgressMap | null = null;

function hasPending(): boolean {
  return pendingReset || pending.size > 0;
}

function applyPending(stored: ProgressMap): ProgressMap {
  const next: ProgressMap = pendingReset ? {} : { ...stored };
  for (const [id, patch] of pending) {
    next[id] = { ...defaultEntry(), ...next[id], ...patch };
  }
  return next;
}

// What the UI sees: stored progress plus pending edits. The result is reused
// until either changes, because useSyncExternalStore needs a stable reference.
function snapshot(): ProgressMap {
  const stored = read();
  if (!hasPending()) return stored;
  if (!view || viewBase !== stored) {
    view = applyPending(stored);
    viewBase = stored;
  }
  return view;
}

function notify(): void {
  listeners.forEach((l) => l());
}

// Merge pending edits into the latest stored map and save it. Synchronous, so
// nothing else in this tab can run between the read and the write.
function commit(): void {
  if (!hasPending() || !isBrowser()) return;
  cache = null;
  const next = applyPending(read());
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage is full or blocked: keep the edits pending and retry later.
    notify();
    return;
  }
  cache = next;
  pending.clear();
  pendingReset = false;
  view = null;
  notify();
}

// Browsers pass localStorage changes to other tabs asynchronously. Holding the
// lock briefly after a save lets the next tab see it before it reads.
const SETTLE_MS = 50;

let commitScheduled = false;
let unloadHooked = false;

// Save under a Web Lock so that only one tab at a time runs commit(). Browsers
// without Web Locks (or pages not allowed to use them) save immediately.
function scheduleCommit(): void {
  if (!isBrowser()) return;
  const locks = typeof navigator === "undefined" ? undefined : navigator.locks;
  if (!locks) {
    commit();
    return;
  }
  if (!unloadHooked) {
    unloadHooked = true;
    // Last chance to save: the page may be gone before the lock is granted.
    window.addEventListener("pagehide", commit);
  }
  if (commitScheduled) return;
  commitScheduled = true;
  const run = () => {
    commitScheduled = false;
    commit();
  };
  locks
    .request(STORAGE_KEY, async () => {
      run();
      await new Promise((resolve) => setTimeout(resolve, SETTLE_MS));
    })
    .catch(() => {
      if (commitScheduled) run();
    });
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
  const entry = snapshot()[id];
  return entry ? { ...defaultEntry(), ...entry } : defaultEntry();
}

/** True when a note contains more than whitespace. */
export function hasNotes(notes: string | undefined): boolean {
  return !!notes && notes.trim() !== "";
}

export function getAllProgress(): ProgressMap {
  return snapshot();
}

type EntryPatch = Partial<ProgressEntry> | ((entry: ProgressEntry) => Partial<ProgressEntry>);

function update(id: string, patch: EntryPatch): void {
  // Re-read from storage so we build on the latest data, not a stale
  // in-memory copy.
  cache = null;
  const current = snapshot();
  const existing = current[id] ? { ...defaultEntry(), ...current[id] } : defaultEntry();
  // Updater functions receive the freshly read entry, so toggles flip the
  // latest stored value rather than a stale cached one.
  const changes = typeof patch === "function" ? patch(existing) : patch;
  // Only the changed fields are queued, so saving can't revert other fields
  // or problems that another tab changed in the meantime.
  pending.set(id, { ...pending.get(id), ...changes });
  view = null;
  notify();
  scheduleCommit();
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
    pending.clear();
    pendingReset = true;
    view = null;
    notify();
    scheduleCommit();
  },
};

// The browser fires `storage` in every *other* tab of the same origin when
// localStorage changes. Drop our cache and re-render so this tab shows the
// new progress. `key === null` means the other tab called localStorage.clear().
function onStorage(e: StorageEvent): void {
  if (e.key !== null && e.key !== STORAGE_KEY) return;
  cache = null;
  notify();
  // Retry edits left over from a failed save; there may be room now.
  if (hasPending()) scheduleCommit();
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
  return useSyncExternalStore(subscribe, snapshot, getServerSnapshot);
}

export function useProgressEntry(id: string): ProgressEntry {
  const all = useProgress();
  const entry = all[id];
  return entry ? { ...defaultEntry(), ...entry } : defaultEntry();
}
