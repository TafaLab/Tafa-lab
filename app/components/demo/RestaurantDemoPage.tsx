import Image from "next/image";
import Link from "next/link";

import DemoSiteOrderForm from "./DemoSiteOrderForm";

type Locale = "ru" | "en";
type Kind = "vegan" | "halal" | "japanese";

const data = {
  vegan: {
    brand: "VERDANT",
    hero: "/images/stk-lab/restaurants/demos/verde-restaurant-hero-v2.webp",
    storyImage: "/images/stk-lab/restaurants/demos/verdant-open-kitchen-v1.webp",
    bg: "#f2f3e8", ink: "#173f2c", accent: "#b9d46a", soft: "#dfe8c8",
    en: { label:"Plant-led restaurant · seasonal kitchen", title:"Plants, grown into something memorable.", text:"A bright neighbourhood restaurant where seasonal vegetables, thoughtful technique and local growers lead the menu.", cta:"Reserve a table", menu:"This week’s harvest", story:"From soil to table", storyText:"We work with small farms, cook with the whole plant and change the menu as the fields change.", stats:[["12","local growers"],["86%","seasonal produce"],["0","single-use plastic"]], dishes:[["Beetroot tartare","horseradish, capers, rye","$11"],["Charred cauliflower","almond cream, herbs","$14"],["Wild mushroom risotto","barley miso, thyme","$18"],["Green coconut curry","seasonal greens, jasmine rice","$16"],["Garden bowl","avocado, grains, tahini","$13"],["Chocolate · tahini","olive oil, sea salt","$9"]], form:"Plan a green evening", formText:"Choose a date and tell us about allergies or the occasion." },
    ru: { label:"Растительный ресторан · сезонная кухня", title:"Растения, которые становятся впечатлением.", text:"Светлый городской ресторан, где сезонные овощи, точная техника и локальные фермеры определяют меню.", cta:"Забронировать стол", menu:"Урожай этой недели", story:"От земли до стола", storyText:"Работаем с небольшими фермами, используем растение целиком и меняем меню вместе с сезоном.", stats:[["12","локальных ферм"],["86%","сезонных продуктов"],["0","одноразового пластика"]], dishes:[["Тартар из свёклы","хрен, каперсы, ржаной хлеб","$11"],["Цветная капуста на огне","миндальный крем, травы","$14"],["Ризотто с лесными грибами","мисо из ячменя, тимьян","$18"],["Зелёный кокосовый карри","овощи, жасминовый рис","$16"],["Садовый боул","авокадо, крупы, тахини","$13"],["Шоколад · тахини","оливковое масло, морская соль","$9"]], form:"Запланируйте зелёный вечер", formText:"Выберите дату и сообщите об аллергиях или поводе." },
  },
  halal: {
    brand: "NOOR TABLE",
    hero: "/images/stk-lab/restaurants/demos/noor-halal-hero-v2.webp",
    storyImage: "/images/stk-lab/restaurants/demos/noor-family-dining-v1.webp",
    bg: "#f6eadc", ink: "#174238", accent: "#c8784e", soft: "#ead0b6",
    en: { label:"Contemporary halal dining · family table", title:"Hospitality begins with generosity.", text:"A refined halal table inspired by Central Asia and the Middle East—open fire, fragrant spices and dishes made to share.", cta:"Book your table", menu:"The sharing table", story:"Halal, clearly", storyText:"100% halal ingredients, an alcohol-free kitchen and a menu designed for families, celebrations and private dining.", stats:[["100%","halal kitchen"],["7 days","family dining"],["24","private guests"]], dishes:[["House mezze","hummus, muhammara, warm bread","$12"],["Saffron chicken","apricot, almond, couscous","$19"],["Slow lamb shoulder","pilaf, dates, jus","$26"],["Charcoal sea bass","sumac, herbs, lemon","$24"],["Pumpkin manty","yoghurt, chilli butter","$15"],["Pistachio milk cake","rose, berries","$10"]], form:"Gather around our table", formText:"Tell us the date, number of guests and any dietary wishes." },
    ru: { label:"Современная halal-кухня · семейный ресторан", title:"Гостеприимство начинается со щедрости.", text:"Современный халяльный ресторан с мотивами Центральной Азии и Ближнего Востока: открытый огонь, специи и блюда для большой компании.", cta:"Забронировать стол", menu:"Меню для общего стола", story:"Halal — без сомнений", storyText:"100% халяльные продукты, кухня без алкоголя и меню для семейных встреч, праздников и закрытых ужинов.", stats:[["100%","halal-кухня"],["7 дней","для всей семьи"],["24","гостя в private room"]], dishes:[["Домашнее мезе","хумус, мухаммара, тёплый хлеб","$12"],["Цыплёнок с шафраном","абрикос, миндаль, кускус","$19"],["Томлёная лопатка ягнёнка","плов, финики, жю","$26"],["Сибас на углях","сумах, зелень, лимон","$24"],["Манты с тыквой","йогурт, пряное масло","$15"],["Фисташковый молочный торт","роза, ягоды","$10"]], form:"Соберитесь за нашим столом", formText:"Укажите дату, количество гостей и особые пожелания." },
  },
  japanese: {
    brand: "KURO 炉端",
    hero: "/images/stk-lab/restaurants/demos/kaiseki-restaurant-hero-v2.webp",
    storyImage: "/images/stk-lab/restaurants/demos/kuro-robata-counter-v1.webp",
    bg: "#080808", ink: "#f3eee4", accent: "#ef4b2f", soft: "#171717",
    en: { label:"Tokyo fire kitchen · robata counter", title:"Fire. Smoke. Precision.", text:"An intimate Japanese dining room built around charcoal, seasonal seafood and the rhythm of the robata counter.", cta:"Take a counter seat", menu:"From the fire", story:"One counter. One flame.", storyText:"Watch every course move from binchotan charcoal to the plate. À la carte or a seven-course chef sequence.", stats:[["12","counter seats"],["7","course omakase"],["900°C","binchotan heat"]], dishes:[["Miso eggplant","sesame, sansho","$9"],["Chicken yakitori","tare, spring onion","$12"],["Black cod","saikyo miso, daikon","$25"],["Wagyu striploin","smoked soy, wasabi","$34"],["Claypot rice","mushroom, kombu","$16"],["Matcha semifreddo","black sesame","$9"]], form:"Enter the evening", formText:"Reservations are limited. Share your date, party size and dietary notes." },
    ru: { label:"Японская кухня огня · robata counter", title:"Огонь. Дым. Точность.", text:"Камерный японский ресторан, построенный вокруг угля, сезонных морепродуктов и ритма открытой робата-кухни.", cta:"Место у стойки", menu:"С открытого огня", story:"Одна стойка. Одно пламя.", storyText:"Каждое блюдо проходит путь от угля бинтётан до тарелки на глазах у гостя. À la carte или сет из семи подач.", stats:[["12","мест у стойки"],["7","подач omakase"],["900°C","жар бинтётана"]], dishes:[["Баклажан мисо","кунжут, сансё","$9"],["Якитори из цыплёнка","таре, зелёный лук","$12"],["Чёрная треска","сайкё мисо, дайкон","$25"],["Стриплойн wagyu","копчёная соя, васаби","$34"],["Рис в глиняном горшке","грибы, комбу","$16"],["Семифреддо матча","чёрный кунжут","$9"]], form:"Войдите в вечер", formText:"Количество мест ограничено. Укажите дату, гостей и пищевые ограничения." },
  },
} as const;

export default function RestaurantDemoPage({ locale, kind }: { locale: Locale; kind: Kind }) {
  const item = data[kind];
  const t = item[locale];
  const other = locale === "ru" ? "en" : "ru";
  const route = kind === "vegan" ? "vegan-restaurant-demo" : kind === "halal" ? "halal-restaurant-demo" : "japanese-restaurant-demo";
  const dark = kind === "japanese";
  const japanese = kind === "japanese";
  return <main style={{background:item.bg,color:item.ink}} className="min-h-screen">
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-center text-[11px] uppercase tracking-[.18em] opacity-80">
      <span>{locale==="ru"?"Демо-ресторан · создано Tafa Lab":"Demo restaurant · created by Tafa Lab"}</span>
      <Link className="underline underline-offset-4" href={`/${locale}/industries/restaurants`}>{locale==="ru"?"Все ресторанные сайты":"All restaurant sites"} →</Link>
      <Link className="underline underline-offset-4" href={`/${locale}/demo-admin`}>{locale==="ru"?"Демо-админка":"Demo admin"} →</Link>
    </div>
    <header className="relative z-20 flex items-center justify-between border-y px-5 py-5 md:px-10" style={{borderColor:dark?"#ffffff22":"#173f2c22"}}><div className={japanese?"text-2xl font-black tracking-[.22em]":"font-serif text-2xl tracking-[.12em]"}>{item.brand}</div><nav className="hidden gap-8 text-sm md:flex"><a href="#menu">{locale==="ru"?"Меню":"Menu"}</a><a href="#story">{locale==="ru"?"Концепция":"Concept"}</a><a href="#book">{locale==="ru"?"Бронь":"Reserve"}</a></nav><Link href={`/${other}/${route}`} className="rounded-full border px-4 py-2 text-xs uppercase" style={{borderColor:dark?"#ffffff44":"#173f2c44"}}>{other}</Link></header>

    <section className="relative min-h-[760px] overflow-hidden bg-cover bg-center" style={{backgroundImage:`linear-gradient(90deg, ${japanese?"rgba(0,0,0,.92)":"rgba(10,25,18,.82)"} 0%, rgba(0,0,0,.2) 60%, rgba(0,0,0,.08) 100%), url(${item.hero})`}}><div className="mx-auto flex min-h-[760px] max-w-7xl items-end px-5 pb-16 pt-28 text-white md:px-10 md:pb-24"><div className="max-w-4xl"><p className="text-xs font-semibold uppercase tracking-[.32em]" style={{color:item.accent}}>{t.label}</p><h1 className={`${japanese?"font-sans font-black uppercase":"font-serif"} mt-7 text-6xl leading-[.9] tracking-[-.055em] md:text-8xl lg:text-[7.4rem]`}>{t.title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">{t.text}</p><a href="#book" className="mt-9 inline-flex rounded-full px-7 py-4 font-semibold" style={{background:item.accent,color:japanese?"#fff":"#173f2c"}}>{t.cta} →</a></div></div></section>

    <section id="story" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[1.15fr_.85fr] md:px-10 md:py-32"><div><p className="text-xs uppercase tracking-[.3em] opacity-55">{locale==="ru"?"Манифест":"Manifesto"}</p><h2 className={`${japanese?"font-sans font-black uppercase":"font-serif"} mt-5 text-5xl tracking-[-.05em] md:text-7xl`}>{t.story}</h2><p className="mt-7 max-w-2xl text-xl leading-9 opacity-70">{t.storyText}</p></div><div className="grid grid-cols-3 self-end border-y py-8" style={{borderColor:dark?"#ffffff22":"#173f2c33"}}>{t.stats.map(([n,l])=><div key={l} className="px-3 text-center"><div className="text-3xl font-semibold md:text-4xl" style={{color:item.accent}}>{n}</div><div className="mt-2 text-xs leading-5 opacity-55">{l}</div></div>)}</div></section>

    <section className="mx-auto max-w-7xl px-5 pb-24 md:px-10 md:pb-32"><div className="relative aspect-[3/2] overflow-hidden rounded-[2rem]"><Image src={item.storyImage} alt="Restaurant interior" fill className="object-cover" sizes="(max-width: 768px) 95vw, 1200px" /></div></section>

    <section id="menu" className="px-5 py-24 md:px-10 md:py-32" style={{background:item.soft}}><div className="mx-auto max-w-7xl"><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="text-xs uppercase tracking-[.3em] opacity-55">À la carte</p><h2 className={`${japanese?"font-sans font-black uppercase":"font-serif"} mt-4 text-5xl tracking-[-.05em] md:text-7xl`}>{t.menu}</h2></div><p className="max-w-sm text-sm leading-6 opacity-55">{locale==="ru"?"Пример интерактивного меню. Состав и цены можно редактировать из административной панели.":"Interactive menu example. Dishes and prices can be managed from the restaurant dashboard."}</p></div><div className="mt-14 grid gap-x-12 md:grid-cols-2">{t.dishes.map(([name,desc,price],i)=><article key={name} className="grid grid-cols-[42px_1fr_auto] gap-4 border-t py-7" style={{borderColor:dark?"#ffffff22":"#173f2c2a"}}><span className="text-xs opacity-35">0{i+1}</span><div><h3 className="text-xl font-semibold">{name}</h3><p className="mt-2 text-sm opacity-55">{desc}</p></div><strong style={{color:item.accent}}>{price}</strong></article>)}</div></div></section>

    <section id="book" className="px-5 py-24 text-white md:px-10 md:py-32" style={{background:japanese?"#080808":"#173f2c"}}><div className="mx-auto max-w-5xl text-center"><p className="text-xs uppercase tracking-[.3em] text-white/45">{locale==="ru"?"Бронирование · демо":"Reservation · demo"}</p><h2 className={`${japanese?"font-sans font-black uppercase":"font-serif"} mt-5 text-5xl tracking-[-.05em] md:text-7xl`}>{t.form}</h2><p className="mx-auto mt-5 max-w-xl text-lg text-white/60">{t.formText}</p><DemoSiteOrderForm locale={locale} siteName={`${item.brand} — restaurant reservation`} kind="restaurant" /></div></section>
    <footer className="flex flex-col gap-3 px-5 py-8 text-xs opacity-60 md:flex-row md:justify-between md:px-10"><span>© 2026 {item.brand}</span><span>{locale==="ru"?"Демонстрационный сайт Tafa Lab":"A demonstration website by Tafa Lab"}</span></footer>
  </main>;
}
