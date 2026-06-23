// @ts-check

import { globalIgnores, defineConfig } from "eslint/config";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-config-prettier/flat";
import ts from "typescript-eslint";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  globalIgnores([
    "**/routeTree.gen.ts",
    "**/_generated/",
    "**/migrations/",
    "**/.tanstack/",
    "**/.turbo/",
    "**/dist/",
  ]),
  js.configs.recommended,
  ts.configs.recommendedTypeChecked,
  perfectionist.configs["recommended-line-length"],
  {
    rules: {
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      // Disable sorting with perfectionist for certain cases
      "perfectionist/sort-object-types": "off",
      "perfectionist/sort-interfaces": "off",
      "perfectionist/sort-objects": "off",
      "perfectionist/sort-classes": "off",
      "perfectionist/sort-modules": "off",
      // Turn on curly rule from @eslint/js
      curly: "error",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.bunBuiltin,
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
      },
    },
  },
  prettier,
]);
