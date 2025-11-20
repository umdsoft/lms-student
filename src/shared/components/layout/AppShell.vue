<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/30 text-ink">
    <div class="flex min-h-screen">
      <!-- Mobile Sidebar Overlay -->
      <Transition name="fade">
        <div
          v-if="isNavOpen"
          class="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          role="presentation"
          @click.self="isNavOpen = false"
        >
          <aside class="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl">
            <div class="flex h-full flex-col">
              <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <slot name="logo">
                  <span class="text-sm font-bold uppercase tracking-wide text-slate-700">{{ t('app.navigation.menuLabel') }}</span>
                </slot>
                <button
                  type="button"
                  class="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                  @click="isNavOpen = false"
                  :aria-label="t('components.appShell.closeMenu')"
                >
                  <X :size="20" />
                </button>
              </div>
              <nav class="flex-1 overflow-y-auto px-4 py-6" :aria-label="t('app.navigation.ariaLabel')">
                <AppShellNavList :items="normalizedNavItems" @navigate="onNavigate" />
              </nav>
              <div class="border-t border-slate-100 px-6 py-5 text-sm text-slate-600">
                <slot name="sidebar-footer" />
              </div>
            </div>
          </aside>
        </div>
      </Transition>

      <!-- Desktop Sidebar (Fixed) -->
      <aside
        class="hidden fixed left-0 top-0 bottom-0 w-72 flex-col border-r border-slate-200/60 bg-white/80 backdrop-blur-xl px-6 py-6 lg:flex overflow-y-auto"
        :aria-label="t('app.navigation.ariaLabel')"
      >
        <div class="flex items-center justify-between gap-2">
          <slot name="logo">
            <span class="text-sm font-bold uppercase tracking-wide text-slate-700">{{ t('app.navigation.menuLabel') }}</span>
          </slot>
        </div>
        <nav class="mt-8 flex-1 space-y-1 overflow-y-auto pr-1">
          <AppShellNavList :items="normalizedNavItems" @navigate="onNavigate" />
        </nav>
        <div v-if="hasSidebarFooter" class="mt-6 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100/50 px-4 py-5 text-sm text-slate-700 shadow-sm">
          <slot name="sidebar-footer" />
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex min-h-screen flex-1 flex-col lg:ml-72">
        <!-- Header (Sticky/Fixed) -->
        <header class="sticky top-0 z-30 border-b border-slate-200/60 bg-white/95 backdrop-blur-xl shadow-sm">
          <div class="mx-auto flex w-full max-w-[1600px] items-start gap-6 px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
            <!-- Mobile Menu Button -->
            <button
              type="button"
              class="mt-1 inline-flex items-center justify-center rounded-xl border border-slate-200 p-2.5 text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 lg:hidden"
              :aria-label="t('components.appShell.openMenu')"
              @click="isNavOpen = true"
            >
              <Menu :size="20" />
            </button>

            <!-- Header Content -->
            <div class="flex-1">
              <slot name="header">
                <p class="text-sm text-slate-500">{{ profile.subtitle }}</p>
                <h1 class="mt-1 text-xl font-semibold text-ink">{{ profile.fullName }}</h1>
              </slot>
            </div>

            <!-- Header Actions -->
            <div class="flex flex-wrap items-center gap-3 sm:gap-4">
              <slot name="header-actions" />

              <!-- Language Switcher -->
              <div v-if="showLocaleSwitcher" class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition-shadow hover:shadow">
                <Globe2 :size="16" class="text-slate-400" />
                <select
                  :value="currentLocale"
                  @change="onLocaleChange"
                  class="bg-transparent text-sm font-medium text-ink focus:outline-none"
                  :aria-label="t('app.language.label')"
                >
                  <option v-for="option in localeOptions" :key="option.code" :value="option.code">
                    {{ option.label }}
                  </option>
                </select>
              </div>

              <!-- Logout Button -->
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow"
                @click="$emit('logout')"
              >
                <LogOut :size="16" />
                <span class="hidden sm:inline">{{ t('app.header.logout') }}</span>
              </button>

              <!-- User Avatar -->
              <div class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <img :src="profile.avatar" :alt="profile.fullName" class="h-9 w-9 rounded-lg object-cover ring-2 ring-white shadow-sm" />
                <div class="hidden text-left text-sm sm:block">
                  <p class="font-semibold text-ink">{{ profile.fullName }}</p>
                  <p v-if="profile.subtitle" class="text-xs text-slate-500">{{ profile.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="flex-1">
          <div class="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue';
import { useI18n } from 'vue-i18n';
import { Menu, X, Globe2, LogOut } from 'lucide-vue-next';
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
    iconComponent: item.iconComponent,
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
/* Fade transitions for mobile overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Smooth scrolling */
aside {
  scroll-behavior: smooth;
}

/* Custom scrollbar for sidebar */
aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Sticky header smooth transition */
header {
  transition: box-shadow 0.2s ease;
}
</style>
