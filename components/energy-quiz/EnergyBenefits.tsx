"use client";

import { Icon, type IconName } from "@/components/core/Icon";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

const BENEFITS = [
  {
    slug: "steady-energy",
    title: "Steady energy",
    body: "Even Energy carries Ubiqsome CoQ10 at 150 mg, a phytosome form built for absorption, and CoQ10 is the molecule your mitochondria use on the way to making ATP. Your body makes less of it as you get older, and less of it on a statin.",
  },
  {
    slug: "no-crash",
    title: "No crash and no jitters",
    body: "There is no caffeine in it at all, so there is no spike and nothing to come down from. That is the whole reason the afternoon holds instead of falling away at three, and the reason it will not sit between you and your sleep.",
  },
  {
    slug: "recovery",
    title: "Muscle function and recovery",
    body: "Taurine at 1000 mg is one of the most abundant amino acids in muscle tissue, and human studies associate it with reduced fatigue and better endurance. PEAK ATP at 40 mg is included at the dose the research used rather than a dusting for the label.",
  },
  {
    slug: "daily-use",
    title: "Built for every day",
    body: "One stick in cold water, 2.4 g, thirty seconds. Nothing here works by pushing harder on a system that is already tired, which is why it is made to take every morning rather than on the days you are desperate.",
  },
];

const ATTRIBUTES: { icon: IconName; label: string }[] = [
  { icon: "zap-off", label: "Caffeine-free" },
  { icon: "leaf", label: "Vegan" },
  { icon: "wheat-off", label: "Gluten-free" },
  { icon: "dna", label: "Non-GMO" },
  { icon: "droplet", label: "Zero sugar" },
];

export function EnergyBenefits() {
  return (
    <ResultsShell>
      <h1
        style={{
          margin: "0 0 var(--space-10)",
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--size-h4), 6.2vw, var(--size-h2))",
          fontWeight: 900,
          letterSpacing: "var(--tracking-heading)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        Even Energy is a caffeine free daily drink made to give you steady energy.
      </h1>

      <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
        {BENEFITS.map((b, i) => (
          <li key={b.slug} style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start" }}>
            {/* A numbered disc rather than an illustration: the diet funnel has a drawn
                set per gender and this product has none yet, and a missing image tag is
                worse than no image. */}
            <span
              aria-hidden="true"
              style={{
                flex: "none",
                width: "clamp(44px, 12vw, 56px)",
                height: "clamp(44px, 12vw, 56px)",
                borderRadius: "50%",
                background: "var(--sprout-tint)",
                border: "1px solid var(--border-hairline)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontSize: "var(--size-body-lg)",
                fontWeight: 900,
              }}
            >
              {i + 1}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2
                style={{
                  margin: "0 0 var(--space-2)",
                  fontFamily: "var(--font-text)",
                  fontSize: "var(--size-body-lg)",
                  fontWeight: 800,
                  lineHeight: 1.25,
                }}
              >
                {b.title}
              </h2>
              <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--ink-80)" }}>
                {b.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <ul
        style={{
          margin: "var(--space-10) 0 0",
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "var(--space-5) var(--space-4)",
        }}
      >
        {ATTRIBUTES.map((a) => (
          <li key={a.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)", width: 92 }}>
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
              <Icon name={a.icon} size={24} />
            </span>
            <span style={{ fontSize: "var(--size-meta)", fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>
              {a.label}
            </span>
          </li>
        ))}
      </ul>

      <StickyCta>
        <NextButton href="/quiz/energy/results/story">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
