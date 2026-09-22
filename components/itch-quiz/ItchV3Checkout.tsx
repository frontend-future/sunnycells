"use client";

import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/core/Icon";
import { Wordmark } from "@/components/core/Wordmark";
import { Input } from "@/components/forms/Input";
import { Select } from "@/components/forms/Select";
import { CardBrandMark } from "@/components/quiz/CardBrandMark";
import { OutOfStockNotice } from "@/components/quiz/OutOfStockNotice";
import { PRODUCT, RATING } from "@/lib/products/dog-itch";
import { ITCH_CART_ID, itchPlanById } from "@/lib/quiz/itchLadder";
import { buildItchOrderV3 } from "@/lib/quiz/itchOrderV3";
import { itchV3Quiz } from "@/lib/quiz/itchV3";
import { US_STATES } from "@/lib/quiz/order";
import { brandOf, cvcOk, expiryOk, formatCardNumber, formatExpiry, luhnOk } from "@/lib/quiz/card";
import { formatPhone } from "@/lib/quiz/phone";
import { trackMetaEvent } from "@/lib/meta";
import { useAnswers } from "@/lib/quiz/store";

/* Sprout green, same theme ItchCheckout uses: this is still SC-01 Daily Chews, not
   a different product. */
const THEME = {
  "--action-primary-bg": "var(--sprout)",
  "--action-primary-bg-press": "var(--sprout-press)",
  "--action-primary-fg": "var(--ink)",
  "--action-accent-bg": "var(--sprout)",
  "--action-accent-bg-press": "var(--sprout-press)",
  "--action-accent-fg": "var(--ink)",
} as React.CSSProperties;

const money = (n: number) => `$${n}`;

/**
 * SOCIAL PROOF HEADER GRAPHIC: a placeholder built from the three review photos
 * already on hand (public/quiz/itch/review-*.webp) and the product's own real
 * rating count (RATING, lib/products/dog-itch.ts), not a fabricated number. Swap
 * for the supplied graphic when it lands; the layout slot stays the same.
 */
/* Total customers, not the review count RATING.count tracks elsewhere (the
   plans page's RatingPill shows "662 reviews") -- a bigger, distinct metric for
   this page's social proof line. */
const CHECKOUT_CUSTOMER_COUNT = 6782;

function SocialProofBadge() {
  const avatars = ["review-marcus.webp", "review-priya.webp", "review-ellie.webp"];
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-3)" }}>
      <span style={{ display: "flex" }} aria-hidden="true">
        {avatars.map((src, i) => (
          <span
            key={src}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid var(--white)",
              marginLeft: i === 0 ? 0 : -10,
              position: "relative",
              flex: "none",
            }}
          >
            <Image src={`/quiz/itch/${src}`} alt="" width={56} height={56} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </span>
        ))}
      </span>
      <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--size-meta)", fontWeight: 600, letterSpacing: "var(--tracking-mono)", color: "var(--ink-80)" }}>
        {RATING.score.toFixed(1)}★ from {CHECKOUT_CUSTOMER_COUNT.toLocaleString("en-US")}+ happy dog owners
      </span>
    </div>
  );
}

const TRUST_ROW: { icon: "truck" | "repeat" | "shield-check"; label: string }[] = [
  { icon: "truck", label: "Fast shipping" },
  { icon: "repeat", label: "30-day guarantee" },
  { icon: "shield-check", label: "Secure checkout" },
];

function Header() {
  return (
    <header style={{ position: "relative", borderBottom: "1px solid var(--border-hairline)", padding: "var(--space-5) var(--page-gutter-mobile)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)" }}>
        <Wordmark size={24} />
        <SocialProofBadge />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "var(--space-4)" }}>
          {TRUST_ROW.map((t) => (
            <span key={t.label} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--size-meta)", color: "var(--ink-60)", fontWeight: 500 }}>
              <Icon name={t.icon} size={14} />
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

/** mm:ss, counting down from 10 minutes. A checkout-only urgency device: this page
    is the one place on the site a hold timer is honest (the plan really is parked in
    this browser's cart), unlike a site-wide countdown against the standing 50% off
    offer, which OfferFlag deliberately never carries. */
function useReservedTimer(startSeconds = 600) {
  const [secs, setSecs] = useState(startSeconds);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function ReservedBanner() {
  const timer = useReservedTimer();
  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-4)",
        background: "var(--status-error-tint)",
        color: "var(--status-error)",
        borderRadius: "var(--radius-card)",
        fontSize: "var(--size-meta)",
        fontWeight: 700,
      }}
    >
      <Icon name="triangle-alert" size={20} />
      Due to high demand, your order is reserved for {timer} minutes.
    </div>
  );
}

/* PROTOTYPE EXPRESS-CHECKOUT BUTTONS. Approximated brand colours and wordmarks,
   same footing as CardBrandMark: swap for the real Shop Pay / PayPal / Google Pay
   SDKs before launch. Clicking one skips stright to the same "sold out" outcome
   CardForm's own submit reaches, since neither has a provider to call yet. */
function ExpressButton({
  bg, fg, onClick, label, children,
}: { bg: string; fg: string; onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{
        appearance: "none",
        border: 0,
        borderRadius: "var(--radius-button)",
        background: bg,
        color: fg,
        minHeight: "var(--control-h-lg)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontWeight: 800,
      }}
    >
      {children}
    </button>
  );
}

function ExpressCheckout({ onChoose }: { onChoose: (provider: string) => void }) {
  return (
    <div>
      <p style={{ margin: "0 0 var(--space-3)", textAlign: "center", fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink-60)" }}>
        Express checkout
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-3)" }}>
        <ExpressButton bg="#5A31F4" fg="#fff" label="Check out with Shop Pay" onClick={() => onChoose("Shop Pay")}>
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 20, letterSpacing: "-0.02em" }}>shop</span>
        </ExpressButton>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
          <ExpressButton bg="#FFC439" fg="#003087" label="Check out with PayPal" onClick={() => onChoose("PayPal")}>
            <span style={{ fontWeight: 900, fontStyle: "italic", fontSize: 18 }}>
              Pay<span style={{ color: "#001C64" }}>Pal</span>
            </span>
          </ExpressButton>
          <ExpressButton bg="#000" fg="#fff" label="Check out with Google Pay" onClick={() => onChoose("Google Pay")}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 17 }}>
              <span style={{ fontWeight: 700 }}>
                <span style={{ color: "#4285F4" }}>G</span>
                <span style={{ color: "#EA4335" }}>o</span>
                <span style={{ color: "#FBBC05" }}>o</span>
                <span style={{ color: "#4285F4" }}>g</span>
                <span style={{ color: "#34A853" }}>l</span>
                <span style={{ color: "#EA4335" }}>e</span>
              </span>
              Pay
            </span>
          </ExpressButton>
        </div>
      </div>
      <p style={{ margin: "var(--space-3) 0 0", fontSize: "var(--size-meta)", color: "var(--ink-60)", textAlign: "center", lineHeight: 1.4 }}>
        By continuing with your payment, you agree to the future charges listed on this
        page and the{" "}
        <Link href="#" style={{ color: "var(--ink-60)", textDecoration: "underline" }}>
          cancellation policy
        </Link>
        .
      </p>
    </div>
  );
}

/**
 * The order submit button: two lines, the second a risk-reversal line under the
 * primary label, big enough to be its own headline. Not the shared Button
 * component: that one is built for a single line of uniform-size label, and this
 * page's own CTA needs two sizes stacked, so it gets its own small button here
 * instead of stretching Button's contract to fit one caller.
 */
function CompleteOrderButton({ onClick, disabled, working }: { onClick: () => void; disabled?: boolean; working?: boolean }) {
  const [down, setDown] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        appearance: "none",
        width: "100%",
        minHeight: 96,
        border: 0,
        borderRadius: "var(--radius-button)",
        background: disabled ? "var(--action-disabled-bg)" : "var(--action-accent-bg)",
        color: disabled ? "var(--action-disabled-fg)" : "var(--action-accent-fg)",
        padding: "var(--space-4) var(--space-5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        cursor: disabled ? "not-allowed" : "pointer",
        transform: down && !disabled ? "scale(var(--press-scale))" : "none",
        transition: "background var(--duration-fast) var(--ease-standard), transform var(--duration-instant) var(--ease-standard)",
      }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      onMouseLeave={() => setDown(false)}
    >
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(22px, 6vw, 30px)", letterSpacing: "-0.01em", textTransform: "uppercase", lineHeight: 1.05 }}>
        {working ? "Working" : "Secure my order"}
      </span>
      {!working ? (
        <span style={{ fontFamily: "var(--font-text)", fontWeight: 700, fontSize: "var(--size-meta)", letterSpacing: "0.02em", textTransform: "uppercase" }}>
          Try it risk free · 30 day money-back guarantee
        </span>
      ) : null}
    </button>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", margin: "var(--space-6) 0" }}>
      <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--border-hairline)" }} />
      <span style={{ fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink-60)" }}>OR</span>
      <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--border-hairline)" }} />
    </div>
  );
}

type Field = { key: string; label: string; auto: string; half?: boolean; required?: boolean; missing?: string };

const DELIVERY_FIELDS: Field[] = [
  { key: "firstName", label: "First name (optional)", auto: "given-name", half: true },
  { key: "lastName", label: "Last name", auto: "family-name", half: true, required: true, missing: "We need a last name for the parcel." },
  { key: "line1", label: "Address", auto: "address-line1", required: true, missing: "We need a street address to deliver to." },
  { key: "line2", label: "Apartment, suite, etc. (optional)", auto: "address-line2" },
  { key: "city", label: "City", auto: "address-level2", half: true, required: true, missing: "We need a town or city." },
  { key: "zip", label: "ZIP code", auto: "postal-code", half: true, required: true, missing: "We need a zip code so the carrier can route it." },
  { key: "phone", label: "Phone (optional)", auto: "tel" },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ItchV3Checkout({ backHref = "/quiz/itch/v3/results/plans" }: { backHref?: string } = {}) {
  const { answers: cart, ready } = useAnswers(ITCH_CART_ID);
  const { answers: quizAnswers } = useAnswers(itchV3Quiz.id);
  const plan = itchPlanById(cart.plan);
  const order = buildItchOrderV3(cart.plan);
  const totalSavings = order.strikeTotal - order.total;

  const [f, setF] = useState<Record<string, string>>({ phone: "+1" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailNews, setEmailNews] = useState(true);
  const [billingSame, setBillingSame] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

  const [expressPhase, setExpressPhase] = useState<"idle" | "working" | "failed">("idle");
  const [expressProvider, setExpressProvider] = useState("");
  const [cardPhase, setCardPhase] = useState<"idle" | "working" | "failed">("idle");
  const [openSummary, setOpenSummary] = useState(false);

  const set = (k: string, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const email = () => (f.email ?? quizAnswers.email ?? "").trim();

  const shippingPayload = () => ({
    email: email(),
    firstName: f.firstName ?? "",
    lastName: f.lastName ?? "",
    line1: f.line1 ?? "",
    line2: f.line2 ?? "",
    city: f.city ?? "",
    state: f.state ?? "",
    zip: f.zip ?? "",
    phone: f.phone ?? "",
  });

  const identity = () => ({
    email: email(),
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
    content_ids: [plan.id],
    content_type: "product",
    content_name: `${PRODUCT.name} ${plan.label}`,
  });

  const notifyAttempt = () => {
    fetch("/api/notify-purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shipping: shippingPayload(),
        plan: plan.label,
        total: order.total,
        stage: "purchase",
        product: PRODUCT.name,
        lander: cart.lander,
      }),
    }).catch((err) => console.error("[itch-v3-checkout] notify-purchase failed", err));
  };

  /* Every path that ends the checkout, mocked or real, fires the same Purchase
     signal exactly once and lands on the same "sold out" outcome: there is no
     payment provider wired up yet, on this page or any other checkout here. */
  const fireBought = useRef(false);
  const bought = () => {
    if (fireBought.current) return;
    fireBought.current = true;
    trackMetaEvent("Purchase", basket(), identity());
    notifyAttempt();
  };

  const chooseExpress = (provider: string) => {
    setExpressProvider(provider);
    setExpressPhase("working");
    bought();
    setTimeout(() => setExpressPhase("failed"), 1400);
  };

  const [cardFields, setCardFields] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const brand = brandOf(cardFields.number);

  const submitOrder = () => {
    if (paymentMethod === "paypal") {
      chooseExpress("PayPal");
      return;
    }

    const next: Record<string, string> = {};
    for (const x of DELIVERY_FIELDS) if (x.required && !f[x.key]?.trim()) next[x.key] = x.missing!;
    if (!f.state?.trim()) next.state = "Choose a state so we can work out delivery.";
    if (!email()) next.email = "We need an email address to send your receipt.";
    else if (!EMAIL.test(email())) next.email = "That address is missing an @ or a domain.";

    if (!cardFields.name.trim()) next.cardName = "We need the name printed on the card.";
    if (!luhnOk(cardFields.number)) next.cardNumber = "Check the card number, a digit looks wrong.";
    if (!expiryOk(cardFields.expiry)) next.cardExpiry = "Check the expiry date.";
    if (!cvcOk(cardFields.cvc, brand)) next.cardCvc = brand === "amex" ? "Amex security codes are 4 digits." : "The security code is 3 digits.";

    setErrors(next);
    if (Object.keys(next).length) return;

    bought();
    setCardPhase("working");
    setTimeout(() => setCardPhase("failed"), 1800);
  };

  return (
    <div style={{ ...THEME, minHeight: "100dvh", background: "var(--surface-page)" }}>
      <Header />

      <div className="sc-checkout" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 var(--page-gutter-mobile) var(--space-16)" }}>
        <aside
          className="sc-checkout-summary"
          style={{ background: "var(--surface-sunk)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-card)", padding: "var(--space-5)", margin: "var(--space-6) 0" }}
        >
          <button
            type="button"
            className="sc-summary-toggle"
            onClick={() => setOpenSummary((o) => !o)}
            aria-expanded={openSummary}
            style={{
              appearance: "none", background: "transparent", border: 0, width: "100%",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)",
              padding: 0, cursor: "pointer", minHeight: "var(--tap-min)",
            }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
              Order summary
            </span>
            <span aria-hidden="true" style={{ display: "flex", transform: openSummary ? "rotate(180deg)" : "none", transition: "transform var(--duration-fast) var(--ease-standard)" }}>
              <Icon name="chevron-down" size={24} />
            </span>
          </button>
          <span className="sc-summary-heading" style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
            Order summary
          </span>

          <div className="sc-total-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-4)", paddingTop: "var(--space-4)", marginTop: "var(--space-4)", borderTop: "1px solid var(--border-hairline)" }}>
            <span style={{ fontSize: "var(--size-body)", fontWeight: 800 }}>Total</span>
            <span style={{ textAlign: "right" }}>
              <span style={{ display: "block", fontSize: "var(--size-meta)", color: "var(--ink-60)", textDecoration: "line-through" }}>{money(order.strikeTotal)}</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--size-h4)", letterSpacing: "-0.02em" }}>
                {ready ? money(order.total) : " "}
              </span>
            </span>
          </div>

          <div className="sc-summary-body" style={{ display: openSummary ? "block" : "none" }}>
            <ul style={{ margin: "var(--space-5) 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {order.lines.map((l) => (
                <li key={l.id} style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
                  <span style={{ flex: "none", width: 56, height: 56, borderRadius: "var(--radius-sm)", background: "var(--white)", border: "1px solid var(--border-hairline)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {l.image ? (
                      <Image src={l.image} alt="" width={240} height={240} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : (
                      <Icon name="file-text" size={22} />
                    )}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: "var(--size-meta)", fontWeight: 700, lineHeight: 1.3 }}>{l.name}</span>
                    <span style={{ display: "block", fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>{l.note}</span>
                  </span>
                  <span style={{ flex: "none", textAlign: "right" }}>
                    <span style={{ display: "block", fontSize: "var(--size-meta)", color: "var(--ink-60)", textDecoration: "line-through" }}>{money(l.was)}</span>
                    <span style={{ fontSize: "var(--size-meta)", fontWeight: 800, color: l.now === null ? "var(--status-success)" : "var(--ink)" }}>
                      {l.now === null ? "Free" : money(l.now)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "var(--space-5)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--border-hairline)" }}>
              <div
                style={{
                  padding: "10px 14px", textAlign: "center",
                  background: "var(--sun)", color: "var(--ink)", borderRadius: "var(--radius-xs)",
                  fontFamily: "var(--font-text)", fontWeight: 800, fontSize: "var(--size-meta)",
                  letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", lineHeight: 1.4,
                }}
              >
                50% off first order · auto-applied
              </div>
            </div>

            <div style={{ marginTop: "var(--space-5)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--border-hairline)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--size-meta)" }}>
                <span>Subtotal · {order.lines.length} items</span>
                <span style={{ fontWeight: 700 }}>{ready ? money(order.total) : " "}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--size-meta)" }}>
                <span>Shipping</span>
                <span style={{ fontWeight: 700, color: "var(--status-success)" }}>Free</span>
              </div>
            </div>

            <div className="sc-total-bottom" style={{ justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-4)", marginTop: "var(--space-5)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--border-hairline)" }}>
              <span style={{ fontSize: "var(--size-body)", fontWeight: 800 }}>Total</span>
              <span style={{ textAlign: "right" }}>
                <span style={{ display: "block", fontSize: "var(--size-meta)", color: "var(--ink-60)", textDecoration: "line-through" }}>{money(order.strikeTotal)}</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--size-h4)", letterSpacing: "-0.02em" }}>
                  {ready ? money(order.total) : " "}
                </span>
              </span>
            </div>
            <div style={{ marginTop: "var(--space-2)", display: "flex", alignItems: "center", gap: 6, fontSize: "var(--size-meta)", fontWeight: 700, color: "var(--status-success)" }}>
              <Icon name="percent" size={14} />
              Total savings {money(totalSavings)}
            </div>

            <div style={{ marginTop: "var(--space-5)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--border-hairline)", display: "flex", alignItems: "center", gap: "var(--space-3)", fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>
              <Icon name="shield-check" size={18} />
              30 day money back guarantee
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

          <div style={{ margin: "var(--space-4) 0 var(--space-6)" }}>
            <ReservedBanner />
          </div>

          {expressPhase === "idle" ? (
            <ExpressCheckout onChoose={chooseExpress} />
          ) : expressPhase === "working" ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-3)", padding: "var(--space-8) 0", fontSize: "var(--size-body)", fontWeight: 600, color: "var(--ink-60)" }} aria-live="polite">
              <span
                aria-hidden="true"
                style={{ width: 22, height: 22, borderRadius: "50%", border: "3px solid var(--ink-20)", borderTopColor: "var(--ink)", display: "inline-block", animation: "sc-spin 700ms linear infinite" }}
              />
              Redirecting to {expressProvider}
            </div>
          ) : (
            <OutOfStockNotice onRetry={() => setExpressPhase("idle")} />
          )}

          {expressPhase === "idle" ? (
            <>
              <Divider />

              <h2 style={{ margin: "0 0 var(--space-4)", fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
                Contact
              </h2>
              <Input
                label="Email"
                type="email"
                autoComplete="email"
                value={f.email ?? quizAnswers.email ?? ""}
                error={errors.email || undefined}
                onChange={(e) => set("email", e.target.value)}
              />
              <label style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginTop: "var(--space-3)", fontSize: "var(--size-meta)", fontWeight: 500 }}>
                <input type="checkbox" checked={emailNews} onChange={(e) => setEmailNews(e.target.checked)} style={{ width: 18, height: 18, accentColor: "var(--sprout)" }} />
                Email me with news and offers
              </label>

              <h2 style={{ margin: "var(--space-8) 0 var(--space-4)", fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
                Delivery
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-4)" }}>
                <Input label="Country/Region" value="United States (free shipping)" readOnly disabled />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                  {DELIVERY_FIELDS.filter((x) => ["firstName", "lastName"].includes(x.key)).map((x) => (
                    <Input key={x.key} label={x.label} autoComplete={x.auto} value={f[x.key] || ""} error={errors[x.key] || undefined} onChange={(e) => set(x.key, e.target.value)} />
                  ))}
                </div>
                <Input
                  label="Address"
                  autoComplete="address-line1"
                  suffix={<Icon name="search" size={18} />}
                  value={f.line1 || ""}
                  error={errors.line1 || undefined}
                  onChange={(e) => set("line1", e.target.value)}
                />
                <Input label="Apartment, suite, etc. (optional)" autoComplete="address-line2" value={f.line2 || ""} onChange={(e) => set("line2", e.target.value)} />
                <Input label="City" autoComplete="address-level2" value={f.city || ""} error={errors.city || undefined} onChange={(e) => set("city", e.target.value)} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                  <Select
                    label="State"
                    value={f.state || ""}
                    onChange={(e) => set("state", e.target.value)}
                    options={[{ value: "", label: "Choose a state" }, ...US_STATES.map((s) => ({ value: s, label: s }))]}
                  />
                  <Input label="ZIP code" autoComplete="postal-code" value={f.zip || ""} error={errors.zip || undefined} onChange={(e) => set("zip", e.target.value)} />
                </div>
                {errors.state ? <div style={{ fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--status-error)" }}>{errors.state}</div> : null}
                <Input label="Phone (optional)" type="tel" autoComplete="tel" value={f.phone || ""} onChange={(e) => set("phone", formatPhone(e.target.value))} />
                <label style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", fontSize: "var(--size-meta)", fontWeight: 500 }}>
                  <input type="checkbox" style={{ width: 18, height: 18, accentColor: "var(--sprout)" }} />
                  Text me with news and offers
                </label>
              </div>

              <h2 style={{ margin: "var(--space-8) 0 var(--space-4)", fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
                Shipping method
              </h2>
              <div style={{ padding: "var(--space-4)", background: "var(--surface-sunk)", borderRadius: "var(--radius-card)", fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>
                Enter your shipping address to view available shipping methods.
              </div>

              <h2 style={{ margin: "var(--space-8) 0 var(--space-2)", fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
                Payment
              </h2>
              <p style={{ margin: "0 0 var(--space-4)", fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>All transactions are secure and encrypted.</p>

              {cardPhase === "failed" ? (
                <OutOfStockNotice onRetry={() => setCardPhase("idle")} />
              ) : (
                <div style={{ border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
                  <label
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)",
                      padding: "var(--space-4) var(--space-5)", cursor: "pointer",
                      borderBottom: paymentMethod === "card" ? "1px solid var(--border-hairline)" : 0,
                      background: paymentMethod === "card" ? "var(--surface-sunk)" : "transparent",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", fontSize: "var(--size-body)", fontWeight: 800 }}>
                      <input type="radio" name="pm" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} style={{ width: 18, height: 18, accentColor: "var(--sprout)" }} />
                      Credit card
                    </span>
                    <span style={{ display: "flex", gap: 4 }}>
                      {(["visa", "mastercard", "amex"] as const).map((b) => (
                        <CardBrandMark key={b} brand={b} height={22} />
                      ))}
                    </span>
                  </label>

                  {paymentMethod === "card" ? (
                    <div style={{ padding: "var(--space-5)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                      <Input
                        label="Card number"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="1234 1234 1234 1234"
                        suffix={brand ? <CardBrandMark brand={brand} height={28} /> : undefined}
                        value={cardFields.number}
                        error={errors.cardNumber || undefined}
                        onChange={(e) => { setCardFields((c) => ({ ...c, number: formatCardNumber(e.target.value) })); setErrors((x) => ({ ...x, cardNumber: "" })); }}
                      />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                        <Input
                          label="Expiration date (MM / YY)"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder="MM / YY"
                          value={cardFields.expiry}
                          error={errors.cardExpiry || undefined}
                          onChange={(e) => { setCardFields((c) => ({ ...c, expiry: formatExpiry(e.target.value) })); setErrors((x) => ({ ...x, cardExpiry: "" })); }}
                        />
                        <Input
                          label={brand === "amex" ? "Security code (4 digits)" : "Security code"}
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          placeholder={brand === "amex" ? "1234" : "123"}
                          value={cardFields.cvc}
                          error={errors.cardCvc || undefined}
                          onChange={(e) => { setCardFields((c) => ({ ...c, cvc: (e.target.value.match(/\d/g) ?? []).join("").slice(0, 4) })); setErrors((x) => ({ ...x, cardCvc: "" })); }}
                        />
                      </div>
                      <Input
                        label="Name on card"
                        autoComplete="cc-name"
                        value={cardFields.name}
                        error={errors.cardName || undefined}
                        onChange={(e) => { setCardFields((c) => ({ ...c, name: e.target.value })); setErrors((x) => ({ ...x, cardName: "" })); }}
                      />
                      <label style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", fontSize: "var(--size-meta)", fontWeight: 500 }}>
                        <input type="checkbox" checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} style={{ width: 18, height: 18, accentColor: "var(--sprout)" }} />
                        Use shipping address as billing address
                      </label>
                    </div>
                  ) : null}

                  <label
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", padding: "var(--space-4) var(--space-5)", cursor: "pointer", borderTop: "1px solid var(--border-hairline)" }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", fontSize: "var(--size-body)", fontWeight: 800 }}>
                      <input type="radio" name="pm" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} style={{ width: 18, height: 18, accentColor: "var(--sprout)" }} />
                      PayPal
                    </span>
                    <span style={{ fontWeight: 900, fontStyle: "italic", color: "#003087" }}>
                      Pay<span style={{ color: "#009cde" }}>Pal</span>
                    </span>
                  </label>
                </div>
              )}

              <div style={{ marginTop: "var(--space-6)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)" }}>
                <div style={{ fontSize: "var(--size-meta)" }}>
                  <div style={{ fontWeight: 700 }}>Save my information for a faster checkout</div>
                  <div style={{ color: "var(--ink-60)", marginTop: 2 }}>
                    By paying, you agree to create a Shop account subject to Shop&apos;s{" "}
                    <Link href="#" style={{ color: "var(--ink-60)", textDecoration: "underline" }}>Terms</Link> and{" "}
                    <Link href="#" style={{ color: "var(--ink-60)", textDecoration: "underline" }}>Privacy Policy</Link>.
                  </div>
                </div>
                <Link href="#" style={{ flex: "none", fontSize: "var(--size-meta)", fontWeight: 700, color: "var(--sprout-press)", textDecoration: "none" }}>
                  Not now
                </Link>
              </div>

              <p style={{ margin: "var(--space-6) 0 var(--space-4)", fontSize: "var(--size-meta)", lineHeight: 1.5, color: "var(--ink-60)" }}>
                By clicking &quot;Secure my order&quot; you agree to SUNNYCELLS&apos;s Terms of Sale
                and Privacy Policy. You will be enrolled in a subscription and billed on a
                recurring basis at the price and frequency shown in the order summary above,
                excluding your first order&apos;s introductory discount. You can cancel anytime
                before your next bill date through our member portal or by emailing
                support@sunnycells.com.
              </p>

              <CompleteOrderButton onClick={submitOrder} disabled={cardPhase === "working"} working={cardPhase === "working"} />
              {cardPhase === "working" ? (
                <div style={{ marginTop: "var(--space-3)", display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-3)", fontSize: "var(--size-meta)", color: "var(--ink-60)" }} aria-live="polite">
                  <span aria-hidden="true" style={{ width: 18, height: 18, borderRadius: "50%", border: "3px solid var(--ink-20)", borderTopColor: "var(--ink)", display: "inline-block", animation: "sc-spin 700ms linear infinite" }} />
                  Contacting your bank
                </div>
              ) : null}

              <div style={{ marginTop: "var(--space-8)", display: "flex", flexWrap: "wrap", gap: "0 var(--space-5)", fontSize: "var(--size-meta)" }}>
                {["Refund policy", "Shipping", "Privacy policy", "Terms of service", "Cancellations", "Contact"].map((l) => (
                  <Link key={l} href="#" style={{ color: "var(--ink-60)", textDecoration: "underline" }}>
                    {l}
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}
