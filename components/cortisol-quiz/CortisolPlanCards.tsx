"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { trackMetaEvent } from "@/lib/meta";
import { PLANS, PRODUCT, type Plan } from "@/lib/products/youth-matrix-chews";
import { cortisolQuiz } from "@/lib/quiz/cortisol";
import { readAnswers, writeAnswer } from "@/lib/quiz/store";

/* Youth Matrix has no cart or order builder in lib/products, unlike the other three
   funnels' products, so there is nothing to write a line item into. The choice goes in
   this quiz's own store and the PDP is where it is actually bought. Swap this for the
   product's cart id when one exists. */
const CHOICE_FIELD = "plan";

/** The diet funnel's PlanCards, selling the chews. Same card, same grid, same job. */
export function CortisolPlanCards({
  destinationHref,
  ctaLabel = "Try now",
}: { destinationHref: string; ctaLabel?: string }) {
  const router = useRouter();
  const [hover, setHover] = useState("");

  const choose = (p: Plan) => {
    writeAnswer(cortisolQuiz.id, CHOICE_FIELD, p.id);
    trackMetaEvent(
      "InitiateCheckout",
      {
        currency: "USD",
        /* The figures on this product are display strings, not numbers, so the value
           is parsed off the price rather than multiplied out of a supply ladder. */
        value: Number(p.price.replace(/[^0-9.]/g, "")) || 0,
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
        gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
        gap: "var(--space-5)",
        alignItems: "stretch",
      }}
    >
      {PLANS.map((p) => {
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
            {p.best ? (
              <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)" }}>
                <Badge tone="ink">Most popular</Badge>
              </div>
            ) : null}

            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
              {p.name}
            </div>

            <Image
              src="/product/youth-matrix-chews.webp"
              alt={`A jar of ${PRODUCT.title}`}
              width={1200}
              height={1200}
              style={{ width: "100%", height: "auto", maxHeight: 150, objectFit: "contain" }}
            />

            <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "var(--space-3)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-h2)", fontWeight: 900, letterSpacing: "var(--tracking-display)" }}>
                {p.price}
              </span>
              {p.compareAt ? <s style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>{p.compareAt}</s> : null}
            </div>

            {/* The ongoing price never lets the first-order price stand on its own. */}
            {p.cadence ? (
              <div style={{ fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink-60)", marginTop: "calc(var(--space-3) * -1)" }}>
                {p.cadence}
              </div>
            ) : null}

            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {(p.points ?? ["30 nights of chews", "Free shipping", "30 day money back guarantee"]).map((line) => (
                <li key={line} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start", fontSize: "var(--size-meta)", fontWeight: 500 }}>
                  <span
                    aria-hidden="true"
                    style={{ flex: "none", width: 22, height: 22, borderRadius: "50%", background: "var(--sprout)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Icon name="check" size={13} strokeWidth={3.5} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {p.save ? <div style={{ fontSize: "var(--size-meta)", fontWeight: 800 }}>{p.save}</div> : null}
              <Button fullWidth size="lg" variant="accent" onClick={() => choose(p)}>
                {ctaLabel}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
