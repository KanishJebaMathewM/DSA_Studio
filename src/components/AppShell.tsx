
import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { OpenSourceFooter } from "./OpenSourceFooter";

  return (
    <div className="relative flex min-h-dvh w-full overflow-x-clip">
      <ThemeBackground />
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader title={title} />

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-6 md:py-8">
          {children}
        </main>

        <OpenSourceFooter />
      </div>
    </div>
  );
}
