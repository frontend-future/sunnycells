"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { trackMetaEvent } from "@/lib/meta";
import { CART_ID, PLAN, PRODUCT } from "@/lib/products/brain-memory";
import { brainQuiz } from "@/lib/quiz/brain";
import { readAnswers, useAnswers, writeAnswer } from "@/lib/quiz/store";
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
    points: [
      { lead: "Robert stopped losing his train of thought mid-sentence", rest: ", something he had quietly written off as just getting older." },
      { lead: "The afternoon fog that used to slow his whole day", rest: " came in lighter and left sooner, most days barely at all." },
      { lead: "He started finishing crosswords again", rest: ", the ones he had put down a year earlier out of frustration." },
    ],
  },
} as const;

const WEEKS = 6;
const QUOTE = "I stopped introducing myself with an apology for forgetting names";

export function BrainStory() {
  const router = useRouter();
  const { answers } = useAnswers(brainQuiz.id);
  const s = answers.gender === "Male" ? STORIES.male : STORIES.female;

  /* One click, one event. Nothing unmounts this button between the tap and the route
     change, so a double tap would otherwise fire InitiateCheckout twice with two event
     ids, which Meta cannot dedupe. A ref, not state: state would not have updated
     before the second click in the same tick. */
  const chosen = useRef(false);

  const continueToCheckout = () => {
    if (chosen.current) return;
    chosen.current = true;
    /* Written into the product's own cart, not the quiz store, because the checkout
       that receives it reads from there. Brain & Memory Power Boost has one plan, so
       there is no ladder to choose from, unlike the diet or calm funnels. */
    writeAnswer(CART_ID, "plan", PLAN.id);
    /* So the purchase-attempt notification can say which funnel sent them. */
    writeAnswer(CART_ID, "lander", "quiz");
    trackMetaEvent(
      "InitiateCheckout",
      {
        currency: "USD",
        value: PLAN.compareAt,
        content_ids: [PLAN.id],
        content_type: "product",
        content_name: PRODUCT.name,
      },
      /* The quiz captured an email several steps back. Passing it here is what lets
         Meta match this event to a person rather than a cookie. */
      { email: readAnswers(brainQuiz.id).email },
    );
    router.push("/quiz/brain/results/checkout");
  };

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
        {PRODUCT.name} helped {s.name} feel sharper again in {WEEKS} weeks.
      </h1>

      <Image
        src="/product/brain-memory/experts/expert-1.webp"
        alt={`${s.name} holding a bottle of ${PRODUCT.name}`}
        width={800}
        height={800}
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
        Over {WEEKS} weeks of four capsules a day, {s.they} noticed significant changes:
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
        <Button size="lg" fullWidth iconRight="arrow-right" onClick={continueToCheckout}>
          Continue
        </Button>
      </StickyCta>
    </ResultsShell>
  );
}
