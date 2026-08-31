import type { Metadata } from "next";
import { RevitalizePage } from "@/components/revitalize/RevitalizePage";

export const metadata: Metadata = {
  title: "Revitalize Gummies | SUNNYCELLS",
  description:
    "Four cherry lime gummies a day: 10 g of protein so you are not hungry at 3pm, magnesium glycinate and vitamin C for the stress response, and the B vitamins your body runs energy metabolism on.",
};

export default function Page() {
  return <RevitalizePage />;
}
