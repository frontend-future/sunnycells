"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import posthog from "posthog-js";
import { funnelStepFor } from "@/lib/analytics/funnel";

/* Module level, not a ref, for the same reason MetaPixel's guards are: React remounts
   every component twice on mount under StrictMode, and a ref resets with the remount.
   Module state survives it, so a page is never counted twice. */
let started = false;
let counted: string | null = null;

/**
 * PostHog, configured for one job: seeing where people fall out of the quiz.
 *
 * Everything not needed for that is off.
 *
 *   autocapture        off. Clicks and inputs across the whole site would swamp the
 *                      free tier and none of it answers the question being asked.
 *   session_recording  off. The funnel ends on a checkout where people type names,
 *                      addresses and card details. Not recording it is simpler than
 *                      masking it correctly.
 *   person_profiles    identified_only, and nothing ever calls identify, so events
 *                      stay anonymous. No email reaches PostHog.
 *   capture_pageview   off, because it does not fire on App Router client navigation.
 *                      This component sends them instead, exactly as MetaPixel does
 *                      for Meta. Worth knowing why that matters here: fbevents already
 *                      patches history.pushState and fires its own PageView on route
 *                      change, which is what made Meta count every step twice. Two
 *                      SDKs patching history do not compose, so ours are explicit.
 *
 * Renders nothing and sends nothing when the key is unset, so local runs and preview
 * deploys stay silent.
 */
export function PostHogAnalytics() {
  const pathname = usePathname();
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

  useEffect(() => {
    if (!key) return;
    if (!started) {
      started = true;
      posthog.init(key, {
        api_host: host,
        autocapture: false,
        capture_pageview: false,
        /* Off as well. A $pageleave per step would put three events on every screen
           instead of two and buy nothing the dropoff curve does not already show. */
        capture_pageleave: false,
        disable_session_recording: true,
        /* Nothing here reads a flag, and leaving this on costs a POST to /flags on
           every single page view. */
        advanced_disable_feature_flags: true,
        person_profiles: "identified_only",
      });
    }

    if (counted === pathname) return;
    counted = pathname;
    posthog.capture("$pageview", { $current_url: window.location.href });

    /* One call site for the whole funnel. Firing from each screen would mean ten
       call sites across four funnels and a new one every time a screen is added. */
    let live = true;
    funnelStepFor(pathname).then((step) => {
      if (live && step) posthog.capture("quiz_step", step);
    });
    return () => { live = false; };
  }, [pathname, key, host]);

  return null;
}
