module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:prettier/recommended', 'plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
    'no-unused-vars': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
