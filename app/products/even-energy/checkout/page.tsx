import type { Metadata } from "next";
import { EvenCheckout } from "@/components/even-energy/EvenCheckout";

export const metadata: Metadata = {
  title: "Checkout | Even Energy",
  description: "Delivery details for your Even Energy subscription.",
  /* A cart page has nothing to rank for and should not appear in results. */
  robots: { index: false, follow: false },
};

export default function Page() {
  return <EvenCheckout />;
}
