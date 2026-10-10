"use client";

import { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ExpressCheckoutElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/core/Button";
import { RATING } from "@/lib/products/dog-itch";
import { formatPrice } from "@/lib/price";
import { FZ_BRAND } from "@/lib/quiz/fridayzoomiesOffer";
import { FIRST, IMG, LINES, PRICE } from "@/lib/quiz/fzOrder";
import s from "./fzCheckout.module.css";

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
type Buyer = { email: string; name: string; phone?: string; shipping: Addr; billing: Addr };

const field = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const readAddress = (fd: FormData, p: string): Addr => ({
  line1: field(fd, `${p}address`), line2: field(fd, `${p}address2`) || undefined, city: field(fd, `${p}city`),
  state: field(fd, `${p}state`), postal_code: field(fd, `${p}zip`), country: "US",
});

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
      <input className={`${s.input} ${s.full}`} name={f("address")} placeholder="Address *" aria-label="Address" autoComplete="address-line1" required />
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

/* Seconds left on the order hold. The deadline lives in sessionStorage so a refresh does not
   restart it; it stops at 0:00 and nothing happens. */
function useHold() {
  const [left, setLeft] = useState(HOLD_SECONDS);
  useEffect(() => {
    let end = Date.now() + HOLD_SECONDS * 1000;
    try {
      const saved = Number(sessionStorage.getItem("fz-hold-end"));
      if (saved) end = saved;
      else sessionStorage.setItem("fz-hold-end", String(end));
    } catch {}
    const tick = () => setLeft(Math.max(0, Math.round((end - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
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
  const [wallets, setWallets] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [sameBilling, setSameBilling] = useState(true);

  /* Collects the payment details, has the server create the subscription, then confirms it. The
     wallet buttons arrive with their own contact and address; the form path reads our fields. */
  const pay = async (buyer: Buyer | null) => {
    if (!stripe || !elements || busy) return;
    setBusy(true);
    setError(null);
    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw new Error(submitError.message);

      let who = buyer;
      if (!who) {
        const form = formRef.current;
        if (!form || !form.reportValidity()) throw new Error("");
        const fd = new FormData(form);
        const shipping = readAddress(fd, "ship-");
        who = {
          email: field(fd, "email"),
          name: `${field(fd, "ship-first")} ${field(fd, "ship-last")}`.trim(),
          phone: field(fd, "phone") || undefined,
          shipping,
          billing: sameBilling ? shipping : readAddress(fd, "bill-"),
        };
        if (!sameBilling) who.name = `${field(fd, "bill-first")} ${field(fd, "bill-last")}`.trim() || who.name;
      }

      const res = await fetch("/api/fz/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: who.email, name: who.name, phone: who.phone, shipping: who.shipping }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "We could not start your order. Try again.");

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/quiz/itch/thanks`,
          payment_method_data: buyer ? undefined : { billing_details: { name: who.name, email: who.email, phone: who.phone, address: { ...who.billing, line2: who.billing.line2 ?? "" } } },
        },
      });
      if (confirmError) throw new Error(confirmError.message);
    } catch (e) {
      const m = e instanceof Error ? e.message : "";
      if (m) setError(m);
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm-1 14-3.5-3.5 1.4-1.4L11 13.2l4.1-4.1 1.4 1.4L11 16Z" /></svg>
            Secure checkout
          </li>
        </ul>
      </header>

      <div className={s.grid}>
        <form ref={formRef} className={s.main} onSubmit={(e) => { e.preventDefault(); pay(null); }}>
          <div className={s.hold} role="timer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" /><rect x="11.1" y="10.5" width="1.8" height="6.5" rx="0.9" fill="currentColor" /><circle cx="12" cy="7.6" r="1.1" fill="currentColor" /></svg>
            <span>Due to high demand your order is reserved for: <strong>{hold}</strong> minutes</span>
          </div>
          {wallets ? <p className={s.express}>Express checkout</p> : null}
          <ExpressCheckoutElement
            onReady={(e) => setWallets(!!e.availablePaymentMethods)}
            options={{ buttonHeight: 52, emailRequired: true, phoneNumberRequired: true, shippingAddressRequired: true, allowedShippingCountries: ["US"], shippingRates: [{ id: "free", displayName: "Free shipping", amount: 0 }] }}
            onShippingAddressChange={(e) => e.resolve({ shippingRates: [{ id: "free", displayName: "Free shipping", amount: 0 }] })}
            onConfirm={(e) => {
              const a = e.shippingAddress?.address;
              const name = e.shippingAddress?.name || e.billingDetails?.name || "";
              const addr = { line1: a?.line1 ?? "", line2: a?.line2 ?? undefined, city: a?.city ?? "", state: a?.state ?? "", postal_code: a?.postal_code ?? "", country: a?.country ?? "US" };
              pay({ email: e.billingDetails?.email ?? "", name, phone: e.billingDetails?.phone ?? undefined, shipping: addr, billing: addr });
            }}
          />
          {wallets ? <div className={s.or}>or pay by card</div> : null}

          <h2 className={s.h} style={{ marginTop: 14 }}>Contact information</h2>
          <input className={s.input} type="email" name="email" placeholder="Email *" aria-label="Email" autoComplete="email" inputMode="email" required />

          <h2 className={s.h}>Shipping information</h2>
          <Address prefix="ship-" />
          <input className={s.input} style={{ marginTop: 12 }} type="tel" name="phone" placeholder="Phone (optional)" aria-label="Phone" autoComplete="tel" inputMode="tel" />

          <h2 className={s.h}>Secure checkout</h2>
          <p className={s.sub}>All transactions are secure and encrypted</p>
          <PaymentElement options={{ fields: { billingDetails: { name: "never", email: "never", address: "never", phone: "never" } }, layout: { type: "accordion", defaultCollapsed: false, radios: "always", spacedAccordionItems: true } }} />

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
        </form>

        <aside className={s.aside} aria-label="Order summary">
          <button type="button" className={`${s.bar} ${open ? s.barOpen : ""}`} aria-expanded={open} onClick={() => setOpen(!open)}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>Order summary <Chevron /></span>
            <span className={s.barTotal}>{formatPrice(FIRST)}</span>
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
                  {l.now ? <><del className={s.was}>{l.price}</del> {l.now}</> : l.price ?? "FREE"}
                </div>
              </div>
            ))}

            <form className={s.coupon} onSubmit={(e) => e.preventDefault()}>
              <input className={s.input} placeholder="Discount code" aria-label="Discount code" />
              <Button type="submit" variant="outline" size="md">Apply</Button>
            </form>
            <span className={s.applied}>FIRST50 · 50% off your first order</span>
            <div className={s.guarantee}><img src={`${CHECKOUT}/icon-guarantee.webp`} alt="" />90 day guarantee</div>

            <div className={s.totals}>
              <div><span>Subtotal · 5 items</span><span>{formatPrice(PRICE)}</span></div>
              <div><span>First order discount</span><span>−{formatPrice(PRICE - FIRST)}</span></div>
              <div><span>Shipping</span><span className={s.free}>FREE</span></div>
              <div className={s.grand}><span>Total</span><span>{formatPrice(FIRST)}</span></div>
              <div className={s.recurring}><span>{formatPrice(FIRST)} first month, then {formatPrice(PRICE)} every 4 weeks</span></div>
            </div>
          </div>
          <div className={s.trust}>
            {TRUST.map((t) => (
              <div className={s.trustItem} key={t.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${CHECKOUT}/${t.icon}.webp`} alt="" />
                <div><h3 className={s.trustTitle}>{t.title}</h3><p className={s.trustDesc}>{t.body}</p></div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export function FzCheckoutPage() {
  if (!stripePromise) return <p style={{ padding: 40 }}>Checkout is not available right now.</p>;
  return (
    <Elements stripe={stripePromise} options={{ mode: "subscription", amount: FIRST * 100, currency: "usd", appearance: APPEARANCE }}>
      <Checkout />
    </Elements>
  );
}
