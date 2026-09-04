import type { Metadata } from "next";
import { BeetrootLander } from "@/components/beetroot/BeetrootLander";

export const metadata: Metadata = {
  title: "BeetRoot+ Chews | SUNNYCELLS",
  description:
    "3,000mg concentrated beetroot in a soft daily chew, built to support heart health and healthy circulation.",
};

export default function Page() {
  return <BeetrootLander />;
}
