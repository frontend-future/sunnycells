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
  if (high >= 1) return "a little above normal";
  return "on the high side of normal";
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
          It is not your fault. Most of the people suffer from at least one of stress
          related problems. By combining nutrition and proper supplementation it is
          really possible to fight it back.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Based on your answers you seem like a perfect candidate who{" "}
          <strong style={{ fontWeight: 800 }}>
            could benefit from Metabolic Morning Blend program to release stress and lose
            weight.
          </strong>
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", fontWeight: 800, lineHeight: "var(--leading-body)" }}>
          Similar {women ? "women" : "men"} to you saw their first results within first
          week of using Metabolic Morning Blend.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/diet/results/projection">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
