/**
 * Scoring for the itch quiz (/quiz/itch). Everything here is a screening score
 * built from self-reported symptoms, not a measurement: nothing in a
 * questionnaire substitutes for a vet exam, and the copy on the results pages
 * says so.
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
  "A few times a day": 55,
  "Constantly, it's hard to watch": 92,
  "Mostly at night": 62,
  "Comes and goes": 32,
};

const DURATION_SCORE: Record<string, number> = {
  "Under a month": 22,
  "1 to 6 months": 52,
  "6 months to a year": 72,
  "Over a year": 90,
};

/* Every marker lands at the top of the yellow band or into red: the floor is
   above green, so no answer puts a marker there, same convention the diet
   funnel's own assessment rows use (see toScale there) and for the same
   reason: six bars that can read all-clear are telling her the quiz did not
   find anything, which undersells a dog who is visibly struggling. Raw
   severity still moves the marker within that range, so an answer that does
   not indicate the problem sits at the floor (high yellow) while one that
   does clears into red quickly. */
const FLOOR = 66;
const toScale = (raw: number, ceiling: number) => clamp(FLOOR + (clamp(raw) / 100) * (ceiling - FLOOR));

/** The six parameters on the summary screen, in the order they're shown. */
export function itchRows(a: Answers): Row[] {
  const frequency = FREQUENCY_SCORE[a.frequency] ?? 40;
  const duration = DURATION_SCORE[a.duration] ?? 40;
  const signCount = count(a, "visible-signs", "None of these yet");
  const triggerCount = count(a, "triggers", "No clear pattern");

  return [
    /* The root-cause row, a composite of how often and how long, same role
       "Cortisol level" plays on the diet funnel's own summary. */
    { label: "Histamine response", you: toScale(frequency * 0.55 + duration * 0.45, 96) },
    {
      label: "Skin irritation",
      you: toScale((has(a, "visible-signs", "Red or irritated skin") || has(a, "visible-signs", "Scabs or hot spots") ? 78 : 26) + signCount * 4, 94),
    },
    { label: "Itch-scratch cycle", you: toScale(frequency, 92) },
    { label: "Coat and hair loss", you: toScale(has(a, "visible-signs", "Bald patches or thinning fur") ? 80 : 24, 90) },
    { label: "Allergy trigger exposure", you: toScale(24 + triggerCount * 22, 88) },
    { label: "Sleep disruption", you: toScale(a.frequency === "Mostly at night" ? 82 : frequency * 0.4, 85) },
  ];
}

/** "higher than normal", "above average", or "on the high side of normal":
    reads the answers back rather than assuming every dog lands in the same
    place. Mirrors verdict() on the diet funnel's own summary. */
export function itchVerdict(rows: Row[]): string {
  const high = rows.filter((r) => r.you >= 71).length;
  if (high >= 4) return "higher than normal";
  if (high >= 1) return "above average";
  return "on the high side of normal";
}

/** now/after positions across the four-band "Very itchy" to "Very
    comfortable" gauge, the same shape MetabolismGauge already draws for the
    diet funnel's slow-to-fast metabolism track. */
export type Comfort = { now: number; after: number };

export function comfort(a: Answers): Comfort {
  const rows = itchRows(a);
  const severity = rows.reduce((sum, r) => sum + r.you, 0) / rows.length;
  /* Right now sits inside the itchy half of the track, worse cases lower in
     it. The plan lands just inside "Very comfortable", same convention the
     diet funnel's own gauge uses for its "after" marker. */
  const now = Math.max(4, Math.min(46, 46 - (severity / 100) * 30));
  /* 79, not further right: the same "just inside the last band" position the
     diet and brain funnels use for their own after-marker, which is also
     where a longer label like this one still clears the card's right edge. */
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
export function itchProjection(a: Answers): Projection {
  const rows = itchRows(a);
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
