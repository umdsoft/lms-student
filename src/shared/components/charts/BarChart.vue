<template>
  <div class="bar-chart-container">
    <svg :width="width" :height="height" class="bar-chart">
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

      <!-- Bars -->
      <g class="bars">
        <rect
          v-for="(bar, index) in bars"
          :key="index"
          :x="bar.x"
          :y="bar.y"
          :width="bar.width"
          :height="bar.height"
          :fill="getBarColor(index)"
          :rx="barRadius"
          class="chart-bar"
        >
          <title>{{ labels[index] }}: {{ data[index] }}</title>
        </rect>
      </g>

      <!-- Values on top of bars -->
      <g v-if="showValues" class="values">
        <text
          v-for="(bar, index) in bars"
          :key="index"
          :x="bar.x + bar.width / 2"
          :y="bar.y - 5"
          text-anchor="middle"
          font-size="12"
          fill="#374151"
          font-weight="500"
        >
          {{ data[index] }}
        </text>
      </g>

      <!-- Labels -->
      <g v-if="showLabels" class="labels">
        <text
          v-for="(bar, index) in bars"
          :key="index"
          :x="bar.x + bar.width / 2"
          :y="height - padding + 20"
          text-anchor="middle"
          font-size="12"
          fill="#6b7280"
        >
          {{ labels[index] }}
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
    type: [String, Array],
    default: '#3B82F6'
  },
  barRadius: {
    type: Number,
    default: 4
  },
  showGrid: {
    type: Boolean,
    default: true
  },
  showLabels: {
    type: Boolean,
    default: true
  },
  showValues: {
    type: Boolean,
    default: false
  },
  gridLines: {
    type: Number,
    default: 5
  },
  barSpacing: {
    type: Number,
    default: 0.2
  }
})

const chartWidth = computed(() => props.width - props.padding * 2)
const chartHeight = computed(() => props.height - props.padding * 2)

const maxValue = computed(() => Math.max(...props.data, 0))
const valueRange = computed(() => maxValue.value || 1)

const barWidth = computed(() => {
  const totalBars = props.data.length
  const availableWidth = chartWidth.value
  return (availableWidth / totalBars) * (1 - props.barSpacing)
})

const bars = computed(() => {
  return props.data.map((value, index) => {
    const totalBars = props.data.length
    const spacing = (chartWidth.value / totalBars) * props.barSpacing
    const x = props.padding + (chartWidth.value / totalBars) * index + spacing / 2
    const barHeight = (value / valueRange.value) * chartHeight.value
    const y = props.padding + chartHeight.value - barHeight

    return {
      x,
      y,
      width: barWidth.value,
      height: barHeight
    }
  })
})

const getBarColor = (index) => {
  if (Array.isArray(props.color)) {
    return props.color[index % props.color.length]
  }
  return props.color
}
</script>

<style scoped>
.bar-chart-container {
  @apply w-full;
}

.bar-chart {
  @apply w-full h-auto;
}

.chart-bar {
  @apply cursor-pointer transition-all;
}

.chart-bar:hover {
  opacity: 0.8;
}
</style>
