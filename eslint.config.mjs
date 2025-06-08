import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            Atomics: "readonly",
            SharedArrayBuffer: "readonly",
        },

        parser: tsParser,
        ecmaVersion: 2018,
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",

            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    rules: {
        "@typescript-eslint/array-type": "off",

        "@typescript-eslint/explicit-function-return-type": ["warn", {
            allowExpressions: false,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
        }],

        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/indent": "off",

        "@typescript-eslint/no-inferrable-types": ["error", {
            ignoreParameters: true,
        }],

        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/no-non-null-assertion": "off",

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
        }],

        "@typescript-eslint/no-use-before-define": ["error", {
            functions: false,
            typedefs: false,
        }],

        semi: "off",
        "@typescript-eslint/semi": "off",
    },
}]);