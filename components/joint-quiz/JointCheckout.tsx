"use client";

import type React from "react";
import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { PRODUCT } from "@/lib/products/dog-joint";
import { JOINT_CART_ID, buildJointOrder } from "@/lib/quiz/jointLadder";

/* Sun yellow, distinct from itch's sprout green, same pattern ItchCheckout
   uses with its own product's colour. */
const THEME = {
  "--action-primary-bg": "var(--sun)",
  "--action-primary-bg-press": "var(--sun-press)",
  "--action-primary-fg": "var(--ink)",
  "--action-accent-bg": "var(--sun)",
  "--action-accent-bg-press": "var(--sun-press)",
  "--action-accent-fg": "var(--ink)",
} as React.CSSProperties;

/**
 * Checkout for the joint quiz's paid 1/3/6 month ladder. Kept on its own cart
 * (JOINT_CART_ID), same reasoning as ItchCheckout: separate from any other
 * product's own checkout, which would show the wrong total for whichever
 * plan was actually picked here.
 */
export function JointCheckout({
  backHref = "/quiz/joint/results/plans",
}: { backHref?: string } = {}) {
  return (
    <EvenCheckout
      backHref={backHref}
      backLabel={`Back to ${PRODUCT.name}`}
      product={{ name: PRODUCT.name, cartId: JOINT_CART_ID, buildOrder: buildJointOrder, guaranteeDays: 30 }}
      theme={THEME}
    />
  );
}
