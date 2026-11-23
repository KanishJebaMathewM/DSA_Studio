import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { ThemeBackground } from "./ThemeBackground";

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh w-full overflow-x-clip justify-center">
      <ThemeBackground />
      {/* Centered workspace container: sidebar and content bottom-aligned to content height */}
      <div className="relative z-10 mx-auto flex w-full md:w-[94%] xl:w-[88%] 2xl:w-[82%] max-w-[1920px] px-2.5 sm:px-4 py-2 md:py-3 gap-2.5 sm:gap-3 md:gap-4 items-stretch">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader title={title} />
          <main className="w-full flex-1 flex flex-col pt-2.5 sm:pt-3 md:pt-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
