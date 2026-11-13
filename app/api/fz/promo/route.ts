import { NextResponse } from "next/server";
import { quotePromo } from "@/lib/stripe/promo";
import { OIL_TEST_CODE, isOilPlan, isTestCode, testOff } from "@/lib/quiz/fzPlans";

/* The checkout's discount code box. Prices the first invoice with a typed code. */
export async function POST(req: Request) {
  const { code, plan } = (await req.json().catch(() => ({}))) as { code?: string; plan?: string };
  /* The v3 plans take the test code and nothing else. */
  if (isOilPlan(plan)) {
    return isTestCode(code)
      ? NextResponse.json({ code: OIL_TEST_CODE, total: 100, discount: testOff(plan) })
      : NextResponse.json({ error: "That code is not valid." }, { status: 404 });
  }
  try {
    const q = typeof code === "string" ? await quotePromo(code, 5000) : null;
    if (!q) return NextResponse.json({ error: "That code is not valid." }, { status: 404 });
    return NextResponse.json({ code: q.code, total: q.total, discount: q.discount });
  } catch (e) {
    console.error("fz promo", e);
    return NextResponse.json({ error: "Could not check that code. Try again." }, { status: 502 });
  }
}
