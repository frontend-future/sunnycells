import type { Metadata } from "next";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchComfort } from "@/components/itch-quiz/ItchComfort";

export const metadata: Metadata = { title: "How histamine affects your dog" };

export default function ComfortPage() {
  return <ItchComfort quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/fridayzoomies/results/benefits" />;
}
