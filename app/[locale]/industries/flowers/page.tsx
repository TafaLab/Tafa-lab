import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BouquetBuilderDemo from "@/app/components/stk-lab/BouquetBuilderDemo";
import FloristCatalogDemo from "@/app/components/stk-lab/FloristCatalogDemo";

const content = {
  ru: { title: "Сайты и платформы для цветочных магазинов", intro: "Проектируем онлайн-каталоги, конструкторы букетов и удобные сценарии оформления заказов для флористических студий.", items: ["Каталог цветов и готовых букетов", "Конструктор индивидуального букета", "Корзина и оформление заказа", "Варианты доставки и самовывоза", "Управление заказами и клиентами", "AI-помощник по выбору цветов"] },
  en: { title: "Digital platforms for florists", intro: "We design flower catalogs, bouquet builders and thoughtful ordering experiences for floral studios.", items: ["Flower and bouquet catalog", "Custom bouquet builder", "Cart and checkout flows", "Delivery and pickup options", "Order and customer management", "AI flower selection assistant"] },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "ru" && locale !== "en") return {};
  const t = content[locale];
  return { title: `${t.title} | Tafa Lab`, description: t.intro, alternates: { canonical: `/${locale}/industries/flowers`, languages: { ru: "/ru/industries/flowers", en: "/en/industries/flowers", "x-default": "/en/industries/flowers" } } };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "ru" && locale !== "en") notFound();
  const t = content[locale];
  return <main className="min-h-screen bg-[#f6f2ed] px-5 py-14 text-[#211a17] md:px-8">
    <div className="mx-auto max-w-6xl">
      <Link href={`/${locale}`} className="text-sm underline underline-offset-4">← Tafa Lab</Link>
      <p className="mt-20 text-xs uppercase tracking-[.25em] text-[#796c65]">Tafa Lab / Industries</p>
      <h1 className="mt-5 max-w-4xl text-5xl font-medium tracking-tight md:text-7xl">{t.title}</h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-[#675c56]">{t.intro}</p>
      <h2 className="mt-20 text-3xl">{locale === "ru" ? "Что мы можем разработать" : "What we can build"}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{t.items.map((item) => <div key={item} className="rounded-2xl border border-[#ddd3ca] bg-white p-7"><h3 className="text-xl">{item}</h3></div>)}</div>
      <p className="mt-10 max-w-3xl leading-7 text-[#675c56]">{locale === "ru" ? "Функции и интеграции разрабатываются индивидуально после согласования задачи." : "Features and integrations are scoped individually after discussing your project."}</p>
      <Link href={`/${locale}#contact`} className="mt-8 inline-flex rounded-full bg-[#211a17] px-7 py-3 text-white">{locale === "ru" ? "Обсудить проект" : "Discuss a project"}</Link>
    </div>
    <FloristCatalogDemo locale={locale} />
    <BouquetBuilderDemo locale={locale} />
  </main>;
}
