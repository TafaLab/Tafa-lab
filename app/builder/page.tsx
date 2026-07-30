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

import { formatPrice } from "@/lib/cake-builder/utils";

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

    window.location.href = "/checkout";
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-[#f7f3ef] text-[#342923]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 md:gap-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6a4433] text-xs font-semibold text-white md:h-11 md:w-11 md:text-sm">
              MC
            </span>

            <span className="truncate text-lg md:text-xl">
              Milky <strong>Cake</strong>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm lg:flex">
            <Link href="/cakes">
              Торты
            </Link>

            <Link
              href="/builder"
              className="font-semibold"
            >
              Конструктор
            </Link>

            <Link href="/food">
              Еда и десерты
            </Link>

            <Link href="/gallery">
              Галерея
            </Link>

            <Link href="/contacts">
              Контакты
            </Link>
          </nav>

          <Link
            href="/"
            className="shrink-0 rounded-full border border-black/15 px-4 py-2 text-xs md:px-5 md:text-sm"
          >
            На главную
          </Link>
        </div>
      </header>

      <section className="border-b border-black/10 bg-[#efe3da]">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 md:px-8 md:py-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-8 lg:py-12">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b6250] md:text-xs md:tracking-[0.22em]">
              Конструктор Milky Cake
            </span>

            <h1 className="mt-3 max-w-3xl text-[30px] font-semibold leading-[1.08] md:mt-4 md:text-6xl md:leading-tight">
              Соберите торт,
              <br />

              <span className="font-serif italic">
                который придумали вы
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/65 md:mt-5 md:text-base md:leading-7">
              Выберите вес, начинку, цвет
              основы и оформление. Менеджер
              проверит заявку и подтвердит
              итоговую стоимость.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white/65 px-4 py-3 md:gap-4 md:px-5 md:py-4">
            <span className="text-2xl font-semibold text-[#a67b65] md:text-3xl">
              01
            </span>

            <div>
              <strong className="block text-sm md:text-base">
                Создание дизайна
              </strong>

              <small className="text-xs text-black/55 md:text-sm">
                Предварительная версия заказа
              </small>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-10 pt-0 md:gap-8 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.85fr)]">
        <div className="sticky top-0 z-40 -mx-4 self-start border-b border-black/10 bg-[#f7f3ef]/95 px-2 py-2 shadow-[0_8px_20px_rgba(54,41,34,0.08)] backdrop-blur-md md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none lg:sticky lg:top-6">
          <div className="rounded-2xl bg-white p-2 shadow-sm md:rounded-3xl md:p-6">
            <div className="mb-2 flex items-center justify-between gap-2 md:mb-5 md:items-end md:gap-4">
              <div className="min-w-0">
                <span className="hidden text-xs uppercase tracking-[0.18em] text-black/45 md:block">
                  Предварительный вид
                </span>

                <h2 className="truncate text-base font-semibold md:mt-1 md:text-2xl">
                  Ваш торт
                </h2>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
                <button
                  type="button"
                  onClick={undo}
                  disabled={!canUndo}
                  title="Отменить — Ctrl+Z"
                  aria-label="Отменить последнее действие"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-base transition hover:border-[#6a4433]/35 disabled:cursor-not-allowed disabled:opacity-35 md:h-10 md:w-10 md:text-lg"
                >
                  ↶
                </button>

                <button
                  type="button"
                  onClick={redo}
                  disabled={!canRedo}
                  title="Повторить — Ctrl+Shift+Z или Ctrl+Y"
                  aria-label="Повторить последнее действие"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-base transition hover:border-[#6a4433]/35 disabled:cursor-not-allowed disabled:opacity-35 md:h-10 md:w-10 md:text-lg"
                >
                  ↷
                </button>

                <span className="rounded-full bg-[#f2e8e1] px-3 py-2 text-xs font-semibold md:px-4 md:text-sm">
                  {selectedWeight?.label}
                </span>
              </div>
            </div>

            <div className="mx-auto w-[min(68vw,270px)] md:w-full">
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
            </div>

            <div className="hidden md:block">
              <div className="mt-4 rounded-2xl border border-[#6a4433]/15 bg-[#f8f0eb] px-4 py-3">
                <p className="text-sm leading-6 text-black/60">
                  Декор можно двигать,
                  масштабировать и вращать.
                  Направляющие помогают
                  выравнивать элементы. Ctrl+Z
                  отменяет действие, Ctrl+D
                  дублирует выбранный декор.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
                <PreviewValue
                  label="Форма"
                  value="Круглая"
                />

                <PreviewValue
                  label="Вес"
                  value={
                    selectedWeight?.label ??
                    "—"
                  }
                />

                <PreviewValue
                  label="Начинка"
                  value={
                    selectedFilling?.label ??
                    "—"
                  }
                />

                <PreviewValue
                  label="Цвет"
                  value={selectedBase.name}
                />

                <PreviewValue
                  label="Цена"
                  value={`${formatPrice(
                    totalPrice,
                  )} ₸`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-5 pt-1 md:space-y-6 md:pt-0">
          <BuilderSection
            number="01"
            title="Выберите вес"
            description="Обычно рассчитывают 150–200 граммов на одного гостя."
          >
            <div className="grid grid-cols-2 gap-3">
              {weights.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  onClick={() =>
                    setWeight(item.value)
                  }
                  className={`min-w-0 rounded-2xl border p-4 text-left transition ${
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
                    ₸
                  </span>
                </button>
              ))}
            </div>
          </BuilderSection>

          <BuilderSection
            number="02"
            title="Выберите начинку"
            description="Начинки, которые готовит Milky Cake."
          >
            <div className="space-y-3">
              {fillings.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  onClick={() =>
                    setFilling(item.value)
                  }
                  className={`flex w-full min-w-0 items-start justify-between gap-3 rounded-2xl border p-4 text-left transition ${
                    filling === item.value
                      ? "border-[#6a4433] bg-[#f4e9e2]"
                      : "border-black/10 bg-white hover:border-black/25"
                  }`}
                >
                  <div className="min-w-0">
                    <strong className="block">
                      {item.label}
                    </strong>

                    <span className="mt-1 block text-sm leading-6 text-black/55">
                      {item.description}
                    </span>
                  </div>

                  <small className="shrink-0 font-semibold text-[#7c5645]">
                    {item.price === 0
                      ? "Включено"
                      : `+${formatPrice(
                          item.price,
                        )} ₸`}
                  </small>
                </button>
              ))}
            </div>
          </BuilderSection>

          <BuilderSection
            number="03"
            title="Выберите цвет"
            description="Выберите цвет покрытия торта."
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cakeBases.map((base) => (
                <button
                  type="button"
                  key={base.id}
                  onClick={() =>
                    setBaseId(base.id)
                  }
                  className={`min-w-0 overflow-hidden rounded-2xl border bg-white text-left transition ${
                    baseId === base.id
                      ? "border-[#6a4433] ring-2 ring-[#6a4433]/15"
                      : "border-black/10 hover:border-black/25"
                  }`}
                >
                  <div className="aspect-square bg-[#f5f1ed]">
                    <img
                      src={base.src}
                      alt={base.name}
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
            title="Добавьте декор"
            description="Декор можно двигать, поворачивать и зеркально отражать."
          >
            <div className="flex max-w-full gap-2 overflow-x-auto pb-2">
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
                  className="min-w-0 overflow-hidden rounded-2xl border border-black/10 bg-white text-left transition hover:border-[#6a4433]/50 hover:shadow-sm"
                >
                  <div className="flex aspect-square items-center justify-center bg-[#f5f1ed] p-5">
                    <img
                      src={asset.src}
                      alt={asset.name}
                      className="max-h-full max-w-full object-contain"
                      draggable={false}
                    />
                  </div>

                  <div className="p-3">
                    <strong className="block text-sm">
                      {asset.name}
                    </strong>

                    <span className="mt-2 block text-xs font-semibold text-[#7c5645]">
                      Добавить +
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {decorationInstances.length >
              0 && (
              <div className="mt-5 border-t border-black/10 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <strong>
                    Добавлено:{" "}
                    {
                      decorationInstances.length
                    }
                  </strong>

                  <button
                    type="button"
                    onClick={clearDecorations}
                    className="shrink-0 text-sm text-red-700"
                  >
                    Очистить декор
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
            title="Добавьте надпись"
            description="Надпись можно двигать, увеличивать, уменьшать и изгибать."
          >
            <InscriptionControls
              inscription={inscription}
              onChange={setInscription}
              onSelect={selectInscription}
            />

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold">
                Дополнительные пожелания
              </span>

              <textarea
                value={comment}
                rows={5}
                placeholder="Опишите тематику праздника, оттенки и другие детали."
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
              Предварительная стоимость
            </span>

            <strong className="mt-2 block text-4xl">
              {formatPrice(totalPrice)} ₸
            </strong>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">
              Менеджер проверит заявку,
              выбранный декор и подтвердит
              окончательную стоимость.
            </p>

            <button
              type="button"
              onClick={goToCheckout}
              className="mt-6 flex w-full items-center justify-between rounded-full bg-white px-6 py-4 font-semibold text-[#432e25] transition hover:bg-[#f7f2ed]"
            >
              Перейти к оформлению
              <span aria-hidden="true">
                →
              </span>
            </button>
          </section>
        </div>
      </section>
    </main>
  );
}