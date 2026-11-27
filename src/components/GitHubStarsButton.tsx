import { useEffect, useState } from "react";

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

function GitHubEmblemSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {/* Contrast core behind the Octocat cutout so it stays crisp in both themes */}
      <circle cx="12" cy="12.27" r="10.4" className="fill-white dark:fill-[#0d1117]" />
      {/* Outer GitHub mark with negative-space Octocat silhouette */}
      <path
        className="fill-[#1b1f24] dark:fill-[#f0f6fc]"
        d="M12 1.27a11 11 0 0 0-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.5-1.26-1.21-1.6-1.21-1.6-.99-.68.07-.66.07-.66 1.09.08 1.67 1.12 1.67 1.12.97 1.66 2.54 1.18 3.16.9.1-.7.38-1.18.69-1.45-2.42-.27-4.96-1.21-4.96-5.38 0-1.19.42-2.16 1.12-2.92-.11-.28-.49-1.39.11-2.89 0 0 .92-.29 3 1.12a10.4 10.4 0 0 1 5.46 0c2.08-1.41 3-1.12 3-1.12.6 1.5.22 2.61.11 2.89.7.76 1.12 1.73 1.12 2.92 0 4.18-2.54 5.1-4.97 5.37.39.34.74 1.01.74 2.03v3.01c0 .29.19.63.74.53A11 11 0 0 0 12 1.27Z"
      />
    </svg>
  );
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
      className="group inline-flex h-[var(--ctrl-sm)] sm:h-[var(--ctrl-md)] shrink-0 items-center gap-1.5 sm:gap-2 rounded-full border border-foreground/25 bg-surface/90 p-[3px] pr-2 sm:p-1 sm:pr-3 text-fluid-xs font-medium tracking-tight text-foreground shadow-xs backdrop-blur-md transition-all hover:border-foreground/45 hover:bg-surface dark:border-white/25 dark:bg-card/85 dark:hover:border-white/45 dark:hover:bg-card"
    >
      <GitHubEmblemSvg className="h-full w-auto aspect-square shrink-0 transition-transform duration-150 group-hover:scale-[1.04]" />
      {stars !== null ? (
        <span className="tabular-nums font-medium text-foreground">{formatStarCount(stars)}</span>
      ) : (
        <span className="max-[399px]:hidden font-medium text-foreground">Star</span>
      )}
    </a>
  );
}
