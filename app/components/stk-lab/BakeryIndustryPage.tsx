import Image from "next/image";
import Link from "next/link";
import type { StkLabLocale } from "@/app/components/stk-lab/content";
import StkSiteShell from "./design/StkSiteShell";
import StkLeadForm from "./StkLeadForm";

const whatsapp = "https://wa.me/77471818493";

const copy = {
  en: {
    nav: { home: "Home", services: "Services", portfolio: "Portfolio", contact: "Contact" },
    heroKicker: "Websites for bakeries & cake studios",
    heroTitle: "Premium Websites for Bakeries",
    heroText: "We design premium websites for bakeries, cake studios and dessert brands that showcase your products, simplify ordering and help your business grow.",
    heroCta: "View portfolio",
    introTitle: "More Than a Beautiful Website",
    introEyebrow: "Digital solutions created specifically for bakeries, cake studios and dessert brands",
    introText1: "A successful bakery website should do more than simply showcase products beautifully. It should help customers explore the product range, understand the available options, and place orders with ease.",
    introText2: "We create thoughtfully designed digital solutions that simplify the ordering process, reduce repetitive customer inquiries, and turn your website into a practical tool for business growth.",
    servicesTitle: "What We Can Create for Your Bakery",
    servicesText: "From focused landing pages to complete online stores and interactive cake builders, each solution is tailored to your products, customers and ordering process.",
    services: [
      ["Landing Page", "$300", "A focused one-page website that presents your bakery, products, advantages and ordering process."],
      ["Multi-page Website", "$800", "A complete website with separate pages for products, services, delivery, custom orders, gallery and contact information."],
      ["Online Catalogue", "$500", "A structured product catalogue with categories, photographs, descriptions, flavours, sizes and prices."],
      ["Online Store", "$1500", "A complete online ordering experience with a product catalogue, shopping cart, checkout, payment and delivery options."],
      ["Custom Order Form", "$300", "A detailed enquiry form where customers can specify date, size, flavour, colour, theme, inscription and other requirements."],
      ["Cake Builder", "$2000", "An interactive configurator that lets customers design their cake, preview every change and see the price update in real time."],
    ],
    builderEyebrow: "Interactive ordering",
    builderTitle: "Let Customers Design Their Dream Cake",
    builderText: "Customers can choose the size, flavour and decorations while seeing every change in real time. Automatic pricing and a mobile-friendly flow make ordering faster, easier and more engaging.",
    builderCta: "Open live demo",
    benefitsTitle: "Work Smarter, Sell More",
    benefitsText: "Your website becomes more than a showcase—it helps customers place orders faster, reduces manual work and supports business growth around the clock.",
    benefits: [
      ["Spend Less Time Answering the Same Questions", "Customers instantly find prices, sizes, flavours, delivery information and ordering details without waiting for a reply."],
      ["Help Customers Order with Confidence", "Clear product information, beautiful galleries and transparent pricing make choosing and ordering simple."],
      ["Increase the Average Order Value", "Recommend matching products, seasonal specials and upgrades to encourage larger purchases."],
      ["Accept Orders 24/7", "Your bakery keeps receiving orders even when you're busy, asleep or serving customers in-store."],
    ],
    projectsTitle: "Featured Bakery Projects",
    projectsText: "Examples of bakery, cake-studio and dessert-brand experiences created by STK Lab. Each direction is built around the products, style and business goals of the brand.",
    projects: [
      ["STK Bakery", "Premium website + interactive Cake Builder", "/images/stk-lab/bakery/stk-bakery.webp", "Live demo", "bakery"],
      ["Veloura Cakes", "Luxury cake studio with visual cake customization", "/images/stk-lab/bakery/veloura-cakes.webp", "Live project", "", "https://stklab.tilda.ws/velouracakes"],
      ["Maison Levain", "Artisan European bakery with online pre-order experience", "/images/stk-lab/bakery/maison-sucre.webp", "Live project", "", "https://stklab.tilda.ws/bakery_maison_levain"],
      ["Éclair Maison", "Luxury French pâtisserie with catalogue, ordering and delivery flow", "/images/stk-lab/bakery/bakery-online-store.webp", "Live project", "", "https://stklab.tilda.ws/clairmaison"],
      ["Bakery Admin", "Order management dashboard for bakery teams and owners", "/images/stk-lab/bakery/bakery-admin-dashboard.webp", "Business system", ""],
    ],
    processTitle: "Our Design Process",
    processText: "From the first conversation to the final launch, every step is planned to create a website that reflects your brand and supports your business.",
    process: [
      ["01", "Discovery & Planning", "We learn about your bakery, products, customers and goals to define the right solution."],
      ["02", "Structure & User Experience", "We organize pages and customer journeys so browsing and ordering feel simple on every device."],
      ["03", "Custom Design", "We create a visual direction that highlights your products and reflects your brand identity."],
      ["04", "Development & Launch", "We build the website, optimize performance, test every feature and prepare the project for launch."],
      ["05", "Launch & Growth", "We launch, verify everything works correctly and can expand the site as your business grows."],
    ],
    packagesTitle: "Choose the Right Solution for Your Business",
    packagesText: "Whether you need a simple website or a custom ordering platform, every project is designed around your brand, products and goals.",
    packages: [
      ["Bakery Essentials", "$500", "A professional one-page website for your bakery, products and contact information."],
      ["Bakery Commerce", "$1800", "A complete online store with catalogue, cart, online ordering, payment integration and delivery options."],
      ["Bakery Premium", "$2000", "A customized solution with an interactive Cake Builder, custom-order management and tailored functionality."],
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      ["How long does it take to build a bakery website?", "Most websites are completed within 2–6 weeks, depending on project size, functionality and the speed of content approval."],
      ["Can customers place orders directly on the website?", "Yes. We can build anything from a simple enquiry form to a complete online ordering system with payments, delivery options and custom-order requests."],
      ["Can you create an interactive cake builder?", "Yes. We develop cake configurators where customers customize flavours, sizes and decorations and instantly see the updated price before ordering."],
      ["Will my website work well on mobile devices?", "Yes. Every website is responsive and optimized for smartphones, tablets and desktop computers."],
      ["Can the website grow together with my business?", "Yes. New pages, online ordering, customer accounts, loyalty programs and additional functionality can be added as your business grows."],
    ],
    contactEyebrow: "Contact",
    contactTitle: "Let’s build something exceptional together.",
    contactText: "Whether you need a premium website, an interactive cake builder or a custom digital solution, we would love to hear about your project.",
    contactCta: "Start a project",
  },
  ru: {
    nav: { home: "Главная", services: "Услуги", portfolio: "Портфолио", contact: "Контакты" },
    heroKicker: "Сайты для пекарен и кондитерских",
    heroTitle: "Премиальные сайты для пекарен и кондитерских",
    heroText: "Мы создаём современные сайты для пекарен, кондитерских и десертных брендов, которые помогают красиво представить продукцию, упростить оформление заказов и развивать бизнес.",
    heroCta: "Смотреть портфолио",
    introTitle: "Больше чем просто красивый сайт",
    introEyebrow: "Цифровые решения, созданные специально для пекарен, кондитерских студий и десертных брендов",
    introText1: "Успешный сайт для пекарни должен не только красиво демонстрировать продукцию. Он должен помогать клиентам легко знакомиться с ассортиментом, понимать доступные варианты и оформлять заказы без лишних сложностей.",
    introText2: "Мы создаём продуманные цифровые решения, которые упрощают оформление заказов, сокращают количество однотипных вопросов и превращают сайт в практичный инструмент развития бизнеса.",
    servicesTitle: "Что мы можем создать для вашей пекарни",
    servicesText: "От лаконичных лендингов до полноценных интернет-магазинов и интерактивных конструкторов тортов — каждое решение создаётся с учётом вашей продукции, клиентов и процесса заказа.",
    services: [
      ["Landing страница", "$300", "Лаконичный одностраничный сайт, который знакомит клиентов с вашей пекарней, продукцией, преимуществами и процессом оформления заказов."],
      ["Многостраничный сайт", "$800", "Полноценный сайт с отдельными страницами продукции, услуг, доставки, индивидуальных заказов, галереи и контактов."],
      ["Онлайн-каталог", "$500", "Структурированный каталог продукции с категориями, фотографиями, описаниями, вкусами, размерами и ценами."],
      ["Онлайн-магазин", "$1500", "Полноценный интернет-магазин с каталогом, корзиной, оформлением заказа, онлайн-оплатой и вариантами доставки."],
      ["Форма индивидуального заказа", "$300", "Подробная форма, где клиент может указать дату, размер, вкус, цвет, тематику, надпись и другие пожелания."],
      ["Конструктор тортов", "$2000", "Интерактивный конфигуратор, где клиент собирает свой торт, сразу видит изменения и наблюдает обновление стоимости в реальном времени."],
    ],
    builderEyebrow: "Интерактивный заказ",
    builderTitle: "Позвольте клиентам создать торт своей мечты",
    builderText: "Клиенты смогут выбрать размер, вкус и оформление, мгновенно наблюдая за всеми изменениями. Автоматический расчёт стоимости и удобный интерфейс делают оформление заказа быстрее и проще.",
    builderCta: "Открыть рабочее демо",
    benefitsTitle: "Работайте эффективнее, продавайте больше",
    benefitsText: "Сайт становится не просто витриной — он помогает клиентам быстрее оформлять заказы, сокращает ручную работу и поддерживает развитие бизнеса 24/7.",
    benefits: [
      ["Тратьте меньше времени на одинаковые вопросы", "Клиенты сразу находят цены, размеры, вкусы, информацию о доставке и детали заказа — без ожидания ответа."],
      ["Помогите клиентам заказывать уверенно", "Понятная информация о продукции, красивые галереи и прозрачные цены делают выбор и оформление заказа простыми."],
      ["Увеличивайте средний чек", "Предлагайте подходящие товары, сезонные предложения и дополнительные опции, чтобы стимулировать более крупные покупки."],
      ["Принимайте заказы 24/7", "Пекарня продолжает получать заказы, даже когда вы заняты, спите или обслуживаете клиентов в заведении."],
    ],
    projectsTitle: "Избранные проекты для пекарен",
    projectsText: "Примеры цифровых решений для пекарен, кондитерских студий и десертных брендов. Каждый проект создаётся вокруг продукции, визуального стиля и бизнес-задач бренда.",
    projects: [
      ["STK Bakery", "Премиальный сайт + интерактивный конструктор тортов", "/images/stk-lab/bakery/stk-bakery.webp", "Рабочее демо", "bakery"],
      ["Veloura Cakes", "Luxury cake studio с визуальной кастомизацией тортов", "/images/stk-lab/bakery/veloura-cakes.webp", "Живой проект", "", "https://stklab.tilda.ws/velouracakes"],
      ["Maison Levain", "Ремесленная европейская пекарня с онлайн-предзаказом", "/images/stk-lab/bakery/maison-sucre.webp", "Живой проект", "", "https://stklab.tilda.ws/bakery_maison_levain"],
      ["Éclair Maison", "Luxury pâtisserie с каталогом, заказом и доставкой", "/images/stk-lab/bakery/bakery-online-store.webp", "Живой проект", "", "https://stklab.tilda.ws/clairmaison"],
      ["Bakery Admin", "Система управления заказами для команды и владельца кондитерской", "/images/stk-lab/bakery/bakery-admin-dashboard.webp", "Бизнес-система", ""],
    ],
    processTitle: "Наш процесс разработки",
    processText: "От первой беседы до финального запуска каждый этап продуман так, чтобы сайт отражал ваш бренд и помогал развитию бизнеса.",
    process: [
      ["01", "Исследование и планирование", "Мы изучаем вашу пекарню, продукцию, клиентов и цели, чтобы определить подходящее цифровое решение."],
      ["02", "Структура и пользовательский опыт", "Продумываем страницы и путь клиента так, чтобы просмотр и оформление заказа были простыми на любом устройстве."],
      ["03", "Уникальный дизайн", "Создаём визуальный стиль, который подчёркивает вашу продукцию и отражает индивидуальность бренда."],
      ["04", "Разработка и запуск", "Создаём сайт, оптимизируем производительность, тестируем функции и подготавливаем проект к запуску."],
      ["05", "Запуск и развитие", "Запускаем сайт, проверяем работу и при необходимости добавляем новые функции по мере роста бизнеса."],
    ],
    packagesTitle: "Выберите подходящее решение для бизнеса",
    packagesText: "Независимо от того, нужен ли простой сайт или индивидуальная платформа для заказов, проект создаётся вокруг вашего бренда, продукции и целей.",
    packages: [
      ["Основы для пекарни", "$500", "Профессиональный одностраничный сайт для презентации вашей пекарни, продукции и контактов."],
      ["Онлайн-продажи для пекарни", "$1800", "Полноценный интернет-магазин с каталогом, корзиной, онлайн-заказами, оплатой и вариантами доставки."],
      ["Премиум-решение", "$2000", "Индивидуальное решение с интерактивным конструктором тортов, управлением заказами и уникальным функционалом."],
    ],
    faqTitle: "Часто задаваемые вопросы",
    faqs: [
      ["Сколько времени занимает создание сайта для пекарни?", "Большинство сайтов создаются в течение 2–6 недель в зависимости от размера проекта, функционала и скорости согласования контента."],
      ["Могут ли клиенты оформлять заказы прямо на сайте?", "Да. Мы можем создать всё — от простой формы заявки до полноценной системы онлайн-заказов с оплатой, доставкой и индивидуальными запросами."],
      ["Можете ли вы создать интерактивный конструктор тортов?", "Да. Мы разрабатываем конфигураторы, где клиент выбирает вкусы, размеры и декор и сразу видит обновлённую стоимость перед заказом."],
      ["Будет ли сайт хорошо работать на мобильных устройствах?", "Да. Каждый сайт полностью адаптивен и оптимизирован для смартфонов, планшетов и компьютеров."],
      ["Может ли сайт развиваться вместе с бизнесом?", "Да. Новые страницы, онлайн-заказы, личные кабинеты, программы лояльности и дополнительный функционал можно добавлять по мере роста бизнеса."],
    ],
    contactEyebrow: "Контакты",
    contactTitle: "Давайте создадим что-то действительно особенное.",
    contactText: "Если вам нужен премиальный сайт, интерактивный конструктор тортов или индивидуальное цифровое решение — будем рады обсудить ваш проект.",
    contactCta: "Обсудить проект",
  },
} as const;

export default function BakeryIndustryPage({ locale }: { locale: StkLabLocale }) {
  const t = copy[locale];
  const other = locale === "ru" ? "en" : "ru";
  const message = encodeURIComponent(locale === "ru" ? "Здравствуйте! Хочу обсудить сайт для пекарни или кондитерской." : "Hello! I'd like to discuss a bakery or cake studio website.");

  return (
    <StkSiteShell>
      <header className="sticky top-0 z-50 border-b border-[color:var(--stk-border)] bg-[#f5f0ea]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href={`/${locale}`} className="text-lg font-semibold tracking-[-0.03em]">STK Lab</Link>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            <Link href={`/${locale}`}>{t.nav.home}</Link>
            <a href="#services">{t.nav.services}</a>
            <a href="#portfolio">{t.nav.portfolio}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <Link href={`/${other}/industries/bakeries`} className="rounded-full border border-[color:var(--stk-border)] px-3 py-2 text-xs uppercase tracking-[.14em]">{other}</Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 md:min-h-[760px] md:grid-cols-[1.05fr_.95fr] md:px-8 md:py-24">
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b6d62]">{t.heroKicker}</p>
            <h1 className="mt-7 max-w-4xl text-balance text-5xl font-medium leading-[.98] tracking-[-.055em] md:text-7xl lg:text-[5.6rem]">{t.heroTitle}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[color:var(--stk-muted)] md:text-xl">{t.heroText}</p>
            <a href="#portfolio" className="mt-9 inline-flex rounded-full bg-[#2a211d] px-6 py-3.5 text-sm" style={{ color: "#ffffff" }}>{t.heroCta} ↓</a>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[530px] overflow-hidden rounded-[var(--stk-radius-card)] bg-[#ded0c7] shadow-[0_30px_80px_rgba(69,43,33,.12)]">
            <Image src="/cakes/elegant-01.jpg.jpg" alt="Premium bakery cake" fill priority className="object-cover" sizes="(max-width:768px) 90vw, 40vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
            <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs uppercase tracking-[.18em] backdrop-blur">STK Lab · Bakery</div>
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--stk-border)] bg-[var(--stk-surface-strong)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[.9fr_1.1fr] md:px-8 md:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#8b6d62]">{t.introEyebrow}</p>
            <h2 className="mt-5 text-4xl tracking-[-.045em] md:text-6xl">{t.introTitle}</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-[color:var(--stk-muted)]"><p>{t.introText1}</p><p>{t.introText2}</p></div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="max-w-3xl"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.servicesTitle}</h2><p className="mt-6 text-lg leading-8 text-[color:var(--stk-muted)]">{t.servicesText}</p></div>
        <div className="mt-14 grid border-l border-t border-[color:var(--stk-border)] sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map(([name, price, text], i) => <div key={name} className="min-h-[300px] border-b border-r border-[color:var(--stk-border)] p-7 md:p-9"><div className="flex items-start justify-between gap-5"><span className="text-xs text-[color:var(--stk-faint)]">{String(i+1).padStart(2,"0")}</span><span className="text-sm font-medium">{price}</span></div><h3 className="mt-16 text-2xl tracking-[-.035em]">{name}</h3><p className="mt-4 leading-7 text-[color:var(--stk-muted)]">{text}</p></div>)}
        </div>
      </section>

      <section className="bg-[var(--stk-dark)] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 md:grid-cols-2 md:px-8 md:py-32">
          <div className="relative aspect-square overflow-hidden rounded-[var(--stk-radius-card)] bg-[#d8c6bd]">
            <Image src="/images/stk-lab/bakery/cake-builder-devices.webp" alt="Interactive cake builder on laptop and phone" fill className="object-cover" sizes="(max-width:768px) 90vw, 45vw" />
            <div className="absolute inset-x-5 bottom-5 rounded-[var(--stk-radius-panel)] border border-white/20 bg-black/35 p-5 backdrop-blur-md"><div className="flex items-center justify-between text-xs uppercase tracking-[.16em] text-white/70"><span>Cake Builder</span><span>Live preview</span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/20"><div className="h-full w-3/4 rounded-full bg-white" /></div></div>
          </div>
          <div><p className="text-xs font-semibold uppercase tracking-[.25em] text-white/45">{t.builderEyebrow}</p><h2 className="mt-5 text-4xl tracking-[-.045em] md:text-6xl">{t.builderTitle}</h2><p className="mt-7 max-w-xl text-lg leading-8 text-white/65">{t.builderText}</p><Link href={`/${locale}/bakery`} className="mt-9 inline-flex rounded-full bg-white px-6 py-3.5 text-sm" style={{ color: "#000000" }}>{t.builderCta} ↗</Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="max-w-3xl"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.benefitsTitle}</h2><p className="mt-6 text-lg leading-8 text-[color:var(--stk-muted)]">{t.benefitsText}</p></div>
        <div className="mt-14 grid gap-4 md:grid-cols-2">{t.benefits.map(([name,text],i)=><div key={name} className="rounded-[var(--stk-radius-card)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] p-7 md:p-9"><span className="text-xs text-[color:var(--stk-faint)]">0{i+1}</span><h3 className="mt-10 text-2xl tracking-[-.035em]">{name}</h3><p className="mt-4 leading-7 text-[color:var(--stk-muted)]">{text}</p></div>)}</div>
      </section>

      <section id="portfolio" className="bg-[var(--stk-surface-strong)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8"><div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.24em] text-[#8b6d62]">Portfolio</p><h2 className="mt-4 text-4xl tracking-[-.045em] md:text-6xl">{t.projectsTitle}</h2><p className="mt-6 text-lg leading-8 text-[color:var(--stk-muted)]">{t.projectsText}</p></div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {t.projects.map(([name,desc,img,status,route,externalUrl],i)=>{
              const hasLink = Boolean(route || externalUrl);
              const inner=<div className="group overflow-hidden rounded-[var(--stk-radius-card)] border border-[color:var(--stk-border)] bg-[#f5f0ea]"><div className={`relative overflow-hidden ${i===0?"aspect-[16/8]":"aspect-[16/10]"}`}><Image src={img} alt={name} fill className="object-cover transition duration-700 group-hover:scale-[1.03]" sizes="(max-width:768px) 95vw, 48vw"/><div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"/><span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-xs backdrop-blur">{status}</span></div><div className="p-6 md:p-8"><h3 className="text-3xl tracking-[-.04em]">{name}</h3><p className="mt-3 leading-7 text-[color:var(--stk-muted)]">{desc}</p>{hasLink&&<div className="mt-6 text-sm font-medium">{locale==="ru"?"Открыть проект":"View project"} →</div>}</div></div>;
              if (externalUrl) return <a key={name} href={externalUrl} target="_blank" rel="noreferrer" className={i===0?"md:col-span-2":""}>{inner}</a>;
              return route?<Link key={name} href={`/${locale}/${route}`} className={i===0?"md:col-span-2":""}>{inner}</Link>:<div key={name}>{inner}</div>
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--stk-accent-soft)] py-24 md:py-32"><div className="mx-auto max-w-7xl px-5 md:px-8"><div className="grid gap-8 md:grid-cols-2"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.processTitle}</h2><p className="max-w-xl text-lg leading-8 text-[color:var(--stk-muted)]">{t.processText}</p></div><div className="mt-16 divide-y divide-black/15 border-y border-[color:var(--stk-border)]">{t.process.map(([num,name,text])=><div key={num} className="grid gap-4 py-8 md:grid-cols-[100px_1fr_1.4fr] md:items-start"><span className="text-sm text-[color:var(--stk-faint)]">{num}</span><h3 className="text-2xl tracking-[-.035em]">{name}</h3><p className="max-w-xl leading-7 text-[color:var(--stk-muted)]">{text}</p></div>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"><div className="max-w-3xl"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.packagesTitle}</h2><p className="mt-6 text-lg leading-8 text-[color:var(--stk-muted)]">{t.packagesText}</p></div><div className="mt-14 grid gap-5 lg:grid-cols-3">{t.packages.map(([name,price,text],i)=><div key={name} className={`rounded-[var(--stk-radius-card)] border p-8 ${i===2?"border-[#2a211d] bg-[#2a211d] text-white":"border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)]"}`}><p className={`text-xs uppercase tracking-[.2em] ${i===2?"text-white/50":"text-[color:var(--stk-faint)]"}`}>{i===2?(locale==="ru"?"Самый функциональный":"Most capable"):"STK Lab"}</p><h3 className="mt-10 text-3xl tracking-[-.04em]">{name}</h3><div className="mt-5 text-5xl tracking-[-.05em]">{price}</div><p className={`mt-6 leading-7 ${i===2?"text-white/60":"text-[color:var(--stk-muted)]"}`}>{text}</p><a href={`${whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className={`mt-10 inline-flex rounded-full px-5 py-3 text-sm ${i===2?"bg-white":"bg-[#2a211d]"}`} style={{ color: i === 2 ? "#000000" : "#ffffff" }}>{t.contactCta}</a></div>)}</div></section>

      <section className="border-y border-[color:var(--stk-border)] bg-[var(--stk-surface-strong)] py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.75fr_1.25fr] md:px-8"><h2 className="text-4xl tracking-[-.045em] md:text-6xl">{t.faqTitle}</h2><div className="divide-y divide-black/10 border-y border-[color:var(--stk-border)]">{t.faqs.map(([q,a])=><details key={q} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-xl tracking-[-.025em]"><span>{q}</span><span className="text-[color:var(--stk-faint)] transition group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-2 pt-5 leading-7 text-[color:var(--stk-muted)]">{a}</p></details>)}</div></div></section>

      <section aria-label={locale==="ru"?"Другие направления STK Lab":"Other STK Lab industries"} className="border-t border-[color:var(--stk-border)]"><div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.24em] text-[color:var(--stk-muted-strong)]">{locale==="ru"?"Другие направления":"Other industries"}</p><h2 className="mt-4 text-3xl tracking-[-.04em] md:text-5xl">{locale==="ru"?"Посмотрите другие решения STK Lab":"Explore other STK Lab solutions"}</h2></div><Link href={`/${locale}`} className="text-sm font-medium">{locale==="ru"?"На главную STK Lab":"STK Lab home"} →</Link></div><div className="mt-10 grid gap-3 sm:grid-cols-2"><Link href={`/${locale}/industries/restaurants`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Рестораны":"Restaurants"}</span><span aria-hidden="true">→</span></Link><Link href={`/${locale}/industries/beauty`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Beauty и салоны":"Beauty & Salons"}</span><span aria-hidden="true">→</span></Link><Link href={`/${locale}/industries/travel`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Travel":"Travel"}</span><span aria-hidden="true">→</span></Link><Link href={`/${locale}/industries/business-platforms`} className="flex items-center justify-between rounded-[var(--stk-radius-small)] border border-[color:var(--stk-border)] bg-[color:var(--stk-surface-card)] px-5 py-4 transition hover:-translate-y-0.5"><span>{locale==="ru"?"Бизнес-платформы":"Business Platforms"}</span><span aria-hidden="true">→</span></Link></div></div></section>

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
    </StkSiteShell>
  );
}
