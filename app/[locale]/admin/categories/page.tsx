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
    emptyTitle: "Раздел категорий подготовлен",
    emptyDescription:
      "Пока категории хранятся у торта. Отдельное управление подключим после основной версии каталога.",
  },
  en: {
    eyebrow: "Catalogue",
    title: "Categories",
    description:
      "Catalogue categories: children’s cakes, wedding cakes, bento cakes and others.",
    emptyTitle: "Categories section is ready",
    emptyDescription:
      "For now, categories are stored with each cake. Separate category management will be added after the main catalogue version is complete.",
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

  return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">{text.eyebrow}</span>

          <h1>{text.title}</h1>

          <p>{text.description}</p>
        </div>
      </section>

      <section className="admin-empty-state">
        <span className="admin-empty-icon" aria-hidden="true">
          ▦
        </span>

        <h2>{text.emptyTitle}</h2>

        <p>{text.emptyDescription}</p>
      </section>
    </div>
  );
}