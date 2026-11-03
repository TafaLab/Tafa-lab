"use client";

import { useState } from "react";

type Locale = "ru" | "en";
const stems = [
  { id: "roses", ru: "Розы", en: "Roses" },
  { id: "tulips", ru: "Тюльпаны", en: "Tulips" },
  { id: "peonies", ru: "Пионы", en: "Peonies" },
] as const;
type Flower = (typeof stems)[number]["id"];
type Composition = Record<Flower, number>;

export default function BouquetBuilderDemo({ locale }: { locale: Locale }) {
  const ru = locale === "ru";
  const [flowers, setFlowers] = useState<Composition>({ roses: 5, tulips: 2, peonies: 0 });
  const [wrap, setWrap] = useState<"paper" | "ribbon">("paper");
  const total = stems.reduce((sum, item) => sum + flowers[item.id], 0);
  const change = (flower: Flower, delta: number) => {
    setFlowers((current) => {
      const next = current[flower] + delta;
      const sum = stems.reduce((value, item) => value + current[item.id], 0);
      if (next < 0 || (delta > 0 && sum >= 25)) return current;
      return { ...current, [flower]: next };
    });
  };

  return (
    <section aria-labelledby="bouquet-demo-heading" className="mx-auto mt-16 max-w-6xl rounded-3xl border border-[#ddd3ca] bg-white p-6 text-[#211a17] md:p-10">
      <p className="text-xs uppercase tracking-[.2em] text-[#796c65]">{ru ? "Интерактивный прототип" : "Interactive prototype"}</p>
      <h2 id="bouquet-demo-heading" className="mt-3 text-3xl font-medium">{ru ? "Соберите свой букет" : "Build your bouquet"}</h2>
      <p className="mt-3 max-w-2xl text-[#675c56]">{ru ? "Это демонстрация конструктора. Цены, наличие, доставка и реальные заказы не подключены." : "This is a builder demo. Pricing, inventory, delivery and real orders are not connected."}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <fieldset>
            <legend className="mb-3 font-medium">{ru ? "Состав букета" : "Bouquet composition"}</legend>
            <p className="mb-4 text-sm text-[#675c56]">{ru ? "Смешивайте цветы — до 25 стеблей." : "Mix flowers — up to 25 stems."}</p>
            <div className="space-y-3">
              {stems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#ddd3ca] p-3">
                  <span>{ru ? item.ru : item.en}</span>
                  <div className="flex items-center gap-3">
                    <button type="button" disabled={flowers[item.id] === 0} onClick={() => change(item.id, -1)} aria-label={ru ? `Убрать один стебель: ${item.ru}` : `Remove one stem: ${item.en}`} className="h-10 w-10 rounded-full border border-[#ddd3ca] disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2">−</button>
                    <output aria-label={ru ? `Количество: ${item.ru}` : `Quantity: ${item.en}`} className="min-w-6 text-center tabular-nums">{flowers[item.id]}</output>
                    <button type="button" disabled={total >= 25} onClick={() => change(item.id, 1)} aria-label={ru ? `Добавить один стебель: ${item.ru}` : `Add one stem: ${item.en}`} className="h-10 w-10 rounded-full border border-[#ddd3ca] disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2">+</button>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-3 font-medium">{ru ? "Оформление" : "Wrapping"}</legend>
            <div className="flex flex-wrap gap-2">{(["paper", "ribbon"] as const).map((item) => <button type="button" key={item} aria-pressed={wrap === item} onClick={() => setWrap(item)} className={`rounded-full border px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 ${wrap === item ? "border-[#211a17] bg-[#211a17] text-white" : "border-[#ddd3ca]"}`}>{item === "paper" ? (ru ? "Бумага" : "Paper") : (ru ? "Лента" : "Ribbon")}</button>)}</div>
          </fieldset>
        </div>
        <div className="rounded-2xl bg-[#f6f2ed] p-6">
          <h3 className="text-xl font-medium">{ru ? "Ваш букет" : "Your bouquet"}</h3>
          <div role="status" aria-live="polite" aria-atomic="true">
            <p className="mt-5 font-medium">{ru ? "Всего стеблей" : "Total stems"}: {total}</p>
            {total === 0 ? <p className="mt-3">{ru ? "Добавьте цветы, чтобы собрать букет." : "Add flowers to build your bouquet."}</p> : (
              <ul className="mt-3 space-y-2">{stems.filter((item) => flowers[item.id] > 0).map((item) => <li key={item.id}>{flowers[item.id]} × {ru ? item.ru : item.en}</li>)}</ul>
            )}
            <p className="mt-5">{ru ? "Оформление" : "Wrapping"}: {wrap === "paper" ? (ru ? "Бумага" : "Paper") : (ru ? "Лента" : "Ribbon")}</p>
          </div>
          <p className="mt-6 text-sm text-[#675c56]">{ru ? "Предпросмотр состава — без оформления заказа и отправки данных." : "Composition preview only — no checkout or data submission."}</p>
        </div>
      </div>
    </section>
  );
}
