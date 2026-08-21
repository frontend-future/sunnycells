import type { Metadata } from "next";
import { ClonePage } from "@/components/hormone-harmony-clone/ClonePage";

export const metadata: Metadata = {
  title: "Checkout | Hormone Harmony",
  description: "Enter your delivery details for the Hormone Harmony demo checkout.",
  robots: { index: false, follow: false },
};

export default function HormoneHarmonyCheckoutPage() {
  return <ClonePage page="checkout" />;
}
