import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const article = {
 ru: {
  title:"AI-администратор для салона красоты: запись и общение с клиентами",
  description:"Как AI-администратор может принимать заявки, уточнять услуги, отправлять напоминания и передавать сложные вопросы сотрудникам салона.",
  intro:"Клиенты салонов часто пишут вечером или во время занятости администратора. AI-ассистент может помочь с первичными вопросами и сбором данных для записи, но подтверждать время он должен только на основе подключённого календаря.",
  sections:[
   ["1. Выбор услуги","Ассистент уточняет, какая услуга нужна клиенту, и показывает описание, длительность и стоимость по утверждённому прайс-листу. Если клиенту нужна профессиональная оценка, запрос передаётся специалисту."],
   ["2. Запись без двойного бронирования","Чтобы подтверждать визит, бот должен проверять актуальное расписание мастеров и блокировать выбранный слот через надёжную интеграцию. Без неё он собирает заявку для администратора."],
   ["3. Напоминания и переносы","При наличии согласия клиента можно настроить напоминания о визите и правила переноса. Отмена и изменение записи должны отражаться в основной системе салона."],
   ["4. Забота о клиентах","AI-помощник может отправлять утверждённые инструкции по подготовке к услуге и уходу после неё. Медицинские или индивидуальные противопоказания следует обсуждать с квалифицированным специалистом."],
   ["5. Каналы и безопасность","Сайт, Telegram и официальный WhatsApp Business подходят для разных клиентских сценариев. Важно ограничивать доступ к персональным данным, вести журнал действий и предусмотреть передачу диалога человеку."],
  ],
  conclusion:"Практичный первый этап — ответы на частые вопросы и сбор заявок. После тестирования календаря и правил подтверждения можно добавлять автоматическую запись и напоминания.",
  back:"Beauty & Wellness",cta:"Обсудить AI-администратора",tag:"Практическое руководство"
 },
 en: {
  title:"AI Receptionists for Beauty Studios: Bookings and Client Care",
  description:"How an AI beauty receptionist can support service enquiries, appointment requests, reminders and staff handoff.",
  intro:"Beauty clients often message outside business hours or while reception staff are busy. An AI assistant can handle initial questions and collect booking details, but should confirm appointments only through a connected calendar.",
  sections:[
   ["1. Help clients choose a service","The assistant clarifies the requested service and provides approved descriptions, duration and pricing. Questions requiring professional assessment are escalated to a qualified specialist."],
   ["2. Avoid double bookings","To confirm appointments, a bot must check live stylist availability and reserve a slot through a reliable integration. Otherwise it should collect an enquiry for reception staff."],
   ["3. Reminders and rescheduling","With appropriate consent, reminders and rescheduling rules can be automated. Changes must be reflected in the salon's source-of-truth booking system."],
   ["4. Support client care","The assistant can share approved preparation and aftercare instructions. Medical concerns and individual contraindications should be handled by qualified professionals."],
   ["5. Channels and safeguards","Website chat, Telegram and official WhatsApp Business serve different client needs. Limit access to personal information, keep action logs and provide human handoff."],
  ],
  conclusion:"A sensible first release handles FAQs and appointment enquiries. Automated bookings and reminders can follow once calendar integration and confirmation rules have been tested.",
  back:"Beauty & Wellness",cta:"Discuss an AI receptionist",tag:"Practical guide"
 }
} as const;
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;if(locale!=="ru"&&locale!=="en")return {};
 const t=article[locale];return {title:`${t.title} | Tafa Lab`,description:t.description,alternates:{canonical:`/${locale}/blog/ai-beauty-receptionist`,languages:{ru:"/ru/blog/ai-beauty-receptionist",en:"/en/blog/ai-beauty-receptionist","x-default":"/en/blog/ai-beauty-receptionist"}}};
}
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(locale!=="ru"&&locale!=="en")notFound();const t=article[locale];
 return <main className="min-h-screen bg-[var(--stk-bg)] text-[var(--stk-text)]"><article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
 <Link href={`/${locale}/industries/beauty`} className="text-sm underline underline-offset-4">← {t.back}</Link>
 <p className="mt-16 text-xs font-semibold uppercase tracking-[.2em] text-[color:var(--stk-muted)]">{t.tag} · Tafa Lab</p>
 <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">{t.title}</h1>
 <p className="mt-8 text-lg leading-8 text-[color:var(--stk-muted)]">{t.intro}</p>
 {t.sections.map(([heading,body])=><section key={heading} className="mt-12"><h2 className="text-2xl font-medium">{heading}</h2><p className="mt-4 leading-8 text-[color:var(--stk-muted)]">{body}</p></section>)}
 <p className="mt-12 border-t border-[color:var(--stk-border)] pt-8 leading-8">{t.conclusion}</p>
 <Link href={`/${locale}/blog`} className="mt-10 mr-4 inline-flex rounded-full border border-[color:var(--stk-border)] px-7 py-3 text-sm">{locale==="ru"?"Все статьи":"All articles"}</Link><Link href={`/${locale}#contact`} className="mt-10 inline-flex rounded-full bg-[var(--stk-dark)] px-7 py-3 text-white" style={{color:"#fff"}}>{t.cta}</Link>
 </article></main>;
}
