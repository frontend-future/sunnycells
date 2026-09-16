"use client";

import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { PRODUCT } from "@/lib/products/brain-memory";
import { brainQuiz } from "@/lib/quiz/brain";
import { useAnswers } from "@/lib/quiz/store";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/**
 * PLACEHOLDER STORY, AND THE PHOTOGRAPH IS GENERATED.
 *
 * Nobody named here is a real customer, the face does not belong to a real person, and
 * no result here has been measured. Publishing a testimonial that was written rather
 * than collected is illegal in the US under the FTC rule on consumer reviews and
 * testimonials, which names AI-generated endorsers specifically and carries civil
 * penalties per violation. Most other markets take the same view.
 *
 * Before this page goes live: replace the name, the photograph and the quote with a
 * real customer who has given written permission. Same standing instruction as every
 * other funnel's story screen.
 */
const STORIES = {
  female: {
    name: "Carol",
    they: "she",
    her: "her",
    image: "/quiz/brain/story-carol.webp",
    points: [
      { lead: "Carol stopped losing her train of thought mid-sentence", rest: ", something she had quietly written off as just getting older." },
      { lead: "The afternoon fog that used to slow her whole day", rest: " came in lighter and left sooner, most days barely at all." },
      { lead: "She started finishing crosswords again", rest: ", the ones she had put down a year earlier out of frustration." },
    ],
  },
  male: {
    name: "Robert",
    they: "he",
    her: "his",
    image: "/quiz/brain/story-robert.webp",
    points: [
      { lead: "Robert stopped losing his train of thought mid-sentence", rest: ", something he had quietly written off as just getting older." },
      { lead: "The afternoon fog that used to slow his whole day", rest: " came in lighter and left sooner, most days barely at all." },
      { lead: "He started finishing crosswords again", rest: ", the ones he had put down a year earlier out of frustration." },
    ],
  },
} as const;

const WEEKS = 12;
const QUOTE = "I stopped introducing myself with an apology for forgetting names";

export function BrainStory({
  quizId = brainQuiz.id,
  nextHref = "/products/brain-memory",
}: { quizId?: string; nextHref?: string } = {}) {
  const { answers } = useAnswers(quizId);
  const s = answers.gender === "Male" ? STORIES.male : STORIES.female;

  return (
    <ResultsShell>
      <h1
        style={{
          margin: "0 0 var(--space-8)",
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--size-h4), 6.6vw, var(--size-h2))",
          fontWeight: 900,
          letterSpacing: "var(--tracking-heading)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        {PRODUCT.name} helped {s.name} feel sharper again.
      </h1>

      <Image
        src={s.image}
        alt={`${s.name} holding a bottle of ${PRODUCT.name}`}
        width={800}
        height={1097}
        style={{
          width: "auto",
          maxWidth: "100%",
          maxHeight: 420,
          height: "auto",
          display: "block",
          margin: "0 auto",
          background: "var(--shell)",
          borderRadius: "var(--radius-card)",
        }}
      />

      <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
        <em>&ldquo;{QUOTE}&rdquo;</em> says {s.name}.
      </p>

      <p style={{ margin: "var(--space-6) 0 var(--space-5)", fontSize: "var(--size-body)", fontWeight: 800, lineHeight: "var(--leading-body)" }}>
        Over {WEEKS} weeks, {s.they} noticed significant changes:
      </p>

      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {s.points.map((p) => (
          <li key={p.lead} style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start" }}>
            <span
              aria-hidden="true"
              style={{
                flex: "none",
                marginTop: 1,
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "var(--ink)",
                color: "var(--sun)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="check" size={16} strokeWidth={3.5} />
            </span>
            <span style={{ fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
              <strong style={{ fontWeight: 800 }}>{p.lead}</strong>
              {p.rest}
            </span>
          </li>
        ))}
      </ul>

      <StickyCta>
        <NextButton href={nextHref}>Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
