<template>
  <ul :class="depth === 0 ? 'space-y-1' : 'mt-2 space-y-1 border-l-2 border-slate-200/60 pl-4 ml-2'">
    <li v-for="item in items" :key="item.id" class="space-y-1">
      <component
        :is="itemComponent(item)"
        v-bind="linkProps(item)"
        class="group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200"
        :class="itemClasses(item)"
        @click="handleNavigate(item)"
      >
        <!-- Icon (Component or Emoji) -->
        <component
          v-if="item.iconComponent"
          :is="item.iconComponent"
          :size="18"
          class="flex-shrink-0 transition-transform group-hover:scale-110"
          :class="item.active ? 'text-primary-600' : 'text-slate-500 group-hover:text-primary-500'"
        />
        <span v-else-if="item.icon" class="text-lg flex-shrink-0">{{ item.icon }}</span>

        <!-- Label -->
        <span class="flex-1 truncate">{{ item.label }}</span>

        <!-- Badge -->
        <span
          v-if="shouldShowBadge(item)"
          class="inline-flex items-center justify-center min-w-[20px] rounded-full px-2 py-0.5 text-xs font-bold transition-colors"
          :class="item.active
            ? 'bg-primary-600 text-white'
            : 'bg-slate-200 text-slate-700 group-hover:bg-primary-100 group-hover:text-primary-700'"
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
      ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 shadow-sm border-l-4 border-primary-500'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent hover:border-slate-300';
  }
  return 'bg-slate-50/60 text-slate-500 cursor-default border-l-4 border-transparent';
}

function handleNavigate(item) {
  if (item.to) {
    emit('navigate');
  }
}
</script>
