"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { DecorationInstance } from "@/lib/cake-builder/types";

type DecorationUpdate =
  | DecorationInstance[]
  | ((
      current: DecorationInstance[],
    ) => DecorationInstance[]);

type UseBuilderHistoryOptions = {
  initialDecorations?: DecorationInstance[];
  onRestore?: () => void;
  historyLimit?: number;
  coalesceDelay?: number;
};

export function useBuilderHistory({
  initialDecorations = [],
  onRestore,
  historyLimit = 50,
  coalesceDelay = 500,
}: UseBuilderHistoryOptions = {}) {
  const [
    decorationInstances,
    setDecorationInstances,
  ] = useState<DecorationInstance[]>(
    initialDecorations,
  );

  const decorationInstancesRef =
    useRef<DecorationInstance[]>(
      cloneDecorations(initialDecorations),
    );

  const historyPastRef =
    useRef<DecorationInstance[][]>([]);

  const historyFutureRef =
    useRef<DecorationInstance[][]>([]);

  const interactionStartSnapshotRef =
    useRef<DecorationInstance[] | null>(
      null,
    );

  const lastCoalescedChangeRef = useRef<{
    key: string;
    time: number;
  } | null>(null);

  const onRestoreRef = useRef(onRestore);

  const [, setHistoryVersion] =
    useState(0);

  useEffect(() => {
    onRestoreRef.current = onRestore;
  }, [onRestore]);

  useEffect(() => {
    decorationInstancesRef.current =
      decorationInstances;
  }, [decorationInstances]);

  const refreshHistoryState =
    useCallback(() => {
      setHistoryVersion(
        (current) => current + 1,
      );
    }, []);

  const setDecorationsWithoutHistory =
    useCallback(
      (next: DecorationInstance[]) => {
        decorationInstancesRef.current =
          next;

        setDecorationInstances(next);
      },
      [],
    );

  const rememberSnapshot = useCallback(
    (snapshot: DecorationInstance[]) => {
      historyPastRef.current = [
        ...historyPastRef.current.slice(
          -(historyLimit - 1),
        ),
        cloneDecorations(snapshot),
      ];

      historyFutureRef.current = [];

      refreshHistoryState();
    },
    [
      historyLimit,
      refreshHistoryState,
    ],
  );

  const commitDecorations = useCallback(
    (
      update: DecorationUpdate,
      coalesceKey?: string,
    ) => {
      const current =
        decorationInstancesRef.current;

      const next =
        typeof update === "function"
          ? update(current)
          : update;

      if (
        decorationsAreEqual(current, next)
      ) {
        return;
      }

      const now = Date.now();

      const lastChange =
        lastCoalescedChangeRef.current;

      const shouldRememberSnapshot =
        !coalesceKey ||
        !lastChange ||
        lastChange.key !== coalesceKey ||
        now - lastChange.time >
          coalesceDelay;

      if (shouldRememberSnapshot) {
        rememberSnapshot(current);
      }

      lastCoalescedChangeRef.current =
        coalesceKey
          ? {
              key: coalesceKey,
              time: now,
            }
          : null;

      setDecorationsWithoutHistory(next);
    },
    [
      coalesceDelay,
      rememberSnapshot,
      setDecorationsWithoutHistory,
    ],
  );

  const undo = useCallback(() => {
    const previous =
      historyPastRef.current.at(-1);

    if (!previous) {
      return;
    }

    historyPastRef.current =
      historyPastRef.current.slice(0, -1);

    historyFutureRef.current = [
      cloneDecorations(
        decorationInstancesRef.current,
      ),
      ...historyFutureRef.current,
    ].slice(0, historyLimit);

    lastCoalescedChangeRef.current = null;

    setDecorationsWithoutHistory(
      cloneDecorations(previous),
    );

    onRestoreRef.current?.();

    refreshHistoryState();
  }, [
    historyLimit,
    refreshHistoryState,
    setDecorationsWithoutHistory,
  ]);

  const redo = useCallback(() => {
    const next =
      historyFutureRef.current[0];

    if (!next) {
      return;
    }

    historyFutureRef.current =
      historyFutureRef.current.slice(1);

    historyPastRef.current = [
      ...historyPastRef.current.slice(
        -(historyLimit - 1),
      ),
      cloneDecorations(
        decorationInstancesRef.current,
      ),
    ];

    lastCoalescedChangeRef.current = null;

    setDecorationsWithoutHistory(
      cloneDecorations(next),
    );

    onRestoreRef.current?.();

    refreshHistoryState();
  }, [
    historyLimit,
    refreshHistoryState,
    setDecorationsWithoutHistory,
  ]);

  const beginInteraction =
    useCallback(() => {
      interactionStartSnapshotRef.current =
        cloneDecorations(
          decorationInstancesRef.current,
        );
    }, []);

  const updateDuringInteraction =
    useCallback(
      (next: DecorationInstance[]) => {
        setDecorationsWithoutHistory(next);
      },
      [setDecorationsWithoutHistory],
    );

  const finishInteraction =
    useCallback(() => {
      const startSnapshot =
        interactionStartSnapshotRef.current;

      interactionStartSnapshotRef.current =
        null;

      if (
        !startSnapshot ||
        decorationsAreEqual(
          startSnapshot,
          decorationInstancesRef.current,
        )
      ) {
        return;
      }

      rememberSnapshot(startSnapshot);

      lastCoalescedChangeRef.current = null;
    }, [rememberSnapshot]);

  const resetHistory = useCallback(() => {
    historyPastRef.current = [];
    historyFutureRef.current = [];

    interactionStartSnapshotRef.current =
      null;

    lastCoalescedChangeRef.current = null;

    refreshHistoryState();
  }, [refreshHistoryState]);

  const canUndo =
    historyPastRef.current.length > 0;

  const canRedo =
    historyFutureRef.current.length > 0;

  return {
    decorationInstances,
    decorationInstancesRef,

    commitDecorations,
    setDecorationsWithoutHistory,

    undo,
    redo,
    canUndo,
    canRedo,

    beginInteraction,
    updateDuringInteraction,
    finishInteraction,

    resetHistory,
  };
}

function cloneDecorations(
  instances: DecorationInstance[],
): DecorationInstance[] {
  return instances.map((instance) => ({
    ...instance,
  }));
}

function decorationsAreEqual(
  first: DecorationInstance[],
  second: DecorationInstance[],
): boolean {
  return (
    JSON.stringify(first) ===
    JSON.stringify(second)
  );
}