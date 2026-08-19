"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/core/Button";
import { Badge } from "@/components/core/Badge";
import { Icon } from "@/components/core/Icon";
import { PLANS, planBullets, type Plan } from "@/lib/quiz/plans";
import { dietQuiz } from "@/lib/quiz/diet";
import { readAnswers, writeAnswer } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";

export function PlanCards({
  destinationHref = "/quiz/diet/results/checkout",
  ctaLabel = "Try now",
  optimizedImages = false,
}: {
  destinationHref?: string;
  ctaLabel?: string;
  optimizedImages?: boolean;
}) {
  const router = useRouter();
  const [hover, setHover] = useState("");

  const choose = (p: Plan) => {
    writeAnswer(dietQuiz.id, "plan", p.id);
    writeAnswer(dietQuiz.id, "planPrice", String(p.price));
    writeAnswer(dietQuiz.id, "planMonths", String(p.months));
    trackMetaEvent("InitiateCheckout", {
      currency: "USD",
      value: p.price * p.months,
      content_ids: [p.id],
      content_type: "product",
      content_name: p.label,
      /* The quiz captured an email several steps back. Passing it here is what
         lets Meta match this event to a person rather than a cookie. */
    }, { email: readAnswers(dietQuiz.id).email });
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
              background: on ? "var(--sun-tint)" : "var(--white)",
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

            {/* The pouch count matches what actually arrives, so a three month supply
                does not look like one bag. One scoop in every shot regardless. */}
            <Image
              src={optimizedImages ? p.image.replace(/\.png$/, ".webp") : p.image}
              alt={`${p.months} ${p.months === 1 ? "pouch" : "pouches"} of Metabolic Morning Blend`}
              width={1200}
              height={900}
              style={{ width: "100%", height: "auto", maxHeight: 150, objectFit: "contain" }}
            />

            {/* Price and the struck list price on one line, so the comparison reads
                in a single glance rather than over two rows. */}
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 40, letterSpacing: "var(--tracking-display)", lineHeight: 1 }}>
                ${p.price}
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--ink-60)", textDecoration: "line-through", letterSpacing: "-0.02em" }}>
                {/* Multi pouch cards strike the total for the supply, $69 and $126.
                    The single pouch card has no total distinct from its price, so it
                    keeps the list price. */}
                ${p.months > 1 ? p.price * p.months : p.compareAt}
              </span>
              {/* Only where more than one pouch arrives. On the single pouch card the
                  price is plainly the whole thing, and a unit there reads as though
                  there were more to buy. "pouch" is the word the bullets and the ads
                  already use for the pack. */}
              {p.months > 1 && (
                <span style={{ fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink-60)" }}>per pouch</span>
              )}
            </div>
            {/* The standing first-order term, stated on the card rather than left to
                be inferred from the struck price. */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)", marginTop: -6 }}>
              {/* The filled circular tick already used on the ad creatives, rather than
                  a new glyph for one line. */}
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
              {planBullets(p).map((b) => (
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
