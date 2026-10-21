"use client";

import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ExpressCheckoutElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { RATING } from "@/lib/products/dog-itch";
import { formatPrice } from "@/lib/price";
import { FZ_BRAND, FZ_PRODUCT_NAME } from "@/lib/quiz/fridayzoomiesOffer";
import { FIRST, IMG, LINES, PRICE } from "@/lib/quiz/fzOrder";
import { formatPhone, phoneOk } from "@/lib/quiz/phone";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { useAnswers } from "@/lib/quiz/store";
import { identifyChargeblast } from "@/lib/chargeblast";
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
  if (!phoneOk(field(fd, "phone"))) bad.push("phone");
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

/* A labelled box, laid out like the old itch checkout: label above, no placeholder. */
function Field({ label, name, cls, ...rest }: { label: string; name: string; cls: string } & ComponentProps<"input">) {
  const id = `ck-${name}`;
  return (
    <div className={`${s.fld} ${cls}`}>
      <label className={s.lbl} htmlFor={id}>{label}</label>
      <input id={id} className={s.input} name={name} {...rest} />
    </div>
  );
}

/* First and last name, address lines, city and state, then zip with whatever sits beside it. */
function Address({ prefix, beside }: { prefix: string; beside?: ReactNode }) {
  const f = (n: string) => `${prefix}${n}`;
  return (
    <>
      <Field cls={s.half} label="First name" name={f("first")} autoComplete="given-name" />
      <Field cls={s.half} label="Last name" name={f("last")} autoComplete="family-name" />
      <div className={`${s.fld} ${s.full}`}>
        <label className={s.lbl} htmlFor={`ck-${f("address")}`}>Address line 1</label>
        <AddressSuggest prefix={prefix} className="" id={`ck-${f("address")}`} placeholder="" />
      </div>
      <Field cls={s.full} label="Address line 2" name={f("address2")} autoComplete="address-line2" />
      <Field cls={s.half} label="Town or city" name={f("city")} autoComplete="address-level2" />
      <div className={`${s.fld} ${s.half}`}>
        <label className={s.lbl} htmlFor={`ck-${f("state")}`}>State</label>
        <select id={`ck-${f("state")}`} className={s.input} name={f("state")} defaultValue="" autoComplete="address-level1">
          <option value="">Choose</option>
          {STATES.map((st) => <option key={st}>{st}</option>)}
        </select>
      </div>
      <Field cls={s.half} label="Zip code" name={f("zip")} inputMode="numeric" autoComplete="postal-code" />
      {beside}
    </>
  );
}

/* Bigger than the stock large button, in title case instead of its usual capitals. */
const PAY_STYLE = { fontSize: "clamp(18px, 5.2vw, 28px)", textTransform: "none", letterSpacing: "0.01em", whiteSpace: "nowrap", padding: "24px 16px", minHeight: 80, borderRadius: 12, boxShadow: "0 6px 14px rgba(20, 33, 61, 0.28)" } as const;

/* Taller and larger than the stock large button, title case, squarer corners, drop shadow. */
const CONTINUE_STYLE = { fontSize: "clamp(22px, 6vw, 32px)", textTransform: "none", letterSpacing: "0.01em", padding: "22px 20px", minHeight: 76, borderRadius: 6, boxShadow: "0 6px 14px rgba(20, 33, 61, 0.28)" } as const;

const HOLD_SECONDS = 7 * 60;

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
  /* One line of what they entered, shown in place of the fields once they continue. */
  const [shipTo, setShipTo] = useState("");
  const [wallets, setWallets] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  /* The quiz already asked for an email, so start the field with it. They can still change it. */
  const { answers } = useAnswers(itchFridayZoomiesQuiz.id);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+1");
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
  const sameBilling = true; // the card is always billed to the shipping address

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
    const fd = new FormData(form);
    notify(fd);
    const a = readAddress(fd, "ship-");
    setShipTo(`${field(fd, "ship-first")} ${field(fd, "ship-last")}, ${[a.line1, a.line2, a.city].filter(Boolean).join(", ")}, ${a.state} ${a.postal_code}`);
    setReady(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const edit = () => { setReady(false); setWallets(false); };

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

      identifyChargeblast(who.email);

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

          {/* Hidden, not unmounted: the payment step reads these inputs back from the form. */}
          <div className={s.fields} style={{ marginTop: 14, display: ready ? "none" : undefined }}>
            <Address
              prefix="ship-"
              beside={<Field cls={s.half} label="Phone" name="phone" type="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} inputMode="tel" autoComplete="tel" />}
            />
            <Field cls={s.full} label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} inputMode="email" autoComplete="email" />
          </div>

          {ready ? (
            <div className={s.shipDone}>
              <div>
                <span className={s.shipLbl}>Shipping to</span>
                <p className={s.shipTxt}>{shipTo}</p>
              </div>
              <button type="button" className={s.edit} onClick={edit}>Edit</button>
            </div>
          ) : null}

          {!ready ? (
            <div style={{ marginTop: 20 }}>
              <Button type="submit" size="lg" fullWidth variant="accent" style={CONTINUE_STYLE}><span style={{ display: "inline-flex", alignItems: "center", gap: 12, whiteSpace: "nowrap" }}>Continue To Payment<Icon name="arrow-right" size={28} strokeWidth={3.5} /></span></Button>
              {error ? <p role="alert" className={s.err}>{error}</p> : null}
            </div>
          ) : (
            <>
              <h2 className={s.h}>Payment</h2>
              <div className={s.secure}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                All transactions are secure and encrypted
              </div>
              <div className={s.badges}>
                <span className={s.badge}>
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="4" y="10.5" width="16" height="10.5" rx="2" /><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" /></svg>
                  <span>100% secure<strong>SSL encryption</strong></span>
                </span>
                <span className={s.badge}>
                  <Icon name="shield-check" size={34} strokeWidth={2} />
                  <span>Guaranteed<strong>safe checkout</strong></span>
                </span>
              </div>
              {wallets ? <p className={s.express}>Express checkout</p> : null}
              <ExpressCheckoutElement
                onReady={(e) => setWallets(!!e.availablePaymentMethods)}
                options={{ buttonHeight: 52 }}
                onConfirm={() => pay(true)}
              />
              {wallets ? <div className={s.or}>or pay by card</div> : null}
              <PaymentElement options={{ terms: { card: "never" }, fields: { billingDetails: { name: "never", email: "never", address: "never", phone: "auto" } }, wallets: { applePay: "never", googlePay: "never" }, layout: { type: "accordion", defaultCollapsed: false, radios: "always", spacedAccordionItems: true } }} />

              <div style={{ marginTop: 12 }}>
                <Button type="submit" size="lg" fullWidth variant="accent" disabled={!stripe || busy} iconLeft={busy ? undefined : "shield-check"} style={PAY_STYLE}>{busy ? "Processing…" : "Submit Secure Payment"}</Button>
                {error ? <p role="alert" className={s.err}>{error}</p> : null}
              </div>
              <p className={`${s.fine} ${s.finePay}`}>
                By clicking “Submit Secure Payment,” you accept our <a href="https://fridayzoomies.com/policies/terms-of-service">Terms of Service</a>.
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
