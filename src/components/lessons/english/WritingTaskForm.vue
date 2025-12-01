<template>
  <BaseModal
    :show="show"
    :title="isEdit ? t('lessons.skills.writing.editTask') : t('lessons.skills.writing.createTask')"
    size="xl"
    max-height="90vh"
    @update:show="$emit('update:show', $event)"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Task type -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.writing.taskType') }}
        </label>
        <div class="flex gap-3">
          <button
            type="button"
            class="flex-1 p-4 border rounded-lg text-left transition-colors"
            :class="form.taskType === 'task1'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'"
            @click="form.taskType = 'task1'"
          >
            <p class="font-medium text-gray-900">Task 1</p>
            <p class="text-sm text-gray-500 mt-1">{{ t('lessons.skills.writing.task1Description') }}</p>
          </button>
          <button
            type="button"
            class="flex-1 p-4 border rounded-lg text-left transition-colors"
            :class="form.taskType === 'task2'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'"
            @click="form.taskType = 'task2'"
          >
            <p class="font-medium text-gray-900">Task 2</p>
            <p class="text-sm text-gray-500 mt-1">{{ t('lessons.skills.writing.task2Description') }}</p>
          </button>
        </div>
      </div>

      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.writing.title') }}
        </label>
        <input
          v-model="form.title"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="t('lessons.skills.writing.titlePlaceholder')"
        />
      </div>

      <!-- Instructions -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.writing.instructions') }} *
        </label>
        <RichTextEditor
          v-model="form.instructions"
          :placeholder="t('lessons.skills.writing.instructionsPlaceholder')"
          :show-math-button="false"
          :show-image-button="false"
          min-height="150px"
        />
      </div>

      <!-- Image (for Task 1) -->
      <div v-if="form.taskType === 'task1'">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.writing.graphImage') }}
        </label>
        <div v-if="form.imageUrl" class="relative inline-block mb-2">
          <img
            :src="form.imageUrl"
            alt="Task image"
            class="max-h-48 rounded-lg border border-gray-200"
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
          class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          @click="showImageModal = true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          {{ t('lessons.skills.writing.addImage') }}
        </button>
      </div>

      <!-- Time and word limits -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('lessons.skills.writing.timeLimit') }}
          </label>
          <div class="flex items-center gap-2">
            <input
              v-model.number="form.timeLimit"
              type="number"
              min="1"
              class="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <span class="text-gray-500">{{ t('lessons.skills.writing.minutes') }}</span>
            <div class="flex gap-2 ml-2">
              <button
                type="button"
                class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
                @click="form.timeLimit = 20"
              >20</button>
              <button
                type="button"
                class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
                @click="form.timeLimit = 40"
              >40</button>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('lessons.skills.writing.minWords') }}
          </label>
          <div class="flex items-center gap-2">
            <input
              v-model.number="form.minWords"
              type="number"
              min="1"
              class="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <span class="text-gray-500">{{ t('lessons.skills.writing.words') }}</span>
            <div class="flex gap-2 ml-2">
              <button
                type="button"
                class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
                @click="form.minWords = 150"
              >150</button>
              <button
                type="button"
                class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
                @click="form.minWords = 250"
              >250</button>
            </div>
          </div>
        </div>
      </div>
    </form>

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
        class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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
  taskType: 'task1',
  title: '',
  instructions: '',
  imageUrl: '',
  timeLimit: 20,
  minWords: 150
});

const form = reactive(defaultForm());

const isEdit = computed(() => !!props.task?.id);
const isValid = computed(() => form.instructions?.trim().length > 0);

const handleImageInsert = ({ url }) => {
  form.imageUrl = url;
};

const handleSubmit = () => {
  if (!isValid.value) return;
  emit('save', { ...form, id: props.task?.id });
};

watch(() => props.task, (task) => {
  if (task) {
    Object.assign(form, {
      taskType: task.taskType || 'task1',
      title: task.title || '',
      instructions: task.instructions || '',
      imageUrl: task.imageUrl || '',
      timeLimit: task.timeLimit || 20,
      minWords: task.minWords || 150
    });
  } else {
    Object.assign(form, defaultForm());
  }
}, { immediate: true });

watch(() => props.show, (val) => {
  if (!val) Object.assign(form, defaultForm());
});
</script>
