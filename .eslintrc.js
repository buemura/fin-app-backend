module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: "standard-with-typescript",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    project: "tsconfig.json",
  },
  ignorePatterns: ["tests/jest-setup.ts"],
  rules: {
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/return-await": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-dynamic-delete": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-extraneous-class": "off",
  },
};
