"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/core/Icon";
import { ResultsShell, ResultsHeading } from "./ResultsShell";

const LINES = [
  "Evaluating your answers…",
  "Analyzing your results…",
  "Comparing with others…",
  "Building your summary…",
];

const STEP_MS = 900;
const HOLD_MS = 500;
/* The bar fills across the whole run in one linear sweep, so it never jumps a
   quarter at a time. The ticks land on top of it, they do not drive it. */
const TOTAL_MS = LINES.length * STEP_MS + HOLD_MS;

/** `nextHref` is where the run hands off. Defaults to the diet funnel's summary, so
    the existing route file stays a one-liner. */
export function Analyzing({ nextHref = "/quiz/diet/results/summary" }: { nextHref?: string } = {}) {
  const router = useRouter();
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= LINES.length) {
      const t = setTimeout(() => router.replace(nextHref), HOLD_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone((d) => d + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [done, router, nextHref]);

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
            animation: `sc-reveal-x ${TOTAL_MS}ms linear forwards`,
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
    </ResultsShell>
  );
}
