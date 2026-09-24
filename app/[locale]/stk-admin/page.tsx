"use client";
// CRM data and UI are kept independent from deployment-time font fetching.

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import { nycBeautyLeadSeed } from "./nyc-beauty-seed";
import { nycRestaurantLeadSeed } from "./nyc-restaurant-seed";
import { nycBakeryCoffeeLeadSeed } from "./nyc-bakery-coffee-seed";

type LeadStatus =
  | "new"
  | "draft"
  | "contacted"
  | "in_progress"
  | "won"
  | "lost"
  | "dead"
  | "not_profitable";
type LeadFilter = "all" | LeadStatus;
type SortMode = "newest" | "oldest" | "name";

type NoteEntry = { text: string; created_at: string };
type InteractionChannel =
  "whatsapp" | "email" | "instagram" | "facebook" | "note" | "status";
type InteractionEntry = {
  id: string;
  channel: InteractionChannel;
  text: string;
  created_at: string;
};
type AttachmentEntry = {
  id: string;
  name: string;
  type: string;
  size: number;
  created_at: string;
};
type StoredAttachment = AttachmentEntry & { data_url: string };
type MessageTemplate = { id: string; name: string; text: string };
type LeadTemperature = "cold" | "warm" | "hot";
type LeadProfitability = "high" | "medium" | "low";
type CrmSettings = { templates: MessageTemplate[] };
type PlannerRepeat = "none" | "daily" | "weekly" | "monthly" | "yearly";
type PlannerTask = {
  id: string;
  date: string;
  text: string;
  completed: boolean;
  repeat?: PlannerRepeat;
  completed_dates?: string[];
  emoji?: string;
  time?: string | null;
  reminder_time?: string | null;
  created_at: string;
  completed_at?: string | null;
};
type CrmMeta = {
  reminder_at: string;
  reminder_time?: string;
  history: NoteEntry[];
  interactions?: InteractionEntry[];
  status?: LeadStatus;
  contact?: string;
  country?: string | null;
  city?: string | null;
  company?: string | null;
  category?: string;
  primary_message?: string;
  followup_message?: string;
  tags?: string[];
  source?: string;
  temperature?: LeadTemperature;
  profitability?: LeadProfitability | null;
  attachments?: AttachmentEntry[];
};
type CustomCities = Record<string, string[]>;
type CrmActivityType =
  | "lead_created"
  | "lead_imported"
  | "lead_updated"
  | "status_changed"
  | "lead_deleted"
  | "interaction"
  | "attachment_added"
  | "attachment_removed"
  | "city_added"
  | "template_updated"
  | "planner_updated";
type CrmActivity = {
  id: string;
  type: CrmActivityType;
  created_at: string;
  lead_id?: string;
  lead_name?: string;
  details?: string;
  from_status?: LeadStatus;
  to_status?: LeadStatus;
};
type ReportPeriod = "day" | "week" | "month" | "half_year" | "year";
type CrmSyncState = {
  meta: Record<string, CrmMeta>;
  manual: Lead[];
  deleted: string[];
  settings?: CrmSettings;
  planner?: PlannerTask[];
  customCities?: CustomCities;
  activity?: CrmActivity[];
  synced_at?: string;
};
type Lead = {
  id: string;
  created_at: string;
  name: string;
  contact: string;
  company: string | null;
  country?: string | null;
  city?: string | null;
  category?: string;
  seedProfitability?: LeadProfitability;
  project_type: string | null;
  message: string | null;
  locale: "ru" | "en";
  source_path: string | null;
  status: LeadStatus;
  admin_notes: string | null;
};

type LocationDirectoryEntry = { country: string; en: string; cities: string[] };
const CRM_LOCATION_DIRECTORY: LocationDirectoryEntry[] = [
  { country: "Албания", en: "Albania", cities: ["Тирана", "Дуррес", "Влёра"] },
  {
    country: "Андорра",
    en: "Andorra",
    cities: ["Андорра-ла-Велья", "Эскальдес-Энгордань"],
  },
  {
    country: "Армения",
    en: "Armenia",
    cities: ["Ереван", "Гюмри", "Ванадзор"],
  },
  {
    country: "Австрия",
    en: "Austria",
    cities: ["Вена", "Грац", "Зальцбург", "Линц", "Инсбрук"],
  },
  {
    country: "Азербайджан",
    en: "Azerbaijan",
    cities: ["Баку", "Гянджа", "Сумгаит"],
  },
  {
    country: "Беларусь",
    en: "Belarus",
    cities: ["Минск", "Гомель", "Брест", "Гродно", "Витебск"],
  },
  {
    country: "Бельгия",
    en: "Belgium",
    cities: ["Брюссель", "Антверпен", "Гент", "Брюгге", "Льеж"],
  },
  {
    country: "Босния и Герцеговина",
    en: "Bosnia and Herzegovina",
    cities: ["Сараево", "Баня-Лука", "Мостар"],
  },
  {
    country: "Болгария",
    en: "Bulgaria",
    cities: ["София", "Пловдив", "Варна", "Бургас"],
  },
  { country: "Ватикан", en: "Vatican City", cities: ["Ватикан"] },
  {
    country: "Великобритания",
    en: "United Kingdom",
    cities: [
      "Лондон",
      "Манчестер",
      "Бирмингем",
      "Ливерпуль",
      "Эдинбург",
      "Глазго",
      "Бристоль",
    ],
  },
  {
    country: "Венгрия",
    en: "Hungary",
    cities: ["Будапешт", "Дебрецен", "Сегед", "Мишкольц"],
  },
  {
    country: "Германия",
    en: "Germany",
    cities: [
      "Берлин",
      "Гамбург",
      "Мюнхен",
      "Кёльн",
      "Франкфурт-на-Майне",
      "Дюссельдорф",
      "Штутгарт",
      "Лейпциг",
    ],
  },
  {
    country: "Греция",
    en: "Greece",
    cities: ["Афины", "Салоники", "Патры", "Ираклион"],
  },
  {
    country: "Грузия",
    en: "Georgia",
    cities: ["Тбилиси", "Батуми", "Кутаиси"],
  },
  {
    country: "Дания",
    en: "Denmark",
    cities: ["Копенгаген", "Орхус", "Оденсе", "Ольборг"],
  },
  {
    country: "Ирландия",
    en: "Ireland",
    cities: ["Дублин", "Корк", "Голуэй", "Лимерик"],
  },
  { country: "Исландия", en: "Iceland", cities: ["Рейкьявик", "Акюрейри"] },
  {
    country: "Испания",
    en: "Spain",
    cities: [
      "Мадрид",
      "Барселона",
      "Валенсия",
      "Севилья",
      "Малага",
      "Бильбао",
      "Аликанте",
    ],
  },
  {
    country: "Италия",
    en: "Italy",
    cities: [
      "Рим",
      "Милан",
      "Неаполь",
      "Турин",
      "Флоренция",
      "Болонья",
      "Венеция",
      "Палермо",
    ],
  },
  {
    country: "Казахстан",
    en: "Kazakhstan",
    cities: [
      "Алматы",
      "Астана",
      "Шымкент",
      "Караганда",
      "Актобе",
      "Тараз",
      "Павлодар",
      "Усть-Каменогорск",
      "Семей",
      "Атырау",
      "Костанай",
      "Кызылорда",
      "Актау",
      "Талдыкорган",
      "Каскелен",
      "Туркестан",
    ],
  },
  {
    country: "Кипр",
    en: "Cyprus",
    cities: ["Никосия", "Лимасол", "Ларнака", "Пафос"],
  },
  { country: "Косово", en: "Kosovo", cities: ["Приштина", "Призрен"] },
  { country: "Латвия", en: "Latvia", cities: ["Рига", "Даугавпилс", "Лиепая"] },
  {
    country: "Литва",
    en: "Lithuania",
    cities: ["Вильнюс", "Каунас", "Клайпеда"],
  },
  { country: "Лихтенштейн", en: "Liechtenstein", cities: ["Вадуц", "Шан"] },
  {
    country: "Люксембург",
    en: "Luxembourg",
    cities: ["Люксембург", "Эш-сюр-Альзетт"],
  },
  {
    country: "Мальта",
    en: "Malta",
    cities: ["Валлетта", "Слима", "Сент-Джулианс"],
  },
  { country: "Молдова", en: "Moldova", cities: ["Кишинёв", "Бельцы"] },
  { country: "Монако", en: "Monaco", cities: ["Монако", "Монте-Карло"] },
  {
    country: "Нидерланды",
    en: "Netherlands",
    cities: ["Амстердам", "Роттердам", "Гаага", "Утрехт", "Эйндховен"],
  },
  {
    country: "Норвегия",
    en: "Norway",
    cities: ["Осло", "Берген", "Тронхейм", "Ставангер"],
  },
  {
    country: "ОАЭ",
    en: "United Arab Emirates",
    cities: [
      "Дубай",
      "Абу-Даби",
      "Шарджа",
      "Аджман",
      "Рас-эль-Хайма",
      "Фуджейра",
      "Аль-Айн",
      "Умм-эль-Кайвайн",
    ],
  },
  {
    country: "Польша",
    en: "Poland",
    cities: ["Варшава", "Краков", "Вроцлав", "Гданьск", "Познань", "Лодзь"],
  },
  {
    country: "Португалия",
    en: "Portugal",
    cities: ["Лиссабон", "Порту", "Брага", "Фару", "Фуншал"],
  },
  {
    country: "Россия",
    en: "Russia",
    cities: [
      "Москва",
      "Санкт-Петербург",
      "Казань",
      "Екатеринбург",
      "Новосибирск",
      "Сочи",
    ],
  },
  {
    country: "Румыния",
    en: "Romania",
    cities: ["Бухарест", "Клуж-Напока", "Тимишоара", "Яссы", "Констанца"],
  },
  {
    country: "Сан-Марино",
    en: "San Marino",
    cities: ["Сан-Марино", "Серравалле"],
  },
  {
    country: "Северная Македония",
    en: "North Macedonia",
    cities: ["Скопье", "Битола", "Охрид"],
  },
  { country: "Сербия", en: "Serbia", cities: ["Белград", "Нови-Сад", "Ниш"] },
  {
    country: "Словакия",
    en: "Slovakia",
    cities: ["Братислава", "Кошице", "Жилина"],
  },
  {
    country: "Словения",
    en: "Slovenia",
    cities: ["Любляна", "Марибор", "Копер"],
  },
  {
    country: "США",
    en: "United States (America)",
    cities: [
      "Нью-Йорк",
      "Лос-Анджелес",
      "Чикаго",
      "Хьюстон",
      "Финикс",
      "Филадельфия",
      "Сан-Антонио",
      "Сан-Диего",
      "Даллас",
      "Сан-Хосе",
      "Сан-Франциско",
      "Сиэтл",
      "Бостон",
      "Майами",
      "Атланта",
      "Вашингтон",
      "Денвер",
      "Лас-Вегас",
      "Остин",
      "Орландо",
    ],
  },
  {
    country: "Турция",
    en: "Turkey",
    cities: ["Стамбул", "Анкара", "Измир", "Анталья", "Бурса"],
  },
  {
    country: "Украина",
    en: "Ukraine",
    cities: ["Киев", "Львов", "Одесса", "Харьков", "Днепр"],
  },
  {
    country: "Финляндия",
    en: "Finland",
    cities: ["Хельсинки", "Эспоо", "Тампере", "Турку", "Оулу"],
  },
  {
    country: "Франция",
    en: "France",
    cities: [
      "Париж",
      "Марсель",
      "Лион",
      "Тулуза",
      "Ницца",
      "Бордо",
      "Лилль",
      "Страсбург",
    ],
  },
  {
    country: "Хорватия",
    en: "Croatia",
    cities: ["Загреб", "Сплит", "Риека", "Дубровник"],
  },
  {
    country: "Черногория",
    en: "Montenegro",
    cities: ["Подгорица", "Будва", "Котор"],
  },
  {
    country: "Чехия",
    en: "Czechia",
    cities: ["Прага", "Брно", "Острава", "Пльзень"],
  },
  {
    country: "Швейцария",
    en: "Switzerland",
    cities: ["Цюрих", "Женева", "Базель", "Берн", "Лозанна", "Люцерн"],
  },
  {
    country: "Швеция",
    en: "Sweden",
    cities: ["Стокгольм", "Гётеборг", "Мальмё", "Уппсала"],
  },
  { country: "Эстония", en: "Estonia", cities: ["Таллин", "Тарту", "Нарва"] },
];
const DEFAULT_CITIES_BY_COUNTRY: CustomCities = Object.fromEntries(
  CRM_LOCATION_DIRECTORY.map((item) => [item.country, item.cities]),
);

declare global {
  var __stkLabSupabase: SupabaseClient | undefined;
}

function getStkSupabase() {
  if (!globalThis.__stkLabSupabase) {
    globalThis.__stkLabSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return globalThis.__stkLabSupabase;
}
const sb = getStkSupabase();

const text = {
  ru: {
    admin: "CRM · Заявки и клиенты",
    leads: "Заявки",
    total: "Всего",
    refresh: "Обновить",
    refreshing: "Обновляем…",
    logout: "Выйти",
    search: "Поиск по имени, контакту, компании, сообщению…",
    sort: "Сортировка",
    newest: "Сначала новые",
    oldest: "Сначала старые",
    name: "По имени",
    filters: {
      all: "Все",
      new: "Новые",
      draft: "Черновики",
      contacted: "Связались",
      in_progress: "В работе",
      won: "Успешно",
      lost: "Отказ",
      dead: "Мёртвые",
      not_profitable: "Нерентабельные",
    },
    statuses: {
      new: "Новая",
      draft: "Черновик",
      contacted: "Связались",
      in_progress: "В работе",
      won: "Успешно",
      lost: "Отказ",
      dead: "Мёртвая",
      not_profitable: "Нерентабельная",
    },
    contact: "Контакт",
    company: "Компания",
    type: "Тип проекта",
    message: "Сообщение",
    open: "Открыть заявку",
    none: "В этом разделе заявок пока нет.",
    lead: "Заявка",
    status: "Статус",
    note: "Внутренняя заметка",
    notePh: "Например: написала в WhatsApp, клиент просит созвон завтра…",
    save: "Сохранить",
    saving: "Сохраняем…",
    saved: "✓ Изменения сохранены",
    source: "Источник",
    close: "Закрыть",
    select:
      "Нажми на заявку, чтобы изменить статус и добавить внутреннюю заметку.",
    delete: "Удалить заявку",
    deleting: "Удаляем…",
    deleteAsk: "Удалить эту заявку? Это действие нельзя отменить.",
    deleted: "Заявка удалена.",
    copy: "Копировать контакт",
    copied: "Скопировано",
    login: "Вход в закрытую панель заявок.",
    password: "Пароль",
    signIn: "Войти",
    signing: "Входим…",
    loginError: "Не удалось войти. Проверь email и пароль.",
    found: "Найдено",
    duplicate: "Такая запись уже есть в CRM",
    addInstagram: "Добавить Instagram",
    addEmail: "Добавить почту",
    remove: "Удалить",
    primaryMessage: "Основное сообщение",
    followupMessage: "Повторное сообщение",
    openWhatsApp: "Открыть WhatsApp",
    openEmail: "Открыть почту",
  },
  en: {
    admin: "Admin · Leads",
    leads: "Leads",
    total: "Total",
    refresh: "Refresh",
    refreshing: "Refreshing…",
    logout: "Log out",
    search: "Search name, contact, company or message…",
    sort: "Sort",
    newest: "Newest first",
    oldest: "Oldest first",
    name: "By name",
    filters: {
      all: "All",
      new: "New",
      draft: "Drafts",
      contacted: "Contacted",
      in_progress: "In progress",
      won: "Won",
      lost: "Lost",
      dead: "Dead",
      not_profitable: "Not profitable",
    },
    statuses: {
      new: "New",
      draft: "Draft",
      contacted: "Contacted",
      in_progress: "In progress",
      won: "Won",
      lost: "Lost",
      dead: "Dead",
      not_profitable: "Not profitable",
    },
    contact: "Contact",
    company: "Company",
    type: "Project type",
    message: "Message",
    open: "Open lead",
    none: "No leads in this section yet.",
    lead: "Lead",
    status: "Status",
    note: "Internal note",
    notePh:
      "For example: contacted via WhatsApp, client asked for a call tomorrow…",
    save: "Save",
    saving: "Saving…",
    saved: "✓ Changes saved",
    source: "Source",
    close: "Close",
    select: "Select a lead to change its status and add an internal note.",
    delete: "Delete lead",
    deleting: "Deleting…",
    deleteAsk: "Delete this lead? This action cannot be undone.",
    deleted: "Lead deleted.",
    copy: "Copy contact",
    copied: "Copied",
    login: "Sign in to the private leads dashboard.",
    password: "Password",
    signIn: "Sign in",
    signing: "Signing in…",
    loginError: "Could not sign in. Check your email and password.",
    found: "Found",
    duplicate: "This contact is already in CRM",
    addInstagram: "Add Instagram",
    addEmail: "Add email",
    remove: "Remove",
    primaryMessage: "Primary message",
    followupMessage: "Follow-up message",
    openWhatsApp: "Open WhatsApp",
    openEmail: "Open email",
  },
} as const;

const kaskelenLeads: Lead[] = [
  {
    id: "kaskelen-dave",
    city: "Каскелен",
    created_at: "2026-09-05T00:00:00Z",
    name: "Кондитерская Фабрика Dave",
    contact: "+7 700 555 50 51",
    company: "Кондитерская Фабрика Dave",
    project_type: "Сайт и CRM для производства",
    message:
      "Производитель кондитерских изделий. Адрес: ул. Кайназар батыра, 35, Каскелен. Производство уже серьёзнее домашнего кондитера; современный сайт не найден.",
    locale: "ru",
    source_path: "Каскелен · найдено ранее",
    status: "new",
    admin_notes: null,
  },
  {
    id: "kaskelen-praga",
    city: "Каскелен",
    created_at: "2026-09-05T00:00:00Z",
    name: "Кондитерская «Прага»",
    contact: "Instagram: @praga_kz",
    company: "Кондитерская «Прага»",
    project_type: "Сайт и онлайн-заказ",
    message:
      "Каскелен · кондитерская и кофейня. Instagram: https://www.instagram.com/praga_kz/ · производство: @praga.qz · часы: ежедневно 07:30–21:00. Сайт, email и WhatsApp не подтверждены.",
    locale: "ru",
    source_path: "Instagram · @praga_kz",
    status: "new",
    admin_notes: null,
  },
  {
    id: "kaskelen-happy-cake",
    city: "Каскелен",
    created_at: "2026-09-05T00:00:00Z",
    name: "Happy Cake Каскелен",
    contact: "+7 707 777 11 44",
    company: "Happy Cake",
    project_type: "Сайт, доставка и CRM",
    message:
      "Сайт: https://happycake.kz/qaskelen/ · 3 точки в Каскелене, доставка и самовывоз, Wolt. Бенто-торты, чизкейки, медовик, детские, свадебные и корпоративные торты.",
    locale: "ru",
    source_path: "happycake.kz/qaskelen",
    status: "new",
    admin_notes: null,
  },
  {
    id: "kaskelen-cakes",
    city: "Каскелен",
    created_at: "2026-09-05T00:00:00Z",
    name: "Kaskelen Cakes",
    contact: "Instagram: @kaskelen_cakes",
    company: "Kaskelen Cakes",
    project_type: "Каталог и заказы тортов",
    message:
      "Instagram: https://www.instagram.com/kaskelen_cakes/?hl=en · адрес: ул. Жангозина, 61Б, блок 10, Каскелен · ежедневно 09:00–23:00. Торты и оформление для мероприятий.",
    locale: "ru",
    source_path: "Instagram · @kaskelen_cakes",
    status: "new",
    admin_notes: null,
  },
  {
    id: "kaskelen-kulikov",
    created_at: "2026-09-05T00:00:00Z",
    name: "Kulikov Каскелен",
    contact: "Контакт не найден",
    company: "Kulikov",
    project_type: "Сайт и заказы тортов",
    message:
      "Карточка: https://2gis.kz/almaty/firm/70000001065735365 · адрес: просп. Абылай Хана, 46/46Б. Торты на заказ и фототорты.",
    locale: "ru",
    source_path: "2GIS · Kulikov",
    status: "new",
    admin_notes: null,
  },
  {
    id: "kaskelen-qulpynai",
    created_at: "2026-09-05T00:00:00Z",
    name: "Qulpynai Каскелен",
    contact: "Контакт не найден",
    company: "Qulpynai",
    project_type: "Сайт и кондитерская",
    message:
      "Карточка: https://restoran.kz/cookery/101721-qulpynai-kaskelen · адрес: ул. Кисыкова, 42А, Каскелен. Ресторан/кондитерская, десерты и заказы.",
    locale: "ru",
    source_path: "restoran.kz · Qulpynai",
    status: "new",
    admin_notes: null,
  },
  {
    id: "kaskelen-yerkinay",
    created_at: "2026-09-05T00:00:00Z",
    name: "Yerkinay tattileri",
    contact: "Контакт не найден",
    company: "Yerkinay tattileri",
    project_type: "Сайт для пекарни-кондитерской",
    message:
      "Карточка: https://2gis.kz/almaty/firm/70000001090713630/tab/info · ул. Жибек Жолы, 31Б, Шамалган (рядом с Каскеленом). Ориентир цены: около 7 000 ₸/кг.",
    locale: "ru",
    source_path: "2GIS · Yerkinay tattileri",
    status: "new",
    admin_notes: null,
  },
  {
    id: "kaskelen-konditer-alemi",
    created_at: "2026-09-05T00:00:00Z",
    name: "Кондитер әлемі",
    contact: "Контакт не найден",
    company: "Кондитер әлемі",
    project_type: "Сайт-каталог",
    message:
      "Адрес: просп. Абылай Хана, 225/3, Каскелен. Кондитерский магазин/кондитерская.",
    locale: "ru",
    source_path: "Каскелен · найдено ранее",
    status: "new",
    admin_notes: null,
  },
  {
    id: "kaskelen-mir-sladosti",
    created_at: "2026-09-05T00:00:00Z",
    name: "Мир сладости",
    contact: "Контакт не найден",
    company: "Мир сладости",
    project_type: "Сайт-каталог",
    message:
      "Адрес: ул. Казыбек би, 33А, Каскелен. Магазин сладостей/кондитерская.",
    locale: "ru",
    source_path: "Каскелен · найдено ранее",
    status: "new",
    admin_notes: null,
  },
  {
    id: "kaskelen-candy-shop",
    created_at: "2026-09-05T00:00:00Z",
    name: "Candy shop",
    contact: "Контакт не найден",
    company: "Candy shop",
    project_type: "Сайт-каталог",
    message: "Адрес: просп. Абылай Хана, 30, Каскелен. Магазин сладостей.",
    locale: "ru",
    source_path: "Каскелен · найдено ранее",
    status: "new",
    admin_notes: null,
  },
  {
    id: "kaskelen-bayan",
    created_at: "2026-09-05T00:00:00Z",
    name: "Баян",
    contact: "Контакт не найден",
    company: "Баян",
    project_type: "Сайт для кулинарии",
    message:
      "Адрес: просп. Абылай Хана, 22Б, Каскелен. Кулинария/кондитерская.",
    locale: "ru",
    source_path: "Каскелен · найдено ранее",
    status: "new",
    admin_notes: null,
  },
  {
    id: "kaskelen-hamle",
    created_at: "2026-09-05T00:00:00Z",
    name: "Хамле / Хамле Компани ЛТД",
    contact: "Контакт не найден",
    company: "Хамле Компани ЛТД",
    project_type: "Сайт и CRM для пекарни",
    message:
      "Адрес: просп. Абылай Хана, 3А, Каскелен. Пекарня/кулинария, потенциальный корпоративный клиент.",
    locale: "ru",
    source_path: "Каскелен · найдено ранее",
    status: "new",
    admin_notes: null,
  },
];

const almatyLeadSeed = [
  [
    "MUS-MUS",
    "+7 778 870 00 67",
    "mail@mus-mus.kz",
    "@mus.mus.kz",
    "Дом десертов / торты на заказ",
    "ул. Макатаева 131 / Сокпакбаева 1",
  ],
  [
    "Profiterole",
    "+7 707 300 01 65",
    "",
    "",
    "Кондитерская мастерская",
    "ул. Брусиловского 159, блок 3",
  ],
  [
    "Cake.Shop.KZ",
    "+7 707 222 07 48",
    "",
    "",
    "Домашняя кондитерская",
    "ул. Исеналиева",
  ],
  [
    "ZakazTortov.kz",
    "+7 702 572 44 44",
    "",
    "",
    "Торты на заказ",
    "мкр. Керемет 5к",
  ],
  [
    "Кондитерский цех Айнур",
    "+7 701 744 90 56",
    "",
    "",
    "Кондитерский цех",
    "ул. Акан-Серы 11",
  ],
  [
    "Кондитерский цех КарамеЛь",
    "+7 707 812 10 22",
    "",
    "",
    "Магазин тортов",
    "ул. Жибек Жолы 67",
  ],
  ["Торты Алматы", "+7 701 317 84 22", "", "", "Кондитерская", "Алматы"],
  [
    "Cheesecake Алматы",
    "+7 701 330 11 26",
    "",
    "",
    "Магазин тортов",
    "мкр. 6, дом 6",
  ],
  [
    "BentoDay",
    "+7 776 755 31 88",
    "",
    "@bentoday.almaty",
    "Бенто-торты / десерты",
    "мкр. Аксай-5, 25 к6",
  ],
  [
    "Tattisin",
    "+7 776 087 56 29",
    "",
    "@tattisin_",
    "Кафе-кондитерская",
    "пр. Абая 65",
  ],
  [
    "Cheesy",
    "+7 702 235 54 01",
    "cheesyalmaty@gmail.com",
    "@cheesy.kz",
    "Кондитерская-кофейня",
    "мкр. Жетысу-3, 1Б",
  ],
  [
    "Nazik",
    "+7 701 872 51 33",
    "nazik@gmail.com",
    "@nazik_official_almaty",
    "Кондитерские изделия",
    "пр. Достык 31",
  ],
  [
    "Өте Дәмді",
    "+7 776 262 20 24",
    "otedem@inbox.ru",
    "",
    "Кондитерский цех / сеть",
    "ул. Жангельдина 31/1",
  ],
  [
    "Пекатория",
    "+7 701 936 99 33",
    "",
    "@pekatoria_kz",
    "Пекарня / десерты",
    "пр. Серкебаева 244",
  ],
  [
    "Кондитерская Камилла",
    "+7 727 294 88 72",
    "",
    "",
    "Кондитерский магазин",
    "Алматы",
  ],
  ["Fika", "+7 707 933 10 23", "", "", "Пекарня", "ул. Кабанбай батыра 104"],
  [
    "Kulinarich",
    "+7 727 397 41 87",
    "",
    "",
    "Кондитерский магазин",
    "ул. Жангельдина 31/3",
  ],
  ["Caramel", "", "", "", "Кондитерская", "мкр. Аккент 34"],
  ["Tatti_dan", "", "", "", "Кондитерский цех", "ул. Алмерек Абыз 73/1"],
  ["Выпечка Алматы", "", "", "", "Кондитерский цех", "ул. Алматинская 32"],
  ["Мадам Нан", "", "", "", "Кондитерский цех", "ул. Каныша Сатпаева 7а/3"],
  ["Cake Star", "", "", "", "Пекарня / кондитерская", "ул. Казыбек би 139"],
  ["Sweet sisters.kz", "", "", "", "Кондитерская", "ул. Кажымукана 59"],
  ["Роза", "", "", "", "Кондитерский цех", "мкр. Айнабулак-3, 129"],
  [
    "Три Эклера",
    "",
    "",
    "",
    "Кондитерская мастерская",
    "ул. Ходжанова 77/5 к1",
  ],
  ["Al’Barakat", "", "", "", "Кондитерский дом", "ул. Жамбыла"],
  ["Егор | george.yak", "", "", "@george.yak", "Авторский кондитер", "Алматы"],
  ["Deliberry_almaty.kz", "", "", "", "Кондитерская мастерская", "Алматы"],
  [
    "Happy Cake",
    "+7 707 777 11 44",
    "",
    "",
    "Сеть кондитерских",
    "Алматы, 34 точки",
  ],
  [
    "Kulikov",
    "+7 727 364 77 77",
    "",
    "",
    "Кондитерский дом",
    "Алматы, множество филиалов",
  ],
  [
    "AAbakery",
    "+7 707 239 34 39",
    "",
    "@aabakery_almaty",
    "Кондитерская",
    "ул. Байзакова 225",
  ],
  [
    "Aidana",
    "+7 747 593 35 58 / +7 775 155 64 24",
    "aidano4ka.mazhitova@mail.ru",
    "@allazharkyzy.aidana",
    "Кондитерский дом",
    "ул. Талжанова 9 / пр. Жибек Жолы 64",
  ],
  [
    "Aisha Sweets",
    "+7 775 888 85 05",
    "",
    "@_aisha_sweets",
    "Кондитерская / пункт выдачи",
    "ул. Масанчи 98в",
  ],
  [
    "Aiyms Cake Boutique",
    "+7 707 717 84 47",
    "",
    "@aiyms_cake_boutique",
    "Кондитерская",
    "мкр. Кулагер 30",
  ],
  [
    "Aizada.bakery",
    "+7 707 973 67 67",
    "",
    "@aizada.bakery",
    "Кондитерский магазин",
    "мкр. Жас Канат 1/18",
  ],
  [
    "Aizhankasaten_cake",
    "+7 708 667 64 30",
    "",
    "@aizhankasaten_cake",
    "Кондитерская",
    "ул. Шекспира 66",
  ],
  [
    "Albina Buro",
    "+7 777 193 00 39",
    "",
    "@albina_buro",
    "Кондитерский цех",
    "ул. Лобачевского 11",
  ],
  [
    "Aliyadelice",
    "+7 702 336 88 50",
    "",
    "@aliyadelice.kz",
    "Кондитерский цех",
    "ул. Жарокова 289а",
  ],
  [
    "Alma Chocolates",
    "+7 771 765 40 72",
    "info@almachocolates.kz",
    "@alma_chocolates",
    "Шоколад / кондитерское производство",
    "пр. Райымбека 2",
  ],
  [
    "Asaat",
    "+7 707 808 04 44",
    "",
    "@asaat.kz",
    "Кондитерская",
    "ул. Навои 72",
  ],
  [
    "Ayala sweet bakery",
    "+7 705 773 28 46 / +7 707 769 24 14",
    "",
    "@ayala_sweet_bakery",
    "Кондитерская",
    "ул. Арман 53Б / мкр. Шугыла 340/35 к7",
  ],
  [
    "AyAz Chocolate",
    "+7 777 351 91 21 / +7 727 327 23 32",
    "ayazchocolate@yahoo.com",
    "",
    "Шоколадное производство",
    "ул. Герасима Колпаковского 55",
  ],
  [
    "Azicake",
    "+7 707 738 48 94",
    "",
    "@azicake.kz",
    "Кондитерский цех",
    "4-й микрорайон 4/1",
  ],
  [
    "Baily Bakery",
    "+7 701 540 23 25 / +7 702 948 79 08",
    "",
    "@baily.bakery",
    "Пекарня-кафе",
    "мкр. Дарабоз 51",
  ],
  [
    "Bento_tortiki_almaty",
    "+7 705 769 72 67",
    "",
    "@bentotortiki_toibastar_almaty",
    "Бенто-торты",
    "мкр. Аксай-2 71",
  ],
  [
    "Best Berry",
    "+7 707 311 08 04",
    "",
    "@bestberry.almaty",
    "Клубника в шоколаде / десерты",
    "ул. Каныша Сатпаева 7а",
  ],
  [
    "bibi.cake",
    "+7 706 669 70 17",
    "",
    "@anelkin.tort",
    "Кондитерская студия",
    "ул. Есенберлина 155",
  ],
  [
    "Biday Bakery",
    "+7 771 294 22 15 / +7 776 202 05 77",
    "",
    "@biday_bakery",
    "Пекарня",
    "ул. Байтерекова 83",
  ],
  [
    "Big Apple Cake",
    "+7 775 911 81 11",
    "zakaz@biapplecake.kz",
    "@big_apple_cake",
    "Кондитерский цех",
    "пр. Достык 50",
  ],
  [
    "Caramel",
    "+7 778 108 55 44",
    "aizhankaz@gmail.com",
    "@caramel.cakeshop",
    "Кондитерская",
    "мкр. Аккент 34",
  ],
  [
    "Caramelca.kz",
    "+7 708 725 47 67",
    "",
    "@caramelca.kz",
    "Кондитерский цех",
    "ул. Жунисова 4/9",
  ],
  [
    "Caramel Shanyraq2",
    "",
    "",
    "@caramel_shanyraq2",
    "Кондитерский дом",
    "ул. Жанкожа Батыра 119/1",
  ],
  [
    "Charlotte",
    "+7 702 730 99 33",
    "",
    "@cafe_charlotte_almaty",
    "Кафе-кондитерская",
    "ул. Розыбакиева 247, блок 3",
  ],
  [
    "Cherry bakery",
    "+7 747 511 11 61",
    "",
    "@cherry.bakery.kz",
    "Кондитерская",
    "ул. Коргалжын 9",
  ],
  [
    "Chocoberry",
    "+7 708 322 81 51",
    "",
    "@chocoberry_aliya",
    "Десертные композиции",
    "мкр. Тастак-1 3",
  ],
].map(([name, phone, email, instagram, category, address], i) => ({
  id: `kaskelen-almaty-${i + 1}`,
  created_at: "2026-09-05T00:00:00Z",
  name,
  contact:
    [
      phone && `Телефон: ${phone}`,
      instagram && `Instagram: ${instagram}`,
      email && `Email: ${email}`,
    ]
      .filter(Boolean)
      .join(" · ") || "Контакт не найден",
  company: name,
  city: "Алматы",
  project_type: category,
  message: `${category}. Адрес: ${address}, Алматы.`,
  locale: "ru" as const,
  source_path: "Excel · konditerskie_almaty_full_leads.xlsx",
  status: "new" as LeadStatus,
  admin_notes: null,
}));

const extraAlmatyLeadSeed: Lead[] = [
  ["BENTO 24", "+7 706 650 06 52", "", "Кондитерская", "ул. Жарокова 289а"],
  [
    "Whoopie Cakes",
    "+7 705 225 58 33",
    "@whoopiecakes",
    "Кондитерская / кафе",
    "пр. Абая 35/37 и другие филиалы",
  ],
  [
    "Lalu Cake",
    "+7 707 570 77 76 · info@lalu.kz · @la_lu_cake · Сайт: https://lalu.kz",
    "Кондитерская",
    "ул. Каныша Сатпаева 30В / ул. Толе би 273а блок 5",
  ],
  ["Nel'", "+7 701 555 05 59", "", "Кондитерская", "ул. Желтоксан 96"],
  [
    "Sweets Almaty",
    "+7 727 237 80 35",
    "",
    "Кондитерская",
    "ул. Шевченко 7/75",
  ],
  [
    "Можно Всё!",
    "+7 778 792 26 10 · @mozhnovse_almaty",
    "",
    "Кондитерская",
    "пр. Назарбаева 223",
  ],
  [
    "Milky Cake",
    "+7 707 211 80 03",
    "",
    "Кондитерская",
    "ул. Тургут Озала 152",
  ],
  ["LAKOMKA", "+7 747 260 01 00", "", "Кондитерская", "пр. Абылай хана 131"],
  [
    "Брецель",
    "+7 701 088 70 77",
    "",
    "Пекарня / кондитерская",
    "мкр. Самал-2 33А",
  ],
  [
    "Тәп-Тәтті",
    "+7 708 583 48 72 · info@taptatti.kz",
    "Кондитерская",
    "ул. Исаака Ньютона 1А",
  ],
  [
    "Dream Cakes",
    "+7 708 602 15 62",
    "",
    "Кондитерская",
    "ул. Тимирязева 73 и другие филиалы",
  ],
  [
    "LA TARTINE",
    "+7 727 261 09 91",
    "",
    "Пекарня-кондитерская",
    "ул. Кабанбай батыра 89",
  ],
].map(([name, contact, project_type, address], i) => ({
  id: `kaskelen-almaty-extra-${i + 1}`,
  created_at: "2026-09-05T00:00:00Z",
  name,
  contact,
  company: name,
  city: "Алматы",
  project_type,
  message: `${project_type}. Адрес: ${address}, Алматы.`,
  locale: "ru",
  source_path: "Excel · konditerskie_almaty_12_new_only.xlsx",
  status: "new",
  admin_notes: null,
}));

const taldykorganLeadSeed: Lead[] = [
  {
    id: "taldykorgan-yumyum",
    created_at: "2026-09-05T00:00:00Z",
    name: "YumYum",
    contact:
      "Телефон: +7 700 600 06 31 · WhatsApp: https://wa.me/77006000631 · Email: b.stabayeva@gmail.com · Instagram: https://www.instagram.com/yum_yum_tdk/",
    company: "YumYum",
    city: "Талдыкорган",
    project_type: "Кондитерская / торты на заказ",
    message:
      "Бенто, ярусные и фототорты, макаронс; работает с 2016 года. Адрес: мкр. Каратал, 22д, Талдыкорган.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-zhazilya",
    created_at: "2026-09-05T00:00:00Z",
    name: "Кондитерская ZHAZILYA",
    contact: "Телефон: +7 747 839 04 19 · WhatsApp: https://wa.me/77478390419",
    company: "Кондитерская ZHAZILYA",
    city: "Талдыкорган",
    project_type: "Кондитерская",
    message:
      "Небольшая локальная кондитерская. Адрес: ул. Толебаева 100, Талдыкорган.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-tort",
    created_at: "2026-09-05T00:00:00Z",
    name: "Торт",
    contact: "Телефон: +7 707 199 53 01 · WhatsApp: https://wa.me/77071995301",
    company: "Торт",
    city: "Талдыкорган",
    project_type: "Пекарня / торты",
    message:
      "Локальный небольшой бизнес. Адрес: ул. Есенберлина 17, Талдыкорган.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-dessert",
    created_at: "2026-09-05T00:00:00Z",
    name: "Dessert",
    contact: "Телефон: +7 707 370 33 88 · WhatsApp: https://wa.me/77073703388",
    company: "Dessert",
    city: "Талдыкорган",
    project_type: "Кафе-кондитерская",
    message: "Небольшая кафе-кондитерская. Адрес: Талдыкорган.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-kafe-konditerskaya",
    created_at: "2026-09-05T00:00:00Z",
    name: "Кафе-Кондитерская",
    contact: "Телефон: +7 701 757 15 25 · WhatsApp: https://wa.me/77017571525",
    company: "Кафе-Кондитерская",
    city: "Талдыкорган",
    project_type: "Кафе-кондитерская",
    message: "Локальная точка. Адрес: Талдыкорган.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-chakchak",
    created_at: "2026-09-05T00:00:00Z",
    name: "Chak Chak by Fortuna Food",
    contact:
      "Телефон: +7 747 508 23 15 · WhatsApp: https://wa.me/77475082315 · Email: fortuna.kafie@mail.ru · Instagram: https://www.instagram.com/chakchak_taldykorgan/ · Сайт: https://fortunafood.kamiqr.com/menu/basic",
    company: "Chak Chak by Fortuna Food",
    city: "Талдыкорган",
    project_type: "Кондитерская / торты",
    message:
      "Торты, бенто и фототорты; объединены филиалы Fortuna/Chak Chak. Адрес: ул. Гали Орманова 26, Талдыкорган.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-fortuna",
    created_at: "2026-09-05T00:00:00Z",
    name: "Fortuna Food",
    contact:
      "Телефон: +7 776 705 60 00 / +7 702 387 60 00 · WhatsApp: https://wa.me/77767056000 · Instagram: https://www.instagram.com/fortunafood.kz/",
    company: "Fortuna Food",
    city: "Талдыкорган",
    project_type: "Кулинария / торты",
    message:
      "Сеть точек; торты на заказ. Адрес: ул. Г. Омарова 2А и другие точки, Талдыкорган.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-delicates",
    created_at: "2026-09-05T00:00:00Z",
    name: "Деликатес",
    contact:
      "Телефон: +7 775 080 80 25 · WhatsApp: https://wa.me/77757999990 · Instagram: https://www.instagram.com/delikatesy_tdk/",
    company: "Деликатес",
    city: "Талдыкорган",
    project_type: "Кондитерская / кулинария",
    message:
      "10 фирменных магазинов; торты, бенто, фототорты. Адрес: пр. Нурсултана Назарбаева 104а, Талдыкорган.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-vityaz",
    created_at: "2026-09-05T00:00:00Z",
    name: "Кондитерская Пекарня Витязь",
    contact: "Телефон: +7 728 363 07 17",
    company: "Кондитерская Пекарня Витязь",
    city: "Талдыкорган",
    project_type: "Пекарня / кондитерская",
    message:
      "Локальная пекарня-кондитерская. Адрес: ул. Панфилова 126, Талдыкорган.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-sunfood",
    created_at: "2026-09-05T00:00:00Z",
    name: "Sunfood",
    contact: "Телефон: +7 747 421 57 17 · WhatsApp: https://wa.me/77474215717",
    company: "Sunfood",
    city: "Талдыкорган",
    project_type: "Кондитерская",
    message: "Небольшая кондитерская. Адрес: Бирлик 14, Талдыкорган.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-nazarbaeva87",
    created_at: "2026-09-05T00:00:00Z",
    name: "Торты на Назарбаева 87",
    contact:
      "Телефон: +7 707 120 79 94 · WhatsApp: https://wa.me/77071207994 · Сайт: https://taldykorgan.guls.kz/torti",
    company: "Торты на Назарбаева 87",
    city: "Талдыкорган",
    project_type: "Торты / бенто",
    message:
      "Онлайн-витрина тортов и бенто. Адрес: пр. Нурсултана Назарбаева 87, Талдыкорган.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-happycake",
    created_at: "2026-09-05T00:00:00Z",
    name: "HappyCake",
    contact:
      "Телефон: +7 707 777 11 44 · WhatsApp: https://wa.me/77715259985 · Instagram: https://www.instagram.com/happycake.kz/ · Сайт: https://happycake.kz/taldyqorgan/",
    company: "HappyCake",
    city: "Талдыкорган",
    project_type: "Сеть кондитерских",
    message:
      "Крупная сеть; все филиалы объединены в один лид. 9 точек в Талдыкоргане.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-kulikov",
    created_at: "2026-09-05T00:00:00Z",
    name: "Kulikov Талдыкорган",
    contact:
      "Телефон: +7 727 364 77 77 · Instagram: https://www.instagram.com/kulikov_kz/ · Сайт: https://kulikov.com/",
    company: "Kulikov",
    city: "Талдыкорган",
    project_type: "Кондитерский дом",
    message:
      "Крупная сеть; не приоритет для холодного предложения. Адрес: мкр. Жастар 39Б, Талдыкорган.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-nilori",
    created_at: "2026-09-05T00:00:00Z",
    name: "Nilori Cakes",
    contact: "Контакт не найден",
    company: "Nilori Cakes",
    city: "Талдыкорган",
    project_type: "Частный кондитер / торты",
    message:
      "Упоминается в каталоге тортов; актуальные контакты не подтверждены.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-mak",
    created_at: "2026-09-05T00:00:00Z",
    name: "Кондитерская Мак",
    contact: "Контакт не найден",
    company: "Кондитерская Мак",
    city: "Талдыкорган",
    project_type: "Торты на заказ",
    message:
      "Упоминается среди кондитерских Талдыкоргана; контакты требуют проверки.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-sisters-corner",
    created_at: "2026-09-05T00:00:00Z",
    name: "Sister's Corner Bakery",
    contact: "Контакт не найден",
    company: "Sister's Corner Bakery",
    city: "Талдыкорган",
    project_type: "Bakery / торты на заказ",
    message: "Упоминается среди кондитеров; контакты требуют проверки.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
  {
    id: "taldykorgan-ayashka",
    created_at: "2026-09-05T00:00:00Z",
    name: "Кулинарная Аяшка",
    contact: "Контакт не найден",
    company: "Кулинарная Аяшка",
    city: "Талдыкорган",
    project_type: "Кулинария / кондитерские изделия",
    message:
      "Торты и кондитерские изделия; актуальные контакты не подтверждены.",
    locale: "ru",
    source_path: "Excel · konditerskie_taldykorgan.xlsx",
    status: "new",
    admin_notes: null,
  },
];
const almatyBarsLeadSeed: Lead[] = [
  {
    id: "almaty-bar-1",
    created_at: "2026-09-13T00:00:00Z",
    name: "Amelia",
    contact: "+7 (708) 024-07-07",
    company: "Amelia",
    city: "Алматы",
    project_type: "Караоке-бар / ресторан",
    message:
      "Наурызбайский район. Адрес: мкр. Каргалы, ул. Кенесары хана, 88/1. Часы: ежедневно 09:00–02:00. Рейтинг: 4.09 / 32 оценки. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Нет отдельного сайта в найденных источниках; удобно вынести меню, бронь и контакты в один сайт.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-2",
    created_at: "2026-09-13T00:00:00Z",
    name: "Танкер",
    contact: "Контакт не найден",
    company: "Танкер",
    city: "Алматы",
    project_type: "Пивной магазин / гастробар / караоке",
    message:
      "Наурызбайский район. Адрес: ул. Рыскулова, 80А. Часы: ежедневно 10:00–23:00. Рейтинг: 4.7 / 29 оценок. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Формат и ассортимент трудно оценить без полноценной презентации; филиальная сеть требует единой структуры.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-3",
    created_at: "2026-09-13T00:00:00Z",
    name: "Каморка на районе",
    contact: "+7 (705) 126-72-22; +7 (747) 309-97-37",
    company: "Каморка на районе",
    city: "Алматы",
    project_type: "Караоке-бар / лаундж-бар",
    message:
      "Наурызбайский район. Адрес: ул. Кенесары хана, 54/24к1. Часы: вт–вс 16:00–02:00. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Нет сайта и удобной страницы бронирования в найденной карточке.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-4",
    created_at: "2026-09-13T00:00:00Z",
    name: "Coffee bar",
    contact: "Контакт не найден",
    company: "Coffee bar",
    city: "Алматы",
    project_type: "Пивной бар / караоке",
    message:
      "Наурызбайский район. Адрес: ул. Жандосова, 1В. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Название не отражает формат; нет телефона и часов работы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-5",
    created_at: "2026-09-13T00:00:00Z",
    name: "Meduza smoke",
    contact: "+7 (700) 600-04-05",
    company: "Meduza smoke",
    city: "Алматы",
    project_type: "Караоке-бар / smoke lounge",
    message:
      "Наурызбайский район. Адрес: ул. Камала Смайылова, 101. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Нет сайта в найденных источниках; услуги и формат требуют визуальной презентации.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-6",
    created_at: "2026-09-13T00:00:00Z",
    name: "Разливные напитки",
    contact: "Контакт не найден",
    company: "Разливные напитки",
    city: "Алматы",
    project_type: "Бар разливных напитков / караоке",
    message:
      "Наурызбайский район. Адрес: Московская ул., 15А, мкр. Тастыбулак. Часы: пн–чт 10:00–22:00; пт–вс 10:00–23:00. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Нет названия бренда и сайта; сложно выделиться среди похожих точек.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-7",
    created_at: "2026-09-13T00:00:00Z",
    name: "Караоке бар",
    contact: "Контакт не найден",
    company: "Караоке бар",
    city: "Алматы",
    project_type: "Караоке-бар",
    message:
      "Наурызбайский район. Адрес: ул. Байкена Ашимова, 239, мкр. Калкаман-2. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: В справочнике указано общее название, без бренда и контактов.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-8",
    created_at: "2026-09-13T00:00:00Z",
    name: "Пивная",
    contact: "Контакт не найден",
    company: "Пивная",
    city: "Алматы",
    project_type: "Пивной бар / караоке",
    message:
      "Наурызбайский район. Адрес: ул. Базарбай Жуманиязова, 15/5, мкр. Калкаман-2. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Карточка не содержит актуальных часов работы и контактов; в Яндексе отмечалась как закрытая.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-9",
    created_at: "2026-09-13T00:00:00Z",
    name: "Бар Даулет",
    contact: "Контакт не найден",
    company: "Бар Даулет",
    city: "Алматы",
    project_type: "Караоке-бар",
    message:
      "Наурызбайский район. Адрес: ул. Кенесары хана, 49. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет часов работы и контактов в найденной карточке.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-10",
    created_at: "2026-09-13T00:00:00Z",
    name: "Lime",
    contact: "Контакт не найден",
    company: "Lime",
    city: "Алматы",
    project_type: "Караоке-бар / караоке-клуб",
    message:
      "Наурызбайский район. Адрес: ул. Алатау, 6А, мкр. Тастыбулак. Статус проверки: Сомнительно. Приоритет: Низкий. Что проверить: Яндекс отмечает, что заведение больше не работает.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-11",
    created_at: "2026-09-13T00:00:00Z",
    name: "The Lounge Bar",
    contact: "Контакт не найден",
    company: "The Lounge Bar",
    city: "Алматы",
    project_type: "Лаундж-бар / винный бар",
    message:
      "Наурызбайский район. Адрес: ул. Кенесары хана, 44. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет телефона, часов работы и социальных ссылок в найденной карточке.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-12",
    created_at: "2026-09-13T00:00:00Z",
    name: "Мейрамхана",
    contact: "Контакт не найден",
    company: "Мейрамхана",
    city: "Алматы",
    project_type: "Караоке-клуб / бельгийский бар",
    message:
      "Наурызбайский район. Адрес: ул. Бегайыл, 2А. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Название слишком общее; нет контактов и сайта.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-13",
    created_at: "2026-09-13T00:00:00Z",
    name: "Магарыч",
    contact: "Контакт не найден",
    company: "Магарыч",
    city: "Алматы",
    project_type: "Бар разливных напитков / караоке",
    message:
      "Наурызбайский район. Адрес: Московская ул., 15А, мкр. Тастыбулак. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Возможно совпадает с точкой «Разливные напитки» по адресу; требуется объединить или уточнить.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-14",
    created_at: "2026-09-13T00:00:00Z",
    name: "Бар разливных напитков",
    contact: "Контакт не найден",
    company: "Бар разливных напитков",
    city: "Алматы",
    project_type: "Бар разливных напитков",
    message:
      "Наурызбайский район. Адрес: мкр. Таусамалы, ул. Динмухамеда Кунаева. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет точного номера дома, телефона и названия бренда.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-15",
    created_at: "2026-09-13T00:00:00Z",
    name: "Bult",
    contact: "Контакт не найден",
    company: "Bult",
    city: "Алматы",
    project_type: "Лаундж-бар",
    message:
      "Наурызбайский район. Адрес: ул. Жунисова, 10 к3, ЖК Alma City. Часы: ежедневно с 16:00 до 04:00. Рейтинг: 4.9 / 136 оценок. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Сильный рейтинг, но в открытой карточке не найден отдельный сайт.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-16",
    created_at: "2026-09-13T00:00:00Z",
    name: "Rafinad",
    contact: "+7 (707) 273-73-74 · Instagram: @rafinad_almaty",
    company: "Rafinad",
    city: "Алматы",
    project_type: "Караоке-бар / семейное кафе",
    message:
      "Наурызбайский район. Адрес: ул. Килыбай Медеубекова, 71, мкр. Абай. Часы: ежедневно 11:00–02:00. Рейтинг: 4.9 / 1 807 оценок. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Есть Instagram и высокий рейтинг, но сайт не найден; можно усилить онлайн-бронь и презентацию.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-17",
    created_at: "2026-09-13T00:00:00Z",
    name: "Simple Shisha",
    contact: "Контакт не найден",
    company: "Simple Shisha",
    city: "Алматы",
    project_type: "Кальян-бар / lounge",
    message:
      "Наурызбайский район. Адрес: ул. Акбокен, 7. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: В открытом источнике есть только адрес; контакты и график нужно подтвердить.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-18",
    created_at: "2026-09-13T00:00:00Z",
    name: "Borjomi",
    contact: "Контакт не найден",
    company: "Borjomi",
    city: "Алматы",
    project_type: "Лаунж-бар / ресторан с караоке",
    message:
      "Наурызбайский район. Адрес: ул. Даулеткерея, 69, мкр. Акжар. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: В справочнике нет телефона и часов работы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-19",
    created_at: "2026-09-13T00:00:00Z",
    name: "AlmaHills",
    contact: "Контакт не найден",
    company: "AlmaHills",
    city: "Алматы",
    project_type: "Ресторан / secret & speakeasy bar",
    message:
      "Наурызбайский район. Адрес: мкр. Галамат, 1288/3. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Формат интересный, но нет контактов и сайта в найденной карточке.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-20",
    created_at: "2026-09-13T00:00:00Z",
    name: "The Farabi Terrace",
    contact: "+7 (701) 022-25-25",
    company: "The Farabi Terrace",
    city: "Алматы",
    project_type: "Рестобар",
    message:
      "Наурызбайский район. Адрес: Наурызбайский район, Алматы, 050070. Часы: ежедневно 11:00–02:00. Статус проверки: Требует проверки. Приоритет: Высокий. Что проверить: Есть телефон и часы, но найдено в объявлении о продаже бизнеса; статус собственника нужно уточнить.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-21",
    created_at: "2026-09-13T00:00:00Z",
    name: "Nali_Vali",
    contact: "Instagram: @nali_vali",
    company: "Nali_Vali",
    city: "Алматы",
    project_type: "Пивной магазин / бар",
    message:
      "Наурызбайский район. Адрес: ул. Береке, 4, мкр. Акжар. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Контакт найден через Instagram; формат и актуальность карточки нужно подтвердить.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-22",
    created_at: "2026-09-13T00:00:00Z",
    name: "Волна",
    contact: "Контакт не найден",
    company: "Волна",
    city: "Алматы",
    project_type: "Магазин пива / барный формат",
    message:
      "Наурызбайский район. Адрес: ул. Московская, 21, мкр. Тастыбулак. Рейтинг: 3.0 / 1 оценка. Статус проверки: Требует проверки. Приоритет: Низкий рейтинг и мало отзывов; требует проверки позиционирования.. Что проверить: Мини-сайт с ассортиментом, отзывами, акциями и удобным контактом.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-23",
    created_at: "2026-09-13T00:00:00Z",
    name: "Рюмки Мира на Шаляпина",
    contact: "Контакт не найден",
    company: "Рюмки Мира на Шаляпина",
    city: "Алматы",
    project_type: "Винный бар / ресторан",
    message:
      "Ауэзовский район. Адрес: ул. Шаляпина, Ауэзовский район, Алматы. Часы: Требует проверки. Рейтинг: Не найден отдельный филиал в районе. Статус проверки: Сайт с меню, бронью и винной картой. Приоритет: 2GIS",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-24",
    created_at: "2026-09-13T00:00:00Z",
    name: "Трактиръ Медведь",
    contact: "Instagram: 4.4",
    company: "Трактиръ Медведь",
    city: "Алматы",
    project_type: "Бар-ресторан",
    message:
      "Ауэзовский район. Адрес: ул. Щепеткова, 137. Часы: Требует проверки. Рейтинг: Оставить одну запись; филиалы не добавлять. Статус проверки: Сайт с меню, бронью, картой и отзывами. Приоритет: Zoon",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-25",
    created_at: "2026-09-13T00:00:00Z",
    name: "Sport Bar Action",
    contact: "Instagram: 3.0",
    company: "Sport Bar Action",
    city: "Алматы",
    project_type: "Спорт-бар",
    message:
      "Ауэзовский район. Адрес: Ауэзовский район, Алматы. Часы: Требует проверки. Рейтинг: Проверить, нет ли одноимённых филиалов. Статус проверки: Сайт с трансляциями, афишей и бронированием. Приоритет: Zoon",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-26",
    created_at: "2026-09-13T00:00:00Z",
    name: "Конопус",
    contact: "Контакт не найден",
    company: "Конопус",
    city: "Алматы",
    project_type: "Развлекательный комплекс / бар",
    message:
      "Ауэзовский район. Адрес: мкр. 10А, Ауэзовский район. Часы: Требует проверки. Рейтинг: Оставить один объект, не дублировать по залам. Статус проверки: Сайт с мероприятиями, меню и контактами. Приоритет: BLIZKO",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-27",
    created_at: "2026-09-13T00:00:00Z",
    name: "Микрофон",
    contact: "Контакт не найден",
    company: "Микрофон",
    city: "Алматы",
    project_type: "Танцевальный караоке-бар",
    message:
      "Ауэзовский район. Адрес: ул. Сатпаева, Ауэзовский район. Часы: Требует проверки. Рейтинг: Проверить совпадение названий и адресов. Статус проверки: Сайт с залами, бронью и афишей. Приоритет: BLIZKO",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-28",
    created_at: "2026-09-13T00:00:00Z",
    name: "P & P",
    contact: "Контакт не найден",
    company: "P & P",
    city: "Алматы",
    project_type: "Караоке-бар",
    message:
      "Ауэзовский район. Адрес: ул. Розыбакиева, Ауэзовский район. Часы: Требует проверки. Рейтинг: Оставить одну запись, не считать зал отдельным бизнесом. Статус проверки: Сайт с меню, фото и бронированием. Приоритет: BLIZKO",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-29",
    created_at: "2026-09-13T00:00:00Z",
    name: "Rich Pub",
    contact: "Контакт не найден",
    company: "Rich Pub",
    city: "Алматы",
    project_type: "Паб",
    message:
      "Ауэзовский район. Адрес: Ауэзовский район, Алматы. Часы: Требует проверки. Рейтинг: Проверить филиалы по названию Rich Pub. Статус проверки: Сайт с меню, событиями и картой. Приоритет: BLIZKO",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-30",
    created_at: "2026-09-13T00:00:00Z",
    name: "Coffee BOOM",
    contact: "Контакт не найден",
    company: "Coffee BOOM",
    city: "Алматы",
    project_type: "Кофейня / барный формат",
    message:
      "Ауэзовский район. Адрес: Ауэзовский район, Алматы. Часы: Исключить из баров. Рейтинг: Сеть; объединить с базой кофеен, не создавать отдельную запись бара. Статус проверки: Не добавлять в эту базу; оставить в категории «Кофейни». Приоритет: Предыдущая база Tafa Lab",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-31",
    created_at: "2026-09-13T00:00:00Z",
    name: "Marrone Rosso",
    contact: "Контакт не найден",
    company: "Marrone Rosso",
    city: "Алматы",
    project_type: "Кофейня / ресторанный формат",
    message:
      "Ауэзовский район. Адрес: Ауэзовский район, Алматы. Часы: Исключить из баров. Рейтинг: Сеть; филиалы объединены в базе кофеен. Статус проверки: Не добавлять повторно в бары. Приоритет: Предыдущая база Tafa Lab",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-32",
    created_at: "2026-09-13T00:00:00Z",
    name: "Kulikov",
    contact: "Контакт не найден",
    company: "Kulikov",
    city: "Алматы",
    project_type: "Кондитерская / кофейня",
    message:
      "Ауэзовский район. Адрес: Ауэзовский район, Алматы. Часы: Исключить из баров. Рейтинг: Сеть из 61 филиала; не добавлять филиалы отдельно. Статус проверки: Оставить в кондитерских/кофейнях одной строкой. Приоритет: Предыдущая база Tafa Lab",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-33",
    created_at: "2026-09-13T00:00:00Z",
    name: "Тәп-Тәтті",
    contact: "Контакт не найден",
    company: "Тәп-Тәтті",
    city: "Алматы",
    project_type: "Кондитерская / кофейня",
    message:
      "Ауэзовский район. Адрес: Ауэзовский район, Алматы. Часы: Исключить из баров. Рейтинг: Сеть из 9 филиалов; не дублировать. Статус проверки: Оставить в кондитерских одной строкой. Приоритет: Предыдущая база Tafa Lab",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-34",
    created_at: "2026-09-13T00:00:00Z",
    name: "Crave cafe",
    contact: "Контакт не найден",
    company: "Crave cafe",
    city: "Алматы",
    project_type: "Кафе",
    message:
      "Ауэзовский район. Адрес: Ауэзовский район, Алматы. Часы: Исключить дубли. Рейтинг: 2 филиала объединить в одну запись. Статус проверки: Оставить одну карточку в категории кафе. Приоритет: Предыдущая база Tafa Lab",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-35",
    created_at: "2026-09-13T00:00:00Z",
    name: "QRestoBar",
    contact: "+7 (708) 565-90-00",
    company: "QRestoBar",
    city: "Алматы",
    project_type: "Кафе / бар",
    message:
      "Алатауский район. Адрес: ул. Каратоган, 3, мкр. Акбулак, Алматы. Статус проверки: Требует проверки. Приоритет: Высокий. Что проверить: Нет полной презентации в найденной карточке.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-36",
    created_at: "2026-09-13T00:00:00Z",
    name: "Дом пива Kwak",
    contact: "+7 (708) 585-80-00",
    company: "Дом пива Kwak",
    city: "Алматы",
    project_type: "Пивной бар",
    message:
      "Алатауский район. Адрес: ул. Касыма Шарипова, 78/2, мкр. Акбулак, Алматы. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет сайта и полноценного каталога.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-37",
    created_at: "2026-09-13T00:00:00Z",
    name: "Pegas",
    contact: "+7 (747) 600-15-00",
    company: "Pegas",
    city: "Алматы",
    project_type: "Бар / пивной бар",
    message:
      "Алатауский район. Адрес: ул. Хиуаз Доспановой, 24/1, Алматы. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нужна проверка формата и актуальных контактов.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-38",
    created_at: "2026-09-13T00:00:00Z",
    name: "Bar-on",
    contact: "+7 (701) 613-33-00",
    company: "Bar-on",
    city: "Алматы",
    project_type: "Пивной бар / паб",
    message:
      "Алатауский район. Адрес: ул. Ахметова, 40, мкр. Дархан, Алматы. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет сайта в карточке.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-39",
    created_at: "2026-09-13T00:00:00Z",
    name: "Lebis",
    contact: "+7 (707) 666-25-00",
    company: "Lebis",
    city: "Алматы",
    project_type: "Бар / ночной формат",
    message:
      "Алатауский район. Адрес: Шоссейная ул., 9, Алматы. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Мало открытой информации о заведении.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-40",
    created_at: "2026-09-13T00:00:00Z",
    name: "Лазурит",
    contact: "Контакт не найден",
    company: "Лазурит",
    city: "Алматы",
    project_type: "Бар",
    message:
      "Алатауский район. Адрес: Мостовая ул., 66, мкр. Карасу, Алматы. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет телефона и графика в источнике.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-41",
    created_at: "2026-09-13T00:00:00Z",
    name: "Центр шашлыка",
    contact: "Контакт не найден",
    company: "Центр шашлыка",
    city: "Алматы",
    project_type: "Гриль-бар / пивной бар",
    message:
      "Алатауский район. Адрес: ул. Балбулак, 23А, мкр. Айгерим-2, Алматы. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет сайта и телефона в карточке.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-42",
    created_at: "2026-09-13T00:00:00Z",
    name: "Бочка",
    contact: "+7 (747) 438-02-00",
    company: "Бочка",
    city: "Алматы",
    project_type: "Бар / магазин пива",
    message:
      "Алатауский район. Адрес: ул. Наби, 157, мкр. Айгерим-1, Алматы. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет полноценного онлайн-каталога.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-43",
    created_at: "2026-09-13T00:00:00Z",
    name: "Караоке-клуб",
    contact: "Контакт не найден",
    company: "Караоке-клуб",
    city: "Алматы",
    project_type: "Караоке-бар",
    message:
      "Алатауский район. Адрес: ул. Хан Шатыр, 291, мкр. Акбулак, Алматы. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Общее название, нет бренда и контактов.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-44",
    created_at: "2026-09-13T00:00:00Z",
    name: "Бар / Grand Magistral lounge bar",
    contact: "Контакт не найден",
    company: "Бар / Grand Magistral lounge bar",
    city: "Алматы",
    project_type: "Лаундж-бар",
    message:
      "Алатауский район. Адрес: Бурундайская ул., 65, мкр. Карасу, Алматы. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Две карточки по одному адресу объединены в одну запись.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-45",
    created_at: "2026-09-13T00:00:00Z",
    name: "Мята Lounge",
    contact: "Контакт не найден",
    company: "Мята Lounge",
    city: "Алматы",
    project_type: "Лаундж-бар / пивной бар",
    message:
      "Алатауский район. Адрес: ул. Махамбета Утемисова, 67, мкр. Шанырак-1, Алматы. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет телефона и сайта в найденном источнике.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-46",
    created_at: "2026-09-13T00:00:00Z",
    name: "Алишер",
    contact: "+7 (702) 352-07-00",
    company: "Алишер",
    city: "Алматы",
    project_type: "Бар",
    message:
      "Алатауский район. Адрес: ул. Орталык, 6Б, мкр. Теректы, Алматы. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет сайта и рейтинга в источнике.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-47",
    created_at: "2026-09-13T00:00:00Z",
    name: "Carla",
    contact: "Контакт не найден",
    company: "Carla",
    city: "Алматы",
    project_type: "Пивной бар",
    message:
      "Алатауский район. Адрес: ул. Жанкожа батыра, 91, мкр. Шанырак-2, Алматы. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Карточку магазина разливного пива по тому же адресу объединить.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-48",
    created_at: "2026-09-13T00:00:00Z",
    name: "Бояулы",
    contact: "Контакт не найден",
    company: "Бояулы",
    city: "Алматы",
    project_type: "Бар",
    message:
      "Алатауский район. Адрес: ул. Жалантос Бахадур, 126, мкр. Шанырак-2, Алматы. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет телефона, сайта и графика.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-49",
    created_at: "2026-09-13T00:00:00Z",
    name: "Жабдыктары",
    contact: "Контакт не найден",
    company: "Жабдыктары",
    city: "Алматы",
    project_type: "Бар",
    message:
      "Алатауский район. Адрес: просп. Турара Рыскулова, 143В, Алматы. Статус проверки: Требует проверки. Приоритет: Низкий. Что проверить: Название и формат требуют дополнительной проверки.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-50",
    created_at: "2026-09-13T00:00:00Z",
    name: "ЛяПасижу",
    contact: "+7 (701) 019-50-50",
    company: "ЛяПасижу",
    city: "Алматы",
    project_type: "Бар / ресторан",
    message:
      "Алмалинский район. Адрес: просп. Сакена Сейфуллина, 520. Часы: ежедневно 15:00–04:00. Рейтинг: 3.61 / 66 оценок. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Информация частично устарела; нужен современный сайт.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-51",
    created_at: "2026-09-13T00:00:00Z",
    name: "Arena Pub",
    contact: "Контакт не найден",
    company: "Arena Pub",
    city: "Алматы",
    project_type: "Паб / винный бар",
    message:
      "Алмалинский район. Адрес: ул. Жамбыла, 154. Статус проверки: Требует проверки. Приоритет: Высокий. Что проверить: В источниках встречаются разные адреса; нужно подтвердить актуальный.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-52",
    created_at: "2026-09-13T00:00:00Z",
    name: "Backroom",
    contact: "welcome@backroom.kz · Instagram: @backroomalmaty",
    company: "Backroom",
    city: "Алматы",
    project_type: "Бар",
    message:
      "Алмалинский район. Адрес: ул. Шевченко, 100. Часы: вт–чт 17:00–01:00; пт–сб 17:00–04:00. Рейтинг: 5.0 / 1 оценка. Статус проверки: Требует проверки. Приоритет: Высокий. Что проверить: Карточка старая; проверить, работает ли заведение сейчас.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-53",
    created_at: "2026-09-13T00:00:00Z",
    name: "Bar Francesca",
    contact: "Контакт не найден",
    company: "Bar Francesca",
    city: "Алматы",
    project_type: "Винный бар",
    message:
      "Алмалинский район. Адрес: ул. Кабанбай батыра. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет точного номера дома и контактов в найденной карточке.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-54",
    created_at: "2026-09-13T00:00:00Z",
    name: "The Bar",
    contact: "Контакт не найден",
    company: "The Bar",
    city: "Алматы",
    project_type: "Крафтовый бар",
    message:
      "Алмалинский район. Адрес: Алмалинский район, Алматы. Статус проверки: Требует проверки. Приоритет: Высокий. Что проверить: Нужны точный адрес, телефон и статус работы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-55",
    created_at: "2026-09-13T00:00:00Z",
    name: "Колобродъ",
    contact: "+7 (705) 813-00-00",
    company: "Колобродъ",
    city: "Алматы",
    project_type: "Рюмочная / бар",
    message:
      "Алмалинский район. Адрес: ул. Желтоксан, 126. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Телефон в источнике отображается не полностью; нужно подтвердить.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-56",
    created_at: "2026-09-13T00:00:00Z",
    name: "Hm",
    contact: "Контакт не найден",
    company: "Hm",
    city: "Алматы",
    project_type: "Лаундж-бар",
    message:
      "Алмалинский район. Адрес: ул. Жамбыла, 133. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет подтверждённых контактов и соцсетей.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-57",
    created_at: "2026-09-13T00:00:00Z",
    name: "Totem bar",
    contact: "Контакт не найден",
    company: "Totem bar",
    city: "Алматы",
    project_type: "Лаундж-бар",
    message:
      "Алмалинский район. Адрес: ул. Жамбыла, 154. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Возможное совпадение по адресу с Arena Pub/старой карточкой; проверить отдельно.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-58",
    created_at: "2026-09-13T00:00:00Z",
    name: "Бездаты бар",
    contact: "Контакт не найден",
    company: "Бездаты бар",
    city: "Алматы",
    project_type: "Бар",
    message:
      "Алмалинский район. Адрес: ул. Шевченко, 100. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Совпадает адрес с Backroom; проверить, отдельный ли это бизнес или старая карточка.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-59",
    created_at: "2026-09-13T00:00:00Z",
    name: "Чирз",
    contact: "Контакт не найден",
    company: "Чирз",
    city: "Алматы",
    project_type: "Бар",
    message:
      "Алмалинский район. Адрес: ул. Шевченко, 100. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Три барные карточки по одному адресу требуют проверки на общий объект.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-60",
    created_at: "2026-09-13T00:00:00Z",
    name: "Munchen",
    contact: "Контакт не найден",
    company: "Munchen",
    city: "Алматы",
    project_type: "Пивной бар",
    message:
      "Алмалинский район. Адрес: просп. Сакена Сейфуллина, 526. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет актуальных контактов в найденном источнике.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-61",
    created_at: "2026-09-13T00:00:00Z",
    name: "Chechil",
    contact: "Контакт не найден",
    company: "Chechil",
    city: "Алматы",
    project_type: "Пивной бар / паб",
    message:
      "Бостандыкский район. Адрес: Бостандыкский район, Алматы. Часы: нужно уточнить. Рейтинг: 5.0 / 2000 оценок. Статус проверки: Требует проверки. Приоритет: Высокий. Что проверить: В каталоге указано несколько адресов; выбранный филиал в районе нужно подтвердить.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-62",
    created_at: "2026-09-13T00:00:00Z",
    name: "Сухой закон",
    contact: "Контакт не найден",
    company: "Сухой закон",
    city: "Алматы",
    project_type: "Бар / паб",
    message:
      "Бостандыкский район. Адрес: ул. Ауэзова, 104А. Рейтинг: 5.0 / 1278 оценок. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Проверить актуальность контактов и режима работы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-63",
    created_at: "2026-09-13T00:00:00Z",
    name: "Line Brew",
    contact: "Контакт не найден",
    company: "Line Brew",
    city: "Алматы",
    project_type: "Пивной ресторан / бар",
    message:
      "Бостандыкский район. Адрес: Бостандыкский район, Алматы. Часы: нужно уточнить. Рейтинг: 5.0 / 1149 оценок. Статус проверки: Требует проверки. Приоритет: Высокий. Что проверить: Сетевой бренд: не дублировать филиалы, уточнить конкретную точку района.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-64",
    created_at: "2026-09-13T00:00:00Z",
    name: "LikBeer",
    contact: "Контакт не найден",
    company: "LikBeer",
    city: "Алматы",
    project_type: "Пивной бар",
    message:
      "Бостандыкский район. Адрес: бульвар Бухар Жырау, 27/5А. Рейтинг: 5.0 / 1093 оценок. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Проверить актуальные часы и контакты.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-65",
    created_at: "2026-09-13T00:00:00Z",
    name: "Janym Soul",
    contact: "Контакт не найден",
    company: "Janym Soul",
    city: "Алматы",
    project_type: "Бар",
    message:
      "Бостандыкский район. Адрес: ул. Жандосова, 58/1. Рейтинг: 5.0 / 734 оценки. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Нужны актуальные контакты и соцсети.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-66",
    created_at: "2026-09-13T00:00:00Z",
    name: "Harat’s pub",
    contact: "Контакт не найден",
    company: "Harat’s pub",
    city: "Алматы",
    project_type: "Ирландский паб",
    message:
      "Бостандыкский район. Адрес: просп. Аль-Фараби, 7, корп. 5А. Рейтинг: 5.0 / 421 оценка. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Проверить актуальность режима работы и контактов.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-67",
    created_at: "2026-09-13T00:00:00Z",
    name: "Tangiers Lounge",
    contact: "Контакт не найден",
    company: "Tangiers Lounge",
    city: "Алматы",
    project_type: "Лаундж-бар",
    message:
      "Бостандыкский район. Адрес: ул. Каныша Сатпаева, 30/7. Рейтинг: 5.0 / 397 оценок. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Уточнить актуальные соцсети и канал бронирования.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-68",
    created_at: "2026-09-13T00:00:00Z",
    name: "Victory Pub",
    contact: "Контакт не найден",
    company: "Victory Pub",
    city: "Алматы",
    project_type: "Паб",
    message:
      "Бостандыкский район. Адрес: ул. Абдуллы Розыбакиева, 238. Рейтинг: 5.0 / 329 оценок. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Проверить контакты и наличие актуальной афиши.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-69",
    created_at: "2026-09-13T00:00:00Z",
    name: "SteakMaster",
    contact: "Контакт не найден",
    company: "SteakMaster",
    city: "Алматы",
    project_type: "Ресторан-бар",
    message:
      "Бостандыкский район. Адрес: просп. Юрия Гагарина, 206В. Рейтинг: 5.0 / 294 оценки. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Основной формат — ресторан; оставить только при наличии полноценной барной зоны.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-70",
    created_at: "2026-09-13T00:00:00Z",
    name: "Рыба моей мечты",
    contact: "Контакт не найден",
    company: "Рыба моей мечты",
    city: "Алматы",
    project_type: "Ресторан-бар / караоке",
    message:
      "Бостандыкский район. Адрес: ул. Айманова, 124. Рейтинг: 5.0 / 269 оценок. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Проверить, соответствует ли объект критериям отдельного бара.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-71",
    created_at: "2026-09-13T00:00:00Z",
    name: "Friends",
    contact: "Контакт не найден",
    company: "Friends",
    city: "Алматы",
    project_type: "Паб",
    message:
      "Бостандыкский район. Адрес: просп. Сакена Сейфуллина, 617. Рейтинг: 4.9 / 877 оценок. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Проверить актуальность контактов и графика.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-72",
    created_at: "2026-09-13T00:00:00Z",
    name: "Бочонок",
    contact: "Контакт не найден",
    company: "Бочонок",
    city: "Алматы",
    project_type: "Пивной бар",
    message:
      "Бостандыкский район. Адрес: Бостандыкский район, Алматы. Часы: нужно уточнить. Рейтинг: 4.9 / 469 оценок. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Сетевой бренд и 2 адреса в каталоге; не дублировать филиалы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-73",
    created_at: "2026-09-13T00:00:00Z",
    name: "Woodman Grill & Bar",
    contact: "Контакт не найден",
    company: "Woodman Grill & Bar",
    city: "Алматы",
    project_type: "Гриль-бар",
    message:
      "Бостандыкский район. Адрес: ул. Абдуллы Розыбакиева, 272. Рейтинг: 4.9 / 284 оценки. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Проверить актуальные контакты и соцсети.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-74",
    created_at: "2026-09-13T00:00:00Z",
    name: "HookahPlace",
    contact: "Контакт не найден",
    company: "HookahPlace",
    city: "Алматы",
    project_type: "Кальян-бар",
    message:
      "Бостандыкский район. Адрес: просп. Аль-Фараби, 41/6. Рейтинг: 4.9 / 170 оценок. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Не смешивать с обычными барами при дальнейшей сегментации.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-75",
    created_at: "2026-09-13T00:00:00Z",
    name: "Ne Gorchit",
    contact: "Контакт не найден",
    company: "Ne Gorchit",
    city: "Алматы",
    project_type: "Крафтовый бар",
    message:
      "Бостандыкский район. Адрес: Бостандыкский район, Алматы. Часы: нужно уточнить. Рейтинг: 5.0 / 51 оценка. Статус проверки: Требует проверки. Приоритет: Высокий. Что проверить: В каталоге несколько адресов; подтвердить филиал и актуальность.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-76",
    created_at: "2026-09-13T00:00:00Z",
    name: "Kavkaz Bar",
    contact: "Контакт не найден",
    company: "Kavkaz Bar",
    city: "Алматы",
    project_type: "Бар / ресторан",
    message:
      "Бостандыкский район. Адрес: бульвар Бухар Жырау, 66. Рейтинг: 4.9 / 159 оценок. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Проверить актуальность контактов и формата.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-77",
    created_at: "2026-09-13T00:00:00Z",
    name: "Шишка Premium",
    contact: "Контакт не найден",
    company: "Шишка Premium",
    city: "Алматы",
    project_type: "Лаундж-бар",
    message:
      "Бостандыкский район. Адрес: ул. Сергея Маркова, 61/2. Рейтинг: 4.9 / 67 оценок. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Проверить, не относится ли карточка к другому филиалу.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-78",
    created_at: "2026-09-13T00:00:00Z",
    name: "Мимино",
    contact: "Контакт не найден",
    company: "Мимино",
    city: "Алматы",
    project_type: "Ресторан-бар",
    message:
      "Бостандыкский район. Адрес: мкр. Орбита-1, 6. Рейтинг: 4.8 / 703 оценки. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Основной формат — ресторан; оставить в барной базе только после проверки.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-79",
    created_at: "2026-09-13T00:00:00Z",
    name: "Art house",
    contact: "Контакт не найден",
    company: "Art house",
    city: "Алматы",
    project_type: "Крафтовый бар / паб",
    message:
      "Бостандыкский район. Адрес: просп. Абая, 150/230, блок 7. Рейтинг: 4.8 / 216 оценок. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Проверить актуальные контакты и часы работы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-80",
    created_at: "2026-09-13T00:00:00Z",
    name: "Harvey’s",
    contact: "Контакт не найден",
    company: "Harvey’s",
    city: "Алматы",
    project_type: "Бар / ресторан",
    message:
      "Бостандыкский район. Адрес: просп. Назарбаева, 223. Рейтинг: не указано. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нужны актуальные рейтинг, контакты и подтверждение формата.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-81",
    created_at: "2026-09-13T00:00:00Z",
    name: "WL13Bar",
    contact: "Контакт не найден",
    company: "WL13Bar",
    city: "Алматы",
    project_type: "Крафтовый бар",
    message:
      "Медеуский район. Адрес: ул. Богенбай батыра, 102. Рейтинг: 5.0 / 1280 оценок. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Проверить актуальные контакты и часы работы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-82",
    created_at: "2026-09-13T00:00:00Z",
    name: "Fuller’s Pub Pheasant Feather",
    contact: "Контакт не найден",
    company: "Fuller’s Pub Pheasant Feather",
    city: "Алматы",
    project_type: "Ирландский паб",
    message:
      "Медеуский район. Адрес: просп. Достык, 116. Рейтинг: 5.0 / 497 оценок. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Проверить актуальность контактов и режима работы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-83",
    created_at: "2026-09-13T00:00:00Z",
    name: "Victory Mexican & Wild",
    contact: "Контакт не найден",
    company: "Victory Mexican & Wild",
    city: "Алматы",
    project_type: "Паб / бар",
    message:
      "Медеуский район. Адрес: ул. Богенбай батыра, 79. Рейтинг: 5.0 / 729 оценок. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Проверить актуальные контакты и формат кухни.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-84",
    created_at: "2026-09-13T00:00:00Z",
    name: "Грузинский двор",
    contact: "Контакт не найден",
    company: "Грузинский двор",
    city: "Алматы",
    project_type: "Ресторан-бар",
    message:
      "Медеуский район. Адрес: ул. Кабанбай батыра, 8. Рейтинг: 5.0 / 381 оценка. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Основной формат может быть рестораном; оставить в базе баров после проверки барной зоны.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-85",
    created_at: "2026-09-13T00:00:00Z",
    name: "Dickens",
    contact: "Контакт не найден",
    company: "Dickens",
    city: "Алматы",
    project_type: "Английский паб",
    message:
      "Медеуский район. Адрес: ул. Шевченко, 11. Рейтинг: 5.0 / 370 оценок. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Проверить актуальные контакты и часы работы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-86",
    created_at: "2026-09-13T00:00:00Z",
    name: "Hoper’s",
    contact: "Контакт не найден",
    company: "Hoper’s",
    city: "Алматы",
    project_type: "Пивной бар / паб",
    message:
      "Медеуский район. Адрес: просп. Жибек Жолы, 68. Рейтинг: 5.0 / 330 оценок. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Проверить контакты и актуальную афишу.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-87",
    created_at: "2026-09-13T00:00:00Z",
    name: "Dragonfly Izakaya",
    contact: "Контакт не найден",
    company: "Dragonfly Izakaya",
    city: "Алматы",
    project_type: "Ресторан-бар",
    message:
      "Медеуский район. Адрес: ул. Шокана Уалиханова, 170. Рейтинг: 5.0 / 280 оценок. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Основной формат — ресторан; проверить, нужен ли в отдельной базе баров.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-88",
    created_at: "2026-09-13T00:00:00Z",
    name: "Барик",
    contact: "Контакт не найден",
    company: "Барик",
    city: "Алматы",
    project_type: "Пивной паб",
    message:
      "Медеуский район. Адрес: Медеуский район, Алматы. Часы: нужно уточнить. Рейтинг: 4.5 / 92 оценки. Статус проверки: Требует проверки. Приоритет: Высокий. Что проверить: В каталоге указано 2 адреса; объединить филиалы и подтвердить точку района.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-89",
    created_at: "2026-09-13T00:00:00Z",
    name: "French 42",
    contact: "Контакт не найден",
    company: "French 42",
    city: "Алматы",
    project_type: "Винный бар",
    message:
      "Медеуский район. Адрес: ул. Мукана Тулебаева, 107. Рейтинг: 5.0 / 120 оценок. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Проверить актуальные контакты и режим работы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-90",
    created_at: "2026-09-13T00:00:00Z",
    name: "Rojo",
    contact: "Контакт не найден",
    company: "Rojo",
    city: "Алматы",
    project_type: "Бар / ресторан",
    message:
      "Медеуский район. Адрес: мкр. Самал-1, 4. Рейтинг: 5.0 / 80 оценок. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Проверить формат и актуальные контакты.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-91",
    created_at: "2026-09-13T00:00:00Z",
    name: "Guinness Pub",
    contact: "Контакт не найден",
    company: "Guinness Pub",
    city: "Алматы",
    project_type: "Ирландский паб",
    message:
      "Медеуский район. Адрес: просп. Достык, 71. Рейтинг: 4.9 / 1372 оценки. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Проверить актуальные контакты и часы работы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-92",
    created_at: "2026-09-13T00:00:00Z",
    name: "Barmaglot",
    contact: "Контакт не найден",
    company: "Barmaglot",
    city: "Алматы",
    project_type: "Паб / бар",
    message:
      "Медеуский район. Адрес: ул. Шокана Уалиханова, 170. Рейтинг: 4.9 / 1349 оценок. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Карточку Barmaglot Pop up не добавлять отдельно: вероятный временный формат/дубль бренда.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-93",
    created_at: "2026-09-13T00:00:00Z",
    name: "Noodles",
    contact: "Контакт не найден",
    company: "Noodles",
    city: "Алматы",
    project_type: "Ресторан-бар",
    message:
      "Медеуский район. Адрес: просп. Достык, 52/2. Рейтинг: 4.9 / 1104 оценки. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Основной формат может быть рестораном; включать в барную базу только при подтверждении барной концепции.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-94",
    created_at: "2026-09-13T00:00:00Z",
    name: "Танцы",
    contact: "Контакт не найден",
    company: "Танцы",
    city: "Алматы",
    project_type: "Бар / клуб",
    message:
      "Медеуский район. Адрес: ул. Гоголя, 73. Рейтинг: 4.9 / 623 оценки. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Проверить актуальность афиши и контактов.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-95",
    created_at: "2026-09-13T00:00:00Z",
    name: "Red Beer",
    contact: "Контакт не найден",
    company: "Red Beer",
    city: "Алматы",
    project_type: "Пивной бар",
    message:
      "Медеуский район. Адрес: ул. Толе би, 45/91. Рейтинг: 5.0 / 69 оценок. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Нужны актуальные контакты и режим работы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-96",
    created_at: "2026-09-13T00:00:00Z",
    name: "Yard House",
    contact: "Контакт не найден",
    company: "Yard House",
    city: "Алматы",
    project_type: "Винный бар / ресторан",
    message:
      "Медеуский район. Адрес: мкр. Самал-1, 2Б. Рейтинг: 4.9 / 421 оценка. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Проверить, является ли самостоятельным баром или рестораном с винной картой.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-97",
    created_at: "2026-09-13T00:00:00Z",
    name: "D. O. M.",
    contact: "Контакт не найден",
    company: "D. O. M.",
    city: "Алматы",
    project_type: "Ресторан-бар",
    message:
      "Медеуский район. Адрес: ул. Кармысова, 58. Рейтинг: 5.0 / 62 оценки. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Основной формат может быть рестораном; подтвердить наличие полноценного бара.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-98",
    created_at: "2026-09-13T00:00:00Z",
    name: "Winehub",
    contact: "Контакт не найден",
    company: "Winehub",
    city: "Алматы",
    project_type: "Винный бар / школа",
    message:
      "Медеуский район. Адрес: ул. Бузурбаева, 4Б, блок 2. Рейтинг: 5.0 / 60 оценок. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Проверить актуальный формат и контакты.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-99",
    created_at: "2026-09-13T00:00:00Z",
    name: "New Bisquit",
    contact: "Контакт не найден",
    company: "New Bisquit",
    city: "Алматы",
    project_type: "Кафе-бар",
    message:
      "Медеуский район. Адрес: ул. Шевченко, 18. Рейтинг: 4.9 / 320 оценок. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Кафе-бар; оставить только если нужен широкий формат баров, а не только кафе.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-100",
    created_at: "2026-09-13T00:00:00Z",
    name: "Шишка Lounge",
    contact: "Контакт не найден",
    company: "Шишка Lounge",
    city: "Алматы",
    project_type: "Лаундж-бар",
    message:
      "Медеуский район. Адрес: просп. Жибек Жолы, 66. Рейтинг: 4.9 / 293 оценки. Статус проверки: Подтверждено. Приоритет: Средний. Что проверить: Не дублировать с другими карточками бренда «Шишка»; проверить актуальность филиала.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-101",
    created_at: "2026-09-13T00:00:00Z",
    name: "Justo Lounge Bar",
    contact: "Контакт не найден",
    company: "Justo Lounge Bar",
    city: "Алматы",
    project_type: "Лаундж-бар / караоке",
    message:
      "Медеуский район. Адрес: просп. Достык, 291/23. Рейтинг: 4.33 / 3 оценки. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Небольшое число отзывов; проверить фактическую работу и контакты.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-102",
    created_at: "2026-09-13T00:00:00Z",
    name: "Bar Akobama",
    contact: "Контакт не найден",
    company: "Bar Akobama",
    city: "Алматы",
    project_type: "Бар / кафе",
    message:
      "Медеуский район. Адрес: просп. Абая, 17. Рейтинг: нужно уточнить. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Проверить актуальность карточки и формат заведения.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-103",
    created_at: "2026-09-13T00:00:00Z",
    name: "Bastau",
    contact: "Контакт не найден",
    company: "Bastau",
    city: "Алматы",
    project_type: "Бар",
    message:
      "Медеуский район. Адрес: ул. Курмангазы, 36. Рейтинг: нужно уточнить. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Проверить актуальные контакты и статус работы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-104",
    created_at: "2026-09-13T00:00:00Z",
    name: "Boss",
    contact: "Контакт не найден",
    company: "Boss",
    city: "Алматы",
    project_type: "Бар",
    message:
      "Медеуский район. Адрес: просп. Назарбаева, 76. Рейтинг: нужно уточнить. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Проверить актуальность карточки и режима работы.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-105",
    created_at: "2026-09-13T00:00:00Z",
    name: "Gagarin bar",
    contact: "Контакт не найден",
    company: "Gagarin bar",
    city: "Алматы",
    project_type: "Бар / фаст-фуд",
    message:
      "Медеуский район. Адрес: ул. Богенбай батыра, 128. Рейтинг: нужно уточнить. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Проверить актуальные контакты и соответствие критериям бара.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-106",
    created_at: "2026-09-13T00:00:00Z",
    name: "The Банка Bar",
    contact: "Контакт не найден",
    company: "The Банка Bar",
    city: "Алматы",
    project_type: "Бар / паб",
    message:
      "Турксибский район. Адрес: ул. Михаила Шолохова, 8. Рейтинг: 5.0 / 1273 оценки. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Сетевой бренд: не добавлять филиалы отдельно, проверить актуальность точки.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-107",
    created_at: "2026-09-13T00:00:00Z",
    name: "Casablanka",
    contact: "Контакт не найден",
    company: "Casablanka",
    city: "Алматы",
    project_type: "Ресторан-бар / караоке",
    message:
      "Турксибский район. Адрес: ул. Акан Серы, 85. Рейтинг: 4.5 / 401 оценка. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Основной формат — ресторан и караоке; оставить в базе баров после подтверждения барной зоны.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-108",
    created_at: "2026-09-13T00:00:00Z",
    name: "Badyan",
    contact: "Контакт не найден",
    company: "Badyan",
    city: "Алматы",
    project_type: "Ресторан-бар",
    message:
      "Турксибский район. Адрес: ул. Акан Серы, 93/1. Рейтинг: 4.3 / 92 оценки. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Проверить актуальный формат и наличие полноценного бара.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-109",
    created_at: "2026-09-13T00:00:00Z",
    name: "Parohod",
    contact: "Контакт не найден",
    company: "Parohod",
    city: "Алматы",
    project_type: "Бар / ресторан",
    message:
      "Турксибский район. Адрес: ул. Шолохова, 8. Рейтинг: нужно уточнить. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Проверить, не совпадает ли объект/адрес с другой карточкой в здании, и уточнить статус.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-110",
    created_at: "2026-09-13T00:00:00Z",
    name: "Под небом Ushuaia",
    contact: "Контакт не найден",
    company: "Под небом Ushuaia",
    city: "Алматы",
    project_type: "Сезонный бар",
    message:
      "Турксибский район. Адрес: Турксибский район, Алматы. Часы: нужно уточнить. Рейтинг: нужно уточнить. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет точного адреса и рейтинга; вероятно сезонный или событийный формат.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-111",
    created_at: "2026-09-13T00:00:00Z",
    name: "Тот самый бар на воде",
    contact: "Контакт не найден",
    company: "Тот самый бар на воде",
    city: "Алматы",
    project_type: "Бар на воде / сезонный",
    message:
      "Турксибский район. Адрес: Турксибский район, Алматы. Часы: нужно уточнить. Рейтинг: нужно уточнить. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нет точного адреса; подтвердить, что объект работает в текущем сезоне.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-112",
    created_at: "2026-09-13T00:00:00Z",
    name: "Пивнарь",
    contact: "+7 (777) 776-69-99; +7 (701) 711-93-29; +7 (777) 017-70-99",
    company: "Пивнарь",
    city: "Алматы",
    project_type: "Пивной бар / магазин разливного пива",
    message:
      "Турксибский район. Адрес: ул. Ивана Земнухова, 31. Часы: пн–чт 11:00–23:00; нужно уточнить. Рейтинг: нужно уточнить. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Категория также указана как магазин разливного пива; проверить формат посадки и бара.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-113",
    created_at: "2026-09-13T00:00:00Z",
    name: "Brand Bar",
    contact: "Instagram: @brandbar.almaty",
    company: "Brand Bar",
    city: "Алматы",
    project_type: "Бар",
    message:
      "Жетысуский район. Адрес: ул. Ильяса Жансугурова, 122. Часы: ежедневно 16:00–05:00. Рейтинг: 4.1 / 18 оценок. Статус проверки: Подтверждено. Приоритет: Высокий. Что проверить: Проверить актуальные контакты и меню.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-114",
    created_at: "2026-09-13T00:00:00Z",
    name: "MimoNot",
    contact: "Instagram: @karaokebar_mimonot",
    company: "MimoNot",
    city: "Алматы",
    project_type: "Караоке-бар",
    message:
      "Жетысуский район. Адрес: ул. Ратушного, 78Б. Часы: чт–сб 18:00–03:00. Рейтинг: нужно уточнить. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Карточка и публикации старые; проверить, работает ли заведение сейчас.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-115",
    created_at: "2026-09-13T00:00:00Z",
    name: "667",
    contact: "Контакт не найден",
    company: "667",
    city: "Алматы",
    project_type: "Винный бар / кальянный формат",
    message:
      "Жетысуский район. Адрес: ул. Венеры, 7. Часы: ежедневно 12:00–03:00. Рейтинг: нужно уточнить. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: В источнике одновременно указан формат винотеки и кальянного места; подтвердить самостоятельный бар.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
  {
    id: "almaty-bar-116",
    created_at: "2026-09-13T00:00:00Z",
    name: "Nash club",
    contact: "Контакт не найден",
    company: "Nash club",
    city: "Алматы",
    project_type: "Бар / клуб",
    message:
      "Жетысуский район. Адрес: просп. Суюнбая, 153. Часы: нужно уточнить. Рейтинг: нужно уточнить. Статус проверки: Требует проверки. Приоритет: Средний. Что проверить: Нужно подтвердить актуальность, контакты и формат заведения.",
    locale: "ru",
    source_path: "Бары Алматы",
    status: "new",
    admin_notes: null,
  },
];
const statusStyles: Record<LeadStatus, string> = {
  draft: "bg-[#f4ead7] text-[#76552d]",
  new: "bg-[#f0ebe5] text-[#5b4a3f]",
  contacted: "bg-[#e8eef6] text-[#35465a]",
  in_progress: "bg-[#eee8f6] text-[#4e3c62]",
  won: "bg-[#e6f1e8] text-[#35503a]",
  lost: "bg-[#f5e6e5] text-[#663f3c]",
  dead: "bg-[#e5e5e5] text-[#555555]",
  not_profitable: "bg-[#fff0d9] text-[#805b20]",
};
const defaultTemplates: MessageTemplate[] = [
  {
    id: "primary",
    name: "Первое обращение",
    text: "Здравствуйте, {{name}}! Меня зовут Алифа, я представляю Tafa Lab. Я изучила {{company}} и подготовила идеи, которые могут помочь вашему бизнесу. Могу отправить варианты сайта и рассказать подробнее.",
  },
  {
    id: "followup",
    name: "Повторное сообщение",
    text: "Здравствуйте, {{name}}! Возвращаюсь к нашему предложению по проекту. Готова показать варианты сайта и ответить на вопросы.",
  },
  {
    id: "proposal",
    name: "Отправка предложения",
    text: "Здравствуйте, {{name}}! Отправляю подготовленное предложение для {{company}}. Если появятся вопросы, с удовольствием отвечу.",
  },
];
const CRM_CATEGORY_OPTIONS = [
  "Кофейня",
  "Ресторан",
  "Бар",
  "Кондитерская",
  "Пекарня",
  "Кейтеринг",
  "Салон красоты",
  "SPA",
  "Косметология",
  "Барбершоп",
  "Отель",
  "Цветочный магазин",
  "Магазин",
  "Туризм",
  "Образование",
  "Медицина",
  "Фитнес",
  "Развлечения",
  "Другое",
];
const PLANNER_EMOJIS = [
  "",
  "😊",
  "💼",
  "📞",
  "📧",
  "🏋️",
  "🛒",
  "📚",
  "💡",
  "✈️",
  "🎯",
  "❤️",
];
const isCrmId = (id: string) =>
  id.startsWith("kaskelen-") ||
  id.startsWith("taldykorgan-") ||
  id.startsWith("almaty-") ||
  id.startsWith("nyc-beauty-") ||
  id.startsWith("nyc-restaurant-") ||
  id.startsWith("nyc-bakery-coffee-");
const nycBeautyLowProfitabilityNames = new Set([
  "sally beauty",
  "ulta beauty",
  "sally beauty nails spa",
  "drybar",
]);
const isSeededBakery = (lead: Lead) =>
  !lead.id.startsWith("kaskelen-manual-") &&
  (lead.id.startsWith("kaskelen-") || lead.id.startsWith("taldykorgan-"));
function categoryValues(value?: string) {
  return Array.from(
    new Set(
      (value || "")
        .split(/[,;|]/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}
function leadCategories(lead: Lead, meta?: CrmMeta) {
  const saved = categoryValues(meta?.category);
  if (saved.length) return saved;
  if (lead.category) return categoryValues(lead.category);
  if (lead.id.startsWith("almaty-bar-")) {
    const format = (lead.project_type || "").toLowerCase(),
      values = ["Бар"];
    if (/ресторан|кафе|гастробар/.test(format)) values.push("Ресторан");
    if (/караоке/.test(format)) values.push("Развлечения");
    if (/лаундж|smoke|кальян/.test(format)) values.push("Лаундж");
    return values;
  }
  if (!isSeededBakery(lead)) return [];
  return lead.name.trim().toLowerCase() === "fika"
    ? ["Кондитерская", "Ресторан"]
    : ["Кондитерская"];
}
function toggleCategory(value: string, category: string) {
  const selected = categoryValues(value);
  return (
    selected.includes(category)
      ? selected.filter((item) => item !== category)
      : [...selected, category]
  ).join(", ");
}
function interactionTimeline(meta?: CrmMeta) {
  const interactions = meta?.interactions || [],
    seen = new Set(
      interactions.map((item) => `${item.created_at}|${item.text}`),
    );
  const legacy = (meta?.history || [])
    .filter((item) => !seen.has(`${item.created_at}|${item.text}`))
    .map((item, index): InteractionEntry => ({
      id: `legacy-note-${item.created_at}-${index}`,
      channel: "note",
      text: item.text,
      created_at: item.created_at,
    }));
  return [...interactions, ...legacy].sort(
    (a, b) => +new Date(b.created_at) - +new Date(a.created_at),
  );
}
function interactionLabel(channel: InteractionChannel, locale: "ru" | "en") {
  const labels =
    locale === "ru"
      ? {
          whatsapp: "WhatsApp",
          email: "Email",
          instagram: "Instagram",
          facebook: "Facebook",
          note: "Заметка",
          status: "Изменение статуса",
        }
      : {
          whatsapp: "WhatsApp",
          email: "Email",
          instagram: "Instagram",
          facebook: "Facebook",
          note: "Note",
          status: "Status change",
        };
  return labels[channel];
}
const CRM_SYNC_KEY = "stk_admin_crm_state",
  ATTACHMENTS_KEY = "stk-admin-attachments";
const emptySettings = (): CrmSettings => ({ templates: defaultTemplates });
function localDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function plannerTaskOccursOn(task: PlannerTask, dateKey: string) {
  if (dateKey < task.date) return false;
  const repeat = task.repeat || "none";
  if (repeat === "none") return dateKey === task.date;
  const current = new Date(`${dateKey}T12:00:00`),
    start = new Date(`${task.date}T12:00:00`);
  if (repeat === "daily") return true;
  if (repeat === "weekly") return current.getDay() === start.getDay();
  if (repeat === "monthly") return current.getDate() === start.getDate();
  return (
    current.getMonth() === start.getMonth() &&
    current.getDate() === start.getDate()
  );
}
function plannerTaskCompletedOn(task: PlannerTask, dateKey: string) {
  return task.repeat && task.repeat !== "none"
    ? Boolean(task.completed_dates?.includes(dateKey))
    : task.completed;
}
function readLocalCrmState(): CrmSyncState {
  const parse = <T,>(key: string, fallback: T): T => {
    try {
      return JSON.parse(localStorage.getItem(key) || "") as T;
    } catch {
      return fallback;
    }
  };
  return {
    meta: parse("stk-admin-crm-meta", {} as Record<string, CrmMeta>),
    manual: parse("stk-admin-manual-crm", [] as Lead[]),
    deleted: parse("stk-admin-deleted-crm", [] as string[]),
    settings: parse("stk-admin-crm-settings", emptySettings()),
    planner: parse("stk-admin-planner", [] as PlannerTask[]),
    customCities: parse("stk-admin-custom-cities", {} as CustomCities),
    activity: parse("stk-admin-crm-activity", [] as CrmActivity[]),
  };
}
function writeLocalCrmState(state: CrmSyncState) {
  localStorage.setItem("stk-admin-crm-meta", JSON.stringify(state.meta));
  localStorage.setItem("stk-admin-manual-crm", JSON.stringify(state.manual));
  localStorage.setItem("stk-admin-deleted-crm", JSON.stringify(state.deleted));
  localStorage.setItem(
    "stk-admin-crm-settings",
    JSON.stringify(state.settings || emptySettings()),
  );
  localStorage.setItem(
    "stk-admin-planner",
    JSON.stringify(state.planner || []),
  );
  localStorage.setItem(
    "stk-admin-custom-cities",
    JSON.stringify(state.customCities || {}),
  );
  localStorage.setItem(
    "stk-admin-crm-activity",
    JSON.stringify(state.activity || []),
  );
}
function readAttachments(): Record<string, StoredAttachment[]> {
  try {
    return JSON.parse(localStorage.getItem(ATTACHMENTS_KEY) || "{}") as Record<
      string,
      StoredAttachment[]
    >;
  } catch {
    return {};
  }
}
function writeAttachments(value: Record<string, StoredAttachment[]>) {
  localStorage.setItem(ATTACHMENTS_KEY, JSON.stringify(value));
}
function crmStateScore(state: CrmSyncState) {
  return (
    state.deleted.length * 10 +
    state.manual.length * 10 +
    Object.values(state.meta).reduce(
      (n, item) =>
        n +
        2 +
        (item.status && item.status !== "new" ? 4 : 0) +
        (item.reminder_at ? 3 : 0) +
        (item.history?.length || 0) +
        (item.interactions?.length || 0),
      0,
    ) +
    Object.values(state.customCities || {}).reduce(
      (n, cities) => n + cities.length,
      0,
    ) +
    (state.activity?.length || 0)
  );
}
function mergeCrmActivity(...lists: (CrmActivity[] | undefined)[]) {
  const merged = new Map<string, CrmActivity>();
  lists
    .flatMap((items) => items || [])
    .forEach((item) => merged.set(item.id, item));
  return Array.from(merged.values())
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
    .slice(0, 10000);
}
function createCrmActivity(
  type: CrmActivityType,
  lead?: Pick<Lead, "id" | "name"> | null,
  details?: string,
  statuses?: { from_status?: LeadStatus; to_status?: LeadStatus },
): CrmActivity {
  const created_at = new Date().toISOString();
  return {
    id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    created_at,
    lead_id: lead?.id,
    lead_name: lead?.name,
    details,
    ...statuses,
  };
}
function reportPeriodStart(period: ReportPeriod) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  if (period === "week")
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  if (period === "month") start.setDate(1);
  if (period === "half_year") start.setMonth(start.getMonth() - 6);
  if (period === "year") {
    start.setMonth(0);
    start.setDate(1);
  }
  return start;
}
function mergeCustomCities(...directories: (CustomCities | undefined)[]) {
  const merged: CustomCities = {};
  directories.forEach((directory) =>
    Object.entries(directory || {}).forEach(([country, cities]) => {
      merged[country] = Array.from(
        new Set([
          ...(merged[country] || []),
          ...cities.map((city) => city.trim()).filter(Boolean),
        ]),
      );
    }),
  );
  return merged;
}
function mergeCrmStates(
  local: CrmSyncState,
  remote: CrmSyncState,
): CrmSyncState {
  const [primary, secondary] =
    crmStateScore(local) >= crmStateScore(remote)
      ? [local, remote]
      : [remote, local];
  const manual = new Map<string, Lead>();
  [...secondary.manual, ...primary.manual].forEach((lead) =>
    manual.set(lead.id, lead),
  );
  const planner = new Map<string, PlannerTask>();
  [...(secondary.planner || []), ...(primary.planner || [])].forEach((task) =>
    planner.set(task.id, task),
  );
  return {
    meta: { ...secondary.meta, ...primary.meta },
    manual: Array.from(manual.values()),
    deleted: Array.from(new Set([...secondary.deleted, ...primary.deleted])),
    settings: primary.settings || secondary.settings || emptySettings(),
    planner: Array.from(planner.values()),
    customCities: mergeCustomCities(
      secondary.customCities,
      primary.customCities,
    ),
    activity: mergeCrmActivity(secondary.activity, primary.activity),
    synced_at: primary.synced_at || secondary.synced_at,
  };
}
function normalizeContact(value: string) {
  return value.toLowerCase().replace(/[\s()\-+]/g, "");
}
function contactFields(contact: string) {
  const phone =
    contact.match(/(?:Телефон:\s*)?(\+?\d[\d\s()\-/]{6,})/)?.[1]?.trim() || "";
  const instagram = contact.match(/Instagram:\s*([^·]+)/i)?.[1]?.trim() || "";
  const email =
    contact.match(/(?:Email|E-mail):\s*([^·]+)/i)?.[1]?.trim() ||
    contact.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0] ||
    "";
  const website =
    contact.match(/(?:Сайт|Website):\s*([^·]+)/i)?.[1]?.trim() || "";
  const facebook = contact.match(/Facebook:\s*([^·]+)/i)?.[1]?.trim() || "";
  return { phone, instagram, facebook, email, website };
}
function splitStoredValues(value: string) {
  return value
    .split(/\s+\/\s+|\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}
function contactValues(
  contact: string,
  label: "Телефон" | "Email" | "Instagram" | "Facebook" | "Сайт",
) {
  const value = contact
    .match(new RegExp(label + "\\s*:\\s*([^·]+)", "i"))?.[1]
    ?.trim();
  if (value) return splitStoredValues(value);
  const fields = contactFields(contact),
    fallback =
      label === "Телефон"
        ? fields.phone
        : label === "Email"
          ? fields.email
          : label === "Instagram"
            ? fields.instagram
            : label === "Facebook"
              ? fields.facebook
              : fields.website;
  return fallback ? splitStoredValues(fallback) : [];
}
function renderTemplate(value: string, lead: Lead) {
  const variables: Record<string, string> = {
    name: lead.name || "",
    company: lead.company || lead.name || "",
    city: lead.city || "",
    project: lead.project_type || "",
  };
  return value.replace(
    /\{\{\s*(name|company|city|project)\s*\}\}/gi,
    (_, key: string) => variables[key.toLowerCase()] || "",
  );
}
function buildFollowupMessage(lead: Lead, locale: "ru" | "en") {
  return locale === "ru"
    ? `Здравствуйте, ${lead.name}! Возвращаюсь к нашему предложению по проекту. Готова показать варианты сайта и ответить на вопросы.`
    : `Hello, ${lead.name}! I’m following up on our project proposal. I can show you the website options and answer any questions.`;
}
function buildPrimaryMessage(lead: Lead, locale: "ru" | "en") {
  return locale === "ru"
    ? `Здравствуйте, ${lead.name}! Меня зовут Алифа, я представляю Tafa Lab. Я изучила ${lead.company || lead.name} и подготовила идеи, которые могут помочь вашему бизнесу. Могу отправить варианты сайта и рассказать подробнее.`
    : `Hello, ${lead.name}! My name is Alifa and I represent Tafa Lab. I reviewed ${lead.company || lead.name} and prepared a few ideas that could help your business. I can send you website options and tell you more.`;
}
function reminderDate(meta?: CrmMeta) {
  return meta?.reminder_at
    ? `${meta.reminder_at}T${meta.reminder_time || "23:59"}`
    : "";
}
function reminderTone(meta?: CrmMeta) {
  const value = reminderDate(meta);
  if (!value) return "";
  const now = new Date(),
    due = new Date(value),
    today = now.toISOString().slice(0, 10);
  if (due.getTime() < now.getTime()) return "border-red-300 bg-red-50";
  if (meta?.reminder_at === today) return "border-amber-300 bg-amber-50";
  return "";
}
const KNOWN_KAZAKHSTAN_CITIES = DEFAULT_CITIES_BY_COUNTRY["Казахстан"];
function leadCountry(lead: Lead, meta?: CrmMeta) {
  return (
    meta?.country?.trim() ||
    lead.country?.trim() ||
    (lead.city && KNOWN_KAZAKHSTAN_CITIES.includes(lead.city.trim())
      ? "Казахстан"
      : "")
  );
}
function leadCity(lead: Lead, meta?: CrmMeta) {
  return meta?.city?.trim() || lead.city?.trim() || "";
}
function countryLabel(country: string, locale: "ru" | "en") {
  if (locale === "ru") return country === "США" ? "США (Америка)" : country;
  return (
    CRM_LOCATION_DIRECTORY.find((item) => item.country === country)?.en ||
    country
  );
}
function leadTimeZone(lead: Lead, meta?: CrmMeta) {
  const city = (meta?.city || lead.city || "").trim().toLowerCase(),
    country = (leadCountry(lead, meta) || "").trim().toLowerCase();
  if (/алматы|almaty|каскелен|kaskelen|талдыкорган|taldykorgan/.test(city))
    return { zone: "Asia/Almaty", label: "Алматы" };
  if (/нью[- ]?йорк|new york/.test(city))
    return { zone: "America/New_York", label: "Нью‑Йорк" };
  if (/лос[- ]?анджелес|los angeles/.test(city))
    return { zone: "America/Los_Angeles", label: "Лос‑Анджелес" };
  if (/прага|prague/.test(city))
    return { zone: "Europe/Prague", label: "Прага" };
  if (/дананг|da nang|хо ши мин|ho chi minh/.test(city))
    return { zone: "Asia/Ho_Chi_Minh", label: "Вьетнам" };
  if (/казахстан|kazakhstan/.test(country))
    return { zone: "Asia/Almaty", label: "Казахстан" };
  if (/сша|usa|united states/.test(country))
    return { zone: "America/New_York", label: "США" };
  return null;
}
function normalizeProfitability(value: string): LeadProfitability | null {
  const normalized = value.trim().toLowerCase();
  if (["high", "высокая", "высокий"].includes(normalized)) return "high";
  if (["medium", "средняя", "средний"].includes(normalized)) return "medium";
  if (["low", "низкая", "низкий"].includes(normalized)) return "low";
  return null;
}
function csvValue(value: unknown) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}
function parseCsvLine(line: string, separator: string) {
  const cells: string[] = [];
  let current = "",
    quoted = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' && quoted && line[i + 1] === '"') {
      current += '"';
      i++;
    } else if (char === '"') quoted = !quoted;
    else if (char === separator && !quoted) {
      cells.push(current.trim());
      current = "";
    } else current += char;
  }
  cells.push(current.trim());
  return cells;
}
function downloadText(name: string, value: string) {
  const blob = new Blob(["\ufeff", value], { type: "text/csv;charset=utf-8" }),
    url = URL.createObjectURL(blob),
    anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}
async function persistCrmState(state: CrmSyncState, accessToken = "") {
  // Never put the CRM database into Supabase user metadata: it is embedded in
  // the JWT and eventually makes the Authorization header too large for Vercel.
  writeLocalCrmState({ ...state, synced_at: new Date().toISOString() });
  if (!accessToken) return "";
  try {
    const response = await fetch("/api/stk-lab/crm-sync", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ state }),
      cache: "no-store",
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      return payload?.error || `sync_${response.status}`;
    }
    return "";
  } catch {
    return "sync_unavailable";
  }
}

function CitySelect({
  country,
  value,
  cities,
  locale,
  onChange,
  onAdd,
  className = "",
}: {
  country: string;
  value: string;
  cities: string[];
  locale: "ru" | "en";
  onChange: (value: string) => void;
  onAdd: (country: string, city: string) => void;
  className?: string;
}) {
  const [adding, setAdding] = useState(false),
    [cityName, setCityName] = useState("");
  const add = () => {
    const city = cityName.trim();
    if (!country || !city) return;
    const savedCity =
      cities.find(
        (value) =>
          value.localeCompare(city, locale, { sensitivity: "accent" }) === 0,
      ) || city;
    onAdd(country, savedCity);
    onChange(savedCity);
    setCityName("");
    setAdding(false);
  };
  return (
    <div className={className}>
      <select
        value={value}
        disabled={!country}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-black/10 bg-white px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">
          {country
            ? locale === "ru"
              ? "Выберите город"
              : "Select city"
            : locale === "ru"
              ? "Сначала выберите страну"
              : "Select a country first"}
        </option>
        {value && !cities.includes(value) && (
          <option value={value}>{value}</option>
        )}
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={!country}
        onClick={() => setAdding((value) => !value)}
        className="mt-2 text-xs font-medium underline decoration-black/25 underline-offset-4 disabled:cursor-not-allowed disabled:opacity-40"
      >
        + {locale === "ru" ? "Добавить город" : "Add city"}
      </button>
      {adding && (
        <div className="mt-2 flex gap-2">
          <input
            value={cityName}
            onChange={(event) => setCityName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                add();
              }
            }}
            autoFocus
            placeholder={locale === "ru" ? "Название города" : "City name"}
            className="min-w-0 flex-1 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={add}
            disabled={!cityName.trim()}
            className="rounded-xl bg-[#211a17] px-3 py-2 text-xs text-white disabled:opacity-40"
          >
            {locale === "ru" ? "Добавить" : "Add"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function StkAdminPage() {
  const pathname = usePathname(),
    locale: "ru" | "en" = pathname.startsWith("/en") ? "en" : "ru",
    t = text[locale];
  const metadataCleanupStarted = useRef(false);
  type Section =
    | "requests"
    | "crm"
    | "reminders"
    | "kanban"
    | "analytics"
    | "reports"
    | "templates"
    | "planner";
  const [user, setUser] = useState<User | null>(null),
    [accessToken, setAccessToken] = useState(""),
    [ready, setReady] = useState(false),
    [leads, setLeads] = useState<Lead[]>([]),
    [loading, setLoading] = useState(false);
  const [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [selectedId, setSelectedId] = useState<string | null>(null),
    [section, setSection] = useState<Section>("requests");
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission>(() =>
      typeof Notification === "undefined" ? "denied" : Notification.permission,
    );
  const [crmMeta, setCrmMeta] = useState<Record<string, CrmMeta>>({}),
    [settings, setSettings] = useState<CrmSettings>(emptySettings()),
    [customCities, setCustomCities] = useState<CustomCities>({}),
    [activity, setActivity] = useState<CrmActivity[]>([]),
    [reportPeriod, setReportPeriod] = useState<ReportPeriod>("day");
  const [filter, setFilter] = useState<LeadFilter>("all"),
    [query, setQuery] = useState(""),
    [sort, setSort] = useState<SortMode>("newest");
  const [categoryFilter, setCategoryFilter] = useState(""),
    [sourceFilter, setSourceFilter] = useState(""),
    [temperatureFilter, setTemperatureFilter] = useState(""),
    [profitabilityFilter, setProfitabilityFilter] = useState(""),
    [tagFilter, setTagFilter] = useState(""),
    [countryFilter, setCountryFilter] = useState(""),
    [cityFilter, setCityFilter] = useState("");
  const [adding, setAdding] = useState(false),
    [saving, setSaving] = useState(false),
    [saved, setSaved] = useState(false),
    [deleting, setDeleting] = useState(false),
    [copied, setCopied] = useState(false);
  const [draftStatus, setDraftStatus] = useState<LeadStatus>("new"),
    [draftNotes, setDraftNotes] = useState(""),
    [draftReminder, setDraftReminder] = useState(""),
    [draftReminderTime, setDraftReminderTime] = useState("");
  const [draftPhones, setDraftPhones] = useState<string[]>([""]),
    [draftInstagrams, setDraftInstagrams] = useState<string[]>([""]),
    [draftFacebooks, setDraftFacebooks] = useState<string[]>([""]),
    [draftEmails, setDraftEmails] = useState<string[]>([""]),
    [draftWebsites, setDraftWebsites] = useState<string[]>([""]);
  const [draftPrimaryMessage, setDraftPrimaryMessage] = useState(""),
    [draftFollowupMessage, setDraftFollowupMessage] = useState(""),
    [draftCountry, setDraftCountry] = useState(""),
    [draftCity, setDraftCity] = useState(""),
    [draftCompany, setDraftCompany] = useState("");
  const [draftCategory, setDraftCategory] = useState(""),
    [draftTags, setDraftTags] = useState(""),
    [draftSource, setDraftSource] = useState(""),
    [draftTemperature, setDraftTemperature] = useState<LeadTemperature>("cold"),
    [draftProfitability, setDraftProfitability] = useState<
      LeadProfitability | ""
    >("");
  const [newTemplate, setNewTemplate] = useState({ name: "", text: "" });
  const [plannerTasks, setPlannerTasks] = useState<PlannerTask[]>([]),
    [plannerDate, setPlannerDate] = useState(localDateKey()),
    [plannerMonth, setPlannerMonth] = useState(() => new Date()),
    [plannerInput, setPlannerInput] = useState(""),
    [plannerRepeat, setPlannerRepeat] = useState<PlannerRepeat>("none"),
    [plannerEmoji, setPlannerEmoji] = useState(""),
    [plannerTime, setPlannerTime] = useState(""),
    [plannerReminderTime, setPlannerReminderTime] = useState("");
  const emptyNewLead = {
    name: "",
    phone: "",
    instagram: "",
    facebook: "",
    email: "",
    company: "",
    country: "",
    city: "",
    project_type: "",
    message: "",
    reminder_at: "",
    reminder_time: "",
    category: "",
    tags: "",
    source: "",
    profitability: "",
  };
  const [newLead, setNewLead] = useState(emptyNewLead);

  useEffect(() => {
    let active = true;
    const local = readLocalCrmState();
    setCrmMeta(local.meta);
    setSettings(local.settings || emptySettings());
    setPlannerTasks(local.planner || []);
    setCustomCities(local.customCities || {});
    setActivity(local.activity || []);
    const fallback = window.setTimeout(() => {
      if (active) setReady(true);
    }, 5000);
    void sb.auth
      .getSession()
      .then(async ({ data }) => {
        let session = data.session;
        // Remove the old oversized CRM snapshot from user metadata. The data is
        // already preserved in local CRM storage; this only makes future JWTs
        // small enough for the Vercel request headers.
        if (
          data.session?.user?.user_metadata?.[CRM_SYNC_KEY] &&
          !metadataCleanupStarted.current
        ) {
          metadataCleanupStarted.current = true;
          await sb.auth
            .updateUser({ data: { [CRM_SYNC_KEY]: null } })
            .catch(() => {});
          await sb.auth.refreshSession().catch(() => {});
          session = (await sb.auth.getSession()).data.session;
        }
        if (active) {
          setUser(session?.user ?? null);
          setAccessToken(session?.access_token ?? "");
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) {
          window.clearTimeout(fallback);
          setReady(true);
        }
      });
    const { data } = sb.auth.onAuthStateChange((_event, session) => {
      if (active) {
        setUser(session?.user ?? null);
        setAccessToken(session?.access_token ?? "");
        setReady(true);
      }
    });
    return () => {
      active = false;
      window.clearTimeout(fallback);
      data.subscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    // Start loading as soon as Supabase has restored the authenticated session.
    // A zero-delay timer could be lost during a fast auth-state transition,
    // leaving the requests inbox empty without ever hitting the API.
    if (user && accessToken) {
      void load();
      return;
    }
    if (!user) {
      setLeads([]);
      setSelectedId(null);
    }
  }, [user, accessToken]);

  const crmLeads = useMemo(() => leads.filter((x) => isCrmId(x.id)), [leads]);
  useEffect(() => {
    if (
      notificationPermission !== "granted" ||
      typeof Notification === "undefined"
    )
      return;
    const check = () => {
      const now = new Date(),
        today = localDateKey(now),
        notified = new Set<string>();
      try {
        JSON.parse(localStorage.getItem("stk-admin-notified") || "[]").forEach(
          (key: string) => notified.add(key),
        );
      } catch {}
      const mark = (key: string, title: string, body: string) => {
        if (notified.has(key)) return;
        notified.add(key);
        new Notification(title, { body, tag: key });
      };
      crmLeads.forEach((lead) => {
        const meta = crmMeta[lead.id],
          due = reminderDate(meta);
        if (!due) return;
        const dueDate = new Date(due);
        if (
          dueDate.getTime() <= now.getTime() &&
          now.getTime() - dueDate.getTime() < 24 * 60 * 60 * 1000
        )
          mark(
            `crm:${lead.id}:${due}`,
            locale === "ru" ? "CRM: время связаться" : "CRM: follow-up due",
            lead.name,
          );
      });
      plannerTasks.forEach((task) => {
        if (
          !task.reminder_time ||
          !plannerTaskOccursOn(task, today) ||
          plannerTaskCompletedOn(task, today)
        )
          return;
        const due = new Date(`${today}T${task.reminder_time}:00`);
        if (
          due.getTime() <= now.getTime() &&
          now.getTime() - due.getTime() < 24 * 60 * 60 * 1000
        )
          mark(
            `planner:${task.id}:${today}:${task.reminder_time}`,
            locale === "ru" ? "Планер Tafa Lab" : "Tafa Lab planner",
            `${task.emoji || "📌"} ${task.text}`,
          );
      });
      localStorage.setItem(
        "stk-admin-notified",
        JSON.stringify(Array.from(notified).slice(-1000)),
      );
    };
    check();
    const timer = window.setInterval(check, 30000);
    return () => window.clearInterval(timer);
  }, [notificationPermission, crmLeads, crmMeta, plannerTasks, locale]);
  const categoryOptions = CRM_CATEGORY_OPTIONS;
  const sourceOptions = useMemo(
    () =>
      Array.from(
        new Set(
          crmLeads
            .map((x) => crmMeta[x.id]?.source || x.source_path || "")
            .filter(Boolean),
        ),
      ).sort(),
    [crmLeads, crmMeta],
  );
  const tagOptions = useMemo(
    () =>
      Array.from(
        new Set(crmLeads.flatMap((x) => crmMeta[x.id]?.tags || [])),
      ).sort(),
    [crmLeads, crmMeta],
  );
  const countryOptions = useMemo(
    () =>
      Array.from(
        new Set([
          ...CRM_LOCATION_DIRECTORY.map((item) => item.country),
          ...leads.map((x) => leadCountry(x, crmMeta[x.id])).filter(Boolean),
        ]),
      ).sort((a, b) =>
        countryLabel(a, locale).localeCompare(countryLabel(b, locale), locale),
      ),
    [leads, crmMeta, locale],
  );
  const citiesByCountry = useMemo(() => {
    const result = mergeCustomCities(DEFAULT_CITIES_BY_COUNTRY, customCities);
    leads.forEach((lead) => {
      const country = leadCountry(lead, crmMeta[lead.id]),
        city = leadCity(lead, crmMeta[lead.id]);
      if (country && city)
        result[country] = Array.from(
          new Set([...(result[country] || []), city]),
        );
    });
    Object.keys(result).forEach((country) =>
      result[country].sort((a, b) => a.localeCompare(b, locale)),
    );
    return result;
  }, [customCities, leads, crmMeta, locale]);
  const cityOptions = countryFilter ? citiesByCountry[countryFilter] || [] : [];
  const newLeadCityOptions = newLead.country
    ? citiesByCountry[newLead.country] || []
    : [];
  const draftCityOptions = draftCountry
    ? citiesByCountry[draftCountry] || []
    : [];
  const duplicateMatches = useMemo(() => {
    const values = [newLead.phone, newLead.instagram, newLead.email]
      .map(normalizeContact)
      .filter(Boolean);
    return values.length
      ? leads
          .filter((x) => {
            const existing = normalizeContact(x.contact);
            return values.some((v) => v.length >= 4 && existing.includes(v));
          })
          .slice(0, 3)
      : [];
  }, [leads, newLead.phone, newLead.instagram, newLead.email]);
  const visibleLeads = useMemo(() => {
    const q = query.trim().toLowerCase(),
      sourceLeads =
        section === "requests" ? leads.filter((x) => !isCrmId(x.id)) : crmLeads;
    let rows =
      filter === "all"
        ? [...sourceLeads]
        : sourceLeads.filter((x) => x.status === filter);
    if (section === "reminders")
      rows = rows.filter((x) => Boolean(crmMeta[x.id]?.reminder_at));
    if (categoryFilter)
      rows = rows.filter((x) =>
        leadCategories(x, crmMeta[x.id]).includes(categoryFilter),
      );
    if (sourceFilter)
      rows = rows.filter(
        (x) => (crmMeta[x.id]?.source || x.source_path || "") === sourceFilter,
      );
    if (temperatureFilter)
      rows = rows.filter(
        (x) => (crmMeta[x.id]?.temperature || "cold") === temperatureFilter,
      );
    if (profitabilityFilter)
      rows = rows.filter(
        (x) => (crmMeta[x.id]?.profitability || "") === profitabilityFilter,
      );
    if (tagFilter)
      rows = rows.filter((x) =>
        (crmMeta[x.id]?.tags || []).includes(tagFilter),
      );
    if (countryFilter)
      rows = rows.filter(
        (x) => leadCountry(x, crmMeta[x.id]) === countryFilter,
      );
    if (cityFilter)
      rows = rows.filter((x) => leadCity(x, crmMeta[x.id]) === cityFilter);
    if (q)
      rows = rows.filter((x) => {
        const meta = crmMeta[x.id];
        return [
          x.name,
          x.contact,
          x.company,
          leadCountry(x, meta),
          leadCity(x, meta),
          x.project_type,
          x.message,
          x.admin_notes,
          x.source_path,
          leadCategories(x, meta).join(" "),
          meta?.source,
          (meta?.tags || []).join(" "),
          (meta?.interactions || []).map((i) => i.text).join(" "),
        ].some((v) => (v || "").toLowerCase().includes(q));
      });
    rows.sort((a, b) =>
      section === "reminders"
        ? reminderDate(crmMeta[a.id]).localeCompare(reminderDate(crmMeta[b.id]))
        : sort === "oldest"
          ? +new Date(a.created_at) - +new Date(b.created_at)
          : sort === "name"
            ? a.name.localeCompare(b.name, locale)
            : +new Date(b.created_at) - +new Date(a.created_at),
    );
    return rows;
  }, [
    leads,
    crmLeads,
    filter,
    query,
    sort,
    locale,
    section,
    crmMeta,
    categoryFilter,
    sourceFilter,
    temperatureFilter,
    profitabilityFilter,
    tagFilter,
    countryFilter,
    cityFilter,
  ]);
  const counts = useMemo(() => {
    const scoped =
        section === "requests" ? leads.filter((x) => !isCrmId(x.id)) : crmLeads,
      result: Record<LeadFilter, number> = {
        all: scoped.length,
        new: 0,
        draft: 0,
        contacted: 0,
        in_progress: 0,
        won: 0,
        lost: 0,
        dead: 0,
        not_profitable: 0,
      };
    scoped.forEach((x) => result[x.status]++);
    return result;
  }, [leads, crmLeads, section]);
  const analytics = useMemo(() => {
    const total = crmLeads.length,
      contacted = crmLeads.filter((x) =>
        ["contacted", "in_progress", "won", "lost"].includes(x.status),
      ).length,
      won = crmLeads.filter((x) => x.status === "won").length;
    const overdue = crmLeads.filter(
      (x) =>
        reminderDate(crmMeta[x.id]) &&
        new Date(reminderDate(crmMeta[x.id])).getTime() < Date.now(),
    ).length;
    const group = (getter: (lead: Lead) => string) =>
      Object.entries(
        crmLeads.reduce<Record<string, number>>((acc, lead) => {
          const key = getter(lead) || "Не указано";
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {}),
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);
    const categoryCounts = Object.entries(
      crmLeads.reduce<Record<string, number>>((acc, lead) => {
        const values = leadCategories(lead, crmMeta[lead.id]);
        (values.length ? values : ["Не указано"]).forEach(
          (value) => (acc[value] = (acc[value] || 0) + 1),
        );
        return acc;
      }, {}),
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    return {
      total,
      contacted,
      won,
      overdue,
      conversion: total ? Math.round((won / total) * 100) : 0,
      sources: group((x) => crmMeta[x.id]?.source || x.source_path || ""),
      categories: categoryCounts,
    };
  }, [crmLeads, crmMeta]);
  const reportActivity = useMemo(() => {
    const start = reportPeriodStart(reportPeriod).getTime();
    return activity.filter((item) => +new Date(item.created_at) >= start);
  }, [activity, reportPeriod]);
  const reportCounts = useMemo(
    () => ({
      total: reportActivity.length,
      created: reportActivity.filter((item) =>
        ["lead_created", "lead_imported"].includes(item.type),
      ).length,
      statuses: reportActivity.filter((item) => item.type === "status_changed")
        .length,
      contacts: reportActivity.filter((item) => item.type === "interaction")
        .length,
      updates: reportActivity.filter((item) =>
        [
          "lead_updated",
          "attachment_added",
          "attachment_removed",
          "city_added",
          "template_updated",
          "planner_updated",
        ].includes(item.type),
      ).length,
      deleted: reportActivity.filter((item) => item.type === "lead_deleted")
        .length,
    }),
    [reportActivity],
  );
  const reportStatusCounts = useMemo(() => {
    const result = {
      new: 0,
      draft: 0,
      contacted: 0,
      in_progress: 0,
      won: 0,
      lost: 0,
      dead: 0,
      not_profitable: 0,
    } satisfies Record<LeadStatus, number>;
    reportActivity.forEach((item) => {
      if (item.type === "status_changed" && item.to_status)
        result[item.to_status] += 1;
    });
    return result;
  }, [reportActivity]);
  const activityTitle = (item: CrmActivity) => {
    const labels: Record<CrmActivityType, [string, string]> = {
      lead_created: ["Добавлена запись", "Record added"],
      lead_imported: ["Импортированы записи", "Records imported"],
      lead_updated: ["Изменена карточка", "Record updated"],
      status_changed: ["Изменён статус", "Status changed"],
      lead_deleted: ["Удалена запись", "Record deleted"],
      interaction: ["Связались с клиентом", "Client contacted"],
      attachment_added: ["Добавлен файл", "File added"],
      attachment_removed: ["Удалён файл", "File removed"],
      city_added: ["Добавлен город", "City added"],
      template_updated: ["Изменены шаблоны", "Templates updated"],
      planner_updated: ["Изменён планер", "Planner updated"],
    };
    return labels[item.type][locale === "ru" ? 0 : 1];
  };
  const plannerDays = useMemo(() => {
    const first = new Date(
        plannerMonth.getFullYear(),
        plannerMonth.getMonth(),
        1,
      ),
      start = new Date(first);
    start.setDate(first.getDate() - ((first.getDay() + 6) % 7));
    return Array.from({ length: 42 }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      return day;
    });
  }, [plannerMonth]);
  const plannerDayTasks = useMemo(
    () =>
      plannerTasks
        .filter((task) => plannerTaskOccursOn(task, plannerDate))
        .map((task) => ({
          ...task,
          completed: plannerTaskCompletedOn(task, plannerDate),
        }))
        .sort((a, b) => {
          if (Boolean(a.time) !== Boolean(b.time)) return a.time ? -1 : 1;
          return (a.time || "99:99").localeCompare(b.time || "99:99");
        }),
    [plannerTasks, plannerDate],
  );
  const plannerToday = localDateKey();
  const plannerMonthLabel = plannerMonth.toLocaleDateString(
    locale === "ru" ? "ru-RU" : "en-US",
    { month: "long", year: "numeric" },
  );
  async function savePlannerTasks(next: PlannerTask[], details: string) {
    setPlannerTasks(next);
    const current = readLocalCrmState(),
      nextActivity = mergeCrmActivity(current.activity, activity, [
        createCrmActivity("planner_updated", null, details),
      ]);
    setActivity(nextActivity);
    await persistCrmState(
      { ...current, planner: next, settings, activity: nextActivity },
      accessToken,
    );
  }
  function addPlannerTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = plannerInput.trim();
    if (!value) return;
    void savePlannerTasks(
      [
        ...plannerTasks,
        {
          id: `planner-${Date.now()}`,
          date: plannerDate,
          text: value,
          completed: false,
          repeat: plannerRepeat,
          completed_dates: [],
          emoji: plannerEmoji.trim() || undefined,
          time: plannerTime || null,
          reminder_time: plannerReminderTime || null,
          created_at: new Date().toISOString(),
        },
      ],
      `${locale === "ru" ? "Добавлена задача" : "Task added"}: ${value}`,
    );
    setPlannerInput("");
    setPlannerRepeat("none");
    setPlannerEmoji("");
    setPlannerTime("");
    setPlannerReminderTime("");
  }
  function togglePlannerTask(id: string) {
    const occurrence = plannerTasks.find((task) => task.id === id);
    if (!occurrence) return;
    const completed = plannerTaskCompletedOn(occurrence, plannerDate);
    const next = plannerTasks.map((task) => {
      if (task.id !== id) return task;
      if (task.repeat && task.repeat !== "none") {
        const dates = new Set(task.completed_dates || []);
        if (completed) dates.delete(plannerDate);
        else dates.add(plannerDate);
        return { ...task, completed_dates: Array.from(dates) };
      }
      return {
        ...task,
        completed: !completed,
        completed_at: !completed ? new Date().toISOString() : null,
      };
    });
    void savePlannerTasks(
      next,
      `${completed ? (locale === "ru" ? "Задача возвращена" : "Task reopened") : locale === "ru" ? "Задача выполнена" : "Task completed"}: ${occurrence.text}`,
    );
  }
  function deletePlannerTask(id: string) {
    const task = plannerTasks.find((item) => item.id === id);
    void savePlannerTasks(
      plannerTasks.filter((item) => item.id !== id),
      `${locale === "ru" ? "Удалена задача" : "Task deleted"}: ${task?.text || "—"}`,
    );
  }
  async function enableNotifications() {
    if (typeof Notification === "undefined") {
      setNotice(
        locale === "ru"
          ? "Этот браузер не поддерживает системные уведомления."
          : "This browser does not support system notifications.",
      );
      return;
    }
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    if (permission === "granted") {
      new Notification("Tafa Lab", {
        body:
          locale === "ru"
            ? "Уведомления CRM включены."
            : "CRM notifications are enabled.",
      });
      setNotice(
        locale === "ru" ? "Уведомления включены." : "Notifications enabled.",
      );
    } else
      setNotice(
        locale === "ru"
          ? "Разрешение на уведомления не выдано."
          : "Notification permission was not granted.",
      );
    setTimeout(() => setNotice(""), 2500);
  }

  async function addCustomCity(country: string, city: string) {
    const normalizedCountry = country.trim(),
      normalizedCity = city.trim();
    if (!normalizedCountry || !normalizedCity) return;
    const currentCities = customCities[normalizedCountry] || [],
      existing = (citiesByCountry[normalizedCountry] || []).find(
        (value) =>
          value.localeCompare(normalizedCity, locale, {
            sensitivity: "accent",
          }) === 0,
      ),
      savedCity = existing || normalizedCity;
    const next: CustomCities = {
      ...customCities,
      [normalizedCountry]: existing
        ? currentCities
        : Array.from(new Set([...currentCities, savedCity])).sort((a, b) =>
            a.localeCompare(b, locale),
          ),
    };
    setCustomCities(next);
    const current = readLocalCrmState(),
      nextActivity = existing
        ? mergeCrmActivity(current.activity, activity)
        : mergeCrmActivity(current.activity, activity, [
            createCrmActivity(
              "city_added",
              null,
              `${countryLabel(normalizedCountry, locale)} · ${savedCity}`,
            ),
          ]),
      syncError = await persistCrmState(
        { ...current, customCities: next, settings, activity: nextActivity },
        accessToken,
      );
    setActivity(nextActivity);
    if (syncError && !/rate limit/i.test(syncError)) setError(syncError);
    else {
      setNotice(
        locale === "ru"
          ? `Город «${savedCity}» добавлен.`
          : `City “${savedCity}” added.`,
      );
      setTimeout(() => setNotice(""), 2200);
    }
  }

  async function load() {
    setLoading(true);
    setError("");
    const local = readLocalCrmState();
    let remote: CrmSyncState = {
      meta: {},
      manual: [],
      deleted: [],
      settings: emptySettings(),
      planner: [],
      customCities: {},
      activity: [],
    };
    try {
      const response = await fetch("/api/stk-lab/crm-sync", {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      });
      if (response.ok) {
        const payload = await response.json();
        if (payload.state && typeof payload.state === "object")
          remote = {
            ...(payload.state as CrmSyncState),
            synced_at:
              payload.updated_at || (payload.state as CrmSyncState).synced_at,
          };
      }
    } catch {}
    let synced = mergeCrmStates(local, remote);
    const activityBackfilled = !(synced.activity || []).length;
    const knownLeads: Lead[] = [
        ...synced.manual,
        ...kaskelenLeads,
        ...almatyLeadSeed,
        ...extraAlmatyLeadSeed,
        ...taldykorganLeadSeed,
        ...almatyBarsLeadSeed,
        ...(nycBeautyLeadSeed as unknown as Lead[]),
        ...(nycRestaurantLeadSeed as unknown as Lead[]),
        ...(nycBakeryCoffeeLeadSeed as unknown as Lead[]),
      ],
      leadNames = new Map(knownLeads.map((lead) => [lead.id, lead.name]));
    if (activityBackfilled) {
      const legacyActivity: CrmActivity[] = [
        ...synced.manual.map((lead) => ({
          id: `legacy-created-${lead.id}`,
          type: "lead_created" as const,
          created_at: lead.created_at,
          lead_id: lead.id,
          lead_name: lead.name,
        })),
        ...Object.entries(synced.meta).flatMap(([leadId, meta]) =>
          (meta.interactions || []).map((entry) => ({
            id: `legacy-interaction-${leadId}-${entry.id}`,
            type:
              entry.channel === "status"
                ? ("status_changed" as const)
                : ("interaction" as const),
            created_at: entry.created_at,
            lead_id: leadId,
            lead_name: leadNames.get(leadId),
            details:
              entry.channel === "status"
                ? entry.text
                : interactionLabel(entry.channel, locale),
          })),
        ),
      ];
      synced = {
        ...synced,
        activity: mergeCrmActivity(legacyActivity),
      };
    }
    const existingActivity = synced.activity || [],
      statusSnapshots = Object.entries(synced.meta).flatMap(
        ([leadId, meta]): CrmActivity[] => {
          const status = meta.status;
          if (!status || status === "new") return [];
          const alreadyTracked = existingActivity.some(
            (item) =>
              item.type === "status_changed" &&
              item.lead_id === leadId &&
              item.to_status === status,
          );
          if (alreadyTracked) return [];
          const latestStatusEntry = [...(meta.interactions || [])]
            .reverse()
            .find((entry) => entry.channel === "status");
          return [
            {
              id: `status-snapshot-${leadId}-${status}`,
              type: "status_changed",
              created_at:
                latestStatusEntry?.created_at ||
                synced.synced_at ||
                new Date().toISOString(),
              lead_id: leadId,
              lead_name: leadNames.get(leadId),
              details:
                latestStatusEntry?.text ||
                (locale === "ru"
                  ? "Статус сохранён в CRM"
                  : "Status saved in CRM"),
              to_status: status,
            },
          ];
        },
      );
    if (statusSnapshots.length)
      synced = {
        ...synced,
        activity: mergeCrmActivity(existingActivity, statusSnapshots),
      };
    if (
      activityBackfilled ||
      statusSnapshots.length ||
      crmStateScore(local) > crmStateScore(remote)
    ) {
      const syncError = await persistCrmState(synced, accessToken);
      if (syncError && !/rate limit/i.test(syncError)) setError(syncError);
    } else writeLocalCrmState(synced);
    setActivity(synced.activity || []);
    const seededMeta = { ...synced.meta };
    (nycBeautyLeadSeed as unknown as Lead[]).forEach((lead) => {
      const previous = seededMeta[lead.id];
      if (previous?.profitability) return;
      seededMeta[lead.id] = {
        ...(previous || { reminder_at: "", history: [] }),
        category: previous?.category || lead.category || "Салон красоты",
        tags: previous?.tags || ["NYC", "Beauty"],
        source: previous?.source || "NYC beauty salons",
        temperature: previous?.temperature || "cold",
        profitability: nycBeautyLowProfitabilityNames.has(
          lead.name.trim().toLowerCase(),
        )
          ? "low"
          : "high",
      };
    });
    (nycRestaurantLeadSeed as unknown as Lead[]).forEach((lead) => {
      const previous = seededMeta[lead.id];
      seededMeta[lead.id] = {
        ...(previous || { reminder_at: "", history: [] }),
        status: previous?.status || lead.status,
        category: previous?.category || lead.category || "Ресторан",
        tags: previous?.tags || ["NYC", "Restaurants"],
        source: previous?.source || "NYC restaurants",
        temperature: previous?.temperature || "cold",
        profitability:
          previous?.profitability || lead.seedProfitability || "medium",
      };
    });
    (nycBakeryCoffeeLeadSeed as unknown as Lead[]).forEach((lead) => {
      const previous = seededMeta[lead.id];
      if (previous?.profitability) return;
      seededMeta[lead.id] = {
        ...(previous || { reminder_at: "", history: [] }),
        category: previous?.category || lead.category || "Пекарни и кофейни",
        tags: previous?.tags || ["NYC", "Bakery", "Coffee"],
        source: previous?.source || "NYC bakeries & coffee shops",
        temperature: previous?.temperature || "cold",
        profitability:
          previous?.profitability || lead.seedProfitability || "high",
      };
    });
    setCrmMeta(seededMeta);
    setSettings(synced.settings || emptySettings());
    setPlannerTasks(synced.planner || []);
    setCustomCities(synced.customCities || {});
    const hydrate = (x: Lead) => ({
      ...x,
      contact: seededMeta[x.id]?.contact || x.contact,
      city: seededMeta[x.id]?.city ?? x.city,
      company: seededMeta[x.id]?.company ?? x.company,
      status: seededMeta[x.id]?.status || x.status,
      admin_notes:
        seededMeta[x.id]?.history?.at(-1)?.text || x.admin_notes || null,
    });
    const seeded: Lead[] = [
      ...kaskelenLeads,
      ...almatyLeadSeed,
      ...extraAlmatyLeadSeed,
      ...taldykorganLeadSeed,
      ...almatyBarsLeadSeed,
      ...(nycBeautyLeadSeed as unknown as Lead[]),
      ...(nycRestaurantLeadSeed as unknown as Lead[]),
      ...(nycBakeryCoffeeLeadSeed as unknown as Lead[]),
    ]
      .filter((x) => !synced.deleted.includes(x.id))
      .map(hydrate);
    const manual = synced.manual
        .filter((x) => !synced.deleted.includes(x.id))
        .map(hydrate),
      savedLeads = [...manual, ...seeded];
    setLeads(savedLeads);
    setLoading(false);
    try {
      // Use a stateless anonymous client for the read itself. The previous
      // session token contains oversized legacy metadata and cannot be sent
      // reliably from this page. The table's RLS policies remain the source
      // of truth; if they deny anonymous reads, show that exact error.
      const publicClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { auth: { persistSession: false, autoRefreshToken: false } },
      );
      const { data: leadRows, error: leadError } = await publicClient
        .from("stk_lab_leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (leadError)
        throw new Error(
          `Supabase ${leadError.code || "error"}: ${leadError.message}`,
        );
      const { data: orderRows, error: orderError } = await publicClient
        .from("orders")
        .select("*")
        .eq("weight", "DEMO_SITE_ORDER")
        .order("created_at", { ascending: false });
      if (orderError)
        console.warn("Tafa Lab demo requests load:", orderError.message);
      const demoLeads: Lead[] = (orderRows || []).map((order: any) => {
        let payload: any = {};
        try {
          payload = order.customer_comment
            ? JSON.parse(order.customer_comment)
            : {};
        } catch {}
        return {
          id: `order-${order.id}`,
          created_at: order.created_at,
          name: order.customer_name || "Без имени",
          contact:
            order.customer_phone || order.customer_email || "Контакт не указан",
          company: null,
          city: null,
          project_type: payload.subject || "Заявка с демо-сайта",
          message: payload.message || null,
          locale: payload.locale === "en" ? "en" : "ru",
          source_path: payload.siteName
            ? `Демо · ${payload.siteName}`
            : "Демо-сайт",
          status: "new",
          admin_notes: null,
        };
      });
      setLeads([
        ...savedLeads,
        ...(leadRows || []).map((x: any) => hydrate(x)),
        ...demoLeads.map(hydrate),
      ]);
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : "load_failed";
      setError(
        locale === "ru"
          ? `Не удалось загрузить заявки: ${message}`
          : `Could not load requests: ${message}`,
      );
    } finally {
      setLoading(false);
    }
  }
  function fillDraft(lead: Lead) {
    const fields = contactFields(lead.contact),
      meta = crmMeta[lead.id] || { reminder_at: "", history: [] };
    setSelectedId(lead.id);
    setDraftStatus(meta.status || lead.status);
    setDraftNotes(lead.admin_notes || "");
    setDraftReminder(meta.reminder_at || "");
    setDraftReminderTime(meta.reminder_time || "");
    setDraftPhones(fields.phone ? splitStoredValues(fields.phone) : [""]);
    setDraftInstagrams(
      fields.instagram ? splitStoredValues(fields.instagram) : [""],
    );
    setDraftFacebooks(
      fields.facebook ? splitStoredValues(fields.facebook) : [""],
    );
    setDraftEmails(fields.email ? splitStoredValues(fields.email) : [""]);
    setDraftWebsites(fields.website ? splitStoredValues(fields.website) : [""]);
    setDraftPrimaryMessage(
      meta.primary_message || buildPrimaryMessage(lead, locale),
    );
    setDraftFollowupMessage(
      meta.followup_message || buildFollowupMessage(lead, locale),
    );
    setDraftCountry(meta.country ?? lead.country ?? leadCountry(lead, meta));
    setDraftCity(meta.city ?? lead.city ?? "");
    setDraftCompany(meta.company ?? lead.company ?? "");
    setDraftCategory(leadCategories(lead, meta).join(", "));
    setDraftTags((meta.tags || []).join(", "));
    setDraftSource(meta.source || lead.source_path || "");
    setDraftTemperature(meta.temperature || "cold");
    setDraftProfitability(meta.profitability || "");
    setSaved(false);
    setError("");
    setCopied(false);
  }
  async function saveMeta(
    nextMeta: Record<string, CrmMeta>,
    nextSettings: CrmSettings = settings,
    newActivity: CrmActivity[] = [],
  ) {
    setCrmMeta(nextMeta);
    setSettings(nextSettings);
    const current = readLocalCrmState(),
      nextActivity = mergeCrmActivity(current.activity, activity, newActivity),
      syncError = await persistCrmState(
        {
          ...current,
          meta: nextMeta,
          settings: nextSettings,
          activity: nextActivity,
        },
        accessToken,
      );
    setActivity(nextActivity);
    if (syncError && !/rate limit/i.test(syncError)) setError(syncError);
  }
  async function saveLead() {
    if (!selectedId) return;
    setSaving(true);
    setError("");
    const lead = leads.find((x) => x.id === selectedId);
    if (!lead) {
      setSaving(false);
      return;
    }
    const previous = crmMeta[selectedId] || { reminder_at: "", history: [] },
      notes = draftNotes.trim(),
      noteChanged = Boolean(notes && notes !== previous.history.at(-1)?.text);
    const history = noteChanged
        ? [
            ...previous.history,
            { text: notes, created_at: new Date().toISOString() },
          ]
        : previous.history,
      interactions = noteChanged
        ? [
            ...(previous.interactions || []),
            {
              id: `note-${Date.now()}`,
              channel: "note" as const,
              text: notes,
              created_at: new Date().toISOString(),
            },
          ]
        : previous.interactions || [];
    const phone = draftPhones
        .map((v) => v.trim())
        .filter(Boolean)
        .join(" / "),
      instagram = draftInstagrams
        .map((v) => v.trim())
        .filter(Boolean)
        .join(" / "),
      facebook = draftFacebooks
        .map((v) => v.trim())
        .filter(Boolean)
        .join(" / "),
      email = draftEmails
        .map((v) => v.trim())
        .filter(Boolean)
        .join(" / "),
      website = draftWebsites
        .map((v) => v.trim())
        .filter(Boolean)
        .join(" / ");
    const contact = [
      phone && `Телефон: ${phone}`,
      instagram && `Instagram: ${instagram}`,
      facebook && `Facebook: ${facebook}`,
      email && `Email: ${email}`,
      website && `Сайт: ${website}`,
    ]
      .filter(Boolean)
      .join(" · ");
    const meta: CrmMeta = {
      ...previous,
      reminder_at: draftReminder,
      reminder_time: draftReminderTime,
      history,
      interactions,
      status: draftStatus,
      contact,
      primary_message: draftPrimaryMessage.trim(),
      followup_message:
        draftFollowupMessage.trim() || buildFollowupMessage(lead, locale),
      country: draftCountry.trim() || null,
      city: draftCity.trim() || null,
      company: draftCompany.trim() || null,
      category: draftCategory.trim(),
      tags: draftTags
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      source: draftSource.trim(),
      temperature: draftTemperature,
      profitability: draftProfitability || null,
    };
    const previousStatus = previous.status || lead.status,
      trackedBefore = {
        reminder_at: previous.reminder_at || "",
        reminder_time: previous.reminder_time || "",
        contact: previous.contact || lead.contact || "",
        country: previous.country ?? lead.country ?? "",
        city: previous.city ?? lead.city ?? "",
        company: previous.company ?? lead.company ?? "",
        category: previous.category || "",
        tags: previous.tags || [],
        source: previous.source || lead.source_path || "",
        temperature: previous.temperature || "cold",
        profitability: previous.profitability || "",
        primary_message: previous.primary_message || "",
        followup_message: previous.followup_message || "",
        notes: lead.admin_notes || "",
      },
      trackedAfter = {
        reminder_at: meta.reminder_at || "",
        reminder_time: meta.reminder_time || "",
        contact: meta.contact || "",
        country: meta.country || "",
        city: meta.city || "",
        company: meta.company || "",
        category: meta.category || "",
        tags: meta.tags || [],
        source: meta.source || "",
        temperature: meta.temperature || "cold",
        profitability: meta.profitability || "",
        primary_message: meta.primary_message || "",
        followup_message: meta.followup_message || "",
        notes,
      },
      savedActivity: CrmActivity[] = [];
    if (previousStatus !== draftStatus)
      savedActivity.push(
        createCrmActivity("status_changed", lead, undefined, {
          from_status: previousStatus,
          to_status: draftStatus,
        }),
      );
    if (JSON.stringify(trackedBefore) !== JSON.stringify(trackedAfter))
      savedActivity.push(
        createCrmActivity(
          "lead_updated",
          lead,
          noteChanged
            ? locale === "ru"
              ? "Карточка и заметка обновлены"
              : "Record and note updated"
            : locale === "ru"
              ? "Карточка обновлена"
              : "Record updated",
        ),
      );
    await saveMeta({ ...crmMeta, [selectedId]: meta }, settings, savedActivity);
    setLeads((rows) =>
      rows.map((x) =>
        x.id === selectedId
          ? {
              ...x,
              status: draftStatus,
              admin_notes: notes || null,
              contact,
              country: meta.country ?? null,
              city: meta.city ?? null,
              company: meta.company ?? null,
            }
          : x,
      ),
    );
    if (!isCrmId(selectedId))
      await sb
        .from("stk_lab_leads")
        .update({
          status: draftStatus,
          admin_notes: notes || null,
          contact,
          city: meta.city ?? null,
          company: meta.company ?? null,
        })
        .eq("id", selectedId);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
    setSaving(false);
  }
  async function recordInteraction(
    lead: Lead,
    channel: InteractionChannel,
    message: string,
  ) {
    const previous = crmMeta[lead.id] || { reminder_at: "", history: [] },
      status: LeadStatus =
        lead.status === "new" || lead.status === "draft"
          ? "contacted"
          : lead.status;
    const entry: InteractionEntry = {
        id: `${channel}-${Date.now()}`,
        channel,
        text: message,
        created_at: new Date().toISOString(),
      },
      nextMeta = {
        ...crmMeta,
        [lead.id]: {
          ...previous,
          status,
          interactions: [...(previous.interactions || []), entry],
        },
      },
      logged: CrmActivity[] = [
        createCrmActivity(
          "interaction",
          lead,
          interactionLabel(channel, locale),
        ),
      ];
    if (status !== lead.status)
      logged.push(
        createCrmActivity("status_changed", lead, undefined, {
          from_status: lead.status,
          to_status: status,
        }),
      );
    await saveMeta(nextMeta, settings, logged);
    setLeads((rows) =>
      rows.map((x) => (x.id === lead.id ? { ...x, status } : x)),
    );
    setDraftStatus(status);
    if (!isCrmId(lead.id))
      void sb.from("stk_lab_leads").update({ status }).eq("id", lead.id);
  }
  function sendWhatsApp(lead: Lead, phone: string, message: string) {
    const readyMessage = renderTemplate(message, lead),
      digits = phone.replace(/\D/g, "");
    if (!digits) return;
    window.open(
      `https://wa.me/${digits}?text=${encodeURIComponent(readyMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );
    void recordInteraction(lead, "whatsapp", readyMessage);
  }
  function sendEmail(lead: Lead, email: string, message: string) {
    const readyMessage = renderTemplate(message, lead);
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Tafa Lab")}&body=${encodeURIComponent(readyMessage)}`;
    void recordInteraction(lead, "email", readyMessage);
  }
  function openInstagram(lead: Lead, value: string) {
    const profile = value
      .replace(/^@/, "")
      .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
      .replace(/\/.*$/, "");
    if (profile)
      window.open(
        `https://instagram.com/${profile}`,
        "_blank",
        "noopener,noreferrer",
      );
    void recordInteraction(
      lead,
      "instagram",
      locale === "ru" ? "Открыт профиль Instagram" : "Instagram profile opened",
    );
  }
  function openFacebook(lead: Lead, value: string) {
    const url = /^https?:\/\//i.test(value)
      ? value
      : `https://facebook.com/${value.replace(/^@/, "")}`;
    window.open(url, "_blank", "noopener,noreferrer");
    void recordInteraction(
      lead,
      "facebook",
      locale === "ru" ? "Открыт профиль Facebook" : "Facebook profile opened",
    );
  }
  function openWebsite(lead: Lead, value: string) {
    const url = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    window.open(url, "_blank", "noopener,noreferrer");
    void recordInteraction(
      lead,
      "note",
      locale === "ru" ? "Открыт сайт" : "Website opened",
    );
  }
  async function changeStatus(id: string, status: LeadStatus) {
    const lead = leads.find((x) => x.id === id);
    if (!lead || lead.status === status) return;
    const previous = crmMeta[id] || { reminder_at: "", history: [] },
      entry: InteractionEntry = {
        id: `status-${Date.now()}`,
        channel: "status",
        text: `${t.statuses[lead.status]} → ${t.statuses[status]}`,
        created_at: new Date().toISOString(),
      };
    await saveMeta(
      {
        ...crmMeta,
        [id]: {
          ...previous,
          status,
          interactions: [...(previous.interactions || []), entry],
        },
      },
      settings,
      [
        createCrmActivity("status_changed", lead, undefined, {
          from_status: lead.status,
          to_status: status,
        }),
      ],
    );
    setLeads((rows) => rows.map((x) => (x.id === id ? { ...x, status } : x)));
    if (!isCrmId(id))
      void sb.from("stk_lab_leads").update({ status }).eq("id", id);
  }
  async function createCrmLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !newLead.name.trim() ||
      (!newLead.phone.trim() &&
        !newLead.instagram.trim() &&
        !newLead.facebook.trim() &&
        !newLead.email.trim())
    )
      return;
    const id = `kaskelen-manual-${Date.now()}`;
    const contact = [
      newLead.phone.trim() && `Телефон: ${newLead.phone.trim()}`,
      newLead.instagram.trim() && `Instagram: ${newLead.instagram.trim()}`,
      newLead.facebook.trim() && `Facebook: ${newLead.facebook.trim()}`,
      newLead.email.trim() && `Email: ${newLead.email.trim()}`,
    ]
      .filter(Boolean)
      .join(" · ");
    const lead: Lead = {
      id,
      created_at: new Date().toISOString(),
      name: newLead.name.trim(),
      contact,
      company: newLead.company.trim() || null,
      country: newLead.country.trim() || null,
      city: newLead.city.trim() || null,
      project_type: newLead.project_type.trim() || null,
      message: newLead.message.trim() || null,
      locale: "ru",
      source_path: newLead.source.trim() || "Добавлено вручную",
      status: "new",
      admin_notes: null,
    };
    const meta: CrmMeta = {
      reminder_at: newLead.reminder_at,
      reminder_time: newLead.reminder_time,
      history: [],
      status: "new",
      country: newLead.country.trim() || null,
      city: newLead.city.trim() || null,
      category: newLead.category.trim(),
      tags: newLead.tags
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      source: newLead.source.trim() || "Добавлено вручную",
      temperature: "cold",
      profitability: null,
      followup_message: buildFollowupMessage(lead, "ru"),
    };
    const current = readLocalCrmState(),
      manual = [lead, ...current.manual.filter((x) => x.id !== id)],
      nextMeta = { ...crmMeta, [id]: meta },
      nextActivity = mergeCrmActivity(current.activity, activity, [
        createCrmActivity("lead_created", lead),
      ]);
    setLeads((rows) => [lead, ...rows]);
    await persistCrmState(
      { ...current, manual, meta: nextMeta, settings, activity: nextActivity },
      accessToken,
    );
    setCrmMeta(nextMeta);
    setActivity(nextActivity);
    setNewLead(emptyNewLead);
    setAdding(false);
    setSection("crm");
    setSelectedId(null);
    setNotice(
      locale === "ru" ? "Запись добавлена в CRM." : "Record added to CRM.",
    );
    setTimeout(() => setNotice(""), 2200);
  }
  async function deleteLead() {
    if (!selectedId || !window.confirm(t.deleteAsk)) return;
    setDeleting(true);
    const deletedLead = leads.find((lead) => lead.id === selectedId),
      current = readLocalCrmState(),
      nextActivity = mergeCrmActivity(current.activity, activity, [
        createCrmActivity("lead_deleted", deletedLead),
      ]),
      next = {
        ...current,
        deleted: Array.from(new Set([...current.deleted, selectedId])),
        manual: current.manual.filter((x) => x.id !== selectedId),
        activity: nextActivity,
      };
    if (!isCrmId(selectedId))
      await sb.from("stk_lab_leads").delete().eq("id", selectedId);
    await persistCrmState(next, accessToken);
    setActivity(nextActivity);
    setLeads((rows) => rows.filter((x) => x.id !== selectedId));
    setSelectedId(null);
    setNotice(t.deleted);
    setTimeout(() => setNotice(""), 2500);
    setDeleting(false);
  }
  async function handleAttachment(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !selectedId) return;
    if (file.size > 2_000_000) {
      setError(
        locale === "ru"
          ? "Файл должен быть меньше 2 МБ."
          : "File must be under 2 MB.",
      );
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const stored: StoredAttachment = {
          id: `file-${Date.now()}`,
          name: file.name,
          type: file.type,
          size: file.size,
          created_at: new Date().toISOString(),
          data_url: String(reader.result || ""),
        },
        all = readAttachments();
      writeAttachments({
        ...all,
        [selectedId]: [...(all[selectedId] || []), stored],
      });
      const previous = crmMeta[selectedId] || { reminder_at: "", history: [] },
        attachment: AttachmentEntry = {
          id: stored.id,
          name: stored.name,
          type: stored.type,
          size: stored.size,
          created_at: stored.created_at,
        };
      await saveMeta(
        {
          ...crmMeta,
          [selectedId]: {
            ...previous,
            attachments: [...(previous.attachments || []), attachment],
          },
        },
        settings,
        [
          createCrmActivity(
            "attachment_added",
            leads.find((lead) => lead.id === selectedId),
            file.name,
          ),
        ],
      );
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }
  function downloadAttachment(id: string) {
    if (!selectedId) return;
    const item = (readAttachments()[selectedId] || []).find((x) => x.id === id);
    if (!item) return;
    const anchor = document.createElement("a");
    anchor.href = item.data_url;
    anchor.download = item.name;
    anchor.click();
  }
  async function removeAttachment(id: string) {
    if (!selectedId) return;
    const removed = crmMeta[selectedId]?.attachments?.find(
      (item) => item.id === id,
    );
    const all = readAttachments();
    writeAttachments({
      ...all,
      [selectedId]: (all[selectedId] || []).filter((x) => x.id !== id),
    });
    const previous = crmMeta[selectedId] || { reminder_at: "", history: [] };
    await saveMeta(
      {
        ...crmMeta,
        [selectedId]: {
          ...previous,
          attachments: (previous.attachments || []).filter((x) => x.id !== id),
        },
      },
      settings,
      [
        createCrmActivity(
          "attachment_removed",
          leads.find((lead) => lead.id === selectedId),
          removed?.name,
        ),
      ],
    );
  }
  async function saveTemplates(templates: MessageTemplate[]) {
    await saveMeta(crmMeta, { templates }, [
      createCrmActivity(
        "template_updated",
        null,
        locale === "ru"
          ? "Шаблоны сообщений обновлены"
          : "Message templates updated",
      ),
    ]);
  }
  async function addTemplate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newTemplate.name.trim() || !newTemplate.text.trim()) return;
    await saveTemplates([
      ...settings.templates,
      {
        id: `template-${Date.now()}`,
        name: newTemplate.name.trim(),
        text: newTemplate.text.trim(),
      },
    ]);
    setNewTemplate({ name: "", text: "" });
  }
  function exportExcel() {
    const headers = [
      "Имя",
      "Телефон",
      "Instagram",
      "Email",
      "Компания",
      "Город",
      "Тип проекта",
      "Категория",
      "Теги",
      "Источник",
      "Статус",
      "Следующий контакт",
      "Информация",
    ];
    const rows = crmLeads.map((lead) => {
      const fields = contactFields(lead.contact),
        meta = crmMeta[lead.id];
      return [
        lead.name,
        fields.phone,
        fields.instagram,
        fields.email,
        lead.company || "",
        lead.city || "",
        lead.project_type || "",
        leadCategories(lead, meta).join(", "),
        (meta?.tags || []).join(", "),
        meta?.source || lead.source_path || "",
        lead.status,
        reminderDate(meta),
        lead.message || "",
      ];
    });
    downloadText(
      `tafa-crm-${new Date().toISOString().slice(0, 10)}.csv`,
      [headers, ...rows].map((row) => row.map(csvValue).join(";")).join("\n"),
    );
  }
  async function importExcel(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.name.toLowerCase().endsWith(".xlsx")) {
      setError(
        locale === "ru"
          ? "Сохрани файл Excel как CSV и загрузи его сюда."
          : "Save the Excel file as CSV and upload it here.",
      );
      event.target.value = "";
      return;
    }
    const value = await file.text(),
      lines = value.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return;
    const separator =
        (lines[0].match(/;/g) || []).length >=
        (lines[0].match(/,/g) || []).length
          ? ";"
          : ",",
      headers = parseCsvLine(lines[0], separator).map((x) =>
        x.toLowerCase().trim(),
      );
    const aliases: Record<string, string[]> = {
      name: ["имя", "name"],
      phone: ["телефон", "phone"],
      instagram: ["instagram", "инстаграм"],
      email: ["email", "почта"],
      company: ["компания", "company"],
      city: ["город", "city"],
      project: ["тип проекта", "project type"],
      category: ["категория", "category"],
      tags: ["теги", "tags"],
      source: ["источник", "source"],
      message: ["информация", "message"],
      profitability: ["рентабельность", "рентабельность лида", "profitability"],
    };
    const index = (key: string) =>
        headers.findIndex((header) => (aliases[key] || []).includes(header)),
      created: Lead[] = [],
      importedMeta: Record<string, CrmMeta> = {};
    lines.slice(1).forEach((line, rowIndex) => {
      const cells = parseCsvLine(line, separator),
        get = (key: string) => {
          const i = index(key);
          return i >= 0 ? (cells[i] || "").trim() : "";
        },
        name = get("name");
      if (!name) return;
      const id = `kaskelen-import-${Date.now()}-${rowIndex}`,
        contact = [
          get("phone") && `Телефон: ${get("phone")}`,
          get("instagram") && `Instagram: ${get("instagram")}`,
          get("email") && `Email: ${get("email")}`,
        ]
          .filter(Boolean)
          .join(" · ");
      const lead: Lead = {
        id,
        created_at: new Date().toISOString(),
        name,
        contact,
        company: get("company") || null,
        city: get("city") || null,
        project_type: get("project") || null,
        message: get("message") || null,
        locale: "ru",
        source_path: get("source") || "Импорт Excel",
        status: "new",
        admin_notes: null,
      };
      created.push(lead);
      const importedProfitability = normalizeProfitability(
        get("profitability"),
      );
      importedMeta[id] = {
        reminder_at: "",
        history: [],
        status: "new",
        category: get("category"),
        tags: get("tags")
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
        source: get("source") || "Импорт Excel",
        temperature: "cold",
        profitability: importedProfitability,
        followup_message: buildFollowupMessage(lead, "ru"),
      };
    });
    const current = readLocalCrmState(),
      manual = [...created, ...current.manual],
      nextMeta = { ...crmMeta, ...importedMeta },
      nextActivity = mergeCrmActivity(current.activity, activity, [
        createCrmActivity(
          "lead_imported",
          null,
          `${file.name}: ${created.length}`,
        ),
      ]);
    await persistCrmState(
      { ...current, manual, meta: nextMeta, settings, activity: nextActivity },
      accessToken,
    );
    setCrmMeta(nextMeta);
    setActivity(nextActivity);
    setLeads((rows) => [...created, ...rows]);
    setNotice(
      locale === "ru"
        ? `Импортировано: ${created.length}`
        : `Imported: ${created.length}`,
    );
    event.target.value = "";
  }
  async function copyText(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    setError("");
    const { error: loginError } = await sb.auth.signInWithPassword({
      email: String(form.get("email") || "").trim(),
      password: String(form.get("password") || ""),
    });
    if (loginError) setError(t.loginError);
    setLoading(false);
  }

  if (!ready)
    return (
      <main className="min-h-screen bg-[#f5f1ec] p-8 text-[#211a17]">
        Loading…
      </main>
    );
  if (!user)
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f1ec] p-5 text-[#211a17]">
        <div className="w-full max-w-md rounded-[32px] border border-black/10 bg-white p-8 shadow-sm">
          <b>Tafa Lab</b>
          <h1 className="mt-8 text-3xl">Admin</h1>
          <p className="mt-2 text-sm text-black/50">{t.login}</p>
          <form onSubmit={login} className="mt-8 space-y-5">
            <label className="block text-sm">
              Email
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3.5"
              />
            </label>
            <label className="block text-sm">
              {t.password}
              <input
                name="password"
                type="password"
                required
                className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3.5"
              />
            </label>
            {error && <p className="text-sm text-red-700">{error}</p>}
            <button
              disabled={loading}
              className="w-full rounded-full bg-[#211a17] px-5 py-3.5 text-white"
            >
              {loading ? t.signing : t.signIn}
            </button>
          </form>
        </div>
      </main>
    );

  const selected = leads.find((x) => x.id === selectedId) || null,
    filterKeys: LeadFilter[] = [
      "all",
      "new",
      "draft",
      "contacted",
      "in_progress",
      "won",
      "lost",
      "dead",
      "not_profitable",
    ];
  const sectionTitle =
    section === "crm"
      ? locale === "ru"
        ? "Клиенты и CRM"
        : "Clients & CRM"
      : section === "reminders"
        ? locale === "ru"
          ? "Следующие контакты"
          : "Next contacts"
        : section === "kanban"
          ? locale === "ru"
            ? "Воронка продаж"
            : "Sales pipeline"
          : section === "analytics"
            ? locale === "ru"
              ? "Аналитика CRM"
              : "CRM analytics"
            : section === "reports"
              ? locale === "ru"
                ? "Отчёты по действиям"
                : "Activity reports"
              : section === "templates"
                ? locale === "ru"
                  ? "Шаблоны сообщений"
                  : "Message templates"
                : section === "planner"
                  ? locale === "ru"
                    ? "Планер"
                    : "Planner"
                  : t.leads;
  const duplicatePhoneCompanies = (value: string) => {
    const normalized = normalizeContact(value);
    if (!normalized) return [];
    return leads
      .filter((x) => x.id !== selectedId)
      .filter((x) =>
        contactValues(x.contact, "Телефон").some(
          (phone) => normalizeContact(phone) === normalized,
        ),
      )
      .map((x) => x.name);
  };
  const contactEditor = (
    label: string,
    values: string[],
    setValues: (value: string[] | ((rows: string[]) => string[])) => void,
    placeholder: string,
    type = "text",
  ) => (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-[.14em] text-black/40">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setValues((rows) => [...rows, ""])}
          className="text-sm underline"
        >
          + {locale === "ru" ? "Добавить" : "Add"}
        </button>
      </div>
      <div className="mt-2 space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <div className="min-w-0 flex-1">
              <input
                type={type}
                value={value}
                onChange={(event) =>
                  setValues((rows) =>
                    rows.map((item, i) =>
                      i === index ? event.target.value : item,
                    ),
                  )
                }
                placeholder={placeholder}
                className="w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3.5"
              />
              {(label === "Телефон" || label === "Phone") &&
                duplicatePhoneCompanies(value).map((name) => (
                  <div
                    key={`${name}-${index}`}
                    className="mt-1 text-[11px] leading-4 text-red-600"
                  >
                    По данному номеру телефона имеется дубликат: {name}
                  </div>
                ))}
            </div>
            {values.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setValues((rows) => rows.filter((_, i) => i !== index))
                }
                className="text-red-700"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const selectedLocalTime = selected
      ? leadTimeZone(selected, crmMeta[selected.id])
      : null,
    selectedLocalTimeText = selectedLocalTime
      ? new Intl.DateTimeFormat("ru-RU", {
          timeZone: selectedLocalTime.zone,
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date())
      : "";
  return (
    <main className="min-h-screen bg-[#f5f1ec] text-[#211a17]">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-[#f5f1ec]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4">
          <div>
            <b>Tafa Lab</b>
            <div className="text-xs text-black/45">{t.admin}</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => void enableNotifications()}
              className={`rounded-full border px-4 py-2 text-sm ${notificationPermission === "granted" ? "border-green-200 bg-green-50 text-green-800" : "border-black/10 bg-white"}`}
            >
              {notificationPermission === "granted"
                ? locale === "ru"
                  ? "🔔 Уведомления включены"
                  : "🔔 Notifications on"
                : locale === "ru"
                  ? "🔔 Включить уведомления"
                  : "🔔 Enable notifications"}
            </button>
            <button
              onClick={() => sb.auth.signOut()}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
            >
              {t.logout}
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1600px] flex-col md:flex-row">
        <aside className="border-b border-black/10 px-4 py-4 md:min-h-[calc(100vh-73px)] md:w-64 md:border-b-0 md:border-r md:py-8">
          <p className="px-3 text-xs uppercase tracking-[.2em] text-black/40">
            Tafa Lab CRM
          </p>
          <nav className="mt-4 flex gap-2 overflow-x-auto md:block md:space-y-2">
            {(
              [
                [
                  "requests",
                  "▤",
                  locale === "ru" ? "Заявки" : "Requests",
                  leads.filter((x) => !isCrmId(x.id)).length,
                ],
                ["crm", "◌", "CRM", crmLeads.length],
                [
                  "reminders",
                  "◷",
                  locale === "ru" ? "Напоминания" : "Reminders",
                  analytics.overdue,
                ],
                [
                  "kanban",
                  "▦",
                  locale === "ru" ? "Воронка" : "Pipeline",
                  crmLeads.length,
                ],
                [
                  "planner",
                  "☑",
                  locale === "ru" ? "Планер" : "Planner",
                  plannerTasks.filter((x) =>
                    plannerTaskOccursOn(x, plannerToday),
                  ).length,
                ],
                [
                  "analytics",
                  "◫",
                  locale === "ru" ? "Аналитика" : "Analytics",
                  null,
                ],
                [
                  "reports",
                  "≡",
                  locale === "ru" ? "Отчёты" : "Reports",
                  activity.filter(
                    (item) =>
                      +new Date(item.created_at) >=
                      reportPeriodStart("day").getTime(),
                  ).length,
                ],
                [
                  "templates",
                  "✉",
                  locale === "ru" ? "Шаблоны" : "Templates",
                  settings.templates.length,
                ],
              ] as [Section, string, string, number | null][]
            ).map(([key, icon, label, count]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSection(key);
                  setSelectedId(null);
                }}
                className={`whitespace-nowrap rounded-2xl px-4 py-3 text-left text-sm font-medium md:block md:w-full ${section === key ? "bg-[#211a17] text-white" : "bg-white hover:bg-[#eee7e1]"}`}
              >
                {icon} {label}
                {count !== null && (
                  <span className="ml-2 opacity-60">{count}</span>
                )}
              </button>
            ))}
          </nav>
        </aside>
        <section className="min-w-0 flex-1 px-5 py-8 md:px-8 md:py-10">
          {section === "planner" && (
            <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
              <div className="rounded-[28px] border border-black/10 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setPlannerMonth(
                        new Date(
                          plannerMonth.getFullYear(),
                          plannerMonth.getMonth() - 1,
                          1,
                        ),
                      )
                    }
                    className="h-10 w-10 rounded-full border border-black/10"
                  >
                    ‹
                  </button>
                  <div className="text-center">
                    <h2 className="text-xl capitalize">{plannerMonthLabel}</h2>
                    <button
                      type="button"
                      onClick={() => {
                        const today = new Date();
                        setPlannerMonth(
                          new Date(today.getFullYear(), today.getMonth(), 1),
                        );
                        setPlannerDate(localDateKey(today));
                      }}
                      className="mt-1 text-xs underline"
                    >
                      {locale === "ru" ? "Сегодня" : "Today"}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setPlannerMonth(
                        new Date(
                          plannerMonth.getFullYear(),
                          plannerMonth.getMonth() + 1,
                          1,
                        ),
                      )
                    }
                    className="h-10 w-10 rounded-full border border-black/10"
                  >
                    ›
                  </button>
                </div>
                <div className="mt-5 grid grid-cols-7 gap-1 text-center text-xs text-black/40">
                  {(locale === "ru"
                    ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
                    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                  ).map((day) => (
                    <div key={day} className="py-2">
                      {day}
                    </div>
                  ))}
                  {plannerDays.map((day) => {
                    const key = localDateKey(day),
                      items = plannerTasks.filter((task) =>
                        plannerTaskOccursOn(task, key),
                      ),
                      inMonth = day.getMonth() === plannerMonth.getMonth(),
                      selected = key === plannerDate,
                      today = key === plannerToday;
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setPlannerDate(key)}
                        className={`min-h-16 rounded-2xl border p-2 text-left ${selected ? "border-[#211a17] bg-[#211a17] text-white" : today ? "border-transparent bg-[#f5f1ec]" : "border-transparent hover:border-black/10"} ${!inMonth ? "opacity-35" : ""}`}
                      >
                        <div className="text-sm">{day.getDate()}</div>
                        {items.length > 0 && (
                          <div
                            className={`mt-2 text-[11px] ${selected ? "text-white/70" : "text-black/45"}`}
                          >
                            {
                              items.filter((item) =>
                                plannerTaskCompletedOn(item, key),
                              ).length
                            }
                            /{items.length}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-[28px] border border-black/10 bg-white p-5">
                <h2 className="text-xl">
                  {new Date(`${plannerDate}T12:00:00`).toLocaleDateString(
                    locale === "ru" ? "ru-RU" : "en-US",
                    { weekday: "long", day: "numeric", month: "long" },
                  )}
                </h2>
                <form
                  onSubmit={addPlannerTask}
                  className="mt-5 flex flex-wrap items-center gap-2"
                >
                  <input
                    value={plannerInput}
                    onChange={(event) => setPlannerInput(event.target.value)}
                    placeholder={
                      locale === "ru"
                        ? "Добавить план на день…"
                        : "Add a plan for the day…"
                    }
                    className="min-w-[220px] flex-1 rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"
                  />
                  <div
                    className="flex items-center gap-1 rounded-2xl border border-black/10 bg-[#faf8f6] p-1"
                    aria-label={
                      locale === "ru" ? "Выбрать эмоджи" : "Choose emoji"
                    }
                  >
                    {PLANNER_EMOJIS.map((emoji) => (
                      <button
                        type="button"
                        key={emoji || "none"}
                        onClick={() => setPlannerEmoji(emoji)}
                        className={`h-9 w-9 rounded-xl text-lg ${plannerEmoji === emoji ? "bg-white shadow-sm" : "hover:bg-white/70"}`}
                        aria-label={
                          emoji || (locale === "ru" ? "Без эмоджи" : "No emoji")
                        }
                      >
                        {emoji || "—"}
                      </button>
                    ))}
                  </div>
                  <input
                    type="time"
                    value={plannerTime}
                    onChange={(event) => setPlannerTime(event.target.value)}
                    title={
                      locale === "ru"
                        ? "Время задачи (необязательно)"
                        : "Task time (optional)"
                    }
                    aria-label={locale === "ru" ? "Время задачи" : "Task time"}
                    className="rounded-2xl border border-black/10 bg-[#faf8f6] px-3 py-3"
                  />
                  <input
                    type="time"
                    value={plannerReminderTime}
                    onChange={(event) =>
                      setPlannerReminderTime(event.target.value)
                    }
                    title={
                      locale === "ru"
                        ? "Напомнить в это время (необязательно)"
                        : "Reminder time (optional)"
                    }
                    aria-label={
                      locale === "ru" ? "Время напоминания" : "Reminder time"
                    }
                    className="rounded-2xl border border-black/10 bg-[#faf8f6] px-3 py-3"
                  />
                  <select
                    value={plannerRepeat}
                    onChange={(event) =>
                      setPlannerRepeat(event.target.value as PlannerRepeat)
                    }
                    className="rounded-2xl border border-black/10 bg-[#faf8f6] px-3 text-sm"
                  >
                    <option value="none">
                      {locale === "ru" ? "Не повторять" : "Does not repeat"}
                    </option>
                    <option value="daily">
                      {locale === "ru" ? "Каждый день" : "Every day"}
                    </option>
                    <option value="weekly">
                      {locale === "ru" ? "Каждую неделю" : "Every week"}
                    </option>
                    <option value="monthly">
                      {locale === "ru" ? "Каждый месяц" : "Every month"}
                    </option>
                    <option value="yearly">
                      {locale === "ru" ? "Ежегодно" : "Every year"}
                    </option>
                  </select>
                  <button className="rounded-2xl bg-[#211a17] px-4 py-3 text-sm text-white">
                    +
                  </button>
                </form>
                <div className="mt-5 space-y-2">
                  {plannerDayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 rounded-2xl border border-black/5 bg-[#faf8f6] px-3 py-3"
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => togglePlannerTask(task.id)}
                        className="h-5 w-5 accent-[#211a17]"
                      />
                      <span
                        className={`min-w-0 flex-1 text-sm ${task.completed ? "text-black/40 line-through" : ""}`}
                      >
                        {task.emoji && (
                          <span className="mr-2">{task.emoji}</span>
                        )}
                        {task.time && (
                          <span className="mr-2 font-medium text-black/55">
                            {task.time}
                          </span>
                        )}
                        {task.text}
                        {task.reminder_time && (
                          <span className="ml-2 text-xs text-black/40">
                            🔔 {task.reminder_time}
                          </span>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => deletePlannerTask(task.id)}
                        className="text-black/35 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {plannerDayTasks.length === 0 && (
                    <p className="rounded-2xl bg-[#faf8f6] p-4 text-sm text-black/45">
                      {locale === "ru"
                        ? "Планов на этот день пока нет."
                        : "No plans for this day yet."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[.2em] text-black/40">
                CRM · Tafa Lab
              </p>
              <h1 className="mt-2 text-4xl">{sectionTitle}</h1>
              <p className="mt-2 text-sm text-black/50">
                {t.total}:{" "}
                {section === "requests"
                  ? leads.filter((x) => !isCrmId(x.id)).length
                  : crmLeads.length}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={load}
                disabled={loading}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
              >
                {loading ? t.refreshing : t.refresh}
              </button>
              {section === "crm" && (
                <>
                  <label className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-2 text-sm">
                    {locale === "ru" ? "Импорт Excel/CSV" : "Import Excel/CSV"}
                    <input
                      type="file"
                      accept=".csv,.txt,.xlsx"
                      onChange={importExcel}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={exportExcel}
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm"
                  >
                    {locale === "ru" ? "Экспорт Excel" : "Export Excel"}
                  </button>
                  <button
                    onClick={() => setAdding(true)}
                    className="rounded-full bg-[#211a17] px-4 py-2 text-sm text-white"
                  >
                    {locale === "ru" ? "Добавить в CRM" : "Add to CRM"}
                  </button>
                </>
              )}
            </div>
          </div>

          {adding && section === "crm" && (
            <form
              onSubmit={createCrmLead}
              className="mt-6 rounded-[28px] border border-black/10 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl">
                  {locale === "ru" ? "Новая запись CRM" : "New CRM record"}
                </h2>
                <button
                  type="button"
                  onClick={() => setAdding(false)}
                  className="text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <input
                  required
                  value={newLead.name}
                  onChange={(e) =>
                    setNewLead({ ...newLead, name: e.target.value })
                  }
                  placeholder={
                    locale === "ru" ? "Имя / компания *" : "Name / company *"
                  }
                  className="rounded-2xl border border-black/10 px-4 py-3"
                />
                <input
                  value={newLead.phone}
                  onChange={(e) =>
                    setNewLead({ ...newLead, phone: e.target.value })
                  }
                  placeholder={locale === "ru" ? "Телефон" : "Phone"}
                  className="rounded-2xl border border-black/10 px-4 py-3"
                />
                <input
                  value={newLead.instagram}
                  onChange={(e) =>
                    setNewLead({ ...newLead, instagram: e.target.value })
                  }
                  placeholder="Instagram"
                  className="rounded-2xl border border-black/10 px-4 py-3"
                />
                <input
                  value={newLead.facebook}
                  onChange={(e) =>
                    setNewLead({ ...newLead, facebook: e.target.value })
                  }
                  placeholder="Facebook"
                  className="rounded-2xl border border-black/10 px-4 py-3"
                />
                <input
                  type="email"
                  value={newLead.email}
                  onChange={(e) =>
                    setNewLead({ ...newLead, email: e.target.value })
                  }
                  placeholder={locale === "ru" ? "Почта" : "Email"}
                  className="rounded-2xl border border-black/10 px-4 py-3"
                />
                <input
                  value={newLead.company}
                  onChange={(e) =>
                    setNewLead({ ...newLead, company: e.target.value })
                  }
                  placeholder={locale === "ru" ? "Компания" : "Company"}
                  className="rounded-2xl border border-black/10 px-4 py-3"
                />
                <select
                  value={newLead.country}
                  onChange={(e) =>
                    setNewLead({
                      ...newLead,
                      country: e.target.value,
                      city: "",
                    })
                  }
                  className="rounded-2xl border border-black/10 bg-white px-3 py-3"
                >
                  <option value="">
                    {locale === "ru" ? "Выберите страну" : "Select country"}
                  </option>
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>
                      {countryLabel(country, locale)}
                    </option>
                  ))}
                </select>
                <CitySelect
                  country={newLead.country}
                  value={newLead.city}
                  cities={newLeadCityOptions}
                  locale={locale}
                  onChange={(city) => setNewLead({ ...newLead, city })}
                  onAdd={(country, city) => void addCustomCity(country, city)}
                />
                <input
                  value={newLead.project_type}
                  onChange={(e) =>
                    setNewLead({ ...newLead, project_type: e.target.value })
                  }
                  placeholder={
                    locale === "ru" ? "Что предложить" : "Project type"
                  }
                  className="rounded-2xl border border-black/10 px-4 py-3"
                />
                <select
                  value={newLead.profitability}
                  onChange={(e) =>
                    setNewLead({ ...newLead, profitability: e.target.value })
                  }
                  className="rounded-2xl border border-black/10 px-3 py-3"
                >
                  <option value="">
                    {locale === "ru" ? "Приоритет лида" : "Lead priority"}
                  </option>
                  <option value="high">
                    {locale === "ru"
                      ? "Высокая — нет сайта / digital слабый"
                      : "High — no site / weak digital"}
                  </option>
                  <option value="medium">
                    {locale === "ru"
                      ? "Средняя — сайт есть, но требует улучшений"
                      : "Medium — site needs improvements"}
                  </option>
                  <option value="low">
                    {locale === "ru"
                      ? "Низкая — сильный сайт или сеть"
                      : "Low — strong site or chain"}
                  </option>
                </select>
                <div className="rounded-2xl border border-black/10 p-3 md:col-span-2">
                  <div className="mb-2 text-xs uppercase text-black/40">
                    {locale === "ru"
                      ? "Категории — можно выбрать несколько"
                      : "Categories — select multiple"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {CRM_CATEGORY_OPTIONS.map((category) => (
                      <button
                        type="button"
                        key={category}
                        onClick={() =>
                          setNewLead({
                            ...newLead,
                            category: toggleCategory(
                              newLead.category,
                              category,
                            ),
                          })
                        }
                        className={`rounded-full border px-3 py-2 text-xs ${categoryValues(newLead.category).includes(category) ? "border-[#211a17] bg-[#211a17] text-white" : "border-black/10 bg-white"}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  value={newLead.tags}
                  onChange={(e) =>
                    setNewLead({ ...newLead, tags: e.target.value })
                  }
                  placeholder={
                    locale === "ru"
                      ? "Теги через запятую"
                      : "Tags, comma separated"
                  }
                  className="rounded-2xl border border-black/10 px-4 py-3"
                />
                <input
                  value={newLead.source}
                  onChange={(e) =>
                    setNewLead({ ...newLead, source: e.target.value })
                  }
                  placeholder={locale === "ru" ? "Источник" : "Source"}
                  className="rounded-2xl border border-black/10 px-4 py-3"
                />
                <label className="text-xs text-black/50">
                  {locale === "ru" ? "Следующий контакт" : "Next contact"}
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={newLead.reminder_at}
                      onChange={(e) =>
                        setNewLead({ ...newLead, reminder_at: e.target.value })
                      }
                      className="rounded-2xl border border-black/10 px-3 py-3"
                    />
                    <input
                      type="time"
                      value={newLead.reminder_time}
                      onChange={(e) =>
                        setNewLead({
                          ...newLead,
                          reminder_time: e.target.value,
                        })
                      }
                      className="rounded-2xl border border-black/10 px-3 py-3"
                    />
                  </div>
                </label>
                <textarea
                  value={newLead.message}
                  onChange={(e) =>
                    setNewLead({ ...newLead, message: e.target.value })
                  }
                  placeholder={
                    locale === "ru"
                      ? "Информация о компании"
                      : "Company information"
                  }
                  className="min-h-24 rounded-2xl border border-black/10 px-4 py-3 md:col-span-2"
                />
              </div>
              {duplicateMatches.length > 0 && (
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <b>{t.duplicate}</b>
                  <div>{duplicateMatches.map((x) => x.name).join(", ")}</div>
                </div>
              )}
              <button className="mt-4 rounded-full bg-[#211a17] px-5 py-3 text-white">
                {locale === "ru" ? "Сохранить запись" : "Save record"}
              </button>
            </form>
          )}

          {section === "reports" && (
            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["day", locale === "ru" ? "Сегодня" : "Today"],
                    ["week", locale === "ru" ? "Неделя" : "Week"],
                    ["month", locale === "ru" ? "Месяц" : "Month"],
                    ["half_year", locale === "ru" ? "Полгода" : "Half-year"],
                    ["year", locale === "ru" ? "Год" : "Year"],
                  ] as [ReportPeriod, string][]
                ).map(([period, label]) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setReportPeriod(period)}
                    className={`rounded-full border px-4 py-2 text-sm ${reportPeriod === period ? "border-[#211a17] bg-[#211a17] text-white" : "border-black/10 bg-white"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
                {[
                  [
                    locale === "ru" ? "Все действия" : "All actions",
                    reportCounts.total,
                  ],
                  [
                    locale === "ru" ? "Добавлено" : "Added",
                    reportCounts.created,
                  ],
                  [
                    locale === "ru" ? "Статусы" : "Statuses",
                    reportCounts.statuses,
                  ],
                  [
                    locale === "ru" ? "Связались" : "Contacts",
                    reportCounts.contacts,
                  ],
                  [
                    locale === "ru" ? "Изменения" : "Updates",
                    reportCounts.updates,
                  ],
                  [
                    locale === "ru" ? "Удалено" : "Deleted",
                    reportCounts.deleted,
                  ],
                ].map(([label, value]) => (
                  <div
                    key={String(label)}
                    className="rounded-[22px] border border-black/10 bg-white p-4"
                  >
                    <div className="text-xs uppercase tracking-[.08em] text-black/40">
                      {label}
                    </div>
                    <div className="mt-2 text-3xl">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[28px] border border-black/10 bg-white p-5">
                <h2 className="text-xl">
                  {locale === "ru"
                    ? "Изменения по статусам"
                    : "Changes by status"}
                </h2>
                <p className="mt-1 text-sm text-black/45">
                  {locale === "ru"
                    ? "Сколько записей за выбранный период переведено в каждый статус."
                    : "How many records moved to each status during the selected period."}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {(
                    [
                      "new",
                      "draft",
                      "contacted",
                      "in_progress",
                      "won",
                      "lost",
                      "dead",
                      "not_profitable",
                    ] as LeadStatus[]
                  ).map((status) => (
                    <div
                      key={status}
                      className="flex items-center justify-between rounded-2xl bg-[#f7f3ef] px-4 py-3"
                    >
                      <span className="text-sm">{t.filters[status]}</span>
                      <b className="text-xl">{reportStatusCounts[status]}</b>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-[28px] border border-black/10 bg-white">
                <div className="border-b border-black/10 px-5 py-4">
                  <h2 className="text-xl">
                    {locale === "ru" ? "История действий" : "Activity history"}
                  </h2>
                  <p className="mt-1 text-sm text-black/45">
                    {locale === "ru"
                      ? "Здесь сохраняются добавления, изменения, контакты, статусы и удаления."
                      : "Adds, updates, contacts, status changes and deletions are saved here."}
                  </p>
                </div>
                {reportActivity.length ? (
                  <div className="divide-y divide-black/5">
                    {reportActivity.map((item) => (
                      <div
                        key={item.id}
                        className="grid gap-2 px-5 py-4 sm:grid-cols-[150px_1fr_auto] sm:items-center"
                      >
                        <time className="text-xs text-black/45">
                          {new Date(item.created_at).toLocaleString(
                            locale === "ru" ? "ru-RU" : "en-US",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </time>
                        <div>
                          <div className="font-medium">
                            {activityTitle(item)}
                          </div>
                          {(item.lead_name || item.details) && (
                            <div className="mt-1 text-sm text-black/55">
                              {[item.lead_name, item.details]
                                .filter(Boolean)
                                .join(" · ")}
                            </div>
                          )}
                        </div>
                        {item.from_status && item.to_status && (
                          <div className="rounded-full bg-[#f2ece7] px-3 py-1 text-xs">
                            {t.statuses[item.from_status]} →{" "}
                            {t.statuses[item.to_status]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-5 py-12 text-center text-sm text-black/45">
                    {locale === "ru"
                      ? "За выбранный период действий пока нет."
                      : "No activity for the selected period yet."}
                  </div>
                )}
              </div>
            </div>
          )}

          {section === "analytics" && (
            <div className="mt-8">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  [
                    locale === "ru" ? "Всего клиентов" : "Total clients",
                    analytics.total,
                  ],
                  [
                    locale === "ru" ? "Связались" : "Contacted",
                    analytics.contacted,
                  ],
                  [locale === "ru" ? "Успешно" : "Won", analytics.won],
                  [
                    locale === "ru" ? "Конверсия" : "Conversion",
                    `${analytics.conversion}%`,
                  ],
                ].map(([label, value]) => (
                  <div
                    key={String(label)}
                    className="rounded-[24px] border border-black/10 bg-white p-5"
                  >
                    <div className="text-xs uppercase text-black/40">
                      {label}
                    </div>
                    <div className="mt-2 text-3xl">{value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                {[
                  [
                    locale === "ru" ? "Источники клиентов" : "Lead sources",
                    analytics.sources,
                  ],
                  [
                    locale === "ru" ? "Категории" : "Categories",
                    analytics.categories,
                  ],
                ].map(([title, items]) => (
                  <div
                    key={String(title)}
                    className="rounded-[28px] border border-black/10 bg-white p-6"
                  >
                    <h2 className="text-xl">{String(title)}</h2>
                    <div className="mt-5 space-y-3">
                      {(items as [string, number][]).map(([name, value]) => (
                        <div
                          key={name}
                          className="flex justify-between border-b border-black/5 pb-2"
                        >
                          <span>{name}</span>
                          <b>{value}</b>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === "templates" && (
            <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {settings.templates.map((template) => (
                  <div
                    key={template.id}
                    className="rounded-[24px] border border-black/10 bg-white p-5"
                  >
                    <div className="flex gap-3">
                      <input
                        value={template.name}
                        onChange={(e) =>
                          setSettings({
                            templates: settings.templates.map((x) =>
                              x.id === template.id
                                ? { ...x, name: e.target.value }
                                : x,
                            ),
                          })
                        }
                        className="min-w-0 flex-1 font-medium outline-none"
                      />
                      <button
                        onClick={() =>
                          void saveTemplates(
                            settings.templates.filter(
                              (x) => x.id !== template.id,
                            ),
                          )
                        }
                        className="text-sm text-red-700"
                      >
                        ×
                      </button>
                    </div>
                    <textarea
                      value={template.text}
                      onChange={(e) =>
                        setSettings({
                          templates: settings.templates.map((x) =>
                            x.id === template.id
                              ? { ...x, text: e.target.value }
                              : x,
                          ),
                        })
                      }
                      rows={4}
                      className="mt-3 w-full rounded-2xl border border-black/10 bg-[#faf8f6] p-3"
                    />
                    <button
                      onClick={() => void saveTemplates(settings.templates)}
                      className="mt-3 rounded-full border border-black/10 px-4 py-2 text-sm"
                    >
                      {t.save}
                    </button>
                  </div>
                ))}
              </div>
              <form
                onSubmit={addTemplate}
                className="h-fit rounded-[24px] border border-black/10 bg-white p-5"
              >
                <h2 className="text-xl">
                  {locale === "ru" ? "Новый шаблон" : "New template"}
                </h2>
                <input
                  value={newTemplate.name}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, name: e.target.value })
                  }
                  placeholder={locale === "ru" ? "Название" : "Name"}
                  className="mt-4 w-full rounded-2xl border border-black/10 px-4 py-3"
                />
                <textarea
                  value={newTemplate.text}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, text: e.target.value })
                  }
                  placeholder="Текст: {{name}}, {{company}}, {{city}}, {{project}}"
                  rows={7}
                  className="mt-3 w-full rounded-2xl border border-black/10 px-4 py-3"
                />
                <button className="mt-3 w-full rounded-full bg-[#211a17] px-4 py-3 text-white">
                  {locale === "ru" ? "Добавить шаблон" : "Add template"}
                </button>
              </form>
            </div>
          )}

          {section === "kanban" && (
            <div className="mt-8 overflow-x-auto">
              <div className="grid min-w-[1680px] grid-cols-8 gap-3">
                {(
                  [
                    "new",
                    "draft",
                    "contacted",
                    "in_progress",
                    "won",
                    "lost",
                    "dead",
                    "not_profitable",
                  ] as LeadStatus[]
                ).map((status) => (
                  <div
                    key={status}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) =>
                      void changeStatus(
                        e.dataTransfer.getData("text/plain"),
                        status,
                      )
                    }
                    className="min-h-[500px] rounded-[24px] border border-black/10 bg-white/60 p-3"
                  >
                    <div className="flex justify-between px-2 py-2">
                      <b className="text-sm">{t.statuses[status]}</b>
                      <span className="text-xs">
                        {crmLeads.filter((x) => x.status === status).length}
                      </span>
                    </div>
                    <div className="mt-2 space-y-3">
                      {crmLeads
                        .filter((x) => x.status === status)
                        .map((lead) => (
                          <button
                            key={lead.id}
                            draggable
                            onDragStart={(e) =>
                              e.dataTransfer.setData("text/plain", lead.id)
                            }
                            onClick={() => fillDraft(lead)}
                            className={`block w-full rounded-2xl border p-3 text-left text-sm shadow-sm ${reminderTone(crmMeta[lead.id]) || "border-black/10 bg-white"}`}
                          >
                            <b>{lead.name}</b>
                            <div className="mt-2 text-xs text-black/45">
                              {leadCategories(lead, crmMeta[lead.id]).join(
                                ", ",
                              ) ||
                                lead.project_type ||
                                "—"}
                            </div>
                            {crmMeta[lead.id]?.reminder_at && (
                              <div className="mt-2 text-xs">
                                ◷ {crmMeta[lead.id]?.reminder_at}{" "}
                                {crmMeta[lead.id]?.reminder_time || ""}
                              </div>
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!["analytics", "reports", "templates", "kanban", "planner"].includes(
            section,
          ) && (
            <>
              <div className="mt-7 flex flex-wrap gap-2">
                {filterKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`rounded-full border px-4 py-2 text-sm ${filter === key ? "border-[#211a17] bg-[#211a17] text-white" : "border-black/10 bg-white"}`}
                  >
                    {t.filters[key]}{" "}
                    <span className="opacity-60">{counts[key]}</span>
                  </button>
                ))}
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.search}
                  className="rounded-2xl border border-black/10 bg-white px-4 py-3 xl:col-span-2"
                />
                <select
                  value={countryFilter}
                  onChange={(e) => {
                    setCountryFilter(e.target.value);
                    setCityFilter("");
                  }}
                  className="rounded-2xl border border-black/10 bg-white px-3"
                >
                  <option value="">
                    {locale === "ru" ? "Все страны" : "All countries"}
                  </option>
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>
                      {countryLabel(country, locale)}
                    </option>
                  ))}
                </select>
                <CitySelect
                  country={countryFilter}
                  value={cityFilter}
                  cities={cityOptions}
                  locale={locale}
                  onChange={setCityFilter}
                  onAdd={(country, city) => void addCustomCity(country, city)}
                />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-2xl border border-black/10 bg-white px-3"
                >
                  <option value="">
                    {locale === "ru" ? "Все категории" : "All categories"}
                  </option>
                  {categoryOptions.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
                <select
                  value={profitabilityFilter}
                  onChange={(e) => setProfitabilityFilter(e.target.value)}
                  className="rounded-2xl border border-black/10 bg-white px-3"
                >
                  <option value="">
                    {locale === "ru" ? "Любой приоритет" : "Any priority"}
                  </option>
                  <option value="high">
                    {locale === "ru" ? "Высокая" : "High"}
                  </option>
                  <option value="medium">
                    {locale === "ru" ? "Средняя" : "Medium"}
                  </option>
                  <option value="low">
                    {locale === "ru" ? "Низкая" : "Low"}
                  </option>
                </select>
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="rounded-2xl border border-black/10 bg-white px-3"
                >
                  <option value="">
                    {locale === "ru" ? "Все источники" : "All sources"}
                  </option>
                  {sourceOptions.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="rounded-2xl border border-black/10 bg-white px-3"
                >
                  <option value="">
                    {locale === "ru" ? "Все теги" : "All tags"}
                  </option>
                  {tagOptions.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
              <div className="mt-3 flex justify-between text-xs text-black/40">
                <span>
                  {t.found}: {visibleLeads.length}
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortMode)}
                  className="rounded-xl border border-black/10 bg-white px-3 py-2"
                >
                  <option value="newest">{t.newest}</option>
                  <option value="oldest">{t.oldest}</option>
                  <option value="name">{t.name}</option>
                </select>
              </div>
              {notice && (
                <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                  {notice}
                </div>
              )}
              {error && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  {error}
                </div>
              )}
              <div className="mt-7 grid gap-4">
                {visibleLeads.map((lead) => (
                  <button
                    type="button"
                    key={lead.id}
                    onClick={() => fillDraft(lead)}
                    className={`w-full rounded-[28px] border p-5 text-left transition hover:shadow-sm ${reminderTone(crmMeta[lead.id]) || "border-black/10 bg-white"}`}
                  >
                    <div className="flex flex-wrap justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl">{lead.name}</h2>
                          <span
                            className={`rounded-full px-3 py-1 text-xs ${statusStyles[lead.status]}`}
                          >
                            {t.statuses[lead.status]}
                          </span>
                          {crmMeta[lead.id]?.temperature && (
                            <span className="rounded-full bg-black/5 px-3 py-1 text-xs">
                              {crmMeta[lead.id]?.temperature === "hot"
                                ? "🔥"
                                : crmMeta[lead.id]?.temperature === "warm"
                                  ? "☀"
                                  : "❄"}{" "}
                              {crmMeta[lead.id]?.temperature}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-black/45">
                          {new Date(lead.created_at).toLocaleString(
                            locale === "ru" ? "ru-RU" : "en-US",
                          )}
                        </p>
                      </div>
                      {crmMeta[lead.id]?.reminder_at && (
                        <span className="rounded-full bg-white px-3 py-1 text-xs">
                          ◷ {crmMeta[lead.id]?.reminder_at}{" "}
                          {crmMeta[lead.id]?.reminder_time || ""}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 grid gap-4 sm:grid-cols-4">
                      <div>
                        <small className="text-black/40">
                          {t.contact.toUpperCase()}
                        </small>
                        <p className="break-all">{lead.contact}</p>
                      </div>
                      <div>
                        <small className="text-black/40">
                          {t.company.toUpperCase()}
                        </small>
                        <p>{lead.company || "—"}</p>
                      </div>
                      <div>
                        <small className="text-black/40">
                          {locale === "ru" ? "КАТЕГОРИИ" : "CATEGORIES"}
                        </small>
                        <p>
                          {leadCategories(lead, crmMeta[lead.id]).join(", ") ||
                            "—"}
                        </p>
                      </div>
                      <div>
                        <small className="text-black/40">
                          {locale === "ru" ? "ИСТОЧНИК" : "SOURCE"}
                        </small>
                        <p>
                          {crmMeta[lead.id]?.source || lead.source_path || "—"}
                        </p>
                      </div>
                    </div>
                    {(crmMeta[lead.id]?.tags || []).length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {crmMeta[lead.id]?.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#f0ebe5] px-3 py-1 text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 text-sm font-medium">{t.open} →</div>
                  </button>
                ))}
                {!loading && visibleLeads.length === 0 && (
                  <div className="rounded-[28px] border border-black/10 bg-white p-8 text-black/50">
                    {t.none}
                  </div>
                )}
              </div>
            </>
          )}

          {selected && (
            <>
              <button
                type="button"
                aria-label={t.close}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 z-30 bg-black/35 backdrop-blur-[2px]"
              />
              <aside className="fixed inset-y-0 right-0 z-40 w-full max-w-[520px] overflow-y-auto border-l border-black/10 bg-[#f5f1ec] p-4 shadow-2xl md:p-6">
                <div className="rounded-[28px] border border-black/10 bg-white p-5 shadow-sm">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase text-black/35">
                        {t.lead}
                      </p>
                      <h2 className="mt-2 text-2xl">{selected.name}</h2>
                      {selectedLocalTime && (
                        <p className="mt-2 text-sm text-black/55">
                          🕒 {selectedLocalTime.label}: {selectedLocalTimeText}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedId(null)}
                      className="h-9 w-9 rounded-full border border-black/10"
                    >
                      ×
                    </button>
                  </div>
                  <div className="mt-6 space-y-5">
                    <label className="block text-xs text-black/40">
                      {t.status}
                      <select
                        value={draftStatus}
                        onChange={(e) =>
                          setDraftStatus(e.target.value as LeadStatus)
                        }
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"
                      >
                        {(
                          [
                            "new",
                            "draft",
                            "contacted",
                            "in_progress",
                            "won",
                            "lost",
                            "dead",
                            "not_profitable",
                          ] as LeadStatus[]
                        ).map((status) => (
                          <option key={status} value={status}>
                            {t.statuses[status]}
                          </option>
                        ))}
                      </select>
                    </label>
                    {contactEditor(
                      locale === "ru" ? "Телефон" : "Phone",
                      draftPhones,
                      setDraftPhones,
                      "+7 700 000 00 00",
                      "tel",
                    )}
                    {contactEditor(
                      "Instagram",
                      draftInstagrams,
                      setDraftInstagrams,
                      "@company",
                    )}
                    {contactEditor(
                      "Facebook",
                      draftFacebooks,
                      setDraftFacebooks,
                      "https://facebook.com/company",
                      "url",
                    )}
                    {contactEditor(
                      locale === "ru" ? "Почта" : "Email",
                      draftEmails,
                      setDraftEmails,
                      "mail@example.com",
                      "email",
                    )}
                    {contactEditor(
                      locale === "ru" ? "Сайт" : "Website",
                      draftWebsites,
                      setDraftWebsites,
                      "https://example.com",
                      "url",
                    )}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="text-xs text-black/40">
                        {locale === "ru" ? "Компания" : "Company"}
                        <input
                          value={draftCompany}
                          onChange={(e) => setDraftCompany(e.target.value)}
                          className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"
                        />
                      </label>
                      <label className="text-xs text-black/40">
                        {locale === "ru" ? "Страна" : "Country"}
                        <select
                          value={draftCountry}
                          onChange={(e) => {
                            setDraftCountry(e.target.value);
                            setDraftCity("");
                          }}
                          className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-3 py-3"
                        >
                          <option value="">
                            {locale === "ru"
                              ? "Выберите страну"
                              : "Select country"}
                          </option>
                          {countryOptions.map((country) => (
                            <option key={country} value={country}>
                              {countryLabel(country, locale)}
                            </option>
                          ))}
                        </select>
                      </label>
                      <div className="text-xs text-black/40 sm:col-span-2">
                        <div>{locale === "ru" ? "Город" : "City"}</div>
                        <CitySelect
                          className="mt-2"
                          country={draftCountry}
                          value={draftCity}
                          cities={draftCityOptions}
                          locale={locale}
                          onChange={setDraftCity}
                          onAdd={(country, city) =>
                            void addCustomCity(country, city)
                          }
                        />
                      </div>
                      <div className="text-xs text-black/40 sm:col-span-2">
                        <div>
                          {locale === "ru"
                            ? "Категории — можно выбрать несколько"
                            : "Categories — select multiple"}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2 rounded-2xl border border-black/10 bg-[#faf8f6] p-3">
                          {categoryOptions.map((category) => (
                            <button
                              type="button"
                              key={category}
                              onClick={() =>
                                setDraftCategory(
                                  toggleCategory(draftCategory, category),
                                )
                              }
                              className={`rounded-full border px-3 py-2 text-xs ${categoryValues(draftCategory).includes(category) ? "border-[#211a17] bg-[#211a17] text-white" : "border-black/10 bg-white text-black"}`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                      <label className="text-xs text-black/40 sm:col-span-2">
                        {locale === "ru" ? "Источник" : "Source"}
                        <input
                          value={draftSource}
                          onChange={(e) => setDraftSource(e.target.value)}
                          className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"
                        />
                      </label>
                    </div>
                    <label className="block text-xs text-black/40">
                      {locale === "ru"
                        ? "Теги через запятую"
                        : "Tags, comma separated"}
                      <input
                        value={draftTags}
                        onChange={(e) => setDraftTags(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"
                      />
                    </label>
                    <label className="block text-xs text-black/40">
                      {locale === "ru" ? "Приоритет лида" : "Lead priority"}
                      <select
                        value={draftProfitability}
                        onChange={(e) =>
                          setDraftProfitability(
                            e.target.value as LeadProfitability | "",
                          )
                        }
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"
                      >
                        <option value="">
                          {locale === "ru" ? "Не указана" : "Not set"}
                        </option>
                        <option value="high">
                          {locale === "ru"
                            ? "Высокая — нет сайта / digital слабый"
                            : "High — no site / weak digital"}
                        </option>
                        <option value="medium">
                          {locale === "ru"
                            ? "Средняя — сайт требует улучшений"
                            : "Medium — site needs improvements"}
                        </option>
                        <option value="low">
                          {locale === "ru"
                            ? "Низкая — сильный сайт или сеть"
                            : "Low — strong site or chain"}
                        </option>
                      </select>
                    </label>
                    <label className="block text-xs text-black/40">
                      {locale === "ru" ? "Следующий контакт" : "Next contact"}
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <input
                          type="date"
                          value={draftReminder}
                          onChange={(e) => setDraftReminder(e.target.value)}
                          className="rounded-2xl border border-black/10 bg-[#faf8f6] px-3 py-3"
                        />
                        <input
                          type="time"
                          value={draftReminderTime}
                          onChange={(e) => setDraftReminderTime(e.target.value)}
                          className="rounded-2xl border border-black/10 bg-[#faf8f6] px-3 py-3"
                        />
                      </div>
                    </label>
                    <label className="block text-xs text-black/40">
                      {t.note}
                      <textarea
                        value={draftNotes}
                        onChange={(e) => setDraftNotes(e.target.value)}
                        rows={5}
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"
                      />
                    </label>
                    <button
                      onClick={saveLead}
                      disabled={saving}
                      className="w-full rounded-full bg-[#211a17] px-5 py-3.5 text-white"
                    >
                      {saving ? t.saving : t.save}
                    </button>
                    {saved && (
                      <p className="text-center text-sm text-green-700">
                        {t.saved}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setDraftPrimaryMessage(
                            buildPrimaryMessage(selected, "ru"),
                          );
                          setDraftFollowupMessage(
                            buildFollowupMessage(selected, "ru"),
                          );
                        }}
                        className="rounded-full border border-black/10 px-3 py-2 text-xs"
                      >
                        RU
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDraftPrimaryMessage(
                            buildPrimaryMessage(selected, "en"),
                          );
                          setDraftFollowupMessage(
                            buildFollowupMessage(selected, "en"),
                          );
                        }}
                        className="rounded-full border border-black/10 px-3 py-2 text-xs"
                      >
                        EN
                      </button>
                    </div>
                    <div className="border-t border-black/10 pt-5">
                      <div className="flex items-center justify-between">
                        <div className="text-xs uppercase text-black/40">
                          {t.primaryMessage}
                        </div>
                        <select
                          defaultValue=""
                          onChange={(e) => {
                            const template = settings.templates.find(
                              (x) => x.id === e.target.value,
                            );
                            if (template) setDraftPrimaryMessage(template.text);
                            e.currentTarget.value = "";
                          }}
                          className="rounded-xl border border-black/10 px-2 py-1 text-xs"
                        >
                          <option value="" disabled>
                            {locale === "ru"
                              ? "Выбрать шаблон"
                              : "Choose template"}
                          </option>
                          {settings.templates.map((x) => (
                            <option key={x.id} value={x.id}>
                              {x.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <textarea
                        value={draftPrimaryMessage}
                        onChange={(e) => setDraftPrimaryMessage(e.target.value)}
                        rows={5}
                        placeholder={
                          locale === "ru"
                            ? "Напиши основное сообщение"
                            : "Write primary message"
                        }
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {contactValues(selected.contact, "Телефон").map(
                        (phone, index) => (
                          <button
                            key={`p-wa-${index}`}
                            onClick={() =>
                              sendWhatsApp(selected, phone, draftPrimaryMessage)
                            }
                            disabled={!draftPrimaryMessage.trim()}
                            className="rounded-full bg-[#327f51] px-3 py-2 text-xs text-white disabled:opacity-40"
                          >
                            WhatsApp {index + 1}
                          </button>
                        ),
                      )}
                      {contactValues(selected.contact, "Email").map(
                        (email, index) => (
                          <button
                            key={`p-em-${index}`}
                            onClick={() =>
                              sendEmail(selected, email, draftPrimaryMessage)
                            }
                            disabled={!draftPrimaryMessage.trim()}
                            className="rounded-full bg-[#405d8a] px-3 py-2 text-xs text-white disabled:opacity-40"
                          >
                            Email {index + 1}
                          </button>
                        ),
                      )}
                    </div>
                    <div className="border-t border-black/10 pt-5">
                      <div className="text-xs uppercase text-black/40">
                        {t.followupMessage}
                      </div>
                      <textarea
                        value={draftFollowupMessage}
                        onChange={(e) =>
                          setDraftFollowupMessage(e.target.value)
                        }
                        rows={5}
                        className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {contactValues(selected.contact, "Телефон").map(
                        (phone, index) => (
                          <button
                            key={`f-wa-${index}`}
                            onClick={() =>
                              sendWhatsApp(
                                selected,
                                phone,
                                draftFollowupMessage,
                              )
                            }
                            className="rounded-full bg-[#327f51] px-3 py-2 text-xs text-white"
                          >
                            WhatsApp {index + 1}
                          </button>
                        ),
                      )}
                      {contactValues(selected.contact, "Email").map(
                        (email, index) => (
                          <button
                            key={`f-em-${index}`}
                            onClick={() =>
                              sendEmail(selected, email, draftFollowupMessage)
                            }
                            className="rounded-full bg-[#405d8a] px-3 py-2 text-xs text-white"
                          >
                            Email {index + 1}
                          </button>
                        ),
                      )}
                      <button
                        onClick={() =>
                          void copyText(
                            renderTemplate(draftFollowupMessage, selected),
                          )
                        }
                        className="rounded-full border border-black/10 px-3 py-2 text-xs"
                      >
                        {copied ? t.copied : t.copy}
                      </button>
                    </div>
                    {contactValues(selected.contact, "Facebook").length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {contactValues(selected.contact, "Facebook").map(
                          (facebook, index) => (
                            <button
                              key={facebook + index}
                              onClick={() => openFacebook(selected, facebook)}
                              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800"
                            >
                              Facebook {index + 1}
                            </button>
                          ),
                        )}
                      </div>
                    )}
                    {contactValues(selected.contact, "Instagram").length >
                      0 && (
                      <div className="flex flex-wrap gap-2">
                        {contactValues(selected.contact, "Instagram").map(
                          (instagram, index) => (
                            <button
                              key={instagram + index}
                              onClick={() => openInstagram(selected, instagram)}
                              className="rounded-full border border-pink-200 bg-pink-50 px-3 py-2 text-xs text-pink-800"
                            >
                              Instagram {index + 1}
                            </button>
                          ),
                        )}
                      </div>
                    )}
                    {contactValues(selected.contact, "Сайт").length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {contactValues(selected.contact, "Сайт").map(
                          (website, index) => (
                            <button
                              key={website + index}
                              onClick={() => openWebsite(selected, website)}
                              className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800"
                            >
                              🌐 Сайт {index + 1}
                            </button>
                          ),
                        )}
                      </div>
                    )}
                    <div className="border-t border-black/10 pt-5">
                      <div className="flex justify-between">
                        <div className="text-xs uppercase text-black/40">
                          {locale === "ru" ? "Файлы клиента" : "Client files"}
                        </div>
                        <label className="cursor-pointer text-sm underline">
                          + {locale === "ru" ? "Добавить файл" : "Add file"}
                          <input
                            type="file"
                            onChange={handleAttachment}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div className="mt-3 space-y-2">
                        {(crmMeta[selected.id]?.attachments || []).map(
                          (file) => (
                            <div
                              key={file.id}
                              className="flex justify-between gap-2 rounded-2xl bg-[#faf8f6] p-3 text-sm"
                            >
                              <button
                                onClick={() => downloadAttachment(file.id)}
                                className="min-w-0 truncate underline"
                              >
                                {file.name}
                              </button>
                              <button
                                onClick={() => void removeAttachment(file.id)}
                                className="text-red-700"
                              >
                                ×
                              </button>
                            </div>
                          ),
                        )}
                        {!(crmMeta[selected.id]?.attachments || []).length && (
                          <p className="text-sm text-black/40">
                            {locale === "ru"
                              ? "Файлов пока нет"
                              : "No files yet"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="border-t border-black/10 pt-5">
                      <div className="text-xs uppercase text-black/40">
                        {locale === "ru"
                          ? "История взаимодействий"
                          : "Interaction history"}
                      </div>
                      <div className="mt-3 space-y-3">
                        {interactionTimeline(crmMeta[selected.id]).map(
                          (item) => (
                            <div
                              key={item.id}
                              className="rounded-2xl bg-[#faf8f6] p-3"
                            >
                              <div className="flex justify-between gap-3 text-xs text-black/40">
                                <span>
                                  {interactionLabel(item.channel, locale)}
                                </span>
                                <span>
                                  {new Date(item.created_at).toLocaleString(
                                    locale === "ru" ? "ru-RU" : "en-US",
                                  )}
                                </span>
                              </div>
                              <p className="mt-2 whitespace-pre-wrap text-sm">
                                {item.text}
                              </p>
                            </div>
                          ),
                        )}
                        {interactionTimeline(crmMeta[selected.id]).length ===
                          0 && (
                          <p className="text-sm text-black/40">
                            {locale === "ru"
                              ? "История пока пустая"
                              : "No interactions yet"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="border-t border-black/10 pt-5">
                      <button
                        onClick={deleteLead}
                        disabled={deleting}
                        className="w-full rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700"
                      >
                        {deleting ? t.deleting : t.delete}
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
