/**
 * Shared plumbing for the two notification routes.
 *
 * Both alerts go out over Resend and Slack at the same time and neither is allowed to
 * take the other down, or to take the customer's journey down with it: the routes
 * report what happened and the client carries on regardless.
 */
import { getToken } from "@vercel/connect";

export const NOTIFY_TO_EMAIL = process.env.NOTIFY_TO_EMAIL ?? "jake@ripleads.com";
export const FROM_NAME = "SUNNYCELLS";

/** Slack is optional. With no connector configured the routes just skip it. */
const SLACK_CONNECTOR = process.env.SLACK_CONNECTOR;
const SLACK_CHANNEL = process.env.SLACK_CHANNEL;

export type Result = { ok: boolean; error?: string };

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* Slack rejects any single text block over 3000 characters, so a long answer list is
   split across blocks rather than truncated. */
export function chunkLines(lines: string[], limit = 2800): string[] {
  const chunks: string[] = [];
  let current = "";
  for (const line of lines) {
    if (current && current.length + line.length + 1 > limit) {
      chunks.push(current);
      current = line;
    } else {
      current = current ? `${current}\n${line}` : line;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

type Block = { type: string; text?: { type: string; text: string }; elements?: unknown[] };

export async function postToSlack(text: string, blocks: Block[]): Promise<Result> {
  if (!SLACK_CONNECTOR || !SLACK_CHANNEL) {
    return { ok: false, error: "SLACK_CONNECTOR or SLACK_CHANNEL not configured" };
  }

  let token: string;
  try {
    token = await getToken(SLACK_CONNECTOR, {
      subject: { type: "app" },
      scopes: ["chat:write", "channels:read", "groups:read"],
    });
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "failed to get Slack token" };
  }

  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ channel: SLACK_CHANNEL, text, blocks }),
  });

  const data = await res.json();
  return data.ok ? { ok: true } : { ok: false, error: data.error };
}
