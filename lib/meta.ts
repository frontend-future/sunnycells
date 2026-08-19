"use client";

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
  /* No pixel configured means no tracking at all, rather than a browser event with
     nothing to receive it and a CAPI call the route can only reject. Keeps local
     runs and preview deploys silent. */
  if (!process.env.NEXT_PUBLIC_META_PIXEL_ID) return;

  const eventId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, customData ?? {}, { eventID: eventId });
  }

  fetch("/api/meta-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      event_source_url: typeof window !== "undefined" ? window.location.href : undefined,
      custom_data: customData,
      user_data: userData,
    }),
  }).catch((err) => {
    console.error("[meta] capi request failed", err);
  });
}
