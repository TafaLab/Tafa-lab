import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://tafalab.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/ru/admin",
        "/ru/admin/",
        "/en/admin",
        "/en/admin/",
        "/ru/checkout",
        "/en/checkout",
        "/ru/thank-you",
        "/en/thank-you",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
