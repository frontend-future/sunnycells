import type { Metadata } from "next";
import { ItchV3Checkout } from "@/components/itch-quiz/ItchV3Checkout";

export const metadata: Metadata = { title: "Shipping details | SUNNYCELLS" };

export default function CheckoutPage() {
  return <ItchV3Checkout backHref="/quiz/itch/v3/results/plans" />;
}
