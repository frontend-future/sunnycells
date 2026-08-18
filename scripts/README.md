# Browser checks

Neither runs in CI yet. Start a production server first, then run them against it:

```bash
npm run build && npx next start -p 3100
node scripts/funnel-check.mjs   # drives the whole diet funnel, 39 assertions
node scripts/fold-check.mjs     # measures every CTA against three phone viewports
node scripts/payment-check.mjs  # the payment step: brand detection, spinner, failure
```

They need `playwright` and a Chromium build, which are not project dependencies:
install them in a scratch directory and run from there, or `npm i -D playwright`
if these become part of the build.

`fold-check` prints how far each primary action sits from the bottom of the
viewport. Everything should read `ok`.

The plans page is the exception to the rule, deliberately: it is a long-scroll
sales page, so what is checked there is its hero button, which scrolls down to the
plan cards. The Order now buttons themselves sit thousands of pixels down and are
not expected above the fold.
