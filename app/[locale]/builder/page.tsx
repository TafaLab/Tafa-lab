"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";

import BuilderSection from "@/app/components/cake-builder/BuilderSection";
import CakePreview from "@/app/components/cake-builder/CakePreview";
import InscriptionControls from "@/app/components/cake-builder/InscriptionControls";
import PreviewValue from "@/app/components/cake-builder/PreviewValue";

import {
  cakeBases,
  enabledDecorationAssets,
  type DecorationCategory,
} from "@/lib/cake-builder/assets";

import {
  categoryOrder,
  defaultInscription,
  fillings,
  weights,
} from "@/lib/cake-builder/constants";

import { useBuilderHistory } from "@/lib/cake-builder/hooks/useBuilderHistory";
import { useBuilderPrice } from "@/lib/cake-builder/hooks/useBuilderPrice";
import { useBuilderSelection } from "@/lib/cake-builder/hooks/useBuilderSelection";
import { useDecorationActions } from "@/lib/cake-builder/hooks/useDecorationActions";
import { useKeyboardShortcuts } from "@/lib/cake-builder/hooks/useKeyboardShortcuts";

import type {
  Filling,
  InscriptionSettings,
} from "@/lib/cake-builder/types";

import { formatPrice } from "@/lib/cake-builder/utils";

import { builderMessages, type BuilderLocale } from "@/messages/builder";
import { enMessages } from "@/messages/en";
import { ruMessages } from "@/messages/ru";

type InspectorButtonProps = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  danger?: boolean;
};

function InspectorButton({
  label,
  icon,
  onClick,
  danger = false,
}: InspectorButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex min-h-[64px] min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-1.5 py-2 text-center transition active:scale-[0.97] ${
        danger
          ? "border-red-100 bg-red-50 text-red-700 hover:bg-red-100"
          : "border-black/10 bg-white text-[#432e25] hover:border-[#6a4433]/30 hover:bg-[#fffaf7]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-7 w-7 items-center justify-center rounded-lg text-base font-bold ${
          danger
            ? "bg-white text-red-700"
            : "bg-[#f3e9e2] text-[#6a4433]"
        }`}
      >
        {icon}
      </span>

      <strong className="block max-w-full truncate text-[10px] font-semibold leading-tight">
        {label}
      </strong>
    </button>
  );
}

export default function BuilderPage() {
  const router = useRouter();
  const currentLocale = useLocale();
  const locale: BuilderLocale =
    currentLocale === "en" ? "en" : "ru";

  const text = builderMessages[locale];
  const siteText = locale === "en" ? enMessages : ruMessages;

  const [weight, setWeight] = useState<number>(1.5);
  const [filling, setFilling] = useState<Filling>("snickers");
  const [baseId, setBaseId] = useState("white");
  const [activeCategory, setActiveCategory] =
    useState<DecorationCategory>("berries");
  const [inscription, setInscription] =
    useState<InscriptionSettings>(defaultInscription);
  const [comment, setComment] = useState("");

  const {
    decorationInstances,
    decorationInstancesRef,
    commitDecorations,
    undo: undoHistory,
    redo: redoHistory,
    canUndo,
    canRedo,
    beginInteraction: beginDecorationInteraction,
    updateDuringInteraction: updateDecorationsDuringInteraction,
    finishInteraction: finishDecorationInteraction,
  } = useBuilderHistory();

  const {
    selectedInstanceId,
    inscriptionSelected,
    selectedInstance,
    selectedInstanceAsset,
    selectDecoration,
    selectInscription,
    clearSelection,
    clearDecorationSelection,
  } = useBuilderSelection({ decorationInstances });

  const {
    selectedWeight,
    selectedFilling,
    selectedBase,
    totalPrice,
  } = useBuilderPrice({
    weight,
    filling,
    baseId,
    decorationInstances,
  });

  const {
    addDecoration,
    removeDecoration,
    duplicateDecoration,
    rotateDecoration,
    resetDecorationRotation,
    resetDecorationTransform,
    flipDecorationHorizontal,
    flipDecorationVertical,
    bringDecorationForward,
    sendDecorationBackward,
    bringDecorationToFront,
    sendDecorationToBack,
    clearDecorations,
    nudgeSelectedDecoration,
  } = useDecorationActions({
    decorationInstancesRef,
    selectedInstanceId,
    commitDecorations,
    selectDecoration,
    clearDecorationSelection,
  });

  const undo = useCallback(() => {
    if (!canUndo) return;
    undoHistory();
    clearSelection();
  }, [canUndo, clearSelection, undoHistory]);

  const redo = useCallback(() => {
    if (!canRedo) return;
    redoHistory();
    clearSelection();
  }, [canRedo, clearSelection, redoHistory]);

  useKeyboardShortcuts({
    selectedInstanceId,
    undo,
    redo,
    clearSelection,
    duplicateDecoration,
    removeDecoration,
    nudgeSelectedDecoration,
  });

  const activeAssets = useMemo(() => {
    return enabledDecorationAssets.filter(
      (asset) => asset.category === activeCategory,
    );
  }, [activeCategory]);

  const getFillingLabel = (fillingValue: Filling) =>
    text.fillings[fillingValue].label;

  const getFillingDescription = (fillingValue: Filling) =>
    text.fillings[fillingValue].description;

  const getBaseName = (id: string, fallbackName: string) =>
    text.baseNames[id] ?? fallbackName;

  const getDecorationName = (id: string, fallbackName: string) =>
    text.decorationNames[id] ?? fallbackName;

  const goToCheckout = () => {
    sessionStorage.setItem(
      "milky-cake-order",
      JSON.stringify({
        weight,
        filling,
        color: baseId,
        decorations: decorationInstances,
        inscription,
        comment,
        price: totalPrice,
      }),
    );

    router.push(`/${locale}/checkout`);
  };

  return (
    <main className="min-h-screen bg-[#f7f3ef] text-[#342923]">
      <Header
        locale={locale}
        text={siteText.nav}
      />

      <section className="border-b border-black/10 bg-[#efe3da]">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 md:px-8 md:py-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-8 lg:py-12">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b6250] md:text-xs md:tracking-[0.22em]">
              {text.hero.eyebrow}
            </span>

            <h1 className="mt-3 max-w-3xl text-[30px] font-semibold leading-[1.08] md:mt-4 md:text-6xl md:leading-tight">
              {text.hero.titleFirst}
              <br />
              <span className="font-serif italic">
                {text.hero.titleAccent}
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/65 md:mt-5 md:text-base md:leading-7">
              {text.hero.description}
            </p>
          </div>

          <div className="max-w-md rounded-2xl border border-[#a67b65]/20 bg-white/75 px-4 py-4 md:px-5 md:py-5">
            <div className="flex items-start gap-3">
              <span className="rounded-full bg-[#6a4433] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                Demo
              </span>

              <div>
                <strong className="block text-sm md:text-base">
                  {text.hero.demoTitle}
                </strong>
                <p className="mt-1.5 text-xs leading-5 text-black/60 md:text-sm md:leading-6">
                  {text.hero.demoDescription}
                </p>
                <Link
                  href={`/${locale}/admin/orders`}
                  className="mt-3 inline-flex text-xs font-semibold text-[#6a4433] underline decoration-[#6a4433]/30 underline-offset-4 md:text-sm"
                >
                  {text.hero.demoLink} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-start gap-5 px-4 pb-10 pt-0 md:gap-8 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.85fr)]">
        <div className="builder-mobile-preview sticky top-0 z-40 -mx-4 self-start border-b border-black/10 bg-[#f7f3ef]/95 px-2 py-1.5 shadow-[0_8px_20px_rgba(54,41,34,0.08)] backdrop-blur-md md:top-4 md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none lg:top-6">
          <div className="rounded-2xl bg-white p-1.5 shadow-sm sm:p-2 md:rounded-3xl md:p-5 lg:p-6">
            <div className="mb-1 flex items-center justify-between gap-2 sm:mb-2 md:mb-4 md:items-end md:gap-4 lg:mb-5">
              <div className="min-w-0">
                <span className="hidden text-xs uppercase tracking-[0.18em] text-black/45 md:block">
                  {text.preview.eyebrow}
                </span>
                <h2 className="truncate text-sm font-semibold sm:text-base md:mt-1 md:text-xl lg:text-2xl">
                  {text.preview.title}
                </h2>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
                <button
                  type="button"
                  onClick={undo}
                  disabled={!canUndo}
                  title={text.preview.undoTitle}
                  aria-label={text.preview.undoLabel}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-base transition hover:border-[#6a4433]/35 disabled:cursor-not-allowed disabled:opacity-35 md:h-10 md:w-10 md:text-lg"
                >
                  ↶
                </button>

                <button
                  type="button"
                  onClick={redo}
                  disabled={!canRedo}
                  title={text.preview.redoTitle}
                  aria-label={text.preview.redoLabel}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-base transition hover:border-[#6a4433]/35 disabled:cursor-not-allowed disabled:opacity-35 md:h-10 md:w-10 md:text-lg"
                >
                  ↷
                </button>

                <span className="rounded-full bg-[#f2e8e1] px-3 py-2 text-xs font-semibold md:px-4 md:text-sm">
                  {selectedWeight?.label}
                </span>
              </div>
            </div>

            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_190px] lg:items-start lg:gap-4">
              <div className="mx-auto w-[min(58vw,230px)] sm:w-[min(54vw,250px)] md:w-[min(48vw,310px)] lg:w-full">
                <CakePreview
                  base={selectedBase}
                  decorations={decorationInstances}
                  selectedDecorationId={selectedInstanceId}
                  inscription={inscription}
                  inscriptionSelected={inscriptionSelected}
                  onDecorationsChange={updateDecorationsDuringInteraction}
                  onDecorationInteractionStart={beginDecorationInteraction}
                  onDecorationInteractionEnd={finishDecorationInteraction}
                  onDecorationSelect={selectDecoration}
                  onDecorationRemove={removeDecoration}
                  onDecorationDuplicate={duplicateDecoration}
                  onDecorationRotate={rotateDecoration}
                  onDecorationResetRotation={resetDecorationRotation}
                  onDecorationResetTransform={resetDecorationTransform}
                  onDecorationFlipHorizontal={flipDecorationHorizontal}
                  onDecorationFlipVertical={flipDecorationVertical}
                  onDecorationBringForward={bringDecorationForward}
                  onDecorationSendBackward={sendDecorationBackward}
                  onDecorationBringToFront={bringDecorationToFront}
                  onDecorationSendToBack={sendDecorationToBack}
                  onInscriptionChange={setInscription}
                  onInscriptionSelect={selectInscription}
                  onClearSelection={clearSelection}
                />
              </div>

              <aside className="hidden min-w-0 lg:block">
                <div className="sticky top-6 overflow-hidden rounded-2xl border border-black/10 bg-[#f8f0eb]">
                  {selectedInstance && selectedInstanceAsset ? (
                    <>
                      <div className="border-b border-black/10 bg-white p-3">
                        <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-black/40">
                          {text.preview.selectedDecoration}
                        </span>

                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f5f1ed] p-1.5">
                            <img
                              src={selectedInstanceAsset.src}
                              alt=""
                              className="max-h-full max-w-full object-contain"
                              draggable={false}
                            />
                          </div>

                          <div className="min-w-0">
                            <strong className="block truncate text-xs">
                              {getDecorationName(
                                selectedInstanceAsset.id,
                                selectedInstanceAsset.name,
                              )}
                            </strong>
                            <span className="mt-0.5 block text-[9px] leading-3 text-black/40">
                              {text.preview.dragDecoration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 p-2">
                        <InspectorButton
                          label={text.preview.duplicate}
                          icon="⧉"
                          onClick={() =>
                            duplicateDecoration(selectedInstance.instanceId)
                          }
                        />
                        <InspectorButton
                          label={text.preview.rotate}
                          icon="↻"
                          onClick={() =>
                            rotateDecoration(selectedInstance.instanceId)
                          }
                        />
                        <InspectorButton
                          label={text.preview.reset}
                          icon="0°"
                          onClick={() =>
                            resetDecorationRotation(selectedInstance.instanceId)
                          }
                        />
                        <InspectorButton
                          label={text.preview.mirror}
                          icon="↔"
                          onClick={() =>
                            flipDecorationHorizontal(selectedInstance.instanceId)
                          }
                        />
                        <InspectorButton
                          label={text.preview.flip}
                          icon="↕"
                          onClick={() =>
                            flipDecorationVertical(selectedInstance.instanceId)
                          }
                        />
                        <InspectorButton
                          label={text.preview.layerBack}
                          icon="‹"
                          onClick={() =>
                            sendDecorationBackward(selectedInstance.instanceId)
                          }
                        />
                        <InspectorButton
                          label={text.preview.layerForward}
                          icon="›"
                          onClick={() =>
                            bringDecorationForward(selectedInstance.instanceId)
                          }
                        />
                        <InspectorButton
                          label={text.preview.delete}
                          icon="×"
                          danger
                          onClick={() =>
                            removeDecoration(selectedInstance.instanceId)
                          }
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex min-h-[260px] flex-col items-center justify-center p-4 text-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl text-[#6a4433] shadow-sm">
                        ✦
                      </span>
                      <strong className="mt-3 block text-xs">
                        {text.preview.selectDecoration}
                      </strong>
                      <p className="mt-2 text-[10px] leading-4 text-black/45">
                        {text.preview.selectDecorationDescription}
                      </p>
                    </div>
                  )}
                </div>
              </aside>
            </div>

            <div className="hidden lg:block">
              <div className="mt-4 rounded-2xl border border-[#6a4433]/15 bg-[#f8f0eb] px-4 py-3">
                <p className="text-sm leading-6 text-black/60">
                  {text.preview.instructions}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
                <PreviewValue
                  label={text.preview.shape}
                  value={text.preview.round}
                />
                <PreviewValue
                  label={text.preview.weight}
                  value={selectedWeight?.label ?? "—"}
                />
                <PreviewValue
                  label={text.preview.filling}
                  value={
                    selectedFilling
                      ? getFillingLabel(selectedFilling.value)
                      : "—"
                  }
                />
                <PreviewValue
                  label={text.preview.color}
                  value={getBaseName(selectedBase.id, selectedBase.name)}
                />
                <PreviewValue
                  label={text.preview.price}
                  value={`${formatPrice(totalPrice)} ₸`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-5 pt-1 md:space-y-6 md:pt-0">
          <BuilderSection
            number="01"
            title={text.sections.weight.title}
            description={text.sections.weight.description}
          >
            <div className="grid grid-cols-2 gap-3">
              {weights.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  onClick={() => setWeight(item.value)}
                  className={`min-w-0 rounded-2xl border p-4 text-left transition ${
                    weight === item.value
                      ? "border-[#6a4433] bg-[#f4e9e2]"
                      : "border-black/10 bg-white hover:border-black/25"
                  }`}
                >
                  <strong className="block text-lg">{item.label}</strong>
                  <span className="mt-1 block text-sm text-black/55">
                    {formatPrice(item.price)} ₸
                  </span>
                </button>
              ))}
            </div>
          </BuilderSection>

          <BuilderSection
            number="02"
            title={text.sections.filling.title}
            description={text.sections.filling.description}
          >
            <div className="space-y-3">
              {fillings.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  onClick={() => setFilling(item.value)}
                  className={`flex w-full min-w-0 items-start justify-between gap-3 rounded-2xl border p-4 text-left transition ${
                    filling === item.value
                      ? "border-[#6a4433] bg-[#f4e9e2]"
                      : "border-black/10 bg-white hover:border-black/25"
                  }`}
                >
                  <div className="min-w-0">
                    <strong className="block">
                      {getFillingLabel(item.value)}
                    </strong>
                    <span className="mt-1 block text-sm leading-6 text-black/55">
                      {getFillingDescription(item.value)}
                    </span>
                  </div>
                  <small className="shrink-0 font-semibold text-[#7c5645]">
                    {item.price === 0
                      ? text.sections.filling.included
                      : `+${formatPrice(item.price)} ₸`}
                  </small>
                </button>
              ))}
            </div>
          </BuilderSection>

          <BuilderSection
            number="03"
            title={text.sections.color.title}
            description={text.sections.color.description}
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cakeBases.map((base) => (
                <button
                  type="button"
                  key={base.id}
                  onClick={() => setBaseId(base.id)}
                  className={`min-w-0 overflow-hidden rounded-2xl border bg-white text-left transition ${
                    baseId === base.id
                      ? "border-[#6a4433] ring-2 ring-[#6a4433]/15"
                      : "border-black/10 hover:border-black/25"
                  }`}
                >
                  <div className="aspect-square bg-[#f5f1ed]">
                    <img
                      src={base.src}
                      alt={getBaseName(base.id, base.name)}
                      className="h-full w-full object-contain"
                      draggable={false}
                    />
                  </div>
                  <strong className="block px-3 py-3 text-sm">
                    {getBaseName(base.id, base.name)}
                  </strong>
                </button>
              ))}
            </div>
          </BuilderSection>

          <BuilderSection
            number="04"
            title={text.sections.decorations.title}
            description={text.sections.decorations.description}
          >
            <div className="flex max-w-full flex-wrap gap-2 pb-2 max-md:flex-nowrap max-md:overflow-x-auto max-md:overscroll-x-contain max-md:touch-pan-x">
              {categoryOrder.map((category) => {
                const hasAssets = enabledDecorationAssets.some(
                  (asset) => asset.category === category,
                );

                if (!hasAssets) return null;

                return (
                  <button
                    type="button"
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                      activeCategory === category
                        ? "bg-[#6a4433] text-white"
                        : "bg-[#f0e8e2] text-[#4c382f]"
                    }`}
                  >
                    {text.categories[category]}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {activeAssets.map((asset) => (
                <button
                  type="button"
                  key={asset.id}
                  onClick={() => addDecoration(asset)}
                  className="min-w-0 overflow-hidden rounded-2xl border border-black/10 bg-white text-left transition hover:border-[#6a4433]/50 hover:shadow-sm"
                >
                  <div className="flex aspect-square items-center justify-center bg-[#f5f1ed] p-5">
                    <img
                      src={asset.src}
                      alt={getDecorationName(asset.id, asset.name)}
                      className="max-h-full max-w-full object-contain"
                      draggable={false}
                    />
                  </div>
                  <div className="p-3">
                    <strong className="block text-sm">
                      {getDecorationName(asset.id, asset.name)}
                    </strong>
                    <span className="mt-2 block text-xs font-semibold text-[#7c5645]">
                      {text.sections.decorations.add}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {decorationInstances.length > 0 && (
              <div className="mt-5 border-t border-black/10 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <strong>
                    {text.sections.decorations.added}: {decorationInstances.length}
                  </strong>
                  <button
                    type="button"
                    onClick={clearDecorations}
                    className="shrink-0 text-sm text-red-700"
                  >
                    {text.sections.decorations.clear}
                  </button>
                </div>
              </div>
            )}
          </BuilderSection>

          <BuilderSection
            number="05"
            title={text.sections.inscription.title}
            description={text.sections.inscription.description}
          >
            <InscriptionControls
              inscription={inscription}
              onChange={setInscription}
              onSelect={selectInscription}
            />

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold">
                {text.sections.inscription.notesLabel}
              </span>
              <textarea
                value={comment}
                rows={5}
                placeholder={text.sections.inscription.notesPlaceholder}
                onChange={(event) => setComment(event.target.value)}
                className="w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#6a4433]"
              />
            </label>
          </BuilderSection>

          <section className="rounded-3xl bg-[#432e25] p-6 text-white md:p-8">
            <span className="text-sm text-white/60">
              {text.summary.label}
            </span>
            <strong className="mt-2 block text-4xl">
              {formatPrice(totalPrice)} ₸
            </strong>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">
              {text.summary.description}
            </p>
            <button
              type="button"
              onClick={goToCheckout}
              className="mt-6 flex w-full items-center justify-between rounded-full bg-white px-6 py-4 font-semibold text-[#432e25] transition hover:bg-[#f7f2ed]"
            >
              {text.summary.button}
              <span aria-hidden="true">→</span>
            </button>
          </section>
        </div>
      </section>

      <Footer
        locale={locale}
        text={siteText.footer}
      />
    </main>
  );
}
