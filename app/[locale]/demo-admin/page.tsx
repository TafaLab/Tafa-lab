"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { supabase } from "@/lib/supabase";

type Status =
  "new" | "confirmed" | "in_progress" | "ready" | "completed" | "cancelled";
type DemoOrder = {
  id: string;
  order_number: number | null;
  created_at: string;
  status: Status;
  customer_name: string | null;
  customer_phone: string | null;
  filling: string | null;
  customer_comment: string | null;
};
type Payload = {
  type: "demo_site_order";
  siteName: string;
  subject: string | null;
  message: string | null;
  locale: "ru" | "en";
};

function payload(order: DemoOrder | null): Payload | null {
  if (!order?.customer_comment) return null;
  try {
    const value = JSON.parse(order.customer_comment) as Payload;
    return value.type === "demo_site_order" ? value : null;
  } catch {
    return null;
  }
}

export default function DemoAdminPage() {
  const locale = useLocale() === "en" ? "en" : "ru";
  const en = locale === "en";
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    const { data, error: loadError } = await supabase
      .from("orders")
      .select(
        "id,order_number,created_at,status,customer_name,customer_phone,filling,customer_comment",
      )
      .eq("weight", "DEMO_SITE_ORDER")
      .order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    else {
      const rows = (data ?? []) as DemoOrder[];
      setOrders(rows);
      setSelectedId((current) =>
        current && rows.some((x) => x.id === current)
          ? current
          : (rows[0]?.id ?? null),
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    queueMicrotask(() => void load());
  }, []);
  const selected = orders.find((x) => x.id === selectedId) ?? null;
  const details = useMemo(() => payload(selected), [selected]);
  const labels: Record<Status, string> = en
    ? {
        new: "New",
        confirmed: "Confirmed",
        in_progress: "In progress",
        ready: "Ready",
        completed: "Completed",
        cancelled: "Cancelled",
      }
    : {
        new: "Новая",
        confirmed: "Подтверждена",
        in_progress: "В работе",
        ready: "Готово",
        completed: "Завершена",
        cancelled: "Отменена",
      };

  async function changeStatus(status: Status) {
    if (!selected) return;
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", selected.id);
    if (updateError) setError(updateError.message);
    else
      setOrders((current) =>
        current.map((x) => (x.id === selected.id ? { ...x, status } : x)),
      );
  }

  return (
    <main className="min-h-screen bg-[#f2efe9] text-[#211a17]">
      <header className="border-b border-black/10 bg-[#211a17] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-8">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-white/45">
              {en ? "PUBLIC DEMO ADMIN" : "ОТКРЫТАЯ ДЕМО-АДМИНКА"}
            </p>
            <strong className="mt-1 block text-xl">
              Tafa Lab · Demo Projects
            </strong>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/${locale}/travel-demo`}
              className="rounded-full border border-white/20 px-4 py-2 text-sm"
            >
              Velaria
            </Link>
            <Link
              href={`/${locale}`}
              className="rounded-full bg-white px-4 py-2 text-sm text-[#211a17]"
            >
              Tafa Lab
            </Link>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="rounded-2xl border border-[#b18a5b]/25 bg-[#fff8eb] p-4 text-sm text-[#75552f]">
          {en
            ? "This admin is an open demonstration. Visitors can submit test requests and change their statuses."
            : "Это открытая демонстрационная админка. Посетители могут отправлять тестовые заявки и менять их статусы."}
        </div>
        <div className="mt-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-black/35">
              TAFA LAB DEMO CRM
            </p>
            <h1 className="mt-2 text-4xl font-semibold">
              {en ? "Orders from demo sites" : "Заявки с демо-сайтов"}
            </h1>
          </div>
          <button
            onClick={load}
            className="rounded-full border border-black/10 bg-white px-5 py-3"
          >
            {en ? "Refresh" : "Обновить"}
          </button>
        </div>
        {error && (
          <p className="mt-5 rounded-2xl bg-red-50 p-4 text-red-700">{error}</p>
        )}
        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_430px]">
          <div className="space-y-4">
            {loading ? (
              <div className="rounded-3xl bg-white p-8">
                {en ? "Loading…" : "Загрузка…"}
              </div>
            ) : orders.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-black/15 bg-white/50 p-10 text-black/45">
                {en ? "No demo requests yet." : "Демо-заявок пока нет."}
              </div>
            ) : (
              orders.map((order) => {
                const item = payload(order);
                return (
                  <button
                    key={order.id}
                    onClick={() => setSelectedId(order.id)}
                    className={`w-full rounded-3xl border bg-white p-5 text-left transition ${selectedId === order.id ? "border-[#75552f] shadow-md" : "border-black/10"}`}
                  >
                    <div className="flex justify-between gap-4">
                      <div>
                        <span className="rounded-full bg-[#eee7dc] px-3 py-1 text-xs">
                          {item?.siteName || order.filling || "Demo"}
                        </span>
                        <h2 className="mt-3 text-xl font-semibold">
                          {order.customer_name || "—"}
                        </h2>
                        <p className="mt-1 text-sm text-black/45">
                          {new Date(order.created_at).toLocaleString(
                            en ? "en-US" : "ru-RU",
                          )}
                        </p>
                      </div>
                      <span className="h-fit rounded-full bg-[#f2efe9] px-3 py-1 text-xs">
                        {labels[order.status]}
                      </span>
                    </div>
                    <p className="mt-4 text-black/60">
                      {item?.subject || item?.message || "—"}
                    </p>
                  </button>
                );
              })
            )}
          </div>
          <aside className="lg:sticky lg:top-5 lg:self-start">
            {selected ? (
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[.18em] text-black/35">
                  {details?.siteName || selected.filling}
                </p>
                <h2 className="mt-3 text-3xl font-semibold">
                  {selected.customer_name}
                </h2>
                <p className="mt-2 break-all text-black/55">
                  {selected.customer_phone}
                </p>
                <label className="mt-6 block text-sm font-semibold">
                  {en ? "Status" : "Статус"}
                  <select
                    value={selected.status}
                    onChange={(e) =>
                      void changeStatus(e.target.value as Status)
                    }
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f5] px-4 py-3"
                  >
                    {(Object.keys(labels) as Status[]).map((x) => (
                      <option key={x} value={x}>
                        {labels[x]}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="mt-6 rounded-2xl bg-[#f7f4ef] p-4">
                  <small className="text-black/40">
                    {en ? "Request" : "Запрос"}
                  </small>
                  <p className="mt-2 text-lg">{details?.subject || "—"}</p>
                </div>
                <div className="mt-4 rounded-2xl bg-[#f7f4ef] p-4">
                  <small className="text-black/40">
                    {en ? "Message" : "Пожелания"}
                  </small>
                  <p className="mt-2 whitespace-pre-wrap leading-7">
                    {details?.message || "—"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-black/15 p-8 text-black/40">
                {en ? "Select a request." : "Выберите заявку."}
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
