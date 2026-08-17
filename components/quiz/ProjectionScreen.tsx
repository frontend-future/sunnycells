"use client";

import { projection } from "@/lib/quiz/assessment";
import { dietQuiz } from "@/lib/quiz/diet";
import { useAnswers } from "@/lib/quiz/store";
import { ProjectionChart } from "./Charts";
import { NextButton } from "./NextButton";
import { ResultsShell, ResultsHeading } from "./ResultsShell";

export function ProjectionScreen() {
  const { answers, ready } = useAnswers(dietQuiz.id);
  const p = projection(answers);

  return (
    <ResultsShell>
      <ResultsHeading eyebrow="Your weight timeline">
        {p ? `${p.start - p.target} lb over about ${p.weeks} weeks` : "Your weight timeline"}
      </ResultsHeading>

      {!ready ? null : p ? (
        <>
          <p style={{ marginTop: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--ink-80)" }}>
            From {p.start} lb to your target of {p.target} lb. The curve is steeper at the
            start because that is how loss usually runs, then it flattens.
          </p>
          <div style={{ marginTop: "var(--space-8)" }}>
            <ProjectionChart p={p} />
          </div>
        </>
      ) : (
        <p style={{ marginTop: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--ink-80)" }}>
          You did not set a target below your current weight, so there is no loss curve to
          draw. The rest of your results still apply, and cortisol work is worth doing at
          any weight.
        </p>
      )}

      <div
        style={{
          marginTop: "var(--space-10)",
          padding: "var(--space-5)",
          background: "var(--surface-sunk)",
          border: "1px solid var(--border-hairline)",
          borderRadius: "var(--radius-card)",
        }}
      >
        <p style={{ margin: 0, fontSize: "var(--size-meta)", lineHeight: 1.55, color: "var(--ink-80)" }}>
          No supplement causes weight loss on its own, and this one does not claim to. The
          curve above is the rate a sustained calorie deficit tends to produce. Where
          cortisol comes in is the part that makes the deficit hard to hold: broken sleep,
          appetite swings, and the fat that settles around the middle.
        </p>
      </div>

      <div style={{ marginTop: "var(--space-10)" }}>
        <NextButton href="/quiz/diet/results/science">What is in the blend</NextButton>
      </div>
    </ResultsShell>
  );
}
