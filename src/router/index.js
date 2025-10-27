import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/shared/composables/useAuth';
import { getDefaultRedirectPath, isSafeRedirectPath, resolveDefaultRoute } from '@/shared/utils/navigation';

// Import module routes
import studentRoutes from '@/modules/student/routes';
import teacherRoutes from '@/modules/teacher/routes';
import adminRoutes from '@/modules/admin/routes';

/**
 * Public routes (login, 404, etc.)
 */
const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/shared/pages/LoginPage.vue'),
    meta: { layout: 'auth', requiresAuth: false, publicOnly: true }
  },
  {
    path: '/',
    name: 'root',
    redirect: () => {
      // Dynamic redirect based on user role
      const { user } = useAuth();
      if (user.value?.role === 'admin') {
        return '/admin/dashboard';
      } else if (user.value?.role === 'teacher') {
        return '/teacher';
      }
      return '/student';
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/shared/pages/NotFoundPage.vue'),
    meta: {
      layout: 'auth'
    }
  }
];

/**
 * Combine all routes
 */
const routes = [
  ...publicRoutes,
  ...studentRoutes,
  ...teacherRoutes,
  ...adminRoutes
];

/**
 * Create router instance
 */
const router = createRouter({
  history: createWebHistory(),
  routes
});

/**
 * Global navigation guard
 * Handles authentication and role-based access control
 */
router.beforeEach(async (to, from, next) => {
  const { ensureSession, isAuthenticated, user } = useAuth();
  await ensureSession();

  const defaultRoute = resolveDefaultRoute(user.value?.role);

  // Redirect authenticated users away from public-only pages (like login)
  if (to.meta?.publicOnly && isAuthenticated.value) {
    return next(defaultRoute);
  }

  // Redirect unauthenticated users to login
  if (to.meta?.requiresAuth && !isAuthenticated.value) {
    const redirect = isSafeRedirectPath(to.fullPath)
      ? to.fullPath
      : getDefaultRedirectPath(user.value?.role);
    return next({ name: 'login', query: { redirect } });
  }

  // Check role-based access
  if (to.meta?.roles && user.value?.role && !to.meta.roles.includes(user.value.role)) {
    return next(defaultRoute);
  }

  next();
});

export default router;
