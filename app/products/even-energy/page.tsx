import type { Metadata } from "next";
import { EvenEnergyPage } from "@/components/even-energy/EvenEnergyPage";

export const metadata: Metadata = {
  title: "SC-22 Even Energy | SUNNYCELLS",
  description:
    "A daily stick pack with no stimulants in it. Taurine 1000 mg, CoQ10 150 mg and PEAK ATP 40 mg, in watermelon. Thirty sticks, one a day in cold water.",
};

export default function Page() {
  return <EvenEnergyPage />;
}
