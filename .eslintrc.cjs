function resolveOptionalConfig(name) {
  try {
    require.resolve(name, { paths: [__dirname] });
    return name;
  } catch (error) {
    console.warn(`Optional ESLint config "${name}" is not installed. Skipping extend.`);
    return null;
  }
}

const optionalExtends = resolveOptionalConfig('eslint-config-prettier');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', optionalExtends].filter(Boolean),
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'no-eval': 'error',
    'vue/no-v-html': 'error'
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: {
        jest: true
      }
    }
  ]
};
