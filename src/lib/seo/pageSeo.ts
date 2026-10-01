import type { PageSeoInput } from "./types";

/**
 * Static route SEO definitions. For new pages, add an entry here and export metadata
 * from the route's `page.tsx` or `layout.tsx` via `buildPageMetadata(pageSeo.x)`.
 */
export const pageSeo = {
  home: {
    path: "/",
    title: "Next.js Boilerplate — Component showcase & starter",
    description:
      "Explore shared UI components, forms, tables, and overlays built with Next.js, Ant Design, and TanStack Query.",
    useTitleTemplate: false,
    keywords: [
      "Next.js template",
      "React UI components",
      "Ant Design",
      "TanStack Query",
    ],
    openGraph: {
      type: "website",
      title: "Next.js Boilerplate — Component showcase",
    },
  },
  login: {
    path: "/login",
    title: "Sign in",
    description: "Sign in to your account to access the dashboard and protected features.",
    noindex: true,
    nofollow: false,
  },
  register: {
    path: "/register",
    title: "Create account",
    description: "Register a new account to get started with the application.",
    noindex: true,
    nofollow: false,
  },
  dashboard: {
    path: "/dashboard",
    title: "Dashboard",
    description: "Your authenticated workspace. Protected application area.",
    noindex: true,
    nofollow: true,
  },
  authCallback: {
    path: "/auth/callback",
    title: "Completing sign in",
    description: "OAuth and token callback handler. Not intended for indexing.",
    noindex: true,
    nofollow: true,
  },
} as const satisfies Record<string, PageSeoInput>;

export type PageSeoKey = keyof typeof pageSeo;
