import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchStory } from "@/components/itch-quiz/ItchStory";


export default function StoryPage() {
  return <ItchStory quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/results/plans" />;
}
