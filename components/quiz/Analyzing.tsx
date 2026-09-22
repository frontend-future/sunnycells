"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/core/Icon";
import { ResultsShell, ResultsHeading } from "./ResultsShell";
import { ReviewsCarousel, type Review } from "./ReviewsCarousel";

const LINES = [
  "Evaluating your answers…",
  "Analyzing your results…",
  "Comparing with others…",
  "Building your summary…",
];

const STEP_MS = 900;
/* Reviews need time to actually read, so a run that's showing them takes each
   step at triple length instead of racing through at the plain run's pace. */
const STEP_MS_WITH_REVIEWS = 2700;
const HOLD_MS = 500;

/** `nextHref` is where the run hands off. Defaults to the diet funnel's summary, so
    the existing route file stays a one-liner. `reviews`, when passed, slows the run
    down to a readable pace and shows a swipeable review carousel underneath it. */
export function Analyzing({
  nextHref = "/quiz/diet/results/summary",
  reviews,
}: { nextHref?: string; reviews?: readonly Review[] } = {}) {
  const router = useRouter();
  const [done, setDone] = useState(0);
  const stepMs = reviews ? STEP_MS_WITH_REVIEWS : STEP_MS;
  const totalMs = LINES.length * stepMs + HOLD_MS;

  useEffect(() => {
    if (done >= LINES.length) {
      const t = setTimeout(() => router.replace(nextHref), HOLD_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone((d) => d + 1), stepMs);
    return () => clearTimeout(t);
  }, [done, router, nextHref, stepMs]);

  return (
    <ResultsShell>
      <ResultsHeading>{LINES[0]}</ResultsHeading>

      <div
        role="progressbar"
        aria-valuetext="Working"
        aria-label="Reading your answers"
        style={{
          height: 16,
          background: "var(--ink-10)",
          borderRadius: "var(--radius-pill)",
          overflow: "hidden",
          marginBottom: "var(--space-8)",
        }}
      >
        {/* Sun inside an ink outline, the same treatment the assessment bars use, so
            the fill has an edge against a track this light. Revealed with clip-path
            rather than an animated width, which keeps the pill ends from distorting. */}
        <div
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            background: "var(--sun)",
            border: "2px solid var(--ink)",
            borderRadius: "var(--radius-pill)",
            animation: `sc-reveal-x ${totalMs}ms linear forwards`,
          }}
        />
      </div>

      <ul
        aria-live="polite"
        style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}
      >
        {LINES.map((l, i) => {
          const complete = i < done;
          return (
            <li
              key={l}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-4)",
                fontSize: "var(--size-body)",
                fontWeight: complete ? 700 : 500,
                color: "var(--ink)",
                /* Pending rows fade rather than switching to a lighter ink, so no
                   line ever sits at a value the system bars for text. */
                opacity: complete ? 1 : 0.35,
                transition: "opacity var(--duration-base) var(--ease-standard)",
              }}
            >
              <span aria-hidden="true" style={{ flex: "none", display: "flex" }}>
                <Icon name="check" size={26} strokeWidth={3} />
              </span>
              {l}
            </li>
          );
        })}
      </ul>

      {reviews ? <ReviewsCarousel reviews={reviews} /> : null}
    </ResultsShell>
  );
}
