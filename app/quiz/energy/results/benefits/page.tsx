import type { Metadata } from "next";
import { EnergyBenefits } from "@/components/energy-quiz/EnergyBenefits";

export const metadata: Metadata = { title: "How Even Energy works | SUNNYCELLS" };

export default function Page() {
  return <EnergyBenefits />;
}
