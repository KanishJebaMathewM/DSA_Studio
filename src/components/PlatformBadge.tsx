import type { Platform } from "@/data/problems";

export function PlatformBadge({ platform }: { platform: Platform }) {
  const labels: Record<Platform, string> = {
    LeetCode: "LC",
    GFG: "GFG",
    CSES: "CSES",
    AtCoder: "AtCoder",
  };
  const isLC = platform === "LeetCode";
  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${
        isLC
          ? "border-medium/30 text-medium-foreground"
          : platform === "GFG"
            ? "border-easy/30 text-easy-foreground"
            : "border-primary/30 text-primary"
      }`}
    >
      {labels[platform]}
    </span>
  );
}
