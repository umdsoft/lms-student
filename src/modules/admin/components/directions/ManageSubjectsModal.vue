<template>
  <BaseModal
    :show="show"
    title="Fanlarni boshqarish"
    size="lg"
    @update:show="$emit('update:show', $event)"
    @close="handleClose"
  >
    <div class="space-y-6">
      <!-- Add New Subject Form -->
      <div class="rounded-lg bg-blue-50 p-4">
        <h3 class="text-sm font-semibold text-blue-900 mb-3">Yangi fan qo'shish</h3>
        <form @submit.prevent="handleAddSubject" class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Fan nomi *</label>
            <input
              v-model="newSubject.name"
              type="text"
              required
              placeholder="Masalan: Algebra"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tavsif</label>
            <textarea
              v-model="newSubject.description"
              rows="2"
              placeholder="Fan haqida qisqacha ma'lumot"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tartib raqami</label>
              <input
                v-model.number="newSubject.displayOrder"
                type="number"
                min="0"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                v-model="newSubject.isActive"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option :value="true">Aktiv</option>
                <option :value="false">Noaktiv</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            :disabled="loading || !newSubject.name"
            class="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Qo\'shilmoqda...' : 'Fan qo\'shish' }}
          </button>
        </form>
      </div>

      <!-- Existing Subjects List -->
      <div>
        <h3 class="text-sm font-semibold text-gray-900 mb-3">Mavjud fanlar ({{ subjects.length }})</h3>
        <div v-if="subjects.length === 0" class="text-center py-8 text-gray-500 text-sm">
          Hozircha fanlar mavjud emas
        </div>
        <div v-else class="space-y-2 max-h-96 overflow-y-auto">
          <div
            v-for="subject in sortedSubjects"
            :key="subject.id"
            class="flex items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
          >
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h4 class="font-medium text-gray-900 truncate">{{ subject.name }}</h4>
                <span
                  :class="subject.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                >
                  {{ subject.isActive ? 'Aktiv' : 'Noaktiv' }}
                </span>
              </div>
              <p v-if="subject.description" class="text-sm text-gray-600 truncate">{{ subject.description }}</p>
              <p class="text-xs text-gray-500 mt-1">Tartib: {{ subject.displayOrder || 0 }}</p>
            </div>
            <div class="flex items-center gap-1">
              <button
                @click="handleEditSubject(subject)"
                class="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                title="Tahrirlash"
              >
                <PencilIcon class="h-4 w-4" />
              </button>
              <button
                @click="handleDeleteSubject(subject)"
                :disabled="loading"
                class="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                title="O'chirish"
              >
                <TrashIcon class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        @click="handleClose"
        class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Yopish
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useDirectionsStore } from '@/stores/directions';
import { push } from 'notivue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import BaseModal from '@/components/common/BaseModal.vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  directionId: {
    type: [String, Number],
    required: true
  },
  subjects: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:show', 'close']);

const directionsStore = useDirectionsStore();
const loading = ref(false);

const newSubject = ref({
  name: '',
  description: '',
  displayOrder: props.subjects.length,
  isActive: true
});

const sortedSubjects = computed(() => {
  return [...props.subjects].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
});

const resetForm = () => {
  newSubject.value = {
    name: '',
    description: '',
    displayOrder: props.subjects.length,
    isActive: true
  };
};

const handleAddSubject = async () => {
  if (!newSubject.value.name) return;

  loading.value = true;
  try {
    await directionsStore.createSubject(props.directionId, {
      name: newSubject.value.name,
      description: newSubject.value.description,
      displayOrder: newSubject.value.displayOrder || 0,
      isActive: newSubject.value.isActive
    });
    push.success({
      title: 'Muvaffaqiyatli',
      message: 'Fan muvaffaqiyatli qo\'shildi'
    });
    resetForm();
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: error.message || 'Fan qo\'shishda xatolik yuz berdi'
    });
  } finally {
    loading.value = false;
  }
};

const handleEditSubject = (subject) => {
  // Simplified editing - just update the form with existing data
  newSubject.value = {
    name: subject.name,
    description: subject.description || '',
    displayOrder: subject.displayOrder || 0,
    isActive: subject.isActive
  };
  push.info({
    title: 'Ma\'lumot',
    message: 'Formani to\'ldirib, "Fan qo\'shish" tugmasini bosing'
  });
};

const handleDeleteSubject = async (subject) => {
  const confirmed = confirm(`${subject.name} fanni o'chirishni xohlaysizmi?`);
  if (!confirmed) return;

  loading.value = true;
  try {
    await directionsStore.deleteSubject(props.directionId, subject.id);
    push.success({
      title: 'Muvaffaqiyatli',
      message: 'Fan muvaffaqiyatli o\'chirildi'
    });
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: error.message || 'Fan o\'chirishda xatolik yuz berdi'
    });
  } finally {
    loading.value = false;
  }
};

const handleClose = () => {
  resetForm();
  emit('update:show', false);
  emit('close');
};

// Reset form when modal opens
watch(() => props.show, (newVal) => {
  if (newVal) {
    resetForm();
  }
});
</script>
