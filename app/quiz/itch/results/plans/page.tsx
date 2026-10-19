import { FridayZoomiesPlans } from "@/components/itch-quiz/FridayZoomiesPlans";
import { PlansParamHydrator } from "@/components/quiz/PlansParamHydrator";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";

export default function FridayZoomiesPlansPage() {
  return (
    <>
      <PlansParamHydrator quizId={itchFridayZoomiesQuiz.id} />
      <FridayZoomiesPlans />
    </>
  );
}
