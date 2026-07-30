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
    const width = Math.max(
      MIN_DECORATION_WIDTH,
      Math.min(MAX_DECORATION_WIDTH, instance.width + difference),
    );

    onChange({ width: Math.round(width) });
  };

  return (
    <div className="mt-5 rounded-2xl border border-[#6a4433]/25 bg-[#f8f0eb] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-[0.15em] text-black/45">
            Выбранный элемент
          </span>
          <strong className="mt-1 block">{asset.name}</strong>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="min-h-11 rounded-full bg-red-50 px-4 text-sm font-semibold text-red-700"
        >
          Удалить
        </button>
      </div>

      <div className="mt-5 space-y-5">
        <div className="rounded-xl border border-black/10 bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold">Размер декора</span>
            <strong className="text-sm text-[#6a4433]">{instance.width}px</strong>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => changeSize(-SIZE_STEP)}
              className="min-h-12 rounded-xl border border-black/10 bg-[#f8f0eb] text-base font-semibold"
            >
              − Уменьшить
            </button>
            <button
              type="button"
              onClick={() => changeSize(SIZE_STEP)}
              className="min-h-12 rounded-xl bg-[#6a4433] text-base font-semibold text-white"
            >
              + Увеличить
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onChange({ flipX: !instance.flipX })}
          className={`flex min-h-14 w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
            instance.flipX
              ? "border-[#6a4433] bg-[#eadbd2]"
              : "border-black/10 bg-white hover:border-[#6a4433]/40"
          }`}
        >
          <div>
            <strong className="block text-sm">Отразить зеркально</strong>
            <span className="mt-1 block text-xs text-black/45">
              Изменить направление элемента
            </span>
          </div>
          <span className="text-xl" aria-hidden="true">⇆</span>
        </button>

        <RangeControl
          label="Поворот"
          value={instance.rotation}
          min={-180}
          max={180}
          suffix="°"
          onChange={(rotation) => onChange({ rotation })}
        />

        <div className="rounded-xl border border-black/10 bg-white px-4 py-3">
          <strong className="block text-sm">Положение</strong>
          <p className="mt-1 text-xs leading-5 text-black/45">
            Перетащите элемент пальцем прямо по изображению торта.
          </p>
          <span className="mt-2 block text-xs text-black/45">
            X: {instance.x} · Y: {instance.y}
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange({
              x: asset.defaultX,
              y: asset.defaultY,
              width: asset.defaultWidth,
              rotation: asset.defaultRotation,
              flipX: false,
            })
          }
          className="min-h-12 w-full rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold"
        >
          Вернуть исходное положение и размер
        </button>
      </div>
    </div>
  );
}
