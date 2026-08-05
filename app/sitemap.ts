import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["ru", "en"];

  const pages = [
    "",
    "/cakes",
    "/builder",
    "/food",
    "/gallery",
    "/contacts",
  ];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteUrl}/${locale}${page}`,

      lastModified: new Date(),

      changeFrequency:
        page === ""
          ? "weekly"
          : "monthly",

      priority:
        page === ""
          ? 1
          : page === "/builder"
            ? 0.95
            : page === "/cakes"
              ? 0.9
              : 0.8,
    })),
  );
}