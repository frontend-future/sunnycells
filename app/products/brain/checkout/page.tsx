import type { Metadata } from "next";
import { BrainCheckout } from "@/components/brain/BrainCheckout";

export const metadata: Metadata = {
  title: "Checkout | Clear Mind",
  description: "Delivery details for your Clear Mind subscription.",
  /* A cart page has nothing to rank for and should not appear in results. */
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BrainCheckout />;
}
