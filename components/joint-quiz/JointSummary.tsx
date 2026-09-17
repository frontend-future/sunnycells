"use client";

import { AssessmentChart } from "@/components/quiz/Charts";
import { NextButton } from "@/components/quiz/NextButton";
import { ResultsShell } from "@/components/quiz/ResultsShell";
import { StickyCta } from "@/components/quiz/StickyCta";
import { jointQuiz } from "@/lib/quiz/joint";
import { dogName, jointRows, jointVerdict } from "@/lib/quiz/jointAssessment";
import { useAnswers } from "@/lib/quiz/store";

export function JointSummary() {
  const { answers, ready } = useAnswers(jointQuiz.id);
  const rows = jointRows(answers);
  const name = dogName(answers);

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
        Based on your answers, {name}&apos;s joint wear seems to be{" "}
        <span
          style={{
            background: "var(--sun)",
            color: "var(--ink)",
            padding: "0 0.12em",
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}
        >
          {ready ? jointVerdict(rows) : " "}
        </span>{" "}
        because of the following parameters:
      </h1>

      <AssessmentChart rows={rows} />

      <div style={{ marginTop: "var(--space-10)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          It&apos;s not your fault. Most dogs deal with at least one of these joint-related
          issues as they age. By combining the right nutrition with proper
          supplementation, it&apos;s absolutely possible to get {name} moving comfortably
          again.
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
          Based on your answers, {name} seems like a perfect candidate who{" "}
          <strong style={{ fontWeight: 800 }}>
            could benefit from SC-02 Hip & Joint Chews to rebuild cartilage and support
            healthy joints.
          </strong>
        </p>
        <p style={{ margin: 0, fontSize: "var(--size-body)", fontWeight: 800, lineHeight: "var(--leading-body)" }}>
          Similar dogs to {name} showed their first signs of relief within the first 2 to
          4 weeks of using SC-02 Hip & Joint Chews.
        </p>
      </div>

      <StickyCta>
        <NextButton href="/quiz/joint/results/projection">Continue</NextButton>
      </StickyCta>
    </ResultsShell>
  );
}
