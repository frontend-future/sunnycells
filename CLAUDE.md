@AGENTS.md

# SUNNYCELLS

Longevity beauty for women 35 to 55 and up. Ingestibles, topical skincare, hair and
scalp care. Next.js App Router, TypeScript, Tailwind v4, deployed on Vercel.

Full design system: `docs/design-system.md`. Tokens: `app/tokens/`. Components:
`components/`. Read those before designing anything.

## Non-negotiables

1. **Prices are integers.** `$49`, never `$49.00` or `$49.99`. Savings in dollars,
   never percentages. Use `Price`, `formatPrice`, and `firstOrderPrice`.
2. **Body text 20px minimum, weight 500 minimum.** Secondary text goes lighter in
   colour (`--ink-60`), never in weight.
3. **Black on white is the base**, about 90% of every screen. `--sun` is the primary
   accent. Zest, sky, and sprout are product family codes, not decoration.
4. **All four accents take black text.** White or grey on yellow is forbidden.
5. **Buttons are 12px corners, never pills.** Tap targets never below 48px.
6. **Subscriptions only.** No one-time purchase exists. `SubscriptionBox` is the only
   buy box and it chooses a delivery cadence. Cancel terms sit beside the price.
7. **Lead with 50% off the first order** on every surface, using `OfferFlag`. It is a
   standing term with no countdown or expiry, the only percentage in the brand, and
   always shown with the ongoing price: `$19 first month, then $39`.
8. **No emoji, no gradients, no bounce animation, no countdowns, no "anti-ageing".**
9. **`--ink-40` is not a text colour** on light surfaces (2.8:1). Lightest text on
   white is `--ink-60`.
10. **Micro-labels are sentence case in the text face**, `--font-label` at
    `--tracking-mono`, weight 600. Never all caps, never mono. The only all-caps in
    the system: display headlines, button labels, and `Badge`.

## Writing

- **Never use em dashes.** Anywhere, including code comments. Use a period for a hard
  break, a comma for an aside, a colon to introduce. En dashes only in numeric ranges,
  and prefer words in customer copy ("aged 35 to 60").
- **Never use AI-isms.** No "it's not just X, it's Y", no "say goodbye to", no
  "unlock/elevate/empower/transform", no "discover the secret", no "in today's
  fast-paced world", no "whether you're X or Y", no "game-changer/revolutionary/
  cutting-edge", no "designed to help support", no "your journey starts here", no
  "let's dive in", no reflexive rule-of-three lists, no rhetorical-question openers,
  no "simply/just/effortlessly", no "Introducing", no exclamation marks in body copy.
- The test: cover the logo. If the sentence would work for any other brand, rewrite it
  so it names a mechanism, a dose, a number, or a specific lived detail.

## Code

- Never hardcode a hex, size, radius, or duration. Every value comes from a token in
  `app/tokens/`, either as `var(--token)` or the Tailwind utility generated from it in
  `app/globals.css`.
- Components carry the brand rules in their own styling. Compose them, do not restyle
  them from a call site.
