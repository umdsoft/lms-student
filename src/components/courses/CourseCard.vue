<template>
  <div
    class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
  >
    <!-- Thumbnail with gradient fallback -->
    <div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
      <img
        v-if="course.thumbnail"
        :src="course.thumbnail"
        :alt="course.name"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-white">
        <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex-1 flex flex-col">
      <!-- Title and status -->
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-lg font-semibold text-gray-900 flex-1 line-clamp-2">
          {{ course.name }}
        </h3>
        <span
          :class="['ml-2 px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap', statusClass]"
        >
          {{ statusText }}
        </span>
      </div>

      <!-- Description -->
      <p v-if="course.description" class="text-sm text-gray-600 mb-4 line-clamp-2">
        {{ course.description }}
      </p>

      <!-- Info: level, teacher, modules -->
      <div class="space-y-2 mb-4 flex-1">
        <!-- Level -->
        <div class="flex items-center text-sm text-gray-700">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>Daraja: <strong>{{ levelText }}</strong></span>
        </div>

        <!-- Teacher -->
        <div v-if="course.teacher" class="flex items-center text-sm text-gray-700">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>{{ course.teacher.firstName }} {{ course.teacher.lastName }}</span>
        </div>

        <!-- Modules -->
        <div v-if="course.modules && course.modules.length > 0" class="flex items-center text-sm text-gray-700">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Modullar: <strong>{{ course.modules.length }}</strong></span>
        </div>
      </div>

      <!-- Price -->
      <div class="mb-4">
        <div
          v-if="course.pricingType === 'free'"
          class="text-lg font-bold text-green-600"
        >
          Bepul
        </div>
        <div v-else class="text-lg font-bold text-gray-900">
          {{ formatPrice(course.price) }}
          <span class="text-sm font-normal text-gray-500">
            {{ pricingTypeText }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <button
          @click="$emit('view', course)"
          class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          Ko'rish
        </button>
        <button
          @click="$emit('edit', course)"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          title="Tahrirlash"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          @click="$emit('delete', course)"
          class="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
          title="O'chirish"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
});

defineEmits(['view', 'edit', 'delete']);

// Status badge classes and text
const statusClass = computed(() => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-gray-100 text-gray-800',
    archived: 'bg-red-100 text-red-800'
  };
  return classes[props.course.status] || classes.draft;
});

const statusText = computed(() => {
  const texts = {
    active: 'Aktiv',
    draft: 'Qoralama',
    inactive: 'Faol emas',
    archived: 'Arxiv'
  };
  return texts[props.course.status] || 'Qoralama';
});

// Level text
const levelText = computed(() => {
  const levels = {
    beginner: "Boshlang'ich",
    elementary: 'Elementar',
    intermediate: "O'rta",
    advanced: 'Yuqori',
    expert: 'Ekspert'
  };
  return levels[props.course.level] || props.course.level;
});

// Pricing type text
const pricingTypeText = computed(() => {
  const types = {
    'one-time': '(bir martalik)',
    subscription: '(oylik)'
  };
  return types[props.course.pricingType] || '';
});

// Format price
const formatPrice = (price) => {
  if (!price && price !== 0) return "0 so'm";
  return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
