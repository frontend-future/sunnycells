import type { Metadata } from "next";
import { HormoneCartPage } from "@/components/hormone-harmony/HormoneCartPage";

export const metadata: Metadata = {
  title: "Your cart | SUNNYCELLS",
  robots: { index: false, follow: false },
};

export default function HormoneHarmonyCartPage() {
  return <HormoneCartPage />;
}
