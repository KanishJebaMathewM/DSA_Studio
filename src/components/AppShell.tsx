import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { ThemeBackground } from "./ThemeBackground";

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh w-full overflow-x-clip">
      <ThemeBackground />
      <AppSidebar />
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <AppHeader title={title} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
