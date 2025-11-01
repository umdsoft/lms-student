<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150',
      badgeClass
    ]"
  >
    <span
      class="mr-2 inline-block h-2 w-2 rounded-full"
      :class="dotClass"
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
    default: 'inactive'
  }
});

const { t } = useI18n();

const normalizedStatus = computed(() => props.status?.toLowerCase() || 'inactive');

const badgeClass = computed(() => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800'
  };
  return classes[normalizedStatus.value] || classes.inactive;
});

const dotClass = computed(() => {
  const classes = {
    active: 'bg-green-500',
    inactive: 'bg-gray-400'
  };
  return classes[normalizedStatus.value] || classes.inactive;
});

const statusLabel = computed(() => {
  const key = `directions.status.${normalizedStatus.value}`;
  return t(key);
});
</script>
