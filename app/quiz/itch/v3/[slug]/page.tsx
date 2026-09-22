import { notFound } from "next/navigation";
import { StepScreen } from "@/components/quiz/StepScreen";
import { itchV3Quiz } from "@/lib/quiz/itchV3";
import { stepIndex } from "@/lib/quiz/types";

const config = itchV3Quiz;

export function generateStaticParams() {
  return config.steps.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export default async function QuizStepPage({ params }: PageProps<"/quiz/itch/v3/[slug]">) {
  const { slug } = await params;
  const index = stepIndex(config, slug);
  if (index < 0) notFound();
  return <StepScreen config={config} index={index} />;
}
