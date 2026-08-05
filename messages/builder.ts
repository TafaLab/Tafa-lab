import type {
  DecorationCategory,
} from "@/lib/cake-builder/assets";

import type {
  Filling,
} from "@/lib/cake-builder/types";

type Locale = "ru" | "en";

type BuilderMessages = {
  header: {
    cakes: string;
    builder: string;
    food: string;
    gallery: string;
    contacts: string;
    home: string;
  };

  hero: {
    eyebrow: string;
    titleFirst: string;
    titleAccent: string;
    description: string;
    stageTitle: string;
    stageDescription: string;
  };

  preview: {
    eyebrow: string;
    title: string;

    undoTitle: string;
    undoLabel: string;

    redoTitle: string;
    redoLabel: string;

    selectedDecoration: string;
    dragDecoration: string;

    duplicate: string;
    rotate: string;
    reset: string;
    mirror: string;
    flip: string;
    layerBack: string;
    layerForward: string;
    delete: string;

    selectDecoration: string;
    selectDecorationDescription: string;

    instructions: string;

    shape: string;
    round: string;
    weight: string;
    filling: string;
    color: string;
    price: string;
  };

  sections: {
    weight: {
      title: string;
      description: string;
    };

    filling: {
      title: string;
      description: string;
      included: string;
    };

    color: {
      title: string;
      description: string;
    };

    decorations: {
      title: string;
      description: string;
      add: string;
      added: string;
      clear: string;
    };

    inscription: {
      title: string;
      description: string;
      notesLabel: string;
      notesPlaceholder: string;
    };
  };

  summary: {
    label: string;
    description: string;
    button: string;
  };

  categories: Record<
    DecorationCategory,
    string
  >;

  fillings: Record<
    Filling,
    {
      label: string;
      description: string;
    }
  >;

  baseNames: Record<
    string,
    string
  >;

  decorationNames: Record<
    string,
    string
  >;
};

const ru: BuilderMessages = {
  header: {
    cakes: "Торты",
    builder: "Конструктор",
    food: "Еда и десерты",
    gallery: "Галерея",
    contacts: "Контакты",
    home: "На главную",
  },

  hero: {
    eyebrow:
      "Конструктор STK Bakery",

    titleFirst:
      "Соберите торт,",

    titleAccent:
      "который придумали вы",

    description:
      "Выберите вес, начинку, цвет основы и оформление. Менеджер проверит заявку и подтвердит итоговую стоимость.",

    stageTitle:
      "Создание дизайна",

    stageDescription:
      "Предварительная версия заказа",
  },

  preview: {
    eyebrow:
      "Предварительный вид",

    title:
      "Ваш торт",

    undoTitle:
      "Отменить — Ctrl+Z",

    undoLabel:
      "Отменить последнее действие",

    redoTitle:
      "Повторить — Ctrl+Shift+Z или Ctrl+Y",

    redoLabel:
      "Повторить последнее действие",

    selectedDecoration:
      "Выбранный декор",

    dragDecoration:
      "Перемещайте элемент мышкой",

    duplicate:
      "Копировать",

    rotate:
      "Повернуть",

    reset:
      "Сбросить",

    mirror:
      "Зеркально",

    flip:
      "Перевернуть",

    layerBack:
      "Слой назад",

    layerForward:
      "Слой вперёд",

    delete:
      "Удалить",

    selectDecoration:
      "Выберите декор",

    selectDecorationDescription:
      "Нажмите на украшение на торте, чтобы открыть инструменты.",

    instructions:
      "Декор можно двигать и вращать. Направляющие помогают выравнивать элементы. Ctrl+Z отменяет действие, Ctrl+D дублирует выбранный декор.",

    shape:
      "Форма",

    round:
      "Круглая",

    weight:
      "Вес",

    filling:
      "Начинка",

    color:
      "Цвет",

    price:
      "Цена",
  },

  sections: {
    weight: {
      title:
        "Выберите вес",

      description:
        "Обычно рассчитывают 150–200 граммов на одного гостя.",
    },

    filling: {
      title:
        "Выберите начинку",

      description:
        "Начинки, которые готовит STK Bakery.",

      included:
        "Включено",
    },

    color: {
      title:
        "Выберите цвет",

      description:
        "Выберите цвет покрытия торта.",
    },

    decorations: {
      title:
        "Добавьте декор",

      description:
        "Декор можно двигать, поворачивать и зеркально отражать.",

      add:
        "Добавить +",

      added:
        "Добавлено",

      clear:
        "Очистить декор",
    },

    inscription: {
      title:
        "Добавьте надпись",

      description:
        "Надпись можно двигать, увеличивать, уменьшать и изгибать.",

      notesLabel:
        "Дополнительные пожелания",

      notesPlaceholder:
        "Опишите тематику праздника, оттенки и другие детали.",
    },
  },

  summary: {
    label:
      "Предварительная стоимость",

    description:
      "Менеджер проверит заявку, выбранный декор и подтвердит окончательную стоимость.",

    button:
      "Перейти к оформлению",
  },

  categories: {
    drips: "Подтёки",
    berries: "Ягоды",
    fruits: "Фрукты",
    flowers: "Цветы",
    macarons: "Макаруны",
    lollipops: "Леденцы",
    toppers: "Топперы",
    pearls: "Жемчуг",
  },

  fillings: {
    snickers: {
      label:
        "Сникерс",

      description:
        "Шоколадные коржи, арахис, карамель и крем-чиз.",
    },

    "whoopie-pie": {
      label:
        "Вупи пай",

      description:
        "Шоколадные коржи с нежной сливочной начинкой.",
    },

    honey: {
      label:
        "Медовик",

      description:
        "Медовые коржи с нежным сметанным кремом.",
    },

    "chocolate-banana": {
      label:
        "Шоколад-банан",

      description:
        "Шоколадные коржи, банан и нежный сливочный крем.",
    },

    pistachio: {
      label:
        "Фисташковая",

      description:
        "Фисташковые коржи с фисташковым кремом.",
    },

    "milk-girl": {
      label:
        "Молочная девочка",

      description:
        "Тонкие молочные коржи с лёгким сливочным кремом.",
    },

    "red-velvet": {
      label:
        "Красный бархат",

      description:
        "Бархатные коржи с кремом на основе сливочного сыра.",
    },
  },

  baseNames: {
    white: "Белый",
    cream: "Кремовый",
    ivory: "Айвори",
    pink: "Розовый",
    blue: "Голубой",
    mint: "Мятный",
    lilac: "Сиреневый",
    lavender: "Лавандовый",
    peach: "Персиковый",
    yellow: "Жёлтый",
    chocolate: "Шоколадный",
    "red-velvet": "Красный бархат",
    black: "Чёрный",
    gray: "Серый",
  },

  decorationNames: {},
};

const en: BuilderMessages = {
  header: {
    cakes: "Cakes",
    builder: "Cake Builder",
    food: "Food & Desserts",
    gallery: "Gallery",
    contacts: "Contact",
    home: "Home",
  },

  hero: {
    eyebrow:
      "STK Bakery Cake Builder",

    titleFirst:
      "Design a cake,",

    titleAccent:
      "created by you",

    description:
      "Choose the weight, filling, base color and decorations. A manager will review your request and confirm the final price.",

    stageTitle:
      "Create Your Design",

    stageDescription:
      "Preliminary order preview",
  },

  preview: {
    eyebrow:
      "Design Preview",

    title:
      "Your Cake",

    undoTitle:
      "Undo — Ctrl+Z",

    undoLabel:
      "Undo last action",

    redoTitle:
      "Redo — Ctrl+Shift+Z or Ctrl+Y",

    redoLabel:
      "Redo last action",

    selectedDecoration:
      "Selected Decoration",

    dragDecoration:
      "Drag the element to reposition it",

    duplicate:
      "Duplicate",

    rotate:
      "Rotate",

    reset:
      "Reset",

    mirror:
      "Mirror",

    flip:
      "Flip",

    layerBack:
      "Layer Back",

    layerForward:
      "Layer Forward",

    delete:
      "Delete",

    selectDecoration:
      "Select a Decoration",

    selectDecorationDescription:
      "Click a decoration on the cake to open its tools.",

    instructions:
      "Decorations can be moved and rotated. Alignment guides help position elements. Ctrl+Z undoes the last action, and Ctrl+D duplicates the selected decoration.",

    shape:
      "Shape",

    round:
      "Round",

    weight:
      "Weight",

    filling:
      "Filling",

    color:
      "Color",

    price:
      "Price",
  },

  sections: {
    weight: {
      title:
        "Choose Weight",

      description:
        "Usually 150–200 g per guest.",
    },

    filling: {
      title:
        "Choose Filling",

      description:
        "Available cake fillings.",

      included:
        "Included",
    },

    color: {
      title:
        "Choose Color",

      description:
        "Choose the cake coating color.",
    },

    decorations: {
      title:
        "Add Decorations",

      description:
        "Decorations can be moved, rotated and mirrored.",

      add:
        "Add +",

      added:
        "Added",

      clear:
        "Clear Decorations",
    },

    inscription: {
      title:
        "Add a Message",

      description:
        "The message can be moved, resized and curved.",

      notesLabel:
        "Additional Notes",

      notesPlaceholder:
        "Describe the event theme, colors and any other details.",
    },
  },

  summary: {
    label:
      "Estimated Price",

    description:
      "A manager will review your request and selected decorations, then confirm the final price.",

    button:
      "Continue to Checkout",
  },

  categories: {
    drips: "Drips",
    berries: "Berries",
    fruits: "Fruits",
    flowers: "Flowers",
    macarons: "Macarons",
    lollipops: "Lollipops",
    toppers: "Toppers",
    pearls: "Pearls",
  },

  fillings: {
    snickers: {
      label:
        "Snickers",

      description:
        "Chocolate cake layers, peanuts, caramel and cream cheese frosting.",
    },

    "whoopie-pie": {
      label:
        "Whoopie Pie",

      description:
        "Chocolate cake layers with a light and creamy filling.",
    },

    honey: {
      label:
        "Honey Cake",

      description:
        "Honey cake layers with a delicate sour cream filling.",
    },

    "chocolate-banana": {
      label:
        "Chocolate Banana",

      description:
        "Chocolate cake layers, banana and a smooth cream filling.",
    },

    pistachio: {
      label:
        "Pistachio",

      description:
        "Pistachio cake layers with pistachio cream.",
    },

    "milk-girl": {
      label:
        "Milk Girl",

      description:
        "Thin milk cake layers with a light cream filling.",
    },

    "red-velvet": {
      label:
        "Red Velvet",

      description:
        "Red velvet cake layers with cream cheese frosting.",
    },
  },

  baseNames: {
    white: "White",
    cream: "Cream",
    ivory: "Ivory",
    pink: "Pink",
    blue: "Blue",
    mint: "Mint",
    lilac: "Lilac",
    lavender: "Lavender",
    peach: "Peach",
    yellow: "Yellow",
    chocolate: "Chocolate",
    "red-velvet": "Red Velvet",
    black: "Black",
    gray: "Gray",
  },

  decorationNames: {
    "drip-dark":
      "Dark Chocolate",

    "drip-milk":
      "Milk Chocolate",

    "drip-white":
      "White Chocolate",

    "strawberry-whole":
      "Strawberry",

    "strawberry-half":
      "Strawberry Half",

    "strawberry-quarter":
      "Strawberry Quarter",

    cherry:
      "Cherry",

    "sweet-cherry":
      "Sweet Cherry",

    "fig-half":
      "Fig Half",

    "kiwi-slice":
      "Kiwi",

    "lemon-slice":
      "Lemon",

    "orange-slice":
      "Orange",

    "pink-spray-rose":
      "Pink Spray Rose",

    "white-rose-half-open":
      "White Rose",

    "pink-macaron":
      "Pink Macaron",

    "colorful-lollipop":
      "Colorful Lollipop",

    "swirl-lollipop":
      "Swirl Lollipop",

    "white-pearl":
      "White Pearl",
  },
};

export const builderMessages: Record<
  Locale,
  BuilderMessages
> = {
  ru,
  en,
};

export type {
  BuilderMessages,
  Locale as BuilderLocale,
};