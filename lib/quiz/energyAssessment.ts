import type { Answers } from "./assessment";
import { HIGH_FROM, MEDIUM_FROM, type Row } from "./assessment";

/**
 * Turns energy quiz answers into the result screens, the same way the diet quiz does.
 * Everything here is a screening score built from self-reported symptoms, not a
 * measurement. Nothing in a questionnaire measures how a cell makes ATP, and the copy
 * on the results pages says so.
 */

const yes = (a: Answers, slug: string) => a[slug] === "Yes";

/* Same floor and ceilings logic as the diet assessment: every marker sits above green,
   and each carries its own ceiling set by how much the quiz actually knows about it.
   A profile that reads identically on all six lines is telling you it measured
   nothing, so the single-answer rows top out lower than the composites. */
const FLOOR = 66;
const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const toScale = (raw: number, ceiling: number) => Math.round(FLOOR + (clamp(raw) / 100) * (ceiling - FLOOR));

export function energyRows(a: Answers): Row[] {
  const pattern = a["energy-pattern"];
  const tired = a["daytime-tiredness"];
  const sleep = a.sleep;
  const drinks = Number(a.caffeineDrinks);

  const patternScore =
    pattern === "I am running on empty most of the day" ? 85
    : pattern === "Fine until it drops off a cliff" ? 58
    : 25;
  const sleepPenalty = sleep === "Less than 5 hours" ? 15 : sleep === "5 to 6 hours" ? 8 : 0;
  /* Four a day is where the load starts reading as heavy rather than habitual. */
  const drinkScore = Number.isFinite(drinks) ? Math.min(90, drinks * 22) : 40;

  return [
    { label: "Caffeine load", you: toScale(drinkScore + (yes(a, "tolerance") ? 12 : 0), 96) },
    { label: "Afternoon crash", you: toScale(patternScore + (yes(a, "post-coffee-dip") ? 14 : 0), 94) },
    { label: "Brain fog", you: toScale(yes(a, "brain-fog") ? 82 : 24, 92) },
    { label: "Difficulty staying steady", you: toScale(yes(a, "steady-difficulty") ? 86 : 28, 93) },
    {
      label: "Energy through the day",
      /* Two signals: where the day gives out, and whether sleep fixes it. A crash that
         survives a full night is the stronger of the two, so it adds on top. */
      you: toScale(
        (tired === "I usually feel tired all day long" ? 78
          : tired === "I feel tired before meals" ? 62
          : tired === "I feel sleepy after lunch" ? 50
          : 22) + (yes(a, "crash-despite-sleep") ? 16 : 0),
        90,
      ),
    },
    { label: "Withdrawal headaches", you: toScale(yes(a, "headaches") ? 74 : 20, 69) },
  ];
}

/** The four bands of the steadiness track, and the band a position falls in. */
export const STEADY_LABELS = ["Very unsteady", "Unsteady", "Steady", "Very steady"] as const;

export function steadyLabel(pct: number): (typeof STEADY_LABELS)[number] {
  return STEADY_LABELS[Math.min(STEADY_LABELS.length - 1, Math.floor((pct / 100) * STEADY_LABELS.length))];
}

/* Mirrors the diet gauge: "right now" stays inside the second band and moves within it,
   the plan lands just inside the fourth. The two marker labels share a row with nothing
   joining them to their arrows, so they clear each other by position alone. */
const NOW_BAND: [number, number] = [27, 34];
const AFTER = 79;

export function steadiness(a: Answers): { now: number; after: number } {
  const pattern = a["energy-pattern"];
  const sleep = a.sleep;
  const raw =
    (pattern === "I am running on empty most of the day" ? 85
      : pattern === "Fine until it drops off a cliff" ? 58
      : 25) + (sleep === "Less than 5 hours" ? 15 : sleep === "5 to 6 hours" ? 8 : 0);

  const t = Math.max(0, Math.min(1, raw / 100));
  return { now: Math.round(NOW_BAND[1] - t * (NOW_BAND[1] - NOW_BAND[0])), after: AFTER };
}

export { HIGH_FROM, MEDIUM_FROM };

export type HoursProjection = {
  weeks: number;
  points: { week: number; value: number }[];
  start: number;
  target: number;
};

/* The chart window, matching the diet funnel's, so both funnels talk about the same
   eight weeks. */
export const HOURS_HORIZON_DAYS = 56;

/**
 * A curve from the good hours she has now to the ones she wants, at a rate that takes
 * at least eight weeks. It is an illustration of a rate, not a prediction, and the page
 * labels it that way. Returns null unless she asked for more hours than she has.
 */
export function hoursProjection(a: Answers): HoursProjection | null {
  const start = Number(a.energyHours);
  const target = Number(a.targetEnergyHours);
  if (!Number.isFinite(start) || !Number.isFinite(target) || target <= start) return null;

  const gain = target - start;
  const weeks = Math.max(8, Math.ceil(gain * 2.5));
  const points = Array.from({ length: weeks + 1 }, (_, week) => ({
    week,
    value: start + gain * easeOut(week / weeks),
  }));

  return { weeks, points, start, target };
}

/* Fast early then flattening, which is how the ingredient studies report their curves,
   rather than the straight line a linear model would draw. */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 1.7);
}
