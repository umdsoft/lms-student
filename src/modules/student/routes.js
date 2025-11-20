/**
 * Student module routes
 * All student-related routes with /student prefix
 */

export default [
  {
    path: '/student',
    name: 'student.dashboard',
    component: () => import('@/modules/student/pages/DashboardPage.vue'),
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
    component: () => import('@/modules/student/pages/courses/CoursesPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Kurslarim',
      layout: 'student'
    }
  },
  {
    path: '/student/courses/:slug',
    name: 'student.courses.details',
    component: () => import('@/modules/student/pages/courses/CourseDetailsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Kurs tafsilotlari',
      layout: 'student'
    }
  },
  {
    path: '/student/courses/:slug/tests/:testId',
    name: 'student.courses.test-solve',
    component: () => import('@/modules/student/pages/courses/CourseTestSolvePage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Test yechish',
      layout: 'student'
    }
  },
  {
    path: '/student/courses/:slug/tests/:testId/attempts/:attemptId',
    name: 'student.courses.test-attempt-details',
    component: () => import('@/modules/student/pages/courses/CourseTestAttemptDetailsPage.vue'),
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
    component: () => import('@/modules/student/pages/olympiads/OlympiadsPage.vue'),
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
    component: () => import('@/modules/student/pages/olympiads/MyOlympiadsPage.vue'),
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
    component: () => import('@/modules/student/pages/olympiads/OlympiadDetailsPage.vue'),
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
    component: () => import('@/modules/student/pages/olympiads/MiniTestSolvePage.vue'),
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
    component: () => import('@/modules/student/pages/finance/TransactionsPage.vue'),
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
    component: () => import('@/modules/student/pages/finance/CoinHistoryPage.vue'),
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
    component: () => import('@/modules/student/pages/profile/ProfileOverviewPage.vue'),
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
    component: () => import('@/modules/student/pages/profile/ProfileSettingsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['student'],
      title: 'Profil sozlamalari',
      layout: 'student'
    }
  }
];
