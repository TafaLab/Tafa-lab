import Image from "next/image";
import Link from "next/link";
import StkSiteShell from "./design/StkSiteShell";
import StkReveal from "./design/StkReveal";
import StkLeadForm from "./StkLeadForm";
import TafaLabLogo from "./TafaLabLogo";

type Locale = "ru" | "en";
const whatsapp = "https://wa.me/77471818493";

const copy = {
  en: {
    eyebrow:"Custom business platforms & internal systems",
    title:"One connected platform instead of spreadsheets, chats and disconnected tools.",
    text:"Custom management systems for growing businesses — sales, expenses, inventory, purchasing, staff, attendance, payroll, branches, reports, workflows and owner dashboards.",
    primary:"Explore business systems", secondary:"Discuss a project",
    introTitle:"Software shaped around the way your business actually works.",
    introText:"Instead of forcing operations into generic software, we design the platform around your branches, roles, approvals, inventory flows, financial logic and reporting needs.",
    servicesTitle:"What a custom business platform can include",
    services:[
      ["Management Dashboard","Custom","Revenue, profit, expenses, orders, branch performance and key operational indicators in one executive view."],
      ["Inventory & Purchasing","Custom","Stock levels, suppliers, purchase orders, warehouses, branch transfers and low-stock control."],
      ["Staff & Payroll","Custom","Employees, schedules, attendance, timesheets, overtime, payroll calculations and payment statuses."],
      ["Finance & Profit","Custom","Sales, COGS, expenses, gross profit, net profit, margins and branch-level financial reporting."],
      ["Orders & Workflow","Custom","Orders, statuses, assignments, approvals, internal tasks and operational workflows."],
      ["Support & Owner Mobile","Custom","Internal support requests, alerts, approvals and mobile access to the most important business metrics."],
    ],
    inventoryEyebrow:"Inventory & Purchasing", inventoryTitle:"Know what you have, what you need and where every item is.",
    inventoryText:"Central and branch inventory, purchase orders, suppliers, stock transfers, minimum levels and operational alerts can live in one connected system.",
    staffEyebrow:"Staff, Attendance & Payroll", staffTitle:"Connect schedules, actual working hours and payroll.",
    staffText:"Manage shifts, attendance, late arrivals, timesheets, overtime and payroll without rebuilding the same information in separate tools.",
    financeEyebrow:"Finance & Analytics", financeTitle:"See real profitability — not only revenue.",
    financeText:"Bring sales, COGS, operating expenses and payroll together to understand gross profit, net profit, margins and branch performance.",
    portfolioTitle:"Business platform projects",
    portfolioText:"Four working concepts show how a platform changes for different business needs. Open each demo, compare the interface and send a test request to the public demo admin.",
    portfolio:[
      ["NEXUS / ONE","Live control of orders, branches, stock and teams for a multi-location business.","/images/stk-lab/business-platforms/demos/nexus-operations-hero-v2.webp","Operations demo","operations-platform-demo"],
      ["STOCKFLOW","Industrial inventory, purchasing, suppliers and warehouse transfers.","/images/stk-lab/business-platforms/demos/stockflow-inventory-hero-v2.webp","Inventory demo","inventory-platform-demo"],
      ["PULSE PEOPLE","Friendly scheduling, attendance, leave and payroll experience for teams.","/images/stk-lab/business-platforms/demos/pulse-workforce-hero-v2.webp","Workforce demo","workforce-platform-demo"],
      ["LEDGER / PRIVATE","Executive cash flow, profitability, forecasts and approval intelligence.","/images/stk-lab/business-platforms/demos/ledger-finance-hero-v2.webp","Finance demo","finance-platform-demo"],
    ],
    processTitle:"How we build internal platforms",
    process:[
      ["01","Business Audit","Processes, branches, roles, existing tools, bottlenecks and reporting needs."],
      ["02","System Architecture","Modules, permissions, data flows, statuses, approvals and business logic."],
      ["03","UX & Interface","Clear workflows for owners, managers, staff and other roles."],
      ["04","Development","Database, dashboards, modules, integrations, permissions and responsive interfaces."],
      ["05","Testing & Launch","Real workflow testing, data checks, training materials and controlled rollout."],
    ],
    packagesTitle:"Start with the scope your business needs",
    packages:[
      ["Operations Core","Custom","Core dashboard plus the highest-priority operational modules for your business."],
      ["Multi-Branch System","Custom","Branches, inventory, staff, finance, workflows and consolidated reporting."],
      ["Full Business Platform","Custom","End-to-end internal platform with advanced roles, automation, analytics and owner tools."],
    ],
    faqTitle:"FAQ",
    faqs:[
      ["Is this an off-the-shelf CRM?","No. The system is designed around your processes, roles and business logic rather than forcing your team into a fixed generic workflow."],
      ["Can different employees have different access?","Yes. Owners, managers, branch staff and employees can have separate permissions and interfaces."],
      ["Can several branches work in one system?","Yes. Data can be separated by branch while the owner receives consolidated company-wide reporting."],
      ["Can we build the platform module by module?","Yes. We can launch the highest-priority core first and add inventory, payroll, support, analytics or other modules later."],
    ],
    contactEyebrow:"Start a project", contactTitle:"Ready to replace operational chaos with one business platform?",
    contactText:"Tell us how your company works today, which tools you use and where your team loses the most time.", contactCta:"Discuss on WhatsApp",
  },
  ru: {
    eyebrow:"Индивидуальные бизнес-платформы и внутренние системы",
    title:"Одна связанная платформа вместо таблиц, чатов и разрозненных сервисов.",
    text:"Индивидуальные системы управления для растущего бизнеса: продажи, расходы, склад, закупки, сотрудники, посещаемость, зарплаты, филиалы, отчёты, процессы и кабинет владельца.",
    primary:"Смотреть бизнес-системы", secondary:"Обсудить проект",
    introTitle:"Система строится вокруг реальной работы вашего бизнеса.",
    introText:"Вместо того чтобы подстраивать процессы под универсальную программу, мы проектируем платформу под ваши филиалы, роли, согласования, движение товара, финансовую логику и отчётность.",
    servicesTitle:"Что может входить в бизнес-платформу",
    services:[
      ["Панель управления","Индивидуально","Выручка, прибыль, расходы, заказы, показатели филиалов и ключевые операционные данные в одном экране владельца."],
      ["Склад и закупки","Индивидуально","Остатки, поставщики, закупки, склады, перемещения между филиалами и контроль минимальных запасов."],
      ["Сотрудники и зарплаты","Индивидуально","Сотрудники, графики, посещаемость, табели, переработки, расчёт зарплаты и статусы выплат."],
      ["Финансы и прибыль","Индивидуально","Продажи, себестоимость, расходы, валовая и чистая прибыль, маржа и отчётность по филиалам."],
      ["Заказы и процессы","Индивидуально","Заказы, статусы, назначения, согласования, внутренние задачи и рабочие процессы."],
      ["Поддержка и мобильный кабинет","Индивидуально","Внутренние обращения, уведомления, согласования и ключевые показатели бизнеса с телефона."],
    ],
    inventoryEyebrow:"Склад и закупки", inventoryTitle:"Понимайте, что есть в наличии, что нужно заказать и где находится каждый товар.",
    inventoryText:"Центральный склад и филиалы, закупки, поставщики, перемещения, минимальные остатки и операционные уведомления работают в одной системе.",
    staffEyebrow:"Сотрудники, посещаемость и зарплаты", staffTitle:"Свяжите расписание, фактически отработанное время и расчёт зарплаты.",
    staffText:"Смены, опоздания, табели, переработки и выплаты больше не нужно собирать вручную из нескольких сервисов.",
    financeEyebrow:"Финансы и аналитика", financeTitle:"Смотрите реальную прибыль, а не только выручку.",
    financeText:"Продажи, себестоимость, операционные расходы и зарплаты объединяются, чтобы владелец видел валовую и чистую прибыль, маржу и результаты каждого филиала.",
    portfolioTitle:"Проекты бизнес-платформ",
    portfolioText:"Четыре рабочие концепции показывают, как платформа меняется под разные задачи бизнеса. Откройте каждую демо-версию, сравните интерфейс и отправьте тестовую заявку в открытую админку.",
    portfolio:[
      ["NEXUS / ONE","Живое управление заказами, филиалами, складом и командами бизнеса.","/images/stk-lab/business-platforms/demos/nexus-operations-hero-v2.webp","Operations demo","operations-platform-demo"],
      ["STOCKFLOW","Индустриальный склад, закупки, поставщики и перемещения товара.","/images/stk-lab/business-platforms/demos/stockflow-inventory-hero-v2.webp","Inventory demo","inventory-platform-demo"],
      ["PULSE PEOPLE","Графики, посещаемость, отпуска и зарплаты в дружелюбном интерфейсе.","/images/stk-lab/business-platforms/demos/pulse-workforce-hero-v2.webp","Workforce demo","workforce-platform-demo"],
      ["LEDGER / PRIVATE","Денежный поток, прибыльность, прогнозы и согласования для владельца.","/images/stk-lab/business-platforms/demos/ledger-finance-hero-v2.webp","Finance demo","finance-platform-demo"],
    ],
    processTitle:"Как мы создаём внутренние платформы",
    process:[
      ["01","Аудит бизнеса","Процессы, филиалы, роли, текущие инструменты, проблемы и необходимая отчётность."],
      ["02","Архитектура системы","Модули, права доступа, движение данных, статусы, согласования и бизнес-логика."],
      ["03","UX и интерфейс","Понятные рабочие сценарии для владельца, менеджеров, сотрудников и других ролей."],
      ["04","Разработка","База данных, панели, модули, интеграции, права доступа и адаптивные интерфейсы."],
      ["05","Тестирование и запуск","Проверка реальных процессов, данных, инструкции и контролируемый запуск."],
    ],
    packagesTitle:"Начните с того объёма, который нужен бизнесу",
    packages:[
      ["Operations Core","Индивидуально","Основной dashboard и самые приоритетные операционные модули."],
      ["Multi-Branch System","Индивидуально","Филиалы, склад, сотрудники, финансы, процессы и общая отчётность."],
      ["Full Business Platform","Индивидуально","Полная внутренняя платформа с ролями, автоматизацией, аналитикой и кабинетом владельца."],
    ],
    faqTitle:"Частые вопросы",
    faqs:[
      ["Это готовая универсальная CRM?","Нет. Система проектируется под ваши процессы, роли и бизнес-логику, а не заставляет команду работать по чужому шаблону."],
      ["Можно дать сотрудникам разный уровень доступа?","Да. У владельца, менеджеров, сотрудников филиалов и других ролей могут быть разные права и интерфейсы."],
      ["Можно объединить несколько филиалов?","Да. Данные можно разделять по филиалам, а владельцу показывать общую картину по всей компании."],
      ["Можно делать систему поэтапно?","Да. Сначала запускаем самое важное ядро, а затем добавляем склад, зарплаты, поддержку, аналитику и другие модули."],
    ],
    contactEyebrow:"Начать проект", contactTitle:"Хотите заменить операционный хаос одной бизнес-платформой?",
    contactText:"Расскажите, как сейчас работает компания, какими инструментами пользуется команда и где теряется больше всего времени.", contactCta:"Обсудить в WhatsApp",
  }
} as const;

export default function BusinessPlatformsIndustryPage({locale}:{locale:Locale}) {
  const t=copy[locale], other=locale==="ru"?"en":"ru";
  const message=encodeURIComponent(locale==="ru"?"Здравствуйте! Хочу обсудить индивидуальную бизнес-платформу для компании.":"Hello! I'd like to discuss a custom business platform for my company.");
  return <StkSiteShell>
    <header className="sticky top-0 z-50 border-b border-[color:var(--stk-border)] bg-[color:var(--stk-bg-translucent)] backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8"><Link href={`/${locale}`} aria-label="Tafa Lab"><TafaLabLogo priority /></Link><nav className="hidden gap-7 text-sm md:flex"><a href="#services">{locale==="ru"?"Решения":"Solutions"}</a><a href="#portfolio">{locale==="ru"?"Проекты":"Projects"}</a><a href="#process">{locale==="ru"?"Процесс":"Process"}</a><a href="#contact">{locale==="ru"?"Контакты":"Contact"}</a></nav><Link href={`/${other}/industries/business-platforms`} className="rounded-full border border-[color:var(--stk-border)] px-3 py-2 text-xs uppercase">{other}</Link></div></header>

    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pb-28 md:pt-24"><StkReveal><div><p className="text-xs font-semibold uppercase tracking-[.25em] text-[color:var(--stk-muted-strong)]">{t.eyebrow}</p><h1 className="mt-6 text-balance text-5xl font-medium tracking-[-.055em] md:text-7xl lg:text-[5rem] lg:leading-[.98]">{t.title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--stk-muted)]">{t.text}</p><div className="mt-9 flex flex-wrap gap-3"><a href="#services" className="rounded-full bg-[var(--stk-dark)] px-6 py-3.5 text-sm" style={{color:"#fff"}}>{t.primary}</a><a href={`${whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className="rounded-full border border-[color:var(--stk-border)] px-6 py-3.5 text-sm" style={{color:"var(--stk-text)"}}>{t.secondary}</a></div></div></StkReveal><StkReveal delay={1}><div className="relative aspect-[4/3] overflow-hidden rounded-[var(--stk-radius-card)] bg-[var(--stk-media-bg)]"><Image src="/images/stk-lab/business-platforms/business-platform-hero.webp" alt="Custom business management platform" fill priority className="object-cover" sizes="(max-width:768px) 95vw, 45vw"/></div></StkReveal></section>

    <section className="border-y border-[color:var(--stk-border)] bg-[color:var(--stk-surface)]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.introTitle}</h2><p className="text-lg leading-8 text-[color:var(--stk-muted)]">{t.introText}</p></div></section>

    <section id="services" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"><h2 className="max-w-3xl text-4xl tracking-[-.045em] md:text-6xl">{t.servicesTitle}</h2><div className="mt-14 grid border-l border-t border-[color:var(--stk-border)] sm:grid-cols-2 lg:grid-cols-3">{t.services.map(([name,price,text],i)=><div key={name} className="min-h-[300px] border-b border-r border-[color:var(--stk-border)] p-7 md:p-9"><div className="flex justify-between gap-4"><span className="text-xs text-[color:var(--stk-faint)]">{String(i+1).padStart(2,"0")}</span><span className="max-w-[55%] break-words text-right text-sm font-medium">{price}</span></div><h3 className="mt-16 text-2xl tracking-[-.035em]">{name}</h3><p className="mt-4 leading-7 text-[color:var(--stk-muted)]">{text}</p></div>)}</div></section>

    <Feature image="/images/stk-lab/business-platforms/business-inventory-purchasing.webp" eyebrow={t.inventoryEyebrow} title={t.inventoryTitle} text={t.inventoryText}/>
    <Feature image="/images/stk-lab/business-platforms/business-staff-payroll.webp" eyebrow={t.staffEyebrow} title={t.staffTitle} text={t.staffText} reverse/>
    <Feature image="/images/stk-lab/business-platforms/business-finance-analytics.webp" eyebrow={t.financeEyebrow} title={t.financeTitle} text={t.financeText} dark/>

    <section id="portfolio" className="bg-[var(--stk-surface-strong)] py-24 md:py-32"><div className="mx-auto max-w-7xl px-5 md:px-8"><p className="text-xs font-semibold uppercase tracking-[.24em] text-[color:var(--stk-muted-strong)]">Portfolio · 4</p><h2 className="mt-4 text-4xl tracking-[-.045em] md:text-6xl">{t.portfolioTitle}</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--stk-muted)]">{t.portfolioText}</p><div className="mt-14 grid gap-5 md:grid-cols-2">{t.portfolio.map(([name,desc,img,status,url])=><Link key={name} href={`/${locale}/${url}`} className="group h-full overflow-hidden rounded-[var(--stk-radius-card)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)]"><div className="relative aspect-[16/10] overflow-hidden"><Image src={img} alt={name} fill className="object-cover transition duration-700 group-hover:scale-[1.03]" sizes="(max-width:768px) 95vw, 48vw"/><span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-xs">{status}</span></div><div className="p-6 md:p-8"><h3 className="text-3xl tracking-[-.04em]">{name}</h3><p className="mt-3 leading-7 text-[color:var(--stk-muted)]">{desc}</p><div className="mt-6 text-sm font-medium">{locale==="ru"?"Открыть платформу":"Open platform"} →</div></div></Link>)}</div></div></section>

    <section className="border-t border-[color:var(--stk-border)]"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-28"><div className="relative aspect-[4/3] overflow-hidden rounded-[var(--stk-radius-card)]"><Image src="/images/stk-lab/business-platforms/business-orders-workflow.webp" alt="Orders workflow and internal support system" fill className="object-cover" sizes="(max-width:768px) 95vw, 45vw"/></div><div><p className="text-xs font-semibold uppercase tracking-[.24em] text-[color:var(--stk-muted-strong)]">{locale==="ru"?"Заказы, процессы и поддержка":"Orders, workflow & support"}</p><h2 className="mt-5 text-4xl tracking-[-.045em] md:text-6xl">{locale==="ru"?"Уберите рабочие процессы из бесконечных чатов.":"Move operational workflows out of endless chats."}</h2><p className="mt-7 max-w-xl text-lg leading-8 text-[color:var(--stk-muted)]">{locale==="ru"?"Заказы, задачи, согласования, внутренние обращения, вложения и история статусов могут работать в одной системе с понятной ответственностью.":"Orders, tasks, approvals, internal requests, attachments and status history can live in one system with clear ownership."}</p></div></div></section>

    <section className="bg-[var(--stk-dark)] text-white"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-28"><div><p className="text-xs font-semibold uppercase tracking-[.24em] text-white/45">{locale==="ru"?"Кабинет владельца":"Owner mobile"}</p><h2 className="mt-5 text-4xl tracking-[-.045em] md:text-6xl">{locale==="ru"?"Главное о бизнесе — с телефона.":"The business overview that matters — on your phone."}</h2><p className="mt-7 max-w-xl text-lg leading-8 text-white/65">{locale==="ru"?"Выручка, прибыль, филиалы, сотрудники, склад, согласования и критические уведомления доступны владельцу без необходимости открывать ноутбук.":"Revenue, profit, branches, staff, inventory, approvals and critical alerts stay accessible without opening a laptop."}</p></div><div className="relative aspect-[4/3] overflow-hidden rounded-[var(--stk-radius-card)]"><Image src="/images/stk-lab/business-platforms/business-owner-mobile.webp" alt="Mobile owner business dashboard" fill className="object-cover" sizes="(max-width:768px) 95vw, 45vw"/></div></div></section>

    <section id="process" className="bg-[var(--stk-accent-soft)] py-24 md:py-32"><div className="mx-auto max-w-7xl px-5 md:px-8"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.processTitle}</h2><div className="mt-16 divide-y divide-[color:var(--stk-border)] border-y border-[color:var(--stk-border)]">{t.process.map(([num,name,text])=><div key={num} className="grid gap-4 py-8 md:grid-cols-[100px_1fr_1.4fr]"><span className="text-sm text-[color:var(--stk-faint)]">{num}</span><h3 className="text-2xl">{name}</h3><p className="leading-7 text-[color:var(--stk-muted)]">{text}</p></div>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.packagesTitle}</h2><div className="mt-14 grid gap-5 lg:grid-cols-3">{t.packages.map(([name,price,text],i)=><div key={name} className={`rounded-[var(--stk-radius-card)] border p-8 ${i===2?"border-[var(--stk-dark)] bg-[var(--stk-dark)] text-white":"border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)]"}`}><p className={`text-xs uppercase tracking-[.2em] ${i===2?"text-white/50":"text-[color:var(--stk-faint)]"}`}>Tafa Lab</p><h3 className="mt-10 text-3xl">{name}</h3><div className={`mt-5 max-w-full break-words tracking-[-.05em] leading-[1.02] ${i===2?"text-3xl sm:text-4xl":"text-3xl sm:text-4xl"}`}>{price}</div><p className={`mt-6 leading-7 ${i===2?"text-white/60":"text-[color:var(--stk-muted)]"}`}>{text}</p><a href={`${whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className={`mt-10 inline-flex rounded-full px-5 py-3 text-sm ${i===2?"bg-white":"bg-[var(--stk-dark)]"}`} style={{color:i===2?"#000":"#fff"}}>{t.contactCta}</a></div>)}</div></section>

    <section className="border-y border-[color:var(--stk-border)] bg-[var(--stk-surface-strong)] py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.75fr_1.25fr] md:px-8"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.faqTitle}</h2><div className="divide-y divide-[color:var(--stk-border)] border-y border-[color:var(--stk-border)]">{t.faqs.map(([q,a])=><details key={q} className="group py-6"><summary className="flex cursor-pointer list-none justify-between gap-5 text-xl"><span>{q}</span><span className="transition group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-5 leading-7 text-[color:var(--stk-muted)]">{a}</p></details>)}</div></div></section>

    <section aria-label={locale==="ru"?"Другие направления Tafa Lab":"Other Tafa Lab industries"} className="border-t border-[color:var(--stk-border)]"><div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.24em] text-[color:var(--stk-muted-strong)]">{locale==="ru"?"Другие направления":"Other industries"}</p><h2 className="mt-4 text-3xl tracking-[-.04em] md:text-5xl">{locale==="ru"?"Посмотрите другие решения Tafa Lab":"Explore other Tafa Lab solutions"}</h2></div><Link href={`/${locale}`} className="text-sm font-medium">{locale==="ru"?"На главную Tafa Lab":"Tafa Lab home"} →</Link></div><div className="mt-10 grid gap-3 sm:grid-cols-2"><Link href={`/${locale}/industries/bakeries`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Пекарни и кондитерские":"Bakeries & Cake Studios"}</span><span aria-hidden="true">→</span></Link><Link href={`/${locale}/industries/restaurants`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Рестораны":"Restaurants"}</span><span aria-hidden="true">→</span></Link><Link href={`/${locale}/industries/beauty`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Beauty и салоны":"Beauty & Salons"}</span><span aria-hidden="true">→</span></Link><Link href={`/${locale}/industries/travel`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Travel":"Travel"}</span><span aria-hidden="true">→</span></Link></div></div></section>

      <section id="contact" className="px-5 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl rounded-[var(--stk-radius-card)] bg-[var(--stk-dark)] px-6 py-14 text-white md:px-12 md:py-20">
          <p className="text-xs uppercase tracking-[.24em] text-white/40">{t.contactEyebrow}</p>
          <h2 className="mt-5 max-w-4xl text-balance text-4xl tracking-[-.05em] md:text-7xl">{t.contactTitle}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">{t.contactText}</p>

          <div className="mt-10 max-w-4xl">
            <StkLeadForm locale={locale} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
            <span className="mr-2 text-xs uppercase tracking-[.18em] text-white/35">
              {locale === "ru" ? "Или связаться напрямую" : "Or contact us directly"}
            </span>
            <a
              href={`${whatsapp}?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-5 py-2.5 text-sm"
              style={{ color: "#000000" }}
            >
              {t.contactCta}
            </a>
            <a
              href="https://t.me/STK_Lab"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm"
              style={{ color: "#ffffff" }}
            >
              Telegram ↗
            </a>
            <a
              href="mailto:suyunova.talifa@gmail.com"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm"
              style={{ color: "#ffffff" }}
            >
              Email ↗
            </a>
          </div>
        </div>
      </section>
  </StkSiteShell>;
}

function Feature({image,eyebrow,title,text,reverse=false,dark=false}:{image:string;eyebrow:string;title:string;text:string;reverse?:boolean;dark?:boolean}) {
  return <section className={dark?"bg-[var(--stk-dark)] text-white":"border-t border-[color:var(--stk-border)]"}><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-28"><div className={`relative aspect-[4/3] overflow-hidden rounded-[var(--stk-radius-card)] ${reverse?"md:order-2":""}`}><Image src={image} alt={title} fill className="object-cover" sizes="(max-width:768px) 95vw, 45vw"/></div><div className={reverse?"md:order-1":""}><p className={`text-xs font-semibold uppercase tracking-[.24em] ${dark?"text-white/45":"text-[color:var(--stk-muted-strong)]"}`}>{eyebrow}</p><h2 className="mt-5 text-4xl tracking-[-.045em] md:text-6xl">{title}</h2><p className={`mt-7 max-w-xl text-lg leading-8 ${dark?"text-white/65":"text-[color:var(--stk-muted)]"}`}>{text}</p></div></div></section>;
}
