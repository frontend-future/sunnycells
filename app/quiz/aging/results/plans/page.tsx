import type { Metadata } from "next";
import { AgingPlans } from "@/components/aging-quiz/AgingPlans";

export const metadata: Metadata = { title: "Your match | SUNNYCELLS" };

export default function Page() {
  return <AgingPlans />;
}
