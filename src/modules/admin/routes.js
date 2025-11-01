/**
 * Admin Module Routes
 * Complete routing configuration for admin panel
 * All routes require authentication and admin role
 */

export default [
  // Backwards compatibility - redirect old routes
  {
    path: '/control',
    redirect: '/admin/dashboard'
  },
  {
    path: '/control/dashboard',
    redirect: '/admin/dashboard'
  },

  // Main Admin Routes
  {
    path: '/admin',
    redirect: '/admin/dashboard'
  },
  {
    path: '/admin/dashboard',
    name: 'admin.dashboard',
    component: () => import('@/modules/admin/pages/ImprovedDashboardPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: 'Dashboard',
      layout: 'admin'
    }
  },

  // Olympiads Management
  {
    path: '/admin/olympiads',
    name: 'admin.olympiads',
    component: () => import('@/modules/admin/pages/olympiads/OlympiadsListPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: 'Olimpiadalar',
      layout: 'admin'
    }
  },

  // Users Management
  {
    path: '/admin/users',
    name: 'admin.users',
    component: () => import('@/pages/users/UsersPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: 'Foydalanuvchilar',
      layout: 'admin'
    }
  },

  // Payments Management
  {
    path: '/admin/payments',
    name: 'admin.payments',
    component: () => import('@/modules/admin/pages/payments/PaymentsListPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: 'To\'lovlar',
      layout: 'admin'
    }
  },

  // Directions & Plans
  {
    path: '/admin/directions',
    name: 'admin.directions',
    component: () => import('@/pages/directions/DirectionsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: 'Yo\'nalishlar',
      layout: 'admin'
    }
  },
  {
    path: '/admin/directions/:id',
    name: 'admin.direction-detail',
    component: () => import('@/pages/directions/DirectionDetailPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: 'Yo\'nalish',
      layout: 'admin'
    }
  },
  {
    path: '/admin/subscription-plans',
    name: 'admin.plans',
    component: () => import('@/modules/admin/pages/plans/SubscriptionPlansPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: 'Obuna rejalari',
      layout: 'admin'
    }
  },

  // Analytics
  {
    path: '/admin/analytics',
    name: 'admin.analytics',
    component: () => import('@/modules/admin/pages/analytics/AnalyticsPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: 'Analitika',
      layout: 'admin'
    }
  }
];
