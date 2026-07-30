import {
  Caveat,
  Cormorant_Garamond,
  Lobster,
  Marck_Script,
  Montserrat,
  Playfair_Display,
} from "next/font/google";

export const marckScript = Marck_Script({
  weight: "400",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const lobster = Lobster({
  weight: "400",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["cyrillic", "latin"],
  display: "swap",
});