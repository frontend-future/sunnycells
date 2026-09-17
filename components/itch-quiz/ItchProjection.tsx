"use client";

import { Card } from "@/components/core/Card";
import { ProjectionChart } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";
import { itchQuiz } from "@/lib/quiz/itch";
import { dogName, highLow, itchProjection } from "@/lib/quiz/itchAssessment";
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

export function ItchProjection() {
  const { answers, ready } = useAnswers(itchQuiz.id);
  const name = dogName(answers);
  const p = itchProjection(answers);
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
        {ready ? `${name}'s itching can go from High to Low by ${dayMonth(addDays(14))}` : "Your dog's itching timeline"}
      </h1>

      {ready ? (
        <Card>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 700, marginBottom: "var(--space-5)" }}>
            {name}&apos;s itching level
          </div>
          <ProjectionChart
            p={p}
            startLabel={monthYear(new Date())}
            endLabel={monthYear(addDays(56))}
            format={format}
            planLabel="With SC-01 Daily Chews"
            compareLabel="Left untreated"
            compareColor="var(--status-error)"
            compare={untreated}
            ariaNoun="itching"
            padAbove={0.3}
          />
        </Card>
      ) : null}

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          When your dog&apos;s immune system overreacts to something harmless, like pollen,
          dust, or a new food, it releases histamine. That&apos;s what turns a normal itch
          into a nonstop scratch-lick-chew cycle, often without any obvious trigger.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          One of the biggest benefits of calming that histamine response is breaking the
          itch-scratch cycle itself. Once the skin gets a chance to stop being irritated,
          it also stops giving {name} something new to scratch, which is usually what
          turns one hot spot into three.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          If you start giving {name} SC-01 Daily Chews, we estimate their itching will go
          from high to low within the first 2 weeks. We matched this against dogs with a
          similar profile (size, age, and current scratching frequency).
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/itch/results/comfort">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
