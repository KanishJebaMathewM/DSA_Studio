import { useEffect, useRef, useState } from "react";
import { StickyNote } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { createDraft, editDraft, isDirty, syncDraft } from "@/lib/notes-draft";
import { hasNotes, progressRepo, useProgressEntry } from "@/lib/progress-store";

const SAVE_DELAY_MS = 500;
const MAX_LENGTH = 2000;

// Editor body shared by the desktop popover and the mobile sheet.
// Keeps a local draft and saves it after a short pause in typing, and
// once more on unmount (panel closed) so the last keystrokes aren't lost.
function NotesEditor({ problemId, autoFocus }: { problemId: string; autoFocus?: boolean }) {
  const saved = useProgressEntry(problemId).notes ?? "";
  const [stored, setStored] = useState(() => createDraft(saved));
  // Adopt notes saved elsewhere (e.g. another tab) unless there are unsaved edits.
  const state = syncDraft(stored, saved);
  if (state !== stored) setStored(state);

  const { draft } = state;
  const dirty = isDirty(state);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    if (!dirty) return;
    const t = setTimeout(() => progressRepo.setNotes(problemId, draft), SAVE_DELAY_MS);
    return () => clearTimeout(t);
  }, [draft, dirty, problemId]);

  useEffect(() => {
    return () => {
      // Flush unsaved edits when the panel closes.
      if (isDirty(stateRef.current)) {
        progressRepo.setNotes(problemId, stateRef.current.draft);
      }
    };
  }, [problemId]);

  return (
    <div className="space-y-1.5">
      <Textarea
        value={draft}
        onChange={(e) => setStored(editDraft(state, e.target.value))}
        maxLength={MAX_LENGTH}
        autoFocus={autoFocus}
        rows={6}
        placeholder="Key idea, edge cases, complexity…"
        aria-label="Notes"
        className="resize-y text-sm"
      />
      <div className="flex justify-between text-[11px] text-muted-foreground">
        <span>{dirty ? "Saving…" : "Saved"}</span>
        <span>
          {draft.length} / {MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}

export function ProblemNotes({
  problemId,
  problemTitle,
  variant,
}: {
  problemId: string;
  problemTitle: string;
  variant: "desktop" | "mobile";
}) {
  const notes = useProgressEntry(problemId).notes;
  const active = hasNotes(notes);
  const [open, setOpen] = useState(false);

  const label = active ? `Edit notes for ${problemTitle}` : `Add notes for ${problemTitle}`;

  if (variant === "mobile") {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-hover hover:text-foreground active:scale-95 transition-all cursor-pointer"
            title={active ? "View / edit notes" : "Add notes"}
          >
            <StickyNote
              className={`h-4 w-4 ${active ? "fill-primary/20 text-primary" : "text-muted-foreground"}`}
            />
          </button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="rounded-t-xl max-h-[85vh] p-4 sm:p-6 overflow-y-auto"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="break-words text-base sm:text-lg">{problemTitle}</SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground">
              Your notes are saved automatically.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-3">{open && <NotesEditor problemId={problemId} />}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label={label}
          className={`opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100 ${
            active ? "opacity-100" : ""
          }`}
        >
          <StickyNote
            className={`h-[var(--icon-sm)] w-[var(--icon-sm)] ${
              active
                ? "fill-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 max-w-[calc(100vw-2rem)] p-3 sm:p-4">
        <p className="mb-2 truncate text-fluid-sm font-medium">{problemTitle}</p>
        {open && <NotesEditor problemId={problemId} autoFocus />}
      </PopoverContent>
    </Popover>
  );
}
