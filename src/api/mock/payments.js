/**
 * Mock API for Payments
 */

const paymentTypes = ['subscription', 'olympiad_entry', 'mock_exam', 'teacher_booking'];
const paymentMethods = ['payme', 'click', 'uzcard', 'cash'];
const paymentStatuses = ['completed', 'pending', 'failed', 'refunded'];

export const payments = Array.from({ length: 200 }, (_, i) => ({
  id: `pay-${i + 1}`,
  userId: `user-${(i % 100) + 1}`,
  userName: ['Alisher Karimov', 'Malika Sobirova', 'Sardor Toshmatov'][i % 3],
  paymentType: paymentTypes[i % paymentTypes.length],
  amount: [99000, 75000, 50000, 15000, 990000][i % 5],
  currency: 'UZS',
  paymentMethod: paymentMethods[i % paymentMethods.length],
  paymentGateway: paymentMethods[i % paymentMethods.length],
  transactionId: `txn_${Date.now()}_${i}`,
  status: i % 20 === 0 ? 'failed' : i % 15 === 0 ? 'pending' : 'completed',
  paidAt: i % 15 === 0 ? null : new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  metadata: {
    olympiadId: i % 4 === 1 ? 'olym-1' : undefined,
    planId: i % 4 === 0 ? 'plan-1' : undefined
  }
}));

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const paymentsApi = {
  async getAll(filters = {}) {
    await delay();
    let filtered = [...payments];

    if (filters.type) filtered = filtered.filter(p => p.paymentType === filters.type);
    if (filters.status) filtered = filtered.filter(p => p.status === filters.status);
    if (filters.from) filtered = filtered.filter(p => new Date(p.createdAt) >= new Date(filters.from));
    if (filters.to) filtered = filtered.filter(p => new Date(p.createdAt) <= new Date(filters.to));

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    const summary = {
      totalAmount: payments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0),
      totalTransactions: payments.length,
      byType: paymentTypes.reduce((acc, type) => {
        acc[type] = payments.filter(p => p.paymentType === type && p.status === 'completed').reduce((s, p) => s + p.amount, 0);
        return acc;
      }, {}),
      byStatus: paymentStatuses.reduce((acc, status) => {
        acc[status] = payments.filter(p => p.status === status).length;
        return acc;
      }, {})
    };

    return {
      success: true,
      data: {
        payments: paginated,
        summary,
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
    const payment = payments.find(p => p.id === id);
    return payment ? { success: true, data: payment } : { success: false, error: { code: 'NOT_FOUND' } };
  },

  async refund(id) {
    await delay();
    const index = payments.findIndex(p => p.id === id);
    if (index === -1) return { success: false, error: { code: 'NOT_FOUND' } };
    payments[index].status = 'refunded';
    return { success: true, message: 'Payment refunded successfully' };
  }
};
