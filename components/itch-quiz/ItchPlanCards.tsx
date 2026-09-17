"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/core/Button";
import { Badge } from "@/components/core/Badge";
import { Icon } from "@/components/core/Icon";
import { PRODUCT } from "@/lib/products/dog-itch";
import { ITCH_CART_ID, ITCH_PLANS, itchPlanBullets } from "@/lib/quiz/itchLadder";
import type { Plan } from "@/lib/quiz/plans";
import { itchQuiz } from "@/lib/quiz/itch";
import { readAnswers, writeAnswer } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";

/**
 * The diet funnel's PlanCards, styled and wired identically, selling SC-01
 * Daily Chews on the same paid 1/3/6 month ladder instead of a quantity of
 * pouches. Kept as its own component rather than a generalised PlanCards,
 * same reasoning BrainPlanCards documents.
 */
export function ItchPlanCards({
  destinationHref = "/quiz/itch/results/checkout",
  ctaLabel = "Try now",
  plans = ITCH_PLANS,
  quizId = itchQuiz.id,
}: {
  destinationHref?: string;
  ctaLabel?: string;
  plans?: Plan[];
  quizId?: string;
}) {
  const router = useRouter();
  const [hover, setHover] = useState("");

  /* One click, one event, same guard PlanCards uses: nothing unmounts the card
     between the tap and the route change, so a double tap would otherwise fire
     InitiateCheckout twice with two event ids, which Meta cannot dedupe. */
  const chosen = useRef(false);

  const choose = (p: Plan) => {
    if (chosen.current) return;
    chosen.current = true;
    writeAnswer(ITCH_CART_ID, "plan", p.id);
    writeAnswer(ITCH_CART_ID, "planPrice", String(p.price));
    writeAnswer(ITCH_CART_ID, "planMonths", String(p.months));
    trackMetaEvent(
      "InitiateCheckout",
      {
        currency: "USD",
        value: p.price * p.months,
        content_ids: [p.id],
        content_type: "product",
        content_name: `${PRODUCT.name} ${p.label}`,
      },
      /* The quiz captured an email several steps back. Passing it here is what
         lets Meta match this event to a person rather than a cookie. */
      { email: readAnswers(quizId).email },
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
      {plans.map((p) => {
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
              <div style={{ fontSize: "var(--size-body)", fontWeight: 800 }}>{p.label}</div>
              <div style={{ marginTop: 2, fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>{p.sub}</div>
            </div>

            {/* The jar count matches what actually arrives: a cluster shot for
                3 and 6, one jar for the monthly plan. */}
            <Image
              src={p.image}
              alt={`${p.months} ${p.months === 1 ? "jar" : "jars"} of ${PRODUCT.name}`}
              width={1200}
              height={900}
              style={{ width: "100%", height: "auto", maxHeight: 150, objectFit: "contain" }}
            />

            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 40, letterSpacing: "var(--tracking-display)", lineHeight: 1 }}>
                ${p.price}
                {p.months > 1 && (
                  <span style={{ fontFamily: "var(--font-text)", fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink-60)", letterSpacing: 0 }}>
                    /jar
                  </span>
                )}
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--ink-60)", textDecoration: "line-through", letterSpacing: "-0.02em" }}>
                ${p.compareAt * p.months}
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
                50% off auto-applied today
              </span>
            </div>

            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              {itchPlanBullets(p).map((b) => (
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
