<template>
  <div class="pie-chart-container">
    <svg :width="size" :height="size" class="pie-chart">
      <g :transform="`translate(${center}, ${center})`">
        <!-- Pie Slices -->
        <g class="slices">
          <path
            v-for="(slice, index) in slices"
            :key="index"
            :d="slice.path"
            :fill="getColor(index)"
            :class="['slice', { 'slice-active': activeIndex === index }]"
            @mouseenter="activeIndex = index"
            @mouseleave="activeIndex = null"
          >
            <title>{{ labels[index] }}: {{ data[index] }} ({{ slice.percentage }}%)</title>
          </path>
        </g>

        <!-- Labels (if outside) -->
        <g v-if="showLabels && labelPosition === 'outside'" class="labels">
          <text
            v-for="(slice, index) in slices"
            :key="index"
            :x="slice.labelX"
            :y="slice.labelY"
            text-anchor="middle"
            font-size="12"
            fill="#374151"
            font-weight="500"
          >
            {{ labels[index] }}
          </text>
        </g>
      </g>
    </svg>

    <!-- Legend -->
    <div v-if="showLegend" class="pie-chart-legend">
      <div
        v-for="(label, index) in labels"
        :key="index"
        class="legend-item"
        @mouseenter="activeIndex = index"
        @mouseleave="activeIndex = null"
      >
        <span class="legend-color" :style="{ backgroundColor: getColor(index) }"></span>
        <span class="legend-label">{{ label }}</span>
        <span class="legend-value">{{ data[index] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
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
    default: 'outside',
    validator: (value) => ['inside', 'outside'].includes(value)
  },
  donut: {
    type: Boolean,
    default: false
  },
  donutWidth: {
    type: Number,
    default: 40
  }
})

const activeIndex = ref(null)

const center = computed(() => props.size / 2)
const radius = computed(() => props.size / 2 - 20)
const innerRadius = computed(() => props.donut ? radius.value - props.donutWidth : 0)

const total = computed(() => props.data.reduce((sum, value) => sum + value, 0))

const slices = computed(() => {
  let currentAngle = -Math.PI / 2 // Start from top

  return props.data.map((value, index) => {
    const percentage = ((value / total.value) * 100).toFixed(1)
    const angle = (value / total.value) * Math.PI * 2
    const endAngle = currentAngle + angle

    const x1 = Math.cos(currentAngle) * radius.value
    const y1 = Math.sin(currentAngle) * radius.value
    const x2 = Math.cos(endAngle) * radius.value
    const y2 = Math.sin(endAngle) * radius.value

    const largeArc = angle > Math.PI ? 1 : 0

    let path
    if (props.donut) {
      const ix1 = Math.cos(currentAngle) * innerRadius.value
      const iy1 = Math.sin(currentAngle) * innerRadius.value
      const ix2 = Math.cos(endAngle) * innerRadius.value
      const iy2 = Math.sin(endAngle) * innerRadius.value

      path = `
        M ${x1} ${y1}
        A ${radius.value} ${radius.value} 0 ${largeArc} 1 ${x2} ${y2}
        L ${ix2} ${iy2}
        A ${innerRadius.value} ${innerRadius.value} 0 ${largeArc} 0 ${ix1} ${iy1}
        Z
      `
    } else {
      path = `
        M 0 0
        L ${x1} ${y1}
        A ${radius.value} ${radius.value} 0 ${largeArc} 1 ${x2} ${y2}
        Z
      `
    }

    // Label position
    const labelAngle = currentAngle + angle / 2
    const labelRadius = radius.value + 20
    const labelX = Math.cos(labelAngle) * labelRadius
    const labelY = Math.sin(labelAngle) * labelRadius

    currentAngle = endAngle

    return {
      path,
      percentage,
      labelX,
      labelY
    }
  })
})

const getColor = (index) => {
  return props.colors[index % props.colors.length]
}
</script>

<style scoped>
.pie-chart-container {
  @apply flex flex-col items-center gap-4;
}

.pie-chart {
  @apply w-full h-auto;
}

.slice {
  @apply cursor-pointer transition-all;
}

.slice:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.slice-active {
  transform: scale(1.05);
}

.pie-chart-legend {
  @apply grid grid-cols-2 gap-2 w-full;
}

.legend-item {
  @apply flex items-center gap-2 px-3 py-2 rounded-md;
  @apply hover:bg-gray-50 cursor-pointer transition-colors;
}

.legend-color {
  @apply w-3 h-3 rounded-full flex-shrink-0;
}

.legend-label {
  @apply flex-1 text-sm text-gray-700;
}

.legend-value {
  @apply text-sm font-medium text-gray-900;
}
</style>
