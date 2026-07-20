import type { Platform } from "@/data/problems";

export function PlatformBadge({ platform }: { platform: Platform }) {
  const isLC = platform === "LeetCode";
  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${
        isLC
          ? "border-medium/30 text-medium-foreground"
          : "border-easy/30 text-easy-foreground"
      }`}
    >
      {isLC ? "LC" : "GFG"}
    </span>
  );
}
