"use client";

import { Card } from "@/components/core/Card";
import { levelWord } from "@/lib/quiz/assessment";
import { cortisolQuiz } from "@/lib/quiz/cortisol";
import { CORTISOL_HORIZON_DAYS, cortisolProjection, cortisolRows } from "@/lib/quiz/cortisolAssessment";
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

  /* The word comes off the summary's own cortisol row, so the two screens cannot
     disagree about where she is starting from. The chart prints these words instead
     of the underlying numbers: a score like "77" invites a precision the quiz does
     not have, and nobody needs the number to read the shape. */
  const startWord = levelWord(cortisolRows(answers)[0].you);
  const endWord = "Low";
  const label = (v: number) => (Math.abs(v - (p?.target ?? 0)) < 0.5 ? endWord : startWord);

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
          ? `Your cortisol could go from ${startWord.toLowerCase()} to low by ${dayMonth(addDays(CORTISOL_HORIZON_DAYS))}`
          : "Your cortisol timeline"}
      </h1>

      {!ready ? null : series && p ? (
        <Card>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 700, marginBottom: "var(--space-5)" }}>
            Your cortisol level
          </div>
          <ProjectionChart
            p={series}
            startLabel={monthYear(new Date())}
            endLabel={monthYear(addDays(CORTISOL_HORIZON_DAYS))}
            format={label}
            planLabel="With Youth Matrix Chews"
            compareLabel="With stress management alone"
            ariaNoun="your cortisol level"
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
        {/* Plain language on purpose. Four beats: what it is, what it is for, what
            goes wrong, and what you see in the mirror when it comes down. */}
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          <strong style={{ fontWeight: 800 }}>What cortisol is.</strong> It is the
          hormone your body makes when you are under stress. Everyone has it, and you
          need it.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          <strong style={{ fontWeight: 800 }}>What it is supposed to do.</strong> Go up
          in the morning to get you out of bed, then drop away at night. Night is when
          your skin does its repair work.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          <strong style={{ fontWeight: 800 }}>What goes wrong.</strong> If you are
          stressed most days, it never drops. So two things happen every night while
          you sleep. Your face holds on to water, which is why you wake up puffy. And
          your body starts breaking down collagen, the scaffolding that holds your skin
          tight, faster than it builds it back. That is why lines turn up early and
          your face stops feeling firm.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          <strong style={{ fontWeight: 800 }}>What changes when it comes down.</strong>{" "}
          The water goes first. Most people see it in about two weeks: the puffiness
          under the eyes drains, the cheeks flatten out, and the jawline comes back.
          Then the collagen starts rebuilding, which takes around a month to show up,
          and skin gets firmer and smoother instead of soft and crepey.
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
            This is what the typical curve looks like, not a promise about you.
          </p>
        ) : null}
      </div>

      <StickyCta>
        <NextButton href="/quiz/cortisol/results/benefits">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
