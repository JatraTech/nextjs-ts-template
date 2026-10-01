import type { ThemeMode } from "@/constants/themeMode";

export const THEME_COOKIE_NAME = "theme-mode";
const THEME_COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 365;

export function parseThemeCookie(value: string | undefined): ThemeMode | null {
  if (value === "light" || value === "dark") return value;
  return null;
}

/** Client `document.cookie` assignment (no HttpOnly — must match SSR-readable cookie). */
export function writeThemeCookie(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  document.cookie = `${THEME_COOKIE_NAME}=${mode}; path=/; max-age=${THEME_COOKIE_MAX_AGE_SEC}; SameSite=Lax`;
}
