"use client";

import { Card } from "@/components/core/Card";
import { levelWord } from "@/lib/quiz/assessment";
import { calmQuiz } from "@/lib/quiz/calm";
import { CALM_HORIZON_DAYS, calmProjection, calmRows } from "@/lib/quiz/calmAssessment";
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

/* The dashed comparison line is what a better bedtime routine alone does: it comes
   down while you are on top of it and drifts back up, because the evening rise is
   still happening. Same job as the diet funnel's dieting curve. */
const routineAloneCurve = (t: number) => Math.sin(t * Math.PI * 0.85) * 0.55 - t * 0.08;

export function CalmProjection() {
  const { answers, ready } = useAnswers(calmQuiz.id);
  const p = calmProjection(answers);

  /* The word comes off the summary's own cortisol row, so the two screens cannot
     disagree about where she is starting from. The chart prints these words instead of
     the underlying numbers: a score like "77" invites a precision the quiz does not
     have, and nobody needs the number to read the shape. */
  const startWord = levelWord(calmRows(answers)[0].you);
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
          ? `Your evening cortisol could go from ${startWord.toLowerCase()} to low by ${dayMonth(addDays(CALM_HORIZON_DAYS))}`
          : "Your sleep timeline"}
      </h1>

      {!ready ? null : series && p ? (
        <Card>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 700, marginBottom: "var(--space-5)" }}>
            Your evening cortisol
          </div>
          <ProjectionChart
            p={series}
            startLabel={monthYear(new Date())}
            endLabel={monthYear(addDays(CALM_HORIZON_DAYS))}
            format={label}
            planLabel="With Anytime Calm"
            compareLabel="With a bedtime routine alone"
            ariaNoun="your evening cortisol level"
            compare={routineAloneCurve}
          />
        </Card>
      ) : (
        <p style={{ marginTop: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Your answers do not describe a raised evening pattern, so there is no fall to
          draw. The rest of your results still apply, and the magnesium and glycine are
          worth having at any level.
        </p>
      )}

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {/* Plain language on purpose. Four beats: what it is, what it is for, what goes
            wrong, and what changes when it comes down. */}
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          <strong style={{ fontWeight: 800 }}>What cortisol is.</strong> It is the
          hormone your body makes when you are under stress. Everyone has it, and you
          need it.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          <strong style={{ fontWeight: 800 }}>What it is supposed to do.</strong> Go up
          in the morning to get you out of bed, then fall away through the evening so
          you can switch off. Low cortisol at night is the signal that lets you sleep.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          <strong style={{ fontWeight: 800 }}>What goes wrong.</strong> If your day
          never really stops, it never really drops. So at eleven at night your body is
          worn out but your system is still switched on. That is the wired but tired
          feeling, and it is why you can be too exhausted to move and still lie there
          with your brain going. It is also why you surface at three in the morning and
          cannot get back down.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          <strong style={{ fontWeight: 800 }}>What changes when it comes down.</strong>{" "}
          The evenings go first. Most people notice it inside a week: you get into bed
          and actually feel sleepy rather than switched on. Then the nights stitch back
          together, so you wake less and get back down faster when you do. The morning
          is the last part to change, and it is the one you will actually feel: waking
          up rested instead of reaching for coffee to start.
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
        <NextButton href="/quiz/calm/results/benefits">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
