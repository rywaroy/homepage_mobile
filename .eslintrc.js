module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    'airbnb-base'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  // add your custom rules here
  rules: {
    'arrow-parens': 0,
    'prefer-destructuring': 0,
    'max-len': 0,
    'no-unreachable': 0,
    'no-else-return': 0,
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0,
    'no-mixed-operators': 0,
    'no-unused-expressions': 0,
    'prefer-spread': 0,
    'no-param-reassign': 0,
    'no-unneeded-ternary': 0,
    'no-plusplus': 0,
    'no-shadow': 0,
    'import/prefer-default-export': 0,
    'prefer-rest-params': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
  }
}
