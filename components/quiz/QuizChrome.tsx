"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/core/Icon";
import { Wordmark } from "@/components/core/Wordmark";

/** Header and progress rail shared by every question screen. The progress rail is
    black on a hairline track: structure comes from ink, not from a colour bar. */
export function QuizChrome({
  step, total, backHref, children,
}: {
  step: number;
  total: number;
  backHref: string;
  children: ReactNode;
}) {
  const pct = Math.round((step / total) * 100);
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--surface-sunk)" }}>
      <header style={{ background: "var(--white)", borderBottom: "1px solid var(--border-hairline)" }}>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "var(--space-2) var(--page-gutter-mobile)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-4)",
          }}
        >
          <Link
            href={backHref}
            aria-label="Back a step"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "var(--tap-min)",
              height: "var(--tap-min)",
              color: "var(--ink)",
              borderRadius: "var(--radius-button)",
            }}
          >
            <Icon name="arrow-left" size={26} />
          </Link>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Wordmark size={20} />
          </div>
          <div
            style={{
              width: "var(--tap-min)",
              textAlign: "right",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "var(--size-body)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {step}
            <span style={{ color: "var(--ink-60)" }}>/{total}</span>
          </div>
        </div>
        <div
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Step ${step} of ${total}`}
          style={{ height: 4, background: "var(--ink-10)" }}
        >
          <div
            style={{
              height: "100%",
              width: pct + "%",
              background: "var(--ink)",
              transition: "width var(--duration-base) var(--ease-standard)",
            }}
          />
        </div>
      </header>

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
          padding: "var(--space-6) var(--page-gutter-mobile) var(--space-6)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </main>
    </div>
  );
}

/** Questions run long, so they are set sentence case in the display face rather than
    the all-caps reserved for hero headlines. Four lines of caps is unreadable. */
export function QuizQuestion({ children }: { children: ReactNode }) {
  return (
    <h1
      style={{
        margin: "0 0 var(--space-6)",
        fontFamily: "var(--font-display)",
        fontSize: "clamp(var(--size-h4), 5.5vw, var(--size-h2))",
        fontWeight: 800,
        letterSpacing: "var(--tracking-heading)",
        lineHeight: "var(--leading-heading)",
      }}
    >
      {children}
    </h1>
  );
}
