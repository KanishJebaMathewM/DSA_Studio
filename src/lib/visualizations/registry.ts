import {
  DEFAULT_GRAPH_INPUT,
  formatGraphInput,
  generateBfsSteps,
  generateDfsSteps,
  parseGraphInput,
} from "./graph.ts";
import {
  DEFAULT_SORTING_INPUT,
  formatSortingInput,
  generateBubbleSortSteps,
  generateSelectionSortSteps,
  parseSortingInput,
} from "./sorting.ts";
import type { VisualizationDefinition } from "./types";

export const VISUALIZATIONS: VisualizationDefinition[] = [
  {
    id: "bfs",
    topicSlug: "graphs",
    name: "Breadth-First Search",
    algorithm: "BFS",
    kind: "graph",
    description:
      "Explore a graph level by level using a queue, tracking visited nodes and traversal order.",
    inputHint: "Edges in the form A-B, separated by commas. The first node is the start.",
    defaultValueText: formatGraphInput(DEFAULT_GRAPH_INPUT),
    defaultInput: DEFAULT_GRAPH_INPUT,
    parseInput: parseGraphInput,
    generateSteps: generateBfsSteps,
    theory: {
      overview:
        "Breadth-First Search (BFS) is a fundamental graph traversal algorithm that explores all vertices at the current depth level before moving on to vertices at the next depth level. It is systematically applied to find shortest paths on unweighted graphs, detect connected components, and inspect graph distance levels.",
      principles: [
        "Uses a First-In, First-Out (FIFO) queue to ensure nodes are discovered and processed in order of their edge distance from the source.",
        "Maintains a visited set or lookup table to avoid processing nodes multiple times and prevent infinite loops in cyclic graphs.",
        "Guarantees the first time an unweighted node is visited, it has been reached via the shortest path from the start node.",
      ],
      workingProcess: [
        "Initialize an empty queue and enqueue the designated starting node. Mark the starting node as visited.",
        "While the queue is not empty, dequeue the node at the front (the active node being explored).",
        "Record the active node into the traversal order and examine its adjacent neighbors.",
        "For each unvisited neighbor, mark it as visited and append it to the back of the queue.",
        "Repeat until the queue is empty. Every vertex reachable in the graph component will have been traversed.",
      ],
      pseudocode: `function BFS(graph, startNode):
    queue = new Queue()
    visited = new Set()

    queue.enqueue(startNode)
    visited.add(startNode)

    while not queue.isEmpty():
        current = queue.dequeue()
        process(current)

        for neighbor in graph.neighbors(current):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)`,
      exampleWalkthrough: {
        title: "Graph with 4 nodes: A-B, A-C, B-D",
        description: "Starting traversal from root node A",
        steps: [
          "Queue starts with [A]. Visited set contains {A}.",
          "Dequeue A. Traversal order: [A]. Inspect neighbors B and C. Mark visited and enqueue both. Queue: [B, C].",
          "Dequeue B. Traversal order: [A, B]. Inspect neighbor D. Mark visited and enqueue D. Queue: [C, D].",
          "Dequeue C. Traversal order: [A, B, C]. All neighbors of C are already visited. Queue: [D].",
          "Dequeue D. Traversal order: [A, B, C, D]. Queue is now empty. Traversal complete.",
        ],
      },
      complexity: {
        timeBest: "O(V + E)",
        timeAverage: "O(V + E)",
        timeWorst: "O(V + E)",
        space: "O(V)",
        notes:
          "V is the number of vertices and E is the number of edges. Space is bounded by the maximum queue size (frontier breadth) plus visited set.",
      },
      resources: [
        {
          title: "Breadth-First Search or BFS for a Graph",
          url: "https://www.geeksforgeeks.org/dsa/breadth-first-search-or-bfs-for-a-graph/",
          source: "GeeksforGeeks",
          description:
            "Complete guide covering BFS graph representations, standard implementation, and complexity analysis.",
        },
        {
          title: "Breadth First Search (BFS) Visualizer",
          url: "https://visualgo.net/en/dfsbfs",
          source: "VisuAlgo",
          description:
            "Interactive animation demonstrating queue operations and frontier expansion on graphs.",
        },
      ],
    },
  },
  {
    id: "dfs",
    topicSlug: "graphs",
    name: "Depth-First Search",
    algorithm: "DFS",
    kind: "graph",
    description:
      "Explore as deep as possible before backtracking, using an explicit stack to track the path.",
    inputHint: "Edges in the form A-B, separated by commas. The first node is the start.",
    defaultValueText: formatGraphInput(DEFAULT_GRAPH_INPUT),
    defaultInput: DEFAULT_GRAPH_INPUT,
    parseInput: parseGraphInput,
    generateSteps: generateDfsSteps,
    theory: {
      overview:
        "Depth-First Search (DFS) is a core graph traversal technique that progresses along each branch as deeply as possible before backtracking. It is widely utilized for cycle detection, topological sorting, connected component discovery, and pathfinding in tree or graph models.",
      principles: [
        "Employs a Last-In, First-Out (LIFO) stack mechanism (either iteratively using an explicit stack or recursively via the call stack).",
        "Explores down a single branch until a dead end (a node with no unvisited neighbors) is reached, then backtracks to previous decision points.",
        "Records visited vertices to prevent infinite cycles in cyclic graphs and redundant evaluations.",
      ],
      workingProcess: [
        "Initialize a stack with the designated start node and push it. Create an empty visited tracking set.",
        "While the stack is not empty, pop the top node from the stack.",
        "If the node has already been visited, skip it. Otherwise, mark it as visited and record it into the traversal sequence.",
        "Inspect all unvisited adjacent neighbors of the current node and push them onto the stack.",
        "Repeat until the stack is empty. Every node reachable through depth-first paths is processed.",
      ],
      pseudocode: `function DFS(graph, startNode):
    stack = new Stack()
    visited = new Set()

    stack.push(startNode)

    while not stack.isEmpty():
        current = stack.pop()
        if current in visited:
            continue

        visited.add(current)
        process(current)

        for neighbor in graph.neighbors(current):
            if neighbor not in visited:
                stack.push(neighbor)`,
      exampleWalkthrough: {
        title: "Graph with 4 nodes: A-B, A-C, B-D",
        description: "Starting traversal from root node A",
        steps: [
          "Stack starts with [A]. Visited set is empty.",
          "Pop A. Mark A visited. Traversal order: [A]. Push unvisited neighbors C and B onto stack. Stack: [C, B].",
          "Pop B. Mark B visited. Traversal order: [A, B]. Push unvisited neighbor D onto stack. Stack: [C, D].",
          "Pop D. Mark D visited. Traversal order: [A, B, D]. D has no unvisited neighbors. Stack: [C].",
          "Pop C. Mark C visited. Traversal order: [A, B, D, C]. Stack is empty. Traversal complete.",
        ],
      },
      complexity: {
        timeBest: "O(V + E)",
        timeAverage: "O(V + E)",
        timeWorst: "O(V + E)",
        space: "O(V)",
        notes:
          "V is the number of vertices and E is the number of edges. Space is proportional to maximum path depth in the graph.",
      },
      resources: [
        {
          title: "Depth-First Search or DFS for a Graph",
          url: "https://www.geeksforgeeks.org/dsa/depth-first-search-or-dfs-for-a-graph/",
          source: "GeeksforGeeks",
          description:
            "Tutorial covering recursive and iterative DFS implementations, stack traces, and applications.",
        },
        {
          title: "Depth First Search (DFS) Traversal Visualizer",
          url: "https://visualgo.net/en/dfsbfs",
          source: "VisuAlgo",
          description: "Visual animation showing branch exploration and backtracking dynamics.",
        },
      ],
    },
  },
  {
    id: "bubble-sort",
    topicSlug: "sorting",
    name: "Bubble Sort",
    algorithm: "Bubble Sort",
    kind: "sorting",
    description: "Repeatedly compare adjacent values and swap them until the array is ordered.",
    inputHint: "Whole numbers between -999 and 999, separated by commas (2–20 values).",
    defaultValueText: formatSortingInput(DEFAULT_SORTING_INPUT),
    defaultInput: DEFAULT_SORTING_INPUT,
    parseInput: parseSortingInput,
    generateSteps: generateBubbleSortSteps,
    theory: {
      overview:
        "Bubble Sort is an elementary comparison-based sorting algorithm. It sequentially scans through an array, compares adjacent pairs of elements, and swaps them if they are inverted. Through successive passes, larger elements bubble up to their correct final positions at the end of the array.",
      principles: [
        "Iterates through adjacent pairs (indices j and j + 1), performing in-place conditional swaps.",
        "After each complete outer pass i, the i-th largest element is guaranteed to be settled at its final destination index.",
        "Supports early termination: if an entire pass makes zero swaps, the array is already sorted and sorting halts early.",
      ],
      workingProcess: [
        "Start outer pass i from 0 up to n - 1.",
        "Initialize a swapped flag to false at the beginning of each pass.",
        "Iterate inner index j from 0 up to n - i - 2.",
        "Compare array[j] with array[j + 1]. If array[j] > array[j + 1], swap the two values and set swapped = true.",
        "At the end of the pass, if swapped is false, terminate early. Otherwise continue until all passes complete.",
      ],
      pseudocode: `function BubbleSort(array):
    n = array.length
    for i from 0 to n - 1:
        swapped = false
        for j from 0 to n - i - 2:
            if array[j] > array[j + 1]:
                swap(array[j], array[j + 1])
                swapped = true
        if not swapped:
            break
    return array`,
      exampleWalkthrough: {
        title: "Array: [5, 1, 4, 2, 8]",
        description: "Tracking element comparisons and adjacent swaps",
        steps: [
          "Pass 1: Compare (5, 1) -> Swap to [1, 5, 4, 2, 8]. Compare (5, 4) -> Swap to [1, 4, 5, 2, 8]. Compare (5, 2) -> Swap to [1, 4, 2, 5, 8]. Compare (5, 8) -> OK. 8 is locked in final position.",
          "Pass 2: Compare (1, 4) -> OK. Compare (4, 2) -> Swap to [1, 2, 4, 5, 8]. Compare (4, 5) -> OK. 5 is locked in place.",
          "Pass 3: Compare (1, 2) -> OK. Compare (2, 4) -> OK. No swaps occurred during this pass. Early termination triggered.",
          "Result: Array is ordered [1, 2, 4, 5, 8].",
        ],
      },
      complexity: {
        timeBest: "O(n)",
        timeAverage: "O(n²)",
        timeWorst: "O(n²)",
        space: "O(1)",
        notes:
          "Best case occurs when the array is already sorted and the swap flag detects no inversions. Auxiliary space is O(1) (in-place).",
      },
      resources: [
        {
          title: "Bubble Sort Algorithm",
          url: "https://www.geeksforgeeks.org/dsa/bubble-sort-algorithm/",
          source: "GeeksforGeeks",
          description:
            "In-depth guide with code examples, time complexity breakdowns, and optimizations.",
        },
        {
          title: "Comparison Sorting Visualizer — Bubble Sort",
          url: "https://visualgo.net/en/sorting",
          source: "VisuAlgo",
          description:
            "Interactive visual animation illustrating passes, comparisons, and element swaps.",
        },
      ],
    },
  },
  {
    id: "selection-sort",
    topicSlug: "sorting",
    name: "Selection Sort",
    algorithm: "Selection Sort",
    kind: "sorting",
    description: "Select the smallest remaining value and place it at the next sorted position.",
    inputHint: "Whole numbers between -999 and 999, separated by commas (2–20 values).",
    defaultValueText: formatSortingInput(DEFAULT_SORTING_INPUT),
    defaultInput: DEFAULT_SORTING_INPUT,
    parseInput: parseSortingInput,
    generateSteps: generateSelectionSortSteps,
    theory: {
      overview:
        "Selection Sort is a straightforward in-place comparison sort that divides the collection into two sections: a sorted portion on the left and an unsorted portion on the right. In each iteration, it searches the unsorted portion for the minimum element and exchanges it with the first unsorted position.",
      principles: [
        "Maintains an invariant where the prefix array[0..i-1] is always sorted and contains the smallest elements in the array.",
        "Performs at most n - 1 element swaps, which minimizes the total number of memory write operations.",
        "Always executes the same total comparisons regardless of initial input ordering.",
      ],
      workingProcess: [
        "Iterate index i from 0 up to n - 2 (the current boundary between sorted and unsorted segments).",
        "Assume the element at i is the minimum by setting minIndex = i.",
        "Scan index j from i + 1 up to n - 1. Whenever array[j] < array[minIndex], update minIndex = j.",
        "Once the minimum element in the remaining subarray is found, if minIndex != i, swap array[i] with array[minIndex].",
        "Increment i and repeat until the entire array is sorted.",
      ],
      pseudocode: `function SelectionSort(array):
    n = array.length
    for i from 0 to n - 2:
        minIndex = i
        for j from i + 1 to n - 1:
            if array[j] < array[minIndex]:
                minIndex = j
        if minIndex != i:
            swap(array[i], array[minIndex])
    return array`,
      exampleWalkthrough: {
        title: "Array: [29, 10, 14, 37, 13]",
        description: "Locating minimums and swapping into prefix positions",
        steps: [
          "Iteration 0 (i=0): Minimum in [29, 10, 14, 37, 13] is 10 at index 1. Swap with index 0: [10, 29, 14, 37, 13].",
          "Iteration 1 (i=1): Minimum in [29, 14, 37, 13] is 13 at index 4. Swap with index 1: [10, 13, 14, 37, 29].",
          "Iteration 2 (i=2): Minimum in [14, 37, 29] is 14 at index 2. Already at target index, no swap needed: [10, 13, 14, 37, 29].",
          "Iteration 3 (i=3): Minimum in [37, 29] is 29 at index 4. Swap with index 3: [10, 13, 14, 29, 37].",
          "All positions sorted: [10, 13, 14, 29, 37].",
        ],
      },
      complexity: {
        timeBest: "O(n²)",
        timeAverage: "O(n²)",
        timeWorst: "O(n²)",
        space: "O(1)",
        notes:
          "Always makes (n-1) + (n-2) + ... + 1 = n(n-1)/2 comparisons. Useful when memory writes are significantly more costly than reads.",
      },
      resources: [
        {
          title: "Selection Sort Algorithm",
          url: "https://www.geeksforgeeks.org/dsa/selection-sort-algorithm/",
          source: "GeeksforGeeks",
          description:
            "Complete tutorial explaining selection sort mechanics, stability, and complexity analysis.",
        },
        {
          title: "Comparison Sorting Visualizer — Selection Sort",
          url: "https://visualgo.net/en/sorting",
          source: "VisuAlgo",
          description: "Visual animation tracking the min pointer and prefix sorted partition.",
        },
      ],
    },
  },
];

const VISUALIZATION_MAP = new Map(VISUALIZATIONS.map((v) => [v.id, v]));

export function getVisualization(id: string): VisualizationDefinition | undefined {
  return VISUALIZATION_MAP.get(id);
}

export function getVisualizationsForTopic(topicSlug: string): VisualizationDefinition[] {
  return VISUALIZATIONS.filter((v) => v.topicSlug === topicSlug);
}

export function isVisualizationSupported(topicSlug: string, algorithm: string): boolean {
  const target = algorithm.toLowerCase();
  return VISUALIZATIONS.some(
    (v) => v.topicSlug === topicSlug && v.algorithm.toLowerCase() === target,
  );
}
