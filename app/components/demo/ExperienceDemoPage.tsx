import Image from "next/image";
import Link from "next/link";
import DemoSiteOrderForm from "./DemoSiteOrderForm";
import BeautyInteractiveExperience from "./BeautyInteractiveExperience";
import EventInteractiveExperience from "./EventInteractiveExperience";

type Locale = "ru" | "en";
type Kind = "barber" | "events" | "animators" | "kids";

const data = {
  barber: {
    brand: "IRONWOOD",
    hero: "/images/stk-lab/beauty/demos/ironwood-barbershop-hero-v1.webp",
    bg: "#11100f",
    ink: "#f2eadb",
    accent: "#b78950",
    route: "ironwood-barbershop-demo",
    en: {
      label: "Barbershop · craft since 2016",
      title: "Good cuts. Better rituals.",
      text: "A neighbourhood barbershop for precise cuts, hot towels and conversations worth staying for.",
      cta: "Book a chair",
      section: "The chair is yours",
      story:
        "Built by two brothers who wanted the kind of place their father took them to: no rush, honest advice and a proper coffee.",
      services: [
        ["Signature cut", "45 min · $38"],
        ["Cut & beard", "75 min · $58"],
        ["Traditional shave", "45 min · $42"],
        ["Father & son", "80 min · $64"],
      ],
      feature: "Your barber remembers the details.",
      featureText:
        "Preferred length, last formula and every appointment stay in your profile.",
    },
    ru: {
      label: "Барбершоп · ремесло с 2016",
      title: "Точный стиль. Правильный ритуал.",
      text: "Барбершоп по соседству: точные стрижки, горячее полотенце и разговоры, ради которых не хочется спешить.",
      cta: "Выбрать кресло",
      section: "Это кресло — ваше",
      story:
        "Два брата создали место, куда их когда-то приводил отец: без спешки, с честным советом и правильным кофе.",
      services: [
        ["Фирменная стрижка", "45 мин · $38"],
        ["Стрижка и борода", "75 мин · $58"],
        ["Классическое бритьё", "45 мин · $42"],
        ["Отец и сын", "80 мин · $64"],
      ],
      feature: "Ваш барбер помнит детали.",
      featureText:
        "Любимая длина, предыдущая форма и история визитов сохраняются в профиле.",
    },
  },
  events: {
    brand: "VELVET STAGE",
    hero: "/images/stk-lab/entertainment/velvet-stage-hero-v1.webp",
    bg: "#150b0d",
    ink: "#f8eee4",
    accent: "#d4a357",
    route: "velvet-stage-events-demo",
    en: {
      label: "Wedding · show · private celebration",
      title: "We produce the moment everyone remembers.",
      text: "From the first entrance to the final light cue — a complete celebration shaped as one living performance.",
      cta: "Create our event",
      section: "Not a package. A narrative.",
      story:
        "The studio began backstage. That is why every wedding, anniversary and brand evening is built with the timing of a show and the warmth of a private gathering.",
      services: [
        ["Wedding production", "Concept to final dance"],
        ["Original show", "Artists, stage and direction"],
        ["Private celebration", "Intimate and personal"],
        ["Brand event", "A story guests can feel"],
      ],
      feature: "One evening. Hundreds of invisible cues.",
      featureText:
        "Direction, scenography, artists, sound, light, timing and guest care work as one production.",
    },
    ru: {
      label: "Свадьба · шоу · частный праздник",
      title: "Создаём момент, который помнят все.",
      text: "От первого выхода до финального света — цельный праздник, поставленный как живое представление.",
      cta: "Создать событие",
      section: "Не пакет. Ваша история.",
      story:
        "Студия началась за кулисами. Поэтому свадьбы, юбилеи и бренд-вечера строятся с точностью шоу и теплом личного праздника.",
      services: [
        ["Свадьба под ключ", "От идеи до финального танца"],
        ["Авторское шоу", "Артисты, сцена и режиссура"],
        ["Частный праздник", "Камерно и лично"],
        ["Бренд-событие", "История, которую чувствуют"],
      ],
      feature: "Один вечер. Сотни незаметных сигналов.",
      featureText:
        "Режиссура, сценография, артисты, звук, свет, тайминг и забота о гостях работают как единое целое.",
    },
  },
  animators: {
    brand: "SPARK!",
    hero: "/images/stk-lab/entertainment/spark-animators-hero-v1.webp",
    bg: "#fff8ed",
    ink: "#44246b",
    accent: "#ff6c59",
    route: "spark-animators-demo",
    en: {
      label: "Children's parties · real play",
      title: "No awkward scripts. Just a room full of joy.",
      text: "Warm, talented performers who notice every child and turn the party into a shared adventure.",
      cta: "Choose a program",
      section: "Play made personal",
      story:
        "Spark was founded by a theatre teacher who saw shy children disappear inside noisy party programs. Here every child gets a role, never pressure.",
      services: [
        ["Bubble laboratory", "3–7 years"],
        ["Little detectives", "6–10 years"],
        ["Creative party", "4–12 years"],
        ["Family game show", "Children + adults"],
      ],
      feature: "We learn the birthday child before the party.",
      featureText:
        "Interests, temperament, favourite games and the guest mix shape the program.",
    },
    ru: {
      label: "Детские праздники · настоящая игра",
      title: "Без заученных криков. Только радость.",
      text: "Тёплые профессиональные аниматоры замечают каждого ребёнка и превращают праздник в общее приключение.",
      cta: "Выбрать программу",
      section: "Игра с характером ребёнка",
      story:
        "Spark создала театральный педагог, заметившая, как застенчивые дети теряются в шумных программах. Здесь у каждого есть роль, но нет давления.",
      services: [
        ["Лаборатория пузырей", "3–7 лет"],
        ["Маленькие детективы", "6–10 лет"],
        ["Творческая вечеринка", "4–12 лет"],
        ["Семейное шоу", "Дети + взрослые"],
      ],
      feature: "До праздника мы узнаём именинника.",
      featureText:
        "Интересы, характер, любимые игры и состав гостей формируют программу.",
    },
  },
  kids: {
    brand: "WONDERNEST",
    hero: "/images/stk-lab/entertainment/wondernest-kids-hero-v1.webp",
    bg: "#fff6e9",
    ink: "#254e49",
    accent: "#ef765e",
    route: "wondernest-kids-demo",
    en: {
      label: "Play centre · birthdays · family café",
      title: "A little world built for big days.",
      text: "Climb, invent, slide, celebrate — a beautiful indoor play space where children lead the day and adults can breathe.",
      cta: "Plan a birthday",
      section: "More than a playroom",
      story:
        "Created by a mother and an architect after too many birthdays where children loved the playground but parents had nowhere comfortable to sit.",
      services: [
        ["Soft play city", "2–8 years"],
        ["Climbing garden", "4–12 years"],
        ["Creative atelier", "Daily workshops"],
        ["Birthday rooms", "Private celebrations"],
      ],
      feature: "One place for play and the whole birthday.",
      featureText:
        "Host, decorations, child-friendly menu, cake moment, private room and play access are coordinated together.",
    },
    ru: {
      label: "Игровой центр · дни рождения · семейное кафе",
      title: "Маленький мир для больших дней.",
      text: "Лазать, придумывать, скользить и праздновать — красивое пространство, где дети ведут день, а взрослые могут выдохнуть.",
      cta: "Спланировать день рождения",
      section: "Больше, чем игровая",
      story:
        "Центр придумали мама и архитектор после множества праздников, где детям нравились горки, а взрослым негде было спокойно посидеть.",
      services: [
        ["Мягкий игровой город", "2–8 лет"],
        ["Сад для лазания", "4–12 лет"],
        ["Творческое ателье", "Мастер-классы каждый день"],
        ["Комнаты праздников", "Закрытые дни рождения"],
      ],
      feature: "В одном месте — игра и весь праздник.",
      featureText:
        "Ведущий, декор, детское меню, вынос торта, отдельная комната и игровое время согласованы вместе.",
    },
  },
} as const;

export default function ExperienceDemoPage({
  locale,
  kind,
}: {
  locale: Locale;
  kind: Kind;
}) {
  const d = data[kind],
    t = d[locale],
    other = locale === "ru" ? "en" : "ru";
  const playful = kind === "animators" || kind === "kids";
  return (
    <main style={{ background: d.bg, color: d.ink }} className="min-h-screen">
      <div className="flex flex-col items-center justify-center gap-2 bg-[#e8ff5a] px-4 py-3 text-center text-xs font-semibold text-black sm:flex-row sm:gap-5">
        <span>
          {locale === "ru"
            ? "ДЕМО-САЙТ TAFA LAB · ОТПРАВЬТЕ ТЕСТОВУЮ ЗАЯВКУ НИЖЕ"
            : "TAFA LAB DEMO · SEND A TEST REQUEST BELOW"}
        </span>
        <Link
          href={`/${locale}/demo-admin`}
          className="rounded-full bg-black px-4 py-2"
          style={{ color: "#ffffff" }}
        >
          {locale === "ru"
            ? "Посмотреть результат в демо-админке"
            : "View it in the demo admin"}{" "}
          →
        </Link>
      </div>
      <header
        className="flex items-center justify-between border-b px-5 py-5 md:px-10"
        style={{ borderColor: `${d.ink}30` }}
      >
        <strong
          className={`${kind === "events" ? "font-serif" : playful ? "text-2xl" : "tracking-[.2em]"}`}
        >
          {d.brand}
        </strong>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#story">{locale === "ru" ? "История" : "Story"}</a>
          <a href="#services">{locale === "ru" ? "Программы" : "Services"}</a>
          <a href="#book">{locale === "ru" ? "Заявка" : "Enquire"}</a>
        </nav>
        <Link
          href={`/${other}/${d.route}`}
          className="rounded-full border px-4 py-2 text-xs uppercase"
          style={{ borderColor: `${d.ink}50` }}
        >
          {other}
        </Link>
      </header>
      <section
        className={`relative mx-3 mt-3 min-h-[760px] overflow-hidden ${kind === "barber" ? "rounded-sm" : kind === "events" ? "rounded-t-[8rem]" : kind === "animators" ? "rounded-[4rem_10rem_4rem_10rem]" : "rounded-[3rem]"}`}
      >
        <Image
          src={d.hero}
          alt={d.brand}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className={`absolute inset-0 ${playful ? "bg-gradient-to-r from-white/85 via-white/15 to-transparent" : "bg-gradient-to-r from-black/80 via-black/25 to-transparent"}`}
        />
        <div
          className={`relative flex min-h-[760px] max-w-7xl items-center px-7 md:px-14 ${playful ? "" : "text-white"}`}
        >
          <div className="max-w-3xl">
            <p
              className="text-xs font-bold uppercase tracking-[.25em]"
              style={{ color: d.accent }}
            >
              {t.label}
            </p>
            <h1
              className={`${kind === "events" ? "font-serif italic" : kind === "barber" ? "uppercase" : ""} mt-6 text-6xl leading-[.88] tracking-[-.06em] md:text-8xl`}
            >
              {t.title}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 opacity-75">
              {t.text}
            </p>
            <a
              href="#book"
              className={`mt-9 inline-flex px-7 py-4 font-semibold ${playful ? "rounded-full" : "border"}`}
              style={{
                background: playful ? d.accent : "transparent",
                borderColor: d.accent,
                color: playful ? "#fff" : d.accent,
              }}
            >
              {t.cta} →
            </a>
          </div>
        </div>
      </section>
      <section
        id="story"
        className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32"
      >
        <h2
          className={`${kind === "events" ? "font-serif italic" : ""} text-5xl leading-[.95] md:text-7xl`}
        >
          {t.section}
        </h2>
        <p className="self-end text-xl leading-9 opacity-65">{t.story}</p>
      </section>
      {kind === "barber" && <BeautyInteractiveExperience locale={locale} mode="barber" />}
      {(kind === "events" || kind === "animators" || kind === "kids") && (
        <EventInteractiveExperience locale={locale} mode={kind} />
      )}

      {kind === "barber" && (
        <section className="border-y border-[#b7895044] px-5 py-20 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[.65fr_1.35fr]">
            <p className="text-xs uppercase tracking-[.3em] text-[#b78950]">
              {locale === "ru" ? "Мастера" : "The barbers"}
            </p>
            <div className="space-y-0">
              {[
                ["01", "Anton Reed", "Classic cuts · beard architecture"],
                ["02", "Mika Stone", "Texture · longer shapes"],
                ["03", "Leo Hart", "Skin fade · precision shave"],
              ].map(([n, name, spec]) => (
                <div
                  key={name}
                  className="grid grid-cols-[50px_1fr] border-t border-[#b7895044] py-7 md:grid-cols-[70px_1fr_1fr]"
                >
                  <span className="text-[#b78950]">{n}</span>
                  <strong className="text-2xl">{name}</strong>
                  <span className="mt-2 opacity-50 md:mt-0">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {kind === "events" && (
        <section className="bg-[#f1e7d8] px-5 py-24 text-[#291217] md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs uppercase tracking-[.3em] text-[#8b4b54]">
              {locale === "ru" ? "Драматургия вечера" : "The evening arc"}
            </p>
            <div className="mt-12 space-y-3">
              {[
                ["18:30", "Arrival", "Light, scent and the first live note"],
                ["20:00", "The reveal", "A room transforms around the guests"],
                [
                  "21:40",
                  "Signature show",
                  "A performance written for one story",
                ],
                ["23:30", "Finale", "The dance floor becomes the stage"],
              ].map(([time, name, text], i) => (
                <div
                  key={time}
                  className={`grid items-center gap-5 rounded-full border border-[#8b4b5444] px-7 py-6 md:grid-cols-[120px_1fr_1.3fr] ${i % 2 ? "md:ml-20" : "md:mr-20"}`}
                >
                  <span className="font-serif text-2xl italic">{time}</span>
                  <strong className="text-xl">{name}</strong>
                  <span className="opacity-55">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section
        id="services"
        className="px-5 py-24 md:px-10 md:py-32"
        style={{
          background:
            kind === "barber"
              ? "#1b1917"
              : kind === "events"
                ? "#2a1116"
                : kind === "animators"
                  ? "#efe1ff"
                  : "#dcefe7",
          color: kind === "barber" || kind === "events" ? "#f8eee4" : d.ink,
        }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="mb-12 text-xs uppercase tracking-[.3em] opacity-50">
            {locale === "ru" ? "Услуги и форматы" : "Services & formats"}
          </p>
          {kind === "barber" ? (
            <div className="divide-y divide-[#b7895044] border-y border-[#b7895044]">
              {t.services.map(([name, meta], i) => (
                <article
                  key={name}
                  className="grid items-center gap-4 py-8 md:grid-cols-[80px_1fr_auto]"
                >
                  <span className="text-[#b78950]">0{i + 1}</span>
                  <h3 className="text-3xl uppercase">{name}</h3>
                  <p className="opacity-55">{meta}</p>
                </article>
              ))}
            </div>
          ) : kind === "events" ? (
            <div className="space-y-8">
              {t.services.map(([name, meta], i) => (
                <article
                  key={name}
                  className="grid gap-5 border-b border-[#d4a35755] pb-8 md:grid-cols-[80px_1fr_1fr]"
                >
                  <span className="font-serif text-3xl italic text-[#d4a357]">
                    0{i + 1}
                  </span>
                  <h3 className="font-serif text-4xl italic">{name}</h3>
                  <p className="self-end opacity-55">{meta}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {t.services.map(([name, meta], i) => (
                <article
                  key={name}
                  className={`${kind === "animators" ? "rounded-[5rem_2rem]" : "rounded-[2rem]"} min-h-60 p-7`}
                  style={{ background: i % 2 ? "#ffffff90" : d.accent + "22" }}
                >
                  <span className="text-xs opacity-45">0{i + 1}</span>
                  <h3 className="mt-20 text-3xl">{name}</h3>
                  <p className="mt-3 opacity-60">{meta}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-24 text-center md:py-36">
        <p
          className="text-xs uppercase tracking-[.25em]"
          style={{ color: d.accent }}
        >
          {locale === "ru" ? "Наш подход" : "Our approach"}
        </p>
        <h2 className="mx-auto mt-6 max-w-5xl text-5xl leading-[.95] md:text-7xl">
          {t.feature}
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 opacity-60">
          {t.featureText}
        </p>
      </section>
      {kind === "barber" && (
        <>
          <section className="grid border-y border-[#b7895044] md:grid-cols-3">
            {[
              ["4.9", "average rating"],
              ["72%", "return within 6 weeks"],
              ["2016", "the first chair opened"],
            ].map(([n, l]) => (
              <div key={l} className="p-10 text-center md:p-16">
                <strong className="text-6xl text-[#b78950]">{n}</strong>
                <p className="mt-3 text-sm uppercase tracking-[.16em] opacity-45">
                  {l}
                </p>
              </div>
            ))}
          </section>
          <section className="px-5 py-24 md:px-10">
            <div className="mx-auto max-w-7xl border border-[#b7895044] p-8 md:grid md:grid-cols-2 md:p-14">
              <h2 className="text-5xl uppercase">
                {locale === "ru"
                  ? "Уход без лишнего шума."
                  : "Care without the noise."}
              </h2>
              <p className="mt-7 self-end text-lg leading-8 opacity-55 md:mt-0">
                {locale === "ru"
                  ? "Три средства, которыми мастера действительно пользуются: матовая паста, масло для бороды и тоник после бритья."
                  : "Three products the team actually uses: matte paste, beard oil and a clean post-shave tonic."}
              </p>
            </div>
          </section>
        </>
      )}
      {kind === "events" && (
        <>
          <section className="grid bg-[#8b4b54] text-white md:grid-cols-[1fr_1.5fr]">
            <div className="p-10 md:p-20">
              <p className="text-xs uppercase tracking-[.3em] text-white/50">
                Private note
              </p>
              <h2 className="mt-8 font-serif text-5xl italic">
                {locale === "ru"
                  ? "Сначала мы слушаем не референсы, а вас."
                  : "We listen to you before we look at references."}
              </h2>
            </div>
            <blockquote className="border-t border-white/20 p-10 text-2xl leading-10 md:border-l md:border-t-0 md:p-20">
              “
              {locale === "ru"
                ? "Гости говорили, что никогда не видели такой свадьбы. А мы чувствовали, что весь вечер был именно про нас."
                : "Guests said they had never seen a wedding like it. We felt that every minute still belonged to us."}
              ”
            </blockquote>
          </section>
          <section className="px-5 py-24 text-center md:py-32">
            <p className="text-xs uppercase tracking-[.3em] text-[#d4a357]">
              Selected collaborators
            </p>
            <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-x-14 gap-y-7 font-serif text-3xl italic opacity-55">
              <span>Scenography</span>
              <span>Live music</span>
              <span>Choreography</span>
              <span>Floral art</span>
              <span>Light design</span>
            </div>
          </section>
        </>
      )}
      {kind === "animators" && (
        <>
          <section className="overflow-hidden bg-[#ff6c59] py-8 text-white">
            <div className="flex justify-around gap-8 whitespace-nowrap text-2xl font-bold uppercase">
              <span>Kind performers</span>
              <span>Age-aware games</span>
              <span>No copyrighted characters</span>
              <span>Real participation</span>
            </div>
          </section>
          <section className="mx-auto grid max-w-7xl gap-6 px-5 py-24 md:grid-cols-3 md:px-10">
            <div className="rounded-full bg-[#efe1ff] p-12 text-center">
              <strong className="text-5xl">45</strong>
              <p className="mt-3">minutes of active play</p>
            </div>
            <div className="rounded-[5rem_2rem] bg-[#ffe6c7] p-12 text-center">
              <strong className="text-5xl">12</strong>
              <p className="mt-3">children per lead performer</p>
            </div>
            <div className="rounded-full bg-[#d9f4e4] p-12 text-center">
              <strong className="text-5xl">100%</strong>
              <p className="mt-3">adapted to the child</p>
            </div>
          </section>
        </>
      )}
      {kind === "kids" && (
        <>
          <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-24 md:grid-cols-[1.25fr_.75fr] md:px-10">
            <div className="rounded-[4rem] bg-[#dcefe7] p-10 md:p-16">
              <p className="text-xs uppercase tracking-[.3em]">
                {locale === "ru" ? "Для родителей" : "For grown-ups"}
              </p>
              <h2 className="mt-8 text-5xl">
                {locale === "ru"
                  ? "Кофе горячий. Дети рядом."
                  : "Hot coffee. Children in sight."}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 opacity-60">
                {locale === "ru"
                  ? "Открытая планировка, семейное меню, удобные места и вид на основные игровые зоны."
                  : "Open sightlines, a family menu, comfortable seating and a clear view of the main play zones."}
              </p>
            </div>
            <div className="rounded-[50%_50%_2rem_2rem] bg-[#ef765e] p-10 pt-24 text-white">
              <strong className="text-7xl">2–12</strong>
              <p className="mt-4 text-xl">
                {locale === "ru"
                  ? "лет · отдельные зоны"
                  : "years · dedicated zones"}
              </p>
            </div>
          </section>
          <section className="bg-[#ffe3a8] px-5 py-24 md:px-10">
            <div className="mx-auto max-w-7xl">
              <h2 className="max-w-4xl text-5xl md:text-7xl">
                {locale === "ru"
                  ? "День рождения без десяти разных подрядчиков."
                  : "A birthday without ten different vendors."}
              </h2>
              <div className="mt-12 flex flex-wrap gap-3">
                {[
                  "Private room",
                  "Host",
                  "Decor",
                  "Kids menu",
                  "Cake moment",
                  "Unlimited play",
                ].map((x) => (
                  <span
                    key={x}
                    className="rounded-full border border-[#254e4944] bg-white/50 px-6 py-3"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
      <section
        id="book"
        className="px-5 py-24 text-white md:px-10 md:py-32"
        style={{
          background:
            kind === "animators"
              ? "#44246b"
              : kind === "kids"
                ? "#254e49"
                : "#090909",
        }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-5 text-sm font-semibold text-[#e8ff5a]">
            {locale === "ru"
              ? "ТЕСТОВЫЙ СЦЕНАРИЙ: заполните форму, затем откройте демо-админку"
              : "TEST FLOW: submit the form, then open the demo admin"}
          </p>
          <h2 className="text-5xl md:text-7xl">{t.cta}</h2>
          <DemoSiteOrderForm
            locale={locale}
            siteName={`${d.brand} — enquiry`}
            kind={kind === "barber" ? "beauty" : "business"}
          />
          <Link
            href={`/${locale}/demo-admin`}
            className="mt-6 inline-flex rounded-full bg-[#e8ff5a] px-6 py-3 font-semibold"
            style={{ color: "#111111" }}
          >
            {locale === "ru" ? "Открыть демо-админку" : "Open demo admin"} →
          </Link>
        </div>
      </section>
      <footer className="flex flex-col gap-3 px-5 py-8 text-xs opacity-55 md:flex-row md:justify-between md:px-10">
        <span>© 2026 {d.brand}</span>
        <Link
          href={`/${locale}/${kind === "barber" ? "industries/beauty" : "industries/entertainment"}`}
        >
          {locale === "ru" ? "Все проекты Tafa Lab" : "All Tafa Lab projects"} →
        </Link>
      </footer>
    </main>
  );
}
