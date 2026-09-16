"use client";

import { Badge } from "@/components/core/Badge";
import { Icon } from "@/components/core/Icon";
import { brainV3Quiz } from "@/lib/quiz/brainV3";
import { computedBrainAge, offerTags, targetAge } from "@/lib/quiz/brainV3Assessment";
import { useAnswers } from "@/lib/quiz/store";

/**
 * Sits above the plan cards on the offer page, not folded into PlansScreen
 * itself: it is the one part of this page that knows who just took the quiz.
 * Renders nothing until her answers are ready, and nothing at all if she landed
 * here without a complete quiz (no age, no target), rather than showing a band
 * about a diagnosis that was never actually made.
 */
export function BrainV3OfferBand() {
  const { answers, ready } = useAnswers(brainV3Quiz.id);
  if (!ready) return null;

  const age = computedBrainAge(answers);
  const target = targetAge(answers);
  if (!age || target == null) return null;

  const tags = offerTags(answers);

  return (
    <div style={{ background: "var(--sky-tint)", padding: "var(--space-8) var(--page-gutter-mobile)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <h1
          style={{
            margin: "0 0 var(--space-5)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(var(--size-h4), 6vw, var(--size-h2))",
            fontWeight: 900,
            letterSpacing: "var(--tracking-heading)",
            lineHeight: "var(--leading-snug)",
          }}
        >
          Your plan is ready. It needs 12 weeks to work.
        </h1>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "var(--space-2)", marginBottom: "var(--space-6)" }}>
          {tags.map((t) => (
            <Badge key={t} tone="ink">{t}</Badge>
          ))}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-5)",
            background: "var(--white)",
            border: "1px solid var(--border-hairline)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-5) var(--space-6)",
          }}
        >
          <div>
            <div style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>Brain age today</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 36, color: "var(--status-error)" }}>
              {age.brain}
            </div>
          </div>
          <Icon name="arrow-right" size={24} style={{ color: "var(--ink-40)", flex: "none" }} />
          <div>
            <div style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>Your target</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 36, color: "var(--status-success)" }}>
              {target}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
