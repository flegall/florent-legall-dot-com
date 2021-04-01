module.exports = {
  extends: [
    "standard",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/recommended",
    "plugin:promise/recommended",
    "plugin:react/recommended",
  ],
  plugins: ["prettier", "standard", "import", "promise", "react"],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {},
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "prettier/prettier": "error",
    "no-unused-expressions": 0,
    "import/unambiguous": "off",
    "import/no-absolute-path": "error",
    "import/no-dynamic-require": "error",
    "import/no-webpack-loader-syntax": "error",
    "import/no-self-import": "error",
    "import/no-cycle": "error",
    "import/export": "error",
    "import/no-extraneous-dependencies": "off",
    "import/no-mutable-exports": "error",
    "import/no-amd": "error",
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/extensions": "error",
    "import/order": ["error", { "newlines-between": "always" }],
    "import/newline-after-import": "error",
    "import/no-anonymous-default-export": "error",
  },
  globals: {},
  settings: {
    react: {
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
  },
};
