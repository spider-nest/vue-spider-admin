const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-use-before-define": "off",
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/prop-name-casing": ["error", "camelCase"],
    "vue/attribute-hyphenation": [
      "error",
      "never",
      {
        ignore: [],
      },
    ],
    "vue/require-default-prop": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^h$",
        varsIgnorePattern: "^h$",
      },
    ],
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-ts-comment": "off",
  },
});
