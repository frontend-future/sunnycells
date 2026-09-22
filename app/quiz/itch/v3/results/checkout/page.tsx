import type { Metadata } from "next";
import { ItchCheckout } from "@/components/itch-quiz/ItchCheckout";

export const metadata: Metadata = { title: "Shipping details | SUNNYCELLS" };

export default function CheckoutPage() {
  return <ItchCheckout backHref="/quiz/itch/v3/results/plans" />;
}
