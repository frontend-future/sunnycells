import { Resend } from "resend";

/* A plain email to the owner. Never throws: an alert that fails must not fail the webhook. */
export async function sendAlert(subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  if (!key || !domain) return;
  try {
    await new Resend(key).emails.send({
      from: `Friday Zoomies orders <notifications@${domain}>`,
      to: process.env.NOTIFY_TO_EMAIL ?? "jake@ripleads.com",
      subject,
      html: `<div style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#14213D">${html}</div>`,
    });
  } catch (e) {
    console.error("alert email failed", e);
  }
}
