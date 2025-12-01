<template>
  <BaseModal
    :show="show"
    :title="isEdit ? t('lessons.tests.form.editTitle') : t('lessons.tests.form.createTitle')"
    size="xl"
    max-height="90vh"
    @update:show="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Question -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.tests.form.question') }} *
        </label>
        <RichTextEditor
          ref="questionEditor"
          v-model="form.question"
          :placeholder="t('lessons.tests.form.questionPlaceholder')"
          :show-math-button="true"
          :show-image-button="false"
          min-height="120px"
          @open-math="openMathForQuestion"
        />
      </div>

      <!-- Question image -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.tests.form.questionImage') }}
        </label>
        <div v-if="form.imageUrl" class="relative inline-block mb-2">
          <img
            :src="form.imageUrl"
            alt="Question image"
            class="h-32 w-auto rounded-lg border border-gray-200"
          />
          <button
            type="button"
            class="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            @click="form.imageUrl = ''"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <button
          v-else
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          @click="showImageModal = true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          {{ t('lessons.tests.form.addImage') }}
        </button>
      </div>

      <!-- Answer options -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.tests.form.options') }} *
        </label>
        <div class="space-y-3">
          <div
            v-for="(option, index) in form.options"
            :key="index"
            class="flex items-start gap-3 p-3 rounded-lg border transition-colors"
            :class="option.isCorrect ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'"
          >
            <!-- Radio for correct answer -->
            <button
              type="button"
              class="flex-shrink-0 mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
              :class="option.isCorrect
                ? 'border-green-500 bg-green-500'
                : 'border-gray-300 hover:border-green-400'"
              @click="setCorrectOption(index)"
            >
              <svg v-if="option.isCorrect" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>

            <!-- Option letter -->
            <span class="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
              {{ String.fromCharCode(65 + index) }}
            </span>

            <!-- Option text with RichTextEditor -->
            <div class="flex-1">
              <RichTextEditor
                :ref="el => setOptionEditorRef(el, index)"
                v-model="option.text"
                :placeholder="t('lessons.tests.form.optionPlaceholder')"
                :mini="true"
                :show-math-button="true"
                :show-image-button="false"
                min-height="40px"
                @open-math="openMathForOption(index)"
              />
            </div>

            <!-- Remove button -->
            <button
              v-if="form.options.length > 2"
              type="button"
              class="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors"
              @click="removeOption(index)"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Add option button -->
        <button
          v-if="form.options.length < 6"
          type="button"
          class="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          @click="addOption"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          {{ t('lessons.tests.form.addOption') }}
        </button>
      </div>

      <!-- Difficulty -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.tests.form.difficulty') }}
        </label>
        <div class="flex gap-2">
          <button
            v-for="diff in difficulties"
            :key="diff.value"
            type="button"
            class="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
            :class="form.difficulty === diff.value
              ? diff.activeClass
              : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
            @click="form.difficulty = diff.value"
          >
            {{ diff.label }}
          </button>
        </div>
      </div>

      <!-- Additional settings (collapsible) -->
      <details class="bg-gray-50 rounded-lg">
        <summary class="px-4 py-3 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
          {{ t('lessons.tests.form.additionalSettings') }}
        </summary>
        <div class="p-4 space-y-4 border-t border-gray-200">
          <!-- Points -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('lessons.tests.form.points') }}
            </label>
            <input
              v-model.number="form.points"
              type="number"
              min="1"
              max="100"
              class="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Time limit -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('lessons.tests.form.timeLimit') }}
            </label>
            <div class="flex items-center gap-3">
              <input
                v-model.number="form.timeLimit"
                type="number"
                min="0"
                max="600"
                class="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span class="text-gray-500">{{ t('lessons.tests.form.seconds') }}</span>
              <div class="flex gap-2">
                <button
                  type="button"
                  class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
                  @click="form.timeLimit = 30"
                >30s</button>
                <button
                  type="button"
                  class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
                  @click="form.timeLimit = 60"
                >1min</button>
                <button
                  type="button"
                  class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
                  @click="form.timeLimit = 120"
                >2min</button>
                <button
                  type="button"
                  class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
                  @click="form.timeLimit = 0"
                >{{ t('lessons.tests.form.unlimited') }}</button>
              </div>
            </div>
          </div>

          <!-- Explanation -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('lessons.tests.form.explanation') }}
            </label>
            <textarea
              v-model="form.explanation"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :placeholder="t('lessons.tests.form.explanationPlaceholder')"
            ></textarea>
          </div>
        </div>
      </details>
    </form>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        @click="handleClose"
      >
        {{ t('common.actions.cancel') }}
      </button>
      <button
        type="button"
        class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!isValid || saving"
        @click="handleSubmit"
      >
        {{ saving ? t('common.loading') : t('common.actions.save') }}
      </button>
    </template>

    <!-- Math Modal -->
    <MathModal
      v-model:show="showMathModal"
      @insert="insertFormula"
    />

    <!-- Image Modal -->
    <ImageUploader
      v-model:show="showImageModal"
      @insert="handleImageInsert"
    />
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseModal from '@/components/common/BaseModal.vue';
import RichTextEditor from '@/components/lessons/editors/RichTextEditor.vue';
import MathModal from '@/components/lessons/editors/MathModal.vue';
import ImageUploader from '@/components/lessons/editors/ImageUploader.vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  test: {
    type: Object,
    default: null
  },
  saving: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:show', 'save']);

const { t } = useI18n();

const questionEditor = ref(null);
const optionEditors = ref({});
const showMathModal = ref(false);
const showImageModal = ref(false);
const currentMathTarget = ref('question'); // 'question' or option index

const defaultForm = () => ({
  question: '',
  imageUrl: '',
  options: [
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false }
  ],
  difficulty: 'medium',
  points: 10,
  timeLimit: 60,
  explanation: ''
});

const form = reactive(defaultForm());

const isEdit = computed(() => !!props.test?.id);

const difficulties = computed(() => [
  { value: 'easy', label: t('lessons.tests.difficulty.easy'), activeClass: 'border-green-500 bg-green-50 text-green-700' },
  { value: 'medium', label: t('lessons.tests.difficulty.medium'), activeClass: 'border-yellow-500 bg-yellow-50 text-yellow-700' },
  { value: 'hard', label: t('lessons.tests.difficulty.hard'), activeClass: 'border-red-500 bg-red-50 text-red-700' }
]);

const isValid = computed(() => {
  if (!form.question?.trim()) return false;
  if (form.options.filter(o => o.text?.trim()).length < 2) return false;
  if (!form.options.some(o => o.isCorrect)) return false;
  return true;
});

const setCorrectOption = (index) => {
  form.options.forEach((opt, i) => {
    opt.isCorrect = i === index;
  });
};

const addOption = () => {
  if (form.options.length < 6) {
    form.options.push({ text: '', isCorrect: false });
  }
};

const removeOption = (index) => {
  if (form.options.length > 2) {
    const wasCorrect = form.options[index].isCorrect;
    form.options.splice(index, 1);
    if (wasCorrect && form.options.length > 0) {
      form.options[0].isCorrect = true;
    }
  }
};

// Set ref for option editor
const setOptionEditorRef = (el, index) => {
  if (el) {
    optionEditors.value[index] = el;
  }
};

// Open math modal for question
const openMathForQuestion = () => {
  currentMathTarget.value = 'question';
  showMathModal.value = true;
};

// Open math modal for a specific option
const openMathForOption = (index) => {
  currentMathTarget.value = index;
  showMathModal.value = true;
};

const insertFormula = ({ html }) => {
  if (currentMathTarget.value === 'question') {
    if (questionEditor.value) {
      questionEditor.value.insertHtml(html);
    }
  } else {
    const optionEditor = optionEditors.value[currentMathTarget.value];
    if (optionEditor) {
      optionEditor.insertHtml(html);
    }
  }
  currentMathTarget.value = 'question'; // Reset to default
};

const handleImageInsert = ({ url }) => {
  form.imageUrl = url;
};

const handleSubmit = () => {
  if (!isValid.value) return;

  const data = {
    question: form.question,
    imageUrl: form.imageUrl || null,
    options: form.options.filter(o => o.text?.trim()),
    difficulty: form.difficulty,
    points: form.points,
    timeLimit: form.timeLimit || null,
    explanation: form.explanation || null
  };

  if (isEdit.value) {
    data.id = props.test.id;
  }

  emit('save', data);
};

const handleClose = () => {
  emit('update:show', false);
};

const resetForm = () => {
  Object.assign(form, defaultForm());
};

// Watch for test changes
watch(() => props.test, (newTest) => {
  if (newTest) {
    form.question = newTest.question || '';
    form.imageUrl = newTest.imageUrl || '';
    form.options = newTest.options?.length > 0
      ? newTest.options.map(o => ({ ...o }))
      : defaultForm().options;
    form.difficulty = newTest.difficulty || 'medium';
    form.points = newTest.points || 10;
    form.timeLimit = newTest.timeLimit || 60;
    form.explanation = newTest.explanation || '';
  } else {
    resetForm();
  }
}, { immediate: true });

// Reset form when modal closes
watch(() => props.show, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});
</script>
