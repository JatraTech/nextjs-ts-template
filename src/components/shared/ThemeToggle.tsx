"use client";

import CustomSwitch from "@/components/antd/Switch/CustomSwitch";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const hydrated = useHydrated();
  const { isDark, setMode } = useTheme();

  if (!hydrated) {
    return (
      <div
        className={`h-9 w-[4.5rem] rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-1.5 shadow-sm ${className}`}
    >
      <Sun
        className={`w-4 h-4 ${isDark ? "text-slate-500" : "text-amber-500"}`}
        strokeWidth={2}
        aria-hidden
      />
      <CustomSwitch
        checked={isDark}
        onChange={(checked: boolean) => setMode(checked ? "dark" : "light")}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      />
      <Moon
        className={`w-4 h-4 ${isDark ? "text-blue-300" : "text-slate-400"}`}
        strokeWidth={2}
        aria-hidden
      />
    </div>
  );
}
