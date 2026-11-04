"use client";

import type { ReactNode } from "react";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";
import { dogName, triedItems } from "@/lib/quiz/itchAssessment";
import { useAnswers } from "@/lib/quiz/store";

/** One education slide of the salmon oil funnel: a title, a looping cartoon, a sentence or two. */
export function ItchEducation({
  quizId,
  nextHref,
  video,
  title,
  cta,
  children,
}: {
  quizId: string;
  nextHref: string;
  /** File name under /quiz/fridayzoomies/edu, without the extension. */
  video: string;
  title: string;
  /** Button text, given the dog's name. Defaults to Continue. */
  cta?: (name: string) => string;
  /** The copy. A function gets the dog's name and what she already tried. */
  children: ReactNode | ((c: { name: string; tried: string[] }) => ReactNode);
}) {
  const { answers } = useAnswers(quizId);
  const name = dogName(answers);
  const tried = triedItems(answers);

  return (
    <ResultsShell>
      <h1
        style={{
          margin: "0 0 var(--space-6)",
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--size-h4), 6.6vw, var(--size-h2))",
          fontWeight: 900,
          letterSpacing: "var(--tracking-heading)",
          lineHeight: "var(--leading-snug)",
        }}
      >
        {title}
      </h1>

      <video
        src={`/quiz/fridayzoomies/edu/${video}.mp4`}
        poster={`/quiz/fridayzoomies/edu/${video}.webp`}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        style={{
          width: "100%",
          maxWidth: 420,
          aspectRatio: "1 / 1",
          display: "block",
          margin: "0 auto",
          background: "var(--shell)",
          borderRadius: "var(--radius-card)",
        }}
      />

      <div style={{ margin: "var(--space-6) 0 0", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
        {typeof children === "function" ? children({ name, tried }) : children}
      </div>

      <StickyCta>
        <NextButton href={nextHref}>{cta ? cta(name) : "Continue"}</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
