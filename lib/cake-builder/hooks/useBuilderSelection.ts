"use client";

import {
  useCallback,
  useMemo,
  useState,
} from "react";

import { getDecorationAsset } from "@/lib/cake-builder/assets";

import type { DecorationInstance } from "@/lib/cake-builder/types";

type UseBuilderSelectionOptions = {
  decorationInstances: DecorationInstance[];
};

export function useBuilderSelection({
  decorationInstances,
}: UseBuilderSelectionOptions) {
  const [
    selectedInstanceId,
    setSelectedInstanceId,
  ] = useState<string | null>(null);

  const [
    inscriptionSelected,
    setInscriptionSelected,
  ] = useState(false);

  const selectedInstance = useMemo(() => {
    if (!selectedInstanceId) {
      return undefined;
    }

    return decorationInstances.find(
      (instance) =>
        instance.instanceId ===
        selectedInstanceId,
    );
  }, [
    decorationInstances,
    selectedInstanceId,
  ]);

  const selectedInstanceAsset =
    useMemo(() => {
      if (!selectedInstance) {
        return undefined;
      }

      return getDecorationAsset(
        selectedInstance.assetId,
      );
    }, [selectedInstance]);

  const selectDecoration = useCallback(
    (instanceId: string) => {
      setSelectedInstanceId(instanceId);
      setInscriptionSelected(false);
    },
    [],
  );

  const selectInscription =
    useCallback(() => {
      setInscriptionSelected(true);
      setSelectedInstanceId(null);
    }, []);

  const clearSelection = useCallback(() => {
    setSelectedInstanceId(null);
    setInscriptionSelected(false);
  }, []);

  const clearDecorationSelection =
    useCallback(() => {
      setSelectedInstanceId(null);
    }, []);

  const clearInscriptionSelection =
    useCallback(() => {
      setInscriptionSelected(false);
    }, []);

  const clearSelectionAfterRestore =
    useCallback(() => {
      setSelectedInstanceId(null);
      setInscriptionSelected(false);
    }, []);

  return {
    selectedInstanceId,
    setSelectedInstanceId,

    inscriptionSelected,
    setInscriptionSelected,

    selectedInstance,
    selectedInstanceAsset,

    selectDecoration,
    selectInscription,
    clearSelection,
    clearDecorationSelection,
    clearInscriptionSelection,
    clearSelectionAfterRestore,
  };
}