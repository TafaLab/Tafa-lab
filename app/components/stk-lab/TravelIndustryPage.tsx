import Image from "next/image";
import Link from "next/link";
import StkSiteShell from "./design/StkSiteShell";
import StkReveal from "./design/StkReveal";
import StkLeadForm from "./StkLeadForm";
import TafaLabLogo from "./TafaLabLogo";
import TravelIdeasSection from "./TravelIdeasSection";
import FullPriceLink from "./FullPriceLink";

type Locale = "ru" | "en";
const whatsapp = "https://wa.me/77471818493";

const copy = {
  en: {
    eyebrow: "Websites & digital systems for travel businesses",
    title:
      "Travel websites that turn inspiration into carefully planned journeys.",
    text: "Premium websites and custom travel systems for agencies, tour operators and bespoke travel companies — trip builders, itineraries, bookings, CRM, operations and digital concierge experiences.",
    primary: "View travel websites",
    secondary: "Discuss a project",
    introTitle:
      "From the first idea to the final transfer — one connected digital journey.",
    introText:
      "We combine destination-led editorial design with practical travel technology, helping clients discover, plan and experience a trip while giving the travel team control over requests, bookings, payments and operations.",
    servicesTitle: "Digital solutions for travel companies",
    services: [
      [
        "Travel Website",
        "from $800",
        "Premium responsive website with destinations, experiences, hotels, private tours and enquiry flows.",
      ],
      [
        "Custom Trip Builder",
        "from $650",
        "Interactive journey builder for dates, travelers, hotels, experiences, transfers and special requests.",
      ],
      [
        "Digital Itinerary",
        "from $450",
        "Beautiful day-by-day itinerary with reservations, locations, transfers and trip information.",
      ],
      [
        "Tour Operator API Integration",
        "Custom",
        "Live tours, departure dates, prices and availability from connected tour operators — searchable directly on your website.",
      ],
      [
        "Travel CRM",
        "Custom",
        "Requests, clients, trips, bookings, payments, managers, statuses and business analytics.",
      ],
      [
        "Bookings & Operations",
        "Custom",
        "Hotels, transfers, tours, supplier confirmations, costs, margins and operational checklists.",
      ],
      [
        "Digital Concierge",
        "Custom",
        "Mobile traveler experience with today's plan, documents, alerts, transfers and concierge access.",
      ],
    ],
    builderEyebrow: "Custom Trip Builder",
    builderTitle: "Let clients shape the journey before they send the request.",
    builderText:
      "A guided trip builder collects destination, dates, travelers, hotel preferences, experiences, transfers and special requests in one premium flow.",
    apiEyebrow: "Live Tour Inventory",
    apiTitle: "Show tours that are actually available — without updating the website by hand.",
    apiText:
      "We can connect tour operator APIs so the catalogue receives current packages, departure dates, prices, remaining availability and booking statuses. Clients search and compare live offers on your website, then send an enquiry or continue to booking.",
    apiPoints: ["Live tours and departures", "Current prices and availability", "Filters and AI-assisted matching", "Enquiry or booking handoff"],
    itineraryEyebrow: "Interactive Itinerary",
    itineraryTitle: "Put the entire journey in one elegant digital space.",
    itineraryText:
      "Hotels, restaurants, activities, transfers, reservations and daily plans stay organized and easy to access throughout the trip.",
    crmEyebrow: "Travel CRM",
    crmTitle: "Manage every trip from first request to return home.",
    crmText:
      "For travel teams we can build CRM and operations tools for enquiries, clients, bookings, payments, suppliers, trip statuses, margins and reporting.",
    portfolioTitle: "Websites for travel businesses",
    portfolioText:
      "This is the main Tafa Lab travel collection: a destination platform, a bespoke agency, an extreme expedition company and a travel hacking academy.",
    portfolio: [
      [
        "STK Travel",
        "Travel guide platform with destination guides, practical articles and consultation flow.",
        "/images/stk-lab/travel/travel-website-hero-v2.webp",
        "Live project",
        "https://stk-labs.tilda.ws",
      ],
      [
        "Velaria Travel",
        "Premium bespoke travel agency demo with curated journeys and digital concierge.",
        "/images/stk-lab/travel/velaria/velaria-hero.webp",
        "Open demo",
        "travel-demo",
      ],
      [
        "Altitude Expeditions",
        "Extreme and sports expedition website featuring the Himalayas, Amazon, Patagonia and Arctic journeys.",
        "/images/stk-lab/travel/altitude/altitude-hero.webp",
        "Open demo",
        "expedition-demo",
      ],
      [
        "Milewise Academy",
        "Travel hacking education platform covering fares, miles, loyalty programs and complex itineraries.",
        "/images/stk-lab/travel/milewise/milewise-hero.webp",
        "Open demo",
        "travel-hacking-demo",
      ],
    ],
    processTitle: "From concept to launch",
    process: [
      [
        "01",
        "Discovery",
        "Destinations, audience, products, sales process and operational needs.",
      ],
      [
        "02",
        "Journey Design",
        "From inspiration and enquiry to itinerary, payment and travel.",
      ],
      [
        "03",
        "Visual Direction",
        "Premium editorial design tailored to the travel brand.",
      ],
      [
        "04",
        "Development",
        "Responsive build, custom flows, integrations and internal systems.",
      ],
      [
        "05",
        "Launch & Growth",
        "Testing, launch and expansion into CRM, operations or concierge tools.",
      ],
    ],
    packagesTitle: "Choose the right starting point",
    packages: [
      [
        "Travel Presence",
        "from $800",
        "Brand website, destinations, experiences, enquiry and contact flow.",
      ],
      [
        "Journey Experience",
        "from $2,000",
        "Website plus trip builder and digital itinerary experience.",
      ],
      [
        "Travel Platform",
        "from $4,000",
        "CRM, bookings, operations, payments, analytics and traveler tools.",
      ],
    ],
    faqTitle: "FAQ",
    faqs: [
      [
        "Can the website collect custom trip requests?",
        "Yes. We can create structured enquiry or trip-builder flows around the way your company plans journeys.",
      ],
      [
        "Can the website show live tours from tour operators?",
        "Yes. When a tour operator provides API access, the website can automatically display current tours, departure dates, prices and availability. Sold-out or unavailable offers can be hidden or marked without manual catalogue updates.",
      ],
      [
        "Can clients receive a digital itinerary?",
        "Yes. It can include daily plans, hotels, restaurants, transfers, activities, reservations and important documents.",
      ],
      [
        "Can the system manage supplier bookings and payments?",
        "Yes. Internal tools can track suppliers, confirmations, costs, client payments, outstanding balances and margins.",
      ],
      [
        "Can we start with a website and add CRM later?",
        "Yes. The public website can launch first and the internal travel platform can be expanded later.",
      ],
    ],
    contactEyebrow: "Start a project",
    contactTitle:
      "Ready to create a stronger digital journey for your travel business?",
    contactText:
      "Tell us how you sell trips today and which parts of the client or operations journey you want to improve.",
    contactCta: "Discuss on WhatsApp",
  },
  ru: {
    eyebrow: "Сайты и цифровые системы для travel-бизнеса",
    title:
      "Travel-сайты, которые превращают вдохновение в продуманное путешествие.",
    text: "Премиальные сайты и индивидуальные системы для агентств, туроператоров и travel-компаний: конструктор поездки, маршруты, бронирования, CRM, операционное управление и digital concierge.",
    primary: "Смотреть travel-сайты",
    secondary: "Обсудить проект",
    introTitle:
      "От первой идеи до последнего трансфера — один связанный цифровой путь.",
    introText:
      "Мы соединяем эмоциональный дизайн направлений с практичными travel-технологиями: клиенту удобно выбирать и планировать поездку, а команда контролирует заявки, бронирования, оплаты и операции.",
    servicesTitle: "Цифровые решения для travel-компаний",
    services: [
      [
        "Travel-сайт",
        "от $800",
        "Премиальный адаптивный сайт с направлениями, впечатлениями, отелями, частными турами и заявками.",
      ],
      [
        "Конструктор путешествия",
        "от $650",
        "Интерактивный выбор дат, путешественников, отеля, активностей, трансферов и пожеланий.",
      ],
      [
        "Цифровой маршрут",
        "от $450",
        "Красивый маршрут по дням с бронированиями, локациями, трансферами и информацией о поездке.",
      ],
      [
        "Интеграция API туроператоров",
        "Индивидуально",
        "Актуальные туры, даты вылетов, цены и наличие из систем подключённых туроператоров — с поиском прямо на вашем сайте.",
      ],
      [
        "Travel CRM",
        "Индивидуально",
        "Заявки, клиенты, поездки, бронирования, оплаты, менеджеры, статусы и аналитика.",
      ],
      [
        "Бронирования и операции",
        "Индивидуально",
        "Отели, трансферы, экскурсии, подтверждения поставщиков, расходы, маржа и чек-листы.",
      ],
      [
        "Digital Concierge",
        "Индивидуально",
        "Мобильный кабинет путешественника: план дня, документы, уведомления, трансферы и связь с менеджером.",
      ],
    ],
    builderEyebrow: "Конструктор путешествия",
    builderTitle: "Клиент формирует поездку ещё до отправки заявки.",
    builderText:
      "Пошаговый конструктор собирает направление, даты, количество путешественников, отель, впечатления, трансферы и особые пожелания в одном премиальном сценарии.",
    apiEyebrow: "Актуальная база туров",
    apiTitle: "Показывайте только те туры, которые действительно доступны сейчас.",
    apiText:
      "Мы можем подключить API туроператоров: сайт автоматически получает актуальные туры, даты вылетов, цены, количество доступных мест и статусы бронирования. Клиент ищет и сравнивает предложения на вашем сайте, а затем оставляет заявку или переходит к бронированию.",
    apiPoints: ["Актуальные туры и даты", "Текущие цены и наличие", "Фильтры и AI-подбор", "Заявка или переход к бронированию"],
    itineraryEyebrow: "Интерактивный маршрут",
    itineraryTitle: "Всё путешествие — в одном красивом цифровом пространстве.",
    itineraryText:
      "Отели, рестораны, активности, трансферы, бронирования и планы по дням организованы и доступны клиенту на протяжении всей поездки.",
    crmEyebrow: "Travel CRM",
    crmTitle:
      "Управляйте каждой поездкой от первой заявки до возвращения клиента.",
    crmText:
      "Для travel-команд можем создать CRM и операционные инструменты для заявок, клиентов, бронирований, оплат, поставщиков, статусов поездки, маржи и отчётности.",
    portfolioTitle: "Сайты для туристического бизнеса",
    portfolioText:
      "Это общая витрина travel-направления Tafa Lab: платформа направлений, агентство индивидуальных путешествий, компания экстремальных экспедиций и школа travel hacking.",
    portfolio: [
      [
        "STK Travel",
        "Travel-платформа с гайдами по направлениям, полезными статьями и консультациями.",
        "/images/stk-lab/travel/travel-website-hero-v2.webp",
        "Живой проект",
        "https://stk-labs.tilda.ws",
      ],
      [
        "Velaria Travel",
        "Премиальный демо-сайт агентства индивидуальных путешествий с маршрутами и digital concierge.",
        "/images/stk-lab/travel/velaria/velaria-hero.webp",
        "Открыть демо",
        "travel-demo",
      ],
      [
        "Altitude Expeditions",
        "Сайт экстремальных и спортивных экспедиций: Гималаи, Амазония, Патагония и Арктика.",
        "/images/stk-lab/travel/altitude/altitude-hero.webp",
        "Открыть демо",
        "expedition-demo",
      ],
      [
        "Milewise Academy",
        "Образовательная платформа по travel hacking: тарифы, мили, бонусные программы и сложные маршруты.",
        "/images/stk-lab/travel/milewise/milewise-hero.webp",
        "Открыть демо",
        "travel-hacking-demo",
      ],
    ],
    processTitle: "От идеи до запуска",
    process: [
      [
        "01",
        "Исследование",
        "Направления, аудитория, продукты, продажи и операционные задачи.",
      ],
      [
        "02",
        "Путь клиента",
        "От вдохновения и заявки до маршрута, оплаты и самой поездки.",
      ],
      [
        "03",
        "Визуальная система",
        "Премиальный editorial-дизайн под характер travel-бренда.",
      ],
      [
        "04",
        "Разработка",
        "Адаптивный сайт, индивидуальные сценарии, интеграции и внутренние системы.",
      ],
      [
        "05",
        "Запуск и развитие",
        "Тестирование, запуск и расширение до CRM, операций и concierge-инструментов.",
      ],
    ],
    packagesTitle: "Выберите подходящий старт",
    packages: [
      [
        "Travel Presence",
        "от $800",
        "Брендовый сайт, направления, впечатления, заявки и контакты.",
      ],
      [
        "Journey Experience",
        "от $2,000",
        "Сайт + конструктор путешествия + цифровой маршрут.",
      ],
      [
        "Travel Platform",
        "от $4,000",
        "CRM, бронирования, операции, оплаты, аналитика и инструменты путешественника.",
      ],
    ],
    faqTitle: "Частые вопросы",
    faqs: [
      [
        "Можно собирать индивидуальные заявки на путешествия?",
        "Да. Можно сделать обычную структурированную заявку или полноценный trip builder под процесс вашей компании.",
      ],
      [
        "Можно показывать актуальные туры разных туроператоров?",
        "Да. Если туроператор предоставляет API-доступ, сайт автоматически показывает доступные туры, даты вылетов, цены и наличие. Проданные или недоступные предложения можно скрывать или отмечать без ручного обновления каталога.",
      ],
      [
        "Можно выдавать клиенту цифровой маршрут?",
        "Да. В нём могут быть планы по дням, отели, рестораны, трансферы, активности, бронирования и документы.",
      ],
      [
        "Можно управлять бронированиями поставщиков и оплатами?",
        "Да. Внутренняя система может учитывать поставщиков, подтверждения, себестоимость, оплаты клиента, остатки и маржу.",
      ],
      [
        "Можно сначала сделать сайт, а CRM добавить позже?",
        "Да. Публичный сайт можно запустить первым, а внутреннюю travel-платформу расширять позже.",
      ],
    ],
    contactEyebrow: "Начать проект",
    contactTitle:
      "Хотите создать более сильный цифровой путь для travel-бизнеса?",
    contactText:
      "Расскажите, как вы сейчас продаёте путешествия и какие этапы работы с клиентом или операциями хотите улучшить.",
    contactCta: "Обсудить в WhatsApp",
  },
} as const;

export default function TravelIndustryPage({ locale }: { locale: Locale }) {
  const t = copy[locale],
    other = locale === "ru" ? "en" : "ru";
  const message = encodeURIComponent(
    locale === "ru"
      ? "Здравствуйте! Хочу обсудить сайт или цифровую систему для travel-бизнеса."
      : "Hello! I'd like to discuss a website or digital system for a travel business.",
  );
  return (
    <StkSiteShell>
      <header className="sticky top-0 z-50 border-b border-[color:var(--stk-border)] bg-[color:var(--stk-bg-translucent)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href={`/${locale}`} aria-label="Tafa Lab">
            <TafaLabLogo priority />
          </Link>
          <nav className="hidden gap-7 text-sm md:flex">
            <a href="#services">{locale === "ru" ? "Решения" : "Solutions"}</a>
            <a href="#portfolio">{locale === "ru" ? "Работы" : "Portfolio"}</a>
            <a href="#process">{locale === "ru" ? "Процесс" : "Process"}</a>
            <Link href={`/${locale}/price`}>{locale === "ru" ? "Цены" : "Price"}</Link>
            <a href="#contact">{locale === "ru" ? "Контакты" : "Contact"}</a>
          </nav>
          <Link
            href={`/${other}/industries/travel`}
            className="rounded-full border border-[color:var(--stk-border)] px-3 py-2 text-xs uppercase"
          >
            {other}
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pb-28 md:pt-24">
        <StkReveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-[color:var(--stk-muted-strong)]">
              {t.eyebrow}
            </p>
            <h1 className="mt-6 text-balance text-5xl font-medium tracking-[-.055em] md:text-7xl lg:text-[5rem] lg:leading-[.98]">
              {t.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--stk-muted)]">
              {t.text}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#portfolio"
                className="rounded-full bg-[var(--stk-dark)] px-6 py-3.5 text-sm"
                style={{ color: "#fff" }}
              >
                {t.primary}
              </a>
              <a
                href={`${whatsapp}?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[color:var(--stk-border)] px-6 py-3.5 text-sm"
                style={{ color: "var(--stk-text)" }}
              >
                {t.secondary}
              </a>
            </div>
          </div>
        </StkReveal>
        <StkReveal delay={1}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--stk-radius-card)] bg-[var(--stk-media-bg)]">
            <Image
              src="/images/stk-lab/travel/travel-website-hero-v2.webp"
              alt="Premium travel website"
              fill
              priority
              className="object-cover"
              sizes="(max-width:768px) 95vw, 45vw"
            />
          </div>
        </StkReveal>
      </section>

      <section className="border-y border-[color:var(--stk-border)] bg-[color:var(--stk-surface)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <h2 className="text-4xl tracking-[-.045em] md:text-6xl">
            {t.introTitle}
          </h2>
          <p className="text-lg leading-8 text-[color:var(--stk-muted)]">
            {t.introText}
          </p>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"
      >
        <h2 className="max-w-3xl text-4xl tracking-[-.045em] md:text-6xl">
          {t.servicesTitle}
        </h2>
        <div className="mt-14 grid border-l border-t border-[color:var(--stk-border)] sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map(([name, price, text], i) => (
            <div
              key={name}
              className="min-h-[300px] border-b border-r border-[color:var(--stk-border)] p-7 md:p-9"
            >
              <div className="flex justify-between gap-4">
                <span className="text-xs text-[color:var(--stk-faint)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium">{price}</span>
              </div>
              <h3 className="mt-16 text-2xl tracking-[-.035em]">{name}</h3>
              <p className="mt-4 leading-7 text-[color:var(--stk-muted)]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <TravelIdeasSection locale={locale} />

      <section className="border-y border-[color:var(--stk-border)] bg-[var(--stk-dark)] py-24 text-white md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.8fr_1.2fr] md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-white/45">{t.apiEyebrow}</p>
            <h2 className="mt-5 text-4xl tracking-[-.045em] md:text-6xl">{t.apiTitle}</h2>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-white/65">{t.apiText}</p>
            <div className="mt-9 grid gap-px overflow-hidden rounded-[var(--stk-radius-small)] bg-white/15 sm:grid-cols-2">
              {t.apiPoints.map((point, index) => (
                <div key={point} className="bg-[var(--stk-dark)] p-5">
                  <span className="text-xs text-white/35">0{index + 1}</span>
                  <strong className="mt-8 block text-lg">{point}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Feature
        image="/images/stk-lab/travel/travel-trip-builder-v2.webp"
        eyebrow={t.builderEyebrow}
        title={t.builderTitle}
        text={t.builderText}
      />
      <Feature
        image="/images/stk-lab/travel/travel-itinerary-v2.webp"
        eyebrow={t.itineraryEyebrow}
        title={t.itineraryTitle}
        text={t.itineraryText}
        reverse
      />
      <Feature
        image="/images/stk-lab/travel/travel-crm-dashboard-v2.webp"
        eyebrow={t.crmEyebrow}
        title={t.crmTitle}
        text={t.crmText}
        dark
      />

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--stk-radius-card)]">
          <Image
            src="/images/stk-lab/travel/travel-bookings-operations-v2.webp"
            alt="Travel booking operations"
            fill
            className="object-cover"
            sizes="(max-width:768px) 95vw, 50vw"
          />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--stk-radius-card)]">
          <Image
            src="/images/stk-lab/travel/travel-digital-concierge-v2.webp"
            alt="Digital travel concierge"
            fill
            className="object-cover"
            sizes="(max-width:768px) 95vw, 50vw"
          />
        </div>
      </section>

      <section
        id="portfolio"
        className="bg-[var(--stk-surface-strong)] py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[.24em] text-[color:var(--stk-muted-strong)]">
            {locale === "ru" ? "4 доступных проекта" : "4 available projects"}
          </p>
          <h2 className="mt-4 text-4xl tracking-[-.045em] md:text-6xl">
            {t.portfolioTitle}
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--stk-muted)]">
            {t.portfolioText}
          </p>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {t.portfolio.map(([name, desc, img, status, url]) => {
              const localRoutes: Record<string, string> = {
                "travel-demo": `/${locale}/travel-demo`,
                "expedition-demo": `/${locale}/expedition-demo`,
                "travel-hacking-demo": `/${locale}/travel-hacking-demo`,
              };
              const href = localRoutes[url] ?? url;
              const card = (
                <div className="group h-full overflow-hidden rounded-[var(--stk-radius-card)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={img}
                      alt={name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width:768px) 95vw, 48vw"
                    />
                    <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-xs text-black">
                      {status}
                    </span>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-3xl tracking-[-.04em]">{name}</h3>
                    <p className="mt-3 leading-7 text-[color:var(--stk-muted)]">
                      {desc}
                    </p>
                    <div className="mt-6 text-sm font-medium">
                      {locale === "ru" ? "Открыть сайт" : "Open website"} →
                    </div>
                  </div>
                </div>
              );
              return (
                <a key={name} href={href} target="_blank" rel="noreferrer">
                  {card}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="bg-[var(--stk-accent-soft)] py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-4xl tracking-[-.045em] md:text-6xl">
            {t.processTitle}
          </h2>
          <div className="mt-16 divide-y divide-[color:var(--stk-border)] border-y border-[color:var(--stk-border)]">
            {t.process.map(([num, name, text]) => (
              <div
                key={num}
                className="grid gap-4 py-8 md:grid-cols-[100px_1fr_1.4fr]"
              >
                <span className="text-sm text-[color:var(--stk-faint)]">
                  {num}
                </span>
                <h3 className="text-2xl">{name}</h3>
                <p className="leading-7 text-[color:var(--stk-muted)]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <h2 className="text-4xl tracking-[-.045em] md:text-6xl">
          {t.packagesTitle}
        </h2>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {t.packages.map(([name, price, text], i) => (
            <div
              key={name}
              className={`rounded-[var(--stk-radius-card)] border p-8 ${i === 2 ? "border-[var(--stk-dark)] bg-[var(--stk-dark)] text-white" : "border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)]"}`}
            >
              <p
                className={`text-xs uppercase tracking-[.2em] ${i === 2 ? "text-white/50" : "text-[color:var(--stk-faint)]"}`}
              >
                Tafa Lab
              </p>
              <h3 className="mt-10 text-3xl">{name}</h3>
              <div
                className={`mt-5 max-w-full break-words tracking-[-.05em] leading-[1.02] ${i === 2 ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"}`}
              >
                {price}
              </div>
              <p
                className={`mt-6 leading-7 ${i === 2 ? "text-white/60" : "text-[color:var(--stk-muted)]"}`}
              >
                {text}
              </p>
              <a
                href={`${whatsapp}?text=${message}`}
                target="_blank"
                rel="noreferrer"
                className={`mt-10 inline-flex rounded-full px-5 py-3 text-sm ${i === 2 ? "bg-white" : "bg-[var(--stk-dark)]"}`}
                style={{ color: i === 2 ? "#000" : "#fff" }}
              >
                {t.contactCta}
              </a>
            </div>
          ))}
        </div>
        <FullPriceLink locale={locale} />
      </section>

      <section className="border-y border-[color:var(--stk-border)] bg-[var(--stk-surface-strong)] py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.75fr_1.25fr] md:px-8">
          <h2 className="text-4xl tracking-[-.045em] md:text-6xl">
            {t.faqTitle}
          </h2>
          <div className="divide-y divide-[color:var(--stk-border)] border-y border-[color:var(--stk-border)]">
            {t.faqs.map(([q, a]) => (
              <details key={q} className="group py-6">
                <summary className="flex cursor-pointer list-none justify-between gap-5 text-xl">
                  <span>{q}</span>
                  <span className="transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pt-5 leading-7 text-[color:var(--stk-muted)]">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-label={
          locale === "ru"
            ? "Другие направления Tafa Lab"
            : "Other Tafa Lab industries"
        }
        className="border-t border-[color:var(--stk-border)]"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.24em] text-[color:var(--stk-muted-strong)]">
                {locale === "ru" ? "Другие направления" : "Other industries"}
              </p>
              <h2 className="mt-4 text-3xl tracking-[-.04em] md:text-5xl">
                {locale === "ru"
                  ? "Посмотрите другие решения Tafa Lab"
                  : "Explore other Tafa Lab solutions"}
              </h2>
            </div>
            <Link href={`/${locale}`} className="text-sm font-medium">
              {locale === "ru" ? "На главную Tafa Lab" : "Tafa Lab home"} →
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/${locale}/industries/bakeries`}
              className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"
            >
              <span>
                {locale === "ru"
                  ? "Пекарни и кондитерские"
                  : "Bakeries & Cake Studios"}
              </span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={`/${locale}/industries/restaurants`}
              className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"
            >
              <span>{locale === "ru" ? "Рестораны" : "Restaurants"}</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={`/${locale}/industries/beauty`}
              className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"
            >
              <span>
                {locale === "ru" ? "Beauty и салоны" : "Beauty & Salons"}
              </span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={`/${locale}/industries/business-platforms`}
              className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"
            >
              <span>
                {locale === "ru" ? "Бизнес-платформы" : "Business Platforms"}
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl rounded-[var(--stk-radius-card)] bg-[var(--stk-dark)] px-6 py-14 text-white md:px-12 md:py-20">
          <p className="text-xs uppercase tracking-[.24em] text-white/40">
            {t.contactEyebrow}
          </p>
          <h2 className="mt-5 max-w-4xl text-balance text-4xl tracking-[-.05em] md:text-7xl">
            {t.contactTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
            {t.contactText}
          </p>

          <div className="mt-10 max-w-4xl">
            <StkLeadForm locale={locale} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
            <span className="mr-2 text-xs uppercase tracking-[.18em] text-white/35">
              {locale === "ru"
                ? "Или связаться напрямую"
                : "Or contact us directly"}
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
    </StkSiteShell>
  );
}

function Feature({
  image,
  eyebrow,
  title,
  text,
  reverse = false,
  dark = false,
}: {
  image: string;
  eyebrow: string;
  title: string;
  text: string;
  reverse?: boolean;
  dark?: boolean;
}) {
  return (
    <section
      className={
        dark
          ? "bg-[var(--stk-dark)] text-white"
          : "border-t border-[color:var(--stk-border)]"
      }
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-28">
        <div
          className={`relative aspect-[4/3] overflow-hidden rounded-[var(--stk-radius-card)] ${reverse ? "md:order-2" : ""}`}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 95vw, 45vw"
          />
        </div>
        <div className={reverse ? "md:order-1" : ""}>
          <p
            className={`text-xs font-semibold uppercase tracking-[.24em] ${dark ? "text-white/45" : "text-[color:var(--stk-muted-strong)]"}`}
          >
            {eyebrow}
          </p>
          <h2 className="mt-5 text-4xl tracking-[-.045em] md:text-6xl">
            {title}
          </h2>
          <p
            className={`mt-7 max-w-xl text-lg leading-8 ${dark ? "text-white/65" : "text-[color:var(--stk-muted)]"}`}
          >
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
