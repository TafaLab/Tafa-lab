import { BUILDER_CANVAS_SIZE } from "./assets";

export function formatPrice(value: number) {
  return value.toLocaleString("ru-RU");
}

export function createInstanceId(assetId: string) {
  if (
    typeof window !== "undefined" &&
    typeof window.crypto?.randomUUID === "function"
  ) {
    return `${assetId}-${window.crypto.randomUUID()}`;
  }

  return `${assetId}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

export function canvasPercent(value: number) {
  return `${(value / BUILDER_CANVAS_SIZE) * 100}%`;
}

export function clamp(
  value: number,
  minimum: number,
  maximum: number,
) {
  return Math.max(minimum, Math.min(maximum, value));
}