module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "@vue/typescript",
    "plugin:vue/strongly-recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/vue"
  ],
  "rules": {
    "prettier/prettier": "error"
  }
}