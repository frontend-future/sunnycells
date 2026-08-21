import type { Metadata } from "next";
import { ClonePage } from "@/components/hormone-harmony-clone/ClonePage";

export const metadata: Metadata = {
  title: "Your Cart | Hormone Harmony",
  description: "Review your Hormone Harmony package before checkout.",
  robots: { index: false, follow: false },
};

export default function HormoneHarmonyCartPage() {
  return <ClonePage page="cart" />;
}
