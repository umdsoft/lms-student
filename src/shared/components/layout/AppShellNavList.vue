<template>
  <ul :class="depth === 0 ? 'space-y-1' : 'mt-1 space-y-1 border-l border-slate-200 pl-4'">
    <li v-for="item in items" :key="item.id" class="space-y-1">
      <component
        :is="itemComponent(item)"
        v-bind="linkProps(item)"
        class="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
        :class="itemClasses(item)"
        @click="handleNavigate(item)"
      >
        <span v-if="item.icon" class="text-lg">{{ item.icon }}</span>
        <span class="flex-1 truncate">{{ item.label }}</span>
        <span
          v-if="shouldShowBadge(item)"
          class="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
        >
          {{ item.badge }}
        </span>
      </component>
      <AppShellNavList
        v-if="item.children?.length"
        :items="item.children"
        :depth="depth + 1"
        @navigate="$emit('navigate')"
      />
    </li>
  </ul>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  depth: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['navigate']);

const defaultItem = { label: '', to: null, active: false, badge: null, icon: null };

function itemComponent(item) {
  return item.to ? RouterLink : 'div';
}

function linkProps(item) {
  if (!item.to) {
    return {
      role: 'presentation'
    };
  }

  return {
    to: item.to
  };
}

function shouldShowBadge(item) {
  return typeof item.badge === 'number' ? item.badge > 0 : Boolean(item.badge);
}

function itemClasses(item) {
  const normalized = { ...defaultItem, ...item };
  if (normalized.to) {
    return normalized.active
      ? 'border border-primary-100 bg-primary-50 text-primary-700'
      : 'border border-transparent text-slate-600 hover:border-slate-200 hover:bg-surface';
  }
  return 'border border-transparent bg-surface/60 text-slate-500';
}

function handleNavigate(item) {
  if (item.to) {
    emit('navigate');
  }
}
</script>
