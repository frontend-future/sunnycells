# Ad creatives

Five ad sets of five, rendered from one script.

```bash
npx playwright install chromium   # once
node scripts/render-ads.mjs       # writes ads/out/adset-N-name/
```

| Set | Angle | Layout | Size | What it leads with |
|---|---|---|---|---|
| 1 | problem | `photo` | 1080x1920 | The problem in a photo, then the mechanism |
| 2 | reframe | `photo` | 1080x1920 | The problem state, blame moved off the customer |
| 3 | proof | `stats` | 1080x1920 | "We can't say X, but we can say", then figures |
| 4 | routine | `timeline` | 1080x1080 | Day by day, with the offer and the ingredients |
| 5 | offer | `deal` | 1080x1920 | The problem state, what is included, the pack |

A set is one layout across five angles, so when reporting comes back a format that
works is legible rather than tangled up with the copy.

## Anytime Calm

Twenty creatives for SC-26, four sets of five, written to `ads/out-calm/`:

```bash
ADS_FILE=creatives-anytime-calm.json ADS_EXPORT_DIR="$HOME/Downloads/anytime-calm-ads" \
  node scripts/render-ads.mjs ads/out-calm
```

| Set | Angle | What it argues |
|---|---|---|
| 1 | three-am | Falling asleep is not the problem. Falling back asleep is |
| 2 | not-melatonin | Non-hormonal, so there is no grogginess to sleep off |
| 3 | anytime | Take it at dinner. Calm without drowsy |
| 4 | one-night | 1080 square. Challenge and reset framings paced across one night |

Sets 1 to 3 are `photo` at 1080x1920. Set 4 is `timeline` at 1080 square.

The timeline column fits about two lines a row. Longer copy pushed the ingredient
circles and the fine print off the canvas, which the renderer now warns about
instead of screenshotting.

No price on any of the twenty. On sets 1 to 3 the guarantee carries the risk
reversal.

Set 4 takes its audience and its wording from the funnel rather than inventing
either. `lib/quiz/calm.ts` names the reader as moms running on empty, and the mom
is named in every strap.

Its pacing is deliberately not the funnel's. `CalmBenefits` builds over weeks;
these run the clock of a single night, 6pm to 6:30am, because that is the span
the reader is actually deciding about and because L-theanine and glycine act
acutely rather than accumulating. Three in the morning is a row on the clock
instead of a claim about week three.

Pacing one night also sidesteps `CALM_HORIZON_DAYS`, which is 56: nothing in the
set promises a figure at 28 days that the results page puts at 56. The supply
fact moved to the corner disc, which is the only place a tub is now counted.

**Set 4 makes outcome claims on a timed schedule**, which sets 1 to 3 do not. They
are structure and function claims, none of them evaluated, and they sit on the same
footing as the cortisol timeline in set 4 of `creatives.json`: substantiate on the
finished formula before this takes traffic. One tub is 28 nights, stated on the disc.

The renderer warns when anything overflows a fixed-height canvas and names the
element. Two limits worth knowing: the 84px timeline title fits about 19 characters
before it wraps to a second line and pushes the fine print off, and the day column
fits about two lines a row.

Always pass `ADS_EXPORT_DIR`. Without it the export folder is shared with the
cortisol set and the stale-set cleanup deletes whichever product rendered last.

Copy is first person throughout, because a headline that asserts something about
the viewer ("you are not sleeping") is an implied personal attribute under Meta's
health rules. The cortisol set does assert, and is exposed on that.

**No rating and no reviews appear on any of the fifteen.** No survey and no reviews
have been collected for this product, and reviews written about another company's
glycine are not proof about this one.

## Editing

Copy lives in `creatives.json` for the cortisol set and
`creatives-anytime-calm.json` for the calm set. A sixth variation is an entry with `set` and
`setName` on it; copy and photo paths are all data. Colours come from
`app/tokens/colors.css`, so a token change carries into the ads.

Rendered PNGs are gitignored. The photos in `photos/` are generated, and every one
shows the problem, never a result.

## Before shipping

- **Survey figures** in set 3 and the **day by day timeline** in set 4 are
  placeholders. No survey produced those numbers. Each creative carries its own
  fine print, but the figures still need real data behind them.
- **No set ships an after image.** A generated body presented as one person's result
  is fabricated proof that the product caused it, which is the most enforced image
  type in this category, and an empty panel waiting on one only advertised the gap.
  Every creative shows the problem state alone. A real customer photo with a release
  on file is the only thing that should ever fill an after slot, and adding one means
  adding the panel back deliberately.
- **The "up to" discount** tracks the deepest card in `lib/quiz/plans.ts` by hand.
  If a plan price changes, `flash` in set 4 needs updating with it. Set 5 carries no
  price at all, so it does not go stale.
