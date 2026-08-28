import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://tafalab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["ru", "en"] as const;

  const corePages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    {
      path: "/industries/bakeries",
      priority: 0.95,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/industries/restaurants",
      priority: 0.95,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/industries/beauty",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/industries/travel",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/industries/business-platforms",
      priority: 0.95,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/industries/entertainment",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/price",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/contacts",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },

    // Live STK Bakery demo. Kept public as a portfolio project.
    {
      path: "/bakery",
      priority: 0.65,
      changeFrequency: "monthly" as const,
    },
  ];

  return locales.flatMap((locale) =>
    corePages.map((page) => ({
      url: `${siteUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          ru: `${siteUrl}/ru${page.path}`,
          en: `${siteUrl}/en${page.path}`,
        },
      },
    })),
  );
}
