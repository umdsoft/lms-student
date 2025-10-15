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
    path: '/olympiads/my',
    name: 'olympiads.my',
    component: () => import('@/pages/olympiads/MyOlympiadsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Mening olimpiadalarim',
      layout: 'app'
    }
  },
  {
    path: '/olympiads/:id',
    name: 'olympiads.details',
    component: () => import('@/pages/olympiads/OlympiadDetailsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Olimpiada tafsilotlari',
      layout: 'app'
    }
  },
  {
    path: '/olympiads/:id/tests/:testId',
    name: 'olympiads.mini-test',
    component: () => import('@/pages/olympiads/MiniTestSolvePage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Demo test',
      layout: 'app'
    }
  },
  {
    path: '/finance/transactions',
    name: 'finance.transactions',
    component: () => import('@/pages/finance/TransactionsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Tranzaksiyalar',
      layout: 'app'
    }
  },
  {
    path: '/finance/coins',
    name: 'finance.coins',
    component: () => import('@/pages/finance/CoinHistoryPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Tangalar tarixi',
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

const allowedRedirects = [
  '/',
  '/courses',
  '/olympiads',
  '/olympiads/my',
  '/finance/transactions',
  '/finance/coins',
  '/profile',
  '/profile/settings'
];

router.beforeEach(async (to, from, next) => {
  const { ensureSession, isAuthenticated, user } = useAuth();
  await ensureSession();

  if (to.meta?.publicOnly && isAuthenticated.value) {
    return next({ name: 'dashboard' });
  }

  if (to.meta?.requiresAuth && !isAuthenticated.value) {
    const redirect = allowedRedirects.some((path) => to.fullPath === path || to.fullPath.startsWith(`${path}/`))
      ? to.fullPath
      : '/';
    return next({ name: 'login', query: { redirect } });
  }

  if (to.meta?.roles && user.value?.role && !to.meta.roles.includes(user.value.role)) {
    return next({ name: 'dashboard' });
  }

  next();
});

export default router;
