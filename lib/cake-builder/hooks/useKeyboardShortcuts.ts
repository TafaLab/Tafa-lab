"use client";

import { useEffect } from "react";

type Direction =
  | "left"
  | "right"
  | "up"
  | "down";

type UseKeyboardShortcutsOptions = {
  selectedInstanceId: string | null;

  undo: () => void;
  redo: () => void;

  clearSelection: () => void;

  duplicateDecoration: (
    instanceId: string,
  ) => void;

  removeDecoration: (
    instanceId: string,
  ) => void;

  nudgeSelectedDecoration: (
    direction: Direction,
    distance: number,
  ) => void;
};

function isEditableTarget(
  target: EventTarget | null,
): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
}

function getDirection(
  key: string,
): Direction | null {
  if (key === "ArrowLeft") {
    return "left";
  }

  if (key === "ArrowRight") {
    return "right";
  }

  if (key === "ArrowUp") {
    return "up";
  }

  if (key === "ArrowDown") {
    return "down";
  }

  return null;
}

export function useKeyboardShortcuts({
  selectedInstanceId,
  undo,
  redo,
  clearSelection,
  duplicateDecoration,
  removeDecoration,
  nudgeSelectedDecoration,
}: UseKeyboardShortcutsOptions): void {
  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (isEditableTarget(event.target)) {
        return;
      }

      const modifier =
        event.ctrlKey || event.metaKey;

      if (
        modifier &&
        event.code === "KeyZ"
      ) {
        event.preventDefault();

        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }

        return;
      }

      if (
        modifier &&
        event.code === "KeyY"
      ) {
        event.preventDefault();
        redo();
        return;
      }

      if (
        modifier &&
        event.code === "KeyD" &&
        selectedInstanceId
      ) {
        event.preventDefault();

        duplicateDecoration(
          selectedInstanceId,
        );

        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        clearSelection();
        return;
      }

      if (
        (event.key === "Delete" ||
          event.key === "Backspace") &&
        selectedInstanceId
      ) {
        event.preventDefault();

        removeDecoration(
          selectedInstanceId,
        );

        return;
      }

      if (!selectedInstanceId) {
        return;
      }

      const direction = getDirection(
        event.key,
      );

      if (!direction) {
        return;
      }

      event.preventDefault();

      const distance = event.shiftKey
        ? 10
        : 1;

      nudgeSelectedDecoration(
        direction,
        distance,
      );
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    clearSelection,
    duplicateDecoration,
    nudgeSelectedDecoration,
    redo,
    removeDecoration,
    selectedInstanceId,
    undo,
  ]);
}