/**
 * Cross-tab and failed-save tests for src/lib/progress-store.ts, plus the notes
 * draft logic. Each "tab" is a separate instance of the store module sharing
 * one mocked localStorage and one mocked lock manager.
 *
 * Run with: node tests/cross-tab.test.mjs (Requires Node.js v22.6+, or Bun)
 */

import assert from "node:assert/strict";
import { createDraft, editDraft, isDirty, syncDraft } from "../src/lib/notes-draft.ts";

const KEY = "dsa-sheet-progress-v1";
let data = {};
let quotaExceeded = false;
let setItemCalls = 0;
let pagehide = [];

globalThis.localStorage = {
  getItem: (k) => data[k] ?? null,
  setItem: (k, v) => {
    setItemCalls++;
    if (quotaExceeded) throw new Error("QuotaExceededError");
    data[k] = String(v);
  },
};
globalThis.window = {
  addEventListener: (type, fn) => type === "pagehide" && pagehide.push(fn),
  removeEventListener: () => {},
};

// Lock requests wait until the test grants them, one at a time.
let queue = [];
const locks = {
  request: (_name, fn) =>
    new Promise((resolve) => {
      queue.push(() => resolve(fn()));
    }),
};
const grantAll = () => {
  while (queue.length) queue.shift()();
};
const setLocks = (value) =>
  Object.defineProperty(globalThis, "navigator", { value: { locks: value }, configurable: true });

let tabs = 0;
const openTab = () => import(`../src/lib/progress-store.ts?tab=${++tabs}`);
const saved = () => JSON.parse(data[KEY] ?? "{}");

let passed = 0;
let failed = 0;
async function test(name, fn) {
  data = {};
  quotaExceeded = false;
  setItemCalls = 0;
  queue = [];
  pagehide = [];
  setLocks(locks);
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}\n     ${err.message}`);
    failed++;
  }
}

console.log("\n🔀 Cross-tab, failed-save and notes draft tests\n");

await test("toggle flips the latest stored value, not a stale cached one", async () => {
  const a = await openTab();
  a.getAllProgress(); // prime the cache
  data[KEY] = JSON.stringify({ x: { bookmarked: true } });
  a.progressRepo.toggleBookmarked("x");
  grantAll();
  assert.equal(saved().x.bookmarked, false);
});

await test("edits show immediately, before the lock is granted", async () => {
  const a = await openTab();
  a.progressRepo.toggleCompleted("x");
  assert.equal(a.getEntry("x").completed, true);
  assert.equal(setItemCalls, 0);
  assert.equal(a.getAllProgress(), a.getAllProgress(), "snapshot reference must be stable");
});

await test("simultaneous edits to different problems are both saved", async () => {
  const [a, b] = [await openTab(), await openTab()];
  a.progressRepo.toggleCompleted("x");
  b.progressRepo.toggleCompleted("y"); // neither has saved yet
  grantAll();
  assert.equal(saved().x.completed, true);
  assert.equal(saved().y.completed, true);
});

await test("simultaneous edits to different fields of one problem are both saved", async () => {
  const [a, b] = [await openTab(), await openTab()];
  a.progressRepo.setNotes("x", "from a");
  b.progressRepo.toggleBookmarked("x");
  grantAll();
  assert.equal(saved().x.notes, "from a");
  assert.equal(saved().x.bookmarked, true);
});

await test("several edits before the lock is granted are saved together", async () => {
  const a = await openTab();
  a.progressRepo.toggleCompleted("x");
  a.progressRepo.toggleCompleted("x");
  a.progressRepo.setNotes("y", "n");
  assert.equal(queue.length, 1);
  grantAll();
  assert.equal(saved().x.completed, false);
  assert.equal(saved().y.notes, "n");
});

await test("a failed save is kept and included in the next successful one", async () => {
  const a = await openTab();
  quotaExceeded = true;
  a.progressRepo.setNotes("x", "keep me");
  grantAll();
  assert.deepEqual(saved(), {});
  a.progressRepo.toggleCompleted("y"); // used to discard x
  grantAll();
  assert.equal(a.getEntry("x").notes, "keep me");
  quotaExceeded = false;
  a.progressRepo.toggleBookmarked("z");
  grantAll();
  assert.equal(saved().x.notes, "keep me");
  assert.equal(saved().y.completed, true);
  assert.equal(saved().z.bookmarked, true);
});

await test("retrying a failed save does not revert another tab's changes", async () => {
  const [a, b] = [await openTab(), await openTab()];
  quotaExceeded = true;
  a.progressRepo.setNotes("x", "from a");
  grantAll();
  quotaExceeded = false;
  b.progressRepo.toggleCompleted("x");
  grantAll();
  a.progressRepo.toggleBookmarked("y");
  grantAll();
  assert.equal(saved().x.notes, "from a");
  assert.equal(saved().x.completed, true);
});

await test("pending edits are cleared after a successful save", async () => {
  const a = await openTab();
  a.progressRepo.setNotes("x", "old");
  grantAll();
  data[KEY] = JSON.stringify({ x: { notes: "newer" } });
  a.progressRepo.toggleBookmarked("y");
  grantAll();
  assert.equal(saved().x.notes, "newer");
});

await test("resetAll() clears everything, and later edits survive it", async () => {
  data[KEY] = JSON.stringify({ x: { completed: true } });
  const a = await openTab();
  a.progressRepo.setNotes("x", "gone");
  a.progressRepo.resetAll();
  a.progressRepo.toggleBookmarked("y");
  assert.equal(a.getEntry("x").completed, false);
  grantAll();
  assert.deepEqual(Object.keys(saved()), ["y"]);
});

await test("closing the page saves edits still waiting for the lock", async () => {
  const a = await openTab();
  a.progressRepo.toggleCompleted("x");
  pagehide.forEach((fn) => fn());
  assert.equal(saved().x.completed, true);
  grantAll();
  assert.equal(setItemCalls, 1, "the late lock grant must not save again");
});

await test("saves immediately when Web Locks are unavailable", async () => {
  setLocks(undefined);
  const a = await openTab();
  a.progressRepo.toggleCompleted("x");
  assert.equal(saved().x.completed, true);
});

await test("saves without the lock when the lock request is rejected", async () => {
  setLocks({ request: () => Promise.reject(new Error("SecurityError")) });
  const a = await openTab();
  a.progressRepo.toggleCompleted("x");
  await new Promise((resolve) => setTimeout(resolve));
  assert.equal(saved().x.completed, true);
});

await test("clean notes draft follows a remote change and stays clean", () => {
  const s = syncDraft(createDraft("old"), "remote");
  assert.equal(s.draft, "remote");
  assert.equal(isDirty(s), false, "a clean draft must never be autosaved");
});

await test("unsaved notes edits survive a remote change", () => {
  const s = syncDraft(editDraft(createDraft("old"), "mine"), "remote");
  assert.equal(s.draft, "mine");
  assert.equal(isDirty(s), true);
});

await test("notes draft becomes clean once its own save lands", () => {
  const s = syncDraft(editDraft(createDraft("old"), "mine"), "mine");
  assert.equal(isDirty(s), false);
  assert.equal(syncDraft(s, "remote").draft, "remote");
});

await test("undoing an edit after a remote change adopts the remote notes", () => {
  let s = syncDraft(editDraft(createDraft("old"), "mine"), "remote");
  s = syncDraft(editDraft(s, "old"), "remote");
  assert.equal(s.draft, "remote");
  assert.equal(isDirty(s), false);
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);
if (failed > 0) {
  process.exit(1);
}
