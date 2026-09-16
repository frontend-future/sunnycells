"use client";

import { Icon } from "@/components/core/Icon";
import { brainV3Quiz } from "@/lib/quiz/brainV3";
import { concernsAddressed } from "@/lib/quiz/brainV3Assessment";
import { useAnswers } from "@/lib/quiz/store";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";

/** The one screen in this funnel that reads back her own answers rather than
    showing the same reveal to everyone: concernsAddressed() only returns rows
    for symptoms she actually picked. */
export function BrainV3Concerns() {
  const { answers, ready } = useAnswers(brainV3Quiz.id);
  const rows = ready ? concernsAddressed(answers) : [];

  return (
    <ResultsShell>
      <h1
        style={{
          margin: "0 0 var(--space-8)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--size-h4), 6.4vw, var(--size-h2))",
          fontWeight: 800,
          letterSpacing: "var(--tracking-heading)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        Based on your answers, here&apos;s how Brain &amp; Memory Power Boost helps
      </h1>

      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {rows.map((r) => (
          <li
            key={r.concern}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
              padding: "var(--space-5)",
              background: "var(--surface-sunk)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-xl)",
            }}
          >
            <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
              <Icon name="x" size={18} style={{ color: "var(--status-error)", flex: "none", marginTop: 2 }} />
              <span style={{ fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink-60)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)" }}>
                Your concern
              </span>
            </div>
            <p style={{ margin: "0 0 0 30px", fontSize: "var(--size-body)", fontWeight: 700 }}>{r.concern}</p>

            <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start", marginTop: "var(--space-2)" }}>
              <Icon name="check" size={18} style={{ color: "var(--status-success)", flex: "none", marginTop: 2 }} />
              <span style={{ fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink-60)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)" }}>
                Our answer
              </span>
            </div>
            <p style={{ margin: "0 0 0 30px", fontSize: "var(--size-body)" }}>{r.answer}</p>
          </li>
        ))}
      </ul>

      <StickyCta>
        <NextButton href="/quiz/brain/v3/results/benefits">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
