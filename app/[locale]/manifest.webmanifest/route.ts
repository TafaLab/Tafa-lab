import { NextResponse } from "next/server";

type ManifestRouteProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: ManifestRouteProps,
) {
  const { locale: localeParam } =
    await params;

  const locale =
    localeParam === "en"
      ? "en"
      : "ru";

  const isEnglish =
    locale === "en";

  const manifest = {
    id: `/${locale}`,

    name: "STK Bakery",

    short_name: "STK Bakery",

    description: isEnglish
      ? "Custom cakes, desserts and an interactive cake builder by STK Bakery."
      : "Авторские торты, десерты и интерактивный конструктор STK Bakery.",

    start_url: `/${locale}`,

    scope: `/${locale}/`,

    display: "standalone",

    orientation:
      "portrait-primary",

    background_color:
      "#faf8f6",

    theme_color:
      "#faf8f6",

    lang: locale,

    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };

  return NextResponse.json(
    manifest,
    {
      headers: {
        "Content-Type":
          "application/manifest+json",
        "Cache-Control":
          "public, max-age=3600, s-maxage=86400",
      },
    },
  );
}