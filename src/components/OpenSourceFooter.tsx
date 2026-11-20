
import {
  Github,
  Star,
  Bug,
  GitPullRequest,
  ExternalLink,
} from "lucide-react";

const REPOSITORY_URL =
  "https://github.com/KanishJebaMathewM/DSA_Studio";

const links = [
  {
    label: "Star on GitHub",
    description: "Support the project",
    href: REPOSITORY_URL,
    icon: Star,
  },
  {
    label: "Report an Issue",
    description: "Report bugs or suggest improvements",
    href: `${REPOSITORY_URL}/issues`,
    icon: Bug,
  },
  {
    label: "Contribute",
    description: "Help us improve DSA Studio",
    href: `${REPOSITORY_URL}/blob/main/CONTRIBUTING.md`,
    icon: GitPullRequest,
  },
];

export function OpenSourceFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-background px-4 py-6 md:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            <Github className="h-4 w-4" />
            DSA Studio
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
          </a>

          <p className="text-xs text-muted-foreground">
            Built and maintained by the DSA Studio Team.
          </p>
        </div>

        <nav
          aria-label="Open source and community links"
          className="flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          {links.map(({ label, description, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={description}
              aria-label={label}
              className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
