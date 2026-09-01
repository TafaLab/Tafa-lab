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

const demoCompanies = [
  { name: "Serena Spa & Wellness", category: "Beauty", href: "/spa-demo" },
  { name: "Muse Hair & Beauty Salon", category: "Beauty" },
  { name: "Aurea Clinical Cosmetology", category: "Beauty" },
  { name: "VOLT Creative Color Studio", category: "Beauty" },
  { name: "VELOURA CAKES — bakery order", category: "Bakery" },
  { name: "MAISON LEVAIN — bakery order", category: "Bakery" },
  { name: "ÉCLAIR MAISON — bakery order", category: "Bakery" },
  { name: "LIMONÉ — restaurant reservation", category: "Restaurants" },
  { name: "VERDANT — restaurant reservation", category: "Restaurants" },
  { name: "NOOR TABLE — restaurant reservation", category: "Restaurants" },
  { name: "KURO 炉端 — restaurant reservation", category: "Restaurants" },
  { name: "SMART TABLE — restaurant order", category: "Restaurants" },
  { name: "Velaria Travel", category: "Travel", href: "/travel-demo" },
  { name: "Altitude Expeditions", category: "Travel" },
  { name: "Milewise Travel Hacking Academy", category: "Academy" },
  { name: "NEXUS / ONE — business platform", category: "Business" },
  { name: "STOCKFLOW — business platform", category: "Business" },
  { name: "PULSE PEOPLE — business platform", category: "Business" },
  { name: "LEDGER / PRIVATE — business platform", category: "Business" },
  { name: "IRONWOOD — enquiry", category: "Events" },
  { name: "VELVET STAGE — enquiry", category: "Events" },
  { name: "SPARK! — enquiry", category: "Events" },
  { name: "WONDERNEST — enquiry", category: "Events" },
] as const;

export default function DemoAdminPage() {
  const locale = useLocale() === "en" ? "en" : "ru";
  const en = locale === "en";
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState("requests");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
  const visibleOrders = useMemo(
    () =>
      companyFilter === "all"
        ? orders
        : orders.filter((order) => payload(order)?.siteName === companyFilter),
    [orders, companyFilter],
  );
  const activeCompanies = useMemo(
    () => new Set(orders.map((order) => payload(order)?.siteName).filter(Boolean)).size,
    [orders],
  );
  const newOrders = orders.filter((order) => order.status === "new").length;
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
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#211a17]/95 text-white shadow-lg backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 py-4 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[.24em] text-white/45">
                {en ? "PUBLIC DEMO ADMIN" : "ОТКРЫТАЯ ДЕМО-АДМИНКА"}
              </p>
              <strong className="mt-1 block text-lg tracking-[-.02em]">
                Tafa Lab · Demo Projects
              </strong>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/${locale}`} className="hidden rounded-full bg-white px-4 py-2 text-sm text-[#211a17] sm:block" style={{ color: "#211a17" }}>
                Tafa Lab
              </Link>
              <button
                type="button"
                onClick={() => setCompanyMenuOpen((value) => !value)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xl md:hidden"
                aria-label={en ? "Open companies" : "Открыть список компаний"}
                aria-expanded={companyMenuOpen}
              >
                {companyMenuOpen ? "×" : "☰"}
              </button>
            </div>
          </div>
          <div className="mt-4 hidden items-center gap-2 overflow-x-auto pb-1 md:flex">
            <button
              type="button"
              onClick={() => setCompanyFilter("all")}
              className={`shrink-0 rounded-full px-3 py-2 text-xs ${companyFilter === "all" ? "bg-white text-[#211a17]" : "border border-white/15 text-white/70"}`}
            >
              {en ? "All companies" : "Все компании"}
            </button>
            {demoCompanies.map((company) => (
              <button
                type="button"
                key={company.name}
                onClick={() => setCompanyFilter(company.name)}
                className={`shrink-0 rounded-full px-3 py-2 text-xs ${companyFilter === company.name ? "bg-[#d8b57b] text-[#211a17]" : "border border-white/15 text-white/70"}`}
              >
                {company.name.split(" — ")[0]}
              </button>
            ))}
          </div>
          {companyMenuOpen && (
            <div className="mt-4 grid gap-2 border-t border-white/10 pt-4 md:hidden">
              <button type="button" onClick={() => { setCompanyFilter("all"); setCompanyMenuOpen(false); }} className="rounded-2xl bg-white px-4 py-3 text-left text-sm text-[#211a17]">
                {en ? "All companies" : "Все компании"}
              </button>
              {demoCompanies.map((company) => (
                <button
                  type="button"
                  key={company.name}
                  onClick={() => { setCompanyFilter(company.name); setCompanyMenuOpen(false); }}
                  className={`rounded-2xl px-4 py-3 text-left text-sm ${companyFilter === company.name ? "bg-[#d8b57b] text-[#211a17]" : "border border-white/10 bg-white/5 text-white"}`}
                >
                  <span className="block">{company.name}</span>
                  <span className="mt-1 block text-xs opacity-50">{company.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="mb-5 flex items-center justify-between lg:hidden">
          <p className="text-xs uppercase tracking-[.2em] text-black/40">TAFA LAB CMS</p>
          <button type="button" onClick={() => setSidebarOpen((value) => !value)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">
            {sidebarOpen ? "×" : "☰"} {en ? "Menu" : "Меню"}
          </button>
        </div>
        <div className="grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">
          <aside className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
            <div className="rounded-3xl border border-black/10 bg-white p-3 lg:sticky lg:top-24">
              <p className="px-3 pb-3 pt-2 text-[10px] uppercase tracking-[.22em] text-black/35">{en ? "Demo CMS" : "Демо CMS"}</p>
              {[
                ["requests", en ? "Requests" : "Заявки"],
                ["pages", en ? "Pages" : "Страницы"],
                ["content", en ? "Text & content" : "Тексты и контент"],
                ["media", en ? "Images & media" : "Изображения"],
                ["services", en ? "Services & menu" : "Услуги и меню"],
                ["seo", "SEO"],
                ["settings", en ? "Settings" : "Настройки"],
              ].map(([id, label]) => (
                <button type="button" key={id} onClick={() => { setActivePanel(id); setSidebarOpen(false); }} className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm ${activePanel === id ? "bg-[#211a17] text-white" : "text-black/60 hover:bg-[#f5f1ec]"}`}>
                  <span>{label}</span>
                  {id !== "requests" && <span className="text-[10px] opacity-40">DEMO</span>}
                </button>
              ))}
              <div className="mt-3 rounded-2xl bg-[#fff8eb] p-3 text-xs leading-5 text-[#75552f]">
                {en ? "Public preview. Editing is disabled." : "Публичная демо-версия. Редактирование отключено."}
              </div>
            </div>
          </aside>
          <div className="min-w-0">
        {activePanel !== "requests" && (
          <div className="mb-8 rounded-3xl border border-black/10 bg-white p-5 shadow-sm md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-black/35">TAFA LAB CMS · DEMO</p>
                <h2 className="mt-2 text-3xl font-semibold">
                  {activePanel === "pages" ? (en ? "Site pages" : "Страницы сайта") : activePanel === "content" ? (en ? "Text & content" : "Тексты и контент") : activePanel === "media" ? (en ? "Images & media" : "Изображения и медиа") : activePanel === "services" ? (en ? "Services & menu" : "Услуги и меню") : activePanel === "seo" ? "SEO" : (en ? "Settings" : "Настройки")}
                </h2>
              </div>
              <span className="rounded-full bg-[#fff1d6] px-3 py-1.5 text-xs text-[#75552f]">{en ? "Preview only" : "Только просмотр"}</span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                [en ? "Homepage" : "Главная страница", en ? "Hero, navigation and featured sections" : "Первый экран, навигация и основные блоки"],
                [en ? "Russian version" : "Русская версия", en ? "Localized text and page content" : "Переведённые тексты и содержимое страниц"],
                [en ? "Media library" : "Медиатека", en ? "Images, galleries and project previews" : "Изображения, галереи и превью проектов"],
                [en ? "Publishing workflow" : "Публикация", en ? "Draft, preview and publish changes" : "Черновик, просмотр и публикация изменений"],
              ].map(([title, description]) => (
                <div key={title} className="rounded-2xl border border-black/10 bg-[#faf8f5] p-4">
                  <div className="flex items-center justify-between gap-3"><h3 className="font-medium">{title}</h3><span className="text-xs text-black/35">CMS</span></div>
                  <p className="mt-2 text-sm leading-6 text-black/50">{description}</p>
                  <input disabled value={title} readOnly className="mt-4 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-black/45" />
                  <div className="mt-3 flex gap-2">
                    <button disabled className="rounded-full bg-[#211a17] px-4 py-2 text-xs text-white/40">{en ? "Edit" : "Изменить"}</button>
                    <button disabled className="rounded-full border border-black/10 px-4 py-2 text-xs text-black/35">{en ? "Preview" : "Предпросмотр"}</button>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-2xl bg-[#f5f1ec] p-4 text-sm leading-6 text-black/50">
              {en ? "In a real client project, owners could edit text, upload images, save drafts and publish changes. This public demo is read-only." : "В реальном проекте владелец мог бы менять тексты, загружать изображения, сохранять черновики и публиковать изменения. Эта публичная демо-версия работает только для просмотра."}
            </p>
          </div>
        )}
        <div className="rounded-2xl border border-[#b18a5b]/25 bg-[#fff8eb] p-4 text-sm text-[#75552f]">
          {en
            ? "This admin is an open demonstration. Visitors can submit test requests and change their statuses."
            : "Это открытая демонстрационная админка. Посетители могут отправлять тестовые заявки и менять их статусы."}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl bg-[#211a17] p-5 text-white">
            <p className="text-xs uppercase tracking-[.18em] text-white/45">{en ? "All requests" : "Все заявки"}</p>
            <p className="mt-3 text-4xl">{orders.length}</p>
          </div>
          <div className="rounded-3xl border border-black/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[.18em] text-black/40">{en ? "New" : "Новые"}</p>
            <p className="mt-3 text-4xl">{newOrders}</p>
          </div>
          <div className="rounded-3xl border border-black/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[.18em] text-black/40">{en ? "Active demos" : "Демо-компании"}</p>
            <p className="mt-3 text-4xl">{activeCompanies}</p>
          </div>
        </div>
        <div className="mt-8 flex items-end justify-between gap-4">
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
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs uppercase tracking-[.18em] text-black/40">
            {en ? "Filter by company" : "Фильтр по компании"}
          </span>
          <span className="rounded-full bg-[#211a17] px-3 py-1.5 text-xs text-white">
            {companyFilter === "all" ? (en ? "All companies" : "Все компании") : companyFilter}
          </span>
          <span className="text-xs text-black/40">· {visibleOrders.length} {en ? "requests" : "заявок"}</span>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_430px]">
          <div className="space-y-4">
            {loading ? (
              <div className="rounded-3xl bg-white p-8">
                {en ? "Loading…" : "Загрузка…"}
              </div>
            ) : visibleOrders.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-black/15 bg-white/50 p-10 text-black/45">
                {en ? "No demo requests yet." : "Демо-заявок пока нет."}
              </div>
            ) : (
              visibleOrders.map((order) => {
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
          </div>
        </div>
      </section>
    </main>
  );
}
