export type StkLabLocale = "ru" | "en";

export const stkLabContent = {
  en: {
    nav: { work: "Work", services: "Services", process: "Process", industries: "Industries", faq: "FAQ", cta: "Start a project" },
    hero: {
      eyebrow: "Premium Web Development Studio",
      title: "We craft premium websites for brands that refuse to look ordinary.",
      text: "Crafting elegant websites and web applications for bakeries, hospitality, beauty and ambitious businesses. Designed with intention. Built to perform.",
      primary: "Start a project",
      secondary: "View selected work",
      stats: [["5", "Featured Projects"], ["6", "Business Industries"], ["100%", "Custom Design"]],
    },
    work: {
      eyebrow: "Selected Work",
      title: "Digital experiences built around real businesses.",
      text: "From premium customer-facing websites to complex internal platforms, each project is designed around a distinct brand, audience and business goal.",
      projects: [
        { type: "Luxury Bakery Website", name: "STK Bakery", text: "A complete digital storefront for a premium cake studio, including a visual cake configurator, catalog, cart and mobile-first ordering experience.", tags: ["Cake Configurator", "Bakery", "Online Ordering", "Mobile Design"], href: "/en/industries/bakeries" },
        { type: "Restaurant & Hospitality", name: "Casa Limone", text: "A warm editorial restaurant website designed around Mediterranean atmosphere, storytelling, menus and reservations.", tags: ["Restaurant", "Reservations", "Hospitality", "Editorial Design"], href: "/en/industries/restaurants" },
        { type: "Luxury Beauty Studio", name: "Lumière Beauty Studio", text: "A refined beauty and wellness website with premium editorial styling, clear service presentation and an effortless booking journey.", tags: ["Beauty", "Booking", "Luxury", "Wellness"], href: "/en/industries/beauty" },
        { type: "Travel Platform", name: "STK Travel", text: "A scalable destination platform combining country guides, city information, travel planning and curated local experiences.", tags: ["Travel", "Destination Guides", "Tourism", "UX/UI"], href: "/en/industries/travel" },
        { type: "Restaurant Management Platform", name: "People's Potatoes", text: "A multi-branch restaurant operations platform combining sales, inventory, purchasing, payroll, scheduling and business analytics.", tags: ["Dashboard", "Inventory", "Analytics", "Multi-location"], href: "#contact" },
      ],
    },
    services: {
      eyebrow: "Services", title: "A complete studio, end to end.", text: "From the first strategy conversation to the day your site goes live — and the months that follow — we handle the entire journey in-house. No outsourcing, no handoffs.",
      items: [
        ["Custom websites", "Bespoke design and development, built around your brand. No templates, no shortcuts, no compromises."],
        ["Landing pages", "High-conversion pages for product launches, campaigns and lead generation — fast, focused, measurable."],
        ["Online stores", "E-commerce experiences that feel like your brand — not a generic marketplace. Inventory, checkout, shipping."],
        ["Cake configurators", "Interactive product builders that let customers design celebration cakes, gift boxes and bespoke orders."],
        ["Booking systems", "Reservations, appointments and class bookings — integrated with your calendar, payments and customer data."],
        ["Business websites", "Corporate sites for studios, agencies and professional services — quiet authority, sharp typography."],
        ["Web applications", "Custom internal tools and customer portals — dashboards, inventory systems, content platforms."],
        ["Admin panels", "Bespoke backends for teams who need to manage content, orders and customers without a third-party CMS."],
        ["CRM integrations", "HubSpot, Pipedrive, Salesforce, Notion — your site, connected to the tools your team already uses."],
        ["Responsive design", "Every site we build is mobile-first and pixel-perfect on every screen — phone, tablet, laptop, ultrawide."],
        ["SEO-ready", "Clean semantic markup, structured data, performance budgets and content foundations that search engines love."],
        ["Care & hosting", "Long-term partnerships with monitoring, security, updates and continuous improvement baked in."],
      ],
    },
    why: {
      eyebrow: "Why Tafa Lab", title: "Built for brands who care about the details.", text: "We're a small studio by design. Every project gets focused attention and is shaped around the business behind it.",
      items: [
        ["Quiet, considered design", "We build sites that age well. No gimmicks — only typography, spacing and detail that still feel current years later."],
        ["Engineered, not assembled", "Hand-written code, semantic markup and performance budgets. Built to load fast, rank well and stay reliable."],
        ["Boutique by choice", "We keep the project load intentionally limited so every client gets direct, focused attention."],
        ["Strategy first", "Before any pixel is drawn, we map your audience, offer and goals so the site performs, not just looks good."],
        ["Long-term partnerships", "We evolve the product with your business, refining the site as your brand and audience grow."],
        ["Transparent process", "Clear scope, timeline and budget. You always know what is happening and what comes next."],
      ],
    },
    process: {
      eyebrow: "Process", title: "A clear path from idea to launch.", text: "Five thoughtful stages, no surprises. You'll always know what's happening, what's next, and when your site will go live.",
      items: [["Discovery", "We start with your brand, audience and goals. We map competitors and define success."], ["Strategy", "Sitemap, content architecture and user journeys. We define what each page needs to say and how it should feel."], ["Design", "Considered visual design: typography, color, spacing and motion, refined until every detail feels right."], ["Development", "Semantic code, accessibility, performance, SEO foundations and integrations built in."], ["Launch & care", "A smooth launch followed by monitoring, updates, refinements and continuous improvement."]],
    },
    industries: { eyebrow: "Industries", title: "Built for ambitious small businesses.", text: "We started with bakeries and cake studios, but our approach travels. Each industry gets the same calm, considered design — adapted to its audience.", items: [{ label: "Bakeries & Cake Studios", href: "/en/industries/bakeries" }, { label: "Restaurants & Cafés", href: "/en/industries/restaurants" }, { label: "Beauty & Wellness", href: "/en/industries/beauty" }, { label: "Travel & Hospitality", href: "/en/industries/travel" }, { label: "Business Platforms", href: "/en/industries/business-platforms" }, { label: "Entertainment & Events", href: "/en/industries/entertainment" }, { label: "Flowers & Florists", href: "/en/industries/flowers" }, { label: "Learning Platforms", href: "/en/industries/learning-platforms" }, { label: "Conferences", href: "/en/industries/conferences" }] },
    faq: { eyebrow: "Frequently asked", title: "Questions, thoughtfully answered.", text: "If you have a question we haven't covered, write to us directly — we usually reply within a day.", items: [
      ["How long does a typical project take?", "Timelines depend on the scope, integrations and complexity. We discuss a realistic schedule after reviewing your project."],
      ["What's the investment for a premium site like the ones in your portfolio?", "Every project is scoped individually. We discuss the budget and prepare a personal proposal after learning about your goals and requirements."],
      ["Do you work with businesses outside the bakery industry?", "Yes. Our process works across restaurants, beauty, hospitality, professional services, e-commerce and other ambitious businesses."],
      ["Will I be able to update the site myself after launch?", "Yes. We can provide a tailored CMS or admin panel so your team can manage content, products, orders or bookings without touching code."],
      ["Do you only design, or do you also build the sites?", "Both. Design and development are handled as one process so the final product stays consistent from concept to code."],
      ["What happens after the site goes live?", "Every project includes a post-launch care period, with the option to continue with monitoring, updates and ongoing improvements."],
    ] },
    cta: { eyebrow: "Ready When You Are", title: "Ready to create a website your customers will remember?", text: "A simple conversation is all it takes to begin. We'll listen carefully, ask thoughtful questions, and help you imagine what's possible.", button: "Start a Conversation", note: "Direct chat with our team" },
    footer: "Premium websites, web applications and digital systems for ambitious businesses.",
  },
  ru: {
    nav: { work: "Работы", services: "Услуги", process: "Процесс", industries: "Отрасли", faq: "FAQ", cta: "Начать проект" },
    hero: { eyebrow: "Премиальная студия веб-разработки", title: "Сайты, которые удобно использовать. И приятно показывать.", text: "Проектируем и разрабатываем сайты для ресторанов, отелей, студий красоты и других компаний. Продумываем путь клиента: от первого знакомства до заявки, записи или заказа.", primary: "Начать проект", secondary: "Избранные проекты", stats: [["5", "Избранные проекты"], ["9", "Сферы бизнеса"], ["100%", "Уникальный дизайн"]] },
    work: { eyebrow: "Избранные работы", title: "Посмотрите, как устроены наши проекты.", text: "Сайты, онлайн-заказы, бронирование и рабочие системы. У каждого проекта своя задача — и своё решение.", projects: [
      { type: "Премиальный сайт для пекарни", name: "STK Bakery", text: "Полноценный сайт для премиальной кондитерской с визуальным конфигуратором тортов, каталогом, корзиной и удобным мобильным оформлением заказа.", tags: ["Конструктор тортов", "Пекарня", "Онлайн-заказ", "Мобильный дизайн"], href: "/ru/industries/bakeries" },
      { type: "Рестораны и гостиничный бизнес", name: "Casa Limone", text: "Атмосферный сайт ресторана в редакционном стиле со средиземноморской эстетикой, меню, историей бренда и системой онлайн-бронирования.", tags: ["Ресторан", "Бронирование", "Гостеприимство", "Редакционный дизайн"], href: "/ru/industries/restaurants" },
      { type: "Премиальная бьюти-студия", name: "Lumière Beauty Studio", text: "Элегантный сайт для сферы красоты и wellness с премиальной эстетикой, структурированной подачей услуг и простым бронированием.", tags: ["Красота", "Бронирование", "Luxury", "Wellness"], href: "/ru/industries/beauty" },
      { type: "Туристическая платформа", name: "STK Travel", text: "Масштабируемая платформа для путешествий с путеводителями по странам, информацией о городах, планированием маршрутов и подборкой локальных впечатлений.", tags: ["Путешествия", "Гайды", "Туризм", "UX/UI"], href: "/ru/industries/travel" },
      { type: "Платформа управления рестораном", name: "People's Potatoes", text: "Платформа управления сетью ресторанов с модулями продаж, учёта запасов, закупок, зарплаты, расписания и бизнес-аналитики.", tags: ["Дашборд", "Склад", "Аналитика", "Филиалы"], href: "/ru/industries/business-platforms" },
    ] },
    services: { eyebrow: "Услуги", title: "От первого макета до работающего сайта.", text: "Помогаем определить структуру, создаём дизайн, пишем код и настраиваем нужные интеграции. После запуска можем поддерживать и развивать сайт.", items: [
      ["Индивидуальные сайты", "Уникальный дизайн и разработка специально для вашего бренда. Никаких шаблонов и компромиссов."], ["Landing-страницы", "Страницы для запусков продуктов, рекламных кампаний и генерации заявок — быстрые, сфокусированные и ориентированные на результат."], ["Интернет-магазины", "Каталог, управление товарами, оформление заказа, оплаты и доставка в стиле вашего бренда."], ["Конструкторы продуктов", "Интерактивные конфигураторы для тортов, подарочных наборов и других персонализированных заказов."], ["Системы бронирования", "Бронирование, запись на услуги и занятия с интеграцией календарей, платежей и клиентской базы."], ["Бизнес-сайты", "Корпоративные сайты для студий, агентств и профессиональных компаний."], ["Веб-приложения", "Индивидуальные внутренние системы и клиентские порталы — дашборды, склад, контентные платформы."], ["Панели управления", "Собственные админ-панели для управления контентом, заказами и клиентами без сторонней CMS."], ["CRM-интеграции", "Подключение сайта к HubSpot, Pipedrive, Salesforce, Notion и другим рабочим инструментам."], ["Адаптивный дизайн", "Mobile-first и аккуратное отображение на смартфонах, планшетах, ноутбуках и широких экранах."], ["SEO-основа", "Семантическая разметка, структурированные данные, производительность и техническая база для поискового продвижения."], ["Поддержка и хостинг", "Мониторинг, защита, обновления и постоянное развитие продукта после запуска."] ] },
    why: { eyebrow: "Почему Tafa Lab", title: "Что для нас важно в работе.", text: "Обсуждаем задачу до дизайна, показываем промежуточный результат и объясняем технические решения понятным языком.", items: [["Сдержанный, продуманный дизайн", "Создаём сайты, которые не устаревают через сезон: сильная типографика, композиция и детали вместо случайных трендов."], ["Разработано, а не собрано", "Чистый код, семантическая разметка и контроль производительности — для скорости, SEO и надёжности."], ["Небольшая студия по выбору", "Ограничиваем число проектов, чтобы уделять каждому максимум внимания."], ["Стратегия прежде всего", "Сначала разбираемся в аудитории, предложении и целях, а затем проектируем интерфейс."], ["Долгосрочное партнёрство", "Развиваем сайт вместе с бизнесом и дорабатываем его по мере роста бренда."], ["Прозрачный процесс", "Понятный объём, сроки и бюджет. Вы всегда знаете, что происходит и что будет дальше."]] },
    process: { eyebrow: "Этапы работы", title: "Как мы работаем.", text: "Сначала разбираемся в задаче, затем согласовываем структуру и дизайн. После разработки проверяем сайт и готовим его к запуску.", items: [["Исследование", "Погружаемся в бренд, аудиторию и бизнес-цели, изучаем конкурентов и определяем критерии успеха."], ["Стратегия", "Формируем структуру сайта, архитектуру контента и пользовательские сценарии."], ["Дизайн", "Продумываем типографику, цвет, композицию, движение и детали интерфейса."], ["Разработка", "Создаём семантический код, закладываем производительность, доступность, SEO и интеграции."], ["Запуск и поддержка", "Запускаем сайт и продолжаем работу через мониторинг, обновления и улучшения."]] },
    industries: { eyebrow: "Отрасли", title: "Для разных сфер бизнеса — разные решения.", text: "У ресторана, студии красоты и туристического сервиса разные клиенты и сценарии. Поэтому структуру и функции сайта подбираем под конкретную работу.", items: [{ label: "Пекарни и студии тортов", href: "/ru/industries/bakeries" }, { label: "Рестораны и кафе", href: "/ru/industries/restaurants" }, { label: "Красота и wellness", href: "/ru/industries/beauty" }, { label: "Путешествия и гостеприимство", href: "/ru/industries/travel" }, { label: "Бизнес-платформы", href: "/ru/industries/business-platforms" }, { label: "Развлечения и события", href: "/ru/industries/entertainment" }, { label: "Цветочные магазины", href: "/ru/industries/flowers" }, { label: "Образовательные платформы", href: "/ru/industries/learning-platforms" }, { label: "Конференции", href: "/ru/industries/conferences" }] },
    faq: { eyebrow: "Частые вопросы", title: "Что обычно спрашивают перед стартом.", text: "Если вы не нашли ответ, напишите нам напрямую — обычно мы отвечаем в течение одного дня.", items: [["Сколько обычно длится проект?", "Сроки зависят от объёма работ, интеграций и сложности проекта. Обсудим реалистичный график после знакомства с вашей задачей."], ["Сколько стоит премиальный сайт?", "Каждый проект рассчитываем индивидуально. Обсудим бюджет лично и подготовим предложение после знакомства с вашими задачами и требованиями."], ["Вы работаете не только с пекарнями?", "Да. Мы работаем с ресторанами, сферой красоты, гостеприимством, профессиональными услугами, e-commerce и другими бизнесами."], ["Смогу ли я самостоятельно обновлять сайт?", "Да. При необходимости мы создаём CMS или собственную административную панель для контента, товаров, заказов и бронирований."], ["Вы только делаете дизайн?", "Нет. Дизайн и разработка ведутся как единый процесс — от структуры и визуальной системы до рабочего кода."], ["Что происходит после запуска?", "В каждый проект входит период поддержки после запуска, а затем можно продолжить сопровождение, обновления и развитие сайта."]] },
    cta: { eyebrow: "Готовы начать", title: "Расскажите, какой сайт вам нужен.", text: "Опишите задачу, даже если пока нет готового технического задания. Мы уточним детали и предложим следующий шаг.", button: "Начать разговор", note: "Напишите нашей команде напрямую" },
    footer: "Сайты, онлайн-сервисы и рабочие системы для бизнеса.",
  },
} as const;
