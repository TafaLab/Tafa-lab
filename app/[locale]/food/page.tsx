import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FoodMenuClient, { type FoodMenuSection } from "@/app/components/food/FoodMenuClient";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import { enMessages } from "@/messages/en";
import { ruMessages } from "@/messages/ru";

type Locale = "ru" | "en";
type FoodItem = { image: string; ru: string; en: string };
type FoodSection = { id: string; ru: string; en: string; prices: number[]; items: FoodItem[] };

const sections: FoodSection[] = [
  {
    id: "breakfasts", ru: "Завтраки и тосты", en: "Breakfasts & Toasts", prices: [13, 14, 12, 13, 11, 13, 10, 10, 9, 9, 12, 9], items: [
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
    id: "sweet-breakfasts", ru: "Сладкие завтраки", en: "Sweet Breakfasts", prices: [9, 8, 9, 8, 8], items: [
      { image: "/images/food/sweetbreakfasts/syrniki-berries.webp", ru: "Сырники с ягодами", en: "Syrniki with Berries" },
      { image: "/images/food/sweetbreakfasts/pancakes-berries.webp", ru: "Панкейки с ягодами", en: "Pancakes with Berries" },
      { image: "/images/food/sweetbreakfasts/pancakes-banana-caramel.webp", ru: "Панкейки с бананом и карамелью", en: "Banana Caramel Pancakes" },
      { image: "/images/food/sweetbreakfasts/yogurt-granola-tropical-fruits.webp", ru: "Йогурт с гранолой и тропическими фруктами", en: "Yogurt with Granola & Tropical Fruit" },
      { image: "/images/food/sweetbreakfasts/ricotta-berry-toast.webp", ru: "Тост с рикоттой и ягодами", en: "Ricotta & Berry Toast" },
    ],
  },
  {
    id: "bowls", ru: "Боулы", en: "Bowls", prices: [10, 9, 9, 10, 11, 12, 13, 13], items: [
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
    id: "croissants", ru: "Круассаны", en: "Croissants", prices: [7, 7, 8, 8, 10, 8, 8, 8], items: [
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
    id: "pasta", ru: "Паста", en: "Pasta", prices: [13, 13, 14, 16, 14, 11, 11, 16, 15], items: [
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
    id: "salads", ru: "Салаты", en: "Salads", prices: [11, 13, 13, 10, 10, 14, 13, 11, 12], items: [
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
    id: "soups-and-snacks", ru: "Супы и закуски", en: "Soups & Snacks", prices: [8, 8, 8, 8, 7, 6, 8, 7, 5], items: [
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

const ingredients: Record<string, [ru: string, en: string]> = {
  "american-breakfast.webp": ["Яйца, бекон, сосиски, картофель, тосты, томаты и фасоль", "Eggs, bacon, sausages, potatoes, toast, tomatoes and beans"],
  "english-breakfast.webp": ["Яйца, бекон, сосиски, фасоль, грибы, томаты и тосты", "Eggs, bacon, sausages, beans, mushrooms, tomatoes and toast"],
  "italian-breakfast.webp": ["Яйца, прошутто, моцарелла, томаты, зелень и чиабатта", "Eggs, prosciutto, mozzarella, tomatoes, greens and ciabatta"],
  "balinese-breakfast.webp": ["Рис, яйца, курица, овощи, авокадо и пряный соус", "Rice, eggs, chicken, vegetables, avocado and spiced sauce"],
  "eggs-benedict-bacon.webp": ["Яйца пашот, бекон, английская булочка и соус голландез", "Poached eggs, bacon, English muffin and hollandaise sauce"],
  "eggs-benedict-salmon.webp": ["Яйца пашот, лосось, английская булочка, шпинат и голландез", "Poached eggs, salmon, English muffin, spinach and hollandaise"],
  "omelette-mozzarella-tomatoes.webp": ["Яйца, моцарелла, томаты, сливки и свежая зелень", "Eggs, mozzarella, tomatoes, cream and fresh herbs"],
  "omelette-mushrooms-spinach.webp": ["Яйца, грибы, шпинат, сливки и сыр", "Eggs, mushrooms, spinach, cream and cheese"],
  "scrambled-eggs-avocado.webp": ["Яйца, авокадо, сливочное масло, зелень и тосты", "Eggs, avocado, butter, greens and toast"],
  "avocado-toast-poached-egg.webp": ["Хлеб на закваске, авокадо, яйцо пашот, зелень и семена", "Sourdough bread, avocado, poached egg, greens and seeds"],
  "salmon-avocado-toast.webp": ["Хлеб на закваске, лосось, авокадо, крем-сыр и зелень", "Sourdough bread, salmon, avocado, cream cheese and greens"],
  "mushroom-egg-toast.webp": ["Хлеб на закваске, грибы, яйцо, крем-сыр и зелень", "Sourdough bread, mushrooms, egg, cream cheese and greens"],
  "syrniki-berries.webp": ["Творог, яйцо, мука, ваниль, сметана и свежие ягоды", "Cottage cheese, egg, flour, vanilla, sour cream and fresh berries"],
  "pancakes-berries.webp": ["Панкейки, свежие ягоды, сливочный крем и кленовый сироп", "Pancakes, fresh berries, cream and maple syrup"],
  "pancakes-banana-caramel.webp": ["Панкейки, банан, карамельный соус, сливки и орехи", "Pancakes, banana, caramel sauce, cream and nuts"],
  "yogurt-granola-tropical-fruits.webp": ["Натуральный йогурт, гранола, манго, ананас и кокос", "Natural yogurt, granola, mango, pineapple and coconut"],
  "ricotta-berry-toast.webp": ["Хлеб на закваске, рикотта, свежие ягоды, мёд и орехи", "Sourdough bread, ricotta, fresh berries, honey and nuts"],
  "avocado-bowl.webp": ["Авокадо, киноа, яйцо, овощи, зелень и семена", "Avocado, quinoa, egg, vegetables, greens and seeds"],
  "berry-bowl.webp": ["Ягодное смузи, банан, гранола, свежие ягоды и семена чиа", "Berry smoothie, banana, granola, fresh berries and chia seeds"],
  "chocolate-bowl.webp": ["Какао, банан, йогурт, гранола, орехи и шоколад", "Cocoa, banana, yogurt, granola, nuts and chocolate"],
  "mango-bowl.webp": ["Манго, банан, йогурт, гранола, кокос и семена чиа", "Mango, banana, yogurt, granola, coconut and chia seeds"],
  "rice-vegetable-taco-bowl.webp": ["Рис, фасоль, кукуруза, овощи, авокадо и соус сальса", "Rice, beans, corn, vegetables, avocado and salsa"],
  "balinese-chicken-bowl.webp": ["Рис, курица, овощи, авокадо, зелень и балийский соус", "Rice, chicken, vegetables, avocado, greens and Balinese sauce"],
  "tropical-shrimp-bowl.webp": ["Креветки, рис, манго, авокадо, овощи и цитрусовый соус", "Shrimp, rice, mango, avocado, vegetables and citrus dressing"],
  "tuna-poke-bowl.webp": ["Тунец, рис, авокадо, огурец, эдамаме и кунжутный соус", "Tuna, rice, avocado, cucumber, edamame and sesame dressing"],
  "croissant-caprese.webp": ["Круассан, моцарелла, томаты, базилик и соус песто", "Croissant, mozzarella, tomatoes, basil and pesto"],
  "croissant-ham-cheese.webp": ["Круассан, ветчина, сыр, листья салата и горчичный соус", "Croissant, ham, cheese, lettuce and mustard sauce"],
  "croissant-mozzarella-pesto-tomatoes.webp": ["Круассан, моцарелла, томаты, песто и руккола", "Croissant, mozzarella, tomatoes, pesto and arugula"],
  "croissant-mushrooms-spinach-cheese.webp": ["Круассан, грибы, шпинат, сыр и сливочный соус", "Croissant, mushrooms, spinach, cheese and cream sauce"],
  "croissant-salmon-cream-cheese-avocado.webp": ["Круассан, лосось, крем-сыр, авокадо и зелень", "Croissant, salmon, cream cheese, avocado and greens"],
  "croissant-scrambled-eggs-bacon.webp": ["Круассан, яичный скрэмбл, бекон, сыр и зелень", "Croissant, scrambled eggs, bacon, cheese and greens"],
  "croissant-tuna-egg-salad.webp": ["Круассан, тунец, яйцо, листья салата и сливочный соус", "Croissant, tuna, egg, lettuce and creamy dressing"],
  "croissant-turkey-cheese-tomatoes.webp": ["Круассан, индейка, сыр, томаты и листья салата", "Croissant, turkey, cheese, tomatoes and lettuce"],
  "pasta-carbonara.webp.jpg": ["Спагетти, бекон, яйцо, пармезан и чёрный перец", "Spaghetti, bacon, egg, Parmesan and black pepper"],
  "pasta-bolognese.webp.jpg": ["Паста, говяжий фарш, томаты, овощи и пармезан", "Pasta, minced beef, tomatoes, vegetables and Parmesan"],
  "pasta-chicken-mushrooms.webp.jpg": ["Паста, курица, грибы, сливки, чеснок и пармезан", "Pasta, chicken, mushrooms, cream, garlic and Parmesan"],
  "pasta-salmon-cream-sauce.webp.jpg": ["Паста, лосось, сливки, чеснок, зелень и пармезан", "Pasta, salmon, cream, garlic, herbs and Parmesan"],
  "pasta-pesto-chicken.webp.jpg": ["Паста, курица, песто, сливки, томаты и пармезан", "Pasta, chicken, pesto, cream, tomatoes and Parmesan"],
  "pasta-arrabbiata.webp.jpg": ["Паста, томаты, чеснок, перец чили, базилик и пармезан", "Pasta, tomatoes, garlic, chilli, basil and Parmesan"],
  "pasta-pomodoro-basil.webp.jpg": ["Паста, томаты, базилик, чеснок, оливковое масло и пармезан", "Pasta, tomatoes, basil, garlic, olive oil and Parmesan"],
  "pasta-seafood.webp.jpg": ["Паста, креветки, кальмары, мидии, томаты и чеснок", "Pasta, shrimp, squid, mussels, tomatoes and garlic"],
  "truffle-pasta-mushrooms.webp.jpg": ["Паста, грибы, сливки, трюфельное масло и пармезан", "Pasta, mushrooms, cream, truffle oil and Parmesan"],
  "caesar-salad-chicken.webp.jpg": ["Курица, романо, томаты, пармезан, крутоны и соус Цезарь", "Chicken, romaine, tomatoes, Parmesan, croutons and Caesar dressing"],
  "caesar-salad-shrimp.webp.jpg": ["Креветки, романо, томаты, пармезан, крутоны и соус Цезарь", "Shrimp, romaine, tomatoes, Parmesan, croutons and Caesar dressing"],
  "burrata-tomatoes.webp.jpg": ["Буррата, томаты, базилик, оливковое масло и бальзамик", "Burrata, tomatoes, basil, olive oil and balsamic"],
  "caprese-salad.webp.jpg": ["Моцарелла, томаты, базилик, оливковое масло и бальзамик", "Mozzarella, tomatoes, basil, olive oil and balsamic"],
  "green-salad-avocado.webp.jpg": ["Авокадо, микс салатов, огурец, брокколи, семена и цитрусовая заправка", "Avocado, mixed greens, cucumber, broccoli, seeds and citrus dressing"],
  "salad-salmon-avocado.webp.jpg": ["Лосось, авокадо, микс салатов, огурец и лимонная заправка", "Salmon, avocado, mixed greens, cucumber and lemon dressing"],
  "salad-shrimp-mango.webp.jpg": ["Креветки, манго, авокадо, микс салатов и цитрусовая заправка", "Shrimp, mango, avocado, mixed greens and citrus dressing"],
  "tuna-salad.webp.jpg": ["Тунец, микс салатов, яйцо, томаты, оливки и горчичная заправка", "Tuna, mixed greens, egg, tomatoes, olives and mustard dressing"],
  "warm-chicken-salad.webp.jpg": ["Курица, тёплые овощи, микс салатов, томаты и медово-горчичная заправка", "Chicken, warm vegetables, mixed greens, tomatoes and honey mustard dressing"],
  "chicken-soup.webp.jpg": ["Куриный бульон, курица, лапша, морковь, лук и зелень", "Chicken broth, chicken, noodles, carrot, onion and herbs"],
  "cream-mushroom-soup.webp.jpg": ["Грибы, сливки, картофель, лук, чеснок и крутоны", "Mushrooms, cream, potato, onion, garlic and croutons"],
  "cream-pumpkin-soup.webp.jpg": ["Тыква, сливки, морковь, лук, специи и семена", "Pumpkin, cream, carrot, onion, spices and seeds"],
  "minestrone-soup.webp.jpg": ["Томаты, фасоль, паста, сезонные овощи и зелень", "Tomatoes, beans, pasta, seasonal vegetables and herbs"],
  "tomato-soup-basil.webp.jpg": ["Томаты, базилик, сливки, чеснок и крутоны", "Tomatoes, basil, cream, garlic and croutons"],
  "bruschetta-tomatoes.webp.jpg": ["Чиабатта, томаты, базилик, чеснок и оливковое масло", "Ciabatta, tomatoes, basil, garlic and olive oil"],
  "bruschetta-salmon.webp.jpg": ["Чиабатта, лосось, крем-сыр, огурец и зелень", "Ciabatta, salmon, cream cheese, cucumber and greens"],
  "bruschetta-mushrooms.webp.jpg": ["Чиабатта, грибы, крем-сыр, чеснок и зелень", "Ciabatta, mushrooms, cream cheese, garlic and greens"],
  "focaccia-rosemary.webp.jpg": ["Пшеничная мука, оливковое масло, розмарин и морская соль", "Wheat flour, olive oil, rosemary and sea salt"],
};

function getIngredients(image: string, en: boolean) {
  const fileName = image.split("/").at(-1) ?? "";
  const value = ingredients[fileName];
  return value ? value[en ? 1 : 0] : "";
}

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
  const menuSections: FoodMenuSection[] = sections.map((section) => ({
    id: section.id,
    name: en ? section.en : section.ru,
    items: section.items.map((item, index) => ({
      id: `${section.id}-${index}`,
      image: item.image,
      name: en ? item.en : item.ru,
      ingredients: getIngredients(item.image, en),
      price: section.prices[index],
    })),
  }));

  return (
    <main className="min-h-screen bg-[#faf8f6] text-[#342923]">
      <Header locale={locale} text={text.nav} />
      <section className="border-b border-black/10 bg-[#efe3da] px-5 py-16 text-center md:py-24">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b6250]">STK Bakery</span>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{en ? "Food & Breakfast Menu" : "Еда и завтраки"}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black/60 md:text-lg">{en ? "A visual menu of breakfasts, bowls, croissants, pasta, salads, soups and light snacks." : "Визуальное меню завтраков, боулов, круассанов, пасты, салатов, супов и лёгких закусок."}</p>
        <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-black/45">{en ? "Demo prices and ingredients. Final recipes, allergens and prices are confirmed by the bakery." : "Цены и состав указаны для демонстрации. Итоговые рецептуры, аллергены и цены подтверждаются кондитерской."}</p>
      </section>

      <FoodMenuClient sections={menuSections} locale={locale} />
      <Footer locale={locale} text={text.footer} />
    </main>
  );
}
