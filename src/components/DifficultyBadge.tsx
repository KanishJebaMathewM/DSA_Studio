import type { Difficulty } from "@/data/problems";

const badgeConfig: Record<Difficulty, { bg: string; text: string; dot: string; label: string }> = {
  Easy: {
    bg: "bg-easy-bg/80 border-easy/25",
    text: "text-easy-foreground",
    dot: "bg-easy",
    label: "Easy",
  },
  Medium: {
    bg: "bg-medium-bg/80 border-medium/25",
    text: "text-medium-foreground",
    dot: "bg-medium",
    label: "Medium",
  },
  Hard: {
    bg: "bg-hard-bg/80 border-hard/25",
    text: "text-hard-foreground",
    dot: "bg-hard",
    label: "Hard",
  },
  Unverified: {
    bg: "bg-muted border-border/50",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
    label: "—",
  },
};

export function DifficultyBadge({
  difficulty,
  showDot = true,
}: {
  difficulty: Difficulty;
  showDot?: boolean;
}) {
  const cfg = badgeConfig[difficulty] ?? badgeConfig.Unverified;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-accent text-[11px] font-semibold leading-none ${cfg.bg} ${cfg.text}`}
    >
      {showDot && (
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${cfg.dot}`} aria-hidden="true" />
      )}
      <span>{cfg.label}</span>
    </span>
  );
}
