import { NextResponse } from "next/server";
import { findMembership, makeToken, notifyOwner } from "@/lib/membership";

/* Takes an email and returns that email's Friday Zoomies membership so the page can carry straight on.
   READ ONLY. The email is not verified, so what it returns is only what the manage page shows. */
export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  const e = (email ?? "").trim();
  if (!/^\S+@\S+\.\S+$/.test(e)) return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  try {
    const m = await findMembership(e);
    await notifyOwner("lookup", e, { "Membership found": !!m, Dog: m?.dogName, Action: "Nothing changed" });
    if (!m) return NextResponse.json({ found: false });
    const { id: _id, email: _email, ...shown } = m;
    return NextResponse.json({ found: true, token: makeToken(m.email), membership: shown });
  } catch (err) {
    console.error("membership lookup", err);
    return NextResponse.json({ error: "We couldn't look that up. Try again in a minute." }, { status: 502 });
  }
}
