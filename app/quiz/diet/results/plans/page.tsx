import type { Metadata } from "next";
import { PlansScreen } from "@/components/quiz/PlansScreen";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

export default function PlansPage() {
  return <PlansScreen />;
}
