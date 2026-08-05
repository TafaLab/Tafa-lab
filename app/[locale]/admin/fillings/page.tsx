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
    emptyTitle: "Раздел начинок подготовлен",
    emptyDescription:
      "Полное управление начинками добавим после запуска основного каталога.",
  },
  en: {
    eyebrow: "Catalogue",
    title: "Fillings",
    description:
      "This section will contain filling names, descriptions, images and additional prices.",
    emptyTitle: "Fillings section is ready",
    emptyDescription:
      "Full filling management will be added after the main catalogue is launched.",
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
          ◎
        </span>

        <h2>{text.emptyTitle}</h2>

        <p>{text.emptyDescription}</p>
      </section>
    </div>
  );
}