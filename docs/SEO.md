# SEO setup (App Router)

This project uses **Next.js Metadata API**, a **central site config**, and **reusable builders** so every page gets correct titles, descriptions, canonical URLs, Open Graph, Twitter cards, robots, sitemap, and optional JSON-LD.

Read this file **before** adding or changing any route that should appear on the public web.

---

## Architecture

| Piece | Location | Role |
|-------|----------|------|
| Site branding & env | `src/constants/site.ts` | Name, URL, locale, OG defaults, verification |
| Page copy & index rules | `src/lib/seo/pageSeo.ts` | One entry per **static** route |
| Metadata builder | `src/lib/seo/metadata.ts` | `buildRootMetadata()`, `buildPageMetadata()` |
| Sitemap source | `src/lib/seo/routes.ts` | Indexable paths (`noindex !== true`) |
| JSON-LD helpers | `src/lib/seo/jsonLd.ts` | Organization, WebSite, WebPage, BreadcrumbList |
| JSON-LD component | `src/components/seo/JsonLd.tsx` | Server-safe `<script type="application/ld+json">` |
| Root defaults | `src/app/layout.tsx` | `export const metadata = buildRootMetadata()` |
| Sitemap / robots / manifest | `src/app/sitemap.ts`, `robots.ts`, `manifest.ts` | Production crawlers & PWA hints |
| Default OG asset | `public/og/default.png` | See `public/og/README.md` |

---

## Environment variables (production)

Set these in **every deployed environment** (Vercel, Docker, etc.). Wrong `NEXT_PUBLIC_SITE_URL` breaks canonical URLs, OG links, and sitemap.

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | **Yes (prod)** | Canonical origin, e.g. `https://www.example.com` (no trailing slash) |
| `NEXT_PUBLIC_SITE_NAME` | Recommended | Brand name in titles & OG |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Recommended | Default meta description |
| `NEXT_PUBLIC_SITE_LOCALE` | Optional | OG locale, e.g. `en_US`, `sv_SE` |
| `NEXT_PUBLIC_SITE_LANGUAGE` | Optional | `<html lang>` and schema `inLanguage`, e.g. `en` |
| `NEXT_PUBLIC_SITE_SHORT_NAME` | Optional | Web manifest short name |
| `NEXT_PUBLIC_DEFAULT_OG_IMAGE` | Optional | Path or URL, default `/og/default.png` |
| `NEXT_PUBLIC_TWITTER_HANDLE` | Optional | `@site` for Twitter cards |
| `NEXT_PUBLIC_TWITTER_CREATOR` | Optional | `@author` |
| `NEXT_PUBLIC_THEME_COLOR` | Optional | Manifest / browser chrome |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Search Console |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Optional | Bing Webmaster |
| `NEXT_PUBLIC_ORG_LEGAL_NAME` | Optional | Schema.org Organization |
| `NEXT_PUBLIC_ORG_CONTACT_EMAIL` | Optional | Schema.org contactPoint |

Copy from `.env.example` and fill values before launch.

---

## Adding SEO to a **new static page**

Use this checklist every time you add `src/app/<segment>/page.tsx`.

### 1. Gather content (product / marketing input)

Collect before coding (put answers in `docs/pages/<segment>/README.md` under **SEO**):

| Field | Guidelines |
|-------|----------------|
| **Primary keyword intent** | What search query or share context is this page for? |
| **Title** | ~50–60 characters; unique; human-readable (not keyword stuffing) |
| **Meta description** | ~150–160 characters; accurate summary; includes a subtle CTA if appropriate |
| **Canonical path** | Usually `/your-path`; use override only for duplicate content |
| **Index?** | Public marketing → index. Auth, app shell, checkout steps, callbacks → **noindex** |
| **Follow?** | Usually `true` unless thin/utility pages should not pass link equity |
| **OG image** | 1200×630; brand-safe; optional per page |
| **OG type** | `website` (default), `article` for blog/posts |
| **Keywords** | Optional; 5–10 relevant phrases max |
| **hreflang** | If you ship multiple locales, map each locale to URL (`languages` in metadata) |
| **Structured data** | WebPage minimum; Product/Article/FAQ/Breadcrumb when content fits [schema.org](https://schema.org) |

### 2. Register the route in code

**A.** Add an entry to `src/lib/seo/pageSeo.ts`:

```ts
export const pageSeo = {
  // ...
  pricing: {
    path: "/pricing",
    title: "Pricing",
    description: "Transparent plans for teams of every size. Compare features and start free.",
    keywords: ["pricing", "plans"],
    openGraph: { type: "website" },
    // noindex: false by default — included in sitemap
  },
} as const satisfies Record<string, PageSeoInput>;
```

**B.** Export metadata from a **Server Component** boundary:

- If `page.tsx` is a Server Component → export metadata there.
- If `page.tsx` is `"use client"` → add `src/app/<segment>/layout.tsx`:

```tsx
import { buildPageMetadata } from "@/lib/seo/metadata";
import { pageSeo } from "@/lib/seo/pageSeo";
import type { ReactNode } from "react";

export const metadata = buildPageMetadata(pageSeo.pricing);

export default function PricingLayout({ children }: { children: ReactNode }) {
  return children;
}
```

**C.** (Optional) JSON-LD on important public pages:

```tsx
import JsonLd from "@/components/seo/JsonLd";
import { buildWebPageJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/jsonLd";

<JsonLd
  data={[
    buildWebPageJsonLd({ path: "/pricing", title: "Pricing", description: "..." }),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Pricing", path: "/pricing" },
    ]),
  ]}
/>
```

**D.** If the page is **indexable**, it is picked up automatically by `getIndexableRoutes()` → `sitemap.ts`. If **noindex**, it is excluded from the sitemap.

**E.** Update `src/app/robots.ts` `disallow` if the path must never be crawled regardless of meta (e.g. `/admin`).

### 3. Update documentation

In `docs/pages/<segment>/README.md`, add:

```md
## SEO

- **Path:** `/pricing`
- **Index:** yes | no (reason)
- **Title:** …
- **Description:** …
- **Primary intent:** …
- **OG image:** `/og/pricing.png` or default
- **Structured data:** WebPage, BreadcrumbList, …
- **Notes:** hreflang, A/B variants, etc.
```

Also add a row to the project's content calendar / CMS if applicable.

---

## **Dynamic** routes (slugs, CMS, products)

Use `generateMetadata` in `page.tsx` (must remain a Server Component, or split: server `page.tsx` + client child).

```tsx
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchItemBySlug(slug); // your API / CMS
  if (!item) return {};

  return buildPageMetadata({
    path: `/items/${slug}`,
    title: item.seoTitle ?? item.name,
    description: item.seoDescription ?? item.summary,
    openGraph: {
      type: "website",
      title: item.seoTitle ?? item.name,
      description: item.seoDescription ?? item.summary,
      image: item.ogImageUrl, // absolute or site-relative
      modifiedTime: item.updatedAt,
    },
    keywords: item.tags,
  });
}

export default async function ItemPage({ params }: Props) {
  const { slug } = await params;
  const item = await fetchItemBySlug(slug);
  if (!item) notFound();
  return <ItemView item={item} />;
}
```

For **dynamic sitemap** entries, extend `src/app/sitemap.ts` to fetch published slugs and merge with `getIndexableRoutes()`.

---

## International / multi-region (hreflang)

1. Implement locale routes (e.g. `/en/...`, `/sv/...`) or subdomains per your routing strategy.
2. Pass `languages` into `buildPageMetadata`:

```ts
buildPageMetadata({
  path: "/en/about",
  title: "About us",
  description: "...",
  canonicalPath: "/en/about",
  languages: {
    "en-US": "/en/about",
    "sv-SE": "/sv/om-oss",
    "x-default": "/en/about",
  },
});
```

3. Mirror the same URLs in page README **SEO** sections so content stays aligned.

---

## Index vs noindex (defaults in this template)

| Route | Index | Notes |
|-------|-------|-------|
| `/` (home) | Yes | Showcase / marketing entry |
| `/login`, `/register` | No | Auth forms — avoid SERP noise |
| `/dashboard` | No | Authenticated app |
| `/auth/callback` | No | OAuth/token handler |

Adjust `pageSeo.ts` when product requirements change.

---

## QA before release

- [ ] `NEXT_PUBLIC_SITE_URL` matches production domain (HTTPS)
- [ ] `public/og/default.png` exists (1200×630) or override set
- [ ] View page source: `<title>`, `meta description`, `link rel="canonical"`
- [ ] Share debugger: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/), [Twitter Card Validator](https://cards-dev.twitter.com/validator) (or X equivalent)
- [ ] `/sitemap.xml` lists only intended public URLs
- [ ] `/robots.txt` allows/disallows as expected
- [ ] Lighthouse SEO audit on key templates
- [ ] JSON-LD validates: [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## AI agent quick checklist (new page)

1. Read **GLOBAL_PAGE_BUILD_RULES.md** and this file.
2. Create/update **`docs/pages/<segment>/README.md`** including **SEO** section (all fields above).
3. Add **`pageSeo.<key>`** in `src/lib/seo/pageSeo.ts`.
4. Export **`metadata`** via `page.tsx` or **`layout.tsx`** (if page is client-only).
5. Set **`noindex` / `nofollow`** appropriately; confirm sitemap behavior.
6. Add **JSON-LD** on high-value public pages when schema type is clear.
7. Update **`robots.ts`** disallow rules for sensitive areas.
8. Never hardcode production URLs in components — use `siteConfig.url` / `buildPageMetadata`.
