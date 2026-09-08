import type { Metadata } from "next";
import { StagingPlans } from "@/components/quiz/StagingPlans";

export const metadata: Metadata = {
  title: "Your plan (staging) | SUNNYCELLS",
  /* Nothing links here and nothing should index it. */
  robots: { index: false, follow: false },
};

export default function StagingPlansPage() {
  return <StagingPlans />;
}
