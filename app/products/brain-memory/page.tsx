import type { Metadata } from "next";
import { BrainMemoryPage } from "@/components/brain-memory/BrainMemoryPage";

export const metadata: Metadata = {
  title: "Brain & Memory Power Boost | SUNNYCELLS",
  description:
    "A daily nootropic built around six research backed actives: phosphatidylserine, acetyl-L-carnitine, ginkgo biloba, alpha lipoic acid, N-acetyl-L-cysteine and huperzine A.",
};

export default function Page() {
  return <BrainMemoryPage />;
}
