# Theming & brand colors

## Change the brand color (one file)

Edit **`src/constants/brandTheme.ts`**:

```ts
export const brandTheme = {
  primary: "#27a376",       // main buttons, links, Ant Design primary
  primaryHover: "#1d7a59",  // hover states
  primaryMuted: "#166b4a",
  onPrimary: "#ffffff",
  accent: "#2a3653",        // modal/drawer header bar (blue)
  // ...
};
```

Save and restart `bun dev`. That updates:

| Layer | How |
|-------|-----|
| **CSS variables** | `BrandThemeVariables` in `layout.tsx` → `--color-brand`, `--Foundation-Green-medium`, focus rings in `antd.css` |
| **Tailwind** | `tailwind.config.ts` imports `brandTheme` → `bg-brand`, `text-brand`, `green-500`, etc. |
| **Ant Design** | `AntdConfigProvider` → `colorPrimary`, switches, tabs, date picker selection |
| **Shared UI** | `ButtonFilled`, `ButtonOutlined`, search shells, `BRAND_LINK_CLASS` |

Use Tailwind utilities in new UI:

- `bg-brand`, `hover:bg-brand-hover`, `text-brand`, `border-brand`
- Links: `BRAND_LINK_CLASS` from `@/constants/theme`

## Page backgrounds (light / dark)

Not tied to `brandTheme.ts`:

- **Tailwind:** `slate-*` on layout (`AppWrapper`, auth shell, cards)
- **`globals.css`:** `:root` / `.dark` → `--app-surface`, `--app-muted-surface`, shark tokens

Adjust those when you want a different gray palette, not a different brand green.

## Optional: accent bar on modals

Modal/drawer headers use **`OverlayHeaderBar`** with `bg-blue-800` (maps to `brandTheme.accent` in Tailwind `blue.800`). Change `accent` in `brandTheme.ts` and optionally update the header class to `bg-accent` if you add `accent` to Tailwind colors later.
