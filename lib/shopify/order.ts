import { shopify } from "./admin";

/* Variants already in the Friday Zoomies Shopify store. The bundle is the subscription
   product; the rest are $0 gifts that ship with the first order only. */
export const BUNDLE = "gid://shopify/ProductVariant/50538190831686";
/** Pure Omega Salmon Oil (1 Month Supply), $50 on its own subscription, no gifts. */
export const OIL = "gid://shopify/ProductVariant/50933557198918";
export const GIFTS = [
  "gid://shopify/ProductVariant/50538941612102", // Itch Spray
  "gid://shopify/ProductVariant/50538801856582", // USA Doggie Bandana
  "gid://shopify/ProductVariant/50538860150854", // Mystery Gift
  "gid://shopify/ProductVariant/50538818535494", // Fast USA Shipping
];

export type OrderInput = {
  invoiceId: string;
  customerId: string;
  /** Absent on a one time buy. */
  subscriptionId?: string;
  email: string;
  name: string;
  phone?: string;
  address: { line1: string; line2?: string; city: string; state: string; postal_code: string; country: string };
  /** Dollars, from Stripe. */
  price: number;
  paid: number;
  discount: number;
  discountLabel: string;
  first: boolean;
  oil?: boolean;
  /** Bottles on the first line. The 3 month supply is 3. */
  bottles?: number;
  /** Dollars charged for shipping, 0 when free. */
  shipping?: number;
  test: boolean;
  /** The two customer emails Shopify can send. Off only in scripted tests. */
  notify?: boolean;
};

const money = (n: number) => ({ shopMoney: { amount: n.toFixed(2), currencyCode: "USD" } });
/* A total over several bottles, in whole cents that add up exactly: 3 bottles for $74.99 is one at $25.01 and two at $24.99. */
function bottleLines(total: number, qty: number) {
  const cents = Math.round(total * 100);
  const base = Math.floor(cents / qty);
  const extra = cents - base * qty;
  return extra && qty > 1
    ? [{ qty: 1, price: (base + extra) / 100 }, { qty: qty - 1, price: base / 100 }]
    : [{ qty, price: base / 100 }];
}
const tagFor = (invoiceId: string) => `stripe-${invoiceId}`;

/** The Shopify order already made for this invoice, if any, so a retried webhook never doubles it. */
export async function findOrder(invoiceId: string): Promise<{ id: string; name: string } | null> {
  const d = await shopify<{ orders: { nodes: { id: string; name: string }[] } }>(
    `query($q:String!){orders(first:1,query:$q){nodes{id name}}}`,
    { q: `tag:${tagFor(invoiceId)}` },
  );
  return d.orders.nodes[0] ?? null;
}

export async function createOrder(o: OrderInput): Promise<{ id: string; name: string }> {
  const [firstName, ...rest] = o.name.split(" ");
  const lastName = rest.join(" ") || firstName;
  const address = {
    firstName, lastName, address1: o.address.line1, address2: o.address.line2, city: o.address.city,
    provinceCode: o.address.state, zip: o.address.postal_code, countryCode: o.address.country || "US", phone: o.phone,
  };

  const order = {
    email: o.email,
    phone: o.phone,
    currency: "USD",
    test: o.test,
    customer: { toUpsert: { email: o.email, firstName, lastName, phone: o.phone } },
    shippingAddress: address,
    billingAddress: address,
    lineItems: [
      ...bottleLines(o.price, o.bottles ?? 1).map((l) => ({ variantId: o.oil ? OIL : BUNDLE, quantity: l.qty, requiresShipping: true, priceSet: money(l.price) })),
      ...(o.first && !o.oil ? GIFTS.map((variantId) => ({ variantId, quantity: 1, requiresShipping: true, priceSet: money(0) })) : []),
    ],
    shippingLines: [{ title: "Standard shipping", code: o.shipping ? "STANDARD" : "FREE", priceSet: money(o.shipping ?? 0) }],
    ...(o.discount > 0 ? { discountCode: { itemFixedDiscountCode: { code: o.discountLabel, amountSet: money(o.discount) } } } : {}),
    transactions: [{ kind: "SALE", status: "SUCCESS", gateway: "stripe", amountSet: money(o.paid), test: o.test }],
    tags: ["stripe", "fridayzoomies", o.first ? "first-order" : "renewal", ...(o.subscriptionId ? [] : ["one-time"]), tagFor(o.invoiceId)],
    sourceName: "stripe-checkout",
    sourceIdentifier: o.invoiceId,
    note: `Stripe invoice ${o.invoiceId}, ${o.subscriptionId ? `subscription ${o.subscriptionId}` : "one time purchase"}, customer ${o.customerId}`,
    customAttributes: [
      { key: "stripe_invoice", value: o.invoiceId },
      ...(o.subscriptionId ? [{ key: "stripe_subscription", value: o.subscriptionId }] : []),
      { key: "stripe_customer", value: o.customerId },
    ],
  };

  const run = (ord: typeof order) =>
    shopify<{ orderCreate: { order: { id: string; name: string } | null; userErrors: { field: string[]; message: string }[] } }>(
      `mutation($order:OrderCreateOrderInput!,$options:OrderCreateOptionsInput){
        orderCreate(order:$order, options:$options){ order{id name} userErrors{field message} }
      }`,
      {
        order: ord,
        options: {
          /* First orders only. A renewal is announced by the pre-billing email in Loops, so no order confirmation. */
          sendReceipt: o.first && (o.notify ?? true),
          sendFulfillmentReceipt: o.first && (o.notify ?? true),
          inventoryBehaviour: "DECREMENT_IGNORING_POLICY",
        },
      },
    );
  let d = await run(order);
  /* Shopify keeps a phone number on one customer only. Someone ordering again under a new email with the
     same phone (a second address, a partner, a test) would fail the whole order and everything after it
     (CRM row, Loops tag, alert). The phone stays on the order and the shipping address; only the new
     customer record goes without it. */
  if (!d.orderCreate.order && d.orderCreate.userErrors.some((e) => /phone number has already been taken/i.test(e.message))) {
    d = await run({ ...order, customer: { toUpsert: { email: o.email, firstName, lastName, phone: undefined } } });
  }
  const { order: made, userErrors } = d.orderCreate;
  if (!made) throw new Error(`Shopify orderCreate: ${userErrors.map((e) => `${e.field?.join(".")}: ${e.message}`).join("; ")}`);
  return made;
}
