"use client";

import Image from "next/image";
import { Icon, type IconName } from "@/components/core/Icon";
import { itchQuiz } from "@/lib/quiz/itch";
import { dogName } from "@/lib/quiz/itchAssessment";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";
import { useAnswers } from "@/lib/quiz/store";

const BENEFITS = [
  {
    slug: "less-itching",
    title: "Less itching",
    src: "/quiz/itch/benefit-less-itching.webp",
    alt: "A calm, comfortable dog resting at home, not scratching",
    body: "SC-01 Daily Chews are made with quercetin, a natural compound that's been shown to calm the body's histamine response, potentially reducing the itching, licking, and scratching that comes with it.",
  },
  {
    slug: "healthier-coat",
    title: "Healthier coat",
    src: "/quiz/itch/benefit-coat.webp",
    alt: "A dog with a shiny, healthy coat outdoors",
    body: "With omega-3 fatty acids from fish oil, SC-01 Daily Chews support {name}'s skin barrier from the inside out. You may notice a shinier coat and less shedding as skin health improves.",
  },
  {
    slug: "fewer-hot-spots",
    title: "Fewer hot spots",
    src: "/quiz/itch/benefit-hotspots.webp",
    alt: "A veterinarian gently checking a dog's paw and skin",
    body: "Zinc and vitamin E help skin heal faster and stay resilient, which means irritated patches are less likely to turn into full hot spots.",
  },
  {
    slug: "calmer-gut",
    title: "Calmer gut, calmer skin",
    src: "/quiz/itch/benefit-gut.webp",
    alt: "A happy dog eating from a bowl in a bright kitchen",
    body: "A healthy gut plays a bigger role in skin health than most people realize. The probiotics in SC-01 Daily Chews support digestion, which can reduce inflammatory flare-ups triggered by food sensitivities.",
  },
] as const;

const ATTRIBUTES: { icon: IconName; label: string }[] = [
  { icon: "wheat-off", label: "Grain-free" },
  { icon: "leaf", label: "No artificial flavors" },
  { icon: "shield-check", label: "Vet-formulated" },
  { icon: "dna", label: "Non-GMO" },
  { icon: "flag", label: "Made in the USA" },
];

export function ItchBenefits() {
  const { answers } = useAnswers(itchQuiz.id);
  const name = dogName(answers);

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
        SC-01 Daily Chews are made to calm the histamine response behind {name}&apos;s
        itching.
      </h1>

      <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
        {BENEFITS.map((b, i) => (
          <li key={b.slug} style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start" }}>
            <Image
              src={b.src}
              alt={b.alt}
              width={400}
              height={400}
              style={{
                flex: "none",
                width: "clamp(64px, 20vw, 100px)",
                height: "clamp(64px, 20vw, 100px)",
                borderRadius: "50%",
                objectFit: "cover",
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
                {b.body.replace("{name}", name)}
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
        <NextButton href="/quiz/itch/results/story">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
