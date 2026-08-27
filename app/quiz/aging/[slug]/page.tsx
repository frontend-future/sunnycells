import { notFound } from "next/navigation";
import { StepScreen } from "@/components/quiz/StepScreen";
import { agingQuiz } from "@/lib/quiz/aging";
import { stepIndex } from "@/lib/quiz/types";

/* The only per-quiz route file the engine needs, the diet one with a different config
   import. */
const config = agingQuiz;

export function generateStaticParams() {
  return config.steps.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export default async function QuizStepPage({ params }: PageProps<"/quiz/aging/[slug]">) {
  const { slug } = await params;
  const index = stepIndex(config, slug);
  if (index < 0) notFound();
  return <StepScreen config={config} index={index} />;
}
