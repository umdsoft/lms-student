<template>
  <section class="space-y-8">
    <header class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold text-primary-800">{{ t('courses.title') }}</h2>
      <p class="text-sm text-slate-500">
        {{ t('courses.subtitle') }}
      </p>
    </header>

    <div class="bg-white rounded-3xl p-3">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          @click="activeTab = tab.key"
          class="px-4 py-2 rounded-2xl text-sm font-semibold transition"
          :class="[
            activeTab === tab.key
              ? 'bg-primary-600 text-white shadow'
              : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <CourseCard v-for="course in filteredCourses" :key="course.id" :course="course" />
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import CourseCard from '@/modules/student/components/courses/CourseCard.vue';
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n({ useScope: 'global' });

const activeTab = ref('active');

const tabs = computed(() => tm('courses.tabs') ?? []);
const courses = computed(() => tm('courses.items') ?? []);

const filteredCourses = computed(() =>
  courses.value.filter((course) => {
    if (!course.statusKey) return false;
    return course.statusKey === activeTab.value;
  })
);
</script>
