<template>
  <BaseModal
    :show="show"
    :title="t('lessons.math.title')"
    size="lg"
    max-height="85vh"
    @update:show="$emit('update:show', $event)"
  >
    <div class="space-y-6">
      <!-- Quick symbols -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 mb-3">{{ t('lessons.math.quickSymbols') }}</h4>
        <div class="grid grid-cols-8 sm:grid-cols-10 gap-2">
          <button
            v-for="symbol in commonSymbols"
            :key="symbol.latex"
            type="button"
            class="p-2 text-center border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors font-serif"
            @click="insertSymbol(symbol.latex)"
            :title="symbol.label"
          >
            <span v-if="katexLoaded" v-html="renderSymbol(symbol.latex)"></span>
            <span v-else class="text-xs">{{ symbol.label }}</span>
          </button>
        </div>
      </div>

      <!-- Category tabs -->
      <div>
        <div class="flex flex-wrap gap-2 mb-3">
          <button
            v-for="(label, key) in categoryLabels"
            :key="key"
            type="button"
            class="px-3 py-1 text-xs rounded-full transition-colors"
            :class="activeCategory === key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            @click="activeCategory = key"
          >
            {{ label }}
          </button>
        </div>
        <div class="grid grid-cols-6 sm:grid-cols-8 gap-2 p-3 bg-gray-50 rounded-lg">
          <button
            v-for="symbol in categorizedSymbols[activeCategory] || []"
            :key="symbol.latex"
            type="button"
            class="p-2 text-center border border-gray-200 bg-white rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors font-serif"
            @click="insertSymbol(symbol.latex)"
            :title="symbol.label"
          >
            <span v-if="katexLoaded" v-html="renderSymbol(symbol.latex)"></span>
            <span v-else class="text-xs">{{ symbol.label }}</span>
          </button>
        </div>
      </div>

      <!-- LaTeX input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.math.latexInput') }}
        </label>
        <textarea
          ref="latexInput"
          v-model="formula"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          :placeholder="t('lessons.math.latexPlaceholder')"
          @input="validateAndRender"
        ></textarea>
        <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
      </div>

      <!-- Preview -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.math.preview') }}
        </label>
        <div
          class="min-h-[80px] p-4 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200"
          :class="{ 'border-red-300 bg-red-50': !isValid && formula }"
        >
          <div
            v-if="formula && isValid && previewHtml"
            v-html="previewHtml"
            class="text-2xl"
          ></div>
          <span v-else-if="!formula" class="text-gray-400">
            {{ t('lessons.math.previewPlaceholder') }}
          </span>
          <span v-else class="text-red-500">
            {{ t('lessons.math.invalidFormula') }}
          </span>
        </div>
      </div>

      <!-- Help accordion -->
      <details class="bg-gray-50 rounded-lg">
        <summary class="px-4 py-3 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
          {{ t('lessons.math.help') }}
        </summary>
        <div class="px-4 pb-4 text-sm text-gray-600 space-y-2">
          <p><code class="bg-gray-200 px-1 rounded">\frac{a}{b}</code> - Kasr (a/b)</p>
          <p><code class="bg-gray-200 px-1 rounded">x^{2}</code> - Daraja (x^2)</p>
          <p><code class="bg-gray-200 px-1 rounded">x_{n}</code> - Indeks (x_n)</p>
          <p><code class="bg-gray-200 px-1 rounded">\sqrt{x}</code> - Ildiz</p>
          <p><code class="bg-gray-200 px-1 rounded">\sum_{i=1}^{n}</code> - Yig'indi</p>
          <p><code class="bg-gray-200 px-1 rounded">\int_{a}^{b}</code> - Integral</p>
          <p><code class="bg-gray-200 px-1 rounded">\alpha, \beta, \gamma</code> - Grek harflari</p>
        </div>
      </details>
    </div>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        @click="$emit('update:show', false)"
      >
        {{ t('common.actions.cancel') }}
      </button>
      <button
        type="button"
        class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!formula || !isValid"
        @click="insertFormula"
      >
        {{ t('lessons.math.insert') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseModal from '@/components/common/BaseModal.vue';
import { useMathEditor } from '@/composables/useMathEditor';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  initialValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:show', 'insert']);

const { t } = useI18n();
const latexInput = ref(null);

const {
  formula,
  isValid,
  errorMessage,
  katexLoaded,
  quickSymbols,
  categories: categorizedSymbols,
  categoryLabels,
  loadKatex,
  renderFormula,
  insertSymbol: baseInsertSymbol
} = useMathEditor();

const activeCategory = ref('greek');
const previewHtml = ref('');

// Common symbols for quick access
const commonSymbols = computed(() => [
  { label: 'a/b', latex: '\\frac{a}{b}' },
  { label: 'x^2', latex: 'x^{2}' },
  { label: 'sqrt', latex: '\\sqrt{x}' },
  { label: 'sum', latex: '\\sum' },
  { label: 'int', latex: '\\int' },
  { label: 'pi', latex: '\\pi' },
  { label: 'inf', latex: '\\infty' },
  { label: '<=', latex: '\\leq' },
  { label: '>=', latex: '\\geq' },
  { label: '!=', latex: '\\neq' }
]);

// Render a single symbol for display
const renderSymbol = (latex) => {
  const result = renderFormula(latex, false);
  return result.html || latex;
};

// Insert symbol at cursor
const insertSymbol = (latex) => {
  baseInsertSymbol(latex, latexInput.value);
  validateAndRender();
};

// Validate and render preview
const validateAndRender = () => {
  if (!formula.value) {
    previewHtml.value = '';
    return;
  }
  const result = renderFormula(formula.value, true);
  previewHtml.value = result.html;
};

// Insert final formula
const insertFormula = () => {
  if (formula.value && isValid.value) {
    const result = renderFormula(formula.value, true);
    emit('insert', {
      latex: formula.value,
      html: result.html
    });
    formula.value = '';
    previewHtml.value = '';
    emit('update:show', false);
  }
};

// Watch for show changes
watch(() => props.show, (newVal) => {
  if (newVal) {
    formula.value = props.initialValue;
    if (formula.value) {
      validateAndRender();
    }
  }
});

onMounted(() => {
  loadKatex();
});
</script>
