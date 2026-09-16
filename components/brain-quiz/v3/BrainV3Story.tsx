"use client";

import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { RATING } from "@/lib/products/brain-memory";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/* Real reviews from lib/products/brain-memory.ts, with the same photos the v2
   plans page's reviews grid uses, so the same face never appears under two
   different names anywhere on the site. */
const REVIEWS = [
  { name: "Richard A.", photo: "/quiz/brain/review-richard.webp", quote: "This really helped me get back to myself." },
  { name: "Mary W.", photo: "/quiz/brain/review-mary.webp", quote: "The ingredients matched what I researched." },
  { name: "Floyd B.", photo: "/quiz/brain/review-floyd.webp", quote: "More energy and clarity." },
  { name: "Dayle N.", photo: "/quiz/brain/review-dayle.webp", quote: "Years of consistent use." },
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
