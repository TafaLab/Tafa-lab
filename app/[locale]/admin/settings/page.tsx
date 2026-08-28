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
    emptyTitle: "Текущая конфигурация",
    emptyDescription: "Основные параметры демонстрационного магазина.",
  },
  en: {
    eyebrow: "System",
    title: "Settings",
    description:
      "Main store details, contacts, currency and appearance settings.",
    emptyTitle: "Current configuration",
    emptyDescription: "Core settings for the demonstration storefront.",
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
  const settings = locale === "ru"
    ? [["Название", "STK Bakery"], ["Валюта", "USD ($)"], ["Языки", "Русский · English"], ["Телефон", "+7 747 181 84 93"], ["Время работы", "08:00–22:00"], ["Получение", "Самовывоз · Доставка"]]
    : [["Store name", "STK Bakery"], ["Currency", "USD ($)"], ["Languages", "Русский · English"], ["Phone", "+7 747 181 84 93"], ["Opening hours", "08:00–22:00"], ["Fulfilment", "Pickup · Delivery"]];

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
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {settings.map(([label, value]) => (
            <article key={label} className="rounded-2xl border border-black/10 bg-[#fffaf7] p-5">
              <span className="text-xs font-semibold uppercase tracking-[.14em] text-black/35">{label}</span>
              <strong className="mt-3 block text-xl">{value}</strong>
            </article>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-[#4b2d26] p-5 text-white">
          <strong>{locale === "ru" ? "Демо-режим включён" : "Demo mode is active"}</strong>
          <p className="mt-2 text-sm leading-6 text-white/65">{locale === "ru" ? "Заказы из конструктора и меню поступают в общую очередь администратора." : "Orders from the cake builder and menu are delivered to the shared admin queue."}</p>
        </div>
      </section>
    </div>
  );
}
