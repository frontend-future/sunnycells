"use client";

import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { RATING } from "@/lib/products/brain-memory";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/* Real customer reviews, condensed to their most potent line. Own set of photos
   (review-mary-a, review-sheila, review-patricia, review-dwight) rather than the
   ones the v2 plans page reuses, so the same face never appears under two
   different names anywhere on the site. */
const REVIEWS = [
  { name: "Mary A.", photo: "/quiz/brain/review-mary-a.webp", quote: "It helps me think clearly and improves my memory. I still practice pediatrics, and the product is excellent." },
  { name: "Sheila R.", photo: "/quiz/brain/review-sheila.webp", quote: "I really can tell a difference at work. I feel sharp and on top of my game." },
  { name: "Dwight P.", photo: "/quiz/brain/review-dwight.webp", quote: "My brain function does seem to be significantly sharper with this supplement." },
  { name: "Patricia L.", photo: "/quiz/brain/review-patricia.webp", quote: "I have ADD and need something to keep me focused. Thankfully, I found this to help with handling it." },
] as const;

export function BrainV3Story() {
  return (
    <ResultsShell>
      <h1
        style={{
          margin: "0 0 var(--space-4)",
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--size-h4), 6.4vw, var(--size-h2))",
          fontWeight: 900,
          letterSpacing: "var(--tracking-heading)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        Real results from real customers
      </h1>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-8)" }}>
        <span aria-hidden="true" style={{ display: "flex", gap: 2 }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Icon key={i} name="star" size={16} fill="var(--sun)" strokeWidth={0} />
          ))}
        </span>
        <span style={{ fontSize: "var(--size-body)", fontWeight: 700 }}>{RATING.score}/5</span>
        <span style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>{RATING.count.toLocaleString("en-US")} reviews</span>
      </div>

      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {REVIEWS.map((r) => (
          <li
            key={r.name}
            style={{
              display: "flex",
              gap: "var(--space-4)",
              alignItems: "center",
              padding: "var(--space-4)",
              background: "var(--surface-sunk)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-xl)",
            }}
          >
            <Image
              src={r.photo}
              alt={r.name}
              width={200}
              height={200}
              style={{ flex: "none", width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "var(--size-meta)", fontWeight: 700 }}>{r.name}</div>
              <p style={{ margin: "2px 0 0", fontSize: "var(--size-body)", fontStyle: "italic" }}>&ldquo;{r.quote}&rdquo;</p>
            </div>
          </li>
        ))}
      </ul>

      <StickyCta>
        <NextButton href="/quiz/brain/v3/results/plans">See my plan</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
