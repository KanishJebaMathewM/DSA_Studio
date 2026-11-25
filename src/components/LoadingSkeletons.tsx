import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-[clamp(0.625rem,1.6vh,1.25rem)] animate-fade-in-up">
      {/* Welcome Banner Skeleton */}
      <div className="md:flex-[0.9] flex flex-col gap-3 rounded-xl border border-border/60 bg-card px-4 sm:px-5 py-[clamp(0.75rem,1.8vh,1.5rem)] shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between card-glass-line">
        <div className="space-y-2">
          <Skeleton className="h-6 w-36 sm:w-48" />
          <Skeleton className="h-3.5 w-52 sm:w-64" />
        </div>
        <Skeleton className="h-7 w-28 rounded-full" />
      </div>

      {/* DSA Progress Card Skeleton */}
      <div className="md:flex-[1] flex flex-col justify-center rounded-xl border border-border/70 bg-surface px-4 sm:px-5 py-[clamp(0.75rem,1.8vh,1.5rem)] shadow-xs backdrop-blur-md card-glass-line">
        <div className="flex justify-between items-center">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-5 w-10" />
        </div>
        <Skeleton className="mt-[clamp(0.5rem,1.2vh,0.875rem)] h-[clamp(0.5rem,1.1vh,0.75rem)] w-full rounded-full" />
      </div>

      {/* Stat Cards Grid Skeleton */}
      <div className="md:flex-[1.15] grid grid-cols-2 gap-[clamp(0.625rem,1.4vh,1rem)] md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-full rounded-xl border border-border/70 bg-surface backdrop-blur-md px-3 sm:px-4 py-[clamp(0.75rem,1.8vh,1.35rem)] min-h-[clamp(74px,11vh,110px)] flex flex-col justify-between shadow-xs card-glass-line"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-7 w-12 mt-2" />
          </div>
        ))}
      </div>

      {/* Difficulty Split Grid Skeleton */}
      <div className="md:flex-[1.15] grid grid-cols-3 gap-[clamp(0.5rem,1.4vh,1rem)]">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-full rounded-xl border border-border/70 bg-surface backdrop-blur-md px-2.5 sm:px-4 py-[clamp(0.75rem,1.8vh,1.35rem)] min-h-[clamp(74px,11vh,110px)] flex flex-col justify-between shadow-xs card-glass-line"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-4 w-10 rounded" />
            </div>
            <Skeleton className="h-7 w-10 mt-2" />
          </div>
        ))}
      </div>

      {/* Bottom Cards Skeleton */}
      <div className="md:flex-[1.85] grid gap-[clamp(0.75rem,1.8vh,1.25rem)] lg:grid-cols-3">
        <div className="lg:col-span-2 h-full rounded-xl border border-border/70 bg-surface px-4 sm:px-5 py-[clamp(0.875rem,2vh,1.5rem)] flex flex-col gap-[clamp(0.625rem,1.5vh,1rem)] shadow-xs backdrop-blur-md card-glass-line">
          <div className="flex justify-between items-center shrink-0">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="flex-1 flex flex-col justify-center rounded-lg border border-border/70 bg-surface-muted/60 px-4 sm:px-5 py-[clamp(0.875rem,2vh,1.5rem)] space-y-2">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-5 w-56" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        <div className="h-full rounded-xl border border-border/70 bg-surface px-4 sm:px-5 py-[clamp(0.875rem,2vh,1.5rem)] flex flex-col gap-[clamp(0.625rem,1.5vh,1rem)] shadow-xs backdrop-blur-md card-glass-line">
          <Skeleton className="h-4 w-32 shrink-0" />
          <div className="flex-1 flex flex-col justify-center space-y-2.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-3.5 w-36" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TopicSkeleton() {
  return (
    <div className="space-y-[clamp(0.75rem,2vh,1.5rem)] animate-fade-in-up">
      {/* Topic Hero Card Skeleton */}
      <div className="mb-[clamp(0.75rem,2vh,1.5rem)] rounded-xl border border-border/60 bg-card px-4 sm:px-5 py-[clamp(0.75rem,2vh,1.35rem)] shadow-sm backdrop-blur-md card-glass-line space-y-3">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-full max-w-xl" />
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <Skeleton className="h-2 w-full sm:max-w-md rounded-full" />
          <Skeleton className="h-3.5 w-32" />
        </div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="mb-[clamp(0.5rem,1.5vh,1rem)] flex flex-wrap items-center gap-2">
        <Skeleton className="h-9 w-[calc(50%-0.25rem)] sm:w-[150px] rounded-lg" />
        <Skeleton className="h-9 w-[calc(50%-0.25rem)] sm:w-[150px] rounded-lg" />
        <Skeleton className="h-9 w-[calc(50%-0.25rem)] sm:w-[150px] rounded-lg" />
      </div>

      {/* Accordion Skeletons */}
      <div className="space-y-[clamp(0.5rem,1.4vh,0.875rem)]">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-border/70 bg-surface shadow-xs backdrop-blur-md p-3 sm:px-4 sm:py-3.5 flex items-center justify-between gap-3 card-glass-line"
          >
            <div className="flex items-center gap-3 flex-1">
              <Skeleton className="h-8 w-8 rounded-md" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-40 sm:w-60" />
                <Skeleton className="h-2 w-28 sm:w-44 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PracticeSkeleton() {
  return (
    <div className="space-y-[clamp(0.75rem,2vh,1.5rem)] animate-fade-in-up">
      <div className="rounded-xl border border-border/60 bg-card px-4 sm:px-5 py-[clamp(0.75rem,2vh,1.25rem)] shadow-sm backdrop-blur-md card-glass-line space-y-2">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/70 bg-surface backdrop-blur-md p-4 space-y-3 card-glass-line"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-4 w-4" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
