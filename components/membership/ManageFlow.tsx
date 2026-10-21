"use client";
import { useState } from "react";
import { SAVE_OFFER_DOLLARS, SAVE_OFFER_MONTHS } from "./offer";
import styles from "./membership.module.css";

type Props = { token: string; dogName: string | null; nextBox: number | null; boxes: number; paused: boolean; cancelling: boolean; hasDiscount: boolean };
type Reason = "price" | "much" | "results" | "better" | "eat" | "other";
type Screen = "home" | "why" | Reason | "confirm" | "done";

const REASONS: [Reason, string][] = [
  ["price", "It's too expensive"],
  ["much", "I have too much product"],
  ["results", "I'm not seeing results yet"],
  ["better", "{dog} got better"],
  ["eat", "{dog} won't eat the chews"],
  ["other", "Something else"],
];
const PORTAL = "https://billing.stripe.com/p/login/cNi14nfrC9k11jCcER0sU00";
const when = (s: number | null) => (s ? new Date(s * 1000).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "America/Chicago" }) : null);

export default function ManageFlow({ token, dogName, nextBox, boxes, paused, cancelling, hasDiscount }: Props) {
  const dog = dogName ?? "your dog";
  const [screen, setScreen] = useState<Screen>("home");
  const [reason, setReason] = useState<Reason>("other");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState({ title: "", body: "" });
  const sub = (s: string) => s.replace("{dog}", dog);

  async function send(action: string, done: { title: string; body: string }, extra: { reason?: string; note?: string } = {}) {
    setBusy(true);
    setError("");
    const res = await fetch("/api/fz/membership/action", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ t: token, action, ...extra }) }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    setBusy(false);
    if (!res?.ok) return setError(data.error ?? "Something went wrong. Try again, or email support@fridayzoomies.com.");
    // Real changes say "done". Anything the team still applies by hand says the request is processed.
    setResult(data.applied || !["skip", "cancel", "discount"].includes(action) ? done : { title: "Subscription request processed", body: "Our team will update your membership and confirm by email shortly." });
    setScreen("done");
  }
  const cancelLink = <button className={styles.link} onClick={() => setScreen("confirm")}>No thanks, continue to cancel</button>;
  const next = when(nextBox);

  if (screen === "done")
    return <main className={styles.card}><h1>{result.title}</h1><p>{result.body}</p></main>;

  if (screen === "home")
    return (
      <main className={styles.card}>
        <h1>Hi, here's {dog}'s membership</h1>
        {cancelling ? <p>Your membership is set to end after your current box. Want it back? Email support@fridayzoomies.com and we'll restart it.</p> : (
          <>
            <p>{paused ? `${dog}'s next box is skipped.` : next ? `${dog}'s next box ships on ${next}.` : ""}{boxes > 0 ? ` So far you've received ${boxes} ${boxes === 1 ? "box" : "boxes"}.` : ""}</p>
            <p>Consistency is what helps {dog} stop itching for good, so we'd rather help you change things than lose you. Pick what you need.</p>
            {!paused && <button className={styles.primary} disabled={busy} onClick={() => send("skip", { title: "Your next box is skipped", body: `${dog}'s next box won't ship or charge. Your plan picks back up the cycle after that.` })}>Skip my next box</button>}
            <a className={styles.secondary} href={PORTAL}>Update address or payment method</a>
            <a className={styles.secondary} href="mailto:support@fridayzoomies.com">Contact support</a>
            <button className={styles.link} onClick={() => setScreen("why")}>I want to cancel my membership</button>
          </>
        )}
        {error && <p className={styles.note}>{error}</p>}
      </main>
    );

  if (screen === "why")
    return (
      <main className={styles.card}>
        <h1>Before you go, what's the reason?</h1>
        <p>It takes ten seconds and it helps us make this better for other dogs.</p>
        {REASONS.map(([k, label]) => <button key={k} className={styles.option} onClick={() => { setReason(k); setScreen(k); }}>{sub(label)}</button>)}
        <button className={styles.link} onClick={() => setScreen("home")}>Back</button>
      </main>
    );

  const R = { reason };
  const offer = (title: string, body: string[], buttons: [string, () => void][]) => (
    <main className={styles.card}>
      <h1>{title}</h1>
      {body.map((p) => <p key={p}>{p}</p>)}
      {buttons.map(([label, fn]) => <button key={label} className={styles.primary} disabled={busy} onClick={fn}>{label}</button>)}
      {cancelLink}
      {error && <p className={styles.note}>{error}</p>}
    </main>
  );

  if (screen === "price")
    return offer("Let's make it easier on you", [`We get it, and we'd rather keep ${dog} comfortable than lose you over price.`, `We can take $${SAVE_OFFER_DOLLARS} off your next ${SAVE_OFFER_MONTHS} boxes, so they're $${50 - SAVE_OFFER_DOLLARS} each.`, `That keeps ${dog} on a steady routine while you decide.`],
      hasDiscount ? [] : [[`Yes, take $${SAVE_OFFER_DOLLARS} off my next ${SAVE_OFFER_MONTHS} boxes`, () => send("discount", { title: "Done", body: `$${SAVE_OFFER_DOLLARS} off your next ${SAVE_OFFER_MONTHS} boxes. Nothing else changes.` }, R)]]);
  if (screen === "much")
    return offer("No need to cancel for that", ["If you've got extra on the shelf, you can skip a box.", "We can skip your next one, or switch you to a box every 8 weeks instead of every 4.", `${dog} stays covered and you stop paying for product you don't need yet.`],
      [["Skip my next box", () => send("skip", { title: "Your next box is skipped", body: `${dog}'s next box won't ship or charge.` }, R)], ["Ship every 8 weeks instead", () => send("every8", { title: "Got it", body: "We'll switch you to every 8 weeks and confirm by email." }, R)]]);
  if (screen === "results")
    return offer("That's worth a conversation first", ["Lasting itch relief builds over weeks, and it's easy to miss day to day. Skipped days can also set it back.", `You're covered by our 90 day guarantee. If ${dog} isn't doing better after a real try, we'll take care of you.`, "Want one of our care team to call you and go over how you're using the spray and chews?"],
      [["Yes, have someone call me", () => send("call", { title: "We'll be in touch", body: "Someone from our care team will call you soon." }, R)], ["Keep my membership, I'll give it more time", () => send("keep", { title: "Thank you", body: `We'll keep ${dog}'s membership going.` }, R)]]);
  if (screen === "better")
    return offer("That's the best reason to hear", [`We're glad ${dog} is feeling better.`, "One thing to know. Itch tends to come back when the routine stops, so most people keep a lighter one going.", `We can switch you to a box every 8 weeks to keep ${dog} comfortable at half the cost over time.`],
      [["Switch me to every 8 weeks", () => send("every8", { title: "Got it", body: "We'll switch you to every 8 weeks and confirm by email." }, R)]]);
  if (screen === "eat")
    return offer("Let us help with that", ["Some dogs are picky at first, and a couple of easy tricks usually work.", "Mix the chew into a little wet food or crumble it over dinner.", "If that doesn't work, our team will personally help you find a fix."],
      [["Email me tips and help from the team", () => send("tips", { title: "We'll be in touch", body: "Someone from our team will email you shortly." }, R)], ["Skip my next box while I try", () => send("skip", { title: "Your next box is skipped", body: `${dog}'s next box won't ship or charge.` }, R)]]);
  if (screen === "other")
    return (
      <main className={styles.card}>
        <h1>Tell us what's going on</h1>
        <p>A short note is plenty. A real person reads every one.</p>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} maxLength={800} />
        <button className={styles.primary} disabled={busy} onClick={() => send("feedback", { title: "Thank you", body: "We'll keep your membership going and read your note." }, { ...R, note })}>Send and keep my membership</button>
        <button className={styles.link} onClick={() => { setScreen("confirm"); }}>Send and continue to cancel</button>
        {error && <p className={styles.note}>{error}</p>}
      </main>
    );

  return (
    <main className={styles.card}>
      <h1>Confirm cancellation</h1>
      <p>Your membership will end after your current box. You won't be charged again, and anything already paid for will still ship.</p>
      <button className={styles.danger} disabled={busy} onClick={() => send("cancel", { title: "Your membership is cancelled", body: `Thank you for trying Friday Zoomies with ${dog}. You can restart any time by emailing support@fridayzoomies.com.` }, { ...R, note })}>Cancel my membership</button>
      <button className={styles.primary} onClick={() => setScreen("home")}>Never mind, keep it</button>
      {error && <p className={styles.note}>{error}</p>}
    </main>
  );
}
