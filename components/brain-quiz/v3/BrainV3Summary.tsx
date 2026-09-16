"use client";

import { highCount, type Row } from "@/lib/quiz/assessment";
import { brainV3Quiz } from "@/lib/quiz/brainV3";
import { brainV3Rows } from "@/lib/quiz/brainV3Assessment";
import { useAnswers } from "@/lib/quiz/store";
import { AssessmentChart } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

function verdict(rows: Row[]): string {
  const high = highCount(rows);
  if (high >= 3) return "more disrupted than most people your age";
  if (high >= 1) return "a little foggier than it should be";
  return "holding up better than most";
}

export function BrainV3Summary() {
  const { answers, ready } = useAnswers(brainV3Quiz.id);
  const rows = brainV3Rows(answers);

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
        Based on your answers, your mental clarity seems{" "}
        <span
          style={{
            background: "var(--sun)",
            color: "var(--ink)",
            padding: "0 0.12em",
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}
        >
          {ready ? verdict(rows) : " "}
        </span>{" "}
        because of the following parameters:
      </h1>

      <AssessmentChart rows={rows} />

      <p style={{ marginTop: "var(--space-10)", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
        It is not just getting older, and it is not your fault. Next, let&apos;s put a number on it.
      </p>

      <StickyCta>
        <NextButton href="/quiz/brain/v3/results/brain-age">See my brain age</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
