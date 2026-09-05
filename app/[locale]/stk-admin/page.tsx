"use client";
// CRM data and UI are kept independent from deployment-time font fetching.

import { FormEvent, useEffect, useMemo, useState } from "react";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

type LeadStatus = "new" | "contacted" | "in_progress" | "won" | "lost";
type LeadFilter = "all" | LeadStatus;
type SortMode = "newest" | "oldest" | "name";

type NoteEntry = { text: string; created_at: string };
type CrmMeta = { reminder_at: string; history: NoteEntry[]; status?: LeadStatus };
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
    filters:{all:"Все",new:"Новые",contacted:"Связались",in_progress:"В работе",won:"Успешно",lost:"Отказ"},
    statuses:{new:"Новая",contacted:"Связались",in_progress:"В работе",won:"Успешно",lost:"Отказ"},
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
    found:"Найдено",
  },
  en: {
    admin:"Admin · Leads", leads:"Leads", total:"Total", refresh:"Refresh", refreshing:"Refreshing…",
    logout:"Log out", search:"Search name, contact, company or message…", sort:"Sort",
    newest:"Newest first", oldest:"Oldest first", name:"By name",
    filters:{all:"All",new:"New",contacted:"Contacted",in_progress:"In progress",won:"Won",lost:"Lost"},
    statuses:{new:"New",contacted:"Contacted",in_progress:"In progress",won:"Won",lost:"Lost"},
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
    found:"Found",
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
 
const statusStyles: Record<LeadStatus, string> = {
  new: "bg-[#f0ebe5] text-[#5b4a3f]",
  contacted: "bg-[#e8eef6] text-[#35465a]",
  in_progress: "bg-[#eee8f6] text-[#4e3c62]",
  won: "bg-[#e6f1e8] text-[#35503a]",
  lost: "bg-[#f5e6e5] text-[#663f3c]",
};

export default function StkAdminPage() {
  const pathname = usePathname();
  const locale: "ru" | "en" = pathname.startsWith("/en") ? "en" : "ru";
  const t = text[locale];

  const [user,setUser]=useState<User|null>(null);
  const [ready,setReady]=useState(false);
  const [leads,setLeads]=useState<Lead[]>([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [selectedId,setSelectedId]=useState<string|null>(null);
  const [draftStatus,setDraftStatus]=useState<LeadStatus>("new");
  const [draftNotes,setDraftNotes]=useState("");
  const [saving,setSaving]=useState(false);
  const [saved,setSaved]=useState(false);
  const [filter,setFilter]=useState<LeadFilter>("all");
  const [query,setQuery]=useState("");
  const [sort,setSort]=useState<SortMode>("newest");
  const [deleting,setDeleting]=useState(false);
  const [notice,setNotice]=useState("");
  const [copied,setCopied]=useState(false);
  const [followupCopied,setFollowupCopied]=useState(false);
  const [section,setSection]=useState<"requests"|"crm"|"reminders">("requests");
  const [crmMeta,setCrmMeta]=useState<Record<string,CrmMeta>>({});
  const [draftReminder,setDraftReminder]=useState("");
  const [adding,setAdding]=useState(false);
  const [newLead,setNewLead]=useState({name:"",phone:"",instagram:"",email:"",company:"",city:"",project_type:"",message:"",reminder_at:""});

  useEffect(()=>{
    try{setCrmMeta(JSON.parse(localStorage.getItem("stk-admin-crm-meta")||"{}"));}catch{}
    sb.auth.getUser().then(({data})=>{setUser(data.user??null);setReady(true)});
    const {data}=sb.auth.onAuthStateChange((_e,s)=>setUser(s?.user??null));
    return()=>data.subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    const timer=window.setTimeout(()=>{
      if(user)void load();
      else{setLeads([]);setSelectedId(null)}
    },0);
    return()=>window.clearTimeout(timer);
    // `load` intentionally uses the latest selected lead only when auth changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user]);

  const counts=useMemo(()=>{
    const scoped=section==="crm"||section==="reminders"?leads.filter(x=>x.id.startsWith("kaskelen-")):leads.filter(x=>!x.id.startsWith("kaskelen-"));
    const r:Record<LeadFilter,number>={all:scoped.length,new:0,contacted:0,in_progress:0,won:0,lost:0};
    scoped.forEach(x=>r[x.status]++);
    return r;
  },[leads,section]);

  const visibleLeads=useMemo(()=>{
    const q=query.trim().toLowerCase();
    const sourceLeads=section==="crm"||section==="reminders"?leads.filter(x=>x.id.startsWith("kaskelen-")):leads.filter(x=>!x.id.startsWith("kaskelen-"));
    let rows=filter==="all"?[...sourceLeads]:sourceLeads.filter(x=>x.status===filter);
    if(section==="reminders"){const today=new Date().toISOString().slice(0,10);rows=sourceLeads.filter(x=>Boolean(crmMeta[x.id]?.reminder_at)&&crmMeta[x.id].reminder_at<=today);}
    rows.sort((a,b)=>{const ar=crmMeta[a.id]?.reminder_at||"9999-12-31";const br=crmMeta[b.id]?.reminder_at||"9999-12-31";if(section==="reminders")return ar.localeCompare(br);return 0;});
    if(q) rows=rows.filter(x=>[
      x.name,x.contact,x.company,x.city,x.project_type,x.message,x.admin_notes,x.source_path
    ].some(v=>(v??"").toLowerCase().includes(q)));
    rows.sort((a,b)=>{
      if(sort==="oldest") return +new Date(a.created_at)-+new Date(b.created_at);
      if(sort==="name") return a.name.localeCompare(b.name,locale);
      return +new Date(b.created_at)-+new Date(a.created_at);
    });
    return rows;
  },[leads,filter,query,sort,locale,section,crmMeta]);

  async function load(){
    setLoading(true);setError("");
    const stored=(()=>{try{return JSON.parse(localStorage.getItem("stk-admin-crm-meta")||"{}") as Record<string,CrmMeta>}catch{return {}}})();
    const deleted=(()=>{try{return JSON.parse(localStorage.getItem("stk-admin-deleted-crm")||"[]") as string[]}catch{return []}})();
    const manual=(()=>{try{return JSON.parse(localStorage.getItem("stk-admin-manual-crm")||"[]") as Lead[]}catch{return []}})();
    setCrmMeta(stored);
    const seeded=[...kaskelenLeads,...almatyLeadSeed].filter(x=>!deleted.includes(x.id)).map(x=>({...x,status:stored[x.id]?.status||x.status,admin_notes:x.admin_notes||null}));
    const manualVisible=manual.filter(x=>!deleted.includes(x.id)).map(x=>({...x,status:stored[x.id]?.status||x.status,admin_notes:x.admin_notes||null}));
    const {data,error}=await sb.from("stk_lab_leads").select("*").order("created_at",{ascending:false});
    if(error)setError(error.message);
    else{
      const rows=(data??[]) as Lead[];
      setLeads([...manualVisible,...seeded,...rows]);
      if(selectedId){
        const x=rows.find(r=>r.id===selectedId);
        if(x){setDraftStatus(x.status);setDraftNotes(x.admin_notes??"")}
        else setSelectedId(null);
      }
    }
    setLoading(false);
  }

  function openLead(x:Lead){
    setSelectedId(x.id);setDraftStatus(crmMeta[x.id]?.status||x.status);setDraftNotes(x.admin_notes??"");setDraftReminder(crmMeta[x.id]?.reminder_at||"");
    setSaved(false);setNotice("");setError("");setCopied(false);
  }

  async function saveLead(){
    if(!selectedId)return;
    setSaving(true);setSaved(false);setError("");
    const notes=draftNotes.trim()||null;
    const previous=crmMeta[selectedId]||{reminder_at:"",history:[]};
    const history=notes&&notes!==previous.history.at(-1)?.text?[...previous.history,{text:notes,created_at:new Date().toISOString()}]:previous.history;
    const nextMeta={...crmMeta,[selectedId]:{reminder_at:draftReminder,history,status:draftStatus}};
    setCrmMeta(nextMeta);localStorage.setItem("stk-admin-crm-meta",JSON.stringify(nextMeta));
    if(selectedId.startsWith("kaskelen-")){
      setLeads(p=>p.map(x=>x.id===selectedId?{...x,status:draftStatus,admin_notes:notes}:x));
      setSaved(true);window.setTimeout(()=>setSaved(false),2200);
      setSaving(false);
      return;
    }
    const {error}=await sb.from("stk_lab_leads").update({status:draftStatus,admin_notes:notes}).eq("id",selectedId);
    if(error)setError(error.message);
    else{
      setLeads(p=>p.map(x=>x.id===selectedId?{...x,status:draftStatus,admin_notes:notes}:x));
      setSaved(true);window.setTimeout(()=>setSaved(false),2200);
    }
    setSaving(false);
  }

  function createCrmLead(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!newLead.name.trim()||(!newLead.phone.trim()&&!newLead.instagram.trim()&&!newLead.email.trim()))return;
    const id=`kaskelen-manual-${Date.now()}`;
    const contact=[newLead.phone.trim()&&`Телефон: ${newLead.phone.trim()}`,newLead.instagram.trim()&&`Instagram: ${newLead.instagram.trim()}`,newLead.email.trim()&&`Email: ${newLead.email.trim()}`].filter(Boolean).join(" · ");
    const lead:Lead={id,created_at:new Date().toISOString(),name:newLead.name.trim(),contact,company:newLead.company.trim()||null,city:newLead.city.trim()||null,project_type:newLead.project_type.trim()||null,message:newLead.message.trim()||null,locale:"ru",source_path:"Добавлено вручную",status:"new",admin_notes:null};
    const manual=(()=>{try{return JSON.parse(localStorage.getItem("stk-admin-manual-crm")||"[]") as Lead[]}catch{return []}})();
    manual.unshift(lead);
    localStorage.setItem("stk-admin-manual-crm",JSON.stringify(manual));
    setLeads(p=>[lead,...p]);
    if(newLead.reminder_at){const next={...crmMeta,[id]:{reminder_at:newLead.reminder_at,history:[]}};setCrmMeta(next);localStorage.setItem("stk-admin-crm-meta",JSON.stringify(next));}
    setNewLead({name:"",phone:"",instagram:"",email:"",company:"",city:"",project_type:"",message:"",reminder_at:""});setAdding(false);setSection("crm");setSelectedId(id);openLead(lead);
  }

  async function deleteLead(){
    if(!selectedId||!window.confirm(t.deleteAsk))return;
    setDeleting(true);setError("");
    if(selectedId.startsWith("kaskelen-")){
      const deleted=(()=>{try{return JSON.parse(localStorage.getItem("stk-admin-deleted-crm")||"[]") as string[]}catch{return []}})();
      if(!deleted.includes(selectedId)){deleted.push(selectedId);localStorage.setItem("stk-admin-deleted-crm",JSON.stringify(deleted));}
      const manual=(()=>{try{return JSON.parse(localStorage.getItem("stk-admin-manual-crm")||"[]") as Lead[]}catch{return []}})();
      localStorage.setItem("stk-admin-manual-crm",JSON.stringify(manual.filter(x=>x.id!==selectedId)));
      setLeads(p=>p.filter(x=>x.id!==selectedId));
      setSelectedId(null);setNotice(t.deleted);window.setTimeout(()=>setNotice(""),2500);
      setDeleting(false);
      return;
    }
    const {error}=await sb.from("stk_lab_leads").delete().eq("id",selectedId);
    if(error)setError(error.message);
    else{
      setLeads(p=>p.filter(x=>x.id!==selectedId));
      setSelectedId(null);setNotice(t.deleted);window.setTimeout(()=>setNotice(""),2500);
    }
    setDeleting(false);
  }

  async function copyFollowup(x:Lead){
    const message=`Здравствуйте, ${x.name}! Возвращаюсь к нашему предложению по проекту. Готова показать варианты сайта и ответить на вопросы. Информация по заявке: ${x.message||x.project_type||"ваш запрос"}`;
    try{await navigator.clipboard.writeText(message);setFollowupCopied(true);window.setTimeout(()=>setFollowupCopied(false),1800)}catch{}
  }

  async function copyContact(contact:string){
    try{await navigator.clipboard.writeText(contact);setCopied(true);window.setTimeout(()=>setCopied(false),1500)}catch{}
  }

  async function login(e:FormEvent<HTMLFormElement>){
    e.preventDefault();const f=new FormData(e.currentTarget);setLoading(true);setError("");
    const {error}=await sb.auth.signInWithPassword({email:String(f.get("email")||"").trim(),password:String(f.get("password")||"")});
    if(error)setError(t.loginError);setLoading(false);
  }

  if(!ready)return <main className="min-h-screen bg-[#f5f1ec] p-8 text-[#211a17]">Loading…</main>;

  if(!user)return <main className="flex min-h-screen items-center justify-center bg-[#f5f1ec] p-5 text-[#211a17]">
    <div className="w-full max-w-md rounded-[32px] border border-black/10 bg-white p-8 shadow-sm">
      <b>Tafa Lab</b><h1 className="mt-8 text-3xl">Admin</h1><p className="mt-2 text-sm text-black/50">{t.login}</p>
      <form onSubmit={login} className="mt-8 space-y-5">
        <label className="block text-sm">Email<input name="email" type="email" required className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3.5"/></label>
        <label className="block text-sm">{t.password}<input name="password" type="password" required className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3.5"/></label>
        {error&&<p className="text-sm text-red-700">{error}</p>}
        <button disabled={loading} className="w-full rounded-full bg-[#211a17] px-5 py-3.5 text-white">{loading?t.signing:t.signIn}</button>
      </form>
    </div>
  </main>;

  const selected=leads.find(x=>x.id===selectedId)??null;
  const filterKeys:LeadFilter[]=["all","new","contacted","in_progress","won","lost"];

  return <main className="min-h-screen bg-[#f5f1ec] text-[#211a17]">
    <header className="sticky top-0 z-20 border-b border-black/10 bg-[#f5f1ec]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6">
        <div><b>Tafa Lab</b><div className="text-xs text-black/45">{t.admin}</div></div>
        <button onClick={()=>sb.auth.signOut()} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">{t.logout}</button>
      </div>
    </header>

    <div className="mx-auto flex max-w-[1500px] flex-col md:flex-row"><aside className="border-b border-black/10 px-5 py-4 md:min-h-[calc(100vh-73px)] md:w-64 md:border-b-0 md:border-r md:px-4 md:py-8"><p className="px-3 text-xs uppercase tracking-[.2em] text-black/40">STK Bakery</p><nav className="mt-4 flex gap-2 overflow-x-auto md:block md:space-y-2"><button type="button" onClick={()=>{setSection("requests");setSelectedId(null)}} className={`whitespace-nowrap rounded-2xl px-4 py-3 text-left text-sm font-medium md:block md:w-full ${section==="requests"?"bg-[#211a17] text-white":"bg-white hover:bg-[#eee7e1]"}`}>▤ {locale==="ru"?"Заявки":"Requests"} <span className="ml-2 opacity-60">{leads.filter(x=>!x.id.startsWith("kaskelen-")).length}</span></button><button type="button" onClick={()=>{setSection("crm");setSelectedId(null)}} className={`whitespace-nowrap rounded-2xl px-4 py-3 text-left text-sm font-medium md:block md:w-full ${section==="crm"?"bg-[#211a17] text-white":"bg-white hover:bg-[#eee7e1]"}`}>◌ CRM <span className="ml-2 opacity-60">{leads.filter(x=>x.id.startsWith("kaskelen-")).length}</span></button><button type="button" onClick={()=>{setSection("reminders");setSelectedId(null)}} className={`whitespace-nowrap rounded-2xl px-4 py-3 text-left text-sm font-medium md:block md:w-full ${section==="reminders"?"bg-[#211a17] text-white":"bg-white hover:bg-[#eee7e1]"}`}>◷ {locale==="ru"?"Напоминания":"Reminders"} <span className="ml-2 opacity-60">{leads.filter(x=>Boolean(crmMeta[x.id]?.reminder_at)&&crmMeta[x.id].reminder_at<=new Date().toISOString().slice(0,10)).length}</span></button></nav></aside><section className="min-w-0 flex-1 px-5 py-8 md:px-8 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-xs uppercase tracking-[.2em] text-black/40">STK Bakery CRM · Tafa Lab</p><h1 className="mt-2 text-4xl">{section==="crm"?(locale==="ru"?"Клиенты и CRM":"Clients & CRM"):section==="reminders"?(locale==="ru"?"Напоминания":"Reminders"):t.leads}</h1><p className="mt-2 text-sm text-black/50">{t.total}: {section==="crm"?leads.filter(x=>x.id.startsWith("kaskelen-")).length:section==="reminders"?leads.filter(x=>Boolean(crmMeta[x.id]?.reminder_at)&&crmMeta[x.id].reminder_at<=new Date().toISOString().slice(0,10)).length:leads.filter(x=>!x.id.startsWith("kaskelen-")).length}</p></div>
        <button onClick={load} disabled={loading} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">{loading?t.refreshing:t.refresh}</button>{section==="crm"&&<button onClick={()=>setAdding(true)} className="rounded-full bg-[#211a17] px-4 py-2 text-sm text-white">{locale==="ru"?"Добавить в CRM":"Add to CRM"}</button>}
      </div>
      {adding&&section==="crm"&&<form onSubmit={createCrmLead} className="mt-6 rounded-[28px] border border-black/10 bg-white p-5 shadow-sm md:p-6"><div className="flex items-center justify-between"><h2 className="text-xl font-medium">{locale==="ru"?"Новая запись CRM":"New CRM record"}</h2><button type="button" onClick={()=>setAdding(false)} className="text-2xl text-black/40">×</button></div><div className="mt-5 grid gap-3 md:grid-cols-2"><input required value={newLead.name} onChange={e=>setNewLead({...newLead,name:e.target.value})} placeholder={locale==="ru"?"Имя / компания *":"Name / company *"} className="rounded-2xl border border-black/10 px-4 py-3"/><input value={newLead.phone} onChange={e=>setNewLead({...newLead,phone:e.target.value})} placeholder={locale==="ru"?"Телефон":"Phone"} className="rounded-2xl border border-black/10 px-4 py-3"/><input value={newLead.instagram} onChange={e=>setNewLead({...newLead,instagram:e.target.value})} placeholder="Instagram" className="rounded-2xl border border-black/10 px-4 py-3"/><input type="email" value={newLead.email} onChange={e=>setNewLead({...newLead,email:e.target.value})} placeholder={locale==="ru"?"Почта":"Email"} className="rounded-2xl border border-black/10 px-4 py-3"/><input value={newLead.company} onChange={e=>setNewLead({...newLead,company:e.target.value})} placeholder={locale==="ru"?"Компания":"Company"} className="rounded-2xl border border-black/10 px-4 py-3"/><input value={newLead.city} onChange={e=>setNewLead({...newLead,city:e.target.value})} placeholder={locale==="ru"?"Город":"City"} className="rounded-2xl border border-black/10 px-4 py-3"/><input value={newLead.project_type} onChange={e=>setNewLead({...newLead,project_type:e.target.value})} placeholder={locale==="ru"?"Что предложить":"Project type"} className="rounded-2xl border border-black/10 px-4 py-3"/><label className="text-sm text-black/50">{locale==="ru"?"Дата напоминания":"Reminder date"}<input type="date" value={newLead.reminder_at} onChange={e=>setNewLead({...newLead,reminder_at:e.target.value})} className="mt-1 w-full rounded-2xl border border-black/10 px-4 py-3"/></label><textarea value={newLead.message} onChange={e=>setNewLead({...newLead,message:e.target.value})} placeholder={locale==="ru"?"Информация о компании":"Company information"} className="min-h-24 rounded-2xl border border-black/10 px-4 py-3 md:col-span-2"/></div><button className="mt-4 rounded-full bg-[#211a17] px-5 py-3 text-sm text-white">{locale==="ru"?"Сохранить запись":"Save record"}</button></form>}

      <div className="mt-7 flex flex-wrap gap-2">
        {filterKeys.map(k=><button key={k} onClick={()=>{setFilter(k);setSelectedId(null)}} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${filter===k?"border-[#211a17] bg-[#211a17] text-white":"border-black/10 bg-white"}`}>
          <span>{t.filters[k]}</span><span className={`min-w-6 rounded-full px-2 py-.5 text-xs ${filter===k?"bg-white/15":"bg-[#f0ebe5] text-black/55"}`}>{counts[k]}</span>
        </button>)}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_220px]">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.search} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/30"/>
        <select value={sort} onChange={e=>setSort(e.target.value as SortMode)} className="rounded-2xl border border-black/10 bg-white px-4 py-3">
          <option value="newest">{t.newest}</option><option value="oldest">{t.oldest}</option><option value="name">{t.name}</option>
        </select>
      </div>
      <p className="mt-3 text-xs text-black/40">{t.found}: {visibleLeads.length}</p>

      {notice&&<div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">{notice}</div>}
      {error&&<div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}

      <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="grid gap-4">
          {visibleLeads.map(x=><button type="button" key={x.id} onClick={()=>openLead(x)} className={`w-full rounded-[28px] border bg-white p-5 text-left transition hover:-translate-y-.5 hover:shadow-sm md:p-6 ${x.id===selectedId?"border-[#211a17]/35":"border-black/10"}`}>
            <div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-medium">{x.name}</h2><span className={`rounded-full px-3 py-1 text-xs ${statusStyles[x.status]}`}>{t.statuses[x.status]}</span></div><p className="mt-1 text-sm text-black/45">{new Date(x.created_at).toLocaleString(locale==="ru"?"ru-RU":"en-US")}</p></div><span className="text-xs uppercase text-black/40">{x.locale}</span></div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3"><div><small className="text-black/40">{t.contact.toUpperCase()}</small><p className="break-all">{x.contact}</p></div><div><small className="text-black/40">{t.company.toUpperCase()}</small><p>{x.company||"—"}</p></div><div><small className="text-black/40">{locale==="ru"?"ГОРОД":"CITY"}</small><p>{x.city||"—"}</p></div><div><small className="text-black/40">{t.type.toUpperCase()}</small><p>{x.project_type||"—"}</p></div></div>
            {x.message&&<div className="mt-5 rounded-2xl bg-[#faf8f6] p-4"><small className="text-black/40">{t.message.toUpperCase()}</small><p className="mt-2 whitespace-pre-wrap leading-6">{x.message}</p></div>}
            <div className="mt-5 text-sm font-medium">{t.open} →</div>
          </button>)}
          {!loading&&visibleLeads.length===0&&!error&&<div className="rounded-[28px] border border-black/10 bg-white p-8 text-black/50">{t.none}</div>}
        </div>

        
      </div>
      {selected&&<>
        <button type="button" aria-label={t.close} onClick={()=>setSelectedId(null)} className="fixed inset-0 z-30 bg-black/35 backdrop-blur-[2px]" />
        <aside className="fixed inset-y-0 right-0 z-40 w-full max-w-[460px] overflow-y-auto border-l border-black/10 bg-[#f5f1ec] p-4 shadow-2xl md:p-6">
          
          {selected?<div className="rounded-[28px] border border-black/10 bg-white p-5 shadow-sm md:p-6">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[.18em] text-black/35">{t.lead}</p><h2 className="mt-2 text-2xl font-medium">{selected.name}</h2></div><button onClick={()=>setSelectedId(null)} className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10" aria-label={t.close}>×</button></div>

            <div className="mt-6 space-y-5">
              <div><label className="text-xs uppercase tracking-[.14em] text-black/40">{t.status}</label><select value={draftStatus} onChange={e=>{setDraftStatus(e.target.value as LeadStatus);setSaved(false)}} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3.5">{(["new","contacted","in_progress","won","lost"] as LeadStatus[]).map(s=><option key={s} value={s}>{t.statuses[s]}</option>)}</select></div>
              <div><label className="text-xs uppercase tracking-[.14em] text-black/40">{locale==="ru"?"Напоминание":"Reminder"}</label><input type="date" value={draftReminder} onChange={e=>setDraftReminder(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3.5"/></div><div><label className="text-xs uppercase tracking-[.14em] text-black/40">{t.note}</label><textarea value={draftNotes} onChange={e=>{setDraftNotes(e.target.value);setSaved(false)}} rows={7} placeholder={t.notePh} className="mt-2 w-full resize-y rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3.5 leading-6"/></div>
              <button onClick={saveLead} disabled={saving} className="w-full rounded-full bg-[#211a17] px-5 py-3.5 text-sm font-medium text-white disabled:opacity-50">{saving?t.saving:t.save}</button>
              {saved&&<p className="text-center text-sm text-[#48614d]">{t.saved}</p>}{(crmMeta[selected.id]?.history||[]).length>0&&<div className="rounded-2xl bg-[#faf8f6] p-4"><div className="text-xs uppercase tracking-[.14em] text-black/40">{locale==="ru"?"История заметок":"Note history"}</div><div className="mt-3 space-y-3">{(crmMeta[selected.id]?.history||[]).slice().reverse().map((n,i)=><div key={i} className="border-l-2 border-[#c9a58f] pl-3"><p className="whitespace-pre-wrap text-sm">{n.text}</p><small className="text-black/40">{new Date(n.created_at).toLocaleString(locale==="ru"?"ru-RU":"en-US")}</small></div>)}</div></div>}

              <div className="border-t border-black/10 pt-5 text-sm space-y-4">
                <div><div className="text-xs text-black/35">{t.contact.toUpperCase()}</div><div className="mt-1 break-all">{selected.contact}</div><button onClick={()=>copyContact(selected.contact)} className="mt-2 text-xs underline underline-offset-4">{copied?t.copied:t.copy}</button></div><button onClick={()=>copyFollowup(selected)} className="w-full rounded-full border border-black/10 bg-white px-4 py-3 text-sm">{followupCopied?(locale==="ru"?"Сообщение скопировано":"Message copied"):(locale==="ru"?"Скопировать повторное сообщение":"Copy follow-up message")}</button>
                <div><div className="text-xs text-black/35">{t.company.toUpperCase()}</div><div className="mt-1">{selected.company||"—"}</div></div><div><div className="text-xs text-black/35">{locale==="ru"?"ГОРОД":"CITY"}</div><div className="mt-1">{selected.city||"—"}</div></div>
                <div><div className="text-xs text-black/35">{t.source.toUpperCase()}</div><div className="mt-1 break-all">{selected.source_path||"—"}</div></div>
              </div>

              <div className="border-t border-black/10 pt-5">
                <button onClick={deleteLead} disabled={deleting} className="w-full rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700 disabled:opacity-50">{deleting?t.deleting:t.delete}</button>
              </div>
            </div>
          </div>:<div className="rounded-[28px] border border-dashed border-black/15 bg-white/55 p-8 text-sm leading-6 text-black/45">{t.select}</div>}
        
        </aside>
      </>}
    </section>
  </div>
  </main>;
}
