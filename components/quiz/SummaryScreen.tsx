"use client";

import { assessmentRows } from "@/lib/quiz/assessment";
import { dietQuiz } from "@/lib/quiz/diet";
import { useAnswers } from "@/lib/quiz/store";
import { AssessmentChart } from "./Charts";
import { StickyCta } from "./StickyCta";
import { NextButton } from "./NextButton";
import { ResultsShell, ResultsHeading } from "./ResultsShell";

export function SummaryScreen() {
  const { answers, ready } = useAnswers(dietQuiz.id);
  const rows = assessmentRows(answers);
  const elevated = rows.filter((r) => r.you > r.average).length;

  return (
    <ResultsShell>
      <ResultsHeading eyebrow="Your stress assessment">
        {ready && elevated > 0
          ? `${elevated} of 6 markers sit above the reference average`
          : "Where your answers sit"}
      </ResultsHeading>

      <p style={{ marginTop: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--ink-80)" }}>
        The bar is your score from the answers you gave. The tick is the average across
        people who took the same questionnaire. Higher means more disrupted, so a bar
        past the tick is a marker worth working on.
      </p>

      <div style={{ marginTop: "var(--space-8)" }}>
        <AssessmentChart rows={rows} />
      </div>

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
          This is a screening questionnaire built from self-reported symptoms, not a
          measurement. Cortisol is measured in blood, saliva, or urine, and a doctor is
          the only person who can read that result in context. If several markers here
          are high, that conversation is worth having.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/diet/results/projection">See my timeline</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
