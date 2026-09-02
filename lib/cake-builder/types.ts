import type { DecorationCategory } from "./assets";

export type Filling =
  | "snickers"
  | "whoopie-pie"
  | "honey"
  | "chocolate-banana"
  | "pistachio"
  | "milk-girl"
  | "red-velvet";

export type WeightOption = {
  value: number;
  label: string;
  price: number;
};

export type FillingOption = {
  value: Filling;
  label: string;
  description: string;
  price: number;
};

/**
 * Доступные режимы просмотра торта.
 */
export type CakeView = "front" | "side" | "top";

/**
 * Независимое расположение украшения
 * в отдельном режиме просмотра.
 */
export type DecorationViewTransform = {
  x: number;
  y: number;

  rotation: number;

  flipX: boolean;
  flipY: boolean;
};

export type DecorationInstance = {
  instanceId: string;
  assetId: string;

  /**
   * Координаты украшения во фронтальном виде.
   */
  x: number;
  y: number;

  /**
   * Размер элемента на холсте конструктора.
   *
   * Размер общий для фронтального вида и вида сверху.
   * Он рассчитывается из реального физического размера
   * украшения и не зависит от разрешения PNG.
   */
  width: number;

  /**
   * Поворот украшения во фронтальном виде.
   */
  rotation: number;

  /**
   * Отражение украшения во фронтальном виде.
   */
  flipX: boolean;
  flipY: boolean;

  /** Поверхность, на которой элемент закреплён в 3D-редакторе. */
  surface?: "top" | "side";

  /**
   * Отдельное положение во фронтальном виде.
   * Если его ещё нет, оно автоматически рассчитывается
   * из расположения сверху.
   */
  frontView?: DecorationViewTransform;

  /**
   * Независимое расположение украшения
   * при просмотре торта сверху.
   *
   * Поле необязательное, чтобы уже сохранённые заказы
   * и ранее добавленные украшения продолжали работать.
   *
   * При первом открытии вида сверху программа создаст
   * начальное расположение автоматически.
   */
  topView?: DecorationViewTransform;

  /**
   * Автоматическая глубина погружения элемента
   * с палочкой внутрь торта во фронтальном виде.
   *
   * 0 — палочка полностью видна.
   * 1 — максимальное допустимое погружение.
   *
   * Пользователь не регулирует значение вручную.
   * В режиме просмотра сверху это значение не используется.
   */
  insertDepth?: number;
};

export type InscriptionFont =
  "marck" | "caveat" | "lobster" | "cormorant" | "playfair" | "montserrat";

export type InscriptionSettings = {
  text: string;

  x: number;
  y: number;

  fontSize: number;
  rotation: number;

  /**
   * 0 — прямая надпись.
   * Положительное значение — изгиб вверх.
   * Отрицательное значение — изгиб вниз.
   */
  curve: number;

  /**
   * Интервал между буквами в пикселях.
   */
  letterSpacing: number;

  fontFamily: InscriptionFont;
  fontWeight: number;

  color: string;

  /**
   * Прозрачность от 20 до 100%.
   */
  opacity: number;

  uppercase: boolean;

  outlineColor: string;
  outlineWidth: number;

  shadowEnabled: boolean;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetY: number;
};

export type CategoryLabels = Record<DecorationCategory, string>;

export type CategoryPrices = Record<DecorationCategory, number>;
