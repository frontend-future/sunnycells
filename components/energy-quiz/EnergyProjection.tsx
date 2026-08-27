"use client";

import { Card } from "@/components/core/Card";
import { energyQuiz } from "@/lib/quiz/energy";
import { HOURS_HORIZON_DAYS, hoursProjection } from "@/lib/quiz/energyAssessment";
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

/* The dashed comparison line is what more caffeine does: a lift early, then a slide
   that ends below where it started. Same job as the diet funnel's dieting curve, which
   loses weight and then regains most of it. Returned as a fraction of the gap the plan
   line covers, so the two series stay on one scale. */
const caffeineCurve = (t: number) => Math.sin(t * Math.PI * 0.9) * 0.75 - t * 0.45;

export function EnergyProjection() {
  const { answers, ready } = useAnswers(energyQuiz.id);
  const p = hoursProjection(answers);

  /* Dates are read on the client only, behind `ready`. A statically rendered page
     would otherwise bake in the date it was built and go stale after a deploy. */
  const twoWeekGain = p ? Math.round((p.points[2]?.value ?? p.start) - p.start) : 0;

  /* The chart takes the normalised shape. Hours climb, so start and target are handed
     over the way the drawing expects: start where she is, target where she wants. */
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
        {ready && p && twoWeekGain > 0
          ? `You could gain ${twoWeekGain} good ${twoWeekGain === 1 ? "hour" : "hours"} a day by ${dayMonth(addDays(14))}`
          : "Your energy timeline"}
      </h1>

      {!ready ? null : series && p ? (
        <Card>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 700, marginBottom: "var(--space-5)" }}>
            Your good hours a day
          </div>
          <ProjectionChart
            p={series}
            startLabel={monthYear(new Date())}
            endLabel={monthYear(addDays(HOURS_HORIZON_DAYS))}
            format={(v) => `${Math.round(v)} hrs`}
            planLabel="With Even Energy"
            compareLabel="With more caffeine"
            ariaNoun="good hours a day"
            compare={caffeineCurve}
          />
        </Card>
      ) : (
        <p style={{ marginTop: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          You did not ask for more hours than you already get, so there is no curve to
          draw. The rest of your results still apply, and steady energy is worth having
          at any number.
        </p>
      )}

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Caffeine blocks the receptor that tells you you are tired. It does not add any
          energy to your day, so when it clears, everything it was holding back arrives
          at once. That is the crash, and it is why the second coffee never works as well
          as the first.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Working the other end of the problem means giving your cells the raw material
          they spend to make ATP. There is no spike to come down from, which is why the
          line climbs instead of swinging.
        </p>
        {p ? (
          <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
            We matched you against people with a similar profile{" "}
            <strong style={{ fontWeight: 800 }}>
              ({answers.gender === "Male" ? "male" : "female"}
              {answers.age ? `, ${answers.age} years old` : ""}, {p.start} good hours a day
              {answers.caffeineDrinks ? `, ${answers.caffeineDrinks} caffeinated drinks a day` : ""}).
            </strong>{" "}
            This is an illustration of a rate, not a promise about your result.
          </p>
        ) : null}
      </div>

      <StickyCta>
        <NextButton href="/quiz/energy/results/caffeine">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
