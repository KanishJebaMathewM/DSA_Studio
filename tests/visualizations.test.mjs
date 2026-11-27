/**
 * Visualization engine regression tests.
 *
 * Exercises the pure algorithm step generators and the central visualization
 * registry. Rendering is intentionally kept separate so execution and state
 * transitions can be verified without a DOM.
 *
 * Run with: node tests/visualizations.test.mjs
 */

import assert from "node:assert/strict";

const { DEFAULT_GRAPH_INPUT, graphNodes, parseGraphInput, generateBfsSteps, generateDfsSteps } =
  await import("../src/lib/visualizations/graph.ts");
const {
  DEFAULT_SORTING_INPUT,
  parseSortingInput,
  generateBubbleSortSteps,
  generateSelectionSortSteps,
} = await import("../src/lib/visualizations/sorting.ts");
const {
  VISUALIZATIONS,
  getVisualization,
  getVisualizationForProblem,
  getVisualizationsForTopic,
  isVisualizationSupported,
} = await import("../src/lib/visualizations/registry.ts");

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

function isSorted(values) {
  return values.every((value, i) => i === 0 || values[i - 1] <= value);
}

console.log("\n🔎 DSA Studio — Visualization Engine Tests\n");

test("BFS begins at the start node and visits every node exactly once", () => {
  const steps = generateBfsSteps(DEFAULT_GRAPH_INPUT);
  assert.ok(steps.length > 1);
  assert.deepEqual(steps[0].order, []);
  assert.deepEqual(steps[0].frontier, [DEFAULT_GRAPH_INPUT.start]);
  const last = steps[steps.length - 1];
  assert.equal(last.order[0], DEFAULT_GRAPH_INPUT.start);
  assert.equal(last.order.length, graphNodes(DEFAULT_GRAPH_INPUT).length);
  assert.equal(new Set(last.order).size, last.order.length);
  assert.equal(last.frontier.length, 0);
  assert.ok(steps.every((s) => s.frontierLabel === "Queue"));
});

test("BFS marks the current node as visited in its state transition", () => {
  const steps = generateBfsSteps(DEFAULT_GRAPH_INPUT);
  const visitStep = steps.find((s) => s.current === DEFAULT_GRAPH_INPUT.start);
  assert.ok(visitStep);
  assert.ok(visitStep.visited.includes(DEFAULT_GRAPH_INPUT.start));
  assert.ok(visitStep.order.includes(DEFAULT_GRAPH_INPUT.start));
});

test("DFS visits every node using a stack and reports stack state", () => {
  const steps = generateDfsSteps(DEFAULT_GRAPH_INPUT);
  const last = steps[steps.length - 1];
  assert.equal(last.order[0], DEFAULT_GRAPH_INPUT.start);
  assert.equal(last.order.length, graphNodes(DEFAULT_GRAPH_INPUT).length);
  assert.equal(new Set(last.order).size, last.order.length);
  assert.ok(steps.every((s) => s.frontierLabel === "Stack"));
  assert.equal(last.frontier.length, 0);
});

test("Bubble sort step sequence starts unsorted and ends sorted", () => {
  const steps = generateBubbleSortSteps(DEFAULT_SORTING_INPUT);
  assert.deepEqual(steps[0].array, DEFAULT_SORTING_INPUT.values);
  assert.ok(!isSorted(steps[0].array));
  const last = steps[steps.length - 1];
  assert.ok(isSorted(last.array));
  assert.equal(last.array.length, DEFAULT_SORTING_INPUT.values.length);
  assert.equal(last.sortedIndices.length, last.array.length);
  assert.ok(steps.some((s) => s.swapped));
});

test("Selection sort step sequence starts unsorted and ends sorted", () => {
  const steps = generateSelectionSortSteps(DEFAULT_SORTING_INPUT);
  assert.deepEqual(steps[0].array, DEFAULT_SORTING_INPUT.values);
  const last = steps[steps.length - 1];
  assert.ok(isSorted(last.array));
  assert.equal(last.array.length, DEFAULT_SORTING_INPUT.values.length);
  assert.ok(steps.some((s) => s.comparing !== null));
});

test("Sorting steps never mutate earlier snapshots", () => {
  const steps = generateBubbleSortSteps({ values: [3, 2, 1] });
  const snapshots = steps.map((s) => [...s.array]);
  assert.ok(steps.length > 1);
  steps.slice(1).forEach((s) => assert.notEqual(s.array, steps[0].array));
  assert.deepEqual(
    steps.map((s) => s.array),
    snapshots,
    "each recorded step must remain stable for prev/next navigation",
  );
});

test("Graph input parser accepts valid edges and rejects malformed input", () => {
  const valid = parseGraphInput("A-B, B-C");
  assert.equal(valid.ok, true);
  assert.deepEqual(valid.input.edges, [
    ["A", "B"],
    ["B", "C"],
  ]);
  assert.equal(valid.input.start, "A");

  assert.equal(parseGraphInput("").ok, false);
  assert.equal(parseGraphInput("AB").ok, false);
  assert.equal(parseGraphInput("A-A").ok, false);
});

test("Sorting input parser validates numeric ranges and counts", () => {
  const valid = parseSortingInput("5, 3, 1");
  assert.equal(valid.ok, true);
  assert.deepEqual(valid.input.values, [5, 3, 1]);

  assert.equal(parseSortingInput("").ok, false);
  assert.equal(parseSortingInput("5").ok, false);
  assert.equal(parseSortingInput("a,b").ok, false);
  assert.equal(parseSortingInput("1.5, 2").ok, false);
  assert.equal(parseSortingInput("1000, 2").ok, false);
  assert.equal(parseSortingInput(Array.from({ length: 21 }, () => "1").join(",")).ok, false);
});

test("Registry exposes unique identifiers and topic mappings", () => {
  const ids = VISUALIZATIONS.map((v) => v.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(getVisualization("bfs"));
  assert.ok(getVisualization("dfs"));
  assert.ok(getVisualization("bubble-sort"));
  assert.ok(getVisualization("selection-sort"));
  assert.equal(getVisualization("unknown"), undefined);

  assert.equal(getVisualizationsForTopic("graphs").length, 2);
  assert.equal(getVisualizationsForTopic("sorting").length, 2);
  assert.equal(getVisualizationsForTopic("trees").length, 0);
});

test("Unsupported algorithms are not reported as visualizable", () => {
  assert.equal(isVisualizationSupported("graphs", "BFS"), true);
  assert.equal(isVisualizationSupported("sorting", "Bubble Sort"), true);
  assert.equal(isVisualizationSupported("trees", "Inorder Traversal"), false);
  assert.equal(isVisualizationSupported("graphs", "Dijkstra"), false);
});

test("Revision resolves registered problem IDs and leaves other problems unsupported", () => {
  assert.equal(getVisualizationForProblem("gfg-bfs"), getVisualization("bfs"));
  assert.equal(getVisualizationForProblem("gfg-dfs"), getVisualization("dfs"));
  assert.equal(getVisualizationForProblem("gfg-bubble-sort"), getVisualization("bubble-sort"));
  assert.equal(
    getVisualizationForProblem("gfg-selection-sort"),
    getVisualization("selection-sort"),
  );
  assert.equal(getVisualizationForProblem("sort-an-array"), undefined);
});

test("Every registry definition produces a usable default step sequence", () => {
  for (const definition of VISUALIZATIONS) {
    const steps = definition.generateSteps(definition.defaultInput);
    assert.ok(steps.length >= 2, `${definition.id} should have multiple steps`);
    assert.ok(typeof steps[0].message === "string");
    const parsed = definition.parseInput(definition.defaultValueText);
    assert.equal(parsed.ok, true, `${definition.id} default input should parse`);
  }
});

test("Every visualization definition includes comprehensive theory and valid learning resources", () => {
  for (const definition of VISUALIZATIONS) {
    const { theory } = definition;
    assert.ok(theory, `${definition.id} must have theory object`);
    assert.ok(theory.overview.length > 20, `${definition.id} overview must be detailed`);
    assert.ok(theory.principles.length >= 2, `${definition.id} must have multiple principles`);
    assert.ok(
      theory.workingProcess.length >= 3,
      `${definition.id} must have working process steps`,
    );
    assert.ok(theory.pseudocode.length > 10, `${definition.id} must have pseudocode`);
    assert.ok(
      theory.exampleWalkthrough.steps.length >= 3,
      `${definition.id} must have walkthrough steps`,
    );
    assert.ok(theory.complexity.timeWorst, `${definition.id} must have worst time complexity`);
    assert.ok(theory.complexity.space, `${definition.id} must have space complexity`);
    assert.ok(
      theory.resources.length >= 1,
      `${definition.id} must have external learning resources`,
    );
    for (const res of theory.resources) {
      assert.ok(res.title, "resource title required");
      assert.ok(res.source, "resource source required");
      assert.ok(res.url.startsWith("https://"), `resource url must be https: ${res.url}`);
    }
  }
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);
if (failed > 0) {
  process.exit(1);
}
