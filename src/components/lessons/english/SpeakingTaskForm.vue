<template>
  <BaseModal
    :show="show"
    :title="isEdit ? t('lessons.skills.speaking.editTask') : t('lessons.skills.speaking.createTask')"
    size="xl"
    max-height="90vh"
    @update:show="$emit('update:show', $event)"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Part type -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.speaking.partType') }}
        </label>
        <div class="flex gap-2">
          <button
            v-for="part in partTypes"
            :key="part.value"
            type="button"
            class="flex-1 p-3 border rounded-lg text-center transition-colors"
            :class="form.partType === part.value
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'"
            @click="form.partType = part.value"
          >
            <p class="font-medium text-gray-900">{{ part.label }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ part.description }}</p>
          </button>
        </div>
      </div>

      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.speaking.title') }}
        </label>
        <input
          v-model="form.title"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          :placeholder="t('lessons.skills.speaking.titlePlaceholder')"
        />
      </div>

      <!-- Prompt/Question -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.speaking.prompt') }} *
        </label>
        <RichTextEditor
          v-model="form.prompt"
          :placeholder="t('lessons.skills.speaking.promptPlaceholder')"
          :show-math-button="false"
          :show-image-button="false"
          min-height="120px"
        />
      </div>

      <!-- Cue card points (for Part 2) -->
      <div v-if="form.partType === 'part2'">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.speaking.cueCardPoints') }}
        </label>
        <div class="space-y-2">
          <div
            v-for="(point, index) in form.cueCardPoints"
            :key="index"
            class="flex items-center gap-2"
          >
            <span class="w-6 text-center text-gray-400">{{ index + 1 }}.</span>
            <input
              v-model="form.cueCardPoints[index]"
              type="text"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              :placeholder="t('lessons.skills.speaking.cuePointPlaceholder')"
            />
            <button
              v-if="form.cueCardPoints.length > 1"
              type="button"
              class="p-2 text-gray-400 hover:text-red-500"
              @click="removeCuePoint(index)"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <button
            v-if="form.cueCardPoints.length < 5"
            type="button"
            class="text-sm text-blue-600 hover:text-blue-700"
            @click="addCuePoint"
          >
            + {{ t('lessons.skills.speaking.addPoint') }}
          </button>
        </div>
      </div>

      <!-- Time settings -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('lessons.skills.speaking.prepTime') }}
          </label>
          <div class="flex items-center gap-2">
            <input
              v-model.number="form.prepTime"
              type="number"
              min="0"
              class="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <span class="text-gray-500">{{ t('lessons.skills.speaking.seconds') }}</span>
            <div class="flex gap-2">
              <button
                type="button"
                class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
                @click="form.prepTime = 0"
              >0</button>
              <button
                type="button"
                class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
                @click="form.prepTime = 60"
              >60</button>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('lessons.skills.speaking.responseTime') }}
          </label>
          <div class="flex items-center gap-2">
            <input
              v-model.number="form.responseTime"
              type="number"
              min="10"
              class="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <span class="text-gray-500">{{ t('lessons.skills.speaking.seconds') }}</span>
            <div class="flex gap-2">
              <button
                type="button"
                class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
                @click="form.responseTime = 30"
              >30</button>
              <button
                type="button"
                class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
                @click="form.responseTime = 60"
              >60</button>
              <button
                type="button"
                class="px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200"
                @click="form.responseTime = 120"
              >120</button>
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
  </BaseModal>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseModal from '@/components/common/BaseModal.vue';
import RichTextEditor from '@/components/lessons/editors/RichTextEditor.vue';

const props = defineProps({
  show: { type: Boolean, required: true },
  task: { type: Object, default: null },
  saving: { type: Boolean, default: false }
});

const emit = defineEmits(['update:show', 'save']);

const { t } = useI18n();

const partTypes = computed(() => [
  { value: 'part1', label: 'Part 1', description: t('lessons.skills.speaking.part1Desc') },
  { value: 'part2', label: 'Part 2', description: t('lessons.skills.speaking.part2Desc') },
  { value: 'part3', label: 'Part 3', description: t('lessons.skills.speaking.part3Desc') }
]);

const defaultForm = () => ({
  partType: 'part1',
  title: '',
  prompt: '',
  cueCardPoints: ['', '', '', ''],
  prepTime: 0,
  responseTime: 60
});

const form = reactive(defaultForm());

const isEdit = computed(() => !!props.task?.id);
const isValid = computed(() => form.prompt?.trim().length > 0);

const addCuePoint = () => {
  if (form.cueCardPoints.length < 5) {
    form.cueCardPoints.push('');
  }
};

const removeCuePoint = (index) => {
  if (form.cueCardPoints.length > 1) {
    form.cueCardPoints.splice(index, 1);
  }
};

const handleSubmit = () => {
  if (!isValid.value) return;
  const data = { ...form, id: props.task?.id };
  if (form.partType !== 'part2') {
    delete data.cueCardPoints;
  } else {
    data.cueCardPoints = data.cueCardPoints.filter(p => p.trim());
  }
  emit('save', data);
};

watch(() => props.task, (task) => {
  if (task) {
    Object.assign(form, {
      partType: task.partType || 'part1',
      title: task.title || '',
      prompt: task.prompt || '',
      cueCardPoints: task.cueCardPoints?.length ? [...task.cueCardPoints] : ['', '', '', ''],
      prepTime: task.prepTime ?? 0,
      responseTime: task.responseTime ?? 60
    });
  } else {
    Object.assign(form, defaultForm());
  }
}, { immediate: true });

watch(() => props.show, (val) => {
  if (!val) Object.assign(form, defaultForm());
});
</script>
