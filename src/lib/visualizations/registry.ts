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
