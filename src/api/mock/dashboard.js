/**
 * Mock API for Admin Dashboard
 * Provides dashboard statistics, charts, and activity data
 */

const generateMonthlyData = (months = 6) => {
  const data = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    data.push({
      month: date.toLocaleDateString('uz-UZ', { month: 'short' }),
      value: Math.floor(Math.random() * 50000000) + 10000000
    });
  }
  return data;
};

export const dashboardData = {
  kpis: {
    totalUsers: {
      value: 1456,
      change: '+12.5%',
      trend: 'up',
      previousPeriod: 1296
    },
    activeSubscriptions: {
      value: 1200,
      change: '+8.3%',
      trend: 'up',
      previousPeriod: 1108
    },
    monthlyRevenue: {
      value: 113724000,
      change: '+15.2%',
      trend: 'up',
      previousPeriod: 98750000,
      currency: 'UZS'
    },
    totalOlympiads: {
      value: 45,
      change: '+3',
      trend: 'up',
      previousPeriod: 42
    },
    olympiadRevenue: {
      value: 167000000,
      change: '+22.1%',
      trend: 'up',
      previousPeriod: 136800000,
      currency: 'UZS'
    },
    totalTeachers: {
      value: 24,
      change: '+4',
      trend: 'up',
      previousPeriod: 20
    },
    averageScore: {
      value: 82.5,
      change: '+3.2%',
      trend: 'up',
      previousPeriod: 79.9
    },
    completionRate: {
      value: 67.8,
      change: '-2.1%',
      trend: 'down',
      previousPeriod: 69.2
    }
  },

  revenueChart: {
    labels: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun'],
    datasets: [
      {
        label: 'Obunalar',
        data: [87360000, 92450000, 98120000, 103680000, 108540000, 113724000],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)'
      },
      {
        label: 'Olimpiadalar',
        data: [15000000, 12000000, 35000000, 18000000, 42000000, 45000000],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)'
      },
      {
        label: 'O\'qituvchilar',
        data: [3200000, 3800000, 4100000, 4500000, 4750000, 5000000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)'
      }
    ]
  },

  userGrowthChart: {
    labels: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun'],
    datasets: [
      {
        label: 'Jami foydalanuvchilar',
        data: [985, 1087, 1198, 1289, 1367, 1456],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true
      }
    ]
  },

  directionStatsChart: {
    labels: ['Matematika', 'Ingliz tili', 'Dasturlash'],
    datasets: [
      {
        label: 'O\'quvchilar soni',
        data: [456, 523, 389],
        backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6']
      }
    ]
  },

  recentActivity: [
    {
      id: 'act-1',
      type: 'registration',
      title: 'Yangi olimpiadaga ro\'yxat',
      description: 'Spring Math Competition 2024 - Alisher Karimov ro\'yxatdan o\'tdi',
      user: 'Alisher Karimov',
      timestamp: '5 daqiqa oldin',
      icon: 'user-plus',
      color: 'blue'
    },
    {
      id: 'act-2',
      type: 'payment',
      title: 'To\'lov amalga oshirildi',
      description: 'Yillik obuna - 990,000 so\'m',
      user: 'Malika Sobirova',
      timestamp: '12 daqiqa oldin',
      icon: 'credit-card',
      color: 'green'
    },
    {
      id: 'act-3',
      type: 'teacher_application',
      title: 'Yangi o\'qituvchi arizasi',
      description: 'Nodira Azimova - Matematika yo\'nalishi',
      user: 'Nodira Azimova',
      timestamp: '25 daqiqa oldin',
      icon: 'academic-cap',
      color: 'purple'
    },
    {
      id: 'act-4',
      type: 'certificate',
      title: 'Sertifikat yaratildi',
      description: 'Winter English Challenge 2024 - 234 ta sertifikat',
      user: 'System',
      timestamp: '1 soat oldin',
      icon: 'document-text',
      color: 'orange'
    },
    {
      id: 'act-5',
      type: 'olympiad',
      title: 'Olimpiada tugadi',
      description: 'Winter Math Competition - 189 ishtirokchi',
      user: 'System',
      timestamp: '2 soat oldin',
      icon: 'trophy',
      color: 'yellow'
    },
    {
      id: 'act-6',
      type: 'subscription',
      title: 'Obuna yangilandi',
      description: 'Sardor Toshmatov - Oylik → Yillik',
      user: 'Sardor Toshmatov',
      timestamp: '3 soat oldin',
      icon: 'arrow-path',
      color: 'blue'
    }
  ],

  alerts: [
    {
      id: 'alert-1',
      type: 'warning',
      severity: 'medium',
      title: 'Olimpiada joy qolmayapti',
      message: 'Spring Math Competition - faqat 20 ta joy qoldi (500 dan)',
      timestamp: '10 daqiqa oldin',
      action: { label: 'Ko\'rish', route: '/admin/olympiads/olym-1' }
    },
    {
      id: 'alert-2',
      type: 'info',
      severity: 'low',
      title: 'Yangi o\'qituvchilar kutmoqda',
      message: '3 ta o\'qituvchi arizasi admin tasdiqini kutmoqda',
      timestamp: '1 soat oldin',
      action: { label: 'Tekshirish', route: '/admin/teachers/pending' }
    },
    {
      id: 'alert-3',
      type: 'success',
      severity: 'low',
      title: 'Oylik maqsad bajarildi',
      message: 'Obunalar bo\'yicha oylik maqsad 110% bajarildi! 🎉',
      timestamp: '2 soat oldin',
      action: null
    },
    {
      id: 'alert-4',
      type: 'warning',
      severity: 'high',
      title: 'To\'lov muammolari',
      message: '5 ta to\'lov muvaffaqiyatsiz tugadi - tekshirish kerak',
      timestamp: '4 soat oldin',
      action: { label: 'Tekshirish', route: '/admin/payments?status=failed' }
    }
  ],

  quickStats: {
    today: {
      newUsers: 23,
      newSubscriptions: 15,
      olympiadRegistrations: 47,
      revenue: 5670000
    },
    thisWeek: {
      newUsers: 156,
      newSubscriptions: 89,
      olympiadRegistrations: 234,
      revenue: 32450000
    },
    thisMonth: {
      newUsers: 589,
      newSubscriptions: 344,
      olympiadRegistrations: 892,
      revenue: 113724000
    }
  },

  topPerformers: {
    students: [
      { id: 'u-1', name: 'Sardor Toshmatov', score: 98.5, coursesCompleted: 12, direction: 'Matematika' },
      { id: 'u-2', name: 'Malika Ergasheva', score: 97.2, coursesCompleted: 15, direction: 'Ingliz tili' },
      { id: 'u-3', name: 'Javohir Alimov', score: 96.8, coursesCompleted: 10, direction: 'Dasturlash' },
      { id: 'u-4', name: 'Dilnoza Rahimova', score: 95.5, coursesCompleted: 14, direction: 'Matematika' },
      { id: 'u-5', name: 'Alisher Karimov', score: 94.7, coursesCompleted: 11, direction: 'Ingliz tili' }
    ],
    teachers: [
      { id: 't-1', name: 'Nodira Azimova', rating: 4.9, totalLessons: 45, totalEarnings: 2250000 },
      { id: 't-2', name: 'Aziz Rahmonov', rating: 4.8, totalLessons: 38, totalEarnings: 1900000 },
      { id: 't-3', name: 'Dilshod Karimov', rating: 4.7, totalLessons: 32, totalEarnings: 1600000 }
    ]
  }
};

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const dashboardApi = {
  // Get dashboard data
  async getDashboard() {
    await delay();
    return {
      success: true,
      data: dashboardData,
      timestamp: new Date().toISOString()
    };
  },

  // Get KPIs only
  async getKPIs() {
    await delay();
    return {
      success: true,
      data: dashboardData.kpis,
      timestamp: new Date().toISOString()
    };
  },

  // Get recent activity
  async getRecentActivity(limit = 10) {
    await delay();
    return {
      success: true,
      data: dashboardData.recentActivity.slice(0, limit),
      timestamp: new Date().toISOString()
    };
  },

  // Get alerts
  async getAlerts() {
    await delay();
    return {
      success: true,
      data: dashboardData.alerts,
      timestamp: new Date().toISOString()
    };
  }
};
