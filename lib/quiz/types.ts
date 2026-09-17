/**
 * The quiz engine's shape. Nothing in here knows about a specific quiz: a funnel is
 * a QuizConfig, and the chrome, step renderers, and routing helpers all read from it.
 * To add a quiz, write a config and two thin route files. Do not fork the engine.
 */

export type Step =
  | {
      slug: string;
      kind: "single";
      question: string;
      options: string[];
      /** Small compliance line under the options, the same idea as `dob`'s
          `reason`: an ask that feels invasive (spend, a fear) lands better with
          one sentence on why it's being asked. */
      reason?: string;
    }
  | {
      slug: string;
      kind: "multi";
      question: string;
      /** "Select all that apply". Answer stores as the chosen options joined with
          "|", since a single string is all the store holds and none of these
          option sets contain that character. */
      options: string[];
      cta?: string;
      reason?: string;
    }
  | {
      slug: string;
      kind: "info";
      question: string;
      body: string;
      /** A plain bullet, or one with a leading run of text set bold and underlined
          (the cause name in a causes-and-actives list, say), the rest plain. */
      bullets?: (string | { strong: string; rest: string })[];
      /** Marker for each bullet. Defaults to a dot. Use "check" only where the list
          is benefits: a tick beside a symptom reads as a good thing. */
      bulletIcon?: "check";
      /** Optional line after the bullets, before the button. */
      footnote?: string;
      /** Centres the question under the wordmark, for the brand-statement screen. */
      brandHeading?: boolean;
      /** Centres, bolds and enlarges the question, for a title screen that needs to
          hit harder than a regular question heading but isn't the brand statement.
          Ignored when `invert` is set: that layout has its own heading treatment. */
      emphasize?: boolean;
      /** Dark, full-bleed reassurance screen (ink background, white text, the
          product floating above the headline) instead of the default light info
          layout. For a "we've got you" screen right after a run of symptom
          questions, mirroring the reveal-and-reassure pattern competitors use. */
      invert?: boolean;
      /** A portrait or product shot above the body, for a screen naming a specific
          person (a formulating physician, say) or reinforcing the product itself.
          `size` overrides the default 420px width. On an `invert` screen this
          renders uncropped rather than in the usual round frame, unless `frame`
          is "card": a slightly rotated, drop-shadowed rounded photo, for a UGC
          shot rather than a cut-out product render. */
      image?: { src: string; alt: string; size?: number; frame?: "card" };
      cta: string;
    }
  | { slug: string; kind: "height"; question: string }
  | {
      slug: string;
      kind: "text";
      question: string;
      placeholder: string;
    }
  | {
      slug: string;
      kind: "dob";
      question: string;
      /** The innocuous line under the fields explaining why we ask for a birth date
          instead of just an age, e.g. "To us, age is just a number, but it helps us...". */
      reason: string;
    }
  | {
      slug: string;
      kind: "number";
      question: string;
      /** Where the value is stored, so later screens can read it by a stable name. */
      key: string;
      /** Two entries switch units. Identical entries render no switch. */
      units: [string, string];
      /** Text before the field, e.g. "I am". */
      prefix?: string;
      /** Text after the field when there is no unit switch, e.g. "years old". */
      trailing?: string;
      label: string;
      min: number;
      max: number;
    }
  | {
      slug: string;
      kind: "email";
      question: string;
      /** Second line of the heading, set lighter under the question. */
      subhead: string;
      placeholder: string;
      /** Reassurance under the field. Say what you will not do with the address. */
      privacy: string;
      cta: string;
      /** Label on the badge under the button. Omit for no badge. */
      badge?: string;
    };

export type QuizConfig = {
  /** Namespaces stored answers, so two quizzes never read each other's. */
  id: string;
  /** Where the funnel lives, with no trailing slash, e.g. "/quiz/diet". */
  basePath: string;
  /** Where the last step hands off, e.g. "/quiz/diet/results/analyzing". */
  resultsPath: string;
  steps: Step[];
};

/** Whole years from a stored dob, as of today. Null if the three fields are not all
    there yet, so a screen mid-fill never shows a nonsense age. */
export function ageFromAnswers(answers: Record<string, string>): number | null {
  const month = Number(answers.dobMonth);
  const day = Number(answers.dobDay);
  const year = Number(answers.dobYear);
  if (!month || !day || !year) return null;

  const today = new Date();
  let age = today.getFullYear() - year;
  const beforeBirthday =
    today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day);
  if (beforeBirthday) age -= 1;
  return age;
}

/** Swaps a literal "{name}" placeholder for an answer collected earlier in the
    same quiz (a pet's name, say), or `fallback` if she has not reached that
    step yet. A quiz that never writes "{name}" into its own copy is untouched:
    replacing a substring that is not there is a no-op. */
function personalize(text: string, name: string): string {
  return text.includes("{name}") ? text.split("{name}").join(name) : text;
}

/** Applies `personalize` to every string field a step can show, so a question
    written once with "{name}" in it reads correctly wherever the engine quotes
    it back to her, without every screen doing its own find-and-replace. */
export function personalizeStep(step: Step, name: string): Step {
  const p = (s: string) => personalize(s, name);
  switch (step.kind) {
    case "single":
    case "multi":
      return { ...step, question: p(step.question), options: step.options.map(p), reason: step.reason ? p(step.reason) : step.reason };
    case "info":
      return {
        ...step,
        question: p(step.question),
        body: p(step.body),
        footnote: step.footnote ? p(step.footnote) : step.footnote,
        bullets: step.bullets?.map((b) => (typeof b === "string" ? p(b) : { strong: p(b.strong), rest: p(b.rest) })),
      };
    case "email":
      return { ...step, question: p(step.question), subhead: p(step.subhead), placeholder: p(step.placeholder), cta: p(step.cta), badge: step.badge ? p(step.badge) : step.badge };
    case "text":
      return { ...step, question: p(step.question), placeholder: p(step.placeholder) };
    default:
      return step;
  }
}

export function stepIndex(config: QuizConfig, slug: string): number {
  return config.steps.findIndex((s) => s.slug === slug);
}

export function nextHref(config: QuizConfig, index: number): string {
  const next = config.steps[index + 1];
  return next ? `${config.basePath}/${next.slug}` : config.resultsPath;
}

export function prevHref(config: QuizConfig, index: number): string {
  const prev = config.steps[index - 1];
  return prev ? `${config.basePath}/${prev.slug}` : config.basePath;
}

/**
 * Turns stored answers into a readable question-to-answer map for the lead
 * notification. Reads each step rather than dumping the raw store, so the alert says
 * "How much do you usually sleep?" instead of "sleep", and unit-bearing answers come
 * through with their unit attached.
 */
export function buildAnswersPayload(
  config: QuizConfig,
  answers: Record<string, string>,
): Record<string, string> {
  const out: Record<string, string> = {};
  if (answers.gender) out["Gender"] = answers.gender;

  for (const step of config.steps) {
    if (step.kind === "single") {
      if (answers[step.slug]) out[step.question] = answers[step.slug];
    } else if (step.kind === "multi") {
      if (answers[step.slug]) out[step.question] = answers[step.slug].split("|").join(", ");
    } else if (step.kind === "number") {
      const value = answers[step.key];
      if (value) out[step.question] = `${value} ${answers[step.key + "Unit"] ?? ""}`.trim();
    } else if (step.kind === "text") {
      if (answers[step.slug]) out[step.question] = answers[step.slug];
    } else if (step.kind === "height") {
      if (answers.heightUnit === "cm") {
        if (answers.heightCm) out[step.question] = `${answers.heightCm} cm`;
      } else if (answers.heightFeet) {
        out[step.question] = `${answers.heightFeet} ft ${answers.heightInches ?? 0} in`;
      }
    } else if (step.kind === "dob") {
      const age = ageFromAnswers(answers);
      if (answers.dobMonth && answers.dobDay && answers.dobYear) {
        out[step.question] =
          `${answers.dobMonth}/${answers.dobDay}/${answers.dobYear}` + (age != null ? ` (age ${age})` : "");
      }
    }
  }
  return out;
}
