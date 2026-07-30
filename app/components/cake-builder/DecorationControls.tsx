"use client";

import type { DecorationAsset } from "@/lib/cake-builder/assets";
import type { DecorationInstance } from "@/lib/cake-builder/types";

import RangeControl from "./RangeControl";

type DecorationControlsProps = {
  instance: DecorationInstance;
  asset: DecorationAsset;
  onChange: (
    changes: Partial<
      Pick<
        DecorationInstance,
        "x" | "y" | "width" | "rotation" | "flipX"
      >
    >,
  ) => void;
  onRemove: () => void;
};

const MIN_DECORATION_WIDTH = 70;
const MAX_DECORATION_WIDTH = 620;
const SIZE_STEP = 24;

export default function DecorationControls({
  instance,
  asset,
  onChange,
  onRemove,
}: DecorationControlsProps) {
  const changeSize = (difference: number) => {
    const nextWidth = Math.max(
      MIN_DECORATION_WIDTH,
      Math.min(
        MAX_DECORATION_WIDTH,
        instance.width + difference,
      ),
    );

    onChange({
      width: Math.round(nextWidth),
    });
  };

  const resetDecoration = () => {
    onChange({
      x: asset.defaultX,
      y: asset.defaultY,
      width: asset.defaultWidth,
      rotation: asset.defaultRotation,
      flipX: false,
    });
  };

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-[#6a4433]/20 bg-[#f8f0eb]">
      <div className="flex items-start justify-between gap-3 border-b border-[#6a4433]/10 p-4">
        <div className="min-w-0">
          <span className="block text-xs font-medium uppercase tracking-[0.14em] text-black/45">
            Выбранный элемент
          </span>

          <strong className="mt-1 block truncate text-base text-[#2f211b]">
            {asset.name}
          </strong>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="min-h-11 shrink-0 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-100 active:scale-[0.98]"
        >
          Удалить
        </button>
      </div>

      <div className="space-y-4 p-4">
        <div className="rounded-xl border border-black/10 bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-[#2f211b]">
              Размер декора
            </span>

            <strong className="text-sm text-[#6a4433]">
              {instance.width} px
            </strong>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => changeSize(-SIZE_STEP)}
              className="min-h-12 rounded-xl border border-black/10 bg-[#f8f0eb] px-3 text-sm font-semibold text-[#2f211b] transition hover:border-[#6a4433]/40 active:scale-[0.98]"
            >
              - Уменьшить
            </button>

            <button
              type="button"
              onClick={() => changeSize(SIZE_STEP)}
              className="min-h-12 rounded-xl bg-[#6a4433] px-3 text-sm font-semibold text-white transition hover:bg-[#583627] active:scale-[0.98]"
            >
              + Увеличить
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange({
              flipX: !instance.flipX,
            })
          }
          className={`flex min-h-14 w-full items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition active:scale-[0.99] ${
            instance.flipX
              ? "border-[#6a4433] bg-[#eadbd2]"
              : "border-black/10 bg-white hover:border-[#6a4433]/40"
          }`}
        >
          <div>
            <strong className="block text-sm text-[#2f211b]">
              Отразить зеркально
            </strong>

            <span className="mt-1 block text-xs leading-5 text-black/45">
              Изменить направление элемента
            </span>
          </div>

          <span className="shrink-0 rounded-lg bg-[#f8f0eb] px-3 py-2 text-xs font-bold text-[#6a4433]">
            Отразить
          </span>
        </button>

        <RangeControl
          label="Поворот"
          value={instance.rotation}
          min={-180}
          max={180}
          suffix=" град."
          onChange={(rotation) =>
            onChange({
              rotation,
            })
          }
        />

        <div className="rounded-xl border border-black/10 bg-white px-4 py-3">
          <strong className="block text-sm text-[#2f211b]">
            Положение
          </strong>

          <p className="mt-1 text-xs leading-5 text-black/45">
            Перетащите элемент пальцем прямо по изображению торта.
          </p>

          <span className="mt-2 block text-xs font-medium text-black/45">
            X: {instance.x} / Y: {instance.y}
          </span>
        </div>

        <button
          type="button"
          onClick={resetDecoration}
          className="min-h-12 w-full rounded-xl border border-[#6a4433]/20 bg-white px-4 py-3 text-sm font-semibold text-[#6a4433] transition hover:bg-[#fffaf7] active:scale-[0.99]"
        >
          Вернуть исходное положение и размер
        </button>
      </div>
    </div>
  );
}