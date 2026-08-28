import type { Metadata } from "next";
import Link from "next/link";
import TafaLabLogo from "@/app/components/stk-lab/TafaLabLogo";

type Locale = "ru" | "en";

export const metadata: Metadata = {
  title: "Price — Website & Platform Pricing",
  description: "Tafa Lab starting prices for websites, commerce, booking, industry modules and custom platforms.",
};

const base = [
  ["01", "Landing page", "1 page", "$300", "Strategy, custom design, responsive development, enquiry form and basic SEO."],
  ["02", "Signature website", "up to 5 pages", "$800", "Site structure, custom visual system, responsive pages, forms, SEO and analytics foundations."],
  ["03", "Commerce or booking", "up to 12 pages", "$2,000", "Website plus catalogue, cart or booking flow, CMS/admin panel and integrations."],
  ["04", "Custom platform", "individual scope", "$4,000", "Custom application, dashboards, roles, permissions, configurators, automation and APIs."],
] as const;

const industries = [
  ["Bakeries & cake studios", "bakeries", [["Product catalogue", "$500"], ["Custom-order form", "$300"], ["Cake builder", "$2,000"], ["3D product or cake experience", "Custom"]]],
  ["Restaurants & cafés", "restaurants", [["Digital menu", "$450"], ["Table reservation module", "$350"], ["QR Smart Table ordering", "$650"], ["Restaurant operations platform", "from $4,000"]]],
  ["Beauty & wellness", "beauty", [["Services catalogue", "$300"], ["Online appointment module", "$350"], ["Beauty quiz or specialist finder", "$450"], ["Virtual try-on / advanced AI", "Custom"]]],
  ["Travel & hospitality", "travel", [["Digital itinerary", "$450"], ["Trip builder", "$650"], ["Booking or enquiry journey", "$350"], ["Travel operations platform", "from $4,000"]]],
  ["Events & entertainment", "entertainment", [["Programs and packages", "$300"], ["Booking journey", "$350"], ["Interactive event builder", "$650"], ["Event management platform", "from $4,000"]]],
  ["Business platforms", "business-platforms", [["Operations core", "from $4,000"], ["Multi-branch system", "Custom"], ["CRM / HR / inventory modules", "Custom"], ["Full internal platform", "Custom"]]],
] as const;

export default async function PricePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const ru = locale === "ru";
  const other = ru ? "en" : "ru";

  return (
    <main className="min-h-screen bg-[#f4f0ea] text-[#211d19]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f4f0ea]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href={`/${locale}`} aria-label="Tafa Lab"><TafaLabLogo priority /></Link>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="#base">{ru ? "Базовые цены" : "Core pricing"}</a>
            <a href="#industries">{ru ? "По направлениям" : "Industries"}</a>
            <a href="#rules">{ru ? "Что входит" : "How it works"}</a>
          </nav>
          <Link href={`/${other}/price`} className="rounded-full border border-black/15 px-4 py-2 text-xs uppercase">{other}</Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-20 md:grid-cols-[1.15fr_.85fr] md:px-8 md:pb-32 md:pt-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#806d59]">Tafa Lab · Price</p>
          <h1 className="mt-6 max-w-5xl text-6xl font-medium leading-[.94] tracking-[-.06em] md:text-8xl">
            {ru ? "Понятная основа. Точный объём — до начала работы." : "A clear starting point. Exact scope before work begins."}
          </h1>
        </div>
        <div className="self-end rounded-[2rem] bg-[#211d19] p-8 text-white md:p-10">
          <p className="text-lg leading-8 text-white/65">
            {ru ? "Все суммы указаны в долларах США. Базовый пакет определяет тип проекта, а отраслевые модули добавляются только при необходимости." : "All prices are in US dollars. The core package defines the project type; industry modules are added only when needed."}
          </p>
          <a href="#base" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#211d19]">{ru ? "Посмотреть прайс" : "View pricing"} ↓</a>
        </div>
      </section>

      <section id="base" className="border-y border-black/10 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-xs uppercase tracking-[.24em] text-black/45">{ru ? "Единая основа для всех отраслей" : "One foundation for every industry"}</p>
          <h2 className="mt-5 max-w-4xl text-5xl tracking-[-.05em] md:text-7xl">{ru ? "Сначала выбираем масштаб проекта." : "Start with the project scale."}</h2>
          <div className="mt-14 divide-y divide-black/10 border-y border-black/10">
            {base.map(([number, name, scope, price, text], index) => (
              <article key={name} className="grid gap-5 py-8 md:grid-cols-[70px_1fr_180px_180px] md:items-center">
                <span className="text-sm text-black/35">{number}</span>
                <div><h3 className="text-3xl">{ru ? ["Лендинг", "Фирменный сайт", "Магазин или бронирование", "Индивидуальная платформа"][index] : name}</h3><p className="mt-3 max-w-2xl leading-7 text-black/55">{text}</p></div>
                <span className="text-sm uppercase tracking-[.16em] text-black/45">{ru ? ["1 страница", "до 5 страниц", "до 12 страниц", "индивидуальный объём"][index] : scope}</span>
                <strong className="text-4xl tracking-[-.04em]">{ru ? "от " : "from "}{price}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <p className="text-xs uppercase tracking-[.24em] text-black/45">{ru ? "Дополнительные модули" : "Optional modules"}</p>
        <h2 className="mt-5 max-w-4xl text-5xl tracking-[-.05em] md:text-7xl">{ru ? "Функции для конкретного бизнеса." : "Capabilities shaped for each business."}</h2>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-black/55">{ru ? "Цены ниже — это стоимость отдельного модуля, добавляемого к подходящему базовому пакету. Они не заменяют стоимость самого сайта." : "Prices below are for individual modules added to an appropriate core package. They do not replace the website price."}</p>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {industries.map(([title, route, items], block) => (
            <article key={route} className={`rounded-[2rem] border border-black/10 p-7 md:p-9 ${block === 5 ? "bg-[#211d19] text-white" : "bg-white"}`}>
              <div className="flex items-start justify-between gap-4"><h3 className="text-3xl">{title}</h3><Link href={`/${locale}/industries/${route}`} className="rounded-full border border-current/20 px-3 py-2 text-xs">{ru ? "Раздел" : "Explore"} →</Link></div>
              <div className="mt-8 divide-y divide-current/10 border-y border-current/10">
                {items.map(([name, price]) => <div key={name} className="flex items-center justify-between gap-5 py-4"><span className="opacity-65">{name}</span><strong className="whitespace-nowrap">{price}</strong></div>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="rules" className="bg-[#d9c7b6] py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:px-8">
          <h2 className="text-5xl tracking-[-.05em] md:text-7xl">{ru ? "Без скрытых сюрпризов." : "No hidden surprises."}</h2>
          <div className="space-y-6 text-lg leading-8 text-black/65">
            <p>{ru ? "До начала проекта фиксируются страницы, функции, интеграции, сроки и итоговая стоимость." : "Pages, features, integrations, timing and final cost are confirmed before the project begins."}</p>
            <p>{ru ? "Контент, сложные сторонние сервисы, платные лицензии и нестандартные AI-функции рассчитываются отдельно только после согласования." : "Content production, complex third-party services, paid licenses and advanced AI capabilities are estimated separately after approval."}</p>
            <p>{ru ? "Оплату можно разделить на этапы в соответствии с этапами разработки." : "Payment can be divided into milestones that follow the development stages."}</p>
            <a href="https://wa.me/77077552211" target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-[#211d19] px-6 py-4 text-sm font-semibold text-white">{ru ? "Рассчитать проект" : "Estimate a project"} →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
