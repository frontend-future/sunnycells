import { notFound } from "next/navigation";
import { StepScreen } from "@/components/quiz/StepScreen";
import { brainV3Quiz } from "@/lib/quiz/brainV3";
import { stepIndex } from "@/lib/quiz/types";

const config = brainV3Quiz;

export function generateStaticParams() {
  return config.steps.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export default async function QuizStepPage({ params }: PageProps<"/quiz/brain/v3/[slug]">) {
  const { slug } = await params;
  const index = stepIndex(config, slug);
  if (index < 0) notFound();
  return <StepScreen config={config} index={index} />;
}
