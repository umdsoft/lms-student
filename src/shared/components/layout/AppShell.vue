<template>
  <div class="min-h-screen bg-surface text-ink">
    <div class="flex min-h-screen">
      <Transition name="fade">
        <div
          v-if="isNavOpen"
          class="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          role="presentation"
          @click.self="isNavOpen = false"
        >
          <aside class="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">
            <div class="flex h-full flex-col">
              <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <slot name="logo">
                  <span class="text-sm font-semibold uppercase tracking-wide text-slate-500">{{ t('app.navigation.menuLabel') }}</span>
                </slot>
                <button
                  type="button"
                  class="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-ink"
                  @click="isNavOpen = false"
                  :aria-label="t('components.appShell.closeMenu')"
                >
                  ✕
                </button>
              </div>
              <nav class="flex-1 overflow-y-auto px-4 py-6" :aria-label="t('app.navigation.ariaLabel')">
                <AppShellNavList :items="normalizedNavItems" @navigate="onNavigate" />
              </nav>
              <div class="border-t border-slate-200 px-6 py-4 text-sm text-slate-500">
                <slot name="sidebar-footer" />
              </div>
            </div>
          </aside>
        </div>
      </Transition>

      <aside
        class="hidden w-72 flex-col border-r border-slate-200 bg-white/95 px-6 py-6 lg:flex"
        :aria-label="t('app.navigation.ariaLabel')"
      >
        <div class="flex items-center justify-between gap-2">
          <slot name="logo">
            <span class="text-sm font-semibold uppercase tracking-wide text-slate-500">{{ t('app.navigation.menuLabel') }}</span>
          </slot>
        </div>
        <nav class="mt-6 flex-1 space-y-2 overflow-y-auto pr-1 text-sm">
          <AppShellNavList :items="normalizedNavItems" @navigate="onNavigate" />
        </nav>
        <div v-if="hasSidebarFooter" class="mt-6 rounded-xl border border-slate-200 bg-surface px-4 py-5 text-sm text-slate-600">
          <slot name="sidebar-footer" />
        </div>
      </aside>

      <div class="flex min-h-screen flex-1 flex-col">
        <header class="border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
          <div class="mx-auto flex w-full max-w-6xl items-start gap-6 px-4 py-5 sm:px-6 lg:px-8">
            <button
              type="button"
              class="mt-1 inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-500 hover:text-ink lg:hidden"
              :aria-label="t('components.appShell.openMenu')"
              @click="isNavOpen = true"
            >
              ☰
            </button>
            <div class="flex-1">
              <slot name="header">
                <p class="text-sm text-slate-500">{{ profile.subtitle }}</p>
                <h1 class="mt-1 text-xl font-semibold text-ink">{{ profile.fullName }}</h1>
              </slot>
            </div>
            <div class="flex flex-wrap items-center gap-3 sm:gap-4">
              <slot name="header-actions" />
              <div v-if="showLocaleSwitcher" class="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <span class="hidden text-slate-500 sm:inline">{{ t('app.language.label') }}</span>
                <select
                  :value="currentLocale"
                  @change="onLocaleChange"
                  class="bg-transparent text-sm text-ink focus:outline-none"
                  :aria-label="t('app.language.label')"
                >
                  <option v-for="option in localeOptions" :key="option.code" :value="option.code">
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink transition hover:bg-surface"
                @click="$emit('logout')"
              >
                <span class="hidden sm:inline">{{ t('app.header.logout') }}</span>
                <span aria-hidden="true">↗</span>
              </button>
              <div class="flex items-center gap-2">
                <img :src="profile.avatar" :alt="profile.fullName" class="h-10 w-10 rounded-full object-cover ring-2 ring-white" />
                <div class="hidden text-left text-sm sm:block">
                  <p class="font-semibold text-ink">{{ profile.fullName }}</p>
                  <p v-if="profile.subtitle" class="text-xs text-slate-500">{{ profile.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main class="flex-1 bg-surface/60">
          <div class="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <div class="min-h-[60vh] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <slot />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue';
import { useI18n } from 'vue-i18n';
import AppShellNavList from './AppShellNavList.vue';

const props = defineProps({
  navItems: {
    type: Array,
    default: () => []
  },
  profile: {
    type: Object,
    required: true
  },
  localeOptions: {
    type: Array,
    default: () => []
  },
  currentLocale: {
    type: String,
    default: 'uz'
  }
});

const emit = defineEmits(['change-locale', 'logout']);

const { t } = useI18n({ useScope: 'global' });
const isNavOpen = ref(false);

const slots = useSlots();

const normalizedNavItems = computed(() =>
  props.navItems.map((item, index) => normalizeNavItem(item, String(index)))
);

const hasSidebarFooter = computed(() => Boolean(slots['sidebar-footer']));
const showLocaleSwitcher = computed(() => props.localeOptions.length > 1);

function normalizeNavItem(item, fallbackId) {
  const id = item.id || fallbackId;
  return {
    id,
    label: item.label,
    to: item.to,
    icon: item.icon,
    badge: item.badge,
    description: item.description,
    active: Boolean(item.active),
    children: Array.isArray(item.children)
      ? item.children.map((child, index) => normalizeNavItem(child, `${id}-${index}`))
      : []
  };
}

function onLocaleChange(event) {
  const value = event.target.value;
  emit('change-locale', value);
}

function onNavigate() {
  isNavOpen.value = false;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
