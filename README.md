# Next.js Boilerplate

Production-oriented starter for client apps: **Next.js 16**, **React 19**, **Ant Design 5**, **Tailwind CSS 4**, **TanStack Query**, and **React Hook Form**. Includes auth flows, a component showcase, dark mode, and shared UI patterns ported from internal product work.

## Start here — tailor the template first (recommended)

**Before** `bun install` and `bun dev`, decide what this repo should become for *your* product. The boilerplate ships extra demos and optional stacks on purpose; trimming or rebranding upfront avoids dead code, unused env vars, and wrong docs for AI later.

You can do this yourself or **ask Cursor / another AI** in the project folder. Point it at this README and `docs/` — especially [GLOBAL_PAGE_BUILD_RULES.md](./docs/GLOBAL_PAGE_BUILD_RULES.md), [THEMING.md](./docs/THEMING.md), and [SEO.md](./docs/SEO.md) when relevant.

### What you might keep, remove, or replace

| Area | Default in template | If you don’t need it |
|------|---------------------|----------------------|
| **Demo / showcase** | `/` → `UiShowcase`, `src/components/demo/` | Remove showcase; set `/` to your real landing or redirect; delete `docs/pages/home/` |
| **SEO** | `src/lib/seo/`, `sitemap.ts`, `robots.ts`, `manifest.ts`, route `layout.tsx` metadata | Remove SEO module + docs; simplify `app/layout.tsx` metadata to a static title/description |
| **TanStack Query** | `QueryProvider`, `src/features/*`, `src/lib/queryClient.ts` | Remove provider + feature folders; fetch inside Server Components or add **Redux / Zustand / SWR** instead |
| **Redux** | **Not included** | Add only if you need it; template uses Query + React context for auth |
| **Auth shell** | login, register, dashboard, `AuthContext`, `ProtectedRoute`, `src/features/auth/` | Remove routes and guards if the app is fully public or uses an external IdP only |
| **Brand / theme** | `src/constants/brandTheme.ts`, Tailwind `brand` tokens, [THEMING.md](./docs/THEMING.md) | Set project colors/names once; update `site.ts` + `.env` for SEO/branding |
| **Toasts / top loader** | `react-toastify`, `nextjs-toploader` | Remove packages and `ExternalOverlays` / loader wiring if unused |
| **Docs for AI** | `docs/` per-page READMEs | Delete or rewrite for your routes so future prompts stay accurate |
| **React Query Devtools** | devDependency, in `QueryProvider` | Remove from provider and `package.json` for production-only repos |

Keep **Ant Design + React 19 patch** (`src/providers/AntdRegistry.tsx`) unless you drop antd entirely. Keep shared **form components** under `src/components/antd/` if you still build admin/marketing forms.

### Example prompts to give AI (copy and edit)

Use one focused prompt per session. Replace bracketed placeholders.

**Full project brief (good first message):**

```text
We are turning this nextjs-template into [PRODUCT NAME].

Before I run bun install:
1. Remove the component showcase: delete UiShowcase, make [ROUTE e.g. /] the [landing/dashboard], update app routes.
2. [Keep | Remove] SEO setup — if remove, strip src/lib/seo, sitemap, robots, manifest, and related docs.
3. [Keep | Remove] TanStack Query and src/features/auth — if remove, strip QueryProvider and auth pages; we will use [Server Components only | Redux | other].
4. Rebrand: set brandTheme.ts to primary [HEX], site name [NAME], update .env.example.
5. Update README and docs/pages for the routes we keep.

Follow docs/GLOBAL_PAGE_BUILD_RULES.md. Do not commit unless I ask.
```

**Demo only:**

```text
Remove the demo showcase at /. Replace home with a minimal marketing page for [PRODUCT]. Delete src/components/demo and docs/pages/home. Wire SEO in pageSeo.ts for the new home. No git commit.
```

**SEO off (internal app):**

```text
This is an internal app — remove SEO infrastructure (src/lib/seo, sitemap, robots, manifest, JsonLd, pageSeo registry), simplify root metadata, update docs/SEO.md to say SEO was intentionally removed. Keep the rest of the stack.
```

**Theme only:**

```text
Rebrand this template: primary [HEX], hover [HEX], accent [HEX] in brandTheme.ts; update NEXT_PUBLIC_SITE_* in .env.example and site.ts defaults for [COMPANY NAME]. See docs/THEMING.md.
```

**Swap data layer:**

```text
Remove TanStack Query: QueryProvider, queryClient, queryKeys, react-query devtools, and src/features/* hooks. Keep apiClient.ts. Use [fetch in Server Components | add Redux Toolkit with ...]. Update README data-fetching section.
```

After tailoring, run install and dev:

## Quick start

```bash
bun install
cp .env.example .env   # set NEXT_PUBLIC_API_URL and SEO/site vars for production
bun dev                # http://localhost:5173
```

Other scripts: `bun run build`, `bun start`, `bun run lint`.

**React 19 + Ant Design 5:** the official compatibility patch [`@ant-design/v5-patch-for-react-19`](https://github.com/ant-design/v5-patch-for-react-19) is imported in `src/providers/AntdRegistry.tsx` (load before any `antd` components).

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL for REST calls (`src/lib/api/apiClient.ts`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin for SEO, OG, sitemap (required in production) |
| `NEXT_PUBLIC_SITE_NAME` | Brand name in titles and social cards |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Default meta description |

See [docs/SEO.md](./docs/SEO.md) and `.env.example` for the full SEO-related env list.

## Documentation (`docs/`)

Page-building rules and per-route notes for humans and AI live under **`docs/`**:

| File | Purpose |
|------|---------|
| [docs/README.md](./docs/README.md) | How the docs folder is organized |
| [docs/GLOBAL_PAGE_BUILD_RULES.md](./docs/GLOBAL_PAGE_BUILD_RULES.md) | Money (`$` prefix), comma formatting, forms, Query, selects, dark mode |
| [docs/ACCESSIBILITY.md](./docs/ACCESSIBILITY.md) | Labels, focus, keyboard, form ARIA, testing checklist |
| [docs/THEMING.md](./docs/THEMING.md) | Brand colors — single-file re-skin |
| [docs/SEO.md](./docs/SEO.md) | Metadata, sitemap, robots, JSON-LD, per-page SEO for AI |
| [docs/pages/&lt;route&gt;/README.md](./docs/pages/) | Business logic and flows for each App Router page |

When you add or change a page, read the global rules, then create or update the matching **`docs/pages/.../README.md`**.

## Project structure

```
docs/                       # Global + per-page build docs (see above)
src/
├── app/                    # App Router pages (login, register, dashboard, showcase)
├── assets/
├── components/
│   ├── antd/               # Ant Design wrappers (inputs, modals, tables, …)
│   ├── common/             # Non-ant shared UI (e.g. pagination)
│   ├── demo/               # UiShowcase — living style reference
│   └── shared/             # App shell, buttons, theme, loaders, overlays
├── constants/              # API base URL, date formats, input shells, images
├── context/                # AuthProvider, ThemeProvider (client state)
├── features/               # Feature modules (API + hooks) — see Data fetching
│   ├── auth/
│   └── user/
├── hooks/                  # Generic hooks (e.g. useDebounce)
├── lib/                    # Query client, query keys, apiClient, token storage, `seo/`
├── providers/              # AntdRegistry (React 19 patch), QueryProvider, AntdConfigProvider
├── styles/                 # globals.css, antd.css
├── types/                  # Shared TypeScript types (auth, user, api, components)
└── utils/                  # Errors, toasts, dates, number formatting
```

### Types vs components

Component prop types live under **`src/types/components/`** with explicit folder names so they are not confused with runtime components:

- `antd-types/` — Ant Design field & table types  
- `shared-types/` — layout, buttons  
- `common-types/` — pagination, forms  

Import example:

```ts
import type { InputComponent1Props } from "@/types/components/antd-types/rhf-field.types";
```

## Data fetching: TanStack Query (default) vs Redux

This template **ships with TanStack Query** and **no Redux**. That matches a typical Next.js app: server state in the cache, minimal boilerplate, and colocated feature hooks.

### TanStack Query (recommended here)

| Piece | Location |
|-------|----------|
| Client & defaults | `src/lib/queryClient.ts` |
| Query key factory | `src/lib/queryKeys.ts` |
| HTTP layer | `src/lib/api/apiClient.ts` |
| Auth API + hooks | `src/features/auth/` |
| User API + hooks | `src/features/user/` |
| App wrapper | `src/providers/QueryProvider.tsx` |

**Adding a new resource**

1. Add keys in `src/lib/queryKeys.ts`.
2. Add `src/features/<name>/api/<name>.api.ts` using `apiRequest`.
3. Add `src/features/<name>/hooks/use<Name>.ts` with `useQuery` / `useMutation`.
4. Invalidate related keys in `onSuccess` / `onSettled`.

Example:

```ts
import { useUsersQuery } from "@/features/user/hooks";

const { data, isLoading, error } = useUsersQuery({ page: 1, limit: 10 });
```

```ts
import { useLoginMutation } from "@/features/auth/hooks";
import { useAuth } from "@/context/AuthContext";

const login = useLoginMutation();
await login.mutateAsync({ email, password });
```

**Auth session (not in React Query cache by default)**  
Token, user, and redirect path live in **`AuthProvider`** (`src/context/AuthContext.tsx`). Mutations such as login update both context and `queryKeys.auth.me` where needed.

### If you prefer Redux instead

Redux is **not included**, but you can add it alongside or instead of Query:

1. Install `@reduxjs/toolkit` and `react-redux`.
2. Add `src/store/store.ts` and a `StoreProvider` in `app/layout.tsx`.
3. Move **client-only** UI state (auth slice, UI preferences) into slices.
4. Keep **server state** either in RTK Query (inside RTK) or stay on TanStack Query — avoid duplicating the same data in two caches.

**Practical split**

- **TanStack Query only** — simplest; use Context for auth (as now).  
- **Redux + RTK Query** — one stack for global client state + API.  
- **Redux + TanStack Query** — Redux for UI/auth; Query for server data (document team conventions).

## Forms: React Hook Form vs plain inputs

Most antd inputs support **both** patterns via an optional `control` prop.

### With React Hook Form (login, register, showcase)

```tsx
"use client";

import { useForm } from "react-hook-form";
import InputComponent1 from "@/components/antd/Inputs/InputComponent1";
import { INPUT_SHELL } from "@/constants/inputShell";

type FormValues = { email: string };

export function Example() {
  const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { email: "" } });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <InputComponent1
        name="email"
        control={control}
        validation
        rules={{ required: "Email is required" }}
        inputContainerClassName={INPUT_SHELL}
      />
    </form>
  );
}
```

Use **`name`**, **`control`**, **`validation`**, and **`rules`** for integrated errors. Password and select fields follow the same pattern (`PasswordInput`, `SelectComponent1`).

### Without React Hook Form (controlled or uncontrolled)

Omit `control`. Pass **`value`**, **`onChange`**, and optional **`name`**:

```tsx
<InputComponent1
  name="quantity"
  type="number"
  value={qty}
  onChange={(e) => setQty(e.target.value)}
  inputContainerClassName={INPUT_SHELL}
/>
```

Search fields and demo inputs often use this style.

## Images

**`AppImage`** (`src/components/shared/AppImage.tsx`) wraps **`next/image`** with lazy loading (default), a grey **skeleton** while loading, and optional border/radius on the wrapper.

```tsx
import AppImage from "@/components/shared/AppImage";

<AppImage
  src="/hero.jpg"
  alt="Hero"
  width={320}
  height={180}
  roundedClassName="rounded-lg"
  borderClassName="border border-shark-300 dark:border-slate-600"
  className="object-cover"
/>;

// Fill a sized parent:
<div className="relative h-48 w-full">
  <AppImage src={url} alt="" fill sizes="(max-width:768px) 100vw, 50vw" roundedClassName="rounded-xl" />
</div>
```

Props: `src`, `width`, `height`, `alt`, `fill`, `priority`, `className`, `containerClassName`, `borderClassName`, `roundedClassName`, `showSkeleton`, `skeletonClassName`. Types: `src/types/components/shared-types/image.types.ts`.

## Input conventions

### Shell styling

Shared bordered wrapper for auth and forms:

```ts
import { INPUT_SHELL } from "@/constants/inputShell";
```

Pass as `inputContainerClassName` (inputs) or `selectContainerClassName` / `selectClassName` (selects).

### Selects

**Static lists — `SelectComponent1`**

- Client-side search is **on by default** (`showSearch`); override `filterOption` or set `showSearch={false}` to disable.
- Works with or without React Hook Form (`control` + `validation` + `rules`).

**Remote search + infinite scroll**

| Piece | Location |
|-------|----------|
| Core UI | `src/components/antd/Selects/InfiniteSearchSelect.tsx` |
| RHF wrapper | `SelectComponentWithInfiniteScroll.tsx` |
| Pagination hook | `src/hooks/useInfiniteSelectOptions.ts` |
| Types | `src/types/components/antd-types/infinite-select.types.ts` |

Provide `options`, `loading`, `loadingMore`, `hasMore`, `onSearch`, and `onScrollEnd` (from the hook or your own fetcher). The dropdown supports custom top/bottom actions, avatars, collapsed selected labels, and portals to `document.body` for modals.

Example:

```tsx
const { options, loading, loadingMore, hasMore, onSearch, onScrollEnd } =
  useInfiniteSelectOptions({ fetchPage: async ({ page, search }) => ({ options: [...], hasMore: true }) });

<SelectComponentWithInfiniteScroll
  name="ownerId"
  control={control}
  options={options}
  loading={loading}
  loadingMore={loadingMore}
  hasMore={hasMore}
  onSearch={onSearch}
  onScrollEnd={onScrollEnd}
  selectClassName={INPUT_SHELL}
  bordered={false}
/>;
```

See **`UiShowcase`** for a mocked paginated member list.

### Number inputs

- **`type="number"`** — mouse wheel no longer changes value while focused (blur on wheel). Spinner buttons are hidden in CSS.
- **`numberFormat`** on `InputComponent1`:
  - `"currency"` → `$` prefix  
  - `"percent"` → `%` suffix  
  - `"plain"` — default  

Override with explicit `prefix` / `suffix` when needed.

```tsx
<InputComponent1
  name="price"
  type="number"
  numberFormat="currency"
  control={control}
/>
```

### Readonly / display numbers

```ts
import {
  formatNumberWithCommas,
  formatReadonlyNumber,
} from "@/utils/formatValue";

formatNumberWithCommas(2000000);           // "2,000,000"
formatReadonlyNumber(2000000, "currency"); // "$2,000,000"
formatReadonlyNumber(42, "percent");       // "42%"
```

## Date & time

Constants (`src/constants/dateTime.ts`):

```ts
export const DATE_TIME_PICKER_FORMAT = "MMM DD, YYYY h:mm A";
export const DATE_TIME_API_FORMAT = "YYYY-MM-DDTHH:mm:ssZ";
```

- **DatePickerComponent1** defaults to `DATE_TIME_PICKER_FORMAT` for display.
- Helpers in `src/utils/convertDate.ts`:
  - `convertDateWithTime` — picker-style string  
  - `convertDateForApi` — API-style string  
  - `convertDateToISO` — ISO string  

## Theming & dark mode

**Change brand color (buttons, links, Ant Design primary, focus rings):** edit **[`src/constants/brandTheme.ts`](src/constants/brandTheme.ts)** only — see **[docs/THEMING.md](docs/THEMING.md)**.

- **CSS variables:** `BrandThemeVariables` injects `--color-brand` from `brandTheme.ts`.
- **Tailwind:** `bg-brand`, `text-brand`, `hover:bg-brand-hover` (config reads `brandTheme.ts`).
- **Ant Design:** `AntdConfigProvider` uses the same `brandTheme` tokens.
- **Dark mode:** `darkMode: "class"`; toggle via `ThemeProvider` + `ThemeToggle`; Ant `darkAlgorithm` + `antd.css` under `.dark`.
- **FOUC:** `ThemeScript` applies saved light/dark before paint.

## Auth & protected routes

| Item | Location |
|------|----------|
| Login / register / callback | `src/app/login`, `register`, `auth/callback` |
| Session | `AuthProvider`, `useAuth()` |
| Route guard | `ProtectedRoute` wraps dashboard (pattern for other private pages) |

## UI reference

Home page **`UiShowcase`** (`src/components/demo/UiShowcase.tsx`) demonstrates buttons, RHF fields, searchable and infinite scroll selects, search inputs, overlays, tables, and more.

## Key dependencies

| Package | Role |
|---------|------|
| `next` | Framework (App Router) |
| `antd` / `@ant-design/icons` | UI kit |
| `@tanstack/react-query` | Server/async state |
| `react-hook-form` | Forms |
| `dayjs` | Dates |
| `react-toastify` | Toasts (`ToastMessage` util) |
| `nextjs-toploader` | Route progress bar |

## License

Private template — use and adapt within your organization.
