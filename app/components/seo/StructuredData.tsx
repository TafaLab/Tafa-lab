type Locale = "ru" | "en";

type StructuredDataProps = {
  locale: Locale;
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000";

export default function StructuredData({
  locale,
}: StructuredDataProps) {
  const isEnglish = locale === "en";

  const businessDescription = isEnglish
    ? "Custom cakes, desserts and an interactive cake builder by STK Bakery."
    : "Авторские торты, десерты и интерактивный конструктор тортов STK Bakery.";

  const websiteName = isEnglish
    ? "STK Bakery — Custom Cakes"
    : "STK Bakery — торты на заказ";

  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Bakery",
      "@id": `${siteUrl}/#bakery`,
      name: "STK Bakery",
      url: `${siteUrl}/${locale}`,
      description: businessDescription,
      image: `${siteUrl}/images/hero-cake.jpg`,
      logo: `${siteUrl}/icon-512.png`,
      priceRange: "₸₸",
      servesCuisine: [
        "Cakes",
        "Desserts",
        "Bakery",
      ],
      availableLanguage: [
        "Russian",
        "English",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: websiteName,
      url: `${siteUrl}/${locale}`,
      inLanguage:
        locale === "en"
          ? "en"
          : "ru",
      publisher: {
        "@id": `${siteUrl}/#bakery`,
      },
    },
  ];

  return (
    <>
      {data.map((item) => (
        <script
          key={item["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </>
  );
}