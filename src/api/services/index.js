/**
 * API Services - Central Export
 * All real API services for backend integration
 */

export { olympiadsService } from './olympiads';
export { notificationsService } from './notifications';

// Default export for convenience
export default {
  olympiads: () => import('./olympiads'),
  notifications: () => import('./notifications')
};
