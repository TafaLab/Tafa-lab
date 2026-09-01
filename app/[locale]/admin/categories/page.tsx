import { notFound } from "next/navigation";

type AdminCategoriesPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type Locale = "ru" | "en";

const pageText = {
  ru: {
    eyebrow: "Каталог",
    title: "Категории",
    description:
      "Категории для каталога: детские, свадебные, бенто и другие.",
    emptyTitle: "Категории каталога",
    emptyDescription: "Готовая структура витрины STK Bakery.",
  },
  en: {
    eyebrow: "Catalogue",
    title: "Categories",
    description:
      "Catalogue categories: children’s cakes, wedding cakes, bento cakes and others.",
    emptyTitle: "Catalogue categories",
    emptyDescription: "The active STK Bakery storefront structure.",
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
  }
>;

export default async function AdminCategoriesPage({
  params,
}: AdminCategoriesPageProps) {
  const { locale: localeParam } = await params;

  if (localeParam !== "ru" && localeParam !== "en") {
    notFound();
  }

  const locale = localeParam as Locale;
  const text = pageText[locale];
  const categories = locale === "ru"
    ? [["Детские", "18 тортов"], ["Свадебные", "12 тортов"], ["Бенто", "14 тортов"], ["Праздничные", "16 тортов"], ["Мужские", "7 тортов"], ["Для неё", "9 тортов"]]
    : [["Children’s", "18 cakes"], ["Wedding", "12 cakes"], ["Bento", "14 cakes"], ["Celebration", "16 cakes"], ["For him", "7 cakes"], ["For her", "9 cakes"]];

  return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">{text.eyebrow}</span>

          <h1>{text.title}</h1>

          <p>{text.description}</p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-9">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><h2 className="text-3xl font-semibold">{text.emptyTitle}</h2><p className="mt-2 text-black/50">{text.emptyDescription}</p></div>
          <span className="rounded-full bg-[#ffe8f0] px-4 py-2 text-sm font-semibold text-[#d83a72]">{categories.length} {locale === "ru" ? "категорий" : "categories"}</span>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(([name, count], index) => (
            <article key={name} className="rounded-2xl border border-black/10 bg-[#fffaf7] p-5">
              <span className="text-xs font-bold text-[#ec4d84]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-2xl font-semibold">{name}</h3>
              <p className="mt-2 text-sm text-black/50">{count}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
