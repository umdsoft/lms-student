<template>
  <div class="w-full">
      <!-- Header -->
      <div class="mb-8">
        <button
          type="button"
          class="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          @click="handleBack"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          {{ t('lessons.tests.form.backButton') }}
        </button>

        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ isEdit ? t('lessons.tests.editPage.title') : t('lessons.tests.createPage.title') }}
            </h1>
            <p v-if="lessonName" class="mt-1 text-sm text-gray-500">
              {{ t('lessons.tests.createPage.subtitle', { lessonName }) }}
            </p>
          </div>

          <!-- Autosave indicator -->
          <div v-if="isDirty" class="flex items-center gap-2 text-sm text-gray-500">
            <div v-if="isAutosaving" class="flex items-center gap-2">
              <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span>{{ t('lessons.tests.form.hints.autosaving') }}</span>
            </div>
            <div v-else-if="lastSaved" class="text-green-600">
              {{ t('lessons.tests.form.hints.autosaved') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoadingLesson || isLoadingTest" class="space-y-6">
        <div class="h-40 animate-pulse rounded-2xl bg-gray-200"/>
        <div class="h-60 animate-pulse rounded-2xl bg-gray-200"/>
        <div class="h-32 animate-pulse rounded-2xl bg-gray-200"/>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Question Section -->
        <div
          ref="questionSection"
          class="rounded-2xl border bg-white p-6 shadow-sm"
          :class="validationErrors.question ? 'border-red-300' : 'border-gray-200'"
        >
          <h2 class="mb-4 text-lg font-semibold text-gray-900">
            {{ t('lessons.tests.form.sections.question') }}
          </h2>

          <div class="space-y-4">
            <!-- Question text -->
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
                min-height="150px"
                @open-math="openMathForQuestion"
                @update:model-value="markDirty"
              />
              <p v-if="validationErrors.question" class="mt-1 text-sm text-red-600">
                {{ validationErrors.question }}
              </p>
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
                  class="h-40 w-auto rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  class="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  @click="form.imageUrl = ''; markDirty()"
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
          </div>
        </div>

        <!-- Options Section -->
        <div
          ref="optionsSection"
          class="rounded-2xl border bg-white p-6 shadow-sm"
          :class="(validationErrors.options || validationErrors.optionEmpty || validationErrors.correctOption) ? 'border-red-300' : 'border-gray-200'"
        >
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900">
              {{ t('lessons.tests.form.sections.options') }}
            </h2>
            <p class="text-sm text-gray-500">
              {{ t('lessons.tests.form.hints.selectCorrect') }}
            </p>
          </div>

          <!-- Error messages -->
          <div v-if="validationErrors.options || validationErrors.optionEmpty || validationErrors.correctOption" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p v-if="validationErrors.options" class="text-sm text-red-600">{{ validationErrors.options }}</p>
            <p v-if="validationErrors.optionEmpty" class="text-sm text-red-600">{{ validationErrors.optionEmpty }}</p>
            <p v-if="validationErrors.correctOption" class="text-sm text-red-600">{{ validationErrors.correctOption }}</p>
          </div>

          <div class="space-y-4">
            <div
              v-for="(option, index) in form.options"
              :key="index"
              class="flex items-start gap-4 p-4 rounded-xl border-2 transition-all"
              :class="option.isCorrect ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white hover:border-gray-300'"
            >
              <!-- Radio for correct answer -->
              <button
                type="button"
                class="flex-shrink-0 mt-2 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all"
                :class="option.isCorrect
                  ? 'border-green-500 bg-green-500 shadow-md'
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-50'"
                @click="setCorrectOption(index)"
              >
                <svg v-if="option.isCorrect" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </button>

              <!-- Option letter -->
              <span
                class="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all"
                :class="option.isCorrect ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'"
              >
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
                  min-height="50px"
                  @open-math="openMathForOption(index)"
                  @update:model-value="markDirty"
                />
              </div>

              <!-- Remove button -->
              <button
                v-if="form.options.length > 2"
                type="button"
                class="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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
            class="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            @click="addOption"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            {{ t('lessons.tests.form.hints.addOption') }}
          </button>
        </div>

        <!-- Settings Section -->
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-lg font-semibold text-gray-900">
            {{ t('lessons.tests.form.sections.settings') }}
          </h2>

          <div class="grid gap-6 md:grid-cols-2">
            <!-- Difficulty + Points (birlashtirilgan) -->
            <div class="md:col-span-2">
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-medium text-gray-700">
                  {{ t('lessons.tests.form.difficulty') }}
                </label>
                <!-- Ball ko'rsatkichi -->
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-500">{{ t('lessons.tests.form.points') }}:</span>
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold"
                    :class="{
                      'bg-green-100 text-green-700': form.difficulty === 'easy',
                      'bg-yellow-100 text-yellow-700': form.difficulty === 'medium',
                      'bg-red-100 text-red-700': form.difficulty === 'hard'
                    }"
                  >
                    {{ points }} ball
                  </span>
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  v-for="diff in difficulties"
                  :key="diff.value"
                  type="button"
                  class="flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all border-2"
                  :class="form.difficulty === diff.value
                    ? diff.activeClass
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
                  @click="form.difficulty = diff.value; markDirty()"
                >
                  <span class="flex items-center justify-center gap-2">
                    <span
                      class="w-2 h-2 rounded-full"
                      :class="{
                        'bg-green-500': diff.value === 'easy',
                        'bg-yellow-500': diff.value === 'medium',
                        'bg-red-500': diff.value === 'hard'
                      }"
                    ></span>
                    {{ diff.label }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Time limit -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ t('lessons.tests.form.timeLimit') }}
              </label>
              <div class="flex items-center gap-4">
                <input
                  v-model.number="form.timeLimit"
                  type="number"
                  min="0"
                  max="600"
                  class="w-28 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  @input="markDirty"
                />
                <span class="text-gray-500">{{ t('lessons.tests.form.seconds') }}</span>
                <div class="flex gap-2 ml-4">
                  <button
                    v-for="preset in timePresets"
                    :key="preset.value"
                    type="button"
                    class="px-4 py-2 text-sm rounded-lg transition-all"
                    :class="form.timeLimit === preset.value
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'"
                    @click="form.timeLimit = preset.value; markDirty()"
                  >{{ preset.label }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Explanation Section -->
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-lg font-semibold text-gray-900">
            {{ t('lessons.tests.form.sections.explanation') }}
          </h2>
          <textarea
            v-model="form.explanation"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all"
            :placeholder="t('lessons.tests.form.explanationPlaceholder')"
            @input="markDirty"
          ></textarea>
        </div>

        <!-- Preview Section -->
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-lg font-semibold text-gray-900">
            {{ t('lessons.tests.form.sections.preview') }}
          </h2>
          <TestPreview :test="previewData" />
        </div>

        <!-- Actions -->
        <div class="sticky bottom-0 bg-gray-50 -mx-4 px-4 py-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <button
                type="button"
                class="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-medium"
                @click="handleBack"
              >
                {{ t('lessons.tests.form.actions.cancel') }}
              </button>
              <button
                v-if="isDirty"
                type="button"
                class="px-6 py-3 text-gray-600 hover:text-gray-800 transition-all font-medium"
                @click="saveDraft"
                :disabled="isSavingDraft"
              >
                {{ isSavingDraft ? t('common.loading') : t('lessons.tests.form.actions.saveDraft') }}
              </button>
            </div>
            <div class="flex items-center gap-4">
              <button
                v-if="!isEdit"
                type="button"
                class="px-6 py-3 text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="saving"
                @click="handleSubmit('new')"
              >
                {{ t('lessons.tests.form.actions.saveAndNew') }}
              </button>
              <button
                type="submit"
                class="px-8 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
                :disabled="saving"
              >
                {{ saving ? t('common.loading') : t('lessons.tests.form.actions.saveAndExit') }}
              </button>
            </div>
          </div>
        </div>
      </form>

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
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';
import RichTextEditor from '@/components/lessons/editors/RichTextEditor.vue';
import MathModal from '@/components/lessons/editors/MathModal.vue';
import ImageUploader from '@/components/lessons/editors/ImageUploader.vue';
import TestPreview from '@/components/lessons/tests/TestPreview.vue';
import { useLessonTestsStore } from '@/stores/lessonTests';
import { useLessonsStore } from '@/stores/lessons';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { push } = useNotivue();
const testsStore = useLessonTestsStore();
const lessonsStore = useLessonsStore();

// Refs
const questionEditor = ref(null);
const optionEditors = ref({});
const questionSection = ref(null);
const optionsSection = ref(null);
const showMathModal = ref(false);
const showImageModal = ref(false);
const currentMathTarget = ref('question');

// State
const isLoadingLesson = ref(true);
const isLoadingTest = ref(false);
const saving = ref(false);
const isSavingDraft = ref(false);
const isAutosaving = ref(false);
const isDirty = ref(false);
const lastSaved = ref(null);
const lessonName = ref('');
const validationErrors = reactive({
  question: '',
  options: '',
  optionEmpty: '',
  correctOption: ''
});

// Autosave interval
let autosaveInterval = null;

// Default form (points olib tashlandi - computed orqali hisoblanadi)
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
  timeLimit: 60,
  explanation: ''
});

const form = reactive(defaultForm());

// Computed
const isEdit = computed(() => !!route.params.testId);
const lessonId = computed(() => route.params.lessonId);
const testId = computed(() => route.params.testId);

const difficulties = computed(() => [
  { value: 'easy', label: t('lessons.tests.difficulty.easy'), activeClass: 'border-green-500 bg-green-50 text-green-700' },
  { value: 'medium', label: t('lessons.tests.difficulty.medium'), activeClass: 'border-yellow-500 bg-yellow-50 text-yellow-700' },
  { value: 'hard', label: t('lessons.tests.difficulty.hard'), activeClass: 'border-red-500 bg-red-50 text-red-700' }
]);

const timePresets = [
  { value: 30, label: '30s' },
  { value: 60, label: '1min' },
  { value: 120, label: '2min' },
  { value: 0, label: t('lessons.tests.form.unlimited') }
];

// Ball qiymatlari - qiyinlik darajasiga qarab const
const DIFFICULTY_POINTS = {
  easy: 0.3,
  medium: 0.6,
  hard: 1.0
};

// Ball computed - qiyinlik o'zgarganda avtomatik o'zgaradi
const points = computed(() => DIFFICULTY_POINTS[form.difficulty] || 0.6);

const previewData = computed(() => ({
  question: form.question,
  imageUrl: form.imageUrl,
  options: form.options,
  difficulty: form.difficulty,
  points: points.value,
  timeLimit: form.timeLimit
}));

// Lifecycle
onMounted(async () => {
  await loadLesson();
  if (isEdit.value) {
    await loadTest();
  }

  // Start autosave interval (every 30 seconds)
  autosaveInterval = setInterval(() => {
    if (isDirty.value && !saving.value) {
      autosave();
    }
  }, 30000);
});

onUnmounted(() => {
  if (autosaveInterval) {
    clearInterval(autosaveInterval);
  }
});

// Navigation guard for unsaved changes
onBeforeRouteLeave((to, from, next) => {
  if (isDirty.value) {
    const answer = confirm(t('lessons.tests.form.unsavedWarning'));
    if (answer) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});

// Methods
const loadLesson = async () => {
  isLoadingLesson.value = true;
  try {
    await lessonsStore.fetchLesson(lessonId.value);
    lessonName.value = lessonsStore.currentLesson?.name || '';
  } catch (error) {
    push.error({ title: t('lessons.messages.loadError') });
  } finally {
    isLoadingLesson.value = false;
  }
};

const loadTest = async () => {
  isLoadingTest.value = true;
  try {
    await testsStore.fetchTestsByLesson(lessonId.value);
    const test = testsStore.tests.find(t => t.id === parseInt(testId.value));
    if (test) {
      form.question = test.question || '';
      form.imageUrl = test.imageUrl || '';
      form.options = test.options?.length > 0
        ? test.options.map(o => ({ ...o }))
        : defaultForm().options;
      form.difficulty = test.difficulty || 'medium';
      // points endi computed - qiyinlikka qarab avtomatik hisoblanadi
      form.timeLimit = test.timeLimit ?? 60;
      form.explanation = test.explanation || '';
    }
  } catch (error) {
    push.error({ title: t('lessons.tests.loadError') });
  } finally {
    isLoadingTest.value = false;
  }
};

const markDirty = () => {
  isDirty.value = true;
  lastSaved.value = null;
};

const setOptionEditorRef = (el, index) => {
  if (el) {
    optionEditors.value[index] = el;
  }
};

const setCorrectOption = (index) => {
  form.options.forEach((opt, i) => {
    opt.isCorrect = i === index;
  });
  markDirty();
  clearValidationError('correctOption');
};

const addOption = () => {
  if (form.options.length < 6) {
    form.options.push({ text: '', isCorrect: false });
    markDirty();
  }
};

const removeOption = (index) => {
  if (form.options.length > 2) {
    const wasCorrect = form.options[index].isCorrect;
    form.options.splice(index, 1);
    if (wasCorrect && form.options.length > 0) {
      form.options[0].isCorrect = true;
    }
    markDirty();
  }
};

const openMathForQuestion = () => {
  currentMathTarget.value = 'question';
  showMathModal.value = true;
};

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
  markDirty();
  currentMathTarget.value = 'question';
};

const handleImageInsert = ({ url }) => {
  form.imageUrl = url;
  markDirty();
};

const clearValidationError = (field) => {
  validationErrors[field] = '';
};

const clearAllValidationErrors = () => {
  validationErrors.question = '';
  validationErrors.options = '';
  validationErrors.optionEmpty = '';
  validationErrors.correctOption = '';
};

const validate = () => {
  clearAllValidationErrors();
  let isValid = true;
  let firstErrorElement = null;

  // Validate question
  if (!form.question?.trim()) {
    validationErrors.question = t('lessons.tests.form.validation.questionRequired');
    isValid = false;
    if (!firstErrorElement) firstErrorElement = questionSection.value;
  }

  // Validate options count
  const filledOptions = form.options.filter(o => o.text?.trim());
  if (filledOptions.length < 2) {
    validationErrors.options = t('lessons.tests.form.validation.minOptions');
    isValid = false;
    if (!firstErrorElement) firstErrorElement = optionsSection.value;
  }

  // Validate all options are filled
  const hasEmptyOptions = form.options.some((o, i) => {
    // Only check options that should be filled (first 2 are required, rest only if they have content)
    if (i < 2) return !o.text?.trim();
    return false;
  });
  if (hasEmptyOptions) {
    validationErrors.optionEmpty = t('lessons.tests.form.validation.optionEmpty');
    isValid = false;
    if (!firstErrorElement) firstErrorElement = optionsSection.value;
  }

  // Validate correct option selected
  if (!form.options.some(o => o.isCorrect && o.text?.trim())) {
    validationErrors.correctOption = t('lessons.tests.form.validation.selectCorrect');
    isValid = false;
    if (!firstErrorElement) firstErrorElement = optionsSection.value;
  }

  // Scroll to first error
  if (firstErrorElement) {
    firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return isValid;
};

const getFormData = () => ({
  question: form.question,
  imageUrl: form.imageUrl || null,
  options: form.options.filter(o => o.text?.trim()),
  difficulty: form.difficulty,
  points: points.value, // computed dan olinadi
  timeLimit: form.timeLimit || null,
  explanation: form.explanation || null
});

const autosave = async () => {
  if (isAutosaving.value) return;

  isAutosaving.value = true;
  try {
    // Save to localStorage as draft
    const draftKey = `test-draft-${lessonId.value}${isEdit.value ? `-${testId.value}` : ''}`;
    localStorage.setItem(draftKey, JSON.stringify(getFormData()));
    lastSaved.value = new Date();
  } catch (error) {
    console.error('Autosave failed:', error);
  } finally {
    isAutosaving.value = false;
  }
};

const saveDraft = async () => {
  isSavingDraft.value = true;
  await autosave();
  push.success({ title: t('lessons.tests.form.hints.autosaved') });
  isSavingDraft.value = false;
};

const handleSubmit = async (mode = 'exit') => {
  if (!validate()) return;

  saving.value = true;
  try {
    const data = getFormData();

    if (isEdit.value) {
      await testsStore.updateTest(testId.value, data, lessonId.value);
      push.success({ title: t('lessons.tests.updateSuccess') });
    } else {
      await testsStore.createTest(lessonId.value, data);

      if (mode === 'new') {
        // "Saqlash va yangi qo'shish" uchun maxsus xabar
        push.success({
          title: t('lessons.tests.createSuccess'),
          message: t('lessons.tests.form.saveAndNewSuccess', 'Test saqlandi! Yangi test qo\'shishingiz mumkin.')
        });
      } else {
        push.success({ title: t('lessons.tests.createSuccess') });
      }
    }

    // Clear draft
    const draftKey = `test-draft-${lessonId.value}${isEdit.value ? `-${testId.value}` : ''}`;
    localStorage.removeItem(draftKey);

    isDirty.value = false;

    if (mode === 'new') {
      // Reset form for new test - barcha fieldlarni tozalash
      resetFormForNewTest();
    } else {
      // Navigate back to lesson
      router.push({ name: 'admin.lesson-detail', params: { id: lessonId.value } });
    }
  } catch (error) {
    push.error({ title: error.message || t('lessons.tests.saveError') });
  } finally {
    saving.value = false;
  }
};

// Yangi test uchun formni tozalash
const resetFormForNewTest = () => {
  // Form ni default qiymatlarga qaytarish
  form.question = '';
  form.imageUrl = '';
  form.options = [
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false }
  ];
  form.difficulty = 'medium';
  form.timeLimit = 60;
  form.explanation = '';

  // Validation xatolarini tozalash
  clearAllValidationErrors();

  // Sahifani yuqoriga scroll qilish
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleBack = () => {
  if (isDirty.value) {
    const answer = confirm(t('lessons.tests.form.unsavedWarning'));
    if (!answer) return;
  }
  router.push({ name: 'admin.lesson-detail', params: { id: lessonId.value } });
};

// Watch for draft restoration
watch([lessonId, testId], () => {
  const draftKey = `test-draft-${lessonId.value}${isEdit.value ? `-${testId.value}` : ''}`;
  const draft = localStorage.getItem(draftKey);
  if (draft && !isEdit.value) {
    try {
      const draftData = JSON.parse(draft);
      const shouldRestore = confirm(t('lessons.tests.form.restoreDraft'));
      if (shouldRestore) {
        Object.assign(form, draftData);
      } else {
        localStorage.removeItem(draftKey);
      }
    } catch (e) {
      localStorage.removeItem(draftKey);
    }
  }
}, { immediate: true });
</script>
