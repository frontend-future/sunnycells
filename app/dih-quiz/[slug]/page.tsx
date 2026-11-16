import { notFound } from "next/navigation";
import { StepScreen } from "@/components/quiz/StepScreen";
import { dihQuiz } from "@/lib/quiz/dih";
import { stepIndex } from "@/lib/quiz/types";

export function generateStaticParams() {
  return dihQuiz.steps.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export default async function DihQuizStepPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = stepIndex(dihQuiz, slug);
  if (index < 0) notFound();
  return <StepScreen config={dihQuiz} index={index} />;
}
