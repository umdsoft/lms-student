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
import AppLayout from '@/components/layouts/AppLayout.vue';
import AuthLayout from '@/components/layouts/AuthLayout.vue';

const layouts = {
  app: AppLayout,
  auth: AuthLayout
};

const resolveLayout = (route) => {
  if (!route) return AppLayout;
  const key = route.meta?.layout || (route.meta?.requiresAuth ? 'app' : 'auth');
  return layouts[key] || AppLayout;
};
</script>
