import type { Metadata } from "next";
import { BrainLadderCheckout } from "@/components/brain-quiz/BrainLadderCheckout";

export const metadata: Metadata = { title: "Shipping details | SUNNYCELLS" };

export default function CheckoutPage() {
  return <BrainLadderCheckout backHref="/quiz/brain/v3/results/plans" />;
}
