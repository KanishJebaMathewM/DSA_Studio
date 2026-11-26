import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouterState } from "@tanstack/react-router";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";
import { ThemeBackground } from "./ThemeBackground";
import { getTopic } from "@/data/problems";

interface ShellContextValue {
  setTitle: (title: string) => void;
}

const ShellContext = createContext<ShellContextValue | null>(null);

function deriveRouteTitle(pathname: string): string {
  if (pathname === "/") return "Dashboard";
  if (pathname === "/practice") return "Practice";
  if (pathname === "/revision") return "Revision";
  if (pathname === "/bookmarks") return "Bookmarks";
  if (pathname === "/progress") return "Progress";
  if (pathname.startsWith("/topics/")) {
    const slug = pathname.slice("/topics/".length).replace(/\/$/, "");
    return getTopic(slug)?.name ?? "Topic";
  }
  return "DSA Studio";
}

export function PersistentWorkspaceLayout({ children }: { children: ReactNode }) {
  const { pathname, hideShell } = useRouterState({
    select: (r) => ({
      pathname: r.location.pathname,
      hideShell:
        r.matches.length <= 1 ||
        r.matches.some((m) => m.status === "notFound" || m.status === "error"),
    }),
  });

  const [customTitle, setCustomTitle] = useState<{ pathname: string; title: string } | null>(null);

  const setTitle = useCallback(
    (title: string) => {
      setCustomTitle((prev) =>
        prev?.pathname === pathname && prev?.title === title ? prev : { pathname, title },
      );
    },
    [pathname],
  );

  const value = useMemo(() => ({ setTitle }), [setTitle]);

  if (hideShell) {
    return <>{children}</>;
  }

  const headerTitle =
    customTitle && customTitle.pathname === pathname
      ? customTitle.title
      : deriveRouteTitle(pathname);

  return (
    <ShellContext.Provider value={value}>
      <div className="relative flex min-h-dvh w-full overflow-x-clip">
        <ThemeBackground />
        {/* Full-width proportional responsive workspace */}
        <div className="relative z-10 flex min-h-dvh w-full px-2.5 sm:px-4 md:px-5 lg:px-6 py-2 md:py-3 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 items-stretch">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <AppHeader title={headerTitle} />
            <main
              key={pathname}
              className="flex flex-1 flex-col w-full pt-[clamp(0.5rem,1.5vh,1rem)] animate-fade-in-up"
            >
              {children}
            </main>
            <AppFooter />
          </div>
        </div>
      </div>
    </ShellContext.Provider>
  );
}

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  const shell = useContext(ShellContext);

  useEffect(() => {
    shell?.setTitle(title);
  }, [shell, title]);

  // Inside PersistentWorkspaceLayout, chrome (Background, Sidebar, Header) stays mounted across routes
  if (shell) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-dvh w-full overflow-x-clip">
      <ThemeBackground />
      {/* Full-width proportional responsive workspace */}
      <div className="relative z-10 flex min-h-dvh w-full px-2.5 sm:px-4 md:px-5 lg:px-6 py-2 md:py-3 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 items-stretch">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader title={title} />
          <main className="flex flex-1 flex-col w-full pt-[clamp(0.5rem,1.5vh,1rem)] animate-fade-in-up">
            {children}
          </main>
          <AppFooter />
        </div>
      </div>
    </div>
  );
}
