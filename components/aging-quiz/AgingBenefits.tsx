"use client";

import { Icon, type IconName } from "@/components/core/Icon";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

const BENEFITS = [
  {
    slug: "skin",
    title: "Smoother, firmer looking skin",
    body: "Types I and III are the collagens that make up the dermis, the layer under the surface that keeps skin taut. Hydrolyzed peptides are broken small enough to be absorbed and carried there, which is the part a cream on the top layer cannot do.",
  },
  {
    slug: "hair-nails",
    title: "Stronger hair and nails",
    body: "Hair and nails are built from the same protein scaffolding as your skin, which is why they tend to change together. Nails grow out over three to six months and hair is slower still, so this is the part you see last and notice most.",
  },
  {
    slug: "joints",
    title: "Joints that keep up with you",
    body: "Type II is the collagen in cartilage and types V and X sit in connective tissue and the growth plate. This is why a collagen taken for skin is the same one people take to keep walking, lifting and moving without paying for it the next day.",
  },
  {
    slug: "one-ingredient",
    title: "One ingredient, nothing else",
    body: "Hydrolyzed collagen and that is the whole panel. No proprietary blend, no sweetener, no filler taking up the scoop. Unflavored, so it goes into the coffee you already drink without changing what you are drinking.",
  },
];

const ATTRIBUTES: { icon: IconName; label: string }[] = [
  { icon: "droplet", label: "Zero sugar" },
  { icon: "wheat-off", label: "Gluten-free" },
  { icon: "zap-off", label: "No stimulants" },
  { icon: "dna", label: "Non-GMO" },
  { icon: "leaf", label: "No fillers" },
];

export function AgingBenefits() {
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
        Complete Collagen replaces what your body has stopped making.
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
                background: "var(--sun-tint)",
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
        <NextButton href="/quiz/aging/results/story">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
