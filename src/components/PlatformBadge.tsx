import type { Platform } from "@/data/problems";

const platformConfig: Record<Platform, { label: string; full: string; className: string }> = {
  LeetCode: {
    label: "LeetCode",
    full: "LeetCode",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
  },
  GFG: {
    label: "GFG",
    full: "GeeksforGeeks",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
  },
  CSES: {
    label: "CSES",
    full: "CSES Problem Set",
    className: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25",
  },
  AtCoder: {
    label: "AtCoder",
    full: "AtCoder",
    className: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/25",
  },
};

export function PlatformBadge({
  platform,
  short = false,
}: {
  platform: Platform;
  short?: boolean;
}) {
  const cfg = platformConfig[platform] ?? {
    label: platform,
    full: platform,
    className: "bg-muted text-muted-foreground border-border/50",
  };

  return (
    <span
      title={cfg.full}
      className={`inline-flex items-center rounded border px-1.5 py-0.5 font-accent text-[10.5px] font-semibold leading-none tracking-tight ${cfg.className}`}
    >
      {short && platform === "LeetCode" ? "LC" : cfg.label}
    </span>
  );
}
