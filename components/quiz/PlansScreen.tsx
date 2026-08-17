"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubscriptionBox, type CadencePlan } from "@/components/commerce/SubscriptionBox";
import { dietQuiz } from "@/lib/quiz/diet";
import { writeAnswer } from "@/lib/quiz/store";
import { ResultsShell, ResultsHeading } from "./ResultsShell";

/* Subscriptions only, so the choice is cadence rather than one-time versus subscribe.
   The reference funnel sells a 1, 3, or 6 month supply; the same shelf life maps onto
   how often it arrives, with the longer interval cheaper per month. */
const PLANS: CadencePlan[] = [
  { id: "m1", label: "Every month", price: 39, per: "per month", unit: "month" },
  {
    id: "m2",
    label: "Every two months",
    price: 35,
    note: "Two pouches per delivery",
    flag: "Most chosen",
    per: "per month",
    unit: "month",
  },
  {
    id: "m3",
    label: "Every three months",
    price: 32,
    note: "Three pouches per delivery, the lowest monthly price",
    per: "per month",
    unit: "month",
  },
];

export function PlansScreen() {
  const router = useRouter();
  const [plan, setPlan] = useState("m2");

  return (
    <ResultsShell>
      <ResultsHeading eyebrow="Your plan">SC-21 Metabolic Morning Blend</ResultsHeading>

      <div
        style={{
          background: "var(--shell)",
          borderRadius: "var(--radius-card)",
          overflow: "hidden",
          marginBottom: "var(--space-8)",
        }}
      >
        <Image
          src="/product/metabolic-morning-blend.png"
          alt="SC-21 Metabolic Morning Blend, a yellow pouch beside a scoop of powder"
          width={2400}
          height={1792}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      <p style={{ marginTop: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--ink-80)" }}>
        One scoop in water each morning. Thirty servings a pouch, orange flavour, no
        stimulants. Your answers pointed at sleep and afternoon energy first, which is
        where most people notice the change before the scale moves.
      </p>

      <SubscriptionBox
        plans={PLANS}
        value={plan}
        onChange={setPlan}
        compareAt={49}
        ctaLabel="Start my routine"
        onAdd={({ plan: chosen, price, firstPrice }) => {
          writeAnswer(dietQuiz.id, "plan", chosen.id);
          writeAnswer(dietQuiz.id, "planPrice", String(price));
          writeAnswer(dietQuiz.id, "planFirstPrice", String(firstPrice));
          router.push("/quiz/diet/results/checkout");
        }}
      />
    </ResultsShell>
  );
}
