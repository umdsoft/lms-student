/**
 * Admin module routes
 * All admin-related routes with /admin prefix
 * Note: Using 'control' in route names to maintain backward compatibility
 */

export default [
  {
    path: '/control',
    name: 'control.dashboard',
    component: () => import('@/modules/admin/pages/AdminDashboardPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin'],
      title: 'Boshqaruv paneli',
      layout: 'control'
    }
  }
  // TODO: Add more admin routes as we develop the admin module
  // {
  //   path: '/control/users',
  //   name: 'control.users',
  //   component: () => import('@/modules/admin/pages/Users.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['admin'],
  //     title: 'Foydalanuvchilar',
  //     layout: 'control'
  //   }
  // },
  // {
  //   path: '/control/courses',
  //   name: 'control.courses',
  //   component: () => import('@/modules/admin/pages/Courses.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['admin'],
  //     title: 'Kurslar',
  //     layout: 'control'
  //   }
  // },
  // {
  //   path: '/control/olympiads',
  //   name: 'control.olympiads',
  //   component: () => import('@/modules/admin/pages/Olympiads.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['admin'],
  //     title: 'Olimpiadalar',
  //     layout: 'control'
  //   }
  // },
  // {
  //   path: '/control/reports',
  //   name: 'control.reports',
  //   component: () => import('@/modules/admin/pages/Reports.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['admin'],
  //     title: 'Hisobotlar',
  //     layout: 'control'
  //   }
  // },
  // {
  //   path: '/control/settings',
  //   name: 'control.settings',
  //   component: () => import('@/modules/admin/pages/Settings.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['admin'],
  //     title: 'Sozlamalar',
  //     layout: 'control'
  //   }
  // }
];
