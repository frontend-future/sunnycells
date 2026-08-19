import type { Metadata } from "next";
import { CheckoutScreen } from "@/components/quiz/CheckoutScreen";

export const metadata: Metadata = {
  title: "Shipping details | SUNNYCELLS",
  robots: { index: false, follow: false },
};

export default function HormoneHarmonyCheckoutPage() {
  return (
    <CheckoutScreen
      backHref="/hormone-harmony/cart"
      continueLabel="Continue to payment"
      optimizedImages
    />
  );
}
