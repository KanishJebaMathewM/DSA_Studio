// DSA Topics — Full catalog for dsa-topics.ts
// Covers 14 topics ordered from foundational to advanced:
//   Math → Arrays → Strings → Hashing →
//   Binary Search → Stack & Queue → Recursion & Backtracking → Heap →
//   Greedy → Trie → Bit Manipulation → Matrix →
//   String Algorithms → Segment Tree & Fenwick Tree
//
// Self-contained: exports PROBLEMS, PROBLEM_MAP, and TOPICS.
// Merge with problems.ts at the application level for full coverage.

export type Difficulty = "Easy" | "Medium" | "Hard" | "Unverified";
export type Platform = "LeetCode" | "GFG" | "CSES" | "AtCoder";

export interface Problem {
  id: string;
  title: string;
  url: string;
  platform: Platform;
  difficulty: Difficulty;
}

export interface LevelProblem {
  id: string;
  category?: string;
}

export interface Level {
  number: number;
  title: string;
  problems: LevelProblem[];
}

export interface Part {
  title: string;
  levels: Level[];
}

export interface Topic {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: string;
  order: number; // roadmap position within this file (1-14)
  parts?: Part[];
  levels?: Level[];
}

const LC = "LeetCode" as const;
const GFG_ = "GFG" as const;

function p(
  id: string,
  title: string,
  url: string,
  platform: Platform,
  difficulty: Difficulty,
): Problem {
  return { id, title, url, platform, difficulty };
}

// ---------------------------------------------------------------------------
// Problem catalog (all 14 topics)
// ---------------------------------------------------------------------------

export const PROBLEMS: Problem[] = [

  // ═══════════════════════════════════════════════════════════
  // TIER 1 — FOUNDATION
  // ═══════════════════════════════════════════════════════════

  // ─── 1. MATH & NUMBER THEORY ───────────────────────────────
  p("fizz-buzz", "Fizz Buzz", "https://leetcode.com/problems/fizz-buzz/", LC, "Easy"),
  p("palindrome-number", "Palindrome Number", "https://leetcode.com/problems/palindrome-number/", LC, "Easy"),
  p("happy-number", "Happy Number", "https://leetcode.com/problems/happy-number/", LC, "Easy"),
  p("power-of-three", "Power of Three", "https://leetcode.com/problems/power-of-three/", LC, "Easy"),
  p("add-digits", "Add Digits", "https://leetcode.com/problems/add-digits/", LC, "Easy"),
  p("roman-to-integer", "Roman to Integer", "https://leetcode.com/problems/roman-to-integer/", LC, "Easy"),
  p("excel-sheet-column-number", "Excel Sheet Column Number", "https://leetcode.com/problems/excel-sheet-column-number/", LC, "Easy"),
  p("self-dividing-numbers", "Self Dividing Numbers", "https://leetcode.com/problems/self-dividing-numbers/", LC, "Easy"),

  p("reverse-integer", "Reverse Integer", "https://leetcode.com/problems/reverse-integer/", LC, "Medium"),
  p("count-primes", "Count Primes", "https://leetcode.com/problems/count-primes/", LC, "Medium"),
  p("factorial-trailing-zeroes", "Factorial Trailing Zeroes", "https://leetcode.com/problems/factorial-trailing-zeroes/", LC, "Medium"),
  p("integer-to-roman", "Integer to Roman", "https://leetcode.com/problems/integer-to-roman/", LC, "Medium"),
  p("gfg-gcd-lcm", "LCM And GCD", "https://www.geeksforgeeks.org/problems/lcm-and-gcd4516/1", GFG_, "Unverified"),
  p("gfg-sieve", "Sieve of Eratosthenes", "https://www.geeksforgeeks.org/problems/sieve-of-eratosthenes5242/1", GFG_, "Unverified"),
  p("fraction-to-recurring-decimal", "Fraction to Recurring Decimal", "https://leetcode.com/problems/fraction-to-recurring-decimal/", LC, "Medium"),
  p("nth-digit", "Nth Digit", "https://leetcode.com/problems/nth-digit/", LC, "Medium"),

  p("super-pow", "Super Pow", "https://leetcode.com/problems/super-pow/", LC, "Medium"),
  p("ugly-number-ii", "Ugly Number II", "https://leetcode.com/problems/ugly-number-ii/", LC, "Medium"),
  p("largest-number-math", "Largest Number", "https://leetcode.com/problems/largest-number/", LC, "Medium"),
  p("number-of-digit-one", "Number of Digit One", "https://leetcode.com/problems/number-of-digit-one/", LC, "Hard"),

  p("gfg-modular-exponentiation", "Modular Exponentiation for Power", "https://www.geeksforgeeks.org/problems/modular-exponentiation-for-power/1", GFG_, "Unverified"),
  p("gfg-euler-totient", "Euler's Totient Function", "https://www.geeksforgeeks.org/problems/euler-totient-function/1", GFG_, "Unverified"),

  // ─── 2. ARRAYS ────────────────────────────────────────────
  p("two-sum", "Two Sum", "https://leetcode.com/problems/two-sum/", LC, "Easy"),
  p("best-time-to-buy-and-sell-stock", "Best Time to Buy and Sell Stock", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", LC, "Easy"),
  p("contains-duplicate", "Contains Duplicate", "https://leetcode.com/problems/contains-duplicate/", LC, "Easy"),
  p("maximum-subarray", "Maximum Subarray", "https://leetcode.com/problems/maximum-subarray/", LC, "Medium"),
  p("move-zeroes", "Move Zeroes", "https://leetcode.com/problems/move-zeroes/", LC, "Easy"),
  p("find-all-numbers-disappeared-in-an-array", "Find All Numbers Disappeared in an Array", "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/", LC, "Easy"),
  p("running-sum-of-1d-array", "Running Sum of 1d Array", "https://leetcode.com/problems/running-sum-of-1d-array/", LC, "Easy"),
  p("majority-element", "Majority Element", "https://leetcode.com/problems/majority-element/", LC, "Easy"),

  p("product-of-array-except-self", "Product of Array Except Self", "https://leetcode.com/problems/product-of-array-except-self/", LC, "Medium"),
  p("3sum", "3Sum", "https://leetcode.com/problems/3sum/", LC, "Medium"),
  p("container-with-most-water", "Container With Most Water", "https://leetcode.com/problems/container-with-most-water/", LC, "Medium"),
  p("rotate-array", "Rotate Array", "https://leetcode.com/problems/rotate-array/", LC, "Medium"),
  p("merge-intervals", "Merge Intervals", "https://leetcode.com/problems/merge-intervals/", LC, "Medium"),
  p("insert-interval", "Insert Interval", "https://leetcode.com/problems/insert-interval/", LC, "Medium"),
  p("next-permutation", "Next Permutation", "https://leetcode.com/problems/next-permutation/", LC, "Medium"),
  p("maximum-product-subarray", "Maximum Product Subarray", "https://leetcode.com/problems/maximum-product-subarray/", LC, "Medium"),
  p("maximum-points-you-can-obtain-from-cards", "Maximum Points You Can Obtain from Cards", "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/", LC, "Medium"),

  p("first-missing-positive", "First Missing Positive", "https://leetcode.com/problems/first-missing-positive/", LC, "Hard"),
  p("4sum", "4Sum", "https://leetcode.com/problems/4sum/", LC, "Medium"),
  p("best-time-to-buy-and-sell-stock-iii", "Best Time to Buy and Sell Stock III", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/", LC, "Hard"),
  p("trapping-rain-water-arr", "Trapping Rain Water", "https://leetcode.com/problems/trapping-rain-water/", LC, "Hard"),

  p("maximum-gap", "Maximum Gap", "https://leetcode.com/problems/maximum-gap/", LC, "Hard"),
  p("gfg-maximum-sum-increasing-subsequence", "Maximum Sum Increasing Subsequence", "https://www.geeksforgeeks.org/problems/maximum-sum-increasing-subsequence4749/1", GFG_, "Unverified"),

  // ─── 3. STRINGS (BASICS) ────────────────────────────────
  p("valid-palindrome", "Valid Palindrome", "https://leetcode.com/problems/valid-palindrome/", LC, "Easy"),
  p("to-lower-case", "To Lower Case", "https://leetcode.com/problems/to-lower-case/", LC, "Easy"),
  p("first-unique-character-in-a-string", "First Unique Character in a String", "https://leetcode.com/problems/first-unique-character-in-a-string/", LC, "Easy"),
  p("longest-common-prefix", "Longest Common Prefix", "https://leetcode.com/problems/longest-common-prefix/", LC, "Easy"),
  p("reverse-words-in-a-string-iii", "Reverse Words in a String III", "https://leetcode.com/problems/reverse-words-in-a-string-iii/", LC, "Easy"),
  p("check-if-two-string-arrays-are-equivalent", "Check If Two String Arrays are Equivalent", "https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent/", LC, "Easy"),
  p("defanging-an-ip-address", "Defanging an IP Address", "https://leetcode.com/problems/defanging-an-ip-address/", LC, "Easy"),

  p("longest-substring-without-repeating-characters", "Longest Substring Without Repeating Characters", "https://leetcode.com/problems/longest-substring-without-repeating-characters/", LC, "Medium"),
  p("longest-palindromic-substring", "Longest Palindromic Substring", "https://leetcode.com/problems/longest-palindromic-substring/", LC, "Medium"),
  p("string-to-integer-atoi", "String to Integer (atoi)", "https://leetcode.com/problems/string-to-integer-atoi/", LC, "Medium"),
  p("count-and-say", "Count and Say", "https://leetcode.com/problems/count-and-say/", LC, "Medium"),
  p("decode-ways", "Decode Ways", "https://leetcode.com/problems/decode-ways/", LC, "Medium"),
  p("word-break", "Word Break", "https://leetcode.com/problems/word-break/", LC, "Medium"),
  p("zigzag-conversion", "Zigzag Conversion", "https://leetcode.com/problems/zigzag-conversion/", LC, "Medium"),
  p("reverse-words-in-a-string", "Reverse Words in a String", "https://leetcode.com/problems/reverse-words-in-a-string/", LC, "Medium"),

  p("minimum-window-substring", "Minimum Window Substring", "https://leetcode.com/problems/minimum-window-substring/", LC, "Hard"),
  p("edit-distance", "Edit Distance", "https://leetcode.com/problems/edit-distance/", LC, "Medium"),
  p("interleaving-string", "Interleaving String", "https://leetcode.com/problems/interleaving-string/", LC, "Medium"),
  p("number-of-atoms", "Number of Atoms", "https://leetcode.com/problems/number-of-atoms/", LC, "Hard"),

  p("longest-palindromic-subsequence", "Longest Palindromic Subsequence", "https://leetcode.com/problems/longest-palindromic-subsequence/", LC, "Medium"),
  p("gfg-anagram-palindrome", "Check if characters of a given string can be rearranged to form a palindrome", "https://www.geeksforgeeks.org/problems/anagram-palindrome/1", GFG_, "Unverified"),

  // ─── 4. HASHING ──────────────────────────────────────────
  p("design-hashset", "Design HashSet", "https://leetcode.com/problems/design-hashset/", LC, "Easy"),
  p("design-hashmap", "Design HashMap", "https://leetcode.com/problems/design-hashmap/", LC, "Easy"),
  p("jewels-and-stones", "Jewels and Stones", "https://leetcode.com/problems/jewels-and-stones/", LC, "Easy"),
  p("unique-number-of-occurrences", "Unique Number of Occurrences", "https://leetcode.com/problems/unique-number-of-occurrences/", LC, "Easy"),
  p("contains-duplicate-ii", "Contains Duplicate II", "https://leetcode.com/problems/contains-duplicate-ii/", LC, "Easy"),

  p("4sum-ii", "4Sum II", "https://leetcode.com/problems/4sum-ii/", LC, "Medium"),
  p("brick-wall", "Brick Wall", "https://leetcode.com/problems/brick-wall/", LC, "Medium"),
  p("subarray-sum-equals-k", "Subarray Sum Equals K", "https://leetcode.com/problems/subarray-sum-equals-k/", LC, "Medium"),
  p("maximum-erasure-value", "Maximum Erasure Value", "https://leetcode.com/problems/maximum-erasure-value/", LC, "Medium"),
  p("number-of-boomerangs", "Number of Boomerangs", "https://leetcode.com/problems/number-of-boomerangs/", LC, "Medium"),
  p("gfg-largest-subarray-with-zero-sum", "Largest Subarray with Zero Sum", "https://www.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1", GFG_, "Unverified"),
  p("lru-cache", "LRU Cache", "https://leetcode.com/problems/lru-cache/", LC, "Medium"),
  p("gfg-count-distinct-elements-window", "Count Distinct Elements in Every Window", "https://www.geeksforgeeks.org/problems/count-distinct-elements-in-every-window/1", GFG_, "Unverified"),

  p("subarrays-with-k-different-integers", "Subarrays with K Different Integers", "https://leetcode.com/problems/subarrays-with-k-different-integers/", LC, "Hard"),
  p("lfu-cache", "LFU Cache", "https://leetcode.com/problems/lfu-cache/", LC, "Hard"),

  p("all-oone-data-structure", "All O'one Data Structure", "https://leetcode.com/problems/all-oone-data-structure/", LC, "Hard"),

  // ═══════════════════════════════════════════════════════════
  // TIER 2 — INTERMEDIATE
  // ═══════════════════════════════════════════════════════════

  // ─── 5. BINARY SEARCH ────────────────────────────────────
  p("binary-search", "Binary Search", "https://leetcode.com/problems/binary-search/", LC, "Easy"),
  p("search-insert-position", "Search Insert Position", "https://leetcode.com/problems/search-insert-position/", LC, "Easy"),
  p("sqrtx", "Sqrt(x)", "https://leetcode.com/problems/sqrtx/", LC, "Easy"),
  p("first-bad-version", "First Bad Version", "https://leetcode.com/problems/first-bad-version/", LC, "Easy"),
  p("valid-perfect-square", "Valid Perfect Square", "https://leetcode.com/problems/valid-perfect-square/", LC, "Easy"),
  p("guess-number-higher-or-lower", "Guess Number Higher or Lower", "https://leetcode.com/problems/guess-number-higher-or-lower/", LC, "Easy"),
  p("count-negative-numbers-in-a-sorted-matrix", "Count Negative Numbers in a Sorted Matrix", "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/", LC, "Easy"),
  p("gfg-binary-search-basic", "Binary Search", "https://www.geeksforgeeks.org/problems/binary-search-1587115621/1", GFG_, "Unverified"),
  p("find-first-and-last-position-of-element-in-sorted-array", "Find First and Last Position of Element in Sorted Array", "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", LC, "Medium"),
  p("search-in-rotated-sorted-array", "Search in Rotated Sorted Array", "https://leetcode.com/problems/search-in-rotated-sorted-array/", LC, "Medium"),
  p("search-in-rotated-sorted-array-ii", "Search in Rotated Sorted Array II", "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/", LC, "Medium"),
  p("find-minimum-in-rotated-sorted-array", "Find Minimum in Rotated Sorted Array", "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", LC, "Medium"),
  p("find-peak-element", "Find Peak Element", "https://leetcode.com/problems/find-peak-element/", LC, "Medium"),
  p("search-a-2d-matrix", "Search a 2D Matrix", "https://leetcode.com/problems/search-a-2d-matrix/", LC, "Medium"),
  p("search-a-2d-matrix-ii", "Search a 2D Matrix II", "https://leetcode.com/problems/search-a-2d-matrix-ii/", LC, "Medium"),
  p("koko-eating-bananas", "Koko Eating Bananas", "https://leetcode.com/problems/koko-eating-bananas/", LC, "Medium"),
  p("capacity-to-ship-packages-within-d-days", "Capacity To Ship Packages Within D Days", "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", LC, "Medium"),
  p("find-k-closest-elements", "Find K Closest Elements", "https://leetcode.com/problems/find-k-closest-elements/", LC, "Medium"),
  p("single-element-in-a-sorted-array", "Single Element in a Sorted Array", "https://leetcode.com/problems/single-element-in-a-sorted-array/", LC, "Medium"),
  p("minimum-number-of-days-to-make-m-bouquets", "Minimum Number of Days to Make m Bouquets", "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/", LC, "Medium"),
  p("find-the-duplicate-number", "Find the Duplicate Number", "https://leetcode.com/problems/find-the-duplicate-number/", LC, "Medium"),
  p("magnetic-force-between-two-balls", "Magnetic Force Between Two Balls", "https://leetcode.com/problems/magnetic-force-between-two-balls/", LC, "Medium"),
  p("median-of-two-sorted-arrays", "Median of Two Sorted Arrays", "https://leetcode.com/problems/median-of-two-sorted-arrays/", LC, "Hard"),
  p("split-array-largest-sum", "Split Array Largest Sum", "https://leetcode.com/problems/split-array-largest-sum/", LC, "Hard"),
  p("find-minimum-in-rotated-sorted-array-ii", "Find Minimum in Rotated Sorted Array II", "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/", LC, "Hard"),
  p("kth-smallest-element-in-a-sorted-matrix-bs", "Kth Smallest Element in a Sorted Matrix", "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", LC, "Medium"),
  p("find-k-th-smallest-pair-distance", "Find K-th Smallest Pair Distance", "https://leetcode.com/problems/find-k-th-smallest-pair-distance/", LC, "Hard"),
  p("gfg-allocate-minimum-pages", "Allocate Minimum Number of Pages", "https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1", GFG_, "Unverified"),
  p("gfg-aggressive-cows", "Aggressive Cows", "https://www.geeksforgeeks.org/problems/aggressive-cows/1", GFG_, "Unverified"),
  p("divide-chocolate", "Divide Chocolate", "https://leetcode.com/problems/divide-chocolate/", LC, "Hard"),
  p("minimize-max-distance-to-gas-station", "Minimize Max Distance to Gas Station", "https://leetcode.com/problems/minimize-max-distance-to-gas-station/", LC, "Hard"),
  p("ugly-number-iii", "Ugly Number III", "https://leetcode.com/problems/ugly-number-iii/", LC, "Medium"),
  p("russian-doll-envelopes-bs", "Russian Doll Envelopes", "https://leetcode.com/problems/russian-doll-envelopes/", LC, "Hard"),
  p("count-of-range-sum", "Count of Range Sum", "https://leetcode.com/problems/count-of-range-sum/", LC, "Hard"),
  p("maximum-number-of-removable-characters", "Maximum Number of Removable Characters", "https://leetcode.com/problems/maximum-number-of-removable-characters/", LC, "Medium"),

  // ─── 6. STACK & QUEUE ────────────────────────────────────
  p("valid-parentheses", "Valid Parentheses", "https://leetcode.com/problems/valid-parentheses/", LC, "Easy"),
  p("min-stack", "Min Stack", "https://leetcode.com/problems/min-stack/", LC, "Medium"),
  p("baseball-game", "Baseball Game", "https://leetcode.com/problems/baseball-game/", LC, "Easy"),
  p("implement-queue-using-stacks", "Implement Queue using Stacks", "https://leetcode.com/problems/implement-queue-using-stacks/", LC, "Easy"),
  p("implement-stack-using-queues", "Implement Stack using Queues", "https://leetcode.com/problems/implement-stack-using-queues/", LC, "Easy"),
  p("remove-all-adjacent-duplicates-in-string", "Remove All Adjacent Duplicates In String", "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/", LC, "Easy"),
  p("backspace-string-compare-sq", "Backspace String Compare", "https://leetcode.com/problems/backspace-string-compare/", LC, "Easy"),
  p("design-circular-queue", "Design Circular Queue", "https://leetcode.com/problems/design-circular-queue/", LC, "Medium"),
  p("next-greater-element-i", "Next Greater Element I", "https://leetcode.com/problems/next-greater-element-i/", LC, "Easy"),
  p("next-greater-element-ii", "Next Greater Element II", "https://leetcode.com/problems/next-greater-element-ii/", LC, "Medium"),
  p("daily-temperatures", "Daily Temperatures", "https://leetcode.com/problems/daily-temperatures/", LC, "Medium"),
  p("evaluate-reverse-polish-notation", "Evaluate Reverse Polish Notation", "https://leetcode.com/problems/evaluate-reverse-polish-notation/", LC, "Medium"),
  p("decode-string", "Decode String", "https://leetcode.com/problems/decode-string/", LC, "Medium"),
  p("asteroid-collision", "Asteroid Collision", "https://leetcode.com/problems/asteroid-collision/", LC, "Medium"),
  p("online-stock-span", "Online Stock Span", "https://leetcode.com/problems/online-stock-span/", LC, "Medium"),
  p("simplify-path", "Simplify Path", "https://leetcode.com/problems/simplify-path/", LC, "Medium"),
  p("remove-k-digits", "Remove K Digits", "https://leetcode.com/problems/remove-k-digits/", LC, "Medium"),
  p("flatten-nested-list-iterator", "Flatten Nested List Iterator", "https://leetcode.com/problems/flatten-nested-list-iterator/", LC, "Medium"),
  p("largest-rectangle-in-histogram", "Largest Rectangle in Histogram", "https://leetcode.com/problems/largest-rectangle-in-histogram/", LC, "Hard"),
  p("maximal-rectangle-sq", "Maximal Rectangle", "https://leetcode.com/problems/maximal-rectangle/", LC, "Hard"),
  p("trapping-rain-water-sq", "Trapping Rain Water", "https://leetcode.com/problems/trapping-rain-water/", LC, "Hard"),
  p("basic-calculator", "Basic Calculator", "https://leetcode.com/problems/basic-calculator/", LC, "Hard"),
  p("basic-calculator-ii", "Basic Calculator II", "https://leetcode.com/problems/basic-calculator-ii/", LC, "Medium"),
  p("sliding-window-maximum-sq", "Sliding Window Maximum", "https://leetcode.com/problems/sliding-window-maximum/", LC, "Hard"),
  p("longest-valid-parentheses", "Longest Valid Parentheses", "https://leetcode.com/problems/longest-valid-parentheses/", LC, "Hard"),
  p("132-pattern", "132 Pattern", "https://leetcode.com/problems/132-pattern/", LC, "Medium"),
  p("number-of-visible-people-in-a-queue", "Number of Visible People in a Queue", "https://leetcode.com/problems/number-of-visible-people-in-a-queue/", LC, "Hard"),
  p("sum-of-subarray-minimums", "Sum of Subarray Minimums", "https://leetcode.com/problems/sum-of-subarray-minimums/", LC, "Medium"),
  p("maximum-frequency-stack", "Maximum Frequency Stack", "https://leetcode.com/problems/maximum-frequency-stack/", LC, "Hard"),
  p("constrained-subsequence-sum", "Constrained Subsequence Sum", "https://leetcode.com/problems/constrained-subsequence-sum/", LC, "Hard"),
  p("car-fleet", "Car Fleet", "https://leetcode.com/problems/car-fleet/", LC, "Medium"),
  p("remove-duplicate-letters", "Remove Duplicate Letters", "https://leetcode.com/problems/remove-duplicate-letters/", LC, "Medium"),

  // ─── 7. RECURSION & BACKTRACKING ─────────────────────────
  p("powx-n", "Pow(x, n)", "https://leetcode.com/problems/powx-n/", LC, "Medium"),
  p("reverse-string-rec", "Reverse String", "https://leetcode.com/problems/reverse-string/", LC, "Easy"),
  p("fibonacci-number-rec", "Fibonacci Number", "https://leetcode.com/problems/fibonacci-number/", LC, "Easy"),
  p("generate-parentheses", "Generate Parentheses", "https://leetcode.com/problems/generate-parentheses/", LC, "Medium"),
  p("binary-tree-paths", "Binary Tree Paths", "https://leetcode.com/problems/binary-tree-paths/", LC, "Easy"),
  p("letter-case-permutation", "Letter Case Permutation", "https://leetcode.com/problems/letter-case-permutation/", LC, "Medium"),
  p("subsets-bt", "Subsets", "https://leetcode.com/problems/subsets/", LC, "Medium"),
  p("subsets-ii-bt", "Subsets II", "https://leetcode.com/problems/subsets-ii/", LC, "Medium"),
  p("combinations-bt", "Combinations", "https://leetcode.com/problems/combinations/", LC, "Medium"),
  p("combination-sum-bt", "Combination Sum", "https://leetcode.com/problems/combination-sum/", LC, "Medium"),
  p("combination-sum-ii-bt", "Combination Sum II", "https://leetcode.com/problems/combination-sum-ii/", LC, "Medium"),
  p("permutations-bt", "Permutations", "https://leetcode.com/problems/permutations/", LC, "Medium"),
  p("permutations-ii-bt", "Permutations II", "https://leetcode.com/problems/permutations-ii/", LC, "Medium"),
  p("letter-combinations-of-a-phone-number", "Letter Combinations of a Phone Number", "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", LC, "Medium"),
  p("palindrome-partitioning-bt", "Palindrome Partitioning", "https://leetcode.com/problems/palindrome-partitioning/", LC, "Medium"),
  p("restore-ip-addresses", "Restore IP Addresses", "https://leetcode.com/problems/restore-ip-addresses/", LC, "Medium"),
  p("word-search-bt", "Word Search", "https://leetcode.com/problems/word-search/", LC, "Medium"),
  p("word-search-ii-bt", "Word Search II", "https://leetcode.com/problems/word-search-ii/", LC, "Hard"),
  p("n-queens", "N-Queens", "https://leetcode.com/problems/n-queens/", LC, "Hard"),
  p("n-queens-ii", "N-Queens II", "https://leetcode.com/problems/n-queens-ii/", LC, "Hard"),
  p("sudoku-solver", "Sudoku Solver", "https://leetcode.com/problems/sudoku-solver/", LC, "Hard"),
  p("gfg-rat-in-a-maze", "Rat in a Maze", "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1", GFG_, "Unverified"),
  p("word-break-ii-bt", "Word Break II", "https://leetcode.com/problems/word-break-ii/", LC, "Hard"),
  p("expression-add-operators", "Expression Add Operators", "https://leetcode.com/problems/expression-add-operators/", LC, "Hard"),
  p("matchsticks-to-square", "Matchsticks to Square", "https://leetcode.com/problems/matchsticks-to-square/", LC, "Medium"),
  p("partition-to-k-equal-sum-subsets-bt", "Partition to K Equal Sum Subsets", "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/", LC, "Medium"),
  p("gfg-cryptarithmetic-puzzle", "Cryptarithmetic Puzzle", "https://www.geeksforgeeks.org/problems/cryptarithmetic-puzzle/1", GFG_, "Unverified"),
  p("remove-invalid-parentheses", "Remove Invalid Parentheses", "https://leetcode.com/problems/remove-invalid-parentheses/", LC, "Hard"),
  p("gfg-knights-tour", "The Knight's Tour Problem", "https://www.geeksforgeeks.org/problems/knight-tour-problem/1", GFG_, "Unverified"),
  p("split-a-string-into-the-max-number-of-unique-substrings", "Split a String Into the Max Number of Unique Substrings", "https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings/", LC, "Medium"),

  // ─── 8. HEAP / PRIORITY QUEUE ────────────────────────────
  p("kth-largest-element-in-a-stream", "Kth Largest Element in a Stream", "https://leetcode.com/problems/kth-largest-element-in-a-stream/", LC, "Easy"),
  p("last-stone-weight", "Last Stone Weight", "https://leetcode.com/problems/last-stone-weight/", LC, "Easy"),
  p("relative-ranks", "Relative Ranks", "https://leetcode.com/problems/relative-ranks/", LC, "Easy"),
  p("kth-largest-element-in-an-array-heap", "Kth Largest Element in an Array", "https://leetcode.com/problems/kth-largest-element-in-an-array/", LC, "Medium"),
  p("top-k-frequent-elements-heap", "Top K Frequent Elements", "https://leetcode.com/problems/top-k-frequent-elements/", LC, "Medium"),
  p("k-closest-points-to-origin-heap", "K Closest Points to Origin", "https://leetcode.com/problems/k-closest-points-to-origin/", LC, "Medium"),
  p("sort-characters-by-frequency-heap", "Sort Characters By Frequency", "https://leetcode.com/problems/sort-characters-by-frequency/", LC, "Medium"),
  p("task-scheduler-heap", "Task Scheduler", "https://leetcode.com/problems/task-scheduler/", LC, "Medium"),
  p("reorganize-string", "Reorganize String", "https://leetcode.com/problems/reorganize-string/", LC, "Medium"),
  p("furthest-building-you-can-reach", "Furthest Building You Can Reach", "https://leetcode.com/problems/furthest-building-you-can-reach/", LC, "Medium"),
  p("single-threaded-cpu", "Single-Threaded CPU", "https://leetcode.com/problems/single-threaded-cpu/", LC, "Medium"),
  p("meeting-rooms-ii-heap", "Meeting Rooms II", "https://leetcode.com/problems/meeting-rooms-ii/", LC, "Medium"),
  p("top-k-frequent-words-heap", "Top K Frequent Words", "https://leetcode.com/problems/top-k-frequent-words/", LC, "Medium"),
  p("minimum-cost-to-connect-sticks", "Minimum Cost to Connect Sticks", "https://leetcode.com/problems/minimum-cost-to-connect-sticks/", LC, "Medium"),
  p("find-median-from-data-stream", "Find Median from Data Stream", "https://leetcode.com/problems/find-median-from-data-stream/", LC, "Hard"),
  p("merge-k-sorted-lists-heap", "Merge k Sorted Lists", "https://leetcode.com/problems/merge-k-sorted-lists/", LC, "Hard"),
  p("smallest-range-covering-elements-from-k-lists", "Smallest Range Covering Elements from K Lists", "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/", LC, "Hard"),
  p("ipo", "IPO", "https://leetcode.com/problems/ipo/", LC, "Hard"),
  p("minimum-cost-to-hire-k-workers-heap", "Minimum Cost to Hire K Workers", "https://leetcode.com/problems/minimum-cost-to-hire-k-workers/", LC, "Hard"),
  p("trapping-rain-water-ii", "Trapping Rain Water II", "https://leetcode.com/problems/trapping-rain-water-ii/", LC, "Hard"),
  p("maximum-performance-of-a-team", "Maximum Performance of a Team", "https://leetcode.com/problems/maximum-performance-of-a-team/", LC, "Hard"),
  p("sliding-window-median-heap", "Sliding Window Median", "https://leetcode.com/problems/sliding-window-median/", LC, "Hard"),
  p("gfg-rearrange-characters", "Rearrange Characters in a String (k distance apart)", "https://www.geeksforgeeks.org/problems/rearrange-characters/1", GFG_, "Unverified"),
  p("employee-free-time", "Employee Free Time", "https://leetcode.com/problems/employee-free-time/", LC, "Hard"),
  p("design-twitter", "Design Twitter", "https://leetcode.com/problems/design-twitter/", LC, "Medium"),
  p("process-tasks-using-servers", "Process Tasks Using Servers", "https://leetcode.com/problems/process-tasks-using-servers/", LC, "Medium"),
  p("kth-smallest-instructions", "Kth Smallest Instructions", "https://leetcode.com/problems/kth-smallest-instructions/", LC, "Hard"),

  // ─── 9. GREEDY ────────────────────────────────────────────
  p("assign-cookies-greedy", "Assign Cookies", "https://leetcode.com/problems/assign-cookies/", LC, "Easy"),
  p("lemonade-change", "Lemonade Change", "https://leetcode.com/problems/lemonade-change/", LC, "Easy"),
  p("best-time-to-buy-and-sell-stock-ii-greedy", "Best Time to Buy and Sell Stock II", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/", LC, "Medium"),
  p("can-place-flowers", "Can Place Flowers", "https://leetcode.com/problems/can-place-flowers/", LC, "Easy"),
  p("gfg-minimum-number-of-coins", "Minimum Number of Coins", "https://www.geeksforgeeks.org/problems/-minimum-number-of-coins4426/1", GFG_, "Unverified"),
  p("two-city-scheduling", "Two City Scheduling", "https://leetcode.com/problems/two-city-scheduling/", LC, "Medium"),
  p("non-overlapping-intervals-greedy", "Non-overlapping Intervals", "https://leetcode.com/problems/non-overlapping-intervals/", LC, "Medium"),
  p("minimum-number-of-arrows-to-burst-balloons-greedy", "Minimum Number of Arrows to Burst Balloons", "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/", LC, "Medium"),
  p("partition-labels-greedy", "Partition Labels", "https://leetcode.com/problems/partition-labels/", LC, "Medium"),
  p("jump-game", "Jump Game", "https://leetcode.com/problems/jump-game/", LC, "Medium"),
  p("jump-game-ii", "Jump Game II", "https://leetcode.com/problems/jump-game-ii/", LC, "Medium"),
  p("gas-station", "Gas Station", "https://leetcode.com/problems/gas-station/", LC, "Medium"),
  p("boats-to-save-people-greedy", "Boats to Save People", "https://leetcode.com/problems/boats-to-save-people/", LC, "Medium"),
  p("queue-reconstruction-by-height", "Queue Reconstruction by Height", "https://leetcode.com/problems/queue-reconstruction-by-height/", LC, "Medium"),
  p("minimum-add-to-make-parentheses-valid", "Minimum Add to Make Parentheses Valid", "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/", LC, "Medium"),
  p("candy", "Candy", "https://leetcode.com/problems/candy/", LC, "Hard"),
  p("minimum-number-of-taps-to-open-to-water-a-garden", "Minimum Number of Taps to Open to Water a Garden", "https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/", LC, "Hard"),
  p("course-schedule-iii-greedy", "Course Schedule III", "https://leetcode.com/problems/course-schedule-iii/", LC, "Hard"),
  p("minimum-cost-to-hire-k-workers-greedy", "Minimum Cost to Hire K Workers", "https://leetcode.com/problems/minimum-cost-to-hire-k-workers/", LC, "Hard"),
  p("video-stitching", "Video Stitching", "https://leetcode.com/problems/video-stitching/", LC, "Medium"),
  p("minimum-deletions-to-make-character-frequencies-unique", "Minimum Deletions to Make Character Frequencies Unique", "https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/", LC, "Medium"),
  p("minimum-number-of-refueling-stops", "Minimum Number of Refueling Stops", "https://leetcode.com/problems/minimum-number-of-refueling-stops/", LC, "Hard"),
  p("create-maximum-number", "Create Maximum Number", "https://leetcode.com/problems/create-maximum-number/", LC, "Hard"),
  p("split-array-into-consecutive-subsequences", "Split Array into Consecutive Subsequences", "https://leetcode.com/problems/split-array-into-consecutive-subsequences/", LC, "Medium"),
  p("maximum-number-of-events-that-can-be-attended", "Maximum Number of Events That Can Be Attended", "https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/", LC, "Medium"),
  p("maximum-units-on-a-truck", "Maximum Units on a Truck", "https://leetcode.com/problems/maximum-units-on-a-truck/", LC, "Easy"),
  p("optimal-partition-of-string", "Optimal Partition of String", "https://leetcode.com/problems/optimal-partition-of-string/", LC, "Medium"),

  // ═══════════════════════════════════════════════════════════
  // TIER 3 — ADVANCED
  // ═══════════════════════════════════════════════════════════

  // ─── 10. TRIE (PREFIX TREE) ───────────────────────────────
  p("implement-trie-prefix-tree", "Implement Trie (Prefix Tree)", "https://leetcode.com/problems/implement-trie-prefix-tree/", LC, "Medium"),
  p("longest-word-in-dictionary", "Longest Word in Dictionary", "https://leetcode.com/problems/longest-word-in-dictionary/", LC, "Medium"),
  p("gfg-count-distinct-substrings-trie", "Count of Distinct Substrings (Trie)", "https://www.geeksforgeeks.org/problems/count-of-distinct-substrings/1", GFG_, "Unverified"),
  p("implement-trie-ii-prefix-tree", "Implement Trie II (Prefix Tree)", "https://leetcode.com/problems/implement-trie-ii-prefix-tree/", LC, "Medium"),
  p("design-add-and-search-words-data-structure", "Design Add and Search Words Data Structure", "https://leetcode.com/problems/design-add-and-search-words-data-structure/", LC, "Medium"),
  p("replace-words", "Replace Words", "https://leetcode.com/problems/replace-words/", LC, "Medium"),
  p("map-sum-pairs", "Map Sum Pairs", "https://leetcode.com/problems/map-sum-pairs/", LC, "Medium"),
  p("search-suggestions-system", "Search Suggestions System", "https://leetcode.com/problems/search-suggestions-system/", LC, "Medium"),
  p("extra-characters-in-a-string", "Extra Characters in a String", "https://leetcode.com/problems/extra-characters-in-a-string/", LC, "Medium"),
  p("word-search-ii-trie", "Word Search II", "https://leetcode.com/problems/word-search-ii/", LC, "Hard"),
  p("maximum-xor-of-two-numbers-in-an-array-trie", "Maximum XOR of Two Numbers in an Array", "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", LC, "Medium"),
  p("palindrome-pairs", "Palindrome Pairs", "https://leetcode.com/problems/palindrome-pairs/", LC, "Hard"),
  p("prefix-and-suffix-search", "Prefix and Suffix Search", "https://leetcode.com/problems/prefix-and-suffix-search/", LC, "Hard"),
  p("stream-of-characters", "Stream of Characters", "https://leetcode.com/problems/stream-of-characters/", LC, "Hard"),
  p("maximum-xor-with-an-element-from-array-trie", "Maximum XOR With an Element From Array", "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/", LC, "Hard"),
  p("concatenated-words", "Concatenated Words", "https://leetcode.com/problems/concatenated-words/", LC, "Hard"),
  p("short-encoding-of-words", "Short Encoding of Words", "https://leetcode.com/problems/short-encoding-of-words/", LC, "Medium"),
  p("camelcase-matching", "Camelcase Matching", "https://leetcode.com/problems/camelcase-matching/", LC, "Medium"),

  // ─── 11. BIT MANIPULATION ────────────────────────────────
  p("number-of-1-bits", "Number of 1 Bits", "https://leetcode.com/problems/number-of-1-bits/", LC, "Easy"),
  p("counting-bits", "Counting Bits", "https://leetcode.com/problems/counting-bits/", LC, "Easy"),
  p("single-number", "Single Number", "https://leetcode.com/problems/single-number/", LC, "Easy"),
  p("missing-number", "Missing Number", "https://leetcode.com/problems/missing-number/", LC, "Easy"),
  p("power-of-two", "Power of Two", "https://leetcode.com/problems/power-of-two/", LC, "Easy"),
  p("reverse-bits", "Reverse Bits", "https://leetcode.com/problems/reverse-bits/", LC, "Easy"),
  p("hamming-distance", "Hamming Distance", "https://leetcode.com/problems/hamming-distance/", LC, "Easy"),
  p("binary-number-with-alternating-bits", "Binary Number with Alternating Bits", "https://leetcode.com/problems/binary-number-with-alternating-bits/", LC, "Easy"),
  p("single-number-ii", "Single Number II", "https://leetcode.com/problems/single-number-ii/", LC, "Medium"),
  p("single-number-iii", "Single Number III", "https://leetcode.com/problems/single-number-iii/", LC, "Medium"),
  p("xor-operation-in-an-array", "XOR Operation in an Array", "https://leetcode.com/problems/xor-operation-in-an-array/", LC, "Easy"),
  p("find-the-difference", "Find the Difference", "https://leetcode.com/problems/find-the-difference/", LC, "Easy"),
  p("total-hamming-distance", "Total Hamming Distance", "https://leetcode.com/problems/total-hamming-distance/", LC, "Medium"),
  p("sum-of-two-integers", "Sum of Two Integers", "https://leetcode.com/problems/sum-of-two-integers/", LC, "Medium"),
  p("bitwise-and-of-numbers-range", "Bitwise AND of Numbers Range", "https://leetcode.com/problems/bitwise-and-of-numbers-range/", LC, "Medium"),
  p("divide-two-integers", "Divide Two Integers", "https://leetcode.com/problems/divide-two-integers/", LC, "Medium"),
  p("gray-code", "Gray Code", "https://leetcode.com/problems/gray-code/", LC, "Medium"),
  p("complement-of-base-10-integer", "Complement of Base 10 Integer", "https://leetcode.com/problems/complement-of-base-10-integer/", LC, "Easy"),
  p("maximum-xor-of-two-numbers-in-an-array-bit", "Maximum XOR of Two Numbers in an Array", "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", LC, "Medium"),
  p("maximum-xor-with-an-element-from-array-bit", "Maximum XOR With an Element From Array", "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/", LC, "Hard"),
  p("minimum-xor-sum-of-two-arrays", "Minimum XOR Sum of Two Arrays", "https://leetcode.com/problems/minimum-xor-sum-of-two-arrays/", LC, "Hard"),
  p("utf-8-validation", "UTF-8 Validation", "https://leetcode.com/problems/utf-8-validation/", LC, "Medium"),
  p("minimum-flips-to-make-a-or-b-equal-to-c", "Minimum Flips to Make a OR b Equal to c", "https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/", LC, "Medium"),
  p("smallest-sufficient-team", "Smallest Sufficient Team", "https://leetcode.com/problems/smallest-sufficient-team/", LC, "Hard"),
  p("number-of-ways-to-wear-different-hats-to-each-other", "Number of Ways to Wear Different Hats to Each Other", "https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other/", LC, "Hard"),
  p("find-the-shortest-superstring", "Find the Shortest Superstring", "https://leetcode.com/problems/find-the-shortest-superstring/", LC, "Hard"),
  p("partition-array-into-two-arrays-to-minimize-sum-difference", "Partition Array Into Two Arrays to Minimize Sum Difference", "https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/", LC, "Hard"),

  // ─── 12. MATRIX / 2D GRID ────────────────────────────────
  p("rotate-image", "Rotate Image", "https://leetcode.com/problems/rotate-image/", LC, "Medium"),
  p("transpose-matrix", "Transpose Matrix", "https://leetcode.com/problems/transpose-matrix/", LC, "Easy"),
  p("flipping-an-image", "Flipping an Image", "https://leetcode.com/problems/flipping-an-image/", LC, "Easy"),
  p("reshape-the-matrix", "Reshape the Matrix", "https://leetcode.com/problems/reshape-the-matrix/", LC, "Easy"),
  p("toeplitz-matrix", "Toeplitz Matrix", "https://leetcode.com/problems/toeplitz-matrix/", LC, "Easy"),
  p("spiral-matrix", "Spiral Matrix", "https://leetcode.com/problems/spiral-matrix/", LC, "Medium"),
  p("spiral-matrix-ii", "Spiral Matrix II", "https://leetcode.com/problems/spiral-matrix-ii/", LC, "Medium"),
  p("set-matrix-zeroes", "Set Matrix Zeroes", "https://leetcode.com/problems/set-matrix-zeroes/", LC, "Medium"),
  p("diagonal-traverse", "Diagonal Traverse", "https://leetcode.com/problems/diagonal-traverse/", LC, "Medium"),
  p("search-a-2d-matrix-ii-mat", "Search a 2D Matrix II", "https://leetcode.com/problems/search-a-2d-matrix-ii/", LC, "Medium"),
  p("game-of-life", "Game of Life", "https://leetcode.com/problems/game-of-life/", LC, "Medium"),
  p("valid-sudoku", "Valid Sudoku", "https://leetcode.com/problems/valid-sudoku/", LC, "Medium"),
  p("maximal-rectangle-mat", "Maximal Rectangle", "https://leetcode.com/problems/maximal-rectangle/", LC, "Hard"),
  p("kth-smallest-element-in-a-sorted-matrix-mat", "Kth Smallest Element in a Sorted Matrix", "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", LC, "Medium"),
  p("word-search-mat", "Word Search", "https://leetcode.com/problems/word-search/", LC, "Medium"),
  p("longest-increasing-path-in-a-matrix-mat", "Longest Increasing Path in a Matrix", "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/", LC, "Hard"),
  p("shortest-path-in-a-grid-with-obstacles-elimination-mat", "Shortest Path in a Grid with Obstacles Elimination", "https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/", LC, "Hard"),
  p("cherry-pickup-ii", "Cherry Pickup II", "https://leetcode.com/problems/cherry-pickup-ii/", LC, "Hard"),
  p("maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold", "Maximum Side Length of a Square with Sum Less than or Equal to Threshold", "https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/", LC, "Medium"),
  p("number-of-submatrices-that-sum-to-target-mat", "Number of Submatrices That Sum to Target", "https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/", LC, "Hard"),
  p("minimum-cost-to-make-at-least-one-valid-path-in-a-grid", "Minimum Cost to Make at Least One Valid Path in a Grid", "https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/", LC, "Hard"),
  p("making-a-large-island-mat", "Making A Large Island", "https://leetcode.com/problems/making-a-large-island/", LC, "Hard"),

  // ─── 13. STRING ALGORITHMS ────────────────────────────────
  p("find-the-index-of-the-first-occurrence-in-a-string", "Find the Index of the First Occurrence in a String", "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", LC, "Easy"),
  p("valid-anagram", "Valid Anagram", "https://leetcode.com/problems/valid-anagram/", LC, "Easy"),
  p("repeated-substring-pattern", "Repeated Substring Pattern", "https://leetcode.com/problems/repeated-substring-pattern/", LC, "Easy"),
  p("isomorphic-strings", "Isomorphic Strings", "https://leetcode.com/problems/isomorphic-strings/", LC, "Easy"),
  p("ransom-note", "Ransom Note", "https://leetcode.com/problems/ransom-note/", LC, "Easy"),
  p("group-anagrams", "Group Anagrams", "https://leetcode.com/problems/group-anagrams/", LC, "Medium"),
  p("longest-happy-prefix", "Longest Happy Prefix", "https://leetcode.com/problems/longest-happy-prefix/", LC, "Hard"),
  p("repeated-dna-sequences", "Repeated DNA Sequences", "https://leetcode.com/problems/repeated-dna-sequences/", LC, "Medium"),
  p("gfg-implement-kmp", "Implement KMP Algorithm for Pattern Searching", "https://www.geeksforgeeks.org/problems/search-pattern0205/1", GFG_, "Unverified"),
  p("gfg-z-algorithm", "Z Algorithm", "https://www.geeksforgeeks.org/problems/z-algorithm/1", GFG_, "Unverified"),
  p("shortest-palindrome", "Shortest Palindrome", "https://leetcode.com/problems/shortest-palindrome/", LC, "Hard"),
  p("longest-duplicate-substring", "Longest Duplicate Substring", "https://leetcode.com/problems/longest-duplicate-substring/", LC, "Hard"),
  p("distinct-echo-substrings", "Distinct Echo Substrings", "https://leetcode.com/problems/distinct-echo-substrings/", LC, "Hard"),
  p("longest-palindromic-substring-manacher", "Longest Palindromic Substring (Manacher's)", "https://leetcode.com/problems/longest-palindromic-substring/", LC, "Medium"),
  p("palindromic-substrings-manacher", "Palindromic Substrings (Manacher's variant)", "https://leetcode.com/problems/palindromic-substrings/", LC, "Medium"),
  p("text-justification", "Text Justification", "https://leetcode.com/problems/text-justification/", LC, "Hard"),
  p("wildcard-matching", "Wildcard Matching", "https://leetcode.com/problems/wildcard-matching/", LC, "Hard"),
  p("regular-expression-matching", "Regular Expression Matching", "https://leetcode.com/problems/regular-expression-matching/", LC, "Hard"),
  p("count-different-palindromic-subsequences", "Count Different Palindromic Subsequences", "https://leetcode.com/problems/count-different-palindromic-subsequences/", LC, "Hard"),
  p("gfg-number-of-distinct-substrings", "Number of Distinct Substrings in a String", "https://www.geeksforgeeks.org/problems/count-of-number-of-substrings/1", GFG_, "Unverified"),

  // ─── 14. SEGMENT TREE & FENWICK TREE ─────────────────────
  p("range-sum-query-mutable", "Range Sum Query - Mutable", "https://leetcode.com/problems/range-sum-query-mutable/", LC, "Medium"),
  p("gfg-range-update-range-query", "Range Update and Range Query", "https://www.geeksforgeeks.org/problems/range-update-and-range-query/1", GFG_, "Unverified"),
  p("gfg-count-inversions-fenwick", "Count Inversions", "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1", GFG_, "Unverified"),
  p("gfg-range-minimum-query", "Range Minimum Query", "https://www.geeksforgeeks.org/problems/range-minimum-query/1", GFG_, "Unverified"),
  p("number-of-longest-increasing-subsequence-seg", "Number of Longest Increasing Subsequence", "https://leetcode.com/problems/number-of-longest-increasing-subsequence/", LC, "Medium"),
  p("my-calendar-i", "My Calendar I", "https://leetcode.com/problems/my-calendar-i/", LC, "Medium"),
  p("my-calendar-ii", "My Calendar II", "https://leetcode.com/problems/my-calendar-ii/", LC, "Medium"),
  p("count-of-smaller-numbers-after-self-seg", "Count of Smaller Numbers After Self", "https://leetcode.com/problems/count-of-smaller-numbers-after-self/", LC, "Hard"),
  p("reverse-pairs-seg", "Reverse Pairs", "https://leetcode.com/problems/reverse-pairs/", LC, "Hard"),
  p("my-calendar-iii", "My Calendar III", "https://leetcode.com/problems/my-calendar-iii/", LC, "Hard"),
  p("the-skyline-problem-seg", "The Skyline Problem", "https://leetcode.com/problems/the-skyline-problem/", LC, "Hard"),
  p("range-sum-query-2d-mutable", "Range Sum Query 2D - Mutable", "https://leetcode.com/problems/range-sum-query-2d-mutable/", LC, "Hard"),
  p("falling-squares", "Falling Squares", "https://leetcode.com/problems/falling-squares/", LC, "Hard"),
  p("count-of-range-sum-seg", "Count of Range Sum", "https://leetcode.com/problems/count-of-range-sum/", LC, "Hard"),
  p("rectangle-area-ii", "Rectangle Area II", "https://leetcode.com/problems/rectangle-area-ii/", LC, "Hard"),
  p("longest-increasing-subsequence-ii", "Longest Increasing Subsequence II", "https://leetcode.com/problems/longest-increasing-subsequence-ii/", LC, "Hard"),
  p("maximum-sum-queries", "Maximum Sum Queries", "https://leetcode.com/problems/maximum-sum-queries/", LC, "Hard"),
];

// ---------------------------------------------------------------------------
// Problem lookup map
// ---------------------------------------------------------------------------

export const PROBLEM_MAP: Record<string, Problem> = Object.fromEntries(
  PROBLEMS.map((pr) => [pr.id, pr]),
);

function r(id: string): LevelProblem {
  if (!PROBLEM_MAP[id]) throw new Error(`Missing problem id: ${id}`);
  return { id };
}

// ---------------------------------------------------------------------------
// Topics — ordered from Foundation → Intermediate → Advanced
// ---------------------------------------------------------------------------

export const TOPICS: Topic[] = [

  // ════════════════════════════════════════
  // TIER 1 — FOUNDATION
  // ════════════════════════════════════════

  {
    slug: "math",
    name: "Math & Number Theory",
    short: "Divisibility, primes, modular arithmetic, and digit tricks.",
    description:
      "Essential number theory and math patterns that appear across interviews: GCD/LCM, sieve of Eratosthenes, modular exponentiation, digit manipulation, and number-theoretic DP.",
    icon: "Calculator",
    order: 1,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("fizz-buzz"),
          r("palindrome-number"),
          r("happy-number"),
          r("power-of-three"),
          r("add-digits"),
          r("roman-to-integer"),
          r("excel-sheet-column-number"),
          r("self-dividing-numbers"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("reverse-integer"),
          r("count-primes"),
          r("factorial-trailing-zeroes"),
          r("integer-to-roman"),
          r("gfg-gcd-lcm"),
          r("gfg-sieve"),
          r("fraction-to-recurring-decimal"),
          r("nth-digit"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("super-pow"),
          r("ugly-number-ii"),
          r("largest-number-math"),
          r("number-of-digit-one"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("gfg-modular-exponentiation"),
          r("gfg-euler-totient"),
        ],
      },
    ],
  },

  {
    slug: "arrays",
    name: "Arrays",
    short: "The most fundamental data structure — traversal, searching, and in-place tricks.",
    description:
      "Core array patterns every engineer must know: Kadane's algorithm, prefix products, interval merging, permutation tricks, and classic hard problems like First Missing Positive.",
    icon: "LayoutList",
    order: 2,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("two-sum"),
          r("best-time-to-buy-and-sell-stock"),
          r("contains-duplicate"),
          r("maximum-subarray"),
          r("move-zeroes"),
          r("find-all-numbers-disappeared-in-an-array"),
          r("running-sum-of-1d-array"),
          r("majority-element"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("product-of-array-except-self"),
          r("3sum"),
          r("container-with-most-water"),
          r("rotate-array"),
          r("merge-intervals"),
          r("insert-interval"),
          r("next-permutation"),
          r("maximum-product-subarray"),
          r("maximum-points-you-can-obtain-from-cards"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("first-missing-positive"),
          r("4sum"),
          r("best-time-to-buy-and-sell-stock-iii"),
          r("trapping-rain-water-arr"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("maximum-gap"),
          r("gfg-maximum-sum-increasing-subsequence"),
        ],
      },
    ],
  },

  {
    slug: "strings",
    name: "Strings",
    short: "Manipulation, palindromes, pattern checks, and DP on strings.",
    description:
      "Foundational string skills: palindrome checks, sliding-window substring problems, classic DP (edit distance, decode ways), and tricky parsing problems.",
    icon: "Type",
    order: 3,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("valid-palindrome"),
          r("to-lower-case"),
          r("first-unique-character-in-a-string"),
          r("longest-common-prefix"),
          r("reverse-words-in-a-string-iii"),
          r("check-if-two-string-arrays-are-equivalent"),
          r("defanging-an-ip-address"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("longest-substring-without-repeating-characters"),
          r("longest-palindromic-substring"),
          r("string-to-integer-atoi"),
          r("count-and-say"),
          r("decode-ways"),
          r("word-break"),
          r("zigzag-conversion"),
          r("reverse-words-in-a-string"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("minimum-window-substring"),
          r("edit-distance"),
          r("interleaving-string"),
          r("number-of-atoms"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("longest-palindromic-subsequence"),
          r("gfg-anagram-palindrome"),
        ],
      },
    ],
  },

  {
    slug: "hashing",
    name: "Hashing",
    short: "O(1) lookups, frequency counting, and cache design.",
    description:
      "HashMap and HashSet patterns: frequency maps, two-pass hash tricks, prefix-sum with hash for subarray problems, and classic cache data-structure design (LRU / LFU).",
    icon: "Hash",
    order: 4,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("design-hashset"),
          r("design-hashmap"),
          r("jewels-and-stones"),
          r("unique-number-of-occurrences"),
          r("contains-duplicate-ii"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("4sum-ii"),
          r("brick-wall"),
          r("subarray-sum-equals-k"),
          r("maximum-erasure-value"),
          r("number-of-boomerangs"),
          r("gfg-largest-subarray-with-zero-sum"),
          r("lru-cache"),
          r("gfg-count-distinct-elements-window"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("subarrays-with-k-different-integers"),
          r("lfu-cache"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("all-oone-data-structure"),
        ],
      },
    ],
  },

  // ════════════════════════════════════════
  // TIER 2 — INTERMEDIATE
  // ════════════════════════════════════════

  {
    slug: "binary-search",
    name: "Binary Search",
    short: "Search space halving — index search and search-on-answer.",
    description:
      "From vanilla sorted-array search through rotated arrays up to the 'binary search on the answer' pattern that unlocks a whole class of optimization problems.",
    icon: "SearchCode",
    order: 5,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("binary-search"),
          r("search-insert-position"),
          r("sqrtx"),
          r("first-bad-version"),
          r("valid-perfect-square"),
          r("guess-number-higher-or-lower"),
          r("count-negative-numbers-in-a-sorted-matrix"),
          r("gfg-binary-search-basic"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("find-first-and-last-position-of-element-in-sorted-array"),
          r("search-in-rotated-sorted-array"),
          r("search-in-rotated-sorted-array-ii"),
          r("find-minimum-in-rotated-sorted-array"),
          r("find-peak-element"),
          r("search-a-2d-matrix"),
          r("search-a-2d-matrix-ii"),
          r("koko-eating-bananas"),
          r("capacity-to-ship-packages-within-d-days"),
          r("find-k-closest-elements"),
          r("single-element-in-a-sorted-array"),
          r("minimum-number-of-days-to-make-m-bouquets"),
          r("find-the-duplicate-number"),
          r("magnetic-force-between-two-balls"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("median-of-two-sorted-arrays"),
          r("split-array-largest-sum"),
          r("find-minimum-in-rotated-sorted-array-ii"),
          r("kth-smallest-element-in-a-sorted-matrix-bs"),
          r("find-k-th-smallest-pair-distance"),
          r("gfg-allocate-minimum-pages"),
          r("gfg-aggressive-cows"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("divide-chocolate"),
          r("minimize-max-distance-to-gas-station"),
          r("ugly-number-iii"),
          r("russian-doll-envelopes-bs"),
          r("count-of-range-sum"),
          r("maximum-number-of-removable-characters"),
        ],
      },
    ],
  },

  {
    slug: "stack-queue",
    name: "Stack & Queue",
    short: "LIFO/FIFO structures, monotonic stack, expression parsing.",
    description:
      "Basic stack/queue usage, the monotonic-stack pattern (next greater element family), expression evaluation, and deque-based sliding window problems.",
    icon: "Layers3",
    order: 6,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("valid-parentheses"),
          r("min-stack"),
          r("baseball-game"),
          r("implement-queue-using-stacks"),
          r("implement-stack-using-queues"),
          r("remove-all-adjacent-duplicates-in-string"),
          r("backspace-string-compare-sq"),
          r("design-circular-queue"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("next-greater-element-i"),
          r("next-greater-element-ii"),
          r("daily-temperatures"),
          r("evaluate-reverse-polish-notation"),
          r("decode-string"),
          r("asteroid-collision"),
          r("online-stock-span"),
          r("simplify-path"),
          r("remove-k-digits"),
          r("flatten-nested-list-iterator"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("largest-rectangle-in-histogram"),
          r("maximal-rectangle-sq"),
          r("trapping-rain-water-sq"),
          r("basic-calculator"),
          r("basic-calculator-ii"),
          r("sliding-window-maximum-sq"),
          r("longest-valid-parentheses"),
          r("132-pattern"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("number-of-visible-people-in-a-queue"),
          r("sum-of-subarray-minimums"),
          r("maximum-frequency-stack"),
          r("constrained-subsequence-sum"),
          r("car-fleet"),
          r("remove-duplicate-letters"),
        ],
      },
    ],
  },

  {
    slug: "recursion-backtracking",
    name: "Recursion & Backtracking",
    short: "Subsets, permutations, board search, constraint satisfaction.",
    description:
      "Pure recursion fundamentals, then subsets/permutations/combinations, grid and board backtracking, string partitioning, and hard constraint-satisfaction problems.",
    icon: "GitBranch",
    order: 7,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("powx-n"),
          r("reverse-string-rec"),
          r("fibonacci-number-rec"),
          r("generate-parentheses"),
          r("binary-tree-paths"),
          r("letter-case-permutation"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("subsets-bt"),
          r("subsets-ii-bt"),
          r("combinations-bt"),
          r("combination-sum-bt"),
          r("combination-sum-ii-bt"),
          r("permutations-bt"),
          r("permutations-ii-bt"),
          r("letter-combinations-of-a-phone-number"),
          r("palindrome-partitioning-bt"),
          r("restore-ip-addresses"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("word-search-bt"),
          r("word-search-ii-bt"),
          r("n-queens"),
          r("n-queens-ii"),
          r("sudoku-solver"),
          r("gfg-rat-in-a-maze"),
          r("word-break-ii-bt"),
          r("expression-add-operators"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("matchsticks-to-square"),
          r("partition-to-k-equal-sum-subsets-bt"),
          r("gfg-cryptarithmetic-puzzle"),
          r("remove-invalid-parentheses"),
          r("gfg-knights-tour"),
          r("split-a-string-into-the-max-number-of-unique-substrings"),
        ],
      },
    ],
  },

  {
    slug: "heap-priority-queue",
    name: "Heap / Priority Queue",
    short: "Top-K, median streams, k-way merge, task scheduling.",
    description:
      "Basic heap usage, the Top-K pattern, two-heap median tracking, and k-way merge / scheduling problems that need a priority queue.",
    icon: "ListOrdered",
    order: 8,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("kth-largest-element-in-a-stream"),
          r("last-stone-weight"),
          r("relative-ranks"),
          r("kth-largest-element-in-an-array-heap"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("top-k-frequent-elements-heap"),
          r("k-closest-points-to-origin-heap"),
          r("sort-characters-by-frequency-heap"),
          r("task-scheduler-heap"),
          r("reorganize-string"),
          r("furthest-building-you-can-reach"),
          r("single-threaded-cpu"),
          r("meeting-rooms-ii-heap"),
          r("top-k-frequent-words-heap"),
          r("minimum-cost-to-connect-sticks"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("find-median-from-data-stream"),
          r("merge-k-sorted-lists-heap"),
          r("smallest-range-covering-elements-from-k-lists"),
          r("ipo"),
          r("minimum-cost-to-hire-k-workers-heap"),
          r("trapping-rain-water-ii"),
          r("maximum-performance-of-a-team"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("sliding-window-median-heap"),
          r("gfg-rearrange-characters"),
          r("employee-free-time"),
          r("design-twitter"),
          r("process-tasks-using-servers"),
          r("kth-smallest-instructions"),
        ],
      },
    ],
  },

  {
    slug: "greedy",
    name: "Greedy",
    short: "Local-optimal choices with an exchange-argument proof.",
    description:
      "Basic greedy, interval scheduling, jump-game family, and harder greedy problems that need a correctness proof rather than just intuition.",
    icon: "TrendingUp",
    order: 9,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("assign-cookies-greedy"),
          r("lemonade-change"),
          r("best-time-to-buy-and-sell-stock-ii-greedy"),
          r("can-place-flowers"),
          r("gfg-minimum-number-of-coins"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("two-city-scheduling"),
          r("non-overlapping-intervals-greedy"),
          r("minimum-number-of-arrows-to-burst-balloons-greedy"),
          r("partition-labels-greedy"),
          r("jump-game"),
          r("jump-game-ii"),
          r("gas-station"),
          r("boats-to-save-people-greedy"),
          r("queue-reconstruction-by-height"),
          r("minimum-add-to-make-parentheses-valid"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("candy"),
          r("minimum-number-of-taps-to-open-to-water-a-garden"),
          r("course-schedule-iii-greedy"),
          r("minimum-cost-to-hire-k-workers-greedy"),
          r("video-stitching"),
          r("minimum-deletions-to-make-character-frequencies-unique"),
          r("minimum-number-of-refueling-stops"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("create-maximum-number"),
          r("split-array-into-consecutive-subsequences"),
          r("maximum-number-of-events-that-can-be-attended"),
          r("maximum-units-on-a-truck"),
          r("optimal-partition-of-string"),
        ],
      },
    ],
  },

  // ════════════════════════════════════════
  // TIER 3 — ADVANCED
  // ════════════════════════════════════════

  {
    slug: "trie",
    name: "Trie (Prefix Tree)",
    short: "Prefix-based dictionary structure for word/XOR problems.",
    description:
      "Trie implementation, dictionary/autocomplete-style applications, and advanced uses like XOR maximization and streaming pattern matching.",
    icon: "TreePine",
    order: 10,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("implement-trie-prefix-tree"),
          r("longest-word-in-dictionary"),
          r("gfg-count-distinct-substrings-trie"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("implement-trie-ii-prefix-tree"),
          r("design-add-and-search-words-data-structure"),
          r("replace-words"),
          r("map-sum-pairs"),
          r("search-suggestions-system"),
          r("extra-characters-in-a-string"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("word-search-ii-trie"),
          r("maximum-xor-of-two-numbers-in-an-array-trie"),
          r("palindrome-pairs"),
          r("prefix-and-suffix-search"),
          r("stream-of-characters"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("maximum-xor-with-an-element-from-array-trie"),
          r("concatenated-words"),
          r("short-encoding-of-words"),
          r("camelcase-matching"),
        ],
      },
    ],
  },

  {
    slug: "bit-manipulation",
    name: "Bit Manipulation",
    short: "Bitwise operators, XOR tricks, bitmasking as state.",
    description:
      "Basic bit operators, the XOR-cancels-duplicates family, and bitmasking used as DP/search state in harder problems.",
    icon: "Binary",
    order: 11,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("number-of-1-bits"),
          r("counting-bits"),
          r("single-number"),
          r("missing-number"),
          r("power-of-two"),
          r("reverse-bits"),
          r("hamming-distance"),
          r("binary-number-with-alternating-bits"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("single-number-ii"),
          r("single-number-iii"),
          r("xor-operation-in-an-array"),
          r("find-the-difference"),
          r("total-hamming-distance"),
          r("sum-of-two-integers"),
          r("bitwise-and-of-numbers-range"),
          r("divide-two-integers"),
          r("gray-code"),
          r("complement-of-base-10-integer"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("maximum-xor-of-two-numbers-in-an-array-bit"),
          r("maximum-xor-with-an-element-from-array-bit"),
          r("minimum-xor-sum-of-two-arrays"),
          r("utf-8-validation"),
          r("minimum-flips-to-make-a-or-b-equal-to-c"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("smallest-sufficient-team"),
          r("number-of-ways-to-wear-different-hats-to-each-other"),
          r("find-the-shortest-superstring"),
          r("partition-array-into-two-arrays-to-minimize-sum-difference"),
        ],
      },
    ],
  },

  {
    slug: "matrix",
    name: "Matrix / 2D Grid",
    short: "In-place transforms, traversal patterns, 2D DP on grids.",
    description:
      "In-place rotation and transposition, spiral/diagonal traversal, prefix-sum on 2D, and hard DP/BFS problems on 2D grids.",
    icon: "Grid3x3",
    order: 12,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("transpose-matrix"),
          r("flipping-an-image"),
          r("reshape-the-matrix"),
          r("toeplitz-matrix"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("rotate-image"),
          r("spiral-matrix"),
          r("spiral-matrix-ii"),
          r("set-matrix-zeroes"),
          r("diagonal-traverse"),
          r("search-a-2d-matrix-ii-mat"),
          r("game-of-life"),
          r("valid-sudoku"),
          r("kth-smallest-element-in-a-sorted-matrix-mat"),
          r("word-search-mat"),
          r("maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("maximal-rectangle-mat"),
          r("longest-increasing-path-in-a-matrix-mat"),
          r("shortest-path-in-a-grid-with-obstacles-elimination-mat"),
          r("cherry-pickup-ii"),
          r("number-of-submatrices-that-sum-to-target-mat"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("minimum-cost-to-make-at-least-one-valid-path-in-a-grid"),
          r("making-a-large-island-mat"),
        ],
      },
    ],
  },

  {
    slug: "string-algorithms",
    name: "String Algorithms",
    short: "Pattern matching — KMP, Z-function, rolling hash, Manacher's.",
    description:
      "Basic string manipulation up through KMP/Z-function pattern matching, rolling hash, and Manacher's algorithm for palindromes.",
    icon: "CaseSensitive",
    order: 13,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("find-the-index-of-the-first-occurrence-in-a-string"),
          r("valid-anagram"),
          r("repeated-substring-pattern"),
          r("isomorphic-strings"),
          r("ransom-note"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("group-anagrams"),
          r("repeated-dna-sequences"),
          r("gfg-implement-kmp"),
          r("gfg-z-algorithm"),
          r("longest-palindromic-substring-manacher"),
          r("palindromic-substrings-manacher"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("longest-happy-prefix"),
          r("shortest-palindrome"),
          r("longest-duplicate-substring"),
          r("distinct-echo-substrings"),
          r("text-justification"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("wildcard-matching"),
          r("regular-expression-matching"),
          r("count-different-palindromic-subsequences"),
          r("gfg-number-of-distinct-substrings"),
        ],
      },
    ],
  },

  {
    slug: "segment-tree-fenwick-tree",
    name: "Segment Tree & Fenwick Tree",
    short: "Range queries and point/range updates in O(log n).",
    description:
      "Fenwick tree (BIT) for prefix-sum and inversion counting, then segment tree for range-min/max queries, lazy propagation, and dynamic segment trees.",
    icon: "GitFork",
    order: 14,
    levels: [
      {
        number: 1,
        title: "Easy",
        problems: [
          r("range-sum-query-mutable"),
          r("gfg-range-update-range-query"),
        ],
      },
      {
        number: 2,
        title: "Medium",
        problems: [
          r("gfg-count-inversions-fenwick"),
          r("gfg-range-minimum-query"),
          r("number-of-longest-increasing-subsequence-seg"),
          r("my-calendar-i"),
          r("my-calendar-ii"),
        ],
      },
      {
        number: 3,
        title: "Hard",
        problems: [
          r("count-of-smaller-numbers-after-self-seg"),
          r("reverse-pairs-seg"),
          r("my-calendar-iii"),
          r("the-skyline-problem-seg"),
          r("range-sum-query-2d-mutable"),
        ],
      },
      {
        number: 4,
        title: "Advanced",
        problems: [
          r("falling-squares"),
          r("count-of-range-sum-seg"),
          r("rectangle-area-ii"),
          r("longest-increasing-subsequence-ii"),
          r("maximum-sum-queries"),
        ],
      },
    ],
  },
];
