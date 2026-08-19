"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/core/Button";
import { Badge } from "@/components/core/Badge";
import { PLANS, planBullets, type Plan } from "@/lib/quiz/plans";
import { dietQuiz } from "@/lib/quiz/diet";
import { writeAnswer } from "@/lib/quiz/store";

export function PlanCards({
  destinationHref = "/quiz/diet/results/checkout",
  ctaLabel = "Order now",
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

            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "var(--space-3)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 40, letterSpacing: "var(--tracking-display)", lineHeight: 1 }}>
                ${p.price}
              </span>
              <span style={{ fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink-60)" }}>per month</span>
            </div>
            <div style={{ textAlign: "center", marginTop: -10 }}>
              <span style={{ fontSize: "var(--size-meta)", fontWeight: 700, color: "var(--ink-60)", textDecoration: "line-through" }}>
                ${p.compareAt}
              </span>{" "}
              <span style={{ fontSize: "var(--size-meta)", fontWeight: 800, color: "var(--status-success)" }}>
                Save ${p.compareAt - p.price} a month
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
