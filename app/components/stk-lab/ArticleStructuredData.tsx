type ArticleStructuredDataProps = {
 locale: "ru" | "en";
 slug: string;
 headline: string;
 description: string;
};

export default function ArticleStructuredData({
 locale, slug, headline, description,
}: ArticleStructuredDataProps) {
 const url = `https://tafalab.com/${locale}/blog/${slug}`;
 const data = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  description,
  inLanguage: locale,
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  url,
  author: { "@type": "Organization", name: "Tafa Lab", url: "https://tafalab.com" },
  publisher: { "@type": "Organization", name: "Tafa Lab", url: "https://tafalab.com" },
 };
 return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
