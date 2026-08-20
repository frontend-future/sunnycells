"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon, type IconName } from "@/components/core/Icon";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { Wordmark } from "@/components/core/Wordmark";
import { dietQuiz } from "@/lib/quiz/diet";
import { useAnswers } from "@/lib/quiz/store";
import { BONUSES, buildOrder, US_STATES } from "@/lib/quiz/order";
import { trackMetaEvent } from "@/lib/meta";
import { planById } from "@/lib/quiz/plans";
import { formatPhone, phoneOk } from "@/lib/quiz/phone";
import { CardForm } from "./CardForm";

const STEPS = ["Information", "Payments", "Receipt"];

type Field = { key: string; label: string; auto: string; half?: boolean; missing: string };

const TOP_FIELDS: Field[] = [
  { key: "firstName", label: "First name", auto: "given-name", half: true, missing: "We need a first name for the parcel." },
  { key: "lastName", label: "Last name", auto: "family-name", half: true, missing: "We need a last name for the parcel." },
  { key: "line1", label: "Address line 1", auto: "address-line1", missing: "We need a street address to deliver to." },
];

const PLACE_FIELDS: Field[] = [
  { key: "city", label: "Town or city", auto: "address-level2", half: true, missing: "We need a town or city." },
  { key: "zip", label: "Zip code", auto: "postal-code", half: true, missing: "We need a zip code so the carrier can route it." },
];

const FIELDS = [...TOP_FIELDS, ...PLACE_FIELDS];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;



const money = (n: number) => `$${n}`;

const BONUS_ICON: Record<string, IconName> = Object.fromEntries(
  BONUSES.map((b) => [b.id, b.icon as IconName]),
);

export function CheckoutScreen({
  backHref = "/quiz/diet/results/plans",
  continueLabel = "Continue",
  optimizedImages = false,
}: {
  backHref?: string;
  continueLabel?: string;
  optimizedImages?: boolean;
}) {
  const { answers, ready } = useAnswers(dietQuiz.id);
  const order = buildOrder(answers);
  const plan = planById(answers.plan);

  const [f, setF] = useState<Record<string, string>>({ phone: "+1" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  /* "information" collects shipping, "payment" collapses it and takes the card. */
  const [phase, setPhase] = useState<"information" | "payment">("information");
  const [openSummary, setOpenSummary] = useState(false);

  const set = (k: string, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  /**
   * Tells the team someone reached payment, then gets out of the way. Never awaited,
   * never allowed to throw.
   *
   * Only ever handed shipping and contact fields. The card number, expiry and CVC
   * live inside CardForm and are never lifted into this component, so there is no
   * payment data here to leak into a payload.
   */
  const notifyAttempt = (shipping: Record<string, string>) => {
    fetch("/api/notify-purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shipping, plan: plan.label, total: order.total }),
    })
      .then((res) => {
        if (!res.ok) console.error("[checkout] notify-purchase returned", res.status);
      })
      .catch((err) => console.error("[checkout] notify-purchase failed", err));
  };

  const submit = () => {
    const next: Record<string, string> = {};
    for (const x of FIELDS) if (!f[x.key]?.trim()) next[x.key] = x.missing;
    if (!f.state?.trim()) next.state = "Choose a state so we can work out delivery.";
    const email = (f.email ?? answers.email ?? "").trim();
    if (!email) next.email = "We need an email address to send your receipt.";
    else if (!EMAIL.test(email)) next.email = "That address is missing an @ or a domain.";
    if (!phoneOk(f.phone ?? "")) next.phone = "We need a full 10 digit phone number the carrier can call.";
    setErrors(next);
    if (Object.keys(next).length) return;

    notifyAttempt({
      email: (f.email ?? answers.email ?? "").trim(),
      firstName: f.firstName ?? "",
      lastName: f.lastName ?? "",
      line1: f.line1 ?? "",
      line2: f.line2 ?? "",
      city: f.city ?? "",
      state: f.state ?? "",
      zip: f.zip ?? "",
      phone: f.phone ?? "",
    });
    /* Both events fire here, on the same submit that sends the attempt email.
       AddPaymentInfo is the literal truth about what happened. Purchase is
       reported at the same moment by decision, so the campaign optimises on the
       deepest signal this funnel produces.

       Worth knowing what that means: no card is charged, so the value on the
       Purchase is money that was not collected, and ROAS in the dashboard counts
       intent rather than revenue. */
    const identity = {
      email: (f.email ?? answers.email ?? "").trim(),
      phone: f.phone ?? "",
      firstName: f.firstName ?? "",
      lastName: f.lastName ?? "",
      city: f.city ?? "",
      state: f.state ?? "",
      zip: f.zip ?? "",
      country: "US",
    };
    const basket = {
      currency: "USD",
      value: order.total,
      content_ids: [plan.id],
      content_type: "product",
      content_name: plan.label,
    };
    trackMetaEvent("AddPaymentInfo", basket, identity);
    trackMetaEvent("Purchase", basket, identity);
    setPhase("payment");
  };

  return (
    <div style={{ minHeight: "100dvh", background: "var(--surface-page)" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "var(--space-4) var(--page-gutter-mobile)",
          borderBottom: "1px solid var(--border-hairline)",
        }}
      >
        <Wordmark size={22} />
      </header>

      <div
        className="sc-checkout"
        style={{ maxWidth: 1000, margin: "0 auto", padding: "0 var(--page-gutter-mobile) var(--space-16)" }}
      >
        {/* Summary. A rail on desktop, a collapsible panel above the form on a phone,
            with the total always visible so it never hides what is being charged. */}
        <aside
          className="sc-checkout-summary"
          style={{
            background: "var(--surface-sunk)",
            border: "1px solid var(--border-hairline)",
            borderRadius: "var(--radius-card)",
            padding: "var(--space-5)",
            margin: "var(--space-6) 0",
          }}
        >
          <h2
            className="sc-summary-heading"
            style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}
          >
            Order summary
          </h2>

          <button
            type="button"
            className="sc-summary-toggle"
            onClick={() => setOpenSummary((o) => !o)}
            aria-expanded={openSummary}
            style={{
              appearance: "none",
              background: "transparent",
              border: 0,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-4)",
              padding: 0,
              cursor: "pointer",
              minHeight: "var(--tap-min)",
            }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
              Order summary
            </span>
            <span aria-hidden="true" style={{ display: "flex", transform: openSummary ? "rotate(180deg)" : "none", transition: "transform var(--duration-fast) var(--ease-standard)" }}>
              <Icon name="chevron-down" size={24} />
            </span>
          </button>

          <div
            className="sc-total-top"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "var(--space-4)",
              paddingTop: "var(--space-4)",
              marginTop: "var(--space-4)",
              borderTop: "1px solid var(--border-hairline)",
            }}
          >
            <span style={{ fontSize: "var(--size-body)", fontWeight: 800 }}>Total</span>
            <span style={{ textAlign: "right" }}>
              <span style={{ display: "block", fontSize: "var(--size-meta)", color: "var(--ink-60)", textDecoration: "line-through" }}>
                {money(order.strikeTotal)}
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--size-h4)", letterSpacing: "-0.02em" }}>
                {ready ? money(order.total) : " "}
              </span>
            </span>
          </div>

          <div className="sc-summary-body" style={{ display: openSummary ? "block" : "none" }}>
            <ul style={{ margin: "var(--space-5) 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {order.lines.map((l) => (
                <li key={l.id} style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
                  <span
                    style={{
                      flex: "none",
                      width: 56,
                      height: 56,
                      borderRadius: "var(--radius-sm)",
                      background: "var(--white)",
                      border: "1px solid var(--border-hairline)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {l.image ? (
                      <Image
                        src={optimizedImages && l.id === "product" ? l.image.replace(/\.png$/, ".webp") : l.image}
                        alt=""
                        width={240}
                        height={240}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <Icon name={BONUS_ICON[l.id]} size={24} />
                    )}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: "var(--size-meta)", fontWeight: 700, lineHeight: 1.3 }}>{l.name}</span>
                    <span style={{ display: "block", fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>{l.note}</span>
                  </span>
                  <span style={{ flex: "none", textAlign: "right" }}>
                    {/* Struck compare-at prices take --ink-60, not red. Red is the error
                        value in this system and a was-price is not an error. */}
                    <span style={{ display: "block", fontSize: "var(--size-meta)", color: "var(--ink-60)", textDecoration: "line-through" }}>
                      {money(l.was)}
                    </span>
                    <span style={{ fontSize: "var(--size-meta)", fontWeight: 800, color: l.now === null ? "var(--status-success)" : "var(--ink)" }}>
                      {l.now === null ? "Free" : money(l.now)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "var(--space-5)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--border-hairline)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              {[
                [`Discount -${order.discountPct}%`, order.discount],
                ["Limited time offers", order.bonusTotal],
              ].map(([label, amount]) => (
                <div key={String(label)} style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--size-meta)" }}>
                  <span>{label}</span>
                  <span style={{ fontWeight: 700, color: "var(--status-success)" }}>-{money(Number(amount))}</span>
                </div>
              ))}
            </div>

            <div
              className="sc-total-bottom"
              style={{
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "var(--space-4)",
                marginTop: "var(--space-5)",
                paddingTop: "var(--space-4)",
                borderTop: "1px solid var(--border-hairline)",
              }}
            >
              <span style={{ fontSize: "var(--size-body)", fontWeight: 800 }}>Total</span>
              <span style={{ textAlign: "right" }}>
                <span style={{ display: "block", fontSize: "var(--size-meta)", color: "var(--ink-60)", textDecoration: "line-through" }}>
                  {money(order.strikeTotal)}
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--size-h4)", letterSpacing: "-0.02em" }}>
                  {ready ? money(order.total) : "\u00a0"}
                </span>
              </span>
            </div>
          </div>
        </aside>

        <main style={{ paddingTop: "var(--space-6)" }}>
          <Link
            href={backHref}
            style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", minHeight: "var(--tap-min)", color: "var(--ink)", fontSize: "var(--size-body)", fontWeight: 600, textDecoration: "none" }}
          >
            <Icon name="chevron-left" size={22} />
            Back
          </Link>

          <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-2)", margin: "var(--space-2) 0 var(--space-5)", padding: 0, listStyle: "none" }}>
            {STEPS.map((s, i) => {
              const active = i === (phase === "payment" ? 1 : 0);
              return (
                <li key={s} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                  {i > 0 ? (
                    <span aria-hidden="true" style={{ display: "flex", color: "var(--ink-40)" }}>
                      <Icon name="chevron-right" size={16} />
                    </span>
                  ) : null}
                  <span
                    aria-current={active ? "step" : undefined}
                    style={{ fontSize: "var(--size-meta)", fontWeight: active ? 800 : 600, color: active ? "var(--ink)" : "var(--ink-60)" }}
                  >
                    {s}
                  </span>
                </li>
              );
            })}
          </ol>

          {phase === "payment" ? (
            <button
              type="button"
              onClick={() => setPhase("information")}
              aria-expanded={false}
              style={{
                appearance: "none",
                background: "transparent",
                border: 0,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--space-4)",
                padding: "0 0 var(--space-5)",
                minHeight: "var(--tap-min)",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-h3)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
                Shipping details
              </span>
              <span aria-hidden="true" style={{ display: "flex", flex: "none" }}>
                <Icon name="chevron-down" size={26} />
              </span>
            </button>
          ) : (
            <h1 style={{ margin: "0 0 var(--space-6)", fontFamily: "var(--font-display)", fontSize: "var(--size-h3)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
              Shipping details
            </h1>
          )}

          <form noValidate hidden={phase === "payment"} onSubmit={(e) => { e.preventDefault(); submit(); }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
            {TOP_FIELDS.map((x) => (
              <div key={x.key} style={{ gridColumn: x.half ? "span 1" : "span 2" }}>
                <Input
                  label={x.label}
                  autoComplete={x.auto}
                  value={f[x.key] || ""}
                  error={errors[x.key] || undefined}
                  onChange={(e) => set(x.key, e.target.value)}
                />
              </div>
            ))}

            <div style={{ gridColumn: "span 2" }}>
              <Input
                label="Address line 2"
                hint="Optional."
                autoComplete="address-line2"
                value={f.line2 || ""}
                onChange={(e) => set("line2", e.target.value)}
              />
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <Input label="Country" value="United States (free shipping)" readOnly disabled />
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <Select
                label="State"
                value={f.state || ""}
                onChange={(e) => set("state", e.target.value)}
                options={[{ value: "", label: "Choose a state" }, ...US_STATES.map((s) => ({ value: s, label: s }))]}
              />
              {errors.state ? (
                <div style={{ marginTop: "var(--space-2)", fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--status-error)" }}>
                  {errors.state}
                </div>
              ) : null}
            </div>

            {PLACE_FIELDS.map((x) => (
              <div key={x.key} style={{ gridColumn: x.half ? "span 1" : "span 2" }}>
                <Input
                  label={x.label}
                  autoComplete={x.auto}
                  value={f[x.key] || ""}
                  error={errors[x.key] || undefined}
                  onChange={(e) => set(x.key, e.target.value)}
                />
              </div>
            ))}

            <div style={{ gridColumn: "span 2" }}>
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                value={f.email ?? answers.email ?? ""}
                error={errors.email || undefined}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <Input
                label="Phone"
                type="tel"
                autoComplete="tel"
                value={f.phone || ""}
                error={errors.phone || undefined}
                onChange={(e) => set("phone", formatPhone(e.target.value))}
              />
            </div>

            <div style={{ gridColumn: "span 2", marginTop: "var(--space-2)" }}>
              <Button size="lg" fullWidth variant="accent" type="submit">
                {continueLabel}
              </Button>
            </div>
          </form>

          {phase === "payment" ? (
            <section>
              <h2 style={{ margin: "0 0 var(--space-2)", fontFamily: "var(--font-display)", fontSize: "var(--size-h3)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
                Payment
              </h2>
              <p style={{ margin: "0 0 var(--space-5)", fontSize: "var(--size-body)", color: "var(--ink-60)" }}>
                All transactions are secure and encrypted.
              </p>
              <CardForm />
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
