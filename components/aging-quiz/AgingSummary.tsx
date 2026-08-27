"use client";

import { highCount, type Row } from "@/lib/quiz/assessment";
import { agingQuiz } from "@/lib/quiz/aging";
import { agingRows } from "@/lib/quiz/agingAssessment";
import { useAnswers } from "@/lib/quiz/store";
import { AssessmentChart } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/** Reads back what the answers actually said, rather than assuming everyone lands in
    the same place. */
function verdict(rows: Row[]): string {
  const high = highCount(rows);
  if (high >= 4) return "further along than you would like";
  if (high >= 1) return "starting to show";
  return "holding up well";
}

export function AgingSummary() {
  const { answers, ready } = useAnswers(agingQuiz.id);
  const rows = agingRows(answers);
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
        Based on your answers, your collagen decline seems to be{" "}
        {/* Highlighted rather than set in red. This is a screening questionnaire, and
            colouring the verdict with the error value would overstate what it can tell
            her. Sun with ink on top is the pairing the system allows. */}
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

      <div style={{ marginTop: "var(--space-10)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          It is not your fault. Your body makes about one percent less collagen every
          year from your mid twenties, and no cream reaches the layer where that is
          happening. Replacing the raw material is a different approach entirely.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Based on your answers you seem like a perfect candidate who{" "}
          <strong style={{ fontWeight: 800 }}>
            could benefit from Complete Collagen for your skin, hair and nails.
          </strong>
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", fontWeight: 800, lineHeight: "var(--leading-body)" }}>
          Similar {women ? "women" : "men"} to you noticed their nails changing first,
          usually inside the first month.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/aging/results/projection">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
