import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const articles = {
 ru: {
  title: "AI-хостес для ресторана: бронирования и обслуживание гостей",
  description: "Как AI-хостес помогает ресторану обрабатывать запросы на бронирование, отвечать по меню и передавать обращения персоналу.",
  intro: "Гости пишут в ресторан в разное время: спрашивают о свободных столиках, меню, мероприятиях и особых пожеланиях. AI-хостес может собрать информацию и сократить количество повторяющихся вопросов, если его действия связаны с реальными данными ресторана.",
  sections: [
   ["1. Приём запросов на бронирование", "Помощник уточняет дату, время, число гостей и контакт для подтверждения. Без интеграции с системой бронирования он оформляет заявку, но не обещает свободный стол."],
   ["2. Актуальное меню и аллергены", "Бот может отвечать на вопросы о блюдах только по утверждённому меню. При сомнениях в аллергенах или составе он направляет гостя к сотруднику, а не делает предположения."],
   ["3. Особые запросы гостей", "День рождения, детское кресло, доступная среда или большая компания — такие запросы лучше фиксировать и передавать администратору вместе с деталями бронирования."],
   ["4. Каналы и интеграции", "AI-хостес может работать в чате сайта, Telegram и официальном WhatsApp Business. Для проверки мест, изменения брони и отправки уведомлений нужны соответствующие интеграции и разрешения."],
   ["5. Контроль качества", "Перед запуском проверяют точность ответов, долю переданных сотрудникам обращений, ошибки бронирований и правила обработки персональных данных."],
  ],
  conclusion: "Начните с ответов на частые вопросы и сбора заявок. Подтверждение бронирований стоит автоматизировать только после проверки интеграции с реальной системой ресторана.",
  back: "Рестораны", cta: "Обсудить AI-хостес", tag: "Практическое руководство",
 },
 en: {
  title: "AI Restaurant Hosts: Reservations and Guest Support",
  description: "How an AI restaurant host can handle reservation enquiries, menu questions and guest requests with appropriate human handoff.",
  intro: "Guests contact restaurants at all hours to ask about tables, menus, events and special requests. An AI host can structure these enquiries and reduce repetitive work when its responses rely on real restaurant information.",
  sections: [
   ["1. Capture reservation enquiries", "The assistant asks for the date, time, party size and confirmation contact. Without a connected reservation system, it can collect an enquiry but must not promise a table."],
   ["2. Current menu and allergens", "A bot should answer menu questions only from approved, current information. When ingredients or allergens are uncertain, it should escalate to staff rather than guess."],
   ["3. Special guest requests", "Birthdays, high chairs, accessibility needs and large parties can be captured and passed to a manager alongside the reservation details."],
   ["4. Channels and integrations", "An AI host can operate through website chat, Telegram and official WhatsApp Business. Checking availability, modifying bookings and sending notifications require scoped integrations and permissions."],
   ["5. Quality and safeguards", "Before launch, teams should test answer accuracy, human escalation, booking errors and personal-data handling."],
  ],
  conclusion: "Start with frequently asked questions and reservation enquiries. Automate confirmations only after verifying a reliable connection to the restaurant's actual booking system.",
  back: "Restaurants", cta: "Discuss an AI restaurant host", tag: "Practical guide",
 },
} as const;
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;
 if(locale!=="ru"&&locale!=="en")return {};
 const t=articles[locale];
 return {title:`${t.title} | Tafa Lab`,description:t.description,alternates:{canonical:`/${locale}/blog/ai-restaurant-host`,languages:{ru:"/ru/blog/ai-restaurant-host",en:"/en/blog/ai-restaurant-host","x-default":"/en/blog/ai-restaurant-host"}}};
}
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;
 if(locale!=="ru"&&locale!=="en")notFound();
 const t=articles[locale];
 return <main className="min-h-screen bg-[var(--stk-bg)] text-[var(--stk-text)]">
  <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
   <Link href={`/${locale}/industries/restaurants`} className="text-sm underline underline-offset-4">← {t.back}</Link>
   <p className="mt-16 text-xs font-semibold uppercase tracking-[.2em] text-[color:var(--stk-muted)]">{t.tag} · Tafa Lab</p>
   <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">{t.title}</h1>
   <p className="mt-8 text-lg leading-8 text-[color:var(--stk-muted)]">{t.intro}</p>
   {t.sections.map(([heading,body])=><section key={heading} className="mt-12"><h2 className="text-2xl font-medium">{heading}</h2><p className="mt-4 leading-8 text-[color:var(--stk-muted)]">{body}</p></section>)}
   <p className="mt-12 border-t border-[color:var(--stk-border)] pt-8 leading-8">{t.conclusion}</p>
   <Link href={`/${locale}#contact`} className="mt-10 inline-flex rounded-full bg-[var(--stk-dark)] px-7 py-3 text-white" style={{color:"#fff"}}>{t.cta}</Link>
  </article>
 </main>;
}
