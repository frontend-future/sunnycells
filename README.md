# SUNNYCELLS

The design system, in code. No storefront yet: this repo currently ships the tokens,
the component library, and a live specimen page that proves both resolve.

```bash
npm install
npm run dev     # http://localhost:3000 renders the system reference
npm test        # the price rules
npm run build
```

## Stack

Next.js 16 App Router, TypeScript, Tailwind v4, deployed on Vercel. Icons are
`lucide-react`. Fonts are Outfit and Figtree via `next/font`, self-hosted at build time.

**No shadcn.** The system already specifies all 22 components down to the pixel, and
shadcn's Radix defaults (its own token names, 14px text, pill radii, `--muted-foreground`
greys that fail this system's contrast floor) would have to be overridden in every one.
Adding it would mean maintaining a translation layer with no components left underneath.
If a genuinely complex primitive shows up later, a combobox, a date picker, a
focus-trapped drawer, pull in the single Radix primitive and skin it with these tokens.

## Layout

| Path | What it is |
|---|---|
| `app/tokens/` | Colour, type, spacing, radius, elevation, motion. The source of truth. |
| `app/globals.css` | Imports the tokens and maps them to Tailwind utilities. |
| `app/layout.tsx` | Loads Outfit and Figtree, exposes them to the type tokens. |
| `app/page.tsx` | The system reference. Every token and component, rendered. |
| `components/core/` | `Button` `IconButton` `Badge` `OfferFlag` `Tag` `Card` `Wordmark` `Icon` |
| `components/forms/` | `Input` `Select` `Checkbox` `RadioOption` `Switch` `QuantityStepper` |
| `components/feedback/` | `Banner` `Dialog` `Toast` |
| `components/navigation/` | `NavLink` `Tabs` `Accordion` `Breadcrumb` |
| `components/commerce/` | `Price` `StarRating` `ProductCard` `SubscriptionBox` |
| `lib/price.ts` | `formatPrice` and `firstOrderPrice`. Every price in the app goes through these. |
| `docs/design-system.md` | The full brand and design brief. Read it before designing. |
| `CLAUDE.md` | The non-negotiables, for agents and for people in a hurry. |

## How to use it

Tokens are CSS custom properties, and `app/globals.css` also exposes them as Tailwind
utilities: `bg-sun`, `text-ink-60`, `rounded-card`, `text-h1`, `shadow-card`,
`tracking-caps`. Use Tailwind for page layout. Use the components for anything that
carries a brand rule, and do not restyle them from a call site: the rules live inside
them on purpose.

Components use token-driven inline styles rather than utility classes. That is
deliberate. It keeps each component a one-to-one port of the specified system, so a
diff against `docs/design-system.md` stays readable and nobody has to reverse-engineer
a class string to check whether a button is still 12px.

Never hardcode a hex, a size, a radius, or a duration. If a value is not in
`app/tokens/`, it is not in the system.

## Flagged substitutions

Four things in here are stand-ins, called out in the brief and unchanged:

1. **No logo.** `Wordmark` sets SUNNYCELLS in Outfit 900. Nothing has been drawn.
2. **No brand fonts.** Outfit and Figtree are the closest freely-licensed matches.
   Licensed files swap into `app/layout.tsx` via `next/font/local`, and the token names
   stay put.
3. **No brand icons.** Lucide at 2px stroke, a closed working set of 15.
4. **No photography.** `ProductCard` renders a typographic placeholder where the
   transparent-background product cutout belongs.
