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


/* One row per Friday Zoomies lead in the Marketing Dashboard "Quiz Leads" tab, through a small Apps
   Script web app. Answers come keyed by question text, so each column finds its answer by a stem
   of the question. Rewording a question blanks that column until its stem is updated. */
const SHEET_COLUMNS: [string, string][] = [
  ["You want your dog to", "Goal"],
  ["dog's name", "Dog name"],
  ["Gender", "Gender"],
  ["How big is", "Weight"],
  ["How old is", "Age"],
  ["scratch or lick the most", "Where it itches"],
  ["How often does", "How often"],
  ["noticed any of these", "Symptoms"],
  ["ruled out fleas", "Fleas ruled out"],
  ["get worse", "Worse when"],
  ["already tried", "Tried"],
  ["dealing with", "How long"],
  ["makes me feel", "Feeling"],
  ["already spent", "Spent so far"],
  ["most afraid", "Main fear"],
  ["help you most", "Wants"],
];

async function sendSheet(payload: NotifyPayload): Promise<Result> {
  const url = process.env.LEADS_SHEET_URL;
  const secret = process.env.LEADS_SHEET_SECRET;
  if (!url || !secret || payload.quizId !== "itch-fridayzoomies") return { ok: true };

  /* Building the row is inside the try as well: nothing about the sheet may throw out of here. */
  try {
    const entries = Object.entries(payload.answers ?? {});
    const find = (stem: string) => entries.find(([q]) => q.toLowerCase().includes(stem.toLowerCase()))?.[1] ?? "";
    const row = [
      new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
      payload.email,
      payload.phone ?? "",
      "", // Address: the quiz never asks, filled from the order later
      payload.quizId,
      ...SHEET_COLUMNS.map(([stem]) => find(stem)),
    ];
    const res = await fetch(url, { method: "POST", body: JSON.stringify({ secret, row }), signal: AbortSignal.timeout(8000) });
    return res.ok ? { ok: true } : { ok: false, error: `sheet returned ${res.status}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "sheet failed" };
  }
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

  /* All three go at once and none is allowed to fail the others. */
  const [email, slack, sheet] = await Promise.all([sendEmail(payload), sendSlack(payload), sendSheet(payload)]);
  return NextResponse.json({ email, slack, sheet });
}
