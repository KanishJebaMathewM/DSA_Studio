import type { GraphInput, GraphStep, ParseResult } from "./types";

export const DEFAULT_GRAPH_INPUT: GraphInput = {
  start: "A",
  edges: [
    ["A", "B"],
    ["A", "C"],
    ["B", "D"],
    ["B", "E"],
    ["C", "F"],
    ["E", "G"],
  ],
};

export function graphNodes(input: GraphInput): string[] {
  const nodes: string[] = [];
  const seen = new Set<string>();
  const add = (node: string) => {
    if (!seen.has(node)) {
      seen.add(node);
      nodes.push(node);
    }
  };
  add(input.start);
  for (const [a, b] of input.edges) {
    add(a);
    add(b);
  }
  return nodes;
}

export function buildAdjacency(input: GraphInput): Map<string, string[]> {
  const adjacency = new Map<string, string[]>();
  for (const node of graphNodes(input)) adjacency.set(node, []);
  for (const [a, b] of input.edges) {
    adjacency.get(a)?.push(b);
    adjacency.get(b)?.push(a);
  }
  return adjacency;
}

export function parseGraphInput(raw: string): ParseResult<GraphInput> {
  const parts = raw
    .split(/[,\n;]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return { ok: false, error: "Enter at least one edge, for example A-B." };
  }

  const edges: Array<[string, string]> = [];
  for (const part of parts) {
    const match = /^([A-Za-z0-9_]+)\s*-\s*([A-Za-z0-9_]+)$/.exec(part);
    if (!match || match[1] === match[2]) {
      return {
        ok: false,
        error: `Invalid edge "${part}". Use the form A-B with distinct node labels.`,
      };
    }
    edges.push([match[1], match[2]]);
  }

  const nodes = graphNodes({ start: edges[0][0], edges });
  if (nodes.length < 2) {
    return { ok: false, error: "A graph needs at least two distinct nodes." };
  }
  if (nodes.length > 26) {
    return { ok: false, error: "Keep the graph to 26 nodes or fewer." };
  }

  return { ok: true, input: { start: edges[0][0], edges } };
}

export function formatGraphInput(input: GraphInput): string {
  return input.edges.map(([a, b]) => `${a}-${b}`).join(", ");
}

function snapshot(
  state: Omit<GraphStep, "visited" | "order"> & {
    visited: Set<string>;
    order: string[];
  },
): GraphStep {
  return {
    visited: [...state.visited],
    order: [...state.order],
    frontier: [...state.frontier],
    current: state.current,
    activeEdge: state.activeEdge,
    frontierLabel: state.frontierLabel,
    message: state.message,
  };
}

export function generateBfsSteps(input: GraphInput): GraphStep[] {
  const adjacency = buildAdjacency(input);
  const visited = new Set<string>([input.start]);
  const frontier = [input.start];
  const order: string[] = [];
  const steps: GraphStep[] = [
    snapshot({
      visited,
      order,
      frontier,
      current: null,
      activeEdge: null,
      frontierLabel: "Queue",
      message: `Start BFS at ${input.start}. Enqueue it.`,
    }),
  ];

  while (frontier.length > 0) {
    const current = frontier.shift() as string;
    order.push(current);

    const newlyQueued: string[] = [];
    for (const neighbor of adjacency.get(current) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        frontier.push(neighbor);
        newlyQueued.push(neighbor);
      }
    }

    steps.push(
      snapshot({
        visited,
        order,
        frontier,
        current,
        activeEdge: null,
        frontierLabel: "Queue",
        message:
          newlyQueued.length > 0
            ? `Visit ${current}. Enqueue ${newlyQueued.join(", ")}.`
            : `Visit ${current}. No new neighbors to enqueue.`,
      }),
    );

    for (const neighbor of newlyQueued) {
      steps.push(
        snapshot({
          visited,
          order,
          frontier,
          current,
          activeEdge: [current, neighbor],
          frontierLabel: "Queue",
          message: `Discover ${neighbor} through ${current}.`,
        }),
      );
    }
  }

  return steps;
}

export function generateDfsSteps(input: GraphInput): GraphStep[] {
  const adjacency = buildAdjacency(input);
  const visited = new Set<string>();
  const stack = [input.start];
  const order: string[] = [];
  const steps: GraphStep[] = [
    snapshot({
      visited,
      order,
      frontier: stack,
      current: null,
      activeEdge: null,
      frontierLabel: "Stack",
      message: `Start DFS at ${input.start}. Push it onto the stack.`,
    }),
  ];

  while (stack.length > 0) {
    const current = stack.pop() as string;
    if (visited.has(current)) continue;
    visited.add(current);
    order.push(current);

    const neighbors = adjacency.get(current) ?? [];
    const pushed: string[] = [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        pushed.push(neighbor);
      }
    }

    steps.push(
      snapshot({
        visited,
        order,
        frontier: stack,
        current,
        activeEdge: null,
        frontierLabel: "Stack",
        message:
          pushed.length > 0
            ? `Visit ${current}. Push ${pushed.reverse().join(", ")}.`
            : `Visit ${current}. No unvisited neighbors to push.`,
      }),
    );
  }

  return steps;
}
