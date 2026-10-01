# Home (`/`)

## Purpose

Landing route that renders **`UiShowcase`** — a living catalog of shared buttons, form fields, search inputs, overlays, tables, and select variants (including infinite scroll demo).

## Auth

Public. No `ProtectedRoute`.

## Business logic

- Demonstrates template components for developers and AI reference; form submit only logs/previews JSON locally (no API).
- Links to login/register/dashboard as documented in the showcase UI.

## SEO

- **Path:** `/`
- **Index:** yes (included in `/sitemap.xml`)
- **Title:** Next.js Boilerplate — Component showcase & starter
- **Description:** Explore shared UI components, forms, tables, and overlays (see `pageSeo.home` in `src/lib/seo/pageSeo.ts`).
- **Primary intent:** Developer / evaluator discovering the template component library
- **OG image:** default `/og/default.png`
- **Structured data:** Organization, WebSite, WebPage JSON-LD on `src/app/page.tsx`

## Technical notes

- Server entry: `src/app/page.tsx` (metadata + JSON-LD) → client `UiShowcase`.
- Demo form uses RHF with `SelectComponent1` (searchable static roles) and optional infinite-select demo section.

## Last updated

Template bootstrap — showcase and component demos.
