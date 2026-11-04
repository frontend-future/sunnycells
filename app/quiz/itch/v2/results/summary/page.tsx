import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchSummary } from "@/components/itch-quiz/ItchSummary";


export default function SummaryPage() {
  return <ItchSummary quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/v2/results/projection" lede="because of the following:" />;
}
