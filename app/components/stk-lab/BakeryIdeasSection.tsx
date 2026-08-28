import type { StkLabLocale } from "./content";

const content = {
  ru: {
    title: "Идеи для вашего будущего сайта",
    text: "Не просто каталог, а интерактивный сервис, который помогает выбрать, заказать и вернуться снова.",
    groups: [
      ["Выбор и вдохновение", [["Какой десерт вам подходит?", "Квиз по вкусу, сладости и поводу с персональной рекомендацией."], ["Торт по фотографии", "Загрузка референса и выбор деталей, которые важно сохранить."], ["Умный подбор подарка", "Подбор десерта, упаковки и открытки по получателю и поводу."], ["Сезонные ингредиенты", "Каталог по свежим ингредиентам с таймером окончания сезона."]]],
      ["Интерактивный заказ", [["3D-конструктор", "Ярусы, размеры, текстуры, декор, вращение 360°, цена и сохранение."], ["AI: торт за 30 секунд", "AI помогает пройти Shape → Flavor → Cream → Decoration → Message и собирает итоговый дизайн."], ["Сколько гостей?", "Рекомендация веса и диаметра плюс капкейки как upsell."], ["Загляните внутрь", "Интерактивный разрез с коржами, кремом и начинкой."], ["Создайте коробку", "Визуальная сборка макарунов, печенья, брауни и капкейков."]]],
      ["Продажи и управление", [["Заказ + предоплата", "Готовая карточка заказа, онлайн-платёж и прозрачный остаток."], ["QR-меню", "Заказ с телефона без установки приложения."], ["CRM и WhatsApp", "История, любимые вкусы, даты и автоматические напоминания."], ["Календарь и производство", "Статусы, дневной план, производственные листы и закупки."], ["Себестоимость", "Ингредиенты, упаковка, работа, наценка и реальная прибыль."], ["Кухня изнутри", "Scroll-история: мука, смешивание, выпечка, декор, готовый заказ."]]],
    ],
  },
  en: {
    title: "Ideas for your future website",
    text: "More than a catalogue: an interactive service that helps people choose, order and return.",
    groups: [
      ["Discovery", [["Find Your Dessert", "A flavour, sweetness and occasion quiz with a personal result."], ["Cake from a Photo", "Upload inspiration and select the details to retain."], ["Smart Gift Finder", "Match dessert, packaging and card to recipient and occasion."], ["Seasonal Ingredients", "Ingredient-led collections with a season countdown."]]],
      ["Interactive ordering", [["3D Cake Builder", "Tiers, dimensions, textures, décor, 360° view, live price and save."], ["AI Cake in 30 Seconds", "AI guides Shape → Flavor → Cream → Decoration → Message and assembles the final design."], ["How Many Guests?", "Weight and diameter recommendations with a cupcake upsell."], ["See Inside", "An interactive cutaway showing sponge, cream and filling."], ["Build a Box", "Visual selection of macarons, cookies, brownies and cupcakes."]]],
      ["Sales and operations", [["Order + Deposit", "A complete order card, online payment and clear balance."], ["QR Menu", "Mobile ordering with no app required."], ["CRM and WhatsApp", "History, favourites, dates and automated reminders."], ["Calendar and Production", "Statuses, daily plans, production sheets and shopping lists."], ["True Cost", "Ingredients, packaging, labour, margin and real profit."], ["Inside the Kitchen", "A scroll story from flour and mixing to decoration and delivery."]]],
    ],
  },
} as const;

export default function BakeryIdeasSection({ locale }: { locale: StkLabLocale }) {
  const t = content[locale];
  return <section id="ideas" className="bg-[#241d1b] py-24 text-white md:py-32"><div className="mx-auto max-w-7xl px-5 md:px-8"><p className="text-xs uppercase tracking-[.25em] text-[#d9a99f]">Tafa Lab · Bakery ideas</p><h2 className="mt-5 max-w-5xl text-5xl tracking-[-.05em] md:text-7xl">{t.title}</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-white/60">{t.text}</p><div className="mt-16 space-y-14">{t.groups.map(([group,items])=><div key={group}><h3 className="text-2xl text-[#e7c6be]">{group}</h3><div className="mt-6 grid border-l border-t border-white/15 md:grid-cols-2 lg:grid-cols-3">{items.map(([title,text],i)=><article key={title} className="min-h-[230px] border-b border-r border-white/15 p-6"><span className="text-xs text-white/30">0{i+1}</span><h4 className="mt-10 text-2xl tracking-[-.035em]">{title}</h4><p className="mt-4 leading-7 text-white/55">{text}</p></article>)}</div></div>)}</div></div></section>;
}
