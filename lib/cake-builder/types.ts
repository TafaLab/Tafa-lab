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

export type DecorationInstance = {
  instanceId: string;
  assetId: string;
  x: number;
  y: number;
  /** Размер элемента на холсте конструктора. */
  width: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
};

export type InscriptionFont =
  | "marck"
  | "caveat"
  | "lobster"
  | "cormorant"
  | "playfair"
  | "montserrat";

export type InscriptionSettings = {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  rotation: number;

  /**
   * 0 вЂ” РїСЂСЏРјР°СЏ РЅР°РґРїРёСЃСЊ.
   * РџРѕР»РѕР¶РёС‚РµР»СЊРЅРѕРµ Р·РЅР°С‡РµРЅРёРµ вЂ” РёР·РіРёР± РІРІРµСЂС….
   * РћС‚СЂРёС†Р°С‚РµР»СЊРЅРѕРµ вЂ” РёР·РіРёР± РІРЅРёР·.
   */
  curve: number;

  /**
   * РРЅС‚РµСЂРІР°Р» РјРµР¶РґСѓ Р±СѓРєРІР°РјРё РІ РїРёРєСЃРµР»СЏС….
   */
  letterSpacing: number;

  fontFamily: InscriptionFont;
  fontWeight: number;

  color: string;

  /**
   * РџСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ РѕС‚ 20 РґРѕ 100%.
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

export type CategoryLabels = Record<
  DecorationCategory,
  string
>;

export type CategoryPrices = Record<
  DecorationCategory,
  number
>;
