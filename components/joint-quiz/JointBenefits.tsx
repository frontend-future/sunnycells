"use client";

import Image from "next/image";
import { Icon, type IconName } from "@/components/core/Icon";
import { jointQuiz } from "@/lib/quiz/joint";
import { dogName } from "@/lib/quiz/jointAssessment";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";
import { useAnswers } from "@/lib/quiz/store";

/* Eight actives grouped into four benefits, same device the brain quiz's own
   benefits page uses to group six actives into three pillars. */
const BENEFITS = [
  {
    slug: "rebuilds-cartilage",
    title: "Rebuilds cartilage",
    src: "/quiz/joint/benefit-cartilage.webp",
    alt: "A large dog jumping happily onto a couch",
    body: "Glucosamine HCl and Chondroitin Sulfate give {name}'s body the raw material it needs to rebuild worn cartilage and keep it cushioned, the same two actives most joint research is actually built around.",
  },
  {
    slug: "calms-inflammation",
    title: "Calms joint inflammation",
    src: "/quiz/joint/benefit-inflammation.webp",
    alt: "A dog stretching comfortably outdoors",
    body: "MSM and Green-Lipped Mussels are natural anti-inflammatories that can ease the swelling and soreness behind sore, achy joints, without steroids.",
  },
  {
    slug: "keeps-moving",
    title: "Keeps joints moving smoothly",
    src: "/quiz/joint/benefit-mobility.webp",
    alt: "A dog running freely through grass",
    body: "Hyaluronic Acid is a key part of the fluid that lubricates joints, which helps {name} move more freely instead of feeling stiff and grinding.",
  },
  {
    slug: "repair-inside-out",
    title: "Supports repair from the inside out",
    src: "/quiz/joint/benefit-repair.webp",
    alt: "A veterinarian gently checking a dog's leg and joint",
    body: "Omega-3 Fatty Acids and Vitamin C support collagen production and a healthy inflammation response, while Yucca Schidigera has traditionally been used in dogs to ease joint discomfort.",
  },
] as const;

const ATTRIBUTES: { icon: IconName; label: string }[] = [
  { icon: "wheat-off", label: "Grain-free" },
  { icon: "leaf", label: "No artificial flavors" },
  { icon: "shield-check", label: "Vet-formulated" },
  { icon: "dna", label: "Non-GMO" },
  { icon: "flag", label: "Made in the USA" },
];

export function JointBenefits() {
  const { answers } = useAnswers(jointQuiz.id);
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
        SC-02 Hip & Joint Chews are made to rebuild cartilage and calm the inflammation
        behind {name}&apos;s stiffness.
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
        <NextButton href="/quiz/joint/results/story">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
