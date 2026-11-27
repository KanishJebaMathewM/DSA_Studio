import { graphNodes } from "@/lib/visualizations/graph";
import type { GraphInput, GraphStep } from "@/lib/visualizations/types";

const WIDTH = 400;
const HEIGHT = 320;
const NODE_RADIUS = 18;

function nodePositions(nodes: string[]) {
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  const radius = Math.min(WIDTH, HEIGHT) / 2 - 44;
  const positions = new Map<string, { x: number; y: number }>();
  nodes.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
    positions.set(node, {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  });
  return positions;
}

export function GraphVisualization({ input, step }: { input: GraphInput; step: GraphStep }) {
  const nodes = graphNodes(input);
  const positions = nodePositions(nodes);
  const visited = new Set(step.visited);
  const frontier = new Set(step.frontier);
  const activeEdge = step.activeEdge;

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-border/70 bg-surface">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full max-h-[46vh]"
          role="img"
          aria-label="Graph visualization"
        >
          {input.edges.map(([a, b], i) => {
            const from = positions.get(a);
            const to = positions.get(b);
            if (!from || !to) return null;
            const isActive =
              !!activeEdge &&
              ((activeEdge[0] === a && activeEdge[1] === b) ||
                (activeEdge[0] === b && activeEdge[1] === a));
            return (
              <line
                key={`${a}-${b}-${i}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={isActive ? "stroke-primary" : "stroke-border"}
                strokeWidth={isActive ? 3 : 1.5}
              />
            );
          })}
          {nodes.map((node) => {
            const pos = positions.get(node);
            if (!pos) return null;
            const isCurrent = step.current === node;
            const isVisited = visited.has(node);
            const isFrontier = frontier.has(node);
            const fill = isCurrent
              ? "fill-warning"
              : isVisited
                ? "fill-primary"
                : isFrontier
                  ? "fill-primary-soft"
                  : "fill-surface";
            const stroke = isFrontier ? "stroke-primary" : "stroke-border";
            const textColor = isCurrent
              ? "fill-slate-900 font-bold"
              : isVisited
                ? "fill-primary-foreground font-semibold"
                : "fill-foreground font-semibold";
            return (
              <g key={node}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={NODE_RADIUS}
                  className={`${fill} ${stroke}`}
                  strokeWidth={isFrontier ? 2.5 : 1.5}
                />
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`text-xs ${textColor}`}
                >
                  {node}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <LegendItem className="bg-primary" label="Visited" />
        <LegendItem className="bg-warning" label="Current" />
        <LegendItem className="bg-primary-soft border border-primary" label="In frontier" />
        <LegendItem className="bg-surface border border-border" label="Unvisited" />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <StatePanel title="Traversal order">
          <ChipList items={step.order} empty="Nothing visited yet." />
        </StatePanel>
        <StatePanel title={`${step.frontierLabel} (${step.frontier.length})`}>
          <ChipList items={step.frontier} empty={`${step.frontierLabel} is empty.`} />
        </StatePanel>
      </div>
    </div>
  );
}

function LegendItem({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-3 w-3 rounded-full ${className}`} />
      {label}
    </span>
  );
}

function StatePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/60 bg-surface-muted/50 p-2.5">
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}

function ChipList({ items, empty }: { items: string[]; empty: string }) {
  if (items.length === 0) {
    return <p className="text-xs text-muted-foreground">{empty}</p>;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="rounded-md bg-primary-soft px-1.5 py-0.5 text-xs font-medium text-primary"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
