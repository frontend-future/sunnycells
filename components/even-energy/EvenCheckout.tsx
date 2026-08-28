"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { Wordmark } from "@/components/core/Wordmark";
import { CardForm } from "@/components/quiz/CardForm";
import { US_STATES } from "@/lib/quiz/order";
import { formatPhone, phoneOk } from "@/lib/quiz/phone";
import { useAnswers } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import { buildEvenOrder, CART_ID, PRODUCT, type EvenOrder } from "@/lib/products/even-energy";

/** What the checkout needs to know about whatever it is selling. */
export type CheckoutProduct = {
  name: string;
  cartId: string;
  buildOrder: (planId: string | undefined) => EvenOrder;
};

const EVEN: CheckoutProduct = { name: PRODUCT.name, cartId: CART_ID, buildOrder: buildEvenOrder };
import styles from "./even-energy.module.css";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Shipping and contact only. Card number and CVC live inside CardForm and are never
   lifted out of it, so nothing here can carry them.

   Called from the payment submit, not the shipping one. An "attempt" that fired when
   somebody merely reached the card form was reporting people who never entered a card
   at all, which is the opposite of what the word means. */
function notifyAttempt(shipping: Record<string, string>, plan: string, total: number) {
  fetch("/api/notify-purchase", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shipping, plan, total }),
  }).catch((err) => console.error("[even] notify-purchase failed", err));
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "tel" | "email";
};

/* The error is described, not labelled. Nesting it inside the <label> folded it into
   the field's accessible name, so the moment validation failed the field stopped
   being called "First name" and started being called "First name We need a first
   name for the label." */
function Field({ label, name, value, onChange, error, type = "text", autoComplete, inputMode }: FieldProps) {
  const id = `ck-${name}`;
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <small id={`${id}-error`} className={styles.fieldError}>
          {error}
        </small>
      )}
    </div>
  );
}

/**
 * `backHref` and `backLabel` let a funnel that arrives here from somewhere other than
 * the product page point the way it came. The quiz sends people back to its plans
 * screen, not to a product page they never saw.
 */
export function EvenCheckout({
  backHref = "/products/even-energy",
  backLabel,
  product = EVEN,
}: { backHref?: string; backLabel?: string; product?: CheckoutProduct } = {}) {
  const { answers, ready } = useAnswers(product.cartId);
  const order = product.buildOrder(answers.plan);
  const [f, setF] = useState<Record<string, string>>({ phone: "+1" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"shipping" | "payment">("shipping");
  /* Collapsed by default, which only has an effect on a phone: the toggle and the
     collapse are both display:none above 900px, where the rail is always open. */
  const [summaryOpen, setSummaryOpen] = useState(false);

  const set = (name: string, value: string) =>
    setF((c) => ({ ...c, [name]: name === "phone" ? formatPhone(value) : value }));

  /* Read when an event fires rather than captured once, because the two events now
     happen at different steps and the customer can go back and edit in between. */
  const identity = () => ({
    email: (f.email ?? "").trim(),
    phone: f.phone ?? "",
    firstName: f.firstName ?? "",
    lastName: f.lastName ?? "",
    city: f.city ?? "",
    state: f.state ?? "",
    zip: f.zip ?? "",
    country: "US",
  });

  const basket = () => ({
    currency: "USD",
    value: order.total,
    content_ids: [order.plan.id],
    content_type: "product",
    content_name: `${PRODUCT.name} ${order.plan.name}`,
  });

  const submit = () => {
    const next: Record<string, string> = {};
    if (!f.firstName?.trim()) next.firstName = "We need a first name for the label.";
    if (!f.lastName?.trim()) next.lastName = "We need a last name for the label.";
    if (!f.line1?.trim()) next.line1 = "We need a street address.";
    if (!f.city?.trim()) next.city = "We need a town or city.";
    if (!f.state?.trim()) next.state = "Choose a state.";
    if (!/^\d{5}$/.test(f.zip?.trim() ?? "")) next.zip = "A five digit zip code.";
    const email = (f.email ?? "").trim();
    if (!email) next.email = "We need an email for your receipt.";
    else if (!EMAIL.test(email)) next.email = "That address is missing an @ or a domain.";
    if (!phoneOk(f.phone ?? "")) next.phone = "We need a full 10 digit phone number.";
    setErrors(next);
    if (Object.keys(next).length) return;

    /* AddPaymentInfo stays here on purpose. Reaching the payment step is precisely
       what that event means, so this is the honest moment for it. */
    trackMetaEvent("AddPaymentInfo", basket(), identity());
    setPhase("payment");
  };

  /* Both the attempt email and Purchase wait for Submit secure payment, so each one
     describes a customer who filled in a card and asked to be charged. Firing either
     back on the shipping submit counted everyone who merely got that far, which
     inflates the signal the campaign optimises on and fills the inbox with people who
     never reached for a card. */
  const purchased = () => {
    notifyAttempt(
      { ...identity(), line1: f.line1 ?? "", line2: f.line2 ?? "" },
      order.plan.name,
      order.total,
    );
    trackMetaEvent("Purchase", basket(), identity());
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerInner}`}>
          <Link href={backHref} className={styles.backLink}>
            <Icon name="chevron-left" size={20} strokeWidth={2.5} />
            {backLabel ?? `Back to ${product.name}`}
          </Link>
          <Wordmark size={20} />
        </div>
      </header>

      <main className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.checkoutGrid}>
          <div>
            <h1 className={styles.h2}>Checkout</h1>

            {phase === "shipping" ? (
              <form
                id="even-shipping"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className={styles.form}
              >
                <div className={styles.fieldRow}>
                  <Field label="First name" name="firstName" value={f.firstName ?? ""} onChange={(v) => set("firstName", v)} error={errors.firstName} autoComplete="given-name" />
                  <Field label="Last name" name="lastName" value={f.lastName ?? ""} onChange={(v) => set("lastName", v)} error={errors.lastName} autoComplete="family-name" />
                </div>
                <Field label="Address line 1" name="line1" value={f.line1 ?? ""} onChange={(v) => set("line1", v)} error={errors.line1} autoComplete="address-line1" />
                <Field label="Address line 2" name="line2" value={f.line2 ?? ""} onChange={(v) => set("line2", v)} autoComplete="address-line2" />
                <div className={styles.fieldRow}>
                  <Field label="Town or city" name="city" value={f.city ?? ""} onChange={(v) => set("city", v)} error={errors.city} autoComplete="address-level2" />
                  <div className={styles.field}>
                    <label htmlFor="ck-state">State</label>
                    <select
                      id="ck-state"
                      name="state"
                      value={f.state ?? ""}
                      onChange={(e) => set("state", e.target.value)}
                      aria-invalid={errors.state ? true : undefined}
                      aria-describedby={errors.state ? "ck-state-error" : undefined}
                    >
                      <option value="">Choose</option>
                      {US_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && (
                      <small id="ck-state-error" className={styles.fieldError}>
                        {errors.state}
                      </small>
                    )}
                  </div>
                </div>
                <div className={styles.fieldRow}>
                  <Field label="Zip code" name="zip" value={f.zip ?? ""} onChange={(v) => set("zip", v)} error={errors.zip} autoComplete="postal-code" />
                  <Field label="Phone" name="phone" value={f.phone ?? ""} onChange={(v) => set("phone", v)} error={errors.phone} inputMode="tel" autoComplete="tel" />
                </div>
                <Field label="Email" name="email" value={f.email ?? ""} onChange={(v) => set("email", v)} error={errors.email} type="email" inputMode="email" autoComplete="email" />

                <Button type="submit" fullWidth variant="accent" size="lg">
                  Continue to payment
                </Button>
              </form>
            ) : (
              <div className={styles.form}>
                <div className={styles.shipDone}>
                  <div>
                    <span className={styles.label}>Shipping to</span>
                    <p className={styles.pillarCopy}>
                      {f.firstName} {f.lastName}, {f.line1}
                      {f.line2 ? `, ${f.line2}` : ""}, {f.city}, {f.state} {f.zip}
                    </p>
                  </div>
                  <button type="button" className={styles.editLink} onClick={() => setPhase("shipping")}>
                    Edit
                  </button>
                </div>
                <h2 className={styles.isTitle}>Payment</h2>
                <CardForm onSubmitted={purchased} />
              </div>
            )}
          </div>

          <aside className={styles.summary} aria-label="Order summary">
            <button
              type="button"
              className={styles.summaryToggle}
              onClick={() => setSummaryOpen((c) => !c)}
              aria-expanded={summaryOpen}
              aria-controls="even-summary-body"
            >
              <span>
                <Icon name="shopping-bag" size={20} strokeWidth={2.2} />
                Order summary
              </span>
              <strong>{ready ? `$${order.total}` : "\u00a0"}</strong>
              <Icon name="chevron-down" size={20} strokeWidth={2.5} className={summaryOpen ? styles.chevronUp : undefined} />
            </button>
            <h2 className={`${styles.isTitle} ${styles.summaryTitle}`}>Your order</h2>
            <div
              id="even-summary-body"
              className={`${styles.summaryBody} ${summaryOpen ? styles.summaryBodyOpen : ""}`}
            >
            {!ready ? (
              <p className={styles.pillarCopy}>Loading your cart.</p>
            ) : (
              <>
                {order.lines.map((l) => (
                  <div className={styles.lineItem} key={l.id}>
                    {l.image ? (
                      <Image src={l.image} alt="" aria-hidden="true" width={200} height={200} className={styles.lineShot} />
                    ) : (
                      <span className={styles.lineIcon} aria-hidden="true">
                        <Icon name="truck" size={20} strokeWidth={2.2} />
                      </span>
                    )}
                    <div className={styles.lineText}>
                      <span className={styles.lineName}>{l.name}</span>
                      <span className={styles.lineNote}>{l.note}</span>
                    </div>
                    <span className={styles.linePrice}>
                      {l.now === 0 ? "Free" : `$${l.now}`}
                      {l.was != null && l.now !== l.was && <s>${l.was}</s>}
                    </span>
                  </div>
                ))}

                <dl className={styles.totals}>
                  <div>
                    <dt>List price</dt>
                    <dd><s>${order.listTotal}</s></dd>
                  </div>
                  <div>
                    <dt>Your saving</dt>
                    <dd className={styles.saving}>&minus;${order.discount}</dd>
                  </div>
                  <div className={styles.totalRow}>
                    <dt>Total today</dt>
                    <dd>${order.total}</dd>
                  </div>
                </dl>

                <p className={styles.lineNote}>
                  {order.plan.sub}. Skip or cancel in two clicks, and a 30 day money back guarantee
                  either way.
                </p>
              </>
            )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
