export type CakeVariant = {
  id: string;
  cakeId: string;
  weightKg: number;
  price: number;
  oldPrice: number | null;
  isDefault: boolean;
  sortOrder: number;
  createdAt: string;
};

export type Cake = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  categories: string[];
  isPopular: boolean;
  isNew: boolean;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  variants: CakeVariant[];
  defaultVariant: CakeVariant | null;
  minimumPrice: number;
};

export const cakeCategories = [
  {
    value: "all",
    label: "Все",
  },
  {
    value: "kids",
    label: "Детские",
  },
  {
    value: "girls",
    label: "Для девочек",
  },
  {
    value: "boys",
    label: "Для мальчиков",
  },
  {
    value: "babies",
    label: "Для малышей",
  },
  {
    value: "women",
    label: "Для женщин",
  },
  {
    value: "men",
    label: "Для мужчин",
  },
  {
    value: "birthday",
    label: "На день рождения",
  },
  {
    value: "gender-party",
    label: "Gender Party",
  },
  {
    value: "bento",
    label: "Бенто",
  },
  {
    value: "tiered",
    label: "Многоярусные",
  },
  {
    value: "promo-9990",
    label: "За $20",
  },
  {
    value: "promo-10990",
    label: "За $22",
  },
  {
    value: "popular",
    label: "Популярные",
  },
  {
    value: "new",
    label: "Новинки",
  },
] as const;
