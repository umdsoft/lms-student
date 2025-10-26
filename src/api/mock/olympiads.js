/**
 * Mock API for Olympiads
 * Provides olympiad data, CRUD operations, and related statistics
 */

export const olympiads = [
  {
    id: 'olym-1',
    title: 'Spring Math Competition 2024',
    description: 'Yilning eng katta matematika olimpiadasi. Barcha sinf o\'quvchilari ishtirok etishi mumkin.',
    directionId: 'dir-1',
    direction: 'Matematika',
    olympiadType: 'public', // public, platform
    difficulty: 'medium', // easy, medium, hard
    entryFee: 75000,
    currency: 'UZS',
    startDate: '2024-04-25T10:00:00Z',
    endDate: '2024-04-25T11:30:00Z',
    registrationDeadline: '2024-04-20T23:59:59Z',
    durationMinutes: 90,
    maxParticipants: 500,
    currentParticipants: 234,
    maxScore: 100,
    totalQuestions: 40,
    isPublished: true,
    status: 'upcoming', // upcoming, ongoing, completed, cancelled
    createdBy: 'admin-1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-15T14:00:00Z',
    stats: {
      totalRegistrations: 234,
      paidRegistrations: 230,
      pendingPayments: 4,
      totalRevenue: 17250000,
      mocksSold: 89,
      mockRevenue: 3560000,
      totalRevenue: 20810000,
      averageMockScore: 76.5
    }
  },
  {
    id: 'olym-2',
    title: 'English Pro Challenge 2024',
    description: 'Ingliz tili bo\'yicha professional darajadagi olimpiada. Speaking, Writing, Reading, Listening.',
    directionId: 'dir-2',
    direction: 'Ingliz tili',
    olympiadType: 'public',
    difficulty: 'hard',
    entryFee: 50000,
    currency: 'UZS',
    startDate: '2024-05-10T14:00:00Z',
    endDate: '2024-05-10T16:00:00Z',
    registrationDeadline: '2024-05-05T23:59:59Z',
    durationMinutes: 120,
    maxParticipants: 300,
    currentParticipants: 89,
    maxScore: 100,
    totalQuestions: 50,
    isPublished: true,
    status: 'upcoming',
    createdBy: 'admin-1',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-10T14:00:00Z',
    stats: {
      totalRegistrations: 89,
      paidRegistrations: 87,
      pendingPayments: 2,
      totalRevenue: 4350000,
      mocksSold: 32,
      mockRevenue: 480000,
      totalRevenue: 4830000,
      averageMockScore: 0
    }
  },
  {
    id: 'olym-3',
    title: 'Winter Math Competition 2024',
    description: 'Qishki matematika olimpiadasi. O\'tgan olimpiadamiz!',
    directionId: 'dir-1',
    direction: 'Matematika',
    olympiadType: 'public',
    difficulty: 'medium',
    entryFee: 75000,
    currency: 'UZS',
    startDate: '2024-02-15T10:00:00Z',
    endDate: '2024-02-15T11:30:00Z',
    registrationDeadline: '2024-02-10T23:59:59Z',
    durationMinutes: 90,
    maxParticipants: 400,
    currentParticipants: 189,
    maxScore: 100,
    totalQuestions: 40,
    isPublished: true,
    status: 'completed',
    createdBy: 'admin-1',
    createdAt: '2023-12-01T10:00:00Z',
    updatedAt: '2024-02-16T10:00:00Z',
    stats: {
      totalRegistrations: 189,
      paidRegistrations: 189,
      pendingPayments: 0,
      totalRevenue: 14175000,
      mocksSold: 67,
      mockRevenue: 1005000,
      totalRevenue: 15180000,
      averageMockScore: 74.2,
      averageScore: 72.8,
      completionRate: 98.4,
      topScore: 100,
      lowestScore: 45
    }
  },
  {
    id: 'olym-4',
    title: 'Code Masters 2024',
    description: 'Dasturlash olimpiadasi - Algorithm va Problem Solving',
    directionId: 'dir-3',
    direction: 'Dasturlash',
    olympiadType: 'public',
    difficulty: 'hard',
    entryFee: 80000,
    currency: 'UZS',
    startDate: '2024-06-01T10:00:00Z',
    endDate: '2024-06-01T13:00:00Z',
    registrationDeadline: '2024-05-27T23:59:59Z',
    durationMinutes: 180,
    maxParticipants: 250,
    currentParticipants: 45,
    maxScore: 100,
    totalQuestions: 6,
    isPublished: true,
    status: 'upcoming',
    createdBy: 'admin-1',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-15T14:00:00Z',
    stats: {
      totalRegistrations: 45,
      paidRegistrations: 43,
      pendingPayments: 2,
      totalRevenue: 3440000,
      mocksSold: 15,
      mockRevenue: 225000,
      totalRevenue: 3665000,
      averageMockScore: 0
    }
  },
  {
    id: 'olym-5',
    title: 'Platform Weekly Math - Haftalik',
    description: 'Platform foydalanuvchilari uchun bepul haftalik olimpiada',
    directionId: 'dir-1',
    direction: 'Matematika',
    olympiadType: 'platform',
    difficulty: 'easy',
    entryFee: 0,
    currency: 'UZS',
    startDate: '2024-03-30T18:00:00Z',
    endDate: '2024-03-30T19:00:00Z',
    registrationDeadline: '2024-03-30T17:00:00Z',
    durationMinutes: 60,
    maxParticipants: null,
    currentParticipants: 342,
    maxScore: 50,
    totalQuestions: 25,
    isPublished: true,
    status: 'upcoming',
    createdBy: 'admin-1',
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-22T14:00:00Z',
    stats: {
      totalRegistrations: 342,
      paidRegistrations: 0,
      pendingPayments: 0,
      totalRevenue: 0,
      mocksSold: 0,
      mockRevenue: 0,
      totalRevenue: 0,
      averageMockScore: 0
    }
  }
];

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const olympiadsApi = {
  // Get all olympiads with filters
  async getAll(filters = {}) {
    await delay();
    let filtered = [...olympiads];

    // Apply filters
    if (filters.type) {
      filtered = filtered.filter(o => o.olympiadType === filters.type);
    }
    if (filters.status) {
      filtered = filtered.filter(o => o.status === filters.status);
    }
    if (filters.direction) {
      filtered = filtered.filter(o => o.directionId === filters.direction);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(o =>
        o.title.toLowerCase().includes(search) ||
        o.description.toLowerCase().includes(search)
      );
    }

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    // Calculate summary
    const summary = {
      totalOlympiads: olympiads.length,
      upcoming: olympiads.filter(o => o.status === 'upcoming').length,
      ongoing: olympiads.filter(o => o.status === 'ongoing').length,
      completed: olympiads.filter(o => o.status === 'completed').length,
      totalRevenue: olympiads.reduce((sum, o) => sum + (o.stats?.totalRevenue || 0), 0),
      totalParticipants: olympiads.reduce((sum, o) => sum + o.currentParticipants, 0)
    };

    return {
      success: true,
      data: {
        olympiads: paginated,
        summary,
        pagination: {
          total: filtered.length,
          page,
          limit,
          totalPages: Math.ceil(filtered.length / limit)
        }
      },
      timestamp: new Date().toISOString()
    };
  },

  // Get olympiad by ID
  async getById(id) {
    await delay();
    const olympiad = olympiads.find(o => o.id === id);
    if (!olympiad) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Olympiad not found' }
      };
    }
    return {
      success: true,
      data: olympiad,
      timestamp: new Date().toISOString()
    };
  },

  // Create olympiad
  async create(data) {
    await delay();
    const newOlympiad = {
      id: `olym-${Date.now()}`,
      ...data,
      currentParticipants: 0,
      isPublished: false,
      status: 'upcoming',
      createdBy: 'admin-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stats: {
        totalRegistrations: 0,
        paidRegistrations: 0,
        pendingPayments: 0,
        totalRevenue: 0,
        mocksSold: 0,
        mockRevenue: 0
      }
    };
    olympiads.push(newOlympiad);
    return {
      success: true,
      data: newOlympiad,
      message: 'Olympiad created successfully'
    };
  },

  // Update olympiad
  async update(id, data) {
    await delay();
    const index = olympiads.findIndex(o => o.id === id);
    if (index === -1) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Olympiad not found' }
      };
    }
    olympiads[index] = {
      ...olympiads[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return {
      success: true,
      data: olympiads[index],
      message: 'Olympiad updated successfully'
    };
  },

  // Delete olympiad
  async delete(id) {
    await delay();
    const index = olympiads.findIndex(o => o.id === id);
    if (index === -1) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Olympiad not found' }
      };
    }
    olympiads.splice(index, 1);
    return {
      success: true,
      message: 'Olympiad deleted successfully'
    };
  },

  // Publish olympiad
  async publish(id) {
    await delay();
    const index = olympiads.findIndex(o => o.id === id);
    if (index === -1) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Olympiad not found' }
      };
    }
    olympiads[index].isPublished = true;
    olympiads[index].updatedAt = new Date().toISOString();
    return {
      success: true,
      data: olympiads[index],
      message: 'Olympiad published successfully'
    };
  }
};
