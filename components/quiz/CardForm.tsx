"use client";

import { useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { Input } from "@/components/forms/Input";
import { brandOf, cvcOk, expiryOk, formatCardNumber, formatExpiry, luhnOk } from "@/lib/quiz/card";
import { CardBrandMark } from "./CardBrandMark";

/**
 * PROTOTYPE CARD FIELDS. THESE MUST NOT SHIP COLLECTING A REAL CARD.
 *
 * The number and CVC live in component state and are never written to storage, sent
 * anywhere, or included in any payload, because nothing here is PCI compliant. A real
 * charge belongs in fields hosted by the payment provider, Stripe's Payment Element or
 * the equivalent, so the card data never touches this origin at all. Swap the three
 * inputs below for the provider's iframe and keep the layout.
 *
 * Submitting always ends in the out-of-stock state: there is no provider to call.
 */

type Phase = "idle" | "working" | "failed";

function Spinner() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        border: "3px solid var(--ink-20)",
        borderTopColor: "var(--ink)",
        display: "inline-block",
        animation: "sc-spin 700ms linear infinite",
      }}
    />
  );
}

export function CardForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("idle");

  const brand = brandOf(number);

  const submit = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "We need the name printed on the card.";
    if (!luhnOk(number)) next.number = "Check the card number, a digit looks wrong.";
    if (!expiryOk(expiry)) next.expiry = "Check the expiry date.";
    if (!cvcOk(cvc, brand)) next.cvc = brand === "amex" ? "Amex security codes are 4 digits." : "The security code is 3 digits.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setPhase("working");
    /* Stands in for the provider round trip. There is no provider, so it always
       lands on the same place. */
    setTimeout(() => setPhase("failed"), 1800);
  };

  if (phase === "failed") {
    return (
      <div
        role="alert"
        style={{
          border: "2px solid var(--ink)",
          borderRadius: "var(--radius-card)",
          padding: "var(--space-6)",
          textAlign: "center",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--status-error-tint)",
            color: "var(--status-error)",
          }}
        >
          <Icon name="x" size={28} strokeWidth={3} />
        </span>
        <h3 style={{ margin: "var(--space-4) 0 var(--space-2)", fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
          Back in stock soon
        </h3>
        <p style={{ margin: "0 auto", maxWidth: 420, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--ink-80)" }}>
          We could not complete your order because this size sold out while you were
          checking out. Your card has not been charged. We will email you the day it is
          back.
        </p>
        <div style={{ marginTop: "var(--space-5)" }}>
          <Button variant="outline" onClick={() => setPhase("idle")}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  const working = phase === "working";

  return (
    <div style={{ border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          padding: "var(--space-4) var(--space-5)",
          borderBottom: "1px solid var(--border-hairline)",
          background: "var(--surface-sunk)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", fontSize: "var(--size-body)", fontWeight: 800 }}>
          <Icon name="check" size={20} />
          Credit or debit card
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>
          <Icon name="shield-check" size={18} />
          Encrypted
        </span>
      </div>

      <form
        noValidate
        onSubmit={(e) => { e.preventDefault(); submit(); }}
        style={{ padding: "var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}
      >
        <Input
          label="Name on card"
          autoComplete="cc-name"
          placeholder="Dana Reyes"
          value={name}
          error={errors.name || undefined}
          onChange={(e) => { setName(e.target.value); setErrors((x) => ({ ...x, name: "" })); }}
        />

        {/* Handed to the Input's own suffix slot rather than positioned over the
            field: that slot is already pinned to the right edge and centred against
            the input, so it cannot drift when the label or error text changes height. */}
        <Input
          label="Card number"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 1234 1234 1234"
          suffix={brand ? <CardBrandMark brand={brand} height={28} /> : undefined}
          value={number}
          error={errors.number || undefined}
          onChange={(e) => { setNumber(formatCardNumber(e.target.value)); setErrors((x) => ({ ...x, number: "" })); }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
          <Input
            label="Expiry"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM / YY"
            value={expiry}
            error={errors.expiry || undefined}
            onChange={(e) => { setExpiry(formatExpiry(e.target.value)); setErrors((x) => ({ ...x, expiry: "" })); }}
          />
          <Input
            label={brand === "amex" ? "Security code (4 digits)" : "Security code"}
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder={brand === "amex" ? "1234" : "123"}
            value={cvc}
            error={errors.cvc || undefined}
            onChange={(e) => { setCvc((e.target.value.match(/\d/g) ?? []).join("").slice(0, 4)); setErrors((x) => ({ ...x, cvc: "" })); }}
          />
        </div>

        <Button size="lg" fullWidth variant="accent" type="submit" disabled={working} iconLeft={working ? undefined : "shield-check"}>
          {working ? "Working" : "Submit secure payment"}
        </Button>

        {working ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-3)", fontSize: "var(--size-meta)", color: "var(--ink-60)" }} aria-live="polite">
            <Spinner />
            Contacting your bank
          </div>
        ) : null}
      </form>
    </div>
  );
}
