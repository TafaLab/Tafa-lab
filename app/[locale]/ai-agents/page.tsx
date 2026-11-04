import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AiSolutionsSection from "@/app/components/stk-lab/AiSolutionsSection";

const text = {
  ru: {
    title: "AI-агенты и автоматизация бизнеса",
    intro: "Разрабатываем AI-ассистентов для общения с клиентами, обработки заявок и внутренних бизнес-процессов.",
    heading: "Как проходит внедрение",
    steps: ["Анализ задач и существующих систем", "Проектирование сценариев и границ полномочий", "Подключение каналов и интеграций", "Тестирование, запуск и контроль качества"],
    note: "Каждый агент разрабатывается под конкретные процессы. Интеграции, стоимость и сроки определяются после оценки проекта.",
    privacy: "Предусматриваем передачу сложных вопросов человеку, контроль доступа к данным и согласование действий, влияющих на заказы и платежи.",
    cta: "Обсудить AI-проект",
  },
  en: {
    title: "AI Agents & Business Automation",
    intro: "Custom AI assistants for customer conversations, lead handling and internal business workflows.",
    heading: "How implementation works",
    steps: ["Discover business requirements and existing systems", "Design conversation flows and permissions", "Connect channels and integrations", "Test, launch and monitor quality"],
    note: "Every agent is scoped to real workflows. Integrations, pricing and timelines are agreed after discovery.",
    privacy: "We design human escalation, data access controls and approval for actions affecting orders and payments.",
    cta: "Discuss an AI project",
  },
} as const;

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;
 if(locale!=="ru"&&locale!=="en")return {};
 const t=text[locale];
 return {title:t.title,description:t.intro,alternates:{canonical:`/${locale}/ai-agents`,languages:{ru:"/ru/ai-agents",en:"/en/ai-agents","x-default":"/en/ai-agents"}}};
}
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;
 if(locale!=="ru"&&locale!=="en")notFound();
 const t=text[locale];
 return <main className="min-h-screen bg-[#f6f2ed] text-[#211a17]">
  <div className="mx-auto max-w-7xl px-5 pt-12 md:px-8">
   <Link href={`/${locale}`} className="text-sm underline underline-offset-4">← Tafa Lab</Link>
   <h1 className="mt-20 max-w-5xl text-5xl font-medium tracking-tight md:text-7xl">{t.title}</h1>
   <p className="mt-7 max-w-3xl text-lg leading-8 text-[#675c56]">{t.intro}</p>
  </div>
  <AiSolutionsSection locale={locale} />
  <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
   <h2 className="text-3xl font-medium md:text-5xl">{t.heading}</h2>
   <ol className="mt-10 grid gap-4 md:grid-cols-2">{t.steps.map((step,i)=><li key={step} className="rounded-2xl border border-[#ddd3ca] bg-white p-7"><span className="text-sm text-[#796c65]">{String(i+1).padStart(2,"0")}</span><p className="mt-4 text-xl">{step}</p></li>)}</ol>
   <p className="mt-9 max-w-3xl leading-7 text-[#675c56]">{t.privacy}</p>
   <p className="mt-3 max-w-3xl leading-7 text-[#675c56]">{t.note}</p>
   <Link href={`/${locale}#contact`} className="mt-8 inline-flex rounded-full bg-[#211a17] px-7 py-3 text-white">{t.cta}</Link>
  </section>
 </main>;
}
