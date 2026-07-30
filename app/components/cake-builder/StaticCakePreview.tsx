"use client";

import type {
  DecorationInstance,
  InscriptionSettings,
} from "@/lib/cake-builder/types";

import type {
  CakeBaseAsset,
} from "@/lib/cake-builder/assets";

import CakePreview from "./CakePreview";

type StaticCakePreviewProps = {
  base: CakeBaseAsset;
  decorations?: DecorationInstance[] | null;
  inscription?: InscriptionSettings | null;
};

const emptyInscription: InscriptionSettings = {
  text: "",
  x: 627,
  y: 570,
  fontSize: 52,
  rotation: 0,
  curve: 0,
  letterSpacing: 1,
  fontFamily: "marck",
  fontWeight: 400,
  color: "#4d2c23",
  opacity: 100,
  uppercase: false,
  outlineColor: "#ffffff",
  outlineWidth: 0,
  shadowEnabled: false,
  shadowColor: "#000000",
  shadowBlur: 4,
  shadowOffsetY: 3,
};

export default function StaticCakePreview({
  base,
  decorations = [],
  inscription = emptyInscription,
}: StaticCakePreviewProps) {
  return (
    <div className="pointer-events-none">
      <CakePreview
        base={base}
        decorations={decorations ?? []}
        selectedDecorationId={null}
        inscription={{
          ...emptyInscription,
          ...(inscription ?? {}),
        }}
        inscriptionSelected={false}
        onDecorationsChange={() => {}}
        onDecorationInteractionStart={() => {}}
        onDecorationInteractionEnd={() => {}}
        onDecorationSelect={() => {}}
        onDecorationRemove={() => {}}
        onDecorationDuplicate={() => {}}
        onDecorationRotate={() => {}}
        onDecorationResetRotation={() => {}}
        onDecorationResetTransform={() => {}}
        onDecorationFlipHorizontal={() => {}}
        onDecorationFlipVertical={() => {}}
        onDecorationBringForward={() => {}}
        onDecorationSendBackward={() => {}}
        onDecorationBringToFront={() => {}}
        onDecorationSendToBack={() => {}}
        onInscriptionChange={() => {}}
        onInscriptionSelect={() => {}}
        onClearSelection={() => {}}
      />
    </div>
  );
}
