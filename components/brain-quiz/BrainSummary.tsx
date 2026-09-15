"use client";

import { highCount, type Row } from "@/lib/quiz/assessment";
import { brainQuiz } from "@/lib/quiz/brain";
import { brainRows } from "@/lib/quiz/brainAssessment";
import { useAnswers } from "@/lib/quiz/store";
import { AssessmentChart } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/** Reads back what the answers actually said, rather than assuming everyone lands in
    the same place. */
function verdict(rows: Row[]): string {
  const high = highCount(rows);
  if (high >= 4) return "more disrupted than most people your age";
  if (high >= 1) return "a little foggier than it should be";
  return "holding up better than most";
}

export function BrainSummary() {
  const { answers, ready } = useAnswers(brainQuiz.id);
  const rows = brainRows(answers);
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
        Based on your answers, your mental clarity seems{" "}
        {/* Highlighted rather than set in red. This is a screening questionnaire, and
            colouring the verdict with the error value would overstate what it can
            tell them. Sun with ink on top is the pairing the system allows. */}
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
          It is not just getting older, and it is not your fault. There are three major
          reasons cognitive decline happens, and most people your age are dealing with
          at least one of them without knowing it.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Based on your answers you seem like a good candidate who{" "}
          <strong style={{ fontWeight: 800 }}>
            could benefit from Brain & Memory Power Boost to support memory, focus and
            mental clarity.
          </strong>
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", fontWeight: 800, lineHeight: "var(--leading-body)" }}>
          Similar {women ? "women" : "men"} to you noticed a difference within the first
          few weeks of consistent use.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/brain/results/projection">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
