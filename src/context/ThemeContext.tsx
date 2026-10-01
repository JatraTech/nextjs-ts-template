"use client";

import { writeThemeCookie } from "@/utils/themeCookie";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { THEME_STORAGE_KEY, type ThemeMode } from "@/constants/themeMode";

export type { ThemeMode } from "@/constants/themeMode";
export { THEME_STORAGE_KEY } from "@/constants/themeMode";

const THEME_CHANGE_EVENT = "app-theme-change";

type ThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredMode(): ThemeMode {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyDocumentTheme(mode: ThemeMode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
  document.documentElement.style.colorScheme = mode;
  localStorage.setItem(THEME_STORAGE_KEY, mode);
  writeThemeCookie(mode);
}

/** Matches `ThemeScript` — reads class already applied before React hydrates. */
function getClientThemeSnapshot(): ThemeMode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}


function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function notifyThemeChange() {
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function ThemeProvider({
  children,
  initialMode = "light",
}: {
  children: ReactNode;
  /** From SSR cookie — must match the theme used for Ant Design on the server. */
  initialMode?: ThemeMode;
}) {
  const mode = useSyncExternalStore(
    subscribeToTheme,
    getClientThemeSnapshot,
    () => initialMode,
  );

  const setMode = useCallback((next: ThemeMode) => {
    applyDocumentTheme(next);
    notifyThemeChange();
  }, []);

  const toggleMode = useCallback(() => {
    const next = getClientThemeSnapshot() === "dark" ? "light" : "dark";
    setMode(next);
  }, [setMode]);

  const value = useMemo(
    () => ({
      mode,
      isDark: mode === "dark",
      setMode,
      toggleMode,
    }),
    [mode, setMode, toggleMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

/** Client-only bootstrap when `ThemeScript` did not run (e.g. tests). */
export function syncThemeFromStorage() {
  if (typeof window === "undefined") return;
  applyDocumentTheme(readStoredMode());
  notifyThemeChange();
}
