"use client";

import {
  defaultInscription,
} from "@/lib/cake-builder/constants";

import {
  caveat,
  cormorant,
  lobster,
  marckScript,
  montserrat,
  playfair,
} from "@/lib/cake-builder/fonts";

import type {
  InscriptionFont,
  InscriptionSettings,
} from "@/lib/cake-builder/types";

import RangeControl from "./RangeControl";

type InscriptionControlsProps = {
  inscription: InscriptionSettings;

  onChange: (
    inscription: InscriptionSettings,
  ) => void;

  onSelect: () => void;
};

const fontOptions: {
  value: InscriptionFont;
  label: string;
  description: string;
  fontFamily: string;
  fontWeight?: number;
}[] = [
  {
    value: "marck",
    label: "Каллиграфия",
    description: "Нежный праздничный стиль",
    fontFamily:
      marckScript.style.fontFamily,
  },
  {
    value: "caveat",
    label: "Ручная надпись",
    description: "Лёгкий живой почерк",
    fontFamily: caveat.style.fontFamily,
    fontWeight: 600,
  },
  {
    value: "lobster",
    label: "Кондитерский",
    description: "Яркий декоративный стиль",
    fontFamily: lobster.style.fontFamily,
  },
  {
    value: "cormorant",
    label: "Элегантный",
    description: "Тонкий премиальный стиль",
    fontFamily:
      cormorant.style.fontFamily,
    fontWeight: 600,
  },
  {
    value: "playfair",
    label: "Классический",
    description: "Торжественный стиль",
    fontFamily:
      playfair.style.fontFamily,
    fontWeight: 600,
  },
  {
    value: "montserrat",
    label: "Современный",
    description: "Чистый минимализм",
    fontFamily:
      montserrat.style.fontFamily,
    fontWeight: 600,
  },
];

const colors = [
  "#4d2c23",
  "#000000",
  "#ffffff",
  "#8f1f2f",
  "#b8798d",
  "#34587a",
  "#47705c",
  "#c49a45",
];

const fontWeights = [
  {
    value: 400,
    label: "Тонкий",
  },
  {
    value: 500,
    label: "Средний",
  },
  {
    value: 600,
    label: "Плотный",
  },
  {
    value: 700,
    label: "Жирный",
  },
];

export default function InscriptionControls({
  inscription,
  onChange,
  onSelect,
}: InscriptionControlsProps) {
  function update(
    changes: Partial<InscriptionSettings>,
  ) {
    onSelect();

    onChange({
      ...inscription,
      ...changes,
    });
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">
          Надпись на торте
        </span>

        <input
          type="text"
          value={inscription.text}
          maxLength={40}
          placeholder="Например: С днём рождения!"
          onFocus={onSelect}
          onChange={(event) =>
            update({
              text: event.target.value,
            })
          }
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#6a4433]"
        />

        <small className="mt-2 block text-right text-black/40">
          {inscription.text.length}/40
        </small>
      </label>

      {inscription.text.trim() && (
        <div className="rounded-2xl border border-[#6a4433]/20 bg-[#f8f0eb] p-4">
          <span className="text-xs uppercase tracking-[0.15em] text-black/45">
            Настройка надписи
          </span>

          <div className="mt-4 space-y-6">
            <div>
              <strong className="mb-3 block text-sm">
                Стиль надписи
              </strong>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {fontOptions.map((option) => {
                  const active =
                    inscription.fontFamily ===
                    option.value;

                  return (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() =>
                        update({
                          fontFamily:
                            option.value,
                        })
                      }
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        active
                          ? "border-[#6a4433] bg-[#eadbd2] shadow-sm"
                          : "border-black/10 bg-white hover:border-[#6a4433]/35"
                      }`}
                    >
                      <span
                        className="block truncate text-2xl leading-tight"
                        style={{
                          fontFamily:
                            option.fontFamily,

                          fontWeight:
                            option.fontWeight,
                        }}
                      >
                        Милый праздник
                      </span>

                      <strong className="mt-3 block text-sm">
                        {option.label}
                      </strong>

                      <span className="mt-1 block text-xs leading-5 text-black/45">
                        {option.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <strong className="mb-3 block text-sm">
                Цвет надписи
              </strong>

              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    type="button"
                    key={color}
                    aria-label={`Цвет ${color}`}
                    onClick={() =>
                      update({ color })
                    }
                    className={`h-9 w-9 rounded-full border-2 transition ${
                      inscription.color === color
                        ? "scale-110 border-[#6a4433] shadow-sm"
                        : "border-black/15"
                    }`}
                    style={{
                      backgroundColor: color,
                    }}
                  />
                ))}

                <label className="flex h-9 items-center gap-2 rounded-full border border-black/10 bg-white px-3 text-xs">
                  Другой

                  <input
                    type="color"
                    value={inscription.color}
                    onChange={(event) =>
                      update({
                        color:
                          event.target.value,
                      })
                    }
                    className="h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
                  />
                </label>
              </div>
            </div>

            <div>
              <strong className="mb-3 block text-sm">
                Жирность
              </strong>

              <div className="grid grid-cols-2 gap-2">
                {fontWeights.map((weight) => {
                  const active =
                    (inscription.fontWeight ??
                      400) === weight.value;

                  return (
                    <button
                      type="button"
                      key={weight.value}
                      onClick={() =>
                        update({
                          fontWeight:
                            weight.value,
                        })
                      }
                      className={`rounded-xl border px-3 py-3 text-sm transition ${
                        active
                          ? "border-[#6a4433] bg-[#eadbd2]"
                          : "border-black/10 bg-white"
                      }`}
                      style={{
                        fontWeight:
                          weight.value,
                      }}
                    >
                      {weight.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                update({
                  uppercase:
                    !inscription.uppercase,
                })
              }
              className={`w-full rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                inscription.uppercase
                  ? "border-[#6a4433] bg-[#eadbd2]"
                  : "border-black/10 bg-white"
              }`}
            >
              АБВ — верхний регистр
            </button>

            <RangeControl
              label="Размер надписи"
              value={inscription.fontSize}
              min={20}
              max={120}
              suffix="px"
              onChange={(fontSize) =>
                update({ fontSize })
              }
            />

            <RangeControl
              label="Интервал между буквами"
              value={
                inscription.letterSpacing ?? 1
              }
              min={-3}
              max={20}
              suffix="px"
              onChange={(letterSpacing) =>
                update({ letterSpacing })
              }
            />

            <RangeControl
              label="Изгиб надписи"
              value={inscription.curve}
              min={-140}
              max={140}
              onChange={(curve) =>
                update({ curve })
              }
            />

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() =>
                  update({ curve: -110 })
                }
                className={`rounded-xl border px-2 py-3 text-sm transition ${
                  inscription.curve === -110
                    ? "border-[#6a4433] bg-[#eadbd2]"
                    : "border-black/10 bg-white"
                }`}
              >
                Дугой вниз
              </button>

              <button
                type="button"
                onClick={() =>
                  update({ curve: 0 })
                }
                className={`rounded-xl border px-2 py-3 text-sm transition ${
                  inscription.curve === 0
                    ? "border-[#6a4433] bg-[#eadbd2]"
                    : "border-black/10 bg-white"
                }`}
              >
                Прямо
              </button>

              <button
                type="button"
                onClick={() =>
                  update({ curve: 110 })
                }
                className={`rounded-xl border px-2 py-3 text-sm transition ${
                  inscription.curve === 110
                    ? "border-[#6a4433] bg-[#eadbd2]"
                    : "border-black/10 bg-white"
                }`}
              >
                Дугой вверх
              </button>
            </div>

            <RangeControl
              label="Поворот"
              value={inscription.rotation}
              min={-180}
              max={180}
              suffix="°"
              onChange={(rotation) =>
                update({ rotation })
              }
            />

            <RangeControl
              label="Прозрачность"
              value={inscription.opacity ?? 100}
              min={20}
              max={100}
              suffix="%"
              onChange={(opacity) =>
                update({ opacity })
              }
            />

            <div className="rounded-2xl border border-black/10 bg-white p-4">
              <strong className="block text-sm">
                Контур
              </strong>

              <div className="mt-4 space-y-4">
                <RangeControl
                  label="Толщина контура"
                  value={
                    inscription.outlineWidth ??
                    0
                  }
                  min={0}
                  max={8}
                  suffix="px"
                  onChange={(outlineWidth) =>
                    update({ outlineWidth })
                  }
                />

                <label className="flex items-center justify-between gap-4">
                  <span className="text-sm">
                    Цвет контура
                  </span>

                  <input
                    type="color"
                    value={
                      inscription.outlineColor ??
                      "#ffffff"
                    }
                    onChange={(event) =>
                      update({
                        outlineColor:
                          event.target.value,
                      })
                    }
                    className="h-10 w-14 cursor-pointer rounded-lg border border-black/10 bg-transparent p-1"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-4">
              <button
                type="button"
                onClick={() =>
                  update({
                    shadowEnabled:
                      !inscription.shadowEnabled,
                  })
                }
                className={`w-full rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  inscription.shadowEnabled
                    ? "border-[#6a4433] bg-[#eadbd2]"
                    : "border-black/10 bg-white"
                }`}
              >
                Тень надписи
              </button>

              {inscription.shadowEnabled && (
                <div className="mt-5 space-y-4">
                  <RangeControl
                    label="Размытие тени"
                    value={
                      inscription.shadowBlur ??
                      4
                    }
                    min={0}
                    max={20}
                    suffix="px"
                    onChange={(shadowBlur) =>
                      update({ shadowBlur })
                    }
                  />

                  <RangeControl
                    label="Смещение тени"
                    value={
                      inscription.shadowOffsetY ??
                      3
                    }
                    min={-10}
                    max={20}
                    suffix="px"
                    onChange={(shadowOffsetY) =>
                      update({
                        shadowOffsetY,
                      })
                    }
                  />

                  <label className="flex items-center justify-between gap-4">
                    <span className="text-sm">
                      Цвет тени
                    </span>

                    <input
                      type="color"
                      value={
                        inscription.shadowColor ??
                        "#000000"
                      }
                      onChange={(event) =>
                        update({
                          shadowColor:
                            event.target.value,
                        })
                      }
                      className="h-10 w-14 cursor-pointer rounded-lg border border-black/10 bg-transparent p-1"
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-black/10 bg-white px-4 py-3">
              <strong className="block text-sm">
                Положение
              </strong>

              <p className="mt-1 text-xs leading-5 text-black/45">
                Перетащите надпись мышкой или
                пальцем прямо по изображению
                торта.
              </p>

              <span className="mt-2 block text-xs text-black/45">
                X: {inscription.x} · Y:{" "}
                {inscription.y}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                onChange({
                  ...defaultInscription,
                  text: inscription.text,
                })
              }
              className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm"
            >
              Сбросить оформление
            </button>
          </div>
        </div>
      )}
    </div>
  );
}