import { findMembership, readToken } from "@/lib/membership";
import EmailForm from "@/components/membership/EmailForm";
import ManageFlow from "@/components/membership/ManageFlow";

export default async function MembershipPage({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
  const { t } = await searchParams;
  const email = readToken(t);
  if (!email) return <EmailForm expired={!!t} />;
  const m = await findMembership(email).catch(() => null);
  if (!m) return <EmailForm expired={false} />;
  return <ManageFlow token={t!} dogName={m.dogName} nextBox={m.nextBox} paused={m.paused} cancelling={m.cancelling} hasDiscount={m.hasDiscount} endedAt={m.endedAt} />;
}
