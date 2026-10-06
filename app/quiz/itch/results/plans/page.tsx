import type { Metadata } from "next";
import { FridayZoomiesPlans } from "@/components/itch-quiz/FridayZoomiesPlans";

export const metadata: Metadata = { title: "Your plan" };

export default function FridayZoomiesPlansPage() {
  return <FridayZoomiesPlans />;
}
