"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/core/Button";
import { Icon, type IconName } from "@/components/core/Icon";
import { Wordmark } from "@/components/core/Wordmark";
import { dietQuiz } from "@/lib/quiz/diet";
import { BONUSES, buildOrder } from "@/lib/quiz/order";
import { planById } from "@/lib/quiz/plans";
import { useAnswers } from "@/lib/quiz/store";

const money = (value: number) => `$${value}`;

const BONUS_ICON: Record<string, IconName> = Object.fromEntries(
  BONUSES.map((bonus) => [bonus.id, bonus.icon as IconName]),
);

export function CartScreen() {
  const router = useRouter();
  const { answers, ready } = useAnswers(dietQuiz.id);
  const plan = planById(answers.plan);
  const order = buildOrder(answers);
  const product = order.lines[0];
  const bonuses = order.lines.slice(1);

  return (
    <div style={{ minHeight: "100dvh", background: "var(--surface-page)" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          padding: "var(--space-4) var(--page-gutter-mobile)",
          borderBottom: "1px solid var(--border-hairline)",
        }}
      >
        <Wordmark size={22} />
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-2)",
            fontSize: "var(--size-meta)",
            fontWeight: 700,
          }}
        >
          <Icon name="shield-check" size={20} />
          Secure order
        </span>
      </header>

      <main
        style={{
          width: "100%",
          maxWidth: 1080,
          margin: "0 auto",
          padding: "var(--space-6) var(--page-gutter-mobile) var(--space-16)",
        }}
      >
        <Link
          href="/quiz/diet/results/plans#plans"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-2)",
            minHeight: "var(--tap-min)",
            color: "var(--ink)",
            fontSize: "var(--size-body)",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          <Icon name="chevron-left" size={22} />
          Edit plan
        </Link>

        <div style={{ margin: "var(--space-3) 0 var(--space-8)" }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--size-h2), 7vw, var(--size-h1))",
              fontWeight: 900,
              letterSpacing: "var(--tracking-heading)",
              lineHeight: "var(--leading-snug)",
            }}
          >
            Review your order
          </h1>
          <p style={{ margin: "var(--space-3) 0 0", maxWidth: 620, color: "var(--ink-60)" }}>
            Check the delivery schedule and today&apos;s total before checkout.
          </p>
        </div>

        <div className="sc-cart-layout">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <section
              className="sc-cart-product"
              aria-labelledby="cart-product-title"
              style={{
                gap: "var(--space-6)",
                alignItems: "center",
                padding: "var(--space-6)",
                border: "2px solid var(--ink)",
                borderRadius: "var(--radius-card)",
                background: "var(--sun-tint)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 180,
                  padding: "var(--space-3)",
                  borderRadius: "var(--radius-image)",
                  background: "var(--sun)",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={plan.image}
                  alt={`${plan.months} ${plan.months === 1 ? "pouch" : "pouches"} of Metabolic Morning Blend`}
                  width={1200}
                  height={900}
                  priority
                  sizes="(max-width: 600px) 80vw, 220px"
                  style={{ width: "100%", height: "auto", maxHeight: 190, objectFit: "contain" }}
                />
              </div>

              <div>
                <div style={{ fontSize: "var(--size-meta)", fontWeight: 700, color: "var(--ink-80)" }}>
                  {plan.label}
                </div>
                <h2
                  id="cart-product-title"
                  style={{
                    margin: "var(--space-2) 0",
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--size-h3)",
                    fontWeight: 900,
                    letterSpacing: "var(--tracking-heading)",
                    lineHeight: "var(--leading-snug)",
                  }}
                >
                  Metabolic Morning Blend
                </h2>
                <p style={{ margin: 0, color: "var(--ink-80)" }}>
                  {product.note}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-h3)", fontWeight: 900 }}>
                    {money(plan.price)}
                  </strong>
                  <span style={{ color: "var(--ink-60)", fontSize: "var(--size-meta)" }}>per month</span>
                  <span style={{ color: "var(--ink-60)", fontSize: "var(--size-meta)", textDecoration: "line-through" }}>
                    {money(plan.compareAt)}
                  </span>
                </div>
                <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--size-meta)", fontWeight: 700 }}>
                  Free shipping. Skip or cancel anytime.
                </p>
              </div>
            </section>

            <section
              aria-labelledby="included-title"
              style={{
                padding: "var(--space-6)",
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-card)",
              }}
            >
              <h2
                id="included-title"
                style={{ margin: "0 0 var(--space-5)", fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900 }}
              >
                Included with your order
              </h2>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "var(--space-4)" }}>
                {bonuses.map((bonus) => (
                  <li key={bonus.id} style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: "none",
                        width: 48,
                        height: 48,
                        borderRadius: "var(--radius-sm)",
                        background: "var(--surface-sunk)",
                        border: "1px solid var(--border-hairline)",
                      }}
                    >
                      <Icon name={BONUS_ICON[bonus.id]} size={24} />
                    </span>
                    <span style={{ flex: 1, fontSize: "var(--size-meta)", fontWeight: 700, lineHeight: 1.35 }}>{bonus.name}</span>
                    <span style={{ fontSize: "var(--size-meta)", fontWeight: 800, color: "var(--status-success)" }}>Free</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside
            className="sc-cart-summary"
            aria-labelledby="cart-summary-title"
            style={{
              padding: "var(--space-6)",
              borderRadius: "var(--radius-card)",
              background: "var(--surface-sunk)",
              border: "1px solid var(--border-hairline)",
            }}
          >
            <h2
              id="cart-summary-title"
              style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900 }}
            >
              Order summary
            </h2>

            <div style={{ display: "grid", gap: "var(--space-3)", marginTop: "var(--space-5)", fontSize: "var(--size-meta)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-4)" }}>
                <span>{plan.months}-month supply</span>
                <span>{money(order.listTotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-4)" }}>
                <span>Plan savings</span>
                <strong style={{ color: "var(--status-success)" }}>-{money(order.discount)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-4)" }}>
                <span>Shipping</span>
                <strong style={{ color: "var(--status-success)" }}>Free</strong>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "var(--space-4)",
                marginTop: "var(--space-5)",
                paddingTop: "var(--space-5)",
                borderTop: "1px solid var(--border-hairline)",
              }}
            >
              <span style={{ fontSize: "var(--size-body)", fontWeight: 800 }}>Due today</span>
              <span style={{ textAlign: "right" }}>
                <span style={{ display: "block", color: "var(--ink-60)", fontSize: "var(--size-meta)", textDecoration: "line-through" }}>
                  {money(order.strikeTotal)}
                </span>
                <strong style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "var(--size-h2)", fontWeight: 900, lineHeight: 1 }}>
                  {ready ? money(order.total) : "\u00a0"}
                </strong>
              </span>
            </div>

            <div style={{ marginTop: "var(--space-6)" }}>
              <Button className="sc-cart-cta" size="lg" fullWidth variant="accent" iconRight="arrow-right" onClick={() => router.push("/quiz/diet/results/checkout")}>
                Continue to checkout
              </Button>
            </div>

            <p style={{ display: "flex", gap: "var(--space-2)", alignItems: "flex-start", margin: "var(--space-4) 0 0", fontSize: "var(--size-meta)", color: "var(--ink-60)", lineHeight: 1.45 }}>
              <Icon name="shield-check" size={19} />
              Your card details are entered only on the payment step.
            </p>
          </aside>
        </div>
      </main>
    </div>
  );
}
