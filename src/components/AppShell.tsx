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
      {/* Top loading bar on route navigation */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-gradient-to-r from-amber-700 via-amber-500 to-yellow-400 animate-pulse" />
      )}

      <div className="flex min-h-screen w-full bg-background">
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
