// DSA Sheet dataset. Metadata-only; user progress lives in the progress store.
// Difficulty values reflect known platform metadata where confidently known,
// otherwise "Unverified" per the master spec's rule against guessing.

import { PROBLEMS as REMAINING_PROBLEMS, TOPICS as REMAINING_TOPICS } from "./remaining-topics";
import { PROBLEMS as DSA_PROBLEMS, TOPICS as DSA_TOPICS } from "./dsa-topics";
import { ROADMAP } from "./roadmap";

export type Difficulty = "Easy" | "Medium" | "Hard" | "Unverified";
export type Platform = "LeetCode" | "GFG";

export interface Problem {
  id: string; // canonical id derived from URL slug
  title: string;
  url: string;
  platform: Platform;
  difficulty: Difficulty;
}

export interface LevelProblem {
  id: string;
  category?: string; // finer pattern label if needed
}

export interface Level {
  number: number;
  title: string; // short caps subtitle e.g. "Pure Traversal Basics"
  problems: LevelProblem[];
}

export interface Part {
  title: string;
  levels: Level[];
}

export interface Topic {
  slug: string;
  name: string;
  short: string; // 1-line description
  description: string;
  icon: string; // lucide icon name
  parts?: Part[];
  levels?: Level[];
}

// ---------------------------------------------------------------------------
// Problem catalog (canonical metadata)
// ---------------------------------------------------------------------------

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

const ORIGINAL_PROBLEMS: Problem[] = [
  // --- BFS/DFS Graphs (grid + basic) ---
  p("gfg-bfs", "BFS of Graph", "https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1", GFG_, "Easy"),
  p("gfg-dfs", "DFS of Graph", "https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1", GFG_, "Easy"),
  p("number-of-islands", "Number of Islands", "https://leetcode.com/problems/number-of-islands/", LC, "Medium"),
  p("flood-fill", "Flood Fill", "https://leetcode.com/problems/flood-fill/", LC, "Easy"),
  p("find-if-path-exists-in-graph", "Find if Path Exists in Graph", "https://leetcode.com/problems/find-if-path-exists-in-graph/", LC, "Easy"),
  p("max-area-of-island", "Max Area of Island", "https://leetcode.com/problems/max-area-of-island/", LC, "Medium"),
  p("island-perimeter", "Island Perimeter", "https://leetcode.com/problems/island-perimeter/", LC, "Easy"),
  p("number-of-enclaves", "Number of Enclaves", "https://leetcode.com/problems/number-of-enclaves/", LC, "Medium"),
  p("rotting-oranges", "Rotten Oranges", "https://leetcode.com/problems/rotting-oranges/", LC, "Medium"),
  p("gfg-rotten-oranges", "Rotten Oranges (variant)", "https://www.geeksforgeeks.org/problems/rotten-oranges2536/1", GFG_, "Medium"),
  p("01-matrix", "01 Matrix (multi-source BFS distances)", "https://leetcode.com/problems/01-matrix/", LC, "Medium"),
  p("surrounded-regions", "Surrounded Regions", "https://leetcode.com/problems/surrounded-regions/", LC, "Medium"),
  p("gfg-distinct-islands", "Number of Distinct Islands", "https://www.geeksforgeeks.org/problems/number-of-distinct-islands/1", GFG_, "Medium"),
  p("word-search", "Word Search", "https://leetcode.com/problems/word-search/", LC, "Medium"),
  p("shortest-bridge", "Shortest Bridge", "https://leetcode.com/problems/shortest-bridge/", LC, "Medium"),
  p("as-far-from-land-as-possible", "As Far from Land as Possible", "https://leetcode.com/problems/as-far-from-land-as-possible/", LC, "Medium"),
  p("number-of-provinces", "Number of Provinces (Friend Circles)", "https://leetcode.com/problems/number-of-provinces/", LC, "Medium"),
  p("number-of-connected-components-in-an-undirected-graph", "Number of Connected Components in an Undirected Graph", "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", LC, "Medium"),
  p("clone-graph", "Clone Graph", "https://leetcode.com/problems/clone-graph/", LC, "Medium"),
  p("employee-importance", "Employee Importance", "https://leetcode.com/problems/employee-importance/", LC, "Medium"),
  p("is-graph-bipartite", "Is Graph Bipartite?", "https://leetcode.com/problems/is-graph-bipartite/", LC, "Medium"),
  p("gfg-bipartite", "Bipartite Graph", "https://www.geeksforgeeks.org/problems/bipartite-graph/1", GFG_, "Medium"),
  p("keys-and-rooms", "Keys and Rooms", "https://leetcode.com/problems/keys-and-rooms/", LC, "Medium"),
  p("all-paths-from-source-to-target", "All Paths From Source to Target", "https://leetcode.com/problems/all-paths-from-source-to-target/", LC, "Medium"),
  p("reorder-routes-to-make-all-paths-lead-to-the-city-zero", "Reorder Routes to Make All Paths Lead to City Zero", "https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/", LC, "Medium"),
  p("gfg-cycle-undirected", "Detect Cycle in Undirected Graph (BFS/DFS)", "https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1", GFG_, "Medium"),
  p("gfg-cycle-directed", "Detect Cycle in Directed Graph", "https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1", GFG_, "Medium"),
  p("course-schedule", "Course Schedule", "https://leetcode.com/problems/course-schedule/", LC, "Medium"),
  p("course-schedule-ii", "Course Schedule II", "https://leetcode.com/problems/course-schedule-ii/", LC, "Medium"),
  p("gfg-topo-sort", "Topological Sort", "https://www.geeksforgeeks.org/problems/topological-sort/1", GFG_, "Medium"),
  p("gfg-alien-dictionary", "Alien Dictionary", "https://www.geeksforgeeks.org/problems/alien-dictionary/1", GFG_, "Hard"),
  p("find-eventual-safe-states", "Find Eventual Safe States", "https://leetcode.com/problems/find-eventual-safe-states/", LC, "Medium"),
  p("minimum-height-trees", "Minimum Height Trees", "https://leetcode.com/problems/minimum-height-trees/", LC, "Medium"),
  p("redundant-connection", "Redundant Connection", "https://leetcode.com/problems/redundant-connection/", LC, "Medium"),
  p("shortest-path-in-binary-matrix", "Shortest Path in Binary Matrix", "https://leetcode.com/problems/shortest-path-in-binary-matrix/", LC, "Medium"),
  p("shortest-path-in-a-grid-with-obstacles-elimination", "Shortest Path in a Grid with Obstacles Elimination", "https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/", LC, "Hard"),
  p("word-ladder", "Word Ladder", "https://leetcode.com/problems/word-ladder/", LC, "Hard"),
  p("word-ladder-ii", "Word Ladder II", "https://leetcode.com/problems/word-ladder-ii/", LC, "Hard"),
  p("snakes-and-ladders", "Snakes and Ladders", "https://leetcode.com/problems/snakes-and-ladders/", LC, "Medium"),
  p("open-the-lock", "Open the Lock", "https://leetcode.com/problems/open-the-lock/", LC, "Medium"),
  p("bus-routes", "Bus Routes", "https://leetcode.com/problems/bus-routes/", LC, "Hard"),
  p("gfg-shortest-path-undirected", "Shortest Path in Weighted Undirected Graph", "https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph/1", GFG_, "Medium"),
  p("cheapest-flights-within-k-stops", "Cheapest Flights Within K Stops", "https://leetcode.com/problems/cheapest-flights-within-k-stops/", LC, "Medium"),
  p("pacific-atlantic-water-flow", "Pacific Atlantic Water Flow", "https://leetcode.com/problems/pacific-atlantic-water-flow/", LC, "Medium"),
  p("making-a-large-island", "Making a Large Island", "https://leetcode.com/problems/making-a-large-island/", LC, "Hard"),
  p("swim-in-rising-water", "Swim in Rising Water", "https://leetcode.com/problems/swim-in-rising-water/", LC, "Hard"),
  p("accounts-merge", "Accounts Merge", "https://leetcode.com/problems/accounts-merge/", LC, "Medium"),
  p("sliding-puzzle", "Sliding Puzzle", "https://leetcode.com/problems/sliding-puzzle/", LC, "Hard"),
  p("critical-connections-in-a-network", "Critical Connections in a Network (Bridges)", "https://leetcode.com/problems/critical-connections-in-a-network/", LC, "Hard"),
  p("gfg-articulation-point", "Articulation Points", "https://www.geeksforgeeks.org/problems/articulation-point-1/1", GFG_, "Hard"),
  p("gfg-kosaraju", "Strongly Connected Components (Kosaraju's)", "https://www.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1", GFG_, "Hard"),

  // --- Prefix Sum ---
  p("range-sum-query-immutable", "Range Sum Query - Immutable", "https://leetcode.com/problems/range-sum-query-immutable/", LC, "Easy"),
  p("find-pivot-index", "Find Pivot Index", "https://leetcode.com/problems/find-pivot-index/", LC, "Easy"),
  p("running-sum-of-1d-array", "Running Sum of 1d Array", "https://leetcode.com/problems/running-sum-of-1d-array/", LC, "Easy"),
  p("gfg-prefix-sum-array", "Prefix Sum Array", "https://www.geeksforgeeks.org/problems/prefix-sum-array-1587115621/1", GFG_, "Easy"),
  p("subarray-sum-equals-k", "Subarray Sum Equals K", "https://leetcode.com/problems/subarray-sum-equals-k/", LC, "Medium"),
  p("continuous-subarray-sum", "Continuous Subarray Sum", "https://leetcode.com/problems/continuous-subarray-sum/", LC, "Medium"),
  p("subarray-sums-divisible-by-k", "Subarray Sums Divisible by K", "https://leetcode.com/problems/subarray-sums-divisible-by-k/", LC, "Medium"),
  p("contiguous-array", "Contiguous Array (equal 0s and 1s)", "https://leetcode.com/problems/contiguous-array/", LC, "Medium"),
  p("maximum-size-subarray-sum-equals-k", "Maximum Size Subarray Sum Equals k", "https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/", LC, "Medium"),
  p("range-sum-query-2d-immutable", "Range Sum Query 2D - Immutable", "https://leetcode.com/problems/range-sum-query-2d-immutable/", LC, "Medium"),
  p("matrix-block-sum", "Matrix Block Sum", "https://leetcode.com/problems/matrix-block-sum/", LC, "Medium"),
  p("number-of-submatrices-that-sum-to-target", "Number of Submatrices That Sum to Target", "https://leetcode.com/problems/number-of-submatrices-that-sum-to-target/", LC, "Hard"),
  p("range-addition", "Range Addition", "https://leetcode.com/problems/range-addition/", LC, "Medium"),
  p("corporate-flight-bookings", "Corporate Flight Bookings", "https://leetcode.com/problems/corporate-flight-bookings/", LC, "Medium"),
  p("car-pooling", "Car Pooling", "https://leetcode.com/problems/car-pooling/", LC, "Medium"),
  p("product-of-array-except-self", "Product of Array Except Self (prefix/suffix product)", "https://leetcode.com/problems/product-of-array-except-self/", LC, "Medium"),
  p("maximum-sum-of-two-non-overlapping-subarrays", "Maximum Sum of Two Non-Overlapping Subarrays", "https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays/", LC, "Medium"),
  p("minimum-operations-to-reduce-x-to-zero", "Minimum Operations to Reduce X to Zero", "https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/", LC, "Medium"),
  p("count-number-of-nice-subarrays", "Count Number of Nice Subarrays", "https://leetcode.com/problems/count-number-of-nice-subarrays/", LC, "Medium"),
  p("path-sum-iii", "Path Sum III (prefix sum on tree)", "https://leetcode.com/problems/path-sum-iii/", LC, "Medium"),

  // --- Sliding Window ---
  p("gfg-max-sum-subarray-k", "Maximum Sum Subarray of Size K", "https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1", GFG_, "Easy"),
  p("maximum-average-subarray-i", "Maximum Average Subarray I", "https://leetcode.com/problems/maximum-average-subarray-i/", LC, "Easy"),
  p("gfg-first-negative-in-window", "First Negative Number in Every Window of Size K", "https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1", GFG_, "Easy"),
  p("gfg-count-occurrences-anagrams", "Count Occurrences of Anagrams", "https://www.geeksforgeeks.org/problems/count-occurences-of-anagrams5839/1", GFG_, "Medium"),
  p("longest-substring-without-repeating-characters", "Longest Substring Without Repeating Characters", "https://leetcode.com/problems/longest-substring-without-repeating-characters/", LC, "Medium"),
  p("minimum-size-subarray-sum", "Minimum Size Subarray Sum", "https://leetcode.com/problems/minimum-size-subarray-sum/", LC, "Medium"),
  p("fruit-into-baskets", "Fruit Into Baskets", "https://leetcode.com/problems/fruit-into-baskets/", LC, "Medium"),
  p("longest-repeating-character-replacement", "Longest Repeating Character Replacement", "https://leetcode.com/problems/longest-repeating-character-replacement/", LC, "Medium"),
  p("max-consecutive-ones-iii", "Max Consecutive Ones III", "https://leetcode.com/problems/max-consecutive-ones-iii/", LC, "Medium"),
  p("permutation-in-string", "Permutation in String", "https://leetcode.com/problems/permutation-in-string/", LC, "Medium"),
  p("find-all-anagrams-in-a-string", "Find All Anagrams in a String", "https://leetcode.com/problems/find-all-anagrams-in-a-string/", LC, "Medium"),
  p("minimum-window-substring", "Minimum Window Substring", "https://leetcode.com/problems/minimum-window-substring/", LC, "Hard"),
  p("substring-with-concatenation-of-all-words", "Substring with Concatenation of All Words", "https://leetcode.com/problems/substring-with-concatenation-of-all-words/", LC, "Hard"),
  p("subarrays-with-k-different-integers", "Subarrays with K Different Integers", "https://leetcode.com/problems/subarrays-with-k-different-integers/", LC, "Hard"),
  p("binary-subarrays-with-sum", "Binary Subarrays With Sum", "https://leetcode.com/problems/binary-subarrays-with-sum/", LC, "Medium"),
  p("number-of-substrings-containing-all-three-characters", "Number of Substrings Containing All Three Characters", "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/", LC, "Medium"),
  p("sliding-window-maximum", "Sliding Window Maximum", "https://leetcode.com/problems/sliding-window-maximum/", LC, "Hard"),
  p("shortest-subarray-with-sum-at-least-k", "Shortest Subarray with Sum at Least K", "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/", LC, "Hard"),
  p("longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit", "Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit", "https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/", LC, "Medium"),
  p("sliding-window-median", "Sliding Window Median", "https://leetcode.com/problems/sliding-window-median/", LC, "Hard"),

  // --- Two Pointers ---
  p("two-sum-ii-input-array-is-sorted", "Two Sum II - Input Array Is Sorted", "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", LC, "Medium"),
  p("valid-palindrome", "Valid Palindrome", "https://leetcode.com/problems/valid-palindrome/", LC, "Easy"),
  p("reverse-string", "Reverse String", "https://leetcode.com/problems/reverse-string/", LC, "Easy"),
  p("move-zeroes", "Move Zeroes", "https://leetcode.com/problems/move-zeroes/", LC, "Easy"),
  p("squares-of-a-sorted-array", "Squares of a Sorted Array", "https://leetcode.com/problems/squares-of-a-sorted-array/", LC, "Easy"),
  p("remove-duplicates-from-sorted-array", "Remove Duplicates from Sorted Array", "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", LC, "Easy"),
  p("remove-element", "Remove Element", "https://leetcode.com/problems/remove-element/", LC, "Easy"),
  p("linked-list-cycle", "Linked List Cycle (Floyd's)", "https://leetcode.com/problems/linked-list-cycle/", LC, "Easy"),
  p("middle-of-the-linked-list", "Middle of the Linked List", "https://leetcode.com/problems/middle-of-the-linked-list/", LC, "Easy"),
  p("sort-colors", "Sort Colors (Dutch National Flag)", "https://leetcode.com/problems/sort-colors/", LC, "Medium"),
  p("3sum", "3Sum", "https://leetcode.com/problems/3sum/", LC, "Medium"),
  p("3sum-closest", "3Sum Closest", "https://leetcode.com/problems/3sum-closest/", LC, "Medium"),
  p("4sum", "4Sum", "https://leetcode.com/problems/4sum/", LC, "Medium"),
  p("3sum-smaller", "3Sum Smaller", "https://leetcode.com/problems/3sum-smaller/", LC, "Medium"),
  p("container-with-most-water", "Container With Most Water", "https://leetcode.com/problems/container-with-most-water/", LC, "Medium"),
  p("merge-sorted-array", "Merge Sorted Array", "https://leetcode.com/problems/merge-sorted-array/", LC, "Easy"),
  p("intersection-of-two-arrays-ii", "Intersection of Two Arrays II", "https://leetcode.com/problems/intersection-of-two-arrays-ii/", LC, "Easy"),
  p("is-subsequence", "Is Subsequence", "https://leetcode.com/problems/is-subsequence/", LC, "Easy"),
  p("backspace-string-compare", "Backspace String Compare", "https://leetcode.com/problems/backspace-string-compare/", LC, "Easy"),
  p("trapping-rain-water", "Trapping Rain Water", "https://leetcode.com/problems/trapping-rain-water/", LC, "Hard"),
  p("boats-to-save-people", "Boats to Save People", "https://leetcode.com/problems/boats-to-save-people/", LC, "Medium"),
  p("minimum-number-of-arrows-to-burst-balloons", "Minimum Number of Arrows to Burst Balloons", "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/", LC, "Medium"),
  p("partition-labels", "Partition Labels", "https://leetcode.com/problems/partition-labels/", LC, "Medium"),
  p("sort-array-by-parity", "Sort Array By Parity", "https://leetcode.com/problems/sort-array-by-parity/", LC, "Easy"),

  // --- Sorting ---
  p("gfg-bubble-sort", "Bubble Sort", "https://www.geeksforgeeks.org/problems/bubble-sort/1", GFG_, "Easy"),
  p("gfg-selection-sort", "Selection Sort", "https://www.geeksforgeeks.org/problems/selection-sort/1", GFG_, "Easy"),
  p("gfg-insertion-sort", "Insertion Sort", "https://www.geeksforgeeks.org/problems/insertion-sort/1", GFG_, "Easy"),
  p("gfg-merge-sort", "Merge Sort", "https://www.geeksforgeeks.org/problems/merge-sort/1", GFG_, "Medium"),
  p("gfg-quick-sort", "Quick Sort", "https://www.geeksforgeeks.org/problems/quick-sort/1", GFG_, "Medium"),
  p("gfg-heap-sort", "Heap Sort", "https://www.geeksforgeeks.org/problems/heap-sort/1", GFG_, "Medium"),
  p("gfg-counting-sort", "Counting Sort", "https://www.geeksforgeeks.org/problems/counting-sort/1", GFG_, "Medium"),
  p("sort-an-array", "Sort an Array", "https://leetcode.com/problems/sort-an-array/", LC, "Medium"),
  p("relative-sort-array", "Relative Sort Array", "https://leetcode.com/problems/relative-sort-array/", LC, "Easy"),
  p("height-checker", "Height Checker", "https://leetcode.com/problems/height-checker/", LC, "Easy"),
  p("largest-number", "Largest Number", "https://leetcode.com/problems/largest-number/", LC, "Medium"),
  p("sort-the-matrix-diagonally", "Sort the Matrix Diagonally", "https://leetcode.com/problems/sort-the-matrix-diagonally/", LC, "Medium"),
  p("custom-sort-string", "Custom Sort String", "https://leetcode.com/problems/custom-sort-string/", LC, "Medium"),
  p("sort-array-by-increasing-frequency", "Sort Array by Increasing Frequency", "https://leetcode.com/problems/sort-array-by-increasing-frequency/", LC, "Easy"),
  p("meeting-rooms", "Meeting Rooms", "https://leetcode.com/problems/meeting-rooms/", LC, "Easy"),
  p("meeting-rooms-ii", "Meeting Rooms II", "https://leetcode.com/problems/meeting-rooms-ii/", LC, "Medium"),
  p("merge-intervals", "Merge Intervals", "https://leetcode.com/problems/merge-intervals/", LC, "Medium"),
  p("insert-interval", "Insert Interval", "https://leetcode.com/problems/insert-interval/", LC, "Medium"),
  p("non-overlapping-intervals", "Non-overlapping Intervals", "https://leetcode.com/problems/non-overlapping-intervals/", LC, "Medium"),
  p("assign-cookies", "Assign Cookies", "https://leetcode.com/problems/assign-cookies/", LC, "Easy"),
  p("top-k-frequent-elements", "Top K Frequent Elements", "https://leetcode.com/problems/top-k-frequent-elements/", LC, "Medium"),
  p("sort-characters-by-frequency", "Sort Characters By Frequency", "https://leetcode.com/problems/sort-characters-by-frequency/", LC, "Medium"),
  p("maximum-gap", "Maximum Gap (bucket sort)", "https://leetcode.com/problems/maximum-gap/", LC, "Medium"),
  p("h-index", "H-Index", "https://leetcode.com/problems/h-index/", LC, "Medium"),
  p("wiggle-sort", "Wiggle Sort", "https://leetcode.com/problems/wiggle-sort/", LC, "Medium"),
  p("wiggle-sort-ii", "Wiggle Sort II", "https://leetcode.com/problems/wiggle-sort-ii/", LC, "Medium"),
  p("kth-largest-element-in-an-array", "Kth Largest Element in an Array", "https://leetcode.com/problems/kth-largest-element-in-an-array/", LC, "Medium"),
  p("k-closest-points-to-origin", "K Closest Points to Origin", "https://leetcode.com/problems/k-closest-points-to-origin/", LC, "Medium"),
  p("top-k-frequent-words", "Top K Frequent Words", "https://leetcode.com/problems/top-k-frequent-words/", LC, "Medium"),
  p("find-k-pairs-with-smallest-sums", "Find K Pairs with Smallest Sums", "https://leetcode.com/problems/find-k-pairs-with-smallest-sums/", LC, "Medium"),
  p("kth-smallest-element-in-a-sorted-matrix", "Kth Smallest Element in a Sorted Matrix", "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", LC, "Medium"),
  p("gfg-count-inversions", "Count Inversions", "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1", GFG_, "Medium"),
  p("reverse-pairs", "Reverse Pairs", "https://leetcode.com/problems/reverse-pairs/", LC, "Hard"),
  p("count-of-smaller-numbers-after-self", "Count of Smaller Numbers After Self", "https://leetcode.com/problems/count-of-smaller-numbers-after-self/", LC, "Hard"),
  p("sort-items-by-groups-respecting-dependencies", "Team Rankings / Sort Items by Groups Respecting Dependencies", "https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies/", LC, "Hard"),
  p("merge-k-sorted-lists", "Merge k Sorted Lists", "https://leetcode.com/problems/merge-k-sorted-lists/", LC, "Hard"),
  p("sort-list", "Sort List (linked list, O(n log n))", "https://leetcode.com/problems/sort-list/", LC, "Medium"),
  p("task-scheduler", "Task Scheduler", "https://leetcode.com/problems/task-scheduler/", LC, "Medium"),
  p("course-schedule-iii", "Course Schedule III", "https://leetcode.com/problems/course-schedule-iii/", LC, "Hard"),
  p("minimum-cost-to-hire-k-workers", "Minimum Cost to Hire K Workers", "https://leetcode.com/problems/minimum-cost-to-hire-k-workers/", LC, "Hard"),
  p("the-skyline-problem", "The Skyline Problem", "https://leetcode.com/problems/the-skyline-problem/", LC, "Hard"),

  // --- Trees ---
  p("binary-tree-inorder-traversal", "Binary Tree Inorder Traversal", "https://leetcode.com/problems/binary-tree-inorder-traversal/", LC, "Easy"),
  p("binary-tree-preorder-traversal", "Binary Tree Preorder Traversal", "https://leetcode.com/problems/binary-tree-preorder-traversal/", LC, "Easy"),
  p("binary-tree-postorder-traversal", "Binary Tree Postorder Traversal", "https://leetcode.com/problems/binary-tree-postorder-traversal/", LC, "Easy"),
  p("binary-tree-level-order-traversal", "Binary Tree Level Order Traversal", "https://leetcode.com/problems/binary-tree-level-order-traversal/", LC, "Medium"),
  p("maximum-depth-of-binary-tree", "Maximum Depth of Binary Tree", "https://leetcode.com/problems/maximum-depth-of-binary-tree/", LC, "Easy"),
  p("symmetric-tree", "Symmetric Tree", "https://leetcode.com/problems/symmetric-tree/", LC, "Easy"),
  p("balanced-binary-tree", "Balanced Binary Tree", "https://leetcode.com/problems/balanced-binary-tree/", LC, "Easy"),
  p("diameter-of-binary-tree", "Diameter of Binary Tree", "https://leetcode.com/problems/diameter-of-binary-tree/", LC, "Easy"),
  p("invert-binary-tree", "Invert Binary Tree", "https://leetcode.com/problems/invert-binary-tree/", LC, "Easy"),
  p("same-tree", "Same Tree", "https://leetcode.com/problems/same-tree/", LC, "Easy"),
  p("subtree-of-another-tree", "Subtree of Another Tree", "https://leetcode.com/problems/subtree-of-another-tree/", LC, "Easy"),
  p("path-sum", "Path Sum", "https://leetcode.com/problems/path-sum/", LC, "Easy"),
  p("path-sum-ii", "Path Sum II", "https://leetcode.com/problems/path-sum-ii/", LC, "Medium"),
  p("binary-tree-zigzag-level-order-traversal", "Binary Tree Zigzag Level Order Traversal", "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", LC, "Medium"),
  p("binary-tree-right-side-view", "Binary Tree Right Side View", "https://leetcode.com/problems/binary-tree-right-side-view/", LC, "Medium"),
  p("gfg-top-view", "Top View of Binary Tree", "https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1", GFG_, "Medium"),
  p("gfg-bottom-view", "Bottom View of Binary Tree", "https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1", GFG_, "Medium"),
  p("gfg-boundary-traversal", "Boundary Traversal of Binary Tree", "https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1", GFG_, "Medium"),
  p("vertical-order-traversal-of-a-binary-tree", "Vertical Order Traversal of a Binary Tree", "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/", LC, "Hard"),
  p("validate-binary-search-tree", "Validate Binary Search Tree", "https://leetcode.com/problems/validate-binary-search-tree/", LC, "Medium"),
  p("kth-smallest-element-in-a-bst", "Kth Smallest Element in a BST", "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", LC, "Medium"),
  p("insert-into-a-binary-search-tree", "Insert into a Binary Search Tree", "https://leetcode.com/problems/insert-into-a-binary-search-tree/", LC, "Medium"),
  p("delete-node-in-a-bst", "Delete Node in a BST", "https://leetcode.com/problems/delete-node-in-a-bst/", LC, "Medium"),
  p("lowest-common-ancestor-of-a-binary-search-tree", "Lowest Common Ancestor of a BST", "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", LC, "Medium"),
  p("convert-sorted-array-to-binary-search-tree", "Convert Sorted Array to Binary Search Tree", "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/", LC, "Easy"),
  p("construct-binary-tree-from-preorder-and-inorder-traversal", "Construct Binary Tree from Preorder and Inorder Traversal", "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", LC, "Medium"),
  p("construct-binary-tree-from-inorder-and-postorder-traversal", "Construct Binary Tree from Inorder and Postorder Traversal", "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/", LC, "Medium"),
  p("serialize-and-deserialize-binary-tree", "Serialize and Deserialize Binary Tree", "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", LC, "Hard"),
  p("flatten-binary-tree-to-linked-list", "Flatten Binary Tree to Linked List", "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/", LC, "Medium"),
  p("lowest-common-ancestor-of-a-binary-tree", "Lowest Common Ancestor of a Binary Tree", "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", LC, "Medium"),
  p("binary-tree-maximum-path-sum", "Binary Tree Maximum Path Sum", "https://leetcode.com/problems/binary-tree-maximum-path-sum/", LC, "Hard"),
  p("house-robber-iii", "House Robber III", "https://leetcode.com/problems/house-robber-iii/", LC, "Medium"),
  p("distribute-coins-in-binary-tree", "Distribute Coins in Binary Tree", "https://leetcode.com/problems/distribute-coins-in-binary-tree/", LC, "Medium"),
  p("count-nodes-equal-to-average-of-subtree", "Count Nodes Equal to Average of Subtree", "https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/", LC, "Medium"),
  p("all-nodes-distance-k-in-binary-tree", "All Nodes Distance K in Binary Tree", "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/", LC, "Medium"),

  // --- Linked Lists ---
  p("reverse-linked-list", "Reverse Linked List", "https://leetcode.com/problems/reverse-linked-list/", LC, "Easy"),
  p("merge-two-sorted-lists", "Merge Two Sorted Lists", "https://leetcode.com/problems/merge-two-sorted-lists/", LC, "Easy"),
  p("remove-duplicates-from-sorted-list", "Remove Duplicates from Sorted List", "https://leetcode.com/problems/remove-duplicates-from-sorted-list/", LC, "Easy"),
  p("delete-node-in-a-linked-list", "Delete Node in a Linked List", "https://leetcode.com/problems/delete-node-in-a-linked-list/", LC, "Medium"),
  p("linked-list-cycle-ii", "Linked List Cycle II", "https://leetcode.com/problems/linked-list-cycle-ii/", LC, "Medium"),
  p("palindrome-linked-list", "Palindrome Linked List", "https://leetcode.com/problems/palindrome-linked-list/", LC, "Easy"),
  p("remove-nth-node-from-end-of-list", "Remove Nth Node From End of List", "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", LC, "Medium"),
  p("intersection-of-two-linked-lists", "Intersection of Two Linked Lists", "https://leetcode.com/problems/intersection-of-two-linked-lists/", LC, "Easy"),
  p("reverse-linked-list-ii", "Reverse Linked List II", "https://leetcode.com/problems/reverse-linked-list-ii/", LC, "Medium"),
  p("swap-nodes-in-pairs", "Swap Nodes in Pairs", "https://leetcode.com/problems/swap-nodes-in-pairs/", LC, "Medium"),
  p("reverse-nodes-in-k-group", "Reverse Nodes in k-Group", "https://leetcode.com/problems/reverse-nodes-in-k-group/", LC, "Hard"),
  p("rotate-list", "Rotate List", "https://leetcode.com/problems/rotate-list/", LC, "Medium"),
  p("odd-even-linked-list", "Odd Even Linked List", "https://leetcode.com/problems/odd-even-linked-list/", LC, "Medium"),
  p("reorder-list", "Reorder List", "https://leetcode.com/problems/reorder-list/", LC, "Medium"),
  p("partition-list", "Partition List", "https://leetcode.com/problems/partition-list/", LC, "Medium"),
  p("add-two-numbers", "Add Two Numbers", "https://leetcode.com/problems/add-two-numbers/", LC, "Medium"),
  p("add-two-numbers-ii", "Add Two Numbers II", "https://leetcode.com/problems/add-two-numbers-ii/", LC, "Medium"),
  p("copy-list-with-random-pointer", "Copy List with Random Pointer", "https://leetcode.com/problems/copy-list-with-random-pointer/", LC, "Medium"),
  p("lru-cache", "LRU Cache (doubly linked list + hashmap)", "https://leetcode.com/problems/lru-cache/", LC, "Medium"),
  p("lfu-cache", "LFU Cache", "https://leetcode.com/problems/lfu-cache/", LC, "Hard"),
  p("design-linked-list", "Design Linked List", "https://leetcode.com/problems/design-linked-list/", LC, "Medium"),
  p("flatten-a-multilevel-doubly-linked-list", "Flatten a Multilevel Doubly Linked List", "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/", LC, "Medium"),

  // --- Graphs (node-based) additional ---
  p("find-the-town-judge", "Find the Town Judge", "https://leetcode.com/problems/find-the-town-judge/", LC, "Easy"),
  p("graph-valid-tree", "Graph Valid Tree", "https://leetcode.com/problems/graph-valid-tree/", LC, "Medium"),
  p("number-of-operations-to-make-network-connected", "Number of Operations to Make Network Connected", "https://leetcode.com/problems/number-of-operations-to-make-network-connected/", LC, "Medium"),
  p("satisfiability-of-equality-equations", "Satisfiability of Equality Equations", "https://leetcode.com/problems/satisfiability-of-equality-equations/", LC, "Medium"),
  p("network-delay-time", "Network Delay Time (Dijkstra)", "https://leetcode.com/problems/network-delay-time/", LC, "Medium"),
  p("path-with-minimum-effort", "Path With Minimum Effort", "https://leetcode.com/problems/path-with-minimum-effort/", LC, "Medium"),
  p("evaluate-division", "Evaluate Division (weighted union-find/graph)", "https://leetcode.com/problems/evaluate-division/", LC, "Medium"),
  p("gfg-negative-weight-cycle", "Cheapest Flights (Bellman-Ford practice)", "https://www.geeksforgeeks.org/problems/negative-weight-cycle3345/1", GFG_, "Medium"),
  p("number-of-islands-ii", "Number of Islands II (DSU version)", "https://leetcode.com/problems/number-of-islands-ii/", LC, "Hard"),

  // --- Dynamic Programming ---
  p("climbing-stairs", "Climbing Stairs", "https://leetcode.com/problems/climbing-stairs/", LC, "Easy"),
  p("house-robber", "House Robber", "https://leetcode.com/problems/house-robber/", LC, "Medium"),
  p("house-robber-ii", "House Robber II", "https://leetcode.com/problems/house-robber-ii/", LC, "Medium"),
  p("min-cost-climbing-stairs", "Min Cost Climbing Stairs", "https://leetcode.com/problems/min-cost-climbing-stairs/", LC, "Easy"),
  p("maximum-subarray", "Maximum Subarray (Kadane's)", "https://leetcode.com/problems/maximum-subarray/", LC, "Medium"),
  p("decode-ways", "Decode Ways", "https://leetcode.com/problems/decode-ways/", LC, "Medium"),
  p("fibonacci-number", "Fibonacci Number", "https://leetcode.com/problems/fibonacci-number/", LC, "Easy"),
  p("gfg-01-knapsack", "0/1 Knapsack Problem", "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1", GFG_, "Medium"),
  p("partition-equal-subset-sum", "Partition Equal Subset Sum", "https://leetcode.com/problems/partition-equal-subset-sum/", LC, "Medium"),
  p("gfg-subset-sum", "Subset Sum Problem", "https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1", GFG_, "Medium"),
  p("target-sum", "Target Sum", "https://leetcode.com/problems/target-sum/", LC, "Medium"),
  p("last-stone-weight-ii", "Last Stone Weight II", "https://leetcode.com/problems/last-stone-weight-ii/", LC, "Medium"),
  p("ones-and-zeroes", "Ones and Zeroes", "https://leetcode.com/problems/ones-and-zeroes/", LC, "Medium"),
  p("coin-change", "Coin Change", "https://leetcode.com/problems/coin-change/", LC, "Medium"),
  p("coin-change-ii", "Coin Change II", "https://leetcode.com/problems/coin-change-ii/", LC, "Medium"),
  p("gfg-rod-cutting", "Rod Cutting", "https://www.geeksforgeeks.org/problems/rod-cutting0840/1", GFG_, "Medium"),
  p("perfect-squares", "Perfect Squares", "https://leetcode.com/problems/perfect-squares/", LC, "Medium"),
  p("combination-sum-iv", "Combination Sum IV", "https://leetcode.com/problems/combination-sum-iv/", LC, "Medium"),
  p("minimum-cost-for-tickets", "Minimum Cost For Tickets", "https://leetcode.com/problems/minimum-cost-for-tickets/", LC, "Medium"),
  p("longest-increasing-subsequence", "Longest Increasing Subsequence", "https://leetcode.com/problems/longest-increasing-subsequence/", LC, "Medium"),
  p("russian-doll-envelopes", "Russian Doll Envelopes", "https://leetcode.com/problems/russian-doll-envelopes/", LC, "Hard"),
  p("maximum-length-of-pair-chain", "Maximum Length of Pair Chain", "https://leetcode.com/problems/maximum-length-of-pair-chain/", LC, "Medium"),
  p("number-of-longest-increasing-subsequence", "Number of Longest Increasing Subsequence", "https://leetcode.com/problems/number-of-longest-increasing-subsequence/", LC, "Medium"),
  p("gfg-longest-bitonic", "Longest Bitonic Subsequence", "https://www.geeksforgeeks.org/problems/longest-bitonic-subsequence0824/1", GFG_, "Medium"),
  p("unique-paths", "Unique Paths", "https://leetcode.com/problems/unique-paths/", LC, "Medium"),
  p("unique-paths-ii", "Unique Paths II", "https://leetcode.com/problems/unique-paths-ii/", LC, "Medium"),
  p("minimum-path-sum", "Minimum Path Sum", "https://leetcode.com/problems/minimum-path-sum/", LC, "Medium"),
  p("triangle", "Triangle", "https://leetcode.com/problems/triangle/", LC, "Medium"),
  p("maximal-square", "Maximal Square", "https://leetcode.com/problems/maximal-square/", LC, "Medium"),
  p("dungeon-game", "Dungeon Game", "https://leetcode.com/problems/dungeon-game/", LC, "Hard"),
  p("cherry-pickup", "Cherry Pickup", "https://leetcode.com/problems/cherry-pickup/", LC, "Hard"),
  p("longest-common-subsequence", "Longest Common Subsequence", "https://leetcode.com/problems/longest-common-subsequence/", LC, "Medium"),
  p("gfg-longest-common-substring", "Longest Common Substring", "https://www.geeksforgeeks.org/problems/longest-common-substring1452/1", GFG_, "Medium"),
  p("edit-distance", "Edit Distance", "https://leetcode.com/problems/edit-distance/", LC, "Hard"),
  p("delete-operation-for-two-strings", "Delete Operation for Two Strings", "https://leetcode.com/problems/delete-operation-for-two-strings/", LC, "Medium"),
  p("distinct-subsequences", "Distinct Subsequences", "https://leetcode.com/problems/distinct-subsequences/", LC, "Hard"),
  p("shortest-common-supersequence", "Shortest Common Supersequence", "https://leetcode.com/problems/shortest-common-supersequence/", LC, "Hard"),
  p("interleaving-string", "Interleaving String", "https://leetcode.com/problems/interleaving-string/", LC, "Medium"),
  p("longest-palindromic-substring", "Longest Palindromic Substring", "https://leetcode.com/problems/longest-palindromic-substring/", LC, "Medium"),
  p("longest-palindromic-subsequence", "Longest Palindromic Subsequence", "https://leetcode.com/problems/longest-palindromic-subsequence/", LC, "Medium"),
  p("palindromic-substrings", "Palindromic Substrings", "https://leetcode.com/problems/palindromic-substrings/", LC, "Medium"),
  p("palindrome-partitioning-ii", "Palindrome Partitioning II (min cuts)", "https://leetcode.com/problems/palindrome-partitioning-ii/", LC, "Hard"),
  p("minimum-insertion-steps-to-make-a-string-palindrome", "Minimum Insertion Steps to Make a String Palindrome", "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/", LC, "Hard"),
  p("gfg-matrix-chain", "Matrix Chain Multiplication", "https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1", GFG_, "Hard"),
  p("burst-balloons", "Burst Balloons", "https://leetcode.com/problems/burst-balloons/", LC, "Hard"),
  p("minimum-cost-to-merge-stones", "Minimum Cost to Merge Stones", "https://leetcode.com/problems/minimum-cost-to-merge-stones/", LC, "Hard"),
  p("strange-printer", "Strange Printer", "https://leetcode.com/problems/strange-printer/", LC, "Hard"),
  p("predict-the-winner", "Predict the Winner", "https://leetcode.com/problems/predict-the-winner/", LC, "Medium"),
  p("best-time-to-buy-and-sell-stock", "Best Time to Buy and Sell Stock", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", LC, "Easy"),
  p("best-time-to-buy-and-sell-stock-ii", "Best Time to Buy and Sell Stock II", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/", LC, "Medium"),
  p("best-time-to-buy-and-sell-stock-iii", "Best Time to Buy and Sell Stock III", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/", LC, "Hard"),
  p("best-time-to-buy-and-sell-stock-iv", "Best Time to Buy and Sell Stock IV", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/", LC, "Hard"),
  p("best-time-to-buy-and-sell-stock-with-cooldown", "Best Time to Buy and Sell Stock with Cooldown", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/", LC, "Medium"),
  p("best-time-to-buy-and-sell-stock-with-transaction-fee", "Best Time to Buy and Sell Stock with Transaction Fee", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/", LC, "Medium"),
  p("longest-path-with-different-adjacent-characters", "Longest Path With Different Adjacent Characters", "https://leetcode.com/problems/longest-path-with-different-adjacent-characters/", LC, "Hard"),
  p("count-subtrees-with-max-distance-between-cities", "Count Subtrees With Max Distance Between Cities", "https://leetcode.com/problems/count-subtrees-with-max-distance-between-cities/", LC, "Hard"),
  p("partition-to-k-equal-sum-subsets", "Partition to K Equal Sum Subsets", "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/", LC, "Medium"),
  p("shortest-path-visiting-all-nodes", "Shortest Path Visiting All Nodes", "https://leetcode.com/problems/shortest-path-visiting-all-nodes/", LC, "Hard"),
  p("minimum-cost-to-connect-two-groups-of-points", "Minimum Cost to Connect Two Groups of Points", "https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points/", LC, "Hard"),
  p("gfg-tsp", "Traveling Salesman Problem", "https://www.geeksforgeeks.org/problems/travelling-salesman-problem/1", GFG_, "Hard"),
  p("maximum-students-taking-exam", "Maximum Students Taking Exam", "https://leetcode.com/problems/maximum-students-taking-exam/", LC, "Hard"),
  p("numbers-at-most-n-given-digit-set", "Numbers At Most N Given Digit Set", "https://leetcode.com/problems/numbers-at-most-n-given-digit-set/", LC, "Hard"),
  p("count-of-integers", "Count of Integers", "https://leetcode.com/problems/count-of-integers/", LC, "Hard"),
  p("non-negative-integers-without-consecutive-ones", "Non-negative Integers without Consecutive Ones", "https://leetcode.com/problems/non-negative-integers-without-consecutive-ones/", LC, "Hard"),
  p("longest-increasing-path-in-a-matrix", "Longest Increasing Path in a Matrix", "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/", LC, "Hard"),
  p("frog-jump", "Frog Jump", "https://leetcode.com/problems/frog-jump/", LC, "Hard"),
  p("out-of-boundary-paths", "Out of Boundary Paths", "https://leetcode.com/problems/out-of-boundary-paths/", LC, "Medium"),
  p("number-of-ways-to-arrive-at-destination", "Number of Ways to Arrive at Destination", "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/", LC, "Medium"),

  // --- Graph Algorithms & GFG Variants ---
  p("gfg-dijkstra", "Dijkstra Algorithm (Shortest Path)", "https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1", GFG_, "Medium"),
  p("network-delay-time", "Network Delay Time (Dijkstra)", "https://leetcode.com/problems/network-delay-time/", LC, "Medium"),
  p("gfg-bellman-ford", "Distance from Source (Bellman-Ford Algorithm)", "https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1", GFG_, "Medium"),
  p("gfg-floyd-warshall", "Floyd Warshall (All Pairs Shortest Path)", "https://www.geeksforgeeks.org/problems/implementing-floyd-warshall2032/1", GFG_, "Medium"),
  p("find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance", "Find City With Smallest Number of Neighbors (Floyd Warshall)", "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/", LC, "Medium"),
  p("gfg-minimum-spanning-tree", "Minimum Spanning Tree (Prim's & Kruskal's)", "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1", GFG_, "Medium"),
  p("min-cost-to-connect-all-points", "Min Cost to Connect All Points (Kruskal/Prim)", "https://leetcode.com/problems/min-cost-to-connect-all-points/", LC, "Medium"),
  p("gfg-disjoint-set-union", "Disjoint Set Union (Union-Find)", "https://www.geeksforgeeks.org/problems/disjoint-set-union-find/1", GFG_, "Easy"),
  p("gfg-tarjan-sccs", "Tarjan's Strongly Connected Components", "https://www.geeksforgeeks.org/problems/tarjans-strongly-connected-components-algo1355/1", GFG_, "Hard"),

  // --- Array / Prefix Sum / Sliding Window GFG Variants ---
  p("gfg-kadanes-algorithm", "Kadane's Algorithm (Max Subarray)", "https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1", GFG_, "Medium"),
  p("gfg-subarray-with-given-sum", "Subarray with Given Sum", "https://www.geeksforgeeks.org/problems/subarray-with-given-sum-1587115621/1", GFG_, "Medium"),
  p("gfg-equilibrium-point", "Equilibrium Point", "https://www.geeksforgeeks.org/problems/equilibrium-point-1587115620/1", GFG_, "Easy"),
  p("gfg-missing-number-in-array", "Missing Number in Array", "https://www.geeksforgeeks.org/problems/missing-number-in-array1416/1", GFG_, "Easy"),
  p("gfg-leaders-in-an-array", "Leaders in an Array", "https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1", GFG_, "Easy"),
  p("gfg-trapping-rain-water", "Trapping Rain Water", "https://www.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1", GFG_, "Hard"),
  p("gfg-sort-an-array-of-0s-1s-and-2s", "Sort an Array of 0s, 1s and 2s (Dutch National Flag)", "https://www.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s4231/1", GFG_, "Easy"),
  p("gfg-triplet-sum-in-array", "Triplet Sum in Array (3Sum)", "https://www.geeksforgeeks.org/problems/triplet-sum-in-array-1587115621/1", GFG_, "Medium"),

  // --- Tree & BST GFG Variants ---
  p("gfg-height-of-binary-tree", "Height of Binary Tree", "https://www.geeksforgeeks.org/problems/height-of-binary-tree/1", GFG_, "Easy"),
  p("gfg-left-view-of-binary-tree", "Left View of Binary Tree", "https://www.geeksforgeeks.org/problems/left-view-of-binary-tree/1", GFG_, "Easy"),
  p("gfg-determine-if-two-trees-are-identical", "Determine if Two Trees are Identical", "https://www.geeksforgeeks.org/problems/determine-if-two-trees-are-identical/1", GFG_, "Easy"),
  p("gfg-diameter-of-a-binary-tree", "Diameter of Binary Tree", "https://www.geeksforgeeks.org/problems/diameter-of-binary-tree/1", GFG_, "Medium"),
  p("gfg-lowest-common-ancestor-in-a-binary-tree", "Lowest Common Ancestor in a Binary Tree", "https://www.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-binary-tree/1", GFG_, "Medium"),
  p("gfg-check-for-bst", "Check for BST", "https://www.geeksforgeeks.org/problems/check-for-bst/1", GFG_, "Medium"),
];

export const PROBLEMS: Problem[] = Array.from(
  new Map(
    [...ORIGINAL_PROBLEMS, ...REMAINING_PROBLEMS, ...DSA_PROBLEMS].map((pr) => [pr.id, pr])
  ).values()
);

export const PROBLEM_MAP: Record<string, Problem> = Object.fromEntries(
  PROBLEMS.map((pr) => [pr.id, pr]),
);

// Helper to reference an id and fail loudly if we mistyped.
function r(id: string): LevelProblem {
  if (!PROBLEM_MAP[id]) throw new Error(`Missing problem id: ${id}`);
  return { id };
}

// ---------------------------------------------------------------------------
// Topics
// ---------------------------------------------------------------------------

const ORIGINAL_TOPICS: Topic[] = [
  {
    slug: "graphs",
    name: "Graphs — BFS & DFS",
    short: "Traversal on grids and adjacency lists.",
    description:
      "Master graph traversal from basic BFS/DFS to advanced graph algorithms including cycle detection, topological sort, and shortest paths.",
    icon: "Share2",
    levels: [
      {
        number: 1,
        title: "Pure Traversal Basics",
        problems: [
          r("gfg-bfs"), r("gfg-dfs"), r("number-of-islands"), r("flood-fill"),
          r("find-if-path-exists-in-graph"), r("max-area-of-island"),
          r("island-perimeter"), r("number-of-enclaves"),
        ],
      },
      {
        number: 2,
        title: "Grid-Based BFS/DFS",
        problems: [
          r("rotting-oranges"), r("gfg-rotten-oranges"), r("01-matrix"),
          r("surrounded-regions"), r("number-of-enclaves"),
          r("gfg-distinct-islands"), r("word-search"), r("shortest-bridge"),
          r("as-far-from-land-as-possible"),
        ],
      },
      {
        number: 3,
        title: "Graph Construction + Connected Components",
        problems: [
          r("number-of-provinces"), r("number-of-connected-components-in-an-undirected-graph"),
          r("clone-graph"), r("employee-importance"), r("is-graph-bipartite"),
          r("gfg-bipartite"), r("keys-and-rooms"),
          r("all-paths-from-source-to-target"),
          r("reorder-routes-to-make-all-paths-lead-to-the-city-zero"),
        ],
      },
      {
        number: 4,
        title: "Cycle Detection, Topological Sort, Course Scheduling",
        problems: [
          r("gfg-cycle-undirected"), r("gfg-cycle-directed"),
          r("course-schedule"), r("course-schedule-ii"),
          r("gfg-topo-sort"), r("gfg-alien-dictionary"),
          r("find-eventual-safe-states"), r("minimum-height-trees"),
          r("redundant-connection"),
        ],
      },
      {
        number: 5,
        title: "Shortest Path / Weighted BFS Variants",
        problems: [
          r("shortest-path-in-binary-matrix"),
          r("shortest-path-in-a-grid-with-obstacles-elimination"),
          r("word-ladder"), r("word-ladder-ii"), r("snakes-and-ladders"),
          r("open-the-lock"), r("bus-routes"),
          r("gfg-shortest-path-undirected"),
          r("gfg-dijkstra"), r("network-delay-time"),
          r("gfg-bellman-ford"), r("gfg-floyd-warshall"),
          r("find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance"),
          r("cheapest-flights-within-k-stops"),
        ],
      },
      {
        number: 6,
        title: "Advanced / MST, DSU, Bridges & SCCs",
        problems: [
          r("gfg-minimum-spanning-tree"), r("min-cost-to-connect-all-points"),
          r("gfg-disjoint-set-union"),
          r("pacific-atlantic-water-flow"), r("making-a-large-island"),
          r("swim-in-rising-water"), r("accounts-merge"), r("sliding-puzzle"),
          r("critical-connections-in-a-network"), r("gfg-articulation-point"),
          r("gfg-kosaraju"), r("gfg-tarjan-sccs"),
        ],
      },
    ],
  },
  {
    slug: "prefix-sum",
    name: "Prefix Sum",
    short: "Cumulative sums, difference arrays, subarray tricks.",
    description:
      "From basic running sums to 2D prefix sums, difference arrays, and hashing tricks for subarray problems.",
    icon: "Sigma",
    levels: [
      { number: 1, title: "Basics", problems: [
        r("range-sum-query-immutable"), r("find-pivot-index"),
        r("running-sum-of-1d-array"), r("gfg-prefix-sum-array"),
        r("gfg-equilibrium-point"), r("gfg-missing-number-in-array"),
      ]},
      { number: 2, title: "Subarray Sum with Hashing", problems: [
        r("subarray-sum-equals-k"), r("continuous-subarray-sum"),
        r("subarray-sums-divisible-by-k"), r("contiguous-array"),
        r("maximum-size-subarray-sum-equals-k"),
        r("gfg-subarray-with-given-sum"), r("gfg-kadanes-algorithm"),
      ]},
      { number: 3, title: "2D Prefix Sum / Matrix", problems: [
        r("range-sum-query-2d-immutable"), r("matrix-block-sum"),
        r("number-of-submatrices-that-sum-to-target"),
      ]},
      { number: 4, title: "Prefix Sum + Difference Array", problems: [
        r("range-addition"), r("corporate-flight-bookings"),
        r("car-pooling"), r("product-of-array-except-self"),
      ]},
      { number: 5, title: "Harder / Mixed", problems: [
        r("maximum-sum-of-two-non-overlapping-subarrays"),
        r("minimum-operations-to-reduce-x-to-zero"),
        r("count-number-of-nice-subarrays"), r("path-sum-iii"),
      ]},
    ],
  },
  {
    slug: "sliding-window",
    name: "Sliding Window",
    short: "Fixed and variable window subarray/substring patterns.",
    description:
      "Fixed and variable window techniques for subarray and substring problems, from basics to deque-optimized variants.",
    icon: "MoveHorizontal",
    levels: [
      { number: 1, title: "Fixed Size Window", problems: [
        r("gfg-max-sum-subarray-k"), r("maximum-average-subarray-i"),
        r("gfg-first-negative-in-window"), r("gfg-count-occurrences-anagrams"),
      ]},
      { number: 2, title: "Variable Size Window", problems: [
        r("longest-substring-without-repeating-characters"),
        r("minimum-size-subarray-sum"), r("fruit-into-baskets"),
        r("longest-repeating-character-replacement"),
        r("max-consecutive-ones-iii"),
      ]},
      { number: 3, title: "Window + HashMap", problems: [
        r("permutation-in-string"), r("find-all-anagrams-in-a-string"),
        r("minimum-window-substring"),
        r("substring-with-concatenation-of-all-words"),
      ]},
      { number: 4, title: "Counting Subarrays", problems: [
        r("subarrays-with-k-different-integers"),
        r("count-number-of-nice-subarrays"),
        r("binary-subarrays-with-sum"),
        r("number-of-substrings-containing-all-three-characters"),
      ]},
      { number: 5, title: "Advanced / Deque", problems: [
        r("sliding-window-maximum"),
        r("shortest-subarray-with-sum-at-least-k"),
        r("longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit"),
        r("sliding-window-median"),
      ]},
    ],
  },
  {
    slug: "two-pointers",
    name: "Two Pointers",
    short: "Opposite-end and same-direction pointer patterns.",
    description:
      "From opposite-end pointers on sorted arrays to fast-slow pointers and triplet/quadruplet sum patterns.",
    icon: "ArrowLeftRight",
    levels: [
      { number: 1, title: "Basic Opposite-End Pointers", problems: [
        r("two-sum-ii-input-array-is-sorted"), r("valid-palindrome"),
        r("reverse-string"), r("move-zeroes"), r("squares-of-a-sorted-array"),
        r("gfg-leaders-in-an-array"),
      ]},
      { number: 2, title: "Same-Direction / Fast-Slow", problems: [
        r("remove-duplicates-from-sorted-array"), r("remove-element"),
        r("linked-list-cycle"), r("middle-of-the-linked-list"),
        r("sort-colors"), r("gfg-sort-an-array-of-0s-1s-and-2s"),
      ]},
      { number: 3, title: "Pair / Triplet Sum", problems: [
        r("3sum"), r("3sum-closest"), r("4sum"), r("3sum-smaller"),
        r("container-with-most-water"), r("gfg-triplet-sum-in-array"),
      ]},
      { number: 4, title: "Two Arrays / Strings", problems: [
        r("merge-sorted-array"), r("intersection-of-two-arrays-ii"),
        r("is-subsequence"), r("backspace-string-compare"),
      ]},
      { number: 5, title: "Harder / Sorting or Greedy", problems: [
        r("trapping-rain-water"), r("gfg-trapping-rain-water"), r("boats-to-save-people"),
        r("minimum-number-of-arrows-to-burst-balloons"),
        r("partition-labels"), r("sort-array-by-parity"),
      ]},
    ],
  },
  {
    slug: "sorting",
    name: "Sorting",
    short: "Classical algorithms, comparators, quickselect, counting.",
    description:
      "From implementing classic sorting algorithms to comparator tricks, quickselect, and merge-sort-based counting problems.",
    icon: "ArrowDownAZ",
    levels: [
      { number: 0, title: "Implement Algorithms Yourself", problems: [
        r("gfg-bubble-sort"), r("gfg-selection-sort"), r("gfg-insertion-sort"),
        r("gfg-merge-sort"), r("gfg-quick-sort"), r("gfg-heap-sort"),
        r("gfg-counting-sort"),
      ]},
      { number: 1, title: "Direct Sorting Applications", problems: [
        r("sort-colors"), r("gfg-sort-an-array-of-0s-1s-and-2s"), r("merge-sorted-array"), r("sort-an-array"),
        r("relative-sort-array"), r("height-checker"),
        r("sort-array-by-parity"),
      ]},
      { number: 2, title: "Custom Comparators", problems: [
        r("largest-number"), r("sort-the-matrix-diagonally"),
        r("custom-sort-string"), r("sort-array-by-increasing-frequency"),
        r("meeting-rooms"), r("meeting-rooms-ii"),
      ]},
      { number: 3, title: "Sort + Two Pointers / Greedy", problems: [
        r("3sum"), r("3sum-closest"), r("merge-intervals"),
        r("insert-interval"), r("non-overlapping-intervals"),
        r("minimum-number-of-arrows-to-burst-balloons"),
        r("boats-to-save-people"), r("assign-cookies"),
      ]},
      { number: 4, title: "Counting / Bucket / Frequency", problems: [
        r("top-k-frequent-elements"), r("sort-characters-by-frequency"),
        r("maximum-gap"), r("h-index"), r("wiggle-sort"), r("wiggle-sort-ii"),
      ]},
      { number: 5, title: "QuickSelect / Kth Element", problems: [
        r("kth-largest-element-in-an-array"),
        r("k-closest-points-to-origin"), r("top-k-frequent-words"),
        r("find-k-pairs-with-smallest-sums"),
        r("kth-smallest-element-in-a-sorted-matrix"),
      ]},
      { number: 6, title: "Merge-Sort-Based Counting", problems: [
        r("gfg-count-inversions"), r("reverse-pairs"),
        r("count-of-smaller-numbers-after-self"),
        r("sort-items-by-groups-respecting-dependencies"),
      ]},
      { number: 7, title: "Advanced", problems: [
        r("merge-k-sorted-lists"), r("sort-list"), r("task-scheduler"),
        r("course-schedule-iii"), r("minimum-cost-to-hire-k-workers"),
        r("the-skyline-problem"),
      ]},
    ],
  },
  {
    slug: "trees",
    name: "Trees",
    short: "Traversals, BST, construction, DP on trees.",
    description:
      "Binary tree traversals, structural properties, views, BST operations, construction, and DP-on-tree problems.",
    icon: "GitFork",
    levels: [
      { number: 1, title: "Basic Traversals", problems: [
        r("binary-tree-inorder-traversal"), r("binary-tree-preorder-traversal"),
        r("binary-tree-postorder-traversal"),
        r("binary-tree-level-order-traversal"),
        r("maximum-depth-of-binary-tree"), r("gfg-height-of-binary-tree"), r("symmetric-tree"),
      ]},
      { number: 2, title: "Structural Properties", problems: [
        r("balanced-binary-tree"), r("diameter-of-binary-tree"), r("gfg-diameter-of-a-binary-tree"),
        r("invert-binary-tree"), r("same-tree"), r("gfg-determine-if-two-trees-are-identical"), r("subtree-of-another-tree"),
        r("path-sum"), r("path-sum-ii"),
      ]},
      { number: 3, title: "Views, Boundary, Zigzag", problems: [
        r("binary-tree-zigzag-level-order-traversal"),
        r("binary-tree-right-side-view"), r("gfg-left-view-of-binary-tree"), r("gfg-top-view"),
        r("gfg-bottom-view"), r("gfg-boundary-traversal"),
        r("vertical-order-traversal-of-a-binary-tree"),
      ]},
      { number: 4, title: "BST-Specific", problems: [
        r("validate-binary-search-tree"), r("gfg-check-for-bst"), r("kth-smallest-element-in-a-bst"),
        r("insert-into-a-binary-search-tree"), r("delete-node-in-a-bst"),
        r("lowest-common-ancestor-of-a-binary-search-tree"),
        r("convert-sorted-array-to-binary-search-tree"),
      ]},
      { number: 5, title: "Construction & Serialization", problems: [
        r("construct-binary-tree-from-preorder-and-inorder-traversal"),
        r("construct-binary-tree-from-inorder-and-postorder-traversal"),
        r("serialize-and-deserialize-binary-tree"),
        r("flatten-binary-tree-to-linked-list"),
      ]},
      { number: 6, title: "Hard / DP-on-Tree / LCA-heavy", problems: [
        r("lowest-common-ancestor-of-a-binary-tree"), r("gfg-lowest-common-ancestor-in-a-binary-tree"),
        r("binary-tree-maximum-path-sum"), r("house-robber-iii"),
        r("distribute-coins-in-binary-tree"),
        r("count-nodes-equal-to-average-of-subtree"),
        r("all-nodes-distance-k-in-binary-tree"),
      ]},
    ],
  },
  {
    slug: "linked-lists",
    name: "Linked Lists",
    short: "Traversal, reversal, cycles, design.",
    description:
      "From basic operations to fast-slow pointers, in-place reversals, and cache designs backed by doubly linked lists.",
    icon: "Link2",
    levels: [
      { number: 1, title: "Basic Operations", problems: [
        r("reverse-linked-list"), r("gfg-reverse-a-linked-list"), r("middle-of-the-linked-list"),
        r("gfg-finding-middle-element-in-a-linked-list"),
        r("merge-two-sorted-lists"), r("remove-duplicates-from-sorted-list"),
        r("delete-node-in-a-linked-list"),
      ]},
      { number: 2, title: "Fast-Slow Pointers / Cycle Detection", problems: [
        r("linked-list-cycle"), r("gfg-detect-loop-in-linked-list"), r("linked-list-cycle-ii"),
        r("palindrome-linked-list"), r("remove-nth-node-from-end-of-list"),
        r("intersection-of-two-linked-lists"), r("gfg-intersection-point-in-y-shapped-linked-lists"),
        r("gfg-remove-loop-in-linked-list"),
      ]},
      { number: 3, title: "In-Place Reversal Variants", problems: [
        r("reverse-linked-list-ii"), r("swap-nodes-in-pairs"),
        r("reverse-nodes-in-k-group"), r("rotate-list"),
        r("odd-even-linked-list"),
      ]},
      { number: 4, title: "Merge / Sort / Reorder", problems: [
        r("sort-list"), r("merge-k-sorted-lists"), r("gfg-merge-two-sorted-linked-lists"),
        r("reorder-list"), r("partition-list"), r("add-two-numbers"),
        r("gfg-add-two-numbers-represented-by-linked-lists"), r("add-two-numbers-ii"),
      ]},
      { number: 5, title: "Advanced / Design", problems: [
        r("copy-list-with-random-pointer"), r("lru-cache"), r("lfu-cache"),
        r("design-linked-list"), r("flatten-a-multilevel-doubly-linked-list"),
      ]},
    ],
  },
  {
    slug: "dynamic-programming",
    name: "Dynamic Programming",
    short: "The 8 shapes: 1D, knapsack, LIS, LCS, palindrome, DP-on-tree, bitmask, digit.",
    description:
      "Organized by recurrence shape — from 1D DP through knapsack, LIS, LCS, palindrome, interval, stock, tree, bitmask, and digit DP.",
    icon: "Layers",
    levels: [
      { number: 1, title: "1D DP (Fibonacci-style)", problems: [
        r("climbing-stairs"), r("house-robber"), r("house-robber-ii"),
        r("min-cost-climbing-stairs"), r("maximum-subarray"),
        r("decode-ways"), r("fibonacci-number"),
      ]},
      { number: 2, title: "0/1 Knapsack Family", problems: [
        r("gfg-01-knapsack"), r("partition-equal-subset-sum"),
        r("gfg-subset-sum"), r("target-sum"), r("last-stone-weight-ii"),
        r("ones-and-zeroes"),
      ]},
      { number: 3, title: "Unbounded Knapsack Family", problems: [
        r("coin-change"), r("coin-change-ii"), r("gfg-rod-cutting"),
        r("perfect-squares"), r("combination-sum-iv"),
        r("minimum-cost-for-tickets"),
      ]},
      { number: 4, title: "LIS Family", problems: [
        r("longest-increasing-subsequence"), r("russian-doll-envelopes"),
        r("maximum-length-of-pair-chain"),
        r("number-of-longest-increasing-subsequence"),
        r("gfg-longest-bitonic"),
      ]},
      { number: 5, title: "2D Grid DP", problems: [
        r("unique-paths"), r("unique-paths-ii"), r("minimum-path-sum"),
        r("triangle"), r("maximal-square"), r("dungeon-game"),
        r("cherry-pickup"),
      ]},
      { number: 6, title: "Two-String DP (LCS Family)", problems: [
        r("longest-common-subsequence"), r("gfg-longest-common-substring"),
        r("edit-distance"), r("delete-operation-for-two-strings"),
        r("distinct-subsequences"), r("shortest-common-supersequence"),
        r("interleaving-string"),
      ]},
      { number: 7, title: "Single-String DP (Palindrome)", problems: [
        r("longest-palindromic-substring"), r("longest-palindromic-subsequence"),
        r("palindromic-substrings"), r("palindrome-partitioning-ii"),
        r("minimum-insertion-steps-to-make-a-string-palindrome"),
      ]},
      { number: 8, title: "Interval / Partition DP", problems: [
        r("gfg-matrix-chain"), r("burst-balloons"),
        r("minimum-cost-to-merge-stones"), r("strange-printer"),
        r("predict-the-winner"),
      ]},
      { number: 9, title: "Stock Buy/Sell DP", problems: [
        r("best-time-to-buy-and-sell-stock"),
        r("best-time-to-buy-and-sell-stock-ii"),
        r("best-time-to-buy-and-sell-stock-iii"),
        r("best-time-to-buy-and-sell-stock-iv"),
        r("best-time-to-buy-and-sell-stock-with-cooldown"),
        r("best-time-to-buy-and-sell-stock-with-transaction-fee"),
      ]},
      { number: 10, title: "Tree DP", problems: [
        r("house-robber-iii"), r("diameter-of-binary-tree"),
        r("binary-tree-maximum-path-sum"),
        r("longest-path-with-different-adjacent-characters"),
        r("count-subtrees-with-max-distance-between-cities"),
      ]},
      { number: 11, title: "Bitmask DP", problems: [
        r("partition-to-k-equal-sum-subsets"),
        r("shortest-path-visiting-all-nodes"),
        r("minimum-cost-to-connect-two-groups-of-points"),
        r("gfg-tsp"), r("maximum-students-taking-exam"),
      ]},
      { number: 12, title: "Digit DP", problems: [
        r("numbers-at-most-n-given-digit-set"), r("count-of-integers"),
        r("non-negative-integers-without-consecutive-ones"),
      ]},
      { number: 13, title: "DP on Graph", problems: [
        r("longest-increasing-path-in-a-matrix"),
        r("cheapest-flights-within-k-stops"), r("frog-jump"),
        r("out-of-boundary-paths"),
        r("number-of-ways-to-arrive-at-destination"),
      ]},
    ],
  },
];

// A second graphs topic (node-based) grouped as a Part of Graphs would be
// ideal, but the spec lists Graphs as one nav item. We fold the node-based
// track in as additional Parts of "Graphs" via extra Levels 7+ — instead we
// expose it as a separate top nav "Graphs (Node-Based)" so both sheets are
// visible per the source markdown's guidance.
ORIGINAL_TOPICS.splice(1, 0, {
  slug: "graphs-node-based",
  name: "Graphs — Node-Based",
  short: "Adjacency-list graphs, DSU, Dijkstra, SCC.",
  description:
    "Node/adjacency-list based graphs — object references, Disjoint Set Union, weighted shortest paths, and structural graph problems.",
  icon: "Network",
  levels: [
    { number: 1, title: "Basic Node Traversal & Cloning", problems: [
      r("clone-graph"), r("find-if-path-exists-in-graph"),
      r("all-paths-from-source-to-target"), r("find-the-town-judge"),
    ]},
    { number: 2, title: "Union-Find / DSU", problems: [
      r("number-of-provinces"), r("graph-valid-tree"),
      r("redundant-connection"), r("accounts-merge"),
      r("number-of-operations-to-make-network-connected"),
      r("satisfiability-of-equality-equations"),
    ]},
    { number: 3, title: "Directed Graphs, Cycles & Topo Sort", problems: [
      r("course-schedule"), r("course-schedule-ii"),
      r("find-eventual-safe-states"), r("minimum-height-trees"),
      r("gfg-alien-dictionary"),
    ]},
    { number: 4, title: "Weighted Node Graphs / Shortest Path", problems: [
      r("network-delay-time"), r("cheapest-flights-within-k-stops"),
      r("path-with-minimum-effort"), r("evaluate-division"),
      r("gfg-negative-weight-cycle"),
    ]},
    { number: 5, title: "SCC, Bridges, Articulation Points", problems: [
      r("critical-connections-in-a-network"), r("gfg-kosaraju"),
      r("gfg-articulation-point"), r("number-of-islands-ii"),
    ]},
  ],
});

function deduplicateTopics(topicsList: Topic[]): Topic[] {
  const mergedMap = new Map<string, Topic>();

  for (const topic of topicsList) {
    if (!mergedMap.has(topic.slug)) {
      const levelsCopy = topic.levels
        ? topic.levels.map((lvl) => ({ ...lvl, problems: [...lvl.problems] }))
        : undefined;
      const partsCopy = topic.parts
        ? topic.parts.map((part) => ({
            ...part,
            levels: part.levels.map((lvl) => ({ ...lvl, problems: [...lvl.problems] })),
          }))
        : undefined;
      mergedMap.set(topic.slug, { ...topic, levels: levelsCopy, parts: partsCopy });
    } else {
      const existing = mergedMap.get(topic.slug)!;

      if (topic.levels) {
        if (!existing.levels) existing.levels = [];
        for (const newLvl of topic.levels) {
          let targetLvl = existing.levels.find((l) => l.number === newLvl.number);
          if (!targetLvl) {
            targetLvl = { number: newLvl.number, title: newLvl.title, problems: [] };
            existing.levels.push(targetLvl);
          }
          for (const prob of newLvl.problems) {
            if (!targetLvl.problems.some((p) => p.id === prob.id)) {
              targetLvl.problems.push(prob);
            }
          }
        }
        existing.levels.sort((a, b) => a.number - b.number);
      }

      if (topic.parts) {
        if (!existing.parts) existing.parts = [];
        for (const newPart of topic.parts) {
          let targetPart = existing.parts.find((p) => p.title === newPart.title);
          if (!targetPart) {
            targetPart = { title: newPart.title, levels: [] };
            existing.parts.push(targetPart);
          }
          for (const newLvl of newPart.levels) {
            let targetLvl = targetPart.levels.find((l) => l.number === newLvl.number);
            if (!targetLvl) {
              targetLvl = { number: newLvl.number, title: newLvl.title, problems: [] };
              targetPart.levels.push(targetLvl);
            }
            for (const prob of newLvl.problems) {
              if (!targetLvl.problems.some((p) => p.id === prob.id)) {
                targetLvl.problems.push(prob);
              }
            }
          }
        }
      }
    }
  }

  return Array.from(mergedMap.values());
}

// Merge all topic sources, then sort by the canonical roadmap order (scratch → expert).
// Topics not found in the roadmap are appended at the end in their original order.
const ALL_RAW_TOPICS = deduplicateTopics([...ORIGINAL_TOPICS, ...REMAINING_TOPICS, ...DSA_TOPICS]);
const roadmapOrder = Object.fromEntries(ROADMAP.map((e) => [e.slug, e.order]));
export const TOPICS: Topic[] = [...ALL_RAW_TOPICS].sort((a, b) => {
  const oa = roadmapOrder[a.slug] ?? 999;
  const ob = roadmapOrder[b.slug] ?? 999;
  return oa - ob;
});

export const TOPIC_MAP: Record<string, Topic> = Object.fromEntries(
  TOPICS.map((t) => [t.slug, t]),
);

// Flat list: for each placement of a problem within a topic/level, provide
// the placement metadata. Duplicates across tracks are intentional.
export interface Placement {
  problemId: string;
  topicSlug: string;
  topicName: string;
  levelNumber: number;
  levelTitle: string;
  partTitle?: string;
}

export const ALL_PLACEMENTS: Placement[] = TOPICS.flatMap((t) => {
  const rows: Placement[] = [];
  const levels = t.levels ?? [];
  for (const lvl of levels) {
    for (const lp of lvl.problems) {
      rows.push({
        problemId: lp.id,
        topicSlug: t.slug,
        topicName: t.name,
        levelNumber: lvl.number,
        levelTitle: lvl.title,
      });
    }
  }
  if (t.parts) {
    for (const part of t.parts) {
      for (const lvl of part.levels) {
        for (const lp of lvl.problems) {
          rows.push({
            problemId: lp.id,
            topicSlug: t.slug,
            topicName: t.name,
            levelNumber: lvl.number,
            levelTitle: lvl.title,
            partTitle: part.title,
          });
        }
      }
    }
  }
  return rows;
});

// Unique problem count across all tracks (duplicates counted once).
export const UNIQUE_PROBLEM_IDS: string[] = Array.from(
  new Set(ALL_PLACEMENTS.map((p) => p.problemId)),
);

export function getTopic(slug: string): Topic | undefined {
  return TOPIC_MAP[slug];
}

export function getProblem(id: string): Problem | undefined {
  return PROBLEM_MAP[id];
}
