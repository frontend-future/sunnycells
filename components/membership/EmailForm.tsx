"use client";
import { useState } from "react";
import Shell from "./Shell";
import styles from "./membership.module.css";

export default function EmailForm({ expired }: { expired: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    const res = await fetch("/api/fz/membership/lookup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }).catch(() => null);
    setState(res?.ok ? "sent" : "error");
  }

  if (state === "sent")
    return (
      <Shell title="Check your email" done>
        <p>If there's a membership under <strong>{email}</strong>, we just sent a link to manage it.</p>
        <p className={styles.fine}>The link works for 30 minutes. Nothing there? Check spam, or email support@fridayzoomies.com and we'll sort it out.</p>
      </Shell>
    );
  return (
    <Shell eyebrow="Your membership" title="Manage your membership" oneLine>
      {expired && <p className={styles.callout}>That link has expired. Enter your email and we'll send a fresh one.</p>}
      <p>Enter the email you ordered with and we'll send a login link to your plan.</p>
      <form className={styles.stack} onSubmit={submit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input className={styles.input} id="email" type="email" required autoComplete="email" inputMode="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className={styles.primary} disabled={state === "busy"}>{state === "busy" ? "Sending your link" : "Send login link"}</button>
        {state === "error" && <p className={styles.error} role="alert">Something went wrong. Try again, or email support@fridayzoomies.com.</p>}
      </form>
    </Shell>
  );
}
