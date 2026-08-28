import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedSites = new Set([
  "Serena Spa & Wellness",
  "Muse Hair & Beauty Salon",
  "Aurea Clinical Cosmetology",
  "VOLT Creative Color Studio",
  "LIMONÉ — restaurant reservation",
  "Limoné — restaurant reservation",
  "Velaria Travel",
  "Altitude Expeditions",
  "Milewise Travel Hacking Academy",
  "STK Travel — consultation",
  "VERDANT — restaurant reservation",
  "NOOR TABLE — restaurant reservation",
  "KURO 炉端 — restaurant reservation",
  "SMART TABLE — restaurant order",
  "VELOURA CAKES — bakery order",
  "MAISON LEVAIN — bakery order",
  "ÉCLAIR MAISON — bakery order",
  "IRONWOOD — enquiry",
  "VELVET STAGE — enquiry",
  "SPARK! — enquiry",
  "WONDERNEST — enquiry",
  "NEXUS / ONE — business platform",
  "STOCKFLOW — business platform",
  "PULSE PEOPLE — business platform",
  "LEDGER / PRIVATE — business platform",
]);

const attempts = new Map<string, number[]>();
const windowMs = 10 * 60 * 1000;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json({ error: "unsupported_media_type" }, { status: 415 });
    }

    const body = await request.json();
    const now = Date.now();
    const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
    if (!startedAt || now - startedAt < 1200 || now - startedAt > 2 * 60 * 60 * 1000) {
      return NextResponse.json({ error: "invalid_submission" }, { status: 400 });
    }

    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const clientKey = forwarded || request.headers.get("x-real-ip") || "unknown";
    const recent = (attempts.get(clientKey) ?? []).filter((time) => now - time < windowMs);
    if (recent.length >= 5) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    attempts.set(clientKey, [...recent, now]);

    const name = clean(body.name, 100);
    const contact = clean(body.contact, 180);
    const siteName = clean(body.siteName, 160);
    if (!name || !contact || !allowedSites.has(siteName)) {
      return NextResponse.json({ error: "invalid_request" }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) {
      return NextResponse.json({ error: "server_not_configured" }, { status: 500 });
    }

    const supabase = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
    const payload = {
      type: "demo_site_order",
      siteName,
      subject: clean(body.subject, 300) || null,
      message: clean(body.message, 3000) || null,
      locale: body.locale === "en" ? "en" : "ru",
    };
    const { error } = await supabase.from("orders").insert({
      customer_name: name,
      customer_phone: contact,
      customer_email: null,
      customer_messenger: null,
      delivery_type: "digital",
      delivery_date: null,
      delivery_time: null,
      address: null,
      weight: "DEMO_SITE_ORDER",
      filling: siteName,
      cake_color: "DEMO_SITE",
      decorations: [],
      inscription: null,
      customer_comment: JSON.stringify(payload),
      price: 0,
    });

    if (error) {
      console.error("Demo order insert:", error.message);
      return NextResponse.json({ error: "save_failed" }, { status: 500 });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}
