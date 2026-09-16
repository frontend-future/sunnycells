"use client";

import { brainV3Quiz } from "@/lib/quiz/brainV3";
import { cognitiveEnergyGauge } from "@/lib/quiz/brainV3Assessment";
import { useAnswers } from "@/lib/quiz/store";
import { MetabolismGauge } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

export function BrainV3Energy() {
  const { answers, ready } = useAnswers(brainV3Quiz.id);
  const m = cognitiveEnergyGauge(answers);

  return (
    <ResultsShell>
      <h1
        style={{
          margin: "0 0 var(--space-6)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--size-h4), 6.4vw, var(--size-h2))",
          fontWeight: 800,
          letterSpacing: "var(--tracking-heading)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        How does cellular energy affect memory?
      </h1>

      <p style={{ margin: "0 0 var(--space-8)", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
        Brain cells that are running low on cellular energy are a large part of what shows up as brain fog. Your
        answers put your cognitive energy here:
      </p>

      {ready ? (
        <>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 700, marginBottom: "var(--space-3)" }}>
            Your cognitive energy
          </div>
          <MetabolismGauge m={m} afterLabel="With Brain & Memory Power Boost" />
        </>
      ) : null}

      <p style={{ marginTop: "var(--space-8)", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
        Acetyl-L-Carnitine plays a role in brain-cell energy production from the first dose, which is why this is
        the first of the three causes the formula is built to address.
      </p>

      <StickyCta>
        <NextButton href="/quiz/brain/v3/results/concerns">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
