import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isLoading = useRouterState({ select: (r) => r.isLoading || r.status === "pending" });

  return (
    <SidebarProvider>
      {/* Prominent top loading bar on route navigation */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_14px_rgba(99,102,241,0.9)] animate-pulse" />
      )}

      <div className="flex min-h-screen w-full bg-background dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.07),transparent)]">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader title={title} />
          <main
            key={pathname}
            className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-6 md:py-8 animate-in fade-in-50 slide-in-from-bottom-2 duration-300 ease-out fill-mode-both"
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
