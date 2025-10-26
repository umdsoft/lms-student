<template>
  <div class="line-chart-container">
    <svg :width="width" :height="height" class="line-chart">
      <!-- Grid Lines -->
      <g v-if="showGrid" class="grid">
        <line
          v-for="i in gridLines"
          :key="`h-${i}`"
          :x1="padding"
          :y1="padding + (chartHeight / gridLines) * i"
          :x2="width - padding"
          :y2="padding + (chartHeight / gridLines) * i"
          stroke="#e5e7eb"
          stroke-width="1"
        />
      </g>

      <!-- Data Line -->
      <path
        :d="linePath"
        fill="none"
        :stroke="color"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- Area Fill (optional) -->
      <path
        v-if="filled"
        :d="areaPath"
        :fill="color"
        fill-opacity="0.1"
      />

      <!-- Data Points -->
      <g v-if="showPoints">
        <circle
          v-for="(point, index) in points"
          :key="index"
          :cx="point.x"
          :cy="point.y"
          :r="pointRadius"
          :fill="color"
          class="chart-point"
        >
          <title>{{ labels[index] }}: {{ data[index] }}</title>
        </circle>
      </g>

      <!-- Labels -->
      <g v-if="showLabels" class="labels">
        <text
          v-for="(label, index) in labels"
          :key="index"
          :x="padding + (chartWidth / (labels.length - 1)) * index"
          :y="height - padding + 20"
          text-anchor="middle"
          font-size="12"
          fill="#6b7280"
        >
          {{ label }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
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
  filled: {
    type: Boolean,
    default: false
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

const chartWidth = computed(() => props.width - props.padding * 2)
const chartHeight = computed(() => props.height - props.padding * 2)

const maxValue = computed(() => Math.max(...props.data))
const minValue = computed(() => Math.min(...props.data, 0))
const valueRange = computed(() => maxValue.value - minValue.value || 1)

const points = computed(() => {
  return props.data.map((value, index) => {
    const x = props.padding + (chartWidth.value / (props.data.length - 1)) * index
    const y = props.padding + chartHeight.value - ((value - minValue.value) / valueRange.value) * chartHeight.value
    return { x, y }
  })
})

const linePath = computed(() => {
  return points.value.map((point, index) => {
    const command = index === 0 ? 'M' : 'L'
    return `${command} ${point.x} ${point.y}`
  }).join(' ')
})

const areaPath = computed(() => {
  const bottomY = props.padding + chartHeight.value
  const firstPoint = points.value[0]
  const lastPoint = points.value[points.value.length - 1]

  return `
    M ${firstPoint.x} ${bottomY}
    L ${firstPoint.x} ${firstPoint.y}
    ${linePath.value.substring(2)}
    L ${lastPoint.x} ${bottomY}
    Z
  `
})
</script>

<style scoped>
.line-chart-container {
  @apply w-full;
}

.line-chart {
  @apply w-full h-auto;
}

.chart-point {
  @apply cursor-pointer transition-all;
}

.chart-point:hover {
  r: 6;
}
</style>
