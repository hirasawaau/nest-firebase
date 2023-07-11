module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    curly: "error",
    eqeqeq: "error",
    "max-classes-per-file": ["error", 1],
    "no-console": "error",
    "no-lonely-if": "error",
    "no-negated-condition": "error",
    "no-nested-ternary": "error",
    "no-useless-return": "error",
    "no-warning-comments": "warn",
    "require-await": "error",
    "spaced-comment": "error",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/lines-between-class-members": ["error"],
    "@typescript-eslint/no-magic-numbers": [
      "error",
      {
        ignoreArrayIndexes: true,
        enforceConst: true,
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignore: [-1, 0, 1],
      },
    ],
    "@typescript-eslint/no-unused-vars": ["error"],
  },
  overrides: [
    {
      files: ["*.spec.ts", "test/*", "integration-test/*", "features/**"],
      rules: {
        "@typescript-eslint/no-magic-numbers": ["off"],
      },
    },
  ],
};
