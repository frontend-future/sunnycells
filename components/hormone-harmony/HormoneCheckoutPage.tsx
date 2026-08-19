"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Icon } from "@/components/core/Icon";
import { dietQuiz } from "@/lib/quiz/diet";
import { buildOrder, US_STATES } from "@/lib/quiz/order";
import { formatPhone, phoneOk } from "@/lib/quiz/phone";
import { planById } from "@/lib/quiz/plans";
import { useAnswers } from "@/lib/quiz/store";
import { HormoneCommerceHeader } from "./HormoneCommerceHeader";
import { HormonePaymentForm } from "./HormonePaymentForm";
import styles from "./hormone-commerce.module.css";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const money = (value: number) => `$${value}`;

type TextFieldProps = {
  label: string; name: string; value: string; onChange: (value: string) => void; error?: string;
  autoComplete?: string; type?: string; inputMode?: "tel"; hint?: string;
};

function TextField({ label, name, value, onChange, error, autoComplete, type = "text", inputMode, hint }: TextFieldProps) {
  return (
    <label className={styles.field} htmlFor={`checkout-${name}`}>
      <span>{label}</span>
      <input id={`checkout-${name}`} name={name} type={type} inputMode={inputMode} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} aria-invalid={error ? true : undefined} />
      {error ? <small className={styles.fieldError}>{error}</small> : hint ? <small>{hint}</small> : null}
    </label>
  );
}

export function HormoneCheckoutPage() {
  const { answers, ready } = useAnswers(dietQuiz.id);
  const order = buildOrder(answers);
  const plan = planById(answers.plan);
  const [fields, setFields] = useState<Record<string, string>>({ phone: "+1" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"shipping" | "payment">("shipping");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const errorSummary = useRef<HTMLDivElement>(null);

  const set = (name: string, value: string) => {
    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const submitShipping = () => {
    const next: Record<string, string> = {};
    if (!fields.firstName?.trim()) next.firstName = "Enter a first name for the parcel.";
    if (!fields.lastName?.trim()) next.lastName = "Enter a last name for the parcel.";
    if (!fields.line1?.trim()) next.line1 = "Enter the street address for delivery.";
    if (!fields.city?.trim()) next.city = "Enter a town or city.";
    if (!fields.zip?.trim()) next.zip = "Enter a zip code for the carrier.";
    if (!fields.state?.trim()) next.state = "Choose a state for delivery.";
    const email = (fields.email ?? answers.email ?? "").trim();
    if (!email) next.email = "Enter an email address for the receipt.";
    else if (!EMAIL.test(email)) next.email = "Enter a complete email address.";
    if (!phoneOk(fields.phone ?? "")) next.phone = "Enter a complete 10-digit phone number.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }
    setPhase("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.page}>
      <HormoneCommerceHeader step={phase} />
      <main className={styles.checkoutMain}>
        <section className={styles.checkoutFormColumn}>
          <Link className={styles.backLink} href="/hormone-harmony/cart"><Icon name="arrow-left" size={20} />Back to cart</Link>
          <div className={styles.checkoutHeading}>
            <p className={styles.microLabel}>{phase === "shipping" ? "Delivery details" : "Final step"}</p>
            <h1>{phase === "shipping" ? "Where should we send it?" : "Review, then pay."}</h1>
            <p>{phase === "shipping" ? "Free shipping is included. Enter the address where someone can receive the parcel." : "Your shipping details are saved for this checkout. Enter payment below when you are ready."}</p>
          </div>

          <button className={styles.mobileSummaryToggle} type="button" onClick={() => setSummaryOpen((current) => !current)} aria-expanded={summaryOpen} aria-controls="mobile-order-summary">
            <span><Icon name="shopping-bag" size={20} />Order summary</span><strong>{ready ? money(order.total) : "\u00a0"}</strong><Icon name="chevron-down" size={20} />
          </button>
          <div id="mobile-order-summary" className={`${styles.mobileSummary} ${summaryOpen ? styles.mobileSummaryOpen : ""}`}>
            <Image src={plan.image.replace(/\.png$/, ".webp")} alt={`${plan.label} of Metabolic Morning Blend`} width={400} height={300} />
            <div><strong>{plan.label}</strong><span>{order.lines[0].note}</span></div>
          </div>

          {phase === "shipping" ? (
            <form className={styles.shippingForm} noValidate onSubmit={(event) => { event.preventDefault(); submitShipping(); }}>
              {Object.values(errors).some(Boolean) ? <div className={styles.errorSummary} ref={errorSummary} tabIndex={-1} role="alert"><strong>Check the highlighted fields.</strong><span>We need a few details before continuing.</span></div> : null}
              <div className={styles.fieldPair}>
                <TextField label="First name" name="firstName" autoComplete="given-name" value={fields.firstName || ""} error={errors.firstName} onChange={(value) => set("firstName", value)} />
                <TextField label="Last name" name="lastName" autoComplete="family-name" value={fields.lastName || ""} error={errors.lastName} onChange={(value) => set("lastName", value)} />
              </div>
              <TextField label="Street address" name="line1" autoComplete="address-line1" value={fields.line1 || ""} error={errors.line1} onChange={(value) => set("line1", value)} />
              <TextField label="Apartment, suite, etc." name="line2" autoComplete="address-line2" value={fields.line2 || ""} hint="Optional" onChange={(value) => set("line2", value)} />
              <div className={styles.countryField}><span>Country</span><strong>United States</strong><small>Free shipping</small></div>
              <label className={styles.field} htmlFor="checkout-state"><span>State</span><span className={styles.selectShell}><select id="checkout-state" value={fields.state || ""} onChange={(event) => set("state", event.target.value)} aria-invalid={errors.state ? true : undefined}><option value="">Choose a state</option>{US_STATES.map((state) => <option key={state}>{state}</option>)}</select><Icon name="chevron-down" size={22} /></span>{errors.state ? <small className={styles.fieldError}>{errors.state}</small> : null}</label>
              <div className={styles.fieldPair}>
                <TextField label="Town or city" name="city" autoComplete="address-level2" value={fields.city || ""} error={errors.city} onChange={(value) => set("city", value)} />
                <TextField label="Zip code" name="zip" autoComplete="postal-code" value={fields.zip || ""} error={errors.zip} onChange={(value) => set("zip", value)} />
              </div>
              <TextField label="Email for receipt" name="email" type="email" autoComplete="email" value={fields.email ?? answers.email ?? ""} error={errors.email} onChange={(value) => set("email", value)} />
              <TextField label="Phone for delivery updates" name="phone" inputMode="tel" autoComplete="tel" value={fields.phone || ""} error={errors.phone} onChange={(value) => set("phone", formatPhone(value))} />
              <button className={styles.primaryButton} type="submit">Continue to payment<Icon name="arrow-right" size={21} /></button>
              <p className={styles.formAssurance}><Icon name="shield-check" size={18} />Your information is used only to prepare this order.</p>
            </form>
          ) : (
            <section className={styles.paymentSection}>
              <button className={styles.savedAddress} type="button" onClick={() => setPhase("shipping")}><span><small>Shipping to</small><strong>{fields.firstName} {fields.lastName}</strong><span>{fields.line1}, {fields.city}, {fields.state} {fields.zip}</span></span><b>Edit</b></button>
              <HormonePaymentForm />
            </section>
          )}
        </section>

        <aside className={styles.checkoutRail} aria-labelledby="checkout-summary-title">
          <div className={styles.railProduct}>
            <span>{plan.months * 30} mornings</span>
            <Image src={plan.image.replace(/\.png$/, ".webp")} alt={`${plan.label} of SUNNYCELLS Metabolic Morning Blend`} width={900} height={700} priority sizes="(max-width: 900px) 0px, 38vw" />
          </div>
          <div className={styles.railDetails}>
            <p className={styles.microLabel}>{plan.label}</p>
            <h2 id="checkout-summary-title">Metabolic Morning Blend</h2>
            <p>{order.lines[0].note}</p>
            <div className={styles.summaryRows}>
              <div><span>Supply</span><span>{money(order.listTotal)}</span></div>
              <div><span>Plan savings</span><strong>-{money(order.discount)}</strong></div>
              <div><span>Shipping</span><strong>Free</strong></div>
            </div>
            <div className={styles.totalRow}><span>Due today</span><div><s>{money(order.strikeTotal)}</s><strong>{ready ? money(order.total) : "\u00a0"}</strong></div></div>
            <ul className={styles.railPromises}><li><Icon name="shield-check" size={19} />60-day returns</li><li><Icon name="repeat" size={19} />Skip or cancel anytime</li></ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
