import { shopify } from "./admin";

/* Variants already in the Friday Zoomies Shopify store. The bundle is the subscription
   product; the rest are $0 gifts that ship with the first order only. */
export const BUNDLE = "gid://shopify/ProductVariant/50538190831686";
export const GIFTS = [
  "gid://shopify/ProductVariant/50538941612102", // Itch Spray
  "gid://shopify/ProductVariant/50538801856582", // USA Doggie Bandana
  "gid://shopify/ProductVariant/50538860150854", // Mystery Gift
  "gid://shopify/ProductVariant/50538818535494", // Fast USA Shipping
];

export type OrderInput = {
  invoiceId: string;
  customerId: string;
  subscriptionId: string;
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
  test: boolean;
  /** The two customer emails Shopify can send. Off only in scripted tests. */
  notify?: boolean;
};

const money = (n: number) => ({ shopMoney: { amount: n.toFixed(2), currencyCode: "USD" } });
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
      { variantId: BUNDLE, quantity: 1, priceSet: money(o.price) },
      ...(o.first ? GIFTS.map((variantId) => ({ variantId, quantity: 1, priceSet: money(0) })) : []),
    ],
    shippingLines: [{ title: "Standard shipping", code: "FREE", priceSet: money(0) }],
    ...(o.discount > 0 ? { discountCode: { itemFixedDiscountCode: { code: o.discountLabel, amountSet: money(o.discount) } } } : {}),
    transactions: [{ kind: "SALE", status: "SUCCESS", gateway: "stripe", amountSet: money(o.paid), test: o.test }],
    tags: ["stripe", "fridayzoomies", o.first ? "first-order" : "renewal", tagFor(o.invoiceId)],
    sourceName: "stripe-checkout",
    sourceIdentifier: o.invoiceId,
    note: `Stripe invoice ${o.invoiceId}, subscription ${o.subscriptionId}, customer ${o.customerId}`,
    customAttributes: [
      { key: "stripe_invoice", value: o.invoiceId },
      { key: "stripe_subscription", value: o.subscriptionId },
      { key: "stripe_customer", value: o.customerId },
    ],
  };

  const d = await shopify<{ orderCreate: { order: { id: string; name: string } | null; userErrors: { field: string[]; message: string }[] } }>(
    `mutation($order:OrderCreateOrderInput!,$options:OrderCreateOptionsInput){
      orderCreate(order:$order, options:$options){ order{id name} userErrors{field message} }
    }`,
    {
      order,
      options: {
        sendReceipt: o.notify ?? true,
        sendFulfillmentReceipt: o.notify ?? true,
        inventoryBehaviour: "DECREMENT_IGNORING_POLICY",
      },
    },
  );
  const { order: made, userErrors } = d.orderCreate;
  if (!made) throw new Error(`Shopify orderCreate: ${userErrors.map((e) => `${e.field?.join(".")}: ${e.message}`).join("; ")}`);
  return made;
}
