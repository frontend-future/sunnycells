"use client";

import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { itchQuiz } from "@/lib/quiz/itch";
import { dogName } from "@/lib/quiz/itchAssessment";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";
import { useAnswers } from "@/lib/quiz/store";

/**
 * PLACEHOLDER STORY, AND THE PHOTOGRAPH IS GENERATED.
 *
 * Nobody named here is a real customer, neither person nor dog in the photo is
 * real, and no result here has been measured. Publishing a testimonial that
 * was written rather than collected is illegal in the US under the FTC rule on
 * consumer reviews and testimonials, which names AI-generated endorsers
 * specifically and carries civil penalties per violation. Same footing as
 * StoryScreen.tsx's own placeholder.
 *
 * Before this page goes live: replace the owner's name, the dog's name and
 * photo, the quote, and the three points with a real customer who has given
 * written permission, and keep the substantiation for the timeframe on file.
 */
const OWNER_NAME = "Sarah";
const STORY_DOG_NAME = "Cooper";
const WEEKS = 3;
const QUOTE = "I finally stopped feeling helpless watching him suffer";

const POINTS = [
  { lead: `${STORY_DOG_NAME} stopped scratching within ${WEEKS} weeks`, rest: `, which meant ${OWNER_NAME} could finally let him sleep in the bedroom again without being kept up all night.` },
  { lead: `As his skin calmed down, ${STORY_DOG_NAME}'s energy came back`, rest: ". He was excited for walks again instead of stopping every few minutes to scratch." },
  { lead: "The hot spots and bald patches cleared up completely", rest: `. ${OWNER_NAME} had tried three different vet-prescribed treatments before this, but nothing worked until they addressed the root cause.` },
];

export function ItchStory({
  quizId = itchQuiz.id,
  nextHref = "/quiz/itch/results/plans",
}: { quizId?: string; nextHref?: string } = {}) {
  const { answers } = useAnswers(quizId);
  /* Her own dog's name is read only so the CTA below can speak to her
     directly; the story itself is about a different dog, same reasoning
     BrainPlanCards documents for why a testimonial names a stock example
     rather than whoever is actually taking the quiz. */
  const name = dogName(answers);

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
        SC-01 Daily Chews helped {STORY_DOG_NAME} stop scratching in {WEEKS} weeks.
      </h1>

      <Image
        src="/quiz/itch/story-sarah.webp"
        alt={`${OWNER_NAME} holding a jar of SC-01 Daily Chews next to ${STORY_DOG_NAME}, her happy, healthy-looking dog`}
        width={1080}
        height={1480}
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
        <em>&ldquo;{QUOTE}&rdquo;</em> says {OWNER_NAME}, {STORY_DOG_NAME}&apos;s owner.
      </p>

      <p style={{ margin: "var(--space-6) 0 var(--space-5)", fontSize: "var(--size-body)", fontWeight: 800, lineHeight: "var(--leading-body)" }}>
        Over {WEEKS} weeks of giving {STORY_DOG_NAME} SC-01 Daily Chews, {OWNER_NAME} noticed
        significant changes:
      </p>

      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {POINTS.map((p) => (
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
        <NextButton href={nextHref}>
          {name !== "your dog" ? `See ${name}'s plan` : "Continue"}
        </NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
