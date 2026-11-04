// Static pre-release checks; no network calls, Vercel API, or deployment.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("node:fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
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
// Industry AI CTA must navigate to the localized homepage contact section.
const aiSolutions = read("app/components/stk-lab/AiSolutionsSection.tsx");
check(aiSolutions.includes('href={`/${locale}#contact`}'), "Industry AI CTA must target localized homepage contact");
check(homepage.includes('id="contact"'), "Homepage missing contact anchor for industry AI CTA");
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
  check(/<ArticleStructuredData[^>]*description=\{t\.(description|intro)\}/.test(source), `Article JSON-LD description needs review: ${slug}`);
  check(source.includes('/blog'), `Missing blog navigation: ${slug}`);
  check(index.includes(`slug:"${slug}"`), `Missing blog index entry: ${slug}`);
  check(index.includes(`sector:"${sector}"`), `Missing sector link: ${sector}`);
  check(showcase.includes(`"${slug}"`), `Missing industry article link: ${slug}`);
  check(sitemap.includes(`/blog/${slug}`), `Missing sitemap entry: ${slug}`);
}
for (const route of ["/blog", "/ai-agents", "/industries/learning-platforms", "/industries/conferences", "/industries/flowers"]) {
  check(sitemap.includes(`path: "${route}"`), `Missing sitemap route: ${route}`);
}
// Flowers is a public bilingual showcase, not a live commerce integration.
const flowers = read("app/[locale]/industries/flowers/page.tsx");
const flowersModules = ["FloristCatalogDemo", "BouquetBuilderDemo", "FloristFulfillmentDemo"];
for (const moduleName of flowersModules) {
  check(flowers.includes(`<${moduleName} locale={locale} />`), `Flowers missing demo: ${moduleName}`);
  const moduleSource = read(`app/components/stk-lab/${moduleName}.tsx`);
  check(moduleSource.startsWith('"use client"'), `Flowers demo must remain interactive: ${moduleName}`);
}
check(flowers.includes('href={`/${locale}#contact`}'), "Flowers missing localized contact CTA");
check(flowers.indexOf("<FloristCatalogDemo") < flowers.indexOf("<BouquetBuilderDemo"), "Flowers catalog must precede builder");
check(flowers.indexOf("<BouquetBuilderDemo") < flowers.indexOf("<FloristFulfillmentDemo"), "Flowers builder must precede fulfillment");
check(flowers.lastIndexOf('href={`/${locale}#contact`}') > flowers.indexOf("<FloristFulfillmentDemo"), "Flowers contact CTA must follow demos");

// Release guardrails for CRM and incoming requests; these are static checks,
// not substitutes for authenticated Preview integration tests.
const leadsApi = read("app/api/stk-lab/leads/route.ts");
const crmPage = read("app/[locale]/stk-admin/page.tsx");
const crmSyncApi = read("app/api/stk-lab/crm-sync/route.ts");
check(leadsApi.includes('return NextResponse.json({error:"forbidden"},{status:403})'), "Leads API missing non-admin rejection");
check(leadsApi.includes('if(user.id!=='), "Leads API missing explicit administrator check");
check(leadsApi.includes('auth.getUser(token)'), "Leads API missing authenticated user verification");
check(crmSyncApi.includes('authenticatedUser(request'), "CRM sync API missing authenticated user verification");
check(crmPage.includes('const legacyCrmSeeds: Lead[] = []'), "Legacy CRM imports must remain disabled");
check(crmPage.includes('const saveError = await persistCrmState('), "CRM create must inspect cloud sync result");
check(crmPage.includes('if (saveError || !accessToken)'), "CRM create must not report success without cloud confirmation");
const robots = read("app/robots.ts");
for (const locale of ["ru", "en"]) {
  check(robots.includes(`"/${locale}/stk-admin"`), `Private CRM route must be excluded from robots: ${locale}`);
}
check(crmPage.includes('...incomingLeads.filter((x) => !synced.deleted.includes(x.id)).map(hydrate)'), "CRM incoming source leads must honor deleted tombstones");
check(crmPage.includes('.filter((x) => !synced.deleted.includes(x.id))\n        .map(hydrate)'), "CRM manually stored leads must honor deleted tombstones");

if (errors.length) {
  console.error("AI content QA failed:\n" + errors.map((e) => "- " + e).join("\n"));
  process.exitCode = 1;
} else {
  console.log("AI content QA passed: 8 articles, navigation, metadata, structured data and sitemap references.");
}
