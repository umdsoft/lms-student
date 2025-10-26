import('@testing-library/jest-dom')
  .then((mod) => {
    if (mod?.default && typeof mod.default === 'function') {
      mod.default();
    }
  })
  .catch(() => {
    console.warn('Optional dependency @testing-library/jest-dom is not available. Skipping extended matchers.');
    const NodeCtor = typeof globalThis !== 'undefined' && typeof globalThis.Node !== 'undefined' ? globalThis.Node : null;

    expect.extend({
      toBeInTheDocument(received) {
        const isNode = NodeCtor ? received instanceof NodeCtor : Boolean(received?.nodeType === 1);
        const pass = isNode && document.body.contains(received);
        return {
          pass,
          message: () =>
            pass
              ? 'Expected element not to be in the document'
              : 'Expected element to be present in the document'
        };
      },
      toHaveTextContent(received, expected) {
        if (!(NodeCtor ? received instanceof NodeCtor : Boolean(received?.nodeType === 1))) {
          return {
            pass: false,
            message: () => 'Received value is not a DOM node'
          };
        }

        const textContent = received.textContent || '';
        const pass =
          expected instanceof RegExp ? expected.test(textContent) : textContent.includes(String(expected));

        return {
          pass,
          message: () =>
            pass
              ? `Expected element text not to match ${String(expected)}`
              : `Expected element text to match ${String(expected)}, but received "${textContent}"`
        };
      }
    });
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
