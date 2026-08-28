"use client";

import { Icon, type IconName } from "@/components/core/Icon";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/* Titles are what she would notice, not what the ingredient is called. The dose stays,
   at the end of each body, where it works as the reason to believe rather than as the
   pitch. */
const BENEFITS = [
  {
    slug: "fuller",
    title: "Arms that look fuller, not softer",
    body: "Creatine pulls water into the muscle cell itself, which is why the look changes before the strength does and why four weeks is usually enough to see it. 5 g is the dose almost every trial used. The worry about bulking up is not what the research shows, and it is the reason most women were never offered the one supplement with the deepest evidence behind it.",
  },
  {
    slug: "rested",
    title: "Skin that looks rested in photographs",
    body: "The complaint is rarely wrinkles in the abstract. It is the gap between how old you feel and how old you look in a photo nobody warned you about. Collagen peptides at 10 g are hydrolyzed small enough to be absorbed and carried to the dermis, the layer under the surface that holds skin taut, which is the layer a cream never reaches.",
  },
  {
    slug: "hair-nails",
    title: "Nails past your fingertips, less hair in the brush",
    body: "Hair and nails are built from the same scaffolding as your skin, which is why all three started changing at the same time and why they come back in the same order. Nails move first, usually inside two months. The brush is slower and it is the one most women check without mentioning it.",
  },
  {
    slug: "day-after",
    title: "A day after that costs you less",
    body: "Two days sore from one session, and stiff getting out of the car. Electrolytes put back the sodium, potassium and magnesium a hard hour or a hot afternoon takes out, with vitamin C and D3 alongside. The vitamin C is not padding: your body cannot build collagen without it, so it is working for the scoop it shares.",
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
        What actually changes, and when you will see it.
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
