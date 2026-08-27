"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

type LeadStatus = "new" | "contacted" | "in_progress" | "won" | "lost";
type LeadFilter = "all" | LeadStatus;
type SortMode = "newest" | "oldest" | "name";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  contact: string;
  company: string | null;
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
    admin:"Admin · Заявки", leads:"Заявки", total:"Всего", refresh:"Обновить", refreshing:"Обновляем…",
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

  useEffect(()=>{
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
    const r:Record<LeadFilter,number>={all:leads.length,new:0,contacted:0,in_progress:0,won:0,lost:0};
    leads.forEach(x=>r[x.status]++);
    return r;
  },[leads]);

  const visibleLeads=useMemo(()=>{
    const q=query.trim().toLowerCase();
    let rows=filter==="all"?[...leads]:leads.filter(x=>x.status===filter);
    if(q) rows=rows.filter(x=>[
      x.name,x.contact,x.company,x.project_type,x.message,x.admin_notes,x.source_path
    ].some(v=>(v??"").toLowerCase().includes(q)));
    rows.sort((a,b)=>{
      if(sort==="oldest") return +new Date(a.created_at)-+new Date(b.created_at);
      if(sort==="name") return a.name.localeCompare(b.name,locale);
      return +new Date(b.created_at)-+new Date(a.created_at);
    });
    return rows;
  },[leads,filter,query,sort,locale]);

  async function load(){
    setLoading(true);setError("");
    const {data,error}=await sb.from("stk_lab_leads").select("*").order("created_at",{ascending:false});
    if(error)setError(error.message);
    else{
      const rows=(data??[]) as Lead[];
      setLeads(rows);
      if(selectedId){
        const x=rows.find(r=>r.id===selectedId);
        if(x){setDraftStatus(x.status);setDraftNotes(x.admin_notes??"")}
        else setSelectedId(null);
      }
    }
    setLoading(false);
  }

  function openLead(x:Lead){
    setSelectedId(x.id);setDraftStatus(x.status);setDraftNotes(x.admin_notes??"");
    setSaved(false);setNotice("");setError("");setCopied(false);
  }

  async function saveLead(){
    if(!selectedId)return;
    setSaving(true);setSaved(false);setError("");
    const notes=draftNotes.trim()||null;
    const {error}=await sb.from("stk_lab_leads").update({status:draftStatus,admin_notes:notes}).eq("id",selectedId);
    if(error)setError(error.message);
    else{
      setLeads(p=>p.map(x=>x.id===selectedId?{...x,status:draftStatus,admin_notes:notes}:x));
      setSaved(true);window.setTimeout(()=>setSaved(false),2200);
    }
    setSaving(false);
  }

  async function deleteLead(){
    if(!selectedId||!window.confirm(t.deleteAsk))return;
    setDeleting(true);setError("");
    const {error}=await sb.from("stk_lab_leads").delete().eq("id",selectedId);
    if(error)setError(error.message);
    else{
      setLeads(p=>p.filter(x=>x.id!==selectedId));
      setSelectedId(null);setNotice(t.deleted);window.setTimeout(()=>setNotice(""),2500);
    }
    setDeleting(false);
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
      <b>STK Lab</b><h1 className="mt-8 text-3xl">Admin</h1><p className="mt-2 text-sm text-black/50">{t.login}</p>
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
        <div><b>STK Lab</b><div className="text-xs text-black/45">{t.admin}</div></div>
        <button onClick={()=>sb.auth.signOut()} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">{t.logout}</button>
      </div>
    </header>

    <section className="mx-auto max-w-7xl px-5 py-8 md:px-6 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-xs uppercase tracking-[.2em] text-black/40">STK Lab Leads</p><h1 className="mt-2 text-4xl">{t.leads}</h1><p className="mt-2 text-sm text-black/50">{t.total}: {leads.length}</p></div>
        <button onClick={load} disabled={loading} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">{loading?t.refreshing:t.refresh}</button>
      </div>

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
            <div className="mt-5 grid gap-4 sm:grid-cols-3"><div><small className="text-black/40">{t.contact.toUpperCase()}</small><p className="break-all">{x.contact}</p></div><div><small className="text-black/40">{t.company.toUpperCase()}</small><p>{x.company||"—"}</p></div><div><small className="text-black/40">{t.type.toUpperCase()}</small><p>{x.project_type||"—"}</p></div></div>
            {x.message&&<div className="mt-5 rounded-2xl bg-[#faf8f6] p-4"><small className="text-black/40">{t.message.toUpperCase()}</small><p className="mt-2 whitespace-pre-wrap leading-6">{x.message}</p></div>}
            <div className="mt-5 text-sm font-medium">{t.open} →</div>
          </button>)}
          {!loading&&visibleLeads.length===0&&!error&&<div className="rounded-[28px] border border-black/10 bg-white p-8 text-black/50">{t.none}</div>}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          {selected?<div className="rounded-[28px] border border-black/10 bg-white p-5 shadow-sm md:p-6">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[.18em] text-black/35">{t.lead}</p><h2 className="mt-2 text-2xl font-medium">{selected.name}</h2></div><button onClick={()=>setSelectedId(null)} className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10" aria-label={t.close}>×</button></div>

            <div className="mt-6 space-y-5">
              <div><label className="text-xs uppercase tracking-[.14em] text-black/40">{t.status}</label><select value={draftStatus} onChange={e=>{setDraftStatus(e.target.value as LeadStatus);setSaved(false)}} className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3.5">{(["new","contacted","in_progress","won","lost"] as LeadStatus[]).map(s=><option key={s} value={s}>{t.statuses[s]}</option>)}</select></div>
              <div><label className="text-xs uppercase tracking-[.14em] text-black/40">{t.note}</label><textarea value={draftNotes} onChange={e=>{setDraftNotes(e.target.value);setSaved(false)}} rows={7} placeholder={t.notePh} className="mt-2 w-full resize-y rounded-2xl border border-black/10 bg-[#faf8f6] px-4 py-3.5 leading-6"/></div>
              <button onClick={saveLead} disabled={saving} className="w-full rounded-full bg-[#211a17] px-5 py-3.5 text-sm font-medium text-white disabled:opacity-50">{saving?t.saving:t.save}</button>
              {saved&&<p className="text-center text-sm text-[#48614d]">{t.saved}</p>}

              <div className="border-t border-black/10 pt-5 text-sm space-y-4">
                <div><div className="text-xs text-black/35">{t.contact.toUpperCase()}</div><div className="mt-1 break-all">{selected.contact}</div><button onClick={()=>copyContact(selected.contact)} className="mt-2 text-xs underline underline-offset-4">{copied?t.copied:t.copy}</button></div>
                <div><div className="text-xs text-black/35">{t.company.toUpperCase()}</div><div className="mt-1">{selected.company||"—"}</div></div>
                <div><div className="text-xs text-black/35">{t.source.toUpperCase()}</div><div className="mt-1 break-all">{selected.source_path||"—"}</div></div>
              </div>

              <div className="border-t border-black/10 pt-5">
                <button onClick={deleteLead} disabled={deleting} className="w-full rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700 disabled:opacity-50">{deleting?t.deleting:t.delete}</button>
              </div>
            </div>
          </div>:<div className="rounded-[28px] border border-dashed border-black/15 bg-white/55 p-8 text-sm leading-6 text-black/45">{t.select}</div>}
        </aside>
      </div>
    </section>
  </main>;
}
