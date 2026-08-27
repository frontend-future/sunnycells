"use client";

import { Card } from "@/components/core/Card";
import { agingQuiz } from "@/lib/quiz/aging";
import { collagenSupport, supportLabel } from "@/lib/quiz/agingAssessment";
import { useAnswers } from "@/lib/quiz/store";
import { MetabolismGauge } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

export function AgingCollagen() {
  const { answers, ready } = useAnswers(agingQuiz.id);
  const s = collagenSupport(answers);

  return (
    <ResultsShell>
      <h1
        style={{
          margin: "0 0 var(--space-8)",
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--size-h3), 7.4vw, var(--size-h1))",
          fontWeight: 900,
          letterSpacing: "var(--tracking-heading)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        How does collagen affect how you age?
      </h1>

      <Card>
        <div style={{ fontSize: "var(--size-body-lg)", fontWeight: 800 }}>
          Your collagen support:{" "}
          {/* Highlighted rather than set in a status colour, the same emphasis the
              summary verdict uses. */}
          <span style={{ background: "var(--sun)", color: "var(--ink)", padding: "0 0.14em" }}>
            {ready ? supportLabel(s.now) : " "}
          </span>
        </div>
        <p
          style={{
            margin: "var(--space-3) 0 var(--space-6)",
            fontSize: "var(--size-meta)",
            lineHeight: 1.5,
            color: "var(--ink-80)",
          }}
        >
          Between the decline that starts in your twenties and what a normal week of
          eating actually supplies, your body is working with less than it needs to keep
          rebuilding.
        </p>
        <MetabolismGauge m={s} afterLabel="With SUNNYCELLS" />
      </Card>

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          With collagen falling every year it is normal that your skin, hair and nails
          all started changing around the same time. They are built from the same thing.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          However, <strong style={{ fontWeight: 800 }}>Complete Collagen</strong> is made to
          fight exactly that.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/aging/results/benefits">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
