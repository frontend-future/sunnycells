import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml, FROM_NAME, NOTIFY_TO_EMAIL, postToSlack, type Result } from "@/lib/notify";

type Shipping = {
  email: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
};

type NotifyPayload = {
  shipping: Shipping;
  plan: string;
  total: number;
};

async function sendEmail(p: NotifyPayload, name: string): Promise<Result> {
  const apiKey = process.env.RESEND_API_KEY;
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  if (!apiKey || !domain) {
    return { ok: false, error: "RESEND_API_KEY or RESEND_EMAIL_DOMAIN not configured" };
  }

  const { shipping, plan, total } = p;
  const address = [shipping.line1, shipping.line2, `${shipping.city}, ${shipping.state} ${shipping.zip}`]
    .filter(Boolean)
    .map((l) => escapeHtml(l as string))
    .join("<br>");

  const html = `
    <div style="font-family: sans-serif; font-size: 14px; color: #0D0D0C; line-height: 1.6;">
      <h2 style="margin: 0 0 12px;">New purchase attempt</h2>
      <p><strong>Plan:</strong> ${escapeHtml(plan)}<br>
      <strong>Total:</strong> $${total}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}<br>
      <strong>Email:</strong> ${escapeHtml(shipping.email)}<br>
      <strong>Phone:</strong> ${escapeHtml(shipping.phone || "—")}</p>
      <p><strong>Shipping address:</strong><br>${address}</p>
      <p style="color: #6B6B60; font-size: 12px; margin-top: 24px;">
        No payment was processed. This checkout does not run real transactions yet.
      </p>
    </div>
  `;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `${FROM_NAME} <notifications@${domain}>`,
    to: NOTIFY_TO_EMAIL,
    subject: `Purchase attempt: ${name || shipping.email}, $${total}`,
    html,
  });

  return error ? { ok: false, error: error.message } : { ok: true };
}

async function sendSlack(p: NotifyPayload, name: string): Promise<Result> {
  const { shipping, plan, total } = p;
  const address = [shipping.line1, shipping.line2, `${shipping.city}, ${shipping.state} ${shipping.zip}`]
    .filter(Boolean)
    .join(", ");

  return postToSlack(`New purchase attempt: ${name || shipping.email}, $${total}`, [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*New purchase attempt*\n*Plan:* ${plan}\n*Total:* $${total}\n*Name:* ${name}\n*Email:* ${shipping.email}\n*Phone:* ${shipping.phone || "—"}\n*Shipping:* ${address}`,
      },
    },
    {
      type: "context",
      elements: [
        { type: "mrkdwn", text: "No payment was processed. This checkout does not run real transactions yet." },
      ],
    },
  ]);
}

export async function POST(request: Request) {
  let payload: NotifyPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { shipping, plan, total } = payload;
  if (!shipping?.email || !plan || typeof total !== "number") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const name = `${shipping.firstName ?? ""} ${shipping.lastName ?? ""}`.trim();
  const [email, slack] = await Promise.all([sendEmail(payload, name), sendSlack(payload, name)]);
  return NextResponse.json({ email, slack });
}
