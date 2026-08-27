import type { Metadata } from "next";
import { CollagenCheckout } from "@/components/aging-quiz/CollagenCheckout";

export const metadata: Metadata = { title: "Shipping details | SUNNYCELLS" };

export default function CheckoutPage() {
  return <CollagenCheckout />;
}
