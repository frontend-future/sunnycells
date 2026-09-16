"use client";

import { Card } from "@/components/core/Card";
import { brainQuiz } from "@/lib/quiz/brain";
import { CLARITY_HORIZON_DAYS, CLARITY_PAD_BELOW, clarityProjection, withoutCurve } from "@/lib/quiz/brainAssessment";
import { useAnswers } from "@/lib/quiz/store";
import { ProjectionChart } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/* Dates are computed at render time from the real clock, never hardcoded, so the
   headline and the chart's end label are always "90 days from today" whatever today
   happens to be. */
const addDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

const dayMonthYear = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const monthYear = (d: Date) => d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

export function BrainProjection({
  quizId = brainQuiz.id,
  nextHref = "/quiz/brain/results/benefits",
}: { quizId?: string; nextHref?: string } = {}) {
  const { answers, ready } = useAnswers(quizId);
  const p = clarityProjection(answers);

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
        {ready ? `Here's what your mental clarity could look like by ${dayMonthYear(addDays(CLARITY_HORIZON_DAYS))}` : "Your mental clarity timeline"}
      </h1>

      {ready ? (
        <Card>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 700, marginBottom: "var(--space-5)" }}>
            Your mental clarity index
          </div>
          <ProjectionChart
            p={p}
            startLabel={monthYear(new Date())}
            endLabel={monthYear(addDays(CLARITY_HORIZON_DAYS))}
            format={(v) => (v >= (p.start + p.target) / 2 ? "High" : "Low")}
            planLabel="With Brain & Memory Power Boost"
            compareLabel="Without a change"
            compareColor="var(--status-error)"
            ariaNoun="mental clarity"
            compare={withoutCurve}
            horizonDays={CLARITY_HORIZON_DAYS}
            padBelow={CLARITY_PAD_BELOW}
          />
        </Card>
      ) : null}

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Left alone, the three causes behind cognitive decline, energy decline in brain
          cells, inflammation, and reduced blood flow, tend to compound rather than level
          off.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Addressing all three at once, rather than just one, is how you can experience
          lasting improvements over time.
        </p>
      </div>

      <StickyCta>
        <NextButton href={nextHref}>Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
