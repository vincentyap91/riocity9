# Design Tokens

Single source of truth for colors, spacing, typography, radius, and shadows. Used to keep the UI consistent and to drive Tailwind/theme via `src/styles/theme.css`.

## Files

| File | Purpose |
|------|--------|
| **colors.json** | Semantic colors, surfaces, brand accents, payment colors, opacity |
| **spacing.json** | Scale (0–24) + custom container/section values |
| **typography.json** | Font families, sizes, weights, line-height, letter-spacing |
| **radius.json** | Border radius scale + custom (button, card, modal) |
| **shadows.json** | Elevation + brand shadows (primary glow, emerald, gold) |
| **TAILWIND_MAPPING.md** | How tokens map to Tailwind v4 and theme.css |

## Usage

- **CSS/Theme:** `src/styles/theme.css` defines `:root` and `@theme` variables. Surface and primary-brand tokens are wired so you can use `bg-surface-elevated`, `text-primary-brand`, etc.
- **Components:** Prefer semantic Tailwind classes (`text-primary-brand`, `bg-surface-elevated`, `rounded-button`) over raw hex or arbitrary values. See `src/app/config/themeTokens.ts` for shared class strings that already use these.
- **New tokens:** Add the value to the right JSON file, then add a corresponding variable in `theme.css` and, if needed, in `@theme inline` so Tailwind generates the utility.

## Normalization

Repeated or inconsistent values across the app have been folded into these tokens:

- **Primary green:** `#00e588` (theme primary), `#00bc7d` (primary-brand), `#00ff88` (primary-bright) → use `primary`, `primary-brand`, `primary-bright` as appropriate.
- **Surfaces:** Multiple navy hex values → `surface-elevated`, `surface-input`, `surface-modal`, `surface-nav` etc.
- **Radius:** `10px`, `14px`, `24px` etc. → `radius.button`, `radius.modal`; use `rounded-button`, `rounded-modal` where theme exposes them.

See **TAILWIND_MAPPING.md** for full mapping and migration notes.
