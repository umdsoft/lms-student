/**
 * Mock API for Subscription Plans
 * Provides subscription plan data and CRUD operations
 */

export const subscriptionPlans = [
  {
    id: 'plan-1',
    name: 'Oylik obuna',
    slug: 'monthly',
    durationDays: 30,
    price: 99000,
    currency: 'UZS',
    features: [
      'Barcha kurslar va testlarga kirish',
      'AI feedback',
      'Olimpiadalar (bepul)',
      'Progress tracking',
      'Darslik materiallar'
    ],
    isActive: true,
    displayOrder: 1,
    totalSubscribers: 856,
    monthlyRevenue: 85344000,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'plan-2',
    name: 'Yillik obuna',
    slug: 'yearly',
    durationDays: 365,
    price: 990000,
    currency: 'UZS',
    features: [
      'Barcha kurslar va testlarga kirish',
      'AI feedback',
      'Olimpiadalar (bepul)',
      'Progress tracking',
      'Darslik materiallar',
      '2 oy bepul',
      '20% tejash'
    ],
    isActive: true,
    isRecommended: true,
    displayOrder: 2,
    savings: 198000,
    totalSubscribers: 344,
    monthlyRevenue: 28380000,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'plan-3',
    name: '3 oylik obuna',
    slug: 'quarterly',
    durationDays: 90,
    price: 270000,
    currency: 'UZS',
    features: [
      'Barcha kurslar va testlarga kirish',
      'AI feedback',
      'Olimpiadalar (bepul)',
      'Progress tracking',
      '10% tejash'
    ],
    isActive: false,
    displayOrder: 3,
    savings: 27000,
    totalSubscribers: 0,
    monthlyRevenue: 0,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const subscriptionPlansApi = {
  // Get all plans
  async getAll() {
    await delay();
    return {
      success: true,
      data: {
        plans: subscriptionPlans,
        summary: {
          totalPlans: subscriptionPlans.length,
          activePlans: subscriptionPlans.filter(p => p.isActive).length,
          totalSubscribers: subscriptionPlans.reduce((sum, p) => sum + p.totalSubscribers, 0),
          monthlyRevenue: subscriptionPlans.reduce((sum, p) => sum + p.monthlyRevenue, 0)
        }
      },
      timestamp: new Date().toISOString()
    };
  },

  // Get plan by ID
  async getById(id) {
    await delay();
    const plan = subscriptionPlans.find(p => p.id === id);
    if (!plan) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Plan not found' }
      };
    }
    return {
      success: true,
      data: plan,
      timestamp: new Date().toISOString()
    };
  },

  // Create plan
  async create(data) {
    await delay();
    const newPlan = {
      id: `plan-${Date.now()}`,
      ...data,
      totalSubscribers: 0,
      monthlyRevenue: 0,
      createdAt: new Date().toISOString()
    };
    subscriptionPlans.push(newPlan);
    return {
      success: true,
      data: newPlan,
      message: 'Plan created successfully'
    };
  },

  // Update plan
  async update(id, data) {
    await delay();
    const index = subscriptionPlans.findIndex(p => p.id === id);
    if (index === -1) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Plan not found' }
      };
    }
    subscriptionPlans[index] = { ...subscriptionPlans[index], ...data };
    return {
      success: true,
      data: subscriptionPlans[index],
      message: 'Plan updated successfully'
    };
  },

  // Delete plan
  async delete(id) {
    await delay();
    const index = subscriptionPlans.findIndex(p => p.id === id);
    if (index === -1) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Plan not found' }
      };
    }
    subscriptionPlans.splice(index, 1);
    return {
      success: true,
      message: 'Plan deleted successfully'
    };
  }
};
