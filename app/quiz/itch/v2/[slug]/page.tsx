import { notFound } from "next/navigation";
import { StepScreen } from "@/components/quiz/StepScreen";
import { itchFridayZoomiesV2Quiz } from "@/lib/quiz/itchFridayZoomiesV2";
import { stepIndex } from "@/lib/quiz/types";

const config = itchFridayZoomiesV2Quiz;

export function generateStaticParams() {
  return config.steps.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export default async function QuizStepV2Page({ params }: PageProps<"/quiz/itch/v2/[slug]">) {
  const { slug } = await params;
  const index = stepIndex(config, slug);
  if (index < 0) notFound();
  return <StepScreen config={config} index={index} />;
}
