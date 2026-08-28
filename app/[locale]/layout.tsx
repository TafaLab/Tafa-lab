import {
  NextIntlClientProvider,
  hasLocale,
} from "next-intl";

import {
  getMessages,
  setRequestLocale,
} from "next-intl/server";

import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";

import { routing } from "@/i18n/routing";

type LocaleLayoutProps = {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
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
    <>
      <Script id="document-language" strategy="beforeInteractive">
        {`document.documentElement.lang=${JSON.stringify(locale)};`}
      </Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-7KW5HE8VL0"
        strategy="afterInteractive"
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7KW5HE8VL0');
        `}
      </Script>

      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        {children}
      </NextIntlClientProvider>
      <Link
        href={`/${locale}/price`}
        className="fixed bottom-4 left-4 z-[90] rounded-full border border-white/25 bg-[#211d19]/90 px-4 py-2.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition hover:-translate-y-0.5"
        style={{ color: "#ffffff" }}
      >
        {locale === "ru" ? "Общий прайс" : "Full price"} →
      </Link>
    </>
  );
}
