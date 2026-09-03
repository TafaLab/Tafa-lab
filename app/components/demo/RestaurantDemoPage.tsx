import Image from "next/image";
import Link from "next/link";

import DemoSiteOrderForm from "./DemoSiteOrderForm";
import InteractiveConcept from "./InteractiveConcept";

type Locale = "ru" | "en";
type Kind = "mediterranean" | "vegan" | "halal" | "japanese";

const data = {
  mediterranean: {
    brand: "LIMONÉ",
    hero: "/images/stk-lab/restaurants/restaurant-website-hero.webp",
    storyImage:
      "/images/stk-lab/restaurants/demos/verdant-open-kitchen-v1.webp",
    bg: "#f6f1e7",
    ink: "#294232",
    accent: "#e8b84a",
    soft: "#eee3c9",
    en: {
      label: "Mediterranean kitchen · seasonal table",
      title: "Sunlight, season and the pleasure of sharing.",
      text: "A relaxed Mediterranean restaurant shaped by coastal ingredients, open-fire cooking and generous hospitality.",
      cta: "Reserve a table",
      menu: "From the coast",
      story: "Made for long lunches",
      storyText:
        "Seasonal produce, bright citrus, olive oil and the warmth of the grill come together in dishes designed for the whole table.",
      stats: [
        ["14", "seasonal dishes"],
        ["6 days", "lunch and dinner"],
        ["20", "private guests"],
      ],
      dishes: [
        ["Whipped feta", "roasted peppers, warm bread", "$10"],
        ["Charred octopus", "lemon, potato, oregano", "$19"],
        ["Sea bass crudo", "citrus, olive oil, herbs", "$18"],
        ["Lemon chicken", "artichoke, green olives", "$21"],
        ["Wild mushroom orzo", "parmesan, thyme", "$17"],
        ["Olive oil cake", "lemon cream", "$9"],
      ],
      form: "Plan your table",
      formText: "Choose a date, party size and tell us if you are celebrating.",
    },
    ru: {
      label: "Средиземноморская кухня · сезонное меню",
      title: "Солнце, сезон и удовольствие быть вместе.",
      text: "Спокойный средиземноморский ресторан с прибрежными продуктами, открытым огнём и щедрым гостеприимством.",
      cta: "Забронировать стол",
      menu: "Вкус побережья",
      story: "Для долгих обедов",
      storyText:
        "Сезонные продукты, яркие цитрусы, оливковое масло и тепло гриля объединяются в блюдах для общего стола.",
      stats: [
        ["14", "сезонных блюд"],
        ["6 дней", "обеды и ужины"],
        ["20", "гостей в private room"],
      ],
      dishes: [
        ["Взбитая фета", "печёный перец, тёплый хлеб", "$10"],
        ["Осьминог на гриле", "лимон, картофель, орегано", "$19"],
        ["Крудо из сибаса", "цитрус, оливковое масло, травы", "$18"],
        ["Лимонный цыплёнок", "артишок, зелёные оливки", "$21"],
        ["Орзо с лесными грибами", "пармезан, тимьян", "$17"],
        ["Пирог с оливковым маслом", "лимонный крем", "$9"],
      ],
      form: "Запланируйте встречу",
      formText:
        "Выберите дату, количество гостей и сообщите, если у вас праздник.",
    },
  },
  vegan: {
    brand: "VERDANT",
    hero: "/images/stk-lab/restaurants/demos/verde-restaurant-hero-v2.webp",
    storyImage:
      "/images/stk-lab/restaurants/demos/verdant-open-kitchen-v1.webp",
    bg: "#f2f3e8",
    ink: "#173f2c",
    accent: "#b9d46a",
    soft: "#dfe8c8",
    en: {
      label: "Plant-led restaurant · seasonal kitchen",
      title: "Plants, grown into something memorable.",
      text: "A bright neighbourhood restaurant where seasonal vegetables, thoughtful technique and local growers lead the menu.",
      cta: "Reserve a table",
      menu: "This week’s harvest",
      story: "From soil to table",
      storyText:
        "We work with small farms, cook with the whole plant and change the menu as the fields change.",
      stats: [
        ["12", "local growers"],
        ["86%", "seasonal produce"],
        ["0", "single-use plastic"],
      ],
      dishes: [
        ["Beetroot tartare", "horseradish, capers, rye", "$11"],
        ["Charred cauliflower", "almond cream, herbs", "$14"],
        ["Wild mushroom risotto", "barley miso, thyme", "$18"],
        ["Green coconut curry", "seasonal greens, jasmine rice", "$16"],
        ["Garden bowl", "avocado, grains, tahini", "$13"],
        ["Chocolate · tahini", "olive oil, sea salt", "$9"],
      ],
      form: "Plan a green evening",
      formText: "Choose a date and tell us about allergies or the occasion.",
    },
    ru: {
      label: "Растительный ресторан · сезонная кухня",
      title: "Растения, которые становятся впечатлением.",
      text: "Светлый городской ресторан, где сезонные овощи, точная техника и локальные фермеры определяют меню.",
      cta: "Забронировать стол",
      menu: "Урожай этой недели",
      story: "От земли до стола",
      storyText:
        "Работаем с небольшими фермами, используем растение целиком и меняем меню вместе с сезоном.",
      stats: [
        ["12", "локальных ферм"],
        ["86%", "сезонных продуктов"],
        ["0", "одноразового пластика"],
      ],
      dishes: [
        ["Тартар из свёклы", "хрен, каперсы, ржаной хлеб", "$11"],
        ["Цветная капуста на огне", "миндальный крем, травы", "$14"],
        ["Ризотто с лесными грибами", "мисо из ячменя, тимьян", "$18"],
        ["Зелёный кокосовый карри", "овощи, жасминовый рис", "$16"],
        ["Садовый боул", "авокадо, крупы, тахини", "$13"],
        ["Шоколад · тахини", "оливковое масло, морская соль", "$9"],
      ],
      form: "Запланируйте зелёный вечер",
      formText: "Выберите дату и сообщите об аллергиях или поводе.",
    },
  },
  halal: {
    brand: "NOOR TABLE",
    hero: "/images/stk-lab/restaurants/demos/noor-halal-hero-v2.webp",
    storyImage: "/images/stk-lab/restaurants/demos/noor-family-dining-v1.webp",
    bg: "#f6eadc",
    ink: "#174238",
    accent: "#c8784e",
    soft: "#ead0b6",
    en: {
      label: "Contemporary halal dining · family table",
      title: "Hospitality begins with generosity.",
      text: "A refined halal table inspired by Central Asia and the Middle East—open fire, fragrant spices and dishes made to share.",
      cta: "Book your table",
      menu: "The sharing table",
      story: "Halal, clearly",
      storyText:
        "100% halal ingredients, an alcohol-free kitchen and a menu designed for families, celebrations and private dining.",
      stats: [
        ["100%", "halal kitchen"],
        ["7 days", "family dining"],
        ["24", "private guests"],
      ],
      dishes: [
        ["House mezze", "hummus, muhammara, warm bread", "$12"],
        ["Saffron chicken", "apricot, almond, couscous", "$19"],
        ["Slow lamb shoulder", "pilaf, dates, jus", "$26"],
        ["Charcoal sea bass", "sumac, herbs, lemon", "$24"],
        ["Pumpkin manty", "yoghurt, chilli butter", "$15"],
        ["Pistachio milk cake", "rose, berries", "$10"],
      ],
      form: "Gather around our table",
      formText: "Tell us the date, number of guests and any dietary wishes.",
    },
    ru: {
      label: "Современная halal-кухня · семейный ресторан",
      title: "Гостеприимство начинается со щедрости.",
      text: "Современный халяльный ресторан с мотивами Центральной Азии и Ближнего Востока: открытый огонь, специи и блюда для большой компании.",
      cta: "Забронировать стол",
      menu: "Меню для общего стола",
      story: "Halal — без сомнений",
      storyText:
        "100% халяльные продукты, кухня без алкоголя и меню для семейных встреч, праздников и закрытых ужинов.",
      stats: [
        ["100%", "halal-кухня"],
        ["7 дней", "для всей семьи"],
        ["24", "гостя в private room"],
      ],
      dishes: [
        ["Домашнее мезе", "хумус, мухаммара, тёплый хлеб", "$12"],
        ["Цыплёнок с шафраном", "абрикос, миндаль, кускус", "$19"],
        ["Томлёная лопатка ягнёнка", "плов, финики, жю", "$26"],
        ["Сибас на углях", "сумах, зелень, лимон", "$24"],
        ["Манты с тыквой", "йогурт, пряное масло", "$15"],
        ["Фисташковый молочный торт", "роза, ягоды", "$10"],
      ],
      form: "Соберитесь за нашим столом",
      formText: "Укажите дату, количество гостей и особые пожелания.",
    },
  },
  japanese: {
    brand: "KURO 炉端",
    hero: "/images/stk-lab/restaurants/demos/kaiseki-restaurant-hero-v2.webp",
    storyImage: "/images/stk-lab/restaurants/demos/kuro-robata-counter-v1.webp",
    bg: "#080808",
    ink: "#f3eee4",
    accent: "#ef4b2f",
    soft: "#171717",
    en: {
      label: "Tokyo fire kitchen · robata counter",
      title: "Fire. Smoke. Precision.",
      text: "An intimate Japanese dining room built around charcoal, seasonal seafood and the rhythm of the robata counter.",
      cta: "Take a counter seat",
      menu: "From the fire",
      story: "One counter. One flame.",
      storyText:
        "Watch every course move from binchotan charcoal to the plate. À la carte or a seven-course chef sequence.",
      stats: [
        ["12", "counter seats"],
        ["7", "course omakase"],
        ["900°C", "binchotan heat"],
      ],
      dishes: [
        ["Miso eggplant", "sesame, sansho", "$9"],
        ["Chicken yakitori", "tare, spring onion", "$12"],
        ["Black cod", "saikyo miso, daikon", "$25"],
        ["Wagyu striploin", "smoked soy, wasabi", "$34"],
        ["Claypot rice", "mushroom, kombu", "$16"],
        ["Matcha semifreddo", "black sesame", "$9"],
      ],
      form: "Enter the evening",
      formText:
        "Reservations are limited. Share your date, party size and dietary notes.",
    },
    ru: {
      label: "Японская кухня огня · robata counter",
      title: "Огонь. Дым. Точность.",
      text: "Камерный японский ресторан, построенный вокруг угля, сезонных морепродуктов и ритма открытой робата-кухни.",
      cta: "Место у стойки",
      menu: "С открытого огня",
      story: "Одна стойка. Одно пламя.",
      storyText:
        "Каждое блюдо проходит путь от угля бинтётан до тарелки на глазах у гостя. À la carte или сет из семи подач.",
      stats: [
        ["12", "мест у стойки"],
        ["7", "подач omakase"],
        ["900°C", "жар бинтётана"],
      ],
      dishes: [
        ["Баклажан мисо", "кунжут, сансё", "$9"],
        ["Якитори из цыплёнка", "таре, зелёный лук", "$12"],
        ["Чёрная треска", "сайкё мисо, дайкон", "$25"],
        ["Стриплойн wagyu", "копчёная соя, васаби", "$34"],
        ["Рис в глиняном горшке", "грибы, комбу", "$16"],
        ["Семифреддо матча", "чёрный кунжут", "$9"],
      ],
      form: "Войдите в вечер",
      formText:
        "Количество мест ограничено. Укажите дату, гостей и пищевые ограничения.",
    },
  },
} as const;

export default function RestaurantDemoPage({
  locale,
  kind,
}: {
  locale: Locale;
  kind: Kind;
}) {
  const item = data[kind];
  const t = item[locale];
  const other = locale === "ru" ? "en" : "ru";
  const route =
    kind === "mediterranean"
      ? "limone-restaurant-demo"
      : kind === "vegan"
        ? "vegan-restaurant-demo"
        : kind === "halal"
          ? "halal-restaurant-demo"
          : "japanese-restaurant-demo";
  const dark = kind === "japanese";
  const japanese = kind === "japanese";
  const vegan = kind === "vegan";
  const halal = kind === "halal";
  const mediterranean = kind === "mediterranean";
  return (
    <main
      style={{ background: item.bg, color: item.ink }}
      className="min-h-screen"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-center text-[11px] uppercase tracking-[.18em] opacity-80">
        <span>
          {locale === "ru"
            ? "Демо-ресторан · создано Tafa Lab"
            : "Demo restaurant · created by Tafa Lab"}
        </span>
        <Link
          className="underline underline-offset-4"
          href={`/${locale}/industries/restaurants`}
        >
          {locale === "ru" ? "Все ресторанные сайты" : "All restaurant sites"} →
        </Link>
        <Link
          className="underline underline-offset-4"
          href={`/${locale}/demo-admin`}
        >
          {locale === "ru" ? "Демо-админка" : "Demo admin"} →
        </Link>
        <Link
          className="underline underline-offset-4"
          href={`/${locale}/restaurant-order`}
        >
          {locale === "ru" ? "Меню и выбор стола" : "Menu & table"} →
        </Link>
      </div>
      <header
        className="relative z-20 flex items-center justify-between border-y px-5 py-5 md:px-10"
        style={{ borderColor: dark ? "#ffffff22" : "#173f2c22" }}
      >
        <div
          className={
            japanese
              ? "text-2xl font-black tracking-[.22em]"
              : "font-serif text-2xl tracking-[.12em]"
          }
        >
          {item.brand}
        </div>
        <nav className="hidden gap-8 text-sm md:flex">
          <Link href={`/${locale}/restaurant-order`}>{locale === "ru" ? "Меню и заказ" : "Menu & order"}</Link>
          <a href="#story">{locale === "ru" ? "Концепция" : "Concept"}</a>
          <Link href={`/${locale}/restaurant-order#table`}>{locale === "ru" ? "Выбрать стол" : "Choose table"}</Link>
        </nav>
        <Link
          href={`/${other}/${route}`}
          className="rounded-full border px-4 py-2 text-xs uppercase"
          style={{ borderColor: dark ? "#ffffff44" : "#173f2c44" }}
        >
          {other}
        </Link>
      </header>

      <section
        className={`${mediterranean ? "mx-4 overflow-hidden rounded-[0_0_5rem_5rem] md:mx-8" : vegan ? "mx-auto mt-6 max-w-[1500px] overflow-hidden rounded-[4rem_10rem_4rem_10rem]" : halal ? "mx-4 overflow-hidden rounded-t-[10rem] md:mx-10" : "overflow-hidden"} relative min-h-[760px] bg-cover bg-center`}
        style={{
          backgroundImage: `linear-gradient(90deg, ${japanese ? "rgba(0,0,0,.94)" : halal ? "rgba(55,25,18,.76)" : "rgba(10,25,18,.80)"} 0%, rgba(0,0,0,.2) 60%, rgba(0,0,0,.08) 100%), url(${item.hero})`,
        }}
      >
        <div
          className={`mx-auto flex min-h-[760px] max-w-7xl px-5 pb-16 pt-28 text-white md:px-10 md:pb-24 ${japanese ? "items-center" : "items-end"}`}
        >
          <div className="max-w-4xl">
            <p
              className="text-xs font-semibold uppercase tracking-[.32em]"
              style={{ color: item.accent }}
            >
              {t.label}
            </p>
            <h1
              className={`${japanese ? "font-sans font-black uppercase" : halal ? "font-serif" : "font-serif"} mt-7 text-6xl leading-[.9] tracking-[-.055em] md:text-8xl lg:text-[7.4rem]`}
            >
              {t.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
              {t.text}
            </p>
            <Link
              href={`/${locale}/restaurant-order#table`}
              className={`${japanese ? "rounded-none border border-white" : halal ? "rounded-t-full" : "rounded-full"} mt-9 inline-flex px-7 py-4 font-semibold`}
              style={{
                background: japanese ? "transparent" : item.accent,
                color: japanese ? "#fff" : "#173f2c",
              }}
            >
              {t.cta} →
            </Link>
          </div>
        </div>
      </section>

      <section
        id="story"
        className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[1.15fr_.85fr] md:px-10 md:py-32"
      >
        <div>
          <p className="text-xs uppercase tracking-[.3em] opacity-55">
            {locale === "ru" ? "Манифест" : "Manifesto"}
          </p>
          <h2
            className={`${japanese ? "font-sans font-black uppercase" : "font-serif"} mt-5 text-5xl tracking-[-.05em] md:text-7xl`}
          >
            {t.story}
          </h2>
          <p className="mt-7 max-w-2xl text-xl leading-9 opacity-70">
            {t.storyText}
          </p>
          {halal && (
            <p
              className="mt-6 max-w-2xl rounded-full border px-5 py-3 text-sm font-semibold"
              style={{ borderColor: item.accent + "88" }}
            >
              {locale === "ru"
                ? "Для гостей предусмотрена отдельная комната для намаза."
                : "A dedicated prayer room is available for guests."}
            </p>
          )}
        </div>
        <div
          className="grid grid-cols-3 self-end border-y py-8"
          style={{ borderColor: dark ? "#ffffff22" : "#173f2c33" }}
        >
          {t.stats.map(([n, l]) => (
            <div key={l} className="px-3 text-center">
              <div
                className="text-3xl font-semibold md:text-4xl"
                style={{ color: item.accent }}
              >
                {n}
              </div>
              <div className="mt-2 text-xs leading-5 opacity-55">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-10 md:pb-32">
        <div
          className={`relative aspect-[3/2] overflow-hidden ${mediterranean ? "rounded-[2rem_12rem_2rem_2rem]" : vegan ? "rounded-[45%_55%_42%_58%]" : halal ? "rounded-t-[12rem]" : "rounded-none border-y border-white/20"}`}
        >
          <Image
            src={item.storyImage}
            alt="Restaurant interior"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 95vw, 1200px"
          />
        </div>
      </section>

      <section
        className={`mx-auto max-w-7xl px-5 pb-28 md:px-10 ${japanese ? "border-y border-white/15 py-24" : ""}`}
      >
        <div
          className={`grid gap-10 ${mediterranean ? "rounded-[2rem_9rem_2rem_2rem] p-8 md:grid-cols-[.75fr_1.25fr] md:p-14" : vegan ? "md:grid-cols-[.8fr_1.2fr]" : halal ? "rounded-t-[10rem] p-10 text-center md:px-24 md:pt-24" : "md:grid-cols-[.7fr_1.3fr]"}`}
          style={{
            background: mediterranean
              ? item.soft
              : halal
                ? item.soft
                : undefined,
          }}
        >
          <p className="text-xs uppercase tracking-[.3em] opacity-45">
            {mediterranean
              ? locale === "ru"
                ? "Записка хозяина"
                : "A note from the host"
              : vegan
                ? locale === "ru"
                  ? "Дневник поля"
                  : "Field notes"
                : halal
                  ? locale === "ru"
                    ? "Почему наш стол большой"
                    : "Why our table is generous"
                  : locale === "ru"
                    ? "Путь шефа"
                    : "The chef’s path"}
          </p>
          <div>
            <h3
              className={`${japanese ? "font-sans font-black uppercase" : "font-serif"} text-4xl leading-tight md:text-6xl`}
            >
              {mediterranean
                ? locale === "ru"
                  ? "В доме моей мамы всегда ставили на один прибор больше."
                  : "At my mother’s house, we always set one extra place."
                : vegan
                  ? locale === "ru"
                    ? "Сегодня в меню — то, что поле отдало утром."
                    : "Today’s menu begins with what the field gave us this morning."
                  : halal
                    ? locale === "ru"
                      ? "Гость не должен спрашивать, можно ли ему это есть."
                      : "A guest should never have to wonder whether the food is right for them."
                    : locale === "ru"
                      ? "Я учился у огня молчанию."
                      : "The fire taught me restraint."}
            </h3>
            <p className="mt-6 max-w-3xl text-lg leading-8 opacity-65">
              {mediterranean
                ? locale === "ru"
                  ? "Limoné вырос из наших воскресных обедов: лимонный пирог на подоконнике, шумный общий стол и привычка не заканчивать вечер сразу после десерта. Здесь всегда найдётся место для неожиданного гостя."
                  : "Limoné grew from our Sunday lunches: lemon cake cooling by the window, a noisy shared table and evenings that never ended with dessert. There is always room for an unexpected guest."
                : vegan
                  ? locale === "ru"
                    ? "Каждый четверг фермеры присылают нам список урожая. Шеф не просит природу повторяться — он строит неделю вокруг самой сладкой свёклы, первой зелени и грибов после дождя."
                    : "Every Thursday our growers send the harvest list. The chef never asks nature to repeat itself—the week is built around the sweetest beets, first greens and mushrooms after rain."
                  : halal
                    ? locale === "ru"
                      ? "Noor создала семья, которой не хватало красивого места для больших праздников без компромиссов. Поэтому происхождение каждого продукта понятно, кухня полностью без алкоголя, а детям никогда не мешают быть детьми."
                      : "Noor was created by a family who wanted a beautiful place for large celebrations without compromise. Every ingredient has a clear origin, the kitchen is alcohol-free and children are welcome to be children."
                    : locale === "ru"
                      ? "Шеф Рэн начинал у рыбного рынка, потом десять лет работал у робата-печей. В KURO он оставил только то, что нужно блюду: хороший продукт, бинтётан и несколько точных движений."
                      : "Chef Ren began beside the fish market, then spent ten years at robata grills. At KURO he kept only what each dish needs: a remarkable ingredient, binchotan and a few exact movements."}
            </p>
          </div>
        </div>
      </section>

      {mediterranean && (
        <section className="mx-auto max-w-7xl px-5 pb-28 md:px-10">
          <div
            className="grid overflow-hidden rounded-[3rem] border md:grid-cols-[.8fr_1.2fr]"
            style={{ borderColor: `${item.ink}25` }}
          >
            <div className="p-8 md:p-12">
              <p className="text-xs uppercase tracking-[.3em] opacity-45">
                {locale === "ru" ? "Что происходит" : "What’s on"}
              </p>
              <h3 className="mt-6 font-serif text-5xl">
                {locale === "ru"
                  ? "Вечера, которые остаются в памяти."
                  : "Evenings worth staying for."}
              </h3>
            </div>
            <div className="grid md:grid-cols-3">
              {[
                ["FRI", "Sunset table"],
                ["SAT", "Coastal lunch"],
                ["SUN", "Family supper"],
              ].map(([day, name]) => (
                <div
                  key={day}
                  className="border-l p-7"
                  style={{ borderColor: `${item.ink}20` }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: item.accent }}
                  >
                    {day}
                  </span>
                  <p className="mt-20 font-serif text-2xl">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {vegan && (
        <section className="pb-28">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-5 sm:grid-cols-2 md:grid-cols-4 md:px-10">
            {[
              "Local growers",
              "Whole-plant kitchen",
              "Low-waste pantry",
              "Season-led menu",
            ].map((x, i) => (
              <div
                key={x}
                className={`flex h-44 min-w-0 w-full items-center justify-center rounded-[50%] border px-4 text-center text-base font-semibold sm:h-52 sm:text-xl ${i % 2 ? "md:-rotate-2" : "md:rotate-2"}`}
                style={{
                  borderColor: `${item.ink}35`,
                  background: i % 2 ? item.soft : item.bg,
                }}
              >
                {x}
              </div>
            ))}
          </div>
        </section>
      )}
      {halal && (
        <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-28 md:grid-cols-3 md:px-10">
          <div
            className="rounded-t-[10rem] p-9 pt-24 text-center"
            style={{ background: item.soft }}
          >
            <span className="text-4xl">☾</span>
            <h3 className="mt-8 font-serif text-3xl">
              {locale === "ru" ? "Семейный стол" : "Family table"}
            </h3>
          </div>
          <div
            className="rounded-t-[10rem] p-9 pt-24 text-center"
            style={{ background: item.accent, color: "#fff" }}
          >
            <span className="text-4xl">✦</span>
            <h3 className="mt-8 font-serif text-3xl">
              {locale === "ru" ? "Праздники" : "Celebrations"}
            </h3>
          </div>
          <div
            className="rounded-t-[10rem] p-9 pt-24 text-center"
            style={{ background: item.ink, color: item.bg }}
          >
            <span className="text-4xl">24</span>
            <h3 className="mt-8 font-serif text-3xl">Private dining</h3>
          </div>
        </section>
      )}
      {japanese && (
        <section className="mx-auto max-w-7xl px-5 pb-28 md:px-10">
          <p className="text-xs uppercase tracking-[.3em] text-white/35">
            Omakase progression
          </p>
          <div className="mt-8 border-t border-white/20">
            {[
              "SAKIZUKE / first taste",
              "MUKOZUKE / raw course",
              "YAKIMONO / charcoal",
              "SHOKUJI / rice",
              "KANMI / sweet",
            ].map((x, i) => (
              <div
                key={x}
                className="grid grid-cols-[70px_1fr_auto] items-center border-b border-white/20 py-7"
              >
                <span className="text-[#ef4b2f]">0{i + 1}</span>
                <strong className="text-xl md:text-3xl">{x}</strong>
                <span className="text-white/30">→</span>
              </div>
            ))}
          </div>
        </section>
      )}

    {vegan && (
      <InteractiveConcept locale={locale} mode="dish" accent={item.accent} ink={item.ink} />
    )}

    <section
      id="menu"
        className="px-5 py-24 md:px-10 md:py-32"
        style={{ background: item.soft }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[.3em] opacity-55">
                À la carte
              </p>
              <h2
                className={`${japanese ? "font-sans font-black uppercase" : "font-serif"} mt-4 text-5xl tracking-[-.05em] md:text-7xl`}
              >
                {t.menu}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 opacity-55">
              {locale === "ru"
                ? "Сезонная подборка блюд — состав и цены обновляются из админ-панели."
                : "A seasonal edit—dishes and prices update from the dashboard."}
            </p>
          </div>
          <div
            className={`mt-14 grid ${vegan ? "gap-5 md:grid-cols-3" : halal ? "gap-4 md:grid-cols-2" : japanese ? "border-t border-white/20" : "gap-x-12 md:grid-cols-2"}`}
          >
            {t.dishes.map(([name, desc, price], i) => (
              <article
                key={name}
                className={`${vegan ? "rounded-[3rem_8rem_3rem_3rem] p-7" : halal ? "rounded-t-[5rem] border p-8 pt-14" : japanese ? "grid grid-cols-[42px_1fr_auto] gap-4 border-b py-7" : "grid grid-cols-[42px_1fr_auto] gap-4 border-t py-7"}`}
                style={{
                  borderColor: dark ? "#ffffff22" : "#173f2c2a",
                  background: vegan
                    ? i % 2
                      ? item.bg
                      : "#ffffff55"
                    : undefined,
                }}
              >
                {!vegan && !halal && (
                  <span className="text-xs opacity-35">0{i + 1}</span>
                )}
                <div>
                  <h3 className="text-xl font-semibold">{name}</h3>
                  <p className="mt-2 text-sm opacity-55">{desc}</p>
                </div>
                <strong
                  className={vegan || halal ? "mt-8 block" : ""}
                  style={{ color: item.accent }}
                >
                  {price}
                </strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="book"
        className="px-5 py-24 text-white md:px-10 md:py-32"
        style={{ background: japanese ? "#080808" : "#173f2c" }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[.3em] text-white/45">
            {locale === "ru" ? "Бронирование · демо" : "Reservation · demo"}
          </p>
          <h2
            className={`${japanese ? "font-sans font-black uppercase" : "font-serif"} mt-5 text-5xl tracking-[-.05em] md:text-7xl`}
          >
            {t.form}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
            {t.formText}
          </p>
          <DemoSiteOrderForm
            locale={locale}
            siteName={`${item.brand} — restaurant reservation`}
            kind="restaurant"
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
