export interface GraphInput {
  start: string;
  edges: Array<[string, string]>;
}

export interface GraphStep {
  visited: string[];
  frontier: string[];
  order: string[];
  current: string | null;
  activeEdge: [string, string] | null;
  frontierLabel: "Queue" | "Stack";
  message: string;
}

export interface SortingInput {
  values: number[];
}

export interface SortingStep {
  array: number[];
  comparing: [number, number] | null;
  swapped: boolean;
  sortedIndices: number[];
  message: string;
}

export type ParseResult<T> = { ok: true; input: T } | { ok: false; error: string };

export interface ComplexityInfo {
  timeBest: string;
  timeAverage: string;
  timeWorst: string;
  space: string;
  notes?: string;
}

export interface LearningResource {
  title: string;
  url: string;
  source: string;
  description?: string;
}

export interface ExampleWalkthrough {
  title: string;
  description: string;
  steps: string[];
}

export interface VisualizationTheory {
  overview: string;
  principles: string[];
  workingProcess: string[];
  pseudocode: string;
  exampleWalkthrough: ExampleWalkthrough;
  complexity: ComplexityInfo;
  resources: LearningResource[];
}

interface VisualizationBase {
  id: string;
  topicSlug: string;
  name: string;
  algorithm: string;
  description: string;
  inputHint: string;
  defaultValueText: string;
  theory: VisualizationTheory;
}

export type GraphVisualizationDefinition = VisualizationBase & {
  kind: "graph";
  defaultInput: GraphInput;
  parseInput: (raw: string) => ParseResult<GraphInput>;
  generateSteps: (input: GraphInput) => GraphStep[];
};

export type SortingVisualizationDefinition = VisualizationBase & {
  kind: "sorting";
  defaultInput: SortingInput;
  parseInput: (raw: string) => ParseResult<SortingInput>;
  generateSteps: (input: SortingInput) => SortingStep[];
};

export type VisualizationDefinition = GraphVisualizationDefinition | SortingVisualizationDefinition;
