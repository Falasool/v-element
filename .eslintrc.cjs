module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
//   直接用流传的公认规则
  extends: ['standard-with-typescript', 'plugin:vue/vue3-essential'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  // 添加eslint的规则，在文档里找
  rules: {
    // semi: 2,
  },
}
