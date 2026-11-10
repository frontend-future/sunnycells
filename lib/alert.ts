import { Resend } from "resend";

const OWNER = process.env.NOTIFY_TO_EMAIL ?? "jake@ripleads.com";

/* A plain email about an order. Everything goes to the owner. `ownerOnly` is kept on the
   calls that are faults to fix, in case order alerts are shared with someone again.
   Never throws: an alert that fails must not fail the webhook. */
export async function sendAlert(subject: string, html: string, opts: { ownerOnly?: boolean; to?: string } = {}) {
  const key = process.env.RESEND_API_KEY;
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  if (!key || !domain) return;
  try {
    await new Resend(key).emails.send({
      from: `Friday Zoomies orders <notifications@${domain}>`,
      to: [opts.to ?? OWNER],
      subject,
      html: `<div style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#14213D">${html}</div>`,
    });
  } catch (e) {
    console.error("alert email failed", e);
  }
}
