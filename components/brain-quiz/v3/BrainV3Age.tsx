"use client";

import { Card } from "@/components/core/Card";
import { Icon } from "@/components/core/Icon";
import { brainV3Quiz } from "@/lib/quiz/brainV3";
import { computedBrainAge } from "@/lib/quiz/brainV3Assessment";
import { useAnswers } from "@/lib/quiz/store";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

export function BrainV3Age() {
  const { answers, ready } = useAnswers(brainV3Quiz.id);
  const age = ready ? computedBrainAge(answers) : null;

  return (
    <ResultsShell>
      <h1
        style={{
          margin: "0 0 var(--space-8)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--size-h3), 7.4vw, var(--size-h1))",
          fontWeight: 900,
          letterSpacing: "var(--tracking-heading)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        {age ? "Your brain age is higher than your real age" : "Your brain age"}
      </h1>

      {age ? (
        <Card>
          <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center", gap: "var(--space-4)" }}>
            <div>
              <div style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>Your age</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 44 }}>{age.real}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", color: "var(--ink-40)" }}>
              <Icon name="arrow-right" size={28} />
            </div>
            <div>
              <div style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>Your brain age</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 44, color: "var(--status-error)" }}>
                {age.brain}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "var(--space-6)",
              paddingTop: "var(--space-5)",
              borderTop: "1px solid var(--border-hairline)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
            }}
          >
            <Icon name="triangle-alert" size={22} style={{ color: "var(--status-error)", flex: "none" }} />
            <span style={{ fontSize: "var(--size-body)", fontWeight: 700 }}>
              Your focus recovery rate is very low.
            </span>
          </div>
        </Card>
      ) : null}

      <p style={{ margin: "var(--space-8) 0 0", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
        This is a screening estimate built from your answers, not a medical measurement. It reflects the same
        pattern of energy decline, inflammation and reduced blood flow behind cognitive aging generally, not a
        diagnosis of your brain specifically.
      </p>

      <StickyCta>
        <NextButton href="/quiz/brain/v3/results/trajectory">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
