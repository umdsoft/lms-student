<template>
  <div class="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
    <!-- Section header -->
    <div class="flex items-center justify-between p-6 border-b border-gray-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-2xl">
          <span class="text-xl">&#127468;&#127463;</span>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900">{{ t('lessons.skills.title') }}</h3>
          <p class="text-sm text-gray-500">{{ t('lessons.skills.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="flex -mb-px px-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="relative px-4 py-3 text-sm font-medium transition-colors"
          :class="activeTab === tab.id
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700'"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
          <span
            v-if="tab.count > 0"
            class="ml-2 px-2 py-0.5 text-xs rounded-full"
            :class="activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'"
          >
            {{ tab.count }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Tab content -->
    <div class="p-6">
      <!-- Writing -->
      <div v-if="activeTab === 'writing'">
        <div class="flex justify-between items-center mb-4">
          <p class="text-sm text-gray-500">{{ t('lessons.skills.writing.description') }}</p>
          <button
            v-if="canManage"
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            @click="openWritingForm()"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            {{ t('lessons.skills.writing.addTask') }}
          </button>
        </div>

        <div v-if="skillsStore.writing.loading" class="space-y-3">
          <div v-for="i in 2" :key="i" class="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>

        <div v-else-if="writingTasks.length === 0" class="text-center py-8 text-gray-500">
          {{ t('lessons.skills.writing.empty') }}
        </div>

        <div v-else class="space-y-3">
          <SkillTaskCard
            v-for="task in writingTasks"
            :key="task.id"
            :task="task"
            skill-type="writing"
            @edit="openWritingForm(task)"
            @delete="confirmDelete('writing', task)"
          />
        </div>
      </div>

      <!-- Listening -->
      <div v-if="activeTab === 'listening'">
        <div class="flex justify-between items-center mb-4">
          <p class="text-sm text-gray-500">{{ t('lessons.skills.listening.description') }}</p>
          <button
            v-if="canManage"
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            @click="openListeningForm()"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            {{ t('lessons.skills.listening.addTask') }}
          </button>
        </div>

        <div v-if="skillsStore.listening.loading" class="space-y-3">
          <div v-for="i in 2" :key="i" class="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>

        <div v-else-if="listeningTasks.length === 0" class="text-center py-8 text-gray-500">
          {{ t('lessons.skills.listening.empty') }}
        </div>

        <div v-else class="space-y-3">
          <SkillTaskCard
            v-for="task in listeningTasks"
            :key="task.id"
            :task="task"
            skill-type="listening"
            @edit="openListeningForm(task)"
            @delete="confirmDelete('listening', task)"
          />
        </div>
      </div>

      <!-- Speaking -->
      <div v-if="activeTab === 'speaking'">
        <div class="flex justify-between items-center mb-4">
          <p class="text-sm text-gray-500">{{ t('lessons.skills.speaking.description') }}</p>
          <button
            v-if="canManage"
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            @click="openSpeakingForm()"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            {{ t('lessons.skills.speaking.addTask') }}
          </button>
        </div>

        <div v-if="skillsStore.speaking.loading" class="space-y-3">
          <div v-for="i in 2" :key="i" class="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>

        <div v-else-if="speakingTasks.length === 0" class="text-center py-8 text-gray-500">
          {{ t('lessons.skills.speaking.empty') }}
        </div>

        <div v-else class="space-y-3">
          <SkillTaskCard
            v-for="task in speakingTasks"
            :key="task.id"
            :task="task"
            skill-type="speaking"
            @edit="openSpeakingForm(task)"
            @delete="confirmDelete('speaking', task)"
          />
        </div>
      </div>

      <!-- Reading -->
      <div v-if="activeTab === 'reading'">
        <div class="flex justify-between items-center mb-4">
          <p class="text-sm text-gray-500">{{ t('lessons.skills.reading.description') }}</p>
          <button
            v-if="canManage"
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            @click="openReadingForm()"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            {{ t('lessons.skills.reading.addTask') }}
          </button>
        </div>

        <div v-if="skillsStore.reading.loading" class="space-y-3">
          <div v-for="i in 2" :key="i" class="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>

        <div v-else-if="readingTasks.length === 0" class="text-center py-8 text-gray-500">
          {{ t('lessons.skills.reading.empty') }}
        </div>

        <div v-else class="space-y-3">
          <SkillTaskCard
            v-for="task in readingTasks"
            :key="task.id"
            :task="task"
            skill-type="reading"
            @edit="openReadingForm(task)"
            @delete="confirmDelete('reading', task)"
          />
        </div>
      </div>
    </div>

    <!-- Form modals -->
    <WritingTaskForm
      v-model:show="showWritingForm"
      :task="selectedTask"
      :saving="saving"
      @save="handleSaveWriting"
    />

    <ListeningTaskForm
      v-model:show="showListeningForm"
      :task="selectedTask"
      :saving="saving"
      @save="handleSaveListening"
    />

    <SpeakingTaskForm
      v-model:show="showSpeakingForm"
      :task="selectedTask"
      :saving="saving"
      @save="handleSaveSpeaking"
    />

    <ReadingTaskForm
      v-model:show="showReadingForm"
      :task="selectedTask"
      :saving="saving"
      @save="handleSaveReading"
    />

    <!-- Delete confirmation -->
    <BaseModal
      :show="showDeleteConfirm"
      :title="t('lessons.skills.deleteTitle')"
      size="sm"
      @update:show="showDeleteConfirm = $event"
    >
      <p class="text-gray-600">{{ t('lessons.skills.deleteConfirm') }}</p>
      <template #footer>
        <button
          type="button"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          @click="showDeleteConfirm = false"
        >
          {{ t('common.actions.cancel') }}
        </button>
        <button
          type="button"
          class="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
          :disabled="deleting"
          @click="handleDelete"
        >
          {{ deleting ? t('common.loading') : t('common.actions.delete') }}
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useNotivue } from 'notivue';
import BaseModal from '@/components/common/BaseModal.vue';
import SkillTaskCard from './english/SkillTaskCard.vue';
import WritingTaskForm from './english/WritingTaskForm.vue';
import ListeningTaskForm from './english/ListeningTaskForm.vue';
import SpeakingTaskForm from './english/SpeakingTaskForm.vue';
import ReadingTaskForm from './english/ReadingTaskForm.vue';
import { useEnglishSkillsStore } from '@/stores/englishSkills';

const props = defineProps({
  lessonId: { type: [Number, String], required: true },
  canManage: { type: Boolean, default: false }
});

const { t } = useI18n();
const { push } = useNotivue();
const skillsStore = useEnglishSkillsStore();

const activeTab = ref('writing');
const selectedTask = ref(null);
const deleteSkillType = ref(null);
const showWritingForm = ref(false);
const showListeningForm = ref(false);
const showSpeakingForm = ref(false);
const showReadingForm = ref(false);
const showDeleteConfirm = ref(false);
const saving = ref(false);
const deleting = ref(false);

const writingTasks = computed(() => skillsStore.writingTasks);
const listeningTasks = computed(() => skillsStore.listeningTasks);
const speakingTasks = computed(() => skillsStore.speakingTasks);
const readingTasks = computed(() => skillsStore.readingTasks);

const tabs = computed(() => [
  { id: 'writing', label: t('lessons.skills.writing.tab'), count: writingTasks.value.length },
  { id: 'listening', label: t('lessons.skills.listening.tab'), count: listeningTasks.value.length },
  { id: 'speaking', label: t('lessons.skills.speaking.tab'), count: speakingTasks.value.length },
  { id: 'reading', label: t('lessons.skills.reading.tab'), count: readingTasks.value.length }
]);

onMounted(() => {
  loadAllSkills();
});

const loadAllSkills = async () => {
  try {
    await skillsStore.fetchAllSkills(props.lessonId);
  } catch (error) {
    console.error('Failed to load skills:', error);
  }
};

// Writing
const openWritingForm = (task = null) => {
  selectedTask.value = task;
  showWritingForm.value = true;
};

const handleSaveWriting = async (data) => {
  saving.value = true;
  try {
    if (data.id) {
      await skillsStore.updateWritingTask(data.id, data, props.lessonId);
    } else {
      await skillsStore.createWritingTask(props.lessonId, data);
    }
    push.success({ title: t('lessons.skills.saveSuccess') });
    showWritingForm.value = false;
  } catch (error) {
    push.error({ title: error.message });
  } finally {
    saving.value = false;
  }
};

// Listening
const openListeningForm = (task = null) => {
  selectedTask.value = task;
  showListeningForm.value = true;
};

const handleSaveListening = async (data) => {
  saving.value = true;
  try {
    if (data.id) {
      await skillsStore.updateListeningTask(data.id, data, props.lessonId);
    } else {
      await skillsStore.createListeningTask(props.lessonId, data);
    }
    push.success({ title: t('lessons.skills.saveSuccess') });
    showListeningForm.value = false;
  } catch (error) {
    push.error({ title: error.message });
  } finally {
    saving.value = false;
  }
};

// Speaking
const openSpeakingForm = (task = null) => {
  selectedTask.value = task;
  showSpeakingForm.value = true;
};

const handleSaveSpeaking = async (data) => {
  saving.value = true;
  try {
    if (data.id) {
      await skillsStore.updateSpeakingTask(data.id, data, props.lessonId);
    } else {
      await skillsStore.createSpeakingTask(props.lessonId, data);
    }
    push.success({ title: t('lessons.skills.saveSuccess') });
    showSpeakingForm.value = false;
  } catch (error) {
    push.error({ title: error.message });
  } finally {
    saving.value = false;
  }
};

// Reading
const openReadingForm = (task = null) => {
  selectedTask.value = task;
  showReadingForm.value = true;
};

const handleSaveReading = async (data) => {
  saving.value = true;
  try {
    if (data.id) {
      await skillsStore.updateReadingTask(data.id, data, props.lessonId);
    } else {
      await skillsStore.createReadingTask(props.lessonId, data);
    }
    push.success({ title: t('lessons.skills.saveSuccess') });
    showReadingForm.value = false;
  } catch (error) {
    push.error({ title: error.message });
  } finally {
    saving.value = false;
  }
};

// Delete
const confirmDelete = (skillType, task) => {
  deleteSkillType.value = skillType;
  selectedTask.value = task;
  showDeleteConfirm.value = true;
};

const handleDelete = async () => {
  if (!selectedTask.value || !deleteSkillType.value) return;

  deleting.value = true;
  try {
    const deleteMethod = `delete${deleteSkillType.value.charAt(0).toUpperCase() + deleteSkillType.value.slice(1)}Task`;
    await skillsStore[deleteMethod](selectedTask.value.id, props.lessonId);
    push.success({ title: t('lessons.skills.deleteSuccess') });
    showDeleteConfirm.value = false;
    selectedTask.value = null;
  } catch (error) {
    push.error({ title: error.message });
  } finally {
    deleting.value = false;
  }
};
</script>
