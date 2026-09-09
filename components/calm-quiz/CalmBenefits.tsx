"use client";

import { Icon, type IconName } from "@/components/core/Icon";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/* Titles are what she would notice, not what the ingredient is called. The dose stays,
   at the end of each body, where it works as the reason to believe rather than as the
   pitch. Doses are the ones in lib/products/anytime-calm.ts: keep them in step.

   No diagnosis is named. "Insomnia" and "anxiety" are conditions, and a supplement
   that claims to address one is an unapproved drug, so the copy describes the night
   rather than labelling it. */
const BENEFITS = [
  {
    slug: "switch-off",
    title: "Getting into bed already sleepy",
    body: "The wired but tired feeling is your stress axis still running at eleven at night, long after your body has given up. 200 mg of L-theanine is the amino acid in green tea, and it settles that edge without sedating you, which is why there is no caffeine in the blend to work against it and no melatonin to knock you out. This is the part people notice first, usually inside a week.",
  },
  {
    slug: "fall-asleep",
    title: "Lying there for minutes instead of an hour",
    body: "Glycine is an amino acid your body already uses as a calming signal, and it also lowers core body temperature slightly, which is the drop your body waits for before it lets you go under. 3,000 mg is the dose the sleep research uses, not a sprinkle of it. It is the largest thing in the tub by weight for a reason.",
  },
  {
    slug: "stay-asleep",
    title: "Not being awake at three in the morning",
    body: "Surfacing at three and lying there is the stress axis firing in the middle of the night rather than a habit you can break by trying harder. 200 mg of magnesium glycinate is the form that is bound to glycine, so it absorbs well and does not upset your stomach the way cheaper magnesium oxide does. It works on the physical side of it: the tension, the restless legs, the racing heart.",
  },
  {
    slug: "rested",
    title: "Waking up without needing the coffee first",
    body: "This is the last one to change and the one you will actually feel. It is not about more hours, it is about the hours you already get being unbroken. There is no melatonin in this, deliberately: melatonin puts you under and leaves you groggy, and grogginess is not the problem you have.",
  },
];

/* Only what lib/products/anytime-calm.ts actually claims. No third-party testing badge
   and no non-GMO claim beyond the one printed on the tub, because an attribute row is
   the easiest place in a funnel to pick up a claim nobody can substantiate. */
const ATTRIBUTES: { icon: IconName; label: string }[] = [
  { icon: "zap-off", label: "No melatonin" },
  { icon: "leaf", label: "Zero sugar" },
  { icon: "shield-check", label: "30 day money back" },
];

export function CalmBenefits() {
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
        What actually changes, and when you will feel it.
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
        <NextButton href="/quiz/calm/results/plans">See my recommendation</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
