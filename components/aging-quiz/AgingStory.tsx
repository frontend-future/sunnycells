"use client";

import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { agingQuiz } from "@/lib/quiz/aging";
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
 * Before this page goes live: replace the name, the photograph, the quote, and the
 * three points with a real customer who has given written permission. A before and
 * after on skin needs the photographs unretouched, shot in the same light, and the
 * substantiation kept on file. The same standing instruction the other two funnels
 * carry on their story screens.
 */
const STORIES = {
  female: {
    name: "Elena",
    they: "she",
    points: [
      { lead: "Her nails stopped splitting inside the first month", rest: ", which is the change she noticed before anything in the mirror." },
      { lead: "By week eight there was less hair in the brush", rest: ". Elena had put the shedding down to her age and had stopped mentioning it to anyone." },
      { lead: "The line between her brows softened rather than vanished", rest: ". She describes it as looking rested instead of looking younger, which is the honest version." },
    ],
  },
  male: {
    name: "Tom",
    they: "he",
    points: [
      { lead: "His nails stopped splitting inside the first month", rest: ", which is the change he noticed before anything in the mirror." },
      { lead: "By week eight there was less hair in the brush", rest: ". Tom had put the shedding down to his age and had stopped mentioning it to anyone." },
      { lead: "The line between his brows softened rather than vanished", rest: ". He describes it as looking rested instead of looking younger, which is the honest version." },
    ],
  },
} as const;

const WEEKS = 12;
const QUOTE = "I did not expect the first thing I noticed to be my nails, but it was, and it was quick";

export function AgingStory() {
  const { answers } = useAnswers(agingQuiz.id);
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
        {WEEKS} weeks of Complete Collagen, in {s.name}&apos;s words.
      </h1>

      <Image
        src="/product/complete-collagen.webp"
        alt="A pouch of Complete Collagen"
        width={1024}
        height={1024}
        style={{
          width: "auto",
          maxWidth: "100%",
          maxHeight: 380,
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      />

      <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
        <em>&ldquo;{QUOTE}&rdquo;</em> says {s.name}.
      </p>

      <p style={{ margin: "var(--space-6) 0 var(--space-5)", fontSize: "var(--size-body)", fontWeight: 800, lineHeight: "var(--leading-body)" }}>
        Over {WEEKS} weeks of one scoop a morning, {s.they} noticed significant changes:
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
        <NextButton href="/quiz/aging/results/plans">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
