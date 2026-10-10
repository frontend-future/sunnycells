import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { quotePromo } from "@/lib/stripe/promo";

/* Friday Zoomies checkout. Creates the customer and the Inside-Out Itch Bundle subscription
   (STRIPE_FZ_PRICE_ID, every 4 weeks) with the FIRST50 promotion code attached, left
   incomplete until the browser confirms payment with the returned client secret. The price
   and the code come from env, never from the request, so the page cannot choose its own. */

type Body = {
  email?: string;
  name?: string;
  phone?: string;
  promoCode?: string;
  shipping?: { line1?: string; line2?: string; city?: string; state?: string; postal_code?: string; country?: string };
};

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  const priceId = process.env.STRIPE_FZ_PRICE_ID;
  const promoId = process.env.STRIPE_FZ_PROMO_ID;
  if (!priceId) return NextResponse.json({ error: "Checkout is not configured." }, { status: 500 });

  const b = (await req.json().catch(() => ({}))) as Body;
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
    if (text(b.promoCode)) {
      const q = await quotePromo(text(b.promoCode), 5000);
      if (!q) return NextResponse.json({ error: "That discount code is not valid." }, { status: 400 });
      promotion = q.id;
    }
    /* A returning email reuses its customer so one dog parent is not three records. */
    const existing = (await st.customers.list({ email, limit: 1 })).data[0];
    const customer = existing
      ? await st.customers.update(existing.id, { name, phone, shipping: { name, phone, address } })
      : await st.customers.create({ email, name, phone, shipping: { name, phone, address } });

    const sub = await st.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      ...(promotion ? { discounts: [{ promotion_code: promotion }] } : {}),
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      metadata: { funnel: "fridayzoomies", gifts: "itch-spray,usa-doggie-bandana,mystery-gift,fast-usa-shipping" },
      expand: ["latest_invoice.confirmation_secret"],
    });

    const invoice = sub.latest_invoice;
    const clientSecret = typeof invoice === "object" && invoice ? invoice.confirmation_secret?.client_secret : undefined;
    if (!clientSecret) return NextResponse.json({ error: "Could not start the payment." }, { status: 502 });
    return NextResponse.json({ clientSecret, subscriptionId: sub.id });
  } catch (e) {
    console.error("fz subscribe", e);
    return NextResponse.json({ error: "We could not start your order. Try again." }, { status: 502 });
  }
}
