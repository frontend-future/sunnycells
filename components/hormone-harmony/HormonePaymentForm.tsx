"use client";

import { useState } from "react";
import { Icon } from "@/components/core/Icon";
import { brandOf, cvcOk, expiryOk, formatCardNumber, formatExpiry, luhnOk } from "@/lib/quiz/card";
import { CardBrandMark } from "@/components/quiz/CardBrandMark";
import styles from "./hormone-commerce.module.css";

type Phase = "idle" | "working" | "failed";

function PaymentField({ label, value, onChange, error, autoComplete, inputMode, placeholder, suffix }: {
  label: string; value: string; onChange: (value: string) => void; error?: string;
  autoComplete: string; inputMode?: "numeric"; placeholder?: string; suffix?: React.ReactNode;
}) {
  const id = `hh-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <label className={styles.field} htmlFor={id}>
      <span>{label}</span>
      <span className={styles.inputShell}>
        <input id={id} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} inputMode={inputMode} placeholder={placeholder} aria-invalid={error ? true : undefined} />
        {suffix ? <span className={styles.fieldSuffix}>{suffix}</span> : null}
      </span>
      {error ? <small className={styles.fieldError}>{error}</small> : null}
    </label>
  );
}

export function HormonePaymentForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const brand = brandOf(number);

  const submit = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Enter the name printed on the card.";
    if (!luhnOk(number)) next.number = "Check the card number. A digit looks wrong.";
    if (!expiryOk(expiry)) next.expiry = "Check the expiry date.";
    if (!cvcOk(cvc, brand)) next.cvc = brand === "amex" ? "Enter the 4-digit Amex security code." : "Enter the 3-digit security code.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setPhase("working");
    setTimeout(() => setPhase("failed"), 1800);
  };

  if (phase === "failed") {
    return (
      <div className={styles.paymentResult} role="alert">
        <span><Icon name="x" size={28} /></span>
        <h3>Back in stock soon</h3>
        <p>This size sold out while you were checking out. Your card has not been charged. We will email you when it returns.</p>
        <button type="button" onClick={() => setPhase("idle")}>Try again</button>
      </div>
    );
  }

  const working = phase === "working";
  return (
    <form className={styles.paymentForm} noValidate onSubmit={(event) => { event.preventDefault(); submit(); }}>
      <div className={styles.paymentHeader}><span><Icon name="shield-check" size={21} />Credit or debit card</span><small>Encrypted entry</small></div>
      <PaymentField label="Name on card" value={name} onChange={(value) => { setName(value); setErrors((current) => ({ ...current, name: "" })); }} error={errors.name} autoComplete="cc-name" placeholder="Dana Reyes" />
      <PaymentField label="Card number" value={number} onChange={(value) => { setNumber(formatCardNumber(value)); setErrors((current) => ({ ...current, number: "" })); }} error={errors.number} autoComplete="cc-number" inputMode="numeric" placeholder="1234 1234 1234 1234" suffix={brand ? <CardBrandMark brand={brand} height={26} /> : undefined} />
      <div className={styles.fieldPair}>
        <PaymentField label="Expiry" value={expiry} onChange={(value) => { setExpiry(formatExpiry(value)); setErrors((current) => ({ ...current, expiry: "" })); }} error={errors.expiry} autoComplete="cc-exp" inputMode="numeric" placeholder="MM / YY" />
        <PaymentField label={brand === "amex" ? "Security code (4 digits)" : "Security code"} value={cvc} onChange={(value) => { setCvc((value.match(/\d/g) ?? []).join("").slice(0, 4)); setErrors((current) => ({ ...current, cvc: "" })); }} error={errors.cvc} autoComplete="cc-csc" inputMode="numeric" placeholder={brand === "amex" ? "1234" : "123"} />
      </div>
      <button className={styles.primaryButton} type="submit" disabled={working}>{working ? "Contacting your bank" : "Submit secure payment"}<Icon name="shield-check" size={20} /></button>
      <p className={styles.prototypeNote}>Payment is in preview mode. Card details remain in this browser and are not sent or stored.</p>
    </form>
  );
}
