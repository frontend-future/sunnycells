import type { Metadata } from "next";
import { HormoneCheckoutPage } from "@/components/hormone-harmony/HormoneCheckoutPage";

export const metadata: Metadata = {
  title: "Shipping details | SUNNYCELLS",
  robots: { index: false, follow: false },
};

export default function HormoneHarmonyCheckoutPage() {
  return <HormoneCheckoutPage />;
}
