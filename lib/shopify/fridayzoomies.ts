/**
 * Friday Zoomies' real checkout is Shopify's. This builds a cart with the Inside-Out
 * Itch Bundle on its subscription selling plan, the four free gifts, and the FIRST50 code, then sends the
 * shopper to the checkout URL Shopify returns. The storefront token is Shopify's
 * public, read-and-cart-only kind, meant to ship in client code.
 *
 * One subscription variant: the 1, 3 and 6 month cards on the plans page do
 * not map to different Shopify lines yet, so every card checks out the same thing.
 */
const ENDPOINT = "https://fridayzoomies.myshopify.com/api/2026-07/graphql.json";
const STOREFRONT_TOKEN = "aa048768e839f6c468c7d0cee13c3c0f";
const LINES = [
  /* The subscription, on its selling plan. */
  { merchandiseId: "gid://shopify/ProductVariant/50538190831686", sellingPlanId: "gid://shopify/SellingPlan/6965690438", quantity: 1 },
  /* The freebies: $0 one-time products with no selling plan, so they ride along in the
     same cart. Bandana, Fast USA Shipping, Mystery Gift, Soothing Wipes. */
  { merchandiseId: "gid://shopify/ProductVariant/50538801856582", quantity: 1 },
  { merchandiseId: "gid://shopify/ProductVariant/50538818535494", quantity: 1 },
  { merchandiseId: "gid://shopify/ProductVariant/50538860150854", quantity: 1 },
  { merchandiseId: "gid://shopify/ProductVariant/50538941612102", quantity: 1 },
];
const DISCOUNT_CODE = "FIRST50";

const CART_CREATE = `mutation($lines:[CartLineInput!]!,$codes:[String!]){
  cartCreate(input:{lines:$lines, discountCodes:$codes}){
    cart{checkoutUrl} userErrors{message}
  }}`;

/** Resolves false, after telling the shopper, if Shopify gave no checkout URL, so the
    caller can let them try again. On success the page navigates away. */
export async function goToCheckout(): Promise<boolean> {
  try {
    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN },
      body: JSON.stringify({
        query: CART_CREATE,
        variables: { lines: LINES, codes: [DISCOUNT_CODE] },
      }),
    });
    const url = (await r.json()).data?.cartCreate?.cart?.checkoutUrl;
    if (url) {
      location.assign(url);
      return true;
    }
  } catch {
    /* falls through to the same message as a refused cart */
  }
  alert("Checkout failed, try again.");
  return false;
}
