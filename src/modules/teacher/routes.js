/**
 * Teacher module routes
 * All teacher-related routes with /teacher prefix
 */

export default [
  {
    path: '/teacher',
    name: 'teacher.dashboard',
    component: () => import('@/modules/teacher/pages/TeacherDashboardPage.vue'),
    meta: {
      requiresAuth: true,
      roles: ['teacher'],
      title: 'O\'qituvchi paneli',
      layout: 'teacher'
    }
  }
  // TODO: Add more teacher routes as we develop the teacher module
  // {
  //   path: '/teacher/courses',
  //   name: 'teacher.courses',
  //   component: () => import('@/modules/teacher/pages/MyCourses.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['teacher'],
  //     title: 'Mening kurslarim',
  //     layout: 'teacher'
  //   }
  // },
  // {
  //   path: '/teacher/courses/create',
  //   name: 'teacher.courses.create',
  //   component: () => import('@/modules/teacher/pages/CreateCourse.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['teacher'],
  //     title: 'Kurs yaratish',
  //     layout: 'teacher'
  //   }
  // },
  // {
  //   path: '/teacher/courses/:id/edit',
  //   name: 'teacher.courses.edit',
  //   component: () => import('@/modules/teacher/pages/CourseEditor.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['teacher'],
  //     title: 'Kursni tahrirlash',
  //     layout: 'teacher'
  //   }
  // },
  // {
  //   path: '/teacher/students',
  //   name: 'teacher.students',
  //   component: () => import('@/modules/teacher/pages/Students.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['teacher'],
  //     title: 'Talabalar',
  //     layout: 'teacher'
  //   }
  // },
  // {
  //   path: '/teacher/analytics',
  //   name: 'teacher.analytics',
  //   component: () => import('@/modules/teacher/pages/Reports.vue'),
  //   meta: {
  //     requiresAuth: true,
  //     roles: ['teacher'],
  //     title: 'Statistika',
  //     layout: 'teacher'
  //   }
  // }
];
