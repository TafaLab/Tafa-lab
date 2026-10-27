// Static pre-release checks; no network calls, Vercel API, or deployment.
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const slugs = [
  ["ai-bakery-order-assistant", "bakeries"],
  ["ai-restaurant-host", "restaurants"],
  ["ai-beauty-receptionist", "beauty"],
  ["ai-travel-advisor", "travel"],
  ["ai-business-knowledge-agent", "business-platforms"],
  ["ai-event-assistant", "entertainment"],
  ["ai-learning-assistant", "learning-platforms"],
  ["ai-conference-concierge", "conferences"],
];
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };

const index = read("app/[locale]/blog/page.tsx");
const sitemap = read("app/sitemap.ts");
const showcase = read("app/components/stk-lab/IndustryAiShowcase.tsx");
const homepage = read("app/components/stk-lab/StkLabHome.tsx");
const jsonLd = read("app/components/stk-lab/ArticleStructuredData.tsx");

check(index.includes('"@type":"CollectionPage"'), "Missing CollectionPage JSON-LD");
check(index.includes('"@type":"ItemList"'), "Missing ItemList JSON-LD");
check(index.includes('"x-default"'), "Blog index missing x-default hreflang");
check(homepage.includes('/blog'), "Homepage missing blog entry");
check(jsonLd.includes('"@type": "Article"'), "Missing Article JSON-LD component");
check(sitemap.includes('"x-default"'), "Sitemap missing x-default alternates");
check(!sitemap.includes("lastModified: new Date()"), "Sitemap uses misleading current-date lastModified");
const rootLayout = read("app/layout.tsx");
check(rootLayout.includes('const siteUrl = "https://tafalab.com"'), "Canonical metadataBase must use production host");

for (const [slug, sector] of slugs) {
  const file = `app/[locale]/blog/${slug}/page.tsx`;
  check(fs.existsSync(path.join(root, file)), `Missing article: ${slug}`);
  if (!fs.existsSync(path.join(root, file))) continue;
  const source = read(file);
  check(source.includes("generateMetadata"), `Missing metadata: ${slug}`);
  check(source.includes('"x-default"'), `Missing x-default hreflang: ${slug}`);
  check(source.includes("ArticleStructuredData"), `Missing Article JSON-LD: ${slug}`);
  check(/<ArticleStructuredData[\s\S]*?description=\{t\.description\}/.test(source) || /<ArticleStructuredData[\s\S]*?description=\{article\.description\}/.test(source), `Article JSON-LD description needs review: ${slug}`);
  check(source.includes('/blog'), `Missing blog navigation: ${slug}`);
  check(index.includes(`slug:"${slug}"`), `Missing blog index entry: ${slug}`);
  check(index.includes(`sector:"${sector}"`), `Missing sector link: ${sector}`);
  check(showcase.includes(`"${slug}"`), `Missing industry article link: ${slug}`);
  check(sitemap.includes(`/blog/${slug}`), `Missing sitemap entry: ${slug}`);
}
for (const route of ["/blog", "/ai-agents", "/industries/learning-platforms", "/industries/conferences"]) {
  check(sitemap.includes(`path: "${route}"`), `Missing sitemap route: ${route}`);
}
if (errors.length) {
  console.error("AI content QA failed:\n" + errors.map((e) => "- " + e).join("\n"));
  process.exitCode = 1;
} else {
  console.log("AI content QA passed: 8 articles, navigation, metadata, structured data and sitemap references.");
}
