import { NextResponse } from "next/server";
import { applyAction, findMembership, notifyOwner, readToken, writesOn, type Action } from "@/lib/membership";

/* One endpoint for every button on the manage page. The email comes from the signed token, never
   from the request, and the subscription is looked up again here. skip, cancel and discount change
   Stripe only when FZ_MEMBERSHIP_WRITES=on; everything else is a request emailed to the owner. */
const STRIPE_ACTIONS: Action[] = ["skip", "cancel", "discount"];
const REQUESTS: Record<string, string> = {
  every8: "Wants a box every 8 weeks instead of 4",
  call: "Wants a call from the care team",
  tips: "Wants tips or help getting the chews eaten",
  keep: "Is keeping the membership, will give it more time",
  feedback: "Sent a note and is keeping the membership",
};

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as { t?: string; action?: string; reason?: string; note?: string };
  const email = readToken(b.t);
  if (!email) return NextResponse.json({ error: "This link has expired. Request a new one." }, { status: 401 });
  const action = b.action ?? "";
  const reason = (b.reason ?? "").slice(0, 60);
  const note = (b.note ?? "").slice(0, 800);

  let m;
  try {
    m = await findMembership(email);
  } catch {
    return NextResponse.json({ error: "We couldn't load your membership. Try again in a minute." }, { status: 502 });
  }
  if (!m) return NextResponse.json({ error: "We couldn't find your membership." }, { status: 404 });
  const base = { Dog: m.dogName, "Subscription": m.id, Reason: reason, Note: note, "Boxes received": m.boxes };

  if (REQUESTS[action]) {
    await notifyOwner(`request (${action})`, email, { ...base, Request: REQUESTS[action], "Stripe changed": "No, needs a human" });
    return NextResponse.json({ ok: true, applied: false });
  }
  if (!STRIPE_ACTIONS.includes(action as Action)) return NextResponse.json({ error: "Unknown action." }, { status: 400 });

  if (!writesOn()) {
    await notifyOwner(`${action} requested`, email, { ...base, "Stripe changed": "NO. Writes are off (FZ_MEMBERSHIP_WRITES), customer was told we got the request" });
    return NextResponse.json({ ok: true, applied: false });
  }
  try {
    const applied = await applyAction(m, action as Action, { reason, note });
    await notifyOwner(`${action} ${applied ? "applied" : "declined"}`, email, { ...base, "Stripe changed": applied ? "Yes" : "No, subscription state didn't allow it" });
    return NextResponse.json({ ok: true, applied });
  } catch (err) {
    console.error("membership action", err);
    await notifyOwner(`${action} FAILED`, email, { ...base, Error: err instanceof Error ? err.message : "error" });
    return NextResponse.json({ error: "Something went wrong. We've been told and will sort it out." }, { status: 502 });
  }
}
