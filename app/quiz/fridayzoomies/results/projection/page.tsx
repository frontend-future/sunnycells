import type { Metadata } from "next";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchProjection } from "@/components/itch-quiz/ItchProjection";

export const metadata: Metadata = { title: "Your dog's itch timeline" };

export default function ProjectionPage() {
  return <ItchProjection quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/fridayzoomies/results/comfort" />;
}
