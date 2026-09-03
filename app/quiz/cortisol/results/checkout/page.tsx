import type { Metadata } from "next";
import { YouthMatrixCheckout } from "@/components/cortisol-quiz/YouthMatrixCheckout";

export const metadata: Metadata = { title: "Shipping details | SUNNYCELLS" };

export default function CheckoutPage() {
  return <YouthMatrixCheckout />;
}
