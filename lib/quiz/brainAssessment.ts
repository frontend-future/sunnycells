import { ageFromAnswers } from "./types.ts";
import type { Answers } from "./assessment.ts";
import { HIGH_FROM, MEDIUM_FROM, type Row } from "./assessment.ts";

/**
 * Turns brain quiz answers into the result screens, the same way the diet and energy
 * funnels do. Everything here is a screening score built from self-reported symptoms,
 * not a measurement: nothing in a questionnaire measures blood flow to the brain, and
 * the copy on the results pages says so.
 */

const yes = (a: Answers, slug: string) => a[slug] === "Yes";

/* Same floor and ceilings logic as every other funnel's assessment: every marker sits
   above green, and each carries its own ceiling set by how much the quiz actually
   knows about it. */
const FLOOR = 66;
const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const toScale = (raw: number, ceiling: number) => Math.round(FLOOR + (clamp(raw) / 100) * (ceiling - FLOOR));

export function brainRows(a: Answers): Row[] {
  const wordFinding = a["word-finding"];
  const rereading = a.rereading;
  const conversations = a["following-conversations"];
  const fog = a["fog-timing"];

  const wordScore = wordFinding === "Yes, often" ? 85 : wordFinding === "Sometimes" ? 52 : 22;
  const rereadScore = rereading === "Yes, often" ? 82 : rereading === "Occasionally" ? 50 : 20;
  const conversationScore = conversations === "Yes" ? 80 : conversations === "Sometimes" ? 48 : 18;
  const fogScore = fog === "It's constant" ? 88 : fog === "Afternoon" ? 62 : fog === "Morning" || fog === "Evening" ? 45 : 30;

  return [
    { label: "Memory and recall", you: toScale(wordScore, 95) },
    { label: "Focus and concentration", you: toScale(yes(a, "focus-difficulty") ? 80 : 24, 92) },
    { label: "Processing speed", you: toScale((rereadScore + conversationScore) / 2, 90) },
    { label: "Mental fog", you: toScale(fogScore, 93) },
    { label: "Mood and patience", you: toScale(a["mood-irritability"] === "Yes, noticeably" ? 78 : a["mood-irritability"] === "A little" ? 48 : 20, 85) },
  ];
}

export { HIGH_FROM, MEDIUM_FROM };

export type ClarityProjection = {
  weeks: number;
  points: { week: number; lb: number }[];
  start: number;
  target: number;
  unit: "lb";
};

/* 90 days, per the brief: the future-pace horizon this funnel promises. */
export const CLARITY_HORIZON_DAYS = 90;

/* Where "now" sits on a 0 to 100 mental clarity index, and where the plan is drawn to
   by day 90. Same banded technique as every other funnel's now/after gauge: never
   starts at the very bottom, since a profile that reads as total fog measured nothing
   real, and never claims total clarity either. Raised off the true floor a bit further
   than the other funnels' bands: this is the one screen that also draws a second,
   declining curve below the start point, and a start sitting right at the bottom of
   the chart left that curve nowhere to go but off the axis. */
const NOW_BAND: [number, number] = [30, 48];
const AFTER = 84;

function clarityNow(a: Answers): number {
  const rows = brainRows(a);
  const avgDisruption = rows.reduce((sum, r) => sum + r.you, 0) / rows.length;
  /* Rows read 0 to 100 disrupted; clarity is the inverse of that, banded. */
  const t = Math.max(0, Math.min(1, avgDisruption / 100));
  return Math.round(NOW_BAND[1] - t * (NOW_BAND[1] - NOW_BAND[0]));
}

/**
 * A clarity curve from where the quiz places her today to where the plan is drawn to
 * by day 90. It is an illustration of a trend, not a prediction of a result, and the
 * page that draws it says so. Always returns a curve: unlike the weight or hours
 * projections, there is no user-entered target to be missing.
 */
export function clarityProjection(a: Answers): ClarityProjection {
  const start = clarityNow(a);
  const target = AFTER;
  const weeks = Math.ceil(CLARITY_HORIZON_DAYS / 7);

  const points = Array.from({ length: weeks + 1 }, (_, week) => ({
    week,
    lb: Math.round(start + (target - start) * easeOut(week / weeks)),
  }));

  return { weeks, points, start, target, unit: "lb" };
}

/* Continued decline without doing anything about it: a slow downward drift, not a
   cliff. Returned as a fraction of the gap the plan line covers, same contract as the
   diet funnel's dieting curve and the energy funnel's caffeine curve.
   Capped well inside ProjectionChart's own vertical padding (12% of the start-to-target
   gap, above and below), which is fixed by the chart regardless of where NOW_BAND
   places the start: past compare(1) = -0.12 this curve runs off the bottom of the
   axis. -0.08 leaves real margin either side of that line rather than sitting on it,
   at any start point clarityNow() can return. */
export function withoutCurve(t: number): number {
  return -0.08 * t;
}

/* Fast early then flattening, matching every other funnel's projection curve rather
   than the straight line a linear model would draw. */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 1.7);
}

export { ageFromAnswers };
