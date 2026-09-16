/**
 * Scoring for the brain age quiz (/quiz/brain/v3). Everything here is a screening
 * estimate built from self-reported answers, not a measurement: nothing in a
 * questionnaire measures a real biological brain age, and the copy on the results
 * pages says so.
 */
import { ageFromAnswers } from "./types";
import type { Answers } from "./assessment";

const multiSelections = (a: Answers, slug: string, noneLabel: string): number => {
  if (!a[slug]) return 0;
  return a[slug].split("|").filter((v) => v && v !== noneLabel).length;
};

/* Each signal adds a fixed amount, capped so no single question can dominate the
   result. Ceiling of 11 across every signal below. */
export function brainAgeSeverity(a: Answers): number {
  let severity = 0;
  if (a["decline-check"] === "Yes") severity += 2;
  severity += Math.min(3, multiSelections(a, "symptoms", "None of the above"));
  severity += Math.min(2, multiSelections(a, "daily-issues", "None"));
  severity += Math.min(2, multiSelections(a, "habits", "None of the above"));
  if (a["mental-engagement"] === "Never") severity += 1;
  if (a["brain-healthy-eating"] === "Never") severity += 1;
  return severity;
}

const SEVERITY_CEILING = 11;
/* However mild the answers, the gap never reads as "basically fine": 5 years
   is the floor. However severe, it never reads as implausible: 15 years is the
   ceiling. Both ends are a design choice, not a measurement. */
const GAP_FLOOR = 5;
const GAP_CEILING = 15;

/** Years added to her real age for the reported "brain age". Always sizably
    higher, never a wild number. */
export function brainAgeGap(a: Answers): number {
  const t = Math.max(0, Math.min(1, brainAgeSeverity(a) / SEVERITY_CEILING));
  return Math.round(GAP_FLOOR + t * (GAP_CEILING - GAP_FLOOR));
}

export type BrainAge = { real: number; brain: number; gap: number };

export function computedBrainAge(a: Answers): BrainAge | null {
  const real = ageFromAnswers(a);
  if (real == null) return null;
  const gap = brainAgeGap(a);
  return { real, brain: real + gap, gap };
}

/* How many years back "last felt sharp" reads as, for the target age below. */
const SHARP_YEARS_BACK: Record<string, number> = {
  "Less than 1 year": 0.5,
  "1 to 3 years": 2,
  "3 to 5 years": 4,
  "More than 5 years": 6,
};

/** The age she was when she last felt sharp: real age minus however long ago that
    was. This is the target the 90 day projection and the offer page's progress
    tracker both aim at, not her current real age. */
export function targetAge(a: Answers): number | null {
  const real = ageFromAnswers(a);
  if (real == null) return null;
  const back = SHARP_YEARS_BACK[a["last-sharp"]] ?? 2;
  return Math.max(18, Math.round(real - back));
}

export type BrainAgeProjection = {
  weeks: number;
  points: { week: number; lb: number }[];
  start: number;
  target: number;
  unit: "lb";
};

/* 90 days, same horizon the original brain quiz's clarity chart runs on. */
export const BRAIN_AGE_HORIZON_DAYS = 90;

/**
 * A brain age curve from where the quiz places her today down to her target by
 * day 90. Declining, unlike the original clarity chart: brain age is a "lower is
 * better" number, the same direction weight is for the diet funnel's own chart.
 */
export function brainAgeProjection(a: Answers): BrainAgeProjection | null {
  const age = computedBrainAge(a);
  const target = targetAge(a);
  if (!age || target == null || target >= age.brain) return null;

  const weeks = Math.ceil(BRAIN_AGE_HORIZON_DAYS / 7);
  const points = Array.from({ length: weeks + 1 }, (_, week) => ({
    week,
    lb: Math.round(age.brain - (age.brain - target) * easeOut(week / weeks)),
  }));

  return { weeks, points, start: age.brain, target, unit: "lb" };
}

/* Left alone, brain age drifts up rather than down: a slow worsening, not a
   cliff. Same -0.1 shape (nearly flat at first, tapering harder later) as the
   original clarity chart's without-curve, scaled down since a brain age gap is
   naturally a small number of years, not a 0 to 100 index. Safe against
   ProjectionChart's padAbove for any gap brainAgeGap() can produce: see
   BRAIN_AGE_PAD_ABOVE below. */
export function withoutAgingCurve(t: number): number {
  return -0.1 * t * t;
}

/* ProjectionChart pads the y axis above the (here, higher) start point by this
   fraction of the start-to-target gap. withoutAgingCurve(1) = -0.1 pushes the
   "without" line up by 0.1 * gap past start; 0.3 leaves 3x that as headroom, for
   any real gap between GAP_FLOOR and GAP_CEILING. */
export const BRAIN_AGE_PAD_ABOVE = 0.3;

/** Same now/after bands the diet and energy funnels use for MetabolismGauge:
    "now" sits inside the Slow quarter, "after" lands just inside Very fast. */
const NOW_BAND: [number, number] = [27, 34];
const AFTER = 79;

export function cognitiveEnergyGauge(a: Answers): { now: number; after: number } {
  const t = Math.max(0, Math.min(1, brainAgeSeverity(a) / SEVERITY_CEILING));
  return { now: Math.round(NOW_BAND[1] - t * (NOW_BAND[1] - NOW_BAND[0])), after: AFTER };
}

/** One row per active, so the same chart component the original brain quiz uses
    for its "what's happening" screen works here too. */
export function brainV3Rows(a: Answers) {
  const t = Math.max(0, Math.min(1, brainAgeSeverity(a) / SEVERITY_CEILING));
  const FLOOR = 66;
  const scale = (raw: number) => Math.round(FLOOR + raw * (96 - FLOOR));
  return [
    { label: "Memory and recall", you: scale(t) },
    { label: "Focus and concentration", you: scale(Math.min(1, t + 0.05)) },
    { label: "Mental fog", you: scale(t) },
    { label: "Energy through the day", you: scale(Math.max(0, t - 0.05)) },
  ];
}

/** Which of her own selected symptoms map to which active, so this screen reads
    back her actual answers rather than showing the same reveal to everyone. Each
    concern names the real mechanism, not a restated symptom. */
const CONCERN_MAP: { slug: "symptoms" | "daily-issues"; match: string; answer: string }[] = [
  { slug: "symptoms", match: "Brain fog or fatigue", answer: "Cellular energy support with Acetyl-L-Carnitine" },
  { slug: "symptoms", match: "Trouble finding words", answer: "Healthy blood flow with Ginkgo Biloba Extract" },
  { slug: "symptoms", match: "Losing focus easily", answer: "Antioxidant defense with N-Acetyl-L-Cysteine and Alpha Lipoic Acid" },
  { slug: "symptoms", match: "Trouble following conversations", answer: "Healthy blood flow with Ginkgo Biloba Extract" },
  { slug: "symptoms", match: "Forgetting names or appointments", answer: "Memory support with Phosphatidylserine and Huperzine A" },
  { slug: "daily-issues", match: "Forgetting where I put things", answer: "Memory support with Phosphatidylserine and Huperzine A" },
  { slug: "daily-issues", match: "Low energy or motivation", answer: "Cellular energy support with Acetyl-L-Carnitine" },
  { slug: "daily-issues", match: "Mood swings or irritability", answer: "Antioxidant defense with N-Acetyl-L-Cysteine and Alpha Lipoic Acid" },
];

export function concernsAddressed(a: Answers): { concern: string; answer: string }[] {
  const seen = new Set<string>();
  const rows: { concern: string; answer: string }[] = [];
  for (const row of CONCERN_MAP) {
    const picked = a[row.slug]?.split("|") ?? [];
    if (picked.includes(row.match) && !seen.has(row.answer)) {
      seen.add(row.answer);
      rows.push({ concern: row.match, answer: row.answer });
    }
  }
  /* Nobody left with an empty reveal: a quiz answered entirely with "none of the
     above" still gets the formula's own headline mechanism. */
  if (rows.length === 0) {
    rows.push({ concern: "Keeping your mind sharp as you age", answer: "All six actives, working together" });
  }
  return rows.slice(0, 4);
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 1.7);
}

/** Short tags for the offer page's progress band, built from her own answers
    rather than shown the same to everyone. Falls back to the formula's own three
    causes if nothing matched, so the band is never empty. */
export function offerTags(a: Answers): string[] {
  const symptoms = a.symptoms?.split("|") ?? [];
  const dailyIssues = a["daily-issues"]?.split("|") ?? [];
  const tags: string[] = [];

  if (symptoms.includes("Brain fog or fatigue") || dailyIssues.includes("Low energy or motivation")) {
    tags.push("Low cognitive energy");
  }
  if (symptoms.includes("Trouble following conversations") || symptoms.includes("Trouble finding words")) {
    tags.push("Poor blood flow");
  }
  if (dailyIssues.includes("Mood swings or irritability")) {
    tags.push("Oxidative stress");
  }
  if (a["exercise-status"] === "Not really") {
    tags.push("Low activity");
  }

  return tags.length ? tags.slice(0, 4) : ["Low cognitive energy", "Poor blood flow", "Oxidative stress"];
}
