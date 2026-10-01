# Global page build rules

Follow these rules whenever you add or modify an App Router page in this project. Pair them with the page-specific doc under `docs/pages/<route>/README.md`.

## Before you code

1. Read this file.
2. Read **[SEO.md](./SEO.md)** for metadata, sitemap, and structured data (required for every new route).
3. Read `docs/pages/<your-page>/README.md`. If it does not exist, create it with: purpose, routes, auth requirements, main APIs, form fields, edge cases, and an **SEO** section (see SEO.md).
4. After implementation, update the page README with any new behavior, validation rules, or API contracts.

## Display & formatting

| Concern | Rule |
|---------|------|
| **Currency / price** | Prefix **`$`**. Use `numberFormat="currency"` on `InputComponent1` or `formatReadonlyNumber(value, "currency")` for read-only text. |
| **Large numbers** | Show **comma grouping** via `formatNumberWithCommas` or `formatReadonlyNumber` — do not hand-format strings. |
| **Percent** | Suffix **`%`** (`numberFormat="percent"` or `formatReadonlyNumber(..., "percent")`). |
| **Dates (UI)** | Default picker display: `DATE_TIME_PICKER_FORMAT` from `@/constants/dateTime`. |
| **Dates (API)** | Send `convertDateForApi` / ISO helpers from `@/utils/convertDate`. |

## Forms

- Prefer **React Hook Form** with shared antd wrappers (`InputComponent1`, `PasswordInput`, `SelectComponent1`, `SelectComponentWithInfiniteScroll`, etc.).
- Pass **`validation`** + **`rules`** when using `control`; show errors via existing field patterns on each page.
- Use **`INPUT_SHELL`** (or the same token classes) for bordered inputs and selects on auth/marketing forms unless the design system section explicitly uses another shell.
- Required fields: clear `required` messages; match backend field names when integrating real APIs.
- Submit: use mutation hooks from `src/features/*`; surface errors with `handleApiError` / toasts where the page already does.

## Data & state

- **Server/async data:** TanStack Query in `src/features/<name>/` — add keys in `queryKeys.ts`, API in `*.api.ts`, hooks in `hooks/`.
- **Auth session:** `useAuth()` / `AuthProvider` — not Redux.
- **Protected pages:** wrap with `ProtectedRoute` (see dashboard).

## Selects

- **Static or small lists:** `SelectComponent1` with **`showSearch`** (default on) for client-side filter.
- **Remote search + pagination:** `InfiniteSearchSelect` or RHF wrapper **`SelectComponentWithInfiniteScroll`** + **`useInfiniteSelectOptions`** (`fetchPage` returns `{ options, hasMore }`).

## UI & interaction

- Primary actions: **`ButtonFilled`** / **`ButtonOutlined`** (pointer cursor when enabled).
- **Dark mode:** use Tailwind `dark:` variants and existing antd overrides in `src/styles/antd.css`.
- **Modals/drawers:** prefer `GlobalModal`, `GlobalDrawer`, `ConfirmationModal` for consistency.
- Infinite selects inside modals: rely on default `getPopupContainer` → `document.body` to avoid clipping.

## Accessibility & UX

Full guide: **[ACCESSIBILITY.md](./ACCESSIBILITY.md)**.

- Use shared field primitives (`FieldLabel`, `FieldErrorMessage`, `fieldControlId` from `@/utils/a11y/fieldA11y`).
- Associate labels with fields (`label` + matching control `id`); use `hint` for helper copy.
- Validation errors: `role="alert"`, `aria-invalid`, `aria-describedby` (built into standard antd field wrappers).
- Keyboard: all actions reachable; visible `:focus-visible` (do not remove focus rings without replacement).
- Color is not the only indicator of errors or required fields (asterisk + “required” in sr-only text on labels).
- Loading states on mutations (`loading` on buttons, query `isPending`).
- Empty and error states for lists and tables — do not leave silent failures.

## File & route conventions

- Pages live under `src/app/<segment>/page.tsx`.
- Colocate page-only components under `src/app/<segment>/` or `src/components/` if reused.
- Document the route in `docs/pages/<segment>/README.md` using the same folder name as the URL segment (e.g. `auth/callback` → `docs/pages/auth-callback/` or nested `docs/pages/auth/callback/` — prefer flat segment names matching primary URL: `login`, `register`, `dashboard`, `home`).

## SEO (summary)

Full guide: **[SEO.md](./SEO.md)**. Minimum for each new page:

- [ ] Entry in `src/lib/seo/pageSeo.ts`
- [ ] `export const metadata = buildPageMetadata(...)` in server `page.tsx` or route `layout.tsx`
- [ ] `docs/pages/<segment>/README.md` **SEO** block filled (title, description, index yes/no)
- [ ] Production `NEXT_PUBLIC_SITE_URL` documented for deploy

## Checklist (copy into page README when relevant)

- [ ] Page README read/updated (including SEO section)
- [ ] Auth/guard behavior documented
- [ ] Form validation aligned with API
- [ ] Money/numbers/dates formatted per rules above
- [ ] Query keys and invalidation defined for new resources
