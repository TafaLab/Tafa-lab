import type { MetadataRoute } from "next";

const siteUrl = "https://tafalab.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/ru/admin",
        "/ru/admin/",
        "/ru/stk-admin",
        "/ru/stk-admin/",
        "/en/admin",
        "/en/admin/",
        "/en/stk-admin",
        "/en/stk-admin/",
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
