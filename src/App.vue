<template>
  <Notivue v-slot="{ item, close }">
    <Notifications :item="item" :close="close" />
  </Notivue>
  <RouterView v-slot="{ Component, route }">
    <component :is="resolveLayout(route)">
      <component :is="Component" />
    </component>
  </RouterView>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { Notivue, Notifications } from 'notivue';
import StudentLayout from '@/layouts/StudentLayout.vue';
import TeacherLayout from '@/layouts/TeacherLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

const layouts = {
  app: StudentLayout,
  student: StudentLayout,
  teacher: TeacherLayout,
  control: AdminLayout,
  auth: AuthLayout
};

const resolveLayout = (route) => {
  if (!route) return StudentLayout;
  const key = route.meta?.layout || (route.meta?.requiresAuth ? 'app' : 'auth');
  return layouts[key] || StudentLayout;
};
</script>
