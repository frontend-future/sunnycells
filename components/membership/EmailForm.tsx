"use client";
import { useState } from "react";
import Shell from "./Shell";
import styles from "./membership.module.css";

export default function EmailForm({ expired }: { expired: boolean }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "sent" | "notfound" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    const res = await fetch("/api/fz/membership/lookup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    setError(data.error ?? "");
    setState(!res?.ok ? "error" : data.found ? "sent" : "notfound");
  }

  if (state === "sent")
    return (
      <Shell title="Check your email" photo="sent">
        <p>We found your membership. We just sent a login link to <strong>{email}</strong>.</p>
        <p className={styles.fine}>The link works for 30 minutes. Nothing there? Check spam, or email support@fridayzoomies.com and we'll sort it out.</p>
      </Shell>
    );
  return (
    <Shell eyebrow="Your membership" title="Manage your membership" oneLine photo="email">
      {expired && <p className={styles.callout}>That link has expired. Enter your email and we'll send a fresh one.</p>}
      <p>Enter the email you ordered with and we'll send a login link to your plan.</p>
      <form className={styles.stack} onSubmit={submit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input className={styles.input} id="email" type="email" required autoComplete="email" inputMode="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className={styles.primary} disabled={state === "busy"}>{state === "busy" ? "Sending your link" : "Send login link"}</button>
        {state === "notfound" && <p className={styles.error} role="alert">We couldn't find a membership under {email}. Try the email you used at checkout, or email support@fridayzoomies.com.</p>}
        {state === "error" && <p className={styles.error} role="alert">{error || "Something went wrong. Try again, or email support@fridayzoomies.com."}</p>}
      </form>
    </Shell>
  );
}
