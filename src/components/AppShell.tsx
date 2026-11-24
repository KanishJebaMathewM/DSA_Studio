import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { ThemeBackground } from "./ThemeBackground";

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh w-full overflow-x-clip">
      <ThemeBackground />
      {/* Full-width proportional responsive workspace */}
      <div className="relative z-10 flex min-h-[calc(100dvh-1rem)] md:min-h-[calc(100dvh-1.5rem)] w-full px-2.5 sm:px-4 md:px-5 lg:px-6 py-2 md:py-3 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 items-stretch">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader title={title} />
          <main className="w-full pt-[clamp(0.5rem,1.5vh,1rem)] pb-[clamp(0.75rem,2.5vh,1.75rem)]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
