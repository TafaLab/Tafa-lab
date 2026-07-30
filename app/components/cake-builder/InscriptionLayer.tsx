"use client";

import {
  useId,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";

import { BUILDER_CANVAS_SIZE } from "@/lib/cake-builder/assets";

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

import {
  canvasPercent,
  clamp,
} from "@/lib/cake-builder/utils";

type InscriptionDragState = {
  pointerId: number;
  offsetX: number;
  offsetY: number;
};

type InscriptionLayerProps = {
  stageRef: RefObject<HTMLDivElement | null>;
  inscription: InscriptionSettings;
  selected: boolean;
  onSelect: () => void;

  onChange: (
    inscription: InscriptionSettings,
  ) => void;
};

const fontFamilies: Record<
  InscriptionFont,
  string
> = {
  marck: marckScript.style.fontFamily,
  caveat: caveat.style.fontFamily,
  lobster: lobster.style.fontFamily,
  cormorant: cormorant.style.fontFamily,
  playfair: playfair.style.fontFamily,
  montserrat: montserrat.style.fontFamily,
};

export default function InscriptionLayer({
  stageRef,
  inscription,
  selected,
  onSelect,
  onChange,
}: InscriptionLayerProps) {
  const dragStateRef =
    useRef<InscriptionDragState | null>(null);

  const rawPathId = useId();

  const pathId = rawPathId.replace(
    /[^a-zA-Z0-9_-]/g,
    "",
  );

  if (!inscription.text.trim()) {
    return null;
  }

  function getCanvasPoint(
    clientX: number,
    clientY: number,
  ) {
    const stage = stageRef.current;

    if (!stage) {
      return null;
    }

    const rect =
      stage.getBoundingClientRect();

    if (
      rect.width <= 0 ||
      rect.height <= 0
    ) {
      return null;
    }

    return {
      x:
        ((clientX - rect.left) /
          rect.width) *
        BUILDER_CANVAS_SIZE,

      y:
        ((clientY - rect.top) /
          rect.height) *
        BUILDER_CANVAS_SIZE,
    };
  }

  function startDragging(
    event: ReactPointerEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    const point = getCanvasPoint(
      event.clientX,
      event.clientY,
    );

    if (!point) {
      return;
    }

    onSelect();

    dragStateRef.current = {
      pointerId: event.pointerId,
      offsetX: point.x - inscription.x,
      offsetY: point.y - inscription.y,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
  }

  function moveInscription(
    event: ReactPointerEvent<HTMLButtonElement>,
  ) {
    const dragState =
      dragStateRef.current;

    if (
      !dragState ||
      dragState.pointerId !== event.pointerId
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const point = getCanvasPoint(
      event.clientX,
      event.clientY,
    );

    if (!point) {
      return;
    }

    onChange({
      ...inscription,

      x: Math.round(
        clamp(
          point.x - dragState.offsetX,
          80,
          BUILDER_CANVAS_SIZE - 80,
        ),
      ),

      y: Math.round(
        clamp(
          point.y - dragState.offsetY,
          60,
          BUILDER_CANVAS_SIZE - 60,
        ),
      ),
    });
  }

  function stopDragging(
    event: ReactPointerEvent<HTMLButtonElement>,
  ) {
    const dragState =
      dragStateRef.current;

    if (
      !dragState ||
      dragState.pointerId !== event.pointerId
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    }

    dragStateRef.current = null;
  }

  const fontFamily =
    fontFamilies[inscription.fontFamily];

  const curved =
    Math.abs(inscription.curve) >= 3;

  const baselineY = 170;

  /*
   * Усиленный изгиб.
   * Значения около 100 уже дают выраженную дугу.
   */
  const curveControlY =
    baselineY - inscription.curve * 2.25;

  const displayText = inscription.uppercase
    ? inscription.text.toLocaleUpperCase("ru-RU")
    : inscription.text;

  const opacity =
    clamp(inscription.opacity ?? 100, 20, 100) /
    100;

  const outlineWidth =
    inscription.outlineWidth ?? 0;

  const shadowEnabled =
    inscription.shadowEnabled ?? false;

  const shadowColor =
    inscription.shadowColor ?? "#000000";

  const shadowBlur =
    inscription.shadowBlur ?? 4;

  const shadowOffsetY =
    inscription.shadowOffsetY ?? 3;

  const svgShadowFilter = shadowEnabled
    ? `drop-shadow(0px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor})`
    : "none";

  const htmlTextShadow = shadowEnabled
    ? `0 ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`
    : "none";

  return (
    <button
      type="button"
      aria-label="Переместить надпись"
      onPointerDown={startDragging}
      onPointerMove={moveInscription}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onLostPointerCapture={() => {
        dragStateRef.current = null;
      }}
      className={`absolute z-40 block w-[78%] touch-none select-none border-0 bg-transparent p-0 ${
        selected
          ? "cursor-grabbing drop-shadow-[0_0_5px_rgba(106,68,51,0.6)]"
          : "cursor-grab"
      }`}
      style={{
        left: canvasPercent(inscription.x),
        top: canvasPercent(inscription.y),
        opacity,

        transform: `translate(-50%, -50%) rotate(${inscription.rotation}deg)`,

        transformOrigin: "center",
      }}
    >
      {curved ? (
        <svg
          viewBox="0 0 600 420"
          className="pointer-events-none block h-auto w-full overflow-visible"
          aria-hidden="true"
          style={{
            filter: svgShadowFilter,
          }}
        >
          <defs>
            <path
              id={pathId}
              d={`M 20 ${baselineY} Q 300 ${curveControlY} 580 ${baselineY}`}
              fill="none"
            />
          </defs>

          <text
            fill={inscription.color}
            stroke={
              outlineWidth > 0
                ? inscription.outlineColor
                : "none"
            }
            strokeWidth={outlineWidth}
            paintOrder="stroke fill"
            strokeLinejoin="round"
            strokeLinecap="round"
            fontFamily={fontFamily}
            fontSize={inscription.fontSize}
            fontWeight={inscription.fontWeight ?? 400}
            letterSpacing={inscription.letterSpacing ?? 1}
            textAnchor="middle"
          >
            <textPath
              href={`#${pathId}`}
              startOffset="50%"
            >
              {displayText}
            </textPath>
          </text>
        </svg>
      ) : (
        <span
          className="pointer-events-none block whitespace-nowrap text-center leading-none"
          style={{
            color: inscription.color,
            fontFamily,
            fontSize: `${inscription.fontSize}px`,
            fontWeight: inscription.fontWeight ?? 400,
            letterSpacing: `${inscription.letterSpacing ?? 1}px`,
            textShadow: htmlTextShadow,

            WebkitTextStroke:
              outlineWidth > 0
                ? `${outlineWidth}px ${inscription.outlineColor}`
                : undefined,

            paintOrder: "stroke fill",
          }}
        >
          {displayText}
        </span>
      )}
    </button>
  );
}