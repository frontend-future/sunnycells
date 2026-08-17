"use client";

import { useRouter } from "next/navigation";
import { Button, type ButtonVariant } from "@/components/core/Button";
import type { IconName } from "@/components/core/Icon";
import { writeAnswer } from "@/lib/quiz/store";
import type { QuizConfig } from "@/lib/quiz/types";

export type StartOption = { label: string; variant?: ButtonVariant; icon?: IconName };

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
        <Button
          key={o.label}
          size="lg"
          variant={o.variant}
          iconLeft={o.icon}
          onClick={() => pick(o.label)}
          /* The lg size pads 36px a side, which overflows a 2-up grid on a 390px
             screen. Height still carries the tap target, so the padding can go. */
          style={{ padding: "0 var(--space-4)", minWidth: 0 }}
        >
          {o.label}
        </Button>
      ))}
    </div>
  );
}
