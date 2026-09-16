"use client";

import type { ReactNode } from "react";
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
/* Rotated through the tags in order, so the band reads as a spread of distinct
   findings rather than one repeated colour. Each is the brand's own hex, split
   into a low-alpha fill and a full-strength border/text, since the token sheet
   only ships light tints (built for a white surface) and full-strength solids
   (too loud at this size) — nothing muted enough to sit quietly on ink. */
const TAGS = [
  { fill: "rgba(255,122,26,0.16)", ring: "rgba(255,122,26,0.55)", text: "#FF9D52" },
  { fill: "rgba(140,176,232,0.18)", ring: "rgba(140,176,232,0.55)", text: "#AEC7EF" },
  { fill: "rgba(121,196,126,0.18)", ring: "rgba(121,196,126,0.55)", text: "#9CD8A0" },
  { fill: "rgba(179,45,24,0.18)", ring: "rgba(179,45,24,0.55)", text: "#E5876F" },
] as const;

function Tag({ children, tone }: { children: ReactNode; tone: (typeof TAGS)[number] }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 34,
        padding: "0 16px",
        background: tone.fill,
        border: `1px solid ${tone.ring}`,
        borderRadius: "var(--radius-pill)",
        color: tone.text,
        fontFamily: "var(--font-text)",
        fontSize: "var(--size-meta)",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export function BrainV3OfferBand({ planCard }: { planCard?: ReactNode }) {
  const { answers, ready } = useAnswers(brainV3Quiz.id);
  if (!ready) return null;

  const age = computedBrainAge(answers);
  const target = targetAge(answers);
  if (!age || target == null) return null;

  const tags = offerTags(answers);

  return (
    <div style={{ background: "var(--ink)", color: "var(--white)", padding: "var(--space-10) var(--page-gutter-mobile) var(--space-12)" }}>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          /* Sits beside the plan card on desktop, stacks above it on a phone: the
             440 floor is what keeps two ~500px columns from being forced onto a
             360px screen, same trick the diet hero uses for its own two columns. */
          gridTemplateColumns: planCard ? "repeat(auto-fit, minmax(min(440px, 100%), 1fr))" : undefined,
          gap: "var(--space-10)",
          alignItems: "center",
        }}
      >
        <div>
          <Badge tone="zest" style={{ borderRadius: "var(--radius-pill)" }}>Our recommendation</Badge>

          <h1
            style={{
              margin: "var(--space-4) 0 var(--space-5)",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--size-h4), 6.5vw, var(--size-h1))",
              fontWeight: 900,
              letterSpacing: "var(--tracking-heading)",
              lineHeight: "var(--leading-snug)",
            }}
          >
            Your plan is ready. It needs <span style={{ color: "var(--sprout)" }}>3 months</span> to work.
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", marginBottom: "var(--space-7)" }}>
            {tags.map((t, i) => (
              <Tag key={t} tone={TAGS[i % TAGS.length]}>{t}</Tag>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-5)",
              background: "var(--white)",
              color: "var(--ink)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-5) var(--space-6)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
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

        {planCard}
      </div>
    </div>
  );
}
