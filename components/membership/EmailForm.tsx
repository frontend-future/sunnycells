"use client";
import { useState } from "react";
import ManageFlow, { type Found } from "./ManageFlow";
import Shell from "./Shell";
import styles from "./membership.module.css";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [found, setFound] = useState<Found | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/fz/membership/lookup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    setBusy(false);
    if (!res?.ok) return setError(data.error ?? "Something went wrong. Try again, or email support@fridayzoomies.com.");
    if (!data.found) return setError("We couldn't find a membership under that email. Try the one you used at checkout, or email support@fridayzoomies.com.");
    setFound({ token: data.token, ...data.membership });
  }

  if (found) return <ManageFlow {...found} />;
  return (
    <Shell eyebrow="Your membership" title="Manage your membership" oneLine>
      <p>Enter the email you ordered with and we'll pull up your plan.</p>
      <form className={styles.stack} onSubmit={submit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input className={styles.input} id="email" type="email" required autoComplete="email" inputMode="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className={styles.primary} disabled={busy}>{busy ? "Finding your plan" : "Continue"}</button>
        {error && <p className={styles.error} role="alert">{error}</p>}
      </form>
    </Shell>
  );
}
