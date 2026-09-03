"use client";

import { Card } from "@/components/core/Card";
import { cortisolQuiz } from "@/lib/quiz/cortisol";
import { CORTISOL_HORIZON_DAYS, cortisolProjection } from "@/lib/quiz/cortisolAssessment";
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

/* The dashed comparison line is what managing the stress alone does: it comes down
   while you are on top of it and drifts back up, because the evening rise is still
   happening and nothing is feeding the layer where the collagen is being lost. Same
   job as the diet funnel's dieting curve and the aging funnel's creams curve. */
const stressAloneCurve = (t: number) => Math.sin(t * Math.PI * 0.85) * 0.55 - t * 0.08;

export function CortisolProjection() {
  const { answers, ready } = useAnswers(cortisolQuiz.id);
  const p = cortisolProjection(answers);

  /* Dates are read on the client only, behind `ready`. A statically rendered page
     would otherwise bake in the date it was built and go stale after a deploy. */
  const eightWeekDrop = p ? Math.round(p.start - (p.points[8]?.value ?? p.start)) : 0;

  /* ProjectionChart is generic over its series; it just calls the value field `lb`. */
  const series = p
    ? {
        weeks: p.weeks,
        points: p.points.map((pt) => ({ week: pt.week, lb: pt.value })),
        start: p.start,
        target: p.target,
        unit: "lb" as const,
      }
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
        {ready && p
          ? `Your cortisol score could fall ${eightWeekDrop} points by ${dayMonth(addDays(CORTISOL_HORIZON_DAYS))}`
          : "Your cortisol timeline"}
      </h1>

      {!ready ? null : series && p ? (
        <Card>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 700, marginBottom: "var(--space-5)" }}>
            Your cortisol screening score
          </div>
          <ProjectionChart
            p={series}
            startLabel={monthYear(new Date())}
            endLabel={monthYear(addDays(CORTISOL_HORIZON_DAYS))}
            format={(v) => `${Math.round(v)}`}
            planLabel="With Youth Matrix Chews"
            compareLabel="With stress management alone"
            ariaNoun="your cortisol screening score"
            compare={stressAloneCurve}
          />
        </Card>
      ) : (
        <p style={{ marginTop: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Your answers do not describe a raised evening pattern, so there is no fall to
          draw. The rest of your results still apply, and the collagen side of the
          formula is worth having at any level.
        </p>
      )}

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Cortisol is meant to peak in the morning and fall away by night. Under
          sustained stress it stays up through the window when your skin does its
          repair, and it does two things at once: it holds fluid in the tissue of your
          face, and it switches on the enzymes that cut through collagen faster than you
          rebuild it.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Bring the evening level down and both stop. The fluid drains first, which is
          why puffiness is what people notice inside the first fortnight. Firmness takes
          longer, because your skin has to lay collagen back down and that runs on a
          turnover of about four weeks, which is why the line keeps falling rather than
          jumping.
        </p>
        {p ? (
          <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
            We matched you against people with a similar profile{" "}
            <strong style={{ fontWeight: 800 }}>
              ({answers.gender === "Male" ? "male" : "female"}
              {answers.age ? `, ${answers.age} years old` : ""}
              {answers["stress-level"] ? `, stressed ${answers["stress-level"].toLowerCase()}` : ""}
              {answers.sleep ? `, sleeping ${answers.sleep.toLowerCase()}` : ""}).
            </strong>{" "}
            This is an illustration of a rate on our own screening scale, not a
            prediction of a hormone result.
          </p>
        ) : null}
      </div>

      <StickyCta>
        <NextButton href="/quiz/cortisol/results/benefits">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
