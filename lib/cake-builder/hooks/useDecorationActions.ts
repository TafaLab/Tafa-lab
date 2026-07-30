"use client";

import { useCallback } from "react";

import {
  BUILDER_CANVAS_SIZE,
  getDecorationAsset,
  type DecorationAsset,
} from "@/lib/cake-builder/assets";

import type { DecorationInstance } from "@/lib/cake-builder/types";

import { createInstanceId } from "@/lib/cake-builder/utils";

type DecorationUpdate =
  | DecorationInstance[]
  | ((
      current: DecorationInstance[],
    ) => DecorationInstance[]);

type CommitDecorations = (
  update: DecorationUpdate,
  coalesceKey?: string,
) => void;

type DecorationInstancesRef = {
  current: DecorationInstance[];
};

type UseDecorationActionsOptions = {
  decorationInstancesRef: DecorationInstancesRef;
  selectedInstanceId: string | null;
  commitDecorations: CommitDecorations;
  selectDecoration: (
    instanceId: string,
  ) => void;
  clearDecorationSelection: () => void;
};

type SelectedDecorationChanges =
  Partial<
    Pick<
      DecorationInstance,
      | "x"
      | "y"
      | "rotation"
      | "width"
      | "flipX"
      | "flipY"
    >
  >;

function normalizeRotation(
  rotation: number,
): number {
  return (
    ((rotation % 360) + 360) % 360
  );
}

export function useDecorationActions({
  decorationInstancesRef,
  selectedInstanceId,
  commitDecorations,
  selectDecoration,
  clearDecorationSelection,
}: UseDecorationActionsOptions) {
  const addDecoration = useCallback(
    (asset: DecorationAsset) => {
      const sameAssetCount =
        decorationInstancesRef.current.filter(
          (instance) =>
            instance.assetId === asset.id,
        ).length;

      const offset = Math.min(
        sameAssetCount * 24,
        120,
      );

      const instance: DecorationInstance = {
        instanceId: createInstanceId(
          asset.id,
        ),
        assetId: asset.id,

        x: Math.min(
          asset.defaultX + offset,
          BUILDER_CANVAS_SIZE - 80,
        ),

        y: Math.min(
          asset.defaultY + offset / 3,
          BUILDER_CANVAS_SIZE - 80,
        ),

        width: asset.defaultWidth,
        rotation: asset.defaultRotation,
        flipX: false,
        flipY: false,
      };

      commitDecorations((current) => [
        ...current,
        instance,
      ]);

      selectDecoration(instance.instanceId);
    },
    [
      commitDecorations,
      decorationInstancesRef,
      selectDecoration,
    ],
  );

  const updateSelectedDecoration =
    useCallback(
      (
        changes: SelectedDecorationChanges,
      ) => {
        if (!selectedInstanceId) {
          return;
        }

        commitDecorations(
          (current) =>
            current.map((instance) =>
              instance.instanceId ===
              selectedInstanceId
                ? {
                    ...instance,
                    ...changes,
                  }
                : instance,
            ),
          `controls:${selectedInstanceId}`,
        );
      },
      [
        commitDecorations,
        selectedInstanceId,
      ],
    );

  const removeDecoration = useCallback(
    (instanceId: string) => {
      commitDecorations((current) =>
        current.filter(
          (instance) =>
            instance.instanceId !==
            instanceId,
        ),
      );

      if (
        selectedInstanceId === instanceId
      ) {
        clearDecorationSelection();
      }
    },
    [
      clearDecorationSelection,
      commitDecorations,
      selectedInstanceId,
    ],
  );

  const duplicateDecoration =
    useCallback(
      (instanceId: string) => {
        const source =
          decorationInstancesRef.current.find(
            (instance) =>
              instance.instanceId ===
              instanceId,
          );

        if (!source) {
          return;
        }

        const duplicate: DecorationInstance =
          {
            ...source,

            instanceId: createInstanceId(
              source.assetId,
            ),

            x: Math.round(
              Math.min(
                source.x + 35,
                BUILDER_CANVAS_SIZE -
                  source.width / 2,
              ),
            ),

            y: Math.round(
              Math.min(
                source.y + 35,
                BUILDER_CANVAS_SIZE - 60,
              ),
            ),
          };

        commitDecorations((current) => [
          ...current,
          duplicate,
        ]);

        selectDecoration(
          duplicate.instanceId,
        );
      },
      [
        commitDecorations,
        decorationInstancesRef,
        selectDecoration,
      ],
    );

  const rotateDecoration = useCallback(
    (instanceId: string) => {
      commitDecorations((current) =>
        current.map((instance) =>
          instance.instanceId === instanceId
            ? {
                ...instance,

                rotation:
                  normalizeRotation(
                    instance.rotation + 15,
                  ),
              }
            : instance,
        ),
      );
    },
    [commitDecorations],
  );

  const resetDecorationRotation =
    useCallback(
      (instanceId: string) => {
        commitDecorations((current) =>
          current.map((instance) =>
            instance.instanceId ===
            instanceId
              ? {
                  ...instance,
                  rotation: 0,
                }
              : instance,
          ),
        );
      },
      [commitDecorations],
    );

  const flipDecorationHorizontal =
    useCallback(
      (instanceId: string) => {
        commitDecorations((current) =>
          current.map((instance) =>
            instance.instanceId ===
            instanceId
              ? {
                  ...instance,
                  flipX: !instance.flipX,
                }
              : instance,
          ),
        );
      },
      [commitDecorations],
    );

  const flipDecorationVertical =
    useCallback(
      (instanceId: string) => {
        commitDecorations((current) =>
          current.map((instance) =>
            instance.instanceId ===
            instanceId
              ? {
                  ...instance,
                  flipY: !instance.flipY,
                }
              : instance,
          ),
        );
      },
      [commitDecorations],
    );

  const resetDecorationTransform =
    useCallback(
      (instanceId: string) => {
        commitDecorations((current) =>
          current.map((instance) => {
            if (
              instance.instanceId !==
              instanceId
            ) {
              return instance;
            }

            const asset =
              getDecorationAsset(
                instance.assetId,
              );

            if (!asset) {
              return instance;
            }

            return {
              ...instance,
              x: asset.defaultX,
              y: asset.defaultY,
              width: asset.defaultWidth,
              rotation:
                asset.defaultRotation,
              flipX: false,
              flipY: false,
            };
          }),
        );
      },
      [commitDecorations],
    );

  const bringDecorationForward =
    useCallback(
      (instanceId: string) => {
        commitDecorations((current) => {
          const index =
            current.findIndex(
              (instance) =>
                instance.instanceId ===
                instanceId,
            );

          if (
            index < 0 ||
            index >= current.length - 1
          ) {
            return current;
          }

          const next = [...current];

          [
            next[index],
            next[index + 1],
          ] = [
            next[index + 1],
            next[index],
          ];

          return next;
        });
      },
      [commitDecorations],
    );

  const sendDecorationBackward =
    useCallback(
      (instanceId: string) => {
        commitDecorations((current) => {
          const index =
            current.findIndex(
              (instance) =>
                instance.instanceId ===
                instanceId,
            );

          if (index <= 0) {
            return current;
          }

          const next = [...current];

          [
            next[index],
            next[index - 1],
          ] = [
            next[index - 1],
            next[index],
          ];

          return next;
        });
      },
      [commitDecorations],
    );

  const bringDecorationToFront =
    useCallback(
      (instanceId: string) => {
        commitDecorations((current) => {
          const index =
            current.findIndex(
              (instance) =>
                instance.instanceId ===
                instanceId,
            );

          if (
            index < 0 ||
            index === current.length - 1
          ) {
            return current;
          }

          const next = [...current];

          const [instance] =
            next.splice(index, 1);

          if (!instance) {
            return current;
          }

          next.push(instance);

          return next;
        });
      },
      [commitDecorations],
    );

  const sendDecorationToBack =
    useCallback(
      (instanceId: string) => {
        commitDecorations((current) => {
          const index =
            current.findIndex(
              (instance) =>
                instance.instanceId ===
                instanceId,
            );

          if (index <= 0) {
            return current;
          }

          const next = [...current];

          const [instance] =
            next.splice(index, 1);

          if (!instance) {
            return current;
          }

          next.unshift(instance);

          return next;
        });
      },
      [commitDecorations],
    );

  const clearDecorations =
    useCallback(() => {
      if (
        decorationInstancesRef.current
          .length === 0
      ) {
        return;
      }

      commitDecorations([]);
      clearDecorationSelection();
    }, [
      clearDecorationSelection,
      commitDecorations,
      decorationInstancesRef,
    ]);

  const nudgeSelectedDecoration =
    useCallback(
      (
        direction:
          | "left"
          | "right"
          | "up"
          | "down",
        distance: number,
      ) => {
        if (!selectedInstanceId) {
          return;
        }

        commitDecorations(
          (current) =>
            current.map((instance) => {
              if (
                instance.instanceId !==
                selectedInstanceId
              ) {
                return instance;
              }

              const halfWidth =
                instance.width / 2;

              let nextX = instance.x;
              let nextY = instance.y;

              if (direction === "left") {
                nextX -= distance;
              }

              if (direction === "right") {
                nextX += distance;
              }

              if (direction === "up") {
                nextY -= distance;
              }

              if (direction === "down") {
                nextY += distance;
              }

              return {
                ...instance,

                x: Math.round(
                  Math.max(
                    halfWidth,
                    Math.min(
                      BUILDER_CANVAS_SIZE -
                        halfWidth,
                      nextX,
                    ),
                  ),
                ),

                y: Math.round(
                  Math.max(
                    40,
                    Math.min(
                      BUILDER_CANVAS_SIZE -
                        40,
                      nextY,
                    ),
                  ),
                ),
              };
            }),
          `nudge:${selectedInstanceId}`,
        );
      },
      [
        commitDecorations,
        selectedInstanceId,
      ],
    );

  return {
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
  };
}
