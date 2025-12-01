import { ref, computed, onMounted } from 'vue';

/**
 * Composable for handling mathematical formula editing with KaTeX
 */
export function useMathEditor() {
  const formula = ref('');
  const isValid = ref(true);
  const errorMessage = ref('');
  const katexLoaded = ref(false);

  // Common math symbols and templates
  const quickSymbols = [
    { label: 'a/b', latex: '\\frac{a}{b}', category: 'fraction' },
    { label: 'x^2', latex: 'x^{2}', category: 'power' },
    { label: 'x_n', latex: 'x_{n}', category: 'subscript' },
    { label: '\\sqrt{x}', latex: '\\sqrt{x}', category: 'root' },
    { label: '\\sqrt[n]{x}', latex: '\\sqrt[n]{x}', category: 'root' },
    { label: '\\sum', latex: '\\sum_{i=1}^{n}', category: 'sum' },
    { label: '\\prod', latex: '\\prod_{i=1}^{n}', category: 'product' },
    { label: '\\int', latex: '\\int_{a}^{b}', category: 'integral' },
    { label: '\\lim', latex: '\\lim_{x \\to \\infty}', category: 'limit' },
    { label: '\\infty', latex: '\\infty', category: 'symbol' },
    { label: '\\pi', latex: '\\pi', category: 'greek' },
    { label: '\\alpha', latex: '\\alpha', category: 'greek' },
    { label: '\\beta', latex: '\\beta', category: 'greek' },
    { label: '\\gamma', latex: '\\gamma', category: 'greek' },
    { label: '\\delta', latex: '\\delta', category: 'greek' },
    { label: '\\theta', latex: '\\theta', category: 'greek' },
    { label: '\\lambda', latex: '\\lambda', category: 'greek' },
    { label: '\\mu', latex: '\\mu', category: 'greek' },
    { label: '\\sigma', latex: '\\sigma', category: 'greek' },
    { label: '\\phi', latex: '\\phi', category: 'greek' },
    { label: '\\omega', latex: '\\omega', category: 'greek' },
    { label: '\\leq', latex: '\\leq', category: 'relation' },
    { label: '\\geq', latex: '\\geq', category: 'relation' },
    { label: '\\neq', latex: '\\neq', category: 'relation' },
    { label: '\\approx', latex: '\\approx', category: 'relation' },
    { label: '\\pm', latex: '\\pm', category: 'operator' },
    { label: '\\times', latex: '\\times', category: 'operator' },
    { label: '\\div', latex: '\\div', category: 'operator' },
    { label: '\\cdot', latex: '\\cdot', category: 'operator' },
    { label: '\\sin', latex: '\\sin', category: 'function' },
    { label: '\\cos', latex: '\\cos', category: 'function' },
    { label: '\\tan', latex: '\\tan', category: 'function' },
    { label: '\\log', latex: '\\log', category: 'function' },
    { label: '\\ln', latex: '\\ln', category: 'function' },
    { label: '()', latex: '\\left( \\right)', category: 'brackets' },
    { label: '[]', latex: '\\left[ \\right]', category: 'brackets' },
    { label: '{}', latex: '\\left\\{ \\right\\}', category: 'brackets' },
    { label: '|x|', latex: '\\left| x \\right|', category: 'brackets' }
  ];

  const categories = computed(() => {
    const cats = {};
    quickSymbols.forEach(s => {
      if (!cats[s.category]) {
        cats[s.category] = [];
      }
      cats[s.category].push(s);
    });
    return cats;
  });

  const categoryLabels = {
    fraction: 'Kasrlar',
    power: 'Darajalar',
    subscript: 'Indekslar',
    root: 'Ildizlar',
    sum: 'Yig\'indi',
    product: 'Ko\'paytma',
    integral: 'Integrallar',
    limit: 'Limitlar',
    symbol: 'Belgilar',
    greek: 'Grek harflari',
    relation: 'Munosabatlar',
    operator: 'Operatorlar',
    function: 'Funksiyalar',
    brackets: 'Qavslar'
  };

  /**
   * Load KaTeX dynamically
   */
  const loadKatex = async () => {
    if (window.katex) {
      katexLoaded.value = true;
      return;
    }

    try {
      // Load KaTeX CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
      document.head.appendChild(link);

      // Load KaTeX JS
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
      script.onload = () => {
        katexLoaded.value = true;
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('Failed to load KaTeX:', error);
    }
  };

  /**
   * Render LaTeX formula to HTML
   */
  const renderFormula = (latex, displayMode = false) => {
    if (!katexLoaded.value || !window.katex) {
      return { html: '', error: 'KaTeX not loaded' };
    }

    try {
      const html = window.katex.renderToString(latex, {
        throwOnError: true,
        displayMode,
        output: 'html'
      });
      isValid.value = true;
      errorMessage.value = '';
      return { html, error: null };
    } catch (error) {
      isValid.value = false;
      errorMessage.value = error.message;
      return { html: '', error: error.message };
    }
  };

  /**
   * Validate formula without rendering
   */
  const validateFormula = (latex) => {
    if (!katexLoaded.value || !window.katex || !latex) {
      return true;
    }

    try {
      window.katex.renderToString(latex, { throwOnError: true });
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Insert symbol at cursor position
   */
  const insertSymbol = (latex, inputElement) => {
    if (!inputElement) {
      formula.value += latex;
      return;
    }

    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;
    const text = formula.value;

    formula.value = text.substring(0, start) + latex + text.substring(end);

    // Set cursor position after inserted text
    setTimeout(() => {
      const newPos = start + latex.length;
      inputElement.setSelectionRange(newPos, newPos);
      inputElement.focus();
    }, 0);
  };

  /**
   * Wrap selected text with latex command
   */
  const wrapSelection = (before, after, inputElement) => {
    if (!inputElement) return;

    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;
    const text = formula.value;
    const selected = text.substring(start, end);

    formula.value = text.substring(0, start) + before + selected + after + text.substring(end);

    setTimeout(() => {
      const newStart = start + before.length;
      const newEnd = newStart + selected.length;
      inputElement.setSelectionRange(newStart, newEnd);
      inputElement.focus();
    }, 0);
  };

  /**
   * Convert inline text to math formula
   */
  const parseInlineFormulas = (text) => {
    // Pattern to match $...$ inline math
    const inlinePattern = /\$([^$]+)\$/g;

    return text.replace(inlinePattern, (match, formula) => {
      const result = renderFormula(formula, false);
      if (result.error) return match;
      return `<span class="math-inline">${result.html}</span>`;
    });
  };

  /**
   * Common LaTeX templates
   */
  const templates = {
    fraction: (num = 'a', den = 'b') => `\\frac{${num}}{${den}}`,
    power: (base = 'x', exp = '2') => `${base}^{${exp}}`,
    subscript: (base = 'x', sub = 'n') => `${base}_{${sub}}`,
    sqrt: (content = 'x') => `\\sqrt{${content}}`,
    nthRoot: (n = 'n', content = 'x') => `\\sqrt[${n}]{${content}}`,
    sum: (from = 'i=1', to = 'n') => `\\sum_{${from}}^{${to}}`,
    integral: (from = 'a', to = 'b') => `\\int_{${from}}^{${to}}`,
    limit: (variable = 'x', to = '\\infty') => `\\lim_{${variable} \\to ${to}}`,
    matrix: (rows = 2, cols = 2) => {
      const elements = Array(rows).fill(null).map(() =>
        Array(cols).fill('0').join(' & ')
      ).join(' \\\\ ');
      return `\\begin{pmatrix} ${elements} \\end{pmatrix}`;
    }
  };

  onMounted(() => {
    loadKatex();
  });

  return {
    // State
    formula,
    isValid,
    errorMessage,
    katexLoaded,

    // Data
    quickSymbols,
    categories,
    categoryLabels,
    templates,

    // Methods
    loadKatex,
    renderFormula,
    validateFormula,
    insertSymbol,
    wrapSelection,
    parseInlineFormulas
  };
}
