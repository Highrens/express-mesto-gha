module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: [
        "airbnb-base",
        "eslint-config-airbnb-base",
        "eslint-plugin-import"
    ],
    overrides: [ ],
    parserOptions: {
        "ecmaVersion": "latest"
    },
    rules: {
      "no-underscore-dangle": ["error", {allow: [ '_id']}]
    }

}
