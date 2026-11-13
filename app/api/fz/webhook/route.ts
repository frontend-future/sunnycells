import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/server";
import { createOrder, findOrder } from "@/lib/shopify/order";
import { sendAlert } from "@/lib/alert";
import { recordOrderInSheet, sheetDates } from "@/lib/leads-sheet";
import { tagPurchaser, notifyUpcomingShipment } from "@/lib/loops";
import { OIL_PLANS, OIL_SHIPPING } from "@/lib/quiz/fzPlans";

export const maxDuration = 30;

/* Stripe tells us a Friday Zoomies invoice was paid, and we make the matching Shopify order so
   fulfillment and Shopify's own customer emails (order confirmation, shipping) take over.
   The first invoice of a subscription is the first order and carries the free gifts; every
   later one is a renewal with the bundle only. A failure returns 500 so Stripe retries, and
   emails you so it is not missed. */
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  if (!secret || !sig) return NextResponse.json({ error: "not configured" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(await req.text(), sig, secret);
  } catch {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }
  /* A renewal charge is coming up: the Stripe setting sets how many days ahead. Loops sends the
     pre-shipping email. Live Friday Zoomies renewals only. */
  if (event.type === "invoice.upcoming") {
    const up = event.data.object as Stripe.Invoice;
    if (!event.livemode || up.parent?.subscription_details?.metadata?.funnel !== "fridayzoomies" || !up.customer_email) {
      return NextResponse.json({ ignored: "not a live friday zoomies renewal" });
    }
    const when = up.next_payment_attempt ?? up.period_end;
    const sent = await notifyUpcomingShipment({ email: up.customer_email, eventId: event.id, chargeDate: new Date(when * 1000) });
    return NextResponse.json({ upcoming: sent });
  }
  if (event.type !== "invoice.paid") return NextResponse.json({ ignored: event.type });

  const st = stripe();
  const invoice = event.data.object as Stripe.Invoice;
  try {
    const subId = invoice.parent?.subscription_details?.subscription;
    const subscriptionId = typeof subId === "string" ? subId : subId?.id;
    /* The one time oil buy is an invoice with no subscription; its plan rides on the invoice itself. */
    const once = !subscriptionId && invoice.metadata?.plan === "once";
    const meta = once ? invoice.metadata ?? {} : invoice.parent?.subscription_details?.metadata ?? {};
    if ((!subscriptionId && !once) || meta.funnel !== "fridayzoomies") return NextResponse.json({ ignored: "not friday zoomies" });
    /* The first invoice of a subscription, or the whole of a one time buy. */
    const isFirst = invoice.billing_reason === "subscription_create" || once;

    /* Retries replay the original event, so ask Stripe for the invoice as it is now. The order name
       we wrote back is the reliable duplicate check; Shopify's tag search can lag a few seconds. */
    const fresh = await st.invoices.retrieve(invoice.id!);
    if (fresh.metadata?.shopify_order) return NextResponse.json({ duplicate: fresh.metadata.shopify_order });
    const existing = await findOrder(invoice.id!);
    if (existing) return NextResponse.json({ duplicate: existing.name });

    const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer!.id;
    const customer = (await st.customers.retrieve(customerId)) as Stripe.Customer;
    const ship = customer.shipping?.address;
    if (!ship || !customer.email) throw new Error("customer has no shipping address or email");

    const discount = (invoice.total_discount_amounts ?? []).reduce((n, d) => n + d.amount, 0) / 100;
    let label = "Stripe discount";
    try {
      const full = await st.invoices.retrieve(invoice.id!, { expand: ["discounts.promotion_code"] });
      const d = full.discounts?.[0];
      const code = d && typeof d !== "string" && typeof d.promotion_code === "object" ? d.promotion_code?.code : null;
      if (code) label = code;
    } catch {}

    const order = await createOrder({
      invoiceId: invoice.id!,
      customerId,
      subscriptionId,
      email: customer.email,
      name: customer.shipping?.name || customer.name || customer.email,
      phone: customer.shipping?.phone || customer.phone || undefined,
      address: { line1: ship.line1 ?? "", line2: ship.line2 ?? undefined, city: ship.city ?? "", state: ship.state ?? "", postal_code: ship.postal_code ?? "", country: ship.country ?? "US" },
      price: ((invoice.subtotal ?? 0) - (once ? Math.round(OIL_SHIPPING * 100) : 0)) / 100,
      shipping: once ? OIL_SHIPPING : 0,
      /* The 3 month supply ships 3 bottles on its first order; every rebill, and every other plan, is 1. */
      bottles: isFirst && meta.plan === "3" ? OIL_PLANS["3"].bottles : 1,
      paid: invoice.amount_paid / 100,
      discount,
      discountLabel: label,
      first: isFirst,
      oil: meta.product === "oil",
      test: !event.livemode,
    });

    await st.invoices.update(invoice.id!, { metadata: { shopify_order: order.name } }).catch(() => {});
    await sendAlert(
      `New order ${order.name}: ${customer.email}, $${invoice.amount_paid / 100}`,
      `<p><strong>${isFirst ? "New order" : "Renewal"} ${esc(order.name)}</strong> was created in Shopify.</p>
       <p>${esc(customer.shipping?.name ?? "")} · ${esc(customer.email)}<br>${esc(ship.line1 ?? "")} ${esc(ship.line2 ?? "")}, ${esc(ship.city ?? "")}, ${esc(ship.state ?? "")} ${esc(ship.postal_code ?? "")}</p>`,
    );
    /* First orders only: renewals are the same customer, already in the sheet. */
    if (isFirst && event.livemode) {
      await recordOrderInSheet({
        email: customer.email,
        name: customer.shipping?.name || customer.name || "",
        phone: customer.shipping?.phone || customer.phone || "",
        address: [ship.line1, ship.line2, [ship.city, [ship.state, ship.postal_code].filter(Boolean).join(" ")].filter(Boolean).join(", ")]
          .filter(Boolean)
          .join(", "),
        orderName: order.name,
        ...sheetDates(new Date()),
      });
    }
    /* Flag them in Loops so the quiz follow up emails stop. A miss emails the owner so it can be fixed by hand. */
    if (isFirst && event.livemode) {
      const name = customer.shipping?.name || customer.name || "";
      const tagged = await tagPurchaser({ email: customer.email, firstName: name.trim().split(/\s+/)[0], invoiceId: invoice.id!, orderName: order.name });
      if (!tagged) {
        await sendAlert(
          `LOOPS TAG FAILED: ${customer.email}`,
          `<p>${esc(customer.email)} bought (${esc(order.name)}) but was not flagged as a customer in Loops. Set <strong>isCustomer</strong> to true on that contact so they do not get the quiz follow up emails.</p>`,
          { ownerOnly: true },
        );
      }
    }
    return NextResponse.json({ order: order.name });
  } catch (e) {
    console.error("fz webhook", invoice.id, e);
    await sendAlert(
      `ORDER SYNC FAILED: ${invoice.id}`,
      `<p>Invoice <strong>${esc(invoice.id ?? "")}</strong> was paid in Stripe but the Shopify order was not created.</p><p>${esc(e instanceof Error ? e.message : String(e))}</p><p>Stripe will retry. If it keeps failing, create the order by hand.</p>`,
      { ownerOnly: true },
    );
    return NextResponse.json({ error: "order sync failed" }, { status: 500 });
  }
}
