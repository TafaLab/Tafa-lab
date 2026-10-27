import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const articles = {
 ru:{
  title:"Как AI-бот помогает кондитерской принимать заказы",
  description:"Практические сценарии AI-помощника для кондитерской: сбор параметров торта, уточнение доставки, согласование цены и передача заказа сотруднику.",
  intro:"Индивидуальные торты требуют больше уточнений, чем стандартная покупка: дата, размер, начинка, оформление, аллергены и доставка. AI-помощник может структурировать первичную заявку, но не должен подтверждать то, чего не знает.",
  sections:[
   ["1. Сбор параметров заказа","Бот последовательно уточняет дату, количество гостей, желаемый вкус, дизайн, бюджет и способ получения. Ответы формируют черновик заявки, который удобно передать кондитеру."],
   ["2. Каталог и ориентировочная стоимость","Если подключён актуальный каталог с правилами ценообразования, бот может показать подходящие варианты и предварительный расчёт. Итоговую стоимость индивидуального дизайна подтверждает сотрудник."],
   ["3. Проверка доступности","Свободные производственные слоты, наличие ингредиентов и интервалы доставки нельзя придумывать. Бот должен проверять подключённые системы или передавать вопрос менеджеру."],
   ["4. Передача заказа человеку","После сбора данных помощник формирует краткое резюме и отправляет заявку ответственному сотруднику. Подтверждение, изменения и возвраты проходят по согласованным правилам."],
   ["5. Где работает бот","Сценарий можно адаптировать для сайта, Telegram и официального WhatsApp Business. Для каждого канала отдельно проверяются доступность API, согласие клиента и требования к данным."],
  ],
  conclusion:"Начинать лучше с одного сценария — сбора заявок на торты. Затем измерять полноту заявок, количество ручных уточнений и долю обращений, переданных сотруднику. Интеграции и автоматическое подтверждение заказов добавляются только после проверки процессов.",
  back:"Кондитерские",cta:"Обсудить AI-бота для кондитерской",tag:"Практическое руководство"
 },
 en:{
  title:"How AI Bots Can Support Bakery Orders",
  description:"Practical bakery AI assistant workflows: cake requirements, delivery details, estimates, availability checks and staff handoff.",
  intro:"Custom cakes need more clarification than a typical checkout: date, size, flavor, design, allergens and delivery. An AI assistant can structure an initial enquiry without pretending to know information it cannot verify.",
  sections:[
   ["1. Collect the order details","The assistant asks for the date, guest count, flavor, design, budget and collection or delivery preference. These details form a draft enquiry for the bakery team."],
   ["2. Catalog and indicative pricing","With a connected, up-to-date catalog and pricing rules, the bot can suggest options and show an estimate. A staff member should confirm custom-design pricing."],
   ["3. Check actual availability","Production capacity, ingredient stock and delivery windows must not be invented. The bot should query connected systems or escalate to a manager."],
   ["4. Hand off to a person","Once the details are collected, the assistant summarizes the enquiry for staff. Confirmations, changes and refunds follow agreed approval rules."],
   ["5. Choose the right channel","The same workflow can be adapted for websites, Telegram and official WhatsApp Business. API access, customer consent and data requirements must be evaluated per channel."],
  ],
  conclusion:"A practical first release focuses on cake enquiries. Measure completeness of submissions, manual follow-up effort and escalation rates before adding order confirmation or more complex integrations.",
  back:"Bakeries",cta:"Discuss a bakery AI bot",tag:"Practical guide"
 }
} as const;
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;if(locale!=="ru"&&locale!=="en")return {};
 const t=articles[locale];return {title:t.title,description:t.description,alternates:{canonical:`/${locale}/blog/ai-bakery-order-assistant`,languages:{ru:"/ru/blog/ai-bakery-order-assistant",en:"/en/blog/ai-bakery-order-assistant","x-default":"/en/blog/ai-bakery-order-assistant"}}};
}
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(locale!=="ru"&&locale!=="en")notFound();const t=articles[locale];
 return <main className="min-h-screen bg-[var(--stk-bg)] text-[var(--stk-text)]">
 <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
 <Link href={`/${locale}/industries/bakeries`} className="text-sm underline underline-offset-4">← {t.back}</Link>
 <p className="mt-16 text-xs font-semibold uppercase tracking-[.2em] text-[color:var(--stk-muted)]">{t.tag} · Tafa Lab</p>
 <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">{t.title}</h1>
 <p className="mt-8 text-lg leading-8 text-[color:var(--stk-muted)]">{t.intro}</p>
 {t.sections.map(([heading,body])=><section key={heading} className="mt-12"><h2 className="text-2xl font-medium">{heading}</h2><p className="mt-4 leading-8 text-[color:var(--stk-muted)]">{body}</p></section>)}
 <p className="mt-12 border-t border-[color:var(--stk-border)] pt-8 leading-8">{t.conclusion}</p>
 <Link href={`/${locale}/blog`} className="mt-10 mr-4 inline-flex rounded-full border border-[color:var(--stk-border)] px-7 py-3 text-sm">{locale==="ru"?"Все статьи":"All articles"}</Link><Link href={`/${locale}#contact`} className="mt-10 inline-flex rounded-full bg-[var(--stk-dark)] px-7 py-3 text-white" style={{color:"#fff"}}>{t.cta}</Link>
 </article></main>;
}
