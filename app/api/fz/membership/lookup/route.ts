import { NextResponse } from "next/server";
import { findMembership, notifyOwner, sendMagicLink } from "@/lib/membership";

/* Takes an email and, if it has a Friday Zoomies membership, emails it a sign-in link. The reply is
   the same either way, so the form cannot be used to check who is a customer. Read only. */
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
  return NextResponse.json({ ok: true });
}
