// DSA Roadmap — complete scratch-to-expert learning order
//
// This file encodes the canonical ordering of all 22 DSA topics across both
// data files (problems.ts and dsa-topics.ts). The UI should use this to render
// topics in learning sequence rather than insertion order.
//
// Phase definitions:
//   Foundation   — No prior DS/Algo knowledge assumed. Basic CS + math.
//   Intermediate — Arrays/Strings/Hashing mastered. Core DS expected.
//   Advanced     — Graphs, DP, and all standard DS covered.

export type RoadmapPhase = "Foundation" | "Intermediate" | "Advanced";
export type DataSource = "problems" | "dsa-topics";

export interface RoadmapEntry {
  /** Global 1-based position in the full learning path */
  order: number;
  /** Matches Topic.slug in the relevant data file */
  slug: string;
  /** Human-readable display name */
  name: string;
  /** Which data file this topic lives in */
  source: DataSource;
  /** Broad skill tier */
  phase: RoadmapPhase;
  /** Short one-liner shown in roadmap overview cards */
  tagline: string;
  /** Lucide icon name (must match the Topic.icon field) */
  icon: string;
}

export const ROADMAP: RoadmapEntry[] = [
  // ──────────────────────────────────────────────────────────
  // FOUNDATION  (topics 1–8)
  // ──────────────────────────────────────────────────────────
  {
    order: 1,
    slug: "math",
    name: "Math & Number Theory",
    source: "dsa-topics",
    phase: "Foundation",
    tagline: "Primes, GCD, modular arithmetic, digit tricks",
    icon: "Calculator",
  },
  {
    order: 2,
    slug: "arrays",
    name: "Arrays",
    source: "dsa-topics",
    phase: "Foundation",
    tagline: "Kadane's, intervals, permutations, classic hard problems",
    icon: "LayoutList",
  },
  {
    order: 3,
    slug: "strings",
    name: "Strings",
    source: "dsa-topics",
    phase: "Foundation",
    tagline: "Palindromes, sliding window, DP on strings",
    icon: "Type",
  },
  {
    order: 4,
    slug: "hashing",
    name: "Hashing",
    source: "dsa-topics",
    phase: "Foundation",
    tagline: "HashMap / HashSet patterns, LRU & LFU cache",
    icon: "Hash",
  },
  {
    order: 5,
    slug: "two-pointers",
    name: "Two Pointers",
    source: "problems",
    phase: "Foundation",
    tagline: "Converging pointers, fast-slow, sorted-array tricks",
    icon: "ArrowLeftRight",
  },
  {
    order: 6,
    slug: "sliding-window",
    name: "Sliding Window",
    source: "problems",
    phase: "Foundation",
    tagline: "Fixed and variable windows over arrays / strings",
    icon: "AppWindow",
  },
  {
    order: 7,
    slug: "prefix-sum",
    name: "Prefix Sum",
    source: "problems",
    phase: "Foundation",
    tagline: "Range-sum queries and 2D prefix sums",
    icon: "Sigma",
  },
  {
    order: 8,
    slug: "sorting",
    name: "Sorting",
    source: "problems",
    phase: "Foundation",
    tagline: "Merge sort, quick sort, counting sort, custom comparators",
    icon: "ArrowUpDown",
  },

  // ──────────────────────────────────────────────────────────
  // INTERMEDIATE  (topics 9–15)
  // ──────────────────────────────────────────────────────────
  {
    order: 9,
    slug: "linked-lists",
    name: "Linked Lists",
    source: "problems",
    phase: "Intermediate",
    tagline: "Reversal, cycle detection, merge, pointer manipulation",
    icon: "Link",
  },
  {
    order: 10,
    slug: "stack-queue",
    name: "Stack & Queue",
    source: "dsa-topics",
    phase: "Intermediate",
    tagline: "Monotonic stack, expression eval, deque window",
    icon: "Layers3",
  },
  {
    order: 11,
    slug: "binary-search",
    name: "Binary Search",
    source: "dsa-topics",
    phase: "Intermediate",
    tagline: "Index search, search-on-answer, rotated arrays",
    icon: "SearchCode",
  },
  {
    order: 12,
    slug: "recursion-backtracking",
    name: "Recursion & Backtracking",
    source: "dsa-topics",
    phase: "Intermediate",
    tagline: "Subsets, permutations, N-Queens, Sudoku",
    icon: "GitBranch",
  },
  {
    order: 13,
    slug: "trees",
    name: "Trees",
    source: "problems",
    phase: "Intermediate",
    tagline: "BST, traversals, LCA, paths, serialization",
    icon: "Network",
  },
  {
    order: 14,
    slug: "heap-priority-queue",
    name: "Heap / Priority Queue",
    source: "dsa-topics",
    phase: "Intermediate",
    tagline: "Top-K, two-heap median, k-way merge, scheduling",
    icon: "ListOrdered",
  },
  {
    order: 15,
    slug: "greedy",
    name: "Greedy",
    source: "dsa-topics",
    phase: "Intermediate",
    tagline: "Exchange arguments, interval scheduling, jump games",
    icon: "TrendingUp",
  },

  // ──────────────────────────────────────────────────────────
  // ADVANCED  (topics 16–22)
  // ──────────────────────────────────────────────────────────
  {
    order: 16,
    slug: "graphs",
    name: "Graphs",
    source: "problems",
    phase: "Advanced",
    tagline: "BFS, DFS, Dijkstra, Union-Find, topological sort",
    icon: "Share2",
  },
  {
    order: 17,
    slug: "dynamic-programming",
    name: "Dynamic Programming",
    source: "problems",
    phase: "Advanced",
    tagline: "Memoization, tabulation, knapsack, interval, tree DP",
    icon: "Zap",
  },
  {
    order: 18,
    slug: "trie",
    name: "Trie (Prefix Tree)",
    source: "dsa-topics",
    phase: "Advanced",
    tagline: "Prefix dictionary, autocomplete, XOR maximization",
    icon: "TreePine",
  },
  {
    order: 19,
    slug: "bit-manipulation",
    name: "Bit Manipulation",
    source: "dsa-topics",
    phase: "Advanced",
    tagline: "Bitwise ops, XOR tricks, bitmask DP",
    icon: "Binary",
  },
  {
    order: 20,
    slug: "matrix",
    name: "Matrix / 2D Grid",
    source: "dsa-topics",
    phase: "Advanced",
    tagline: "In-place transforms, 2D DP, BFS on grids",
    icon: "Grid3x3",
  },
  {
    order: 21,
    slug: "string-algorithms",
    name: "String Algorithms",
    source: "dsa-topics",
    phase: "Advanced",
    tagline: "KMP, Z-function, rolling hash, Manacher's",
    icon: "CaseSensitive",
  },
  {
    order: 22,
    slug: "segment-tree-fenwick-tree",
    name: "Segment Tree & Fenwick Tree",
    source: "dsa-topics",
    phase: "Advanced",
    tagline: "Range queries, lazy propagation, inversion count",
    icon: "GitFork",
  },
];

/** Convenience: look up a roadmap entry by topic slug */
export const ROADMAP_MAP: Record<string, RoadmapEntry> = Object.fromEntries(
  ROADMAP.map((e) => [e.slug, e]),
);

/** Topics grouped by phase, in roadmap order */
export const ROADMAP_BY_PHASE: Record<RoadmapPhase, RoadmapEntry[]> = {
  Foundation:   ROADMAP.filter((e) => e.phase === "Foundation"),
  Intermediate: ROADMAP.filter((e) => e.phase === "Intermediate"),
  Advanced:     ROADMAP.filter((e) => e.phase === "Advanced"),
};
