"use client";

import { Card } from "@/components/core/Card";
import { MetabolismGauge } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";
import { itchQuiz } from "@/lib/quiz/itch";
import { comfort, dogName } from "@/lib/quiz/itchAssessment";
import { useAnswers } from "@/lib/quiz/store";

const COMFORT_LABELS = ["Very itchy", "Itchy", "Comfortable", "Very comfortable"] as const;

export function ItchComfort() {
  const { answers, ready } = useAnswers(itchQuiz.id);
  const name = dogName(answers);
  const c = comfort(answers);

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
        How does histamine affect {name}&apos;s comfort?
      </h1>

      <Card>
        <div style={{ fontSize: "var(--size-body-lg)", fontWeight: 800 }}>
          {name}&apos;s comfort level:{" "}
          <span style={{ background: "var(--sun)", color: "var(--ink)", padding: "0 0.14em" }}>
            {ready ? COMFORT_LABELS[Math.min(3, Math.floor((c.now / 100) * 4))] : " "}
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
          Due to a heightened histamine response, {name}&apos;s skin stays irritated, which
          is what keeps the itch-scratch cycle going.
        </p>
        <MetabolismGauge m={c} afterLabel="With SC-01 Daily Chews" labels={COMFORT_LABELS} />
      </Card>

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Due to an overactive histamine response, it&apos;s normal for {name} to keep
          scratching no matter what you try.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          However, <strong style={{ fontWeight: 800 }}>SC-01 Daily Chews</strong> is made
          to calm exactly that.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/itch/results/benefits">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
