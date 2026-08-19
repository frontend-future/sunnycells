# Browser checks

Neither runs in CI yet. Start a production server first, then run them against it:

```bash
npm run build && npx next start -p 3100
node scripts/funnel-check.mjs   # drives the whole diet funnel, 39 assertions
node scripts/fold-check.mjs     # measures every CTA against three phone viewports
node scripts/payment-check.mjs  # the payment step: brand detection, spinner, failure
```

`playwright` is a devDependency, so `npm install` covers it. The browser binary is
separate: run `npx playwright install chromium` once.

`node scripts/render-ads.mjs [outDir]` renders the ad creatives in `ads/` to
1080x1920 PNGs. Four layouts, picked by each entry's `layout`:

| layout | size | what it is |
|---|---|---|
| `photo` | 1080x1920 | a shot with the headline over it, then pack and points |
| `stats` | 1080x1920 | a flat colour field, headline, pack, then figures |
| `timeline` | 1080x1080 | a day by day routine beside the pack, with ingredients |
| `deal` | 1080x1920 | headline bar, panels, struck price against the offer price |

`photo` and `deal` take an `after` key. A photo path renders a labelled before and
after pair; `null` leaves the after panel as a marked slot, which is how they ship.
The before photos show the problem, and the after panel waits for a real customer
photo with a release on file. Copy lives in `ads/creatives.json` and photos in `ads/photos`, so a
new variation is a JSON entry and an image rather than a code change. Colours and
type come from the design tokens, so a token change carries into the ads.

`fold-check` prints how far each primary action sits from the bottom of the
viewport. Everything should read `ok`.

The plans page is the exception to the rule, deliberately: it is a long-scroll
sales page, so what is checked there is its hero button, which scrolls down to the
plan cards. The Try now buttons themselves sit thousands of pixels down and are
not expected above the fold.
