# Login (`/login`)

## Purpose

Email/password sign-in; redirects authenticated users away; supports post-login redirect from `AuthContext.redirectPath`.

## SEO

- **Path:** `/login`
- **Index:** no (`noindex` in `pageSeo.login`; metadata via `src/app/login/layout.tsx`)
- **Title:** Sign in
- **Description:** Sign in to your account to access the dashboard and protected features.

## Auth

Public. If already authenticated, `useEffect` sends user to `redirectPath` or `/dashboard`.

## Form fields

| Field | Validation | Notes |
|-------|------------|--------|
| email | required | `InputComponent1`, `INPUT_SHELL` |
| password | required | `PasswordInput` |

## Flow

1. Submit → `useLoginMutation` → on success, auth context updated.
2. Query param `error` can show OAuth/error messaging from callback flows.
3. Logout from dashboard sets `sessionStorage.justLoggedOut` (login page may respect messaging if extended).

## APIs

- `src/features/auth/` — login mutation, token handling via context.

## Last updated

Template auth flow with TanStack Query + AuthProvider.
