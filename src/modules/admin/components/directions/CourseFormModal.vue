<template>
  <BaseModal
    :show="show"
    :title="mode === 'edit' ? 'Kursni tahrirlash' : 'Yangi kurs qo\'shish'"
    size="lg"
    @update:show="$emit('update:show', $event)"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Course Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Kurs nomi <span class="text-red-500">*</span>
        </label>
        <input
          v-model="formData.title"
          type="text"
          required
          placeholder="Masalan: Algebra asoslari"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <!-- Course Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Tavsif
        </label>
        <textarea
          v-model="formData.description"
          rows="4"
          placeholder="Kurs haqida batafsil ma'lumot"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        ></textarea>
      </div>

      <!-- Subject Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Fan <span class="text-red-500">*</span>
        </label>
        <select
          v-model="formData.subjectId"
          required
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Fanni tanlang</option>
          <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
            {{ subject.name }}
          </option>
        </select>
      </div>

      <!-- Price and Duration -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Narxi (so'm)
          </label>
          <input
            v-model.number="formData.price"
            type="number"
            min="0"
            step="1000"
            placeholder="0"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Davomiyligi (soat)
          </label>
          <input
            v-model.number="formData.duration"
            type="number"
            min="0"
            placeholder="0"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- Level -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Daraja
        </label>
        <select
          v-model="formData.level"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="beginner">Boshlang'ich</option>
          <option value="intermediate">O'rta</option>
          <option value="advanced">Yuqori</option>
        </select>
      </div>

      <!-- Published Status -->
      <div class="flex items-center gap-3">
        <input
          id="is-published"
          v-model="formData.isPublished"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label for="is-published" class="text-sm font-medium text-gray-700">
          Kursni darhol nashr qilish
        </label>
      </div>
    </form>

    <template #footer>
      <button
        @click="handleClose"
        type="button"
        class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Bekor qilish
      </button>
      <button
        @click="handleSubmit"
        :disabled="loading || !formData.title || !formData.subjectId"
        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? 'Saqlanmoqda...' : (mode === 'edit' ? 'Saqlash' : 'Yaratish') }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useDirectionsStore } from '@/stores/directions';
import { push } from 'notivue';
import BaseModal from '@/components/common/BaseModal.vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit'].includes(value)
  },
  directionId: {
    type: [String, Number],
    required: true
  },
  subjects: {
    type: Array,
    default: () => []
  },
  course: {
    type: [Object, null],
    default: null
  }
});

const emit = defineEmits(['update:show', 'close', 'success']);

const directionsStore = useDirectionsStore();
const loading = ref(false);

const formData = ref({
  title: '',
  description: '',
  subjectId: '',
  price: 0,
  duration: 0,
  level: 'beginner',
  isPublished: false
});

const resetForm = () => {
  if (props.mode === 'edit' && props.course) {
    formData.value = {
      title: props.course.title || props.course.name || '',
      description: props.course.description || '',
      subjectId: props.course.subjectId || '',
      price: props.course.price || 0,
      duration: props.course.duration || 0,
      level: props.course.level || 'beginner',
      isPublished: props.course.isPublished || false
    };
  } else {
    formData.value = {
      title: '',
      description: '',
      subjectId: '',
      price: 0,
      duration: 0,
      level: 'beginner',
      isPublished: false
    };
  }
};

const handleSubmit = async () => {
  if (!formData.value.title || !formData.value.subjectId) {
    push.error({
      title: 'Xatolik',
      message: 'Iltimos, barcha majburiy maydonlarni to\'ldiring'
    });
    return;
  }

  loading.value = true;
  try {
    const courseData = {
      title: formData.value.title,
      name: formData.value.title, // Backend might expect 'name' field
      description: formData.value.description,
      subjectId: formData.value.subjectId,
      price: formData.value.price || 0,
      duration: formData.value.duration || 0,
      level: formData.value.level,
      isPublished: formData.value.isPublished
    };

    if (props.mode === 'edit' && props.course) {
      await directionsStore.updateCourse(props.directionId, props.course.id, courseData);
      push.success({
        title: 'Muvaffaqiyatli',
        message: 'Kurs muvaffaqiyatli yangilandi'
      });
    } else {
      await directionsStore.createCourse(props.directionId, courseData);
      push.success({
        title: 'Muvaffaqiyatli',
        message: 'Kurs muvaffaqiyatli yaratildi'
      });
    }

    emit('success');
    handleClose();
  } catch (error) {
    push.error({
      title: 'Xatolik',
      message: error.message || 'Kursni saqlashda xatolik yuz berdi'
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

// Reset form when modal opens or course prop changes
watch([() => props.show, () => props.course], ([newShow]) => {
  if (newShow) {
    resetForm();
  }
}, { immediate: true });
</script>
