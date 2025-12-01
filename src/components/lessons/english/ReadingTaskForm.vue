<template>
  <BaseModal
    :show="show"
    :title="isEdit ? t('lessons.skills.reading.editTask') : t('lessons.skills.reading.createTask')"
    size="2xl"
    max-height="90vh"
    @update:show="$emit('update:show', $event)"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.reading.title') }} *
        </label>
        <input
          v-model="form.title"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          :placeholder="t('lessons.skills.reading.titlePlaceholder')"
        />
      </div>

      <!-- Passage text -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.reading.passage') }} *
        </label>
        <RichTextEditor
          v-model="form.passage"
          :placeholder="t('lessons.skills.reading.passagePlaceholder')"
          :show-math-button="false"
          :show-image-button="true"
          min-height="250px"
          @open-image="showImageModal = true"
        />
        <p class="mt-1 text-sm text-gray-500">
          {{ t('lessons.skills.reading.wordCount') }}: {{ wordCount }}
        </p>
      </div>

      <!-- Time limit -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.reading.timeLimit') }}
        </label>
        <div class="flex items-center gap-2">
          <input
            v-model.number="form.timeLimit"
            type="number"
            min="1"
            class="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <span class="text-gray-500">{{ t('lessons.skills.reading.minutes') }}</span>
          <div class="flex gap-2 ml-2">
            <button
              type="button"
              class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
              @click="form.timeLimit = 15"
            >15</button>
            <button
              type="button"
              class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
              @click="form.timeLimit = 20"
            >20</button>
            <button
              type="button"
              class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
              @click="form.timeLimit = 30"
            >30</button>
          </div>
        </div>
      </div>

      <!-- Questions section -->
      <div class="border-t border-gray-200 pt-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ t('lessons.skills.reading.questions') }}
          </h3>
          <button
            type="button"
            class="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            @click="addQuestion"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            {{ t('lessons.skills.reading.addQuestion') }}
          </button>
        </div>

        <div v-if="form.questions.length === 0" class="text-center py-8 text-gray-500">
          {{ t('lessons.skills.reading.noQuestions') }}
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(question, qIndex) in form.questions"
            :key="qIndex"
            class="p-4 border border-gray-200 rounded-lg"
          >
            <div class="flex items-start gap-3">
              <span class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                {{ qIndex + 1 }}
              </span>
              <div class="flex-1 space-y-3">
                <!-- Question type -->
                <select
                  v-model="question.type"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="mcq">{{ t('lessons.skills.reading.mcq') }}</option>
                  <option value="tfng">{{ t('lessons.skills.reading.tfng') }}</option>
                  <option value="fill">{{ t('lessons.skills.reading.fillBlank') }}</option>
                  <option value="short">{{ t('lessons.skills.reading.shortAnswer') }}</option>
                </select>

                <!-- Question text -->
                <input
                  v-model="question.text"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  :placeholder="t('lessons.skills.reading.questionText')"
                />

                <!-- MCQ options -->
                <div v-if="question.type === 'mcq'" class="space-y-2">
                  <div
                    v-for="(opt, oIndex) in question.options"
                    :key="oIndex"
                    class="flex items-center gap-2"
                  >
                    <button
                      type="button"
                      class="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                      :class="question.correctAnswer === oIndex
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300 hover:border-green-400'"
                      @click="question.correctAnswer = oIndex"
                    >
                      <svg v-if="question.correctAnswer === oIndex" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                    <input
                      v-model="question.options[oIndex]"
                      type="text"
                      class="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                      :placeholder="`${String.fromCharCode(65 + oIndex)}.`"
                    />
                  </div>
                </div>

                <!-- T/F/NG options -->
                <div v-if="question.type === 'tfng'" class="flex gap-2">
                  <button
                    v-for="opt in ['true', 'false', 'ng']"
                    :key="opt"
                    type="button"
                    class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    :class="question.correctAnswer === opt
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                    @click="question.correctAnswer = opt"
                  >
                    {{ opt === 'true' ? 'True' : opt === 'false' ? 'False' : 'Not Given' }}
                  </button>
                </div>

                <!-- Short answer / Fill in blank -->
                <div v-if="question.type === 'fill' || question.type === 'short'">
                  <input
                    v-model="question.correctAnswer"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    :placeholder="t('lessons.skills.reading.correctAnswer')"
                  />
                </div>
              </div>

              <button
                type="button"
                class="p-2 text-gray-400 hover:text-red-500"
                @click="removeQuestion(qIndex)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        @click="$emit('update:show', false)"
      >
        {{ t('common.actions.cancel') }}
      </button>
      <button
        type="button"
        class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        :disabled="!isValid || saving"
        @click="handleSubmit"
      >
        {{ saving ? t('common.loading') : t('common.actions.save') }}
      </button>
    </template>

    <!-- Image Modal -->
    <ImageUploader
      v-model:show="showImageModal"
      @insert="handleImageInsert"
    />
  </BaseModal>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseModal from '@/components/common/BaseModal.vue';
import RichTextEditor from '@/components/lessons/editors/RichTextEditor.vue';
import ImageUploader from '@/components/lessons/editors/ImageUploader.vue';

const props = defineProps({
  show: { type: Boolean, required: true },
  task: { type: Object, default: null },
  saving: { type: Boolean, default: false }
});

const emit = defineEmits(['update:show', 'save']);

const { t } = useI18n();
const showImageModal = ref(false);

const defaultForm = () => ({
  title: '',
  passage: '',
  timeLimit: 20,
  questions: []
});

const defaultQuestion = () => ({
  type: 'mcq',
  text: '',
  options: ['', '', '', ''],
  correctAnswer: 0
});

const form = reactive(defaultForm());

const isEdit = computed(() => !!props.task?.id);
const isValid = computed(() => form.title?.trim() && form.passage?.trim());

const wordCount = computed(() => {
  const text = form.passage.replace(/<[^>]*>/g, '').trim();
  return text ? text.split(/\s+/).length : 0;
});

const addQuestion = () => {
  form.questions.push(defaultQuestion());
};

const removeQuestion = (index) => {
  form.questions.splice(index, 1);
};

const handleImageInsert = ({ url }) => {
  // Insert image into passage
};

const handleSubmit = () => {
  if (!isValid.value) return;
  emit('save', { ...form, id: props.task?.id });
};

watch(() => props.task, (task) => {
  if (task) {
    Object.assign(form, {
      title: task.title || '',
      passage: task.passage || '',
      timeLimit: task.timeLimit ?? 20,
      questions: task.questions?.length ? task.questions.map(q => ({ ...q })) : []
    });
  } else {
    Object.assign(form, defaultForm());
  }
}, { immediate: true });

watch(() => props.show, (val) => {
  if (!val) Object.assign(form, defaultForm());
});
</script>
