import type { Metadata } from "next";
import { ItchComfort } from "@/components/itch-quiz/ItchComfort";
import { itchV2Quiz } from "@/lib/quiz/itchV2";

export const metadata: Metadata = { title: "How histamine affects your dog | SUNNYCELLS" };

export default function ComfortPage() {
  return <ItchComfort quizId={itchV2Quiz.id} nextHref="/quiz/itch/v2/results/benefits" />;
}
