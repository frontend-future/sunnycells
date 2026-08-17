"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/core/Icon";
import { ResultsShell, ResultsHeading } from "./ResultsShell";

const LINES = [
  "Reading your stress and sleep answers",
  "Placing your symptoms against the reference set",
  "Working out your weight timeline",
  "Building your summary",
];

const STEP_MS = 900;

export function Analyzing() {
  const router = useRouter();
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= LINES.length) {
      const t = setTimeout(() => router.replace("/quiz/diet/results/summary"), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone((d) => d + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [done, router]);

  const pct = Math.round((done / LINES.length) * 100);

  return (
    <ResultsShell>
      <ResultsHeading eyebrow="One moment">Reading your answers</ResultsHeading>

      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress"
        style={{ height: 4, background: "var(--ink-10)", marginBottom: "var(--space-8)" }}
      >
        <div
          style={{
            height: "100%",
            width: pct + "%",
            background: "var(--ink)",
            transition: "width var(--duration-slow) var(--ease-standard)",
          }}
        />
      </div>

      <ul aria-live="polite" style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
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
                color: complete ? "var(--ink)" : "var(--ink-60)",
                transition: "color var(--duration-base) var(--ease-standard)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 28,
                  height: 28,
                  flex: "none",
                  borderRadius: "var(--radius-xs)",
                  border: "2px solid " + (complete ? "var(--ink)" : "var(--border-input)"),
                  background: complete ? "var(--ink)" : "var(--white)",
                  color: "var(--white)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {complete ? <Icon name="check" size={18} strokeWidth={3} /> : null}
              </span>
              {l}
            </li>
          );
        })}
      </ul>
    </ResultsShell>
  );
}
