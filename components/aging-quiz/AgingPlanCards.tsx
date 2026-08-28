"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { trackMetaEvent } from "@/lib/meta";
import { CART_ID, PLANS, PRODUCT, type Plan } from "@/lib/products/creatine-collagen";
import { agingQuiz } from "@/lib/quiz/aging";
import { readAnswers, writeAnswer } from "@/lib/quiz/store";

/* Worked out from the price rather than written beside it, so it cannot quietly stop
   being true when a price changes. Whole dollars only, per the pricing rule. */
function perDay(price: number, servings: number): string {
  const value = price / servings;
  const floor = Math.floor(value);
  if (Number.isInteger(value)) return `$${value} / day`;
  return value - floor <= 0.35 && floor >= 1 ? `Just over $${floor} / day` : `Less than $${Math.ceil(value)} / day`;
}

/** The diet funnel's PlanCards, selling the collagen. Same card, same grid, and
    the same job: store the choice, report it, and move to checkout. */
export function AgingPlanCards({ destinationHref, ctaLabel = "Try now" }: { destinationHref: string; ctaLabel?: string }) {
  const router = useRouter();
  const [hover, setHover] = useState("");

  /* Written into the Even Energy cart, not the quiz store, because the checkout that
     receives it is the product's own and reads from there. */
  const choose = (p: Plan) => {
    writeAnswer(CART_ID, "plan", p.id);
    trackMetaEvent(
      "InitiateCheckout",
      {
        currency: "USD",
        value: p.price * p.months,
        content_ids: [p.id],
        content_type: "product",
        content_name: `${PRODUCT.name} ${p.name}`,
      },
      /* The quiz captured an email several steps back. Passing it here is what lets
         Meta match this event to a person rather than a cookie. */
      { email: readAnswers(agingQuiz.id).email },
    );
    router.push(destinationHref);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
        gap: "var(--space-5)",
        alignItems: "stretch",
      }}
    >
      {PLANS.map((p) => {
        const on = p.best || hover === p.id;
        const saving = (p.compareAt - p.price) * p.months;
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
              background: on ? "var(--sun-tint)" : "var(--white)",
              border: `2px solid ${on ? "var(--ink)" : "var(--border-hairline)"}`,
              borderRadius: "var(--radius-card)",
              transition: "background var(--duration-fast) var(--ease-standard)",
            }}
          >
            {p.best ? (
              <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)" }}>
                <Badge tone="ink">Most popular</Badge>
              </div>
            ) : null}

            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
              {p.name}
            </div>

            {/* The pouch count matches what actually arrives, so a six month supply does
                not look like one bag. One scoop in every shot regardless. */}
            <Image
              src={p.image}
              alt={`${p.months} ${p.months === 1 ? "tub" : "tubs"} of ${PRODUCT.name}`}
              width={1200}
              height={900}
              style={{ width: "100%", height: "auto", maxHeight: 150, objectFit: "contain" }}
            />
            <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-h2)", fontWeight: 900, letterSpacing: "var(--tracking-display)" }}>
                ${p.price}
              </span>
              <span style={{ fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink-60)" }}>/pouch</span>
              <s style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>${p.compareAt}</s>
            </div>

            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {[
                `${p.months * PRODUCT.servings} servings`,
                perDay(p.price, PRODUCT.servings),
                `${p.months} ${p.months === 1 ? "tub" : "tubs"} delivered`,
                p.sub,
              ].map((line) => (
                <li key={line} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start", fontSize: "var(--size-meta)", fontWeight: 500 }}>
                  <span
                    aria-hidden="true"
                    style={{ flex: "none", width: 22, height: 22, borderRadius: "50%", background: "var(--sun)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Icon name="check" size={13} strokeWidth={3.5} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <div style={{ fontSize: "var(--size-meta)", fontWeight: 800 }}>Save ${saving}</div>
              <Button fullWidth size="lg" variant="accent" onClick={() => choose(p)}>
                Try now
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
