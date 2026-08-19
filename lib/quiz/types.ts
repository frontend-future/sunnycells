/**
 * The quiz engine's shape. Nothing in here knows about a specific quiz: a funnel is
 * a QuizConfig, and the chrome, step renderers, and routing helpers all read from it.
 * To add a quiz, write a config and two thin route files. Do not fork the engine.
 */

export type Step =
  | { slug: string; kind: "single"; question: string; options: string[] }
  | {
      slug: string;
      kind: "info";
      question: string;
      body: string;
      bullets?: string[];
      /** Marker for each bullet. Defaults to a dot. Use "check" only where the list
          is benefits: a tick beside a symptom reads as a good thing. */
      bulletIcon?: "check";
      /** Optional line after the bullets, before the button. */
      footnote?: string;
      /** Centres the question under the wordmark, for the brand-statement screen. */
      brandHeading?: boolean;
      cta: string;
    }
  | { slug: string; kind: "height"; question: string }
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
    } else if (step.kind === "number") {
      const value = answers[step.key];
      if (value) out[step.question] = `${value} ${answers[step.key + "Unit"] ?? ""}`.trim();
    } else if (step.kind === "height") {
      if (answers.heightUnit === "cm") {
        if (answers.heightCm) out[step.question] = `${answers.heightCm} cm`;
      } else if (answers.heightFeet) {
        out[step.question] = `${answers.heightFeet} ft ${answers.heightInches ?? 0} in`;
      }
    }
  }
  return out;
}
