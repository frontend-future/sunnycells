"use client";

import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { energyQuiz } from "@/lib/quiz/energy";
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
 * three points with a real customer who has given written permission, and keep the
 * substantiation for the coffee figure on file. Same standing instruction as the diet
 * funnel's story screen.
 */
const STORIES = {
  female: {
    name: "Rachel",
    they: "she",
    her: "her",
    points: [
      { lead: "Rachel went from four coffees a day to one", rest: ", and the one she kept is the morning one she actually enjoys rather than the one she needed." },
      { lead: "The three o'clock wall stopped arriving", rest: ". She describes it now as a dip instead of a drop, and says she stopped planning her afternoons around it." },
      { lead: "Sleep came back before the energy did", rest: ". Rachel was blaming her age for both and never connected either one to what she was drinking at seven in the morning." },
    ],
  },
  male: {
    name: "Michael",
    they: "he",
    her: "his",
    points: [
      { lead: "Michael went from four coffees a day to one", rest: ", and the one he kept is the morning one he actually enjoys rather than the one he needed." },
      { lead: "The three o'clock wall stopped arriving", rest: ". He describes it now as a dip instead of a drop, and says he stopped planning his afternoons around it." },
      { lead: "Sleep came back before the energy did", rest: ". Michael was blaming his age for both and never connected either one to what he was drinking at seven in the morning." },
    ],
  },
} as const;

const WEEKS = 4;
const QUOTE = "I stopped at one coffee instead of four and did not really notice until my husband pointed it out";

export function EnergyStory() {
  const { answers } = useAnswers(energyQuiz.id);
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
        Even Energy took {s.name} from four coffees a day to one in {WEEKS} weeks.
      </h1>

      <Image
        src="/photos/even-fuel.webp"
        alt={`${s.name} in a kitchen holding a pouch of Even Energy`}
        width={1344}
        height={768}
        style={{
          width: "100%",
          maxWidth: "100%",
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
        Over {WEEKS} weeks of one stick a morning, {s.they} noticed significant changes:
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
        <NextButton href="/quiz/energy/results/plans">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
