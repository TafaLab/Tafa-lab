import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";

const articles=[
 {slug:"ai-bakery-order-assistant",sector:"bakeries",ru:"AI-помощник для заказов в кондитерской",en:"AI Bakery Order Assistant",ruCategory:"Заказы",enCategory:"Orders"},
 {slug:"ai-restaurant-host",sector:"restaurants",ru:"AI-хост для ресторанов",en:"AI Restaurant Host",ruCategory:"Рестораны",enCategory:"Restaurants"},
 {slug:"ai-beauty-receptionist",sector:"beauty",ru:"AI-администратор салона красоты",en:"AI Beauty Receptionist",ruCategory:"Красота",enCategory:"Beauty"},
 {slug:"ai-travel-advisor",sector:"travel",ru:"AI-тревел-консультант",en:"AI Travel Advisor",ruCategory:"Путешествия",enCategory:"Travel"},
 {slug:"ai-business-knowledge-agent",sector:"business-platforms",ru:"Корпоративный AI-агент и база знаний",en:"Enterprise AI Knowledge Agent",ruCategory:"Бизнес",enCategory:"Business"},
 {slug:"ai-event-assistant",sector:"entertainment",ru:"AI-помощник для мероприятий",en:"AI Event Assistant",ruCategory:"Мероприятия",enCategory:"Events"},
 {slug:"ai-learning-assistant",sector:"learning-platforms",ru:"AI-помощник для онлайн-обучения",en:"AI Learning Assistant",ruCategory:"Обучение",enCategory:"Learning"},
 {slug:"ai-conference-concierge",sector:"conferences",ru:"AI-консьерж конференции",en:"AI Conference Concierge",ruCategory:"Конференции",enCategory:"Conferences"}
] as const;

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;if(locale!=="ru"&&locale!=="en")return {};
 return {title:locale==="ru"?"Статьи об AI-решениях":"AI Solutions Insights",
 description:locale==="ru"?"Практические статьи о применении AI-ассистентов в восьми отраслях.":"Practical articles about AI assistants across eight industries.",
 alternates:{canonical:`/${locale}/blog`,languages:{ru:"/ru/blog",en:"/en/blog","x-default":"/en/blog"}}};
}
export default async function BlogIndex({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(locale!=="ru"&&locale!=="en")notFound();
 const ru=locale==="ru";
 const structuredData={
  "@context":"https://schema.org",
  "@type":"CollectionPage",
  name:ru?"AI-решения для бизнеса":"AI Solutions for Business",
  inLanguage:locale,
  url:`https://tafalab.com/${locale}/blog`,
  mainEntity:{
   "@type":"ItemList",
   itemListElement:articles.map((article,index)=>({
    "@type":"ListItem",
    position:index+1,
    name:ru?article.ru:article.en,
    url:`https://tafalab.com/${locale}/blog/${article.slug}`
   }))
  }
 };
 return <main className="min-h-screen bg-[var(--stk-bg)] text-[var(--stk-text)]"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/><div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
 <Link href={`/${locale}`} className="text-sm underline underline-offset-4">← {ru?"На главную":"Home"}</Link>
 <p className="mt-14 text-xs font-semibold uppercase tracking-[.2em] text-[color:var(--stk-muted)]">Tafa Lab · Insights</p>
 <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">{ru?"AI-решения для бизнеса":"AI Solutions for Business"}</h1>
 <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--stk-muted)]">{ru?"Восемь практических материалов о сценариях AI-ассистентов, интеграциях и ограничениях автоматизации.":"Eight practical guides to AI assistant workflows, integrations and automation safeguards."}</p>
 <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{articles.map((a,i)=><article key={a.slug} className="flex flex-col rounded-[var(--stk-radius-panel)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] p-7"><p className="text-xs text-[color:var(--stk-muted)]">{String(i+1).padStart(2,"0")} / 08</p><p className="mt-3 text-xs uppercase tracking-[.14em] text-[color:var(--stk-muted-strong)]">{ru?a.ruCategory:a.enCategory}</p><h2 className="mt-5 text-xl font-medium">{ru?a.ru:a.en}</h2><div className="mt-auto flex flex-wrap items-center gap-4 pt-8"><Link href={`/${locale}/blog/${a.slug}`} className="inline-block text-sm font-medium underline underline-offset-4">{ru?"Читать статью":"Read article"} →</Link><Link href={`/${locale}/industries/${a.sector}`} className="inline-block text-sm text-[color:var(--stk-muted)] underline underline-offset-4">{ru?"Отрасль":"Industry"}</Link></div></article>)}</div>
 <Link href={`/${locale}/ai-agents`} className="mt-12 inline-block rounded-full border border-[color:var(--stk-border)] px-6 py-3 text-sm">{ru?"AI-услуги Tafa Lab":"Tafa Lab AI services"}</Link>
 </div></main>;
}
