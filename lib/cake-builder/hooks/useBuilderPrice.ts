"use client";

import { useMemo } from "react";

import {
  cakeBases,
  getDecorationAsset,
  type DecorationCategory,
} from "@/lib/cake-builder/assets";

import {
  categoryPrices,
  fillings,
  weights,
} from "@/lib/cake-builder/constants";

import type {
  DecorationInstance,
  Filling,
} from "@/lib/cake-builder/types";

type UseBuilderPriceOptions = {
  weight: number;
  filling: Filling;
  baseId: string;
  decorationInstances: DecorationInstance[];
};

export function useBuilderPrice({
  weight,
  filling,
  baseId,
  decorationInstances,
}: UseBuilderPriceOptions) {
  const selectedWeight = useMemo(() => {
    return weights.find(
      (item) => item.value === weight,
    );
  }, [weight]);

  const selectedFilling = useMemo(() => {
    return fillings.find(
      (item) => item.value === filling,
    );
  }, [filling]);

  const selectedBase = useMemo(() => {
    return (
      cakeBases.find(
        (item) => item.id === baseId,
      ) ?? cakeBases[0]
    );
  }, [baseId]);

  const selectedCategories = useMemo(() => {
    const categories =
      new Set<DecorationCategory>();

    for (const instance of
      decorationInstances) {
      const asset = getDecorationAsset(
        instance.assetId,
      );

      if (asset) {
        categories.add(asset.category);
      }
    }

    return [...categories];
  }, [decorationInstances]);

  const decorationPrice = useMemo(() => {
    return selectedCategories.reduce(
      (total, category) =>
        total +
        (categoryPrices[category] ?? 0),
      0,
    );
  }, [selectedCategories]);

  const totalPrice = useMemo(() => {
    const weightPrice =
      selectedWeight?.price ?? 0;

    const fillingPrice =
      selectedFilling?.price ?? 0;

    return (
      weightPrice +
      fillingPrice +
      decorationPrice
    );
  }, [
    decorationPrice,
    selectedFilling,
    selectedWeight,
  ]);

  return {
    selectedWeight,
    selectedFilling,
    selectedBase,
    selectedCategories,
    decorationPrice,
    totalPrice,
  };
}