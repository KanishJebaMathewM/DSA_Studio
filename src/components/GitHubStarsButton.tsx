import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const REPO_URL = "https://github.com/KanishJebaMathewM/DSA_Studio";
const REPO_API_URL = "https://api.github.com/repos/KanishJebaMathewM/DSA_Studio";
const CACHE_KEY = "dsa-studio-github-stars-v1";
const CACHE_TTL_MS = 15 * 60 * 1000;

function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(count);
}

export function GitHubStarsButton() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    try {
      const cachedRaw = sessionStorage.getItem(CACHE_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw) as { count?: number; ts?: number };
        if (
          typeof cached.count === "number" &&
          typeof cached.ts === "number" &&
          Date.now() - cached.ts < CACHE_TTL_MS
        ) {
          setStars(cached.count);
          return;
        }
      }
    } catch {
      // Ignore storage access errors
    }

    fetch(REPO_API_URL, { headers: { Accept: "application/vnd.github+json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { stargazers_count?: unknown } | null) => {
        if (cancelled || !data || typeof data.stargazers_count !== "number") return;
        const count = data.stargazers_count;
        setStars(count);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ count, ts: Date.now() }));
        } catch {
          // Ignore storage access errors
        }
      })
      .catch(() => {
        // Fallback silently to label without count when offline or rate-limited
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        stars !== null ? `Star DSA Studio on GitHub (${stars} stars)` : "Star DSA Studio on GitHub"
      }
      title="Star DSA Studio on GitHub"
      className="inline-flex h-[var(--ctrl-md)] shrink-0 items-center gap-1.5 rounded-lg border border-border/60 bg-surface/60 px-2 sm:px-2.5 text-fluid-xs font-medium text-foreground shadow-xs backdrop-blur-sm transition-colors hover:border-border hover:bg-hover"
    >
      <Star className="h-[var(--icon-sm)] w-[var(--icon-sm)] shrink-0 fill-gold text-gold" />
      <span className="hidden sm:inline text-muted-foreground">Star</span>
      {stars !== null && (
        <span className="tabular-nums font-semibold text-foreground">{formatStarCount(stars)}</span>
      )}
    </a>
  );
}

