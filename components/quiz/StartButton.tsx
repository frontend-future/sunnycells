"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/core/Button";
import type { QuizConfig } from "@/lib/quiz/types";

/** Starts a quiz from its landing page: straight to step one. Full width, with a heavier,
    larger label and more room around it than the stock large button, since it is the one thing
    on the page to press. */
export function StartButton({ config, children }: { config: QuizConfig; children: string }) {
  const router = useRouter();
  return (
    <Button
      size="lg"
      variant="accent"
      fullWidth
      iconRight="arrow-right"
      onClick={() => router.push(`${config.basePath}/${config.steps[0].slug}`)}
      style={{ fontSize: "clamp(22px, 6vw, 28px)", fontWeight: 900, minHeight: 80, padding: "var(--space-5) var(--space-8)", boxShadow: "0 8px 18px rgba(20, 33, 61, 0.22)" }}
    >
      {children}
    </Button>
  );
}
