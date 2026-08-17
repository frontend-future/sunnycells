"use client";

import { Card } from "@/components/core/Card";
import { metabolism, rateLabel } from "@/lib/quiz/assessment";
import { dietQuiz } from "@/lib/quiz/diet";
import { useAnswers } from "@/lib/quiz/store";
import { MetabolismGauge } from "./Charts";
import { NextButton } from "./NextButton";
import { ResultsShell } from "./ResultsShell";
import { StickyCta } from "./StickyCta";

export function MetabolismScreen() {
  const { answers, ready } = useAnswers(dietQuiz.id);
  const m = metabolism(answers);

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
        How does cortisol affect weight loss?
      </h1>

      <Card>
        <div style={{ fontSize: "var(--size-body-lg)", fontWeight: 800 }}>
          Your metabolism:{" "}
          {/* Highlighted rather than set in a status colour, the same emphasis the
              summary verdict uses. */}
          <span style={{ background: "var(--sun)", color: "var(--ink)", padding: "0 0.14em" }}>
            {ready ? rateLabel(m.now) : " "}
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
          Due to higher stress levels, your metabolism slows down which has a direct
          impact on your weight loss.
        </p>
        <MetabolismGauge m={m} afterLabel="With SUNNYCELLS" />
      </Card>

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Due to increased levels of cortisol it is normal that it is challenging for you
          to lose weight.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          However,{" "}
          <strong style={{ fontWeight: 800 }}>Metabolic Morning Blend</strong> is made to
          fight exactly that.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/diet/results/reviews">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
