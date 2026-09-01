"use client";

import { useLocale } from "next-intl";

import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";

import type { CakeBaseAsset } from "@/lib/cake-builder/assets";

import type {
  CakeView,
  DecorationInstance,
  InscriptionSettings,
} from "@/lib/cake-builder/types";

import DecorationLayer from "./DecorationLayer";
import InscriptionLayer from "./InscriptionLayer";

type CakePreviewProps = {
  base: CakeBaseAsset;
  decorations: DecorationInstance[];
  selectedDecorationId: string | null;
  inscription: InscriptionSettings;
  inscriptionSelected: boolean;

  onDecorationsChange: (decorations: DecorationInstance[]) => void;

  onDecorationInteractionStart: () => void;
  onDecorationInteractionEnd: () => void;

  onDecorationSelect: (instanceId: string) => void;

  onDecorationRemove: (instanceId: string) => void;

  onDecorationDuplicate: (instanceId: string) => void;

  onDecorationRotate: (instanceId: string) => void;

  onDecorationResetRotation: (instanceId: string) => void;

  onDecorationResetTransform: (instanceId: string) => void;

  onDecorationFlipHorizontal: (instanceId: string) => void;

  onDecorationFlipVertical: (instanceId: string) => void;

  onDecorationBringForward: (instanceId: string) => void;

  onDecorationSendBackward: (instanceId: string) => void;

  onDecorationBringToFront: (instanceId: string) => void;

  onDecorationSendToBack: (instanceId: string) => void;

  onInscriptionChange: (inscription: InscriptionSettings) => void;

  onInscriptionSelect: () => void;
  onClearSelection: () => void;
};

const cakeTopColors: Record<string, string> = {
  white: "#f8f7f2",
  cream: "#f1e4ca",
  ivory: "#f3ead8",
  pink: "#eeb9c2",
  blue: "#b9d8e7",
  mint: "#bcdccf",
  lilac: "#d2c0df",
  lavender: "#c8b7db",
  peach: "#edc2a7",
  yellow: "#eadb91",
  pistachio: "#c8d3ad",
  chocolate: "#865c49",
  "red-velvet": "#8f3040",
  black: "#272421",
  gray: "#a9a6a1",
};

export default function CakePreview({
  base,
  decorations,
  selectedDecorationId,
  inscription,
  inscriptionSelected,
  onDecorationsChange,
  onDecorationInteractionStart,
  onDecorationInteractionEnd,
  onDecorationSelect,
  onDecorationRemove,
  onDecorationDuplicate,
  onDecorationRotate,
  onDecorationResetRotation,
  onDecorationResetTransform,
  onDecorationFlipHorizontal,
  onDecorationFlipVertical,
  onDecorationBringForward,
  onDecorationSendBackward,
  onDecorationBringToFront,
  onDecorationSendToBack,
  onInscriptionChange,
  onInscriptionSelect,
  onClearSelection,
}: CakePreviewProps) {
  const locale = useLocale();
  const isEnglish = locale === "en";

  const [view, setView] = useState<CakeView>("front");
  const [rotationY, setRotationY] = useState(-38);
  const rotationDragRef = useRef<{
    pointerId: number;
    startX: number;
    startRotation: number;
  } | null>(null);

  const stageRef = useRef<HTMLDivElement | null>(null);

  const clearSelectionFromBackground = (
    target: EventTarget,
    currentTarget: EventTarget,
  ) => {
    if (target === currentTarget) {
      onClearSelection();
    }
  };

  const changeView = (nextView: CakeView) => {
    if (nextView === view) {
      return;
    }

    onClearSelection();
    setView(nextView);
  };

  const topColor = cakeTopColors[base.id] ?? "#f3ead8";

  const clampRotation = (value: number) => Math.max(-78, Math.min(78, value));

  const startCakeRotation = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (view !== "side" || event.target !== event.currentTarget) return;
    rotationDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startRotation: rotationY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveCakeRotation = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = rotationDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setRotationY(
      clampRotation(drag.startRotation + (event.clientX - drag.startX) * 0.55),
    );
  };

  const finishCakeRotation = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (rotationDragRef.current?.pointerId === event.pointerId) {
      rotationDragRef.current = null;
    }
  };

  return (
    <div
      className="
        cake-builder-frame
        relative
        mx-auto
        w-full
        max-w-[680px]
        overflow-hidden
        rounded-3xl
        bg-[#f5f1ed]
        px-[3%]
        pb-[4%]
        pt-[3%]
        sm:px-[4%]
        sm:pb-[5%]
        sm:pt-[4%]
      "
      onPointerDown={(event) => {
        clearSelectionFromBackground(event.target, event.currentTarget);
      }}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
    >
      <div
        className="relative z-50 mx-auto mb-2 flex w-fit rounded-full border border-[#6a4433]/10 bg-white/90 p-1 shadow-sm backdrop-blur-sm sm:mb-3"
        role="group"
        aria-label={isEnglish ? "Cake view" : "Вид торта"}
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
      >
        {[
          {
            value: "front" as const,
            ru: "Спереди",
            en: "Front",
          },
          {
            value: "top" as const,
            ru: "Сверху",
            en: "Top",
          },
          {
            value: "side" as const,
            ru: "3D / сбоку",
            en: "3D / Side",
          },
        ].map((option) => {
          const active = view === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => {
                changeView(option.value);
              }}
              className={`min-h-10 rounded-full px-5 text-sm font-semibold transition sm:px-7 ${
                active
                  ? "bg-[#6a4433] text-white shadow-sm"
                  : "text-[#6a4433] hover:bg-[#6a4433]/5"
              }`}
            >
              {isEnglish ? option.en : option.ru}
            </button>
          );
        })}
      </div>

      {view === "side" && (
        <div className="relative z-50 mx-auto mb-3 w-[min(92%,520px)] rounded-2xl border border-[#6a4433]/10 bg-white/90 px-4 py-3 shadow-sm">
          <p className="mb-2 text-center text-xs font-medium text-[#6a4433]/70">
            {isEnglish
              ? "Drag the cake or use the slider"
              : "Потяните торт влево или вправо"}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setRotationY((value) => clampRotation(value - 15))}
              className="h-10 w-10 rounded-full bg-[#6a4433] text-white"
              aria-label={isEnglish ? "Rotate left" : "Повернуть влево"}
            >
              ↶
            </button>
            <input
              aria-label={isEnglish ? "Cake rotation" : "Поворот торта"}
              type="range"
              min="-78"
              max="78"
              value={rotationY}
              onChange={(event) => setRotationY(Number(event.target.value))}
              className="w-full"
            />
            <button
              type="button"
              onClick={() => setRotationY((value) => clampRotation(value + 15))}
              className="h-10 w-10 rounded-full bg-[#6a4433] text-white"
              aria-label={isEnglish ? "Rotate right" : "Повернуть вправо"}
            >
              ↷
            </button>
            <button
              type="button"
              onClick={() => setRotationY(0)}
              className="rounded-full border border-[#6a4433]/15 px-3 py-2 text-xs font-semibold text-[#6a4433]"
            >
              0°
            </button>
          </div>
        </div>
      )}

      <div className="relative mx-auto aspect-[1/1.28] w-[90%] sm:w-[89%] md:w-[88%]">
        <div
          ref={stageRef}
          className="
          cake-builder-stage
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2
          aspect-square
          w-full
          touch-none
          overflow-visible
        "
          onPointerDown={(event) => {
            startCakeRotation(event);
            clearSelectionFromBackground(event.target, event.currentTarget);
          }}
          onPointerMove={moveCakeRotation}
          onPointerUp={finishCakeRotation}
          onPointerCancel={finishCakeRotation}
          onContextMenu={(event) => {
            event.preventDefault();
          }}
        >
          {view !== "top" ? (
            <img
              src={base.src}
              alt={
                isEnglish
                  ? `Round cake: ${base.name}`
                  : `Круглый торт: ${base.name}`
              }
              className="
              pointer-events-none
              absolute
              inset-0
              z-0
              h-full
              w-full
              select-none
              object-contain
            "
              draggable={false}
              style={
                view === "side"
                  ? {
                      transform: `perspective(1100px) rotateY(${rotationY}deg)`,
                      transformOrigin: "center",
                      transition: rotationDragRef.current
                        ? "none"
                        : "transform 180ms ease",
                    }
                  : undefined
              }
            />
          ) : (
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[58.2%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 shadow-[0_18px_35px_rgba(67,45,34,0.18),inset_0_3px_9px_rgba(255,255,255,0.65),inset_0_-5px_12px_rgba(70,44,31,0.08)]"
              style={{
                background: `radial-gradient(circle at 38% 30%, color-mix(in srgb, ${topColor} 84%, white), ${topColor} 58%, color-mix(in srgb, ${topColor} 90%, #5a3828))`,
              }}
              aria-hidden="true"
            >
              <span className="absolute inset-[2.5%] rounded-full border border-white/25" />
            </div>
          )}

          <div
            className="
            pointer-events-none
            absolute
            inset-0
            z-20
            overflow-visible
            [&_.decoration-instance]:pointer-events-auto
          "
            style={
              view === "side"
                ? {
                    transform: `perspective(1100px) rotateY(${rotationY}deg)`,
                    transformOrigin: "center",
                    transition: rotationDragRef.current
                      ? "none"
                      : "transform 180ms ease",
                  }
                : undefined
            }
          >
            <DecorationLayer
              view={view}
              stageRef={stageRef as RefObject<HTMLDivElement | null>}
              instances={decorations}
              selectedInstanceId={selectedDecorationId}
              onSelect={onDecorationSelect}
              onChange={onDecorationsChange}
              onInteractionStart={onDecorationInteractionStart}
              onInteractionEnd={onDecorationInteractionEnd}
              onRemove={onDecorationRemove}
              onDuplicate={onDecorationDuplicate}
              onRotate={onDecorationRotate}
              onResetRotation={onDecorationResetRotation}
              onResetTransform={onDecorationResetTransform}
              onFlipHorizontal={onDecorationFlipHorizontal}
              onFlipVertical={onDecorationFlipVertical}
              onBringForward={onDecorationBringForward}
              onSendBackward={onDecorationSendBackward}
              onBringToFront={onDecorationBringToFront}
              onSendToBack={onDecorationSendToBack}
            />
          </div>

          {view !== "top" && (
            <div
              className="
              pointer-events-none
              absolute
              inset-0
              z-30
              overflow-visible
              [&_*]:pointer-events-auto
            "
              style={
                view === "side"
                  ? {
                      transform: `perspective(1100px) rotateY(${rotationY}deg)`,
                      transformOrigin: "center",
                      transition: rotationDragRef.current
                        ? "none"
                        : "transform 180ms ease",
                    }
                  : undefined
              }
            >
              <InscriptionLayer
                stageRef={stageRef as RefObject<HTMLDivElement | null>}
                inscription={inscription}
                selected={inscriptionSelected}
                onSelect={onInscriptionSelect}
                onChange={onInscriptionChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
