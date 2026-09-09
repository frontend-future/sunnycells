import { notFound } from "next/navigation";
import { StepScreen } from "@/components/quiz/StepScreen";
import { calmQuiz } from "@/lib/quiz/calm";
import { stepIndex } from "@/lib/quiz/types";

/* The only per-quiz route file the engine needs. A second funnel is a copy of this
   file with a different config import, under its own folder. */
const config = calmQuiz;

export function generateStaticParams() {
  return config.steps.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export default async function QuizStepPage({ params }: PageProps<"/quiz/calm/[slug]">) {
  const { slug } = await params;
  const index = stepIndex(config, slug);
  if (index < 0) notFound();
  return <StepScreen config={config} index={index} />;
}
