<template>
  <PieChart
    :data="data"
    :labels="labels"
    :colors="colors"
    :size="size"
    :show-labels="showLabels"
    :show-legend="showLegend"
    :label-position="labelPosition"
    :donut="true"
    :donut-width="donutWidth"
  >
    <template v-if="centerText || $slots.center">
      <div class="donut-center">
        <slot name="center">
          <div class="donut-center-text">{{ centerText }}</div>
        </slot>
      </div>
    </template>
  </PieChart>
</template>

<script setup>
import PieChart from './PieChart.vue'

defineProps({
  data: {
    type: Array,
    required: true
  },
  labels: {
    type: Array,
    default: () => []
  },
  colors: {
    type: Array,
    default: () => ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']
  },
  size: {
    type: Number,
    default: 300
  },
  showLabels: {
    type: Boolean,
    default: false
  },
  showLegend: {
    type: Boolean,
    default: true
  },
  labelPosition: {
    type: String,
    default: 'outside'
  },
  donutWidth: {
    type: Number,
    default: 40
  },
  centerText: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.donut-center {
  @apply absolute inset-0 flex items-center justify-center;
}

.donut-center-text {
  @apply text-2xl font-bold text-gray-900;
}
</style>
