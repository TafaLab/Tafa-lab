"use client";

import { FormEvent, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function DemoSiteOrderForm({ locale, siteName }: { locale: "ru" | "en"; siteName: string }) {
  const en = locale === "en";
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
    };
    setSaving(true);
    setError("");
    const { error: saveError } = await supabase.from("orders").insert({
      customer_name: name,
      customer_phone: contact,
      customer_email: null,
      customer_messenger: null,
      delivery_type: "digital",
      delivery_date: null,
      delivery_time: null,
      address: null,
      weight: "DEMO_SITE_ORDER",
      filling: siteName,
      cake_color: "DEMO_SITE",
      decorations: [],
      inscription: null,
      customer_comment: JSON.stringify(payload),
      price: 0,
    });
    setSaving(false);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    form.reset();
    setSuccess(true);
  }

  if (success) return <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center"><div className="text-4xl">✓</div><h3 className="mt-4 font-serif text-3xl">{en ? "Request received" : "Заявка отправлена"}</h3><p className="mt-3 text-white/60">{en ? "It is now visible in the public demo admin." : "Она уже появилась в общей открытой демо-админке."}</p><a href={`/${locale}/demo-admin`} className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[#17231b]">{en ? "Open demo admin →" : "Открыть демо-админку →"}</a></div>;

  const input = "w-full rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-white/40";
  return <form onSubmit={submit} className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-white/15 bg-white/[.06] p-5 text-left md:p-8"><div className="grid gap-4 md:grid-cols-2"><input name="name" required placeholder={en ? "Your name" : "Ваше имя"} className={input}/><input name="contact" required placeholder={en ? "Email or phone" : "Email или телефон"} className={input}/></div><input name="subject" placeholder={en ? "Where would you like to travel?" : "Куда хотите отправиться?"} className={`${input} mt-4`}/><textarea name="message" rows={4} placeholder={en ? "Dates, travelers and wishes" : "Даты, количество путешественников и пожелания"} className={`${input} mt-4 resize-y`}/>{error&&<p className="mt-4 text-sm text-red-200">{error}</p>}<button disabled={saving} className="mt-5 w-full rounded-full bg-[#d8b57b] px-7 py-4 font-semibold text-[#17231b] disabled:opacity-60">{saving ? (en ? "Sending…" : "Отправляем…") : (en ? "Send travel request" : "Отправить заявку на путешествие")}</button></form>;
}
