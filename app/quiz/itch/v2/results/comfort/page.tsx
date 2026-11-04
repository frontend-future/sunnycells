import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchComfort } from "@/components/itch-quiz/ItchComfort";


export default function ComfortPage() {
  return <ItchComfort quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/v2/results/benefits" bothSides />;
}
