import type { Metadata } from "next";
import { BrainQuizCheckout } from "@/components/brain-quiz/BrainQuizCheckout";

export const metadata: Metadata = { title: "Shipping details | SUNNYCELLS" };

export default function CheckoutPage() {
  return <BrainQuizCheckout />;
}
