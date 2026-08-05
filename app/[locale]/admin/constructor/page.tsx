import { notFound } from "next/navigation";

type AdminConstructorPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type Locale = "ru" | "en";

const constructorGroups = {
  ru: [
    "Основы",
    "Подтёки",
    "Ягоды",
    "Цветы",
    "Макаруны",
    "Жемчуг",
    "Шоколадный декор",
    "Бабочки",
    "Свечи",
    "Топперы",
  ],
  en: [
    "Cake bases",
    "Drips",
    "Berries",
    "Flowers",
    "Macarons",
    "Pearls",
    "Chocolate decorations",
    "Butterflies",
    "Candles",
    "Toppers",
  ],
} satisfies Record<Locale, string[]>;

const pageText = {
  ru: {
    eyebrow: "Конструктор",
    title: "Элементы конструктора",
    description:
      "Управление PNG-слоями, ценами, порядком отображения и доступностью.",
    addElement: "Добавить элемент",
    groupDescription:
      "Управление изображениями и настройками категории.",
  },
  en: {
    eyebrow: "Cake builder",
    title: "Builder elements",
    description:
      "Manage PNG layers, prices, display order and availability.",
    addElement: "Add element",
    groupDescription:
      "Manage images and category settings.",
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    addElement: string;
    groupDescription: string;
  }
>;

export default async function AdminConstructorPage({
  params,
}: AdminConstructorPageProps) {
  const { locale: localeParam } = await params;

  if (localeParam !== "ru" && localeParam !== "en") {
    notFound();
  }

  const locale = localeParam as Locale;
  const text = pageText[locale];
  const groups = constructorGroups[locale];

  return (
    <div className="admin-page">
      <section className="admin-page-heading">
        <div>
          <span className="admin-eyebrow">
            {text.eyebrow}
          </span>

          <h1>{text.title}</h1>

          <p>{text.description}</p>
        </div>

        <button
          type="button"
          className="admin-main-action"
          disabled
        >
          <span>+</span>
          {text.addElement}
        </button>
      </section>

      <section className="admin-group-grid">
        {groups.map((group, index) => (
          <article
            className="admin-group-card"
            key={group}
          >
            <span className="admin-group-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h2>{group}</h2>

              <p>{text.groupDescription}</p>
            </div>

            <span
              className="admin-group-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </article>
        ))}
      </section>
    </div>
  );
}