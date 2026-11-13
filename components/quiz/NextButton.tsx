"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/core/Button";

/** `href` may be a function, read at the click, for a destination that is only known then (a split test). Button is a <button>, so wrapping it in a <Link> would nest an <a> around a
    control. These screens are already client components, so route on click instead. */
export function NextButton({ href, children }: { href: string | (() => string); children: string }) {
  const router = useRouter();
  return (
    <Button size="lg" fullWidth iconRight="arrow-right" onClick={() => router.push(typeof href === "function" ? href() : href)}>
      {children}
    </Button>
  );
}
