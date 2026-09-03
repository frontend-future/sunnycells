import type { Metadata } from "next";
import { CortisolPlans } from "@/components/cortisol-quiz/CortisolPlans";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

export default function PlansPage() {
  return <CortisolPlans />;
}
