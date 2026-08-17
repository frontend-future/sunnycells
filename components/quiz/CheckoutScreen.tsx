"use client";

import { useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { OfferFlag } from "@/components/core/OfferFlag";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { dietQuiz } from "@/lib/quiz/diet";
import { useAnswers } from "@/lib/quiz/store";
import { firstOrderPrice } from "@/lib/price";
import { ResultsShell, ResultsHeading } from "./ResultsShell";
import { StickyCta } from "./StickyCta";

const CADENCE: Record<string, string> = {
  m1: "Every month",
  m2: "Every two months",
  m3: "Every three months",
};

const REQUIRED = [
  { key: "name", label: "Full name", autoComplete: "name", missing: "We need a name to put on the parcel." },
  { key: "line1", label: "Address", autoComplete: "address-line1", missing: "We need a street address to deliver to." },
  { key: "city", label: "City", autoComplete: "address-level2", missing: "We need a city." },
  { key: "postcode", label: "Postcode", autoComplete: "postal-code", missing: "We need a postcode so the carrier can route it." },
] as const;

export function CheckoutScreen() {
  const { answers, ready } = useAnswers(dietQuiz.id);
  const [fields, setFields] = useState<Record<string, string>>({ country: "United States" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const price = Number(answers.planPrice) || 39;
  const first = Number(answers.planFirstPrice) || firstOrderPrice(price);
  const cadence = CADENCE[answers.plan] ?? CADENCE.m2;

  const set = (key: string, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const submit = () => {
    const next: Record<string, string> = {};
    for (const f of REQUIRED) if (!fields[f.key]?.trim()) next[f.key] = f.missing;
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  };

  return (
    <ResultsShell>
      <ResultsHeading eyebrow="Last step">Where should it go?</ResultsHeading>

      <div
        style={{
          padding: "var(--space-5)",
          background: "var(--surface-sunk)",
          border: "1px solid var(--border-hairline)",
          borderRadius: "var(--radius-card)",
          marginBottom: "var(--space-8)",
        }}
      >
        <OfferFlag />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-4)", marginTop: "var(--space-4)" }}>
          <div>
            <div style={{ fontSize: "var(--size-body)", fontWeight: 800 }}>SC-21 Metabolic Morning Blend</div>
            <div style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>
              {ready ? cadence : " "} · 30 servings a pouch
            </div>
          </div>
          <div style={{ textAlign: "right", flex: "none" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 32, letterSpacing: "-0.02em" }}>
              ${first}
            </div>
            <div style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>today</div>
          </div>
        </div>
        <div style={{ marginTop: "var(--space-3)", fontSize: "var(--size-body)", fontWeight: 600, color: "var(--ink-80)" }}>
          Then ${price} per month, and you can change it any time.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
          {([["truck", "Free shipping, always"], ["repeat", "Skip, change, or cancel anytime"], ["shield-check", "Thirty-day returns, opened or not"]] as const).map(
            ([icon, text]) => (
              <span key={text} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", fontSize: "var(--size-meta)", fontWeight: 600 }}>
                <Icon name={icon} size={20} />
                {text}
              </span>
            ),
          )}
        </div>
      </div>

      {/* The submit button lives outside the form and reaches it with form="...".
          A sticky bar can only pin within its containing block, and this form starts
          625px down the page, so a bar inside it could not reach the viewport bottom
          until the user had already scrolled. */}
      <form
        id="shipping"
        onSubmit={(e) => { e.preventDefault(); submit(); }}
        style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}
      >
        {REQUIRED.slice(0, 2).map((f) => (
          <Input
            key={f.key}
            label={f.label}
            autoComplete={f.autoComplete}
            value={fields[f.key] || ""}
            error={errors[f.key] || undefined}
            onChange={(e) => set(f.key, e.target.value)}
          />
        ))}
        <Input
          label="Apartment, suite, or floor"
          hint="Optional."
          autoComplete="address-line2"
          value={fields.line2 || ""}
          onChange={(e) => set("line2", e.target.value)}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
          {REQUIRED.slice(2).map((f) => (
            <Input
              key={f.key}
              label={f.label}
              autoComplete={f.autoComplete}
              value={fields[f.key] || ""}
              error={errors[f.key] || undefined}
              onChange={(e) => set(f.key, e.target.value)}
            />
          ))}
        </div>
        <Select
          label="Country"
          value={fields.country}
          onChange={(e) => set("country", e.target.value)}
          options={["United States", "Canada", "United Kingdom", "Australia"]}
        />

      </form>

      {submitted ? (
        <div
          style={{
            marginTop: "var(--space-8)",
            padding: "var(--space-5)",
            border: "2px solid var(--ink)",
            borderRadius: "var(--radius-card)",
          }}
        >
          <div style={{ fontSize: "var(--size-body)", fontWeight: 800 }}>Payment is not wired up yet</div>
          <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--size-meta)", lineHeight: 1.55, color: "var(--ink-80)" }}>
            The shipping details validated and this is where the payment provider takes
            over. Card fields are deliberately not built here: a real subscription charge
            belongs in a hosted checkout that handles PCI scope, 3D Secure, and the
            recurring billing schedule. Wire that up, then point this button at it.
          </p>
        </div>
      ) : null}

      <StickyCta>
        <Button size="lg" fullWidth type="submit" form="shipping" iconRight="arrow-right">
          Continue to payment
        </Button>
      </StickyCta>
    </ResultsShell>
  );
}
