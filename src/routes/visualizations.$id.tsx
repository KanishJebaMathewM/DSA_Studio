import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Check,
  Code2,
  Copy,
  ExternalLink,
  Flame,
  GitBranch,
  Lightbulb,
  ListOrdered,
  Share2,
  Sparkles,
  Timer,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InteractiveVisualizer } from "@/components/visualizations/InteractiveVisualizer";
import { getVisualization } from "@/lib/visualizations/registry";
import { getTopic } from "@/data/problems";

export const Route = createFileRoute("/visualizations/$id")({
  loader: ({ params }) => {
    const visualization = getVisualization(params.id);
    if (!visualization) throw notFound();
    const topic = getTopic(visualization.topicSlug);
    return { visualization, topic };
  },
  head: ({ loaderData }) => {
    const v = loaderData?.visualization;
    const title = v
      ? `${v.name} Learning Guide & Visualization — DSA Studio`
      : "Visualization — DSA Studio";
    const desc = v
      ? `Learn ${v.name} step-by-step with interactive visualizations, theoretical principles, pseudocode, and complexity analysis.`
      : "DSA algorithm visualizer and learning page.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: VisualizationLearningPage,
});

function VisualizationLearningPage() {
  const { visualization, topic } = Route.useLoaderData() as {
    visualization: import("@/lib/visualizations/types").VisualizationDefinition;
    topic?: import("@/data/problems").Topic;
  };

  const [copiedCode, setCopiedCode] = useState(false);
  const { theory } = visualization;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(theory.pseudocode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // clipboard write might fail in non-secure or restricted contexts
    }
  };

  return (
    <AppShell title={`${visualization.name} — Learning Guide`}>
      <div className="mx-auto max-w-5xl space-y-8 pb-12">
        {/* Navigation Breadcrumb / Header */}
        <div className="flex flex-col gap-4 rounded-xl border border-border/70 bg-card p-4 sm:p-6 shadow-sm backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/topics/$slug"
              params={{ slug: visualization.topicSlug }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to {topic?.name ?? "Topic"}</span>
            </Link>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs uppercase tracking-wider">
                {visualization.kind === "graph" ? "Graph Algorithm" : "Sorting Algorithm"}
              </Badge>
              <Badge variant="secondary" className="text-xs font-semibold">
                {visualization.algorithm}
              </Badge>
            </div>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {visualization.name}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {visualization.description}
            </p>
          </div>
        </div>

        {/* 1. Topic Overview */}
        <section className="space-y-3">
          <SectionHeader
            icon={<BookOpen className="h-5 w-5 text-primary" />}
            title="1. Topic Overview"
            subtitle="Definition and conceptual introduction"
          />
          <div className="rounded-xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs leading-relaxed text-sm sm:text-base text-foreground/90">
            <p>{theory.overview}</p>
          </div>
        </section>

        {/* 2. Theory & Core Principles */}
        <section className="space-y-3">
          <SectionHeader
            icon={<Lightbulb className="h-5 w-5 text-warning" />}
            title="2. Theory & Core Principles"
            subtitle="The underlying fundamentals governing this algorithm"
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {theory.principles.map((principle, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs flex flex-col justify-start gap-2"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary font-bold text-xs">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">{principle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Working Process */}
        <section className="space-y-3">
          <SectionHeader
            icon={<ListOrdered className="h-5 w-5 text-primary" />}
            title="3. Working Process"
            subtitle="Step-by-step breakdown of algorithmic execution"
          />
          <div className="rounded-xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs">
            <ol className="relative space-y-4 border-l border-border/80 pl-6 text-sm text-foreground/90">
              {theory.workingProcess.map((step, idx) => (
                <li key={idx} className="relative">
                  <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface text-[11px] font-bold text-primary shadow-xs">
                    {idx + 1}
                  </span>
                  <div className="pt-0.5">
                    <p className="leading-relaxed">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. Algorithm / Pseudocode */}
        <section className="space-y-3">
          <SectionHeader
            icon={<Code2 className="h-5 w-5 text-primary" />}
            title="4. Algorithm & Pseudocode"
            subtitle="Formal procedure representation and key state variables"
          />
          <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-xs">
            <div className="flex items-center justify-between border-b border-border/70 bg-surface-muted/60 px-4 py-2.5">
              <span className="text-xs font-mono font-medium text-muted-foreground">
                {visualization.algorithm.toLowerCase()}-pseudocode.algo
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 gap-1 px-2 text-xs"
                onClick={handleCopyCode}
                aria-label="Copy pseudocode to clipboard"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-success" />
                    <span className="text-success font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy code</span>
                  </>
                )}
              </Button>
            </div>
            <pre className="overflow-x-auto p-4 sm:p-5 font-mono text-xs sm:text-sm text-foreground bg-surface/50 leading-relaxed">
              <code>{theory.pseudocode}</code>
            </pre>
          </div>
        </section>

        {/* 5. Interactive Visualization */}
        <section className="space-y-3">
          <SectionHeader
            icon={<Sparkles className="h-5 w-5 text-primary" />}
            title="5. Interactive Visualization"
            subtitle="Experiment with execution steps, speed, and custom inputs in real time"
          />
          <div className="rounded-xl border border-border/70 bg-card p-4 sm:p-6 shadow-sm">
            <InteractiveVisualizer definition={visualization} />
          </div>
        </section>

        {/* 6. Example Walkthrough */}
        <section className="space-y-3">
          <SectionHeader
            icon={<GitBranch className="h-5 w-5 text-primary" />}
            title="6. Example Walkthrough"
            subtitle={theory.exampleWalkthrough.title}
          />
          <div className="rounded-xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs space-y-4">
            <div className="rounded-lg border border-border/60 bg-surface-muted/50 p-3 text-xs sm:text-sm text-muted-foreground font-medium">
              Scenario: {theory.exampleWalkthrough.description}
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-foreground/90">
              {theory.exampleWalkthrough.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{st}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. Complexity Analysis */}
        <section className="space-y-3">
          <SectionHeader
            icon={<Timer className="h-5 w-5 text-primary" />}
            title="7. Complexity Analysis"
            subtitle="Asymptotic time and space requirements"
          />
          <div className="grid gap-3 sm:grid-cols-4">
            <ComplexityCard label="Best Time" value={theory.complexity.timeBest} />
            <ComplexityCard label="Average Time" value={theory.complexity.timeAverage} />
            <ComplexityCard label="Worst Time" value={theory.complexity.timeWorst} />
            <ComplexityCard label="Auxiliary Space" value={theory.complexity.space} />
          </div>
          {theory.complexity.notes && (
            <div className="rounded-lg border border-border/70 bg-card p-3.5 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground mr-1">Note:</span>
              {theory.complexity.notes}
            </div>
          )}
        </section>

        {/* 8. Further Reading & External Resources */}
        <section className="space-y-3">
          <SectionHeader
            icon={<ExternalLink className="h-5 w-5 text-primary" />}
            title="8. Further Reading & Resources"
            subtitle="Curated authoritative articles, reference implementations, and visualizations"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {theory.resources.map((res, i) => (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between gap-3 rounded-xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="text-[11px] font-medium">
                      {res.source}
                    </Badge>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {res.title}
                  </h3>
                  {res.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {res.description}
                    </p>
                  )}
                </div>
                <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">
                  Read article &rarr;
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-surface shadow-xs">
        {icon}
      </div>
      <div>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

function ComplexityCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-4 text-center shadow-xs">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1 font-mono text-lg font-bold text-foreground tracking-tight">{value}</div>
    </div>
  );
}
