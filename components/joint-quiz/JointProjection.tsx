"use client";

import { Card } from "@/components/core/Card";
import { ProjectionChart } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";
import { jointQuiz } from "@/lib/quiz/joint";
import { dogName, highLow, jointProjection } from "@/lib/quiz/jointAssessment";
import { useAnswers } from "@/lib/quiz/store";

const addDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

const dayMonth = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
const monthYear = (d: Date) => d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

/* Barely moves on its own: "left untreated" is meant to read as staying high,
   not as a curve that happens to be worse than the plan. */
const untreated = (t: number) => 0.08 * t;

export function JointProjection() {
  const { answers, ready } = useAnswers(jointQuiz.id);
  const name = dogName(answers);
  const p = jointProjection(answers);
  const format = (value: number) => highLow(value, p.start, p.target);

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
        {ready ? `${name}'s stiffness can go from High to Low by ${dayMonth(addDays(28))}` : "Your dog's stiffness timeline"}
      </h1>

      {ready ? (
        <Card>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 700, marginBottom: "var(--space-5)" }}>
            {name}&apos;s stiffness level
          </div>
          <ProjectionChart
            p={p}
            startLabel={monthYear(new Date())}
            endLabel={monthYear(addDays(56))}
            format={format}
            planLabel="With SC-02 Hip & Joint Chews"
            compareLabel="Left untreated"
            compareColor="var(--status-error)"
            compare={untreated}
            ariaNoun="stiffness"
            padAbove={0.3}
          />
        </Card>
      ) : null}

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          When a dog&apos;s joints wear down, the cartilage that cushions bone-on-bone
          contact thins out, and the body responds with inflammation that makes movement
          stiff and sore. That&apos;s what turns a normal slow-down into a constant cycle
          of stiffness, soreness, and less movement, which then lets the joint wear down
          even further.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          One of the biggest benefits of rebuilding that cartilage and calming
          inflammation is breaking that cycle itself. Once a joint stops hurting, {name}{" "}
          moves on it more, and a joint that moves stays healthier longer.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          If you start giving {name} SC-02 Hip & Joint Chews, we estimate their stiffness
          will go from high to low within about 4 weeks. We matched this against dogs
          with a similar profile (size, age, and current mobility level).
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/joint/results/comfort">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
