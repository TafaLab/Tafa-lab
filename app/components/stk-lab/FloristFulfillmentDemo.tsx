"use client";

import { useState } from "react";

type Locale = "ru" | "en";
type Method = "delivery" | "pickup";
type Window = "morning" | "afternoon" | "evening";

export default function FloristFulfillmentDemo({ locale }: { locale: Locale }) {
  const ru = locale === "ru";
  const [method, setMethod] = useState<Method>("delivery");
  const [window, setWindow] = useState<Window>("afternoon");
  const [note, setNote] = useState("");
  const windows: { id: Window; ru: string; en: string }[] = [
    { id: "morning", ru: "Утро", en: "Morning" },
    { id: "afternoon", ru: "День", en: "Afternoon" },
    { id: "evening", ru: "Вечер", en: "Evening" },
  ];
  return (
    <section aria-labelledby="florist-fulfillment-heading" className="mx-auto mt-16 max-w-6xl rounded-3xl border border-[#ddd3ca] bg-white p-6 text-[#211a17] md:p-10">
      <p className="text-xs uppercase tracking-[.2em] text-[#796c65]">{ru ? "Демонстрация сценария" : "Workflow demo"}</p>
      <h2 id="florist-fulfillment-heading" className="mt-3 text-3xl font-medium">{ru ? "Доставка или самовывоз" : "Delivery or pickup"}</h2>
      <p className="mt-3 max-w-2xl text-[#675c56]">{ru ? "Пример интерфейса оформления. Время, доступность и доставка не подтверждаются; данные никуда не отправляются." : "Checkout interface example. Times, availability and delivery are not confirmed; no data is submitted."}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <fieldset>
            <legend className="mb-3 font-medium">{ru ? "Способ получения" : "Fulfillment method"}</legend>
            <div className="flex flex-wrap gap-2">
              {(["delivery", "pickup"] as const).map((item) => <button key={item} type="button" aria-pressed={method === item} onClick={() => setMethod(item)} className={`rounded-full border px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 ${method === item ? "border-[#211a17] bg-[#211a17] text-white" : "border-[#ddd3ca]"}`}>{item === "delivery" ? (ru ? "Доставка" : "Delivery") : (ru ? "Самовывоз" : "Pickup")}</button>)}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-3 font-medium">{ru ? "Предпочтительное время" : "Preferred time"}</legend>
            <div className="flex flex-wrap gap-2">{windows.map((item) => <button key={item.id} type="button" aria-pressed={window === item.id} onClick={() => setWindow(item.id)} className={`rounded-full border px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 ${window === item.id ? "border-[#211a17] bg-[#211a17] text-white" : "border-[#ddd3ca]"}`}>{ru ? item.ru : item.en}</button>)}</div>
          </fieldset>
          <div>
            <label htmlFor="florist-demo-note" className="mb-2 block font-medium">{ru ? "Пожелание к заказу (не отправляется)" : "Order note (not submitted)"}</label>
            <textarea id="florist-demo-note" value={note} onChange={(event) => setNote(event.target.value.slice(0, 160))} maxLength={160} rows={3} className="w-full rounded-xl border border-[#ddd3ca] p-3 focus-visible:outline-2 focus-visible:outline-offset-2" placeholder={ru ? "Например, открытка с поздравлением" : "For example, a greeting card"} />
            <p className="mt-1 text-xs text-[#675c56]">{note.length}/160</p>
          </div>
        </div>
        <div className="rounded-2xl bg-[#f6f2ed] p-6">
          <h3 className="text-xl font-medium">{ru ? "Предпросмотр заявки" : "Request preview"}</h3>
          <div role="status" aria-live="polite" aria-atomic="true" className="mt-5 space-y-3">
            <p>{ru ? "Получение" : "Method"}: {method === "delivery" ? (ru ? "Доставка" : "Delivery") : (ru ? "Самовывоз" : "Pickup")}</p>
            <p>{ru ? "Время" : "Time"}: {ru ? windows.find((item) => item.id === window)!.ru : windows.find((item) => item.id === window)!.en}</p>
            {note && <p className="break-words whitespace-pre-wrap">{ru ? "Пожелание" : "Note"}: {note}</p>}
          </div>
          <p className="mt-6 text-sm text-[#675c56]">{ru ? "Только локальный предпросмотр. Заказ не создан, адрес и личные данные не собираются." : "Local preview only. No order is created, and no address or personal data is collected."}</p>
        </div>
      </div>
    </section>
  );
}
