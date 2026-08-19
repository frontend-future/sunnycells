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
1080x1920 PNGs. An entry with an `after` key renders as a labelled before and after
pair; without one it renders as a single photo. Setting `after` to null leaves the
panel as a marked slot, which is how the pair creatives ship: the before photos show
the problem, and the after panel waits for a real customer. Copy lives in `ads/creatives.json` and photos in `ads/photos`, so a
new variation is a JSON entry and an image rather than a code change. Colours and
type come from the design tokens, so a token change carries into the ads.

`fold-check` prints how far each primary action sits from the bottom of the
viewport. Everything should read `ok`.

The plans page is the exception to the rule, deliberately: it is a long-scroll
sales page, so what is checked there is its hero button, which scrolls down to the
plan cards. The Order now buttons themselves sit thousands of pixels down and are
not expected above the fold.
