"use client";

import Image from "next/image";
import { Icon, type IconName } from "@/components/core/Icon";
import { dietQuiz } from "@/lib/quiz/diet";
import { useAnswers } from "@/lib/quiz/store";
import { NextButton } from "./NextButton";
import { ResultsShell } from "./ResultsShell";
import { StickyCta } from "./StickyCta";

const BENEFITS = [
  {
    slug: "reduced-stress",
    title: "Reduced stress",
    alt: "Line drawing of a calm, smiling person with sparkles around them",
    body: "Metabolic Morning Blend is made out of numerous natural herbs and ingredients like ashwagandha and Rhodiola rosea, which have been shown to modulate the body's stress response, potentially leading to lower cortisol levels and a reduced feeling of stress.",
  },
  {
    slug: "weight-loss",
    title: "Weight loss",
    alt: "Line drawing of a person measuring their waist with a tape measure",
    body: "Metabolic Morning Blend helps to reduce food cravings, which eventually leads to weight loss. Additionally, with improved energy levels and reduced stress, you might find it easier to engage in regular physical activity and make healthier dietary choices, further supporting weight management efforts.",
  },
  {
    slug: "better-sleep",
    title: "Better sleep",
    alt: "Line drawing of a person sleeping peacefully on a pillow",
    body: "High cortisol levels, particularly at night, can disrupt sleep patterns and lead to insomnia. Metabolic Morning Blend has L-theanine and magnesium that helps to regulate and enhance sleep quality.",
  },
  {
    slug: "increased-energy",
    title: "Increased energy and cognitive function",
    alt: "Line drawing of a person running",
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

export function BenefitsScreen() {
  const { answers } = useAnswers(dietQuiz.id);
  /* Falls to the female set on the server and before the answer is read, since that
     is the brand's audience. Swapping after hydration only changes an illustration,
     never layout, so nothing shifts under her. */
  const set = answers.gender === "Male" ? "male" : "female";

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
          /* Two columns, not a float: the text keeps its own measure and every line
             starts on the same left edge, which is how the reference sets it. The
             illustration scales with the viewport so the text column does not get
             squeezed on a small screen. */
          <li key={b.slug} style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start" }}>
            <Image
              src={`/illustrations/${b.slug}-${set}.png`}
              alt={b.alt}
              width={320}
              height={320}
              style={{
                flex: "none",
                width: "clamp(64px, 20vw, 100px)",
                height: "clamp(64px, 20vw, 100px)",
                marginTop: -6,
              }}
            />
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
                {i + 1}. {b.title}
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
