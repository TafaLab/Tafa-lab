"use client";
// CRM data and UI are kept independent from deployment-time font fetching.

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

type LeadStatus = "new" | "draft" | "contacted" | "in_progress" | "won" | "lost";
type LeadFilter = "all" | LeadStatus;
type SortMode = "newest" | "oldest" | "name";

type NoteEntry = { text: string; created_at: string };
type InteractionChannel = "whatsapp" | "email" | "instagram" | "note" | "status";
type InteractionEntry = { id: string; channel: InteractionChannel; text: string; created_at: string };
type AttachmentEntry = { id: string; name: string; type: string; size: number; created_at: string };
type StoredAttachment = AttachmentEntry & { data_url: string };
type MessageTemplate = { id: string; name: string; text: string };
type LeadTemperature = "cold" | "warm" | "hot";
type CrmSettings = { templates: MessageTemplate[] };
type CrmMeta = {
  reminder_at: string;
  reminder_time?: string;
  history: NoteEntry[];
  interactions?: InteractionEntry[];
  status?: LeadStatus;
  contact?: string;
  city?: string | null;
  company?: string | null;
  primary_message?: string;
  followup_message?: string;
  category?: string;
  tags?: string[];
  source?: string;
  temperature?: LeadTemperature;
  attachments?: AttachmentEntry[];
};
type CrmSyncState = { meta: Record<string,CrmMeta>; manual: Lead[]; deleted: string[]; settings?: CrmSettings; synced_at?: string };
type Lead = {
  id: string;
  created_at: string;
  name: string;
  contact: string;
  company: string | null;
  city?: string | null;
  project_type: string | null;
  message: string | null;
  locale: "ru" | "en";
  source_path: string | null;
  status: LeadStatus;
  admin_notes: string | null;
};

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
    admin:"CRM · Заявки и клиенты", leads:"Заявки", total:"Всего", refresh:"Обновить", refreshing:"Обновляем…",
    logout:"Выйти", search:"Поиск по имени, контакту, компании, сообщению…", sort:"Сортировка",
    newest:"Сначала новые", oldest:"Сначала старые", name:"По имени",
    filters:{all:"Все",new:"Новые",draft:"Черновики",contacted:"Связались",in_progress:"В работе",won:"Успешно",lost:"Отказ"},
    statuses:{new:"Новая",draft:"Черновик",contacted:"Связались",in_progress:"В работе",won:"Успешно",lost:"Отказ"},
    contact:"Контакт", company:"Компания", type:"Тип проекта", message:"Сообщение", open:"Открыть заявку",
    none:"В этом разделе заявок пока нет.", lead:"Заявка", status:"Статус", note:"Внутренняя заметка",
    notePh:"Например: написала в WhatsApp, клиент просит созвон завтра…",
    save:"Сохранить", saving:"Сохраняем…", saved:"✓ Изменения сохранены", source:"Источник",
    close:"Закрыть", select:"Нажми на заявку, чтобы изменить статус и добавить внутреннюю заметку.",
    delete:"Удалить заявку", deleting:"Удаляем…",
    deleteAsk:"Удалить эту заявку? Это действие нельзя отменить.",
    deleted:"Заявка удалена.", copy:"Копировать контакт", copied:"Скопировано",
    login:"Вход в закрытую панель заявок.", password:"Пароль", signIn:"Войти", signing:"Входим…",
    loginError:"Не удалось войти. Проверь email и пароль.",
    found:"Найдено", duplicate:"Такая запись уже есть в CRM", addInstagram:"Добавить Instagram", addEmail:"Добавить почту", remove:"Удалить", primaryMessage:"Основное сообщение", followupMessage:"Повторное сообщение", openWhatsApp:"Открыть WhatsApp", openEmail:"Открыть почту",
  },
  en: {
    admin:"Admin · Leads", leads:"Leads", total:"Total", refresh:"Refresh", refreshing:"Refreshing…",
    logout:"Log out", search:"Search name, contact, company or message…", sort:"Sort",
    newest:"Newest first", oldest:"Oldest first", name:"By name",
    filters:{all:"All",new:"New",draft:"Drafts",contacted:"Contacted",in_progress:"In progress",won:"Won",lost:"Lost"},
    statuses:{new:"New",draft:"Draft",contacted:"Contacted",in_progress:"In progress",won:"Won",lost:"Lost"},
    contact:"Contact", company:"Company", type:"Project type", message:"Message", open:"Open lead",
    none:"No leads in this section yet.", lead:"Lead", status:"Status", note:"Internal note",
    notePh:"For example: contacted via WhatsApp, client asked for a call tomorrow…",
    save:"Save", saving:"Saving…", saved:"✓ Changes saved", source:"Source",
    close:"Close", select:"Select a lead to change its status and add an internal note.",
    delete:"Delete lead", deleting:"Deleting…",
    deleteAsk:"Delete this lead? This action cannot be undone.",
    deleted:"Lead deleted.", copy:"Copy contact", copied:"Copied",
    login:"Sign in to the private leads dashboard.", password:"Password", signIn:"Sign in", signing:"Signing in…",
    loginError:"Could not sign in. Check your email and password.",
    found:"Found", duplicate:"This contact is already in CRM", addInstagram:"Add Instagram", addEmail:"Add email", remove:"Remove", primaryMessage:"Primary message", followupMessage:"Follow-up message", openWhatsApp:"Open WhatsApp", openEmail:"Open email",
  }
} as const;

const kaskelenLeads:Lead[]=[
 {id:"kaskelen-dave",city:"Каскелен",created_at:"2026-09-05T00:00:00Z",name:"Кондитерская Фабрика Dave",contact:"+7 700 555 50 51",company:"Кондитерская Фабрика Dave",project_type:"Сайт и CRM для производства",message:"Производитель кондитерских изделий. Адрес: ул. Кайназар батыра, 35, Каскелен. Производство уже серьёзнее домашнего кондитера; современный сайт не найден.",locale:"ru",source_path:"Каскелен · найдено ранее",status:"new",admin_notes:null},
 {id:"kaskelen-praga",city:"Каскелен",created_at:"2026-09-05T00:00:00Z",name:"Кондитерская «Прага»",contact:"Instagram: @praga_kz",company:"Кондитерская «Прага»",project_type:"Сайт и онлайн-заказ",message:"Каскелен · кондитерская и кофейня. Instagram: https://www.instagram.com/praga_kz/ · производство: @praga.qz · часы: ежедневно 07:30–21:00. Сайт, email и WhatsApp не подтверждены.",locale:"ru",source_path:"Instagram · @praga_kz",status:"new",admin_notes:null},
 {id:"kaskelen-happy-cake",city:"Каскелен",created_at:"2026-09-05T00:00:00Z",name:"Happy Cake Каскелен",contact:"+7 707 777 11 44",company:"Happy Cake",project_type:"Сайт, доставка и CRM",message:"Сайт: https://happycake.kz/qaskelen/ · 3 точки в Каскелене, доставка и самовывоз, Wolt. Бенто-торты, чизкейки, медовик, детские, свадебные и корпоративные торты.",locale:"ru",source_path:"happycake.kz/qaskelen",status:"new",admin_notes:null},
 {id:"kaskelen-cakes",city:"Каскелен",created_at:"2026-09-05T00:00:00Z",name:"Kaskelen Cakes",contact:"Instagram: @kaskelen_cakes",company:"Kaskelen Cakes",project_type:"Каталог и заказы тортов",message:"Instagram: https://www.instagram.com/kaskelen_cakes/?hl=en · адрес: ул. Жангозина, 61Б, блок 10, Каскелен · ежедневно 09:00–23:00. Торты и оформление для мероприятий.",locale:"ru",source_path:"Instagram · @kaskelen_cakes",status:"new",admin_notes:null},
 {id:"kaskelen-kulikov",created_at:"2026-09-05T00:00:00Z",name:"Kulikov Каскелен",contact:"Контакт не найден",company:"Kulikov",project_type:"Сайт и заказы тортов",message:"Карточка: https://2gis.kz/almaty/firm/70000001065735365 · адрес: просп. Абылай Хана, 46/46Б. Торты на заказ и фототорты.",locale:"ru",source_path:"2GIS · Kulikov",status:"new",admin_notes:null},
 {id:"kaskelen-qulpynai",created_at:"2026-09-05T00:00:00Z",name:"Qulpynai Каскелен",contact:"Контакт не найден",company:"Qulpynai",project_type:"Сайт и кондитерская",message:"Карточка: https://restoran.kz/cookery/101721-qulpynai-kaskelen · адрес: ул. Кисыкова, 42А, Каскелен. Ресторан/кондитерская, десерты и заказы.",locale:"ru",source_path:"restoran.kz · Qulpynai",status:"new",admin_notes:null},
 {id:"kaskelen-yerkinay",created_at:"2026-09-05T00:00:00Z",name:"Yerkinay tattileri",contact:"Контакт не найден",company:"Yerkinay tattileri",project_type:"Сайт для пекарни-кондитерской",message:"Карточка: https://2gis.kz/almaty/firm/70000001090713630/tab/info · ул. Жибек Жолы, 31Б, Шамалган (рядом с Каскеленом). Ориентир цены: около 7 000 ₸/кг.",locale:"ru",source_path:"2GIS · Yerkinay tattileri",status:"new",admin_notes:null},
 {id:"kaskelen-konditer-alemi",created_at:"2026-09-05T00:00:00Z",name:"Кондитер әлемі",contact:"Контакт не найден",company:"Кондитер әлемі",project_type:"Сайт-каталог",message:"Адрес: просп. Абылай Хана, 225/3, Каскелен. Кондитерский магазин/кондитерская.",locale:"ru",source_path:"Каскелен · найдено ранее",status:"new",admin_notes:null},
 {id:"kaskelen-mir-sladosti",created_at:"2026-09-05T00:00:00Z",name:"Мир сладости",contact:"Контакт не найден",company:"Мир сладости",project_type:"Сайт-каталог",message:"Адрес: ул. Казыбек би, 33А, Каскелен. Магазин сладостей/кондитерская.",locale:"ru",source_path:"Каскелен · найдено ранее",status:"new",admin_notes:null},
 {id:"kaskelen-candy-shop",created_at:"2026-09-05T00:00:00Z",name:"Candy shop",contact:"Контакт не найден",company:"Candy shop",project_type:"Сайт-каталог",message:"Адрес: просп. Абылай Хана, 30, Каскелен. Магазин сладостей.",locale:"ru",source_path:"Каскелен · найдено ранее",status:"new",admin_notes:null},
 {id:"kaskelen-bayan",created_at:"2026-09-05T00:00:00Z",name:"Баян",contact:"Контакт не найден",company:"Баян",project_type:"Сайт для кулинарии",message:"Адрес: просп. Абылай Хана, 22Б, Каскелен. Кулинария/кондитерская.",locale:"ru",source_path:"Каскелен · найдено ранее",status:"new",admin_notes:null},
 {id:"kaskelen-hamle",created_at:"2026-09-05T00:00:00Z",name:"Хамле / Хамле Компани ЛТД",contact:"Контакт не найден",company:"Хамле Компани ЛТД",project_type:"Сайт и CRM для пекарни",message:"Адрес: просп. Абылай Хана, 3А, Каскелен. Пекарня/кулинария, потенциальный корпоративный клиент.",locale:"ru",source_path:"Каскелен · найдено ранее",status:"new",admin_notes:null}
];

const almatyLeadSeed = [
["MUS-MUS","+7 778 870 00 67","mail@mus-mus.kz","@mus.mus.kz","Дом десертов / торты на заказ","ул. Макатаева 131 / Сокпакбаева 1"],
["Profiterole","+7 707 300 01 65","","","Кондитерская мастерская","ул. Брусиловского 159, блок 3"],
["Cake.Shop.KZ","+7 707 222 07 48","","","Домашняя кондитерская","ул. Исеналиева"],
["ZakazTortov.kz","+7 702 572 44 44","","","Торты на заказ","мкр. Керемет 5к"],
["Кондитерский цех Айнур","+7 701 744 90 56","","","Кондитерский цех","ул. Акан-Серы 11"],
["Кондитерский цех КарамеЛь","+7 707 812 10 22","","","Магазин тортов","ул. Жибек Жолы 67"],
["Торты Алматы","+7 701 317 84 22","","","Кондитерская","Алматы"],
["Cheesecake Алматы","+7 701 330 11 26","","","Магазин тортов","мкр. 6, дом 6"],
["BentoDay","+7 776 755 31 88","","@bentoday.almaty","Бенто-торты / десерты","мкр. Аксай-5, 25 к6"],
["Tattisin","+7 776 087 56 29","","@tattisin_","Кафе-кондитерская","пр. Абая 65"],
["Cheesy","+7 702 235 54 01","cheesyalmaty@gmail.com","@cheesy.kz","Кондитерская-кофейня","мкр. Жетысу-3, 1Б"],
["Nazik","+7 701 872 51 33","nazik@gmail.com","@nazik_official_almaty","Кондитерские изделия","пр. Достык 31"],
["Өте Дәмді","+7 776 262 20 24","otedem@inbox.ru","","Кондитерский цех / сеть","ул. Жангельдина 31/1"],
["Пекатория","+7 701 936 99 33","","@pekatoria_kz","Пекарня / десерты","пр. Серкебаева 244"],
["Кондитерская Камилла","+7 727 294 88 72","","","Кондитерский магазин","Алматы"],
["Fika","+7 707 933 10 23","","","Пекарня","ул. Кабанбай батыра 104"],
["Kulinarich","+7 727 397 41 87","","","Кондитерский магазин","ул. Жангельдина 31/3"],
["Caramel","","","","Кондитерская","мкр. Аккент 34"],
["Tatti_dan","","","","Кондитерский цех","ул. Алмерек Абыз 73/1"],
["Выпечка Алматы","","","","Кондитерский цех","ул. Алматинская 32"],
["Мадам Нан","","","","Кондитерский цех","ул. Каныша Сатпаева 7а/3"],
["Cake Star","","","","Пекарня / кондитерская","ул. Казыбек би 139"],
["Sweet sisters.kz","","","","Кондитерская","ул. Кажымукана 59"],
["Роза","","","","Кондитерский цех","мкр. Айнабулак-3, 129"],
["Три Эклера","","","","Кондитерская мастерская","ул. Ходжанова 77/5 к1"],
["Al’Barakat","","","","Кондитерский дом","ул. Жамбыла"],
["Егор | george.yak","","","@george.yak","Авторский кондитер","Алматы"],
["Deliberry_almaty.kz","","","","Кондитерская мастерская","Алматы"],
["Happy Cake","+7 707 777 11 44","","","Сеть кондитерских","Алматы, 34 точки"],
["Kulikov","+7 727 364 77 77","","","Кондитерский дом","Алматы, множество филиалов"],
["AAbakery","+7 707 239 34 39","","@aabakery_almaty","Кондитерская","ул. Байзакова 225"],
["Aidana","+7 747 593 35 58 / +7 775 155 64 24","aidano4ka.mazhitova@mail.ru","@allazharkyzy.aidana","Кондитерский дом","ул. Талжанова 9 / пр. Жибек Жолы 64"],
["Aisha Sweets","+7 775 888 85 05","","@_aisha_sweets","Кондитерская / пункт выдачи","ул. Масанчи 98в"],
["Aiyms Cake Boutique","+7 707 717 84 47","","@aiyms_cake_boutique","Кондитерская","мкр. Кулагер 30"],
["Aizada.bakery","+7 707 973 67 67","","@aizada.bakery","Кондитерский магазин","мкр. Жас Канат 1/18"],
["Aizhankasaten_cake","+7 708 667 64 30","","@aizhankasaten_cake","Кондитерская","ул. Шекспира 66"],
["Albina Buro","+7 777 193 00 39","","@albina_buro","Кондитерский цех","ул. Лобачевского 11"],
["Aliyadelice","+7 702 336 88 50","","@aliyadelice.kz","Кондитерский цех","ул. Жарокова 289а"],
["Alma Chocolates","+7 771 765 40 72","info@almachocolates.kz","@alma_chocolates","Шоколад / кондитерское производство","пр. Райымбека 2"],
["Asaat","+7 707 808 04 44","","@asaat.kz","Кондитерская","ул. Навои 72"],
["Ayala sweet bakery","+7 705 773 28 46 / +7 707 769 24 14","","@ayala_sweet_bakery","Кондитерская","ул. Арман 53Б / мкр. Шугыла 340/35 к7"],
["AyAz Chocolate","+7 777 351 91 21 / +7 727 327 23 32","ayazchocolate@yahoo.com","","Шоколадное производство","ул. Герасима Колпаковского 55"],
["Azicake","+7 707 738 48 94","","@azicake.kz","Кондитерский цех","4-й микрорайон 4/1"],
["Baily Bakery","+7 701 540 23 25 / +7 702 948 79 08","","@baily.bakery","Пекарня-кафе","мкр. Дарабоз 51"],
["Bento_tortiki_almaty","+7 705 769 72 67","","@bentotortiki_toibastar_almaty","Бенто-торты","мкр. Аксай-2 71"],
["Best Berry","+7 707 311 08 04","","@bestberry.almaty","Клубника в шоколаде / десерты","ул. Каныша Сатпаева 7а"],
["bibi.cake","+7 706 669 70 17","","@anelkin.tort","Кондитерская студия","ул. Есенберлина 155"],
["Biday Bakery","+7 771 294 22 15 / +7 776 202 05 77","","@biday_bakery","Пекарня","ул. Байтерекова 83"],
["Big Apple Cake","+7 775 911 81 11","zakaz@biapplecake.kz","@big_apple_cake","Кондитерский цех","пр. Достык 50"],
["Caramel","+7 778 108 55 44","aizhankaz@gmail.com","@caramel.cakeshop","Кондитерская","мкр. Аккент 34"],
["Caramelca.kz","+7 708 725 47 67","","@caramelca.kz","Кондитерский цех","ул. Жунисова 4/9"],
["Caramel Shanyraq2","","","@caramel_shanyraq2","Кондитерский дом","ул. Жанкожа Батыра 119/1"],
["Charlotte","+7 702 730 99 33","","@cafe_charlotte_almaty","Кафе-кондитерская","ул. Розыбакиева 247, блок 3"],
["Cherry bakery","+7 747 511 11 61","","@cherry.bakery.kz","Кондитерская","ул. Коргалжын 9"],
["Chocoberry","+7 708 322 81 51","","@chocoberry_aliya","Десертные композиции","мкр. Тастак-1 3"]
].map(([name,phone,email,instagram,category,address],i)=>({id:`kaskelen-almaty-${i+1}`,created_at:"2026-09-05T00:00:00Z",name,contact:[phone&&`Телефон: ${phone}`,instagram&&`Instagram: ${instagram}`,email&&`Email: ${email}`].filter(Boolean).join(" · ")||"Контакт не найден",company:name,city:"Алматы",project_type:category,message:`${category}. Адрес: ${address}, Алматы.`,locale:"ru" as const,source_path:"Excel · konditerskie_almaty_full_leads.xlsx",status:"new" as LeadStatus,admin_notes:null}));
 
const extraAlmatyLeadSeed:Lead[]=[
["BENTO 24","+7 706 650 06 52","","Кондитерская","ул. Жарокова 289а"],
["Whoopie Cakes","+7 705 225 58 33","@whoopiecakes","Кондитерская / кафе","пр. Абая 35/37 и другие филиалы"],
["Lalu Cake","+7 707 570 77 76 · info@lalu.kz · @la_lu_cake","Кондитерская","ул. Каныша Сатпаева 30В / ул. Толе би 273а блок 5"],
["Nel'","+7 701 555 05 59","","Кондитерская","ул. Желтоксан 96"],
["Sweets Almaty","+7 727 237 80 35","","Кондитерская","ул. Шевченко 7/75"],
["Можно Всё!","+7 778 792 26 10 · @mozhnovse_almaty","","Кондитерская","пр. Назарбаева 223"],
["Milky Cake","+7 707 211 80 03","","Кондитерская","ул. Тургут Озала 152"],
["LAKOMKA","+7 747 260 01 00","","Кондитерская","пр. Абылай хана 131"],
["Брецель","+7 701 088 70 77","","Пекарня / кондитерская","мкр. Самал-2 33А"],
["Тәп-Тәтті","+7 708 583 48 72 · info@taptatti.kz","Кондитерская","ул. Исаака Ньютона 1А"],
["Dream Cakes","+7 708 602 15 62","","Кондитерская","ул. Тимирязева 73 и другие филиалы"],
["LA TARTINE","+7 727 261 09 91","","Пекарня-кондитерская","ул. Кабанбай батыра 89"]
].map(([name,contact,project_type,address],i)=>({id:`kaskelen-almaty-extra-${i+1}`,created_at:"2026-09-05T00:00:00Z",name,contact,company:name,city:"Алматы",project_type,message:`${project_type}. Адрес: ${address}, Алматы.`,locale:"ru",source_path:"Excel · konditerskie_almaty_12_new_only.xlsx",status:"new",admin_notes:null}));
 
const taldykorganLeadSeed:Lead[]=[
 {id:"taldykorgan-yumyum",created_at:"2026-09-05T00:00:00Z",name:"YumYum",contact:"Телефон: +7 700 600 06 31 · WhatsApp: https://wa.me/77006000631 · Email: b.stabayeva@gmail.com · Instagram: https://www.instagram.com/yum_yum_tdk/",company:"YumYum",city:"Талдыкорган",project_type:"Кондитерская / торты на заказ",message:"Бенто, ярусные и фототорты, макаронс; работает с 2016 года. Адрес: мкр. Каратал, 22д, Талдыкорган.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-zhazilya",created_at:"2026-09-05T00:00:00Z",name:"Кондитерская ZHAZILYA",contact:"Телефон: +7 747 839 04 19 · WhatsApp: https://wa.me/77478390419",company:"Кондитерская ZHAZILYA",city:"Талдыкорган",project_type:"Кондитерская",message:"Небольшая локальная кондитерская. Адрес: ул. Толебаева 100, Талдыкорган.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-tort",created_at:"2026-09-05T00:00:00Z",name:"Торт",contact:"Телефон: +7 707 199 53 01 · WhatsApp: https://wa.me/77071995301",company:"Торт",city:"Талдыкорган",project_type:"Пекарня / торты",message:"Локальный небольшой бизнес. Адрес: ул. Есенберлина 17, Талдыкорган.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-dessert",created_at:"2026-09-05T00:00:00Z",name:"Dessert",contact:"Телефон: +7 707 370 33 88 · WhatsApp: https://wa.me/77073703388",company:"Dessert",city:"Талдыкорган",project_type:"Кафе-кондитерская",message:"Небольшая кафе-кондитерская. Адрес: Талдыкорган.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-kafe-konditerskaya",created_at:"2026-09-05T00:00:00Z",name:"Кафе-Кондитерская",contact:"Телефон: +7 701 757 15 25 · WhatsApp: https://wa.me/77017571525",company:"Кафе-Кондитерская",city:"Талдыкорган",project_type:"Кафе-кондитерская",message:"Локальная точка. Адрес: Талдыкорган.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-chakchak",created_at:"2026-09-05T00:00:00Z",name:"Chak Chak by Fortuna Food",contact:"Телефон: +7 747 508 23 15 · WhatsApp: https://wa.me/77475082315 · Email: fortuna.kafie@mail.ru · Instagram: https://www.instagram.com/chakchak_taldykorgan/ · Сайт: https://fortunafood.kamiqr.com/menu/basic",company:"Chak Chak by Fortuna Food",city:"Талдыкорган",project_type:"Кондитерская / торты",message:"Торты, бенто и фототорты; объединены филиалы Fortuna/Chak Chak. Адрес: ул. Гали Орманова 26, Талдыкорган.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-fortuna",created_at:"2026-09-05T00:00:00Z",name:"Fortuna Food",contact:"Телефон: +7 776 705 60 00 / +7 702 387 60 00 · WhatsApp: https://wa.me/77767056000 · Instagram: https://www.instagram.com/fortunafood.kz/",company:"Fortuna Food",city:"Талдыкорган",project_type:"Кулинария / торты",message:"Сеть точек; торты на заказ. Адрес: ул. Г. Омарова 2А и другие точки, Талдыкорган.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-delicates",created_at:"2026-09-05T00:00:00Z",name:"Деликатес",contact:"Телефон: +7 775 080 80 25 · WhatsApp: https://wa.me/77757999990 · Instagram: https://www.instagram.com/delikatesy_tdk/",company:"Деликатес",city:"Талдыкорган",project_type:"Кондитерская / кулинария",message:"10 фирменных магазинов; торты, бенто, фототорты. Адрес: пр. Нурсултана Назарбаева 104а, Талдыкорган.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-vityaz",created_at:"2026-09-05T00:00:00Z",name:"Кондитерская Пекарня Витязь",contact:"Телефон: +7 728 363 07 17",company:"Кондитерская Пекарня Витязь",city:"Талдыкорган",project_type:"Пекарня / кондитерская",message:"Локальная пекарня-кондитерская. Адрес: ул. Панфилова 126, Талдыкорган.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-sunfood",created_at:"2026-09-05T00:00:00Z",name:"Sunfood",contact:"Телефон: +7 747 421 57 17 · WhatsApp: https://wa.me/77474215717",company:"Sunfood",city:"Талдыкорган",project_type:"Кондитерская",message:"Небольшая кондитерская. Адрес: Бирлик 14, Талдыкорган.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-nazarbaeva87",created_at:"2026-09-05T00:00:00Z",name:"Торты на Назарбаева 87",contact:"Телефон: +7 707 120 79 94 · WhatsApp: https://wa.me/77071207994 · Сайт: https://taldykorgan.guls.kz/torti",company:"Торты на Назарбаева 87",city:"Талдыкорган",project_type:"Торты / бенто",message:"Онлайн-витрина тортов и бенто. Адрес: пр. Нурсултана Назарбаева 87, Талдыкорган.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-happycake",created_at:"2026-09-05T00:00:00Z",name:"HappyCake",contact:"Телефон: +7 707 777 11 44 · WhatsApp: https://wa.me/77715259985 · Instagram: https://www.instagram.com/happycake.kz/ · Сайт: https://happycake.kz/taldyqorgan/",company:"HappyCake",city:"Талдыкорган",project_type:"Сеть кондитерских",message:"Крупная сеть; все филиалы объединены в один лид. 9 точек в Талдыкоргане.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-kulikov",created_at:"2026-09-05T00:00:00Z",name:"Kulikov Талдыкорган",contact:"Телефон: +7 727 364 77 77 · Instagram: https://www.instagram.com/kulikov_kz/ · Сайт: https://kulikov.com/",company:"Kulikov",city:"Талдыкорган",project_type:"Кондитерский дом",message:"Крупная сеть; не приоритет для холодного предложения. Адрес: мкр. Жастар 39Б, Талдыкорган.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-nilori",created_at:"2026-09-05T00:00:00Z",name:"Nilori Cakes",contact:"Контакт не найден",company:"Nilori Cakes",city:"Талдыкорган",project_type:"Частный кондитер / торты",message:"Упоминается в каталоге тортов; актуальные контакты не подтверждены.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-mak",created_at:"2026-09-05T00:00:00Z",name:"Кондитерская Мак",contact:"Контакт не найден",company:"Кондитерская Мак",city:"Талдыкорган",project_type:"Торты на заказ",message:"Упоминается среди кондитерских Талдыкоргана; контакты требуют проверки.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-sisters-corner",created_at:"2026-09-05T00:00:00Z",name:"Sister's Corner Bakery",contact:"Контакт не найден",company:"Sister's Corner Bakery",city:"Талдыкорган",project_type:"Bakery / торты на заказ",message:"Упоминается среди кондитеров; контакты требуют проверки.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null},
 {id:"taldykorgan-ayashka",created_at:"2026-09-05T00:00:00Z",name:"Кулинарная Аяшка",contact:"Контакт не найден",company:"Кулинарная Аяшка",city:"Талдыкорган",project_type:"Кулинария / кондитерские изделия",message:"Торты и кондитерские изделия; актуальные контакты не подтверждены.",locale:"ru",source_path:"Excel · konditerskie_taldykorgan.xlsx",status:"new",admin_notes:null}
];
const statusStyles:Record<LeadStatus,string>={
  draft:"bg-[#f4ead7] text-[#76552d]",new:"bg-[#f0ebe5] text-[#5b4a3f]",contacted:"bg-[#e8eef6] text-[#35465a]",
  in_progress:"bg-[#eee8f6] text-[#4e3c62]",won:"bg-[#e6f1e8] text-[#35503a]",lost:"bg-[#f5e6e5] text-[#663f3c]",
};
const defaultTemplates:MessageTemplate[]=[
  {id:"primary",name:"Первое обращение",text:"Здравствуйте, {{name}}! Меня зовут Алифа, я представляю Tafa Lab. Я изучила {{company}} и подготовила идеи, которые могут помочь вашему бизнесу. Могу отправить варианты сайта и рассказать подробнее."},
  {id:"followup",name:"Повторное сообщение",text:"Здравствуйте, {{name}}! Возвращаюсь к нашему предложению по проекту. Готова показать варианты сайта и ответить на вопросы."},
  {id:"proposal",name:"Отправка предложения",text:"Здравствуйте, {{name}}! Отправляю подготовленное предложение для {{company}}. Если появятся вопросы, с удовольствием отвечу."},
];
const isCrmId=(id:string)=>id.startsWith("kaskelen-")||id.startsWith("taldykorgan-");
const CRM_SYNC_KEY="stk_admin_crm_state",ATTACHMENTS_KEY="stk-admin-attachments";
const emptySettings=():CrmSettings=>({templates:defaultTemplates});
function readLocalCrmState():CrmSyncState{
  const parse=<T,>(key:string,fallback:T):T=>{try{return JSON.parse(localStorage.getItem(key)||"") as T}catch{return fallback}};
  return {meta:parse("stk-admin-crm-meta",{} as Record<string,CrmMeta>),manual:parse("stk-admin-manual-crm",[] as Lead[]),deleted:parse("stk-admin-deleted-crm",[] as string[]),settings:parse("stk-admin-crm-settings",emptySettings())};
}
function writeLocalCrmState(state:CrmSyncState){
  localStorage.setItem("stk-admin-crm-meta",JSON.stringify(state.meta));localStorage.setItem("stk-admin-manual-crm",JSON.stringify(state.manual));
  localStorage.setItem("stk-admin-deleted-crm",JSON.stringify(state.deleted));localStorage.setItem("stk-admin-crm-settings",JSON.stringify(state.settings||emptySettings()));
}
function readAttachments():Record<string,StoredAttachment[]>{try{return JSON.parse(localStorage.getItem(ATTACHMENTS_KEY)||"{}") as Record<string,StoredAttachment[]>}catch{return {}}}
function writeAttachments(value:Record<string,StoredAttachment[]>){localStorage.setItem(ATTACHMENTS_KEY,JSON.stringify(value))}
function crmStateScore(state:CrmSyncState){return state.deleted.length*10+state.manual.length*10+Object.values(state.meta).reduce((n,item)=>n+2+(item.status&&item.status!=="new"?4:0)+(item.reminder_at?3:0)+(item.history?.length||0)+(item.interactions?.length||0),0)}
function mergeCrmStates(local:CrmSyncState,remote:CrmSyncState):CrmSyncState{
  const [primary,secondary]=crmStateScore(local)>=crmStateScore(remote)?[local,remote]:[remote,local];const manual=new Map<string,Lead>();
  [...secondary.manual,...primary.manual].forEach(lead=>manual.set(lead.id,lead));
  return {meta:{...secondary.meta,...primary.meta},manual:Array.from(manual.values()),deleted:Array.from(new Set([...secondary.deleted,...primary.deleted])),settings:primary.settings||secondary.settings||emptySettings()};
}
function normalizeContact(value:string){return value.toLowerCase().replace(/[\s()\-+]/g,"")}
function contactFields(contact:string){
  const phone=contact.match(/(?:Телефон:\s*)?(\+?\d[\d\s()\-/]{6,})/)?.[1]?.trim()||"";
  const instagram=contact.match(/Instagram:\s*([^·]+)/i)?.[1]?.trim()||"";
  const email=contact.match(/(?:Email|E-mail):\s*([^·]+)/i)?.[1]?.trim()||contact.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0]||"";
  return {phone,instagram,email};
}
function splitStoredValues(value:string){return value.split(/\s+\/\s+|\r?\n/).map(item=>item.trim()).filter(Boolean)}
function contactValues(contact:string,label:"Телефон"|"Email"|"Instagram"){
  const value=contact.match(new RegExp(label+"\\s*:\\s*([^·]+)","i"))?.[1]?.trim();if(value)return splitStoredValues(value);
  const fields=contactFields(contact),fallback=label==="Телефон"?fields.phone:label==="Email"?fields.email:fields.instagram;return fallback?splitStoredValues(fallback):[];
}
function renderTemplate(value:string,lead:Lead){
  const variables:Record<string,string>={name:lead.name||"",company:lead.company||lead.name||"",city:lead.city||"",project:lead.project_type||""};
  return value.replace(/\{\{\s*(name|company|city|project)\s*\}\}/gi,(_,key:string)=>variables[key.toLowerCase()]||"");
}
function buildFollowupMessage(lead:Lead,locale:"ru"|"en"){return locale==="ru"?`Здравствуйте, ${lead.name}! Возвращаюсь к нашему предложению по проекту. Готова показать варианты сайта и ответить на вопросы.`:`Hello, ${lead.name}! I’m following up on our project proposal. I can show you the website options and answer any questions.`}
function reminderDate(meta?:CrmMeta){return meta?.reminder_at?`${meta.reminder_at}T${meta.reminder_time||"23:59"}`:""}
function reminderTone(meta?:CrmMeta){
  const value=reminderDate(meta);if(!value)return "";const now=new Date(),due=new Date(value),today=now.toISOString().slice(0,10);
  if(due.getTime()<now.getTime())return "border-red-300 bg-red-50";if(meta?.reminder_at===today)return "border-amber-300 bg-amber-50";return "";
}
function csvValue(value:unknown){return `"${String(value??"").replace(/"/g,'""')}"`}
function parseCsvLine(line:string,separator:string){
  const cells:string[]=[];let current="",quoted=false;
  for(let i=0;i<line.length;i++){const char=line[i];if(char==='"'&&quoted&&line[i+1]==='"'){current+='"';i++}else if(char==='"')quoted=!quoted;else if(char===separator&&!quoted){cells.push(current.trim());current=""}else current+=char}
  cells.push(current.trim());return cells;
}
function downloadText(name:string,value:string){const blob=new Blob(["\ufeff",value],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),anchor=document.createElement("a");anchor.href=url;anchor.download=name;anchor.click();URL.revokeObjectURL(url)}
async function persistCrmState(state:CrmSyncState){const payload={...state,synced_at:new Date().toISOString()};writeLocalCrmState(payload);const {error}=await sb.auth.updateUser({data:{[CRM_SYNC_KEY]:payload}});return error?.message||""}

export default function StkAdminPage(){
  const pathname=usePathname(),locale:"ru"|"en"=pathname.startsWith("/en")?"en":"ru",t=text[locale];
  type Section="requests"|"crm"|"reminders"|"kanban"|"analytics"|"templates";
  const [user,setUser]=useState<User|null>(null),[ready,setReady]=useState(false),[leads,setLeads]=useState<Lead[]>([]),[loading,setLoading]=useState(false);
  const [error,setError]=useState(""),[notice,setNotice]=useState(""),[selectedId,setSelectedId]=useState<string|null>(null),[section,setSection]=useState<Section>("requests");
  const [crmMeta,setCrmMeta]=useState<Record<string,CrmMeta>>({}),[settings,setSettings]=useState<CrmSettings>(emptySettings());
  const [filter,setFilter]=useState<LeadFilter>("all"),[query,setQuery]=useState(""),[sort,setSort]=useState<SortMode>("newest");
  const [categoryFilter,setCategoryFilter]=useState(""),[sourceFilter,setSourceFilter]=useState(""),[temperatureFilter,setTemperatureFilter]=useState(""),[tagFilter,setTagFilter]=useState("");
  const [adding,setAdding]=useState(false),[saving,setSaving]=useState(false),[saved,setSaved]=useState(false),[deleting,setDeleting]=useState(false),[copied,setCopied]=useState(false);
  const [draftStatus,setDraftStatus]=useState<LeadStatus>("new"),[draftNotes,setDraftNotes]=useState(""),[draftReminder,setDraftReminder]=useState(""),[draftReminderTime,setDraftReminderTime]=useState("");
  const [draftPhones,setDraftPhones]=useState<string[]>([""]),[draftInstagrams,setDraftInstagrams]=useState<string[]>([""]),[draftEmails,setDraftEmails]=useState<string[]>([""]);
  const [draftPrimaryMessage,setDraftPrimaryMessage]=useState(""),[draftFollowupMessage,setDraftFollowupMessage]=useState(""),[draftCity,setDraftCity]=useState(""),[draftCompany,setDraftCompany]=useState("");
  const [draftCategory,setDraftCategory]=useState(""),[draftTags,setDraftTags]=useState(""),[draftSource,setDraftSource]=useState(""),[draftTemperature,setDraftTemperature]=useState<LeadTemperature>("cold");
  const [newTemplate,setNewTemplate]=useState({name:"",text:""});
  const emptyNewLead={name:"",phone:"",instagram:"",email:"",company:"",city:"",project_type:"",message:"",reminder_at:"",reminder_time:"",category:"",tags:"",source:""};
  const [newLead,setNewLead]=useState(emptyNewLead);

  useEffect(()=>{
    let active=true;
    const local=readLocalCrmState();setCrmMeta(local.meta);setSettings(local.settings||emptySettings());
    const fallback=window.setTimeout(()=>{if(active)setReady(true)},5000);
    void sb.auth.getSession().then(({data})=>{if(active)setUser(data.session?.user??null)}).catch(()=>{}).finally(()=>{if(active){window.clearTimeout(fallback);setReady(true)}});
    const {data}=sb.auth.onAuthStateChange((_event,session)=>{if(active){setUser(session?.user??null);setReady(true)}});
    return()=>{active=false;window.clearTimeout(fallback);data.subscription.unsubscribe()};
  },[]);
  useEffect(()=>{const timer=window.setTimeout(()=>{if(user)void load();else{setLeads([]);setSelectedId(null)}},0);return()=>window.clearTimeout(timer)},[user]);

  const crmLeads=useMemo(()=>leads.filter(x=>isCrmId(x.id)),[leads]);
  const categoryOptions=useMemo(()=>Array.from(new Set(crmLeads.map(x=>crmMeta[x.id]?.category).filter((x):x is string=>Boolean(x)))).sort(),[crmLeads,crmMeta]);
  const sourceOptions=useMemo(()=>Array.from(new Set(crmLeads.map(x=>crmMeta[x.id]?.source||x.source_path||"").filter(Boolean))).sort(),[crmLeads,crmMeta]);
  const tagOptions=useMemo(()=>Array.from(new Set(crmLeads.flatMap(x=>crmMeta[x.id]?.tags||[]))).sort(),[crmLeads,crmMeta]);
  const duplicateMatches=useMemo(()=>{const values=[newLead.phone,newLead.instagram,newLead.email].map(normalizeContact).filter(Boolean);return values.length?leads.filter(x=>{const existing=normalizeContact(x.contact);return values.some(v=>v.length>=4&&existing.includes(v))}).slice(0,3):[]},[leads,newLead.phone,newLead.instagram,newLead.email]);
  const visibleLeads=useMemo(()=>{
    const q=query.trim().toLowerCase(),sourceLeads=section==="requests"?leads.filter(x=>!isCrmId(x.id)):crmLeads;let rows=filter==="all"?[...sourceLeads]:sourceLeads.filter(x=>x.status===filter);
    if(section==="reminders")rows=rows.filter(x=>Boolean(crmMeta[x.id]?.reminder_at));if(categoryFilter)rows=rows.filter(x=>crmMeta[x.id]?.category===categoryFilter);
    if(sourceFilter)rows=rows.filter(x=>(crmMeta[x.id]?.source||x.source_path||"")===sourceFilter);if(temperatureFilter)rows=rows.filter(x=>(crmMeta[x.id]?.temperature||"cold")===temperatureFilter);
    if(tagFilter)rows=rows.filter(x=>(crmMeta[x.id]?.tags||[]).includes(tagFilter));
    if(q)rows=rows.filter(x=>{const meta=crmMeta[x.id];return [x.name,x.contact,x.company,x.city,x.project_type,x.message,x.admin_notes,x.source_path,meta?.category,meta?.source,(meta?.tags||[]).join(" "),(meta?.interactions||[]).map(i=>i.text).join(" ")].some(v=>(v||"").toLowerCase().includes(q))});
    rows.sort((a,b)=>section==="reminders"?reminderDate(crmMeta[a.id]).localeCompare(reminderDate(crmMeta[b.id])):sort==="oldest"?+new Date(a.created_at)-+new Date(b.created_at):sort==="name"?a.name.localeCompare(b.name,locale):+new Date(b.created_at)-+new Date(a.created_at));return rows;
  },[leads,crmLeads,filter,query,sort,locale,section,crmMeta,categoryFilter,sourceFilter,temperatureFilter,tagFilter]);
  const counts=useMemo(()=>{const scoped=section==="requests"?leads.filter(x=>!isCrmId(x.id)):crmLeads,result:Record<LeadFilter,number>={all:scoped.length,new:0,draft:0,contacted:0,in_progress:0,won:0,lost:0};scoped.forEach(x=>result[x.status]++);return result},[leads,crmLeads,section]);
  const analytics=useMemo(()=>{
    const total=crmLeads.length,contacted=crmLeads.filter(x=>["contacted","in_progress","won","lost"].includes(x.status)).length,won=crmLeads.filter(x=>x.status==="won").length;
    const overdue=crmLeads.filter(x=>reminderDate(crmMeta[x.id])&&new Date(reminderDate(crmMeta[x.id])).getTime()<Date.now()).length;
    const group=(getter:(lead:Lead)=>string)=>Object.entries(crmLeads.reduce<Record<string,number>>((acc,lead)=>{const key=getter(lead)||"Не указано";acc[key]=(acc[key]||0)+1;return acc},{})).sort((a,b)=>b[1]-a[1]).slice(0,6);
    return {total,contacted,won,overdue,conversion:total?Math.round(won/total*100):0,sources:group(x=>crmMeta[x.id]?.source||x.source_path||""),categories:group(x=>crmMeta[x.id]?.category||"")};
  },[crmLeads,crmMeta]);

  async function load(){
    setLoading(true);setError("");const local=readLocalCrmState(),raw=user?.user_metadata?.[CRM_SYNC_KEY] as Partial<CrmSyncState>|undefined;
    const remote:CrmSyncState={meta:raw?.meta&&typeof raw.meta==="object"?raw.meta:{},manual:Array.isArray(raw?.manual)?raw.manual:[],deleted:Array.isArray(raw?.deleted)?raw.deleted:[],settings:raw?.settings||emptySettings(),synced_at:raw?.synced_at};
    const synced=mergeCrmStates(local,remote);if(crmStateScore(local)>crmStateScore(remote)){const syncError=await persistCrmState(synced);if(syncError&&!/rate limit/i.test(syncError))setError(syncError)}else writeLocalCrmState(synced);
    setCrmMeta(synced.meta);setSettings(synced.settings||emptySettings());
    const hydrate=(x:Lead)=>({...x,contact:synced.meta[x.id]?.contact||x.contact,city:synced.meta[x.id]?.city??x.city,company:synced.meta[x.id]?.company??x.company,status:synced.meta[x.id]?.status||x.status,admin_notes:synced.meta[x.id]?.history?.at(-1)?.text||x.admin_notes||null});
    const seeded=[...kaskelenLeads,...almatyLeadSeed,...extraAlmatyLeadSeed,...taldykorganLeadSeed].filter(x=>!synced.deleted.includes(x.id)).map(hydrate),manual=synced.manual.filter(x=>!synced.deleted.includes(x.id)).map(hydrate);
    const {data,error:loadError}=await sb.from("stk_lab_leads").select("*").order("created_at",{ascending:false});if(loadError)setError(loadError.message);else setLeads([...manual,...seeded,...((data||[]) as Lead[]).map(hydrate)]);setLoading(false);
  }
  function fillDraft(lead:Lead){
    const fields=contactFields(lead.contact),meta=crmMeta[lead.id]||{reminder_at:"",history:[]};setSelectedId(lead.id);setDraftStatus(meta.status||lead.status);setDraftNotes(lead.admin_notes||"");
    setDraftReminder(meta.reminder_at||"");setDraftReminderTime(meta.reminder_time||"");setDraftPhones(fields.phone?splitStoredValues(fields.phone):[""]);setDraftInstagrams(fields.instagram?splitStoredValues(fields.instagram):[""]);setDraftEmails(fields.email?splitStoredValues(fields.email):[""]);
    setDraftPrimaryMessage(meta.primary_message||"");setDraftFollowupMessage(meta.followup_message||buildFollowupMessage(lead,locale));setDraftCity(meta.city??lead.city??"");setDraftCompany(meta.company??lead.company??"");
    setDraftCategory(meta.category||"");setDraftTags((meta.tags||[]).join(", "));setDraftSource(meta.source||lead.source_path||"");setDraftTemperature(meta.temperature||"cold");setSaved(false);setError("");setCopied(false);
  }
  async function saveMeta(nextMeta:Record<string,CrmMeta>,nextSettings:CrmSettings=settings){
    setCrmMeta(nextMeta);setSettings(nextSettings);const current=readLocalCrmState(),syncError=await persistCrmState({...current,meta:nextMeta,settings:nextSettings});if(syncError&&!/rate limit/i.test(syncError))setError(syncError);
  }
  async function saveLead(){
    if(!selectedId)return;setSaving(true);setError("");const lead=leads.find(x=>x.id===selectedId);if(!lead){setSaving(false);return}
    const previous=crmMeta[selectedId]||{reminder_at:"",history:[]},notes=draftNotes.trim(),noteChanged=Boolean(notes&&notes!==previous.history.at(-1)?.text);
    const history=noteChanged?[...previous.history,{text:notes,created_at:new Date().toISOString()}]:previous.history,interactions=noteChanged?[...(previous.interactions||[]),{id:`note-${Date.now()}`,channel:"note" as const,text:notes,created_at:new Date().toISOString()}]:previous.interactions||[];
    const phone=draftPhones.map(v=>v.trim()).filter(Boolean).join(" / "),instagram=draftInstagrams.map(v=>v.trim()).filter(Boolean).join(" / "),email=draftEmails.map(v=>v.trim()).filter(Boolean).join(" / ");
    const contact=[phone&&`Телефон: ${phone}`,instagram&&`Instagram: ${instagram}`,email&&`Email: ${email}`].filter(Boolean).join(" · ");
    const meta:CrmMeta={...previous,reminder_at:draftReminder,reminder_time:draftReminderTime,history,interactions,status:draftStatus,contact,primary_message:draftPrimaryMessage.trim(),followup_message:draftFollowupMessage.trim()||buildFollowupMessage(lead,locale),city:draftCity.trim()||null,company:draftCompany.trim()||null,category:draftCategory.trim(),tags:draftTags.split(",").map(v=>v.trim()).filter(Boolean),source:draftSource.trim(),temperature:draftTemperature};
    await saveMeta({...crmMeta,[selectedId]:meta});setLeads(rows=>rows.map(x=>x.id===selectedId?{...x,status:draftStatus,admin_notes:notes||null,contact,city:meta.city??null,company:meta.company??null}:x));
    if(!isCrmId(selectedId))await sb.from("stk_lab_leads").update({status:draftStatus,admin_notes:notes||null,contact,city:meta.city??null,company:meta.company??null}).eq("id",selectedId);
    setSaved(true);setTimeout(()=>setSaved(false),2200);setSaving(false);
  }
  async function recordInteraction(lead:Lead,channel:InteractionChannel,message:string){
    const previous=crmMeta[lead.id]||{reminder_at:"",history:[]},status:LeadStatus=lead.status==="new"||lead.status==="draft"?"contacted":lead.status;
    const entry:InteractionEntry={id:`${channel}-${Date.now()}`,channel,text:message,created_at:new Date().toISOString()},nextMeta={...crmMeta,[lead.id]:{...previous,status,interactions:[...(previous.interactions||[]),entry]}};
    await saveMeta(nextMeta);setLeads(rows=>rows.map(x=>x.id===lead.id?{...x,status}:x));setDraftStatus(status);if(!isCrmId(lead.id))void sb.from("stk_lab_leads").update({status}).eq("id",lead.id);
  }
  function sendWhatsApp(lead:Lead,phone:string,message:string){const readyMessage=renderTemplate(message,lead),digits=phone.replace(/\D/g,"");if(!digits)return;window.open(`https://wa.me/${digits}?text=${encodeURIComponent(readyMessage)}`,"_blank","noopener,noreferrer");void recordInteraction(lead,"whatsapp",readyMessage)}
  function sendEmail(lead:Lead,email:string,message:string){const readyMessage=renderTemplate(message,lead);window.location.href=`mailto:${email}?subject=${encodeURIComponent("Tafa Lab")}&body=${encodeURIComponent(readyMessage)}`;void recordInteraction(lead,"email",readyMessage)}
  function openInstagram(lead:Lead,value:string){const profile=value.replace(/^@/,"").replace(/^https?:\/\/(www\.)?instagram\.com\//i,"").replace(/\/.*$/,"");if(profile)window.open(`https://instagram.com/${profile}`,"_blank","noopener,noreferrer");void recordInteraction(lead,"instagram",locale==="ru"?"Открыт профиль Instagram":"Instagram profile opened")}
  async function changeStatus(id:string,status:LeadStatus){
    const lead=leads.find(x=>x.id===id);if(!lead||lead.status===status)return;const previous=crmMeta[id]||{reminder_at:"",history:[]},entry:InteractionEntry={id:`status-${Date.now()}`,channel:"status",text:`${t.statuses[lead.status]} → ${t.statuses[status]}`,created_at:new Date().toISOString()};
    await saveMeta({...crmMeta,[id]:{...previous,status,interactions:[...(previous.interactions||[]),entry]}});setLeads(rows=>rows.map(x=>x.id===id?{...x,status}:x));if(!isCrmId(id))void sb.from("stk_lab_leads").update({status}).eq("id",id);
  }
  async function createCrmLead(event:FormEvent<HTMLFormElement>){
    event.preventDefault();if(!newLead.name.trim()||(!newLead.phone.trim()&&!newLead.instagram.trim()&&!newLead.email.trim()))return;const id=`kaskelen-manual-${Date.now()}`;
    const contact=[newLead.phone.trim()&&`Телефон: ${newLead.phone.trim()}`,newLead.instagram.trim()&&`Instagram: ${newLead.instagram.trim()}`,newLead.email.trim()&&`Email: ${newLead.email.trim()}`].filter(Boolean).join(" · ");
    const lead:Lead={id,created_at:new Date().toISOString(),name:newLead.name.trim(),contact,company:newLead.company.trim()||null,city:newLead.city.trim()||null,project_type:newLead.project_type.trim()||null,message:newLead.message.trim()||null,locale:"ru",source_path:newLead.source.trim()||"Добавлено вручную",status:"new",admin_notes:null};
    const meta:CrmMeta={reminder_at:newLead.reminder_at,reminder_time:newLead.reminder_time,history:[],status:"new",category:newLead.category.trim(),tags:newLead.tags.split(",").map(v=>v.trim()).filter(Boolean),source:newLead.source.trim()||"Добавлено вручную",temperature:"cold",followup_message:buildFollowupMessage(lead,"ru")};
    const current=readLocalCrmState(),manual=[lead,...current.manual.filter(x=>x.id!==id)],nextMeta={...crmMeta,[id]:meta};setLeads(rows=>[lead,...rows]);await persistCrmState({...current,manual,meta:nextMeta,settings});setCrmMeta(nextMeta);setNewLead(emptyNewLead);setAdding(false);setSection("crm");setSelectedId(null);setNotice(locale==="ru"?"Запись добавлена в CRM.":"Record added to CRM.");setTimeout(()=>setNotice(""),2200);
  }
  async function deleteLead(){
    if(!selectedId||!window.confirm(t.deleteAsk))return;setDeleting(true);const current=readLocalCrmState(),next={...current,deleted:Array.from(new Set([...current.deleted,selectedId])),manual:current.manual.filter(x=>x.id!==selectedId)};
    if(isCrmId(selectedId))await persistCrmState(next);else await sb.from("stk_lab_leads").delete().eq("id",selectedId);setLeads(rows=>rows.filter(x=>x.id!==selectedId));setSelectedId(null);setNotice(t.deleted);setTimeout(()=>setNotice(""),2500);setDeleting(false);
  }
  async function handleAttachment(event:ChangeEvent<HTMLInputElement>){
    const file=event.target.files?.[0];if(!file||!selectedId)return;if(file.size>2_000_000){setError(locale==="ru"?"Файл должен быть меньше 2 МБ.":"File must be under 2 MB.");event.target.value="";return}
    const reader=new FileReader();reader.onload=async()=>{const stored:StoredAttachment={id:`file-${Date.now()}`,name:file.name,type:file.type,size:file.size,created_at:new Date().toISOString(),data_url:String(reader.result||"")},all=readAttachments();writeAttachments({...all,[selectedId]:[...(all[selectedId]||[]),stored]});
      const previous=crmMeta[selectedId]||{reminder_at:"",history:[]},attachment:AttachmentEntry={id:stored.id,name:stored.name,type:stored.type,size:stored.size,created_at:stored.created_at};await saveMeta({...crmMeta,[selectedId]:{...previous,attachments:[...(previous.attachments||[]),attachment]}})};reader.readAsDataURL(file);event.target.value="";
  }
  function downloadAttachment(id:string){if(!selectedId)return;const item=(readAttachments()[selectedId]||[]).find(x=>x.id===id);if(!item)return;const anchor=document.createElement("a");anchor.href=item.data_url;anchor.download=item.name;anchor.click()}
  async function removeAttachment(id:string){if(!selectedId)return;const all=readAttachments();writeAttachments({...all,[selectedId]:(all[selectedId]||[]).filter(x=>x.id!==id)});const previous=crmMeta[selectedId]||{reminder_at:"",history:[]};await saveMeta({...crmMeta,[selectedId]:{...previous,attachments:(previous.attachments||[]).filter(x=>x.id!==id)}})}
  async function saveTemplates(templates:MessageTemplate[]){await saveMeta(crmMeta,{templates})}
  async function addTemplate(event:FormEvent<HTMLFormElement>){event.preventDefault();if(!newTemplate.name.trim()||!newTemplate.text.trim())return;await saveTemplates([...settings.templates,{id:`template-${Date.now()}`,name:newTemplate.name.trim(),text:newTemplate.text.trim()}]);setNewTemplate({name:"",text:""})}
  function exportExcel(){
    const headers=["Имя","Телефон","Instagram","Email","Компания","Город","Тип проекта","Категория","Теги","Источник","Статус","Следующий контакт","Информация"];
    const rows=crmLeads.map(lead=>{const fields=contactFields(lead.contact),meta=crmMeta[lead.id];return [lead.name,fields.phone,fields.instagram,fields.email,lead.company||"",lead.city||"",lead.project_type||"",meta?.category||"",(meta?.tags||[]).join(", "),meta?.source||lead.source_path||"",lead.status,reminderDate(meta),lead.message||""]});
    downloadText(`tafa-crm-${new Date().toISOString().slice(0,10)}.csv`,[headers,...rows].map(row=>row.map(csvValue).join(";")).join("\n"));
  }
  async function importExcel(event:ChangeEvent<HTMLInputElement>){
    const file=event.target.files?.[0];if(!file)return;if(file.name.toLowerCase().endsWith(".xlsx")){setError(locale==="ru"?"Сохрани файл Excel как CSV и загрузи его сюда.":"Save the Excel file as CSV and upload it here.");event.target.value="";return}
    const value=await file.text(),lines=value.split(/\r?\n/).filter(Boolean);if(lines.length<2)return;const separator=(lines[0].match(/;/g)||[]).length>=(lines[0].match(/,/g)||[]).length?";":",",headers=parseCsvLine(lines[0],separator).map(x=>x.toLowerCase().trim());
    const aliases:Record<string,string[]>={name:["имя","name"],phone:["телефон","phone"],instagram:["instagram","инстаграм"],email:["email","почта"],company:["компания","company"],city:["город","city"],project:["тип проекта","project type"],category:["категория","category"],tags:["теги","tags"],source:["источник","source"],message:["информация","message"]};
    const index=(key:string)=>headers.findIndex(header=>(aliases[key]||[]).includes(header)),created:Lead[]=[],importedMeta:Record<string,CrmMeta>={};
    lines.slice(1).forEach((line,rowIndex)=>{const cells=parseCsvLine(line,separator),get=(key:string)=>{const i=index(key);return i>=0?(cells[i]||"").trim():""},name=get("name");if(!name)return;const id=`kaskelen-import-${Date.now()}-${rowIndex}`,contact=[get("phone")&&`Телефон: ${get("phone")}`,get("instagram")&&`Instagram: ${get("instagram")}`,get("email")&&`Email: ${get("email")}`].filter(Boolean).join(" · ");
      const lead:Lead={id,created_at:new Date().toISOString(),name,contact,company:get("company")||null,city:get("city")||null,project_type:get("project")||null,message:get("message")||null,locale:"ru",source_path:get("source")||"Импорт Excel",status:"new",admin_notes:null};created.push(lead);importedMeta[id]={reminder_at:"",history:[],status:"new",category:get("category"),tags:get("tags").split(",").map(x=>x.trim()).filter(Boolean),source:get("source")||"Импорт Excel",temperature:"cold",followup_message:buildFollowupMessage(lead,"ru")};
    });
    const current=readLocalCrmState(),manual=[...created,...current.manual],nextMeta={...crmMeta,...importedMeta};await persistCrmState({...current,manual,meta:nextMeta,settings});setCrmMeta(nextMeta);setLeads(rows=>[...created,...rows]);setNotice(locale==="ru"?`Импортировано: ${created.length}`:`Imported: ${created.length}`);event.target.value="";
  }
  async function copyText(value:string){try{await navigator.clipboard.writeText(value);setCopied(true);setTimeout(()=>setCopied(false),1500)}catch{}}
  async function login(event:FormEvent<HTMLFormElement>){event.preventDefault();const form=new FormData(event.currentTarget);setLoading(true);setError("");const {error:loginError}=await sb.auth.signInWithPassword({email:String(form.get("email")||"").trim(),password:String(form.get("password")||"")});if(loginError)setError(t.loginError);setLoading(false)}

  if(!ready)return <main className="min-h-screen bg-[#f5f1ec] p-8 text-[#211a17]">Loading…</main>;
  if(!user)return <main className="flex min-h-screen items-center justify-center bg-[#f5f1ec] p-5 text-[#211a17]"><div className="w-full max-w-md rounded-[32px] border border-black/10 bg-white p-8 shadow-sm"><b>Tafa Lab</b><h1 className="mt-8 text-3xl">Admin</h1><p className="mt-2 text-sm text-black/50">{t.login}</p><form onSubmit={login} className="mt-8 space-y-5"><label className="block text-sm">Email<input name="email" type="email" required className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3.5"/></label><label className="block text-sm">{t.password}<input name="password" type="password" required className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3.5"/></label>{error&&<p className="text-sm text-red-700">{error}</p>}<button disabled={loading} className="w-full rounded-full bg-[#211a17] px-5 py-3.5 text-white">{loading?t.signing:t.signIn}</button></form></div></main>;

  const selected=leads.find(x=>x.id===selectedId)||null,filterKeys:LeadFilter[]=["all","new","draft","contacted","in_progress","won","lost"];
  const sectionTitle=section==="crm"?(locale==="ru"?"Клиенты и CRM":"Clients & CRM"):section==="reminders"?(locale==="ru"?"Следующие контакты":"Next contacts"):section==="kanban"?(locale==="ru"?"Воронка продаж":"Sales pipeline"):section==="analytics"?(locale==="ru"?"Аналитика CRM":"CRM analytics"):section==="templates"?(locale==="ru"?"Шаблоны сообщений":"Message templates"):t.leads;
  const contactEditor=(label:string,values:string[],setValues:(value:string[]|((rows:string[])=>string[]))=>void,placeholder:string,type="text")=><div><div className="flex items-center justify-between"><label className="text-xs uppercase tracking-[.14em] text-black/40">{label}</label><button type="button" onClick={()=>setValues(rows=>[...rows,""])} className="text-sm underline">+ {locale==="ru"?"Добавить":"Add"}</button></div><div className="mt-2 space-y-2">{values.map((value,index)=><div key={index} className="flex gap-2"><input type={type} value={value} onChange={event=>setValues(rows=>rows.map((item,i)=>i===index?event.target.value:item))} placeholder={placeholder} className="min-w-0 flex-1 rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3.5"/>{values.length>1&&<button type="button" onClick={()=>setValues(rows=>rows.filter((_,i)=>i!==index))} className="text-red-700">×</button>}</div>)}</div></div>;

  return <main className="min-h-screen bg-[#f5f1ec] text-[#211a17]">
    <header className="sticky top-0 z-20 border-b border-black/10 bg-[#f5f1ec]/95 backdrop-blur"><div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4"><div><b>Tafa Lab</b><div className="text-xs text-black/45">{t.admin}</div></div><button onClick={()=>sb.auth.signOut()} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">{t.logout}</button></div></header>
    <div className="mx-auto flex max-w-[1600px] flex-col md:flex-row">
      <aside className="border-b border-black/10 px-4 py-4 md:min-h-[calc(100vh-73px)] md:w-64 md:border-b-0 md:border-r md:py-8"><p className="px-3 text-xs uppercase tracking-[.2em] text-black/40">Tafa Lab CRM</p><nav className="mt-4 flex gap-2 overflow-x-auto md:block md:space-y-2">{([
        ["requests","▤",locale==="ru"?"Заявки":"Requests",leads.filter(x=>!isCrmId(x.id)).length],["crm","◌","CRM",crmLeads.length],["reminders","◷",locale==="ru"?"Напоминания":"Reminders",analytics.overdue],["kanban","▦",locale==="ru"?"Воронка":"Pipeline",crmLeads.length],["analytics","◫",locale==="ru"?"Аналитика":"Analytics",null],["templates","✉",locale==="ru"?"Шаблоны":"Templates",settings.templates.length],
      ] as [Section,string,string,number|null][]).map(([key,icon,label,count])=><button key={key} type="button" onClick={()=>{setSection(key);setSelectedId(null)}} className={`whitespace-nowrap rounded-2xl px-4 py-3 text-left text-sm font-medium md:block md:w-full ${section===key?"bg-[#211a17] text-white":"bg-white hover:bg-[#eee7e1]"}`}>{icon} {label}{count!==null&&<span className="ml-2 opacity-60">{count}</span>}</button>)}</nav></aside>
      <section className="min-w-0 flex-1 px-5 py-8 md:px-8 md:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-[.2em] text-black/40">CRM · Tafa Lab</p><h1 className="mt-2 text-4xl">{sectionTitle}</h1><p className="mt-2 text-sm text-black/50">{t.total}: {section==="requests"?leads.filter(x=>!isCrmId(x.id)).length:crmLeads.length}</p></div><div className="flex flex-wrap gap-2"><button onClick={load} disabled={loading} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">{loading?t.refreshing:t.refresh}</button>{section==="crm"&&<><label className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-2 text-sm">{locale==="ru"?"Импорт Excel/CSV":"Import Excel/CSV"}<input type="file" accept=".csv,.txt,.xlsx" onChange={importExcel} className="hidden"/></label><button onClick={exportExcel} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">{locale==="ru"?"Экспорт Excel":"Export Excel"}</button><button onClick={()=>setAdding(true)} className="rounded-full bg-[#211a17] px-4 py-2 text-sm text-white">{locale==="ru"?"Добавить в CRM":"Add to CRM"}</button></>}</div></div>

        {adding&&section==="crm"&&<form onSubmit={createCrmLead} className="mt-6 rounded-[28px] border border-black/10 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-xl">{locale==="ru"?"Новая запись CRM":"New CRM record"}</h2><button type="button" onClick={()=>setAdding(false)} className="text-2xl">×</button></div><div className="mt-5 grid gap-3 md:grid-cols-2">
          <input required value={newLead.name} onChange={e=>setNewLead({...newLead,name:e.target.value})} placeholder={locale==="ru"?"Имя / компания *":"Name / company *"} className="rounded-2xl border border-black/10 px-4 py-3"/><input value={newLead.phone} onChange={e=>setNewLead({...newLead,phone:e.target.value})} placeholder={locale==="ru"?"Телефон":"Phone"} className="rounded-2xl border border-black/10 px-4 py-3"/><input value={newLead.instagram} onChange={e=>setNewLead({...newLead,instagram:e.target.value})} placeholder="Instagram" className="rounded-2xl border border-black/10 px-4 py-3"/><input type="email" value={newLead.email} onChange={e=>setNewLead({...newLead,email:e.target.value})} placeholder={locale==="ru"?"Почта":"Email"} className="rounded-2xl border border-black/10 px-4 py-3"/>
          <input value={newLead.company} onChange={e=>setNewLead({...newLead,company:e.target.value})} placeholder={locale==="ru"?"Компания":"Company"} className="rounded-2xl border border-black/10 px-4 py-3"/><input value={newLead.city} onChange={e=>setNewLead({...newLead,city:e.target.value})} placeholder={locale==="ru"?"Город":"City"} className="rounded-2xl border border-black/10 px-4 py-3"/><input value={newLead.project_type} onChange={e=>setNewLead({...newLead,project_type:e.target.value})} placeholder={locale==="ru"?"Что предложить":"Project type"} className="rounded-2xl border border-black/10 px-4 py-3"/><input value={newLead.category} onChange={e=>setNewLead({...newLead,category:e.target.value})} placeholder={locale==="ru"?"Категория":"Category"} className="rounded-2xl border border-black/10 px-4 py-3"/>
          <input value={newLead.tags} onChange={e=>setNewLead({...newLead,tags:e.target.value})} placeholder={locale==="ru"?"Теги через запятую":"Tags, comma separated"} className="rounded-2xl border border-black/10 px-4 py-3"/><input value={newLead.source} onChange={e=>setNewLead({...newLead,source:e.target.value})} placeholder={locale==="ru"?"Источник":"Source"} className="rounded-2xl border border-black/10 px-4 py-3"/><label className="text-xs text-black/50">{locale==="ru"?"Следующий контакт":"Next contact"}<div className="mt-1 grid grid-cols-2 gap-2"><input type="date" value={newLead.reminder_at} onChange={e=>setNewLead({...newLead,reminder_at:e.target.value})} className="rounded-2xl border border-black/10 px-3 py-3"/><input type="time" value={newLead.reminder_time} onChange={e=>setNewLead({...newLead,reminder_time:e.target.value})} className="rounded-2xl border border-black/10 px-3 py-3"/></div></label>
          <textarea value={newLead.message} onChange={e=>setNewLead({...newLead,message:e.target.value})} placeholder={locale==="ru"?"Информация о компании":"Company information"} className="min-h-24 rounded-2xl border border-black/10 px-4 py-3 md:col-span-2"/></div>{duplicateMatches.length>0&&<div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><b>{t.duplicate}</b><div>{duplicateMatches.map(x=>x.name).join(", ")}</div></div>}<button className="mt-4 rounded-full bg-[#211a17] px-5 py-3 text-white">{locale==="ru"?"Сохранить запись":"Save record"}</button></form>}

        {section==="analytics"&&<div className="mt-8"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[[locale==="ru"?"Всего клиентов":"Total clients",analytics.total],[locale==="ru"?"Связались":"Contacted",analytics.contacted],[locale==="ru"?"Успешно":"Won",analytics.won],[locale==="ru"?"Конверсия":"Conversion",`${analytics.conversion}%`]].map(([label,value])=><div key={String(label)} className="rounded-[24px] border border-black/10 bg-white p-5"><div className="text-xs uppercase text-black/40">{label}</div><div className="mt-2 text-3xl">{value}</div></div>)}</div><div className="mt-5 grid gap-5 lg:grid-cols-2">{[[locale==="ru"?"Источники клиентов":"Lead sources",analytics.sources],[locale==="ru"?"Категории":"Categories",analytics.categories]].map(([title,items])=><div key={String(title)} className="rounded-[28px] border border-black/10 bg-white p-6"><h2 className="text-xl">{String(title)}</h2><div className="mt-5 space-y-3">{(items as [string,number][]).map(([name,value])=><div key={name} className="flex justify-between border-b border-black/5 pb-2"><span>{name}</span><b>{value}</b></div>)}</div></div>)}</div></div>}

        {section==="templates"&&<div className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]"><div className="space-y-4">{settings.templates.map(template=><div key={template.id} className="rounded-[24px] border border-black/10 bg-white p-5"><div className="flex gap-3"><input value={template.name} onChange={e=>setSettings({templates:settings.templates.map(x=>x.id===template.id?{...x,name:e.target.value}:x)})} className="min-w-0 flex-1 font-medium outline-none"/><button onClick={()=>void saveTemplates(settings.templates.filter(x=>x.id!==template.id))} className="text-sm text-red-700">×</button></div><textarea value={template.text} onChange={e=>setSettings({templates:settings.templates.map(x=>x.id===template.id?{...x,text:e.target.value}:x)})} rows={4} className="mt-3 w-full rounded-2xl border border-black/10 bg-[#faf8f6] p-3"/><button onClick={()=>void saveTemplates(settings.templates)} className="mt-3 rounded-full border border-black/10 px-4 py-2 text-sm">{t.save}</button></div>)}</div><form onSubmit={addTemplate} className="h-fit rounded-[24px] border border-black/10 bg-white p-5"><h2 className="text-xl">{locale==="ru"?"Новый шаблон":"New template"}</h2><input value={newTemplate.name} onChange={e=>setNewTemplate({...newTemplate,name:e.target.value})} placeholder={locale==="ru"?"Название":"Name"} className="mt-4 w-full rounded-2xl border border-black/10 px-4 py-3"/><textarea value={newTemplate.text} onChange={e=>setNewTemplate({...newTemplate,text:e.target.value})} placeholder="Текст: {{name}}, {{company}}, {{city}}, {{project}}" rows={7} className="mt-3 w-full rounded-2xl border border-black/10 px-4 py-3"/><button className="mt-3 w-full rounded-full bg-[#211a17] px-4 py-3 text-white">{locale==="ru"?"Добавить шаблон":"Add template"}</button></form></div>}

        {section==="kanban"&&<div className="mt-8 overflow-x-auto"><div className="grid min-w-[1260px] grid-cols-6 gap-3">{(["new","draft","contacted","in_progress","won","lost"] as LeadStatus[]).map(status=><div key={status} onDragOver={e=>e.preventDefault()} onDrop={e=>void changeStatus(e.dataTransfer.getData("text/plain"),status)} className="min-h-[500px] rounded-[24px] border border-black/10 bg-white/60 p-3"><div className="flex justify-between px-2 py-2"><b className="text-sm">{t.statuses[status]}</b><span className="text-xs">{crmLeads.filter(x=>x.status===status).length}</span></div><div className="mt-2 space-y-3">{crmLeads.filter(x=>x.status===status).map(lead=><button key={lead.id} draggable onDragStart={e=>e.dataTransfer.setData("text/plain",lead.id)} onClick={()=>fillDraft(lead)} className={`block w-full rounded-2xl border p-3 text-left text-sm shadow-sm ${reminderTone(crmMeta[lead.id])||"border-black/10 bg-white"}`}><b>{lead.name}</b><div className="mt-2 text-xs text-black/45">{crmMeta[lead.id]?.category||lead.project_type||"—"}</div>{crmMeta[lead.id]?.reminder_at&&<div className="mt-2 text-xs">◷ {crmMeta[lead.id]?.reminder_at} {crmMeta[lead.id]?.reminder_time||""}</div>}</button>)}</div></div>)}</div></div>}

        {!["analytics","templates","kanban"].includes(section)&&<><div className="mt-7 flex flex-wrap gap-2">{filterKeys.map(key=><button key={key} onClick={()=>setFilter(key)} className={`rounded-full border px-4 py-2 text-sm ${filter===key?"border-[#211a17] bg-[#211a17] text-white":"border-black/10 bg-white"}`}>{t.filters[key]} <span className="opacity-60">{counts[key]}</span></button>)}</div><div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-6"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search} className="rounded-2xl border border-black/10 bg-white px-4 py-3 xl:col-span-2"/><select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)} className="rounded-2xl border border-black/10 bg-white px-3"><option value="">{locale==="ru"?"Все категории":"All categories"}</option>{categoryOptions.map(x=><option key={x}>{x}</option>)}</select><select value={sourceFilter} onChange={e=>setSourceFilter(e.target.value)} className="rounded-2xl border border-black/10 bg-white px-3"><option value="">{locale==="ru"?"Все источники":"All sources"}</option>{sourceOptions.map(x=><option key={x}>{x}</option>)}</select><select value={tagFilter} onChange={e=>setTagFilter(e.target.value)} className="rounded-2xl border border-black/10 bg-white px-3"><option value="">{locale==="ru"?"Все теги":"All tags"}</option>{tagOptions.map(x=><option key={x}>{x}</option>)}</select><select value={temperatureFilter} onChange={e=>setTemperatureFilter(e.target.value)} className="rounded-2xl border border-black/10 bg-white px-3"><option value="">{locale==="ru"?"Любой интерес":"Any interest"}</option><option value="hot">{locale==="ru"?"Горячий":"Hot"}</option><option value="warm">{locale==="ru"?"Тёплый":"Warm"}</option><option value="cold">{locale==="ru"?"Холодный":"Cold"}</option></select></div><div className="mt-3 flex justify-between text-xs text-black/40"><span>{t.found}: {visibleLeads.length}</span><select value={sort} onChange={e=>setSort(e.target.value as SortMode)} className="rounded-xl border border-black/10 bg-white px-3 py-2"><option value="newest">{t.newest}</option><option value="oldest">{t.oldest}</option><option value="name">{t.name}</option></select></div>
          {notice&&<div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">{notice}</div>}{error&&<div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}
          <div className="mt-7 grid gap-4">{visibleLeads.map(lead=><button type="button" key={lead.id} onClick={()=>fillDraft(lead)} className={`w-full rounded-[28px] border p-5 text-left transition hover:shadow-sm ${reminderTone(crmMeta[lead.id])||"border-black/10 bg-white"}`}><div className="flex flex-wrap justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl">{lead.name}</h2><span className={`rounded-full px-3 py-1 text-xs ${statusStyles[lead.status]}`}>{t.statuses[lead.status]}</span>{crmMeta[lead.id]?.temperature&&<span className="rounded-full bg-black/5 px-3 py-1 text-xs">{crmMeta[lead.id]?.temperature==="hot"?"🔥":crmMeta[lead.id]?.temperature==="warm"?"☀":"❄"} {crmMeta[lead.id]?.temperature}</span>}</div><p className="mt-1 text-sm text-black/45">{new Date(lead.created_at).toLocaleString(locale==="ru"?"ru-RU":"en-US")}</p></div>{crmMeta[lead.id]?.reminder_at&&<span className="rounded-full bg-white px-3 py-1 text-xs">◷ {crmMeta[lead.id]?.reminder_at} {crmMeta[lead.id]?.reminder_time||""}</span>}</div><div className="mt-4 grid gap-4 sm:grid-cols-4"><div><small className="text-black/40">{t.contact.toUpperCase()}</small><p className="break-all">{lead.contact}</p></div><div><small className="text-black/40">{t.company.toUpperCase()}</small><p>{lead.company||"—"}</p></div><div><small className="text-black/40">{locale==="ru"?"КАТЕГОРИЯ":"CATEGORY"}</small><p>{crmMeta[lead.id]?.category||"—"}</p></div><div><small className="text-black/40">{locale==="ru"?"ИСТОЧНИК":"SOURCE"}</small><p>{crmMeta[lead.id]?.source||lead.source_path||"—"}</p></div></div>{(crmMeta[lead.id]?.tags||[]).length>0&&<div className="mt-4 flex flex-wrap gap-2">{crmMeta[lead.id]?.tags?.map(tag=><span key={tag} className="rounded-full bg-[#f0ebe5] px-3 py-1 text-xs">#{tag}</span>)}</div>}<div className="mt-4 text-sm font-medium">{t.open} →</div></button>)}{!loading&&visibleLeads.length===0&&<div className="rounded-[28px] border border-black/10 bg-white p-8 text-black/50">{t.none}</div>}</div></>}

        {selected&&<><button type="button" aria-label={t.close} onClick={()=>setSelectedId(null)} className="fixed inset-0 z-30 bg-black/35 backdrop-blur-[2px]"/><aside className="fixed inset-y-0 right-0 z-40 w-full max-w-[520px] overflow-y-auto border-l border-black/10 bg-[#f5f1ec] p-4 shadow-2xl md:p-6"><div className="rounded-[28px] border border-black/10 bg-white p-5 shadow-sm"><div className="flex justify-between gap-4"><div><p className="text-xs uppercase text-black/35">{t.lead}</p><h2 className="mt-2 text-2xl">{selected.name}</h2></div><button onClick={()=>setSelectedId(null)} className="h-9 w-9 rounded-full border border-black/10">×</button></div><div className="mt-6 space-y-5">
          <label className="block text-xs text-black/40">{t.status}<select value={draftStatus} onChange={e=>setDraftStatus(e.target.value as LeadStatus)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3">{(["new","draft","contacted","in_progress","won","lost"] as LeadStatus[]).map(status=><option key={status} value={status}>{t.statuses[status]}</option>)}</select></label>
          {contactEditor(locale==="ru"?"Телефон":"Phone",draftPhones,setDraftPhones,"+7 700 000 00 00","tel")}{contactEditor("Instagram",draftInstagrams,setDraftInstagrams,"@company")}{contactEditor(locale==="ru"?"Почта":"Email",draftEmails,setDraftEmails,"mail@example.com","email")}
          <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-black/40">{locale==="ru"?"Компания":"Company"}<input value={draftCompany} onChange={e=>setDraftCompany(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"/></label><label className="text-xs text-black/40">{locale==="ru"?"Город":"City"}<input value={draftCity} onChange={e=>setDraftCity(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"/></label><label className="text-xs text-black/40">{locale==="ru"?"Категория":"Category"}<input list="crm-categories" value={draftCategory} onChange={e=>setDraftCategory(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"/><datalist id="crm-categories">{categoryOptions.map(x=><option key={x} value={x}/>)}</datalist></label><label className="text-xs text-black/40">{locale==="ru"?"Источник":"Source"}<input value={draftSource} onChange={e=>setDraftSource(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"/></label></div>
          <label className="block text-xs text-black/40">{locale==="ru"?"Теги через запятую":"Tags, comma separated"}<input value={draftTags} onChange={e=>setDraftTags(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"/></label><label className="block text-xs text-black/40">{locale==="ru"?"Интерес клиента":"Lead interest"}<select value={draftTemperature} onChange={e=>setDraftTemperature(e.target.value as LeadTemperature)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"><option value="cold">{locale==="ru"?"Холодный":"Cold"}</option><option value="warm">{locale==="ru"?"Тёплый":"Warm"}</option><option value="hot">{locale==="ru"?"Горячий":"Hot"}</option></select></label>
          <label className="block text-xs text-black/40">{locale==="ru"?"Следующий контакт":"Next contact"}<div className="mt-2 grid grid-cols-2 gap-2"><input type="date" value={draftReminder} onChange={e=>setDraftReminder(e.target.value)} className="rounded-2xl border border-black/10 bg-[#faf8f6] px-3 py-3"/><input type="time" value={draftReminderTime} onChange={e=>setDraftReminderTime(e.target.value)} className="rounded-2xl border border-black/10 bg-[#faf8f6] px-3 py-3"/></div></label><label className="block text-xs text-black/40">{t.note}<textarea value={draftNotes} onChange={e=>setDraftNotes(e.target.value)} rows={5} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"/></label>
          <button onClick={saveLead} disabled={saving} className="w-full rounded-full bg-[#211a17] px-5 py-3.5 text-white">{saving?t.saving:t.save}</button>{saved&&<p className="text-center text-sm text-green-700">{t.saved}</p>}
          <div className="border-t border-black/10 pt-5"><div className="flex items-center justify-between"><div className="text-xs uppercase text-black/40">{t.primaryMessage}</div><select defaultValue="" onChange={e=>{const template=settings.templates.find(x=>x.id===e.target.value);if(template)setDraftPrimaryMessage(template.text);e.currentTarget.value=""}} className="rounded-xl border border-black/10 px-2 py-1 text-xs"><option value="" disabled>{locale==="ru"?"Выбрать шаблон":"Choose template"}</option>{settings.templates.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></div><textarea value={draftPrimaryMessage} onChange={e=>setDraftPrimaryMessage(e.target.value)} rows={5} placeholder={locale==="ru"?"Напиши основное сообщение":"Write primary message"} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"/></div>
          <div className="flex flex-wrap gap-2">{contactValues(selected.contact,"Телефон").map((phone,index)=><button key={`p-wa-${index}`} onClick={()=>sendWhatsApp(selected,phone,draftPrimaryMessage)} disabled={!draftPrimaryMessage.trim()} className="rounded-full bg-[#327f51] px-3 py-2 text-xs text-white disabled:opacity-40">WhatsApp {index+1}</button>)}{contactValues(selected.contact,"Email").map((email,index)=><button key={`p-em-${index}`} onClick={()=>sendEmail(selected,email,draftPrimaryMessage)} disabled={!draftPrimaryMessage.trim()} className="rounded-full bg-[#405d8a] px-3 py-2 text-xs text-white disabled:opacity-40">Email {index+1}</button>)}</div>
          <div className="border-t border-black/10 pt-5"><div className="text-xs uppercase text-black/40">{t.followupMessage}</div><textarea value={draftFollowupMessage} onChange={e=>setDraftFollowupMessage(e.target.value)} rows={5} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3"/></div><div className="flex flex-wrap gap-2">{contactValues(selected.contact,"Телефон").map((phone,index)=><button key={`f-wa-${index}`} onClick={()=>sendWhatsApp(selected,phone,draftFollowupMessage)} className="rounded-full bg-[#327f51] px-3 py-2 text-xs text-white">WhatsApp {index+1}</button>)}{contactValues(selected.contact,"Email").map((email,index)=><button key={`f-em-${index}`} onClick={()=>sendEmail(selected,email,draftFollowupMessage)} className="rounded-full bg-[#405d8a] px-3 py-2 text-xs text-white">Email {index+1}</button>)}<button onClick={()=>void copyText(renderTemplate(draftFollowupMessage,selected))} className="rounded-full border border-black/10 px-3 py-2 text-xs">{copied?t.copied:t.copy}</button></div>
          {contactValues(selected.contact,"Instagram").length>0&&<div className="flex flex-wrap gap-2">{contactValues(selected.contact,"Instagram").map((instagram,index)=><button key={instagram+index} onClick={()=>openInstagram(selected,instagram)} className="rounded-full border border-pink-200 bg-pink-50 px-3 py-2 text-xs text-pink-800">Instagram {index+1}</button>)}</div>}
          <div className="border-t border-black/10 pt-5"><div className="flex justify-between"><div className="text-xs uppercase text-black/40">{locale==="ru"?"Файлы клиента":"Client files"}</div><label className="cursor-pointer text-sm underline">+ {locale==="ru"?"Добавить файл":"Add file"}<input type="file" onChange={handleAttachment} className="hidden"/></label></div><div className="mt-3 space-y-2">{(crmMeta[selected.id]?.attachments||[]).map(file=><div key={file.id} className="flex justify-between gap-2 rounded-2xl bg-[#faf8f6] p-3 text-sm"><button onClick={()=>downloadAttachment(file.id)} className="min-w-0 truncate underline">{file.name}</button><button onClick={()=>void removeAttachment(file.id)} className="text-red-700">×</button></div>)}{!(crmMeta[selected.id]?.attachments||[]).length&&<p className="text-sm text-black/40">{locale==="ru"?"Файлов пока нет":"No files yet"}</p>}</div></div>
          <div className="border-t border-black/10 pt-5"><div className="text-xs uppercase text-black/40">{locale==="ru"?"История взаимодействий":"Interaction history"}</div><div className="mt-3 space-y-3">{(crmMeta[selected.id]?.interactions||[]).slice().reverse().map(item=><div key={item.id} className="rounded-2xl bg-[#faf8f6] p-3"><div className="flex justify-between gap-3 text-xs text-black/40"><span>{item.channel}</span><span>{new Date(item.created_at).toLocaleString(locale==="ru"?"ru-RU":"en-US")}</span></div><p className="mt-2 whitespace-pre-wrap text-sm">{item.text}</p></div>)}{!(crmMeta[selected.id]?.interactions||[]).length&&<p className="text-sm text-black/40">{locale==="ru"?"История пока пустая":"No interactions yet"}</p>}</div></div>
          <div className="border-t border-black/10 pt-5"><button onClick={deleteLead} disabled={deleting} className="w-full rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{deleting?t.deleting:t.delete}</button></div>
        </div></div></aside></>}
      </section>
    </div>
  </main>;
}
