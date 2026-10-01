# Dashboard (`/dashboard`)

## Purpose

Authenticated home after login — shows user context and logout.

## SEO

- **Path:** `/dashboard`
- **Index:** no, **nofollow:** yes (`pageSeo.dashboard`; excluded from sitemap)

## Auth

**Required.** Wrapped in `ProtectedRoute`; unauthenticated users redirect to login.

## Business logic

- Display current user from `useAuth()`.
- Logout: `useLogoutMutation`; on failure still clears local session; toast + redirect to `/login`.
- Link back to `/` (showcase).

## APIs

- Logout via `src/features/auth/hooks`.

## Last updated

Template protected dashboard shell.
