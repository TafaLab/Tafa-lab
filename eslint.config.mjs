import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: [
      "app/\\[locale\\]/builder/page.tsx",
      "app/\\[locale\\]/cakes/\\[slug\\]/page.tsx",
      "app/components/admin/cakes/{CakeTable,ImageUploader}.tsx",
      "app/components/cake-builder/{CakePreview,DecorationLayer}.tsx",
      "app/components/cakes/CakeCard.tsx",
      "app/components/home/{Hero,PopularCakes}.tsx",
    ],
    rules: {
      // These screens render user uploads, blob previews, or precisely positioned
      // configurator assets whose native dimensions and URLs are only known at runtime.
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
