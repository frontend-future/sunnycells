import { findMembership, readToken, type Membership } from "@/lib/membership";
import EmailForm from "@/components/membership/EmailForm";
import Portal from "@/components/membership/Portal";
import styles from "@/components/membership/membership.module.css";

/* Local only: /membership?preview=1 renders the portal from a fixture so the design can be checked without
   a Stripe customer. ?dog=none and ?name=none show the missing-name fallbacks. Never active in production. */
const FIXTURE: Membership = {
  id: "sub_preview", email: "alex@example.com", dogName: "Milo", firstName: "Alex", nextBox: Math.floor(Date.now() / 1000) + 14 * 86_400,
  boxes: 2, paused: false, cancelling: false, hasDiscount: false, endedAt: null,
  product: { name: "Daily Chews", image: null }, quantity: 1, unitCents: 3900, weeks: 4, since: Math.floor(Date.now() / 1000) - 62 * 86_400,
  card: { brand: "visa", last4: "4242", exp: "08/28" }, shipTo: ["Alex Morgan", "1204 Larkspur Lane", "Austin, TX, 78704"],
  orders: [{ at: Math.floor(Date.now() / 1000) - 34 * 86_400, cents: 3900 }, { at: Math.floor(Date.now() / 1000) - 62 * 86_400, cents: 1900 }],
};

const nowSeconds = () => Math.floor(Date.now() / 1000);

export default async function MembershipPage({ searchParams }: { searchParams: Promise<{ t?: string; preview?: string; dog?: string; name?: string }> }) {
  const { t, preview, dog, name } = await searchParams;
  const nowSec = nowSeconds();
  if (preview && process.env.NODE_ENV !== "production") {
    const m = { ...FIXTURE, dogName: dog === "none" ? null : "Milo", firstName: name === "none" ? null : "Alex" };
    return <Portal token="preview" m={m} nowSec={nowSec} firstName={m.firstName} dog={m.dogName} />;
  }
  const email = readToken(t);
  const m = email ? await findMembership(email).catch(() => null) : null;
  if (!m) return <Entry expired={!!t} />;
  return <Portal token={t!} m={m} nowSec={nowSec} firstName={m.firstName} dog={m.dogName} />;
}

function Entry({ expired }: { expired: boolean }) {
  return (
    <>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.logo} src="/brand/fridayzoomies/logo-oneline.png" alt="Friday Zoomies" width={236} height={36} />
      </header>
      <EmailForm expired={expired} />
    </>
  );
}
