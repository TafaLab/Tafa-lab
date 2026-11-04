"use client";

import { useState } from "react";

type Locale = "ru" | "en";
type Category = "all" | "bouquets" | "stems";
const products = [
  { id: "classic", category: "bouquets", ru: "Классический букет", en: "Classic bouquet", descriptionRu: "Розы и сезонная зелень", descriptionEn: "Roses and seasonal greenery" },
  { id: "spring", category: "bouquets", ru: "Весенний букет", en: "Spring bouquet", descriptionRu: "Тюльпаны и нежное оформление", descriptionEn: "Tulips with soft wrapping" },
  { id: "roses", category: "stems", ru: "Розы", en: "Roses", descriptionRu: "Для индивидуальных композиций", descriptionEn: "For custom arrangements" },
  { id: "peonies", category: "stems", ru: "Пионы", en: "Peonies", descriptionRu: "Для сезонных композиций", descriptionEn: "For seasonal arrangements" },
] as const;

export default function FloristCatalogDemo({ locale }: { locale: Locale }) {
  const ru = locale === "ru";
  const [category, setCategory] = useState<Category>("all");
  const filtered = products.filter((item) => category === "all" || item.category === category);
  const categories: { id: Category; ru: string; en: string }[] = [
    { id: "all", ru: "Все", en: "All" },
    { id: "bouquets", ru: "Букеты", en: "Bouquets" },
    { id: "stems", ru: "Цветы поштучно", en: "Individual flowers" },
  ];
  return (
    <section aria-labelledby="florist-catalog-heading" className="mx-auto mt-16 max-w-6xl rounded-3xl border border-[#ddd3ca] bg-white p-6 text-[#211a17] md:p-10">
      <p className="text-xs uppercase tracking-[.2em] text-[#796c65]">{ru ? "Демо каталога" : "Catalog demo"}</p>
      <h2 id="florist-catalog-heading" className="mt-3 text-3xl font-medium">{ru ? "Каталог цветочной студии" : "Floral studio catalog"}</h2>
      <p className="mt-3 max-w-2xl text-[#675c56]">{ru ? "Пример структуры каталога. Товары вымышленные, наличие и заказы не подключены." : "Sample catalog structure. Items are illustrative; inventory and orders are not connected."}</p>
      <div role="group" aria-label={ru ? "Категории каталога" : "Catalog categories"} className="mt-6 flex flex-wrap gap-2">
        {categories.map((item) => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)} className={`rounded-full border px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 ${category === item.id ? "border-[#211a17] bg-[#211a17] text-white" : "border-[#ddd3ca]"}`}>{ru ? item.ru : item.en}</button>)}
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2" aria-live="polite">
        {filtered.map((item) => <article key={item.id} className="rounded-2xl border border-[#ddd3ca] bg-[#f6f2ed] p-6">
          <p className="text-xs uppercase tracking-widest text-[#796c65]">{item.category === "bouquets" ? (ru ? "Букет" : "Bouquet") : (ru ? "Цветы" : "Flowers")}</p>
          <h3 className="mt-3 text-xl font-medium">{ru ? item.ru : item.en}</h3>
          <p className="mt-2 text-[#675c56]">{ru ? item.descriptionRu : item.descriptionEn}</p>
        </article>)}
      </div>
    </section>
  );
}
