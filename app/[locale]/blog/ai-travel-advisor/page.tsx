import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const article = {
 ru:{
  title:"AI-тревел-консультант: подбор поездок и поддержка путешественников",
  description:"Как туристическому бизнесу использовать AI-ассистента для подбора маршрутов, сбора заявок и помощи гостям с проверкой актуальной информации.",
  intro:"Туристические запросы редко ограничиваются одним вопросом: клиент выбирает направление, даты, бюджет, жильё и активности. AI-консультант может структурировать пожелания и предложить варианты, но актуальные цены, наличие мест и правила въезда необходимо проверять отдельно.",
  sections:[
   ["1. Выявление потребностей","Бот уточняет даты, бюджет, количество путешественников, интересы, предпочтения по перелёту и размещению. Результат — понятное резюме запроса для менеджера или системы подбора."],
   ["2. Предварительный маршрут","На основе подтверждённого каталога услуг помощник может предложить черновик маршрута. Это рекомендация для проверки, а не гарантированное бронирование."],
   ["3. Наличие и стоимость","Цены авиабилетов, отелей и экскурсий меняются. Подтверждать стоимость и доступность можно только через актуальные источники и подключённые системы поставщиков."],
   ["4. Визы и правила въезда","Визовые условия, сроки пребывания и требования к документам зависят от гражданства и даты поездки. AI-агент должен ссылаться на официальные актуальные источники и при необходимости передавать вопрос специалисту."],
   ["5. Поддержка и передача менеджеру","Помощник может отвечать на типовые вопросы, собирать контакты с согласия клиента и передавать запрос ответственному менеджеру. Платежи, изменения брони и нестандартные ситуации требуют отдельного согласования."],
  ],
  conclusion:"Для первого запуска достаточно AI-консультанта, который собирает пожелания и формирует качественную заявку. Интеграции с бронированием и оплатой следует подключать только после проверки поставщиков и процессов.",
  back:"Travel & Hospitality",cta:"Обсудить AI-тревел-консультанта",tag:"Практическое руководство"
 },
 en:{
  title:"AI Travel Advisors: Trip Planning and Guest Support",
  description:"How travel businesses can use AI assistants for trip discovery, itinerary enquiries and guest support while verifying live travel information.",
  intro:"Travel enquiries usually involve multiple decisions: destination, dates, budget, accommodation and activities. An AI advisor can organize preferences and suggest options, but live prices, availability and entry rules require separate verification.",
  sections:[
   ["1. Understand the traveller","The bot collects dates, budget, group size, interests and flight or accommodation preferences. The result is a structured enquiry for a travel advisor or booking workflow."],
   ["2. Draft an itinerary","Using an approved service catalog, the assistant can suggest a draft itinerary for review. This is a proposal, not a confirmed reservation."],
   ["3. Verify availability and pricing","Flight, hotel and activity prices change frequently. Confirmations must come from current supplier data and connected booking systems."],
   ["4. Check visas and entry rules","Visa requirements and permitted stays depend on nationality and travel dates. The assistant should direct travellers to current official sources and escalate uncertain cases."],
   ["5. Support and human handoff","The assistant can answer routine questions, collect contact details with consent and route requests to a travel advisor. Payments, changes and exceptional situations need separate authorization."],
  ],
  conclusion:"A practical first release is an AI advisor that captures preferences and produces useful enquiries. Booking and payment integrations should follow only after supplier and process validation.",
  back:"Travel & Hospitality",cta:"Discuss an AI travel advisor",tag:"Practical guide"
 }
} as const;
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;if(locale!=="ru"&&locale!=="en")return {};
 const t=article[locale];return {title:`${t.title} | Tafa Lab`,description:t.description,alternates:{canonical:`/${locale}/blog/ai-travel-advisor`,languages:{ru:"/ru/blog/ai-travel-advisor",en:"/en/blog/ai-travel-advisor","x-default":"/en/blog/ai-travel-advisor"}}};
}
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(locale!=="ru"&&locale!=="en")notFound();const t=article[locale];
 return <main className="min-h-screen bg-[var(--stk-bg)] text-[var(--stk-text)]"><article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
 <Link href={`/${locale}/industries/travel`} className="text-sm underline underline-offset-4">← {t.back}</Link>
 <p className="mt-16 text-xs font-semibold uppercase tracking-[.2em] text-[color:var(--stk-muted)]">{t.tag} · Tafa Lab</p>
 <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">{t.title}</h1>
 <p className="mt-8 text-lg leading-8 text-[color:var(--stk-muted)]">{t.intro}</p>
 {t.sections.map(([heading,body])=><section key={heading} className="mt-12"><h2 className="text-2xl font-medium">{heading}</h2><p className="mt-4 leading-8 text-[color:var(--stk-muted)]">{body}</p></section>)}
 <p className="mt-12 border-t border-[color:var(--stk-border)] pt-8 leading-8">{t.conclusion}</p>
 <Link href={`/${locale}/blog`} className="mt-10 mr-4 inline-flex rounded-full border border-[color:var(--stk-border)] px-7 py-3 text-sm">{locale==="ru"?"Все статьи":"All articles"}</Link><Link href={`/${locale}#contact`} className="mt-10 inline-flex rounded-full bg-[var(--stk-dark)] px-7 py-3 text-white" style={{color:"#fff"}}>{t.cta}</Link>
 </article></main>;
}
