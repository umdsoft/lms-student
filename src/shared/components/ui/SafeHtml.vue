<template>
  <div v-html="sanitized" />
</template>

<script setup>
import { computed } from 'vue';
import { useSanitize } from '@/shared/composables/useSanitize';

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  config: {
    type: Object,
    default: () => ({})
  }
});

const { sanitize } = useSanitize();
const sanitized = computed(() => sanitize(props.content, props.config));
</script>
