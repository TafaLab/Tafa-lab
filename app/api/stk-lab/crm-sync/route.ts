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
  if (!user) {
    console.warn("[crm-sync] GET unauthorized");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const client = adminClient();
  if (!client) {
    console.error("[crm-sync] GET server_not_configured");
    return NextResponse.json({ error: "server_not_configured" }, { status: 500 });
  }
  const { data, error } = await client.from("stk_lab_crm_state").select("state,updated_at").eq("user_id", user.id).maybeSingle();
  if (error) {
    console.error("[crm-sync] GET load_failed", { code: error.code });
    return NextResponse.json({ error: "load_failed" }, { status: 500 });
  }
  const state = data?.state as Record<string, unknown> | null;
  console.info("[crm-sync] GET success", {
    activity: Array.isArray(state?.activity) ? state.activity.length : 0,
    manual: Array.isArray(state?.manual) ? state.manual.length : 0,
    deleted: Array.isArray(state?.deleted) ? state.deleted.length : 0,
    updatedAt: data?.updated_at || null,
  });
  return NextResponse.json({ state: data?.state || null, updated_at: data?.updated_at || null }, { headers: { "Cache-Control": "no-store" } });
}
export async function PUT(request: Request) {
  const user = await authenticatedUser(request);
  if (!user) {
    console.warn("[crm-sync] PUT unauthorized");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const client = adminClient();
  if (!client) {
    console.error("[crm-sync] PUT server_not_configured");
    return NextResponse.json({ error: "server_not_configured" }, { status: 500 });
  }
  const body = await request.json().catch(() => null), state = body?.state;
  const stateBytes = state && typeof state === "object" ? JSON.stringify(state).length : 0;
  if (!state || typeof state !== "object" || stateBytes > 2_000_000) {
    console.warn("[crm-sync] PUT invalid_state", { stateBytes });
    return NextResponse.json({ error: "invalid_state" }, { status: 400 });
  }
  const { error } = await client.from("stk_lab_crm_state").upsert({ user_id: user.id, state, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  if (error) {
    console.error("[crm-sync] PUT save_failed", { code: error.code });
    return NextResponse.json({ error: "save_failed" }, { status: 500 });
  }
  console.info("[crm-sync] PUT success", {
    stateBytes,
    activity: Array.isArray(state.activity) ? state.activity.length : 0,
    manual: Array.isArray(state.manual) ? state.manual.length : 0,
    deleted: Array.isArray(state.deleted) ? state.deleted.length : 0,
  });
  return NextResponse.json({ ok: true });
}
