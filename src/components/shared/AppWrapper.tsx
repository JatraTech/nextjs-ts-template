"use client";

import SkipToMainLink from "@/components/shared/a11y/SkipToMainLink";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { MAIN_CONTENT_ID } from "@/constants/a11y";
import type { AppWrapperProps } from "@/types/components/shared-types/layout.types";

const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      <SkipToMainLink />
      <div className="fixed top-4 right-4 z-[100000]">
        <ThemeToggle />
      </div>
      <main id={MAIN_CONTENT_ID} className="flex-grow" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
};

export default AppWrapper;
