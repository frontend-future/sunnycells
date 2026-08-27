"use client";

import { ensureInit } from "@/components/analytics/MetaPixel";
import { funnelForPath, PIXEL_IDS } from "@/lib/meta-funnels";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type MetaCustomData = {
  currency?: string;
  value?: number;
  content_ids?: string[];
  content_type?: string;
  content_name?: string;
};

export type MetaUserData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
};

/**
 * Fires a Meta Pixel browser event and a matching server-side Conversions
 * API call with the same event_id, so Meta dedupes them into one event.
 *
 * Never blocks the caller: the funnel must advance whether or not either
 * side of this succeeds.
 */
export function trackMetaEvent(eventName: string, customData?: MetaCustomData, userData?: MetaUserData) {
  /* The dataset that owns this page. No pixel configured for it means no tracking at
     all, rather than a browser event with nothing to receive it and a CAPI call the
     route can only reject. Keeps local runs and preview deploys silent. */
  const funnel = funnelForPath(typeof window !== "undefined" ? window.location.pathname : "/");
  if (!PIXEL_IDS[funnel]) return;

  const eventId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  /* trackSingle, not track: once a visitor has crossed between the two funnels this
     document has both pixels initialised, and a plain track would report the event
     to whichever one does not own the page as well. */
  const pixel = PIXEL_IDS[funnel] as string;
  if (ensureInit(pixel)) {
    window.fbq?.("trackSingle", pixel, eventName, customData ?? {}, { eventID: eventId });
  }

  fetch("/api/meta-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      funnel,
      event_source_url: typeof window !== "undefined" ? window.location.href : undefined,
      custom_data: customData,
      user_data: userData,
    }),
  }).catch((err) => {
    console.error("[meta] capi request failed", err);
  });
}
