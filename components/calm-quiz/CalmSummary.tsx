"use client";

import { highCount, type Row } from "@/lib/quiz/assessment";
import { calmQuiz } from "@/lib/quiz/calm";
import { calmRows } from "@/lib/quiz/calmAssessment";
import { useAnswers } from "@/lib/quiz/store";
import { AssessmentChart } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/** Reads back what the answers actually said, rather than assuming everyone lands in
    the same place. */
function verdict(rows: Row[]): string {
  const high = highCount(rows);
  if (high >= 4) return "higher than normal";
  if (high >= 1) return "a little above normal";
  return "on the high side of normal";
}

export function CalmSummary() {
  const { answers, ready } = useAnswers(calmQuiz.id);
  const rows = calmRows(answers);
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
        Based on your answers, your evening cortisol seems to be{" "}
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
          It is not that you are bad at sleeping. Cortisol is supposed to fall in the
          evening so your body can wind down. When it stays up, you get the worst
          combination there is: a body that is exhausted and a head that will not stop.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Based on your answers you seem like a perfect candidate who{" "}
          <strong style={{ fontWeight: 800 }}>
            could benefit from Anytime Calm for falling asleep, staying asleep and
            waking up rested.
          </strong>
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", fontWeight: 800, lineHeight: "var(--leading-body)" }}>
          Similar {women ? "women" : "men"} to you noticed the evenings settling first,
          usually inside the first week.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/calm/results/projection">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
