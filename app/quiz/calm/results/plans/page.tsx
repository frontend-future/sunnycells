import type { Metadata } from "next";
import { CalmPlans } from "@/components/calm-quiz/CalmPlans";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

export default function CalmPlansPage() {
  return <CalmPlans />;
}
