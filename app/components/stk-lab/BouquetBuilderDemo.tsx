"use client";

import { useState } from "react";

type Locale = "ru" | "en";
const stems = [
  { id: "roses", ru: "Розы", en: "Roses" },
  { id: "tulips", ru: "Тюльпаны", en: "Tulips" },
  { id: "peonies", ru: "Пионы", en: "Peonies" },
] as const;

export default function BouquetBuilderDemo({ locale }: { locale: Locale }) {
  const ru = locale === "ru";
  const [flower, setFlower] = useState<(typeof stems)[number]["id"]>("roses");
  const [count, setCount] = useState(7);
  const [wrap, setWrap] = useState<"paper" | "ribbon">("paper");
  const chosen = stems.find((item) => item.id === flower)!;
  return (
    <section aria-labelledby="bouquet-demo-heading" className="mx-auto mt-16 max-w-6xl rounded-3xl border border-[#ddd3ca] bg-white p-6 text-[#211a17] md:p-10">
      <p className="text-xs uppercase tracking-[.2em] text-[#796c65]">{ru ? "Интерактивный прототип" : "Interactive prototype"}</p>
      <h2 id="bouquet-demo-heading" className="mt-3 text-3xl font-medium">{ru ? "Соберите свой букет" : "Build your bouquet"}</h2>
      <p className="mt-3 max-w-2xl text-[#675c56]">{ru ? "Это демонстрация конструктора. Цены, наличие, доставка и реальные заказы не подключены." : "This is a builder demo. Pricing, inventory, delivery and real orders are not connected."}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <fieldset>
            <legend className="mb-3 font-medium">{ru ? "Цветы" : "Flowers"}</legend>
            <div className="flex flex-wrap gap-2">{stems.map((item) => <button type="button" key={item.id} aria-pressed={flower === item.id} onClick={() => setFlower(item.id)} className={`rounded-full border px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 ${flower === item.id ? "border-[#211a17] bg-[#211a17] text-white" : "border-[#ddd3ca]"}`}>{ru ? item.ru : item.en}</button>)}</div>
          </fieldset>
          <div>
            <label htmlFor="bouquet-count" className="mb-3 block font-medium">{ru ? "Количество стеблей" : "Number of stems"}: {count}</label>
            <input id="bouquet-count" type="range" min="3" max="25" step="2" value={count} onChange={(event) => setCount(Number(event.target.value))} className="w-full accent-[#211a17]" />
          </div>
          <fieldset>
            <legend className="mb-3 font-medium">{ru ? "Оформление" : "Wrapping"}</legend>
            <div className="flex flex-wrap gap-2">{(["paper", "ribbon"] as const).map((item) => <button type="button" key={item} aria-pressed={wrap === item} onClick={() => setWrap(item)} className={`rounded-full border px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 ${wrap === item ? "border-[#211a17] bg-[#211a17] text-white" : "border-[#ddd3ca]"}`}>{item === "paper" ? (ru ? "Бумага" : "Paper") : (ru ? "Лента" : "Ribbon")}</button>)}</div>
          </fieldset>
        </div>
        <div role="status" aria-live="polite" aria-atomic="true" className="rounded-2xl bg-[#f6f2ed] p-6">
          <h3 className="text-xl font-medium">{ru ? "Ваш букет" : "Your bouquet"}</h3>
          <p className="mt-5 text-lg">{count} × {ru ? chosen.ru : chosen.en}</p>
          <p className="mt-2">{ru ? "Оформление" : "Wrapping"}: {wrap === "paper" ? (ru ? "Бумага" : "Paper") : (ru ? "Лента" : "Ribbon")}</p>
          <p className="mt-6 text-sm text-[#675c56]">{ru ? "Предпросмотр состава — без оформления заказа и отправки данных." : "Composition preview only — no checkout or data submission."}</p>
        </div>
      </div>
    </section>
  );
}
