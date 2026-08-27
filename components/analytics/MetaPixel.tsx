"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { funnelForPath, PIXEL_IDS } from "@/lib/meta-funnels";

/* Which pixels this document has already called init on. Module level rather than
   component state because fbq's own registry is module level too: initialising the
   same pixel twice makes it count every later event twice. */
const inited = new Set<string>();

/* The last path counted, also module level and for the same reason. A ref inside the
   component resets when React remounts it, and React remounts every component twice
   on mount under StrictMode, which is on by default in development. With the guard in
   a ref the second run saw a component that had already counted the first page and
   sent a second PageView for it. Module state survives the remount, so the guard
   holds. It also stops any future re-render on the same path counting twice. */
let counted: string | null = null;

export function markInited(pixel: string) {
  inited.add(pixel);
}

/** Initialises the pixel if this document has not yet, and reports whether fbq is ready. */
export function ensureInit(pixel: string) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return false;
  if (!inited.has(pixel)) {
    window.fbq("init", pixel);
    inited.add(pixel);
  }
  return true;
}

/**
 * The base pixel, plus a PageView on every client-side route change.
 *
 * The init snippet fires one PageView on load and nothing after it. That is fine
 * for a page-per-visit site, but the quiz is twenty-odd routes the router swaps
 * without a document load, so without this Meta would see a single view of
 * /quiz/diet and none of the funnel behind it.
 *
 * The id comes from the path, so the energy product reports to its own dataset and
 * the weight loss funnel keeps the original one. Crossing between them without a
 * document load initialises the second pixel on the way, and every call is
 * trackSingle so an event only ever reaches the dataset that owns the page.
 *
 * Renders nothing when that funnel's pixel id is unset, so a local run or a
 * preview deploy sends no events at all.
 */
export function MetaPixel() {
  const pathname = usePathname();
  const pixel = PIXEL_IDS[funnelForPath(pathname)];

  useEffect(() => {
    if (!pixel) return;
    /* The inline snippet initialised this pixel and counted the page it loaded on, so
       the first path this hook sees is already reported. */
    if (counted === null) {
      counted = pathname;
      markInited(pixel);
      return;
    }
    if (counted === pathname) return;
    counted = pathname;
    if (ensureInit(pixel)) window.fbq?.("trackSingle", pixel, "PageView");
  }, [pathname, pixel]);

  if (!pixel) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixel}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
