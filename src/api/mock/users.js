/**
 * Mock API for Users Management
 */

export const users = Array.from({ length: 100 }, (_, i) => ({
  id: `user-${i + 1}`,
  email: `user${i + 1}@example.com`,
  fullName: ['Alisher', 'Malika', 'Sardor', 'Dilnoza', 'Javohir', 'Nodira', 'Aziz', 'Dilshod'][i % 8] + ' ' + ['Karimov', 'Sobirova', 'Toshmatov', 'Rahimova', 'Alimov'][i % 5],
  phone: `+99890${String(i).padStart(7, '0')}`,
  role: i % 20 === 0 ? 'admin' : i % 10 === 0 ? 'teacher' : 'student',
  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(['Alisher', 'Malika', 'Sardor'][i % 3])}`,
  isActive: i % 15 !== 0,
  emailVerified: i % 10 !== 0,
  hasSubscription: i % 3 !== 0,
  subscription: i % 3 !== 0 ? {
    planId: ['plan-1', 'plan-2'][i % 2],
    planName: ['Oylik obuna', 'Yillik obuna'][i % 2],
    startDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true
  } : null,
  progress: {
    totalTopics: 50,
    completedTopics: Math.floor(Math.random() * 30),
    averageScore: 70 + Math.random() * 30
  },
  createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  lastLoginAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
}));

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const usersApi = {
  async getAll(filters = {}) {
    await delay();
    let filtered = [...users];

    if (filters.role) filtered = filtered.filter(u => u.role === filters.role);
    if (filters.isActive !== undefined) filtered = filtered.filter(u => u.isActive === filters.isActive);
    if (filters.hasSubscription !== undefined) filtered = filtered.filter(u => u.hasSubscription === filters.hasSubscription);
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(u => u.fullName.toLowerCase().includes(search) || u.email.includes(search));
    }

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return {
      success: true,
      data: {
        users: paginated,
        summary: {
          total: users.length,
          students: users.filter(u => u.role === 'student').length,
          teachers: users.filter(u => u.role === 'teacher').length,
          admins: users.filter(u => u.role === 'admin').length,
          activeSubscribers: users.filter(u => u.hasSubscription).length
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
    const user = users.find(u => u.id === id);
    return user ? { success: true, data: user } : { success: false, error: { code: 'NOT_FOUND' } };
  },

  async update(id, data) {
    await delay();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return { success: false, error: { code: 'NOT_FOUND' } };
    users[index] = { ...users[index], ...data };
    return { success: true, data: users[index], message: 'User updated successfully' };
  },

  async delete(id) {
    await delay();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return { success: false, error: { code: 'NOT_FOUND' } };
    users.splice(index, 1);
    return { success: true, message: 'User deleted successfully' };
  }
};
