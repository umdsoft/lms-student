import { render, screen } from '@testing-library/vue';
import AppLayout from '@/components/layouts/AppLayout.vue';
import { createTestingPinia } from '@pinia/testing';

jest.mock('@/composables/useAuth', () => ({
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

jest.mock('vue-router', () => ({
  useRoute: () => ({ name: 'dashboard' }),
  useRouter: () => ({ push: jest.fn() }),
  RouterLink: {
    name: 'RouterLink',
    props: ['to'],
    template: '<a><slot /></a>'
  }
}));

describe('AppLayout', () => {
  it('shows student coin and balance summary', () => {
    render(AppLayout, {
      global: {
        plugins: [createTestingPinia({ createSpy: jest.fn, stubActions: false })]
      }
    });

    expect(screen.getByText(/320 coin/i)).toBeInTheDocument();
    expect(screen.getByTestId('balance-value')).toHaveTextContent(/125/);
  });
});
