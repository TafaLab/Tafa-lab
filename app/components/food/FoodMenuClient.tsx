"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export type FoodMenuItem = {
  id: string;
  image: string;
  name: string;
  ingredients: string;
  price: number;
};

export type FoodMenuSection = {
  id: string;
  name: string;
  items: FoodMenuItem[];
};

type CartLine = FoodMenuItem & { quantity: number };

const STORAGE_KEY = "stk-bakery-food-cart";

export default function FoodMenuClient({ sections, locale }: { sections: FoodMenuSection[]; locale: "ru" | "en" }) {
  const en = locale === "en";
  const [selected, setSelected] = useState<FoodMenuItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("pickup");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) setCart(JSON.parse(saved) as CartLine[]);
      } catch {}
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function add(item: FoodMenuItem) {
    setCart((current) => {
      const found = current.find((line) => line.id === item.id);
      return found
        ? current.map((line) => line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { ...item, quantity: 1 }];
    });
    setSelected(null);
    setCartOpen(true);
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) => current
      .map((line) => line.id === id ? { ...line, quantity: line.quantity + delta } : line)
      .filter((line) => line.quantity > 0));
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || cart.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim()) {
      window.alert(en ? "Please enter your name and phone number." : "Введите имя и номер телефона.");
      return;
    }
    if (deliveryType === "delivery" && !address.trim()) {
      window.alert(en ? "Please enter the delivery address." : "Введите адрес доставки.");
      return;
    }

    setSaving(true);
    const foodOrder = {
      type: "food",
      items: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
      comment: comment.trim() || null,
    };
    const { error } = await supabase.from("orders").insert({
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      customer_email: null,
      customer_messenger: null,
      delivery_type: deliveryType,
      delivery_date: deliveryDate || null,
      delivery_time: deliveryTime.trim() || null,
      address: deliveryType === "delivery" ? address.trim() : null,
      weight: "FOOD_ORDER",
      filling: "",
      cake_color: "white",
      decorations: [],
      inscription: null,
      customer_comment: JSON.stringify(foodOrder),
      price: total,
    });
    setSaving(false);
    if (error) {
      window.alert(error.message);
      return;
    }
    setCart([]);
    setSuccess(true);
  }

  return <>
    <nav className="sticky top-0 z-30 overflow-x-auto border-b border-black/10 bg-[#faf8f6]/95 px-4 py-3 backdrop-blur-md">
      <div className="mx-auto flex w-max max-w-7xl gap-2">
        {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium transition hover:border-[#6a4433]/35">{section.name}</a>)}
      </div>
    </nav>

    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      {sections.map((section, index) => <section id={section.id} key={section.id} className={`scroll-mt-24 ${index ? "mt-20 md:mt-28" : ""}`}>
        <div className="flex items-end justify-between gap-5 border-b border-black/10 pb-5">
          <div><span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a67b65]">{String(index + 1).padStart(2, "0")}</span><h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em] md:text-5xl">{section.name}</h2></div>
          <span className="text-sm text-black/40">{section.items.length} {en ? "items" : "позиций"}</span>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {section.items.map((item) => <button type="button" key={item.id} onClick={() => setSelected(item)} className="group overflow-hidden rounded-3xl border border-black/10 bg-white text-left shadow-[0_12px_35px_rgba(61,43,34,0.05)] transition hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#eee7e1]"><Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /></div>
            <div className="p-5"><div className="flex items-start justify-between gap-4"><h3 className="text-lg font-semibold leading-6">{item.name}</h3><span className="shrink-0 rounded-full bg-[#f2e8e1] px-3 py-1.5 text-sm font-bold text-[#6a4433]">${item.price}</span></div><p className="mt-3 text-sm leading-6 text-black/55">{item.ingredients}</p><span className="mt-4 inline-flex text-sm font-semibold text-[#6a4433]">{en ? "View and add" : "Открыть и добавить"} →</span></div>
          </button>)}
        </div>
      </section>)}
    </div>

    <button type="button" onClick={() => setCartOpen(true)} className="fixed bottom-5 right-5 z-40 flex min-h-14 items-center gap-3 rounded-full bg-[#6a4433] px-5 py-3 font-semibold text-white shadow-xl" aria-label={en ? "Open cart" : "Открыть корзину"}>
      <span>🛒</span><span>{en ? "Cart" : "Корзина"}</span>{count > 0 && <span className="rounded-full bg-white px-2 py-0.5 text-xs text-[#6a4433]">{count}</span>}
    </button>

    {selected && <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-4 sm:items-center" onMouseDown={() => setSelected(null)}>
      <div className="w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="relative aspect-[16/10] bg-[#eee7e1]"><Image src={selected.image} alt={selected.name} fill className="object-cover" sizes="520px"/><button type="button" onClick={() => setSelected(null)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-[#342923] shadow">×</button></div>
        <div className="p-6"><div className="flex items-start justify-between gap-5"><h2 className="text-2xl font-semibold">{selected.name}</h2><strong className="text-xl text-[#6a4433]">${selected.price}</strong></div><p className="mt-4 leading-7 text-black/60">{selected.ingredients}</p><button type="button" onClick={() => add(selected)} className="mt-6 w-full rounded-full bg-[#6a4433] px-6 py-4 font-semibold text-white">{en ? "Add to cart" : "Добавить в корзину"}</button></div>
      </div>
    </div>}

    {cartOpen && <div className="fixed inset-0 z-50 flex justify-end bg-black/45" onMouseDown={() => setCartOpen(false)}>
      <aside className="h-full w-full max-w-lg overflow-y-auto bg-[#faf8f6] p-5 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-black/10 pb-5"><div><span className="text-xs uppercase tracking-[.18em] text-black/40">STK Bakery</span><h2 className="mt-1 text-3xl font-semibold">{en ? "Cart" : "Корзина"}</h2></div><button type="button" onClick={() => setCartOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-xl">×</button></div>
        {success ? (
          <div className="py-8">
            <div className="rounded-3xl bg-[#e8f3e9] p-7 text-center text-[#35503a]">
              <span className="text-4xl">✓</span>
              <strong className="mt-3 block text-2xl">{en ? "Order placed" : "Заказ оформлен"}</strong>
              <p className="mt-3 text-sm leading-6">{en ? "The order is now visible in the bakery admin panel." : "Заказ уже появился в админке пекарни."}</p>
              <a href={`/${locale}/admin/orders`} className="brown-link-white mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#35503a] px-5 py-3 font-semibold text-white">{en ? "Open admin orders" : "Открыть заказы в админке"}</a>
              <button type="button" onClick={() => { setSuccess(false); setCartOpen(false); }} className="mt-3 w-full rounded-full border border-[#35503a]/25 bg-white px-5 py-3 font-semibold text-[#35503a]">{en ? "Continue shopping" : "Продолжить покупки"}</button>
            </div>
          </div>
        ) : (<>
          <div className="space-y-4 py-5">{cart.length === 0 ? <p className="rounded-2xl border border-dashed border-black/15 p-6 text-black/50">{en ? "Your cart is empty." : "Корзина пока пустая."}</p> : cart.map((item) => <div key={item.id} className="flex min-h-28 gap-4 rounded-2xl bg-white p-4 shadow-sm"><div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl"><Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px"/></div><div className="min-w-0 flex-1"><h3 className="text-lg font-semibold leading-6">{item.name}</h3><p className="mt-1 text-sm text-[#6a4433]">${item.price}</p><div className="mt-3 flex items-center gap-3"><button type="button" onClick={() => changeQuantity(item.id, -1)} className="h-9 w-9 rounded-full border border-black/10">−</button><span>{item.quantity}</span><button type="button" onClick={() => changeQuantity(item.id, 1)} className="h-9 w-9 rounded-full border border-black/10">+</button></div></div></div>)}</div>
          <div className="border-t border-black/10 pt-5">
            <div className="mb-4 flex items-center justify-between text-lg"><span>{en ? "Total" : "Итого"}</span><strong>${total}</strong></div>
            {cart.length > 0 && <form onSubmit={submitOrder} className="space-y-3">
            <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} required placeholder={en ? "Your name" : "Ваше имя"} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#6a4433]" />
            <input value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} required placeholder={en ? "Phone number" : "Номер телефона"} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#6a4433]" />
            <select value={deliveryType} onChange={(event) => setDeliveryType(event.target.value as "pickup" | "delivery")} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#6a4433]"><option value="pickup">{en ? "Pickup" : "Самовывоз"}</option><option value="delivery">{en ? "Delivery" : "Доставка"}</option></select>
            <div className="grid grid-cols-2 gap-3"><label className="text-sm font-semibold">{en ? "Date" : "Дата"}<input type="date" value={deliveryDate} onChange={(event) => setDeliveryDate(event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-3 py-3 font-normal outline-none focus:border-[#6a4433]" /></label><label className="text-sm font-semibold">{en ? "Time" : "Время"}<input type="time" value={deliveryTime} onChange={(event) => setDeliveryTime(event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-3 py-3 font-normal outline-none focus:border-[#6a4433]" /></label></div>
            {deliveryType === "delivery" && <input value={address} onChange={(event) => setAddress(event.target.value)} required placeholder={en ? "Delivery address" : "Адрес доставки"} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#6a4433]" />}
            <label className="block text-sm font-semibold">{en ? "Allergies and special requests" : "Аллергии и особые пожелания"}<textarea value={comment} onChange={(event) => setComment(event.target.value)} rows={3} placeholder={en ? "For example: nut allergy, no onion, remove or replace an ingredient" : "Например: аллергия на орехи, без лука, убрать или заменить ингредиент"} className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 font-normal outline-none focus:border-[#6a4433]" /></label>
            <button disabled={saving} type="submit" className="w-full rounded-full bg-[#6a4433] px-6 py-4 font-semibold text-white disabled:opacity-60">{saving ? (en ? "Placing order…" : "Оформляем…") : (en ? "Place order" : "Оформить заказ")}</button>
            </form>}
          </div>
        </>)}
      </aside>
    </div>}
  </>;
}