export const ROLE_ROUTE_PREFIXES = {
  student: '/student',
  teacher: '/teacher',
  admin: '/control'
};

export const SAFE_REDIRECT_PREFIXES = Object.values(ROLE_ROUTE_PREFIXES);

export function resolveDefaultRoute(role) {
  switch (role) {
    case 'teacher':
      return { name: 'teacher.dashboard' };
    case 'admin':
    case 'control':
      return { name: 'control.dashboard' };
    case 'student':
    default:
      return { name: 'student.dashboard' };
  }
}

export function getDefaultRedirectPath(role) {
  switch (role) {
    case 'teacher':
      return ROLE_ROUTE_PREFIXES.teacher;
    case 'admin':
    case 'control':
      return ROLE_ROUTE_PREFIXES.admin;
    case 'student':
    default:
      return ROLE_ROUTE_PREFIXES.student;
  }
}

export function isSafeRedirectPath(path) {
  if (typeof path !== 'string') {
    return false;
  }

  return SAFE_REDIRECT_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}
