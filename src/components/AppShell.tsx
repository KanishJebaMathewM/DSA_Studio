import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { ThemeBackground } from "./ThemeBackground";

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh w-full overflow-x-clip justify-center">
      <ThemeBackground />
      {/* Proportional, responsive workspace filling available viewport without unnecessary gaps */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-1rem)] md:min-h-[calc(100dvh-1.5rem)] w-full max-w-[2200px] px-2.5 sm:px-4 md:px-5 lg:px-6 py-2 md:py-3 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 items-stretch">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col min-h-full">
          <AppHeader title={title} />
          <main className="w-full flex-1 flex flex-col pt-2.5 sm:pt-3 md:pt-3">
            <div className="flex flex-1 flex-col">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
