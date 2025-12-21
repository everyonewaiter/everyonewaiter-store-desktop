import tseslint from "@electron-toolkit/eslint-config-ts";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { defineConfig } from "eslint/config";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default defineConfig(
  { ignores: ["**/node_modules", "**/dist", "**/out"] },
  tseslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat["jsx-runtime"],
  ...pluginQuery.configs["flat/recommended"],
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      import: eslintPluginImport,
      "simple-import-sort": simpleImportSort,
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": eslintPluginReactRefresh,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,
      "@typescript-eslint/explicit-function-return-type": "off",

      // Import 관련 규칙들
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",

      // simple-import-sort 설정 (빈 줄 최소화)
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 모든 imports를 하나의 그룹으로 (빈 줄 없음)
            [
              // React 관련
              "^react",
              "^react-dom",
              // Node modules
              "^@?\\w",
              // 내부 절대 경로
              "^@/",
              // 상대 경로
              "^\\.\\.(?!/?$)",
              "^\\.\\./?$",
              "^\\./(?=.*/)(?!/?$)",
              "^\\.(?!/?$)",
              "^\\./?$",
              // Side effects
              "^\\u0000",
            ],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  }
);
