import { Bug, Code2, GitPullRequest, Scale } from "lucide-react";

const REPO_URL = "https://github.com/KanishJebaMathewM/DSA_Studio";
const ISSUES_URL = `${REPO_URL}/issues`;
const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;
const DISCORD_URL = "https://discord.gg/7MhyE48Au";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 1.27a11 11 0 0 0-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.45-3.67-1.45-.5-1.26-1.21-1.6-1.21-1.6-.99-.68.07-.66.07-.66 1.09.08 1.67 1.12 1.67 1.12.97 1.66 2.54 1.18 3.16.9.1-.7.38-1.18.69-1.45-2.42-.27-4.96-1.21-4.96-5.38 0-1.19.42-2.16 1.12-2.92-.11-.28-.49-1.39.11-2.89 0 0 .92-.29 3 1.12a10.4 10.4 0 0 1 5.46 0c2.08-1.41 3-1.12 3-1.12.6 1.5.22 2.61.11 2.89.7.76 1.12 1.73 1.12 2.92 0 4.18-2.54 5.1-4.97 5.37.39.34.74 1.01.74 2.03v3.01c0 .29.19.63.74.53A11 11 0 0 0 12 1.27Z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

export function AppFooter() {
  return (
    <footer className="mt-[clamp(1.25rem,3vh,2rem)] w-full rounded-2xl border border-border/60 bg-card/60 px-4 py-3 sm:px-5 shadow-sm backdrop-blur-xl transition-colors">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Branding */}
        <div className="flex items-center gap-2 text-fluid-xs text-muted-foreground">
          <span className="flex h-[var(--ctrl-sm)] w-[var(--ctrl-sm)] shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Code2 className="h-[var(--icon-sm)] w-[var(--icon-sm)]" />
          </span>
          <span>
            Developed by <span className="font-medium text-foreground">DSA Studio Team</span>
          </span>
        </div>

        {/* Support, Contribution & License */}
        <nav
          aria-label="Footer links"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-fluid-xs text-muted-foreground"
        >
          <a
            href={ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Bug className="h-[var(--icon-xs)] w-[var(--icon-xs)]" />
            <span>Report an Issue</span>
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <GitPullRequest className="h-[var(--icon-xs)] w-[var(--icon-xs)]" />
            <span>Contribute</span>
          </a>
          <a
            href={LICENSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="AGPL-3.0-only License"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Scale className="h-[var(--icon-xs)] w-[var(--icon-xs)]" />
            <span>License (AGPL-3.0)</span>
          </a>
        </nav>

        {/* Social Links */}
        <div className="flex items-center gap-1.5">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DSA Studio on GitHub"
            title="GitHub"
            className="inline-flex h-[var(--ctrl-sm)] w-[var(--ctrl-sm)] items-center justify-center rounded-lg border border-border/50 bg-surface/50 text-muted-foreground transition-colors hover:border-border hover:bg-hover hover:text-foreground"
          >
            <GitHubIcon className="h-[var(--icon-sm)] w-[var(--icon-sm)]" />
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join DSA Studio on Discord"
            title="Discord Community"
            className="inline-flex h-[var(--ctrl-sm)] w-[var(--ctrl-sm)] items-center justify-center rounded-lg border border-border/50 bg-surface/50 text-muted-foreground transition-colors hover:border-border hover:bg-hover hover:text-foreground"
          >
            <DiscordIcon className="h-[var(--icon-sm)] w-[var(--icon-sm)]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
