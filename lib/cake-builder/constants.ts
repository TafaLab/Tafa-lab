import type { DecorationCategory } from "./assets";

import type {
  CategoryLabels,
  CategoryPrices,
  FillingOption,
  InscriptionSettings,
  WeightOption,
} from "./types";

export const weights: WeightOption[] = [
  {
    value: 1,
    label: "1 кг",
    price: 14000,
  },
  {
    value: 1.5,
    label: "1,5 кг",
    price: 19000,
  },
  {
    value: 2,
    label: "2 кг",
    price: 24000,
  },
  {
    value: 3,
    label: "3 кг",
    price: 34000,
  },
];

export const fillings: FillingOption[] = [
  {
    value: "snickers",
    label: "Сникерс",
    description:
      "Шоколадные коржи, арахис, карамель и крем-чиз",
    price: 0,
  },
  {
    value: "whoopie-pie",
    label: "Вупи пай",
    description:
      "Шоколадные коржи и нежный сливочный крем",
    price: 0,
  },
  {
    value: "honey",
    label: "Медовый",
    description:
      "Медовые коржи и нежный сметанный крем",
    price: 0,
  },
  {
    value: "chocolate-banana",
    label: "Шоколадно-банановый",
    description:
      "Шоколадные коржи, банан и нежный крем",
    price: 0,
  },
  {
    value: "pistachio",
    label: "Фисташковый",
    description:
      "Фисташковые коржи и фисташковый крем",
    price: 500,
  },
  {
    value: "milk-girl",
    label: "Молочная девочка",
    description:
      "Тонкие молочные коржи и сливочный крем",
    price: 500,
  },
  {
    value: "red-velvet",
    label: "Красный бархат",
    description:
      "Красные бархатные коржи и крем-чиз",
    price: 500,
  },
];

export const categoryLabels: CategoryLabels = {
  drips: "Подтёки",
  berries: "Ягоды",
  fruits: "Фрукты",
  flowers: "Цветы",
  macarons: "Макаруны",
  lollipops: "Леденцы",
  toppers: "Топперы",
  pearls: "Жемчуг",
};

export const categoryPrices: CategoryPrices = {
  drips: 2000,
  berries: 2500,
  fruits: 2500,
  flowers: 3500,
  macarons: 3000,
  lollipops: 2500,
  toppers: 0,
  pearls: 1500,
};

export const categoryOrder: DecorationCategory[] = [
  "drips",
  "berries",
  "fruits",
  "flowers",
  "macarons",
  "lollipops",
  "pearls",
];

export const defaultInscription: InscriptionSettings = {
  text: "",
  x: 627,
  y: 570,
  fontSize: 52,
  rotation: 0,
  curve: 0,
  letterSpacing: 1,

  fontFamily: "marck",
  fontWeight: 400,

  color: "#4d2c23",
  opacity: 100,
  uppercase: false,

  outlineColor: "#ffffff",
  outlineWidth: 0,

  shadowEnabled: false,
  shadowColor: "#000000",
  shadowBlur: 4,
  shadowOffsetY: 3,
};