import type { Metadata } from "next";
import { Analyzing } from "@/components/quiz/Analyzing";

export const metadata: Metadata = { title: "Reading your answers | SUNNYCELLS" };

export default function AnalyzingPage() {
  return <Analyzing nextHref="/quiz/energy/results/summary" />;
}
