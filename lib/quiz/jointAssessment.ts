/**
 * Scoring for the joint quiz (/quiz/joint). Everything here is a screening score
 * built from self-reported symptoms, not a measurement: nothing in a
 * questionnaire substitutes for a vet exam, and the copy on the results pages
 * says so. Mirrors lib/quiz/itchAssessment.ts's own shape exactly.
 */
import type { Answers, Projection, Row } from "./assessment";

/** Her dog's name if she's given it yet, or a generic fallback. Read by every
    results screen below rather than each one falling back separately. */
export function dogName(a: Answers): string {
  return a["dog-name"]?.trim() || "your dog";
}

const has = (a: Answers, slug: string, option: string) => (a[slug]?.split("|") ?? []).includes(option);
const count = (a: Answers, slug: string, exclude: string) =>
  (a[slug]?.split("|") ?? []).filter((v) => v && v !== exclude).length;

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

const FREQUENCY_SCORE: Record<string, number> = {
  "Every morning, then it eases up": 55,
  "Constantly, it's hard to watch": 92,
  "Mostly after exercise or long walks": 62,
  "Comes and goes": 32,
};

const DURATION_SCORE: Record<string, number> = {
  "Under a month": 22,
  "1 to 6 months": 52,
  "6 months to a year": 72,
  "Over a year": 90,
};

/* Every marker lands at the top of the yellow band or into red, same
   convention itchRows uses and for the same reason: six bars that can read
   all-clear are telling her the quiz did not find anything. */
const FLOOR = 66;
const toScale = (raw: number, ceiling: number) => clamp(FLOOR + (clamp(raw) / 100) * (ceiling - FLOOR));

/* Large and giant breeds carry more weight on their joints, which is also
   why the actual product is formulated for 65+ lb dogs (see dog-joint.ts's
   FAQ). A small bonus on the root-cause row reflects that real risk factor
   rather than treating every size as equally likely to have joint wear. */
const sizeBonus = (a: Answers) =>
  a["dog-size"] === "Large (50-90 lbs)" || a["dog-size"] === "Extra large (90+ lbs)" ? 8 : 0;

/** The six parameters on the summary screen, in the order they're shown. */
export function jointRows(a: Answers): Row[] {
  const frequency = FREQUENCY_SCORE[a.frequency] ?? 40;
  const duration = DURATION_SCORE[a.duration] ?? 40;
  const signCount = count(a, "visible-signs", "None of these yet");
  const triggerCount = count(a, "triggers", "No clear pattern");

  return [
    /* The root-cause row, a composite of how often and how long, same role
       "Histamine response" plays on the itch quiz's own summary. */
    { label: "Joint inflammation", you: toScale(frequency * 0.55 + duration * 0.45 + sizeBonus(a), 96) },
    {
      label: "Cartilage wear",
      you: toScale((has(a, "visible-signs", "Limping or favoring a leg") || has(a, "visible-signs", "Trouble with stairs or jumping onto furniture") ? 78 : 26) + signCount * 4, 94),
    },
    { label: "Mobility and stiffness", you: toScale(frequency, 92) },
    { label: "Pain response", you: toScale(has(a, "visible-signs", "Limping or favoring a leg") ? 80 : 24, 90) },
    { label: "Activity avoidance", you: toScale(24 + triggerCount * 22, 88) },
    { label: "Sleep disruption", you: toScale(a.frequency === "Constantly, it's hard to watch" ? 82 : frequency * 0.4, 85) },
  ];
}

/** "higher than normal", "above average", or "on the high side of normal":
    reads the answers back rather than assuming every dog lands in the same
    place. Mirrors itchVerdict on the itch quiz's own summary. */
export function jointVerdict(rows: Row[]): string {
  const high = rows.filter((r) => r.you >= 71).length;
  if (high >= 4) return "higher than normal";
  if (high >= 1) return "above average";
  return "on the high side of normal";
}

/** now/after positions across the four-band "Very stiff" to "Very mobile"
    gauge, the same shape MetabolismGauge already draws for the diet funnel's
    slow-to-fast metabolism track. */
export type Mobility = { now: number; after: number };

export function mobility(a: Answers): Mobility {
  const rows = jointRows(a);
  const severity = rows.reduce((sum, r) => sum + r.you, 0) / rows.length;
  /* Right now sits inside the stiff half of the track, worse cases lower in
     it. The plan lands just inside "Very mobile", same convention the itch
     funnel's own gauge uses for its "after" marker. */
  const now = Math.max(4, Math.min(46, 46 - (severity / 100) * 30));
  return { now: Math.round(now), after: 79 };
}

/**
 * The before/after chart's curve, drawn on the same ProjectionChart component
 * the diet funnel uses for its weight curve. Reuses that component's own
 * `Projection` shape exactly (down to the `lb` field name, never shown here)
 * so no new chart code is needed: a `format` prop on the chart itself turns
 * these 0-100 severity numbers into a plain "High" or "Low" label at each
 * end, since this quiz reports severity in words, not a fake-precise score.
 */
export function jointProjection(a: Answers): Projection {
  const rows = jointRows(a);
  const start = Math.round(rows.reduce((sum, r) => sum + r.you, 0) / rows.length);
  const target = Math.round(start * 0.28);
  const weeks = 8;

  const points = Array.from({ length: weeks + 1 }, (_, week) => ({
    week,
    lb: Math.round(start - (start - target) * easeOut(week / weeks)),
  }));

  return { weeks, points, start, target, unit: "lb" };
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 1.7);
}

/** Whichever half of the 0-100 range a value falls in, since the chart never
    shows the number itself, only which side of the midpoint it's on. */
export function highLow(value: number, start: number, target: number): "High" | "Low" {
  return value >= (start + target) / 2 ? "High" : "Low";
}
