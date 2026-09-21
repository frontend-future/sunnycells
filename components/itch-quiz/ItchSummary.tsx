"use client";

import { AssessmentChart } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";
import { itchQuiz } from "@/lib/quiz/itch";
import { dogName, itchRows, itchVerdict } from "@/lib/quiz/itchAssessment";
import { useAnswers } from "@/lib/quiz/store";

export function ItchSummary({
  quizId = itchQuiz.id,
  nextHref = "/quiz/itch/results/projection",
}: { quizId?: string; nextHref?: string } = {}) {
  const { answers, ready } = useAnswers(quizId);
  const rows = itchRows(answers);
  const name = dogName(answers);

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
        Based on your answers, {name}&apos;s itching seems to be{" "}
        <span
          style={{
            background: "var(--sun)",
            color: "var(--ink)",
            padding: "0 0.12em",
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}
        >
          {ready ? itchVerdict(rows) : " "}
        </span>{" "}
        because of the following parameters:
      </h1>

      <AssessmentChart rows={rows} />

      <div style={{ marginTop: "var(--space-10)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          It&apos;s not your fault. Most dogs deal with at least one of these itch-related
          issues at some point. By combining the right nutrition with proper
          supplementation, it&apos;s absolutely possible to calm it back down.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Based on your answers, {name} seems like a perfect candidate who{" "}
          <strong style={{ fontWeight: 800 }}>
            could benefit from SC-01 Daily Chews to calm the itching and support healthy
            skin.
          </strong>
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", fontWeight: 800, lineHeight: "var(--leading-body)" }}>
          Similar dogs to {name} showed their first signs of relief within the first
          week of using SC-01 Daily Chews.
        </p>
      </div>

      <StickyCta>
        <NextButton href={nextHref}>Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
