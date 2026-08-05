import type { Metadata } from "next";

import {
  NextIntlClientProvider,
  hasLocale,
} from "next-intl";

import {
  getMessages,
  setRequestLocale,
} from "next-intl/server";

import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

type Locale = "ru" | "en";

type LocaleLayoutProps = {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
};

const metadataContent = {
  ru: {
    title: "STK Bakery — торты на заказ",

    description:
      "Торты на заказ, десерты и интерактивный конструктор STK Bakery. Создайте дизайн торта, выберите начинку, цвет и украшения.",

    keywords: [
      "торты на заказ",
      "кондитерская",
      "конструктор тортов",
      "торт на день рождения",
      "детский торт",
      "свадебный торт",
      "десерты",
      "STK Bakery",
    ],

    openGraphTitle:
      "STK Bakery — создайте свой идеальный торт",

    openGraphDescription:
      "Выберите готовый торт или создайте собственный дизайн в интерактивном конструкторе STK Bakery.",

    locale: "ru_RU",
  },

  en: {
    title: "STK Bakery — Custom Cakes",

    description:
      "Custom cakes, desserts and an interactive cake builder by STK Bakery. Choose the filling, color and decorations for your cake.",

    keywords: [
      "custom cakes",
      "bakery",
      "cake builder",
      "birthday cake",
      "kids cake",
      "wedding cake",
      "desserts",
      "STK Bakery",
    ],

    openGraphTitle:
      "STK Bakery — Design Your Perfect Cake",

    openGraphDescription:
      "Choose a ready-made cake or create your own design in the interactive STK Bakery cake builder.",

    locale: "en_US",
  },
} as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: Pick<
  LocaleLayoutProps,
  "params"
>): Promise<Metadata> {
  const { locale: localeParam } =
    await params;

  if (
    localeParam !== "ru" &&
    localeParam !== "en"
  ) {
    return {};
  }

  const locale =
    localeParam as Locale;

  const content =
    metadataContent[locale];

  return {
    title: content.title,

    description:
      content.description,

      manifest:
  `/${locale}/manifest.webmanifest`,
  
    keywords: [
      ...content.keywords,
    ],

    alternates: {
      canonical: `/${locale}`,

      languages: {
        ru: "/ru",
        en: "/en",
        "x-default": "/ru",
      },
    },

    openGraph: {
      type: "website",

      url: `/${locale}`,

      siteName: "STK Bakery",

      title:
        content.openGraphTitle,

      description:
        content.openGraphDescription,

      locale: content.locale,

      alternateLocale:
        locale === "ru"
          ? ["en_US"]
          : ["ru_RU"],

      images: [
        {
          url: "/images/hero-cake.jpg",
          width: 1200,
          height: 630,
          alt:
            locale === "en"
              ? "Luxury custom cake by STK Bakery"
              : "Авторский торт STK Bakery",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title:
        content.openGraphTitle,

      description:
        content.openGraphDescription,

      images: [
        "/images/hero-cake.jpg",
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (
    !hasLocale(
      routing.locales,
      locale,
    )
  ) {
    notFound();
  }

  setRequestLocale(locale);

  const messages =
    await getMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  );
}