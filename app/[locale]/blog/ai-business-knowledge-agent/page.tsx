import ArticleStructuredData from "@/app/components/stk-lab/ArticleStructuredData";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const article = {
 ru: {
  title:"Корпоративный AI-агент: база знаний и автоматизация процессов",
  description:"Как корпоративный AI-агент помогает искать информацию в документах, обрабатывать заявки и готовить отчёты с контролем доступа.",
  intro:"Сотрудники тратят время на поиск инструкций, повторяющиеся вопросы и передачу заявок между отделами. Корпоративный AI-агент может помогать с этими задачами, если работает только с разрешёнными источниками и не выполняет критичные действия без согласования.",
  sections:[
   ["1. Поиск по корпоративным документам","Агент получает доступ к утверждённым регламентам, базе знаний и внутренним инструкциям. В ответах полезно показывать источник и дату документа, чтобы сотрудник мог проверить информацию."],
   ["2. Разграничение доступа","Права пользователя должны учитываться при поиске: сотрудник не должен получать сведения из документов, к которым у него нет доступа. Доступ к CRM, финансовым данным и персональной информации требует отдельной настройки."],
   ["3. Обработка заявок и согласования","AI может классифицировать входящие запросы, заполнять черновики карточек и направлять задачи ответственным сотрудникам. Изменения договоров, платежи и другие значимые действия должны проходить через утверждённые правила."],
   ["4. Аналитика и отчёты","Помощник способен объяснять показатели подключённых дашбордов и составлять черновики отчётов. Итоговые цифры необходимо сверять с исходными данными и проверенными формулами."],
   ["5. Пилотный запуск и оценка","Начать можно с ограниченного набора документов и типовых запросов. Оценивать стоит точность ответов, количество успешных поисков, случаи передачи человеку и соблюдение прав доступа."],
  ],
  conclusion:"Лучший первый этап — небольшой внутренний AI-помощник с проверяемыми источниками и понятными ограничениями. После пилота можно постепенно подключать CRM, задачи и автоматизацию.",
  back:"Business Platforms",cta:"Обсудить корпоративного AI-агента",tag:"Практическое руководство"
 },
 en: {
  title:"Enterprise AI Agents: Knowledge Search and Workflow Automation",
  description:"How internal AI agents can search approved documents, route requests and draft reports with role-based access and human oversight.",
  intro:"Teams spend time locating policies, answering recurring questions and routing requests between departments. An internal AI agent can assist when it uses approved sources and does not perform consequential actions without appropriate authorization.",
  sections:[
   ["1. Search approved knowledge","The agent can search validated policies, knowledge bases and internal procedures. Responses should identify their source and document date so employees can verify the answer."],
   ["2. Respect access permissions","Retrieval must enforce user permissions. Employees should never see documents outside their access rights. CRM, financial and personal data require additional controls."],
   ["3. Route requests and approvals","AI can categorize enquiries, prepare draft records and assign tasks for review. Contract changes, payments and other significant actions must follow explicit approval workflows."],
   ["4. Explain business metrics","An assistant can summarize connected dashboards and draft reports. Figures should be checked against source systems and validated calculations."],
   ["5. Run a measured pilot","Start with a limited document set and common questions. Evaluate answer accuracy, successful retrieval, human escalations and access-control compliance."],
  ],
  conclusion:"A focused internal knowledge assistant with traceable sources is a practical first step. CRM connections and workflow automation can be introduced after a controlled pilot.",
  back:"Business Platforms",cta:"Discuss an enterprise AI agent",tag:"Practical guide"
 }
} as const;
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;if(locale!=="ru"&&locale!=="en")return {};
 const t=article[locale];return {title:t.title,description:t.description,alternates:{canonical:`/${locale}/blog/ai-business-knowledge-agent`,languages:{ru:"/ru/blog/ai-business-knowledge-agent",en:"/en/blog/ai-business-knowledge-agent","x-default":"/en/blog/ai-business-knowledge-agent"}}};
}
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(locale!=="ru"&&locale!=="en")notFound();const t=article[locale];
 return <main className="min-h-screen bg-[var(--stk-bg)] text-[var(--stk-text)]"><ArticleStructuredData locale={locale} slug="ai-business-knowledge-agent" headline={t.title} description={t.description} /><article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
 <Link href={`/${locale}/industries/business-platforms`} className="text-sm underline underline-offset-4">← {t.back}</Link>
 <p className="mt-16 text-xs font-semibold uppercase tracking-[.2em] text-[color:var(--stk-muted)]">{t.tag} · Tafa Lab</p>
 <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">{t.title}</h1>
 <p className="mt-8 text-lg leading-8 text-[color:var(--stk-muted)]">{t.intro}</p>
 {t.sections.map(([heading,body])=><section key={heading} className="mt-12"><h2 className="text-2xl font-medium">{heading}</h2><p className="mt-4 leading-8 text-[color:var(--stk-muted)]">{body}</p></section>)}
 <p className="mt-12 border-t border-[color:var(--stk-border)] pt-8 leading-8">{t.conclusion}</p>
 <Link href={`/${locale}/blog`} className="mt-10 mr-4 inline-flex rounded-full border border-[color:var(--stk-border)] px-7 py-3 text-sm">{locale==="ru"?"Все статьи":"All articles"}</Link><Link href={`/${locale}#contact`} className="mt-10 inline-flex rounded-full bg-[var(--stk-dark)] px-7 py-3 text-white" style={{color:"#fff"}}>{t.cta}</Link>
 </article></main>;
}
