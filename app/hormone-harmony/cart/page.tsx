import type { Metadata } from "next";
import { CartScreen } from "@/components/quiz/CartScreen";

export const metadata: Metadata = {
  title: "Your cart | SUNNYCELLS",
  robots: { index: false, follow: false },
};

export default function HormoneHarmonyCartPage() {
  return (
    <CartScreen
      plansHref="/hormone-harmony#plans"
      checkoutHref="/hormone-harmony/checkout"
    />
  );
}
