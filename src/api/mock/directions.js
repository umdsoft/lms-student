/**
 * Mock API for Directions
 * Provides direction-related data and CRUD operations
 */

export const directions = [
  {
    id: 'dir-1',
    name: 'Matematika',
    slug: 'math',
    icon: 'calculator',
    description: 'Algebra, Geometriya, Trigonometriya va boshqa matematika yo\'nalishlari',
    colorPrimary: '#3B82F6',
    colorSecondary: '#1D4ED8',
    isActive: true,
    displayOrder: 1,
    totalCourses: 25,
    totalTopics: 180,
    totalStudents: 456,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'dir-2',
    name: 'Ingliz tili',
    slug: 'english',
    icon: 'language',
    description: 'Speaking, Writing, Reading, Listening skills',
    colorPrimary: '#10B981',
    colorSecondary: '#059669',
    isActive: true,
    displayOrder: 2,
    totalCourses: 30,
    totalTopics: 210,
    totalStudents: 523,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'dir-3',
    name: 'Dasturlash',
    slug: 'programming',
    icon: 'code-bracket',
    description: 'Python, JavaScript, Algorithms va Data Structures',
    colorPrimary: '#8B5CF6',
    colorSecondary: '#6D28D9',
    isActive: true,
    displayOrder: 3,
    totalCourses: 20,
    totalTopics: 150,
    totalStudents: 389,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Simulate network delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const directionsApi = {
  // Get all directions
  async getAll() {
    await delay();
    return {
      success: true,
      data: directions,
      timestamp: new Date().toISOString()
    };
  },

  // Get direction by ID
  async getById(id) {
    await delay();
    const direction = directions.find(d => d.id === id);
    if (!direction) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Direction not found' }
      };
    }
    return {
      success: true,
      data: direction,
      timestamp: new Date().toISOString()
    };
  },

  // Create direction
  async create(data) {
    await delay();
    const newDirection = {
      id: `dir-${Date.now()}`,
      ...data,
      totalCourses: 0,
      totalTopics: 0,
      totalStudents: 0,
      createdAt: new Date().toISOString()
    };
    directions.push(newDirection);
    return {
      success: true,
      data: newDirection,
      message: 'Direction created successfully'
    };
  },

  // Update direction
  async update(id, data) {
    await delay();
    const index = directions.findIndex(d => d.id === id);
    if (index === -1) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Direction not found' }
      };
    }
    directions[index] = { ...directions[index], ...data };
    return {
      success: true,
      data: directions[index],
      message: 'Direction updated successfully'
    };
  },

  // Delete direction
  async delete(id) {
    await delay();
    const index = directions.findIndex(d => d.id === id);
    if (index === -1) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Direction not found' }
      };
    }
    directions.splice(index, 1);
    return {
      success: true,
      message: 'Direction deleted successfully'
    };
  }
};
