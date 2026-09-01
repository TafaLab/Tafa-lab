import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StkLabHome from "@/app/components/stk-lab/StkLabHome";
import type { StkLabLocale } from "@/app/components/stk-lab/content";
import StkStructuredData from "@/app/components/stk-lab/StkStructuredData";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "ru" && locale !== "en") return {};
  const ru = locale === "ru";
  const title = ru ? "Tafa Lab — создание премиальных сайтов и веб-приложений" : "Tafa Lab — Premium Websites & Web Applications";
  const description = ru ? "Tafa Lab создаёт премиальные сайты, интернет-магазины, конструкторы, системы бронирования и индивидуальные веб-приложения для бизнеса." : "Tafa Lab designs and develops premium websites, e-commerce, product configurators, booking systems and custom web applications for businesses.";
  return {
    title: { absolute: title }, description,
    alternates: { canonical: `/${locale}`, languages: { ru: "/ru", en: "/en", "x-default": "/en" } },
    openGraph: { type:"website", url:`/${locale}`, siteName:"Tafa Lab", locale:ru?"ru_RU":"en_US", alternateLocale:[ru?"en_US":"ru_RU"], title, description, images:[{url:"/og-image.jpg",width:1200,height:630,alt:"Tafa Lab"}] },
    twitter: { card:"summary_large_image", title, description, images:["/og-image.jpg"] },
  };
}
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "ru" && locale !== "en") notFound();
  return <><StkStructuredData locale={locale as StkLabLocale} pageName={locale==="ru"?"Tafa Lab — создание премиальных сайтов и веб-приложений":"Tafa Lab — Premium Websites & Web Applications"} pageDescription={locale==="ru"?"Премиальные сайты и индивидуальные цифровые продукты для бизнеса.":"Premium websites and custom digital products for businesses."}/><StkLabHome locale={locale as StkLabLocale}/></>;
}
