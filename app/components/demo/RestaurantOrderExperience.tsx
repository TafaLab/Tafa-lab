"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

type Locale = "ru" | "en";
type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: string;
  labels: string[];
};
const menu: MenuItem[] = [
  {
    id: "ramen",
    name: "Spicy Beef Ramen",
    desc: "beef · chilli broth · egg · noodles",
    price: 14,
    category: "Mains",
    labels: ["Popular", "Spicy"],
  },
  {
    id: "burger",
    name: "Truffle Burger",
    desc: "beef · truffle · cheddar · pickles",
    price: 18,
    category: "Mains",
    labels: ["Chef’s pick"],
  },
  {
    id: "sushi",
    name: "Salmon Sushi",
    desc: "salmon · rice · wasabi",
    price: 12,
    category: "Sushi",
    labels: ["Fresh"],
  },
  {
    id: "salad",
    name: "Garden Bowl",
    desc: "avocado · grains · greens · tahini",
    price: 13,
    category: "Starters",
    labels: ["Healthy", "Vegan"],
  },
  {
    id: "pasta",
    name: "Truffle Pasta",
    desc: "fresh pasta · black truffle · parmesan",
    price: 21,
    category: "Mains",
    labels: ["Chef’s pick"],
  },
  {
    id: "cake",
    name: "Chocolate Tahini",
    desc: "dark chocolate · tahini · sea salt",
    price: 9,
    category: "Desserts",
    labels: ["Sweet"],
  },
];
const tables = [
  { id: 4, zone: "Window", seats: 2 },
  { id: 7, zone: "Main hall", seats: 4 },
  { id: 12, zone: "Terrace", seats: 2 },
  { id: 18, zone: "Private room", seats: 8 },
];

export default function RestaurantOrderExperience({
  locale,
}: {
  locale: Locale;
}) {
  const ru = locale === "ru";
  const startedAt = useRef(0);
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [craving, setCraving] = useState("Fresh");
  const [hunger, setHunger] = useState(50);
  const [spice, setSpice] = useState(2);
  const [table, setTable] = useState(12);
  const [guests, setGuests] = useState(2);
  const [zone, setZone] = useState("Terrace");
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const filtered =
    category === "All" ? menu : menu.filter((x) => x.category === category);
  const recommendation =
    craving === "Spicy"
      ? menu[0]
      : craving === "Healthy"
        ? menu[3]
        : craving === "Sweet"
          ? menu[5]
          : hunger > 70
            ? menu[1]
            : menu[2];
  const total = Object.entries(cart).reduce(
    (sum, [id, q]) => sum + (menu.find((x) => x.id === id)?.price || 0) * q,
    0,
  );
  const add = (id: string) =>
    setCart((x) => ({ ...x, [id]: (x[id] || 0) + 1 }));
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSaving(true);
    setError("");
    const subject = `Table ${table} · ${guests} guests · ${zone} · $${total}`;
    const order =
      Object.entries(cart)
        .map(([id, q]) => `${menu.find((x) => x.id === id)?.name} × ${q}`)
        .join(", ") || recommendation.name;
    const response = await fetch("/api/stk-lab/demo-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(fd.get("name") || ""),
        contact: String(fd.get("contact") || ""),
        siteName: "SMART TABLE — restaurant order",
        subject,
        message: `Order: ${order}\nSpice: ${spice}/5\nTable: ${table} (${zone})`,
        locale,
        startedAt: startedAt.current,
      }),
    });
    setSaving(false);
    if (response.ok) setSent(true);
    else
      setError(
        ru ? "Не удалось отправить заказ." : "Could not send the order.",
      );
  }
  return (
    <main
      onPointerDown={() => {
        if (!startedAt.current) startedAt.current = Date.now();
      }}
      className="min-h-screen bg-[#f3efe8] text-[#191714]"
    >
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f3efe8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <Link
            href={`/${locale}/industries/restaurants`}
            className="text-xl font-semibold"
          >
            TAFA · SMART TABLE
          </Link>
          <nav className="flex gap-2">
            <a href="#menu" className="rounded-full border px-4 py-2 text-sm">
              {ru ? "Меню" : "Menu"}
            </a>
            <a
              href="#table"
              className="rounded-full bg-black px-4 py-2 text-sm text-white" style={{ color: "#fff", backgroundColor: "#000" }}
            >
              {ru ? "Выбрать стол" : "Choose table"}
            </a>
          </nav>
        </div>
      </header>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[.25em] opacity-50">
            QR menu · order · reserve
          </p>
          <h1 className="mt-5 text-6xl tracking-[-.06em] md:text-8xl">
            {ru
              ? "Меню, заказ и ваш стол — в одном месте."
              : "Your menu, order and table — all in one place."}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 opacity-60">
            {ru
              ? "Универсальная ресторанная страница: выберите блюдо, настройте остроту, добавьте заказ и забронируйте конкретный стол."
              : "One universal restaurant experience: discover dishes, set spice, order and reserve a specific table."}
          </p>
        </div>
        <div className="rounded-[3rem] bg-[#1d392d] p-8 text-white">
          <p className="text-xs uppercase tracking-[.2em] text-white/45">
            3D / AR menu
          </p>
          <div className="mt-12 flex aspect-square items-center justify-center rounded-full bg-[#efe1bf] text-8xl">
            🍜
          </div>
          <div className="mt-7 flex gap-2">
            <button className="flex-1 rounded-full border border-white/20 px-4 py-3">
              360° {ru ? "вращать" : "rotate"}
            </button>
            <button className="flex-1 rounded-full bg-white px-4 py-3 text-black">
              View in AR
            </button>
          </div>
        </div>
      </section>
      <section className="bg-[#1b1917] px-5 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[.25em] text-[#e8b84a]">
            AI Food Finder
          </p>
          <h2 className="mt-5 text-5xl md:text-7xl">
            {ru ? "Что вам сегодня хочется?" : "What are you craving?"}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl bg-white/5 p-7">
              <div className="flex flex-wrap gap-2">
                {["Spicy", "Fresh", "Hearty", "Healthy", "Sweet"].map((x) => (
                  <button
                    key={x}
                    onClick={() => setCraving(x)}
                    className="rounded-full border border-white/20 px-4 py-2"
                    style={{
                      background: craving === x ? "#e8b84a" : undefined,
                      color: craving === x ? "#000" : undefined,
                    }}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <p className="mt-8">
                {ru ? "Насколько вы голодны?" : "How hungry are you?"}
              </p>
              <input
                type="range"
                min="0"
                max="100"
                value={hunger}
                onChange={(e) => setHunger(Number(e.target.value))}
                className="mt-4 w-full"
              />
            </div>
            <div className="rounded-3xl bg-[#e8b84a] p-7 text-black">
              <p className="text-xs uppercase tracking-[.2em] opacity-50">
                {ru ? "Мы знаем, что вам нужно" : "We know what you need"}
              </p>
              <h3 className="mt-3 text-4xl">{recommendation.name}</h3>
              <p className="mt-2 opacity-60">{recommendation.desc}</p>
              <button
                onClick={() => add(recommendation.id)}
                type="button"
                className="mt-7 rounded-full bg-black px-5 py-3 text-white"
                style={{ color: "#fff", backgroundColor: "#000" }}
              >
                {ru ? "Добавить в заказ" : "Add to order"} · $
                {recommendation.price}
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="menu" className="mx-auto max-w-7xl px-5 py-24">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.24em] opacity-45">
              {ru ? "Интерактивное меню" : "Interactive menu"}
            </p>
            <h2 className="mt-4 text-5xl md:text-7xl">
              {ru ? "Меню без PDF" : "A menu, not a PDF"}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Starters", "Mains", "Sushi", "Desserts"].map((x) => (
              <button
                key={x}
                onClick={() => setCategory(x)}
                type="button"
                className="rounded-full border px-4 py-2"
                style={{
                  background: category === x ? "#191714" : undefined,
                  color: category === x ? "#fff" : undefined,
                }}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-black/10 bg-white p-6"
            >
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-[#e8dfd1] text-7xl">
                {item.id === "burger"
                  ? "🍔"
                  : item.id === "sushi"
                    ? "🍣"
                    : item.id === "cake"
                      ? "🍫"
                      : item.id === "salad"
                        ? "🥗"
                        : item.id === "pasta"
                          ? "🍝"
                          : "🍜"}
              </div>
              <div className="mt-5 flex gap-2">
                {item.labels.map((x) => (
                  <span
                    key={x}
                    className="rounded-full bg-[#eee7dc] px-3 py-1 text-xs"
                  >
                    {x}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 text-2xl">{item.name}</h3>
              <p className="mt-2 opacity-55">{item.desc}</p>
              {item.id === "ramen" && (
                <div className="mt-5">
                  <p className="text-sm">
                    {ru ? "Острота" : "Spice"}: {"🌶️".repeat(spice) || "0"}
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={spice}
                    onChange={(e) => setSpice(Number(e.target.value))}
                    className="mt-2 w-full"
                  />
                </div>
              )}
              <button
                onClick={() => add(item.id)}
                type="button"
                className="mt-6 w-full rounded-full bg-black px-5 py-3 text-white"
                style={{ color: "#fff", backgroundColor: "#000" }}
              >
                + {ru ? "Добавить" : "Add"} · ${item.price}
              </button>
            </article>
          ))}
        </div>
      </section>
      <section id="table" className="bg-[#dfe6d8] px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[.24em] opacity-45">
            Explore · reserve
          </p>
          <h2 className="mt-4 text-5xl md:text-7xl">
            {ru
              ? "Выберите зону и конкретный стол"
              : "Choose an area and your table"}
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
            <div className="rounded-3xl bg-white p-7">
              <label>
                {ru ? "Количество гостей" : "Guests"}
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border p-3"
                />
              </label>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {["Bar", "Main hall", "Terrace", "Private room"].map((x) => (
                  <button
                    key={x}
                    onClick={() => setZone(x)}
                    type="button"
                    className="rounded-xl border p-3"
                    style={{ background: zone === x ? "#e8b84a" : undefined }}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <div className="mt-7 rounded-2xl bg-[#f4f0e8] p-5">
                <h3 className="text-2xl">{zone}</h3>
                <p className="mt-2 opacity-55">
                  {zone === "Terrace"
                    ? "Sunset view · 18 seats · perfect for dinner"
                    : zone === "Private room"
                      ? "Private service · celebrations · up to 24 guests"
                      : "Comfortable seating · full menu service"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 rounded-3xl bg-[#173f2c] p-7 md:grid-cols-3">
              {tables.map((x) => (
                <button
                  key={x.id}
                  onClick={() => {
                    setTable(x.id);
                    setZone(x.zone);
                  }}
                  type="button"
                  className="aspect-square rounded-full border-2 text-white"
                  style={{
                    borderColor: table === x.id ? "#e8b84a" : "#ffffff44",
                    background: table === x.id ? "#e8b84a" : "transparent",
                    color: table === x.id ? "#000" : "#fff",
                  }}
                >
                  Table {x.id}
                  <small className="mt-1 block opacity-60">
                    {x.seats} seats
                    <br />
                    {x.zone}
                  </small>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[.2em] opacity-45">
              {ru ? "Сегодня здесь" : "What’s happening today"}
            </p>
            {[
              ["18:00", "Live Jazz"],
              ["19:30", "Chef’s Special"],
              ["21:00", "DJ & cocktails"],
            ].map(([time, event]) => (
              <div
                key={time}
                className="mt-4 flex justify-between border-b py-5 text-2xl"
              >
                <span>{time}</span>
                <strong>{event}</strong>
              </div>
            ))}
          </div>
          <div className="rounded-3xl bg-black p-7 text-white">
            <h3 className="text-3xl">
              {ru ? "Ваш заказ" : "Your order"} · ${total}
            </h3>
            <p className="mt-3 text-white/55">
              Table {table} · {zone} · {guests} guests
            </p>
            {sent ? (
              <div className="mt-8 rounded-2xl bg-white/10 p-6">
                <strong className="text-2xl">
                  ✓ {ru ? "Заказ отправлен" : "Order sent"}
                </strong>
                <p className="mt-2 text-white/55">
                  {ru
                    ? "Он уже отображается в демо-админке."
                    : "It is now visible in the demo admin."}
                </p>
                <Link
                  href={`/${locale}/demo-admin`}
                  className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-black"
                >
                  {ru ? "Открыть админку" : "Open admin"} →
                </Link>
              </div>
            ) : (
              <form
                onSubmit={submit}
                onFocus={() => {
                  if (!startedAt.current) startedAt.current = Date.now();
                }}
                className="mt-7 space-y-3"
              >
                <input
                  required
                  name="name"
                  placeholder={ru ? "Ваше имя" : "Your name"}
                  className="w-full rounded-xl bg-white/10 p-4"
                />
                <input
                  required
                  name="contact"
                  placeholder={ru ? "Телефон или email" : "Phone or email"}
                  className="w-full rounded-xl bg-white/10 p-4"
                />
                {error && <p className="text-red-300">{error}</p>}
                <button
                  disabled={saving}
                  type="submit"
                  className="w-full rounded-full bg-[#e8b84a] px-5 py-4 font-semibold text-black"
                  style={{ color: "#000", backgroundColor: "#e8b84a" }}
                >
                  {saving
                    ? ru
                      ? "Отправляем…"
                      : "Sending…"
                    : ru
                      ? "Заказать и забронировать стол"
                      : "Order and reserve table"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
