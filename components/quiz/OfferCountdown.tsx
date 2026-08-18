"use client";

import { useEffect, useState } from "react";

const START_SECONDS = 15 * 60;

/**
 * A countdown on the offer bar. Note this is the one timer in the system: the brand
 * rule is that it runs no countdowns, stock counters, or "sale ends in" timers,
 * because the standing 50% first-order term has no deadline to count towards. Asked
 * for explicitly, so it is here, with the exception recorded rather than hidden.
 *
 * It renders a fixed string until it has mounted so the server and client agree, then
 * ticks. It stops at zero rather than looping or resetting.
 */
export function OfferCountdown() {
  /* Starts at the full time rather than at null, so the server render and the first
     client render produce the same string and there is nothing to correct on mount.
     Only the tick writes state, and it does so from a timer rather than from the body
     of an effect. */
  const [left, setLeft] = useState(START_SECONDS);

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const label = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;

  return (
    <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 900 }} aria-live="off">
      {label}
    </span>
  );
}
