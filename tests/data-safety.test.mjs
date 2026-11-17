/**
 * LocalStorage Data Safety Regression Test
 *
 * Imports and exercises the actual production progress store entry points
 * (src/lib/progress-store.ts) connected to mocked storage.
 * Verifies that updating progress preserves sibling entries, maintains backward
 * compatibility with partial legacy entries, and never erases user data.
 *
 * Run with: node tests/data-safety.test.mjs
 */

import assert from "node:assert/strict";

// --- 1. Set up storage mock on globalThis before store interactions ---
let store = {};
const mockLocalStorage = {
  getItem: (k) => store[k] ?? null,
  setItem: (k, v) => {
    store[k] = String(v);
  },
  removeItem: (k) => {
    delete store[k];
  },
  clear: () => {
    store = {};
  },
};

globalThis.localStorage = mockLocalStorage;
globalThis.window = {
  localStorage: mockLocalStorage,
};

// Seed realistic pre-existing data (mimics production dsa-sheet-progress-v1)
const SEED_DATA = {
  // Fully populated entry
  "prob-001": {
    completed: true,
    completedAt: "2026-10-15T10:30:00Z",
    needsRevision: false,
    bookmarked: true,
    notes: "Remember the two-pointer approach",
    lastRevisedAt: null,
  },
  // Partial entry (legacy entry missing newer fields)
  "prob-002": {
    completed: true,
    completedAt: "2026-10-20T08:00:00Z",
  },
  // Revision entry
  "prob-003": {
    completed: true,
    completedAt: "2026-10-22T14:00:00Z",
    needsRevision: true,
    bookmarked: false,
    notes: "",
    lastRevisedAt: "2026-10-22T14:00:00Z",
  },
  // Unsolved bookmarked entry
  "prob-004": {
    completed: false,
    completedAt: null,
    needsRevision: false,
    bookmarked: true,
    notes: "Try again later",
    lastRevisedAt: null,
  },
};

// Pre-seed storage before importing the store
store["dsa-sheet-progress-v1"] = JSON.stringify(SEED_DATA);

// --- 2. Import actual production store entry points ---
const { progressRepo, getEntry, getAllProgress, defaultEntry } =
  await import("../src/lib/progress-store.ts");

// --- 3. Test Runner & Assertions ---
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     ${err.message}`);
    failed++;
  }
}

console.log("\n📦 DSA Studio — Production Progress Store Data Safety Tests\n");

// Test 1: getAllProgress() reads pre-existing seeded data
test("getAllProgress() returns all seeded entries from storage", () => {
  const data = getAllProgress();
  assert.ok(data["prob-001"], "prob-001 should exist");
  assert.ok(data["prob-002"], "prob-002 should exist");
  assert.ok(data["prob-003"], "prob-003 should exist");
  assert.ok(data["prob-004"], "prob-004 should exist");
});

// Test 2: getEntry() preserves complete fields
test("getEntry() on fully populated problem returns all fields intact", () => {
  const e = getEntry("prob-001");
  assert.equal(e.completed, true);
  assert.equal(e.completedAt, "2026-10-15T10:30:00Z");
  assert.equal(e.needsRevision, false);
  assert.equal(e.bookmarked, true);
  assert.equal(e.notes, "Remember the two-pointer approach");
});

// Test 3: getEntry() merges defaults for legacy partial entries
test("getEntry() on partial entry merges defaultEntry() without dropping saved values", () => {
  const e = getEntry("prob-002");
  const defaults = defaultEntry();
  assert.equal(e.completed, true, "saved completed should be preserved");
  assert.equal(e.completedAt, "2026-10-20T08:00:00Z", "saved completedAt should be preserved");
  assert.equal(e.needsRevision, defaults.needsRevision, "missing needsRevision should default");
  assert.equal(e.bookmarked, defaults.bookmarked, "missing bookmarked should default");
  assert.equal(e.notes, defaults.notes, "missing notes should default");
});

// Test 4: progressRepo preserves sibling entries when updating a problem
test("progressRepo.toggleCompleted() preserves sibling entries and their data", () => {
  // Toggle prob-002 completed status
  progressRepo.toggleCompleted("prob-002");

  const e001 = getEntry("prob-001");
  const e002 = getEntry("prob-002");
  const e004 = getEntry("prob-004");

  // Sibling prob-001 must be completely untouched
  assert.equal(e001.completed, true, "sibling prob-001 completed must remain true");
  assert.equal(e001.notes, "Remember the two-pointer approach", "sibling prob-001 notes preserved");
  assert.equal(e001.bookmarked, true, "sibling prob-001 bookmarked preserved");

  // Sibling prob-004 must be completely untouched
  assert.equal(e004.bookmarked, true, "sibling prob-004 bookmarked must remain true");
  assert.equal(e004.notes, "Try again later", "sibling prob-004 notes preserved");

  // Target prob-002 was toggled
  assert.equal(e002.completed, false, "prob-002 completed should have toggled to false");
});

// Test 5: progressRepo.setNotes() modifies only notes, preserves other fields
test("progressRepo.setNotes() patches notes without overwriting completed or bookmarked", () => {
  progressRepo.setNotes("prob-001", "Updated note for binary search variant");
  const e001 = getEntry("prob-001");

  assert.equal(e001.notes, "Updated note for binary search variant");
  assert.equal(e001.completed, true, "completed state must not be overwritten");
  assert.equal(e001.completedAt, "2026-10-15T10:30:00Z", "completedAt must not be overwritten");
  assert.equal(e001.bookmarked, true, "bookmarked must not be overwritten");
});

// Test 6: progressRepo.toggleBookmarked() on sibling
test("progressRepo.toggleBookmarked() preserves other fields", () => {
  progressRepo.toggleBookmarked("prob-004"); // was true -> toggles to false
  const e004 = getEntry("prob-004");

  assert.equal(e004.bookmarked, false);
  assert.equal(e004.notes, "Try again later", "notes preserved");
});

// Test 7: progressRepo.toggleNeedsRevision() on new problem creates entry safely
test("progressRepo.toggleNeedsRevision() on an unseeded problem initializes safely", () => {
  progressRepo.toggleNeedsRevision("prob-new-999");
  const e = getEntry("prob-new-999");

  assert.equal(e.needsRevision, true);
  assert.equal(e.completed, false);
  assert.equal(e.bookmarked, false);
  assert.equal(e.notes, "");

  // Verify siblings are still safe
  const e001 = getEntry("prob-001");
  assert.equal(e001.completed, true, "prob-001 still intact after adding new problem");
});

// Test 8: Underlying localStorage key is verified as production key
test("production store writes to the exact key 'dsa-sheet-progress-v1'", () => {
  const raw = mockLocalStorage.getItem("dsa-sheet-progress-v1");
  assert.ok(raw, "dsa-sheet-progress-v1 must exist in localStorage");

  const parsed = JSON.parse(raw);
  assert.ok(parsed["prob-001"], "stored JSON must contain prob-001");
  assert.ok(parsed["prob-new-999"], "stored JSON must contain newly added prob-new-999");
});

// ============================================================
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);
if (failed > 0) {
  process.exit(1);
}
