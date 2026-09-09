/**
 * Where a URL sits in its funnel.
 *
 * The whole point is the `index`. With it, one chart of quiz_step broken down by index
 * is the dropoff curve across every step at once. Without it you would have to define
 * a 22 step funnel by hand, four times, and redefine it whenever a slug changes.
 *
 * Step 0 is the landing page, because gender is answered there rather than on a step
 * of its own, so the first drop in the funnel is the one between arriving and tapping
 * a gender.
 */

export type FunnelStep = {
  quiz: string;
  /** 0 for the landing page, then one per step, then the results screens. */
  index: number;
  slug: string;
  stage: "landing" | "question" | "results";
};

/* The order each funnel's results screens actually run in, read off the NextButton
   hrefs in the screens themselves rather than off the folder listing, which is
   alphabetical and wrong. */
const RESULTS: Record<string, string[]> = {
  diet: ["analyzing", "summary", "projection", "metabolism", "benefits", "story", "plans", "checkout"],
  aging: ["analyzing", "summary", "projection", "collagen", "benefits", "story", "plans", "checkout"],
  energy: ["analyzing", "summary", "projection", "caffeine", "benefits", "story", "plans", "checkout"],
  cortisol: ["analyzing", "summary", "projection", "benefits", "plans", "checkout"],
  calm: ["analyzing", "summary", "projection", "benefits", "plans", "checkout"],
};

/* Slugs come from the configs so a renamed step cannot silently fall out of the
   funnel, and the import is dynamic so five quizzes' worth of question text does not
   ride in the bundle of every page on the site. Cached after the first quiz view. */
let ORDER: Record<string, string[]> | null = null;

async function order(): Promise<Record<string, string[]>> {
  if (ORDER) return ORDER;
  const [{ dietQuiz }, { agingQuiz }, { energyQuiz }, { cortisolQuiz }, { calmQuiz }] =
    await Promise.all([
      import("../quiz/diet.ts"),
      import("../quiz/aging.ts"),
      import("../quiz/energy.ts"),
      import("../quiz/cortisol.ts"),
      import("../quiz/calm.ts"),
    ]);
  ORDER = {};
  for (const q of [dietQuiz, agingQuiz, energyQuiz, cortisolQuiz, calmQuiz]) {
    const id = q.id;
    ORDER[id] = ["", ...q.steps.map((s) => s.slug), ...(RESULTS[id] ?? []).map((r) => `results/${r}`)];
  }
  return ORDER;
}

/** Null for anything that is not part of a funnel, which is most of the site. */
export async function funnelStepFor(pathname: string): Promise<FunnelStep | null> {
  const m = /^\/quiz\/([a-z]+)(?:\/(.+))?$/.exec(pathname.replace(/\/$/, ""));
  if (!m) return null;
  const [, quiz, rest = ""] = m;
  const list = (await order())[quiz];
  if (!list) return null;
  const index = list.indexOf(rest);
  if (index < 0) return null;
  return {
    quiz,
    index,
    slug: rest || "landing",
    stage: index === 0 ? "landing" : rest.startsWith("results/") ? "results" : "question",
  };
}
