import Image from "next/image";
import Link from "next/link";
import StkSiteShell from "./design/StkSiteShell";
import StkReveal from "./design/StkReveal";
import StkLeadForm from "./StkLeadForm";

type Locale = "ru" | "en";

const whatsapp = "https://wa.me/77471818493";

const copy = {
  en: {
    navPortfolio:"Portfolio", navServices:"Solutions", navProcess:"Process", navContact:"Contact",
    heroEyebrow:"Websites & digital systems for restaurants",
    heroTitle:"Restaurant websites that turn attention into reservations, orders and repeat guests.",
    heroText:"We design premium restaurant websites and custom digital systems — online menus, ordering, reservations, POS workflows, dashboards and multi-location management.",
    heroCta:"View restaurant projects", heroSecondary:"Discuss a project",
    introTitle:"More than a beautiful restaurant website.",
    intro1:"A restaurant website should do more than show food photography. It should help guests choose, reserve, order and return — while reducing repetitive work for the team.",
    intro2:"STK Lab combines brand-led web design with practical restaurant technology, from digital menus and table reservations to owner dashboards and operational systems.",
    servicesTitle:"Digital solutions for restaurants",
    servicesText:"Start with a focused website or build a connected restaurant ecosystem. Every solution is adapted to the concept, service model and operational needs.",
    services:[
      ["Restaurant Website","from $700","Premium responsive website with menu, story, locations, contacts and reservation calls to action."],
      ["Digital Menu & Online Ordering","from $450","Mobile-first menu with categories, modifiers, cart and direct online ordering."],
      ["Table Reservations","from $350","Integrated booking flow for date, time, party size and seating preferences."],
      ["POS & Kitchen Workflow","Custom","Connected ordering workflow from front of house to kitchen preparation statuses."],
      ["Management Dashboard","Custom","Sales, expenses, COGS, inventory, employees, payroll, reports and branch performance."],
      ["Multi-location Platform","Custom","One owner system for multiple restaurants, branches, permissions and consolidated reporting."],
    ],
    orderingEyebrow:"Digital Menu · Online Ordering", orderingTitle:"Make ordering simple on every screen.",
    orderingText:"Guests can browse a visual menu, choose modifiers, add dishes to cart and place an order without waiting for a message or phone call.",
    bookingEyebrow:"Reservations", bookingTitle:"Turn website visits into booked tables.",
    bookingText:"A clear reservation flow lets guests choose the date, time, party size and seating preferences directly from the restaurant website.",
    systemEyebrow:"Restaurant Operations", systemTitle:"One system for the business behind the dining room.",
    systemText:"For restaurants that need more than a marketing website, we build dashboards for revenue, orders, expenses, inventory, teams, schedules, payroll, reports and multiple locations.",
    projectsTitle:"Restaurant projects",
    projectsText:"Live restaurant experiences and product concepts by STK Lab. Limoné opens as a complete live project; additional restaurant cases will be added here as they are built.",
    projects:[
      ["Limoné","Mediterranean restaurant website with seasonal menu, spaces, private dining and reservations.","/images/stk-lab/restaurants/restaurant-website-hero.webp","Live project","https://stklab.tilda.ws/lemons"],
      ["Digital Menu & Ordering","Responsive menu and direct ordering experience.","/images/stk-lab/restaurants/digital-menu-ordering.webp","Product concept",""],
      ["Table Reservations","Integrated booking flow designed around the restaurant brand.","/images/stk-lab/restaurants/table-reservation.webp","Product concept",""],
      ["Restaurant Management","Multi-location owner dashboard for sales, profit and operations.","/images/stk-lab/restaurants/restaurant-management-dashboard.webp","Business system",""],
      ["POS + Kitchen","Connected front-of-house and kitchen order workflow.","/images/stk-lab/restaurants/restaurant-pos-kitchen.webp","Business system",""],
      ["Owner Mobile","Mobile analytics for revenue, branches, alerts and daily performance.","/images/stk-lab/restaurants/restaurant-owner-mobile.webp","Business system",""],
    ],
    processTitle:"From concept to launch",
    processText:"We build around how the restaurant actually sells and operates, not around a generic template.",
    process:[
      ["01","Discovery","Concept, audience, menu, locations and operational goals."],
      ["02","Structure","Guest journeys for menu, reservation, ordering and contact."],
      ["03","Design","A visual system tailored to the restaurant brand."],
      ["04","Development","Responsive build, integrations and custom functionality."],
      ["05","Launch & Growth","Testing, launch and expansion as the business grows."],
    ],
    packagesTitle:"Start with the right scope",
    packagesText:"Final pricing depends on content, integrations, number of locations and custom functionality.",
    packages:[
      ["Restaurant Presence","from $700","Brand website, menu, location, contact and reservation CTA."],
      ["Ordering Experience","from $1,100","Website plus digital menu, ordering flow and conversion-focused guest journey."],
      ["Restaurant Platform","Custom","Custom operations platform, dashboards, branches, staff and business workflows."],
    ],
    faqTitle:"FAQ",
    faqs:[
      ["Can you connect an existing reservation service?","Yes. We can link or integrate an existing booking flow, or build a custom reservation experience when required."],
      ["Can guests order directly from the website?","Yes. We can build a digital menu, cart and ordering flow around the restaurant's process."],
      ["Do you build systems for several branches?","Yes. Multi-location dashboards, branch permissions, reporting and operational modules can be built as one system."],
      ["Can we start with a website and add systems later?","Yes. The project can start with the public website and expand into ordering, reservations or internal management later."],
    ],
    contactEyebrow:"Start a project", contactTitle:"Building a restaurant that deserves a better digital experience?",
    contactText:"Tell us about the concept, locations and the customer journey you want to create.", contactCta:"Discuss on WhatsApp",
  },
  ru: {
    navPortfolio:"Работы", navServices:"Решения", navProcess:"Процесс", navContact:"Контакты",
    heroEyebrow:"Сайты и цифровые системы для ресторанов",
    heroTitle:"Ресторанные сайты, которые превращают внимание в брони, заказы и постоянных гостей.",
    heroText:"Создаём премиальные сайты и цифровые системы для ресторанов: онлайн-меню, заказы, бронирование, POS-процессы, дашборды и управление несколькими филиалами.",
    heroCta:"Смотреть ресторанные проекты", heroSecondary:"Обсудить проект",
    introTitle:"Больше, чем красивый сайт ресторана.",
    intro1:"Сайт ресторана должен не только показывать красивые блюда. Он должен помогать гостю выбрать, забронировать, заказать и вернуться — одновременно сокращая ручную работу команды.",
    intro2:"STK Lab объединяет брендовый веб-дизайн с практичными ресторанными технологиями: от цифрового меню и бронирования до дашбордов владельца и операционных систем.",
    servicesTitle:"Цифровые решения для ресторанов",
    servicesText:"Можно начать с сайта или построить связанную ресторанную экосистему. Решение адаптируется под концепцию, формат обслуживания и реальные процессы бизнеса.",
    services:[
      ["Сайт ресторана","от $700","Премиальный адаптивный сайт с меню, историей, локациями, контактами и бронированием."],
      ["Цифровое меню и онлайн-заказ","от $450","Mobile-first меню с категориями, модификаторами, корзиной и прямым оформлением заказа."],
      ["Бронирование столиков","от $350","Встроенный сценарий выбора даты, времени, количества гостей и зоны посадки."],
      ["POS и кухня","Индивидуально","Связанный процесс заказа от зала или кассы до статусов приготовления на кухне."],
      ["Панель управления","Индивидуально","Продажи, расходы, себестоимость, склад, сотрудники, зарплата, отчёты и показатели филиалов."],
      ["Система для сети","Индивидуально","Единая система владельца для нескольких ресторанов, филиалов, ролей и общей отчётности."],
    ],
    orderingEyebrow:"Цифровое меню · Онлайн-заказ", orderingTitle:"Простой заказ с любого устройства.",
    orderingText:"Гость видит красивое меню, выбирает модификаторы, добавляет блюда в корзину и оформляет заказ без звонков и ожидания ответа.",
    bookingEyebrow:"Бронирование", bookingTitle:"Превращайте посещения сайта в забронированные столики.",
    bookingText:"Понятный сценарий позволяет выбрать дату, время, количество гостей и предпочтительную зону прямо на сайте ресторана.",
    systemEyebrow:"Управление рестораном", systemTitle:"Одна система для бизнеса за пределами зала.",
    systemText:"Если ресторану нужен не только маркетинговый сайт, создаём панели для выручки, заказов, расходов, склада, команды, графиков, зарплаты, отчётов и нескольких филиалов.",
    projectsTitle:"Ресторанные проекты",
    projectsText:"Живые ресторанные проекты и продуктовые решения STK Lab. Limoné открывается как полноценный готовый проект; сюда же будем добавлять следующие 3–4 ресторанных кейса.",
    projects:[
      ["Limoné","Средиземноморский ресторан: сезонное меню, пространства, private dining и бронирование.","/images/stk-lab/restaurants/restaurant-website-hero.webp","Живой проект","https://stklab.tilda.ws/lemons"],
      ["Цифровое меню и заказ","Адаптивное меню и прямое оформление заказа.","/images/stk-lab/restaurants/digital-menu-ordering.webp","Концепт продукта",""],
      ["Бронирование столиков","Встроенный booking flow в визуальном стиле ресторана.","/images/stk-lab/restaurants/table-reservation.webp","Концепт продукта",""],
      ["Управление рестораном","Дашборд владельца для продаж, прибыли, филиалов и операций.","/images/stk-lab/restaurants/restaurant-management-dashboard.webp","Бизнес-система",""],
      ["POS + кухня","Связанный процесс заказа между залом и кухней.","/images/stk-lab/restaurants/restaurant-pos-kitchen.webp","Бизнес-система",""],
      ["Мобильный кабинет владельца","Выручка, филиалы, уведомления и ежедневные показатели в телефоне.","/images/stk-lab/restaurants/restaurant-owner-mobile.webp","Бизнес-система",""],
    ],
    processTitle:"От идеи до запуска",
    processText:"Мы строим проект вокруг того, как ресторан реально продаёт и работает, а не вокруг универсального шаблона.",
    process:[
      ["01","Исследование","Концепция, аудитория, меню, филиалы и бизнес-задачи."],
      ["02","Структура","Путь гостя к меню, бронированию, заказу и контакту."],
      ["03","Дизайн","Визуальная система под характер конкретного ресторана."],
      ["04","Разработка","Адаптивная сборка, интеграции и индивидуальный функционал."],
      ["05","Запуск и развитие","Тестирование, запуск и расширение вместе с бизнесом."],
    ],
    packagesTitle:"Выберите подходящий масштаб",
    packagesText:"Финальная стоимость зависит от контента, интеграций, количества филиалов и индивидуального функционала.",
    packages:[
      ["Restaurant Presence","от $700","Брендовый сайт, меню, локация, контакты и переход к бронированию."],
      ["Ordering Experience","от $1,100","Сайт + цифровое меню, онлайн-заказ и продуманный путь гостя."],
      ["Restaurant Platform","Индивидуально","Операционная система, дашборды, филиалы, сотрудники и бизнес-процессы."],
    ],
    faqTitle:"Частые вопросы",
    faqs:[
      ["Можно подключить существующий сервис бронирования?","Да. Можно связать сайт с существующим сервисом или разработать собственный сценарий бронирования."],
      ["Можно принимать заказы прямо на сайте?","Да. Можно сделать цифровое меню, корзину и оформление заказа под процессы ресторана."],
      ["Вы делаете системы для нескольких филиалов?","Да. Филиалы, права доступа, общая отчётность и операционные модули могут работать в одной системе."],
      ["Можно сначала сделать сайт, а системы добавить позже?","Да. Можно начать с публичного сайта, а затем добавить заказы, бронирование или внутреннее управление."],
    ],
    contactEyebrow:"Начать проект", contactTitle:"У вашего ресторана должен быть более сильный цифровой опыт?",
    contactText:"Расскажите о концепции, филиалах и пути гостя, который хотите создать.", contactCta:"Обсудить в WhatsApp",
  }
} as const;

export default function RestaurantIndustryPage({locale}:{locale:Locale}) {
  const t=copy[locale];
  const other=locale==="ru"?"en":"ru";
  const message=encodeURIComponent(locale==="ru"?"Здравствуйте! Хочу обсудить сайт или цифровую систему для ресторана.":"Hello! I'd like to discuss a restaurant website or digital system.");
  return <StkSiteShell>
    <header className="sticky top-0 z-50 border-b border-[color:var(--stk-border)] bg-[color:var(--stk-bg-translucent)] backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8"><Link href={`/${locale}`} className="text-lg font-semibold tracking-[-.03em]">STK Lab</Link><nav className="hidden items-center gap-7 text-sm md:flex"><a href="#services">{t.navServices}</a><a href="#portfolio">{t.navPortfolio}</a><a href="#process">{t.navProcess}</a><a href="#contact">{t.navContact}</a></nav><Link href={`/${other}/industries/restaurants`} className="rounded-full border border-[color:var(--stk-border)] px-3 py-2 text-xs uppercase">{other}</Link></div></header>

    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pb-28 md:pt-24"><StkReveal><div><p className="text-xs font-semibold uppercase tracking-[.25em] text-[#7d6b59]">{t.heroEyebrow}</p><h1 className="mt-6 text-balance text-5xl font-medium tracking-[-.055em] md:text-7xl lg:text-[5rem] lg:leading-[.98]">{t.heroTitle}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--stk-muted)]">{t.heroText}</p><div className="mt-9 flex flex-wrap gap-3"><a href="#portfolio" className="rounded-full bg-[var(--stk-dark)] px-6 py-3.5 text-sm" style={{color:"#fff"}}>{t.heroCta}</a><a href={`${whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className="rounded-full border border-[color:var(--stk-border)] px-6 py-3.5 text-sm" style={{color:"#211d19"}}>{t.heroSecondary}</a></div></div></StkReveal><StkReveal delay={1}><div className="relative aspect-[4/3] overflow-hidden rounded-[var(--stk-radius-card)] bg-[#d7c8b7]"><Image src="/images/stk-lab/restaurants/restaurant-website-hero.webp" alt="Premium restaurant website" fill priority className="object-cover" sizes="(max-width:768px) 95vw, 45vw"/></div></StkReveal></section>

    <section className="border-y border-[color:var(--stk-border)] bg-[color:var(--stk-surface)]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.introTitle}</h2><div className="space-y-6 text-lg leading-8 text-[color:var(--stk-muted)]"><p>{t.intro1}</p><p>{t.intro2}</p></div></div></section>

    <section id="services" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"><div className="max-w-3xl"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.servicesTitle}</h2><p className="mt-6 text-lg leading-8 text-[color:var(--stk-muted)]">{t.servicesText}</p></div><div className="mt-14 grid border-l border-t border-[color:var(--stk-border)] sm:grid-cols-2 lg:grid-cols-3">{t.services.map(([name,price,text],i)=><div key={name} className="min-h-[300px] border-b border-r border-[color:var(--stk-border)] p-7 md:p-9"><div className="flex justify-between gap-4"><span className="text-xs text-[color:var(--stk-faint)]">{String(i+1).padStart(2,"0")}</span><span className="text-sm font-medium">{price}</span></div><h3 className="mt-16 text-2xl tracking-[-.035em]">{name}</h3><p className="mt-4 leading-7 text-[color:var(--stk-muted)]">{text}</p></div>)}</div></section>

    <Feature image="/images/stk-lab/restaurants/digital-menu-ordering.webp" eyebrow={t.orderingEyebrow} title={t.orderingTitle} text={t.orderingText}/>
    <Feature image="/images/stk-lab/restaurants/table-reservation.webp" eyebrow={t.bookingEyebrow} title={t.bookingTitle} text={t.bookingText} reverse/>
    <Feature image="/images/stk-lab/restaurants/restaurant-management-dashboard.webp" eyebrow={t.systemEyebrow} title={t.systemTitle} text={t.systemText} dark/>

    <section id="portfolio" className="bg-[var(--stk-surface-strong)] py-24 md:py-32"><div className="mx-auto max-w-7xl px-5 md:px-8"><div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.24em] text-[#806d59]">Portfolio</p><h2 className="mt-4 text-4xl tracking-[-.045em] md:text-6xl">{t.projectsTitle}</h2><p className="mt-6 text-lg leading-8 text-[color:var(--stk-muted)]">{t.projectsText}</p></div><div className="mt-14 grid gap-5 md:grid-cols-2">{t.projects.map(([name,desc,img,status,url],i)=>{const card=<div className="group h-full overflow-hidden rounded-[var(--stk-radius-card)] border border-[color:var(--stk-border)] bg-[#f5f0e8]"><div className={`relative overflow-hidden ${i===0?"aspect-[16/8]":"aspect-[16/10]"}`}><Image src={img} alt={name} fill className="object-cover transition duration-700 group-hover:scale-[1.03]" sizes="(max-width:768px) 95vw, 48vw"/><span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-xs backdrop-blur">{status}</span></div><div className="p-6 md:p-8"><h3 className="text-3xl tracking-[-.04em]">{name}</h3><p className="mt-3 leading-7 text-[color:var(--stk-muted)]">{desc}</p>{url&&<div className="mt-6 text-sm font-medium">{locale==="ru"?"Открыть проект":"View live project"} →</div>}</div></div>;return url?<a key={name} href={url} target="_blank" rel="noreferrer" className={i===0?"md:col-span-2":""}>{card}</a>:<div key={name}>{card}</div>})}</div></div></section>

    <section id="process" className="bg-[var(--stk-accent-soft)] py-24 md:py-32"><div className="mx-auto max-w-7xl px-5 md:px-8"><div className="grid gap-8 md:grid-cols-2"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.processTitle}</h2><p className="max-w-xl text-lg leading-8 text-[color:var(--stk-muted)]">{t.processText}</p></div><div className="mt-16 divide-y divide-black/15 border-y border-[color:var(--stk-border)]">{t.process.map(([num,name,text])=><div key={num} className="grid gap-4 py-8 md:grid-cols-[100px_1fr_1.4fr]"><span className="text-sm text-[color:var(--stk-faint)]">{num}</span><h3 className="text-2xl tracking-[-.035em]">{name}</h3><p className="max-w-xl leading-7 text-[color:var(--stk-muted)]">{text}</p></div>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"><div className="max-w-3xl"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.packagesTitle}</h2><p className="mt-6 text-lg leading-8 text-[color:var(--stk-muted)]">{t.packagesText}</p></div><div className="mt-14 grid gap-5 lg:grid-cols-3">{t.packages.map(([name,price,text],i)=><div key={name} className={`rounded-[var(--stk-radius-card)] border p-8 ${i===2?"border-[#25221e] bg-[var(--stk-dark)] text-white":"border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)]"}`}><p className={`text-xs uppercase tracking-[.2em] ${i===2?"text-white/50":"text-[color:var(--stk-faint)]"}`}>STK Lab</p><h3 className="mt-10 text-3xl tracking-[-.04em]">{name}</h3><div className="mt-5 text-5xl tracking-[-.05em]">{price}</div><p className={`mt-6 leading-7 ${i===2?"text-white/60":"text-[color:var(--stk-muted)]"}`}>{text}</p><a href={`${whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className={`mt-10 inline-flex rounded-full px-5 py-3 text-sm ${i===2?"bg-white":"bg-[var(--stk-dark)]"}`} style={{color:i===2?"#000":"#fff"}}>{t.contactCta}</a></div>)}</div></section>

    <section className="border-y border-[color:var(--stk-border)] bg-[var(--stk-surface-strong)] py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.75fr_1.25fr] md:px-8"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.faqTitle}</h2><div className="divide-y divide-black/10 border-y border-[color:var(--stk-border)]">{t.faqs.map(([q,a])=><details key={q} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-xl"><span>{q}</span><span className="text-[color:var(--stk-faint)] transition group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-2 pt-5 leading-7 text-[color:var(--stk-muted)]">{a}</p></details>)}</div></div></section>

    <section aria-label={locale==="ru"?"Другие направления STK Lab":"Other STK Lab industries"} className="border-t border-[color:var(--stk-border)]"><div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.24em] text-[color:var(--stk-muted-strong)]">{locale==="ru"?"Другие направления":"Other industries"}</p><h2 className="mt-4 text-3xl tracking-[-.04em] md:text-5xl">{locale==="ru"?"Посмотрите другие решения STK Lab":"Explore other STK Lab solutions"}</h2></div><Link href={`/${locale}`} className="text-sm font-medium">{locale==="ru"?"На главную STK Lab":"STK Lab home"} →</Link></div><div className="mt-10 grid gap-3 sm:grid-cols-2"><Link href={`/${locale}/industries/bakeries`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Пекарни и кондитерские":"Bakeries & Cake Studios"}</span><span aria-hidden="true">→</span></Link><Link href={`/${locale}/industries/beauty`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Beauty и салоны":"Beauty & Salons"}</span><span aria-hidden="true">→</span></Link><Link href={`/${locale}/industries/travel`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Travel":"Travel"}</span><span aria-hidden="true">→</span></Link><Link href={`/${locale}/industries/business-platforms`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Бизнес-платформы":"Business Platforms"}</span><span aria-hidden="true">→</span></Link></div></div></section>

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
  return <section className={dark?"bg-[var(--stk-dark)] text-white":"border-t border-[color:var(--stk-border)]"}><div className={`mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-28 ${reverse?"":""}`}><div className={`relative aspect-[4/3] overflow-hidden rounded-[var(--stk-radius-card)] ${reverse?"md:order-2":""}`}><Image src={image} alt={title} fill className="object-cover" sizes="(max-width:768px) 95vw, 45vw"/></div><div className={reverse?"md:order-1":""}><p className={`text-xs font-semibold uppercase tracking-[.24em] ${dark?"text-white/45":"text-[#806d59]"}`}>{eyebrow}</p><h2 className="mt-5 text-4xl tracking-[-.045em] md:text-6xl">{title}</h2><p className={`mt-7 max-w-xl text-lg leading-8 ${dark?"text-white/65":"text-[color:var(--stk-muted)]"}`}>{text}</p></div></div></section>
}