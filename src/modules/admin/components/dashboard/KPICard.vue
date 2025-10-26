<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600">{{ title }}</p>
        <div class="mt-3 flex items-baseline gap-2">
          <p class="text-3xl font-bold text-gray-900">{{ formattedValue }}</p>
          <span v-if="change" :class="trendClass" class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold">
            <component :is="trendIcon" class="h-3 w-3" />
            {{ change }}
          </span>
        </div>
      </div>
      <div v-if="icon" :class="iconBgClass" class="rounded-xl p-3">
        <component :is="icon" :class="iconColorClass" class="h-6 w-6" />
      </div>
    </div>
    <p v-if="subtitle" class="mt-3 text-sm text-gray-500">{{ subtitle }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UsersIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  AcademicCapIcon
} from '@heroicons/vue/24/outline';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  change: {
    type: String,
    default: null
  },
  trend: {
    type: String,
    default: 'neutral', // up, down, neutral
    validator: (value) => ['up', 'down', 'neutral'].includes(value)
  },
  icon: {
    type: [Object, String],
    default: null
  },
  color: {
    type: String,
    default: 'blue', // blue, green, purple, orange
    validator: (value) => ['blue', 'green', 'purple', 'orange', 'red'].includes(value)
  },
  format: {
    type: String,
    default: 'number', // number, currency, percentage
    validator: (value) => ['number', 'currency', 'percentage'].includes(value)
  },
  subtitle: {
    type: String,
    default: null
  }
});

const formattedValue = computed(() => {
  if (props.format === 'currency') {
    return new Intl.NumberFormat('uz-UZ').format(props.value) + ' so\'m';
  } else if (props.format === 'percentage') {
    return props.value + '%';
  }
  return new Intl.NumberFormat('uz-UZ').format(props.value);
});

const trendIcon = computed(() => {
  return props.trend === 'up' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
});

const trendClass = computed(() => {
  if (props.trend === 'up') {
    return 'bg-green-50 text-green-700';
  } else if (props.trend === 'down') {
    return 'bg-red-50 text-red-700';
  }
  return 'bg-gray-50 text-gray-700';
});

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600'
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600'
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600'
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-orange-600'
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600'
  }
};

const iconBgClass = computed(() => colorMap[props.color]?.bg || colorMap.blue.bg);
const iconColorClass = computed(() => colorMap[props.color]?.icon || colorMap.blue.icon);
</script>
