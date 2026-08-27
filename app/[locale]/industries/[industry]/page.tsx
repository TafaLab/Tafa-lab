import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BakeryIndustryPage from "@/app/components/stk-lab/BakeryIndustryPage";
import BeautyIndustryPage from "@/app/components/stk-lab/BeautyIndustryPage";
import BusinessPlatformsIndustryPage from "@/app/components/stk-lab/BusinessPlatformsIndustryPage";
import RestaurantIndustryPage from "@/app/components/stk-lab/RestaurantIndustryPage";
import StkStructuredData from "@/app/components/stk-lab/StkStructuredData";
import TravelIndustryPage from "@/app/components/stk-lab/TravelIndustryPage";
import type { StkLabLocale } from "@/app/components/stk-lab/content";
import {
  industryContent,
  industrySlugs,
  type IndustrySlug,
} from "@/app/components/stk-lab/industry-content";

function validLocale(value: string): value is StkLabLocale {
  return value === "ru" || value === "en";
}

function validIndustry(value: string): value is IndustrySlug {
  return industrySlugs.includes(value as IndustrySlug);
}

export function generateStaticParams() {
  return (["ru", "en"] as const).flatMap((locale) =>
    industrySlugs.map((industry) => ({
      locale,
      industry,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}): Promise<Metadata> {
  const { locale, industry } = await params;

  if (!validLocale(locale) || !validIndustry(industry)) {
    return {};
  }

  const t = industryContent[locale][industry];
  const isRu = locale === "ru";

  return {
    title: t.metaTitle,
    description: t.metaDescription,

    alternates: {
      canonical: `/${locale}/industries/${industry}`,
      languages: {
        ru: `/ru/industries/${industry}`,
        en: `/en/industries/${industry}`,
        "x-default": `/en/industries/${industry}`,
      },
    },

    openGraph: {
      type: "website",
      url: `/${locale}/industries/${industry}`,
      siteName: "Tafa Lab",
      locale: isRu ? "ru_RU" : "en_US",
      alternateLocale: [isRu ? "en_US" : "ru_RU"],
      title: t.metaTitle,
      description: t.metaDescription,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t.metaTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}) {
  const { locale, industry } = await params;

  if (!validLocale(locale) || !validIndustry(industry)) {
    notFound();
  }

  const metadata = industryContent[locale][industry];

  const structuredData = (
    <StkStructuredData
      locale={locale}
      pageName={metadata.metaTitle}
      pageDescription={metadata.metaDescription}
      pagePath={`/industries/${industry}`}
    />
  );

  switch (industry) {
    case "bakeries":
      return (
        <>
          {structuredData}
          <BakeryIndustryPage locale={locale} />
        </>
      );

    case "restaurants":
      return (
        <>
          {structuredData}
          <RestaurantIndustryPage locale={locale} />
        </>
      );

    case "beauty":
      return (
        <>
          {structuredData}
          <BeautyIndustryPage locale={locale} />
        </>
      );

    case "travel":
      return (
        <>
          {structuredData}
          <TravelIndustryPage locale={locale} />
        </>
      );

    case "business-platforms":
      return (
        <>
          {structuredData}
          <BusinessPlatformsIndustryPage locale={locale} />
        </>
      );

    default:
      notFound();
  }
}
