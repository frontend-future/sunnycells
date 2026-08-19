import { NextResponse } from "next/server";
import { Resend } from "resend";
import { chunkLines, escapeHtml, FROM_NAME, NOTIFY_TO_EMAIL, postToSlack, type Result } from "@/lib/notify";

type NotifyPayload = {
  quizId: string;
  email: string;
  phone?: string;
  answers: Record<string, string>;
};

/** One endpoint serves every funnel, so the alert says which one it came from. */
function quizLabel(quizId: string) {
  if (quizId === "diet") return "New cortisol quiz lead";
  return `New quiz lead (${quizId})`;
}

async function sendEmail(payload: NotifyPayload): Promise<Result> {
  const apiKey = process.env.RESEND_API_KEY;
  const domain = process.env.RESEND_EMAIL_DOMAIN;
  if (!apiKey || !domain) {
    return { ok: false, error: "RESEND_API_KEY or RESEND_EMAIL_DOMAIN not configured" };
  }

  const { email, phone, answers } = payload;
  const rows = Object.entries(answers)
    .map(
      ([q, a]) =>
        `<tr><td style="padding:4px 12px 4px 0; color:#6B6B60; vertical-align:top;">${escapeHtml(q)}</td><td>${escapeHtml(a)}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family: sans-serif; font-size: 14px; color: #0D0D0C; line-height: 1.6;">
      <h2 style="margin: 0 0 12px;">${escapeHtml(quizLabel(payload.quizId))}</h2>
      <p><strong>Email:</strong> ${escapeHtml(email)}<br>
      <strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
      <table style="margin-top: 16px; border-collapse: collapse; font-size: 13px;">${rows}</table>
    </div>
  `;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `${FROM_NAME} <notifications@${domain}>`,
    to: NOTIFY_TO_EMAIL,
    subject: `${quizLabel(payload.quizId)}: ${email}`,
    html,
  });

  return error ? { ok: false, error: error.message } : { ok: true };
}

async function sendSlack(payload: NotifyPayload): Promise<Result> {
  const { email, phone, answers } = payload;
  const chunks = chunkLines(Object.entries(answers).map(([q, a]) => `• *${q}:* ${a}`));
  const label = quizLabel(payload.quizId);

  return postToSlack(`${label}: ${email}`, [
    {
      type: "section",
      text: { type: "mrkdwn", text: `*${label}*\n*Email:* ${email}\n*Phone:* ${phone || "—"}` },
    },
    ...(chunks.length
      ? chunks.map((text) => ({ type: "section", text: { type: "mrkdwn" as const, text } }))
      : [{ type: "section", text: { type: "mrkdwn" as const, text: "No answers recorded" } }]),
  ]);
}

export async function POST(request: Request) {
  let payload: NotifyPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload?.email || !payload?.quizId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  /* Both go at once and neither is allowed to fail the other. */
  const [email, slack] = await Promise.all([sendEmail(payload), sendSlack(payload)]);
  return NextResponse.json({ email, slack });
}
