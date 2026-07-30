"use client";

import Link from "next/link";
import {
  useCallback,
  useMemo,
  useState,
} from "react";

import BuilderSection from "@/app/components/cake-builder/BuilderSection";
import CakePreview from "@/app/components/cake-builder/CakePreview";
import DecorationControls from "@/app/components/cake-builder/DecorationControls";
import InscriptionControls from "@/app/components/cake-builder/InscriptionControls";
import PreviewValue from "@/app/components/cake-builder/PreviewValue";

import {
  cakeBases,
  enabledDecorationAssets,
  type DecorationCategory,
} from "@/lib/cake-builder/assets";

import {
  categoryLabels,
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

import {
  formatPrice,
} from "@/lib/cake-builder/utils";

export default function BuilderPage() {
  const [weight, setWeight] =
    useState<number>(1.5);

  const [filling, setFilling] =
    useState<Filling>("snickers");

  const [baseId, setBaseId] =
    useState("white");

  const [
    activeCategory,
    setActiveCategory,
  ] = useState<DecorationCategory>(
    "berries",
  );

  const [
    inscription,
    setInscription,
  ] = useState<InscriptionSettings>(
    defaultInscription,
  );

  const [comment, setComment] =
    useState("");

  const {
    decorationInstances,
    decorationInstancesRef,
    commitDecorations,

    undo: undoHistory,
    redo: redoHistory,
    canUndo,
    canRedo,

    beginInteraction:
      beginDecorationInteraction,

    updateDuringInteraction:
      updateDecorationsDuringInteraction,

    finishInteraction:
      finishDecorationInteraction,
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
  } = useBuilderSelection({
    decorationInstances,
  });

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
    updateSelectedDecoration,
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
    if (!canUndo) {
      return;
    }

    undoHistory();
    clearSelection();
  }, [
    canUndo,
    clearSelection,
    undoHistory,
  ]);

  const redo = useCallback(() => {
    if (!canRedo) {
      return;
    }

    redoHistory();
    clearSelection();
  }, [
    canRedo,
    clearSelection,
    redoHistory,
  ]);

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
      (asset) =>
        asset.category === activeCategory,
    );
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-[#f7f3ef] text-[#342923]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6a4433] text-sm font-semibold text-white">
              MC
            </span>

            <span className="text-xl">
              Milky <strong>Cake</strong>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm lg:flex">
            <Link href="/cakes">
              РўРѕСЂС‚С‹
            </Link>

            <Link
              href="/builder"
              className="font-semibold"
            >
              РљРѕРЅСЃС‚СЂСѓРєС‚РѕСЂ
            </Link>

            <Link href="/food">
              Р•РґР° Рё РґРµСЃРµСЂС‚С‹
            </Link>

            <Link href="/gallery">
              Р“Р°Р»РµСЂРµСЏ
            </Link>

            <Link href="/contacts">
              РљРѕРЅС‚Р°РєС‚С‹
            </Link>
          </nav>

          <Link
            href="/"
            className="rounded-full border border-black/15 px-5 py-2 text-sm"
          >
            РќР° РіР»Р°РІРЅСѓСЋ
          </Link>
        </div>
      </header>

      <section className="border-b border-black/10 bg-[#efe3da]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b6250]">
              РљРѕРЅСЃС‚СЂСѓРєС‚РѕСЂ Milky Cake
            </span>

            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
              РЎРѕР±РµСЂРёС‚Рµ С‚РѕСЂС‚,
              <br />

              <span className="font-serif italic">
                РєРѕС‚РѕСЂС‹Р№ РїСЂРёРґСѓРјР°Р»Рё РІС‹
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-black/65 md:text-base">
              Р’С‹Р±РµСЂРёС‚Рµ РІРµСЃ, РЅР°С‡РёРЅРєСѓ, С†РІРµС‚
              РѕСЃРЅРѕРІС‹ Рё РѕС„РѕСЂРјР»РµРЅРёРµ. РњРµРЅРµРґР¶РµСЂ
              РїСЂРѕРІРµСЂРёС‚ Р·Р°СЏРІРєСѓ Рё РїРѕРґС‚РІРµСЂРґРёС‚
              РёС‚РѕРіРѕРІСѓСЋ СЃС‚РѕРёРјРѕСЃС‚СЊ.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white/65 px-5 py-4">
            <span className="text-3xl font-semibold text-[#a67b65]">
              01
            </span>

            <div>
              <strong className="block">
                РЎРѕР·РґР°РЅРёРµ РґРёР·Р°Р№РЅР°
              </strong>

              <small className="text-black/55">
                РџСЂРµРґРІР°СЂРёС‚РµР»СЊРЅР°СЏ РІРµСЂСЃРёСЏ Р·Р°РєР°Р·Р°
              </small>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.85fr)]">
        <div className="builder-mobile-preview lg:sticky lg:top-6 lg:self-start">
          <div className="builder-preview-card rounded-3xl bg-white p-4 shadow-sm md:p-6">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.18em] text-black/45">
                  РџСЂРµРґРІР°СЂРёС‚РµР»СЊРЅС‹Р№ РІРёРґ
                </span>

                <h2 className="mt-1 text-2xl font-semibold">
                  Р’Р°С€ С‚РѕСЂС‚
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={undo}
                  disabled={!canUndo}
                  title="РћС‚РјРµРЅРёС‚СЊ вЂ” Ctrl+Z"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-lg transition hover:border-[#6a4433]/35 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  в†¶
                </button>

                <button
                  type="button"
                  onClick={redo}
                  disabled={!canRedo}
                  title="РџРѕРІС‚РѕСЂРёС‚СЊ вЂ” Ctrl+Shift+Z РёР»Рё Ctrl+Y"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-lg transition hover:border-[#6a4433]/35 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  в†·
                </button>

                <span className="rounded-full bg-[#f2e8e1] px-4 py-2 text-sm font-semibold">
                  {selectedWeight?.label}
                </span>
              </div>
            </div>

            <CakePreview
              base={selectedBase}
              decorations={
                decorationInstances
              }
              selectedDecorationId={
                selectedInstanceId
              }
              inscription={inscription}
              inscriptionSelected={
                inscriptionSelected
              }
              onDecorationsChange={
                updateDecorationsDuringInteraction
              }
              onDecorationInteractionStart={
                beginDecorationInteraction
              }
              onDecorationInteractionEnd={
                finishDecorationInteraction
              }
              onDecorationSelect={
                selectDecoration
              }
              onDecorationRemove={
                removeDecoration
              }
              onDecorationDuplicate={
                duplicateDecoration
              }
              onDecorationRotate={
                rotateDecoration
              }
              onDecorationResetRotation={
                resetDecorationRotation
              }
              onDecorationResetTransform={
                resetDecorationTransform
              }
              onDecorationFlipHorizontal={
                flipDecorationHorizontal
              }
              onDecorationFlipVertical={
                flipDecorationVertical
              }
              onDecorationBringForward={
                bringDecorationForward
              }
              onDecorationSendBackward={
                sendDecorationBackward
              }
              onDecorationBringToFront={
                bringDecorationToFront
              }
              onDecorationSendToBack={
                sendDecorationToBack
              }
              onInscriptionChange={
                setInscription
              }
              onInscriptionSelect={
                selectInscription
              }
              onClearSelection={
                clearSelection
              }
            />

            <div className="builder-preview-help mt-4 rounded-2xl border border-[#6a4433]/15 bg-[#f8f0eb] px-4 py-3">
              <p className="text-sm leading-6 text-black/60">
                Р”РµРєРѕСЂ РјРѕР¶РЅРѕ РґРІРёРіР°С‚СЊ,
                РјР°СЃС€С‚Р°Р±РёСЂРѕРІР°С‚СЊ Р·Р° СѓРіР»С‹ Рё
                РІСЂР°С‰Р°С‚СЊ РѕС‚РґРµР»СЊРЅРѕР№ СЂСѓС‡РєРѕР№.
                РќР°РїСЂР°РІР»СЏСЋС‰РёРµ РїРѕРјРѕРіР°СЋС‚
                РІС‹СЂР°РІРЅРёРІР°С‚СЊ СЌР»РµРјРµРЅС‚С‹. Ctrl+Z
                РѕС‚РјРµРЅСЏРµС‚ РґРµР№СЃС‚РІРёРµ, Ctrl+D
                РґСѓР±Р»РёСЂСѓРµС‚ РІС‹Р±СЂР°РЅРЅС‹Р№ РґРµРєРѕСЂ.
              </p>
            </div>

            <div className="builder-preview-summary mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
              <PreviewValue
                label="Р¤РѕСЂРјР°"
                value="РљСЂСѓРіР»Р°СЏ"
              />

              <PreviewValue
                label="Р’РµСЃ"
                value={
                  selectedWeight?.label ??
                  "вЂ”"
                }
              />

              <PreviewValue
                label="РќР°С‡РёРЅРєР°"
                value={
                  selectedFilling?.label ??
                  "вЂ”"
                }
              />

              <PreviewValue
                label="Р¦РІРµС‚"
                value={selectedBase.name}
              />

              <PreviewValue
                label="Р¦РµРЅР°"
                value={`${formatPrice(
                  totalPrice,
                )} в‚ё`}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <BuilderSection
            number="01"
            title="Р’С‹Р±РµСЂРёС‚Рµ РІРµСЃ"
            description="РћР±С‹С‡РЅРѕ СЂР°СЃСЃС‡РёС‚С‹РІР°СЋС‚ 150вЂ“200 РіСЂР°РјРјРѕРІ РЅР° РѕРґРЅРѕРіРѕ РіРѕСЃС‚СЏ."
          >
            <div className="grid grid-cols-2 gap-3">
              {weights.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  onClick={() =>
                    setWeight(item.value)
                  }
                  className={`rounded-2xl border p-4 text-left transition ${
                    weight === item.value
                      ? "border-[#6a4433] bg-[#f4e9e2]"
                      : "border-black/10 bg-white hover:border-black/25"
                  }`}
                >
                  <strong className="block text-lg">
                    {item.label}
                  </strong>

                  <span className="mt-1 block text-sm text-black/55">
                    {formatPrice(
                      item.price,
                    )}{" "}
                    в‚ё
                  </span>
                </button>
              ))}
            </div>
          </BuilderSection>

          <BuilderSection
            number="02"
            title="Р’С‹Р±РµСЂРёС‚Рµ РЅР°С‡РёРЅРєСѓ"
            description="РќР°С‡РёРЅРєРё, РєРѕС‚РѕСЂС‹Рµ РіРѕС‚РѕРІРёС‚ Milky Cake."
          >
            <div className="space-y-3">
              {fillings.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  onClick={() =>
                    setFilling(item.value)
                  }
                  className={`flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition ${
                    filling === item.value
                      ? "border-[#6a4433] bg-[#f4e9e2]"
                      : "border-black/10 bg-white hover:border-black/25"
                  }`}
                >
                  <div>
                    <strong className="block">
                      {item.label}
                    </strong>

                    <span className="mt-1 block text-sm leading-6 text-black/55">
                      {item.description}
                    </span>
                  </div>

                  <small className="shrink-0 font-semibold text-[#7c5645]">
                    {item.price === 0
                      ? "Р’РєР»СЋС‡РµРЅРѕ"
                      : `+${formatPrice(
                          item.price,
                        )} в‚ё`}
                  </small>
                </button>
              ))}
            </div>
          </BuilderSection>

          <BuilderSection
            number="03"
            title="Р’С‹Р±РµСЂРёС‚Рµ С†РІРµС‚"
            description="Р’С‹Р±РµСЂРёС‚Рµ С†РІРµС‚ РїРѕРєСЂС‹С‚РёСЏ С‚РѕСЂС‚Р°."
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cakeBases.map((base) => (
                <button
                  type="button"
                  key={base.id}
                  onClick={() =>
                    setBaseId(base.id)
                  }
                  className={`overflow-hidden rounded-2xl border bg-white text-left transition ${
                    baseId === base.id
                      ? "border-[#6a4433] ring-2 ring-[#6a4433]/15"
                      : "border-black/10 hover:border-black/25"
                  }`}
                >
                  <div className="aspect-square bg-[#f5f1ed]">
                    <img
                      src={base.src}
                      alt=""
                      className="h-full w-full object-contain"
                      draggable={false}
                    />
                  </div>

                  <strong className="block px-3 py-3 text-sm">
                    {base.name}
                  </strong>
                </button>
              ))}
            </div>
          </BuilderSection>

          <BuilderSection
            number="04"
            title="Р”РѕР±Р°РІСЊС‚Рµ РґРµРєРѕСЂ"
            description="Р”РµРєРѕСЂ РјРѕР¶РЅРѕ РґРІРёРіР°С‚СЊ, РїРѕРІРѕСЂР°С‡РёРІР°С‚СЊ Рё Р·РµСЂРєР°Р»СЊРЅРѕ РѕС‚СЂР°Р¶Р°С‚СЊ."
          >
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categoryOrder.map(
                (category) => {
                  const hasAssets =
                    enabledDecorationAssets.some(
                      (asset) =>
                        asset.category ===
                        category,
                    );

                  if (!hasAssets) {
                    return null;
                  }

                  return (
                    <button
                      type="button"
                      key={category}
                      onClick={() =>
                        setActiveCategory(
                          category,
                        )
                      }
                      className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                        activeCategory ===
                        category
                          ? "bg-[#6a4433] text-white"
                          : "bg-[#f0e8e2] text-[#4c382f]"
                      }`}
                    >
                      {
                        categoryLabels[
                          category
                        ]
                      }
                    </button>
                  );
                },
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {activeAssets.map((asset) => (
                <button
                  type="button"
                  key={asset.id}
                  onClick={() =>
                    addDecoration(asset)
                  }
                  className="overflow-hidden rounded-2xl border border-black/10 bg-white text-left transition hover:border-[#6a4433]/50 hover:shadow-sm"
                >
                  <div className="flex aspect-square items-center justify-center bg-[#f5f1ed] p-5">
                    <img
                      src={asset.src}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                      draggable={false}
                    />
                  </div>

                  <div className="p-3">
                    <strong className="block text-sm">
                      {asset.name}
                    </strong>

                    <span className="mt-2 block text-xs font-semibold text-[#7c5645]">
                      Р”РѕР±Р°РІРёС‚СЊ +
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {decorationInstances.length >
              0 && (
              <div className="mt-5 border-t border-black/10 pt-5">
                <div className="flex items-center justify-between">
                  <strong>
                    Р”РѕР±Р°РІР»РµРЅРѕ:{" "}
                    {
                      decorationInstances.length
                    }
                  </strong>

                  <button
                    type="button"
                    onClick={clearDecorations}
                    className="text-sm text-red-700"
                  >
                    РћС‡РёСЃС‚РёС‚СЊ РґРµРєРѕСЂ
                  </button>
                </div>
              </div>
            )}

            {selectedInstance &&
              selectedInstanceAsset && (
                <DecorationControls
                  instance={
                    selectedInstance
                  }
                  asset={
                    selectedInstanceAsset
                  }
                  onChange={
                    updateSelectedDecoration
                  }
                  onRemove={() =>
                    removeDecoration(
                      selectedInstance.instanceId,
                    )
                  }
                />
              )}
          </BuilderSection>

          <BuilderSection
            number="05"
            title="Р”РѕР±Р°РІСЊС‚Рµ РЅР°РґРїРёСЃСЊ"
            description="РќР°РґРїРёСЃСЊ РјРѕР¶РЅРѕ РґРІРёРіР°С‚СЊ, СѓРІРµР»РёС‡РёРІР°С‚СЊ, СѓРјРµРЅСЊС€Р°С‚СЊ Рё РёР·РіРёР±Р°С‚СЊ."
          >
            <InscriptionControls
              inscription={inscription}
              onChange={setInscription}
              onSelect={selectInscription}
            />

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold">
                Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РїРѕР¶РµР»Р°РЅРёСЏ
              </span>

              <textarea
                value={comment}
                rows={5}
                placeholder="РћРїРёС€РёС‚Рµ С‚РµРјР°С‚РёРєСѓ РїСЂР°Р·РґРЅРёРєР°, РѕС‚С‚РµРЅРєРё Рё РґСЂСѓРіРёРµ РґРµС‚Р°Р»Рё."
                onChange={(event) =>
                  setComment(
                    event.target.value,
                  )
                }
                className="w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#6a4433]"
              />
            </label>
          </BuilderSection>

          <section className="rounded-3xl bg-[#432e25] p-6 text-white md:p-8">
            <span className="text-sm text-white/60">
              РџСЂРµРґРІР°СЂРёС‚РµР»СЊРЅР°СЏ СЃС‚РѕРёРјРѕСЃС‚СЊ
            </span>

            <strong className="mt-2 block text-4xl">
              {formatPrice(totalPrice)} в‚ё
            </strong>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">
              РњРµРЅРµРґР¶РµСЂ РїСЂРѕРІРµСЂРёС‚ Р·Р°СЏРІРєСѓ,
              РІС‹Р±СЂР°РЅРЅС‹Р№ РґРµРєРѕСЂ Рё РїРѕРґС‚РІРµСЂРґРёС‚
              РѕРєРѕРЅС‡Р°С‚РµР»СЊРЅСѓСЋ СЃС‚РѕРёРјРѕСЃС‚СЊ.
            </p>

           
   <button
  type="button"
  onClick={() => {
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

    window.location.href = "/checkout";
  }}
  className="mt-6 flex w-full items-center justify-between rounded-full bg-white px-6 py-4 font-semibold text-[#432e25] transition hover:bg-[#f7f2ed]"
>
  РџРµСЂРµР№С‚Рё Рє РѕС„РѕСЂРјР»РµРЅРёСЋ
  <span>в†’</span>
</button>

          </section>
        </div>
      </section>
    </main>
  );
}
