import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Advantages from "@/app/components/home/Advantages";
import BuilderShowcase from "@/app/components/home/BuilderShowcase";
import Categories from "@/app/components/home/Categories";
import FinalCTA from "@/app/components/home/FinalCTA";
import Hero from "@/app/components/home/Hero";
import PopularCakes from "@/app/components/home/PopularCakes";
import Process from "@/app/components/home/Process";

import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";

import StructuredData from "@/app/components/seo/StructuredData";

import { enMessages } from "@/messages/en";
import { ruMessages } from "@/messages/ru";

type Locale = "ru" | "en";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const ru = locale !== "en";
  return {
    title: { absolute: ru ? "STK Bakery — торты на заказ и конструктор торта" : "STK Bakery — Custom Cakes & Cake Builder" },
    description: ru ? "Демо STK Bakery: каталог тортов, интерактивный конструктор, корзина и оформление заказа." : "STK Bakery demo: cake catalog, interactive cake builder, cart and ordering experience.",
    alternates: { canonical: `/${locale}/bakery`, languages: { ru: "/ru/bakery", en: "/en/bakery", "x-default": "/en/bakery" } },
  };
}

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({
  params,
}: HomePageProps) {
  const { locale: localeParam } =
    await params;

  if (
    localeParam !== "ru" &&
    localeParam !== "en"
  ) {
    notFound();
  }

  const locale =
    localeParam as Locale;

  const text =
    locale === "en"
      ? enMessages
      : ruMessages;

  return (
    <main>
      <StructuredData
        locale={locale}
      />

      <Header
        locale={locale}
        text={text.nav}
      />

      <Hero
        locale={locale}
        text={text.hero}
      />

      <Categories
        locale={locale}
        section={
          text.categoriesSection
        }
        items={text.categories}
      />

      <BuilderShowcase
        locale={locale}
        text={text.builderSection}
      />

      <PopularCakes
        locale={locale}
        section={
          text.popularSection
        }
        cakes={text.cakes}
      />

      <Advantages
        section={
          text.advantagesSection
        }
        items={text.advantages}
      />

      <Process
        section={
          text.processSection
        }
        steps={text.processSteps}
      />

      <FinalCTA
        locale={locale}
        text={text.finalSection}
      />

      <Footer
        locale={locale}
        text={text.footer}
      />
    </main>
  );
}