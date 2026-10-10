"use client";

import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { FZ_PRODUCT_NAME } from "@/lib/quiz/fridayzoomiesOffer";
import { trackMetaEvent, type MetaUserData } from "@/lib/meta";

/* Fires Meta's Purchase once, and only for a payment Stripe confirms went through.
   Stripe sends the customer here with the payment's client secret in the URL after a
   successful confirmation. A declined card never reaches this page, and a visit with no
   secret, a made-up one, or a payment that has not succeeded fires nothing. The status is
   read from Stripe, not from the redirect_status the URL also carries, because anyone can
   type that. Remembering the payment id keeps a refresh from reporting it twice. */
const PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export function PurchaseTracker() {
  useEffect(() => {
    const secret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if (!secret || !PK) return;
    (async () => {
      const stripe = await loadStripe(PK);
      const pi = (await stripe?.retrievePaymentIntent(secret))?.paymentIntent;
      if (!pi || pi.status !== "succeeded") return;

      const seen = `fz-purchase-${pi.id}`;
      try {
        if (localStorage.getItem(seen)) return;
        localStorage.setItem(seen, "1");
      } catch {}

      let who: MetaUserData = {};
      try { who = JSON.parse(sessionStorage.getItem("fz-buyer") || "{}"); } catch {}
      trackMetaEvent(
        "Purchase",
        { currency: (pi.currency || "usd").toUpperCase(), value: pi.amount / 100, content_ids: ["inside-out-itch-bundle"], content_type: "product", content_name: FZ_PRODUCT_NAME },
        who,
      );
    })();
  }, []);
  return null;
}
