"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/core/Button";
import type { QuizConfig } from "@/lib/quiz/types";

/** Starts a quiz from its landing page: straight to step one. */
export function StartButton({ config, children }: { config: QuizConfig; children: string }) {
  const router = useRouter();
  return (
    <Button size="lg" variant="accent" iconRight="arrow-right" onClick={() => router.push(`${config.basePath}/${config.steps[0].slug}`)}>
      {children}
    </Button>
  );
}
