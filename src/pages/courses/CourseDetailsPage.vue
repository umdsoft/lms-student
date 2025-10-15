<template>
  <section
    v-if="course"
    class="space-y-6 xl:grid xl:h-full xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] xl:items-start xl:gap-8 xl:space-y-0"
  >
    <div class="flex flex-col gap-6 xl:max-h xl:overflow-y-auto xl:pr-2 xl:pb-6">
      <div class="flex flex-col gap-6 rounded-[32px] bg-white p-6 shadow-sm">
        <RouterLink
          :to="{ name: 'courses' }"
          class="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          <span aria-hidden="true">←</span>
          {{ t('courseDetails.backToCourses') }}
        </RouterLink>

        <header class="space-y-4">
          <h1 class="text-2xl font-semibold text-primary-900 md:text-3xl">
            {{ course.title }}
          </h1>
          <div class="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span
              v-if="player.module"
              class="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600"
            >
              {{ t('courseDetails.player.moduleLabel', { module: player.module }) }}
            </span>
            <span>
              {{ t('courseDetails.player.mentorLabel', { mentor: course.mentor }) }}
            </span>
            <span v-if="player.duration" class="flex items-center gap-1">
              <svg viewBox="0 0 24 24" class="h-4 w-4 text-primary-500" fill="none" stroke="currentColor" stroke-width="1.5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6l3.5 3.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ player.duration }}
            </span>
          </div>
          <p class="text-sm leading-relaxed text-slate-600">
            {{ course.description }}
          </p>
        </header>

        <div class="flex flex-1 flex-col gap-6">
          <div class="flex-1 overflow-hidden rounded-3xl bg-slate-900 min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] xl:min-h-[420px]">
            <video
              controls
              class="h-full w-full object-cover"
              :poster="player.poster"
            >
              <source v-for="source in player.sources" :key="source.type" :src="source.url" :type="source.type" />
              {{ t('courseDetails.player.videoNotSupported') }}
            </video>
          </div>

          <div
            v-if="player.nextLesson.title || player.nextLesson.description"
            class="flex flex-col gap-4 rounded-3xl bg-primary-50/60 p-6 md:flex-row md:items-center md:justify-between"
          >
            <div class="space-y-1">
              <p class="text-sm font-semibold uppercase tracking-wide text-primary-600">
                {{ t('courseDetails.player.nextLessonLabel') }}
              </p>
              <p class="text-base font-semibold text-primary-900">{{ player.nextLesson.title }}</p>
              <p class="text-sm text-slate-600">{{ player.nextLesson.description }}</p>
            </div>
            <RouterLink
              :to="{ name: 'courses.details', params: { id: course.id } }"
              class="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-700"
            >
              {{ t('courseDetails.player.continueAction') }}
            </RouterLink>
          </div>
        </div>
      </div>

      <article class="rounded-[32px] bg-white p-6 shadow-sm">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            @click="activeTab = tab.key"
            class="rounded-2xl px-4 py-2 text-sm font-semibold transition"
            :class="[
              activeTab === tab.key
                ? 'bg-primary-600 text-white shadow'
                : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="mt-6 space-y-4">
          <div
            v-for="resource in visibleResources"
            :key="resource.id ?? resource.title"
            class="flex flex-col gap-3 rounded-2xl border border-primary-50/70 bg-primary-50/30 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div class="flex items-start gap-3">
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary-600 shadow-inner">
                <svg
                  v-if="resource.type === 'pdf'"
                  viewBox="0 0 24 24"
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 11V7.5a1.5 1.5 0 011.5-1.5H18M8 11h.01M12 15h.01M8 15h.01M16 15h.01M9 3h6a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2z"
                  />
                </svg>
                <svg
                  v-else-if="resource.type === 'presentation'"
                  viewBox="0 0 24 24"
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4h16v10H4zm4 14l4-4 4 4" />
                </svg>
                <svg
                  v-else-if="resource.type === 'test'"
                  viewBox="0 0 24 24"
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4M7 7h10M7 17h10M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                  />
                </svg>
                <svg
                  v-else-if="resource.type === 'video'"
                  viewBox="0 0 24 24"
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 5v14l11-7z" />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12h6m-6 4h6m-4-8h4m2-3H7a2 2 0 00-2 2v12l4-4h8a2 2 0 002-2V7a2 2 0 00-2-2z"
                  />
                </svg>
              </div>
              <div class="space-y-1">
                <p class="text-sm font-semibold text-primary-900">{{ resource.title }}</p>
                <p class="text-xs text-slate-500">{{ resource.description }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-500">
              <span class="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-medium text-primary-600 shadow-sm">
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l3.5 3.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ resource.duration }}
              </span>
              <RouterLink
                :to="resourceLink(resource)"
                class="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                {{ t('courseDetails.resources.viewAction') }}
              </RouterLink>
            </div>
          </div>
        </div>
      </article>
    </div>

    <aside class="space-y-6 xl:sticky">
      <section class="space-y-4 rounded-[32px] bg-white p-6 shadow-sm">
        <header class="space-y-1">
          <p class="text-xs font-semibold uppercase tracking-wide text-primary-500">
            {{ t('courseDetails.modules.subtitle') }}
          </p>
          <h2 class="text-xl font-semibold text-primary-900">{{ t('courseDetails.modules.title') }}</h2>
        </header>
        <ol class="space-y-4">
          <li
            v-for="(module, index) in modules"
            :key="module.id"
            class="space-y-3 rounded-2xl border border-primary-50/80 p-4"
            :class="[
              moduleStatusClass(module.status),
              isModuleExpanded(module.id) ? 'ring-1 ring-primary-200 shadow-sm' : ''
            ]"
          >
            <button
              type="button"
              class="flex w-full flex-col gap-3 text-left md:flex-row md:items-start md:justify-between"
              @click="toggleModule(module.id)"
              :aria-expanded="isModuleExpanded(module.id)"
              :aria-controls="`module-lessons-${module.id}`"
            >
              <div class="flex items-start gap-3">
                <span class="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-50 text-sm font-semibold text-primary-600">
                  {{ index + 1 }}
                </span>
                <div class="space-y-1">
                  <p class="text-sm font-semibold text-primary-900">{{ module.title }}</p>
                  <p class="text-xs text-slate-500">{{ module.description }}</p>
                </div>
              </div>
              <span
                class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide"
                :class="moduleStatusBadgeClass(module.status)"
              >
                <span class="flex items-center gap-1">
                  <svg
                    v-if="module.status === 'completed'"
                    viewBox="0 0 24 24"
                    class="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg
                    v-else-if="module.status === 'in-progress'"
                    viewBox="0 0 24 24"
                    class="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 5v14l11-7z" />
                  </svg>
                  <svg
                    v-else
                    viewBox="0 0 24 24"
                    class="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 11V7a4 4 0 018 0v4m-8 0h8a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2z"
                    />
                  </svg>
                  {{ t(`courseDetails.modules.status.${module.status}`) }}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4 transition-transform"
                  :class="isModuleExpanded(module.id) ? 'rotate-180' : ''"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>
            <ul
              v-if="isModuleExpanded(module.id)"
              :id="`module-lessons-${module.id}`"
              class="space-y-3 border-t border-primary-100 pt-3"
            >
              <li
                v-for="lesson in module.lessons"
                :key="lesson.title"
                class="flex items-center justify-between gap-3 rounded-2xl bg-primary-50/60 px-4 py-3"
              >
                <div class="flex items-center gap-3">
                  <span class="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-primary-600 shadow-inner">
                    <svg
                      v-if="lesson.status === 'completed'"
                      viewBox="0 0 24 24"
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <svg
                      v-else-if="lesson.status === 'in-progress'"
                      viewBox="0 0 24 24"
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 5v14l11-7z" />
                    </svg>
                    <svg
                      v-else
                      viewBox="0 0 24 24"
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 11V7a4 4 0 018 0v4m-8 0h8a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2z"
                      />
                    </svg>
                  </span>
                  <div class="space-y-1">
                    <p class="text-sm font-medium text-primary-900">{{ lesson.title }}</p>
                    <p class="text-xs text-slate-500">{{ lesson.duration }}</p>
                  </div>
                </div>
                <span class="text-xs font-semibold uppercase tracking-wide text-primary-500">
                  {{ t(`courseDetails.modules.status.${lesson.status}`) }}
                </span>
              </li>
            </ul>
          </li>
        </ol>
      </section>

      <section class="space-y-4 rounded-[32px] bg-white p-6 shadow-sm">
        <header class="space-y-1">
          <p class="text-xs font-semibold uppercase tracking-wide text-primary-500">
            {{ t('courseDetails.results.subtitle') }}
          </p>
          <h2 class="text-xl font-semibold text-primary-900">{{ t('courseDetails.results.title') }}</h2>
        </header>
        <div class="space-y-3">
          <div
            v-for="item in results.summary"
            :key="item.label"
            class="flex items-center justify-between gap-3 rounded-2xl bg-primary-50/60 px-4 py-3"
          >
            <div>
              <p class="text-xs font-semibold uppercase tracking-wide text-primary-500">{{ item.label }}</p>
              <p class="text-lg font-semibold text-primary-900">{{ item.value }}</p>
            </div>
            <span v-if="item.hint" class="text-xs text-slate-500">{{ item.hint }}</span>
          </div>
        </div>
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-primary-900">{{ t('courseDetails.results.milestonesTitle') }}</h3>
          <ul class="space-y-3">
            <li
              v-for="milestone in results.milestones"
              :key="milestone.title"
              class="flex items-start gap-3 rounded-2xl border border-dashed border-primary-100/70 px-4 py-3"
            >
              <span class="mt-1 h-2.5 w-2.5 rounded-full bg-primary-500"></span>
              <div>
                <p class="text-sm font-semibold text-primary-900">{{ milestone.title }}</p>
                <p class="text-xs text-slate-500">{{ milestone.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </aside>
  </section>

  <section
    v-else
    class="flex flex-col items-center justify-center gap-4 rounded-[32px] bg-white p-12 text-center shadow-sm"
  >
    <p class="text-lg font-semibold text-primary-800">{{ t('courseDetails.notFoundTitle') }}</p>
    <p class="max-w-md text-sm text-slate-500">{{ t('courseDetails.notFoundSubtitle') }}</p>
    <RouterLink
      :to="{ name: 'courses' }"
      class="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary-700"
    >
      {{ t('courseDetails.backToCourses') }}
    </RouterLink>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n({ useScope: 'global' });
const route = useRoute();

const courses = computed(() => tm('courses.items') ?? []);
const course = computed(() => courses.value.find((item) => item.id === route.params.id));

const details = computed(() => tm('courseDetails') ?? {});
const player = computed(() => ({
  module: details.value.player?.module ?? '',
  duration: details.value.player?.duration ?? '',
  poster: details.value.player?.poster ?? '',
  sources: details.value.player?.sources ?? [],
  nextLesson: details.value.player?.nextLesson ?? { title: '', description: '' }
}));
const tabs = computed(() => details.value.tabs ?? []);
const resources = computed(() => details.value.resources ?? {});
const modules = computed(() => details.value.modulesData ?? []);
const results = computed(() => details.value.results ?? { summary: [], milestones: [] });

const activeTab = ref('');
const expandedModuleId = ref(null);

watch(
  tabs,
  (nextTabs) => {
    if (!nextTabs?.length) {
      activeTab.value = '';
      return;
    }
    if (!nextTabs.some((tab) => tab.key === activeTab.value)) {
      activeTab.value = nextTabs[0].key;
    }
  },
  { immediate: true }
);

watch(
  () => route.params.id,
  () => {
    if (tabs.value?.length) {
      activeTab.value = tabs.value[0].key;
    }
  }
);

watch(
  modules,
  (nextModules) => {
    if (!nextModules?.length) {
      expandedModuleId.value = null;
      return;
    }

    const defaultModule =
      nextModules.find((module) => module.status === 'in-progress') ??
      nextModules.find((module) => module.status === 'unlocked') ??
      nextModules[0];

    expandedModuleId.value = defaultModule?.id ?? null;
  },
  { immediate: true }
);

const visibleResources = computed(() => {
  if (!activeTab.value) return [];
  return resources.value?.[activeTab.value] ?? [];
});

const resourceLink = (resource) => {
  if (resource?.type === 'test' && resource?.id) {
    return { name: 'courses.test-solve', params: { id: course.value?.id ?? route.params.id, testId: resource.id } };
  }
  return { name: 'courses.details', params: { id: course.value?.id ?? route.params.id } };
};

const isModuleExpanded = (moduleId) => expandedModuleId.value === moduleId;

const toggleModule = (moduleId) => {
  expandedModuleId.value = isModuleExpanded(moduleId) ? null : moduleId;
};

const moduleStatusClass = (status) => {
  if (status === 'locked') {
    return 'border-dashed bg-slate-50 text-slate-400';
  }
  if (status === 'completed') {
    return 'border-primary-100 bg-primary-50/40';
  }
  return 'border-primary-100 bg-white';
};

const moduleStatusBadgeClass = (status) => {
  if (status === 'locked') {
    return 'rounded-full border border-dashed border-slate-200 bg-white/80 px-3 py-1 text-slate-400';
  }
  if (status === 'completed') {
    return 'rounded-full bg-primary-50 px-3 py-1 text-primary-600';
  }
  return 'rounded-full bg-primary-50/70 px-3 py-1 text-primary-500';
};
</script>
