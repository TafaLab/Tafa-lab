"use client";

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

import type { DecorationInstance } from "@/lib/cake-builder/types";

import {
  canvasPercent,
  clamp,
} from "@/lib/cake-builder/utils";

const SNAP_DISTANCE = 14;
const ROTATION_SNAP = 5;

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

function IconButton({
  title,
  onClick,
  children,
  danger = false,
}: {
  title: string;
  onClick: () => void;
  children: ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
        danger
          ? "text-red-700 hover:bg-red-50"
          : "text-[#4b342a] hover:bg-[#f2e8e1]"
      }`}
    >
      {children}
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
  return (
    (Math.atan2(pointY - centerY, pointX - centerX) *
      180) /
    Math.PI
  );
}

export default function DecorationLayer({
  stageRef,
  instances,
  selectedInstanceId,
  onSelect,
  onChange,
  onInteractionStart,
  onInteractionEnd,
  onRemove,
  onDuplicate,
  onRotate,
  onResetRotation,
  onResetTransform,
  onFlipHorizontal,
  onFlipVertical,
  onBringForward,
  onSendBackward,
  onBringToFront,
  onSendToBack,
}: DecorationLayerProps) {
  const interactionRef =
    useRef<InteractionState | null>(null);

  const [guides, setGuides] =
    useState<GuideState>({
      vertical: null,
      horizontal: null,
    });

  function getCanvasPoint(
    clientX: number,
    clientY: number,
  ) {
    const stage = stageRef.current;

    if (!stage) {
      return null;
    }

    const rect = stage.getBoundingClientRect();

    if (rect.width <= 0 || rect.height <= 0) {
      return null;
    }

    return {
      x:
        ((clientX - rect.left) / rect.width) *
        BUILDER_CANVAS_SIZE,
      y:
        ((clientY - rect.top) / rect.height) *
        BUILDER_CANVAS_SIZE,
    };
  }

  function updateInstance(
    instanceId: string,
    changes: Partial<DecorationInstance>,
  ) {
    onChange(
      instances.map((instance) =>
        instance.instanceId === instanceId
          ? { ...instance, ...changes }
          : instance,
      ),
    );
  }

  function startMove(
    event: ReactPointerEvent<HTMLButtonElement>,
    instance: DecorationInstance,
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

    onSelect(instance.instanceId);
    onInteractionStart();

    interactionRef.current = {
      mode: "move",
      instanceId: instance.instanceId,
      pointerId: event.pointerId,
      startX: instance.x,
      startY: instance.y,
      startRotation: instance.rotation,
      startAngle: 0,
      offsetX: point.x - instance.x,
      offsetY: point.y - instance.y,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
  }

  function startRotate(
    event: ReactPointerEvent<HTMLButtonElement>,
    instance: DecorationInstance,
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

    onSelect(instance.instanceId);
    onInteractionStart();

    interactionRef.current = {
      mode: "rotate",
      instanceId: instance.instanceId,
      pointerId: event.pointerId,
      startX: instance.x,
      startY: instance.y,
      startRotation: instance.rotation,
      startAngle: angleBetween(
        instance.x,
        instance.y,
        point.x,
        point.y,
      ),
      offsetX: 0,
      offsetY: 0,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
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

      targetsX.push(other.x);
      targetsY.push(other.y);
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
      guides: { vertical, horizontal },
    };
  }

  function handlePointerMove(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    const interaction = interactionRef.current;

    if (
      !interaction ||
      interaction.pointerId !== event.pointerId
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

    const instance = instances.find(
      (item) =>
        item.instanceId === interaction.instanceId,
    );

    if (!instance) {
      return;
    }

    if (interaction.mode === "move") {
      const halfWidth = instance.width / 2;
      const verticalMargin = Math.min(
        instance.width / 3,
        70,
      );

      const rawX = clamp(
        point.x - interaction.offsetX,
        halfWidth,
        BUILDER_CANVAS_SIZE - halfWidth,
      );

      const rawY = clamp(
        point.y - interaction.offsetY,
        verticalMargin,
        BUILDER_CANVAS_SIZE - verticalMargin,
      );

      const snapped = snapPosition(
        instance,
        rawX,
        rawY,
      );

      setGuides(snapped.guides);

      updateInstance(instance.instanceId, {
        x: Math.round(snapped.x),
        y: Math.round(snapped.y),
      });

      return;
    }

    const currentAngle = angleBetween(
      interaction.startX,
      interaction.startY,
      point.x,
      point.y,
    );

    const rawRotation =
      interaction.startRotation +
      (currentAngle - interaction.startAngle);

    const rotation = event.altKey
      ? rawRotation
      : Math.round(rawRotation / ROTATION_SNAP) *
        ROTATION_SNAP;

    updateInstance(instance.instanceId, {
      rotation: normalizeRotation(rotation),
    });
  }

  function finishInteraction(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    const interaction = interactionRef.current;

    if (
      !interaction ||
      interaction.pointerId !== event.pointerId
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

    interactionRef.current = null;
    setGuides({ vertical: null, horizontal: null });
    onInteractionEnd();
  }

  function cancelInteraction() {
    if (!interactionRef.current) {
      return;
    }

    interactionRef.current = null;
    setGuides({ vertical: null, horizontal: null });
    onInteractionEnd();
  }

  const selectedInstance =
    instances.find(
      (instance) =>
        instance.instanceId === selectedInstanceId,
    ) ?? null;

  const toolbarX = selectedInstance
    ? clamp(
        selectedInstance.x,
        145,
        BUILDER_CANVAS_SIZE - 145,
      )
    : 0;

  const toolbarY = selectedInstance
    ? clamp(
        selectedInstance.y -
          Math.max(selectedInstance.width / 2, 55) -
          110,
        85,
        BUILDER_CANVAS_SIZE - 85,
      )
    : 0;

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
        const asset = getDecorationAsset(
          instance.assetId,
        );

        if (!asset) {
          return null;
        }

        const selected =
          instance.instanceId === selectedInstanceId;

        return (
          <div
            key={instance.instanceId}
            className="absolute"
            style={{
              left: canvasPercent(instance.x),
              top: canvasPercent(instance.y),
              width: canvasPercent(instance.width),
              zIndex: 20 + index,
              transform: "translate(-50%, -50%)",
            }}
          >
            <button
              type="button"
              aria-label={`Переместить: ${asset.name}`}
              onDoubleClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onDuplicate(instance.instanceId);
              }}
              onPointerDown={(event) =>
                startMove(event, instance)
              }
              onPointerMove={handlePointerMove}
              onPointerUp={finishInteraction}
              onPointerCancel={finishInteraction}
              onLostPointerCapture={cancelInteraction}
              className={`relative block w-full touch-none select-none border-0 bg-transparent p-0 ${
                selected
                  ? "cursor-grabbing"
                  : "cursor-grab"
              }`}
              style={{
                transform: `rotate(${instance.rotation}deg) scaleX(${instance.flipX ? -1 : 1}) scaleY(${instance.flipY ? -1 : 1})`,
                transformOrigin: "center",
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              <img
                src={asset.src}
                alt=""
                className="pointer-events-none block h-auto w-full select-none"
                draggable={false}
              />

              {selected && (
                <span className="pointer-events-none absolute inset-[-6px] rounded-lg border-2 border-[#6a4433]/80 shadow-[0_0_0_1px_rgba(255,255,255,0.95)]" />
              )}
            </button>

            {selected && (
              <>
                <span
                  className="pointer-events-none absolute left-1/2 top-[-38px] h-8 w-px -translate-x-1/2 bg-[#6a4433]/70"
                  style={{ zIndex: 30 }}
                />

                <button
                  type="button"
                  title="Повернуть декор"
                  aria-label="Повернуть декор"
                  onPointerDown={(event) =>
                    startRotate(event, instance)
                  }
                  onPointerMove={handlePointerMove}
                  onPointerUp={finishInteraction}
                  onPointerCancel={finishInteraction}
                  onLostPointerCapture={cancelInteraction}
                  className="absolute left-1/2 top-[-48px] flex h-6 w-6 -translate-x-1/2 touch-none items-center justify-center rounded-full border-2 border-[#6a4433] bg-white text-xs text-[#6a4433] shadow-md"
                  style={{ zIndex: 31 }}
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
          aria-label="Управление декором"
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          className="absolute grid grid-cols-6 gap-1 rounded-2xl border border-black/10 bg-white/95 p-2 shadow-xl backdrop-blur-sm"
          style={{
            left: canvasPercent(toolbarX),
            top: canvasPercent(toolbarY),
            zIndex: 2000 + instances.length,
            transform: "translate(-50%, -50%)",
          }}
        >
          <IconButton
            title="Удалить"
            danger
            onClick={() =>
              onRemove(selectedInstance.instanceId)
            }
          >
            <span className="text-sm">✕</span>
          </IconButton>

          <IconButton
            title="Дублировать"
            onClick={() =>
              onDuplicate(selectedInstance.instanceId)
            }
          >
            <span className="text-base">⧉</span>
          </IconButton>

          <IconButton
            title="Повернуть на 15°"
            onClick={() =>
              onRotate(selectedInstance.instanceId)
            }
          >
            <span className="text-lg">↻</span>
          </IconButton>

          <IconButton
            title="Сбросить поворот"
            onClick={() =>
              onResetRotation(selectedInstance.instanceId)
            }
          >
            <span className="text-xs font-bold">0°</span>
          </IconButton>

          <IconButton
            title="Вернуть исходное положение"
            onClick={() =>
              onResetTransform(selectedInstance.instanceId)
            }
          >
            <span className="text-base">⌂</span>
          </IconButton>

          <IconButton
            title="Отразить по горизонтали"
            onClick={() =>
              onFlipHorizontal(selectedInstance.instanceId)
            }
          >
            <span className="text-lg">↔</span>
          </IconButton>

          <IconButton
            title="Отразить по вертикали"
            onClick={() =>
              onFlipVertical(selectedInstance.instanceId)
            }
          >
            <span className="text-lg">↕</span>
          </IconButton>

          <IconButton
            title="На один слой назад"
            onClick={() =>
              onSendBackward(selectedInstance.instanceId)
            }
          >
            <span className="text-lg">‹</span>
          </IconButton>

          <IconButton
            title="На один слой вперёд"
            onClick={() =>
              onBringForward(selectedInstance.instanceId)
            }
          >
            <span className="text-lg">›</span>
          </IconButton>

          <IconButton
            title="На задний план"
            onClick={() =>
              onSendToBack(selectedInstance.instanceId)
            }
          >
            <span className="text-lg">⇊</span>
          </IconButton>

          <IconButton
            title="На передний план"
            onClick={() =>
              onBringToFront(selectedInstance.instanceId)
            }
          >
            <span className="text-lg">⇈</span>
          </IconButton>
        </div>
      )}
    </>
  );
}