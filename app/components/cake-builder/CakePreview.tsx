"use client";

import {
  useRef,
  type RefObject,
} from "react";

import type { CakeBaseAsset } from "@/lib/cake-builder/assets";

import type {
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

  onDecorationsChange: (
    decorations: DecorationInstance[],
  ) => void;

  onDecorationInteractionStart: () => void;
  onDecorationInteractionEnd: () => void;

  onDecorationSelect: (
    instanceId: string,
  ) => void;

  onDecorationRemove: (
    instanceId: string,
  ) => void;

  onDecorationDuplicate: (
    instanceId: string,
  ) => void;

  onDecorationRotate: (
    instanceId: string,
  ) => void;

  onDecorationResetRotation: (
    instanceId: string,
  ) => void;

  onDecorationResetTransform: (
    instanceId: string,
  ) => void;

  onDecorationFlipHorizontal: (
    instanceId: string,
  ) => void;

  onDecorationFlipVertical: (
    instanceId: string,
  ) => void;

  onDecorationBringForward: (
    instanceId: string,
  ) => void;

  onDecorationSendBackward: (
    instanceId: string,
  ) => void;

  onDecorationBringToFront: (
    instanceId: string,
  ) => void;

  onDecorationSendToBack: (
    instanceId: string,
  ) => void;

  onInscriptionChange: (
    inscription: InscriptionSettings,
  ) => void;

  onInscriptionSelect: () => void;
  onClearSelection: () => void;
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
  const stageRef =
    useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={stageRef}
      className="cake-builder-stage relative mx-auto aspect-square w-full max-w-[680px] touch-none overflow-hidden rounded-3xl bg-[#f5f1ed]"
      onPointerDown={(event) => {
        if (
          event.currentTarget === event.target
        ) {
          onClearSelection();
        }
      }}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
    >
      <img
        src={base.src}
        alt={`Круглый торт: ${base.name}`}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
        draggable={false}
      />

      <DecorationLayer
        stageRef={
          stageRef as RefObject<HTMLDivElement | null>
        }
        instances={decorations}
        selectedInstanceId={
          selectedDecorationId
        }
        onSelect={onDecorationSelect}
        onChange={onDecorationsChange}
        onInteractionStart={
          onDecorationInteractionStart
        }
        onInteractionEnd={
          onDecorationInteractionEnd
        }
        onRemove={onDecorationRemove}
        onDuplicate={onDecorationDuplicate}
        onRotate={onDecorationRotate}
        onResetRotation={
          onDecorationResetRotation
        }
        onResetTransform={
          onDecorationResetTransform
        }
        onFlipHorizontal={
          onDecorationFlipHorizontal
        }
        onFlipVertical={
          onDecorationFlipVertical
        }
        onBringForward={
          onDecorationBringForward
        }
        onSendBackward={
          onDecorationSendBackward
        }
        onBringToFront={
          onDecorationBringToFront
        }
        onSendToBack={
          onDecorationSendToBack
        }
      />

      <InscriptionLayer
        stageRef={
          stageRef as RefObject<HTMLDivElement | null>
        }
        inscription={inscription}
        selected={inscriptionSelected}
        onSelect={onInscriptionSelect}
        onChange={onInscriptionChange}
      />
    </div>
  );
}
