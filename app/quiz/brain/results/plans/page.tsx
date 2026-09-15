import type { Metadata } from "next";
import { BrainQuizPlans } from "@/components/brain-quiz/BrainQuizPlans";

export const metadata: Metadata = { title: "Your offer | SUNNYCELLS" };

export default function PlansPage() {
  return <BrainQuizPlans />;
}
