# Ad creatives

Five ad sets of five, rendered from one script.

```bash
npx playwright install chromium   # once
node scripts/render-ads.mjs       # writes ads/out/adset-N-name/
```

| Set | Angle | Layout | Size | What it leads with |
|---|---|---|---|---|
| 1 | problem | `photo` | 1080x1920 | The problem in a photo, then the mechanism |
| 2 | transformation | `photo` + `after` | 1080x1920 | A labelled before and after pair |
| 3 | proof | `stats` | 1080x1920 | "We can't say X, but we can say", then figures |
| 4 | routine | `timeline` | 1080x1080 | Day by day, with the offer and the ingredients |
| 5 | offer | `deal` | 1080x1920 | Struck price against the offer price |

A set is one layout across five angles, so when reporting comes back a format that
works is legible rather than tangled up with the copy.

## Editing

Everything is in `creatives.json`. A sixth variation is an entry with `set` and
`setName` on it; copy and photo paths are all data. Colours come from
`app/tokens/colors.css`, so a token change carries into the ads.

Rendered PNGs are gitignored. The photos in `photos/` are generated, and every one
shows the problem, never a result.

## Before shipping

- **Survey figures** in set 3 and the **day by day timeline** in set 4 are
  placeholders. No survey produced those numbers. Each creative carries its own
  fine print, but the figures still need real data behind them.
- **The after panels in sets 2 and 5 are marked slots.** A generated body presented
  as one person's result is fabricated proof that the product caused it, which is
  the most enforced image type in this category. Drop in a real customer photo with
  their release on file and the creative is finished.
- **Prices** track `lib/quiz/plans.ts` by hand. If a plan price changes, the deal
  set needs updating with it.
