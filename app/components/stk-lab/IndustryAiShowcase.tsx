import Link from "next/link";
import type { StkLabLocale } from "./content";
import IndustryBotDemo from "./IndustryBotDemo";

export type AiIndustry = "bakeries" | "restaurants" | "beauty" | "travel" | "business-platforms" | "entertainment" | "learning-platforms" | "conferences";
type Copy = { title: string; bot: string; example: string; answer: string; article: string; summary: string };
const content: Record<AiIndustry, { ru: Copy; en: Copy }> = {
  bakeries: { ru: {title:"AI для кондитерских",bot:"Бот приёма заказов",example:"Нужен торт на 12 гостей к субботе.",answer:"Уточню вкус, оформление и адрес доставки, затем передам заявку кондитеру.",article:"Как AI-бот помогает кондитерской принимать заказы",summary:"Сценарии подбора торта, уточнения деталей и передачи заказа команде."},en:{title:"AI for bakeries",bot:"Cake order assistant",example:"I need a cake for 12 guests this Saturday.",answer:"I can collect the flavor, design and delivery details, then hand the request to the bakery.",article:"How AI bots can support bakery orders",summary:"Cake selection, custom requests and staff handoff workflows."}},
  restaurants: {ru:{title:"AI для ресторанов",bot:"AI-хостес",example:"Можно столик на четверых в пятницу?",answer:"Уточню время и проверю доступность через подключённую систему бронирований.",article:"AI-хостес для ресторана: как это работает",summary:"Бронирования, вопросы по меню и передача сложных запросов персоналу."},en:{title:"AI for restaurants",bot:"AI host",example:"Can I book a table for four on Friday?",answer:"What time would you prefer? I can check availability through a connected booking system.",article:"AI restaurant hosts and booking workflows",summary:"Reservations, menu questions and human escalation."}},
  beauty:{ru:{title:"AI для салонов красоты",bot:"AI-администратор",example:"Хочу записаться на окрашивание.",answer:"Уточню услугу и предпочтительное время, затем проверю календарь мастера.",article:"AI-администратор для салона красоты",summary:"Запись, напоминания и повторные визиты без лишней переписки."},en:{title:"AI for beauty studios",bot:"AI receptionist",example:"I'd like to book a hair color appointment.",answer:"Which service and date do you prefer? I can check a connected stylist calendar.",article:"AI receptionists for beauty studios",summary:"Appointments, reminders and customer care."}},
  travel:{ru:{title:"AI для туризма",bot:"AI-тревел-консультант",example:"Подбери семейную поездку на пять дней.",answer:"Уточню бюджет, даты и интересы, затем предложу варианты для проверки.",article:"AI-консультант для туристического бизнеса",summary:"Подбор поездок, ответы на вопросы и передача заявки менеджеру."},en:{title:"AI for travel",bot:"AI travel advisor",example:"Help me plan a five-day family trip.",answer:"I'll ask about dates, budget and interests, then suggest options for review.",article:"AI travel advisors for tour businesses",summary:"Trip discovery, guest support and booking enquiry handoff."}},
  "business-platforms":{ru:{title:"AI для бизнес-платформ",bot:"Корпоративный AI-агент",example:"Покажи регламент оформления возврата.",answer:"Найду актуальную инструкцию среди документов, к которым у вас есть доступ.",article:"Корпоративные AI-агенты и автоматизация",summary:"Поиск знаний, обработка заявок и аналитика с контролем доступа."},en:{title:"AI for business platforms",bot:"Internal knowledge agent",example:"Where is our returns procedure?",answer:"I can search approved documents that your role is allowed to access.",article:"Internal AI agents for business operations",summary:"Knowledge search, workflow automation and access controls."}},
  entertainment:{ru:{title:"AI для развлечений",bot:"Бот мероприятий",example:"Какие пакеты есть на детский праздник?",answer:"Уточню дату, возраст детей и количество гостей, затем покажу подходящие варианты.",article:"AI-бот для организаторов мероприятий",summary:"Подбор пакетов, заявки и ответы на вопросы гостей."},en:{title:"AI for entertainment",bot:"Event booking bot",example:"What birthday party packages do you offer?",answer:"I'll ask about the date, age group and guest count to suggest suitable options.",article:"AI bots for event and entertainment teams",summary:"Package selection, enquiries and guest support."}},
  "learning-platforms":{ru:{title:"AI для онлайн-обучения",bot:"AI-репетитор",example:"Объясни тему из третьего урока.",answer:"Найду объяснение в утверждённых материалах курса и предложу тренировочный вопрос.",article:"AI-репетитор на образовательной платформе",summary:"Помощь студентам на основе проверенных учебных материалов."},en:{title:"AI for learning platforms",bot:"AI learning tutor",example:"Can you explain lesson three?",answer:"I can use approved course materials and suggest a practice question.",article:"AI tutors in online learning platforms",summary:"Grounded course support, practice and student guidance."}},
  conferences:{ru:{title:"AI для конференций",bot:"AI-консьерж",example:"Когда выступление по маркетингу?",answer:"Найду сессию в актуальной программе и подскажу зал и время.",article:"AI-консьерж для конференций",summary:"Программа, регистрация, навигация и вопросы участников."},en:{title:"AI for conferences",bot:"AI event concierge",example:"When is the marketing session?",answer:"I can check the published agenda and provide the time and room.",article:"AI concierges for professional conferences",summary:"Agenda questions, attendee registration and event support."}},
};
const packages: Record<AiIndustry, {ru: string[]; en: string[]}> = {
 bakeries:{ru:["AI-приём заказов","Консультант по тортам","Заказы + CRM + AI"],en:["AI Order Assistant","Cake Selection Assistant","Orders + CRM + AI"]},
 restaurants:{ru:["AI-хостес","AI-помощник по меню","Бронирования + CRM + AI"],en:["AI Host","Menu Assistant","Reservations + CRM + AI"]},
 beauty:{ru:["AI-администратор","Запись и напоминания","Клиентский сервис + CRM + AI"],en:["AI Receptionist","Booking & Reminders","Client Care + CRM + AI"]},
 travel:{ru:["AI-тревел-консультант","AI-помощник бронирования","Гостевой сервис + CRM + AI"],en:["AI Travel Advisor","Booking Enquiry Assistant","Guest Care + CRM + AI"]},
 "business-platforms":{ru:["AI-база знаний","AI-обработка заявок","Автоматизация + аналитика"],en:["AI Knowledge Agent","AI Lead Processing","Automation + Analytics"]},
 entertainment:{ru:["AI-подбор мероприятий","AI-помощник по билетам","Заявки + CRM + AI"],en:["AI Event Advisor","Ticket Enquiry Assistant","Enquiries + CRM + AI"]},
 "learning-platforms":{ru:["AI-репетитор","AI-помощник ученика","Обучение + кабинет + AI"],en:["AI Tutor","Student Support Assistant","Learning Portal + AI"]},
 conferences:{ru:["AI-консьерж","AI-помощник регистрации","Конференция + CRM + AI"],en:["AI Event Concierge","Registration Assistant","Conference + CRM + AI"]},
};
export default function IndustryAiShowcase({locale,sector}:{locale:StkLabLocale;sector:AiIndustry}){
 const t=content[sector][locale],ru=locale==="ru";
 return <section className="mx-auto max-w-7xl px-5 py-20 md:px-8" aria-label={t.title}>
  <p className="text-xs font-semibold uppercase tracking-[.24em] text-[color:var(--stk-muted-strong)]">AI Agents & Bots</p>
  <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">{t.title}</h2>
  <div className="mt-9 grid gap-5 lg:grid-cols-2">
   <article className="rounded-[var(--stk-radius-panel)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] p-7">
    <h3 className="text-xl font-medium">{t.bot}</h3>
    <p className="mt-2 text-xs text-[color:var(--stk-muted)]">{ru?"Пример сценария — не подключённый бот":"Illustrative script — not a connected bot"}</p>
    <div className="mt-6 space-y-3">
     <p className="ml-auto max-w-[85%] rounded-2xl bg-[var(--stk-dark)] p-4 text-sm text-white" style={{color:"#ffffff"}}>{t.example}</p>
     <p className="max-w-[90%] rounded-2xl border border-[color:var(--stk-border)] p-4 text-sm">{t.answer}</p>
    </div>
    <IndustryBotDemo locale={locale} sector={sector} />
   </article>
   <article className="rounded-[var(--stk-radius-panel)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] p-7">
    <p className="text-xs uppercase tracking-[.2em] text-[color:var(--stk-muted-strong)]">{ru?"Тема будущей статьи":"Planned article"}</p>
    <h3 className="mt-5 text-2xl font-medium">{t.article}</h3>
    <p className="mt-4 leading-7 text-[color:var(--stk-muted)]">{t.summary}</p>
    <p className="mt-5 text-sm text-[color:var(--stk-muted)]">{ru?"Материал готовится — статья пока не опубликована.":"Editorial content planned — article not yet published."}</p>
   </article>
  </div>
  <div className="mt-9">
   <h3 className="text-2xl font-medium">{ru?"Варианты разработки":"Development packages"}</h3>
   <p className="mt-2 text-sm text-[color:var(--stk-muted)]">{ru?"Состав, интеграции и стоимость согласовываются индивидуально.":"Scope, integrations and pricing are agreed individually."}</p>
   <div className="mt-5 grid gap-3 md:grid-cols-3">{packages[sector][locale].map((name,i)=><div key={name} className="rounded-[var(--stk-radius-panel)] border border-[color:var(--stk-border)] p-5"><span className="text-xs text-[color:var(--stk-muted)]">0{i+1}</span><h4 className="mt-3 text-lg font-medium">{name}</h4><p className="mt-2 text-sm text-[color:var(--stk-muted)]">{i===0?(ru?"Один приоритетный клиентский сценарий.":"One focused customer workflow."):i===1?(ru?"Несколько сценариев и передача обращений команде.":"Multiple workflows with human handoff."):(ru?"Комплексное решение с интеграциями после оценки.":"End-to-end solution with scoped integrations.")}</p></div>)}</div>
  </div>
  <div className="mt-8 flex flex-wrap gap-4">
   <Link href={`/${locale}/ai-agents`} className="rounded-full border border-[color:var(--stk-border)] px-6 py-3 text-sm">{ru?"Все AI-услуги":"Explore AI services"}</Link>
   <Link href={`/${locale}#contact`} className="rounded-full bg-[var(--stk-dark)] px-6 py-3 text-sm text-white" style={{color:"#ffffff"}}>{ru?"Заказать AI-агента":"Discuss an AI agent"}</Link>
  </div>
 </section>;
}
