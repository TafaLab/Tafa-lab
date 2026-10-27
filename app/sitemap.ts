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
      path: "/contacts",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },

    { path: "/industries/learning-platforms", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/industries/conferences", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/ai-agents", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/blog/ai-bakery-order-assistant", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog/ai-restaurant-host", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog/ai-beauty-receptionist", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog/ai-travel-advisor", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog/ai-business-knowledge-agent", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog/ai-event-assistant", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog/ai-learning-assistant", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog/ai-conference-concierge", priority: 0.7, changeFrequency: "monthly" as const },

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
