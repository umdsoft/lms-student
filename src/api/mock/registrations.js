/**
 * Mock API for Olympiad Registrations
 */

export const registrations = Array.from({ length: 50 }, (_, i) => ({
  id: `reg-${i + 1}`,
  olympiadId: ['olym-1', 'olym-2', 'olym-3'][i % 3],
  olympiadTitle: ['Spring Math Competition 2024', 'English Pro Challenge 2024', 'Winter Math Competition 2024'][i % 3],
  userId: i % 5 === 0 ? null : `user-${i + 1}`,
  fullName: ['Alisher Karimov', 'Malika Sobirova', 'Sardor Toshmatov', 'Dilnoza Rahimova', 'Javohir Alimov'][i % 5],
  schoolName: ['25-son maktab', 'Presidential School', '17-son maktab', '30-son maktab'][i % 4],
  grade: 7 + (i % 5),
  direction: ['math', 'english', 'programming'][i % 3],
  parentPhone: '+998901234567',
  email: `student${i + 1}@example.com`,
  paymentStatus: i % 10 === 0 ? 'pending' : 'paid',
  paymentAmount: [75000, 50000, 80000][i % 3],
  paymentId: i % 10 === 0 ? null : `pay-${i + 1}`,
  paidAt: i % 10 === 0 ? null : new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  applicationStatus: 'approved',
  mocksPurchased: i % 3 === 0 ? { type: 'package', count: 5, completed: Math.floor(Math.random() * 6) } : null,
  registeredAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
}));

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const registrationsApi = {
  async getAll(filters = {}) {
    await delay();
    let filtered = [...registrations];

    if (filters.olympiadId) filtered = filtered.filter(r => r.olympiadId === filters.olympiadId);
    if (filters.paymentStatus) filtered = filtered.filter(r => r.paymentStatus === filters.paymentStatus);
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(r => r.fullName.toLowerCase().includes(search) || r.email.includes(search));
    }

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return {
      success: true,
      data: {
        registrations: paginated,
        stats: {
          total: registrations.length,
          paid: registrations.filter(r => r.paymentStatus === 'paid').length,
          pending: registrations.filter(r => r.paymentStatus === 'pending').length,
          totalRevenue: registrations.filter(r => r.paymentStatus === 'paid').reduce((s, r) => s + r.paymentAmount, 0)
        },
        pagination: {
          total: filtered.length,
          page,
          limit,
          totalPages: Math.ceil(filtered.length / limit)
        }
      }
    };
  },

  async getById(id) {
    await delay();
    const registration = registrations.find(r => r.id === id);
    return registration
      ? { success: true, data: registration }
      : { success: false, error: { code: 'NOT_FOUND', message: 'Registration not found' } };
  },

  async bulkAction(ids, action) {
    await delay();
    return { success: true, message: `${action} applied to ${ids.length} registrations` };
  }
};
