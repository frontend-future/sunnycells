"use client";

import { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ExpressCheckoutElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/core/Button";
import { RATING } from "@/lib/products/dog-itch";
import { formatPrice } from "@/lib/price";
import { FZ_BRAND, FZ_PRODUCT_NAME } from "@/lib/quiz/fridayzoomiesOffer";
import { FIRST, IMG, LINES, PRICE } from "@/lib/quiz/fzOrder";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { useAnswers } from "@/lib/quiz/store";
import { AddressSuggest } from "./AddressSuggest";
import s from "./fzCheckoutV2.module.css";

/* Clone of FzCheckoutPage, blended with the old two step checkout: contact and shipping first,
   and the wallet buttons and card only appear once those pass a visible check. Nothing links
   here yet. */

const CHECKOUT = `${IMG}/checkout`;
const TRUST = [
  { icon: "icon-guarantee", title: "90-Day Money Back Guarantee", body: "Itching not improved within 90 days? Full refund." },
  { icon: "icon-shipping", title: "Free shipping and returns", body: "Shipping is on us, and so is the return if you are not completely satisfied." },
  { icon: "icon-customers", title: `${RATING.count} five-star reviews`, body: "Dog owners tell us what works, and we keep improving the formula from what they say." },
];
const STATES = "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(" ");

const PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = PK ? loadStripe(PK) : null;
const APPEARANCE = {
  variables: { colorPrimary: "#2F5FD0", colorText: "#14213D", colorDanger: "#E0614A", borderRadius: "14px", fontFamily: "Figtree, system-ui, sans-serif", fontSizeBase: "17px", spacingUnit: "5px" },
} as const;

type Addr = { line1: string; line2?: string; city: string; state: string; postal_code: string; country: string };

/* (678) 735-8452 as they type. A leading country code 1 is dropped, and it stops at 10 digits. */
const formatPhone = (raw: string) => {
  let d = raw.replace(/\D/g, "");
  if (d.length > 10 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

const field = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const readAddress = (fd: FormData, p: string): Addr => ({
  line1: field(fd, `${p}address`), line2: field(fd, `${p}address2`) || undefined, city: field(fd, `${p}city`),
  state: field(fd, `${p}state`), postal_code: field(fd, `${p}zip`), country: "US",
});

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LABEL: Record<string, string> = { email: "email", phone: "phone", first: "first name", last: "last name", address: "address", city: "city", state: "state", zip: "zip code" };

/* Names of the fields that fail. The form has no native validation (noValidate), because the
   browser's own bubble does not reliably show in an in-app browser and a failed submit looked
   like a dead button. */
function invalidFields(fd: FormData, billing: boolean): string[] {
  const bad: string[] = [];
  if (!EMAIL.test(field(fd, "email"))) bad.push("email");
  for (const p of billing ? ["ship-", "bill-"] : ["ship-"]) {
    for (const k of ["first", "last", "address", "city", "state"]) if (!field(fd, p + k)) bad.push(p + k);
    if (!/^\d{5}(-\d{4})?$/.test(field(fd, `${p}zip`))) bad.push(`${p}zip`);
  }
  if (field(fd, "phone").replace(/\D/g, "").length !== 10) bad.push("phone");
  return bad;
}
const labelOf = (name: string) => (name.startsWith("bill-") ? "billing " : "") + LABEL[name.replace(/^(ship|bill)-/, "")];

function TrustBlocks({ className }: { className: string }) {
  return (
    <div className={`${s.trust} ${className}`}>
      {TRUST.map((t) => (
        <div className={s.trustItem} key={t.title}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${CHECKOUT}/${t.icon}.webp`} alt="" />
          <div><h3 className={s.trustTitle}>{t.title}</h3><p className={s.trustDesc}>{t.body}</p></div>
        </div>
      ))}
    </div>
  );
}

const Chevron = () => (
  <svg width="14" height="9" viewBox="0 0 14 9" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m1 1 6 6 6-6" /></svg>
);

function Address({ prefix }: { prefix: string }) {
  const f = (n: string) => `${prefix}${n}`;
  return (
    <div className={s.fields}>
      <select className={`${s.input} ${s.full}`} name={f("country")} aria-label="Country" defaultValue="US"><option value="US">United States</option></select>
      <input className={`${s.input} ${s.half}`} name={f("first")} placeholder="First name *" aria-label="First name" autoComplete="given-name" required />
      <input className={`${s.input} ${s.half}`} name={f("last")} placeholder="Last name *" aria-label="Last name" autoComplete="family-name" required />
      <AddressSuggest prefix={prefix} className={s.full} />
      <input className={`${s.input} ${s.full}`} name={f("address2")} placeholder="Apartment, suite, etc. (optional)" aria-label="Apartment, suite, etc." autoComplete="address-line2" />
      <input className={`${s.input} ${s.third}`} name={f("city")} placeholder="City *" aria-label="City" autoComplete="address-level2" required />
      <select className={`${s.input} ${s.third}`} name={f("state")} aria-label="State" defaultValue="" autoComplete="address-level1" required>
        <option value="" disabled>State</option>
        {STATES.map((st) => <option key={st}>{st}</option>)}
      </select>
      <input className={`${s.input} ${s.third}`} name={f("zip")} placeholder="Postal code *" aria-label="Postal code" inputMode="numeric" autoComplete="postal-code" required />
    </div>
  );
}

const HOLD_SECONDS = 10 * 60;

/* Seconds left on the order hold. Starts over on every page load: nothing is remembered. It
   stops at 0:00 and nothing happens. */
function useHold() {
  const [left, setLeft] = useState(HOLD_SECONDS);
  useEffect(() => {
    const end = Date.now() + HOLD_SECONDS * 1000;
    const id = setInterval(() => setLeft(Math.max(0, Math.round((end - Date.now()) / 1000))), 1000);
    return () => clearInterval(id);
  }, []);
  return `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
}

function Checkout() {
  const hold = useHold();
  const stripe = useStripe();
  const elements = useElements();
  const formRef = useRef<HTMLFormElement>(null);
  const [busy, setBusy] = useState(false);
  /* Step one passed. Payment is mounted only while this is true. */
  const [ready, setReady] = useState(false);
  const [wallets, setWallets] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  /* The quiz already asked for an email, so start the field with it. They can still change it. */
  const { answers } = useAnswers(itchFridayZoomiesQuiz.id);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const quizEmail = answers.email?.trim();
  useEffect(() => { if (quizEmail) setEmail((cur) => cur || quizEmail); }, [quizEmail]);
  const [promo, setPromo] = useState<{ code: string; total: number; discount: number } | null>(null);
  const [promoMsg, setPromoMsg] = useState<string | null>(null);
  const first = promo ? promo.total / 100 : FIRST;
  const off = PRICE - first;

  /* The summary and the payment sheet follow the code, so what they see is what they pay. */
  useEffect(() => { elements?.update({ amount: Math.round(first * 100) }); }, [elements, first]);

  const applyCode = async () => {
    if (!code.trim()) return;
    setPromoMsg(null);
    const res = await fetch("/api/fz/promo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) });
    const data = await res.json();
    if (!res.ok) { setPromoMsg(data.error || "That code is not valid."); return; }
    setPromo(data);
    setCode("");
  };
  const [sameBilling, setSameBilling] = useState(true);

  /* Marks the failing fields, focuses the first, and says which ones in words. */
  const check = (billing: boolean) => {
    const form = formRef.current;
    if (!form) return false;
    const bad = invalidFields(new FormData(form), billing);
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
    for (const n of bad) (form.elements.namedItem(n) as HTMLElement | null)?.setAttribute("aria-invalid", "true");
    form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    setError(bad.length ? `Please check your ${[...new Set(bad.map(labelOf))].join(", ")}.` : null);
    return !bad.length;
  };

  /* Same alert the old itch checkout sends when somebody reaches the card step: email and Slack
     to us through /api/notify-purchase. Once per page load, however many times they continue. */
  const notified = useRef(false);
  const notify = (fd: FormData) => {
    if (notified.current) return;
    notified.current = true;
    fetch("/api/notify-purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shipping: {
          email: field(fd, "email"), firstName: field(fd, "ship-first"), lastName: field(fd, "ship-last"),
          line1: field(fd, "ship-address"), line2: field(fd, "ship-address2"), city: field(fd, "ship-city"),
          state: field(fd, "ship-state"), zip: field(fd, "ship-zip"), phone: field(fd, "phone"),
        },
        plan: `${FZ_PRODUCT_NAME}, every 4 weeks`,
        total: first,
        stage: "payment",
        product: FZ_PRODUCT_NAME,
      }),
    }).catch((err) => console.error("[fz-v2] notify-purchase failed", err));
  };

  const unlock = () => {
    const form = formRef.current;
    if (!form || !check(false)) return;
    notify(new FormData(form));
    setReady(true);
  };

  /* Collects the payment details, has the server create the subscription, then confirms it. The
     wallet buttons pay with the contact and shipping already on the form. */
  const pay = async (wallet: boolean) => {
    if (!stripe || !elements || busy) return;
    if (!wallet && !check(!sameBilling)) return;
    const form = formRef.current;
    if (!form) return;
    setBusy(true);
    setError(null);
    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw new Error(submitError.message);

      const fd = new FormData(form);
      const shipping = readAddress(fd, "ship-");
      const own = !wallet && !sameBilling;
      const billing = own ? readAddress(fd, "bill-") : shipping;
      let name = `${field(fd, "ship-first")} ${field(fd, "ship-last")}`.trim();
      if (own) name = `${field(fd, "bill-first")} ${field(fd, "bill-last")}`.trim() || name;
      const who = { email: field(fd, "email"), name, phone: field(fd, "phone") || undefined, shipping, billing };

      const res = await fetch("/api/fz/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: who.email, name: who.name, phone: who.phone, shipping: who.shipping, promoCode: promo?.code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "We could not start your order. Try again.");

      /* Who is buying, kept for the thank you page's Purchase event so Meta can match it. */
      try {
        const [firstName, ...rest] = who.name.split(" ");
        sessionStorage.setItem("fz-buyer", JSON.stringify({
          email: who.email, phone: who.phone, firstName, lastName: rest.join(" ") || undefined,
          city: who.shipping.city, state: who.shipping.state, zip: who.shipping.postal_code, country: "us",
        }));
      } catch {}

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/quiz/itch/thanks`,
          payment_method_data: wallet ? undefined : { billing_details: { name: who.name, email: who.email, phone: who.phone, address: { ...who.billing, line2: who.billing.line2 ?? "" } } },
        },
      });
      if (confirmError) throw new Error(confirmError.message);
    } catch (e) {
      const m = e instanceof Error ? e.message : "";
      setError(m || "Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  return (
    <div className={s.page}>
      <header className={s.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={s.logo} src={FZ_BRAND.logo?.src} alt="Friday Zoomies" />
        <span className={s.reviews}><span className={s.stars} aria-hidden="true">★★★★★</span>{RATING.score} stars · {RATING.count} reviews</span>
        <ul className={s.assure}>
          <li><img src={`${CHECKOUT}/icon-guarantee.webp`} alt="" />90-Day Guarantee</li>
          <li><img src={`${CHECKOUT}/icon-shipping.webp`} alt="" />Free US shipping</li>
          <li>
            <img src={`${CHECKOUT}/icon-secure.webp`} alt="" />
            Secure checkout
          </li>
        </ul>
      </header>

      <div className={s.grid}>
        <form
          ref={formRef}
          noValidate
          className={s.main}
          onSubmit={(e) => { e.preventDefault(); if (ready) pay(false); else unlock(); }}
          onInput={(e) => {
            const t = e.target as HTMLInputElement;
            t.removeAttribute?.("aria-invalid");
            /* Changing contact or shipping after continuing sends them back through the check. */
            if (ready && /^(email|phone|ship-)/.test(t.name ?? "")) { setReady(false); setWallets(false); }
          }}
        >
          <div className={s.hold} role="timer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" /><rect x="11.1" y="10.5" width="1.8" height="6.5" rx="0.9" fill="currentColor" /><circle cx="12" cy="7.6" r="1.1" fill="currentColor" /></svg>
            <span>Due to high demand your order is reserved for: <strong>{hold}</strong> minutes</span>
          </div>

          <h2 className={s.h} style={{ marginTop: 14 }}>Contact information</h2>
          <input className={s.input} type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email *" aria-label="Email" autoComplete="email" inputMode="email" />

          <h2 className={s.h}>Shipping information</h2>
          <Address prefix="ship-" />
          <input className={s.input} style={{ marginTop: 12 }} type="tel" name="phone" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="Phone *" aria-label="Phone" autoComplete="tel" inputMode="tel" />

          {!ready ? (
            <div style={{ marginTop: 20 }}>
              <Button type="submit" size="lg" fullWidth variant="accent">Continue to payment</Button>
              {error ? <p role="alert" className={s.err}>{error}</p> : null}
            </div>
          ) : (
            <>
              <h2 className={s.h}>Payment</h2>
              <p className={s.sub}>All transactions are secure and encrypted</p>
              {wallets ? <p className={s.express}>Express checkout</p> : null}
              <ExpressCheckoutElement
                onReady={(e) => setWallets(!!e.availablePaymentMethods)}
                options={{ buttonHeight: 52 }}
                onConfirm={() => pay(true)}
              />
              {wallets ? <div className={s.or}>or pay by card</div> : null}
              <PaymentElement options={{ terms: { card: "never" }, fields: { billingDetails: { name: "never", email: "never", address: "never", phone: "auto" } }, layout: { type: "accordion", defaultCollapsed: false, radios: "always", spacedAccordionItems: true } }} />

              <label className={s.check}>
                <input type="checkbox" checked={sameBilling} onChange={(e) => setSameBilling(e.target.checked)} />
                Use shipping address as billing address
              </label>
              {!sameBilling ? (<><h2 className={s.h} style={{ marginTop: 0 }}>Billing address</h2><Address prefix="bill-" /></>) : null}

              <div style={{ marginTop: 20 }}>
                <Button type="submit" size="lg" fullWidth variant="accent" disabled={!stripe || busy}>{busy ? "Processing…" : "Pay now"}</Button>
                {error ? <p role="alert" className={s.err}>{error}</p> : null}
              </div>
              <p className={s.fine}>
                By clicking “Pay Now,” you agree to Friday Zoomies’{" "}
                <a href="https://fridayzoomies.com/policies/terms-of-service">Terms of Sale</a> and{" "}
                <a href="https://fridayzoomies.com/policies/privacy-policy">Privacy Policy</a>. You will be enrolled in a
                subscription and billed on a recurring basis at the price and frequency shown in the order summary above,
                excluding your first order’s introductory discount. You can cancel anytime before your next billing date by
                emailing <a href="mailto:support@fridayzoomies.com">support@fridayzoomies.com</a>.
              </p>
            </>
          )}
          <TrustBlocks className={s.trustBottom} />
        </form>

        <aside className={s.aside} aria-label="Order summary">
          <button type="button" className={`${s.bar} ${open ? s.barOpen : ""}`} aria-expanded={open} onClick={() => setOpen(!open)}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>Order summary <Chevron /></span>
            <span className={s.barTotal}>{formatPrice(first)}</span>
          </button>
          <div className={`${s.panel} ${open ? s.panelOpen : ""}`}>
            {LINES.map((l) => (
              <div className={s.line} key={l.name}>
                <div className={s.thumb}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.image} alt="" />
                  <span className={s.qty}>1</span>
                </div>
                <div className={s.lineName}>{l.name}{l.sub ? <span className={s.lineSub}>{l.sub}</span> : null}</div>
                <div className={`${s.linePrice} ${l.price ? "" : s.free}`}>
                  {l.now ? <><del className={s.was}>{l.price}</del> {formatPrice(first)}</> : l.price ?? "FREE"}
                </div>
              </div>
            ))}

            <form className={s.coupon} onSubmit={(e) => { e.preventDefault(); applyCode(); }}>
              <input className={s.input} placeholder="Discount code" aria-label="Discount code" value={code} onChange={(e) => setCode(e.target.value)} />
              <Button type="submit" variant="outline" size="md">Apply</Button>
            </form>
            {promoMsg ? <p role="alert" className={s.err} style={{ margin: "0 0 12px" }}>{promoMsg}</p> : null}
            <span className={s.applied}>{promo ? `${promo.code} applied` : "FIRST50 · 50% off your first order"}</span>
            <div className={s.guarantee}><img src={`${CHECKOUT}/icon-guarantee.webp`} alt="" />90 day guarantee</div>

            <div className={s.totals}>
              <div><span>Subtotal · 5 items</span><span>{formatPrice(PRICE)}</span></div>
              <div><span>First order discount</span><span>−{formatPrice(off)}</span></div>
              <div><span>Shipping</span><span className={s.free}>FREE</span></div>
              <div className={s.grand}><span>Total</span><span>{formatPrice(first)}</span></div>
              <div className={s.recurring}><span>{formatPrice(first)} first month, then {formatPrice(PRICE)} every 4 weeks</span></div>
            </div>
          </div>
          <TrustBlocks className={s.trustSide} />
        </aside>
      </div>
    </div>
  );
}

export function FzCheckoutPageV2() {
  if (!stripePromise) return <p style={{ padding: 40 }}>Checkout is not available right now.</p>;
  return (
    <Elements stripe={stripePromise} options={{ mode: "subscription", amount: FIRST * 100, currency: "usd", appearance: APPEARANCE }}>
      <Checkout />
    </Elements>
  );
}
