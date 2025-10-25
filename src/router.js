import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { getDefaultRedirectPath, isSafeRedirectPath, resolveDefaultRoute } from '@/utils/navigation';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/LoginPage.vue'),
    meta: { layout: 'auth', requiresAuth: false, publicOnly: true }
  },
  {
    path: '/',
    redirect: '/student'
  },
  {
    path: '/student',
    name: 'student.dashboard',
    component: () => import('@/pages/core/DashboardPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Kundalikim',
      layout: 'student'
    }
  },
  {
    path: '/student/courses',
    name: 'student.courses',
    component: () => import('@/pages/courses/CoursesPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Kurslarim',
      layout: 'student'
    }
  },
  {
    path: '/student/courses/:id',
    name: 'student.courses.details',
    component: () => import('@/pages/courses/CourseDetailsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Kurs tafsilotlari',
      layout: 'student'
    }
  },
  {
    path: '/student/courses/:id/tests/:testId',
    name: 'student.courses.test-solve',
    component: () => import('@/pages/courses/CourseTestSolvePage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Test yechish',
      layout: 'student'
    }
  },
  {
    path: '/student/courses/:id/tests/:testId/attempts/:attemptId',
    name: 'student.courses.test-attempt-details',
    component: () => import('@/pages/courses/CourseTestAttemptDetailsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Test natijasi',
      layout: 'student'
    }
  },
  {
    path: '/student/olympiads',
    name: 'student.olympiads',
    component: () => import('@/pages/olympiads/OlympiadsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Olimpiadalar',
      layout: 'student'
    }
  },
  {
    path: '/student/olympiads/my',
    name: 'student.olympiads.my',
    component: () => import('@/pages/olympiads/MyOlympiadsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Mening olimpiadalarim',
      layout: 'student'
    }
  },
  {
    path: '/student/olympiads/:id',
    name: 'student.olympiads.details',
    component: () => import('@/pages/olympiads/OlympiadDetailsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Olimpiada tafsilotlari',
      layout: 'student'
    }
  },
  {
    path: '/student/olympiads/:id/tests/:testId',
    name: 'student.olympiads.mini-test',
    component: () => import('@/pages/olympiads/MiniTestSolvePage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Demo test',
      layout: 'student'
    }
  },
  {
    path: '/student/finance/transactions',
    name: 'student.finance.transactions',
    component: () => import('@/pages/finance/TransactionsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Tranzaksiyalar',
      layout: 'student'
    }
  },
  {
    path: '/student/finance/coins',
    name: 'student.finance.coins',
    component: () => import('@/pages/finance/CoinHistoryPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Tangalar tarixi',
      layout: 'student'
    }
  },
  {
    path: '/student/profile',
    name: 'student.profile.overview',
    component: () => import('@/pages/profile/ProfileOverviewPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Profil',
      layout: 'student'
    }
  },
  {
    path: '/student/profile/settings',
    name: 'student.profile.settings',
    component: () => import('@/pages/profile/ProfileSettingsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Profil sozlamalari',
      layout: 'student'
    }
  },
  {
    path: '/teacher',
    name: 'teacher.dashboard',
    component: () => import('@/pages/teacher/TeacherDashboardPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['teacher'],
      title: 'O\'qituvchi paneli',
      layout: 'teacher'
    }
  },
  {
    path: '/control',
    name: 'control.dashboard',
    component: () => import('@/pages/control/ControlDashboardPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: 'Boshqaruv paneli',
      layout: 'control'
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

router.beforeEach(async (to, from, next) => {
  const { ensureSession, isAuthenticated, user } = useAuth();
  await ensureSession();

  const defaultRoute = resolveDefaultRoute(user.value?.role);

  if (to.meta?.publicOnly && isAuthenticated.value) {
    return next(defaultRoute);
  }

  if (to.meta?.requiresAuth && !isAuthenticated.value) {
    const redirect = isSafeRedirectPath(to.fullPath)
      ? to.fullPath
      : getDefaultRedirectPath(user.value?.role);
    return next({ name: 'login', query: { redirect } });
  }

  if (to.meta?.roles && user.value?.role && !to.meta.roles.includes(user.value.role)) {
    return next(defaultRoute);
  }

  next();
});

export default router;
