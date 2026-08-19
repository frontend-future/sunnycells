import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const GRAPH_VERSION = "v21.0";

type UserDataInput = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
};

type Payload = {
  event_name: string;
  event_id: string;
  event_source_url?: string;
  custom_data?: Record<string, unknown>;
  user_data?: UserDataInput;
};

function sha256(value: string) {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function getCookie(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export async function POST(request: Request) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({ error: "Meta CAPI not configured" }, { status: 500 });
  }

  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload.event_name || !payload.event_id) {
    return NextResponse.json({ error: "Missing event_name or event_id" }, { status: 400 });
  }

  const cookieHeader = request.headers.get("cookie");
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : undefined;
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const fbp = getCookie(cookieHeader, "_fbp");
  const fbc = getCookie(cookieHeader, "_fbc");

  const u = payload.user_data ?? {};
  const userData: Record<string, unknown> = {
    ...(clientIp ? { client_ip_address: clientIp } : {}),
    ...(userAgent ? { client_user_agent: userAgent } : {}),
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
    ...(u.email ? { em: [sha256(u.email)] } : {}),
    ...(u.phone ? { ph: [sha256(u.phone.replace(/[^0-9]/g, ""))] } : {}),
    ...(u.firstName ? { fn: [sha256(u.firstName)] } : {}),
    ...(u.lastName ? { ln: [sha256(u.lastName)] } : {}),
    ...(u.city ? { ct: [sha256(u.city.replace(/\s/g, ""))] } : {}),
    ...(u.state ? { st: [sha256(u.state.replace(/\s/g, ""))] } : {}),
    ...(u.zip ? { zp: [sha256(u.zip.replace(/\s/g, ""))] } : {}),
    ...(u.country ? { country: [sha256(u.country.replace(/\s/g, ""))] } : {}),
  };

  const body = {
    data: [
      {
        event_name: payload.event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.event_id,
        event_source_url: payload.event_source_url,
        action_source: "website",
        user_data: userData,
        custom_data: payload.custom_data ?? {},
      },
    ],
  };

  let res: Response;
  try {
    res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
  } catch (err) {
    console.error("[meta-capi] request failed", err);
    return NextResponse.json({ ok: false, error: "Request to Meta failed" }, { status: 502 });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("[meta-capi] Meta API error", res.status, data);
    return NextResponse.json({ ok: false, error: data }, { status: 502 });
  }

  return NextResponse.json({ ok: true, result: data });
}
