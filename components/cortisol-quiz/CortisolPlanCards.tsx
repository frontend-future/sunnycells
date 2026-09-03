"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { trackMetaEvent } from "@/lib/meta";
import {
  CART_ID, PRODUCT, SUPPLY_PLANS, supplyBullets, type SupplyPlan,
} from "@/lib/products/youth-matrix-chews";
import { cortisolQuiz } from "@/lib/quiz/cortisol";
import { readAnswers, writeAnswer } from "@/lib/quiz/store";

/** The diet funnel's PlanCards, selling the chews on a 1, 3 and 6 month ladder. */
export function CortisolPlanCards({
  destinationHref,
  ctaLabel = "Try now",
}: { destinationHref: string; ctaLabel?: string }) {
  const router = useRouter();
  const [hover, setHover] = useState("");

  const choose = (p: SupplyPlan) => {
    /* Written into the product's own cart, not the quiz store, because the checkout
       that receives it reads from there. */
    writeAnswer(CART_ID, "plan", p.id);
    trackMetaEvent(
      "InitiateCheckout",
      {
        currency: "USD",
        value: p.price * p.months,
        content_ids: [p.id],
        content_type: "product",
        content_name: `${PRODUCT.title} ${p.name}`,
      },
      /* The quiz captured an email several steps back. Passing it here is what lets
         Meta match this event to a person rather than a cookie. */
      { email: readAnswers(cortisolQuiz.id).email },
    );
    router.push(destinationHref);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "var(--space-5)",
        alignItems: "stretch",
      }}
    >
      {SUPPLY_PLANS.map((p) => {
        const on = p.best || hover === p.id;
        return (
          <div
            key={p.id}
            onMouseEnter={() => setHover(p.id)}
            onMouseLeave={() => setHover("")}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
              padding: "var(--space-6) var(--space-5) var(--space-5)",
              /* Sprout rather than the diet funnel's sun: this is the wellness family
                 code, the one the Youth Matrix PDP already runs on. */
              background: on ? "var(--sprout-tint)" : "var(--white)",
              border: `2px solid ${on ? "var(--ink)" : "var(--border-hairline)"}`,
              borderRadius: "var(--radius-card)",
              transition: "background var(--duration-fast) var(--ease-standard)",
            }}
          >
            {p.flag ? (
              <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)" }}>
                <Badge tone={p.best ? "ink" : "sun"}>{p.flag}</Badge>
              </div>
            ) : null}

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "var(--size-body)", fontWeight: 800 }}>{p.name}</div>
              <div style={{ marginTop: 2, fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>{p.sub}</div>
            </div>

            <Image
              src={p.image}
              alt={`${p.months} ${p.months === 1 ? "jar" : "jars"} of ${PRODUCT.title}`}
              width={1200}
              height={1200}
              style={{ width: "100%", height: "auto", maxHeight: 150, objectFit: "contain" }}
            />

            {/* Price and the struck list price on one line, so the comparison reads in
                a single glance rather than over two rows. */}
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 40, letterSpacing: "var(--tracking-display)", lineHeight: 1 }}>
                ${p.price}
                {/* Tight against the figure it qualifies, and only where more than one
                    jar arrives: on a single jar the price is the whole thing. */}
                {p.months > 1 && (
                  <span style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink-60)", letterSpacing: 0 }}>
                    /jar
                  </span>
                )}
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--ink-60)", textDecoration: "line-through", letterSpacing: "-0.02em" }}>
                {/* The list price for everything in the box. Per supply rather than a
                    flat one month figure, so all three cards are exactly half off and
                    the 50% the page states stays true on every one. */}
                ${p.compareAt * p.months}
              </span>
            </div>

            {/* The standing first-order term, stated on the card rather than left to be
                inferred from the struck price. */}
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
                50% off auto-applied today
              </span>
            </div>

            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              {supplyBullets(p).map((b) => (
                <li key={b} style={{ fontSize: "var(--size-meta)", color: "var(--ink-80)", textAlign: "center" }}>
                  {b}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "auto", paddingTop: "var(--space-3)" }}>
              <Button fullWidth variant={p.best ? "primary" : "outline"} onClick={() => choose(p)}>
                {ctaLabel}
              </Button>
              <div style={{ marginTop: "var(--space-3)", textAlign: "center", fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>
                Cancel anytime. Free shipping.
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
