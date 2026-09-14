import type { Metadata } from "next";
import { BrainMemoryCheckout } from "@/components/brain-memory/BrainMemoryCheckout";

export const metadata: Metadata = {
  title: "Checkout | Brain & Memory Power Boost",
  description: "Delivery details for your Brain & Memory Power Boost subscription.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BrainMemoryCheckout />;
}
