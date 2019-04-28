module.exports = {
  parserOptions: {
    ecmaVersion: "6",
    sourceType: "module"
  },
  env: {
    node: true,
    es6: true
  },
  // extends: "standard",
  extends: "eslint:recommended",
  // plugins: ["react"],
  rules: {
    "no-multiple-empty-lines": "warn",
    "no-var": "error",
    "prefer-const": "error",
    "no-console": "off"
  }
};
