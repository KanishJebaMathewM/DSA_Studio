import type { Difficulty } from "@/data/problems";

const styles: Record<Difficulty, string> = {
  Easy: "bg-easy-bg text-easy-foreground",
  Medium: "bg-medium-bg text-medium-foreground",
  Hard: "bg-hard-bg text-hard-foreground",
  Unverified: "bg-muted text-muted-foreground",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-[clamp(0.45rem,calc(0.3rem+0.22vw+0.12vh),0.75rem)] py-[clamp(0.125rem,calc(0.08rem+0.08vh),0.25rem)] text-fluid-xs font-medium ${styles[difficulty]}`}
    >
      {difficulty === "Unverified" ? "—" : difficulty}
    </span>
  );
}
