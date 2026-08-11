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

import { routing } from "@/i18n/routing";

type Locale = "ru" | "en";

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
    </>
  );
}