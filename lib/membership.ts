import { createHmac, timingSafeEqual } from "node:crypto";
import type Stripe from "stripe";
import { Resend } from "resend";
import { stripe } from "@/lib/stripe/server";
import { sendAlert } from "@/lib/alert";
import { weeksOf } from "@/lib/portal";

/* The /membership page. Everything here READS Stripe except the three actions in applyAction,
   and those only run when FZ_MEMBERSHIP_WRITES=on. With it off, a customer's choice is emailed to
   the owner as a request and nothing on any subscription changes. */

export const MEMBERSHIP_ORIGIN = "https://offers.fridayzoomies.com";
export const writesOn = () => process.env.FZ_MEMBERSHIP_WRITES === "on";

/* The proposed "too expensive" offer: this much off each of the next two boxes. Change here. */
export const SAVE_OFFER = { dollars: 15, months: 2 } as const;
/* The second, stronger offer, shown only after the first is declined: $25 boxes, the first-order price. */
export const SAVE_OFFER_2 = { dollars: 25, months: 2 } as const;
const CYCLE_SECONDS = 28 * 86_400;
const LIVE = ["active", "past_due", "trialing"];

/* A magic link proves the visitor owns the email. Signed with HMAC, 30 minutes, email inside.
   The secret falls back to the Stripe key so this works before a dedicated one is set. */
const secret = () => process.env.FZ_MEMBERSHIP_SECRET ?? process.env.STRIPE_SECRET_KEY ?? "";
const sign = (s: string) => createHmac("sha256", secret()).update(s).digest("base64url");

export function makeToken(email: string): string {
  const body = `${Buffer.from(email.toLowerCase()).toString("base64url")}.${Date.now() + 30 * 60_000}`;
  return `${body}.${sign(body)}`;
}

export function readToken(token: string | undefined): string | null {
  const [e, exp, sig] = (token ?? "").split(".");
  if (!e || !exp || !sig || !secret()) return null;
  const good = Buffer.from(sign(`${e}.${exp}`));
  const got = Buffer.from(sig);
  if (good.length !== got.length || !timingSafeEqual(good, got) || Number(exp) < Date.now()) return null;
  return Buffer.from(e, "base64url").toString();
}

export type Membership = {
  id: string;
  email: string;
  dogName: string | null;
  firstName: string | null;
  nextBox: number | null; // unix seconds of the next charge
  boxes: number;
  paused: boolean;
  cancelling: boolean;
  hasDiscount: boolean;
  endedAt: number | null; // unix seconds, set when the membership is cancelled
  /* What the portal shows. All read from Stripe, none of it assumes a particular product. */
  product: { name: string; image: string | null };
  quantity: number;
  unitCents: number; // one unit, before any discount
  weeks: number; // ships every N weeks
  since: number; // unix seconds, first order
  card: { brand: string; last4: string; exp: string } | null;
  shipTo: string[]; // address lines, empty when none on file
  orders: { at: number; cents: number }[]; // paid invoices, newest first
};

async function dogNameFor(email: string): Promise<string | null> {
  const key = process.env.LOOPS_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`https://app.loops.so/api/v1/contacts/find?email=${encodeURIComponent(email)}`, {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(5_000),
    });
    const c = res.ok ? ((await res.json()) as { dogName?: string }[])[0] : undefined;
    return c?.dogName?.trim() || null;
  } catch {
    return null;
  }
}

/* "jake lundkovsky" and "CAROLYN HARVEY" both come back as a clean first name. Anything that does not look like a
   name (an email, initials, digits) returns null and the page just skips the personal touch. */
export function firstNameOf(full: string | null | undefined): string | null {
  const t = (full ?? "").trim().split(/\s+/)[0] ?? "";
  if (t.length < 2 || !/^[\p{L}'’-]+$/u.test(t)) return null;
  return t === t.toUpperCase() || t === t.toLowerCase() ? t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() : t;
}

/* A live Friday Zoomies subscription wins; otherwise the most recently ended one, so a cancelled
   customer sees "cancelled" instead of "not found". Abandoned checkouts (incomplete) never count. */
export function pickSubscription(subs: Stripe.Subscription[]): Stripe.Subscription | undefined {
  const fz = subs.filter((s) => s.metadata?.funnel === "fridayzoomies" && !s.status.startsWith("incomplete"));
  const ended = (s: Stripe.Subscription) => s.ended_at ?? s.canceled_at ?? s.created;
  return fz.find((s) => LIVE.includes(s.status)) ?? fz.sort((a, b) => ended(b) - ended(a))[0];
}

/* The product name and photo come from Stripe, so a salmon oil customer sees salmon oil. Never throws. */
async function productOf(st: Stripe, ref: string | Stripe.Product | Stripe.DeletedProduct | undefined): Promise<Membership["product"]> {
  try {
    const p = typeof ref === "string" ? await st.products.retrieve(ref) : ref;
    if (p && !("deleted" in p && p.deleted)) return { name: p.name, image: p.images?.[0] ?? null };
  } catch {}
  return { name: "Your order", image: null };
}

async function cardOf(st: Stripe, sub: Stripe.Subscription, cust: Stripe.Customer | undefined): Promise<Membership["card"]> {
  try {
    const ref = sub.default_payment_method ?? cust?.invoice_settings?.default_payment_method;
    if (!ref) return null;
    const pm = typeof ref === "string" ? await st.paymentMethods.retrieve(ref) : ref;
    const c = pm.card;
    return c ? { brand: c.brand, last4: c.last4, exp: `${String(c.exp_month).padStart(2, "0")}/${String(c.exp_year).slice(-2)}` } : null;
  } catch {
    return null;
  }
}

function addressLines(cust: Stripe.Customer | undefined): string[] {
  const a = cust?.shipping?.address ?? cust?.address;
  if (!a) return [];
  return [cust?.shipping?.name, a.line1, a.line2, [a.city, a.state, a.postal_code].filter(Boolean).join(", ")].filter((x): x is string => !!x);
}

/* READ ONLY. Finds the customer's Friday Zoomies subscription by email. Other funnels'
   subscriptions on the same Stripe account are ignored. */
export async function findMembership(emailIn: string): Promise<Membership | null> {
  const email = emailIn.trim();
  const st = stripe();
  for (const e of new Set([email, email.toLowerCase()])) {
    const customers = (await st.customers.list({ email: e, limit: 10 })).data;
    const all: Stripe.Subscription[] = [];
    const owner = new Map<string, Stripe.Customer>();
    for (const c of customers) {
      const subs = (await st.subscriptions.list({ customer: c.id, status: "all", limit: 10 })).data;
      for (const x of subs) owner.set(x.id, c);
      all.push(...subs);
    }
    const sub = pickSubscription(all);
    if (!sub) continue;
    const cust = owner.get(sub.id);
    const paid = await st.invoices.list({ subscription: sub.id, status: "paid", limit: 100 });
    const live = LIVE.includes(sub.status);
    const item = sub.items.data[0];
    const product = await productOf(st, item?.price?.product);
    const card = await cardOf(st, sub, cust);
    return {
      id: sub.id,
      email: e.toLowerCase(),
      dogName: await dogNameFor(e),
      firstName: firstNameOf(cust?.shipping?.name || cust?.name),
      nextBox: live ? sub.items.data[0]?.current_period_end ?? null : null,
      boxes: paid.data.length,
      paused: !!sub.pause_collection,
      cancelling: sub.cancel_at_period_end,
      hasDiscount: sub.discounts.length > 0,
      endedAt: live ? null : sub.ended_at ?? sub.canceled_at ?? sub.created,
      product,
      quantity: item?.quantity ?? 1,
      unitCents: item?.price?.unit_amount ?? 0,
      weeks: weeksOf(item?.price?.recurring?.interval, item?.price?.recurring?.interval_count),
      since: sub.start_date ?? sub.created,
      card,
      shipTo: addressLines(cust),
      orders: paid.data.map((i) => ({ at: i.status_transitions?.paid_at ?? i.created, cents: i.amount_paid })),
    };
  }
  return null;
}

export type Action = "skip" | "cancel" | "discount" | "discount2";

/* The only code that changes a subscription. Each one touches one field and re-reads the
   subscription first, so a stale page cannot double-apply. Returns false when it declined. */
export async function applyAction(m: Membership, action: Action, meta: { reason?: string; note?: string }): Promise<boolean> {
  const st = stripe();
  const sub: Stripe.Subscription = await st.subscriptions.retrieve(m.id);
  if (!LIVE.includes(sub.status) || sub.metadata?.funnel !== "fridayzoomies") return false;
  if (action === "skip") {
    const next = sub.items.data[0]?.current_period_end;
    if (!next || sub.pause_collection) return false;
    // Voids the next invoice, then collection resumes a day before the cycle after it.
    await st.subscriptions.update(sub.id, { pause_collection: { behavior: "void", resumes_at: next + CYCLE_SECONDS - 86_400 } });
    return true;
  }
  if (action === "cancel") {
    if (sub.cancel_at_period_end) return false;
    await st.subscriptions.update(sub.id, {
      cancel_at_period_end: true,
      metadata: { cancel_reason: meta.reason ?? "", cancel_note: (meta.note ?? "").slice(0, 400) },
    });
    return true;
  }
  if (sub.discounts.length > 0) return false; // setting discounts replaces the list, so never overwrite one
  const offer = action === "discount2" ? SAVE_OFFER_2 : SAVE_OFFER;
  const couponId = `FZ-SAVE-${offer.dollars}-${offer.months}MO`;
  try {
    await st.coupons.retrieve(couponId);
  } catch {
    await st.coupons.create({
      id: couponId,
      name: `Membership save offer, $${offer.dollars} off`,
      amount_off: offer.dollars * 100,
      currency: "usd",
      duration: "repeating",
      duration_in_months: offer.months,
    });
  }
  await st.subscriptions.update(sub.id, { discounts: [{ coupon: couponId }] });
  return true;
}

export async function sendMagicLink(email: string, dogName: string | null) {
  const key = process.env.RESEND_API_KEY;
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  if (!key || !domain) throw new Error("Resend is not configured");
  const link = `${MEMBERSHIP_ORIGIN}/membership?t=${makeToken(email)}`;
  const who = dogName ? `${dogName}'s membership` : "your membership";
  const { error } = await new Resend(key).emails.send({
    from: `Friday Zoomies <notifications@${domain}>`,
    to: email,
    subject: `Manage ${who}`,
    html: `<div style="font-family:sans-serif;font-size:16px;line-height:1.7;color:#14213D"><p>Hi, it's Jake from Friday Zoomies.</p><p>Here is your link to manage ${who}. It works for 30 minutes.</p><p><a href="${link}" style="color:#2F5FD0">Manage my membership</a></p><p>If you didn't ask for this, you can ignore it. Nothing changes.</p></div>`,
  });
  if (error) throw new Error(error.message);
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* The owner's email for every form submission on the page. Never throws. */
export function notifyOwner(title: string, email: string, lines: Record<string, string | number | boolean | null | undefined>) {
  const rows = Object.entries(lines)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5C6675;vertical-align:top">${esc(k)}</td><td>${esc(String(v))}</td></tr>`)
    .join("");
  return sendAlert(`Membership: ${title}: ${email}`, `<h2 style="margin:0 0 12px">${esc(title)}</h2><p><strong>Email:</strong> ${esc(email)}</p><table style="border-collapse:collapse;font-size:13px">${rows}</table>`, { ownerOnly: true, to: "jake@fridayzoomies.com" });
}
