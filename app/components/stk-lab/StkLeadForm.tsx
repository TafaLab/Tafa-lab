"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";

type Locale="ru"|"en";
const copy={
ru:{name:"Имя",contact:"Email / WhatsApp / Telegram",company:"Компания или проект",type:"Что нужно сделать?",choose:"Выберите вариант",options:["Сайт","Интернет-магазин","Система бронирования","Конфигуратор","Бизнес-платформа / CRM","Другое"],message:"Расскажите немного о задаче",placeholder:"Например: нужен сайт для сети из трёх филиалов, онлайн-запись, админ-панель…",submit:"Отправить заявку",sending:"Отправляем…",successTitle:"Заявка отправлена",success:"Спасибо. Заявка сохранена — мы свяжемся с вами по указанному контакту.",again:"Отправить ещё одну",error:"Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в WhatsApp.",required:"Заполните имя, контакт и выберите тип проекта."},
en:{name:"Name",contact:"Email / WhatsApp / Telegram",company:"Company or project",type:"What do you need?",choose:"Choose an option",options:["Website","Online store","Booking system","Configurator","Business platform / CRM","Other"],message:"Tell us a little about the project",placeholder:"For example: a website for three locations, online booking and an admin panel…",submit:"Send enquiry",sending:"Sending…",successTitle:"Enquiry sent",success:"Thank you. Your enquiry has been saved and we'll contact you using the details provided.",again:"Send another",error:"We couldn't send the enquiry. Please try again or contact us on WhatsApp.",required:"Please enter your name, contact details and project type."}
} as const;

export default function StkLeadForm({locale}:{locale:Locale}){
 const t=copy[locale],pathname=usePathname();
 const [state,setState]=useState<"idle"|"sending"|"success"|"error">("idle"),[error,setError]=useState("");
 async function submit(e:FormEvent<HTMLFormElement>){
   e.preventDefault();if(state==="sending")return;
   const form=e.currentTarget,fd=new FormData(form);
   const name=String(fd.get("name")||"").trim(),contact=String(fd.get("contact")||"").trim(),projectType=String(fd.get("projectType")||"").trim();
   if(!name||!contact||!projectType){setError(t.required);setState("error");return}
   setState("sending");setError("");
   try{
    const res=await fetch("/api/stk-lab/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,contact,company:String(fd.get("company")||"").trim(),projectType,message:String(fd.get("message")||"").trim(),locale,sourcePath:pathname||`/${locale}`,website:String(fd.get("website")||"")})});
    if(!res.ok)throw new Error();form.reset();setState("success");
   }catch{setError(t.error);setState("error")}
 }
 if(state==="success")return <div className="rounded-[28px] border border-white/15 bg-white/[.07] p-7 text-center md:p-9"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl" style={{color:"#211a17"}}>✓</div><h3 className="mt-5 text-2xl text-white">{t.successTitle}</h3><p className="mx-auto mt-3 max-w-xl leading-7 text-white/60">{t.success}</p><button type="button" onClick={()=>setState("idle")} className="mt-6 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white">{t.again}</button></div>;
 const input="mt-2 w-full rounded-2xl border border-white/15 bg-white/[.07] px-4 py-3.5 text-base text-white outline-none placeholder:text-white/30 focus:border-white/35";
 return <form onSubmit={submit} className="rounded-[28px] border border-white/15 bg-white/[.055] p-5 md:p-7">
  <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/>
  <div className="grid gap-5 md:grid-cols-2">
   <label className="text-sm text-white/70">{t.name}*<input name="name" maxLength={100} autoComplete="name" required className={input}/></label>
   <label className="text-sm text-white/70">{t.contact}*<input name="contact" maxLength={180} required className={input}/></label>
   <label className="text-sm text-white/70">{t.company}<input name="company" maxLength={160} className={input}/></label>
   <label className="text-sm text-white/70">{t.type}*<select name="projectType" required defaultValue="" className={input}><option value="" disabled style={{color:"#5f5a56",backgroundColor:"#ffffff"}}>{t.choose}</option>{t.options.map(x=><option key={x} value={x} style={{color:"#211a17",backgroundColor:"#ffffff"}}>{x}</option>)}</select></label>
  </div>
  <label className="mt-5 block text-sm text-white/70">{t.message}<textarea name="message" maxLength={3000} rows={5} placeholder={t.placeholder} className={`${input} resize-y`}/></label>
  {state==="error"&&<p className="mt-4 text-sm text-red-200" role="alert">{error}</p>}
  <button disabled={state==="sending"} type="submit" className="mt-6 inline-flex min-w-44 items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium disabled:opacity-60" style={{color:"#211a17"}}>{state==="sending"?t.sending:t.submit}</button>
 </form>
}
