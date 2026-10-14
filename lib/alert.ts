import { Resend } from "resend";

const OWNER = process.env.NOTIFY_TO_EMAIL ?? "jake@ripleads.com";
const ORDERS_TEAM = [OWNER, "oliver.weir@mullinspartnersllc.com"];

/* A plain email about an order. New order alerts go to the owner and Oliver; pass `ownerOnly` for
   anything that is a fault to fix, such as a failed order sync, which only the owner should get.
   Never throws: an alert that fails must not fail the webhook. */
export async function sendAlert(subject: string, html: string, opts: { ownerOnly?: boolean } = {}) {
  const key = process.env.RESEND_API_KEY;
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  if (!key || !domain) return;
  try {
    await new Resend(key).emails.send({
      from: `Friday Zoomies orders <notifications@${domain}>`,
      to: opts.ownerOnly ? [OWNER] : ORDERS_TEAM,
      subject,
      html: `<div style="font-family:sans-serif;font-size:14px;line-height:1.6;color:#14213D">${html}</div>`,
    });
  } catch (e) {
    console.error("alert email failed", e);
  }
}
