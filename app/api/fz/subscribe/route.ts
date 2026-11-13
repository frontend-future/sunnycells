import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { quotePromo } from "@/lib/stripe/promo";
import { markCheckoutStarted } from "@/lib/loops";
import { OIL_PLANS, OIL_RECUR, OIL_RECUR_KEY, OIL_SHIPPING, OIL_SHIPPING_KEY, isOilPlan, isTestCode, testOff } from "@/lib/quiz/fzPlans";

/* Friday Zoomies checkout. Creates the customer and the Inside-Out Itch Bundle subscription
   (STRIPE_FZ_PRICE_ID, every 4 weeks) with the FIRST50 promotion code attached, left
   incomplete until the browser confirms payment with the returned client secret. The price
   and the code come from env, never from the request, so the page cannot choose its own. */

type Body = {
  email?: string;
  name?: string;
  phone?: string;
  promoCode?: string;
  product?: string;
  plan?: string;
  shipping?: { line1?: string; line2?: string; city?: string; state?: string; postal_code?: string; country?: string };
};

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Body;
  /* Only the product name comes from the page; the price is env. "oil" is Pure Omega Salmon Oil. */
  const oil = b.product === "oil";
  const plan = oil && isOilPlan(b.plan) ? b.plan : null;
  const priceId = oil ? process.env.STRIPE_FZ_OIL_PRICE_ID : process.env.STRIPE_FZ_PRICE_ID;
  const promoId = process.env.STRIPE_FZ_PROMO_ID;
  if (!priceId && !plan) return NextResponse.json({ error: "Checkout is not configured." }, { status: 500 });

  const email = text(b.email);
  const name = text(b.name);
  const s = b.shipping ?? {};
  const digits = text(b.phone).replace(/\D/g, "");
  if (digits.length < 10) {
    return NextResponse.json({ error: "Add a phone number so we can text you about your order." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email) || !name || !text(s.line1) || !text(s.city) || !text(s.state) || !text(s.postal_code)) {
    return NextResponse.json({ error: "Check your email and shipping address." }, { status: 400 });
  }

  try {
    const address = {
      line1: text(s.line1),
      line2: text(s.line2) || undefined,
      city: text(s.city),
      state: text(s.state),
      postal_code: text(s.postal_code),
      country: text(s.country) || "US",
    };
    /* Stored as E.164 whatever the format typed: +16787358452. */
    const phone = digits.length === 10 ? `+1${digits}` : `+${digits}`;

    const st = stripe();
    /* A typed code replaces the standing FIRST50; an unknown one stops the order. */
    let promotion = promoId;
    if (text(b.promoCode) && !plan) {
      const q = await quotePromo(text(b.promoCode), 5000);
      if (!q) return NextResponse.json({ error: "That discount code is not valid." }, { status: 400 });
      promotion = q.id;
    }
    /* A returning email reuses its customer so one dog parent is not three records. */
    const existing = (await st.customers.list({ email, limit: 1 })).data[0];
    const customer = existing
      ? await st.customers.update(existing.id, { name, phone, shipping: { name, phone, address } })
      : await st.customers.create({ email, name, phone, shipping: { name, phone, address } });

    /* The v3 plans. Prices are looked up in Stripe by key and their amounts checked against fzPlans, so
       the page cannot choose a price and a mistyped one in the dashboard stops the order. The entry
       price is a one time charge on the first invoice, and a trial holds the first rebill back:
       28 days for the trial, 84 for the 3 month supply. The one time buy is an invoice with no
       subscription. No discount code applies: the plan prices are already the offer. */
    if (plan) {
      const P = OIL_PLANS[plan];
      const keys = [P.key, ...(plan === "once" ? [OIL_SHIPPING_KEY] : [OIL_RECUR_KEY])];
      const found = (await st.prices.list({ lookup_keys: keys, active: true, limit: 10 })).data;
      const get = (key: string, dollars: number) => {
        const p = found.find((x) => x.lookup_key === key);
        if (!p || p.unit_amount !== Math.round(dollars * 100)) throw new Error(`Stripe price ${key} is missing or not $${dollars}`);
        return p.id;
      };
      /* The test code, and only it, is allowed on a plan. */
      if (text(b.promoCode) && !isTestCode(b.promoCode)) return NextResponse.json({ error: "That discount code is not valid." }, { status: 400 });
      const testing = !!text(b.promoCode);
      const test = testing && plan !== "once" ? (await st.coupons.create({ amount_off: testOff(plan), currency: "usd", duration: "once", max_redemptions: 1, name: "TESTV3 $1 test order" })).id : null;
      let secret: string | undefined;
      let ref: string;
      if (plan === "once") {
        /* Prices are checked, then the charge is a plain payment (card, Apple Pay and the rest, automatically), not an
           invoice: Elements cannot confirm an invoice's card-only payment here. The webhook reads the plan and the
           discount from its metadata. */
        get(P.key, P.entry);
        get(OIL_SHIPPING_KEY, OIL_SHIPPING);
        const off = testing ? testOff(plan) : 0;
        const pi = await st.paymentIntents.create({
          amount: Math.round((P.entry + OIL_SHIPPING) * 100) - off,
          currency: "usd",
          customer: customer.id,
          automatic_payment_methods: { enabled: true },
          shipping: { name, phone, address },
          description: "Pure Omega Salmon Oil, one time purchase",
          metadata: { funnel: "fridayzoomies", product: "oil", plan, ...(off ? { discount_cents: String(off) } : {}) },
        });
        secret = pi.client_secret ?? undefined;
        ref = pi.id;
      } else {
        const s = await st.subscriptions.create({
          customer: customer.id,
          items: [{ price: get(OIL_RECUR_KEY, OIL_RECUR) }],
          add_invoice_items: [{ price: get(P.key, P.entry), ...(test ? { discounts: [{ coupon: test }] } : {}) }],
          trial_end: Math.floor(Date.now() / 1000) + P.days * 86400,
          payment_behavior: "default_incomplete",
          payment_settings: { save_default_payment_method: "on_subscription" },
          metadata: { funnel: "fridayzoomies", product: "oil", plan },
          expand: ["latest_invoice.confirmation_secret"],
        });
        const inv = s.latest_invoice;
        secret = typeof inv === "object" && inv ? inv.confirmation_secret?.client_secret ?? undefined : undefined;
        ref = s.id;
      }
      if (!secret) return NextResponse.json({ error: "Could not start the payment." }, { status: 502 });
      await markCheckoutStarted(email);
      return NextResponse.json({ clientSecret: secret, subscriptionId: ref });
    }

    const sub = await st.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId! }],
      ...(promotion ? { discounts: [{ promotion_code: promotion }] } : {}),
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      metadata: oil ? { funnel: "fridayzoomies", product: "oil" } : { funnel: "fridayzoomies", gifts: "itch-spray,usa-doggie-bandana,mystery-gift,fast-usa-shipping" },
      expand: ["latest_invoice.confirmation_secret"],
    });

    const invoice = sub.latest_invoice;
    const clientSecret = typeof invoice === "object" && invoice ? invoice.confirmation_secret?.client_secret : undefined;
    if (!clientSecret) return NextResponse.json({ error: "Could not start the payment." }, { status: 502 });
    /* Starts the cart abandon emails; the purchase webhook flips isCustomer, which ends them. */
    await markCheckoutStarted(email);
    return NextResponse.json({ clientSecret, subscriptionId: sub.id });
  } catch (e) {
    console.error("fz subscribe", e);
    return NextResponse.json({ error: "We could not start your order. Try again." }, { status: 502 });
  }
}
