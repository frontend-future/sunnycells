import { FridayZoomiesPlansV4 } from "@/components/itch-quiz/FridayZoomiesPlansV4";
import { PlansParamHydrator } from "@/components/quiz/PlansParamHydrator";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";

export default function FridayZoomiesPlansV4Page() {
  return (
    <>
      <PlansParamHydrator quizId={itchFridayZoomiesQuiz.id} />
      <FridayZoomiesPlansV4 />
    </>
  );
}
