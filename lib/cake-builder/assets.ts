export const BUILDER_CANVAS_SIZE = 1254;

export type CakeBaseAsset = {
  id: string;
  name: string;
  src: string;
  originalWidth: number;
  originalHeight: number;
};

export type DecorationCategory =
  | "drips"
  | "berries"
  | "fruits"
  | "flowers"
  | "macarons"
  | "lollipops"
  | "pearls";

export type DecorationAsset = {
  id: string;
  name: string;
  category: DecorationCategory;
  src: string;

  /**
   * Реальные технические размеры исходного файла.
   * Используются для сохранения пропорций изображения.
   */
  originalWidth: number;
  originalHeight: number;

  /**
   * Фиксированная ширина элемента на холсте 1254 × 1254.
   * Клиент не может изменить этот размер.
   */
  defaultWidth: number;
  minWidth: number;
  maxWidth: number;

  /**
   * Начальное положение центра элемента
   * на холсте 1254 × 1254.
   */
  defaultX: number;
  defaultY: number;

  /**
   * Начальный угол поворота.
   */
  defaultRotation: number;

  /**
   * false — элемент временно не показывается
   * в конструкторе.
   */
  enabled: boolean;
};

export const cakeBases: CakeBaseAsset[] = [
  {
    id: "white",
    name: "Белый",
    src: "/images/assets/cake_bases/cake-base-white.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
  {
    id: "cream",
    name: "Кремовый",
    src: "/images/assets/cake_bases/cake-base-cream.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
  {
    id: "ivory",
    name: "Айвори",
    src: "/images/assets/cake_bases/cake-base-ivory.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
  {
    id: "pink",
    name: "Розовый",
    src: "/images/assets/cake_bases/cake-base-pink.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
  {
    id: "blue",
    name: "Голубой",
    src: "/images/assets/cake_bases/cake-base-blue.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
  {
    id: "mint",
    name: "Мятный",
    src: "/images/assets/cake_bases/cake-base-mint.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
  {
    id: "lilac",
    name: "Сиреневый",
    src: "/images/assets/cake_bases/cake-base-lilac.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
  {
    id: "lavender",
    name: "Лавандовый",
    src: "/images/assets/cake_bases/cake-base-lavender.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
  {
    id: "peach",
    name: "Персиковый",
    src: "/images/assets/cake_bases/cake-base-peach.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
  {
    id: "yellow",
    name: "Жёлтый",
    src: "/images/assets/cake_bases/cake-base-yellow.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
  {
    id: "chocolate",
    name: "Шоколадный",
    src: "/images/assets/cake_bases/cake-base-chocolate.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
  {
    id: "red-velvet",
    name: "Красный бархат",
    src: "/images/assets/cake_bases/cake-base-red-velvet.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
  {
    id: "black",
    name: "Чёрный",
    src: "/images/assets/cake_bases/cake-base-black.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
  {
    id: "gray",
    name: "Серый",
    src: "/images/assets/cake_bases/cake-base-gray.png",
    originalWidth: 1254,
    originalHeight: 1254,
  },
];

export const decorationAssets: DecorationAsset[] = [
  // =========================================================
  // ПОДТЁКИ
  // =========================================================

  {
    id: "drip-dark",
    name: "Тёмный шоколад",
    category: "drips",
    src: "/images/assets/drips/dark.png",
    originalWidth: 910,
    originalHeight: 284,

    defaultWidth: 750,
    minWidth: 750,
    maxWidth: 750,

    defaultX: 627,
    defaultY: 455,
    defaultRotation: 0,
    enabled: true,
  },
  {
    id: "drip-milk",
    name: "Молочный шоколад",
    category: "drips",
    src: "/images/assets/drips/milk.png",
    originalWidth: 908,
    originalHeight: 338,

    defaultWidth: 750,
    minWidth: 750,
    maxWidth: 750,

    defaultX: 627,
    defaultY: 460,
    defaultRotation: 0,
    enabled: true,
  },
  {
    id: "drip-white",
    name: "Белый шоколад",
    category: "drips",
    src: "/images/assets/drips/white.png",
    originalWidth: 908,
    originalHeight: 350,

    defaultWidth: 750,
    minWidth: 750,
    maxWidth: 750,

    defaultX: 627,
    defaultY: 460,
    defaultRotation: 0,
    enabled: true,
  },

  // =========================================================
  // ЯГОДЫ
  // =========================================================

  {
    id: "strawberry-whole",
    name: "Клубника",
    category: "berries",
    src: "/images/assets/berries/strawberry/strawberry_whole_01.png",
    originalWidth: 1024,
    originalHeight: 1024,

    defaultWidth: 165,
    minWidth: 165,
    maxWidth: 165,

    defaultX: 627,
    defaultY: 365,
    defaultRotation: 0,
    enabled: true,
  },
  {
    id: "cherry",
    name: "Вишня",
    category: "berries",
    src: "/images/assets/berries/cherry/cherry_01.png",
    originalWidth: 1536,
    originalHeight: 1024,

    defaultWidth: 135,
    minWidth: 135,
    maxWidth: 135,

    defaultX: 585,
    defaultY: 380,
    defaultRotation: -5,
    enabled: true,
  },
  {
    id: "sweet-cherry",
    name: "Черешня",
    category: "berries",
    src: "/images/assets/berries/sweet_cherry/sweet_cherry_01.png",
    originalWidth: 1536,
    originalHeight: 1024,

    defaultWidth: 140,
    minWidth: 140,
    maxWidth: 140,

    defaultX: 670,
    defaultY: 380,
    defaultRotation: 5,
    enabled: true,
  },
  {
    id: "fig-half",
    name: "Половинка инжира",
    category: "berries",
    src: "/images/assets/berries/fig/fig_half_01.png",
    originalWidth: 1536,
    originalHeight: 1024,

    defaultWidth: 200,
    minWidth: 200,
    maxWidth: 200,

    defaultX: 627,
    defaultY: 385,
    defaultRotation: 0,
    enabled: true,
  },

  // =========================================================
  // ФРУКТЫ
  // =========================================================

  {
    id: "kiwi-slice",
    name: "Киви",
    category: "fruits",
    src: "/images/assets/fruits/kiwi/kiwi_slice_01.png",
    originalWidth: 1024,
    originalHeight: 1024,

    defaultWidth: 180,
    minWidth: 180,
    maxWidth: 180,

    defaultX: 580,
    defaultY: 380,
    defaultRotation: -10,
    enabled: true,
  },
  {
    id: "lemon-slice",
    name: "Лимон",
    category: "fruits",
    src: "/images/assets/fruits/lemon/lemon_slice_01.png",
    originalWidth: 1024,
    originalHeight: 1024,

    defaultWidth: 185,
    minWidth: 185,
    maxWidth: 185,

    defaultX: 627,
    defaultY: 380,
    defaultRotation: 0,
    enabled: true,
  },
  {
    id: "orange-slice",
    name: "Апельсин",
    category: "fruits",
    src: "/images/assets/fruits/orange/orange_slice_01.png",
    originalWidth: 1024,
    originalHeight: 1024,

    defaultWidth: 190,
    minWidth: 190,
    maxWidth: 190,

    defaultX: 675,
    defaultY: 380,
    defaultRotation: 10,
    enabled: true,
  },

  // =========================================================
  // ЦВЕТЫ
  // =========================================================

  {
    id: "pink-spray-rose",
    name: "Розовая кустовая роза",
    category: "flowers",
    src: "/images/assets/flowers/roses/pink/pink_spray_rose_01.png",
    originalWidth: 1024,
    originalHeight: 1536,

    defaultWidth: 185,
    minWidth: 185,
    maxWidth: 185,

    defaultX: 555,
    defaultY: 345,
    defaultRotation: -12,
    enabled: true,
  },
  {
    id: "white-rose-half-open",
    name: "Белая полураскрытая роза",
    category: "flowers",
    src: "/images/assets/flowers/roses/white/white_rose_half_open_01.png",
    originalWidth: 1024,
    originalHeight: 1536,

    defaultWidth: 170,
    minWidth: 170,
    maxWidth: 170,

    defaultX: 695,
    defaultY: 345,
    defaultRotation: 12,
    enabled: true,
  },

  // =========================================================
  // МАКАРУНЫ
  // =========================================================

  {
    id: "pink-macaron",
    name: "Розовый макарун",
    category: "macarons",
    src: "/images/assets/macarons/pink/pink_macaron_01.png",
    originalWidth: 690,
    originalHeight: 639,

    defaultWidth: 165,
    minWidth: 165,
    maxWidth: 165,

    defaultX: 627,
    defaultY: 380,
    defaultRotation: 0,
    enabled: true,
  },

  // =========================================================
  // ЛЕДЕНЦЫ
  // =========================================================

  {
    id: "colorful-lollipop",
    name: "Разноцветный леденец",
    category: "lollipops",
    src: "/images/assets/lollipops/colorful/colorful_lollipop_01.png",
    originalWidth: 1024,
    originalHeight: 1536,

    defaultWidth: 180,
    minWidth: 180,
    maxWidth: 180,

    defaultX: 550,
    defaultY: 235,
    defaultRotation: -8,
    enabled: true,
  },
  {
    id: "swirl-lollipop",
    name: "Леденец-спираль",
    category: "lollipops",
    src: "/images/assets/lollipops/swirl/swirl_lollipop_01.png",
    originalWidth: 1024,
    originalHeight: 1536,

    defaultWidth: 180,
    minWidth: 180,
    maxWidth: 180,

    defaultX: 705,
    defaultY: 235,
    defaultRotation: 8,
    enabled: true,
  },

  // =========================================================
  // ЖЕМЧУГ
  // =========================================================

  /**
   * Пока отключён, потому что текущий файл
   * white_pearl_01.png не имеет прозрачного фона.
   *
   * После подготовки прозрачного PNG достаточно
   * заменить enabled на true.
   */
  {
    id: "white-pearl",
    name: "Белая жемчужина",
    category: "pearls",
    src: "/images/assets/pearls/white/white_pearl_01.png",
    originalWidth: 1254,
    originalHeight: 1254,

    defaultWidth: 22,
    minWidth: 22,
    maxWidth: 22,

    defaultX: 627,
    defaultY: 390,
    defaultRotation: 0,
    enabled: false,
  },
];

/**
 * Только элементы, которые разрешено показывать
 * клиенту в конструкторе.
 */
export const enabledDecorationAssets =
  decorationAssets.filter((asset) => asset.enabled);

/**
 * Рассчитывает визуальную высоту элемента
 * с сохранением пропорций исходного изображения.
 */
export function getDecorationHeight(
  asset: Pick<
    DecorationAsset,
    "originalWidth" | "originalHeight" | "defaultWidth"
  >,
): number {
  return Math.round(
    asset.defaultWidth *
      (asset.originalHeight / asset.originalWidth),
  );
}

/**
 * Возвращает ассет по его идентификатору.
 */
export function getDecorationAsset(
  assetId: string,
): DecorationAsset | undefined {
  return decorationAssets.find(
    (asset) => asset.id === assetId,
  );
}