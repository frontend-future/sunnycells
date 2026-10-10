/* Shopify Admin API from the server. The app was made in the Dev Dashboard, so there is no
   permanent token: the client id and secret are traded for one that lasts 24 hours, and that
   is cached until it is close to expiring. Relative imports only, so a script can load it. */
const SHOP = process.env.SHOPIFY_SHOP ?? "fridayzoomies.myshopify.com";
const VERSION = "2026-07";

let cached: { token: string; expires: number } | null = null;

async function accessToken(): Promise<string> {
  if (cached && cached.expires > Date.now() + 60_000) return cached.token;
  const id = process.env.SHOPIFY_CLIENT_ID;
  const secret = process.env.SHOPIFY_CLIENT_SECRET;
  if (!id || !secret) throw new Error("SHOPIFY_CLIENT_ID or SHOPIFY_CLIENT_SECRET is not set");
  const res = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "client_credentials", client_id: id, client_secret: secret }),
  });
  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!res.ok || !data.access_token) throw new Error(`Shopify token exchange failed (${res.status})`);
  cached = { token: data.access_token, expires: Date.now() + (data.expires_in ?? 86_000) * 1000 };
  return cached.token;
}

export async function shopify<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${SHOP}/admin/api/${VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": await accessToken() },
    body: JSON.stringify({ query, variables }),
  });
  const body = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (!res.ok || body.errors?.length || !body.data) {
    throw new Error(`Shopify request failed: ${body.errors?.map((e) => e.message).join("; ") || res.status}`);
  }
  return body.data;
}
