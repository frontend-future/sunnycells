import type { Metadata } from "next";
import { Accordion } from "@/components/navigation/Accordion";
import { StickyCta } from "@/components/quiz/StickyCta";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell, ResultsHeading } from "@/components/quiz/ResultsShell";

export const metadata: Metadata = { title: "What is in the blend | SUNNYCELLS" };

const INGREDIENTS = [
  {
    name: "KSM-66 Ashwagandha root extract",
    dose: "600 mg",
    body: "The extract used in most of the cortisol trials. In an eight-week study of 64 adults under chronic stress, the group taking 600 mg a day showed lower serum cortisol than the placebo group.",
  },
  {
    name: "Rhodiola rosea root extract",
    dose: "200 mg",
    body: "Studied for fatigue rather than sedation. It is the ingredient here aimed at the flat, wrung-out feeling rather than at sleep.",
  },
  {
    name: "L-Theanine",
    dose: "200 mg",
    body: "The amino acid in green tea that takes the edge off without making you drowsy. It is why there is no caffeine in this blend: pairing the two is a coffee strategy, not a cortisol one.",
  },
  {
    name: "Inositol",
    dose: "2 g",
    body: "Most studied in women with PCOS, where it acts on insulin signalling. It sits alongside the cortisol ingredients because appetite and blood sugar move together.",
  },
  {
    name: "Phosphatidylserine",
    dose: "100 mg",
    body: "From sunflower rather than soy. Trialled for the cortisol response to exercise and mental strain.",
  },
  {
    name: "Magnesium glycinate",
    dose: "100 mg",
    body: "The form that is gentle on the stomach. Magnesium is involved in the stress axis and most people eating a western diet run short of it.",
  },
];

export default function SciencePage() {
  return (
    <ResultsShell>
      <ResultsHeading eyebrow="What is in the blend">
        Six ingredients, doses on the front of the pack
      </ResultsHeading>

      <p style={{ marginTop: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--ink-80)" }}>
        A proprietary blend lets a brand list an impressive ingredient and put a
        rounding error of it in the tub. SC-21 Metabolic Morning Blend prints the
        milligrams next to each name, so you can check them against the studies.
      </p>

      <div style={{ marginTop: "var(--space-8)" }}>
        <Accordion
          defaultOpen={0}
          items={INGREDIENTS.map((i) => ({
            title: `${i.name} · ${i.dose}`,
            body: i.body,
          }))}
        />
      </div>

      <div
        style={{
          marginTop: "var(--space-8)",
          padding: "var(--space-5)",
          background: "var(--surface-sunk)",
          border: "1px solid var(--border-hairline)",
          borderRadius: "var(--radius-card)",
        }}
      >
        <p style={{ margin: 0, fontSize: "var(--size-meta)", lineHeight: 1.55, color: "var(--ink-80)" }}>
          Doses and study summaries here are placeholders written to the brand voice and
          have not been checked against source papers or a regulatory reviewer. Every
          claim needs a citation and a legal pass before this page goes live.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/diet/results/reviews">Read what people say</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
