import type { ReactNode } from "react";
import { Wordmark } from "@/components/core/Wordmark";

/** Chrome for the post-quiz screens: same rail as the questions, no progress bar,
    because the counting is over. */
export function ResultsShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--surface-page)" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "var(--space-4) var(--page-gutter-mobile)",
          borderBottom: "1px solid var(--border-hairline)",
        }}
      >
        <Wordmark size={22} />
      </header>
      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
          padding: "var(--space-10) var(--page-gutter-mobile) var(--space-16)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export function ResultsHeading({ children, eyebrow }: { children: ReactNode; eyebrow?: string }) {
  return (
    <>
      {eyebrow ? (
        <div
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "var(--size-meta)",
            fontWeight: 600,
            letterSpacing: "var(--tracking-mono)",
            color: "var(--ink-60)",
            marginBottom: "var(--space-3)",
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <h1
        style={{
          margin: "0 0 var(--space-6)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--size-h3), 5vw, var(--size-h2))",
          fontWeight: 800,
          letterSpacing: "var(--tracking-heading)",
          lineHeight: "var(--leading-heading)",
        }}
      >
        {children}
      </h1>
    </>
  );
}
