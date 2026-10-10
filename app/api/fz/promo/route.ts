import { NextResponse } from "next/server";
import { quotePromo } from "@/lib/stripe/promo";

/* The checkout's discount code box. Prices the first invoice with a typed code. */
export async function POST(req: Request) {
  const { code } = (await req.json().catch(() => ({}))) as { code?: string };
  try {
    const q = typeof code === "string" ? await quotePromo(code, 5000) : null;
    if (!q) return NextResponse.json({ error: "That code is not valid." }, { status: 404 });
    return NextResponse.json({ code: q.code, total: q.total, discount: q.discount });
  } catch (e) {
    console.error("fz promo", e);
    return NextResponse.json({ error: "Could not check that code. Try again." }, { status: 502 });
  }
}
