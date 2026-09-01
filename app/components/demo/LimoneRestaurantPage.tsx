import Image from "next/image";
import Link from "next/link";
import DemoSiteOrderForm from "./DemoSiteOrderForm";
import LimoneHeroMotion from "./LimoneHeroMotion";

type Locale = "ru" | "en";
const text = {
  en: {
    nav: ["Our story", "Cuisine", "Ingredients", "Gallery"],
    eyebrow: "Amalfi Coast · Est. 1978",
    title: "A Garden of Lemons.",
    intro: "A house built on sunlight, stone and salt.",
    story:
      "In 1978, Nonna Lucia planted twelve lemon trees beside the Marino family home. What began as Sunday lunches under their branches became Limoné — a restaurant shaped by three generations, the coast and the seasons.",
    cuisine: "From our terrace, to your plate.",
    garden: "Every ingredient has a name, a place, a season.",
    reserve: "Your table above the sea.",
    reserveText:
      "Join us in Praiano for a long lunch, a sunset dinner or a private celebration.",
    button: "Reserve a table",
    menu: "Explore the menu",
    storyLabel: "Our story",
    cuisineLabel: "Our cuisine",
    gardenLabel: "The garden",
    spaces: ["Dining Room", "Lemon Terrace", "Private Dining", "Chef's Table"],
    dishes: [
      ["Hand-rolled Pasta", "Flour, eggs and the patience of our kitchen."],
      ["Coastal Seafood", "The morning catch, treated simply."],
      ["Garden Salads", "Leaves, herbs and citrus picked nearby."],
      ["Seasonal Desserts", "Lemon, almond and memories of home."],
    ],
  },
  ru: {
    nav: ["История", "Кухня", "Ингредиенты", "Галерея"],
    eyebrow: "Амальфитанское побережье · с 1978",
    title: "Сад лимонов.",
    intro: "Дом, построенный из солнца, камня и соли.",
    story:
      "В 1978 году бабушка Лючия посадила двенадцать лимонных деревьев у дома семьи Марино. Воскресные обеды под их ветвями превратились в Limoné — ресторан трёх поколений, моря и сменяющихся сезонов.",
    cuisine: "С нашей террасы — прямо на вашу тарелку.",
    garden: "У каждого ингредиента есть имя, место и сезон.",
    reserve: "Ваш стол над морем.",
    reserveText:
      "Ждём вас в Праяно на долгий обед, ужин на закате или частный праздник.",
    button: "Забронировать стол",
    menu: "Посмотреть меню",
    storyLabel: "Наша история",
    cuisineLabel: "Наша кухня",
    gardenLabel: "Лимонный сад",
    spaces: ["Главный зал", "Лимонная терраса", "Частный зал", "Стол шефа"],
    dishes: [
      ["Паста ручной работы", "Мука, яйца и терпение нашей кухни."],
      ["Морепродукты побережья", "Утренний улов, приготовленный просто."],
      ["Салаты из сада", "Листья, травы и цитрусы с соседних склонов."],
      ["Сезонные десерты", "Лимон, миндаль и воспоминания о доме."],
    ],
  },
} as const;

export default function LimoneRestaurantPage({ locale }: { locale: Locale }) {
  const t = text[locale],
    other = locale === "ru" ? "en" : "ru";
  return (
    <main className="min-h-screen bg-[#f7f1e4] text-[#2a2520]">
      <div className="bg-[#2f4b2f] px-4 py-2 text-center text-[10px] uppercase tracking-[.22em] text-[#f7f1e4]">
        {locale === "ru"
          ? "Демонстрационный проект Tafa Lab"
          : "A portfolio project by Tafa Lab"}
      </div>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#2a252033] bg-[#f7f1e4e8] px-5 py-4 backdrop-blur md:px-10">
        <Link
          href={`/${locale}/industries/restaurants`}
          className="flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2a2520] font-serif text-xl italic">
            L
          </span>
          <strong className="tracking-[.18em]">LIMONÉ</strong>
        </Link>
        <nav className="hidden gap-7 text-[11px] uppercase tracking-[.15em] lg:flex">
          {t.nav.map((x, i) => (
            <a key={x} href={["#story", "#cuisine", "#garden", "#gallery"][i]}>
              {x}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            className="text-xs uppercase"
            href={`/${other}/limone-restaurant-demo`}
          >
            {other}
          </Link>
          <a
            href="#reserve"
            className="rounded-full bg-[#2f4b2f] px-4 py-2.5 text-xs uppercase !text-[#f7f1e4]" style={{ color: "#f7f1e4" }}
          >
            {t.button}
          </a>
        </div>
      </header>
      <section className="relative flex min-h-[720px] items-end overflow-hidden text-[#f7f1e4]">
        <Image
          src="/images/stk-lab/restaurants/demos/limone-hero-lemon-tree.webp"
          alt="Limoné lemon tree terrace"
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
        <LimoneHeroMotion />
        <div className="relative z-10 w-full px-5 pb-16 md:px-10 md:pb-20">
          <p className="text-xs uppercase tracking-[.3em]">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-serif text-7xl leading-[.84] tracking-[-.06em] md:text-[9rem]">
            {t.title}
          </h1>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#reserve"
              className="rounded-full bg-[#e6c94f] px-6 py-3.5 text-sm text-[#2a2520]"
            >
              {t.button}
            </a>
            <a
              href="#cuisine"
              className="rounded-full border border-white/60 px-6 py-3.5 text-sm"
            >
              {t.menu}
            </a>
          </div>
        </div>
      </section>
      <div className="grid border-b border-[#2a252033] sm:grid-cols-3">
        {[
          ["Michelin Green Star", "2024"],
          [locale === "ru" ? "Часы" : "Hours", "Tue–Sun · 12–23"],
          [locale === "ru" ? "Место" : "Location", "Via dei Limoni · Praiano"],
        ].map(([a, b]) => (
          <div key={a} className="border-r border-[#2a252033] p-6">
            <p className="text-[10px] uppercase tracking-[.2em] opacity-55">
              {a}
            </p>
            <p className="mt-2 font-serif text-xl">{b}</p>
          </div>
        ))}
      </div>
      <section
        id="story"
        className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32"
      >
        <div>
          <p className="text-xs uppercase tracking-[.25em] text-[#718049]">
            {t.storyLabel}
          </p>
          <h2 className="mt-5 font-serif text-5xl leading-[.95] md:text-7xl">
            {t.intro}
          </h2>
        </div>
        <div className="self-end">
          <p className="text-lg leading-8 opacity-70">{t.story}</p>
          <div className="mt-10 grid grid-cols-3 border-y border-[#2a252033] py-7 text-center">
            {[
              ["46", "years"],
              ["12", "artisans"],
              ["3", "generations"],
            ].map(([n, l]) => (
              <div key={l}>
                <strong className="font-serif text-3xl">{n}</strong>
                <p className="text-xs opacity-55">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="cuisine"
        className="bg-[#2f4b2f] px-5 py-24 text-[#f7f1e4] md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[.25em] text-[#e6c94f]">
            {t.cuisineLabel}
          </p>
          <h2 className="mt-5 max-w-5xl font-serif text-5xl leading-[.95] md:text-7xl">
            {t.cuisine}
          </h2>
          <div className="mt-16 grid border-l border-t border-white/20 md:grid-cols-4">
            {t.dishes.map(([name, desc], i) => (
              <article
                key={name}
                className="min-h-72 border-b border-r border-white/20 p-7"
              >
                <span className="text-xs text-white/40">0{i + 1}</span>
                <h3 className="mt-20 font-serif text-3xl">{name}</h3>
                <p className="mt-4 leading-6 text-white/55">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="garden"
        className="mx-auto grid max-w-7xl gap-5 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32"
      >
        <div className="relative min-h-[620px]">
          <Image
            src="/images/stk-lab/restaurants/demos/limone-lemon-tree.jpg"
            alt="Limoné lemon tree"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between bg-[#e9dfc8] p-8 md:p-14">
          <div>
            <p className="text-xs uppercase tracking-[.25em] text-[#718049]">
              {t.gardenLabel}
            </p>
            <h2 className="mt-5 font-serif text-5xl leading-[.95] md:text-7xl">
              {t.garden}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-y-5 border-t border-[#2a252033] pt-8 text-lg">
            {["Lemons", "Olive oil", "Basil & rosemary", "Sea salt"].map(
              (x) => (
                <span key={x}>{x}</span>
              ),
            )}
          </div>
        </div>
      </section>
      <section id="gallery" className="grid md:grid-cols-2">
        <div className="relative min-h-[560px]">
          <Image
            src="https://static.tildacdn.ink/tild6338-3764-4163-a639-613166636535/photo-1447279506476-.jpg"
            alt="Handmade pasta"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 bg-[#d8c56b]">
          {t.spaces.map((x, i) => (
            <div
              key={x}
              className="flex min-h-64 flex-col justify-between border-b border-r border-[#2a252033] p-7"
            >
              <span className="text-xs">0{i + 1}</span>
              <h3 className="font-serif text-3xl">{x}</h3>
            </div>
          ))}
        </div>
      </section>
      <section
        id="reserve"
        className="bg-[#263a28] px-5 py-24 text-[#f7f1e4] md:px-10 md:py-32"
      >
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[.25em] text-[#e6c94f]">
              Reservations
            </p>
            <h2 className="mt-5 font-serif text-6xl leading-[.9]">
              {t.reserve}
            </h2>
            <p className="mt-6 leading-7 text-white/60">{t.reserveText}</p>
            <p className="mt-10 text-sm leading-7">
              Via dei Limoni, Praiano
              <br />
              Tue–Sun · 12:00–23:00
              <br />
              hello@limone.example
            </p>
          </div>
          <div>
            <DemoSiteOrderForm
              locale={locale}
              siteName="Limoné — restaurant reservation"
              kind="restaurant"
            />
          </div>
        </div>
      </section>
      <footer className="flex flex-col justify-between gap-5 px-5 py-10 text-xs uppercase tracking-[.15em] md:flex-row md:px-10">
        <span>© 2026 Limoné</span>
        <span>Amalfi Coast · Italy</span>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="https://tafalab.com">Tafa Lab home →</Link>
          <Link href="https://tafalab.com/en/industries/restaurants">
            Restaurant websites →
          </Link>
        </div>
      </footer>
    </main>
  );
}
