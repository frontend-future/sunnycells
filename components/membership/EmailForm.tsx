"use client";
import { useState } from "react";
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
      <main className={styles.card}>
        <h1>Check your email</h1>
        <p>If there's a membership under {email}, we just sent a link to manage it.</p>
        <p>It works for 30 minutes. Nothing there? Check spam, or contact support@fridayzoomies.com and we'll sort it out.</p>
      </main>
    );
  return (
    <main className={styles.card}>
      <h1>Manage your membership</h1>
      {expired && <p className={styles.note}>That link has expired. Enter your email and we'll send a fresh one.</p>}
      <p>Enter the email you ordered with and we'll send you a link to your plan.</p>
      <form onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className={styles.primary} disabled={state === "busy"}>{state === "busy" ? "Sending" : "Email me my link"}</button>
        {state === "error" && <p className={styles.note}>Something went wrong. Try again, or email support@fridayzoomies.com.</p>}
      </form>
    </main>
  );
}
