# Design Tokens → Tailwind v4 Mapping

This project uses **Tailwind v4** with CSS-based configuration (`@theme` in `src/styles/theme.css`). There is no `tailwind.config.js`; theme is defined in CSS.

## Token files

| File | Contents |
|------|----------|
| `tokens/colors.json` | Semantic, surfaces, brand, payment, opacity |
| `tokens/spacing.json` | Scale (0–24) + custom container/section |
| `tokens/typography.json` | Font family, size, weight, line-height, letter-spacing |
| `tokens/radius.json` | Scale (sm–3xl, full) + custom (button, card, modal) |
| `tokens/shadows.json` | Elevation + brand (primary glow, emerald, gold) |

## Current Tailwind / CSS mapping

### Colors

Theme CSS variables in `:root` and `@theme inline` already map to Tailwind:

- `bg-background`, `text-foreground` → `--background`, `--foreground`
- `bg-primary`, `text-primary` → `--primary`, `--primary-foreground`
- `bg-card`, `border-border`, `bg-muted`, `text-muted-foreground`, etc.

**In components:** Prefer semantic classes (`bg-primary`, `text-muted-foreground`, `border-border`) instead of raw hex. For app-specific surfaces, add to `@theme` and use tokens:

```css
/* Optional: add to @theme in theme.css */
--color-surface-elevated: #1a2230;
--color-surface-input: #0f151f;
--color-primary-brand: #00bc7d;
```

Then use: `bg-surface-elevated`, `bg-surface-input`, `text-primary-brand`.

### Spacing

Tailwind default scale matches `tokens/spacing.json` (0, 0.5, 1 … 24 in rem). Use `p-4`, `gap-6`, `rounded-xl` etc. Custom values like `rounded-[10px]` map to tokens:

- `rounded-[10px]` → radius.button (use `rounded-button` if you add `--radius-button: 10px` to `@theme`)
- `rounded-[14px]` → radius.card
- `rounded-[24px]` → radius.modal

### Typography

- `text-xs` … `text-4xl` → `tokens/typography.json` font size scale
- `font-medium`, `font-bold` → weight scale
- `leading-tight`, `tracking-tight` → line-height and letter-spacing in tokens
- Base styles in `theme.css` use `--text-2xl`, `--text-xl`, `--text-lg`, `--text-base` (now defined in `:root`)

### Radius

`theme.css` already has:

- `--radius: 0.625rem` (base)
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl` (derived)

Tailwind uses these via `rounded-lg`, `rounded-xl`, etc. For custom radii used in components (e.g. `rounded-[10px]`, `rounded-[24px]`), add to `@theme`:

```css
--radius-button: 0.625rem;   /* 10px */
--radius-card: 0.875rem;     /* 14px */
--radius-modal: 1.5rem;      /* 24px */
```

### Shadows

Tailwind v4 provides `shadow-sm` … `shadow-2xl`. Custom shadows (e.g. primary glow, modal) are inline in components. To normalize, add to `@theme`:

```css
--shadow-modal: 0 32px 64px -12px rgba(0, 0, 0, 0.6);
--shadow-primary-glow: 0 0 15px rgba(0, 255, 136, 0.2);
```

Then use `shadow-[var(--shadow-modal)]` or define a utility.

## If you add tailwind.config.js (Tailwind v3-style)

Tailwind v4 is configured via CSS. If you need a JS config (e.g. for a design tool or script), you can create a minimal config that re-exports token values:

```js
// tailwind.config.js (optional – Tailwind v4 reads from CSS)
import colors from './tokens/colors.json';
import spacing from './tokens/spacing.json';

export default {
  theme: {
    extend: {
      colors: {
        'surface-elevated': colors.surfaces.surfaceElevated.value,
        'primary-brand': colors.semantic.primaryBrand.value,
      },
      borderRadius: {
        button: '0.625rem',
        modal: '1.5rem',
      },
    },
  },
};
```

The single source of truth for the app remains `src/styles/theme.css` and the token JSON files.

## Normalization summary

- **Colors:** Use `bg-primary`, `bg-card`, `text-muted-foreground`; replace repeated hex (e.g. `#00bc7d`, `#1a2230`) with semantic or new theme colors.
- **Spacing:** Use Tailwind scale (`p-4`, `gap-6`); avoid arbitrary values where a scale value exists.
- **Typography:** Use `text-sm`, `text-base`, `font-bold`; reserve `text-[10px]`-style for rare cases and document in tokens.
- **Radius:** Prefer `rounded-lg`, `rounded-xl`, `rounded-2xl`; add named tokens for `10px`, `14px`, `24px` if used often.
- **Shadows:** Prefer `shadow-lg`, `shadow-xl`; add CSS variables for repeated custom shadows (modal, primary glow).
