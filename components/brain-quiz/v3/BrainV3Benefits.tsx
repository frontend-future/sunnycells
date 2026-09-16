"use client";

import { Icon, type IconName } from "@/components/core/Icon";
import { PRODUCT, TIMELINE } from "@/lib/products/brain-memory";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

const BADGES: { icon: IconName; label: string }[] = [
  { icon: "zap-off", label: "Stimulant-free" },
  { icon: "wheat-off", label: "Gluten-free" },
  { icon: "leaf", label: "Dairy-free" },
  { icon: "droplet", label: "No added sugar" },
  { icon: "shield-check", label: "No artificial colors" },
  { icon: "check", label: "No proprietary blends" },
];

export function BrainV3Benefits() {
  return (
    <ResultsShell>
      <h1
        style={{
          margin: "0 0 var(--space-6)",
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--size-h4), 6.2vw, var(--size-h2))",
          fontWeight: 900,
          letterSpacing: "var(--tracking-heading)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        {PRODUCT.name} is built to support your brain&apos;s energy, defenses and circulation
      </h1>

      <p style={{ margin: "0 0 var(--space-8)", textAlign: "center", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
        Six actives, each dosed and printed on the label, not folded into a proprietary blend. Take{" "}
        {PRODUCT.capsulesPerServing} capsules daily with food.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", marginBottom: "var(--space-10)" }}>
        {TIMELINE.map((t, i) => (
          <div key={t.when} style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start" }}>
            <span
              aria-hidden="true"
              style={{
                flex: "none",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--sky) 0%, var(--sky-press) 100%)",
                color: "var(--white)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontWeight: 900,
              }}
            >
              {i + 1}
            </span>
            <div>
              <div style={{ fontSize: "var(--size-meta)", fontWeight: 700, color: "var(--ink-60)" }}>{t.when}</div>
              <div style={{ fontSize: "var(--size-body-lg)", fontWeight: 800, margin: "2px 0 4px" }}>{t.title}</div>
              <p style={{ margin: 0, fontSize: "var(--size-body)", color: "var(--ink-80)", lineHeight: "var(--leading-body)" }}>
                {t.copy}
              </p>
            </div>
          </div>
        ))}
      </div>

      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "var(--space-5) var(--space-4)",
        }}
      >
        {BADGES.map((b) => (
          <li key={b.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)", width: 92 }}>
            <span
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "1px solid var(--border-hairline)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--ink)",
              }}
            >
              <Icon name={b.icon} size={24} />
            </span>
            <span style={{ fontSize: "var(--size-meta)", fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>{b.label}</span>
          </li>
        ))}
      </ul>

      <StickyCta>
        <NextButton href="/quiz/brain/v3/results/story">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
