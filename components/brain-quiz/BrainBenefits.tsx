"use client";

import { INGREDIENTS, PRODUCT } from "@/lib/products/brain-memory";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/* The three causes again, this time paired with what each active actually does,
   pulled straight from lib/products/brain-memory.ts rather than restated by hand. */
const CAUSES = [
  {
    title: "Energy decline",
    ingredientKeys: ["alc", "ala"],
    body: "Brain cells that are running low on cellular energy are a large part of what shows up as brain fog. Acetyl-L-Carnitine and Alpha Lipoic Acid both play a role in that energy production, from the first dose.",
  },
  {
    title: "Inflammation",
    ingredientKeys: ["nac", "ala"],
    body: "Oxidative stress wears down brain cells over time. N-Acetyl-L-Cysteine is a precursor to glutathione, one of the body's own protective compounds, and Alpha Lipoic Acid works alongside it.",
  },
  {
    title: "Low blood flow",
    ingredientKeys: ["ginkgo"],
    body: "Less oxygen and fewer nutrients reaching the brain is the third piece. Ginkgo Biloba Extract is one of the most studied herbal extracts for supporting healthy circulation, including to the brain.",
  },
] as const;

function doseLine(keys: readonly string[]) {
  return INGREDIENTS.filter((i) => (keys as readonly string[]).includes(i.key))
    .map((i) => `${i.name} (${i.dose})`)
    .join(" and ");
}

export function BrainBenefits() {
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
        {PRODUCT.name} is the only formula built to address all three causes at once.
      </h1>

      <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
        {CAUSES.map((c, i) => (
          <li key={c.title} style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start" }}>
            <span
              aria-hidden="true"
              style={{
                flex: "none",
                width: "clamp(44px, 12vw, 56px)",
                height: "clamp(44px, 12vw, 56px)",
                borderRadius: "50%",
                background: "var(--sky-tint)",
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
                {c.title}
              </h2>
              <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--ink-80)" }}>
                {c.body}
              </p>
              <p style={{ margin: "var(--space-2) 0 0", fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink-60)" }}>
                {doseLine(c.ingredientKeys)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p style={{ margin: "var(--space-10) 0 0", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", textAlign: "center" }}>
        Stimulant-free, {PRODUCT.capsulesPerServing} capsules a day, {PRODUCT.servings} servings per bottle.
      </p>

      <StickyCta>
        <NextButton href="/quiz/brain/results/story">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
