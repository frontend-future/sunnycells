"use client";

import { Card } from "@/components/core/Card";
import { agingQuiz } from "@/lib/quiz/aging";
import { SKIN_HORIZON_DAYS, skinProjection } from "@/lib/quiz/agingAssessment";
import { useAnswers } from "@/lib/quiz/store";
import { ProjectionChart } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

const addDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

const dayMonth = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
const monthYear = (d: Date) => d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

/* The dashed comparison line is what topicals alone do: a lift while you are using
   them that settles back near where it started, because nothing reaches the layer
   where the collagen is being lost. Same job as the diet funnel's dieting curve. */
const creamsCurve = (t: number) => Math.sin(t * Math.PI * 0.85) * 0.55 - t * 0.08;

export function AgingProjection() {
  const { answers, ready } = useAnswers(agingQuiz.id);
  const p = skinProjection(answers);

  /* Dates are read on the client only, behind `ready`. A statically rendered page would
     otherwise bake in the date it was built and go stale after a deploy. */
  const eightWeek = p ? Math.round(p.start - (p.points[8]?.value ?? p.start)) : 0;

  const series = p
    ? { weeks: p.weeks, points: p.points.map((pt) => ({ week: pt.week, lb: pt.value })), start: p.start, target: p.target, unit: "lb" as const }
    : null;

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
        {ready && p && eightWeek > 0
          ? `Your skin could look ${eightWeek} ${eightWeek === 1 ? "year" : "years"} younger by ${dayMonth(addDays(SKIN_HORIZON_DAYS))}`
          : "Your skin timeline"}
      </h1>

      {!ready ? null : series && p ? (
        <Card>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 700, marginBottom: "var(--space-5)" }}>
            How old your skin looks
          </div>
          <ProjectionChart
            p={series}
            startLabel={monthYear(new Date())}
            endLabel={monthYear(addDays(SKIN_HORIZON_DAYS))}
            format={(v) => `${Math.round(v)} yrs`}
            planLabel="With Creatine + Collagen"
            compareLabel="With creams alone"
            ariaNoun="how old your skin looks"
            compare={creamsCurve}
          />
        </Card>
      ) : (
        <p style={{ marginTop: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          You did not ask for a lower number than the one you gave, so there is no curve
          to draw. The rest of your results still apply, and collagen is worth replacing
          at any age.
        </p>
      )}

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Collagen is the scaffolding under your skin. As it thins, the surface above it
          loses the support that kept it smooth, which is what a fine line actually is. A
          cream works on the top layer, above where any of that is happening.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Hydrolyzed collagen is broken into peptides small enough to be absorbed and
          carried to the layer that needs them, and creatine works on the muscle
          underneath it. Skin cell turnover runs about four weeks, nails grow out over
          three to six months, and hair is slower still, which is why the line moves
          steadily rather than jumping.
        </p>
        {p ? (
          <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
            We matched you against people with a similar profile{" "}
            <strong style={{ fontWeight: 800 }}>
              ({answers.gender === "Male" ? "male" : "female"}
              {answers.age ? `, ${answers.age} years old` : ""}, skin at {p.start}
              {answers.proteinDays ? `, protein on ${answers.proteinDays} days a week` : ""}).
            </strong>{" "}
            This is an illustration of a rate, not a promise about your result.
          </p>
        ) : null}
      </div>

      <StickyCta>
        <NextButton href="/quiz/aging/results/collagen">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
