import type { Metadata } from "next";
import { ItchComfort } from "@/components/itch-quiz/ItchComfort";
import { itchV3Quiz } from "@/lib/quiz/itchV3";

export const metadata: Metadata = { title: "How histamine affects your dog | SUNNYCELLS" };

export default function ComfortPage() {
  return <ItchComfort quizId={itchV3Quiz.id} nextHref="/quiz/itch/v3/results/benefits" />;
}
