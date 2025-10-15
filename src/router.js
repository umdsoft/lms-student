import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/LoginPage.vue'),
    meta: { layout: 'auth', requiresAuth: false, publicOnly: true }
  },
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/pages/core/DashboardPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Kundalikim',
      layout: 'app'
    }
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('@/pages/courses/CoursesPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Kurslarim',
      layout: 'app'
    }
  },
  {
    path: '/olympiads',
    name: 'olympiads',
    component: () => import('@/pages/olympiads/OlympiadsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Olimpiadalar',
      layout: 'app'
    }
  },
  {
    path: '/profile',
    name: 'profile.overview',
    component: () => import('@/pages/profile/ProfileOverviewPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Profil',
      layout: 'app'
    }
  },
  {
    path: '/profile/settings',
    name: 'profile.settings',
    component: () => import('@/pages/profile/ProfileSettingsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Profil sozlamalari',
      layout: 'app'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/core/NotFoundPage.vue'),
    meta: {
      layout: 'auth'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const allowedRedirects = ['/', '/courses', '/olympiads', '/profile', '/profile/settings'];

router.beforeEach(async (to, from, next) => {
  const { ensureSession, isAuthenticated, user } = useAuth();
  await ensureSession();

  if (to.meta?.publicOnly && isAuthenticated.value) {
    return next({ name: 'dashboard' });
  }

  if (to.meta?.requiresAuth && !isAuthenticated.value) {
    const redirect = allowedRedirects.includes(to.fullPath) ? to.fullPath : '/';
    return next({ name: 'login', query: { redirect } });
  }

  if (to.meta?.roles && user.value?.role && !to.meta.roles.includes(user.value.role)) {
    return next({ name: 'dashboard' });
  }

  next();
});

export default router;
