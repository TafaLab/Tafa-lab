"use client";
import { useState } from "react";
export default function BusinessInteractiveExperience({
  locale,
}: {
  locale: "ru" | "en";
}) {
  const ru = locale === "ru";
  const [employees, setEmployees] = useState(12),
    [hours, setHours] = useState(400),
    [rate, setRate] = useState(15),
    [price, setPrice] = useState(80),
    [traffic, setTraffic] = useState(5000),
    [conversion, setConversion] = useState(4),
    [stack, setStack] = useState<string[]>(["CRM", "Analytics"]),
    [stage, setStage] = useState("Proposal");
  const current = Math.round(hours * rate * 4),
    saving = Math.round(current * 0.36),
    revenue = Math.round((price * traffic * conversion) / 100);
  const toggle = (x: string) =>
    setStack((v) => (v.includes(x) ? v.filter((i) => i !== x) : [...v, x]));
  const roiControls: Array<[string, number, (value: number) => void, number, number]> = [
    [ru ? "Сотрудники" : "Employees", employees, setEmployees, 1, 100],
    [ru ? "Часов в неделю" : "Hours / week", hours, setHours, 40, 1000],
    [ru ? "Стоимость часа" : "Hourly cost", rate, setRate, 5, 80],
  ];
  const simulatorControls: Array<[string, number, (value: number) => void, number, number]> = [
    ["Price", price, setPrice, 20, 200],
    ["Traffic", traffic, setTraffic, 1000, 10000],
    ["Conversion", conversion, setConversion, 1, 10],
  ];
  return (
    <section className="bg-[#07152d] px-5 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[.25em] text-[#73a7ff]">
          Business OS · Live demo
        </p>
        <h2 className="mt-5 max-w-5xl text-5xl md:text-7xl">
          {ru
            ? "Проверьте, что изменит автоматизация"
            : "See what automation could change"}
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-7 text-black">
            <h3 className="text-2xl">ROI Calculator</h3>
            {roiControls.map(([label, value, setter, min, max]) => (
              <label key={String(label)} className="mt-6 block">
                {label}: <strong>{value}</strong>
                <input
                  type="range"
                  min={Number(min)}
                  max={Number(max)}
                  value={Number(value)}
                  onChange={(e) =>
                    setter(Number(e.target.value))
                  }
                  className="mt-2 w-full"
                />
              </label>
            ))}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#edf1f8] p-4">
                <small>Current cost</small>
                <strong className="mt-2 block text-3xl">${current}</strong>
              </div>
              <div className="rounded-xl bg-[#dce9ff] p-4">
                <small>Potential saving</small>
                <strong className="mt-2 block text-3xl text-[#1d61d8]">
                  ${saving}/mo
                </strong>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-[#17366e] p-7">
            <h3 className="text-2xl">Business Simulator · What if?</h3>
            {simulatorControls.map(([label, value, setter, min, max]) => (
              <label key={String(label)} className="mt-6 block">
                {label}:{" "}
                <strong>
                  {value}
                  {label === "Conversion" ? "%" : ""}
                </strong>
                <input
                  type="range"
                  min={Number(min)}
                  max={Number(max)}
                  value={Number(value)}
                  onChange={(e) =>
                    setter(Number(e.target.value))
                  }
                  className="mt-2 w-full"
                />
              </label>
            ))}
            <p className="mt-8 text-xs uppercase tracking-[.2em] text-white/45">
              Projected revenue
            </p>
            <strong className="mt-3 block text-5xl">
              ${revenue.toLocaleString()}/mo
            </strong>
          </div>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-3xl bg-white p-7 text-black">
            <h3 className="text-2xl">
              {ru ? "Соберите свою платформу" : "Build your business stack"}
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {[
                "Website",
                "CRM",
                "Booking",
                "Payments",
                "Analytics",
                "Marketing",
                "AI",
                "Automation",
              ].map((x) => (
                <button
                  key={x}
                  onClick={() => toggle(x)}
                  className="rounded-xl border p-3 text-left"
                  style={{
                    background: stack.includes(x) ? "#dce9ff" : undefined,
                  }}
                >
                  + {x}
                </button>
              ))}
            </div>
            <div className="mt-7 flex justify-between border-t pt-5">
              <span>{stack.join(" + ")}</span>
              <strong className="text-3xl">${49 + stack.length * 35}/mo</strong>
            </div>
          </div>
          <div className="rounded-3xl bg-[#dce9ff] p-7 text-black">
            <p className="text-xs uppercase tracking-[.2em] opacity-45">
              Interactive CRM
            </p>
            <h3 className="mt-4 text-3xl">Nova Corp · $4,500</h3>
            <div className="mt-7 grid grid-cols-4 gap-2">
              {["Lead", "Contacted", "Proposal", "Won"].map((x) => (
                <button
                  key={x}
                  onClick={() => setStage(x)}
                  className="rounded-xl border p-3 text-xs"
                  style={{ background: stage === x ? "#73a7ff" : undefined }}
                >
                  {x}
                </button>
              ))}
            </div>
            <p className="mt-7">
              AI insight:{" "}
              {stage === "Won"
                ? "Revenue +$4,500"
                : "High intent · opened proposal · returned 3 times"}
            </p>
            <button className="mt-6 rounded-full bg-[#07152d] px-5 py-3 text-white">
              {ru ? "Спросить AI о бизнесе" : "Ask your business data"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
