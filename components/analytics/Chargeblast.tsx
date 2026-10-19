"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { identifyChargeblast, lastChargeblastEmail } from "@/lib/chargeblast";

const ACCOUNT = "acct_QxUFJImSeeisxtvOhHBphR";

/* The email a visitor has already given us: a buyer mid checkout first, then any quiz's saved
   answers. Every quiz keeps its answers in sessionStorage under sunnycells.quiz.<id>
   (lib/quiz/store.ts), so one scan covers all of them. */
function knownEmail(): string | undefined {
  try {
    const buyer = sessionStorage.getItem("fz-buyer");
    if (buyer) {
      const e = (JSON.parse(buyer) as { email?: string }).email;
      if (e) return e;
    }
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i);
      if (!k?.startsWith("sunnycells.quiz.")) continue;
      const e = (JSON.parse(sessionStorage.getItem(k) || "{}") as { email?: string }).email;
      if (e) return e;
    }
  } catch {
    /* Private mode or malformed storage: nothing to identify with. */
  }
}

/**
 * Chargeblast, on every page. Loads after the page is interactive so it never delays the
 * quiz, then tags the visitor once an email is known. The quiz is client routed, so the
 * email can appear partway through a visit: identify again on each route change.
 */
export function Chargeblast() {
  const pathname = usePathname();

  useEffect(() => {
    const e = knownEmail();
    if (e && e.trim().toLowerCase() !== lastChargeblastEmail()) identifyChargeblast(e);
  }, [pathname]);

  return (
    <Script
      id="chargeblast-script"
      src="https://cdn.cgb.la/v1/scripts.js"
      data-account={ACCOUNT}
      strategy="afterInteractive"
      onLoad={() => identifyChargeblast(knownEmail() ?? lastChargeblastEmail())}
    />
  );
}
