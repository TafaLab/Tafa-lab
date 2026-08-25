import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import { enMessages } from "@/messages/en";
import { ruMessages } from "@/messages/ru";

type Locale = "ru" | "en";
type FoodItem = { image: string; ru: string; en: string };
type FoodSection = { id: string; ru: string; en: string; items: FoodItem[] };

const sections: FoodSection[] = [
  {
    id: "breakfasts", ru: "Завтраки и тосты", en: "Breakfasts & Toasts", items: [
      { image: "/images/food/breakfasts/american-breakfast.webp", ru: "Американский завтрак", en: "American Breakfast" },
      { image: "/images/food/breakfasts/english-breakfast.webp", ru: "Английский завтрак", en: "English Breakfast" },
      { image: "/images/food/breakfasts/italian-breakfast.webp", ru: "Итальянский завтрак", en: "Italian Breakfast" },
      { image: "/images/food/breakfasts/balinese-breakfast.webp", ru: "Балийский завтрак", en: "Balinese Breakfast" },
      { image: "/images/food/breakfasts/eggs-benedict-bacon.webp", ru: "Яйца Бенедикт с беконом", en: "Eggs Benedict with Bacon" },
      { image: "/images/food/breakfasts/eggs-benedict-salmon.webp", ru: "Яйца Бенедикт с лососем", en: "Eggs Benedict with Salmon" },
      { image: "/images/food/breakfasts/omelette-mozzarella-tomatoes.webp", ru: "Омлет с моцареллой и томатами", en: "Mozzarella & Tomato Omelette" },
      { image: "/images/food/breakfasts/omelette-mushrooms-spinach.webp", ru: "Омлет с грибами и шпинатом", en: "Mushroom & Spinach Omelette" },
      { image: "/images/food/breakfasts/scrambled-eggs-avocado.webp", ru: "Скрэмбл с авокадо", en: "Scrambled Eggs with Avocado" },
      { image: "/images/food/breakfasts/avocado-toast-poached-egg.webp", ru: "Авокадо-тост с яйцом пашот", en: "Avocado Toast with Poached Egg" },
      { image: "/images/food/breakfasts/salmon-avocado-toast.webp", ru: "Тост с лососем и авокадо", en: "Salmon & Avocado Toast" },
      { image: "/images/food/breakfasts/mushroom-egg-toast.webp", ru: "Тост с грибами и яйцом", en: "Mushroom & Egg Toast" },
    ],
  },
  {
    id: "sweet-breakfasts", ru: "Сладкие завтраки", en: "Sweet Breakfasts", items: [
      { image: "/images/food/sweetbreakfasts/syrniki-berries.webp", ru: "Сырники с ягодами", en: "Syrniki with Berries" },
      { image: "/images/food/sweetbreakfasts/pancakes-berries.webp", ru: "Панкейки с ягодами", en: "Pancakes with Berries" },
      { image: "/images/food/sweetbreakfasts/pancakes-banana-caramel.webp", ru: "Панкейки с бананом и карамелью", en: "Banana Caramel Pancakes" },
      { image: "/images/food/sweetbreakfasts/yogurt-granola-tropical-fruits.webp", ru: "Йогурт с гранолой и тропическими фруктами", en: "Yogurt with Granola & Tropical Fruit" },
      { image: "/images/food/sweetbreakfasts/ricotta-berry-toast.webp", ru: "Тост с рикоттой и ягодами", en: "Ricotta & Berry Toast" },
    ],
  },
  {
    id: "bowls", ru: "Боулы", en: "Bowls", items: [
      { image: "/images/food/bowls/avocado-bowl.webp", ru: "Боул с авокадо", en: "Avocado Bowl" },
      { image: "/images/food/bowls/berry-bowl.webp", ru: "Ягодный боул", en: "Berry Bowl" },
      { image: "/images/food/bowls/chocolate-bowl.webp", ru: "Шоколадный боул", en: "Chocolate Bowl" },
      { image: "/images/food/bowls/mango-bowl.webp", ru: "Манговый боул", en: "Mango Bowl" },
      { image: "/images/food/bowls/rice-vegetable-taco-bowl.webp", ru: "Рисовый боул с овощами и тако", en: "Rice, Vegetable & Taco Bowl" },
      { image: "/images/food/bowls/balinese-chicken-bowl.webp", ru: "Балийский боул с курицей", en: "Balinese Chicken Bowl" },
      { image: "/images/food/bowls/tropical-shrimp-bowl.webp", ru: "Тропический боул с креветками", en: "Tropical Shrimp Bowl" },
      { image: "/images/food/bowls/tuna-poke-bowl.webp", ru: "Поке-боул с тунцом", en: "Tuna Poke Bowl" },
    ],
  },
  {
    id: "croissants", ru: "Круассаны", en: "Croissants", items: [
      { image: "/images/food/croissants/croissant-caprese.webp", ru: "Круассан Капрезе", en: "Caprese Croissant" },
      { image: "/images/food/croissants/croissant-ham-cheese.webp", ru: "Круассан с ветчиной и сыром", en: "Ham & Cheese Croissant" },
      { image: "/images/food/croissants/croissant-mozzarella-pesto-tomatoes.webp", ru: "Круассан с моцареллой, песто и томатами", en: "Mozzarella, Pesto & Tomato Croissant" },
      { image: "/images/food/croissants/croissant-mushrooms-spinach-cheese.webp", ru: "Круассан с грибами, шпинатом и сыром", en: "Mushroom, Spinach & Cheese Croissant" },
      { image: "/images/food/croissants/croissant-salmon-cream-cheese-avocado.webp", ru: "Круассан с лососем, крем-сыром и авокадо", en: "Salmon, Cream Cheese & Avocado Croissant" },
      { image: "/images/food/croissants/croissant-scrambled-eggs-bacon.webp", ru: "Круассан со скрэмблом и беконом", en: "Scrambled Egg & Bacon Croissant" },
      { image: "/images/food/croissants/croissant-tuna-egg-salad.webp", ru: "Круассан с тунцом, яйцом и салатом", en: "Tuna, Egg & Salad Croissant" },
      { image: "/images/food/croissants/croissant-turkey-cheese-tomatoes.webp", ru: "Круассан с индейкой, сыром и томатами", en: "Turkey, Cheese & Tomato Croissant" },
    ],
  },
  {
    id: "pasta", ru: "Паста", en: "Pasta", items: [
      { image: "/images/food/pasta/pasta-carbonara.webp.jpg", ru: "Карбонара", en: "Carbonara" },
      { image: "/images/food/pasta/pasta-bolognese.webp.jpg", ru: "Болоньезе", en: "Bolognese" },
      { image: "/images/food/pasta/pasta-chicken-mushrooms.webp.jpg", ru: "Паста с курицей и грибами", en: "Chicken & Mushroom Pasta" },
      { image: "/images/food/pasta/pasta-salmon-cream-sauce.webp.jpg", ru: "Паста с лососем в сливочном соусе", en: "Salmon Pasta in Cream Sauce" },
      { image: "/images/food/pasta/pasta-pesto-chicken.webp.jpg", ru: "Паста песто с курицей", en: "Chicken Pesto Pasta" },
      { image: "/images/food/pasta/pasta-arrabbiata.webp.jpg", ru: "Аррабьята", en: "Arrabbiata" },
      { image: "/images/food/pasta/pasta-pomodoro-basil.webp.jpg", ru: "Помодоро с базиликом", en: "Pomodoro with Basil" },
      { image: "/images/food/pasta/pasta-seafood.webp.jpg", ru: "Паста с морепродуктами", en: "Seafood Pasta" },
      { image: "/images/food/pasta/truffle-pasta-mushrooms.webp.jpg", ru: "Трюфельная паста с грибами", en: "Truffle Mushroom Pasta" },
    ],
  },
  {
    id: "salads", ru: "Салаты", en: "Salads", items: [
      { image: "/images/food/salads/caesar-salad-chicken.webp.jpg", ru: "Цезарь с курицей", en: "Chicken Caesar Salad" },
      { image: "/images/food/salads/caesar-salad-shrimp.webp.jpg", ru: "Цезарь с креветками", en: "Shrimp Caesar Salad" },
      { image: "/images/food/salads/burrata-tomatoes.webp.jpg", ru: "Буррата с томатами", en: "Burrata with Tomatoes" },
      { image: "/images/food/salads/caprese-salad.webp.jpg", ru: "Капрезе", en: "Caprese Salad" },
      { image: "/images/food/salads/green-salad-avocado.webp.jpg", ru: "Зелёный салат с авокадо", en: "Green Avocado Salad" },
      { image: "/images/food/salads/salad-salmon-avocado.webp.jpg", ru: "Салат с лососем и авокадо", en: "Salmon & Avocado Salad" },
      { image: "/images/food/salads/salad-shrimp-mango.webp.jpg", ru: "Салат с креветками и манго", en: "Shrimp & Mango Salad" },
      { image: "/images/food/salads/tuna-salad.webp.jpg", ru: "Салат с тунцом", en: "Tuna Salad" },
      { image: "/images/food/salads/warm-chicken-salad.webp.jpg", ru: "Тёплый салат с курицей", en: "Warm Chicken Salad" },
    ],
  },
  {
    id: "soups-and-snacks", ru: "Супы и закуски", en: "Soups & Snacks", items: [
      { image: "/images/food/soups-and-snacks/chicken-soup.webp.jpg", ru: "Куриный суп", en: "Chicken Soup" },
      { image: "/images/food/soups-and-snacks/cream-mushroom-soup.webp.jpg", ru: "Грибной крем-суп", en: "Cream of Mushroom Soup" },
      { image: "/images/food/soups-and-snacks/cream-pumpkin-soup.webp.jpg", ru: "Тыквенный крем-суп", en: "Cream of Pumpkin Soup" },
      { image: "/images/food/soups-and-snacks/minestrone-soup.webp.jpg", ru: "Минестроне", en: "Minestrone Soup" },
      { image: "/images/food/soups-and-snacks/tomato-soup-basil.webp.jpg", ru: "Томатный суп с базиликом", en: "Tomato Basil Soup" },
      { image: "/images/food/soups-and-snacks/bruschetta-tomatoes.webp.jpg", ru: "Брускетта с томатами", en: "Tomato Bruschetta" },
      { image: "/images/food/soups-and-snacks/bruschetta-salmon.webp.jpg", ru: "Брускетта с лососем", en: "Salmon Bruschetta" },
      { image: "/images/food/soups-and-snacks/bruschetta-mushrooms.webp.jpg", ru: "Брускетта с грибами", en: "Mushroom Bruschetta" },
      { image: "/images/food/soups-and-snacks/focaccia-rosemary.webp.jpg", ru: "Фокачча с розмарином", en: "Rosemary Focaccia" },
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  return {
    title: { absolute: en ? "Food & Breakfast Menu | STK Bakery" : "Еда и завтраки | STK Bakery" },
    description: en ? "Breakfasts, bowls, croissants, pasta, salads, soups and snacks from STK Bakery." : "Завтраки, боулы, круассаны, паста, салаты, супы и закуски STK Bakery.",
    alternates: { canonical: `/${locale}/food`, languages: { ru: "/ru/food", en: "/en/food", "x-default": "/en/food" } },
  };
}

export default async function FoodPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (value !== "ru" && value !== "en") notFound();
  const locale = value as Locale;
  const en = locale === "en";
  const text = en ? enMessages : ruMessages;

  return (
    <main className="min-h-screen bg-[#faf8f6] text-[#342923]">
      <Header locale={locale} text={text.nav} />
      <section className="border-b border-black/10 bg-[#efe3da] px-5 py-16 text-center md:py-24">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b6250]">STK Bakery</span>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{en ? "Food & Breakfast Menu" : "Еда и завтраки"}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black/60 md:text-lg">{en ? "A visual menu of breakfasts, bowls, croissants, pasta, salads, soups and light snacks." : "Визуальное меню завтраков, боулов, круассанов, пасты, салатов, супов и лёгких закусок."}</p>
      </section>

      <nav className="sticky top-0 z-30 overflow-x-auto border-b border-black/10 bg-[#faf8f6]/95 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex w-max max-w-7xl gap-2">
          {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium transition hover:border-[#6a4433]/35">{en ? section.en : section.ru}</a>)}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        {sections.map((section, index) => (
          <section id={section.id} key={section.id} className={`scroll-mt-24 ${index ? "mt-20 md:mt-28" : ""}`}>
            <div className="flex items-end justify-between gap-5 border-b border-black/10 pb-5">
              <div><span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a67b65]">{String(index + 1).padStart(2, "0")}</span><h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em] md:text-5xl">{en ? section.en : section.ru}</h2></div>
              <span className="text-sm text-black/40">{section.items.length} {en ? "items" : "позиций"}</span>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {section.items.map((item) => (
                <article key={item.image} className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_12px_35px_rgba(61,43,34,0.05)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#eee7e1]"><Image src={item.image} alt={en ? item.en : item.ru} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /></div>
                  <div className="p-5"><h3 className="text-lg font-semibold leading-6">{en ? item.en : item.ru}</h3></div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Footer locale={locale} text={text.footer} />
    </main>
  );
}
