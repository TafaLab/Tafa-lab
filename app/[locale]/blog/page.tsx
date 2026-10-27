import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";

const articles=[
 {slug:"ai-bakery-order-assistant",ru:"AI-помощник для заказов в кондитерской",en:"AI Bakery Order Assistant"},
 {slug:"ai-restaurant-host",ru:"AI-хост для ресторанов",en:"AI Restaurant Host"},
 {slug:"ai-beauty-receptionist",ru:"AI-администратор салона красоты",en:"AI Beauty Receptionist"},
 {slug:"ai-travel-advisor",ru:"AI-тревел-консультант",en:"AI Travel Advisor"},
 {slug:"ai-business-knowledge-agent",ru:"Корпоративный AI-агент и база знаний",en:"Enterprise AI Knowledge Agent"},
 {slug:"ai-event-assistant",ru:"AI-помощник для мероприятий",en:"AI Event Assistant"},
 {slug:"ai-learning-assistant",ru:"AI-помощник для онлайн-обучения",en:"AI Learning Assistant"},
 {slug:"ai-conference-concierge",ru:"AI-консьерж конференции",en:"AI Conference Concierge"}
] as const;

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;if(locale!=="ru"&&locale!=="en")return {};
 return {title:locale==="ru"?"Статьи об AI-решениях | Tafa Lab":"AI Solutions Insights | Tafa Lab",
 description:locale==="ru"?"Практические статьи о применении AI-ассистентов в восьми отраслях.":"Practical articles about AI assistants across eight industries.",
 alternates:{canonical:`/${locale}/blog`,languages:{ru:"/ru/blog",en:"/en/blog","x-default":"/en/blog"}}};
}
export default async function BlogIndex({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(locale!=="ru"&&locale!=="en")notFound();
 const ru=locale==="ru";
 return <main className="min-h-screen bg-[var(--stk-bg)] text-[var(--stk-text)]"><div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
 <Link href={`/${locale}`} className="text-sm underline underline-offset-4">← {ru?"На главную":"Home"}</Link>
 <p className="mt-14 text-xs font-semibold uppercase tracking-[.2em] text-[color:var(--stk-muted)]">Tafa Lab · Insights</p>
 <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">{ru?"AI-решения для бизнеса":"AI Solutions for Business"}</h1>
 <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--stk-muted)]">{ru?"Восемь практических материалов о сценариях AI-ассистентов, интеграциях и ограничениях автоматизации.":"Eight practical guides to AI assistant workflows, integrations and automation safeguards."}</p>
 <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{articles.map((a,i)=><article key={a.slug} className="flex flex-col rounded-[var(--stk-radius-panel)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] p-7"><p className="text-xs text-[color:var(--stk-muted)]">{String(i+1).padStart(2,"0")} / 08</p><h2 className="mt-5 text-xl font-medium">{ru?a.ru:a.en}</h2><Link href={`/${locale}/blog/${a.slug}`} className="mt-8 inline-block text-sm font-medium underline underline-offset-4">{ru?"Читать статью":"Read article"} →</Link></article>)}</div>
 <Link href={`/${locale}/ai-agents`} className="mt-12 inline-block rounded-full border border-[color:var(--stk-border)] px-6 py-3 text-sm">{ru?"AI-услуги Tafa Lab":"Tafa Lab AI services"}</Link>
 </div></main>;
}
