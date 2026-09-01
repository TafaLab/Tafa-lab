type Locale = "ru" | "en";

const ideas = {
  ru: [
    ["3D / AR-меню", "Вращение блюда, приближение, ингредиенты и просмотр на своём столе через дополненную реальность."],
    ["AI Food Finder", "Подбор блюда по вкусу, настроению, аппетиту и пищевым ограничениям."],
    ["Покажите, что внутри", "Бургер, суши, ramen или пицца визуально разбираются на ингредиенты."],
    ["Живое меню вместо PDF", "Категории, фотографии, цены, dietary labels, specials, корзина и доступность обновляются из админки."],
    ["Блюдо летит в корзину", "Небольшая анимация подтверждает действие и делает обычное добавление запоминающимся."],
    ["Сегодня рекомендует шеф", "Раскрывающаяся история блюда, происхождение продуктов и подходящий напиток."],
    ["Уровень остроты", "От No spice до Good luck — с понятным визуальным изменением блюда."],
    ["Соберите сет", "Гость наполняет суши-сет, тарелку tapas или комбо и сразу видит количество и цену."],
    ["Интерактивная карта", "Бар, зал, терраса и private room с фотографиями, вместимостью и отдельным бронированием."],
    ["Выбор конкретного стола", "Дата, время и гости → свободные столики → вид, места и подтверждение брони."],
    ["Что происходит сегодня", "Живой блок с музыкой, special menu, выступлениями и быстрым бронированием."],
    ["Smart Table", "QR на столе открывает меню, 3D, модификаторы, заказ, оплату и передачу на кухню — без приложения."],
  ],
  en: [
    ["3D / AR Menu", "Rotate, zoom, inspect ingredients and place a true-scale dish on the table in augmented reality."],
    ["AI Food Finder", "Match dishes to cravings, mood, hunger level and dietary needs."],
    ["What’s Inside", "Burgers, sushi, ramen or pizza separate into an interactive ingredient view."],
    ["A Live Menu, Not a PDF", "Categories, photography, prices, dietary labels, specials, cart and availability update from the dashboard."],
    ["Fly to Cart", "A small motion confirms the action and turns a routine add into a memorable interaction."],
    ["Chef’s Pick Today", "Expand the story, ingredient origin and recommended pairing before adding the dish."],
    ["Spice Level", "From No spice to Good luck, with an immediate visual change."],
    ["Build a Set", "Fill a sushi set, tapas plate or combo while count and price update live."],
    ["Interactive Venue Map", "Bar, dining room, terrace and private room with photos, capacity and dedicated booking."],
    ["Choose Your Table", "Date, time and guests reveal available tables, views and seating details."],
    ["What’s On Today", "A live schedule for music, specials and performances with instant booking."],
    ["Smart Table", "A table QR opens menu, 3D, modifiers, ordering, payment and kitchen handoff — no app."],
  ],
} as const;

export default function RestaurantIdeasSection({locale}:{locale:Locale}){
  const ru=locale==="ru";
  return <section id="ideas" className="bg-[#171513] py-24 text-white md:py-32"><div className="mx-auto max-w-7xl px-5 md:px-8"><p className="text-xs uppercase tracking-[.25em] text-[#e8b84a]">Restaurant innovation</p><div className="mt-5 grid gap-8 md:grid-cols-[1fr_.7fr] md:items-end"><h2 className="text-5xl tracking-[-.05em] md:text-7xl">{ru?"Идеи для вашего будущего ресторанного сайта":"Ideas for your future restaurant website"}</h2><p className="text-lg leading-8 text-white/55">{ru?"От вау-эффекта до функций, которые увеличивают средний чек и передают заказ прямо в работу.":"From visual wow-factor to practical tools that increase order value and send orders straight into operations."}</p></div><div className="mt-16 grid border-l border-t border-white/15 md:grid-cols-2 lg:grid-cols-3">{ideas[locale].map(([title,text],i)=><article key={title} className="min-h-[250px] border-b border-r border-white/15 p-7"><span className="text-xs text-white/30">{String(i+1).padStart(2,"0")}</span><h3 className="mt-12 text-2xl">{title}</h3><p className="mt-4 leading-7 text-white/55">{text}</p></article>)}</div></div></section>;
}
