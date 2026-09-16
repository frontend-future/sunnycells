"use client";

import { Card } from "@/components/core/Card";
import { brainV3Quiz } from "@/lib/quiz/brainV3";
import {
  BRAIN_AGE_HORIZON_DAYS, BRAIN_AGE_PAD_ABOVE, brainAgeProjection, withoutAgingCurve,
} from "@/lib/quiz/brainV3Assessment";
import { useAnswers } from "@/lib/quiz/store";
import { ProjectionChart } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/* Dates are computed at render time from the real clock, never hardcoded. */
const addDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

const dayMonthYear = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const monthYear = (d: Date) => d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

export function BrainV3Trajectory() {
  const { answers, ready } = useAnswers(brainV3Quiz.id);
  const p = ready ? brainAgeProjection(answers) : null;

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
        {ready && p
          ? `Here's what your brain age could look like by ${dayMonthYear(addDays(BRAIN_AGE_HORIZON_DAYS))}`
          : "Your brain age timeline"}
      </h1>

      {p ? (
        <Card>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 700, marginBottom: "var(--space-5)" }}>
            Your brain age
          </div>
          <ProjectionChart
            p={p}
            startLabel={monthYear(new Date())}
            endLabel={monthYear(addDays(BRAIN_AGE_HORIZON_DAYS))}
            format={(v) => `${Math.round(v)}`}
            planLabel="With Brain & Memory Power Boost"
            compareLabel="Without a change"
            compareColor="var(--status-error)"
            ariaNoun="brain age"
            compare={withoutAgingCurve}
            horizonDays={BRAIN_AGE_HORIZON_DAYS}
            padAbove={BRAIN_AGE_PAD_ABOVE}
          />
        </Card>
      ) : null}

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Left alone, the three causes behind cognitive aging tend to compound rather than level off.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Addressing all three at once, rather than just one, is how you can experience lasting improvements
          over time.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/brain/v3/results/energy">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
