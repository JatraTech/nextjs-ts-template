# Register (`/register`)

## Purpose

User registration with extended form fields (text, password, checkbox, textarea, date picker) demonstrating non-login field components.

## SEO

- **Path:** `/register`
- **Index:** no (`pageSeo.register`; `src/app/register/layout.tsx`)

## Auth

Public (typical). Redirect behavior should mirror login once wired to a real register API.

## Form fields

Follow patterns on the page: RHF `control`, `validation`, `rules`, and `INPUT_SHELL` for bordered controls. Date fields use `DATE_TIME_PICKER_FORMAT`; submit payloads should use API date helpers when backend exists.

## APIs

- Extend `src/features/auth/` or add `register` mutation when connecting to a real service.

## Last updated

Template registration UI — confirm API contract when backend is added.
