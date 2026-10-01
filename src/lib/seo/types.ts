import type { Metadata } from "next";

/** Inputs for `buildPageMetadata` — one object per route or dynamic page. */
export type PageSeoInput = {
  /** App Router path starting with `/`, no trailing slash (except `/`). */
  path: string;
  /** Page title (short, unique). Site name is appended via title template when enabled. */
  title: string;
  /** Meta description (~150–160 chars for SERP; can be longer for OG). */
  description: string;
  /** When true (default), layout title template adds `| Site name`. Set false for home-only full title. */
  useTitleTemplate?: boolean;
  /** Exclude from sitemap and set robots noindex when true */
  noindex?: boolean;
  nofollow?: boolean;
  keywords?: string[];
  openGraph?: {
    type?: "website" | "article" | "profile";
    title?: string;
    description?: string;
    /** Path or absolute URL */
    image?: string;
    imageAlt?: string;
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    card?: "summary" | "summary_large_image";
  };
  /** Override canonical URL path or full URL */
  canonicalPath?: string;
  /** hreflang map: locale tag → absolute URL or path on this site */
  languages?: Record<string, string>;
  /** Extra Next Metadata merged last */
  overrides?: Metadata;
};

export type IndexableRoute = {
  path: string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  lastModified?: Date | string;
};
