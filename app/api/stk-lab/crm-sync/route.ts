import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function clientForToken(token: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false }, global: { headers: { Authorization: `Bearer ${token}` } } });
}
function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
}
async function authenticatedUser(request: Request) {
  const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
  const client = token ? clientForToken(token) : null;
  if (!client) return null;
  const { data, error } = await client.auth.getUser(token);
  return error || !data.user ? null : data.user;
}
export async function GET(request: Request) {
  const user = await authenticatedUser(request);
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const client = adminClient();
  if (!client) return NextResponse.json({ error: "server_not_configured" }, { status: 500 });
  const { data, error } = await client.from("stk_lab_crm_state").select("state,updated_at").eq("user_id", user.id).maybeSingle();
  if (error) return NextResponse.json({ error: "load_failed" }, { status: 500 });
  return NextResponse.json({ state: data?.state || null, updated_at: data?.updated_at || null }, { headers: { "Cache-Control": "no-store" } });
}
export async function PUT(request: Request) {
  const user = await authenticatedUser(request);
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const client = adminClient();
  if (!client) return NextResponse.json({ error: "server_not_configured" }, { status: 500 });
  const body = await request.json().catch(() => null), state = body?.state;
  if (!state || typeof state !== "object" || JSON.stringify(state).length > 2_000_000) return NextResponse.json({ error: "invalid_state" }, { status: 400 });
  const { error } = await client.from("stk_lab_crm_state").upsert({ user_id: user.id, state, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  if (error) return NextResponse.json({ error: "save_failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
