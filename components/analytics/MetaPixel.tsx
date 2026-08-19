"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * The base pixel, plus a PageView on every client-side route change.
 *
 * The init snippet fires one PageView on load and nothing after it. That is fine
 * for a page-per-visit site, but the quiz is twenty-odd routes the router swaps
 * without a document load, so without this Meta would see a single view of
 * /quiz/diet and none of the funnel behind it.
 *
 * Renders nothing when NEXT_PUBLIC_META_PIXEL_ID is unset, so a local run or a
 * preview deploy sends no events at all.
 */
export function MetaPixel() {
  const pathname = usePathname();
  /* The snippet already counted the first page. Firing again here would double it. */
  const counted = useRef(false);

  useEffect(() => {
    if (!PIXEL_ID) return;
    if (!counted.current) {
      counted.current = true;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  if (!PIXEL_ID) return null;

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
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
