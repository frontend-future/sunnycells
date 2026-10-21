import { NextResponse } from "next/server";
import { findMembership, notifyOwner, sendMagicLink } from "@/lib/membership";

/* Takes an email and, if it has a Friday Zoomies membership, emails it a sign-in link. The reply says
   whether one was found, so the page can tell the visitor; it never returns any plan details. Read only. */
export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  const e = (email ?? "").trim();
  if (!/^\S+@\S+\.\S+$/.test(e)) return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  let found = false;
  let sent = "";
  try {
    const m = await findMembership(e);
    found = !!m;
    if (m) {
      await sendMagicLink(m.email, m.dogName);
      sent = "yes";
    }
  } catch (err) {
    console.error("membership lookup", err);
    sent = `failed: ${err instanceof Error ? err.message : "error"}`;
  }
  await notifyOwner("lookup", e, { "Membership found": found, "Link emailed": sent || "no", Action: "Nothing changed" });
  if (sent.startsWith("failed")) return NextResponse.json({ error: "We found your membership but couldn't send the link. Try again, or email support@fridayzoomies.com." }, { status: 502 });
  return NextResponse.json({ ok: true, found });
}
