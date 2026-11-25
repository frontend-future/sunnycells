import { NextResponse } from "next/server";
import { findMembership, notifyOwner, readToken, type Membership } from "@/lib/membership";
import { dollars } from "@/lib/portal";

/* One endpoint for every button on the subscription portal. REQUEST ONLY: nothing here changes Stripe or
   Shopify. Each action emails the owner exactly what the customer asked for, with the current value next
   to the requested one. The email comes from the signed token, never from the request, and the
   subscription is looked up again here. */
const DAY = 86_400;
const day = (s: number) => new Date(s * 1000).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "America/Chicago" });
const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const int = (v: unknown, min: number, max: number) => {
  const n = Number(v);
  return Number.isInteger(n) && n >= min && n <= max ? n : null;
};

type Body = { t?: string; action?: string; reason?: string; note?: string; delayWeeks?: number; weeks?: number; qty?: number; address?: Record<string, string> };

/* Returns the email subject and the lines that describe the request, or an error for bad input. */
function describe(m: Membership, b: Body): { title: string; lines: Record<string, string | number> } | string {
  const next = m.nextBox;
  switch (b.action) {
    case "skip":
      return { title: "skip next order", lines: { Request: "Skip the next order", "Next order is": next ? day(next) : "unknown", "Would move to": next ? day(next + m.weeks * 7 * DAY) : "the following cycle" } };
    case "unskip":
      return { title: "unskip", lines: { Request: "Undo the skip and ship the order as normal", "Next order is": next ? day(next) : "unknown" } };
    case "reschedule": {
      const w = int(b.delayWeeks, 1, 12);
      if (!w || !next) return "Pick how long to delay it.";
      return { title: "reschedule", lines: { Request: `Delay the next order by ${w} weeks`, "Next order is": day(next), "Would move to": day(next + w * 7 * DAY) } };
    }
    case "frequency": {
      const w = int(b.weeks, 1, 26);
      if (!w) return "Pick how often it should ship.";
      return { title: "change frequency", lines: { Request: `Ship every ${w} weeks`, "Currently ships every": `${m.weeks} weeks` } };
    }
    case "quantity": {
      const q = int(b.qty, 1, 12);
      if (!q) return "Pick a quantity.";
      return { title: "change quantity", lines: { Request: `Change quantity to ${q}`, "Currently": m.quantity, "Unit price now": dollars(m.unitCents) } };
    }
    case "address": {
      const a = b.address ?? {};
      const line1 = clip(a.line1, 120);
      if (!line1) return "Enter a street address.";
      return { title: "change address", lines: { Request: "Change the shipping address", "Ship to name": clip(a.name, 80), Street: line1, Apt: clip(a.line2, 80), City: clip(a.city, 60), "State and ZIP": clip(a.region, 40), "Address on file": m.shipTo.join(", ") || "none" } };
    }
    case "cancel": {
      const reason = clip(b.reason, 80);
      if (!reason) return "Pick a reason.";
      return { title: "CANCEL requested", lines: { Request: "Cancel the subscription", Reason: reason, "Next order is": next ? day(next) : "unknown" } };
    }
    default:
      return "Unknown action.";
  }
}

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as Body;
  const email = readToken(b.t);
  if (!email) return NextResponse.json({ error: "This link has expired. Request a new one." }, { status: 401 });

  let m: Membership | null;
  try {
    m = await findMembership(email);
  } catch {
    return NextResponse.json({ error: "We couldn't load your subscription. Try again in a minute." }, { status: 502 });
  }
  if (!m) return NextResponse.json({ error: "We couldn't find your subscription." }, { status: 404 });

  const d = describe(m, b);
  if (typeof d === "string") return NextResponse.json({ error: d }, { status: 400 });

  await notifyOwner(`${d.title}`, email, {
    ...d.lines,
    Name: m.firstName,
    Dog: m.dogName,
    Product: m.product.name,
    Note: clip(b.note, 800),
    Subscription: m.id,
    "Stripe changed": "No. Request only, needs a human",
  });
  return NextResponse.json({ ok: true });
}
