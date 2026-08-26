import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DemoSiteOrderForm from "@/app/components/demo/DemoSiteOrderForm";

type Locale = "ru" | "en";

export const metadata: Metadata = {
  title: "Velaria — Bespoke Travel",
  description: "A premium travel agency demo website by STK Lab.",
  robots: { index: false, follow: false },
};

const copy = {
  ru: {
    nav: ["Направления", "Путешествия", "О нас", "Контакты"],
    eyebrow: "Индивидуальные путешествия по миру",
    title: "Путешествия, созданные вокруг вас.",
    text: "Редкие места, характерные отели и безупречная организация — от первой идеи до возвращения домой.",
    start: "Создать путешествие", explore: "Смотреть направления",
    finder: "С чего начнём?", where: "Куда хотите отправиться?", when: "Когда?", travelers: "Путешественники", find: "Подобрать маршрут",
    destinations: "Избранные путешествия", destinationsText: "Готовые идеи, которые мы адаптируем под ваш ритм, интересы и стиль путешествия.",
    cards: [["Амальфитанское побережье","Италия · 8 дней","от $3 900"],["Тихая роскошь Бали","Индонезия · 10 дней","от $2 800"],["Япония в сезон сакуры","Токио — Киото · 12 дней","от $5 200"]],
    methodEyebrow: "Подход Velaria", methodTitle: "Мы не продаём туры. Мы проектируем впечатления.",
    method: [["01","Разговор","Узнаём ваш ритм, интересы и представление об идеальном отдыхе."],["02","Маршрут","Подбираем отели, места и впечатления, соединяя их в цельную историю."],["03","Забота","Берём на себя бронирования, документы, трансферы и поддержку в поездке."]],
    appEyebrow: "Всё путешествие в телефоне", appTitle: "Ваш личный маршрут и консьерж всегда рядом.", appText: "Планы по дням, бронирования, адреса, билеты и связь с менеджером — в одном удобном пространстве.",
    quote: "Лучшее путешествие — то, в котором вам не нужно думать об организации.",
    cta: "Куда вы хотите отправиться дальше?", ctaText: "Расскажите о поездке, которую представляете. Мы превратим идею в продуманный маршрут.", ctaButton: "Начать планирование",
    demo: "Демо-сайт турагентства · создано STK Lab", back: "Вернуться в STK Lab",
  },
  en: {
    nav: ["Destinations", "Journeys", "About", "Contact"], eyebrow: "Bespoke journeys around the world", title: "Journeys crafted around you.", text: "Rare places, characterful stays and seamless planning — from the first idea until you return home.", start: "Create your journey", explore: "Explore destinations",
    finder: "Where shall we begin?", where: "Where would you like to go?", when: "When?", travelers: "Travelers", find: "Find my journey",
    destinations: "Curated journeys", destinationsText: "Beautiful starting points, thoughtfully adapted to your pace, interests and way of traveling.",
    cards: [["The Amalfi Coast","Italy · 8 days","from $3,900"],["Quiet luxury in Bali","Indonesia · 10 days","from $2,800"],["Japan in blossom","Tokyo — Kyoto · 12 days","from $5,200"]],
    methodEyebrow: "The Velaria way", methodTitle: "We do not sell tours. We design experiences.", method: [["01","Conversation","We learn your pace, interests and idea of a perfect escape."],["02","Journey design","We curate stays, places and experiences into one considered story."],["03","Care","We handle reservations, documents, transfers and support throughout."]],
    appEyebrow: "Your journey in one place", appTitle: "A personal itinerary and concierge, always close.", appText: "Daily plans, reservations, addresses, tickets and your travel designer — beautifully organized in one space.", quote: "The finest journey is the one where you never need to think about logistics.",
    cta: "Where would you like to go next?", ctaText: "Tell us about the trip in your imagination. We will shape it into a seamless journey.", ctaButton: "Start planning", demo: "Travel agency demo · created by STK Lab", back: "Back to STK Lab",
  },
} as const;

export default async function TravelDemo({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (value !== "ru" && value !== "en") notFound();
  const locale = value as Locale, t = copy[locale], other = locale === "ru" ? "en" : "ru";
  const images = ["/images/stk-lab/travel/travel-website-hero.webp", "/images/stk-lab/travel/travel-digital-concierge.webp", "/images/stk-lab/travel/travel-itinerary.webp"];
  return <main className="min-h-screen bg-[#f4f0e8] text-[#243127]">
    <div className="bg-[#243127] px-5 py-2 text-center text-[11px] tracking-[.16em] text-white/65"><Link href={`/${locale}/industries/travel`} className="text-white">{t.demo} · {t.back} →</Link><span className="mx-2">·</span><Link href={`/${locale}/demo-admin`} className="text-white">{locale === "ru" ? "Демо-админка" : "Demo admin"} →</Link></div>
    <header className="absolute left-0 right-0 z-30 border-b border-white/15 text-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8"><Link href={`/${locale}/travel-demo`} className="font-serif text-2xl tracking-[.2em]">VELARIA</Link><nav className="hidden gap-8 text-sm md:flex">{t.nav.map((x,i)=><a key={x} href={i===0?"#destinations":i===1?"#journeys":i===2?"#about":"#contact"}>{x}</a>)}</nav><Link href={`/${other}/travel-demo`} className="rounded-full border border-white/30 px-3 py-2 text-xs uppercase">{other}</Link></div></header>

    <section className="relative min-h-[820px] overflow-hidden bg-[#243127] text-white"><Image src="/images/stk-lab/travel/travel-website-hero.webp" alt="Velaria bespoke travel" fill priority className="object-cover opacity-55" sizes="100vw"/><div className="absolute inset-0 bg-gradient-to-r from-[#17231b]/90 via-[#17231b]/55 to-transparent"/><div className="relative mx-auto flex min-h-[820px] max-w-7xl items-center px-5 pb-36 pt-32 md:px-8"><div className="max-w-3xl"><p className="text-xs uppercase tracking-[.3em] text-white/65">{t.eyebrow}</p><h1 className="mt-7 font-serif text-6xl leading-[.94] tracking-[-.045em] sm:text-7xl lg:text-[7rem]">{t.title}</h1><p className="mt-8 max-w-xl text-lg leading-8 text-white/75">{t.text}</p><div className="mt-10 flex flex-wrap gap-3"><a href="#contact" className="rounded-full bg-[#d8b57b] px-7 py-4 font-semibold text-[#1d281f]">{t.start}</a><a href="#destinations" className="rounded-full border border-white/30 px-7 py-4">{t.explore}</a></div></div></div>
      <div className="absolute bottom-0 left-1/2 w-[min(1180px,94%)] -translate-x-1/2 rounded-t-[2rem] bg-[#f4f0e8] p-5 text-[#243127] shadow-2xl md:p-7"><p className="font-serif text-2xl">{t.finder}</p><div className="mt-5 grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]"><div className="rounded-xl bg-white px-4 py-3"><small className="text-black/40">{t.where}</small><p className="mt-1">Amalfi, Bali, Japan…</p></div><div className="rounded-xl bg-white px-4 py-3"><small className="text-black/40">{t.when}</small><p className="mt-1">Oct — Dec 2026</p></div><div className="rounded-xl bg-white px-4 py-3"><small className="text-black/40">{t.travelers}</small><p className="mt-1">2</p></div><a href="#destinations" className="flex items-center justify-center rounded-xl bg-[#243127] px-6 py-4 font-semibold text-white">{t.find}</a></div></div>
    </section>

    <section id="destinations" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36"><p className="text-xs uppercase tracking-[.28em] text-[#8d744f]">VELARIA SELECTION</p><div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><h2 className="max-w-3xl font-serif text-5xl tracking-[-.04em] md:text-7xl">{t.destinations}</h2><p className="max-w-md leading-7 text-black/55">{t.destinationsText}</p></div><div className="mt-14 grid gap-5 lg:grid-cols-3">{t.cards.map(([name,place,price],i)=><article key={name} className="group overflow-hidden rounded-[2rem] bg-white"><div className="relative aspect-[4/5] overflow-hidden"><Image src={images[i]} alt={name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width:1024px) 90vw, 33vw"/><div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"/><div className="absolute inset-x-0 bottom-0 p-7 text-white"><p className="text-xs uppercase tracking-[.2em] text-white/65">{place}</p><h3 className="mt-2 font-serif text-4xl">{name}</h3><div className="mt-5 flex items-center justify-between"><span>{price}</span><span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35">→</span></div></div></div></article>)}</div></section>

    <section id="about" className="bg-[#243127] text-white"><div className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-36"><p className="text-xs uppercase tracking-[.28em] text-[#d8b57b]">{t.methodEyebrow}</p><h2 className="mt-6 max-w-4xl font-serif text-5xl tracking-[-.04em] md:text-7xl">{t.methodTitle}</h2><div className="mt-16 divide-y divide-white/15 border-y border-white/15">{t.method.map(([num,title,text])=><div key={num} className="grid gap-5 py-8 md:grid-cols-[100px_1fr_1.2fr]"><span className="text-white/35">{num}</span><h3 className="font-serif text-3xl">{title}</h3><p className="leading-7 text-white/55">{text}</p></div>)}</div></div></section>

    <section id="journeys" className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-28 md:grid-cols-2 md:px-8 md:py-36"><div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]"><Image src="/images/stk-lab/travel/travel-digital-concierge.webp" alt="Velaria digital concierge" fill className="object-cover" sizes="(max-width:768px) 95vw, 50vw"/></div><div><p className="text-xs uppercase tracking-[.28em] text-[#8d744f]">{t.appEyebrow}</p><h2 className="mt-5 font-serif text-5xl tracking-[-.04em] md:text-7xl">{t.appTitle}</h2><p className="mt-7 text-lg leading-8 text-black/55">{t.appText}</p></div></section>
    <section className="bg-[#d9c5a5] px-5 py-24 text-center md:py-32"><blockquote className="mx-auto max-w-5xl font-serif text-4xl italic leading-tight md:text-7xl">“{t.quote}”</blockquote></section>
    <section id="contact" className="bg-[#17231b] px-5 py-28 text-white md:py-36"><div className="mx-auto max-w-5xl text-center"><h2 className="font-serif text-5xl tracking-[-.04em] md:text-8xl">{t.cta}</h2><p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/60">{t.ctaText}</p><DemoSiteOrderForm locale={locale} siteName="Velaria Travel" /></div></section>
    <footer className="bg-[#101912] px-5 py-8 text-white/50"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm md:flex-row"><span>© 2026 VELARIA</span><span>{t.demo}</span></div></footer>
  </main>;
}
