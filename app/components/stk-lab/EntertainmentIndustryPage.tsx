import Image from "next/image";
import Link from "next/link";
import StkLeadForm from "./StkLeadForm";
import TafaLabLogo from "./TafaLabLogo";
import StkSiteShell from "./design/StkSiteShell";
import EventIdeasSection from "./EventIdeasSection";
import AiSolutionsSection from "./AiSolutionsSection";
import IndustryAiShowcase from "./IndustryAiShowcase";

type Locale = "ru" | "en";
const copy = {
  en: {
    eyebrow: "Websites for entertainment & celebrations",
    title:
      "Make it easy to choose an event and send an enquiry.",
    text: "Websites and booking journeys for event studios, performers, children's entertainment and family venues.",
    projects: "Three examples of event and entertainment websites.",
    services: [
      ["Event & wedding website", ""],
      ["Programs & packages", ""],
      ["Booking journey", ""],
      ["Custom event platform", ""],
    ],
    cards: [
      [
        "VELVET STAGE",
        "Wedding and show production",
        "/images/stk-lab/entertainment/velvet-stage-hero-v1.webp",
        "velvet-stage-events-demo",
      ],
      [
        "SPARK!",
        "Children's animators and party programs",
        "/images/stk-lab/entertainment/spark-animators-hero-v1.webp",
        "spark-animators-demo",
      ],
      [
        "WONDERNEST",
        "Indoor play centre and birthdays",
        "/images/stk-lab/entertainment/wondernest-kids-hero-v1.webp",
        "wondernest-kids-demo",
      ],
    ],
    cta: "Tell us about your project.",
  },
  ru: {
    eyebrow: "Сайты для развлечений и праздников",
    title:
      "Сайт, на котором удобно выбрать праздник и оставить заявку.",
    text: "Показываем программы, условия и свободные даты. Помогаем гостям разобраться в предложении, а организаторам — получать заявки с нужными деталями.",
    projects: "Три примера сайтов для мероприятий и развлечений.",
    services: [
      ["Сайт событий и свадеб", ""],
      ["Программы и пакеты", ""],
      ["Сценарий бронирования", ""],
      ["Event-платформа", ""],
    ],
    cards: [
      [
        "VELVET STAGE",
        "Проведение свадеб, шоу и частных событий",
        "/images/stk-lab/entertainment/velvet-stage-hero-v1.webp",
        "velvet-stage-events-demo",
      ],
      [
        "SPARK!",
        "Аниматоры и детские праздничные программы",
        "/images/stk-lab/entertainment/spark-animators-hero-v1.webp",
        "spark-animators-demo",
      ],
      [
        "WONDERNEST",
        "Игровой центр и детские дни рождения",
        "/images/stk-lab/entertainment/wondernest-kids-hero-v1.webp",
        "wondernest-kids-demo",
      ],
    ],
    cta: "Расскажите о вашем проекте.",
  },
} as const;
export default function EntertainmentIndustryPage({
  locale,
}: {
  locale: Locale;
}) {
  const t = copy[locale],
    other = locale === "ru" ? "en" : "ru";
  return (
    <StkSiteShell>
      <header className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href={`/${locale}`} aria-label="Tafa Lab — home">
            <TafaLabLogo priority />
          </Link>
          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#projects">{locale === "ru" ? "Проекты" : "Projects"}</a>
            <a href="#services">{locale === "ru" ? "Решения" : "Solutions"}</a>
            <a href="#contact">{locale === "ru" ? "Контакты" : "Contact"}</a>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <a href="#contact" className="rounded-full border border-[color:var(--stk-border)] px-3 py-2 text-xs font-medium transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current md:hidden">{locale === "ru" ? "Связаться" : "Contact"}</a>
            <Link
              aria-label={locale === "ru" ? "Switch to English" : "Переключить на русский"}
              href={`/${other}/industries/entertainment`}
              className="rounded-full border px-3 py-2 text-xs uppercase"
              >
              {other.toUpperCase()}
            </Link>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#9a5b76]">
          {t.eyebrow}
        </p>
        <h1 className="mt-7 max-w-6xl text-balance text-5xl leading-[1.02] tracking-[-.055em] sm:text-6xl md:text-8xl md:leading-[.98]">
          {t.title}
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-8 text-black/55">
          {t.text}
        </p>
        <a
          href="#projects"
          className="mt-9 inline-flex rounded-full bg-black px-6 py-3.5 text-sm"
          style={{ color: "#ffffff" }}
        >
          {locale === "ru" ? "Смотреть проекты" : "Explore projects"} ↓
        </a>
      </section>
      <section
        id="projects"
        className="bg-[#171115] px-5 py-24 text-white md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-4xl text-5xl tracking-[-.05em] md:text-7xl">
            {t.projects}
          </h2>
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {t.cards.map(([name, type, img, route], i) => (
              <Link
                href={`/${locale}/${route}`}
                key={name}
                className={`${i === 0 ? "md:translate-y-12" : ""} group`}
              >
                <div
                  className={`relative overflow-hidden ${i === 0 ? "rounded-t-[7rem]" : i === 1 ? "rounded-[4rem_1rem]" : "rounded-[2rem]"} aspect-[4/5]`}
                >
                  <Image
                    src={img}
                    alt={name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 95vw,33vw"
                  />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[.2em] text-white/45">
                  0{i + 1}
                </p>
                <h3 className="mt-2 text-3xl">{name}</h3>
                <p className="mt-2 text-white/55">{type}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section
        id="services"
        className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"
      >
        <h2 className="text-5xl md:text-7xl">
          {locale === "ru"
            ? "От первого впечатления до последней заявки."
            : "From first impression to final booking."}
        </h2>
        <div className="mt-14 grid border-l border-t md:grid-cols-4">
          {t.services.map(([name, _price], i) => (
            <div key={name} className="min-h-64 border-b border-r p-7">
              <span className="text-xs opacity-35">0{i + 1}</span>
              <h3 className="mt-20 text-2xl">{name}</h3>
              
            </div>
          ))}
        </div>
</section>
      <EventIdeasSection locale={locale} />
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[.25em] text-[#9a5b76]">
                {locale === "ru" ? "Другие направления" : "Other industries"}
              </p>
              <h2 className="mt-4 text-4xl md:text-6xl">
                {locale === "ru"
                  ? "Посмотрите, что ещё создаёт Tafa Lab"
                  : "Explore more Tafa Lab work"}
              </h2>
            </div>
            <Link href={`/${locale}`} className="hidden text-sm md:block">
              {locale === "ru" ? "Главная" : "Home"} →
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                locale === "ru" ? "Пекарни и кондитерские" : "Bakeries",
                "bakeries",
              ],
              [locale === "ru" ? "Рестораны" : "Restaurants", "restaurants"],
              [
                locale === "ru" ? "Beauty и барбершопы" : "Beauty & barbers",
                "beauty",
              ],
              ["Travel", "travel"],
              [
                locale === "ru" ? "Бизнес-платформы" : "Business platforms",
                "business-platforms",
              ],
            ].map(([name, route]) => (
              <Link
                key={route}
                href={`/${locale}/industries/${route}`}
                className="flex items-center justify-between rounded-2xl border px-5 py-5"
              >
                <span>{name}</span>
                <span>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <AiSolutionsSection locale={locale} sector="entertainment" />
      <IndustryAiShowcase locale={locale} sector="entertainment" />
      <section id="contact" className="px-5 pb-10 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-[#171115] px-6 py-16 text-white md:px-12 md:py-24">
          <h2 className="max-w-4xl text-5xl md:text-7xl">{t.cta}</h2>
          <div className="mt-10 max-w-4xl">
            <StkLeadForm locale={locale} />
          </div>
        </div>
      </section>
    </StkSiteShell>
  );
}
