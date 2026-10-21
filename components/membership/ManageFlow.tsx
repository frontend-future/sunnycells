"use client";
import { useState } from "react";
import { SAVE_OFFER_DOLLARS, SAVE_OFFER_MONTHS } from "./offer";
import { Deal, Guarantee, Points, Steps, Timeline } from "./Blocks";
import Shell from "./Shell";
import styles from "./membership.module.css";

type Props = { token: string; dogName: string | null; nextBox: number | null; paused: boolean; cancelling: boolean; hasDiscount: boolean; endedAt: number | null };
type Reason = "price" | "much" | "results" | "better" | "eat" | "other";
type Screen = "home" | "skip" | "why" | Reason | "confirm" | "done";

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

export default function ManageFlow({ token, dogName, nextBox, paused, cancelling, hasDiscount, endedAt }: Props) {
  const dog = dogName ?? "your dog";
  const Dog = dogName ?? "Your dog"; // for the start of a sentence
  const [screen, setScreen] = useState<Screen>("home");
  const [reason, setReason] = useState<Reason>("other");
  const [note, setNote] = useState("");
  const [skipFrom, setSkipFrom] = useState<Screen>("home");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState({ title: "", body: "", cancelled: false });
  const sub = (s: string) => s.replace("{dog}", dogName ?? "My dog");

  async function send(action: string, done: { title: string; body: string }, extra: { reason?: string; note?: string } = {}) {
    setBusy(true);
    setError("");
    const res = await fetch("/api/fz/membership/action", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ t: token, action, ...extra }) }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    setBusy(false);
    if (!res?.ok) return setError(data.error ?? "Something went wrong. Try again, or email support@fridayzoomies.com.");
    // Real changes say "done". Anything the team still applies by hand says the request is processed.
    setResult({ cancelled: action === "cancel", ...(data.applied || !["skip", "cancel", "discount"].includes(action) ? done : { title: "Subscription request processed", body: "Our team will update your membership and confirm by email shortly." }) });
    setScreen("done");
  }
  const cancelLink = <button type="button" className={styles.link} onClick={() => setScreen("confirm")}>No thanks, continue to cancel</button>;
  const next = when(nextBox);

  if (screen === "done")
    return <Shell title={result.title} photo={result.cancelled ? "cancelled" : "kept"}><p>{result.body}</p></Shell>;

  if (endedAt)
    return (
      <Shell eyebrow={dogName ? `${dogName}'s membership` : "Your membership"} photo="cancelled" title="Membership cancelled" oneLine>
        <div className={styles.stats}>
          <div className={`${styles.stat} ${styles.statWide}`}><span className={styles.statLabel}>Cancelled on</span><span className={styles.statValue}>{when(endedAt)}</span></div>
        </div>
        <p>You won't be charged again. If you'd like to start back up, or something went wrong, we're happy to help.</p>
        <a className={styles.primary} href="mailto:support@fridayzoomies.com?subject=Restart%20my%20membership">Restart my membership</a>
        <a className={styles.secondary} href="mailto:support@fridayzoomies.com">Contact support</a>
      </Shell>
    );

  if (screen === "home")
    return (
      <Shell eyebrow="Your membership" photo="home" title={dogName ? `Here's ${dogName}'s membership` : "Here's your membership"} oneLine>
        {cancelling ? (
          <p>Your membership is set to end after your current box. Want it back? Email support@fridayzoomies.com and we'll restart it.</p>
        ) : (
          <>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>{paused ? "Next box" : "Next box ships"}</span>
                <span className={styles.statValue}>{paused ? "Skipped" : next ?? "Coming up"}</span>
              </div>
              <div className={styles.stat}><span className={styles.statLabel}>Ships every</span><span className={styles.statValue}>4 weeks</span></div>
            </div>
            <p>Consistency helps {dog} stop itching for good. Pick what you need.</p>
            <div className={styles.stack}>
              {!paused && <button type="button" className={styles.primary} onClick={() => { setSkipFrom("home"); setScreen("skip"); }}>Skip my next box</button>}
              <a className={styles.secondary} href={PORTAL}>Update address or payment method</a>
              <a className={styles.secondary} href="mailto:support@fridayzoomies.com">Contact support</a>
            </div>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button type="button" className={styles.link} onClick={() => setScreen("why")}>I want to cancel my membership</button>
          </>
        )}
      </Shell>
    );

  if (screen === "skip")
    return (
      <Shell eyebrow="Before you skip" title="Stay on track" oneLine photo="skip" onBack={() => setScreen(skipFrom)}>
        <p>It's important {dog} doesn't go a day without the daily chews.</p>
        <Points items={[["Check the product insert", "in your box."], ["Missed days", "can reverse the progress they've made."]]} />
        <Timeline items={[["Your next box is skipped", "No charge, nothing ships"], [`${Dog} keeps getting the daily chews`, "Use what's on hand"], ["Your following box ships", "On the usual schedule"]]} />
        <p className={styles.callout}>Make sure {dog} has enough chews left to stay on track.</p>
        <div className={styles.stack}>
          <button type="button" className={styles.primary} disabled={busy} onClick={() => send("skip", { title: "Your next box is skipped", body: `${Dog}'s next box won't ship or charge. Your plan picks back up the cycle after that.` }, { reason: skipFrom === "home" ? "" : skipFrom })}>{busy ? "One moment" : "Skip my next box"}</button>
          <button type="button" className={styles.secondary} onClick={() => setScreen("home")}>Keep my next box</button>
        </div>
        {error && <p className={styles.error} role="alert">{error}</p>}
      </Shell>
    );

  if (screen === "why")
    return (
      <Shell eyebrow="Before you go" title="What's the reason?" oneLine onBack={() => setScreen("home")}>
        <p>It takes ten seconds and it helps us make this better for other dogs.</p>
        <div className={styles.stack}>
          {REASONS.map(([k, label]) => <button type="button" key={k} className={styles.option} onClick={() => { setReason(k); setScreen(k); }}>{sub(label)}</button>)}
        </div>
      </Shell>
    );

  const R = { reason };
  const offer = (title: string, body: React.ReactNode, buttons: [string, () => void][]) => (
    <Shell eyebrow="Before you go" title={title} onBack={() => setScreen("why")} oneLine photo={screen}>
      {body}
      <div className={styles.stack}>
        {buttons.map(([label, fn]) => <button type="button" key={label} className={styles.primary} disabled={busy} onClick={fn}>{busy ? "One moment" : label}</button>)}
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      {cancelLink}
    </Shell>
  );
  const every8 = ["Ship every 8 weeks instead", () => send("every8", { title: "Got it", body: "We'll switch you to every 8 weeks and confirm by email." }, R)] as [string, () => void];
  const skip = ["Skip my next box", () => { setSkipFrom(screen); setScreen("skip"); }] as [string, () => void];

  if (screen === "price")
    return offer("We can make it easier", (
      <>
        <p>We'd rather keep {dog} comfortable than lose you over price.</p>
        <Deal big={`$${SAVE_OFFER_DOLLARS} off`} line={`your next ${SAVE_OFFER_MONTHS} boxes`} small={`$${50 - SAVE_OFFER_DOLLARS} each instead of $50`} />
        <Points items={["Same spray and chews", `Same routine for ${dog}`, `Back to $50 after ${SAVE_OFFER_MONTHS} boxes`]} />
      </>
    ), hasDiscount ? [] : [[`Yes, take $${SAVE_OFFER_DOLLARS} off`, () => send("discount", { title: "Done", body: `$${SAVE_OFFER_DOLLARS} off your next ${SAVE_OFFER_MONTHS} boxes. Nothing else changes.` }, R)]]);
  if (screen === "much")
    return offer("No need to cancel for that", (
      <>
        <p>Extra on the shelf? You have two easy options.</p>
        <Points items={[["Skip a box.", "We'll skip your next one."], ["Ship every 8 weeks.", "Instead of every 4."]]} />
        <p>{Dog} stays covered, and you stop paying for product you don't need yet.</p>
      </>
    ), [skip, every8]);
  if (screen === "results")
    return offer("Let's talk it through", (
      <>
        <p>Itch relief builds over weeks, and it's easy to miss day to day.</p>
        <Guarantee>If {dog} isn't doing better after a real try, we'll take care of you.</Guarantee>
        <Points items={[["Missed days", "can set progress back."], ["Care team call.", "We'll go over how you're using the spray and chews."]]} />
      </>
    ), [["Yes, have someone call me", () => send("call", { title: "We'll be in touch", body: "Someone from our care team will call you soon." }, R)], ["Keep my membership, I'll give it more time", () => send("keep", { title: "Thank you", body: `We'll keep ${dog}'s membership going.` }, R)]]);
  if (screen === "better")
    return offer("That's great to hear", (
      <>
        <p>We're glad {dog} is feeling better.</p>
        <Points items={["Itch tends to come back when the routine stops", "Most people keep a lighter routine going"]} />
        <Deal big="Every 8 weeks" line={`keeps ${dog} comfortable`} small="Half the cost over time" />
      </>
    ), [["Switch me to every 8 weeks", every8[1]]]);
  if (screen === "eat")
    return offer("Let us help with that", (
      <>
        <p>Some dogs are picky at first. Two easy tricks usually work.</p>
        <Steps items={["Mix the chew into a little wet food", "Or crumble it over dinner", "Still no luck? Our team will help you find a fix"]} />
      </>
    ), [["Email me tips and help from the team", () => send("tips", { title: "We'll be in touch", body: "Someone from our team will email you shortly." }, R)], ["Skip my next box while I try", skip[1]]]);
  if (screen === "other")
    return (
      <Shell eyebrow="Before you go" title="Tell us what's going on" oneLine photo="other" onBack={() => setScreen("why")}>
        <p>A short note is plenty. A real person reads every one.</p>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="note">What's the reason?</label>
          <textarea id="note" className={styles.input} value={note} onChange={(e) => setNote(e.target.value)} maxLength={800} />
        </div>
        <button type="button" className={styles.primary} disabled={busy} onClick={() => send("feedback", { title: "Thank you", body: "We'll keep your membership going and read your note." }, { ...R, note })}>{busy ? "One moment" : "Send and keep my membership"}</button>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button type="button" className={styles.link} onClick={() => setScreen("confirm")}>Send and continue to cancel</button>
      </Shell>
    );

  return (
    <Shell eyebrow="Last step" title="Confirm cancellation" oneLine photo="confirm" onBack={() => setScreen("why")}>
      <Points items={["Your membership ends after your current box", "No more charges", "Anything already paid for still ships"]} />
      <div className={styles.stack}>
        <button type="button" className={styles.primary} onClick={() => setScreen("home")}>Never mind, keep it</button>
        <button type="button" className={styles.danger} disabled={busy} onClick={() => send("cancel", { title: "Your membership is cancelled", body: `Thank you for trying Friday Zoomies with ${dog}. You can restart any time by emailing support@fridayzoomies.com.` }, { ...R, note })}>{busy ? "One moment" : "Cancel my membership"}</button>
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </Shell>
  );
}
