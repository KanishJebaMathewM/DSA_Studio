// Remaining DSA topics — companion dataset to your existing db file.

export type Difficulty = "Easy" | "Medium" | "Hard" | "Unverified";
export type Platform = "LeetCode" | "GFG";

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
// Problem catalog
// ---------------------------------------------------------------------------

export const PROBLEMS: Problem[] = [
  // ================= BINARY SEARCH =================
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

  // ================= STACK & QUEUE =================
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

  // ================= HEAP / PRIORITY QUEUE =================
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

  // ================= RECURSION & BACKTRACKING =================
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

  // ================= GREEDY =================
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

  // ================= TRIE =================
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

  // ================= BIT MANIPULATION =================
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

  // ================= STRING ALGORITHMS =================
  p("find-the-index-of-the-first-occurrence-in-a-string", "Find the Index of the First Occurrence in a String", "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", LC, "Easy"),
  p("valid-anagram", "Valid Anagram", "https://leetcode.com/problems/valid-anagram/", LC, "Easy"),
  p("repeated-substring-pattern", "Repeated Substring Pattern", "https://leetcode.com/problems/repeated-substring-pattern/", LC, "Easy"),
  p("isomorphic-strings", "Isomorphic Strings", "https://leetcode.com/problems/isomorphic-strings/", LC, "Easy"),
  p("ransom-note", "Ransom Note", "https://leetcode.com/problems/ransom-note/", LC, "Easy"),

  p("group-anagrams", "Group Anagrams", "https://leetcode.com/problems/group-anagrams/", LC, "Medium"),
  p("longest-happy-prefix", "Longest Happy Prefix", "https://leetcode.com/problems/longest-happy-prefix/", LC, "Hard"),
  p("repeated-dna-sequences", "Repeated DNA Sequences", "https://leetcode.com/problems/repeated-dna-sequences/", LC, "Medium"),
  p("gfg-implement-kmp", "Implement KMP Algorithm for Pattern Searching (Search Pattern)", "https://www.geeksforgeeks.org/problems/search-pattern0205/1", GFG_, "Unverified"),
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

  // ================= SEGMENT TREE / FENWICK TREE =================
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

  // ================= MATRIX =================
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

  // ================= ADDITIONAL GFG & ALGORITHMIC PROBLEMS =================
  // Binary Search GFG
  p("gfg-floor-in-a-sorted-array", "Floor in a Sorted Array", "https://www.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1", GFG_, "Easy"),
  p("gfg-peak-element", "Peak Element", "https://www.geeksforgeeks.org/problems/peak-element/1", GFG_, "Easy"),
  p("gfg-search-in-a-rotated-array", "Search in a Rotated Array", "https://www.geeksforgeeks.org/problems/search-in-a-rotated-array4618/1", GFG_, "Medium"),
  p("gfg-number-of-occurrence", "Number of Occurrence", "https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1", GFG_, "Medium"),
  p("gfg-kth-element-of-two-arrays", "K-th Element of Two Sorted Arrays", "https://www.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1", GFG_, "Medium"),

  // Stack & Queue GFG
  p("gfg-parenthesis-checker", "Parenthesis Checker", "https://www.geeksforgeeks.org/problems/parenthesis-checker2744/1", GFG_, "Easy"),
  p("gfg-next-greater-element", "Next Greater Element", "https://www.geeksforgeeks.org/problems/next-larger-element-1587115620/1", GFG_, "Medium"),
  p("gfg-stock-span-problem", "Stock Span Problem", "https://www.geeksforgeeks.org/problems/stock-span-problem-1587115621/1", GFG_, "Medium"),
  p("gfg-queue-using-two-stacks", "Queue using Stacks", "https://www.geeksforgeeks.org/problems/queue-using-two-stacks/1", GFG_, "Easy"),
  p("gfg-stack-using-two-queues", "Stack using Two Queues", "https://www.geeksforgeeks.org/problems/stack-using-two-queues/1", GFG_, "Easy"),
  p("gfg-get-minimum-element-from-stack", "Get Minimum Element from Stack", "https://www.geeksforgeeks.org/problems/get-minimum-element-from-stack/1", GFG_, "Medium"),
  p("gfg-circular-tour", "Circular Tour (Gas Station)", "https://www.geeksforgeeks.org/problems/circular-tour-1587115620/1", GFG_, "Medium"),

  // Linked List GFG
  p("gfg-reverse-a-linked-list", "Reverse a Linked List", "https://www.geeksforgeeks.org/problems/reverse-a-linked-list/1", GFG_, "Easy"),
  p("gfg-detect-loop-in-linked-list", "Detect Loop in Linked List", "https://www.geeksforgeeks.org/problems/detect-loop-in-linked-list/1", GFG_, "Easy"),
  p("gfg-finding-middle-element-in-a-linked-list", "Finding Middle Element in a Linked List", "https://www.geeksforgeeks.org/problems/finding-middle-element-in-a-linked-list/1", GFG_, "Easy"),
  p("gfg-merge-two-sorted-linked-lists", "Merge Two Sorted Linked Lists", "https://www.geeksforgeeks.org/problems/merge-two-sorted-linked-list/1", GFG_, "Medium"),
  p("gfg-intersection-point-in-y-shapped-linked-lists", "Intersection Point in Y Shaped Lists", "https://www.geeksforgeeks.org/problems/intersection-point-in-y-shapped-linked-lists/1", GFG_, "Medium"),
  p("gfg-remove-loop-in-linked-list", "Remove Loop in Linked List", "https://www.geeksforgeeks.org/problems/remove-loop-in-linked-list/1", GFG_, "Medium"),
  p("gfg-add-two-numbers-represented-by-linked-lists", "Add Two Numbers Represented by Linked Lists", "https://www.geeksforgeeks.org/problems/add-two-numbers-represented-by-linked-lists/1", GFG_, "Medium"),

  // Heap & Priority Queue GFG
  p("gfg-kth-smallest-element", "Kth Smallest Element", "https://www.geeksforgeeks.org/problems/kth-smallest-element5615/1", GFG_, "Medium"),
  p("gfg-merge-k-sorted-arrays", "Merge K Sorted Arrays", "https://www.geeksforgeeks.org/problems/merge-k-sorted-arrays/1", GFG_, "Medium"),
  p("gfg-median-in-a-stream", "Find Median in a Stream", "https://www.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1", GFG_, "Hard"),

  // Greedy Algorithms GFG
  p("gfg-n-meetings-in-one-room", "N Meetings in One Room", "https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1", GFG_, "Easy"),
  p("gfg-fractional-knapsack", "Fractional Knapsack", "https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1", GFG_, "Medium"),
  p("gfg-job-sequencing-problem", "Job Sequencing Problem", "https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1", GFG_, "Medium"),
  p("gfg-minimum-platforms", "Minimum Platforms", "https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1", GFG_, "Medium"),

  // Dynamic Programming GFG
  p("gfg-0-1-knapsack-problem", "0 - 1 Knapsack Problem", "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0917/1", GFG_, "Medium"),
  p("gfg-subset-sum-problem", "Subset Sum Problem", "https://www.geeksforgeeks.org/problems/subset-sum-problem2014/1", GFG_, "Medium"),
  p("gfg-coin-change", "Coin Change (Ways / Min Coins)", "https://www.geeksforgeeks.org/problems/coin-change2570/1", GFG_, "Medium"),
  p("gfg-longest-common-subsequence", "Longest Common Subsequence", "https://www.geeksforgeeks.org/problems/longest-common-subsequence-1587115620/1", GFG_, "Medium"),
  p("gfg-longest-increasing-subsequence", "Longest Increasing Subsequence", "https://www.geeksforgeeks.org/problems/longest-increasing-subsequence-1587115620/1", GFG_, "Medium"),
  p("gfg-edit-distance", "Edit Distance", "https://www.geeksforgeeks.org/problems/edit-distance3702/1", GFG_, "Medium"),
  p("gfg-rod-cutting", "Rod Cutting", "https://www.geeksforgeeks.org/problems/rod-cutting0840/1", GFG_, "Medium"),

  // Recursion & Backtracking GFG
  p("gfg-n-queen-problem", "N-Queen Problem", "https://www.geeksforgeeks.org/problems/n-queen-problem0315/1", GFG_, "Hard"),
  p("gfg-m-coloring-problem", "M-Coloring Problem", "https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1", GFG_, "Medium"),

  // Bit Manipulation & Math GFG
  p("gfg-power-of-2", "Power of 2", "https://www.geeksforgeeks.org/problems/power-of-2-1587115622/1", GFG_, "Easy"),
  p("gfg-set-bits", "Set Bits / Count 1 Bits", "https://www.geeksforgeeks.org/problems/set-bits0143/1", GFG_, "Easy"),
  p("gfg-sieve-of-eratosthenes", "Sieve of Eratosthenes", "https://www.geeksforgeeks.org/problems/sieve-of-eratosthenes5242/1", GFG_, "Easy"),

  // String Algorithms GFG
  p("gfg-rabin-karp", "Rabin Karp Pattern Searching", "https://www.geeksforgeeks.org/problems/search-pattern-rabin-karp-algorithm--141631/1", GFG_, "Medium"),
];

export const PROBLEM_MAP: Record<string, Problem> = Object.fromEntries(
  PROBLEMS.map((pr) => [pr.id, pr]),
);

function r(id: string): LevelProblem {
  if (!PROBLEM_MAP[id]) throw new Error(`Missing problem id: ${id}`);
  return { id };
}

// ---------------------------------------------------------------------------
// Topics
// ---------------------------------------------------------------------------

export const TOPICS: Topic[] = [
  {
    slug: "binary-search",
    name: "Binary Search",
    short: "Search space halving — index search and search-on-answer.",
    description:
      "From vanilla sorted-array search through rotated arrays up to the 'binary search on the answer' pattern that unlocks a whole class of optimization problems.",
    icon: "SearchCode",
    levels: [
      { number: 1, title: "Easy", problems: [
        r("binary-search"), r("gfg-floor-in-a-sorted-array"), r("search-insert-position"), r("sqrtx"),
        r("first-bad-version"), r("valid-perfect-square"),
        r("guess-number-higher-or-lower"),
        r("count-negative-numbers-in-a-sorted-matrix"),
        r("gfg-binary-search-basic"),
      ]},
      { number: 2, title: "Medium", problems: [
        r("find-first-and-last-position-of-element-in-sorted-array"),
        r("search-in-rotated-sorted-array"), r("gfg-search-in-a-rotated-array"), r("search-in-rotated-sorted-array-ii"),
        r("find-minimum-in-rotated-sorted-array"), r("find-peak-element"), r("gfg-peak-element"),
        r("search-a-2d-matrix"), r("search-a-2d-matrix-ii"),
        r("gfg-number-of-occurrence"),
        r("koko-eating-bananas"), r("capacity-to-ship-packages-within-d-days"),
        r("find-k-closest-elements"), r("single-element-in-a-sorted-array"),
        r("minimum-number-of-days-to-make-m-bouquets"),
        r("find-the-duplicate-number"), r("magnetic-force-between-two-balls"),
      ]},
      { number: 3, title: "Hard", problems: [
        r("median-of-two-sorted-arrays"), r("gfg-kth-element-of-two-arrays"), r("split-array-largest-sum"),
        r("find-minimum-in-rotated-sorted-array-ii"),
        r("kth-smallest-element-in-a-sorted-matrix-bs"),
        r("find-k-th-smallest-pair-distance"),
        r("gfg-allocate-minimum-pages"), r("gfg-aggressive-cows"),
      ]},
      { number: 4, title: "Advanced", problems: [
        r("divide-chocolate"), r("minimize-max-distance-to-gas-station"),
        r("ugly-number-iii"), r("russian-doll-envelopes-bs"),
        r("count-of-range-sum"), r("maximum-number-of-removable-characters"),
      ]},
    ],
  },
  {
    slug: "stack-queue",
    name: "Stack & Queue",
    short: "LIFO/FIFO structures, monotonic stack, expression parsing.",
    description:
      "Basic stack/queue usage, the monotonic-stack pattern (next greater element family), expression evaluation, and deque-based sliding window problems.",
    icon: "Layers3",
    levels: [
      { number: 1, title: "Easy", problems: [
        r("valid-parentheses"), r("gfg-parenthesis-checker"), r("min-stack"), r("baseball-game"),
        r("implement-queue-using-stacks"), r("gfg-queue-using-two-stacks"),
        r("implement-stack-using-queues"), r("gfg-stack-using-two-queues"),
        r("remove-all-adjacent-duplicates-in-string"),
        r("backspace-string-compare-sq"), r("design-circular-queue"),
      ]},
      { number: 2, title: "Medium", problems: [
        r("next-greater-element-i"), r("next-greater-element-ii"), r("gfg-next-greater-element"),
        r("daily-temperatures"), r("evaluate-reverse-polish-notation"),
        r("decode-string"), r("asteroid-collision"), r("online-stock-span"), r("gfg-stock-span-problem"),
        r("gfg-get-minimum-element-from-stack"),
        r("simplify-path"), r("remove-k-digits"),
        r("flatten-nested-list-iterator"),
      ]},
      { number: 3, title: "Hard", problems: [
        r("largest-rectangle-in-histogram"), r("maximal-rectangle-sq"),
        r("trapping-rain-water-sq"), r("basic-calculator"),
        r("basic-calculator-ii"), r("sliding-window-maximum-sq"),
        r("longest-valid-parentheses"), r("132-pattern"), r("gfg-circular-tour"),
      ]},
      { number: 4, title: "Advanced", problems: [
        r("number-of-visible-people-in-a-queue"),
        r("sum-of-subarray-minimums"), r("maximum-frequency-stack"),
        r("constrained-subsequence-sum"), r("car-fleet"),
        r("remove-duplicate-letters"),
      ]},
    ],
  },
  {
    slug: "heap-priority-queue",
    name: "Heap / Priority Queue",
    short: "Top-K, median streams, k-way merge, task scheduling.",
    description:
      "Basic heap usage, the Top-K pattern, two-heap median tracking, and k-way merge / scheduling problems that need a priority queue.",
    icon: "ListOrdered",
    levels: [
      { number: 1, title: "Easy", problems: [
        r("kth-largest-element-in-a-stream"), r("last-stone-weight"),
        r("relative-ranks"), r("kth-largest-element-in-an-array-heap"),
        r("gfg-kth-smallest-element"),
      ]},
      { number: 2, title: "Medium", problems: [
        r("top-k-frequent-elements-heap"), r("k-closest-points-to-origin-heap"),
        r("sort-characters-by-frequency-heap"), r("task-scheduler-heap"),
        r("reorganize-string"), r("furthest-building-you-can-reach"),
        r("single-threaded-cpu"), r("meeting-rooms-ii-heap"),
        r("top-k-frequent-words-heap"), r("minimum-cost-to-connect-sticks"),
        r("gfg-merge-k-sorted-arrays"),
      ]},
      { number: 3, title: "Hard", problems: [
        r("find-median-from-data-stream"), r("gfg-median-in-a-stream"), r("merge-k-sorted-lists-heap"),
        r("smallest-range-covering-elements-from-k-lists"), r("ipo"),
        r("minimum-cost-to-hire-k-workers-heap"),
        r("trapping-rain-water-ii"), r("maximum-performance-of-a-team"),
      ]},
      { number: 4, title: "Advanced", problems: [
        r("sliding-window-median-heap"), r("gfg-rearrange-characters"),
        r("employee-free-time"), r("design-twitter"),
        r("process-tasks-using-servers"), r("kth-smallest-instructions"),
      ]},
    ],
  },
  {
    slug: "recursion-backtracking",
    name: "Recursion & Backtracking",
    short: "Subsets, permutations, board search, constraint satisfaction.",
    description:
      "Pure recursion fundamentals, then subsets/permutations/combinations, grid and board backtracking, string partitioning, and hard constraint-satisfaction problems.",
    icon: "GitBranch",
    levels: [
      { number: 1, title: "Easy", problems: [
        r("powx-n"), r("reverse-string-rec"), r("fibonacci-number-rec"),
        r("generate-parentheses"), r("binary-tree-paths"),
        r("letter-case-permutation"),
      ]},
      { number: 2, title: "Medium", problems: [
        r("subsets-bt"), r("subsets-ii-bt"), r("combinations-bt"),
        r("combination-sum-bt"), r("combination-sum-ii-bt"),
        r("permutations-bt"), r("permutations-ii-bt"),
        r("letter-combinations-of-a-phone-number"),
        r("palindrome-partitioning-bt"), r("restore-ip-addresses"),
      ]},
      { number: 3, title: "Hard", problems: [
        r("word-search-bt"), r("word-search-ii-bt"), r("n-queens"), r("gfg-n-queen-problem"),
        r("n-queens-ii"), r("sudoku-solver"), r("gfg-rat-in-a-maze"),
        r("word-break-ii-bt"), r("expression-add-operators"),
      ]},
      { number: 4, title: "Advanced", problems: [
        r("matchsticks-to-square"), r("partition-to-k-equal-sum-subsets-bt"),
        r("gfg-cryptarithmetic-puzzle"), r("remove-invalid-parentheses"),
        r("gfg-knights-tour"), r("gfg-m-coloring-problem"),
        r("split-a-string-into-the-max-number-of-unique-substrings"),
      ]},
    ],
  },
  {
    slug: "greedy",
    name: "Greedy",
    short: "Local-optimal choices with an exchange-argument proof.",
    description:
      "Basic greedy, interval scheduling, jump-game family, and harder greedy problems that need a correctness proof rather than just intuition.",
    icon: "TrendingUp",
    levels: [
      { number: 1, title: "Easy", problems: [
        r("assign-cookies-greedy"), r("lemonade-change"),
        r("best-time-to-buy-and-sell-stock-ii-greedy"),
        r("can-place-flowers"), r("gfg-minimum-number-of-coins"), r("gfg-n-meetings-in-one-room"),
      ]},
      { number: 2, title: "Medium", problems: [
        r("two-city-scheduling"), r("non-overlapping-intervals-greedy"),
        r("minimum-number-of-arrows-to-burst-balloons-greedy"),
        r("partition-labels-greedy"), r("jump-game"), r("jump-game-ii"),
        r("gas-station"), r("boats-to-save-people-greedy"),
        r("queue-reconstruction-by-height"),
        r("minimum-add-to-make-parentheses-valid"),
        r("gfg-fractional-knapsack"), r("gfg-job-sequencing-problem"), r("gfg-minimum-platforms"),
      ]},
      { number: 3, title: "Hard", problems: [
        r("candy"), r("minimum-number-of-taps-to-open-to-water-a-garden"),
        r("course-schedule-iii-greedy"), r("minimum-cost-to-hire-k-workers-greedy"),
        r("video-stitching"),
        r("minimum-deletions-to-make-character-frequencies-unique"),
        r("minimum-number-of-refueling-stops"),
      ]},
      { number: 4, title: "Advanced", problems: [
        r("create-maximum-number"),
        r("split-array-into-consecutive-subsequences"),
        r("maximum-number-of-events-that-can-be-attended"),
        r("maximum-units-on-a-truck"), r("optimal-partition-of-string"),
      ]},
    ],
  },
  {
    slug: "trie",
    name: "Trie (Prefix Tree)",
    short: "Prefix-based dictionary structure for word/XOR problems.",
    description:
      "Trie implementation, dictionary/autocomplete-style applications, and advanced uses like XOR maximization and streaming pattern matching.",
    icon: "TreePine",
    levels: [
      { number: 1, title: "Easy", problems: [
        r("implement-trie-prefix-tree"), r("longest-word-in-dictionary"),
        r("gfg-count-distinct-substrings-trie"),
      ]},
      { number: 2, title: "Medium", problems: [
        r("implement-trie-ii-prefix-tree"),
        r("design-add-and-search-words-data-structure"),
        r("replace-words"), r("map-sum-pairs"),
        r("search-suggestions-system"), r("extra-characters-in-a-string"),
      ]},
      { number: 3, title: "Hard", problems: [
        r("word-search-ii-trie"),
        r("maximum-xor-of-two-numbers-in-an-array-trie"),
        r("palindrome-pairs"), r("prefix-and-suffix-search"),
        r("stream-of-characters"),
      ]},
      { number: 4, title: "Advanced", problems: [
        r("maximum-xor-with-an-element-from-array-trie"),
        r("concatenated-words"), r("short-encoding-of-words"),
        r("camelcase-matching"),
      ]},
    ],
  },
  {
    slug: "bit-manipulation",
    name: "Bit Manipulation",
    short: "Bitwise operators, XOR tricks, bitmasking as state.",
    description:
      "Basic bit operators, the XOR-cancels-duplicates family, and bitmasking used as DP/search state in harder problems.",
    icon: "Binary",
    levels: [
      { number: 1, title: "Easy", problems: [
        r("number-of-1-bits"), r("gfg-set-bits"), r("counting-bits"), r("single-number"),
        r("missing-number"), r("power-of-two"), r("gfg-power-of-2"), r("reverse-bits"),
        r("hamming-distance"), r("binary-number-with-alternating-bits"),
      ]},
      { number: 2, title: "Medium", problems: [
        r("single-number-ii"), r("single-number-iii"),
        r("xor-operation-in-an-array"), r("find-the-difference"),
        r("total-hamming-distance"), r("sum-of-two-integers"),
        r("bitwise-and-of-numbers-range"), r("divide-two-integers"),
        r("gray-code"), r("complement-of-base-10-integer"),
      ]},
      { number: 3, title: "Hard", problems: [
        r("maximum-xor-of-two-numbers-in-an-array-bit"),
        r("maximum-xor-with-an-element-from-array-bit"),
        r("minimum-xor-sum-of-two-arrays"), r("utf-8-validation"),
        r("minimum-flips-to-make-a-or-b-equal-to-c"),
      ]},
      { number: 4, title: "Advanced", problems: [
        r("smallest-sufficient-team"),
        r("number-of-ways-to-wear-different-hats-to-each-other"),
        r("find-the-shortest-superstring"),
        r("partition-array-into-two-arrays-to-minimize-sum-difference"),
      ]},
    ],
  },
  {
    slug: "string-algorithms",
    name: "String Algorithms",
    short: "Pattern matching — KMP, Z-function, rolling hash, Manacher's.",
    description:
      "Basic string manipulation up through KMP/Z-function pattern matching, rolling hash, and Manacher's algorithm for palindromes.",
    icon: "CaseSensitive",
    levels: [
      { number: 1, title: "Easy", problems: [
        r("find-the-index-of-the-first-occurrence-in-a-string"),
        r("valid-anagram"), r("repeated-substring-pattern"),
        r("isomorphic-strings"), r("ransom-note"),
      ]},
      { number: 2, title: "Medium", problems: [
        r("group-anagrams"), r("longest-happy-prefix"),
        r("repeated-dna-sequences"), r("gfg-implement-kmp"),
        r("gfg-z-algorithm"), r("gfg-rabin-karp"),
      ]},
      { number: 3, title: "Hard", problems: [
        r("shortest-palindrome"), r("longest-duplicate-substring"),
        r("distinct-echo-substrings"),
        r("longest-palindromic-substring-manacher"),
        r("palindromic-substrings-manacher"),
      ]},
      { number: 4, title: "Advanced", problems: [
        r("text-justification"), r("wildcard-matching"),
        r("regular-expression-matching"),
        r("count-different-palindromic-subsequences"),
        r("gfg-number-of-distinct-substrings"),
      ]},
    ],
  },
  {
    slug: "segment-tree-fenwick-tree",
    name: "Segment Tree & Fenwick Tree",
    short: "Range queries and point/range updates in O(log N).",
    description:
      "Point updates, range updates, prefix sums, binary indexed trees, segment trees, and coordinate compression.",
    icon: "GitFork",
    levels: [
      { number: 1, title: "Easy", problems: [
        r("range-sum-query-mutable"), r("gfg-range-update-range-query"),
      ]},
      { number: 2, title: "Medium", problems: [
        r("gfg-count-inversions-fenwick"), r("gfg-range-minimum-query"),
        r("number-of-longest-increasing-subsequence-seg"),
        r("my-calendar-i"), r("my-calendar-ii"),
      ]},
      { number: 3, title: "Hard", problems: [
        r("count-of-smaller-numbers-after-self-seg"), r("reverse-pairs-seg"),
        r("my-calendar-iii"), r("the-skyline-problem-seg"),
        r("range-sum-query-2d-mutable"),
      ]},
      { number: 4, title: "Advanced", problems: [
        r("falling-squares"), r("count-of-range-sum-seg"),
        r("rectangle-area-ii"), r("longest-increasing-subsequence-ii"),
        r("maximum-sum-queries"),
      ]},
    ],
  },
  {
    slug: "matrix",
    name: "Matrix / 2D Grid",
    short: "2D transformations, submatrices, grid DP & search.",
    description:
      "Matrix traversal, rotations, submatrix calculations, 2D prefix sums, and grid optimization problems.",
    icon: "Grid3x3",
    levels: [
      { number: 1, title: "Easy", problems: [
        r("rotate-image"), r("transpose-matrix"), r("flipping-an-image"),
        r("reshape-the-matrix"), r("toeplitz-matrix"),
      ]},
      { number: 2, title: "Medium", problems: [
        r("spiral-matrix"), r("spiral-matrix-ii"), r("set-matrix-zeroes"),
        r("diagonal-traverse"), r("search-a-2d-matrix-ii-mat"),
        r("game-of-life"), r("valid-sudoku"),
      ]},
      { number: 3, title: "Hard", problems: [
        r("maximal-rectangle-mat"),
        r("kth-smallest-element-in-a-sorted-matrix-mat"),
        r("word-search-mat"),
        r("longest-increasing-path-in-a-matrix-mat"),
        r("shortest-path-in-a-grid-with-obstacles-elimination-mat"),
      ]},
      { number: 4, title: "Advanced", problems: [
        r("cherry-pickup-ii"),
        r("maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold"),
        r("number-of-submatrices-that-sum-to-target-mat"),
        r("minimum-cost-to-make-at-least-one-valid-path-in-a-grid"),
        r("making-a-large-island-mat"),
      ]},
    ],
  },
];