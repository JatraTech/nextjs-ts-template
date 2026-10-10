/**
 * Site-wide branding and SEO defaults (env-driven for production).
 * Set `NEXT_PUBLIC_SITE_URL` to your canonical origin in every deployed environment.
 */

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Next.js Boilerplate",
  shortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME?.trim() || "Boilerplate",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION?.trim() ||
    "Production-ready Next.js starter with Ant Design, TanStack Query, and shared UI patterns.",
  /** Canonical site origin — no trailing slash */
  url: trimTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  ),
  locale: process.env.NEXT_PUBLIC_SITE_LOCALE?.trim() || "en_US",
  language: process.env.NEXT_PUBLIC_SITE_LANGUAGE?.trim() || "en",
  /** BCP 47 tags for hreflang, e.g. { "en-US": "/", "sv-SE": "/sv" } — extend per locale routes */
  defaultAlternateLanguages: {} as Record<string, string>,
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE?.trim() || "",
  creatorHandle: process.env.NEXT_PUBLIC_TWITTER_CREATOR?.trim() || "",
  /** Relative path under `public/` or absolute URL */
  defaultOgImagePath: process.env.NEXT_PUBLIC_DEFAULT_OG_IMAGE?.trim() || "/og/default.png",
  themeColor: process.env.NEXT_PUBLIC_THEME_COLOR?.trim() || "#27a376",
  backgroundColor: process.env.NEXT_PUBLIC_BACKGROUND_COLOR?.trim() || "#ffffff",
  /** Google Search Console, Bing, etc. — optional verification strings */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION?.trim() || "",
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim() || "",
  },
  /** Legal / contact for Organization schema */
  organization: {
    legalName: process.env.NEXT_PUBLIC_ORG_LEGAL_NAME?.trim() || "",
    email: process.env.NEXT_PUBLIC_ORG_CONTACT_EMAIL?.trim() || "",
    logoPath: process.env.NEXT_PUBLIC_ORG_LOGO_PATH?.trim() || "/og/default.png",
  },
} as const;

export type SiteConfig = typeof siteConfig;
