import Stripe from "stripe";

/* One client per server process. Reads the key lazily so a missing one fails the request
   with a clear message instead of breaking the build. */
let client: Stripe | null = null;
export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return (client ??= new Stripe(key));
}
