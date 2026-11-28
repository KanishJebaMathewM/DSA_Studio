// Draft state for the notes editor, kept free of React so it can be tested.
// `base` is the saved text the draft started from. The draft is dirty only
// when the user changed it relative to `base`, never because the saved text
// changed underneath it (e.g. in another tab).

export interface NotesDraft {
  base: string;
  draft: string;
}

export function createDraft(saved: string): NotesDraft {
  return { base: saved, draft: saved };
}

export function isDirty(state: NotesDraft): boolean {
  return state.draft !== state.base;
}

export function editDraft(state: NotesDraft, draft: string): NotesDraft {
  return { ...state, draft };
}

/** Reconcile with the saved text: refresh clean drafts, keep unsaved edits. */
export function syncDraft(state: NotesDraft, saved: string): NotesDraft {
  if (state.base === saved) return state;
  if (!isDirty(state) || state.draft === saved) return createDraft(saved);
  return state;
}
