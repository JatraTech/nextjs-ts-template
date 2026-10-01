/**
 * Brand / theme colors — change this file to re-skin the template.
 *
 * Wired automatically to:
 * - CSS variables (`BrandThemeVariables` in layout → `--color-brand`, focus rings, antd.css)
 * - Tailwind (`brand`, `green` scales in tailwind.config.ts)
 * - Ant Design (`AntdConfigProvider` tokens)
 *
 * Surfaces (page bg, cards) stay on Tailwind `slate` + `.dark`; adjust those in globals.css if needed.
 */
export const brandTheme = {
  /** Primary buttons, links, Ant Design `colorPrimary`, focus rings */
  primary: "#27a376",
  /** Hover / active primary */
  primaryHover: "#1d7a59",
  /** Secondary brand (outlines, accents) */
  primaryMuted: "#166b4a",
  /** Text/icons on primary backgrounds */
  onPrimary: "#ffffff",
  /** Ant Design `colorInfo`, overlay headers (blue bar) */
  accent: "#2a3653",
  accentDark: "#1e293b",
  /** Dark-mode Ant Design primary (can match primary or soften) */
  primaryDarkMode: "#27a376",
} as const;

export type BrandTheme = typeof brandTheme;

/** CSS custom properties injected on `:root` (see `BrandThemeVariables.tsx`). */
export function getBrandCssVariableBlock(): string {
  const t = brandTheme;
  return `:root {
  --color-brand: ${t.primary};
  --color-brand-hover: ${t.primaryHover};
  --color-brand-muted: ${t.primaryMuted};
  --color-on-brand: ${t.onPrimary};
  --color-accent: ${t.accent};
  --Foundation-Green-medium: ${t.primary};
  --Foundation-Green-Dark: ${t.primaryHover};
}`;
}
