import { FridayZoomiesPlansV3 } from "@/components/itch-quiz/FridayZoomiesPlansV3";
import { PlansParamHydrator } from "@/components/quiz/PlansParamHydrator";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";

/* Isolated for now: nothing in the funnel links here. */
export default function FridayZoomiesPlansV3Page() {
  return (
    <>
      <PlansParamHydrator quizId={itchFridayZoomiesQuiz.id} />
      <FridayZoomiesPlansV3 />
    </>
  );
}
