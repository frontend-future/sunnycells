import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The Stripe customer portal login. Temporary (307) so the destination can change without browsers remembering the old one. */
  async redirects() {
    return [{ source: "/membership", destination: "https://billing.stripe.com/p/login/cNi14nfrC9k11jCcER0sU00", permanent: false }];
  },
};

export default nextConfig;
