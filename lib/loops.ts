/* Tells Loops who has bought, so the abandoned-quiz emails stop. It sets isCustomer on the contact
   (creating the contact if the quiz never did) and sends a `purchased` event for any later flow.
   The Loops workflow's audience filter reads isCustomer. Never throws: a Loops problem must not
   fail the order webhook, which has already made the Shopify order by the time this runs. */
const BASE = "https://app.loops.so/api/v1";

async function loops(path: string, body: object, headers: Record<string, string> = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.LOOPS_API_KEY}`, "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) throw new Error(`Loops ${path} returned ${res.status}`);
}

/** Resolves true when the contact is flagged, false if it could not be. */
export async function tagPurchaser(p: { email: string; firstName?: string; invoiceId: string; orderName: string }): Promise<boolean> {
  if (!process.env.LOOPS_API_KEY) return false;
  const email = p.email.trim().toLowerCase();
  try {
    await loops("/contacts/update", {
      email,
      ...(p.firstName ? { firstName: p.firstName } : {}),
      isCustomer: true,
      userGroup: "customer",
      customerSince: new Date().toISOString(),
    });
    /* The invoice id as the idempotency key, so a Stripe retry does not send the event twice. */
    await loops("/events/send", { email, eventName: "purchased", eventProperties: { orderNumber: p.orderName } }, { "Idempotency-Key": p.invoiceId });
    return true;
  } catch (e) {
    console.error("loops tag", email, e);
    return false;
  }
}
