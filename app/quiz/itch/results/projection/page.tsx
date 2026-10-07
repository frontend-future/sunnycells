import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchProjection } from "@/components/itch-quiz/ItchProjection";


export default function ProjectionPage() {
  return <ItchProjection quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/results/comfort" greatlyReduced />;
}
