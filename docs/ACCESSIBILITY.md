# Accessibility (a11y)

This template targets **WCAG-oriented** front-end patterns: semantic structure, keyboard use, visible focus, labeled forms, and meaningful ARIA only where HTML is not enough.

## Built into the template

| Area | Implementation |
|------|----------------|
| **Skip link** | `SkipToMainLink` → `#main-content` in `AppWrapper` |
| **Landmarks** | `<main id="main-content">` wraps page content |
| **Focus** | Global `:focus-visible` ring; `FOCUS_RING_CLASS` on shared buttons |
| **Form fields** | `FieldLabel`, `FieldErrorMessage`, `FieldHint`; stable `id`s via `fieldA11y` utils |
| **RHF fields** | `InputComponent1`, `PasswordInput`, `SelectComponent1`, `SelectComponentWithInfiniteScroll`, `DatePickerComponent1`, `TextAreaComponent1`, `CheckboxComponent`, `PhoneNumberInput`, `OTPInput` |
| **Overlays** | `GlobalModal`, `ConfirmationModal`, `GlobalDrawer` — `aria-labelledby` + titled `h2` header; close button labeled |
| **Pagination** | `<nav aria-label="Pagination">`, `aria-current="page"`, prev/next labels |
| **Search** | `SearchInputField` / `SearchInputField2` — search input `aria-label`, submit button label + focus ring |
| **Page titles** | `TitleHeader` renders semantic `h1` / `h2` |
| **Images** | `AppImage` requires meaningful `alt` (or decorative empty alt where appropriate) |
| **Theme toggle** | `aria-label` on switch |

### Form field helpers

- `src/utils/a11y/fieldA11y.ts` — `fieldControlId`, `fieldErrorId`, `fieldHintId`, `mergeDescribedBy`, `isFieldRequired`
- `src/components/shared/a11y/` — reusable label, error, hint, skip link

When building a new field wrapper, reuse these instead of inventing new id/error patterns.

## Page build checklist

See also [GLOBAL_PAGE_BUILD_RULES.md](./GLOBAL_PAGE_BUILD_RULES.md).

1. One `<h1>` per page; section headings `h2`/`h3` in order.
2. Every control has a **visible `<label>`** or **`aria-label`** (not both unless needed).
3. Errors are text (not color-only), linked with **`aria-describedby`**, announced with **`role="alert"`** where appropriate.
4. Interactive elements are **keyboard reachable**; no `outline: none` without a `:focus-visible` substitute.
5. Modals/drawers: prefer Ant Design components (focus trap); ensure close controls have accessible names.
6. Do not rely on color alone for state (add text, icons with labels, or patterns).

## Testing

| Method | When |
|--------|------|
| **Keyboard only** | Tab through every page before merge |
| **Lighthouse / axe** | Run in Chrome DevTools on key routes |
| **Screen reader spot-check** | VoiceOver (macOS) or NVDA (Windows) on login + one complex flow |

### Optional CI (not installed by default)

You can add `eslint-plugin-jsx-a11y` to ESLint and/or `@axe-core/playwright` in E2E tests. Ask to wire this when you ready for automated gates.

## Custom components

- **Dropdowns / comboboxes**: Prefer `SelectComponent1` or `InfiniteSearchSelect` (search + scroll); ensure listbox is keyboard operable (Ant Design handles most behavior).
- **Modals**: Use `GlobalModal` / `ConfirmationModal`; set `title` and meaningful primary/cancel button text.
