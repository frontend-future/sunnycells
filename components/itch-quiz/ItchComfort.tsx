"use client";

import { Card } from "@/components/core/Card";
import { MetabolismGauge } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";
import { useBrand } from "@/components/core/brand";
import { itchQuiz } from "@/lib/quiz/itch";
import { comfort, dogName, triedItems } from "@/lib/quiz/itchAssessment";
import { useAnswers } from "@/lib/quiz/store";

const COMFORT_LABELS = ["Very itchy", "Itchy", "Comfortable", "Very comfortable"] as const;

export function ItchComfort({
  quizId = itchQuiz.id,
  nextHref = "/quiz/itch/results/benefits",
  bothSides = false,
}: {
  quizId?: string;
  nextHref?: string;
  /** Friday Zoomies copy: topicals and ingestibles are both needed, opening on what she already tried. */
  bothSides?: boolean;
} = {}) {
  const { answers, ready } = useAnswers(quizId);
  const { t } = useBrand();
  const name = dogName(answers);
  const c = comfort(answers);
  const tried = triedItems(answers);

  return (
    <ResultsShell>
      <h1
        style={{
          margin: "0 0 var(--space-8)",
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--size-h3), 7.4vw, var(--size-h1))",
          fontWeight: 900,
          letterSpacing: "var(--tracking-heading)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        How does histamine affect {name}&apos;s comfort?
      </h1>

      <Card>
        <div style={{ fontSize: "var(--size-body-lg)", fontWeight: 800 }}>
          {name}&apos;s comfort level:{" "}
          <span style={{ background: "var(--sun)", color: "var(--ink)", padding: "0 0.14em" }}>
            {ready ? COMFORT_LABELS[Math.min(3, Math.floor((c.now / 100) * 4))] : " "}
          </span>
        </div>
        <p
          style={{
            margin: "var(--space-3) 0 var(--space-6)",
            fontSize: "var(--size-meta)",
            lineHeight: 1.5,
            color: "var(--ink-80)",
          }}
        >
          Due to a heightened histamine response, {name}&apos;s skin stays irritated, which
          is what keeps the itch-scratch cycle going.
        </p>
        <MetabolismGauge m={c} afterLabel={t("With SC-01 Daily Chews")} labels={COMFORT_LABELS} />
      </Card>

      <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {bothSides ? (
          <>
            {tried.length ? (
              <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
                You&apos;ve already tried{" "}
                {tried.length === 1 ? tried[0] : `${tried.slice(0, -1).join(", ")} and ${tried[tried.length - 1]}`}.{" "}
                {tried.length === 1
                  ? "It helps with part of the problem, but it doesn't cover all of it."
                  : "Each one helps with part of the problem, but none of them cover all of it."}
              </p>
            ) : null}
            <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
              Due to an overactive histamine response, it&apos;s normal for {name} to keep
              scratching no matter what you try. Topicals like shampoos, sprays, and creams only
              calm the skin&apos;s surface, so the itch returns as soon as they wear off.
              Ingestibles like diet changes and supplements work on the cause, but they take weeks
              to build, and {name} keeps scratching in the meantime.
            </p>
            <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
              That&apos;s why <strong style={{ fontWeight: 800 }}>{t("SC-01 Daily Chews")}</strong>{" "}
              does both. The Itch Spray calms irritated skin right away, and the daily chew works
              on the root cause from the inside. You need the topical for relief today and the
              ingestible for the fix that lasts.
            </p>
          </>
        ) : (
          <>
            <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
              Due to an overactive histamine response, it&apos;s normal for {name} to keep
              scratching no matter what you try.
            </p>
            <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
              However, <strong style={{ fontWeight: 800 }}>{t("SC-01 Daily Chews")}</strong> is made
              to calm exactly that.
            </p>
          </>
        )}
      </div>

      <StickyCta>
        <NextButton href={nextHref}>Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
