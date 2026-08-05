"use client";

import { useLocale } from "next-intl";

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

type FontOption = {
  value: InscriptionFont;
  labelRu: string;
  labelEn: string;
  descriptionRu: string;
  descriptionEn: string;
  fontFamily: string;
  fontWeight?: number;
};

type FontWeightOption = {
  value: number;
  labelRu: string;
  labelEn: string;
};

const fontOptions: FontOption[] = [
  {
    value: "marck",
    labelRu: "Каллиграфия",
    labelEn: "Calligraphy",
    descriptionRu:
      "Нежный праздничный стиль",
    descriptionEn:
      "A delicate celebratory style",
    fontFamily:
      marckScript.style.fontFamily,
  },
  {
    value: "caveat",
    labelRu: "Ручная надпись",
    labelEn: "Handwritten",
    descriptionRu:
      "Лёгкий живой почерк",
    descriptionEn:
      "A light and natural handwriting style",
    fontFamily:
      caveat.style.fontFamily,
    fontWeight: 600,
  },
  {
    value: "lobster",
    labelRu: "Кондитерский",
    labelEn: "Decorative",
    descriptionRu:
      "Яркий декоративный стиль",
    descriptionEn:
      "A bold decorative style",
    fontFamily:
      lobster.style.fontFamily,
  },
  {
    value: "cormorant",
    labelRu: "Элегантный",
    labelEn: "Elegant",
    descriptionRu:
      "Тонкий премиальный стиль",
    descriptionEn:
      "A refined premium style",
    fontFamily:
      cormorant.style.fontFamily,
    fontWeight: 600,
  },
  {
    value: "playfair",
    labelRu: "Классический",
    labelEn: "Classic",
    descriptionRu:
      "Торжественный стиль",
    descriptionEn:
      "A formal classic style",
    fontFamily:
      playfair.style.fontFamily,
    fontWeight: 600,
  },
  {
    value: "montserrat",
    labelRu: "Современный",
    labelEn: "Modern",
    descriptionRu:
      "Чистый минимализм",
    descriptionEn:
      "Clean modern minimalism",
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

const fontWeights: FontWeightOption[] = [
  {
    value: 400,
    labelRu: "Тонкий",
    labelEn: "Regular",
  },
  {
    value: 500,
    labelRu: "Средний",
    labelEn: "Medium",
  },
  {
    value: 600,
    labelRu: "Плотный",
    labelEn: "Semi Bold",
  },
  {
    value: 700,
    labelRu: "Жирный",
    labelEn: "Bold",
  },
];

export default function InscriptionControls({
  inscription,
  onChange,
  onSelect,
}: InscriptionControlsProps) {
  const locale = useLocale();
  const isEnglish = locale === "en";

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
          {isEnglish
            ? "Inscription on the Cake"
            : "Надпись на торте"}
        </span>

        <input
          type="text"
          value={inscription.text}
          maxLength={40}
          placeholder={
            isEnglish
              ? "Example: Happy Birthday!"
              : "Например: С днём рождения!"
          }
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
            {isEnglish
              ? "Inscription Settings"
              : "Настройка надписи"}
          </span>

          <div className="mt-4 space-y-6">
            <div>
              <strong className="mb-3 block text-sm">
                {isEnglish
                  ? "Inscription Style"
                  : "Стиль надписи"}
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
                        {isEnglish
                          ? "Sweet Celebration"
                          : "Милый праздник"}
                      </span>

                      <strong className="mt-3 block text-sm">
                        {isEnglish
                          ? option.labelEn
                          : option.labelRu}
                      </strong>

                      <span className="mt-1 block text-xs leading-5 text-black/45">
                        {isEnglish
                          ? option.descriptionEn
                          : option.descriptionRu}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <strong className="mb-3 block text-sm">
                {isEnglish
                  ? "Inscription Color"
                  : "Цвет надписи"}
              </strong>

              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    type="button"
                    key={color}
                    aria-label={
                      isEnglish
                        ? `Color ${color}`
                        : `Цвет ${color}`
                    }
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
                  {isEnglish
                    ? "Custom"
                    : "Другой"}

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
                {isEnglish
                  ? "Font Weight"
                  : "Жирность"}
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
                      {isEnglish
                        ? weight.labelEn
                        : weight.labelRu}
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
              {isEnglish
                ? "ABC — Uppercase"
                : "АБВ — верхний регистр"}
            </button>

            <RangeControl
              label={
                isEnglish
                  ? "Inscription Size"
                  : "Размер надписи"
              }
              value={inscription.fontSize}
              min={20}
              max={120}
              suffix="px"
              onChange={(fontSize) =>
                update({ fontSize })
              }
            />

            <RangeControl
              label={
                isEnglish
                  ? "Letter Spacing"
                  : "Интервал между буквами"
              }
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
              label={
                isEnglish
                  ? "Inscription Curve"
                  : "Изгиб надписи"
              }
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
                {isEnglish
                  ? "Curve Down"
                  : "Дугой вниз"}
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
                {isEnglish
                  ? "Straight"
                  : "Прямо"}
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
                {isEnglish
                  ? "Curve Up"
                  : "Дугой вверх"}
              </button>
            </div>

            <RangeControl
              label={
                isEnglish
                  ? "Rotation"
                  : "Поворот"
              }
              value={inscription.rotation}
              min={-180}
              max={180}
              suffix="°"
              onChange={(rotation) =>
                update({ rotation })
              }
            />

            <RangeControl
              label={
                isEnglish
                  ? "Opacity"
                  : "Прозрачность"
              }
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
                {isEnglish
                  ? "Outline"
                  : "Контур"}
              </strong>

              <div className="mt-4 space-y-4">
                <RangeControl
                  label={
                    isEnglish
                      ? "Outline Width"
                      : "Толщина контура"
                  }
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
                    {isEnglish
                      ? "Outline Color"
                      : "Цвет контура"}
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
                {isEnglish
                  ? "Text Shadow"
                  : "Тень надписи"}
              </button>

              {inscription.shadowEnabled && (
                <div className="mt-5 space-y-4">
                  <RangeControl
                    label={
                      isEnglish
                        ? "Shadow Blur"
                        : "Размытие тени"
                    }
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
                    label={
                      isEnglish
                        ? "Shadow Offset"
                        : "Смещение тени"
                    }
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
                      {isEnglish
                        ? "Shadow Color"
                        : "Цвет тени"}
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
                {isEnglish
                  ? "Position"
                  : "Положение"}
              </strong>

              <p className="mt-1 text-xs leading-5 text-black/45">
                {isEnglish
                  ? "Drag the inscription directly on the cake image using a mouse or finger."
                  : "Перетащите надпись мышкой или пальцем прямо по изображению торта."}
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
              {isEnglish
                ? "Reset Styling"
                : "Сбросить оформление"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}