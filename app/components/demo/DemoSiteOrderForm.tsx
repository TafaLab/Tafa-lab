"use client";

import { FormEvent, useRef, useState } from "react";

type DemoFormKind = "travel" | "academy" | "beauty" | "restaurant" | "business";

export default function DemoSiteOrderForm({ locale, siteName, kind }: { locale: "ru" | "en"; siteName: string; kind: DemoFormKind }) {
  const en = locale === "en";
  const startedAt = useRef(0);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    if (!name || !contact) return;
    const payload = {
      type: "demo_site_order",
      siteName,
      subject: String(data.get("subject") || "").trim() || null,
      message: String(data.get("message") || "").trim() || null,
      locale,
      startedAt: startedAt.current,
    };
    setSaving(true);
    setError("");
    const response = await fetch("/api/stk-lab/demo-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, contact, ...payload }),
    });
    setSaving(false);
    if (!response.ok) {
      setError(en ? "Could not send the request. Please try again." : "Не удалось отправить заявку. Попробуйте ещё раз.");
      return;
    }
    form.reset();
    setSuccess(true);
  }

  if (success) return <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center"><div className="text-4xl">✓</div><h3 className="mt-4 font-serif text-3xl">{en ? "Request received" : "Заявка отправлена"}</h3><p className="mt-3 text-white/60">{en ? "It is now visible in the public demo admin." : "Она уже появилась в общей открытой демо-админке."}</p><a href={`/${locale}/demo-admin`} className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[#17231b]">{en ? "Open demo admin →" : "Открыть демо-админку →"}</a></div>;

  const input = "w-full rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-white/40";
  const formCopy = {
    travel: {
      subject: en ? "Where would you like to travel?" : "Куда хотите отправиться?",
      message: en ? "Dates, travelers and wishes" : "Даты, количество путешественников и пожелания",
      submit: en ? "Send travel request" : "Отправить заявку на путешествие",
    },
    academy: {
      subject: en ? "Your travel goal or course" : "Ваша цель или интересующий курс",
      message: en ? "Your experience, questions and preferred learning format" : "Ваш опыт, вопросы и удобный формат обучения",
      submit: en ? "Send enrollment request" : "Отправить заявку на обучение",
    },
    beauty: {
      subject: en ? "Service and preferred date" : "Услуга и желаемая дата",
      message: en ? "Your wishes, specialist preference and important details" : "Ваши пожелания, выбор специалиста и важные детали",
      submit: en ? "Book an appointment" : "Записаться",
    },
    restaurant: {
      subject: en ? "Date, time and number of guests" : "Дата, время и количество гостей",
      message: en ? "Allergies, dietary restrictions and special wishes" : "Аллергии, ограничения в питании и особые пожелания",
      submit: en ? "Send reservation request" : "Отправить заявку на бронь",
    },
    business: {
      subject: en ? "Company, industry and number of branches" : "Компания, сфера и количество филиалов",
      message: en ? "Current tools, bottlenecks and modules you need" : "Текущие инструменты, проблемы и необходимые модули",
      submit: en ? "Send platform request" : "Отправить заявку на платформу",
    },
  }[kind];
  return <form onSubmit={submit} onFocusCapture={()=>{if(!startedAt.current)startedAt.current=Date.now()}} className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-white/15 bg-white/[.06] p-5 text-left md:p-8"><div className="grid gap-4 md:grid-cols-2"><input name="name" required placeholder={en ? "Your name" : "Ваше имя"} className={input}/><input name="contact" required placeholder={en ? "Email or phone" : "Email или телефон"} className={input}/></div><input name="subject" placeholder={formCopy.subject} className={`${input} mt-4`}/><textarea name="message" rows={4} placeholder={formCopy.message} className={`${input} mt-4 resize-y`}/>{error&&<p className="mt-4 text-sm text-red-200">{error}</p>}<button disabled={saving} className="mt-5 w-full rounded-full bg-[#d8b57b] px-7 py-4 font-semibold text-[#17231b] disabled:opacity-60">{saving ? (en ? "Sending…" : "Отправляем…") : formCopy.submit}</button></form>;
}
