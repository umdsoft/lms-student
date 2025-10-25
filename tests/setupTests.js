import('@testing-library/jest-dom').catch(() => {
  console.warn('Optional dependency @testing-library/jest-dom is not available. Skipping extended matchers.');
});

try {
  const vue = require('vue');
  globalThis.Vue = vue;
  globalThis.VueCompilerDOM = require('@vue/compiler-dom');
  globalThis.VueCompilerSSR = require('@vue/compiler-ssr');
  globalThis.VueRuntimeDOM = vue;
  globalThis.VueServerRenderer = require('@vue/server-renderer');
} catch (error) {
  console.warn('Vue globals were not initialised for tests.');
}
