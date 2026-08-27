import type { Metadata } from "next";
import { Analyzing } from "@/components/quiz/Analyzing";

export const metadata: Metadata = { title: "Calculating your match | SUNNYCELLS" };

export default function AnalyzingPage() {
  return <Analyzing nextHref="/quiz/aging/results/summary" />;
}
