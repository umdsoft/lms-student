<template>
  <BaseModal
    :show="show"
    :title="isEdit ? t('lessons.skills.listening.editTask') : t('lessons.skills.listening.createTask')"
    size="xl"
    max-height="90vh"
    @update:show="$emit('update:show', $event)"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.listening.title') }} *
        </label>
        <input
          v-model="form.title"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="t('lessons.skills.listening.titlePlaceholder')"
        />
      </div>

      <!-- Audio source -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.listening.audio') }} *
        </label>
        <div class="flex gap-3 mb-3">
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="audioSourceType === 'upload'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            @click="audioSourceType = 'upload'"
          >
            {{ t('lessons.skills.listening.uploadAudio') }}
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="audioSourceType === 'url'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            @click="audioSourceType = 'url'"
          >
            {{ t('lessons.skills.listening.audioUrl') }}
          </button>
        </div>

        <!-- Audio upload -->
        <div v-if="audioSourceType === 'upload'">
          <div
            v-if="!form.audioUrl"
            class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 cursor-pointer"
            @click="$refs.audioInput.click()"
          >
            <input
              ref="audioInput"
              type="file"
              accept="audio/*"
              class="hidden"
              @change="handleAudioUpload"
            />
            <svg class="mx-auto w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
            </svg>
            <p class="mt-2 text-sm text-gray-600">{{ t('lessons.skills.listening.uploadAudioPrompt') }}</p>
            <p class="text-xs text-gray-400">MP3, WAV, OGG</p>
          </div>
          <div v-else class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <audio :src="form.audioUrl" controls class="flex-1"></audio>
            <button
              type="button"
              class="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              @click="form.audioUrl = ''"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Audio URL -->
        <div v-else>
          <input
            v-model="form.audioUrl"
            type="url"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
          <div v-if="form.audioUrl" class="mt-3">
            <audio :src="form.audioUrl" controls class="w-full"></audio>
          </div>
        </div>
      </div>

      <!-- Transcript -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('lessons.skills.listening.transcript') }}
        </label>
        <textarea
          v-model="form.transcript"
          rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          :placeholder="t('lessons.skills.listening.transcriptPlaceholder')"
        ></textarea>
      </div>

      <!-- Settings -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('lessons.skills.listening.replays') }}
          </label>
          <select
            v-model.number="form.allowedReplays"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option :value="0">{{ t('lessons.skills.listening.noReplay') }}</option>
            <option :value="1">1 {{ t('lessons.skills.listening.time') }}</option>
            <option :value="2">2 {{ t('lessons.skills.listening.times') }}</option>
            <option :value="-1">{{ t('lessons.skills.listening.unlimited') }}</option>
          </select>
        </div>
        <div>
          <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <input
              v-model="form.showTranscript"
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            {{ t('lessons.skills.listening.showTranscript') }}
          </label>
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
import { ref, reactive, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseModal from '@/components/common/BaseModal.vue';

const props = defineProps({
  show: { type: Boolean, required: true },
  task: { type: Object, default: null },
  saving: { type: Boolean, default: false }
});

const emit = defineEmits(['update:show', 'save']);

const { t } = useI18n();
const audioSourceType = ref('upload');

const defaultForm = () => ({
  title: '',
  audioUrl: '',
  transcript: '',
  allowedReplays: 2,
  showTranscript: false
});

const form = reactive(defaultForm());

const isEdit = computed(() => !!props.task?.id);
const isValid = computed(() => form.title?.trim() && form.audioUrl);

const handleAudioUpload = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    form.audioUrl = URL.createObjectURL(file);
    form.audioFile = file;
  }
};

const handleSubmit = () => {
  if (!isValid.value) return;
  emit('save', { ...form, id: props.task?.id });
};

watch(() => props.task, (task) => {
  if (task) {
    Object.assign(form, {
      title: task.title || '',
      audioUrl: task.audioUrl || '',
      transcript: task.transcript || '',
      allowedReplays: task.allowedReplays ?? 2,
      showTranscript: task.showTranscript ?? false
    });
    audioSourceType.value = task.audioUrl?.startsWith('blob:') ? 'upload' : 'url';
  } else {
    Object.assign(form, defaultForm());
  }
}, { immediate: true });

watch(() => props.show, (val) => {
  if (!val) Object.assign(form, defaultForm());
});
</script>
