"use client";
import { useLocale } from "next-intl";
import type { CakeBaseAsset } from "@/lib/cake-builder/assets";
import type {
  DecorationInstance,
  InscriptionSettings,
} from "@/lib/cake-builder/types";
import CakeThreePreview from "./CakeThreePreview";

type CakePreviewProps = {
  base: CakeBaseAsset;
  decorations: DecorationInstance[];
  selectedDecorationId: string | null;
  inscription: InscriptionSettings;
  inscriptionSelected: boolean;
  onDecorationsChange: (items: DecorationInstance[]) => void;
  onDecorationInteractionStart: () => void;
  onDecorationInteractionEnd: () => void;
  onDecorationSelect: (id: string) => void;
  onDecorationRemove: (id: string) => void;
  onDecorationDuplicate: (id: string) => void;
  onDecorationRotate: (id: string) => void;
  onDecorationResetRotation: (id: string) => void;
  onDecorationResetTransform: (id: string) => void;
  onDecorationFlipHorizontal: (id: string) => void;
  onDecorationFlipVertical: (id: string) => void;
  onDecorationBringForward: (id: string) => void;
  onDecorationSendBackward: (id: string) => void;
  onDecorationBringToFront: (id: string) => void;
  onDecorationSendToBack: (id: string) => void;
  onInscriptionChange: (value: InscriptionSettings) => void;
  onInscriptionSelect: () => void;
  onClearSelection: () => void;
};

const colors: Record<string, string> = {
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
  onDecorationsChange,
  onDecorationInteractionStart,
  onDecorationInteractionEnd,
  onDecorationSelect,
  onClearSelection,
}: CakePreviewProps) {
  const isEnglish = useLocale() === "en";
  return (
    <div
      className="cake-builder-frame relative mx-auto w-full max-w-[680px] overflow-hidden rounded-3xl bg-[#f5f1ed] p-2 sm:p-3"
      onContextMenu={(e) => e.preventDefault()}
    >
      <CakeThreePreview
        base={base}
        color={colors[base.id] ?? "#f3ead8"}
        decorations={decorations}
        selectedDecorationId={selectedDecorationId}
        inscription={inscription}
        isEnglish={isEnglish}
        onDecorationsChange={onDecorationsChange}
        onDecorationSelect={onDecorationSelect}
        onClearSelection={onClearSelection}
        onInteractionStart={onDecorationInteractionStart}
        onInteractionEnd={onDecorationInteractionEnd}
      />
    </div>
  );
}
