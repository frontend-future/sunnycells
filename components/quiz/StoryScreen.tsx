"use client";

import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { dietQuiz } from "@/lib/quiz/diet";
import { useAnswers } from "@/lib/quiz/store";
import { NextButton } from "./NextButton";
import { ResultsShell } from "./ResultsShell";
import { StickyCta } from "./StickyCta";

/**
 * PLACEHOLDER STORY, AND THE PHOTOGRAPHS ARE GENERATED.
 *
 * Nobody named here is a real customer, neither face belongs to a real person, and no
 * result here has been measured. Publishing a testimonial that was written rather than
 * collected is illegal in the US under the FTC rule on consumer reviews and
 * testimonials, which names AI-generated endorsers specifically and carries civil
 * penalties per violation. Most other markets take the same view.
 *
 * Before this page goes live: replace the names, the photographs, the quote, and the
 * three points with a real customer who has given written permission, and keep the
 * substantiation for the weight figure on file.
 */
const STORIES = {
  female: {
    set: "female",
    name: "Dana",
    they: "she",
    points: [
      { lead: "Dana lost 21 pounds", rest: ", which not only boosted her self-esteem but also had a positive impact on her overall health." },
      { lead: "As her high cortisol levels decreased, Dana's energy levels soared", rest: ". She found herself more motivated to engage in physical activities, such as daily walks and workouts, which had been a challenge before." },
      { lead: "Inflammation, bloating, and discomfort became distant memories", rest: ". Dana was always fighting her weight but never knew that the key to success was to fix her cortisol levels." },
    ],
  },
  male: {
    set: "male",
    name: "Marcus",
    they: "he",
    points: [
      { lead: "Marcus lost 21 pounds", rest: ", which not only boosted his self-esteem but also had a positive impact on his overall health." },
      { lead: "As his high cortisol levels decreased, Marcus's energy levels soared", rest: ". He found himself more motivated to engage in physical activities, such as daily walks and workouts, which had been a challenge before." },
      { lead: "Inflammation, bloating, and discomfort became distant memories", rest: ". Marcus was always fighting his weight but never knew that the key to success was to fix his cortisol levels." },
    ],
  },
} as const;

const POUNDS = 21;
const WEEKS = 5;
const QUOTE = "I've gained a newfound understanding of my body and how to nourish it properly";

export function StoryScreen() {
  const { answers } = useAnswers(dietQuiz.id);
  /* Female is the default, as on the benefits step: it is the brand's audience and it
     is where an unknown or missing answer should land. */
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
        Metabolic Morning Blend helped {s.name} lose {POUNDS} pounds in {WEEKS} weeks.
      </h1>

      <Image
        src={`/photos/story-${s.set}.jpg`}
        alt={`${s.name} holding a pouch of Metabolic Morning Blend`}
        width={1080}
        height={1480}
        style={{
          /* Capped by height and centred rather than run full width. Uncapped, the
             3:4 portrait was about 480px tall on a phone and pushed the quote and all
             three points off the screen. */
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
        Over {WEEKS} weeks of drinking the cortisol cocktail, {s.they} noticed significant
        changes:
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
        <NextButton href="/quiz/diet/results/plans">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
