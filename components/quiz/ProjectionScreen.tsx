"use client";

import { Card } from "@/components/core/Card";
import { projection } from "@/lib/quiz/assessment";
import { dietQuiz } from "@/lib/quiz/diet";
import { useAnswers } from "@/lib/quiz/store";
import { ProjectionChart } from "./Charts";
import { NextButton } from "./NextButton";
import { ResultsShell } from "./ResultsShell";
import { StickyCta } from "./StickyCta";

const addDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

const dayMonth = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
const monthYear = (d: Date) => d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

export function ProjectionScreen() {
  const { answers, ready } = useAnswers(dietQuiz.id);
  const p = projection(answers);

  /* Dates are read on the client only, behind `ready`. A statically rendered page
     would otherwise bake in the date it was built and go stale after a deploy. */
  const twoWeekLoss = p ? p.start - p.points[2].lb : 0;

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
          ? `You can lose ${twoWeekLoss} lb by ${dayMonth(addDays(14))}`
          : "Your weight timeline"}
      </h1>

      {!ready ? null : p ? (
        <Card>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 700, marginBottom: "var(--space-5)" }}>
            Your weight loss rate
          </div>
          <ProjectionChart
            p={p}
            startLabel={monthYear(new Date())}
            endLabel={monthYear(addDays(p.weeks * 7))}
          />
        </Card>
      ) : (
        <p style={{ marginTop: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          You did not set a target below your current weight, so there is no curve to
          draw. The rest of your results still apply, and cortisol work is worth doing at
          any weight.
        </p>
      )}

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Increased cortisol levels typically influence metabolism and activate the
          body&apos;s fight-or-flight response. This can lead to heightened cravings, often
          without an obvious cause.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          One of the primary benefits of regulating cortisol levels, particularly for
          weight loss, is the reduction in late-night snacking. Properly balanced cortisol
          can help mitigate these cravings, contributing to more effective weight
          management and overall health benefits.
        </p>
        {p ? (
          <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
            If you start drinking Metabolic Morning Blend, we estimate that you will be
            able to lose {twoWeekLoss} lb within the first 2 weeks. We matched you against
            people with a similar profile{" "}
            <strong style={{ fontWeight: 800 }}>
              ({answers.gender === "Male" ? "male" : "female"}
              {answers.age ? `, ${answers.age} years old` : ""}, {p.start} lb starting
              weight).
            </strong>
          </p>
        ) : null}
      </div>

      <StickyCta>
        <NextButton href="/quiz/diet/results/science">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
