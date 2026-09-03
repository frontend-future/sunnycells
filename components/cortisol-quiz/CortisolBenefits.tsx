"use client";

import { Icon, type IconName } from "@/components/core/Icon";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/* Titles are what she would notice, not what the ingredient is called. The dose stays,
   at the end of each body, where it works as the reason to believe rather than as the
   pitch. Doses are the ones in lib/products/youth-matrix-chews.ts: keep them in step. */
const BENEFITS = [
  {
    slug: "puffiness",
    title: "A face that has drained by the time you leave",
    body: "The swelling under your eyes and along your jaw is fluid, not fat, and it is there because a raised evening cortisol changes how your vessels hold water overnight. 100 mg of magnesium glycinate with 150 mg of L-theanine settles the fight-or-flight side of that before you sleep. Fluid is the fastest thing on this list to move, which is why puffiness is usually the first change people report.",
  },
  {
    slug: "firmness",
    title: "Firmness coming back, in that order",
    body: "Cortisol switches on enzymes that cut through collagen faster than you lay it down, so the scaffolding under your skin thins and the surface above it stops being held taut. 2,500 mg of gelatin supplies the glycine and proline that scaffolding is built from, and 60 mg of acerola vitamin C is the cofactor without which your body cannot assemble any of it. Skin turns over across about four weeks, so this one is measured in months, not days.",
  },
  {
    slug: "sleep",
    title: "Asleep without the three in the morning",
    body: "Waking at three with a racing mind is not ordinary insomnia, it is the stress axis firing in the middle of the window when growth hormone does its repair work. Magnesium glycinate and L-theanine lower the tension that causes it. There is no melatonin in this, deliberately: melatonin puts you under and leaves you groggy, and grogginess is not the problem you have.",
  },
  {
    slug: "barrier",
    title: "Skin that stops reacting to everything",
    body: "Redness, tight patches and things that flare for no reason are a barrier running short of the lipids it needs. 150 mg of niacinamide raises cellular NAD+, which is what your skin runs its overnight repair and lipid production on. This is also the part your creams were closest to reaching and still could not do from the outside.",
  },
];

/* Only what lib/products/youth-matrix-chews.ts actually claims. Non-GMO, zero sugar
   and third-party testing are on the other funnels' products, not stated for this one,
   so they are not here. An attribute row is the easiest place in a funnel to pick up a
   claim nobody can substantiate. */
const ATTRIBUTES: { icon: IconName; label: string }[] = [
  { icon: "zap-off", label: "No melatonin" },
  { icon: "leaf", label: "No synthetic fillers" },
  { icon: "shield-check", label: "30 day money back" },
];

export function CortisolBenefits() {
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
        <NextButton href="/products/youth-matrix-chews">See my recommendation</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
