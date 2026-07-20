export function ProgressBar({
  value,
  className = "",
}: {
  value: number; // 0-100
  className?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  const done = v >= 100;
  return (
    <div
      className={`h-1.5 w-full overflow-hidden rounded-full bg-muted ${className}`}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-300 ease-out ${
          done ? "bg-success" : "bg-primary"
        }`}
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
