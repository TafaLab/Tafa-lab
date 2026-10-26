import Link from "next/link";
import type { StkLabLocale } from "./content";

export default function PriorityIndustriesSection({ locale }: { locale: StkLabLocale }) {
  const ru = locale === "ru";
  const items = [
    {
      label: ru ? "Образовательные платформы" : "Learning Platforms",
      description: ru
        ? "Платформы онлайн-курсов, личные кабинеты учеников, тесты, сертификаты и AI-репетиторы."
        : "Online courses, student portals, assessments, certificates and AI learning assistants.",
      href: `/${locale}/industries/learning-platforms`,
    },
    {
      label: ru ? "Конференции и деловые мероприятия" : "Conferences & Professional Events",
      description: ru
        ? "Сайты конференций, регистрация, билеты, программы, спикеры и AI-консьерж."
        : "Conference websites, registration, ticketing, agendas, speakers and AI event concierge.",
      href: `/${locale}/industries/conferences`,
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28" aria-labelledby="new-industries-title">
      <p className="text-xs font-semibold uppercase tracking-[.25em] text-[color:var(--stk-muted-strong)]">
        {ru ? "Новые направления" : "New industries"}
      </p>
      <h2 id="new-industries-title" className="mt-4 text-balance text-4xl font-medium tracking-[-.04em] md:text-6xl">
        {ru ? "Цифровые решения для обучения и событий" : "Digital platforms for learning and events"}
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.href} className="rounded-[var(--stk-radius-panel)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] p-8">
            <h3 className="text-2xl font-medium">{item.label}</h3>
            <p className="mt-4 leading-7 text-[color:var(--stk-muted)]">{item.description}</p>
            <Link className="mt-7 inline-flex rounded-full bg-[var(--stk-dark)] px-6 py-3 text-sm text-white" style={{ color: "#ffffff" }} href={item.href}>
              {ru ? "Подробнее" : "Explore solutions"}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
