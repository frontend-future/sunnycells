import { FridayZoomiesPlansV2 } from "@/components/itch-quiz/FridayZoomiesPlansV2";
import { PlansParamHydrator } from "@/components/quiz/PlansParamHydrator";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";

export default function FridayZoomiesPlansV2Page() {
  return (
    <>
      <PlansParamHydrator quizId={itchFridayZoomiesQuiz.id} />
      <FridayZoomiesPlansV2 />
    </>
  );
}
