"use client";

import { assessmentRows, highCount, type Row } from "@/lib/quiz/assessment";
import { dietQuiz } from "@/lib/quiz/diet";
import { useAnswers } from "@/lib/quiz/store";
import { AssessmentChart } from "./Charts";
import { NextButton } from "./NextButton";
import { ResultsShell } from "./ResultsShell";
import { StickyCta } from "./StickyCta";

/** The headline reads back what the answers actually said, rather than assuming
    everyone lands in the same place. */
function verdict(rows: Row[]): string {
  const high = highCount(rows);
  if (high >= 4) return "higher than normal";
  if (high >= 2) return "a little above normal";
  return "close to normal";
}

export function SummaryScreen() {
  const { answers, ready } = useAnswers(dietQuiz.id);
  const rows = assessmentRows(answers);
  const women = answers.gender !== "Male";

  return (
    <ResultsShell>
      <h1
        style={{
          margin: "0 0 var(--space-8)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--size-h4), 6.4vw, var(--size-h2))",
          fontWeight: 800,
          letterSpacing: "var(--tracking-heading)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        Based on your answers, your stress levels seem to be{" "}
        {/* Highlighted rather than set in red. This is a screening questionnaire, and
            colouring the verdict with the error value would overstate what it can
            tell her. Sun with ink on top is the pairing the system allows. */}
        <span
          style={{
            background: "var(--sun)",
            color: "var(--ink)",
            padding: "0 0.12em",
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}
        >
          {ready ? verdict(rows) : " "}
        </span>{" "}
        because of the following parameters:
      </h1>

      <AssessmentChart rows={rows} />

      <div style={{ marginTop: "var(--space-10)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          This is not a willpower problem. Most people carry at least one stress-driven
          symptom, and the three things that move it are food, sleep, and what you take
          alongside them.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Based on your answers, you look like a good fit for{" "}
          <strong style={{ fontWeight: 800 }}>
            Metabolic Morning Blend, to bring stress down and take the weight with it.
          </strong>
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", fontWeight: 800, lineHeight: "var(--leading-body)" }}>
          {women ? "Women" : "Men"} who answered like you most often notice their sleep
          settle first, inside the first two weeks.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-meta)", lineHeight: 1.55, color: "var(--ink-60)" }}>
          This is a screening questionnaire built from self-reported symptoms, not a
          measurement. Cortisol is measured in blood, saliva, or urine, and a doctor is
          the only person who can read that result in context.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/diet/results/projection">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
