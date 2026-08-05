import { notFound } from "next/navigation";

type AdminSettingsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type Locale = "ru" | "en";

const pageText = {
  ru: {
    eyebrow: "Система",
    title: "Настройки",
    description:
      "Основные данные магазина, контакты, валюта и параметры оформления.",
    emptyTitle: "Настройки пока не требуются",
    emptyDescription:
      "Для быстрого запуска основные параметры останутся в коде. Интерфейс настроек добавим после MVP.",
  },
  en: {
    eyebrow: "System",
    title: "Settings",
    description:
      "Main store details, contacts, currency and appearance settings.",
    emptyTitle: "Settings are not required yet",
    emptyDescription:
      "For a faster launch, the main settings will remain in the code. The settings interface will be added after the MVP.",
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

export default async function AdminSettingsPage({
  params,
}: AdminSettingsPageProps) {
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
          ⚙
        </span>

        <h2>{text.emptyTitle}</h2>

        <p>{text.emptyDescription}</p>
      </section>
    </div>
  );
}