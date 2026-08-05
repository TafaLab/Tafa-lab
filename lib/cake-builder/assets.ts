export const BUILDER_CANVAS_SIZE = 1254;

/**
 * Единая физическая шкала конструктора.
 *
 * Базовый торт весом 1,5 кг имеет реальный диаметр 160 мм.
 * На холсте его видимый диаметр равен 730 единицам.
 * Разрешение PNG на расчёт размера декора не влияет.
 */
export const REFERENCE_CAKE_WEIGHT_KG = 1.5;
export const REFERENCE_CAKE_DIAMETER_MM = 160;
export const REFERENCE_CAKE_HEIGHT_MM = 100;
export const REFERENCE_CAKE_DIAMETER_CANVAS = 730;

export const CAKE_SIZE_BY_WEIGHT = {
  1: { diameterMm: 140, heightMm: 95 },
  1.5: { diameterMm: 160, heightMm: 100 },
  2: { diameterMm: 180, heightMm: 105 },
} as const;

export function millimetersToCanvas(
  millimeters: number,
  cakeDiameterMm = REFERENCE_CAKE_DIAMETER_MM,
): number {
  if (!Number.isFinite(millimeters) || millimeters < 0) {
    return 0;
  }

  if (!Number.isFinite(cakeDiameterMm) || cakeDiameterMm <= 0) {
    return 0;
  }

  return (
    millimeters *
    (REFERENCE_CAKE_DIAMETER_CANVAS / cakeDiameterMm)
  );
}

export function centimetersToMillimeters(
  centimeters: number,
): number {
  if (!Number.isFinite(centimeters) || centimeters < 0) {
    return 0;
  }

  return centimeters * 10;
}

export function canvasToMillimeters(
  canvasSize: number,
  cakeDiameterMm = REFERENCE_CAKE_DIAMETER_MM,
): number {
  if (!Number.isFinite(canvasSize) || canvasSize < 0) {
    return 0;
  }

  return (
    canvasSize *
    (cakeDiameterMm / REFERENCE_CAKE_DIAMETER_CANVAS)
  );
}

function fixedPhysicalWidth(widthMm: number) {
  const canvasWidth = Math.round(
    millimetersToCanvas(widthMm),
  );

  return {
    realWidthMm: widthMm,
    defaultWidth: canvasWidth,
    minWidth: canvasWidth,
    maxWidth: canvasWidth,
  };
}

function fixedInsertedHeadWidth(
  headWidthMm: number,
  headScale: number,
) {
  const safeHeadScale = Math.max(headScale, 0.01);
  const canvasWidth = Math.round(
    millimetersToCanvas(headWidthMm) / safeHeadScale,
  );

  return {
    realWidthMm: headWidthMm,
    defaultWidth: canvasWidth,
    minWidth: canvasWidth,
    maxWidth: canvasWidth,
  };
}

function physicalStickDimensions({
  lengthMm,
  widthMm,
  overlapMm,
  maxInsertionDepthMm,
}: {
  lengthMm: number;
  widthMm: number;
  overlapMm: number;
  maxInsertionDepthMm: number;
}) {
  return {
    realLengthMm: lengthMm,
    realWidthMm: widthMm,
    realOverlapMm: overlapMm,
    realMaxInsertionDepthMm: maxInsertionDepthMm,
    length: Math.round(millimetersToCanvas(lengthMm)),
    width: Math.round(millimetersToCanvas(widthMm)),
    overlap: Math.round(millimetersToCanvas(overlapMm)),
    maxInsertionDepth: Math.round(
      millimetersToCanvas(maxInsertionDepthMm),
    ),
  };
}

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
  | "toppers"
  | "pearls";

export type DecorationPlacement =
  | "surface"
  | "inserted";

export type DecorationStickConfig = {
  /**
   * Изображение верхней части без палочки.
   */
  headSrc: string;

  /**
   * Размер верхней части относительно ширины
   * всего элемента.
   *
   * 0.68 = 68% от instance.width.
   */
  headScale: number;

  /**
   * Пропорция верхней части:
   * ширина / высота.
   *
   * Для круглой конфеты используется 1.
   */
  headAspectRatio: number;

  /**
   * Полная длина палочки
   * в координатах холста 1254 × 1254.
   */
  length: number;

  /**
   * Толщина палочки
   * в координатах холста.
   */
  width: number;

  /**
   * Основной цвет палочки.
   */
  color: string;

  /**
   * Цвет тонкой границы палочки.
   */
  borderColor: string;

  /**
   * Насколько палочка заходит под верхнюю часть,
   * чтобы между ними не появлялся зазор.
   */
  overlap: number;

  /**
   * Максимальная длина палочки,
   * которая может скрыться внутри торта.
   */
  maxInsertionDepth: number;

  /** Реальные размеры палочки, введённые сотрудником. */
  realLengthMm: number;
  realWidthMm: number;
  realOverlapMm: number;
  realMaxInsertionDepthMm: number;
};

export type DecorationAsset = {
  id: string;
  name: string;
  category: DecorationCategory;

  /**
   * Основное изображение.
   *
   * Для обычного декора используется на холсте.
   * Для декора на палочке используется
   * в карточке библиотеки.
   */
  src: string;

  /**
   * Реальные технические размеры исходного файла.
   */
  originalWidth: number;
  originalHeight: number;

  /**
   * Реальная видимая ширина предмета в миллиметрах.
   * Для декора на палочке — ширина верхней части.
   */
  realWidthMm: number;

  /**
   * Фиксированная ширина элемента
   * на холсте 1254 × 1254.
   */
  defaultWidth: number;
  minWidth: number;
  maxWidth: number;

  /**
   * Начальное положение центра элемента.
   */
  defaultX: number;
  defaultY: number;

  /**
   * Начальный угол поворота.
   */
  defaultRotation: number;

  /**
   * surface:
   * обычный декор на поверхности торта.
   *
   * inserted:
   * элемент, который устанавливается
   * внутрь торта при помощи палочки.
   */
  placement?: DecorationPlacement;

  /**
   * Настройки элемента на палочке.
   *
   * Используется только при:
   * placement: "inserted".
   */
  stick?: DecorationStickConfig;

  /**
   * false — элемент временно не показывается.
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

    ...fixedPhysicalWidth(164),

    defaultX: 627,
    defaultY: 455,
    defaultRotation: 0,

    placement: "surface",
    enabled: true,
  },
  {
    id: "drip-milk",
    name: "Молочный шоколад",
    category: "drips",
    src: "/images/assets/drips/milk.png",
    originalWidth: 908,
    originalHeight: 338,

    ...fixedPhysicalWidth(164),

    defaultX: 627,
    defaultY: 460,
    defaultRotation: 0,

    placement: "surface",
    enabled: true,
  },
  {
    id: "drip-white",
    name: "Белый шоколад",
    category: "drips",
    src: "/images/assets/drips/white.png",
    originalWidth: 908,
    originalHeight: 350,

    ...fixedPhysicalWidth(164),

    defaultX: 627,
    defaultY: 460,
    defaultRotation: 0,

    placement: "surface",
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

    ...fixedPhysicalWidth(45),

    defaultX: 627,
    defaultY: 365,
    defaultRotation: 0,

    placement: "surface",
    enabled: true,
  },
  {
    id: "strawberry-half",
    name: "Половинка клубники",
    category: "berries",
    src: "/images/assets/berries/strawberry/strawberry_half_01.png",
    originalWidth: 1024,
    originalHeight: 1024,

    ...fixedPhysicalWidth(28),

    defaultX: 627,
    defaultY: 365,
    defaultRotation: 0,

    placement: "surface",
    enabled: true,
  },
  {
    id: "strawberry-quarter",
    name: "Четверть клубники",
    category: "berries",
    src: "/images/assets/berries/strawberry/strawberry_quarter_01.png",
    originalWidth: 1024,
    originalHeight: 1024,

    ...fixedPhysicalWidth(32),

    defaultX: 627,
    defaultY: 365,
    defaultRotation: 0,

    placement: "surface",
    enabled: true,
  },
  {
    id: "cherry",
    name: "Вишня",
    category: "berries",
    src: "/images/assets/berries/cherry/cherry_01.png",
    originalWidth: 1536,
    originalHeight: 1024,

    ...fixedPhysicalWidth(38),

    defaultX: 585,
    defaultY: 380,
    defaultRotation: -5,

    placement: "surface",
    enabled: true,
  },
  {
    id: "sweet-cherry",
    name: "Черешня",
    category: "berries",
    src: "/images/assets/berries/sweet_cherry/sweet_cherry_01.png",
    originalWidth: 1536,
    originalHeight: 1024,

    ...fixedPhysicalWidth(40),

    defaultX: 670,
    defaultY: 380,
    defaultRotation: 5,

    placement: "surface",
    enabled: true,
  },
  {
    id: "fig-half",
    name: "Половинка инжира",
    category: "berries",
    src: "/images/assets/berries/fig/fig_half_01.png",
    originalWidth: 1536,
    originalHeight: 1024,

    ...fixedPhysicalWidth(44),

    defaultX: 627,
    defaultY: 385,
    defaultRotation: 0,

    placement: "surface",
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

    ...fixedPhysicalWidth(40),

    defaultX: 580,
    defaultY: 380,
    defaultRotation: -10,

    placement: "surface",
    enabled: true,
  },
  {
    id: "lemon-slice",
    name: "Лимон",
    category: "fruits",
    src: "/images/assets/fruits/lemon/lemon_slice_01.png",
    originalWidth: 1024,
    originalHeight: 1024,

    ...fixedPhysicalWidth(41),

    defaultX: 627,
    defaultY: 380,
    defaultRotation: 0,

    placement: "surface",
    enabled: true,
  },
  {
    id: "orange-slice",
    name: "Апельсин",
    category: "fruits",
    src: "/images/assets/fruits/orange/orange_slice_01.png",
    originalWidth: 1024,
    originalHeight: 1024,

    ...fixedPhysicalWidth(42),

    defaultX: 675,
    defaultY: 380,
    defaultRotation: 10,

    placement: "surface",
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

    ...fixedPhysicalWidth(41),

    defaultX: 555,
    defaultY: 345,
    defaultRotation: -12,

    placement: "surface",
    enabled: true,
  },
  {
    id: "white-rose-half-open",
    name: "Белая полураскрытая роза",
    category: "flowers",
    src: "/images/assets/flowers/roses/white/white_rose_half_open_01.png",
    originalWidth: 1024,
    originalHeight: 1536,

    ...fixedPhysicalWidth(37),

    defaultX: 695,
    defaultY: 345,
    defaultRotation: 12,

    placement: "surface",
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

    ...fixedPhysicalWidth(42),

    defaultX: 627,
    defaultY: 380,
    defaultRotation: 0,

    placement: "surface",
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

    ...fixedInsertedHeadWidth(65, 0.68),

    defaultX: 550,
    defaultY: 235,
    defaultRotation: -8,

    placement: "inserted",

    stick: {
      headSrc:
        "/images/assets/lollipops/colorful/colorful_lollipop_head.png",

      headScale: 0.68,
      headAspectRatio: 1,

      ...physicalStickDimensions({
        lengthMm: 70,
        widthMm: 4,
        overlapMm: 3,
        maxInsertionDepthMm: 39,
      }),

      color: "#f6f6f3",
      borderColor:
        "rgba(110, 97, 89, 0.22)",

    },

    enabled: true,
  },
  {
    id: "swirl-lollipop",
    name: "Леденец-спираль",
    category: "lollipops",

    src: "/images/assets/lollipops/swirl/swirl_lollipop_01.png",

    originalWidth: 1024,
    originalHeight: 1536,

    ...fixedInsertedHeadWidth(65, 0.68),

    defaultX: 705,
    defaultY: 235,
    defaultRotation: 8,

    placement: "inserted",

    stick: {
      headSrc:
        "/images/assets/lollipops/swirl/swirl_lollipop_head.png",

      headScale: 0.68,
      headAspectRatio: 1,

      ...physicalStickDimensions({
        lengthMm: 70,
        widthMm: 4,
        overlapMm: 3,
        maxInsertionDepthMm: 39,
      }),

      color: "#f6f6f3",
      borderColor:
        "rgba(110, 97, 89, 0.22)",

    },

    enabled: true,
  },

  // =========================================================
  // ТОППЕРЫ
  // =========================================================

  /**
   * Будущие топперы, свечи и цифры добавляются
   * в таком формате:
   *
   * {
   *   id: "happy-birthday-topper",
   *   name: "Happy Birthday",
   *   category: "toppers",
   *   src: "/images/assets/toppers/happy-birthday/preview.png",
   *   originalWidth: 1024,
   *   originalHeight: 1536,
   *
   *   ...fixedInsertedHeadWidth(80, 0.9),
   *
   *   defaultX: 627,
   *   defaultY: 220,
   *   defaultRotation: 0,
   *
   *   placement: "inserted",
   *
   *   stick: {
   *     headSrc:
   *       "/images/assets/toppers/happy-birthday/head.png",
   *
   *     headScale: 0.9,
   *     headAspectRatio: 1.8,
   *
   *     length: 300,
   *     width: 14,
   *
   *     color: "#e8d4b3",
   *     borderColor:
   *       "rgba(90, 70, 45, 0.2)",
   *
   *     overlap: 10,
   *     maxInsertionDepth: 170,
   *     realLengthMm: 66,
   *     realWidthMm: 3,
   *     realOverlapMm: 2,
   *     realMaxInsertionDepthMm: 37,
   *   },
   *
   *   enabled: true,
   * },
   */

  // =========================================================
  // ЖЕМЧУГ
  // =========================================================

  {
    id: "white-pearl",
    name: "Белая жемчужина",
    category: "pearls",
    src: "/images/assets/pearls/white/white_pearl_01.png",
    originalWidth: 1254,
    originalHeight: 1254,

    ...fixedPhysicalWidth(5),

    defaultX: 627,
    defaultY: 390,
    defaultRotation: 0,

    placement: "surface",
    enabled: false,
  },
];

/**
 * Только элементы, которые разрешено
 * показывать клиенту.
 */
export const enabledDecorationAssets =
  decorationAssets.filter(
    (asset) => asset.enabled,
  );

/**
 * Рассчитывает визуальную высоту обычного
 * элемента с сохранением пропорций.
 */
export function getDecorationHeight(
  asset: Pick<
    DecorationAsset,
    | "originalWidth"
    | "originalHeight"
    | "defaultWidth"
  >,
): number {
  return Math.round(
    asset.defaultWidth *
      (asset.originalHeight /
        asset.originalWidth),
  );
}

/**
 * Возвращает ассет по идентификатору.
 */
export function getDecorationAsset(
  assetId: string,
): DecorationAsset | undefined {
  return decorationAssets.find(
    (asset) => asset.id === assetId,
  );
}

/**
 * Проверяет, является ли элемент
 * декором на палочке.
 */
export function isInsertedDecoration(
  asset: DecorationAsset,
): boolean {
  return (
    asset.placement === "inserted" &&
    Boolean(asset.stick)
  );
}