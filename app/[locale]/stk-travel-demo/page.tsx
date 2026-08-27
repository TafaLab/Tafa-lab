import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import DemoSiteOrderForm from "@/app/components/demo/DemoSiteOrderForm";

type Locale = "ru" | "en";

export const metadata: Metadata = {
  title: "STK Travel — Destination Guides Demo",
  description: "A travel guides and consultation platform demo by Tafa Lab.",
  robots: { index: false, follow: false },
};

const images = [
  "/images/stk-lab/travel/velaria/amalfi-coast.webp",
  "/images/stk-lab/travel/velaria/bali-quiet-luxury.webp",
  "/images/stk-lab/travel/velaria/japan-sakura.webp",
  "/images/stk-lab/travel/velaria/wild-iceland.webp",
];

const copy = {
  ru: {
    eyebrow: "Гайды, маршруты и честные советы",
    title: "Путешествуйте увереннее.",
    text: "Практичная travel-платформа с проверенными маршрутами, понятными гайдами и консультациями для самостоятельных путешественников.",
    cta: "Выбрать направление", consult: "Получить консультацию",
    destinations: "Куда отправиться дальше", destinationText: "Готовые точки старта: когда ехать, где жить, как передвигаться и что действительно стоит увидеть.",
    cards: [["Амальфи","Италия · побережье и маленькие города"],["Бали","Индонезия · остров без туристических клише"],["Япония","Токио — Киото · первый маршрут"],["Исландия","Кольцевая дорога · природа и аренда авто"]],
    guideTitle: "Всё важное до покупки билета", guides: [["Сезон и погода","Когда ехать, чего ожидать и что взять с собой."],["Бюджет без сюрпризов","Перелёт, жильё, транспорт, еда и реальный запас расходов."],["Маршрут по дням","Логичная последовательность без лишних переездов и спешки."],["Правила и документы","Виза, въезд, страховка, связь и важные местные особенности."]],
    form: "Нужен маршрут именно под вас?", formText: "Расскажите о направлении, датах и формате отдыха — мы подготовим основу поездки.",
    demo: "Демонстрационная travel-платформа Tafa Lab", back: "Все travel-проекты",
  },
  en: {
    eyebrow: "Guides, itineraries and honest advice", title: "Travel with more confidence.", text: "A practical travel platform with tested itineraries, clear destination guides and consultations for independent travelers.", cta: "Choose a destination", consult: "Get a consultation",
    destinations: "Where to go next", destinationText: "Useful starting points: when to visit, where to stay, how to move around and what is genuinely worth your time.",
    cards: [["Amalfi","Italy · coast and small towns"],["Bali","Indonesia · beyond the tourist clichés"],["Japan","Tokyo — Kyoto · a first itinerary"],["Iceland","Ring Road · nature and car rental"]],
    guideTitle: "Everything to know before booking", guides: [["Season and weather","When to go, what to expect and what to pack."],["A realistic budget","Flights, stays, transport, food and a sensible reserve."],["A day-by-day route","A logical journey without needless transfers or rushing."],["Rules and documents","Entry, insurance, connectivity and important local details."]],
    form: "Need an itinerary built around you?", formText: "Tell us the destination, dates and travel style, and we will shape the foundation of your trip.",
    demo: "A demonstration travel platform by Tafa Lab", back: "All travel projects",
  },
} as const;

export default async function Page({params}:{params:Promise<{locale:string}>}) {
  const {locale:raw}=await params;
  if(raw!=="ru"&&raw!=="en") notFound();
  const locale=raw as Locale, other=locale==="ru"?"en":"ru", t=copy[locale];
  return <main className="min-h-screen bg-[#f4efe5] text-[#183a31]">
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 bg-[#183a31] px-4 py-2 text-center text-[11px] uppercase tracking-[.18em] text-white/70"><span>{t.demo}</span><Link className="underline underline-offset-4" href={`/${locale}/industries/travel`}>{t.back} →</Link></div>
    <header className="flex items-center justify-between border-b border-black/10 px-5 py-5 md:px-10"><Link href={`/${locale}/stk-travel-demo`} className="text-xl font-black tracking-[.16em]">STK TRAVEL</Link><nav className="hidden gap-8 text-sm md:flex"><a href="#destinations">{locale==="ru"?"Направления":"Destinations"}</a><a href="#guides">{locale==="ru"?"Гайды":"Guides"}</a><a href="#consult">{locale==="ru"?"Консультация":"Consultation"}</a></nav><Link href={`/${other}/stk-travel-demo`} className="rounded-full border border-black/20 px-4 py-2 text-xs uppercase">{other}</Link></header>
    <section className="relative min-h-[760px] overflow-hidden"><Image src="/images/stk-lab/travel/travel-website-hero-v2.webp" alt="STK Travel destination guides" fill priority className="object-cover" sizes="100vw"/><div className="absolute inset-0 bg-gradient-to-r from-[#102d25]/95 via-[#102d25]/65 to-transparent"/><div className="relative mx-auto flex min-h-[760px] max-w-7xl items-end px-5 pb-20 text-white md:px-10 md:pb-28"><div className="max-w-4xl"><p className="text-xs font-semibold uppercase tracking-[.3em] text-[#eac86e]">{t.eyebrow}</p><h1 className="mt-7 text-6xl font-black leading-[.9] tracking-[-.06em] md:text-8xl lg:text-[7.5rem]">{t.title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">{t.text}</p><div className="mt-9 flex flex-wrap gap-3"><a href="#destinations" className="rounded-full bg-[#eac86e] px-7 py-4 font-semibold text-[#183a31]">{t.cta} →</a><a href="#consult" className="rounded-full border border-white/30 px-7 py-4">{t.consult}</a></div></div></div></section>
    <section id="destinations" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32"><p className="text-xs uppercase tracking-[.28em] text-black/45">DESTINATION LIBRARY</p><div className="mt-5 grid gap-6 md:grid-cols-[1fr_.7fr]"><h2 className="text-5xl font-black tracking-[-.05em] md:text-7xl">{t.destinations}</h2><p className="self-end text-lg leading-8 text-black/55">{t.destinationText}</p></div><div className="mt-14 grid gap-5 md:grid-cols-2">{t.cards.map(([name,text],i)=><article key={name} className="group relative aspect-[16/10] overflow-hidden rounded-[2rem]"><Image src={images[i]} alt={name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width:768px) 95vw, 50vw"/><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"/><div className="absolute inset-x-0 bottom-0 p-7 text-white"><p className="text-sm text-white/65">{text}</p><div className="mt-2 flex items-end justify-between"><h3 className="text-4xl font-black">{name}</h3><span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35">→</span></div></div></article>)}</div></section>
    <section id="guides" className="bg-[#183a31] px-5 py-24 text-white md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><p className="text-xs uppercase tracking-[.28em] text-[#eac86e]">PRACTICAL GUIDES</p><h2 className="mt-5 max-w-4xl text-5xl font-black tracking-[-.05em] md:text-7xl">{t.guideTitle}</h2><div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/15 md:grid-cols-2">{t.guides.map(([title,text],i)=><article key={title} className="min-h-64 bg-[#183a31] p-7 md:p-9"><span className="text-xs text-white/35">0{i+1}</span><h3 className="mt-12 text-3xl font-bold">{title}</h3><p className="mt-4 max-w-md leading-7 text-white/55">{text}</p></article>)}</div></div></section>
    <section id="consult" className="bg-[#d9b957] px-5 py-24 text-[#183a31] md:px-10 md:py-32"><div className="mx-auto max-w-5xl text-center"><h2 className="text-5xl font-black tracking-[-.05em] md:text-7xl">{t.form}</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-black/60">{t.formText}</p><div className="mt-10 rounded-[2rem] bg-[#183a31] p-2 md:p-5"><DemoSiteOrderForm locale={locale} siteName="STK Travel — consultation" kind="travel"/></div></div></section>
    <footer className="flex flex-col gap-3 bg-[#102d25] px-5 py-8 text-xs text-white/50 md:flex-row md:justify-between md:px-10"><span>© 2026 STK TRAVEL</span><span>{t.demo}</span></footer>
  </main>;
}
