"use client";
import { useState } from "react";
export default function TravelInteractiveExperience({
  locale,
  mode,
}: {
  locale: "ru" | "en";
  mode: "luxury" | "adventure" | "smart";
}) {
  const ru = locale === "ru";
  const [style, setStyle] = useState(
      mode === "adventure" ? "Adventure" : "Luxury",
    ),
    [days, setDays] = useState(8),
    [budget, setBudget] = useState(2800),
    [pace, setPace] = useState(45),
    stops = ["Ubud", "Nusa Penida", "Uluwatu"],
    [pack, setPack] = useState<string[]>([]);
  const destination =
    style === "Adventure"
      ? "Patagonia"
      : style === "Wellness"
        ? "Bali"
        : style === "Culture"
          ? "Japan"
          : "Amalfi";
  const toggle = (x: string) =>
    setPack((v) => (v.includes(x) ? v.filter((i) => i !== x) : [...v, x]));
  return (
    <section className="bg-[#092a32] px-5 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[.25em] text-[#76d5dc]">
          AI Journey Builder · Route · Budget
        </p>
        <h2 className="mt-5 max-w-5xl text-5xl md:text-7xl">
          {ru
            ? "Соберите путешествие, которое подходит именно вам"
            : "Build a journey designed around you"}
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-3xl bg-white p-7 text-black">
            <p>{ru ? "Формат отдыха" : "Travel style"}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Luxury", "Adventure", "Wellness", "Culture"].map((x) => (
                <button
                  key={x}
                  onClick={() => setStyle(x)}
                  className="rounded-full border px-4 py-2"
                  style={{ background: style === x ? "#76d5dc" : undefined }}
                >
                  {x}
                </button>
              ))}
            </div>
            <p className="mt-7">
              {ru ? "Дней" : "Days"} · {days}
            </p>
            <input
              type="range"
              min="3"
              max="14"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="mt-2 w-full"
            />
            <p className="mt-7">
              {ru ? "Бюджет" : "Budget"} · ${budget}
            </p>
            <input
              type="range"
              min="1000"
              max="10000"
              step="100"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mt-2 w-full"
            />
            <p className="mt-7">
              {ru ? "Темп" : "Pace"} ·{" "}
              {pace < 40 ? "Relaxed" : pace > 70 ? "Active" : "Balanced"}
            </p>
            <input
              type="range"
              value={pace}
              onChange={(e) => setPace(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
          <div className="rounded-3xl bg-[#dff3ef] p-7 text-black">
            <p className="text-xs uppercase tracking-[.2em] opacity-45">
              {ru ? "Ваше путешествие" : "Your perfect journey"}
            </p>
            <h3 className="mt-4 text-4xl">
              {days} days in {destination}
            </h3>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {stops.map((x, i) => (
                <span key={x} className="rounded-full bg-white px-4 py-2">
                  {x}
                  {i < stops.length - 1 ? " →" : ""}
                </span>
              ))}
            </div>
            <p className="mt-7 leading-7 opacity-60">
              Private driver · boutique stays · local experience · 24/7 support
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                ["Flights", Math.round(budget * 0.3)],
                ["Hotels", Math.round(budget * 0.4)],
                ["Experiences", Math.round(budget * 0.3)],
              ].map(([x, n]) => (
                <div key={x} className="rounded-xl bg-white p-4">
                  <small className="opacity-45">{x}</small>
                  <strong className="mt-2 block text-xl">${n}</strong>
                </div>
              ))}
            </div>
            <button className="mt-7 rounded-full bg-[#092a32] px-5 py-3 text-white">
              {ru
                ? "Отправить маршрут эксперту"
                : "Send itinerary to an expert"}
            </button>
          </div>
        </div>
        <div className="mt-5 rounded-3xl bg-white p-7 text-black">
          <div className="grid gap-7 md:grid-cols-2">
            <div>
              <h3 className="text-2xl">
                {ru ? "Идеальный день" : "Your perfect day"}
              </h3>
              {["Sunrise hike", "Private spa", "Sunset cruise"].map((x, i) => (
                <div
                  key={x}
                  className="mt-3 flex justify-between rounded-xl bg-[#f2f5f1] p-4"
                >
                  <span>{["07:00", "14:00", "17:30"][i]}</span>
                  <strong>{x}</strong>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-2xl">
                {ru ? "Умный список вещей" : "Smart packing list"}
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  "Passport",
                  "Insurance",
                  "Rain jacket",
                  "Power adapter",
                  "Sunscreen",
                  "Dry bag",
                ].map((x) => (
                  <button
                    key={x}
                    onClick={() => toggle(x)}
                    className="rounded-xl border p-3 text-left"
                    style={{
                      background: pack.includes(x) ? "#76d5dc" : undefined,
                    }}
                  >
                    ✓ {x}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
