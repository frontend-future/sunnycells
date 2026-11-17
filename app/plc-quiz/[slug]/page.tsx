import { notFound } from "next/navigation";
import { StepScreen } from "@/components/quiz/StepScreen";
import { plcQuiz } from "@/lib/quiz/plc";
import { stepIndex } from "@/lib/quiz/types";

export function generateStaticParams() {
  return plcQuiz.steps.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export default async function PlcQuizStepPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = stepIndex(plcQuiz, slug);
  if (index < 0) notFound();
  return <StepScreen config={plcQuiz} index={index} />;
}
