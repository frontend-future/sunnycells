import type { Metadata } from "next";
import { EnergyProjection } from "@/components/energy-quiz/EnergyProjection";

export const metadata: Metadata = { title: "Your energy timeline | SUNNYCELLS" };

export default function Page() {
  return <EnergyProjection />;
}
