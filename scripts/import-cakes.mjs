import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import {
  createClient,
} from "@supabase/supabase-js";

const projectRoot = process.cwd();

const imagesDirectory = path.join(
  projectRoot,
  "public",
  "cakes",
);

const envPath = path.join(
  projectRoot,
  ".env.local",
);

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Файл не найден: ${filePath}`,
    );
  }

  const content = fs.readFileSync(
    filePath,
    "utf8",
  );

  const result = {};

  for (const rawLine of content.split(
    /\r?\n/,
  )) {
    const line = rawLine.trim();

    if (
      !line ||
      line.startsWith("#")
    ) {
      continue;
    }

    const separatorIndex =
      line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line
      .slice(0, separatorIndex)
      .trim();

    let value = line
      .slice(separatorIndex + 1)
      .trim();

    if (
      (value.startsWith('"') &&
        value.endsWith('"')) ||
      (value.startsWith("'") &&
        value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

const env = readEnvFile(envPath);

const supabaseUrl =
  env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  env.SUPABASE_SERVICE_ROLE_KEY ??
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "В .env.local отсутствует NEXT_PUBLIC_SUPABASE_URL.",
  );
}

if (!supabaseKey) {
  throw new Error(
    "В .env.local отсутствует SUPABASE_SERVICE_ROLE_KEY или NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  );
}

if (
  !fs.existsSync(imagesDirectory)
) {
  throw new Error(
    `Папка не найдена: ${imagesDirectory}`,
  );
}

const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);

const allowedExtensions =
  new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ]);

const files = fs
  .readdirSync(imagesDirectory)
  .filter((fileName) => {
    const extension = path
      .extname(fileName)
      .toLowerCase();

    return allowedExtensions.has(
      extension,
    );
  })
  .sort((first, second) =>
    first.localeCompare(
      second,
      "en",
      {
        numeric: true,
      },
    ),
  );

if (files.length === 0) {
  throw new Error(
    "В папке public/cakes нет изображений.",
  );
}

const themeConfig = {
  animals: {
    title: "Торт с животными",
    categories: [
      "kids",
      "babies",
    ],
  },

  barbie: {
    title: "Торт в стиле Барби",
    categories: [
      "kids",
      "girls",
      "birthday",
    ],
  },

  "barbie-cake": {
    title: "Торт в стиле Барби",
    categories: [
      "kids",
      "girls",
      "birthday",
    ],
  },

  berry: {
    title: "Ягодный торт",
    categories: [
      "women",
      "birthday",
    ],
  },

  bento: {
    title: "Бенто-торт",
    categories: [
      "bento",
      "birthday",
    ],
  },

  "blue-tractor": {
    title: "Торт «Синий трактор»",
    categories: [
      "kids",
      "boys",
      "birthday",
    ],
  },

  cars: {
    title: "Торт с машинками",
    categories: [
      "kids",
      "boys",
      "birthday",
    ],
  },

  chelsea: {
    title: "Футбольный торт Chelsea",
    categories: [
      "boys",
      "men",
      "birthday",
    ],
  },

  elegant: {
    title: "Элегантный торт",
    categories: [
      "women",
      "birthday",
    ],
  },

  football: {
    title: "Футбольный торт",
    categories: [
      "boys",
      "men",
      "birthday",
    ],
  },

  frozen: {
    title: "Торт «Холодное сердце»",
    categories: [
      "kids",
      "girls",
      "birthday",
    ],
  },

  "gender-party": {
    title: "Торт для Gender Party",
    categories: [
      "gender-party",
      "babies",
    ],
  },

  girly: {
    title: "Нежный торт для девочки",
    categories: [
      "kids",
      "girls",
      "birthday",
    ],
  },

  "harry-potter": {
    title: "Торт «Гарри Поттер»",
    categories: [
      "kids",
      "birthday",
    ],
  },

  "justice-league": {
    title: "Торт «Лига справедливости»",
    categories: [
      "kids",
      "boys",
      "birthday",
    ],
  },

  kids: {
    title: "Детский торт",
    categories: [
      "kids",
      "birthday",
    ],
  },

  "kpop-demon-hunters": {
    title: "Торт K-Pop",
    categories: [
      "kids",
      "girls",
      "birthday",
    ],
  },

  mens: {
    title: "Торт для мужчины",
    categories: [
      "men",
      "birthday",
    ],
  },

  minecraft: {
    title: "Торт Minecraft",
    categories: [
      "kids",
      "boys",
      "birthday",
    ],
  },

  minions: {
    title: "Торт «Миньоны»",
    categories: [
      "kids",
      "birthday",
    ],
  },

  naruto: {
    title: "Торт Naruto",
    categories: [
      "kids",
      "boys",
      "birthday",
    ],
  },

  "paw-patrol": {
    title: "Торт «Щенячий патруль»",
    categories: [
      "kids",
      "babies",
      "birthday",
    ],
  },

  "peppa-pig": {
    title: "Торт «Свинка Пеппа»",
    categories: [
      "kids",
      "babies",
      "girls",
      "birthday",
    ],
  },

  roblox: {
    title: "Торт Roblox",
    categories: [
      "kids",
      "birthday",
    ],
  },

  sonic: {
    title: "Торт Sonic",
    categories: [
      "kids",
      "boys",
      "birthday",
    ],
  },

  space: {
    title: "Космический торт",
    categories: [
      "kids",
      "boys",
      "birthday",
    ],
  },

  spiderman: {
    title: "Торт Spider-Man",
    categories: [
      "kids",
      "boys",
      "birthday",
    ],
  },

  stitch: {
    title: "Торт Stitch",
    categories: [
      "kids",
      "girls",
      "birthday",
    ],
  },

  superheroes: {
    title: "Торт с супергероями",
    categories: [
      "kids",
      "boys",
      "birthday",
    ],
  },

  tractors: {
    title: "Торт с трактором",
    categories: [
      "kids",
      "boys",
      "birthday",
    ],
  },

  transformers: {
    title: "Торт Transformers",
    categories: [
      "kids",
      "boys",
      "birthday",
    ],
  },

  travel: {
    title: "Торт «Путешествие»",
    categories: [
      "women",
      "men",
      "birthday",
    ],
  },

  tiered: {
    title: "Многоярусный торт",
    categories: [
      "tiered",
      "birthday",
    ],
  },

  wednesday: {
    title: "Торт Wednesday",
    categories: [
      "kids",
      "girls",
      "birthday",
    ],
  },
};

function getBaseName(fileName) {
  return path
    .basename(
      fileName,
      path.extname(fileName),
    )
    .toLowerCase();
}

function getThemeKey(baseName) {
  const withoutNumber =
    baseName.replace(
      /-\d+$/,
      "",
    );

  if (
    themeConfig[withoutNumber]
  ) {
    return withoutNumber;
  }

  const matchingKey =
    Object.keys(themeConfig)
      .sort(
        (first, second) =>
          second.length -
          first.length,
      )
      .find(
        (key) =>
          withoutNumber === key ||
          withoutNumber.startsWith(
            `${key}-`,
          ),
      );

  return matchingKey ?? null;
}

function getImageNumber(baseName) {
  const match =
    baseName.match(/-(\d+)$/);

  if (!match) {
    return null;
  }

  return Number(match[1]);
}

function createTitle(
  fileName,
  themeKey,
) {
  const config =
    themeKey
      ? themeConfig[themeKey]
      : null;

  const baseName =
    getBaseName(fileName);

  const imageNumber =
    getImageNumber(baseName);

  const title =
    config?.title ??
    baseName
      .replace(/-/g, " ")
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase(),
      );

  return imageNumber
    ? `${title} №${imageNumber}`
    : title;
}

function createSlug(fileName) {
  return getBaseName(fileName)
    .replace(
      /[^a-z0-9-]/g,
      "-",
    )
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getCategories(
  themeKey,
  index,
) {
  const categories =
    themeKey
      ? [
          ...themeConfig[
            themeKey
          ].categories,
        ]
      : ["birthday"];

  if (index < 12) {
    categories.push("popular");
  }

  if (index >= files.length - 12) {
    categories.push("new");
  }

  return [
    ...new Set(categories),
  ];
}

function getPrices(themeKey) {
  if (themeKey === "bento") {
    return [
      {
        weight_kg: 0.5,
        price: 9990,
        old_price: null,
        is_default: true,
        sort_order: 0,
      },
    ];
  }

  if (themeKey === "tiered") {
    return [
      {
        weight_kg: 3,
        price: 45000,
        old_price: null,
        is_default: true,
        sort_order: 0,
      },
      {
        weight_kg: 4,
        price: 58000,
        old_price: null,
        is_default: false,
        sort_order: 1,
      },
      {
        weight_kg: 5,
        price: 70000,
        old_price: null,
        is_default: false,
        sort_order: 2,
      },
    ];
  }

  return [
    {
      weight_kg: 1,
      price: 15000,
      old_price: null,
      is_default: false,
      sort_order: 0,
    },
    {
      weight_kg: 1.5,
      price: 19000,
      old_price: null,
      is_default: true,
      sort_order: 1,
    },
    {
      weight_kg: 2,
      price: 24000,
      old_price: null,
      is_default: false,
      sort_order: 2,
    },
  ];
}

async function deleteOldCatalog() {
  console.log(
    "Удаляем старые варианты...",
  );

  const {
    error: variantsError,
  } = await supabase
    .from("cake_variants")
    .delete()
    .not("id", "is", null);

  if (variantsError) {
    throw new Error(
      `Не удалось удалить старые варианты: ${variantsError.message}`,
    );
  }

  console.log(
    "Удаляем старые торты...",
  );

  const {
    error: cakesError,
  } = await supabase
    .from("cakes")
    .delete()
    .not("id", "is", null);

  if (cakesError) {
    throw new Error(
      `Не удалось удалить старые торты: ${cakesError.message}`,
    );
  }
}

async function importCake(
  fileName,
  index,
) {
  const baseName =
    getBaseName(fileName);

  const themeKey =
    getThemeKey(baseName);

  const title =
    createTitle(
      fileName,
      themeKey,
    );

  const slug =
    createSlug(fileName);

  const categories =
    getCategories(
      themeKey,
      index,
    );

  const imageUrl =
    `/cakes/${fileName}`;

  const {
    data: createdCake,
    error: cakeError,
  } = await supabase
    .from("cakes")
    .insert({
      name: title,
      slug,
      description:
        "Дизайн можно изменить в интерактивном конструкторе STK Bakery.",
      image_url: imageUrl,
      categories,
      is_popular:
        categories.includes(
          "popular",
        ),
      is_new:
        categories.includes("new"),
      is_published: true,
      sort_order: index,
      updated_at:
        new Date().toISOString(),
    })
    .select("id")
    .single();

  if (cakeError) {
    throw new Error(
      `${fileName}: ${cakeError.message}`,
    );
  }

  const variants = getPrices(
    themeKey,
  ).map((variant) => ({
    ...variant,
    cake_id: createdCake.id,
  }));

  const {
    error: variantsError,
  } = await supabase
    .from("cake_variants")
    .insert(variants);

  if (variantsError) {
    await supabase
      .from("cakes")
      .delete()
      .eq(
        "id",
        createdCake.id,
      );

    throw new Error(
      `${fileName}: ${variantsError.message}`,
    );
  }

  console.log(
    `✓ ${index + 1}/${files.length}: ${title}`,
  );
}

async function main() {
  console.log(
    `Найдено изображений: ${files.length}`,
  );

  console.log(
    `Папка: ${imagesDirectory}`,
  );

  console.log("");
  console.log(
    "ВНИМАНИЕ: старый каталог будет полностью удалён.",
  );
  console.log("");

  await deleteOldCatalog();

  for (
    let index = 0;
    index < files.length;
    index += 1
  ) {
    await importCake(
      files[index],
      index,
    );
  }

  console.log("");
  console.log(
    `Готово. Импортировано тортов: ${files.length}`,
  );
  console.log(
    "Обнови страницу /ru/cakes.",
  );
}

main().catch((error) => {
  console.error("");
  console.error(
    "Ошибка импорта:",
  );

  console.error(
    error instanceof Error
      ? error.message
      : error,
  );

  process.exitCode = 1;
});