import type { Metadata } from "next";
import { DailyRedsCheckout } from "@/components/daily-reds/DailyRedsCheckout";

export const metadata: Metadata = { title: "Shipping details | SUNNYCELLS" };

export default function Page() {
  return <DailyRedsCheckout />;
}
