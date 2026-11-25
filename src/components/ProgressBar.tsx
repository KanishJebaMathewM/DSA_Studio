export function ProgressBar({
  value,
  className = "",
  label = "Progress",
}: {
  value: number; // 0-100
  className?: string;
  label?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  const done = v >= 100;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-[clamp(0.375rem,calc(0.25rem+0.1vw+0.2vh),0.55rem)] w-full overflow-hidden rounded-full bg-primary/15 dark:bg-muted ring-1 ring-inset ring-border/50 ${className}`}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-500 ease-out ${
          done ? "bg-success" : "bg-primary"
        }`}
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
