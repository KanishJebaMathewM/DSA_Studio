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
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${styles[difficulty]}`}
    >
      {difficulty === "Unverified" ? "—" : difficulty}
    </span>
  );
}
