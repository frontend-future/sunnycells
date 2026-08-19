import type { Metadata } from "next";
import { CartScreen } from "@/components/quiz/CartScreen";

export const metadata: Metadata = { title: "Your cart | SUNNYCELLS" };

export default function CartPage() {
  return <CartScreen />;
}
