import type { StkLabLocale } from "./content";

export const industrySlugs = [
  "bakeries",
  "restaurants",
  "beauty",
  "travel",
  "business-platforms",
  "entertainment",
] as const;

export type IndustrySlug = (typeof industrySlugs)[number];

type Project = {
  name: string;
  type: string;
  text: string;
  tags: readonly string[];
  href?: string;
  status?: string;
};

type IndustryPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  introTitle: string;
  introText: string;
  projectsTitle: string;
  projectsText: string;
  projects: readonly Project[];
  capabilitiesTitle: string;
  capabilities: readonly string[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  back: string;
  viewProject: string;
};

export const industryContent: Record<StkLabLocale, Record<IndustrySlug, IndustryPageContent>> = {
  en: {
    bakeries: {
      eyebrow: "Bakeries & Cake Studios",
      title: "Websites built around the way modern bakeries actually sell.",
      description: "Premium bakery websites, cake configurators, online ordering and admin systems designed for custom cake studios, patisseries and growing bakery brands.",
      metaTitle: "Bakery Website Design & Cake Configurators | Tafa Lab",
      metaDescription: "Custom bakery websites, cake configurators, online ordering and admin systems for bakeries, patisseries and custom cake studios.",
      introTitle: "More than a beautiful storefront.",
      introText: "Bakery customers need to understand products quickly, trust the quality of the brand and place custom orders without friction. We design the customer experience and the operational tools behind it as one connected system.",
      projectsTitle: "Bakery work",
      projectsText: "Selected bakery and cake-studio concepts, storefronts and product experiences created by Tafa Lab.",
      projects: [
        { name: "STK Bakery", type: "Full bakery platform", text: "A premium cake-studio storefront with catalog, visual cake configurator, cart, checkout flow and a dedicated administration area.", tags: ["Cake Configurator", "Catalog", "Online Ordering", "Admin"], href: "/en/bakery", status: "Live demo" },
        { name: "Veloura Cakes", type: "Cake builder showcase", text: "A premium portfolio experience built around a visual custom-cake journey, showing how a configurator and admin workflow can replace manual order chaos.", tags: ["Cake Builder", "Customer Journey", "Admin UX", "Premium Design"], status: "Case study" },
        { name: "Maison Sucre", type: "Editorial bakery concept", text: "A warm editorial bakery direction focused on product storytelling, limited drops, premium typography and a calm e-commerce experience.", tags: ["Bakery", "Editorial", "E-commerce", "Brand Story"], status: "Concept" },
      ],
      capabilitiesTitle: "What we can build for bakeries",
      capabilities: ["Bakery and patisserie websites", "Visual cake configurators", "Catalogs and seasonal collections", "Online ordering and checkout", "Custom-order enquiry flows", "Admin panels for products and orders", "WhatsApp and CRM integrations", "Technical SEO and local search foundations"],
      ctaTitle: "Planning a bakery website or cake configurator?",
      ctaText: "We can build the customer-facing site and the tools your team needs to manage products and orders behind it.",
      ctaButton: "Discuss a bakery project", back: "Back to Tafa Lab", viewProject: "View project",
    },
    restaurants: {
      eyebrow: "Restaurants & Cafés", title: "Restaurant websites designed to turn atmosphere into reservations.", description: "Websites, menus, reservation journeys and digital systems for restaurants, cafés and hospitality brands.",
      metaTitle: "Restaurant & Café Website Design | Tafa Lab", metaDescription: "Custom restaurant websites, digital menus, reservations and hospitality web experiences designed by Tafa Lab.",
      introTitle: "The digital experience starts before the first visit.", introText: "We combine atmosphere, menu clarity, location information and reservation journeys into a fast mobile experience that feels like the restaurant itself.",
      projectsTitle: "Restaurant work", projectsText: "Selected restaurant-facing experiences and hospitality concepts.",
      projects: [{ name: "Casa Limone", type: "Restaurant & hospitality", text: "A warm Mediterranean restaurant website with editorial storytelling, menu presentation and a clear reservation journey.", tags: ["Restaurant", "Reservations", "Menu", "Editorial Design"], status: "Featured concept" }],
      capabilitiesTitle: "What we can build for restaurants", capabilities: ["Restaurant and café websites", "Digital menus", "Reservation journeys", "Multi-location websites", "Events and private dining pages", "Delivery and ordering integrations", "Admin panels", "Local SEO foundations"],
      ctaTitle: "Building a stronger restaurant presence?", ctaText: "We create restaurant websites that are easy to discover, easy to navigate and easy to book.", ctaButton: "Discuss a restaurant project", back: "Back to Tafa Lab", viewProject: "View project",
    },
    beauty: {
      eyebrow: "Beauty & Wellness", title: "Premium beauty websites with an effortless path to booking.", description: "Elegant websites and booking experiences for salons, studios, clinics and wellness brands.",
      metaTitle: "Beauty Salon & Wellness Website Design | Tafa Lab", metaDescription: "Premium beauty, salon and wellness websites with service presentation, booking flows and custom design.",
      introTitle: "Trust, clarity and a sense of care.", introText: "Beauty customers make decisions visually. We structure services, expertise, results and booking so the experience feels premium without becoming complicated.",
      projectsTitle: "Beauty work", projectsText: "Selected beauty and wellness digital experiences.",
      projects: [{ name: "Lumière Beauty Studio", type: "Luxury beauty studio", text: "A refined beauty and wellness website with premium editorial styling, clear service presentation and an effortless booking journey.", tags: ["Beauty", "Booking", "Luxury", "Wellness"], status: "Featured concept" }],
      capabilitiesTitle: "What we can build for beauty brands", capabilities: ["Salon and studio websites", "Service catalogs", "Online booking", "Specialist profiles", "Before-and-after galleries", "Gift card and product sales", "CRM integrations", "Local SEO foundations"],
      ctaTitle: "Ready to elevate your beauty brand online?", ctaText: "We can turn your services and visual identity into a premium booking experience.", ctaButton: "Discuss a beauty project", back: "Back to Tafa Lab", viewProject: "View project",
    },
    travel: {
      eyebrow: "Travel & Hospitality", title: "Travel platforms built for discovery, planning and confident decisions.", description: "Destination guides, hospitality websites and scalable travel content platforms.",
      metaTitle: "Travel & Hospitality Web Development | Tafa Lab", metaDescription: "Custom travel platforms, destination guides and hospitality websites designed and developed by Tafa Lab.",
      introTitle: "Useful information without the clutter.", introText: "Travel products need large amounts of content to remain easy to explore. We design clear information architecture, destination discovery and scalable content systems.",
      projectsTitle: "Travel work", projectsText: "Selected travel and destination-platform work.",
      projects: [{ name: "STK Travel", type: "Travel guide platform", text: "A scalable destination platform combining country guides, city information, practical planning and curated local experiences.", tags: ["Travel", "Destination Guides", "Content Platform", "UX/UI"], status: "Featured project" }],
      capabilitiesTitle: "What we can build for travel", capabilities: ["Destination platforms", "Hotel and hospitality websites", "City and country guides", "Search and filters", "Booking integrations", "Editorial CMS", "Multilingual content", "SEO architecture for destinations"],
      ctaTitle: "Planning a travel or hospitality platform?", ctaText: "We can design the content architecture and build the product around how travelers actually search and plan.", ctaButton: "Discuss a travel project", back: "Back to Tafa Lab", viewProject: "View project",
    },
    entertainment:{eyebrow:"Entertainment & Events",title:"Websites that feel like the celebration itself.",description:"Event, performer and family entertainment websites.",metaTitle:"Entertainment & Event Websites | Tafa Lab",metaDescription:"Websites for events, weddings, animators and family play centres.",introTitle:"Make anticipation part of the experience.",introText:"We connect emotion, programs and booking in one clear journey.",projectsTitle:"Entertainment work",projectsText:"Three distinctive concepts.",projects:[],capabilitiesTitle:"What we build",capabilities:["Event websites","Wedding production","Performer programs","Birthday booking"],ctaTitle:"Planning an entertainment project?",ctaText:"Tell us about it.",ctaButton:"Discuss a project",back:"Back",viewProject:"Open"},
    "business-platforms": {
      eyebrow: "Business Platforms", title: "Custom web systems built around real operational workflows.", description: "Dashboards, internal tools, multi-location systems and custom admin platforms for growing businesses.",
      metaTitle: "Custom Business Platforms & Web Apps | Tafa Lab", metaDescription: "Custom dashboards, internal tools, admin panels and multi-location business platforms designed and developed by Tafa Lab.",
      introTitle: "When a normal website is not enough.", introText: "We turn spreadsheets, disconnected tools and repetitive manual processes into one purpose-built web application designed around the way the business already works.",
      projectsTitle: "Platform work", projectsText: "Selected internal systems and operational web applications.",
      projects: [{ name: "People's Potatoes", type: "Restaurant management platform", text: "A multi-branch operations platform combining sales, inventory, purchasing, scheduling, payroll, support and business analytics.", tags: ["Dashboard", "Inventory", "Payroll", "Multi-location"], status: "Custom platform" }],
      capabilitiesTitle: "What we can build", capabilities: ["Business dashboards", "Inventory and purchasing systems", "Multi-location operations", "Scheduling and attendance", "Payroll workflows", "Role-based accounts", "Admin panels", "Custom reporting and analytics"],
      ctaTitle: "Have a process that has outgrown spreadsheets?", ctaText: "We can map the workflow and build a focused internal platform around it.", ctaButton: "Discuss a custom platform", back: "Back to Tafa Lab", viewProject: "View project",
    },
  },
  ru: {
    bakeries: {
      eyebrow: "Пекарни и студии тортов", title: "Сайты, созданные под то, как современные кондитерские реально продают.", description: "Премиальные сайты для кондитерских, конструкторы тортов, онлайн-заказы и админ-системы для пекарен и студий авторских тортов.",
      metaTitle: "Сайты для кондитерских и конструкторы тортов | Tafa Lab", metaDescription: "Разработка сайтов для кондитерских, визуальных конструкторов тортов, онлайн-заказов и админ-панелей.",
      introTitle: "Не просто красивая витрина.", introText: "Клиенту кондитерской нужно быстро понять ассортимент, довериться бренду и без лишних переписок оформить индивидуальный заказ. Мы проектируем клиентский сайт и рабочие инструменты команды как единую систему.",
      projectsTitle: "Работы для кондитерских", projectsText: "Избранные сайты, концепции и продуктовые решения Tafa Lab для кондитерских и студий тортов.",
      projects: [
        { name: "STK Bakery", type: "Полная платформа кондитерской", text: "Премиальный сайт студии тортов с каталогом, визуальным конструктором, корзиной, оформлением заказа и отдельной административной частью.", tags: ["Конструктор тортов", "Каталог", "Онлайн-заказ", "Админка"], href: "/ru/bakery", status: "Рабочее демо" },
        { name: "Veloura Cakes", type: "Презентация конструктора", text: "Премиальный кейс вокруг визуального пути заказа торта, показывающий, как конструктор и административный процесс могут заменить хаотичную ручную обработку заказов.", tags: ["Конструктор", "Путь клиента", "Admin UX", "Премиум-дизайн"], status: "Кейс" },
        { name: "Maison Sucre", type: "Редакционная концепция пекарни", text: "Тёплая премиальная концепция с акцентом на продукт, лимитированные выпуски, типографику и спокойный e-commerce опыт.", tags: ["Пекарня", "Editorial", "E-commerce", "История бренда"], status: "Концепция" },
      ],
      capabilitiesTitle: "Что мы можем сделать для кондитерской", capabilities: ["Сайты пекарен и кондитерских", "Визуальные конструкторы тортов", "Каталоги и сезонные коллекции", "Онлайн-заказ и checkout", "Формы индивидуальных заказов", "Админ-панели для товаров и заказов", "Интеграции WhatsApp и CRM", "Техническая SEO-основа и локальный поиск"],
      ctaTitle: "Планируете сайт кондитерской или конструктор тортов?", ctaText: "Мы можем создать и клиентский сайт, и инструменты, с которыми команда будет управлять товарами и заказами.", ctaButton: "Обсудить проект кондитерской", back: "Вернуться в Tafa Lab", viewProject: "Открыть проект",
    },
    restaurants: {
      eyebrow: "Рестораны и кафе", title: "Сайты ресторанов, которые превращают атмосферу в бронирования.", description: "Сайты, меню, бронирование и цифровые решения для ресторанов, кафе и hospitality-брендов.", metaTitle: "Разработка сайтов для ресторанов и кафе | Tafa Lab", metaDescription: "Индивидуальные сайты ресторанов, цифровые меню, бронирование и hospitality-решения от Tafa Lab.",
      introTitle: "Цифровое впечатление начинается до первого визита.", introText: "Мы объединяем атмосферу, меню, адреса и бронирование в быстрый мобильный опыт, который ощущается как продолжение самого ресторана.", projectsTitle: "Работы для ресторанов", projectsText: "Избранные клиентские проекты и концепции для ресторанов.",
      projects: [{ name: "Casa Limone", type: "Ресторан и hospitality", text: "Тёплый сайт средиземноморского ресторана с редакционной подачей, меню и понятным сценарием бронирования.", tags: ["Ресторан", "Бронирование", "Меню", "Editorial"], status: "Избранная концепция" }],
      capabilitiesTitle: "Что мы можем сделать для ресторана", capabilities: ["Сайты ресторанов и кафе", "Цифровые меню", "Онлайн-бронирование", "Сайты для нескольких филиалов", "События и private dining", "Интеграции доставки и заказов", "Админ-панели", "Локальная SEO-основа"], ctaTitle: "Хотите усилить онлайн-присутствие ресторана?", ctaText: "Создадим сайт, который легко найти, удобно посмотреть и просто забронировать.", ctaButton: "Обсудить сайт ресторана", back: "Вернуться в Tafa Lab", viewProject: "Открыть проект",
    },
    beauty: {
      eyebrow: "Красота и wellness", title: "Премиальные beauty-сайты с простым путем к записи.", description: "Элегантные сайты и системы записи для салонов, студий, клиник и wellness-брендов.", metaTitle: "Сайты для салонов красоты и wellness | Tafa Lab", metaDescription: "Премиальные сайты для beauty и wellness с услугами, онлайн-записью и индивидуальным дизайном.", introTitle: "Доверие, ясность и ощущение заботы.", introText: "В beauty-сфере решение часто принимается визуально. Мы структурируем услуги, экспертизу, результаты и запись так, чтобы сайт ощущался премиально и оставался понятным.", projectsTitle: "Работы в beauty", projectsText: "Избранные цифровые решения для красоты и wellness.", projects: [{ name: "Lumière Beauty Studio", type: "Премиальная beauty-студия", text: "Элегантный сайт с редакционной эстетикой, понятной презентацией услуг и простым сценарием бронирования.", tags: ["Beauty", "Бронирование", "Luxury", "Wellness"], status: "Избранная концепция" }], capabilitiesTitle: "Что мы можем сделать для beauty-бренда", capabilities: ["Сайты салонов и студий", "Каталоги услуг", "Онлайн-запись", "Профили специалистов", "Галереи до/после", "Подарочные карты и продажи", "CRM-интеграции", "Локальная SEO-основа"], ctaTitle: "Готовы поднять beauty-бренд на новый уровень?", ctaText: "Превратим услуги и визуальную идентичность в премиальный опыт онлайн-записи.", ctaButton: "Обсудить beauty-проект", back: "Вернуться в Tafa Lab", viewProject: "Открыть проект",
    },
    travel: {
      eyebrow: "Путешествия и hospitality", title: "Travel-платформы для поиска, планирования и уверенного выбора.", description: "Путеводители, hospitality-сайты и масштабируемые travel-платформы.", metaTitle: "Разработка travel и hospitality сайтов | Tafa Lab", metaDescription: "Travel-платформы, путеводители и сайты hospitality-брендов от Tafa Lab.", introTitle: "Много полезной информации — без информационного шума.", introText: "Travel-продукты содержат большой объём контента. Мы проектируем понятную архитектуру, поиск направлений и масштабируемую систему публикаций.", projectsTitle: "Работы в travel", projectsText: "Избранные проекты для путешествий и туристических направлений.", projects: [{ name: "STK Travel", type: "Платформа-путеводитель", text: "Масштабируемая платформа с гайдами по странам и городам, практической информацией и локальными рекомендациями.", tags: ["Travel", "Путеводители", "Контент-платформа", "UX/UI"], status: "Избранный проект" }], capabilitiesTitle: "Что мы можем сделать для travel", capabilities: ["Платформы направлений", "Сайты отелей и hospitality", "Гайды по городам и странам", "Поиск и фильтры", "Интеграции бронирования", "Редакционная CMS", "Мультиязычный контент", "SEO-архитектура направлений"], ctaTitle: "Планируете travel или hospitality-платформу?", ctaText: "Спроектируем архитектуру контента и продукт вокруг того, как путешественники реально ищут и планируют.", ctaButton: "Обсудить travel-проект", back: "Вернуться в Tafa Lab", viewProject: "Открыть проект",
    },
    entertainment:{eyebrow:"Развлечения и события",title:"Сайты, которые ощущаются как сам праздник.",description:"Сайты для событий, артистов и семейных развлечений.",metaTitle:"Сайты для развлечений и событий | Tafa Lab",metaDescription:"Сайты для свадеб, шоу, аниматоров и детских игровых центров.",introTitle:"Предвкушение — часть впечатления.",introText:"Соединяем эмоцию, программы и бронирование в понятный путь.",projectsTitle:"Проекты",projectsText:"Три разные концепции.",projects:[],capabilitiesTitle:"Что создаём",capabilities:["Event-сайты","Свадебные проекты","Программы артистов","Бронирование дней рождения"],ctaTitle:"Планируете проект?",ctaText:"Расскажите о нём.",ctaButton:"Обсудить",back:"Назад",viewProject:"Открыть"},
    "business-platforms": {
      eyebrow: "Бизнес-платформы", title: "Индивидуальные веб-системы под реальные рабочие процессы.", description: "Дашборды, внутренние инструменты, системы для нескольких филиалов и собственные админ-платформы.", metaTitle: "Бизнес-платформы и веб-приложения | Tafa Lab", metaDescription: "Индивидуальные дашборды, внутренние системы, админ-панели и multi-location платформы от Tafa Lab.", introTitle: "Когда обычного сайта уже недостаточно.", introText: "Мы превращаем таблицы, разрозненные сервисы и повторяющуюся ручную работу в единое веб-приложение, построенное вокруг реальных процессов компании.", projectsTitle: "Работы с платформами", projectsText: "Избранные внутренние системы и операционные веб-приложения.", projects: [{ name: "People's Potatoes", type: "Платформа управления рестораном", text: "Система для сети филиалов с продажами, складом, закупками, расписанием, зарплатой, поддержкой и бизнес-аналитикой.", tags: ["Дашборд", "Склад", "Зарплата", "Филиалы"], status: "Индивидуальная платформа" }], capabilitiesTitle: "Что мы можем сделать", capabilities: ["Бизнес-дашборды", "Склад и закупки", "Управление филиалами", "Расписание и посещаемость", "Расчёт зарплаты", "Роли и личные кабинеты", "Админ-панели", "Отчёты и аналитика"], ctaTitle: "Ваш бизнес уже перерос таблицы?", ctaText: "Разберём процесс и создадим сфокусированную внутреннюю платформу под него.", ctaButton: "Обсудить платформу", back: "Вернуться в Tafa Lab", viewProject: "Открыть проект",
    },
  },
};
