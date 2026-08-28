import { notFound } from "next/navigation";

type AdminFillingsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type Locale = "ru" | "en";

const pageText = {
  ru: {
    eyebrow: "Каталог",
    title: "Начинки",
    description:
      "Здесь будут названия, описания, изображения и дополнительная стоимость начинок.",
    emptyTitle: "Активные начинки",
    emptyDescription: "Начинки, доступные клиенту в конструкторе торта.",
  },
  en: {
    eyebrow: "Catalogue",
    title: "Fillings",
    description:
      "This section will contain filling names, descriptions, images and additional prices.",
    emptyTitle: "Active fillings",
    emptyDescription: "Fillings currently available in the cake builder.",
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

export default async function AdminFillingsPage({
  params,
}: AdminFillingsPageProps) {
  const { locale: localeParam } = await params;

  if (localeParam !== "ru" && localeParam !== "en") {
    notFound();
  }

  const locale = localeParam as Locale;
  const text = pageText[locale];
  const fillings = locale === "ru"
    ? [["Сникерс", "Шоколад, арахис и карамель", "$0"], ["Вупи пай", "Шоколадные коржи и сливочный крем", "$0"], ["Медовик", "Медовые коржи и сметанный крем", "$0"], ["Шоколад-банан", "Шоколад, банан и нежный крем", "$0"], ["Фисташковая", "Фисташковые коржи и крем", "+$1"], ["Красный бархат", "Бархатные коржи и крем-чиз", "+$1"]]
    : [["Snickers", "Chocolate, peanuts and caramel", "$0"], ["Whoopie pie", "Chocolate sponge and cream", "$0"], ["Honey cake", "Honey layers and sour cream", "$0"], ["Chocolate banana", "Chocolate, banana and cream", "$0"], ["Pistachio", "Pistachio sponge and cream", "+$1"], ["Red velvet", "Velvet sponge and cream cheese", "+$1"]];

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
        <h2 className="text-3xl font-semibold">{text.emptyTitle}</h2>
        <p className="mt-2 text-black/50">{text.emptyDescription}</p>
        <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
          {fillings.map(([name, description, price], index) => (
            <article key={name} className="grid gap-3 py-5 sm:grid-cols-[56px_1fr_auto] sm:items-center">
              <span className="text-sm text-[#ec4d84]">{String(index + 1).padStart(2, "0")}</span>
              <div><h3 className="text-xl font-semibold">{name}</h3><p className="mt-1 text-sm text-black/50">{description}</p></div>
              <strong className="rounded-full bg-[#f7ede7] px-4 py-2 text-sm">{price}</strong>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
