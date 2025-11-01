<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
      roleClasses[role] || roleClasses.student
    ]"
  >
    {{ roleLabel }}
  </span>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  role: {
    type: String,
    required: true,
    validator: (value) => ['student', 'teacher', 'admin'].includes(value)
  }
});

const { t } = useI18n();

// Role badge styling classes
const roleClasses = {
  student: 'bg-blue-100 text-blue-800',
  teacher: 'bg-purple-100 text-purple-800',
  admin: 'bg-red-100 text-red-800'
};

// Get translated role label
const roleLabel = computed(() => {
  return t(`users.roles.${props.role}`);
});
</script>
