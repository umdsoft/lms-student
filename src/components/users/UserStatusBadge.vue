<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
      statusClasses[status] || statusClasses.inactive
    ]"
  >
    <span
      v-if="showDot"
      :class="['mr-1.5 h-2 w-2 rounded-full', dotClasses[status] || dotClasses.inactive]"
    />
    {{ statusLabel }}
  </span>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['active', 'inactive', 'blocked'].includes(value)
  },
  showDot: {
    type: Boolean,
    default: false
  }
});

const { t } = useI18n();

// Status badge styling classes
const statusClasses = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  blocked: 'bg-red-100 text-red-800'
};

// Status dot styling classes
const dotClasses = {
  active: 'bg-green-500',
  inactive: 'bg-gray-500',
  blocked: 'bg-red-500'
};

// Get translated status label
const statusLabel = computed(() => {
  return t(`users.status.${props.status}`);
});
</script>
