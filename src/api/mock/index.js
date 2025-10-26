/**
 * Mock API - Central Export
 * All mock APIs for development and testing
 */

export { dashboardApi, dashboardData } from './dashboard';
export { directionsApi, directions } from './directions';
export { subscriptionPlansApi, subscriptionPlans } from './subscriptionPlans';
export { olympiadsApi, olympiads } from './olympiads';
export { registrationsApi, registrations } from './registrations';
export { usersApi, users } from './users';
export { paymentsApi, payments } from './payments';

// Re-export for convenience
export default {
  dashboard: () => import('./dashboard'),
  directions: () => import('./directions'),
  subscriptionPlans: () => import('./subscriptionPlans'),
  olympiads: () => import('./olympiads'),
  registrations: () => import('./registrations'),
  users: () => import('./users'),
  payments: () => import('./payments')
};
