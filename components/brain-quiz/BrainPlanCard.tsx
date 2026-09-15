"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/core/Button";
import { Badge } from "@/components/core/Badge";
import { Icon } from "@/components/core/Icon";
import { CART_ID, INCLUDED, PLAN, PRODUCT, SHIPPING_PRICE } from "@/lib/products/brain-memory";
import { readAnswers, writeAnswer } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import { brainQuiz } from "@/lib/quiz/brain";

/**
 * Plays the same role PlanCards plays on the diet plans page, styled to match it
 * card for card, but for a single free-trial offer instead of a 1/3/6 month ladder:
 * Brain & Memory Power Boost has one plan, so there is nothing to choose between.
 */
export function BrainPlanCard({
  destinationHref = "/products/brain-memory/checkout",
  ctaLabel = "Try now",
}: {
  destinationHref?: string;
  ctaLabel?: string;
}) {
  const router = useRouter();

  /* One click, one event, same guard PlanCards uses: nothing unmounts this card
     between the tap and the route change, so a double tap would otherwise fire
     InitiateCheckout twice with two event ids, which Meta cannot dedupe. */
  const chosen = useRef(false);

  const choose = () => {
    if (chosen.current) return;
    chosen.current = true;
    writeAnswer(CART_ID, "plan", PLAN.id);
    /* So the purchase-attempt notification can say which funnel sent them. */
    writeAnswer(CART_ID, "lander", "quiz");
    trackMetaEvent(
      "InitiateCheckout",
      {
        currency: "USD",
        value: SHIPPING_PRICE,
        content_ids: [PLAN.id],
        content_type: "product",
        content_name: PRODUCT.name,
      },
      { email: readAnswers(brainQuiz.id).email },
    );
    router.push(destinationHref);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
          width: "100%",
          maxWidth: 360,
          padding: "var(--space-6) var(--space-5) var(--space-5)",
          background: "var(--sky-tint)",
          border: "2px solid var(--ink)",
          borderRadius: "var(--radius-card)",
        }}
      >
        <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)" }}>
          <Badge tone="ink">First bottle free</Badge>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 800 }}>{PRODUCT.name}</div>
          <div style={{ marginTop: 2, fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>Monthly subscription</div>
        </div>

        <Image
          src="/product/brain-memory/01-hero-split.png"
          alt={`A bottle of ${PRODUCT.name}`}
          width={1200}
          height={900}
          style={{ width: "100%", height: "auto", maxHeight: 150, objectFit: "contain" }}
        />

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 40, letterSpacing: "var(--tracking-display)", lineHeight: 1 }}>
            ${SHIPPING_PRICE}
            <span style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink-60)", letterSpacing: 0 }}>
              {" "}today
            </span>
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--ink-60)", textDecoration: "line-through", letterSpacing: "-0.02em" }}>
            ${PLAN.compareAt}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)", marginTop: -6 }}>
          <span
            aria-hidden="true"
            style={{
              flex: "none", width: 20, height: 20, borderRadius: "50%",
              background: "var(--status-success)", color: "var(--white)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Icon name="check" size={13} strokeWidth={3.5} />
          </span>
          <span style={{ fontSize: "var(--size-meta)", fontWeight: 800, color: "var(--status-success)" }}>
            First bottle free, just cover shipping
          </span>
        </div>

        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
          {INCLUDED.map((i) => (
            <li key={i.label} style={{ fontSize: "var(--size-meta)", color: "var(--ink-80)", textAlign: "center" }}>
              {i.label}
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "auto", paddingTop: "var(--space-3)" }}>
          <Button fullWidth variant="primary" onClick={choose}>
            {ctaLabel}
          </Button>
          <div style={{ marginTop: "var(--space-3)", textAlign: "center", fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>
            {PLAN.sub}. Cancel anytime.
          </div>
        </div>
      </div>
    </div>
  );
}
