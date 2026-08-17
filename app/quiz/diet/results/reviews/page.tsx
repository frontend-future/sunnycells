import type { Metadata } from "next";
import { Card } from "@/components/core/Card";
import { StarRating } from "@/components/commerce/StarRating";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell, ResultsHeading } from "@/components/quiz/ResultsShell";

export const metadata: Metadata = { title: "Reviews | SUNNYCELLS" };

/* Fictional reviewers written for this funnel. Nothing here is lifted from a real
   customer or a competitor's page, and none of it should ship as a real review. */
const REVIEWS = [
  {
    name: "Dana R.",
    detail: "Age 47 · Four months in",
    rating: 5,
    body: "The change I noticed first was not the scale, it was sleeping through to five in the morning instead of waking at three. The rest followed from there.",
  },
  {
    name: "Priya M.",
    detail: "Age 52 · Six months in",
    rating: 5,
    body: "I have taken enough powders to be sceptical. This one lists the milligrams, which is the only reason I tried it. Eleven pounds down and my afternoons are no longer a write-off.",
  },
  {
    name: "Jo T.",
    detail: "Age 39 · Two months in",
    rating: 4,
    body: "Mixes clean, tastes like a mild orange squash. Two months is early for the weight, but the three o'clock crash is gone and I am not white-knuckling my evenings.",
  },
  {
    name: "Marisol A.",
    detail: "Age 58 · Nine months in",
    rating: 5,
    body: "Cancelling took two clicks, which I tested in month one on purpose. I resubscribed the week after. That says more than the copy does.",
  },
];

export default function ReviewsPage() {
  return (
    <ResultsShell>
      <ResultsHeading eyebrow="What people say">4.7 from 12,480 reviews</ResultsHeading>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {REVIEWS.map((r) => (
          <Card key={r.name}>
            <StarRating value={r.rating} size={18} />
            <p style={{ margin: "var(--space-4) 0", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
              {r.body}
            </p>
            <div style={{ fontSize: "var(--size-meta)", fontWeight: 700 }}>{r.name}</div>
            <div
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "var(--size-meta)",
                fontWeight: 600,
                letterSpacing: "var(--tracking-mono)",
                color: "var(--ink-60)",
              }}
            >
              {r.detail}
            </div>
          </Card>
        ))}
      </div>

      <p style={{ marginTop: "var(--space-6)", fontSize: "var(--size-meta)", color: "var(--ink-60)", lineHeight: 1.55 }}>
        Placeholder reviews written for this build. Replace them with verified customer
        reviews before launch: publishing invented testimonials as real ones is illegal
        in most markets.
      </p>

      <div style={{ marginTop: "var(--space-10)" }}>
        <NextButton href="/quiz/diet/results/plans">See my plan</NextButton>
      </div>
    </ResultsShell>
  );
}
