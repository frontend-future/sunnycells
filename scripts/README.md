# Browser checks

Neither runs in CI yet. Start a production server first, then run them against it:

```bash
npm run build && npx next start -p 3100
node scripts/funnel-check.mjs   # drives the whole diet funnel, 39 assertions
node scripts/fold-check.mjs     # measures every CTA against three phone viewports
```

They need `playwright` and a Chromium build, which are not project dependencies:
install them in a scratch directory and run from there, or `npm i -D playwright`
if these become part of the build.

`fold-check` prints how far each primary action sits from the bottom of the
viewport. Everything should read `ok`. The one known exception is the plans page
buy button: it sits after three priced cadence cards, so choosing a plan means
scrolling. The check that matters there is `plans 1st option`, which must stay
above the fold so the choice is visible without scrolling.
