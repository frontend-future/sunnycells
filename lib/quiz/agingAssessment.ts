import type { Answers } from "./assessment";
import type { Row } from "./assessment";

/**
 * Turns aging quiz answers into the result screens, the same way the other two
 * funnels do. Everything here is a screening score built from self-reported answers,
 * not a measurement. Nothing in a questionnaire measures collagen, and the copy on the
 * results pages says so.
 */

/* Same floor and ceilings logic as the diet assessment: every marker sits above green,
   and each carries its own ceiling set by how much the quiz actually knows about it. A
   profile that reads identically on all six lines is telling you it measured nothing,
   so the single-answer rows top out lower than the composites. */
const FLOOR = 66;
const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const toScale = (raw: number, ceiling: number) => Math.round(FLOOR + (clamp(raw) / 100) * (ceiling - FLOOR));

export function agingRows(a: Answers): Row[] {
  const lines = a["fine-lines"];
  const hair = a["hair-condition"];
  const skin = a["skin-feel"];
  const age = Number(a.age);
  const protein = Number(a.proteinDays);

  const lineScore =
    lines === "Yes, they are impossible to miss" ? 88
    : lines === "I have noticed, they are fine but visible" ? 62
    : lines === "Not really, they are barely there" ? 34
    : 20;

  const hairScore =
    hair === "Shedding more and starting to thin" ? 84
    : hair === "My part is getting wider, I see more scalp" ? 78
    : hair === "Stuck, I cannot get it to grow" ? 60
    : 22;

  /* Collagen synthesis falls about a percent a year from the mid twenties, so age is
     the one row the quiz can read without asking how anything looks. */
  const ageScore = Number.isFinite(age) ? Math.min(92, Math.max(10, (age - 25) * 2.4)) : 45;
  /* Protein is the raw material. Fewer days is a bigger gap to close. */
  const proteinScore = Number.isFinite(protein) ? Math.max(12, 90 - protein * 11) : 45;

  return [
    { label: "Collagen decline", you: toScale(ageScore, 95) },
    { label: "Fine lines", you: toScale(lineScore, 94) },
    { label: "Skin firmness", you: toScale(lineScore * 0.8 + (skin === "Dry and flaky" ? 18 : 0), 92) },
    { label: "Hair and nails", you: toScale(hairScore, 93) },
    { label: "Protein intake", you: toScale(proteinScore, 88) },
    { label: "Hydration", you: toScale(skin === "Dry and flaky" ? 80 : skin === "Combination" ? 48 : 24, 70) },
  ];
}

/** The four bands of the skin support track, and the band a position falls in. */
export const SUPPORT_LABELS = ["Very low", "Low", "Good", "Very good"] as const;

export function supportLabel(pct: number): (typeof SUPPORT_LABELS)[number] {
  return SUPPORT_LABELS[Math.min(SUPPORT_LABELS.length - 1, Math.floor((pct / 100) * SUPPORT_LABELS.length))];
}

/* Mirrors the diet gauge exactly: "right now" stays inside the second band and moves
   within it, the plan lands just inside the fourth. The two marker labels share a row
   with nothing joining them to their arrows, so they clear each other by position. */
const NOW_BAND: [number, number] = [27, 34];
const AFTER = 79;

export function collagenSupport(a: Answers): { now: number; after: number } {
  const age = Number(a.age);
  const protein = Number(a.proteinDays);
  const raw =
    (Number.isFinite(age) ? Math.min(90, Math.max(10, (age - 25) * 2.4)) : 45) * 0.6 +
    (Number.isFinite(protein) ? Math.max(10, 90 - protein * 11) : 45) * 0.4;

  const t = Math.max(0, Math.min(1, raw / 100));
  return { now: Math.round(NOW_BAND[1] - t * (NOW_BAND[1] - NOW_BAND[0])), after: AFTER };
}

/* The chart window, matching the other two funnels so all three talk about the same
   eight weeks. */
export const SKIN_HORIZON_DAYS = 56;

export type SkinProjection = {
  weeks: number;
  points: { week: number; value: number }[];
  start: number;
  target: number;
};

/**
 * A curve from the age her skin looks now to the one she wants it to look, at a rate
 * that takes at least twelve weeks. It is an illustration of a rate, not a prediction,
 * and the page labels it that way. Returns null unless she asked for a lower number
 * than she gave.
 */
export function skinProjection(a: Answers): SkinProjection | null {
  const start = Number(a.skinAge);
  const target = Number(a.targetSkinAge);
  if (!Number.isFinite(start) || !Number.isFinite(target) || target >= start) return null;

  const drop = start - target;
  const weeks = Math.max(12, Math.ceil(drop * 3));
  const points = Array.from({ length: weeks + 1 }, (_, week) => ({
    week,
    value: start - drop * easeOut(week / weeks),
  }));

  return { weeks, points, start, target };
}

/* Fast early then flattening, which is the shape the collagen trials report rather than
   the straight line a linear model would draw. */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 1.7);
}
