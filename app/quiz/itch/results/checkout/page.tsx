import type { Metadata } from "next";
import { FridayZoomiesCheckout } from "@/components/itch-quiz/FridayZoomiesCheckout";

export const metadata: Metadata = { title: "Shipping details" };

export default function CheckoutPage() {
  return <FridayZoomiesCheckout backHref="/quiz/itch/results/plans" />;
}
