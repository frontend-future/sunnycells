import type { Answers, Row } from "./assessment";

/**
 * Turns Anytime Calm answers into the result screens, the same way the other funnels do.
 *
 * EVERYTHING HERE IS A SCREENING SCORE built from self-reported symptoms, not a
 * measurement. Cortisol is measured in blood, saliva or urine, and nothing in a
 * questionnaire substitutes for that. No function returns anything labelled as a
 * cortisol level in real units, and the projection is an illustration of a rate.
 *
 * Nothing here screens for a disease. The diet funnel asks about easy bruising, facial
 * hair and thirst with urination, which are Cushing's and diabetes presentations, and
 * then returns a verdict, which is how a supplement quiz turns into an implied
 * diagnosis. This one asks only about sleep and evening tension.
 */

/* Same floor and ceilings logic as the other assessments: every marker sits above
   green, and each carries its own ceiling set by how much the quiz actually knows
   about it. Six identical red bars would be telling you it measured nothing, so the
   rows resting on one answer top out lower than the composites. */
const FLOOR = 66;
const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const toScale = (raw: number, ceiling: number) =>
  Math.round(FLOOR + (clamp(raw) / 100) * (ceiling - FLOOR));

/* Three-point answers share a shape across this quiz: emphatic, hedged, denied. */
const three = (v: string | undefined, hi: number, mid: number, lo: number) =>
  v === "Yes, every night" || v === "Yes, most evenings" || v === "Yes, most nights" ||
  v === "Yes, most days" || v === "Yes, often" || v === "Every night" || v === "Every day"
    ? hi
    : v === "Some nights" || v === "Sometimes" || v === "Most nights" ||
        v === "A few times a week"
      ? mid
      : lo;

const stressScore = (a: Answers) =>
  a["stress-level"] === "Constantly" ? 88
  : a["stress-level"] === "Often" ? 70
  : a["stress-level"] === "Sometimes" ? 46
  : 22;

const sleepPenalty = (a: Answers) =>
  (a.sleep === "Less than 5 hours" ? 15 : a.sleep === "5 to 6 hours" ? 8 : 0) +
  (a["night-wakings"] === "Three or more" ? 12
    : a["night-wakings"] === "Twice" ? 8
    : a["night-wakings"] === "Once" ? 4
    : 0);

const latency = (a: Answers) =>
  a["time-to-sleep"] === "Over an hour" ? 88
  : a["time-to-sleep"] === "30 to 60 minutes" ? 66
  : a["time-to-sleep"] === "15 to 30 minutes" ? 38
  : 16;

export function calmRows(a: Answers): Row[] {
  return [
    /* The composite the whole funnel rests on, so it is the one row allowed to run the
       full height of the track. */
    { label: "Evening cortisol", you: toScale(stressScore(a) + sleepPenalty(a), 96) },
    { label: "Time to fall asleep", you: toScale(latency(a) + three(a["switching-off"], 12, 7, 0), 94) },
    {
      label: "Staying asleep",
      reverse: true,
      you: toScale(
        (a["night-wakings"] === "Three or more" ? 84
          : a["night-wakings"] === "Twice" ? 62
          : a["night-wakings"] === "Once" ? 38
          : 16) + three(a["tired-but-cant-sleep"], 12, 7, 0),
        93,
      ),
    },
    {
      label: "Feeling rested",
      reverse: true,
      you: toScale(
        (a["daytime-tiredness"] === "Exhausted" ? 82
          : a["daytime-tiredness"] === "Quite tired" ? 62
          : a["daytime-tiredness"] === "A bit tired" ? 34
          : 14) + (a["last-rested"] === "Since before the kids" ? 14 : a["last-rested"] === "Over a year ago" ? 10 : 0),
        92,
      ),
    },
    { label: "Wired but tired", you: toScale(three(a["wired-but-tired"], 86, 54, 22), 93) },
    /* Two non-specific single answers, so this one tops out at the head of yellow
       however she answers. */
    {
      label: "Evening tension",
      you: toScale(three(a["physical-tension"], 70, 44, 18) + three(a.headaches, 20, 12, 0), 70),
    },
  ];
}

/* The chart window, matching the other funnels so all of them talk about the same
   eight weeks. */
export const CALM_HORIZON_DAYS = 56;

export type CalmProjection = {
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
/* A ceiling below 100. The worst possible set of answers summed past the top of the
   scale and drew a flat "100", which reads as a made-up maximum rather than a reading
   and implies a precision a questionnaire does not have. */
const MAX_START = 92;

/**
 * The future pacing curve: a screening score that starts high and falls toward the
 * settled band over twelve weeks. Steep early and flattening, the shape adherence
 * research reports rather than the straight line a linear model would draw.
 *
 * Returns null when the answers do not describe a raised pattern, so the screen can
 * say that plainly instead of drawing a drop that was never there.
 */
export function calmProjection(a: Answers): CalmProjection | null {
  const start = clamp(
    stressScore(a) * 0.5 +
      sleepPenalty(a) * 1.1 +
      latency(a) * 0.22 +
      three(a["wired-but-tired"], 14, 8, 0) +
      three(a["switching-off"], 10, 6, 0) +
      three(a["physical-tension"], 8, 5, 0),
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
