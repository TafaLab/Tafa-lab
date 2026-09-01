type Props = {
  locale: "ru" | "en";
  pageName?: string;
  pageDescription?: string;
  pagePath?: string;
};

export default function StkStructuredData({
  locale,
  pageName,
  pageDescription,
  pagePath = "",
}: Props) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tafa Lab",
    url: `${base}/${locale}`,
    email: "suyunova.talifa@gmail.com",
    sameAs: ["https://t.me/STK_Lab"],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tafa Lab",
    url: `${base}/${locale}`,
    inLanguage: locale,
  };

  const webpage = pageName
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: pageName,
        description: pageDescription,
        url: `${base}/${locale}${pagePath}`,
        inLanguage: locale,
        isPartOf: {
          "@type": "WebSite",
          name: "Tafa Lab",
          url: `${base}/${locale}`,
        },
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      {webpage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
        />
      )}
    </>
  );
}
