"use client";

import { useLocale } from "next-intl";

import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";

import {
  BUILDER_CANVAS_SIZE,
  getDecorationAsset,
} from "@/lib/cake-builder/assets";

import type {
  CakeView,
  DecorationInstance,
  DecorationViewTransform,
} from "@/lib/cake-builder/types";

import { canvasPercent, clamp } from "@/lib/cake-builder/utils";

const SNAP_DISTANCE = 14;
const ROTATION_SNAP = 5;
const ROTATE_HANDLE_TOP_MARGIN = 85;

/*
 * Приблизительная форма верхней поверхности
 * круглого торта на холсте 1254 × 1254.
 */
const TOP_VIEW_CENTER = BUILDER_CANVAS_SIZE / 2;
const TOP_VIEW_RADIUS = 489;

const FRONT_CAKE_CENTER_X = 627;
const FRONT_CAKE_CENTER_Y = 455;
const FRONT_CAKE_RADIUS_X = 365;
const FRONT_CAKE_RADIUS_Y = 145;

const dripColors: Record<string, string> = {
  "drip-dark": "#3f241b",
  "drip-milk": "#8b5d46",
  "drip-white": "#f4eee4",
};

type InteractionMode = "move" | "rotate";

type InteractionState = {
  mode: InteractionMode;
  instanceId: string;
  pointerId: number;
  startX: number;
  startY: number;
  startRotation: number;
  startAngle: number;
  offsetX: number;
  offsetY: number;
};

type GuideState = {
  vertical: number | null;
  horizontal: number | null;
};

type DecorationLayerProps = {
  view?: CakeView;
  stageRef: RefObject<HTMLDivElement | null>;
  instances: DecorationInstance[];
  selectedInstanceId: string | null;

  onSelect: (instanceId: string) => void;
  onChange: (instances: DecorationInstance[]) => void;
  onInteractionStart: () => void;
  onInteractionEnd: () => void;

  onRemove: (instanceId: string) => void;
  onDuplicate: (instanceId: string) => void;
  onRotate: (instanceId: string) => void;
  onResetRotation: (instanceId: string) => void;
  onResetTransform: (instanceId: string) => void;

  onFlipHorizontal: (instanceId: string) => void;
  onFlipVertical: (instanceId: string) => void;

  onBringForward: (instanceId: string) => void;
  onSendBackward: (instanceId: string) => void;
  onBringToFront: (instanceId: string) => void;
  onSendToBack: (instanceId: string) => void;
};

function MobileToolbarButton({
  title,
  label,
  onClick,
  children,
  danger = false,
}: {
  title: string;
  label: string;
  onClick: () => void;
  children: ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      className={`flex h-[52px] w-[52px] min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl border px-1 text-center transition active:scale-[0.96] ${
        danger
          ? "border-red-100 bg-red-50 text-red-700 hover:bg-red-100"
          : "border-[#6a4433]/10 bg-[#f8f0eb] text-[#4b342a] hover:bg-[#efe3da]"
      }`}
    >
      <span
        aria-hidden="true"
        className="flex h-5 items-center justify-center text-base font-bold leading-none"
      >
        {children}
      </span>

      <span className="w-full truncate text-[7px] font-semibold leading-tight">
        {label}
      </span>
    </button>
  );
}

function normalizeRotation(rotation: number) {
  return ((rotation % 360) + 360) % 360;
}

function angleBetween(
  centerX: number,
  centerY: number,
  pointX: number,
  pointY: number,
) {
  return (Math.atan2(pointY - centerY, pointX - centerX) * 180) / Math.PI;
}

/**
 * Возвращает высоту верхней поверхности торта
 * в конкретной точке по X.
 *
 * В центре поверхность выше.
 * Ближе к бокам поверхность становится ниже.
 */
function getCakeSurfaceY(x: number) {
  const normalizedX = clamp(
    (x - FRONT_CAKE_CENTER_X) / FRONT_CAKE_RADIUS_X,
    -1,
    1,
  );

  const ellipseY =
    Math.sqrt(Math.max(0, 1 - normalizedX * normalizedX)) * FRONT_CAKE_RADIUS_Y;

  return FRONT_CAKE_CENTER_Y - ellipseY;
}

function isDripInstance(instance: DecorationInstance) {
  return getDecorationAsset(instance.assetId)?.category === "drips";
}

function constrainPointToCircle(x: number, y: number, radius: number) {
  const dx = x - TOP_VIEW_CENTER;
  const dy = y - TOP_VIEW_CENTER;
  const distance = Math.hypot(dx, dy);

  if (distance === 0 || distance <= radius) {
    return { x, y };
  }

  const scale = radius / distance;

  return {
    x: TOP_VIEW_CENTER + dx * scale,
    y: TOP_VIEW_CENTER + dy * scale,
  };
}

function topToFrontSurface(
  transform: DecorationViewTransform,
): DecorationViewTransform {
  const normalizedX = clamp(
    (transform.x - TOP_VIEW_CENTER) / TOP_VIEW_RADIUS,
    -1,
    1,
  );
  const normalizedDepth = clamp(
    (transform.y - TOP_VIEW_CENTER) / TOP_VIEW_RADIUS,
    -1,
    1,
  );

  return {
    x: FRONT_CAKE_CENTER_X + normalizedX * FRONT_CAKE_RADIUS_X,
    y: FRONT_CAKE_CENTER_Y + normalizedDepth * FRONT_CAKE_RADIUS_Y,
    rotation: transform.rotation,
    flipX: transform.flipX,
    flipY: transform.flipY,
  };
}

function frontToTop(
  transform: DecorationViewTransform,
  safeRadius: number,
): DecorationViewTransform {
  const projected = constrainPointToCircle(
    TOP_VIEW_CENTER +
      ((transform.x - FRONT_CAKE_CENTER_X) / FRONT_CAKE_RADIUS_X) *
        TOP_VIEW_RADIUS,
    TOP_VIEW_CENTER +
      ((transform.y - FRONT_CAKE_CENTER_Y) / FRONT_CAKE_RADIUS_Y) *
        TOP_VIEW_RADIUS,
    safeRadius,
  );

  return {
    ...projected,
    rotation: transform.rotation,
    flipX: transform.flipX,
    flipY: transform.flipY,
  };
}

export default function DecorationLayer({
  view = "front",
  stageRef,
  instances,
  selectedInstanceId,
  onSelect,
  onChange,
  onInteractionStart,
  onInteractionEnd,
  onRemove,
  onDuplicate,
  onBringForward,
  onSendBackward,
}: DecorationLayerProps) {
  const locale = useLocale();
  const isEnglish = locale === "en";

  const interactionRef = useRef<InteractionState | null>(null);

  const [guides, setGuides] = useState<GuideState>({
    vertical: null,
    horizontal: null,
  });

  function getTransform(instance: DecorationInstance): DecorationViewTransform {
    if (isDripInstance(instance)) {
      return view === "top"
        ? {
            x: TOP_VIEW_CENTER,
            y: TOP_VIEW_CENTER,
            rotation: 0,
            flipX: false,
            flipY: false,
          }
        : {
            x: FRONT_CAKE_CENTER_X,
            y: FRONT_CAKE_CENTER_Y,
            rotation: 0,
            flipX: false,
            flipY: false,
          };
    }

    const safeTopRadius = Math.max(40, TOP_VIEW_RADIUS - instance.width / 2);

    if (view === "front" || view === "side") {
      if (instance.frontView) {
        return instance.frontView;
      }

      if (instance.topView) {
        return topToFrontSurface(instance.topView);
      }

      return {
        x: instance.x,
        y: instance.y,
        rotation: instance.rotation,
        flipX: instance.flipX,
        flipY: instance.flipY,
      };
    }

    if (instance.topView) {
      return instance.topView;
    }

    return frontToTop(
      {
        x: instance.x,
        y: instance.y,
        rotation: instance.rotation,
        flipX: instance.flipX,
        flipY: instance.flipY,
      },
      safeTopRadius,
    );
  }

  function getCanvasPoint(clientX: number, clientY: number) {
    const stage = stageRef.current;

    if (!stage) {
      return null;
    }

    const rect = stage.getBoundingClientRect();

    if (rect.width <= 0 || rect.height <= 0) {
      return null;
    }

    return {
      x: ((clientX - rect.left) / rect.width) * BUILDER_CANVAS_SIZE,

      y: ((clientY - rect.top) / rect.height) * BUILDER_CANVAS_SIZE,
    };
  }

  function updateInstance(
    instanceId: string,
    changes: Partial<DecorationInstance>,
  ) {
    onChange(
      instances.map((instance) =>
        instance.instanceId === instanceId
          ? {
              ...instance,
              ...changes,
            }
          : instance,
      ),
    );
  }

  function updateViewTransform(
    instance: DecorationInstance,
    changes: Partial<DecorationViewTransform>,
  ) {
    if (view === "front" || view === "side") {
      const currentFront = getTransform(instance);
      const nextFront = {
        ...currentFront,
        ...changes,
      };
      updateInstance(instance.instanceId, {
        frontView: nextFront,
        x: nextFront.x,
        y: nextFront.y,
        rotation: nextFront.rotation,
        flipX: nextFront.flipX,
        flipY: nextFront.flipY,
      });
      return;
    }

    const nextTop = {
      ...getTransform(instance),
      ...changes,
    };
    const projectedFront = topToFrontSurface(nextTop);

    updateInstance(instance.instanceId, {
      topView: nextTop,
      frontView: projectedFront,
      x: projectedFront.x,
      y: projectedFront.y,
      rotation: nextTop.rotation,
      flipX: nextTop.flipX,
      flipY: nextTop.flipY,
    });
  }

  function constrainToTopCake(
    instance: DecorationInstance,
    rawX: number,
    rawY: number,
  ) {
    const radius = Math.max(40, TOP_VIEW_RADIUS - instance.width / 2);

    return constrainPointToCircle(rawX, rawY, radius);
  }

  function calculateInsertDepth(
    instance: DecorationInstance,
    nextX: number,
    nextY: number,
  ) {
    const asset = getDecorationAsset(instance.assetId);

    if (!asset || asset.placement !== "inserted" || !asset.stick) {
      return 0;
    }

    const headScale = clamp(asset.stick.headScale, 0.2, 1);

    const headWidth = instance.width * headScale;

    const headHeight = headWidth / Math.max(asset.stick.headAspectRatio, 0.1);

    const fullHeight = headHeight + asset.stick.length - asset.stick.overlap;

    const elementTop = nextY - fullHeight / 2;

    const stickStartY = elementTop + headHeight - asset.stick.overlap;

    const stickBottomY = stickStartY + asset.stick.length;

    const cakeSurfaceY = getCakeSurfaceY(nextX);

    const insertedPixels = clamp(
      stickBottomY - cakeSurfaceY,
      0,
      asset.stick.maxInsertionDepth,
    );

    if (asset.stick.maxInsertionDepth <= 0) {
      return 0;
    }

    return clamp(insertedPixels / asset.stick.maxInsertionDepth, 0, 1);
  }

  function startMove(
    event: ReactPointerEvent<HTMLButtonElement>,
    instance: DecorationInstance,
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (isDripInstance(instance)) {
      onSelect(instance.instanceId);
      return;
    }

    const point = getCanvasPoint(event.clientX, event.clientY);

    if (!point) {
      return;
    }

    onSelect(instance.instanceId);
    onInteractionStart();

    const transform = getTransform(instance);

    interactionRef.current = {
      mode: "move",
      instanceId: instance.instanceId,
      pointerId: event.pointerId,
      startX: transform.x,
      startY: transform.y,
      startRotation: transform.rotation,
      startAngle: 0,
      offsetX: point.x - transform.x,
      offsetY: point.y - transform.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function startRotate(
    event: ReactPointerEvent<HTMLButtonElement>,
    instance: DecorationInstance,
  ) {
    event.preventDefault();
    event.stopPropagation();

    const point = getCanvasPoint(event.clientX, event.clientY);

    if (!point) {
      return;
    }

    onSelect(instance.instanceId);
    onInteractionStart();

    const transform = getTransform(instance);

    interactionRef.current = {
      mode: "rotate",
      instanceId: instance.instanceId,
      pointerId: event.pointerId,
      startX: transform.x,
      startY: transform.y,
      startRotation: transform.rotation,
      startAngle: angleBetween(transform.x, transform.y, point.x, point.y),
      offsetX: 0,
      offsetY: 0,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function snapPosition(
    instance: DecorationInstance,
    rawX: number,
    rawY: number,
  ) {
    let x = rawX;
    let y = rawY;

    let vertical: number | null = null;
    let horizontal: number | null = null;

    const targetsX = [BUILDER_CANVAS_SIZE / 2];

    const targetsY = [BUILDER_CANVAS_SIZE / 2];

    for (const other of instances) {
      if (other.instanceId === instance.instanceId) {
        continue;
      }

      const otherTransform = getTransform(other);

      targetsX.push(otherTransform.x);
      targetsY.push(otherTransform.y);
    }

    for (const target of targetsX) {
      if (Math.abs(x - target) <= SNAP_DISTANCE) {
        x = target;
        vertical = target;
        break;
      }
    }

    for (const target of targetsY) {
      if (Math.abs(y - target) <= SNAP_DISTANCE) {
        y = target;
        horizontal = target;
        break;
      }
    }

    return {
      x,
      y,
      guides: {
        vertical,
        horizontal,
      },
    };
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    const interaction = interactionRef.current;

    if (!interaction || interaction.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const point = getCanvasPoint(event.clientX, event.clientY);

    if (!point) {
      return;
    }

    const instance = instances.find(
      (item) => item.instanceId === interaction.instanceId,
    );

    if (!instance) {
      return;
    }

    if (interaction.mode === "move") {
      const halfWidth = instance.width / 2;

      const verticalMargin = Math.min(instance.width / 3, 70);

      let rawX = clamp(
        point.x - interaction.offsetX,
        halfWidth,
        BUILDER_CANVAS_SIZE - halfWidth,
      );

      let rawY = clamp(
        point.y - interaction.offsetY,
        verticalMargin,
        BUILDER_CANVAS_SIZE - verticalMargin,
      );

      if (view === "top") {
        const constrained = constrainToTopCake(instance, rawX, rawY);

        rawX = constrained.x;
        rawY = constrained.y;
      }

      const snapped = snapPosition(instance, rawX, rawY);

      const insertDepth =
        view !== "top"
          ? calculateInsertDepth(instance, snapped.x, snapped.y)
          : instance.insertDepth;

      setGuides(snapped.guides);

      if (view === "front" || view === "side") {
        const nextFront: DecorationViewTransform = {
          ...getTransform(instance),
          x: Math.round(snapped.x),
          y: Math.round(snapped.y),
        };
        updateInstance(instance.instanceId, {
          frontView: nextFront,
          x: nextFront.x,
          y: nextFront.y,
          insertDepth,
        });
      } else {
        updateViewTransform(instance, {
          x: Math.round(snapped.x),
          y: Math.round(snapped.y),
        });
      }

      return;
    }

    const currentAngle = angleBetween(
      interaction.startX,
      interaction.startY,
      point.x,
      point.y,
    );

    const rawRotation =
      interaction.startRotation + (currentAngle - interaction.startAngle);

    const rotation = event.altKey
      ? rawRotation
      : Math.round(rawRotation / ROTATION_SNAP) * ROTATION_SNAP;

    updateViewTransform(instance, {
      rotation: normalizeRotation(rotation),
    });
  }

  function finishInteraction(event: ReactPointerEvent<HTMLElement>) {
    const interaction = interactionRef.current;

    if (!interaction || interaction.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    interactionRef.current = null;

    setGuides({
      vertical: null,
      horizontal: null,
    });

    onInteractionEnd();
  }

  function cancelInteraction() {
    if (!interactionRef.current) {
      return;
    }

    interactionRef.current = null;

    setGuides({
      vertical: null,
      horizontal: null,
    });

    onInteractionEnd();
  }

  const selectedInstance =
    instances.find((instance) => instance.instanceId === selectedInstanceId) ??
    null;

  function rotateSelected(instance: DecorationInstance) {
    const transform = getTransform(instance);

    updateViewTransform(instance, {
      rotation: normalizeRotation(transform.rotation + 15),
    });
  }

  function resetSelectedRotation(instance: DecorationInstance) {
    updateViewTransform(instance, {
      rotation: 0,
    });
  }

  function flipSelected(instance: DecorationInstance, axis: "x" | "y") {
    const transform = getTransform(instance);

    updateViewTransform(instance, {
      ...(axis === "x"
        ? { flipX: !transform.flipX }
        : { flipY: !transform.flipY }),
    });
  }

  return (
    <>
      {guides.vertical !== null && (
        <span
          className="pointer-events-none absolute bottom-0 top-0 w-px bg-[#6a4433]/50"
          style={{
            left: canvasPercent(guides.vertical),
            zIndex: 1900,
          }}
        />
      )}

      {guides.horizontal !== null && (
        <span
          className="pointer-events-none absolute left-0 right-0 h-px bg-[#6a4433]/50"
          style={{
            top: canvasPercent(guides.horizontal),
            zIndex: 1900,
          }}
        />
      )}

      {instances.map((instance, index) => {
        const asset = getDecorationAsset(instance.assetId);

        if (!asset) {
          return null;
        }

        const selected = instance.instanceId === selectedInstanceId;

        const isDrip = asset.category === "drips";

        const transform = getTransform(instance);

        const hasInsertedAsset =
          asset.placement === "inserted" && Boolean(asset.stick);

        const inserted = view !== "top" && hasInsertedAsset;

        const showTopInserted = view === "top" && hasInsertedAsset;

        const displayWidth =
          isDrip && view === "top" ? TOP_VIEW_RADIUS * 2 : instance.width;

        const normalVisualHeight =
          displayWidth * (asset.originalHeight / asset.originalWidth);

        const stickConfig = asset.stick;

        const headScale = clamp(stickConfig?.headScale ?? 1, 0.2, 1);

        const headWidth = instance.width * headScale;

        const headHeight =
          headWidth / Math.max(stickConfig?.headAspectRatio ?? 1, 0.1);

        const fullStickLength = stickConfig?.length ?? 0;

        const stickOverlap = stickConfig?.overlap ?? 0;

        const fullCompositeHeight = headHeight + fullStickLength - stickOverlap;

        const topInsertedHeight = Math.max(headHeight * 0.18, 12);

        const visualHeight =
          isDrip && view === "top"
            ? displayWidth
            : inserted
              ? fullCompositeHeight
              : showTopInserted
                ? topInsertedHeight
                : normalVisualHeight;

        const elementTop = transform.y - visualHeight / 2;

        const rotateHandleBelow = elementTop < ROTATE_HANDLE_TOP_MARGIN;

        const insertDepth = clamp(instance.insertDepth ?? 0, 0, 1);

        const hiddenStickLength =
          inserted && stickConfig
            ? insertDepth * stickConfig.maxInsertionDepth
            : 0;

        const visibleStickLength = Math.max(
          0,
          fullStickLength - hiddenStickLength,
        );

        const headWidthPercent = inserted
          ? (headWidth / instance.width) * 100
          : 100;

        const headHeightPercent = inserted
          ? (headHeight / visualHeight) * 100
          : 100;

        const stickTopPercent = inserted
          ? ((headHeight - stickOverlap) / visualHeight) * 100
          : 0;

        const stickHeightPercent = inserted
          ? (visibleStickLength / visualHeight) * 100
          : 0;

        const stickWidthPercent =
          inserted && stickConfig
            ? (stickConfig.width / instance.width) * 100
            : 0;

        return (
          <div
            key={instance.instanceId}
            className={`decoration-instance decoration-category-${asset.category} absolute`}
            style={{
              left: canvasPercent(transform.x),
              top: canvasPercent(transform.y),
              width: canvasPercent(displayWidth),
              height: canvasPercent(visualHeight),
              zIndex: 20 + Math.round(transform.y) + index,
              transform: "translate(-50%, -50%)",
            }}
          >
            <button
              type="button"
              aria-label={`${isEnglish ? "Move" : "Переместить"}: ${asset.name}`}
              onDoubleClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                onDuplicate(instance.instanceId);
              }}
              onPointerDown={(event) => startMove(event, instance)}
              onPointerMove={handlePointerMove}
              onPointerUp={finishInteraction}
              onPointerCancel={finishInteraction}
              onLostPointerCapture={cancelInteraction}
              className={`relative block h-full w-full touch-none select-none overflow-visible border-0 bg-transparent p-0 ${
                selected ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{
                transform: `rotate(${transform.rotation}deg) scaleX(${transform.flipX ? -1 : 1}) scaleY(${transform.flipY ? -1 : 1}) scale(${isDrip && view === "top" ? "1" : "var(--mobile-decoration-scale, 1)"})`,
                transformOrigin: "center",
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              {isDrip && view === "top" ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 block rounded-full"
                  style={{
                    border: `clamp(5px, 1.6vw, 12px) solid ${dripColors[asset.id] ?? "#7a4d39"}`,
                    boxShadow:
                      asset.id === "drip-white"
                        ? "inset 0 0 0 1px rgba(80,55,42,0.14), 0 0 0 1px rgba(80,55,42,0.12)"
                        : "inset 0 0 8px rgba(255,255,255,0.22), 0 2px 5px rgba(55,32,22,0.18)",
                  }}
                />
              ) : inserted && stickConfig ? (
                <>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 overflow-hidden rounded-full"
                    style={{
                      top: `${stickTopPercent}%`,
                      width: `${stickWidthPercent}%`,
                      height: `${stickHeightPercent}%`,
                      minWidth: "3px",

                      background: stickConfig.color,

                      border: `1px solid ${stickConfig.borderColor}`,

                      boxShadow:
                        "inset -1px 0 2px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.08)",

                      transformOrigin: "top center",
                    }}
                  />

                  <img
                    src={stickConfig.headSrc}
                    alt=""
                    className="pointer-events-none absolute left-1/2 top-0 z-10 block -translate-x-1/2 select-none object-contain"
                    style={{
                      width: `${headWidthPercent}%`,
                      height: `${headHeightPercent}%`,
                    }}
                    draggable={false}
                  />
                </>
              ) : showTopInserted && stickConfig ? (
                <img
                  src={stickConfig.headSrc}
                  alt=""
                  className="pointer-events-none absolute inset-0 block h-full w-full select-none"
                  style={{ objectFit: "fill" }}
                  draggable={false}
                />
              ) : (
                <img
                  src={asset.src}
                  alt=""
                  className="pointer-events-none absolute inset-0 block h-full w-full select-none object-contain"
                  draggable={false}
                />
              )}

              {selected && (
                <span className="pointer-events-none absolute inset-[-6px] rounded-lg border-2 border-[#6a4433]/80 shadow-[0_0_0_1px_rgba(255,255,255,0.95)]" />
              )}
            </button>

            {selected && !isDrip && (
              <>
                <span
                  className="pointer-events-none absolute left-1/2 h-8 w-px -translate-x-1/2 bg-[#6a4433]/70"
                  style={{
                    top: rotateHandleBelow ? "calc(100% + 4px)" : "-42px",
                    zIndex: 30,
                  }}
                />

                <button
                  type="button"
                  title={isEnglish ? "Rotate decoration" : "Повернуть декор"}
                  aria-label={
                    isEnglish ? "Rotate decoration" : "Повернуть декор"
                  }
                  onPointerDown={(event) => startRotate(event, instance)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={finishInteraction}
                  onPointerCancel={finishInteraction}
                  onLostPointerCapture={cancelInteraction}
                  className="absolute left-1/2 flex h-8 w-8 -translate-x-1/2 touch-none items-center justify-center rounded-full border-2 border-[#6a4433] bg-white text-base font-bold text-[#6a4433] shadow-md"
                  style={{
                    top: rotateHandleBelow ? "calc(100% + 30px)" : "-54px",
                    zIndex: 31,
                  }}
                >
                  ↻
                </button>
              </>
            )}
          </div>
        );
      })}

      {selectedInstance && (
        <div
          role="toolbar"
          aria-label={isEnglish ? "Decoration controls" : "Управление декором"}
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          className="fixed right-2 top-1/2 z-[5000] flex -translate-y-1/2 flex-col gap-1 rounded-2xl border border-black/10 bg-white/95 p-1.5 shadow-xl backdrop-blur-md md:hidden"
        >
          <MobileToolbarButton
            title={isEnglish ? "Delete decoration" : "Удалить декор"}
            label={isEnglish ? "Delete" : "Удалить"}
            danger
            onClick={() => onRemove(selectedInstance.instanceId)}
          >
            ×
          </MobileToolbarButton>

          <MobileToolbarButton
            title={isEnglish ? "Duplicate decoration" : "Создать копию"}
            label={isEnglish ? "Copy" : "Копия"}
            onClick={() => onDuplicate(selectedInstance.instanceId)}
          >
            ⧉
          </MobileToolbarButton>

          <MobileToolbarButton
            title={
              isEnglish ? "Rotate by 15 degrees" : "Повернуть на 15 градусов"
            }
            label={isEnglish ? "Rotate" : "Повернуть"}
            onClick={() => rotateSelected(selectedInstance)}
          >
            ↻
          </MobileToolbarButton>

          <MobileToolbarButton
            title={isEnglish ? "Reset rotation" : "Сбросить поворот"}
            label={isEnglish ? "Rotation 0" : "Поворот 0"}
            onClick={() => resetSelectedRotation(selectedInstance)}
          >
            0°
          </MobileToolbarButton>

          <MobileToolbarButton
            title={isEnglish ? "Flip horizontally" : "Отразить по горизонтали"}
            label={isEnglish ? "Mirror" : "Зеркало"}
            onClick={() => flipSelected(selectedInstance, "x")}
          >
            ↔
          </MobileToolbarButton>

          <MobileToolbarButton
            title={isEnglish ? "Flip vertically" : "Отразить по вертикали"}
            label={isEnglish ? "Flip" : "Отразить"}
            onClick={() => flipSelected(selectedInstance, "y")}
          >
            ↕
          </MobileToolbarButton>

          <MobileToolbarButton
            title={
              isEnglish
                ? "Move one layer backward"
                : "Переместить на один слой назад"
            }
            label={isEnglish ? "Layer Back" : "Слой назад"}
            onClick={() => onSendBackward(selectedInstance.instanceId)}
          >
            ‹
          </MobileToolbarButton>

          <MobileToolbarButton
            title={
              isEnglish
                ? "Move one layer forward"
                : "Переместить на один слой вперёд"
            }
            label={isEnglish ? "Layer Forward" : "Слой вперёд"}
            onClick={() => onBringForward(selectedInstance.instanceId)}
          >
            ›
          </MobileToolbarButton>
        </div>
      )}
    </>
  );
}
