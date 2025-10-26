<template>
  <LineChart
    :data="data"
    :labels="labels"
    :width="width"
    :height="height"
    :padding="padding"
    :color="color"
    :stroke-width="strokeWidth"
    :filled="true"
    :show-grid="showGrid"
    :show-points="showPoints"
    :show-labels="showLabels"
    :point-radius="pointRadius"
    :grid-lines="gridLines"
  />
</template>

<script setup>
import LineChart from './LineChart.vue'

defineProps({
  data: {
    type: Array,
    required: true
  },
  labels: {
    type: Array,
    default: () => []
  },
  width: {
    type: Number,
    default: 400
  },
  height: {
    type: Number,
    default: 200
  },
  padding: {
    type: Number,
    default: 40
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  strokeWidth: {
    type: Number,
    default: 2
  },
  showGrid: {
    type: Boolean,
    default: true
  },
  showPoints: {
    type: Boolean,
    default: true
  },
  showLabels: {
    type: Boolean,
    default: true
  },
  pointRadius: {
    type: Number,
    default: 4
  },
  gridLines: {
    type: Number,
    default: 5
  }
})
</script>
