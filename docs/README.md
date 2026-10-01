# Project documentation

This folder holds **AI- and team-facing docs** for building and maintaining pages in this template.

## Layout

| Path | Purpose |
|------|---------|
| [GLOBAL_PAGE_BUILD_RULES.md](./GLOBAL_PAGE_BUILD_RULES.md) | Cross-page conventions (money, numbers, forms, data fetching, UI shells) |
| [SEO.md](./SEO.md) | Metadata, OG/Twitter, sitemap, robots, JSON-LD, per-page SEO checklist for AI |
| `pages/<route-segment>/README.md` | Business logic, user flows, and technical notes for one App Router page |

## When building or changing a page

1. Read **GLOBAL_PAGE_BUILD_RULES.md** first.
2. Open or create **`docs/pages/<page>/README.md`** for the route you are working on (folder name matches the route segment, e.g. `login`, `dashboard`, `register`).
3. If the page behavior changes, **update that page README** in the same PR or session so future work (human or AI) stays accurate.

The root [README.md](../README.md) summarizes the codebase; this folder captures **product and page-specific** intent.
