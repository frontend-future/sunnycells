import type { Metadata } from "next";
import { Analyzing } from "@/components/quiz/Analyzing";

export const metadata: Metadata = { title: "Reading your answers | SUNNYCELLS" };

export default function AnalyzingPage() {
  /* The shared run, pointed at this funnel's first result screen. Its default is the
     diet funnel's, so the href is not optional here. */
  return <Analyzing nextHref="/quiz/cortisol/results/summary" />;
}
