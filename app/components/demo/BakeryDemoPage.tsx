import Image from "next/image";
import Link from "next/link";

import DemoSiteOrderForm from "./DemoSiteOrderForm";
import InteractiveConcept from "./InteractiveConcept";

type Locale = "ru" | "en";
type Kind = "veloura" | "levain" | "eclair";

const data = {
  veloura: {
    brand: "VELOURA CAKES",
    route: "veloura-cakes-demo",
    hero: "/images/stk-lab/bakery/veloura-cakes.webp",
    feature: "/images/stk-lab/bakery/cake-builder-devices.webp",
    bg: "#f6eceb",
    ink: "#4a292f",
    accent: "#b86b78",
    soft: "#ead7d9",
    en: {
      label: "Bespoke cake atelier · made to order",
      title: "A celebration, designed around you.",
      text: "Sculptural cakes, delicate finishes and a calm digital journey from first inspiration to final order.",
      cta: "Create your cake",
      collection: "Signature creations",
      story: "Crafted as a centrepiece",
      storyText:
        "Every cake begins with the occasion, then develops through flavour, scale, colour and hand-finished detail.",
      stats: [
        ["48 h", "design reply"],
        ["18", "signature flavours"],
        ["100%", "made by hand"],
      ],
      items: [
        ["Silk Rose", "vanilla, raspberry, white chocolate", "from $120"],
        ["Pearl Garden", "pistachio, cherry, mascarpone", "from $145"],
        ["Ivory Bloom", "lemon, elderflower, cream", "from $130"],
        ["Midnight Bow", "dark chocolate, hazelnut, coffee", "from $155"],
      ],
      form: "Begin your cake story",
      formText:
        "Share the date, number of guests and the atmosphere you want to create.",
    },
    ru: {
      label: "Авторское ателье тортов · на заказ",
      title: "Праздник, созданный вокруг вас.",
      text: "Скульптурные торты, тонкая отделка и спокойный путь от первого вдохновения до готового заказа.",
      cta: "Создать свой торт",
      collection: "Авторская коллекция",
      story: "Главный акцент праздника",
      storyText:
        "Каждый торт начинается с события, а затем обретает вкус, масштаб, цвет и детали ручной работы.",
      stats: [
        ["48 ч", "ответ по дизайну"],
        ["18", "авторских вкусов"],
        ["100%", "ручная работа"],
      ],
      items: [
        ["Silk Rose", "ваниль, малина, белый шоколад", "от $120"],
        ["Pearl Garden", "фисташка, вишня, маскарпоне", "от $145"],
        ["Ivory Bloom", "лимон, бузина, сливки", "от $130"],
        ["Midnight Bow", "тёмный шоколад, фундук, кофе", "от $155"],
      ],
      form: "Начните историю вашего торта",
      formText:
        "Расскажите о дате, количестве гостей и атмосфере, которую хотите создать.",
    },
  },
  levain: {
    brand: "MAISON LEVAIN",
    route: "maison-levain-demo",
    hero: "/images/stk-lab/bakery/maison-sucre.webp",
    feature: "/images/stk-lab/bakery/levain-shelves-v1.webp",
    bg: "#efe8dc",
    ink: "#3a3025",
    accent: "#9a6a3a",
    soft: "#dfd2be",
    en: {
      label: "Artisan bakery · naturally leavened",
      title: "Bread made slowly. Mornings made better.",
      text: "A neighbourhood bakery devoted to natural fermentation, local grain and warm bread throughout the day.",
      cta: "Pre-order for tomorrow",
      collection: "From the ovens",
      story: "Flour, water, salt and time",
      storyText:
        "Long fermentation builds flavour naturally. Every loaf is mixed, folded and baked by hand in small daily batches.",
      stats: [
        ["36 h", "fermentation"],
        ["4", "local grains"],
        ["7:00", "first bake"],
      ],
      items: [
        ["Country sourdough", "wheat, rye, sea salt", "$8"],
        ["Seeded levain", "sunflower, flax, sesame", "$10"],
        ["Butter croissant", "cultured butter, crisp layers", "$4"],
        ["Morning brioche", "vanilla, orange zest", "$6"],
      ],
      form: "Reserve your bake",
      formText:
        "Choose what you would like us to hold and your preferred collection time.",
    },
    ru: {
      label: "Ремесленная пекарня · натуральная закваска",
      title: "Хлеб, которому дали время. Утро, которое стало лучше.",
      text: "Соседская пекарня с натуральной ферментацией, локальным зерном и свежей выпечкой в течение дня.",
      cta: "Предзаказ на завтра",
      collection: "Из наших печей",
      story: "Мука, вода, соль и время",
      storyText:
        "Долгая ферментация естественно раскрывает вкус. Каждый хлеб замешивается, складывается и выпекается вручную небольшими партиями.",
      stats: [
        ["36 ч", "ферментации"],
        ["4", "локальных зерна"],
        ["7:00", "первая выпечка"],
      ],
      items: [
        ["Деревенский sourdough", "пшеница, рожь, морская соль", "$8"],
        ["Зерновой levain", "подсолнечник, лён, кунжут", "$10"],
        ["Круассан на сливочном масле", "хрустящие воздушные слои", "$4"],
        ["Утренняя бриошь", "ваниль, цедра апельсина", "$6"],
      ],
      form: "Забронируйте свежую выпечку",
      formText: "Выберите продукты и удобное время получения заказа.",
    },
  },
  eclair: {
    brand: "ÉCLAIR MAISON",
    route: "eclair-maison-demo",
    hero: "/images/stk-lab/bakery/bakery-online-store.webp",
    feature: "/images/stk-lab/bakery/eclair-packaging-v1.webp",
    bg: "#f7f4ed",
    ink: "#20201e",
    accent: "#c5a260",
    soft: "#e8e1d3",
    en: {
      label: "French pâtisserie · Parisian delivery",
      title: "Small works of pastry, delivered beautifully.",
      text: "A modern online pâtisserie for éclairs, petits gâteaux and elegant gift boxes prepared for every occasion.",
      cta: "Shop the collection",
      collection: "The maison selection",
      story: "Parisian precision, modern ease",
      storyText:
        "Classic French technique meets online ordering, scheduled delivery and gift-ready presentation.",
      stats: [
        ["12", "daily pastries"],
        ["90 min", "city delivery"],
        ["6", "gift collections"],
      ],
      items: [
        ["Vanilla Éclair", "Madagascar vanilla, choux", "$9"],
        ["Noisette", "hazelnut praline, milk chocolate", "$10"],
        ["Citron", "lemon cream, meringue", "$9"],
        ["Maison Box", "six seasonal pastries", "$52"],
      ],
      form: "Order from the maison",
      formText:
        "Tell us what you need, the delivery date and whether it is a gift.",
    },
    ru: {
      label: "Французская pâtisserie · доставка",
      title: "Маленькие произведения, доставленные красиво.",
      text: "Современная онлайн-кондитерская с эклерами, petits gâteaux и элегантными подарочными наборами для любого события.",
      cta: "Открыть коллекцию",
      collection: "Коллекция maison",
      story: "Парижская точность и современное удобство",
      storyText:
        "Классическая французская техника сочетается с онлайн-заказом, доставкой ко времени и подарочной подачей.",
      stats: [
        ["12", "десертов ежедневно"],
        ["90 мин", "доставка по городу"],
        ["6", "подарочных коллекций"],
      ],
      items: [
        ["Vanilla Éclair", "мадагаскарская ваниль, заварное тесто", "$9"],
        ["Noisette", "фундучное пралине, молочный шоколад", "$10"],
        ["Citron", "лимонный крем, меренга", "$9"],
        ["Maison Box", "шесть сезонных десертов", "$52"],
      ],
      form: "Заказ из maison",
      formText:
        "Укажите, что вам нужно, дату доставки и будет ли это подарком.",
    },
  },
} as const;

export default function BakeryDemoPage({
  locale,
  kind,
}: {
  locale: Locale;
  kind: Kind;
}) {
  const item = data[kind];
  const t = item[locale];
  const other = locale === "ru" ? "en" : "ru";
  const veloura = kind === "veloura";
  const levain = kind === "levain";
  const imageA = veloura
    ? "/images/stk-lab/bakery/veloura-cake-artist-v1.webp"
    : levain
      ? "/images/stk-lab/bakery/levain-scoring-v1.webp"
      : "/images/stk-lab/bakery/eclair-gift-box-v1.webp";
  const imageB = veloura
    ? "/images/stk-lab/bakery/veloura-consultation-v1.webp"
    : levain
      ? "/images/stk-lab/bakery/levain-shelves-v1.webp"
      : "/images/stk-lab/bakery/eclair-packaging-v1.webp";
  const shape = veloura
    ? "rounded-[45%_45%_2rem_2rem]"
    : levain
      ? "rounded-none"
      : "rounded-[1.25rem]";

  return (
    <main
      style={{ background: item.bg, color: item.ink }}
      className="min-h-screen overflow-hidden"
    >
      <div
        className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-center text-[10px] uppercase tracking-[.2em] ${levain ? "border-b border-black/20 bg-[#3a3025] text-[#efe8dc]" : "opacity-70"}`}
      >
        <span>
          {locale === "ru"
            ? "Демо-пекарня · создано Tafa Lab"
            : "Demo bakery · created by Tafa Lab"}
        </span>
        <Link href={`/${locale}/industries/bakeries`}>
          {locale === "ru" ? "Все проекты" : "All bakery projects"} →
        </Link>
      </div>
      <header
        className={`flex items-center justify-between px-5 md:px-10 ${levain ? "py-4 font-mono uppercase" : "py-6"}`}
        style={{ borderColor: `${item.ink}22` }}
      >
        <div
          className={`${veloura ? "font-serif italic" : levain ? "font-mono font-black" : "font-serif"} text-xl tracking-[.14em] md:text-2xl`}
        >
          {item.brand}
        </div>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#collection">
            {locale === "ru" ? "Коллекция" : "Collection"}
          </a>
          <a href="#story">{locale === "ru" ? "История" : "Story"}</a>
          <a href="#order">{locale === "ru" ? "Заказать" : "Order"}</a>
        </nav>
        <Link
          href={`/${other}/${item.route}`}
          className={`${levain ? "border-b-2" : "rounded-full border"} px-4 py-2 text-xs uppercase`}
          style={{ borderColor: `${item.ink}55` }}
        >
          {other}
        </Link>
      </header>

      {veloura ? (
        <section className="mx-auto grid min-h-[760px] max-w-[1500px] items-center gap-10 px-5 py-12 md:grid-cols-[.9fr_1.1fr] md:px-10">
          <div className="relative z-10 md:pr-6">
            <p className="text-xs uppercase tracking-[.3em] opacity-55">
              {t.label}
            </p>
            <h1 className="mt-7 font-serif text-6xl italic leading-[.9] tracking-[-.06em] md:text-8xl lg:text-[7.2rem]">
              {t.title}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 opacity-65">
              {t.text}
            </p>
            <a
              href="#order"
              className="mt-9 inline-flex rounded-full px-7 py-4 text-sm font-semibold text-white"
              style={{ background: item.ink }}
            >
              {t.cta} →
            </a>
          </div>
          <div className="relative min-h-[620px]">
            <div className="absolute inset-x-12 top-0 bottom-14 overflow-hidden rounded-[50%_50%_2rem_2rem]">
              <Image
                src={item.hero}
                alt={item.brand}
                fill
                className="object-cover"
                priority
                sizes="60vw"
              />
            </div>
            <div
              className="absolute bottom-0 left-0 h-56 w-44 overflow-hidden rounded-full border-8"
              style={{ borderColor: item.bg }}
            >
              <Image
                src={imageA}
                alt="Cake atelier"
                fill
                className="object-cover"
                sizes="180px"
              />
            </div>
          </div>
        </section>
      ) : levain ? (
        <section className="border-y border-black/20">
          <div className="grid min-h-[740px] md:grid-cols-[.72fr_1.28fr]">
            <div className="flex flex-col justify-between border-r border-black/20 px-5 py-12 md:px-10">
              <p className="font-mono text-xs uppercase tracking-[.25em]">
                {t.label}
              </p>
              <div>
                <h1 className="font-mono text-5xl font-black uppercase leading-[.9] tracking-[-.06em] md:text-7xl">
                  {t.title}
                </h1>
                <p className="mt-7 max-w-lg text-lg leading-8 opacity-65">
                  {t.text}
                </p>
              </div>
              <a
                href="#order"
                className="w-fit border-b-2 pb-2 font-mono text-sm font-bold uppercase"
              >
                {t.cta} →
              </a>
            </div>
            <div className="relative min-h-[560px]">
              <Image
                src={item.hero}
                alt={item.brand}
                fill
                className="object-cover"
                priority
                sizes="70vw"
              />
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-5 pb-24 pt-14 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[.35em] opacity-45">
                {t.label}
              </p>
              <h1 className="mt-8 font-serif text-6xl leading-[.92] tracking-[-.06em] md:text-8xl">
                {t.title}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 opacity-60">
                {t.text}
              </p>
              <a
                href="#collection"
                className="mt-9 inline-flex rounded-full border px-7 py-4 text-sm"
              >
                {t.cta} →
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative mt-20 aspect-[3/4] overflow-hidden rounded-t-full">
                <Image
                  src={item.hero}
                  alt={item.brand}
                  fill
                  className="object-cover"
                  priority
                  sizes="30vw"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-b-full">
                <Image
                  src={imageA}
                  alt="Pâtisserie gift box"
                  fill
                  className="object-cover"
                  sizes="30vw"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section
        id="story"
        className={`mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32 ${levain ? "font-mono" : ""}`}
      >
        <div
          className={`grid gap-10 ${veloura ? "md:grid-cols-[.8fr_1.2fr]" : levain ? "md:grid-cols-[1fr_1fr]" : "md:grid-cols-[1.15fr_.85fr]"}`}
        >
          <div>
            <p className="text-xs uppercase tracking-[.3em] opacity-45">
              {veloura
                ? locale === "ru"
                  ? "Ателье"
                  : "The atelier"
                : levain
                  ? locale === "ru"
                    ? "Мука · вода · время"
                    : "Flour · water · time"
                  : locale === "ru"
                    ? "Maison"
                    : "The maison"}
            </p>
            <h2
              className={`${veloura ? "font-serif italic" : levain ? "font-mono uppercase" : "font-serif"} mt-5 text-5xl tracking-[-.05em] md:text-7xl`}
            >
              {t.story}
            </h2>
            <p className="mt-7 max-w-2xl text-xl leading-9 opacity-65">
              {t.storyText}
            </p>
          </div>
          <div className={`relative min-h-[360px] overflow-hidden ${shape}`}>
            <Image
              src={imageA}
              alt={t.story}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      {veloura && (
        <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-28 md:grid-cols-[1.2fr_.8fr] md:px-10">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem]">
            <Image
              src={imageB}
              alt="Bespoke cake consultation"
              fill
              className="object-cover"
              sizes="65vw"
            />
          </div>
          <div
            className="flex flex-col justify-center rounded-[2rem] p-8 text-white md:p-12"
            style={{ background: item.ink }}
          >
            <p className="text-xs uppercase tracking-[.28em] text-white/45">
              {locale === "ru" ? "Персональный процесс" : "Personal process"}
            </p>
            <h3 className="mt-7 font-serif text-4xl italic">
              {locale === "ru"
                ? "От настроения до центрального акцента."
                : "From a mood to the centrepiece."}
            </h3>
            <ol className="mt-10 space-y-5 text-sm text-white/65">
              <li>
                01 —{" "}
                {locale === "ru"
                  ? "Консультация и референсы"
                  : "Consultation and references"}
              </li>
              <li>
                02 —{" "}
                {locale === "ru"
                  ? "Эскиз, вкус и масштаб"
                  : "Sketch, flavour and scale"}
              </li>
              <li>
                03 —{" "}
                {locale === "ru"
                  ? "Ручная отделка и доставка"
                  : "Hand finishing and delivery"}
              </li>
            </ol>
          </div>
        </section>
      )}
      {levain && (
        <>
          <section className="grid border-y border-black/20 md:grid-cols-2">
            <div className="relative min-h-[560px]">
              <Image
                src="/images/stk-lab/bakery/levain-grandmother-starter-v1.webp"
                alt={
                  locale === "ru"
                    ? "Хозяйка Maison Levain с семейной закваской"
                    : "Maison Levain baker with the family starter"
                }
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="flex flex-col justify-center p-8 font-mono md:p-14">
              <p className="text-xs uppercase tracking-[.24em] opacity-45">
                {locale === "ru"
                  ? "Закваска с историей"
                  : "A starter with a history"}
              </p>
              <h3 className="mt-6 text-4xl font-black uppercase leading-tight md:text-6xl">
                {locale === "ru"
                  ? "Всё началось с банки, которую мне передала бабушка."
                  : "It began with a jar my grandmother passed down to me."}
              </h3>
              <p className="mt-8 max-w-xl text-base normal-case leading-8 opacity-65">
                {locale === "ru"
                  ? "Она учила меня не торопить тесто и узнавать готовый хлеб по звуку корочки. Этой закваске больше тридцати лет. Каждое утро мы кормим её первой — ещё до того, как включаем свет в зале."
                  : "She taught me never to hurry dough and to recognise a finished loaf by the sound of its crust. The starter is over thirty years old. Each morning we feed it before we even turn on the lights out front."}
              </p>
              <p
                className="mt-8 border-l-4 pl-5 text-sm font-bold uppercase"
                style={{ borderColor: item.accent }}
              >
                —{" "}
                {locale === "ru"
                  ? "Анна, основательница Maison Levain"
                  : "Anna, founder of Maison Levain"}
              </p>
            </div>
          </section>
          <section className="grid border-b border-black/20 md:grid-cols-2">
            <div className="relative min-h-[520px]">
              <Image
                src={imageB}
                alt="Bakery shelves"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="grid grid-rows-3 font-mono uppercase">
              <div className="border-b border-black/20 p-8 md:p-12">
                <span className="text-xs opacity-40">07:00</span>
                <h3 className="mt-3 text-3xl font-black">
                  {locale === "ru" ? "Первая выпечка" : "First bake"}
                </h3>
              </div>
              <div className="border-b border-black/20 p-8 md:p-12">
                <span className="text-xs opacity-40">12:30</span>
                <h3 className="mt-3 text-3xl font-black">
                  {locale === "ru" ? "Дневная партия" : "Midday batch"}
                </h3>
              </div>
              <div className="p-8 md:p-12">
                <span className="text-xs opacity-40">17:00</span>
                <h3 className="mt-3 text-3xl font-black">
                  {locale === "ru" ? "Хлеб к ужину" : "Bread for dinner"}
                </h3>
              </div>
            </div>
          </section>
        </>
      )}
      {!veloura && !levain && (
        <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-28 md:grid-cols-2 md:px-10">
          <div className="relative min-h-[500px] overflow-hidden rounded-[1.5rem]">
            <Image
              src={imageB}
              alt="Gift-ready pâtisserie"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="flex flex-col justify-center px-4 md:px-12">
            <p className="text-xs uppercase tracking-[.3em] opacity-45">
              {locale === "ru" ? "Подарочный сервис" : "Gifting service"}
            </p>
            <h3 className="mt-6 font-serif text-5xl">
              {locale === "ru"
                ? "Собрано, подписано и доставлено ко времени."
                : "Selected, wrapped and delivered on time."}
            </h3>
            <p className="mt-6 leading-8 opacity-60">
              {locale === "ru"
                ? "Выберите коллекцию, добавьте карточку и назначьте точное окно доставки."
                : "Choose a collection, add a card and schedule a precise delivery window."}
            </p>
          </div>
        </section>
      )}

    <InteractiveConcept
      locale={locale}
      mode={veloura ? "cake" : levain ? "season" : "dessert"}
      accent={item.accent}
      ink={item.ink}
    />

    <section
      id="collection"
        className="px-5 py-24 md:px-10 md:py-32"
        style={{ background: item.soft }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[.3em] opacity-45">
            {locale === "ru" ? "Коллекция" : "Collection"}
          </p>
          <h2
            className={`${veloura ? "font-serif italic" : levain ? "font-mono uppercase" : "font-serif"} mt-4 text-5xl tracking-[-.05em] md:text-7xl`}
          >
            {t.collection}
          </h2>
          <div
            className={`mt-14 grid ${veloura ? "gap-5 md:grid-cols-4" : levain ? "border-t border-black/25 md:grid-cols-2" : "gap-5 md:grid-cols-2"}`}
          >
            {t.items.map(([name, desc, price], i) => (
              <article
                key={name}
                className={`${veloura ? "rounded-[8rem_8rem_1.5rem_1.5rem] bg-white/35 p-7 pt-16" : levain ? "border-b border-black/25 p-7 font-mono md:border-r" : "rounded-[1.25rem] border bg-white/45 p-7"}`}
                style={{ borderColor: `${item.ink}25` }}
              >
                <span className="text-xs opacity-35">0{i + 1}</span>
                <h3 className="mt-8 text-xl font-semibold">{name}</h3>
                <p className="mt-2 text-sm opacity-55">{desc}</p>
                <strong className="mt-8 block" style={{ color: item.accent }}>
                  {price}
                </strong>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="order"
        className="px-5 py-24 text-white md:px-10 md:py-32"
        style={{ background: item.ink }}
      >
        <div
          className={`mx-auto ${levain ? "max-w-6xl text-left" : "max-w-5xl text-center"}`}
        >
          <p className="text-xs uppercase tracking-[.3em] text-white/45">
            {locale === "ru" ? "Заказ · демо" : "Order · demo"}
          </p>
          <h2
            className={`${veloura ? "font-serif italic" : levain ? "font-mono uppercase" : "font-serif"} mt-5 text-5xl tracking-[-.05em] md:text-7xl`}
          >
            {t.form}
          </h2>
          <p
            className={`${levain ? "" : "mx-auto"} mt-5 max-w-xl text-lg text-white/60`}
          >
            {t.formText}
          </p>
          <DemoSiteOrderForm
            locale={locale}
            siteName={`${item.brand} — bakery order`}
            kind="bakery"
          />
        </div>
      </section>
      <footer className="flex flex-col gap-3 px-5 py-8 text-xs opacity-60 md:flex-row md:justify-between md:px-10">
        <span>© 2026 {item.brand}</span>
        <span>
          {locale === "ru"
            ? "Демонстрационный сайт Tafa Lab"
            : "A demonstration website by Tafa Lab"}
        </span>
      </footer>
    </main>
  );
}
