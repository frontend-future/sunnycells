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
      /** Optional line after the bullets, before the button. */
      footnote?: string;
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
  | { slug: string; kind: "email"; question: string; body: string; cta: string };

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
