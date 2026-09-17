import type { Metadata } from "next";
import { JointCheckout } from "@/components/joint-quiz/JointCheckout";

export const metadata: Metadata = { title: "Shipping details | SUNNYCELLS" };

export default function CheckoutPage() {
  return <JointCheckout />;
}
