import type { Metadata } from "next";
import { ItchV2Checkout } from "@/components/itch-quiz/ItchV2Checkout";

export const metadata: Metadata = { title: "Shipping details | SUNNYCELLS" };

export default function CheckoutPage() {
  return <ItchV2Checkout backHref="/quiz/itch/v2/results/plans" />;
}
