/* Tells Loops who has bought, so the abandoned-quiz emails stop. It sets isCustomer on the contact
   (creating the contact if the quiz never did) and sends a `purchased` event for any later flow.
   The Loops workflow's audience filter reads isCustomer. Never throws: a Loops problem must not
   fail the order webhook, which has already made the Shopify order by the time this runs. */
const BASE = "https://app.loops.so/api/v1";

/** Throws on any non-2xx, with the status on the error so callers can tell a 409 (already on the list). */
async function loops(path: string, body: object, headers: Record<string, string> = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.LOOPS_API_KEY}`, "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) throw Object.assign(new Error(`Loops ${path} returned ${res.status}`), { status: res.status });
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

/* Quiz answers come keyed by question text, so each property finds its answer by a stem of the
   question, the same stems the Quiz Leads sheet uses. */
const LEAD_PROPS: [string, string][] = [
  ["dog's name", "dogName"],
  ["Gender", "dogGender"],
  ["How big is", "dogWeight"],
  ["How old is", "dogAge"],
  ["scratch or lick the most", "itchLocation"],
  ["noticed any of these", "symptoms"],
  ["already tried", "triedBefore"],
  ["dealing with", "itchDuration"],
  ["already spent", "amountSpent"],
  ["most afraid", "mainFear"],
];

const titleCase = (s: string) => (s === s.toUpperCase() || s === s.toLowerCase() ? s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : s);

/** Adds a quiz lead as a Loops contact, which starts the acquisition workflow. Someone already
    on the list (a customer taking the quiz again) only has their answers refreshed: isCustomer is
    never touched, so a buyer is never flipped back to a lead. Never throws. */
export async function addLead(p: { email: string; quizId: string; answers: Record<string, string> }): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!process.env.LOOPS_API_KEY) return { ok: false, error: "LOOPS_API_KEY not configured" };
  const email = p.email.trim().toLowerCase();
  const entries = Object.entries(p.answers ?? {});
  const props: Record<string, string> = { quizSource: p.quizId };
  for (const [stem, key] of LEAD_PROPS) {
    const v = entries.find(([q]) => q.toLowerCase().includes(stem.toLowerCase()))?.[1]?.trim();
    if (v) props[key] = key === "dogName" ? titleCase(v) : v;
  }
  const answers = { ...props, quizCompletedAt: new Date().toISOString() };
  try {
    try {
      await loops("/contacts/create", { email, ...answers, isCustomer: false, userGroup: "lead", source: "quiz" });
    } catch (e) {
      if ((e as { status?: number }).status !== 409) throw e;
      await loops("/contacts/update", { email, ...answers });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "loops failed" };
  }
}
