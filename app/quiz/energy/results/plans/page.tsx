import type { Metadata } from "next";
import { EnergyPlans } from "@/components/energy-quiz/EnergyPlans";

export const metadata: Metadata = { title: "Your plan | SUNNYCELLS" };

export default function Page() {
  return <EnergyPlans />;
}
