export type Answers = Record<string, string>;

const LB_PER_KG = 2.2046226218;

/** Weight in pounds whatever unit the user typed it in, rounded to a whole pound.
    Lives here, not in the client store, so it stays importable without React. */
export function poundsFrom(answers: Answers, key: string): number | null {
  const raw = Number(answers[key]);
  if (!raw || Number.isNaN(raw)) return null;
  return answers[key + "Unit"] === "kg" ? Math.round(raw * LB_PER_KG) : Math.round(raw);
}

/**
 * Turns quiz answers into the two result screens. Everything here is a screening
 * score built from self-reported symptoms, not a measurement: cortisol is measured
 * in blood or saliva, and nothing in a questionnaire substitutes for that. The
 * copy on the results pages says so, and this file should keep it true.
 */

export type Row = { label: string; you: number };

const yes = (a: Answers, slug: string) => a[slug] === "Yes";

/* The gauge draws seven equal segments, so the bands are sevenths of the track, not
   thirds. Keep these two in step with SEGMENTS in Charts.tsx. */
export const MEDIUM_FROM = 100 * (2 / 7);
export const HIGH_FROM = 100 * (5 / 7);

/* Every marker lands at the top of the yellow band or into red. A raw 0 is the top
   of yellow and a raw 100 is deep red, so answers still move the marker, they move it
   within that range rather than down into green. */
const FLOOR = 62;
const CEILING = 96;
const toScale = (raw: number) => Math.round(FLOOR + (clamp(raw) / 100) * (CEILING - FLOOR));

/** 0 to 100 on the drawn scale, where 100 is the most disrupted end. */
export function assessmentRows(a: Answers): Row[] {
  const stress = a["stress-level"];
  const sleep = a.sleep;
  const tired = a["daytime-tiredness"];

  const stressScore = stress === "I am usually always stressed" ? 85 : stress === "Only at certain moments of the day" ? 55 : 25;
  const sleepPenalty = sleep === "Less than 5 hours" ? 15 : sleep === "5 to 6 hours" ? 8 : 0;

  return [
    { label: "Cortisol level", you: toScale(stressScore + sleepPenalty) },
    { label: "Skin changes", you: toScale(yes(a, "skin-changes") ? 78 : 22) },
    { label: "Brain fog", you: toScale(yes(a, "brain-fog") ? 82 : 24) },
    { label: "Difficulty of losing weight", you: toScale(yes(a, "weight-loss-difficulty") ? 86 : 28) },
    {
      label: "Hunger level",
      /* Two signals: when energy drops in the day, and whether a full meal actually
         settles hunger. Still hungry after eating is the stronger of the two, so it
         adds on top rather than replacing the tiredness read. */
      you: toScale(
        (tired === "I usually feel tired all day long" ? 78
          : tired === "I feel tired before meals" ? 64
          : tired === "I feel sleepy after lunch" ? 50
          : 22) + (yes(a, "post-meal-hunger") ? 16 : 0),
      ),
    },
    { label: "Headaches level", you: toScale(yes(a, "headaches") ? 74 : 20) },
  ];
}

/** The word for a score, so the level is never carried by colour alone. */
export function levelWord(score: number): "Low" | "Medium" | "High" {
  return score < MEDIUM_FROM ? "Low" : score < HIGH_FROM ? "Medium" : "High";
}

/** How many markers land in the high band, which sets the headline. */
export function highCount(rows: Row[]): number {
  return rows.filter((r) => levelWord(r.you) === "High").length;
}

function clamp(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export type Projection = { weeks: number; points: { week: number; lb: number }[]; start: number; target: number };

/**
 * A weight curve at a rate mainstream guidance calls sustainable: about 1% of body
 * weight a week, floored at 12 weeks so the plan is never faster than that. It is an
 * illustration of a rate, not a prediction of a result, and the page labels it that way.
 * Returns null when the user has not given both weights, or is not trying to lose.
 */
export function projection(a: Answers): Projection | null {
  const start = poundsFrom(a, "weight");
  const target = poundsFrom(a, "targetWeight");
  if (start == null || target == null || target >= start) return null;

  const toLose = start - target;
  const perWeek = Math.max(0.5, start * 0.01);
  const weeks = Math.max(12, Math.ceil(toLose / perWeek));

  const points = Array.from({ length: weeks + 1 }, (_, week) => ({
    week,
    lb: Math.round(start - toLose * easeOut(week / weeks)),
  }));

  return { weeks, points, start, target };
}

/* Loss is fastest early and flattens, which is what the research on adherence shows,
   rather than the straight line a linear model would draw. */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 1.7);
}
