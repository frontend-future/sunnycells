import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchEducation } from "@/components/itch-quiz/ItchEducation";

export default function Page() {
  return (
    <ItchEducation quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/v2/results/what-to-expect" video="easy-daily" title="The easiest part of their day">
      Pump it over their regular food. Even picky eaters love the taste of real salmon.
    </ItchEducation>
  );
}
