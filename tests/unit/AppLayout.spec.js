jest.mock('@/assets/logo.svg', () => 'logo', { virtual: true });

import { render, screen } from '@testing-library/vue';
import StudentLayout from '@/layouts/StudentLayout.vue';
import { createTestingPinia } from '@pinia/testing';
import { createI18nInstance } from '@/i18n';

jest.mock('@/shared/composables/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: { value: true },
    user: {
      value: {
        fullName: 'Dilnoza Rahimova',
        coins: 320,
        balance: 125000,
        cohort: 'Matematika intensiv',
        avatar: 'https://example.com/avatar.svg'
      }
    },
    lastFetchedAt: { value: new Date('2024-03-21T08:00:00Z').toISOString() },
    logout: jest.fn(),
    ensureSession: jest.fn()
  })
}));

jest.mock('@/shared/composables/useNotifications', () => ({
  useNotifications: () => ({
    notifySuccess: jest.fn(),
    notifyError: jest.fn()
  })
}));

jest.mock('vue-router', () => ({
  useRoute: () => ({ name: 'student.dashboard', meta: { layout: 'student' } }),
  useRouter: () => ({ push: jest.fn() }),
  RouterLink: {
    name: 'RouterLink',
    props: ['to'],
    template: '<a><slot /></a>'
  }
}));

describe('StudentLayout', () => {
  it('shows student coin and balance summary', () => {
    render(StudentLayout, {
      slots: { default: '<div />' },
      global: {
        plugins: [createTestingPinia({ createSpy: jest.fn, stubActions: false }), createI18nInstance()]
      }
    });

    expect(screen.getByText(/320 ta/i)).toBeInTheDocument();
    expect(screen.getByTestId('balance-value')).toHaveTextContent(/125/);
  });
});
