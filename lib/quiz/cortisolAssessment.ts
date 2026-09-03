import type { Answers, Row } from "./assessment";

/**
 * Turns cortisol skin quiz answers into the result screens, the same way the other
 * three funnels do.
 *
 * EVERYTHING HERE IS A SCREENING SCORE built from self-reported symptoms, not a
 * measurement. Cortisol is measured in blood, saliva or urine, and nothing in a
 * questionnaire substitutes for that. The copy on the results pages says so, and this
 * file should keep it true: no function in here returns anything labelled as a
 * cortisol level in real units, and the projection is an illustration of a rate.
 */

/* Same floor and ceilings logic as the diet and aging assessments: every marker sits
   above green, and each carries its own ceiling set by how much the quiz actually
   knows about it. Six identical red bars would be telling you it measured nothing, so
   the rows resting on one answer top out lower than the composites. */
const FLOOR = 66;
const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const toScale = (raw: number, ceiling: number) =>
  Math.round(FLOOR + (clamp(raw) / 100) * (ceiling - FLOOR));

/* Three-point answers share a shape across this quiz: emphatic, hedged, denied. */
const three = (v: string | undefined, hi: number, mid: number, lo: number) =>
  v === "Yes, most mornings" || v === "Yes, often" || v === "Yes, and they arrived fast" || v === "Yes"
    ? hi
    : v === "Sometimes" || v === "A few, gradually"
      ? mid
      : lo;

const stressScore = (a: Answers) =>
  a["stress-level"] === "Constantly" ? 88
  : a["stress-level"] === "Often" ? 70
  : a["stress-level"] === "Sometimes" ? 46
  : 22;

const sleepPenalty = (a: Answers) =>
  (a.sleep === "Less than 5 hours" ? 15 : a.sleep === "5 to 6 hours" ? 8 : 0) +
  (a["sleep-quality"] === "Both" ? 12 : a["sleep-quality"] === "Neither" ? 0 : 7);

export function cortisolRows(a: Answers): Row[] {
  const lines = a["fine-lines-wrinkles"];

  return [
    /* The composite the whole funnel rests on, so it is the one row allowed to run
       the full height of the track. */
    { label: "Cortisol level", you: toScale(stressScore(a) + sleepPenalty(a), 96) },
    {
      label: "Morning puffiness",
      you: toScale(three(a["morning-bloat"], 84, 52, 20) + (a["moon-face"] === "Yes" ? 14 : 0), 94),
    },
    {
      label: "Skin firmness",
      you: toScale(
        (a["skin-elasticity"] === "Yes" ? 76 : 24) + (a["skincare-frustration"] === "Yes" ? 14 : 0),
        92,
      ),
    },
    { label: "Fine lines", you: toScale(three(lines, 86, 54, 22), 93) },
    {
      label: "Sleep quality",
      you: toScale(
        (a.sleep === "Less than 5 hours" ? 82 : a.sleep === "5 to 6 hours" ? 62 : 26) +
          (a["sleep-quality"] === "Both" ? 14 : a["sleep-quality"] === "Neither" ? 0 : 8),
        92,
      ),
    },
    /* Two non-specific single answers, so this one tops out at the head of yellow
       however she answers. */
    {
      label: "Tension and flushing",
      you: toScale(three(a["jaw-tension"], 70, 44, 18) + three(a["morning-flushing"], 20, 12, 0), 70),
    },
  ];
}

/* The chart window, matching the other three funnels so all four talk about the same
   eight weeks. */
export const CORTISOL_HORIZON_DAYS = 56;

export type CortisolProjection = {
  weeks: number;
  points: { week: number; value: number }[];
  start: number;
  target: number;
};

/* Where a settled evening pattern sits on this quiz's own scale. Not a lab value. */
const SETTLED = 30;
/* Below this the answers are not describing a raised pattern, and drawing a fall from
   a score that was never high would be inventing a problem to solve. */
const MIN_START = 48;
/* And a ceiling below 100. The worst possible set of answers summed past the top of
   the scale and drew a flat "100", which reads as a made-up maximum rather than as a
   reading, and implies a precision a questionnaire does not have. */
const MAX_START = 92;

/**
 * The future pacing curve: a screening score that starts high and falls toward the
 * settled band over twelve weeks. Steep early and flattening, the shape adherence
 * research reports rather than the straight line a linear model would draw.
 *
 * Returns null when the answers do not describe a raised pattern, so the screen can
 * say that plainly instead of drawing a drop that was never there.
 */
export function cortisolProjection(a: Answers): CortisolProjection | null {
  const start = clamp(
    stressScore(a) * 0.55 +
      sleepPenalty(a) * 1.1 +
      three(a["morning-bloat"], 18, 10, 0) +
      (a["moon-face"] === "Yes" ? 10 : 0) +
      three(a["jaw-tension"], 10, 6, 0),
  );
  if (start < MIN_START) return null;
  const from = Math.min(start, MAX_START);

  const weeks = 12;
  const drop = from - SETTLED;
  const points = Array.from({ length: weeks + 1 }, (_, week) => ({
    week,
    value: from - drop * easeOut(week / weeks),
  }));

  return { weeks, points, start: from, target: SETTLED };
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 1.7);
}
