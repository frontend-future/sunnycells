import type { Metadata } from "next";
import { PlansScreen } from "@/components/quiz/PlansScreen";

export const metadata: Metadata = {
  title: "Metabolic Morning Blend | SUNNYCELLS",
  description:
    "Discover SUNNYCELLS Metabolic Morning Blend, compare supply options, and build a simple morning routine that supports stress and metabolic wellness.",
  alternates: { canonical: "https://sunnycells.com/hormone-harmony" },
};

export default function HormoneHarmonyPage() {
  return (
    <PlansScreen
      destinationHref="/hormone-harmony/cart"
      planCtaLabel="Add to cart"
      optimizedImages
    />
  );
}
