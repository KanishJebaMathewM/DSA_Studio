import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { ThemeBackground } from "./ThemeBackground";

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh w-full overflow-x-clip">
      <ThemeBackground />
      <AppSidebar />
      <div className="relative z-10 flex min-w-0 flex-1 flex-col min-h-dvh">
        <AppHeader title={title} />
        <main className="w-full max-w-[2400px] flex-1 flex flex-col px-2.5 py-3 sm:px-4 sm:py-4 md:px-6 md:pb-8">
          <div className="flex flex-1 flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
