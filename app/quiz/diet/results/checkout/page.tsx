import type { Metadata } from "next";
import { CheckoutScreen } from "@/components/quiz/CheckoutScreen";

export const metadata: Metadata = { title: "Shipping details | SUNNYCELLS" };

export default function CheckoutPage() {
  return <CheckoutScreen />;
}
