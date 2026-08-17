import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/core/Icon";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

export const metadata: Metadata = { title: "What it does | SUNNYCELLS" };

const BENEFITS = [
  {
    title: "Reduced stress",
    body: "Metabolic Morning Blend is made out of numerous natural herbs and ingredients like ashwagandha and Rhodiola rosea, which have been shown to modulate the body's stress response, potentially leading to lower cortisol levels and a reduced feeling of stress.",
  },
  {
    title: "Weight loss",
    body: "Metabolic Morning Blend helps to reduce food cravings, which eventually leads to weight loss. Additionally, with improved energy levels and reduced stress, you might find it easier to engage in regular physical activity and make healthier dietary choices, further supporting weight management efforts.",
  },
  {
    title: "Better sleep",
    body: "High cortisol levels, particularly at night, can disrupt sleep patterns and lead to insomnia. Metabolic Morning Blend has L-theanine and magnesium that helps to regulate and enhance sleep quality.",
  },
  {
    title: "Increased energy and cognitive function",
    body: "Experience a boost in overall energy and vitality. This is partly due to improved sleep and reduced metabolic burden from excessive cortisol production. Let Metabolic Morning Blend get you back on track.",
  },
];

const ATTRIBUTES: { icon: IconName; label: string }[] = [
  { icon: "wheat-off", label: "Gluten-free" },
  { icon: "leaf", label: "Vegan" },
  { icon: "zap-off", label: "Stimulant-free" },
  { icon: "dna", label: "Non-GMO" },
  { icon: "droplet", label: "Keto-friendly" },
];

export default function BenefitsPage() {
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
        Metabolic Morning Blend is a cortisol cocktail which is made to lower your
        cortisol levels.
      </h1>

      <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
        {BENEFITS.map((b, i) => (
          <li key={b.title} style={{ display: "flex", gap: "var(--space-5)", alignItems: "flex-start" }}>
            {/* The reference runs a line illustration here. The system does not use
                illustration, and inventing one would be inventing brand art, so the
                numeral does the work: display face, on a sun block. */}
            <span
              aria-hidden="true"
              style={{
                flex: "none",
                width: 52,
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--sun)",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "var(--size-h4)",
                color: "var(--ink)",
                lineHeight: 1,
              }}
            >
              {i + 1}
            </span>
            <div>
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
        <NextButton href="/quiz/diet/results/plans">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
