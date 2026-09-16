import type { Metadata } from "next";
import { Analyzing } from "@/components/quiz/Analyzing";

export const metadata: Metadata = { title: "Analyzing your answers | SUNNYCELLS" };

export default function AnalyzingPage() {
  return <Analyzing nextHref="/quiz/brain/v2/results/summary" />;
}
