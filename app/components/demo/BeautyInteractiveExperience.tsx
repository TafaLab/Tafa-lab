"use client";
import { useState } from "react";
type Mode = "salon" | "color" | "skin" | "spa" | "barber";
export default function BeautyInteractiveExperience({
  locale,
  mode,
}: {
  locale: "ru" | "en";
  mode: Mode;
}) {
  if (mode === "spa") return <Spa locale={locale} />;
  if (mode === "skin") return <Skin locale={locale} />;
  if (mode === "barber") return <Barber locale={locale} />;
  return <Look locale={locale} colorOnly={mode === "color"} />;
}
function Wrap({
  title,
  kicker,
  children,
  dark = false,
}: {
  title: string;
  kicker: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      className={`px-5 py-24 md:px-8 md:py-32 ${dark ? "bg-[#141111] text-white" : "bg-[#f4eee9] text-[#251e20]"}`}
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[.25em] opacity-45">
          {kicker}
        </p>
        <h2 className="mt-5 max-w-4xl text-5xl tracking-[-.05em] md:text-7xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
function Look({
  locale,
  colorOnly,
}: {
  locale: "ru" | "en";
  colorOnly: boolean;
}) {
  const ru = locale === "ru";
  const [cut, setCut] = useState("Long layers"),
    [color, setColor] = useState("Copper"),
    vibe = ru ? "Корейский стиль" : "Korean",
    [time, setTime] = useState(20),
    [before, setBefore] = useState(45),
    [extras, setExtras] = useState<string[]>([]),
    [uploaded, setUploaded] = useState(false),
    [uploadedSrc, setUploadedSrc] = useState<string | null>(null);
  const toggle = (x: string) =>
    setExtras((v) => (v.includes(x) ? v.filter((i) => i !== x) : [...v, x]));
  return (
    <Wrap
      dark={colorOnly}
      kicker="AI Look Try-On · Beauty Quiz"
      title={
        colorOnly
          ? ru
            ? "Примерьте новый цвет до визита"
            : "Try a new colour before your visit"
          : ru
            ? "Соберите образ и запишитесь на него"
            : "Build your look, then book it"
      }
    >
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <div
          className={`rounded-3xl p-7 ${colorOnly ? "bg-white/10" : "bg-white"}`}
        >
          <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-current/15 p-5">
            <span>
              {uploaded
                ? ru
                  ? "✓ Селфи загружено"
                  : "✓ Selfie uploaded"
                : ru
                  ? "Загрузить селфи"
                  : "Upload a selfie"}
            </span>
            <span>＋</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploaded(true);
                const reader = new FileReader();
                reader.onload = () => setUploadedSrc(String(reader.result));
                reader.readAsDataURL(file);
              }}
            />
          </label>
          <p className="mt-7 text-sm opacity-50">{ru ? "Стрижка" : "Haircut"}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Bob", "Long layers", "Pixie", "Bangs", "Curls"].map((x) => (
              <button
                key={x}
                onClick={() => setCut(x)}
                className="rounded-full border border-current/20 px-4 py-2"
                style={{
                  background: cut === x ? "#efb8c8" : undefined,
                  color: cut === x ? "#251e20" : undefined,
                }}
              >
                {ru ? ({ Relax: "Расслабление", Detox: "Детокс", Exhausted: "Усталость", Glow: "Сияние" } as Record<string, string>)[x] : x}
              </button>
            ))}
          </div>
          <p className="mt-7 text-sm opacity-50">{ru ? "Цвет" : "Color"}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Blonde", "Brunette", "Copper", "Black", "Pink"].map((x) => (
              <button
                key={x}
                onClick={() => setColor(x)}
                className="rounded-full border border-current/20 px-4 py-2"
                style={{
                  background: color === x ? "#efb8c8" : undefined,
                  color: color === x ? "#251e20" : undefined,
                }}
              >
                {x}
              </button>
            ))}
          </div>
          <p className="mt-7">
            {ru ? "Сколько времени на укладку?" : "Time spent styling?"} ·{" "}
            {time} {ru ? "мин" : "min"}
          </p>
          <input
            type="range"
            min="5"
            max="60"
            step="5"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="mt-3 w-full"
          />
        </div>
        <div
          className={`rounded-3xl p-7 ${colorOnly ? "bg-[#e8ff5a] text-black" : "bg-[#30242a] text-white"}`}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[#d8b09f] via-[#8c4f36] to-[#2b1814]">
            <div
              className="absolute inset-y-0 left-0 bg-black/35"
              style={{ width: `${before}%` }}
            />
            <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs text-black">
              {ru ? "ДО" : "BEFORE"}
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
              {ru ? "ПОСЛЕ" : "AFTER"} · {color}
            </span>
            <input
              aria-label="Before after"
              type="range"
              min="5"
              max="95"
              value={before}
              onChange={(e) => setBefore(Number(e.target.value))}
              className="absolute bottom-5 left-[10%] w-[80%]"
            />
          </div>
          <p className="mt-7 text-xs uppercase tracking-[.2em] opacity-50">
            {ru ? "Ваш образ" : "Your match"}
          </p>
          <h3 className="mt-3 text-4xl">
            {vibe} · {color} {cut}
          </h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Soft Brows", "Natural Lashes", "Nude Nails", "Glow Makeup"].map(
              (x) => (
                <button
                  key={x}
                  onClick={() => toggle(x)}
                  className="rounded-full border border-current/20 px-3 py-2 text-sm"
                  style={{
                    background: extras.includes(x) ? "#efb8c8" : undefined,
                    color: extras.includes(x) ? "#251e20" : undefined,
                  }}
                >
                  + {ru ? ({ Aromatherapy: "Ароматерапия", "Hot stones": "Горячие камни", Champagne: "Шампанское", "Private room": "Приватная комната" } as Record<string, string>)[x] : x}
                </button>
              ),
            )}
          </div>
          <div className="mt-7 flex items-center justify-between border-t border-current/20 pt-5">
            <strong className="text-3xl">${65 + extras.length * 20}</strong>
            <a
              href="#contact"
              className="rounded-full bg-white px-5 py-3 text-black"
            >
              {ru ? "Записаться на образ" : "Book this look"}
            </a>
          </div>
        </div>
      </div>
    </Wrap>
  );
}
function Skin({ locale }: { locale: "ru" | "en" }) {
  const ru = locale === "ru";
  const [concern, setConcern] = useState("Dryness"),
    [duration, setDuration] = useState(60);
  const treatment =
    concern === "Acne"
      ? "Clarifying Facial"
      : concern === "Pigmentation"
        ? "Brightening Peel"
        : concern === "Sensitivity"
          ? "Calm Barrier Ritual"
          : "Hydra Facial";
  return (
    <Wrap
      kicker="Skin Diagnostic"
      title={
        ru
          ? "Узнайте, что сейчас нужно вашей коже"
          : "Discover what your skin needs"
      }
    >
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-7">
          <p className="text-xl">{ru ? "Главная задача" : "Main concern"}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Dryness",
              "Acne",
              "Pigmentation",
              "Dullness",
              "Fine lines",
              "Sensitivity",
            ].map((x) => (
              <button
                key={x}
                onClick={() => setConcern(x)}
                className="rounded-full border px-4 py-2"
                style={{ background: concern === x ? "#d6b889" : undefined }}
              >
                {x}
              </button>
            ))}
          </div>
          <p className="mt-8">
            {ru ? "Сколько у вас времени?" : "How much time do you have?"}
          </p>
          <div className="mt-3 flex gap-2">
            {[30, 60, 90].map((x) => (
              <button
                key={x}
                onClick={() => setDuration(x)}
                className="flex-1 rounded-xl border p-3"
                style={{ background: duration === x ? "#d6b889" : undefined }}
              >
                {x} {ru ? "мин" : "min"}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-[#40382f] p-7 text-white">
          <p className="text-xs uppercase tracking-[.2em] text-white/45">
            {ru ? "Ваша процедура" : "Your treatment"}
          </p>
          <h3 className="mt-4 text-4xl">{treatment}</h3>
          <p className="mt-3 text-white/55">
            {duration} min · Hydration · Glow · Personal protocol
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-black"
          >
            {ru ? "Записаться" : "Book treatment"}
          </a>
        </div>
      </div>
    </Wrap>
  );
}
function Spa({ locale }: { locale: "ru" | "en" }) {
  const ru = locale === "ru";
  const rituals = [
    { id: "stillness", ru: "Тишина", en: "Stillness", duration: 90, price: 85 },
    { id: "restore", ru: "Восстановление", en: "Restore", duration: 75, price: 95 },
    { id: "radiance", ru: "Сияние", en: "Radiance", duration: 80, price: 110 },
    { id: "balance", ru: "Баланс", en: "Balance", duration: 120, price: 145 },
    { id: "together", ru: "Для двоих", en: "Together", duration: 120, price: 260 },
    { id: "serena-day", ru: "День Serena", en: "Serena Day", duration: 300, price: 320 },
  ];
  const [ritual, setRitual] = useState("stillness");
  const [mood, setMood] = useState("Relax"),
    [duration, setDuration] = useState(90),
    [scent, setScent] = useState("Lavender"),
    [intensity, setIntensity] = useState(50),
    [extras, setExtras] = useState<string[]>(["Aromatherapy"]);
  const toggle = (x: string) =>
    setExtras((v) => (v.includes(x) ? v.filter((i) => i !== x) : [...v, x]));
  const moodNames: Record<string, string> = {
    Relax: ru ? "Расслабление" : "Relax",
    Detox: ru ? "Детокс" : "Detox",
    Exhausted: ru ? "Усталость" : "Exhausted",
    Glow: ru ? "Сияние" : "Glow",
  };
  const scentNames: Record<string, string> = {
    Eucalyptus: ru ? "Эвкалипт" : "Eucalyptus",
    Rose: ru ? "Роза" : "Rose",
    Citrus: ru ? "Цитрус" : "Citrus",
    Lavender: ru ? "Лаванда" : "Lavender",
    Sandalwood: ru ? "Сандал" : "Sandalwood",
  };
  const extraNames: Record<string, string> = {
    Aromatherapy: ru ? "Ароматерапия" : "Aromatherapy",
    "Hot stones": ru ? "Горячие камни" : "Hot stones",
    Champagne: ru ? "Шампанское" : "Champagne",
    "Private room": ru ? "Приватная комната" : "Private room",
  };
  const selectedRitual = rituals.find((item) => item.id === ritual) ?? rituals[0];
  const selectedRitualTitle = ru ? selectedRitual.ru : selectedRitual.en;
  const moodTitle = moodNames[mood];
  const scentTitle = scentNames[scent];
  const intensityTitle =
    intensity < 35
      ? ru
        ? "Мягкая"
        : "Gentle"
      : intensity > 70
        ? ru
          ? "Глубокая"
          : "Deep"
        : ru
          ? "Сбалансированная"
          : "Balanced";
  const journey = ru
    ? "Тёплая ванна → Ароматерапия → Массаж → Уход за лицом → Чайная церемония"
    : "Warm bath → Aromatherapy → Massage → Facial → Tea ceremony";
  const saveSelection = () => {
    try {
      sessionStorage.setItem(
        "stk-demo-selection",
        JSON.stringify({
          subject: ru
            ? `SPA-ритуал «${selectedRitualTitle}»: ${moodTitle} · ${scentTitle}, ${duration} мин`
            : `SPA ritual "${selectedRitualTitle}": ${moodTitle} · ${scentTitle}, ${duration} min`,
          message: ru
            ? `Выбранный ритуал: ${selectedRitualTitle}. ${journey}. Интенсивность: ${intensityTitle}. Дополнительно: ${extras.map((item) => extraNames[item]).join(", ") || "без дополнительных услуг"}.`
            : `Selected ritual: ${selectedRitualTitle}. ${journey}. Intensity: ${intensityTitle}. Extras: ${extras.map((item) => extraNames[item]).join(", ") || "none"}.`,
        }),
      );
      window.dispatchEvent(new Event("stk-demo-selection"));
    } catch {
      // Continue to the form if browser storage is unavailable.
    }
  };
  return (
    <Wrap
      kicker={ru ? "Соберите свой SPA-ритуал" : "Build Your SPA Journey"}
      title={ru ? "Соберите собственный ритуал" : "Build your own ritual"}
    >
      <div className="mt-12 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-3xl bg-white p-7">
          <p>{ru ? "Как вы себя чувствуете?" : "How do you feel today?"}</p>
          <p className="mt-7">{ru ? "Выберите готовый ритуал" : "Choose a signature ritual"}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {rituals.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setRitual(item.id);
                  setDuration(item.duration);
                }}
                className="rounded-xl border p-3 text-sm"
                style={{
                  background: ritual === item.id ? "#d8c2a2" : undefined,
                  color: "#30372e",
                }}
              >
                {ru ? item.ru : item.en}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {["Relax", "Detox", "Exhausted", "Glow"].map((x) => (
              <button
                key={x}
                onClick={() => setMood(x)}
                className="rounded-xl border p-3"
                style={{ background: mood === x ? "#d8c2a2" : undefined }}
              >
                {ru ? ({
                  Relax: "Расслабление",
                  Detox: "Детокс",
                  Exhausted: "Усталость",
                  Glow: "Сияние",
                } as Record<string, string>)[x] : x}
              </button>
            ))}
          </div>
          <p className="mt-7">{ru ? "Аромат" : "Scent"}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Eucalyptus", "Rose", "Citrus", "Lavender", "Sandalwood"].map(
              (x) => (
                <button
                  key={x}
                  onClick={() => setScent(x)}
                  className="rounded-full border px-3 py-2 text-sm"
                  style={{ background: scent === x ? "#d8c2a2" : undefined }}
                >
                  {ru ? ({ Eucalyptus: "Эвкалипт", Rose: "Роза", Citrus: "Цитрус", Lavender: "Лаванда", Sandalwood: "Сандал" } as Record<string, string>)[x] : x}
                </button>
              ),
            )}
          </div>
          <p className="mt-7">
            {ru ? "Интенсивность массажа" : "Massage intensity"} ·{" "}
            {intensity < 35 ? (ru ? "Мягкая" : "Gentle") : intensity > 70 ? (ru ? "Глубокая" : "Deep") : (ru ? "Сбалансированная" : "Balanced")}
          </p>
          <input
            type="range"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="mt-3 w-full"
          />
        </div>
        <div className="rounded-3xl bg-[#56634e] p-7 text-white">
          <div className="flex flex-wrap gap-2">
            {[60, 75, 80, 90, 120, 180, 300].map((x) => (
              <button
                key={x}
                onClick={() => setDuration(x)}
                className="rounded-full border border-white/20 px-4 py-2"
                style={{
                  background: duration === x ? "#d8c2a2" : undefined,
                  color: duration === x ? "#30372e" : undefined,
                }}
              >
                {x} {ru ? "мин" : "min"}
              </button>
            ))}
          </div>
          <h3 className="mt-8 font-serif text-4xl">
            {ru ? ({ Relax: "Расслабление", Detox: "Детокс", Exhausted: "Усталость", Glow: "Сияние" } as Record<string, string>)[mood] : mood} · {ru ? ({ Eucalyptus: "Эвкалипт", Rose: "Роза", Citrus: "Цитрус", Lavender: "Лаванда", Sandalwood: "Сандал" } as Record<string, string>)[scent] : scent} {ru ? "путешествие" : "Journey"}
          </h3>
          <p className="mt-4 text-white/55">
            {ru ? "Тёплая ванна → Ароматерапия → Массаж → Уход за лицом → Чайная церемония" : "Warm bath → Aromatherapy → Massage → Facial → Tea ceremony"}
          </p>
          <div className="mt-7 grid grid-cols-2 gap-2">
            {["Aromatherapy", "Hot stones", "Champagne", "Private room"].map(
              (x) => (
                <button
                  key={x}
                  onClick={() => toggle(x)}
                  className="rounded-xl border border-white/20 p-3"
                  style={{
                    background: extras.includes(x) ? "#d8c2a2" : undefined,
                    color: extras.includes(x) ? "#30372e" : undefined,
                  }}
                >
                  + {ru ? ({
                    Aromatherapy: "Ароматерапия",
                    "Hot stones": "Горячие камни",
                    Champagne: "Шампанское",
                    "Private room": "Приватная комната",
                  } as Record<string, string>)[x] : x}
                </button>
              ),
            )}
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-5">
            <strong className="text-3xl">
              ${((duration === selectedRitual.duration ? selectedRitual.price : ({ 60: 85, 75: 95, 80: 110, 90: 85, 120: 145, 180: 260, 300: 320 } as Record<number, number>)[duration] ?? selectedRitual.price) + extras.length * 12)}
            </strong>
            <a
              href="#contact"
              onClick={saveSelection}
              className="rounded-full bg-white px-5 py-3 text-black"
              style={{ color: "#000000" }}
            >
              {ru ? "Записаться" : "Book now"}
            </a>
          </div>
        </div>
      </div>
    </Wrap>
  );
}
function Barber({ locale }: { locale: "ru" | "en" }) {
  const ru = locale === "ru";
  const [index, setIndex] = useState(0);
  const masters = [
    ["Anton Reed", "Classic cuts · beard architecture", "96%"],
    ["Mika Stone", "Texture · longer shapes", "91%"],
    ["Leo Hart", "Skin fade · precision shave", "87%"],
  ];
  const m = masters[index % masters.length];
  return (
    <Wrap
      dark
      kicker="Find Your Specialist · Client Passport"
      title={
        ru
          ? "Найдите мастера, который запомнит ваш стиль"
          : "Meet the barber who remembers your style"
      }
    >
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-white/15 p-7 text-center">
          <p className="text-xs uppercase tracking-[.2em] text-white/35">
            Stylist match · {m[2]}
          </p>
          <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full bg-[#b78950] text-6xl">
            ✂
          </div>
          <h3 className="mt-7 text-4xl">{m[0]}</h3>
          <p className="mt-2 text-white/55">{m[1]}</p>
          <div className="mt-7 flex justify-center gap-3">
            <button
              onClick={() => setIndex((x) => x + 1)}
              className="rounded-full border border-white/20 px-5 py-3"
            >
              ← Pass
            </button>
            <a
              href="#book"
              className="rounded-full bg-[#b78950] px-5 py-3 text-black"
            >
              ♡ {ru ? "Выбрать" : "Choose"}
            </a>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-7 text-black">
          <p className="text-xs uppercase tracking-[.2em] opacity-40">
            Your Style Passport
          </p>
          <h3 className="mt-5 text-3xl">
            {ru ? "Ваш профиль" : "Your profile"}
          </h3>
          <dl className="mt-7 space-y-4">
            <div className="flex justify-between border-b pb-3">
              <dt>Hair</dt>
              <dd>Textured crop</dd>
            </div>
            <div className="flex justify-between border-b pb-3">
              <dt>Beard</dt>
              <dd>Short boxed</dd>
            </div>
            <div className="flex justify-between border-b pb-3">
              <dt>{ru ? "Последний визит" : "Last visit"}</dt>
              <dd>Aug 21</dd>
            </div>
            <div className="flex justify-between border-b pb-3">
              <dt>{ru ? "Следующий" : "Next recommended"}</dt>
              <dd>Sep 18</dd>
            </div>
          </dl>
          <p className="mt-8">
            {ru ? "Ваша серия визитов" : "Your loyalty journey"}
          </p>
          <div className="mt-4 flex gap-2">
            {[1, 2, 3, 4, 5].map((x) => (
              <span
                key={x}
                className="h-3 flex-1 rounded-full"
                style={{ background: x <= 4 ? "#b78950" : "#ddd" }}
              />
            ))}
          </div>
          <p className="mt-3 text-sm opacity-55">
            4 / 5 ·{" "}
            {ru
              ? "Ещё один визит — уход в подарок"
              : "One more visit — complimentary treatment"}
          </p>
        </div>
      </div>
    </Wrap>
  );
}
