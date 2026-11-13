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
  if (event.type !== "invoice.paid" && event.type !== "payment_intent.succeeded") return NextResponse.json({ ignored: event.type });

  const st = stripe();
  /* Two things pay for an order. An invoice, for subscriptions. A bare payment, for the one time oil buy, which is not
     an invoice because Elements cannot confirm an invoice's card-only payment on the one time checkout. Both are
     reduced to the same few facts here, and everything after is shared. */
  const invoice = event.type === "invoice.paid" ? (event.data.object as Stripe.Invoice) : null;
  const pay = event.type === "payment_intent.succeeded" ? (event.data.object as Stripe.PaymentIntent) : null;
  const refId = (invoice?.id ?? pay?.id)!;
  try {
    const subId = invoice?.parent?.subscription_details?.subscription;
    const subscriptionId = typeof subId === "string" ? subId : subId?.id;
    const meta = pay ? pay.metadata ?? {} : invoice!.parent?.subscription_details?.metadata ?? {};
    const once = !!pay && meta.plan === "once";
    if ((pay ? !once : !subscriptionId) || meta.funnel !== "fridayzoomies") return NextResponse.json({ ignored: "not friday zoomies" });
    /* The first invoice of a subscription, or the whole of a one time buy. */
    const isFirst = once || invoice?.billing_reason === "subscription_create";

    /* Retries replay the original event, so ask Stripe for the payment as it is now. The order name
       we wrote back is the reliable duplicate check; Shopify's tag search can lag a few seconds. */
    const fresh = pay ? await st.paymentIntents.retrieve(refId) : await st.invoices.retrieve(refId);
    if (fresh.metadata?.shopify_order) return NextResponse.json({ duplicate: fresh.metadata.shopify_order });
    const existing = await findOrder(refId);
    if (existing) return NextResponse.json({ duplicate: existing.name });

    const cust = (pay ?? invoice!).customer;
    const customerId = typeof cust === "string" ? cust : cust!.id;
    const customer = (await st.customers.retrieve(customerId)) as Stripe.Customer;
    const ship = customer.shipping?.address;
    if (!ship || !customer.email) throw new Error("customer has no shipping address or email");

    /* A one time buy records its discount in the payment's metadata (the test code is the only one), in cents. */
    const discount = pay
      ? Number(meta.discount_cents || 0) / 100
      : (invoice!.total_discount_amounts ?? []).reduce((n, d) => n + d.amount, 0) / 100;
    let label = pay ? "TESTV3" : "Stripe discount";
    if (invoice) {
      try {
        const full = await st.invoices.retrieve(invoice.id!, { expand: ["discounts.promotion_code"] });
        const d = full.discounts?.[0];
        const code = d && typeof d !== "string" && typeof d.promotion_code === "object" ? d.promotion_code?.code : null;
        if (code) label = code;
      } catch {}
    }
    const paidDollars = pay ? pay.amount_received / 100 : invoice!.amount_paid / 100;

    const order = await createOrder({
      invoiceId: refId,
      customerId,
      subscriptionId,
      email: customer.email,
      name: customer.shipping?.name || customer.name || customer.email,
      phone: customer.shipping?.phone || customer.phone || undefined,
      address: { line1: ship.line1 ?? "", line2: ship.line2 ?? undefined, city: ship.city ?? "", state: ship.state ?? "", postal_code: ship.postal_code ?? "", country: ship.country ?? "US" },
      price: once ? OIL_PLANS.once.entry : (invoice!.subtotal ?? 0) / 100,
      shipping: once ? OIL_SHIPPING : 0,
      /* The 3 month supply ships 3 bottles on its first order; every rebill, and every other plan, is 1. */
      bottles: isFirst && meta.plan === "3" ? OIL_PLANS["3"].bottles : 1,
      paid: paidDollars,
      discount,
      discountLabel: label,
      first: isFirst,
      oil: meta.product === "oil",
      test: !event.livemode,
    });

    await (pay ? st.paymentIntents.update(refId, { metadata: { shopify_order: order.name } }) : st.invoices.update(refId, { metadata: { shopify_order: order.name } })).catch(() => {});
    await sendAlert(
      `New order ${order.name}: ${customer.email}, $${paidDollars}`,
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
      const tagged = await tagPurchaser({ email: customer.email, firstName: name.trim().split(/\s+/)[0], invoiceId: refId, orderName: order.name });
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
    console.error("fz webhook", refId, e);
    await sendAlert(
      `ORDER SYNC FAILED: ${refId}`,
      `<p>Payment <strong>${esc(refId)}</strong> was paid in Stripe but the Shopify order was not created.</p><p>${esc(e instanceof Error ? e.message : String(e))}</p><p>Stripe will retry. If it keeps failing, create the order by hand.</p>`,
      { ownerOnly: true },
    );
    return NextResponse.json({ error: "order sync failed" }, { status: 500 });
  }
}
