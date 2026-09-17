"use client";

import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { jointQuiz } from "@/lib/quiz/joint";
import { dogName } from "@/lib/quiz/jointAssessment";
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
 * ItchStory.tsx's own placeholder.
 *
 * Before this page goes live: replace the owner's name, the dog's name and
 * photo, the quote, and the three points with a real customer who has given
 * written permission, and keep the substantiation for the timeframe on file.
 */
const OWNER_NAME = "Tom";
const STORY_DOG_NAME = "Max";
const WEEKS = 4;
const QUOTE = "I finally stopped feeling like I was watching him get old overnight";

const POINTS = [
  { lead: `${STORY_DOG_NAME} started jumping onto the couch again`, rest: ", something he'd stopped doing months earlier." },
  { lead: "His morning stiffness eased up", rest: ", so he wasn't struggling to stand for the first few minutes after waking anymore." },
  { lead: "Walks got longer and more enthusiastic", rest: `, instead of stopping every block. ${OWNER_NAME} had tried a joint supplement from the pet store before this, but nothing worked until they addressed the cartilage itself.` },
];

export function JointStory() {
  const { answers } = useAnswers(jointQuiz.id);
  /* Her own dog's name is read only so the CTA below can speak to her
     directly; the story itself is about a different dog, same reasoning
     ItchStory documents for why a testimonial names a stock example rather
     than whoever is actually taking the quiz. */
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
        SC-02 Hip & Joint Chews helped {STORY_DOG_NAME} jump on the couch again in {WEEKS}{" "}
        weeks.
      </h1>

      <Image
        src="/quiz/joint/story-tom.webp"
        alt={`${OWNER_NAME} holding a jar of SC-02 Hip & Joint Chews next to ${STORY_DOG_NAME}, his happy, active-looking dog`}
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
        Over {WEEKS} weeks of giving {STORY_DOG_NAME} SC-02 Hip & Joint Chews, {OWNER_NAME}{" "}
        noticed significant changes:
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
        <NextButton href="/quiz/joint/results/plans">
          {name !== "your dog" ? `See ${name}'s plan` : "Continue"}
        </NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
