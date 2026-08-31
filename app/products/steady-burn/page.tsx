import type { Metadata } from "next";
import { SteadyBurnPage } from "@/components/steady-burn/SteadyBurnPage";

export const metadata: Metadata = {
  title: "Steady Burn Gummies | SUNNYCELLS",
  description:
    "Four cherry lime gummies a day: 10 g of protein so you are not hungry at 3pm, magnesium glycinate and vitamin C for the stress response, and the B vitamins your body runs energy metabolism on.",
};

export default function Page() {
  return <SteadyBurnPage />;
}
