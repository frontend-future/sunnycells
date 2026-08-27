"use client";

import { highCount, type Row } from "@/lib/quiz/assessment";
import { energyQuiz } from "@/lib/quiz/energy";
import { energyRows } from "@/lib/quiz/energyAssessment";
import { useAnswers } from "@/lib/quiz/store";
import { AssessmentChart } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/** Reads back what the answers actually said, rather than assuming everyone lands in
    the same place. */
function verdict(rows: Row[]): string {
  const high = highCount(rows);
  if (high >= 4) return "running on borrowed energy";
  if (high >= 1) return "dipping more than they should";
  return "steadier than most";
}

export function EnergySummary() {
  const { answers, ready } = useAnswers(energyQuiz.id);
  const rows = energyRows(answers);
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
        Based on your answers, your energy levels seem to be{" "}
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
          {ready ? verdict(rows) : " "}
        </span>{" "}
        because of the following parameters:
      </h1>

      <AssessmentChart rows={rows} />

      <div style={{ marginTop: "var(--space-10)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          It is not your fault. Almost every energy product on the shelf is built to
          spike you and let you fall, and the fall is what you have been feeling. Feeding
          your cells the raw material instead is a different approach entirely.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Based on your answers you seem like a perfect candidate who{" "}
          <strong style={{ fontWeight: 800 }}>
            could benefit from Even Energy to get steady energy without caffeine.
          </strong>
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", fontWeight: 800, lineHeight: "var(--leading-body)" }}>
          Similar {women ? "women" : "men"} to you noticed their afternoons changing
          within the first two weeks of Even Energy.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/energy/results/projection">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
