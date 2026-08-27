"use client";

import { Card } from "@/components/core/Card";
import { energyQuiz } from "@/lib/quiz/energy";
import { steadiness, steadyLabel } from "@/lib/quiz/energyAssessment";
import { useAnswers } from "@/lib/quiz/store";
import { MetabolismGauge } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

export function EnergyCaffeine() {
  const { answers, ready } = useAnswers(energyQuiz.id);
  const s = steadiness(answers);

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
        How does caffeine affect your energy?
      </h1>

      <Card>
        <div style={{ fontSize: "var(--size-body-lg)", fontWeight: 800 }}>
          Your energy:{" "}
          {/* Highlighted rather than set in a status colour, the same emphasis the
              summary verdict uses. */}
          <span style={{ background: "var(--sun)", color: "var(--ink)", padding: "0 0.14em" }}>
            {ready ? steadyLabel(s.now) : " "}
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
          Your day is running on a stimulant that has to wear off, so it swings instead of
          holding. What you feel as a crash is the tiredness that was there the whole time.
        </p>
        <MetabolismGauge m={s} afterLabel="With SUNNYCELLS" />
      </Card>

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          With that much caffeine in your day it is normal that your energy is hard to
          keep steady.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          However, <strong style={{ fontWeight: 800 }}>Even Energy</strong> is made to fight
          exactly that.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/energy/results/benefits">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
