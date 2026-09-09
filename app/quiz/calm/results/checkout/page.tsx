import type { Metadata } from "next";
import { CalmCheckout } from "@/components/calm-quiz/CalmCheckout";

export const metadata: Metadata = { title: "Shipping details | SUNNYCELLS" };

export default function CheckoutPage() {
  return <CalmCheckout />;
}
