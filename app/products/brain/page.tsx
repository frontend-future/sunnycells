import type { Metadata } from "next";
import { BrainPage } from "@/components/brain/BrainPage";

export const metadata: Metadata = {
  title: "Clear Mind | SUNNYCELLS",
  description:
    "A daily capsule with no stimulants in it. Cognizin® Citicoline 250 mg, Bacopa Monnieri 300 mg and L-Theanine 200 mg. Thirty capsules, two a day with breakfast.",
};

export default function Page() {
  return <BrainPage />;
}
