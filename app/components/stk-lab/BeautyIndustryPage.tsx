import Image from "next/image";
import Link from "next/link";
import StkSiteShell from "./design/StkSiteShell";
import StkReveal from "./design/StkReveal";
import StkLeadForm from "./StkLeadForm";

type Locale = "ru" | "en";
const whatsapp = "https://wa.me/77471818493";

const copy = {
  en: {
    eyebrow:"Websites & digital systems for beauty businesses",
    title:"Beauty websites that turn attention into appointments and loyal clients.",
    text:"Premium websites and custom systems for salons, studios and aesthetic businesses — services, online booking, staff schedules, CRM, analytics and owner dashboards.",
    primary:"Explore beauty solutions", secondary:"Discuss a project",
    introTitle:"A beautiful brand should also be easy to book.",
    introText:"We connect editorial design with the practical tools a beauty business needs: clear services and pricing, frictionless booking, client management, team schedules and business analytics.",
    servicesTitle:"Digital solutions for beauty businesses",
    services:[
      ["Beauty Website","from $650","Premium responsive website with services, specialists, pricing, gallery, contacts and booking calls to action."],
      ["Online Booking","from $350","Service, specialist, date and time selection in a clean branded booking flow."],
      ["Services Catalogue","from $300","Elegant mobile-first catalogue with categories, duration, prices and direct booking."],
      ["CRM & Client Management","Custom","Appointments, client history, statuses, retention and operational workflows."],
      ["Staff Schedule","Custom","Weekly calendars, shifts, availability, breaks and appointment workload."],
      ["Owner Dashboard","Custom","Revenue, occupancy, specialists, returning clients, alerts and performance analytics."],
    ],
    bookingEyebrow:"Online Booking", bookingTitle:"Let clients book without messages and phone calls.",
    bookingText:"A branded booking flow helps clients choose a treatment, specialist, date and available time in a few clear steps.",
    catalogueEyebrow:"Services & Pricing", catalogueTitle:"Turn the price list into a premium digital catalogue.",
    catalogueText:"Services are easy to explore by category, with duration, pricing and a direct path to booking on desktop and mobile.",
    systemEyebrow:"Beauty CRM", systemTitle:"Manage the business behind the appointments.",
    systemText:"For growing studios we can build CRM, appointment management, client records, revenue analytics, team performance, inventory and reporting.",
    portfolioTitle:"Beauty websites you can explore",
    portfolioText:"Four distinct demo experiences: a calm spa, a refined salon, an evidence-based cosmetology clinic and a fearless creative color studio.",
    portfolio:[
      ["Serena Spa & Wellness","Premium wellness website with rituals, programs, gift certificates and booking.","/images/stk-lab/beauty/demos/sora-spa-hero-v2.webp","Open demo","spa-demo"],
      ["Muse Hair & Beauty","Modern salon website with services, prices, artists, portfolio and online booking.","/images/stk-lab/beauty/demos/muse-salon-hero-v2.webp","Open demo","beauty-salon-demo"],
      ["Aurea Cosmetology","Clinical beauty website focused on skin diagnostics, transparent protocols and specialist trust.","/images/stk-lab/beauty/demos/aurea-clinic-hero-v2.webp","Open demo","cosmetology-demo"],
      ["VOLT Color Studio","Audacious creative salon website for vivid color, graphic cuts and editorial looks.","/images/stk-lab/beauty/demos/volt-salon-hero-v2.webp","Open demo","color-salon-demo"],
    ],
    processTitle:"From concept to launch",
    process:[
      ["01","Discovery","Brand, services, audience, specialists and business goals."],
      ["02","Structure","Client journey from discovery to service selection and booking."],
      ["03","Design","Premium visual direction tailored to the beauty brand."],
      ["04","Development","Responsive website, booking flow and required integrations."],
      ["05","Launch & Growth","Testing, launch and expansion into CRM or management tools."],
    ],
    packagesTitle:"Choose the right starting point",
    packages:[
      ["Beauty Presence","from $650","Brand website, services, pricing, specialists and booking CTA."],
      ["Booking Experience","from $950","Website plus services catalogue and branded appointment flow."],
      ["Beauty Platform","Custom","CRM, schedules, client management, analytics and owner tools."],
    ],
    faqTitle:"FAQ",
    faqs:[
      ["Can you connect our existing booking service?","Yes. We can link or integrate an existing booking service, or build a custom branded flow when needed."],
      ["Can clients choose a specific specialist?","Yes. Booking can include service, specialist, date, time, duration and other business-specific options."],
      ["Can the system manage staff schedules?","Yes. We can build schedules, shifts, availability, breaks and appointment workload for the team."],
      ["Can we start with a website and add CRM later?","Yes. The public website can launch first and internal management tools can be added as the business grows."],
    ],
    contactEyebrow:"Start a project", contactTitle:"Ready to give your beauty business a stronger digital experience?",
    contactText:"Tell us about your studio, services and how clients currently book.", contactCta:"Discuss on WhatsApp",
  },
  ru: {
    eyebrow:"Сайты и цифровые системы для beauty-бизнеса",
    title:"Beauty-сайты, которые превращают внимание в записи и постоянных клиентов.",
    text:"Премиальные сайты и индивидуальные системы для салонов, студий и эстетических проектов: услуги, онлайн-запись, расписание мастеров, CRM, аналитика и кабинет владельца.",
    primary:"Смотреть beauty-решения", secondary:"Обсудить проект",
    introTitle:"Красивый бренд должен быть ещё и удобным для записи.",
    introText:"Мы соединяем editorial-дизайн с инструментами, которые нужны beauty-бизнесу: понятные услуги и цены, быстрая запись, управление клиентами, расписание команды и бизнес-аналитика.",
    servicesTitle:"Цифровые решения для beauty-бизнеса",
    services:[
      ["Сайт салона","от $650","Премиальный адаптивный сайт с услугами, мастерами, ценами, галереей, контактами и записью."],
      ["Онлайн-запись","от $350","Выбор услуги, мастера, даты и времени в аккуратном branded booking flow."],
      ["Каталог услуг","от $300","Красивый mobile-first каталог с категориями, длительностью, ценами и переходом к записи."],
      ["CRM и клиенты","Индивидуально","Записи, история клиентов, статусы, возвратность и операционные процессы."],
      ["Расписание мастеров","Индивидуально","Недельный календарь, смены, свободные окна, перерывы и загрузка."],
      ["Кабинет владельца","Индивидуально","Выручка, загрузка, мастера, постоянные клиенты, уведомления и аналитика."],
    ],
    bookingEyebrow:"Онлайн-запись", bookingTitle:"Клиент записывается без переписки и звонков.",
    bookingText:"Фирменный сценарий записи позволяет за несколько понятных шагов выбрать процедуру, мастера, дату и свободное время.",
    catalogueEyebrow:"Услуги и цены", catalogueTitle:"Превратите обычный прайс в премиальный цифровой каталог.",
    catalogueText:"Услуги удобно изучать по категориям, видеть длительность и стоимость и сразу переходить к записи с телефона или компьютера.",
    systemEyebrow:"Beauty CRM", systemTitle:"Управляйте бизнесом за пределами календаря записей.",
    systemText:"Для растущих студий можем создать CRM, управление записями и клиентами, аналитику выручки, показатели мастеров, склад и отчётность.",
    portfolioTitle:"Beauty-сайты, которые можно открыть",
    portfolioText:"Четыре совершенно разные демо-версии: спокойный SPA, элегантный салон, доказательная косметология и дерзкая студия креативного цвета.",
    portfolio:[
      ["Serena Spa & Wellness","Премиальный wellness-сайт с ритуалами, программами, сертификатами и записью.","/images/stk-lab/beauty/demos/sora-spa-hero-v2.webp","Открыть демо","spa-demo"],
      ["Muse Hair & Beauty","Современный сайт салона с услугами, ценами, мастерами, работами и онлайн-записью.","/images/stk-lab/beauty/demos/muse-salon-hero-v2.webp","Открыть демо","beauty-salon-demo"],
      ["Aurea Cosmetology","Клинический beauty-сайт с диагностикой кожи, понятными протоколами и акцентом на доверие.","/images/stk-lab/beauty/demos/aurea-clinic-hero-v2.webp","Открыть демо","cosmetology-demo"],
      ["VOLT Color Studio","Дерзкий сайт креативного салона с ярким цветом, графичными стрижками и editorial-образами.","/images/stk-lab/beauty/demos/volt-salon-hero-v2.webp","Открыть демо","color-salon-demo"],
    ],
    processTitle:"От идеи до запуска",
    process:[
      ["01","Исследование","Бренд, услуги, аудитория, мастера и бизнес-задачи."],
      ["02","Структура","Путь клиента от знакомства до выбора услуги и записи."],
      ["03","Дизайн","Премиальная визуальная система под характер beauty-бренда."],
      ["04","Разработка","Адаптивный сайт, booking flow и необходимые интеграции."],
      ["05","Запуск и развитие","Тестирование, запуск и дальнейшее расширение до CRM и систем управления."],
    ],
    packagesTitle:"Выберите подходящий старт",
    packages:[
      ["Beauty Presence","от $650","Брендовый сайт, услуги, цены, мастера и переход к записи."],
      ["Booking Experience","от $950","Сайт + каталог услуг + фирменный сценарий онлайн-записи."],
      ["Beauty Platform","Индивидуально","CRM, расписание, клиенты, аналитика и инструменты владельца."],
    ],
    faqTitle:"Частые вопросы",
    faqs:[
      ["Можно подключить наш существующий сервис записи?","Да. Можно связать сайт с существующим сервисом или создать собственный фирменный сценарий записи."],
      ["Клиент сможет выбирать конкретного мастера?","Да. В запись можно включить услугу, мастера, дату, время, длительность и другие необходимые параметры."],
      ["Можно управлять расписанием сотрудников?","Да. Можно сделать смены, рабочие часы, свободные окна, перерывы и загрузку каждого мастера."],
      ["Можно сначала сделать сайт, а CRM добавить позже?","Да. Сначала запускаем публичный сайт, а внутренние инструменты добавляем по мере роста бизнеса."],
    ],
    contactEyebrow:"Начать проект", contactTitle:"Вашему beauty-бизнесу нужен более сильный цифровой опыт?",
    contactText:"Расскажите о студии, услугах и о том, как сейчас происходит запись клиентов.", contactCta:"Обсудить в WhatsApp",
  }
} as const;

export default function BeautyIndustryPage({locale}:{locale:Locale}) {
  const t=copy[locale], other=locale==="ru"?"en":"ru";
  const message=encodeURIComponent(locale==="ru"?"Здравствуйте! Хочу обсудить сайт или систему для beauty-бизнеса.":"Hello! I'd like to discuss a website or system for a beauty business.");
  return <StkSiteShell>
    <header className="sticky top-0 z-50 border-b border-[color:var(--stk-border)] bg-[color:var(--stk-bg-translucent)] backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8"><Link href={`/${locale}`} className="text-lg font-semibold tracking-[-.03em]">STK Lab</Link><nav className="hidden gap-7 text-sm md:flex"><a href="#services">{locale==="ru"?"Решения":"Solutions"}</a><a href="#portfolio">{locale==="ru"?"Работы":"Portfolio"}</a><a href="#process">{locale==="ru"?"Процесс":"Process"}</a><a href="#contact">{locale==="ru"?"Контакты":"Contact"}</a></nav><Link href={`/${other}/industries/beauty`} className="rounded-full border border-[color:var(--stk-border)] px-3 py-2 text-xs uppercase">{other}</Link></div></header>

    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pb-28 md:pt-24"><StkReveal><div><p className="text-xs font-semibold uppercase tracking-[.25em] text-[color:var(--stk-muted-strong)]">{t.eyebrow}</p><h1 className="mt-6 text-balance text-5xl font-medium tracking-[-.055em] md:text-7xl lg:text-[5rem] lg:leading-[.98]">{t.title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--stk-muted)]">{t.text}</p><div className="mt-9 flex flex-wrap gap-3"><a href="#services" className="rounded-full bg-[var(--stk-dark)] px-6 py-3.5 text-sm" style={{color:"#fff"}}>{t.primary}</a><a href={`${whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className="rounded-full border border-[color:var(--stk-border)] px-6 py-3.5 text-sm" style={{color:"var(--stk-text)"}}>{t.secondary}</a></div></div></StkReveal><StkReveal delay={1}><div className="relative aspect-[4/3] overflow-hidden rounded-[var(--stk-radius-card)] bg-[var(--stk-media-bg)]"><Image src="/images/stk-lab/beauty/beauty-website-hero.webp" alt="Premium beauty website" fill priority className="object-cover" sizes="(max-width:768px) 95vw, 45vw"/></div></StkReveal></section>

    <section className="border-y border-[color:var(--stk-border)] bg-[color:var(--stk-surface)]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.introTitle}</h2><p className="text-lg leading-8 text-[color:var(--stk-muted)]">{t.introText}</p></div></section>

    <section id="services" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"><h2 className="max-w-3xl text-4xl tracking-[-.045em] md:text-6xl">{t.servicesTitle}</h2><div className="mt-14 grid border-l border-t border-[color:var(--stk-border)] sm:grid-cols-2 lg:grid-cols-3">{t.services.map(([name,price,text],i)=><div key={name} className="min-h-[300px] border-b border-r border-[color:var(--stk-border)] p-7 md:p-9"><div className="flex justify-between gap-4"><span className="text-xs text-[color:var(--stk-faint)]">{String(i+1).padStart(2,"0")}</span><span className="text-sm font-medium">{price}</span></div><h3 className="mt-16 text-2xl tracking-[-.035em]">{name}</h3><p className="mt-4 leading-7 text-[color:var(--stk-muted)]">{text}</p></div>)}</div></section>

    <Feature image="/images/stk-lab/beauty/beauty-online-booking.webp" eyebrow={t.bookingEyebrow} title={t.bookingTitle} text={t.bookingText}/>
    <Feature image="/images/stk-lab/beauty/beauty-services-catalogue.webp" eyebrow={t.catalogueEyebrow} title={t.catalogueTitle} text={t.catalogueText} reverse/>
    <Feature image="/images/stk-lab/beauty/beauty-crm-dashboard.webp" eyebrow={t.systemEyebrow} title={t.systemTitle} text={t.systemText} dark/>

    <section id="portfolio" className="bg-[var(--stk-surface-strong)] py-24 md:py-32"><div className="mx-auto max-w-7xl px-5 md:px-8"><p className="text-xs font-semibold uppercase tracking-[.24em] text-[color:var(--stk-muted-strong)]">{locale==="ru"?"4 доступных проекта":"4 available projects"}</p><h2 className="mt-4 text-4xl tracking-[-.045em] md:text-6xl">{t.portfolioTitle}</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--stk-muted)]">{t.portfolioText}</p><div className="mt-14 grid gap-5 md:grid-cols-2">{t.portfolio.map(([name,desc,img,status,route])=><Link key={name} href={`/${locale}/${route}`} target="_blank" className="group overflow-hidden rounded-[var(--stk-radius-card)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)]"><div className="relative aspect-[16/10] overflow-hidden"><Image src={img} alt={name} fill className="object-cover transition duration-700 group-hover:scale-[1.03]" sizes="(max-width:768px) 95vw, 48vw"/><span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-xs text-black">{status}</span></div><div className="p-6 md:p-8"><h3 className="text-3xl tracking-[-.04em]">{name}</h3><p className="mt-3 leading-7 text-[color:var(--stk-muted)]">{desc}</p><div className="mt-6 text-sm font-medium">{locale==="ru"?"Открыть сайт":"Open website"} →</div></div></Link>)}</div></div></section>

    <section id="process" className="bg-[var(--stk-accent-soft)] py-24 md:py-32"><div className="mx-auto max-w-7xl px-5 md:px-8"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.processTitle}</h2><div className="mt-16 divide-y divide-[color:var(--stk-border)] border-y border-[color:var(--stk-border)]">{t.process.map(([num,name,text])=><div key={num} className="grid gap-4 py-8 md:grid-cols-[100px_1fr_1.4fr]"><span className="text-sm text-[color:var(--stk-faint)]">{num}</span><h3 className="text-2xl">{name}</h3><p className="leading-7 text-[color:var(--stk-muted)]">{text}</p></div>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.packagesTitle}</h2><div className="mt-14 grid gap-5 lg:grid-cols-3">{t.packages.map(([name,price,text],i)=><div key={name} className={`rounded-[var(--stk-radius-card)] border p-8 ${i===2?"border-[var(--stk-dark)] bg-[var(--stk-dark)] text-white":"border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)]"}`}><p className={`text-xs uppercase tracking-[.2em] ${i===2?"text-white/50":"text-[color:var(--stk-faint)]"}`}>STK Lab</p><h3 className="mt-10 text-3xl">{name}</h3><div className={`mt-5 max-w-full break-words tracking-[-.05em] leading-[1.02] ${i===2?"text-3xl sm:text-4xl":"text-4xl sm:text-5xl"}`}>{price}</div><p className={`mt-6 leading-7 ${i===2?"text-white/60":"text-[color:var(--stk-muted)]"}`}>{text}</p><a href={`${whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className={`mt-10 inline-flex rounded-full px-5 py-3 text-sm ${i===2?"bg-white":"bg-[var(--stk-dark)]"}`} style={{color:i===2?"#000":"#fff"}}>{t.contactCta}</a></div>)}</div></section>

    <section className="border-y border-[color:var(--stk-border)] bg-[var(--stk-surface-strong)] py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.75fr_1.25fr] md:px-8"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.faqTitle}</h2><div className="divide-y divide-[color:var(--stk-border)] border-y border-[color:var(--stk-border)]">{t.faqs.map(([q,a])=><details key={q} className="group py-6"><summary className="flex cursor-pointer list-none justify-between gap-5 text-xl"><span>{q}</span><span className="transition group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-5 leading-7 text-[color:var(--stk-muted)]">{a}</p></details>)}</div></div></section>

    <section aria-label={locale==="ru"?"Другие направления STK Lab":"Other STK Lab industries"} className="border-t border-[color:var(--stk-border)]"><div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.24em] text-[color:var(--stk-muted-strong)]">{locale==="ru"?"Другие направления":"Other industries"}</p><h2 className="mt-4 text-3xl tracking-[-.04em] md:text-5xl">{locale==="ru"?"Посмотрите другие решения STK Lab":"Explore other STK Lab solutions"}</h2></div><Link href={`/${locale}`} className="text-sm font-medium">{locale==="ru"?"На главную STK Lab":"STK Lab home"} →</Link></div><div className="mt-10 grid gap-3 sm:grid-cols-2"><Link href={`/${locale}/industries/bakeries`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Пекарни и кондитерские":"Bakeries & Cake Studios"}</span><span aria-hidden="true">→</span></Link><Link href={`/${locale}/industries/restaurants`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Рестораны":"Restaurants"}</span><span aria-hidden="true">→</span></Link><Link href={`/${locale}/industries/travel`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Travel":"Travel"}</span><span aria-hidden="true">→</span></Link><Link href={`/${locale}/industries/business-platforms`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Бизнес-платформы":"Business Platforms"}</span><span aria-hidden="true">→</span></Link></div></div></section>

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
