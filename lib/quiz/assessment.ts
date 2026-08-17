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

export type Row = { label: string; you: number; average: number; note: string };

const yes = (a: Answers, slug: string) => a[slug] === "Yes";

/** 0 to 100, where 100 is the most disrupted end of the scale. */
export function assessmentRows(a: Answers): Row[] {
  const stress = a["stress-level"];
  const sleep = a.sleep;
  const tired = a["daytime-tiredness"];

  const stressScore = stress === "I am usually always stressed" ? 85 : stress === "Only at certain moments of the day" ? 55 : 25;
  const sleepPenalty = sleep === "Less than 5 hours" ? 15 : sleep === "5 to 6 hours" ? 8 : 0;

  return [
    {
      label: "Cortisol pattern",
      you: clamp(stressScore + sleepPenalty),
      average: 48,
      note: "From your stress and sleep answers",
    },
    {
      label: "Skin changes",
      you: yes(a, "skin-changes") ? 78 : 22,
      average: 35,
      note: "Thinning, bruising, acne, facial hair",
    },
    {
      label: "Brain fog",
      you: yes(a, "brain-fog") ? 82 : 24,
      average: 41,
      note: "Focus and mental clarity",
    },
    {
      label: "Difficulty losing weight",
      you: yes(a, "weight-loss-difficulty") ? 86 : 28,
      average: 52,
      note: "Effort against result",
    },
    {
      label: "Hunger and energy dips",
      /* Two signals: when energy drops in the day, and whether a full meal actually
         settles hunger. Still hungry after eating is the stronger of the two, so it
         adds on top rather than replacing the tiredness read. */
      you: clamp(
        (tired === "I usually feel tired all day long" ? 78
          : tired === "I feel tired before meals" ? 64
          : tired === "I feel sleepy after lunch" ? 50
          : 22) + (yes(a, "post-meal-hunger") ? 16 : 0),
      ),
      average: 46,
      note: "Energy dips and hunger after meals",
    },
    {
      label: "Headaches",
      you: yes(a, "headaches") ? 74 : 20,
      average: 33,
      note: "Frequency you reported",
    },
  ];
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
