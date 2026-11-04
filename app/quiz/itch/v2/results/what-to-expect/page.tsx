import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchEducation } from "@/components/itch-quiz/ItchEducation";

export default function Page() {
  return (
    <ItchEducation quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/v2/results/more-than-relief" video="what-to-expect" title="What to expect">
      Month 1: it starts to build. Month 2: less scratching and a shinier coat for many dogs. Month 3: skin and coat at their best, then daily use keeps the itch from coming back.
    </ItchEducation>
  );
}
