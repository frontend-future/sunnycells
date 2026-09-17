"use client";

import { Card } from "@/components/core/Card";
import { MetabolismGauge } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";
import { jointQuiz } from "@/lib/quiz/joint";
import { dogName, mobility } from "@/lib/quiz/jointAssessment";
import { useAnswers } from "@/lib/quiz/store";

const MOBILITY_LABELS = ["Very stiff", "Stiff", "Mobile", "Very mobile"] as const;

export function JointComfort() {
  const { answers, ready } = useAnswers(jointQuiz.id);
  const name = dogName(answers);
  const m = mobility(answers);

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
        How does joint inflammation affect {name}&apos;s mobility?
      </h1>

      <Card>
        <div style={{ fontSize: "var(--size-body-lg)", fontWeight: 800 }}>
          {name}&apos;s mobility level:{" "}
          <span style={{ background: "var(--sun)", color: "var(--ink)", padding: "0 0.14em" }}>
            {ready ? MOBILITY_LABELS[Math.min(3, Math.floor((m.now / 100) * 4))] : " "}
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
          Due to ongoing inflammation and cartilage wear, {name}&apos;s joints stay sore,
          which is what keeps them from moving freely.
        </p>
        <MetabolismGauge m={m} afterLabel="With SC-02 Hip & Joint Chews" labels={MOBILITY_LABELS} />
      </Card>

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Due to worn cartilage and inflammation, it&apos;s normal for {name} to keep slowing
          down no matter what you try.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          However, <strong style={{ fontWeight: 800 }}>SC-02 Hip & Joint Chews</strong> is
          made to rebuild exactly that.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/joint/results/benefits">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
