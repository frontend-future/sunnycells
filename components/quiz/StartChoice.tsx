"use client";

import { useRouter } from "next/navigation";
import { Button, type ButtonVariant } from "@/components/core/Button";
import { writeAnswer } from "@/lib/quiz/store";
import type { QuizConfig } from "@/lib/quiz/types";

export type StartOption = { label: string; variant?: ButtonVariant };

/** The first question, answered on the landing page so the first tap starts the quiz
    instead of loading another screen. Any quiz can use it: pass its own options. */
export function StartChoice({
  config, field, options,
}: {
  config: QuizConfig;
  field: string;
  options: StartOption[];
}) {
  const router = useRouter();
  const pick = (value: string) => {
    writeAnswer(config.id, field, value);
    router.push(`${config.basePath}/${config.steps[0].slug}`);
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        gap: "var(--space-4)",
        maxWidth: 460,
        margin: "var(--space-6) auto 0",
      }}
    >
      {options.map((o) => (
        <Button key={o.label} size="lg" variant={o.variant} onClick={() => pick(o.label)}>
          {o.label}
        </Button>
      ))}
    </div>
  );
}
