export default {
  app: {
    brand: {
      strapline: "O'quv platformasi",
      name: 'EDULIFE',
      infoTitle: 'Matematika va Ingliz tili',
      infoDescription:
        "Ushbu panelda kurslaringiz, o'sish dinamikangiz va kelgusi olimpiadalar bo'yicha tezkor ma'lumot olasiz."
    },
    header: {
      greeting: 'Assalomu alaykum!',
      lastUpdated: "So'nggi yangilanish",
      coinsLabel: 'Tangalar',
      coinsValue: '{value} ta tanga',
      balanceLabel: 'Balans',
      balanceValue: "{value} so'm",
      logout: 'Chiqish',
      cohortFallback: 'Kurs hali tanlanmagan',
      guestName: 'Mehmon foydalanuvchi',
      noSync: 'hali sinxronlanmagan'
    },
    navigation: {
      menuLabel: 'Menu',
      dashboard: 'Boshqaruv paneli',
      courses: 'Kurslar',
      coursesOverview: 'Kurslar ko‘rinishi',
      olympiads: 'Olimpiadalar',
      olympiadsAll: 'Barcha olimpiadalar',
      myOlympiads: 'Mening olimpiadalarim',
      olympiadsMy: 'Mening olimpiadalarim',
      finance: 'Moliyaviy boshqaruv',
      financeTransactions: 'Tranzaksiyalar',
      financeCoins: 'Tangalar tarixi',
      profile: 'Profil',
      profileOverview: 'Profil ko‘rinishi',
      profileSettings: 'Sozlamalar',
      ariaLabel: 'Asosiy navigatsiya'
    },
    language: {
      label: 'Til',
      options: {
        uz: 'O‘zbekcha',
        ru: 'Русский'
      }
    }
  },
  common: {
    loading: 'Yuklanmoqda...',
    actions: {
      back: 'Ortga qaytish',
      edit: 'Tahrirlash',
      delete: 'O\'chirish',
      save: 'Saqlash',
      cancel: 'Bekor qilish'
    },
    pagination: {
      previous: 'Oldingi',
      next: 'Keyingi',
      page: 'Sahifa',
      of: 'dan'
    },
    sort: {
      asc: 'O\'sish tartibi',
      desc: 'Kamayish tartibi'
    }
  },
  teacher: {
    header: {
      greeting: 'Assalomu alaykum, ustoz!',
      lastUpdated: 'Oxirgi sinxronlash',
      subtitle: 'Bugungi darslar va kuzatuv'
    },
    navigation: {
      dashboard: 'Darslar paneli'
    },
    brand: {
      infoTitle: 'Mentor markazi',
      infoDescription: "Ta'lim jarayonini boshqarish, o'quvchilar natijalarini kuzatish va darslarni rejalashtiring."
    },
    dashboard: {
      title: 'O‘qituvchi paneli',
      subtitle: 'Bugungi mashg‘ulotlar va faol o‘quvchilar',
      highlights: [
        {
          id: 'next-lesson',
          label: 'Keyingi dars',
          value: '10:00 · Algebra',
          accent: 'primary',
          description: '7-sinf, 204-xona'
        },
        {
          id: 'assignments',
          label: 'Tekshirilmagan topshiriqlar',
          value: '12 ta',
          accent: 'amber',
          description: 'Bugun topshirilgan'
        },
        {
          id: 'attendance',
          label: 'Davomad darajasi',
          value: '96%',
          accent: 'emerald',
          description: 'Hafta o‘rtacha ko‘rsatkichi'
        }
      ],
      schedule: {
        title: 'Dars jadvali',
        subtitle: 'Bugungi mashg‘ulotlar va tayyorgarlik',
        rows: [
          {
            id: 'lesson-1',
            time: '09:00 – 09:45',
            subject: 'IELTS Speaking',
            group: 'Advanced Cohort',
            location: 'Studio A',
            status: 'Onlayn'
          },
          {
            id: 'lesson-2',
            time: '10:15 – 11:00',
            subject: 'Matematika — Algebra',
            group: '7-sinf',
            location: '204-xona',
            status: 'Oflayn'
          },
          {
            id: 'lesson-3',
            time: '12:30 – 13:15',
            subject: 'STEM laboratoriya',
            group: 'Maker Club',
            location: 'Lab 3',
            status: 'Hybrid'
          }
        ]
      },
      actions: {
        title: 'Tezkor amallar',
        items: [
          {
            id: 'plan',
            title: 'Dars rejasini ko‘rish',
            description: 'Bugungi mavzular va interaktiv mashqlarni tekshiring.'
          },
          {
            id: 'grade',
            title: 'Baholash jurnalini yangilash',
            description: 'So‘nggi topshiriqlar natijalarini kiriting.'
          },
          {
            id: 'mentor',
            title: 'Mentorlik sessiyasini boshlash',
            description: 'Faol o‘quvchilar uchun 1:1 suhbat rejalashtiring.'
          }
        ]
      }
    }
  },
  control: {
    header: {
      greeting: 'Assalomu alaykum, admin!',
      lastUpdated: 'Monitoring vaqti',
      subtitle: 'Tizim statistikasi'
    },
    navigation: {
      dashboard: 'Nazorat paneli'
    },
    brand: {
      infoTitle: 'Tizim tahlili',
      infoDescription: 'Foydalanuvchilar, kontent va jarayonlarni yagona panel orqali kuzating.'
    },
    dashboard: {
      title: 'Nazorat paneli',
      subtitle: 'Platformadagi asosiy ko‘rsatkichlar',
      metrics: [
        {
          id: 'students',
          label: 'Faol o‘quvchilar',
          value: '1 240',
          change: '+12 ta · hafta',
          tone: 'success'
        },
        {
          id: 'teachers',
          label: 'Mentorlar',
          value: '48',
          change: '+3 ta yangi',
          tone: 'primary'
        },
        {
          id: 'courses',
          label: 'Faol kurslar',
          value: '32',
          change: '1 yangi modul',
          tone: 'info'
        }
      ],
      updates: {
        title: 'So‘nggi yangilanishlar',
        items: [
          {
            id: 'update-1',
            title: 'Yangi kurs tasdiqlandi',
            timestamp: 'Bugun · 09:20',
            description: 'SAT tayyorgarlik kursi 2024-yil qabuliga tayyor.'
          },
          {
            id: 'update-2',
            title: 'Mentorlik tizimi yangilandi',
            timestamp: 'Kecha · 18:40',
            description: 'Baholash algoritmi va bildirishnomalar optimallashtirildi.'
          }
        ]
      },
      audit: {
        title: 'Audit kuzatuvi',
        subtitle: 'So‘nggi tizim hodisalari',
        rows: [
          {
            id: 'audit-1',
            actor: 'Operator 3',
            action: 'Foydalanuvchi rolini yangiladi',
            time: '08:45',
            status: 'Muvaffaqiyat'
          },
          {
            id: 'audit-2',
            actor: 'Admin',
            action: 'Yangi o‘qituvchi qo‘shildi',
            time: '08:10',
            status: 'Muvaffaqiyat'
          },
          {
            id: 'audit-3',
            actor: 'Monitoring',
            action: 'To‘lov tizimi tekshiruvi',
            time: '07:55',
            status: 'Kutilmoqda'
          }
        ]
      }
    }
  },
  finance: {
    transactions: {
      title: 'Moliyaviy tranzaksiyalar',
      subtitle: "Balansingiz bo'yicha tushum va xarajatlarni kuzatib boring.",
      tableSubtitle: "So'nggi 30 kun ichidagi barcha operatsiyalar tarixi.",
      columns: [
        { key: 'date', label: 'Sana' },
        { key: 'type', label: 'Turi' },
        { key: 'description', label: "Izoh" },
        { key: 'amount', label: 'Summa' },
        { key: 'balanceAfter', label: 'Balans' },
        { key: 'method', label: 'To\'lov usuli' }
      ],
      rows: [
        {
          id: 'txn-001',
          date: '02.06.2024',
          type: 'Kirim',
          description: 'STEM stipendiyasi',
          amount: 150000,
          direction: 'in',
          balanceAfter: 275000,
          method: 'Bank kartasi'
        },
        {
          id: 'txn-002',
          date: '05.06.2024',
          type: 'Chiqim',
          description: 'IELTS Writing moduli',
          amount: 85000,
          direction: 'out',
          balanceAfter: 190000,
          method: 'Onlayn to\'lov'
        },
        {
          id: 'txn-003',
          date: '09.06.2024',
          type: 'Kirim',
          description: 'Mentor cashback',
          amount: 35000,
          direction: 'in',
          balanceAfter: 225000,
          method: 'Promo-kod'
        },
        {
          id: 'txn-004',
          date: '12.06.2024',
          type: 'Chiqim',
          description: 'Olimpiada badali',
          amount: 60000,
          direction: 'out',
          balanceAfter: 165000,
          method: 'Hamyon'
        }
      ]
    },
    coins: {
      title: 'Tanga faoliyati',
      subtitle: "Tangalaringiz qanday yig'ilgani va sarflanganini kuzating.",
      tableSubtitle: "Gamifikatsiya va mukofotlar bo'yicha batafsil ma'lumot.",
      columns: [
        { key: 'date', label: 'Sana' },
        { key: 'source', label: 'Manba' },
        { key: 'description', label: "Izoh" },
        { key: 'amount', label: 'Tangalar' },
        { key: 'category', label: 'Kategoriya' }
      ],
      rows: [
        {
          id: 'coin-001',
          date: '01.06.2024',
          source: 'Haftalik davomiylik',
          description: '7 kunlik streak mukofoti',
          amount: 25,
          direction: 'in',
          category: 'Faollik'
        },
        {
          id: 'coin-002',
          date: '04.06.2024',
          source: 'Matematika testi',
          description: 'Top 10% natija',
          amount: 40,
          direction: 'in',
          category: 'Akademik'
        },
        {
          id: 'coin-003',
          date: '06.06.2024',
          source: 'Mentor sessiyasi',
          description: 'Feedback topshirildi',
          amount: 15,
          direction: 'in',
          category: 'Hamkorlik'
        },
        {
          id: 'coin-004',
          date: '08.06.2024',
          source: 'Olimpiada kuponi',
          description: 'Ishtirok to\'loviga chegirma',
          amount: 30,
          direction: 'out',
          category: 'Sarf'
        },
        {
          id: 'coin-005',
          date: '11.06.2024',
          source: 'Uy vazifasi',
          description: 'Barcha topshiriqlar vaqtida bajarildi',
          amount: 20,
          direction: 'in',
          category: 'Faollik'
        }
      ]
    }
  },
  authLayout: {
    strapline: "Huquqiy targ'ibot",
    headline: 'Bilim sayohatingizni bugun boshlang',
    description:
      "LMS tizimimiz orqali matematika va ingliz tili bo'yicha yangi yutuqlarga erishing. Darslar, testlar va real vaqt statistikasi siz uchun tayyor.",
    footer: "© 2024 O'zbekiston Respublikasi Adliya Vazirligi. Barcha huquqlar himoyalangan."
  },
  login: {
    title: 'Tizimga kirish',
    subtitle: "Bilim sayohatingizni davom ettirish uchun ma’lumotlaringizni kiriting.",
    loginLabel: 'Login',
    loginPlaceholder: 'email yoki telefon',
    passwordLabel: 'Parol',
    passwordPlaceholder: '********',
    remember: 'Meni eslab qol',
    forgot: 'Parolni unutdingizmi?',
    submit: 'Kirish',
    error: "Kirishda xatolik yuz berdi. Qayta urinib ko'ring"
  },
  notifications: {
    success: {
      generic: {
        title: 'Muvaffaqiyat',
        message: 'Amal muvaffaqiyatli bajarildi.'
      },
      login: {
        title: 'Xush kelibsiz, {name}!',
        message: 'Siz tizimga muvaffaqiyatli kirdingiz.'
      },
      logout: {
        title: 'Sessiya yakunlandi',
        message: 'Siz hisobingizdan chiqdingiz.'
      },
      localeChange: {
        title: 'Til o‘zgartirildi',
        message: '{language} tiliga muvaffaqiyatli o‘tdingiz.'
      },
      olympiadsRegister: {
        title: 'Ariza yuborildi!',
        message: "{title} olimpiadasida qatnashish tasdiqlandi."
      },
      miniTestPurchase: {
        title: 'Demo test tayyor!',
        message: "Siz '{title}' mini testini muvaffaqiyatli sotib oldingiz."
      }
    },
    error: {
      generic: {
        title: 'Xatolik',
        message: 'Amalni bajarishda xatolik yuz berdi.'
      },
      login: {
        title: 'Kirish amalga oshmadi',
        message: 'Maʼlumotlarni tekshirib, qayta urinib ko‘ring.'
      }
    }
  },
  dashboard: {
    title: 'Boshqaruv paneli',
    subtitle: "Faolligingiz, kurslardagi o'zgarishlar va kelgusi vazifalar bo'yicha umumiy ko'rinish.",
    weeklyPlan: 'Haftalik reja',
    stats: [
      {
        label: "O'quv soatlari",
        value: '42 soat',
        trendValue: 12,
        description: "Joriy oy davomida yig'ilgan",
        icon: '⏱️'
      },
      {
        label: 'Yangi yutuqlar',
        value: '7 badge',
        trendValue: 4,
        description: 'Matematika modulidagi faolatingiz',
        icon: '🏅'
      },
      {
        label: 'Test natijalari',
        value: '86%',
        trendValue: 8,
        description: "Oxirgi 10 ta testning o'rtacha natijasi",
        icon: '🧠'
      },
      {
        label: 'Mentor feedback',
        value: '4.8/5',
        trendValue: 2,
        description: 'Mentoring sessiyalari bo\'yicha baholash',
        icon: '💬'
      }
    ],
    tasks: {
      title: 'Haftalik vazifalar',
      items: [
        {
          id: 'task-1',
          title: 'Matematika - Trigonometriya testi',
          description: "9 ta savoldan iborat mini test, yakshanbagacha yakunlang",
          tone: 'info',
          label: 'Jarayonda'
        },
        {
          id: 'task-2',
          title: 'Ingliz tili - Speaking klubi',
          description: 'Payshanba kuni soat 19:00 da, Zoom havolasi emailga yuborildi',
          tone: 'success',
          label: 'Tasdiqlandi'
        },
        {
          id: 'task-3',
          title: 'Olimpiada tayyorgarlik',
          description: "Matematika bo'yicha 5 ta murakkab masala, mentor bilan muhokama qiling",
          tone: 'warning',
          label: 'Muhim'
        }
      ]
    },
    activity: {
      title: 'Faoliyat jurnali',
      subtitle: "Audit log orqali barcha muhim o'zgarishlarni kuzating.",
      tableSubtitle: "So'nggi kuzatuvlar",
      actionLabel: 'Batafsil',
      columns: [
        { key: 'event', label: 'Voqea' },
        { key: 'module', label: 'Modul' },
        { key: 'status', label: 'Holat' },
        { key: 'action', label: 'Vaqt' }
      ],
      rows: [
        {
          id: 'log-1',
          event: 'Test yakunlandi',
          module: 'Matematika / Logarifmlar',
          status: '86% natija',
          timestamp: 'Bugun 14:20'
        },
        {
          id: 'log-2',
          event: 'Mentor fikri',
          module: 'Ingliz tili / IELTS Speaking',
          status: '4.9/5 baho',
          timestamp: 'Kecha 19:05'
        },
        {
          id: 'log-3',
          event: 'Fayl yuklandi',
          module: 'Matematika / Trigonometriya',
          status: 'Homework.pdf',
          timestamp: '3 kun avval'
        }
      ]
    },
    chart: {
      title: "Oy davomida o'sish",
      subtitle: "Fanlar kesimida o'zlashtirish darajasi",
      subjectOptions: {
        math: 'Matematika',
        english: 'Ingliz tili'
      },
      labels: ['1-hafta', '2-hafta', '3-hafta', '4-hafta'],
      datasets: {
        math: {
          label: 'Matematika',
          data: [72, 78, 84, 91]
        },
        english: {
          label: 'Ingliz tili',
          data: [65, 70, 74, 82]
        }
      }
    }
  },
  courses: {
    title: 'Mening kurslarim',
    subtitle: 'Hozirgi, yakunlangan va sizga tavsiya etilayotgan kurslarni boshqaring.',
    tabs: [
      { key: 'active', label: 'Joriy kurslar' },
      { key: 'completed', label: 'Tugallangan kurslar' },
      { key: 'recommended', label: 'Tavsiya qilingan kurslar' }
    ],
    statusMap: {
      active: 'Joriy',
      completed: 'Tugallangan',
      recommended: 'Tavsiya'
    },
    items: [
      {
        id: 'math-101',
        title: 'Matematika - Integral hisob',
        mentor: 'Rustam aka',
        description: "Integrallarni tushunish va amaliyotda qo'llash bo'yicha intensiv modul.",
        progress: 78,
        monthlyGrowth: 12,
        statusLabel: 'Joriy',
        statusTone: 'info',
        statusKey: 'active',
        companions: [
          'https://api.dicebear.com/7.x/initials/svg?seed=AA&backgroundColor=e0f7f4',
          'https://api.dicebear.com/7.x/initials/svg?seed=BB&backgroundColor=b3ebe2',
          'https://api.dicebear.com/7.x/initials/svg?seed=CC&backgroundColor=80ded0'
        ]
      },
      {
        id: 'eng-210',
        title: 'Ingliz tili - IELTS Writing',
        mentor: 'Madina opa',
        description: 'Writing Task 1 va Task 2 uchun yuqori ball olish strategiyalari.',
        progress: 64,
        monthlyGrowth: 9,
        statusLabel: 'Joriy',
        statusTone: 'info',
        statusKey: 'active',
        companions: [
          'https://api.dicebear.com/7.x/initials/svg?seed=DD&backgroundColor=e0f7f4',
          'https://api.dicebear.com/7.x/initials/svg?seed=EE&backgroundColor=b3ebe2'
        ]
      },
      {
        id: 'math-050',
        title: 'Matematika - Kombinatorika',
        mentor: "Ulug'bek aka",
        description: "Olimpiadaga tayyorlanish uchun kombinatorika va ehtimollik.",
        progress: 100,
        monthlyGrowth: 18,
        statusLabel: 'Tugallangan',
        statusTone: 'success',
        statusKey: 'completed',
        companions: [
          'https://api.dicebear.com/7.x/initials/svg?seed=FF&backgroundColor=e0f7f4',
          'https://api.dicebear.com/7.x/initials/svg?seed=GG&backgroundColor=b3ebe2'
        ]
      },
      {
        id: 'eng-090',
        title: 'Ingliz tili - Grammar Boost',
        mentor: 'Nilufar opa',
        description: 'Intermediate grammatikani mustahkamlash uchun 30 kunlik challenge.',
        progress: 100,
        monthlyGrowth: 22,
        statusLabel: 'Tugallangan',
        statusTone: 'success',
        statusKey: 'completed',
        companions: [
          'https://api.dicebear.com/7.x/initials/svg?seed=HH&backgroundColor=e0f7f4'
        ]
      },
      {
        id: 'math-220',
        title: 'Matematika - Differential tenglamalar',
        mentor: 'Botir aka',
        description: 'Universitetga tayyorlanish uchun differensial tenglamalar kursi.',
        progress: 0,
        monthlyGrowth: 0,
        statusLabel: 'Tavsiya',
        statusTone: 'warning',
        statusKey: 'recommended',
        companions: [
          'https://api.dicebear.com/7.x/initials/svg?seed=II&backgroundColor=e0f7f4',
          'https://api.dicebear.com/7.x/initials/svg?seed=JJ&backgroundColor=b3ebe2'
        ]
      },
      {
        id: 'eng-330',
        title: "Ingliz tili - Advanced Speaking Lab",
        mentor: 'Kamola opa',
        description: "Haftasiga ikki marotaba native speaker bilan amaliy mashg'ulotlar.",
        progress: 0,
        monthlyGrowth: 0,
        statusLabel: 'Tavsiya',
        statusTone: 'warning',
        statusKey: 'recommended',
        companions: [
          'https://api.dicebear.com/7.x/initials/svg?seed=KK&backgroundColor=e0f7f4',
          'https://api.dicebear.com/7.x/initials/svg?seed=LL&backgroundColor=b3ebe2',
          'https://api.dicebear.com/7.x/initials/svg?seed=MM&backgroundColor=80ded0'
        ]
      }
    ],
    card: {
      progressLabel: "O'zlashtirish",
      growthLabel: "Oylik o'sish",
      viewAction: "Kursga o'tish",
      companionAlt: 'Guruhdosh'
    }
  },
  courseDetails: {
    backToCourses: 'Kurslarga qaytish',
    notFoundTitle: 'Kurs topilmadi',
    notFoundSubtitle: 'Tanlangan kurs mavjud emas. Iltimos, kurslar roʻyxatidan boshqa darsni tanlang.',
    tabs: [
      { key: 'materials', label: 'Materiallar' },
      { key: 'tests', label: 'Testlar' },
      { key: 'homework', label: 'Uy vazifalari' }
    ],
    player: {
      module: '2',
      duration: '42 daqiqa',
      poster: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80',
      sources: [
        {
          type: 'video/mp4',
          url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
        }
      ],
      nextLesson: {
        title: '3-mavzu: Integrallarni qo‘llash',
        description: 'Yangi mavzuda qo‘llanmalar va amaliy misollar bilan ishlaymiz.'
      },
      moduleLabel: '{{ module }}-modul',
      mentorLabel: 'Mentor: {{ mentor }}',
      nextLessonLabel: 'Keyingi mavzu',
      continueAction: 'Darsni davom ettirish',
      videoNotSupported: 'Brauzeringiz video formatni qo‘llab-quvvatlamaydi.'
    },
    resources: {
      viewAction: 'Ochish',
      materials: [
        {
          title: 'Konspekt — Integral hisob asoslari (PDF)',
          description: 'Darsdagi asosiy formulalar va jadval ko‘rinishidagi izohlar.',
          duration: '12 sahifa',
          type: 'pdf'
        },
        {
          title: 'Prezentatsiya — Grafiklar bilan ishlash',
          description: 'Integralni geometrik talqin qilish uchun slaydlar.',
          duration: '18 slayd',
          type: 'presentation'
        },
        {
          title: 'Qo‘shimcha video — Amaliy misollar',
          description: 'Murakkab misollarni yechish bo‘yicha qisqa sharh.',
          duration: '16 daqiqa',
          type: 'video'
        }
      ],
      tests: [
        {
          id: 'quick-review',
          title: 'Tezkor test — Modulni takrorlash',
          description: '10 ta savoldan iborat qisqa test.',
          duration: '15 daqiqa',
          type: 'test'
        },
        {
          id: 'midterm',
          title: 'Oraliq nazorat — Integral hisob',
          description: 'Nazorat ishi uchun 20 ta savol.',
          duration: '30 daqiqa',
          type: 'test'
        }
      ],
      homework: [
        {
          title: 'Uy vazifasi №4',
          description: 'Integrallar bo‘yicha 8 ta amaliy masala.',
          duration: 'Topsirish muddati: 14-may',
          type: 'assignment'
        },
        {
          title: 'Portfolio uchun loyiha',
          description: 'Integrallar yordamida soha hisoblash bo‘yicha tadqiqot.',
          duration: 'Topsirish muddati: 20-may',
          type: 'assignment'
        }
      ]
    },
    testDetails: {
      'quick-review': {
        id: 'quick-review',
        title: 'Tezkor test — Modulni takrorlash',
        topic: 'Integral hisob asoslari',
        durationMinutes: 15,
        totalQuestions: 5,
        attempts: 1,
        deadline: 'Bugun 23:59 gacha',
        description:
          'Bu test integral hisobning asosiy formulalari va geometrik talqinini mustahkamlash uchun tuzilgan.',
        questions: [
          {
            id: 'q1',
            number: 1,
            title: 'Aniq integral',
            prompt:
              '<p>Quyidagi aniq integralni hisoblang: <span class="font-semibold">∫<sub>0</sub><sup>1</sup> 3x<sup>2</sup> dx</span>.</p>',
            options: [
              { id: 'q1a', label: 'A', content: '<span>1</span>' },
              { id: 'q1b', label: 'B', content: '<span>⅓</span>' },
              { id: 'q1c', label: 'C', content: '<span>⅔</span>' },
              { id: 'q1d', label: 'D', content: '<span>⅕</span>' }
            ],
            correctOptionId: 'q1a',
            solutionVideo: 'https://www.youtube.com/embed/nmgEyxQM0j4'
          },
          {
            id: 'q2',
            number: 2,
            title: 'Newton-Leibniz formulasi',
            prompt:
              '<p>Funktsiya <span class="font-semibold">F(x) = x<sup>3</sup></span> ning hosilasi <span class="font-semibold">f(x) = 3x<sup>2</sup></span>. Newton-Leibniz formulasi bo\'yicha <span class="font-semibold">∫<sub>1</sub><sup>2</sup> 3x<sup>2</sup> dx</span> ni aniqlang.</p>',
            options: [
              { id: 'q2a', label: 'A', content: '<span>6</span>' },
              { id: 'q2b', label: 'B', content: '<span>7</span>' },
              { id: 'q2c', label: 'C', content: '<span>8</span>' },
              { id: 'q2d', label: 'D', content: '<span>9</span>' }
            ],
            correctOptionId: 'q2b',
            solutionVideo: 'https://www.youtube.com/embed/p89UP1Ky7Zg'
          },
          {
            id: 'q3',
            number: 3,
            title: 'Eksponenta integrali',
            prompt:
              '<p>Quyidagi integralni toping: <span class="font-semibold">∫ e<sup>2x</sup> dx</span>.</p>',
            options: [
              { id: 'q3a', label: 'A', content: '<span>½ · e<sup>2x</sup> + C</span>' },
              { id: 'q3b', label: 'B', content: '<span>2 · e<sup>2x</sup> + C</span>' },
              { id: 'q3c', label: 'C', content: '<span>e<sup>2x</sup> + C</span>' },
              { id: 'q3d', label: 'D', content: '<span>√(e<sup>2x</sup>) + C</span>' }
            ],
            correctOptionId: 'q3a',
            solutionVideo: 'https://www.youtube.com/embed/XWuvq7Obo4k'
          },
          {
            id: 'q4',
            number: 4,
            title: 'Trigonometrik integral',
            prompt:
              '<p>Trigonometrik integralni hisoblang: <span class="font-semibold">∫ sin(x) dx</span>.</p>',
            options: [
              { id: 'q4a', label: 'A', content: '<span>-cos(x) + C</span>' },
              { id: 'q4b', label: 'B', content: '<span>cos(x) + C</span>' },
              { id: 'q4c', label: 'C', content: '<span>sin(x) + C</span>' },
              { id: 'q4d', label: 'D', content: '<span>tan(x) + C</span>' }
            ],
            correctOptionId: 'q4a',
            solutionVideo: 'https://www.youtube.com/embed/xkaW1YEYwDs'
          },
          {
            id: 'q5',
            number: 5,
            title: 'Maydonni hisoblash',
            prompt:
              '<p>Grafiklar orasidagi maydonni toping: <span class="font-semibold">∫<sub>0</sub><sup>π</sup> sin(x) dx</span>.</p>',
            options: [
              { id: 'q5a', label: 'A', content: '<span>0</span>' },
              { id: 'q5b', label: 'B', content: '<span>1</span>' },
              { id: 'q5c', label: 'C', content: '<span>2</span>' },
              { id: 'q5d', label: 'D', content: '<span>π</span>' }
            ],
            correctOptionId: 'q5c',
            solutionVideo: 'https://www.youtube.com/embed/ogHhz_pK7-k'
          }
        ]
      },
      midterm: {
        id: 'midterm',
        title: 'Oraliq nazorat — Integral hisob',
        topic: 'Kengaytirilgan integral hisob',
        durationMinutes: 30,
        totalQuestions: 8,
        attempts: 1,
        deadline: 'Juma, 18:00 gacha',
        description:
          'Nazorat ishi bo\'lib, funksiyalarni integrallashning turli usullari va qo\'llanmalarini qamrab oladi.',
        questions: [
          {
            id: 'm1',
            number: 1,
            title: 'Qism bo\'yicha integrallash',
            prompt:
              '<p>Qism bo\'yicha integrallash formulasini qo\'llab <span class="font-semibold">∫ x e<sup>x</sup> dx</span> ni hisoblang.</p>',
            options: [
              { id: 'm1a', label: 'A', content: '<span>x e<sup>x</sup> - e<sup>x</sup> + C</span>' },
              { id: 'm1b', label: 'B', content: '<span>x e<sup>x</sup> + e<sup>x</sup> + C</span>' },
              { id: 'm1c', label: 'C', content: '<span>e<sup>x</sup> + C</span>' },
              { id: 'm1d', label: 'D', content: '<span>x e<sup>x</sup> + C</span>' }
            ],
            correctOptionId: 'm1a',
            solutionVideo: 'https://www.youtube.com/embed/7z9W-k3mG6M'
          },
          {
            id: 'm2',
            number: 2,
            title: 'Trigonometrik almashtirish',
            prompt:
              '<p>Almashtirish <span class="font-semibold">x = sin(t)</span> ni qo\'llab <span class="font-semibold">∫ x / √(1 - x²) dx</span> ni toping.</p>',
            options: [
              { id: 'm2a', label: 'A', content: '<span>-√(1 - x²) + C</span>' },
              { id: 'm2b', label: 'B', content: '<span>√(1 - x²) + C</span>' },
              { id: 'm2c', label: 'C', content: '<span>-cos(t) + C</span>' },
              { id: 'm2d', label: 'D', content: '<span>cos(t) + C</span>' }
            ],
            correctOptionId: 'm2a',
            solutionVideo: 'https://www.youtube.com/embed/0NmsYUBv--c'
          },
          {
            id: 'm3',
            number: 3,
            title: 'Differensial tenglama',
            prompt:
              '<p>Quyidagi oddiy differensial tenglamani yeching: <span class="font-semibold">dy/dx = y</span>, boshlang\'ich shart <span class="font-semibold">y(0) = 2</span>.</p>',
            options: [
              { id: 'm3a', label: 'A', content: '<span>y = 2e<sup>x</sup></span>' },
              { id: 'm3b', label: 'B', content: '<span>y = 2e<sup>-x</sup></span>' },
              { id: 'm3c', label: 'C', content: '<span>y = 2x</span>' },
              { id: 'm3d', label: 'D', content: '<span>y = 2 + x</span>' }
            ],
            correctOptionId: 'm3a',
            solutionVideo: 'https://www.youtube.com/embed/7yqvPmuXW2Q'
          },
          {
            id: 'm4',
            number: 4,
            title: 'Logarifmik integral',
            prompt:
              '<p>Quyidagi integralni hisoblang: <span class="font-semibold">∫ 1/x dx</span>.</p>',
            options: [
              { id: 'm4a', label: 'A', content: '<span>ln|x| + C</span>' },
              { id: 'm4b', label: 'B', content: '<span>1/x + C</span>' },
              { id: 'm4c', label: 'C', content: '<span>log₁₀(x) + C</span>' },
              { id: 'm4d', label: 'D', content: '<span>x · ln|x| + C</span>' }
            ],
            correctOptionId: 'm4a',
            solutionVideo: 'https://www.youtube.com/embed/v0S_y3gfG1w'
          },
          {
            id: 'm5',
            number: 5,
            title: 'Doira maydoni',
            prompt:
              '<p>Doiraning maydonini ifodalovchi integralni toping: <span class="font-semibold">S = ∫<sub>-r</sub><sup>r</sup> 2√(r² - x²) dx</span>.</p>',
            options: [
              { id: 'm5a', label: 'A', content: '<span>πr²</span>' },
              { id: 'm5b', label: 'B', content: '<span>2πr</span>' },
              { id: 'm5c', label: 'C', content: '<span>r²</span>' },
              { id: 'm5d', label: 'D', content: '<span>πr</span>' }
            ],
            correctOptionId: 'm5a',
            solutionVideo: 'https://www.youtube.com/embed/KxOTbY4Z1Zc'
          },
          {
            id: 'm6',
            number: 6,
            title: 'Chegaraviy qiymat',
            prompt:
              '<p>Limitni hisoblang: <span class="font-semibold">lim<sub>x→0</sub> sin(x) / x</span>.</p>',
            options: [
              { id: 'm6a', label: 'A', content: '<span>0</span>' },
              { id: 'm6b', label: 'B', content: '<span>1</span>' },
              { id: 'm6c', label: 'C', content: '<span>∞</span>' },
              { id: 'm6d', label: 'D', content: '<span>-1</span>' }
            ],
            correctOptionId: 'm6b',
            solutionVideo: 'https://www.youtube.com/embed/1dzUuNzqK5k'
          },
          {
            id: 'm7',
            number: 7,
            title: 'Geometrik qator',
            prompt:
              '<p>Qatorning yig\'indisini toping: <span class="font-semibold">∑<sub>n=0</sub><sup>∞</sup> (½)<sup>n</sup></span>.</p>',
            options: [
              { id: 'm7a', label: 'A', content: '<span>1</span>' },
              { id: 'm7b', label: 'B', content: '<span>2</span>' },
              { id: 'm7c', label: 'C', content: '<span>3</span>' },
              { id: 'm7d', label: 'D', content: '<span>4</span>' }
            ],
            correctOptionId: 'm7b',
            solutionVideo: 'https://www.youtube.com/embed/nDMp2PqFHTg'
          },
          {
            id: 'm8',
            number: 8,
            title: 'Ikki karra integral',
            prompt:
              '<p>Ikki karra integralni qiymatini toping: <span class="font-semibold">∬<sub>D</sub> (x + y) dA</span>, bu yerda <span class="font-semibold">D</span> birlik kvadrat <span class="font-semibold">[0,1] × [0,1]</span>.</p>',
            options: [
              { id: 'm8a', label: 'A', content: '<span>1</span>' },
              { id: 'm8b', label: 'B', content: '<span>3/2</span>' },
              { id: 'm8c', label: 'C', content: '<span>2</span>' },
              { id: 'm8d', label: 'D', content: '<span>1/2</span>' }
            ],
            correctOptionId: 'm8a',
            solutionVideo: 'https://www.youtube.com/embed/XSEuxsjjXN0'
          }
        ]
      }
    },
    testSolve: {
      backToCourse: 'Kursga qaytish',
      notFoundTitle: 'Test topilmadi',
      notFoundDescription: 'Tanlangan test mavjud emas yoki o‘quv dasturidan olib tashlangan.',
      finishButton: 'Testni tugatish',
      finishSuccessTitle: 'Test yakunlandi',
      finishSuccessDescription: 'Javoblaringiz saqlandi va natijalar tez orada e’lon qilinadi.',
      finishAutoDescription: 'Vaqt tugadi. Test avtomatik yakunlandi.',
      timerLabel: 'Qolgan vaqt',
      answeredLabel: 'Javob berilgan savollar',
      unansweredLabel: 'Javobsiz savollar',
      questionNavigationTitle: 'Savollar ro‘yxati',
      questionCounter: 'Savol {{current}} / {{total}}',
      previousQuestion: 'Oldingi savol',
      nextQuestion: 'Keyingi savol',
      stats: {
        overviewTitle: 'Test haqida qisqacha',
        durationLabel: 'Umumiy vaqt',
        questionsLabel: 'Savollar soni',
        topicLabel: 'Mavzu',
        attemptsLabel: 'Urinishlar',
        deadlineLabel: 'Topshirish muddati'
      },
      results: {
        modalTitle: 'Natijalar e’lon qilindi',
        modalDescription: 'Siz {{total}} ta savoldan {{correct}} tasiga to‘g‘ri javob berdingiz.',
        latestAttemptTitle: 'So‘nggi urinish',
        overallScore: 'Umumiy natija: {{score}}% · {{correct}} / {{total}}',
        downloadPdf: 'PDF yuklab olish',
        scoreLabel: 'Umumiy ball',
        correctLabel: 'To‘g‘ri javoblar',
        incorrectLabel: 'Noto‘g‘ri javoblar',
        timeSpentLabel: 'Sarflangan vaqt',
        completedAttempts: 'Yakunlangan urinishlar',
        viewDetails: 'Batafsil ko‘rish',
        viewHistory: 'Urinishlar tarixi',
        previousAttemptScore: 'Oldingi urinish: {{score}}%',
        completedAttemptsMessage: 'Siz jami {{count}} ta urinishni yakunladingiz.',
        close: 'Yopish',
        closeHistory: 'Tarixni yopish',
        historyTitle: 'Urinishlar arxivi',
        historySubtitle: '{{title}} testi bo‘yicha',
        noAttempts: 'Hali urinishlar mavjud emas.',
        attemptName: '{{index}}-urinish',
        defaultTitle: 'Test natijasi',
        attemptDate: 'Vaqt',
        selectedAnswer: 'Tanlangan javob',
        correctAnswer: 'To‘g‘ri javob',
        noAnswer: 'Javob berilmagan',
        untitledQuestion: 'Savol',
        durationFormat: '{{minutes}} daqiqa {{seconds}} soniya'
      },
      attemptDetails: {
        backToTest: 'Testga qaytish',
        title: 'Urinish tafsilotlari',
        titleWithScore: '{{title}} — {{score}}%',
        subtitle: 'Sana: {{date}} · Vaqt: {{duration}} · Savollar: {{total}} ta',
        notFound: 'Ushbu urinish topilmadi yoki o‘chirib tashlangan.',
        summaryTitle: 'Natija tafsilotlari',
        summaryDescription: 'Umumiy natija — {{score}}%',
        tableTitle: 'Savollar bo‘yicha tahlil',
        tableSubtitle: 'Har bir savolning javobi va yechim videosi',
        questionColumn: 'Savol',
        answerColumn: 'Sizning javobingiz',
        correctColumn: 'To‘g‘ri javob',
        videoColumn: 'Video dars',
        noAnswer: 'Javob berilmagan',
        noAnswerDescription: 'Bu savolga javob tanlanmagan.',
        watchSolution: 'Videoni ko‘rish',
        noVideo: 'Video mavjud emas',
        closeVideo: 'Videoni yopish',
        solutionTitle: '{{number}}-savol yechimi'
      }
    },
    modules: {
      title: 'Modullar va mavzular',
      subtitle: 'Har bir modul bo'yicha taraqqiyot',
      status: {
        completed: 'Tugallangan',
        'in-progress': 'Jarayonda',
        locked: 'Qulf ostida'
      },
      lessonsCount: 'ta dars',
      description: 'Modul haqida',
      view: "Ko'rish",
      deleteAction: "O'chirish",
      delete: {
        title: "Modulni o'chirish",
        warning: 'Diqqat!',
        warningMessage: "Bu amalni ortga qaytarib bo'lmaydi. Modul ichidagi barcha darslar ham o'chiriladi.",
        message: "Siz quyidagi modulni o'chirmoqchimisiz?",
        cancel: 'Bekor qilish',
        confirm: "O'chirish"
      },
      messages: {
        deleteSuccess: "Modul muvaffaqiyatli o'chirildi",
        error: "Xatolik yuz berdi"
      }
    },
    results: {
      title: 'Natijalarim',
      subtitle: 'Shaxsiy ko‘rsatkichlar',
      milestonesTitle: 'Yaqin maqsadlar',
      summary: [
        {
          label: 'Umumiy progress',
          value: '78%',
          hint: 'Modul bo‘yicha'
        },
        {
          label: 'Ketma-ketlik',
          value: '5 kun',
          hint: 'Uzliksiz o‘qish'
        },
        {
          label: 'Test natijasi',
          value: '86%',
          hint: 'Oxirgi 3 test'
        }
      ],
      milestones: [
        {
          title: 'Modul 2 testini yakunlang',
          description: '12-maygacha oraliq testni topshiring.'
        },
        {
          title: 'Uy vazifasi №4',
          description: 'Amaliy mashqlarni 14-may kuni yuklang.'
        },
        {
          title: 'O‘rtacha ballni 90% ga yetkazing',
          description: 'Qo‘shimcha materiallarni ko‘rib chiqing va testni qayta yeching.'
        }
      ]
    },
    modulesData: [
      {
        id: 'module-1',
        title: '1-modul. Limitlar va uzluksizlik',
        description: 'Asosiy tushunchalar va tayanch formulalar.',
        status: 'completed',
        lessons: [
          { title: 'Limitlarga kirish', duration: '25 daqiqa', status: 'completed' },
          { title: 'Funksiyalar uzluksizligi', duration: '30 daqiqa', status: 'completed' }
        ]
      },
      {
        id: 'module-2',
        title: '2-modul. Integralga kirish',
        description: 'Integrallarning ma’nosi va qo‘llanilishi.',
        status: 'in-progress',
        lessons: [
          { title: 'Noaniq integral', duration: '28 daqiqa', status: 'in-progress' },
          { title: 'Asosiy integrallash qoidalari', duration: '32 daqiqa', status: 'locked' },
          { title: 'Geometrik talqin', duration: '24 daqiqa', status: 'locked' }
        ]
      },
      {
        id: 'module-3',
        title: '3-modul. Qo‘llanmalar va amaliyot',
        description: 'Real vaziyatlarda integralni qo‘llash.',
        status: 'locked',
        lessons: [
          { title: 'Fizikada qo‘llash', duration: '26 daqiqa', status: 'locked' },
          { title: 'Iqtisodiy masalalar', duration: '22 daqiqa', status: 'locked' }
        ]
      }
    ]
  },
  olympiads: {
    title: 'Olimpiadalar',
    subtitle:
      "Eng yaqin olimpiadalar va tanlovlarni tanlang, qatnashish shartlari va to'lovlari bilan tanishing.",
    levelLabels: {
      success: 'Respublika',
      warning: 'Xalqaro',
      info: 'Maktab'
    },
    card: {
      start: 'Boshlanish',
      duration: 'Muddati',
      format: 'Format',
      subject: 'Fan',
      feeLabel: 'Ishtirok narxi',
      action: 'Qatnashish',
      details: 'Batafsil',
      viewResults: 'Natijalar',
      registered: 'Ro‘yxatdan o‘tilgan'
    },
    groups: {
      upcoming: 'Ochiq olimpiadalar',
      upcomingHint: 'Yaqinda start oladigan olimpiadalar uchun ro‘yxatdan o‘ting.',
      finished: 'Yakunlangan olimpiadalar',
      finishedHint: 'Natijalari e’lon qilingan olimpiadalar arxivi.'
    },
    empty: {
      upcoming: 'Hozircha yangi olimpiadalar yo‘q. Tez orada yangilanishlarni kuzating.',
      finished: 'Yakunlangan olimpiadalar hozircha mavjud emas.'
    },
    details: {
      back: "Barcha olimpiadalar ro'yxati",
      overviewTitle: 'Olimpiada haqida',
      flowTitle: 'Tashkil etilish tartibi',
      challengesTitle: 'Qiyinchiliklar',
      metricsTitle: 'Asosiy ko‘rsatkichlar',
      metrics: {
        questions: 'Savollar soni',
        participants: 'Qatnashuvchilar soni',
        difficulty: 'Qiyinchilik darajasi',
        prizes: 'Sovrinlar'
      },
      prizesTitle: 'Sovrinlar taqsimoti',
      resultsTitle: 'Qatnashchilar natijalari',
      resultsSubtitle: 'Yakuniy ballar yuqoridan pastga qarab saralandi.',
      resultsTable: {
        rank: 'O‘rin',
        participant: 'Ism-sharif',
        score: 'Ball'
      },
      noResults: 'Natijalar hali mavjud emas.',
      notFoundTitle: 'Olimpiada topilmadi',
      notFoundSubtitle: 'So‘ralgan olimpiada mavjud emas yoki o‘chirib tashlangan. Iltimos, ro‘yxatdan mosini tanlang.',
      statusTag: {
        upcoming: 'Ro‘yxatdan o‘tish ochiq',
        finished: 'Yakunlangan olimpiada'
      },
      difficultyLabels: {
        beginner: 'Boshlang‘ich',
        intermediate: 'O‘rta',
        advanced: 'Murakkab'
      }
    },
    registration: {
      title: 'Ishtirokni tasdiqlaysizmi?',
      subtitle: '{title} olimpiadasida qatnashishni tasdiqlang.',
      paymentNotice: 'Diqqat! Ishtirok badali tasdiqlangach hisobdan yechiladi.',
      balanceReminder: '{amount} miqdoridagi to‘lov hisobingizdan yechib olinadi.',
      studentInfoTitle: 'O‘quvchi ma’lumotlari',
      fields: {
        fullName: 'Ism sharif',
        email: 'Email',
        phone: 'Telefon'
      },
      cancel: 'Bekor qilish',
      confirm: 'Ishtirok etaman'
    },
    my: {
      title: 'Mening olimpiadalarim',
      subtitle: 'Ro‘yxatdan o‘tgan olimpiadalar va ularning demo testlarini boshqaring.',
      empty: 'Siz hali hech qanday olimpiadaga ro‘yxatdan o‘tmagansiz.',
      browseAction: 'Olimpiadalarni ko‘rish',
      viewDetails: 'Tafsilotlarni ko‘rish',
      demoTitle: 'Demo testlar bilan tayyorlanish imkoniyati',
      demoSubtitle: 'Har bir demo test narxi asosiy badalning 10% ini tashkil etadi ({price}).',
      tableSubtitle: 'Mini testlar natijalarni oshirish uchun mo‘ljallangan.',
      tableColumns: {
        title: 'Mini test',
        duration: 'Vaqt / savollar',
        price: 'Narxi'
      },
      buyAction: 'Sotib olish',
      purchased: 'Sotib olingan',
      solveAction: 'Testni yechish',
      detailsAction: 'Tafsilotlarni ochish',
      hideDetails: 'Yopish',
      confirmPurchase: "'{title}' demo testini sotib olishni tasdiqlaysizmi?",
      countdown: {
        label: 'Boshlanishiga',
        text: '{time} qoldi',
        started: 'Boshlanib bo‘ldi',
        soon: 'Bir necha soniya qoldi',
        days: '{count} kun',
        hours: '{count} soat',
        minutes: '{count} daqiqa'
      },
      solvePage: {
        title: '{title} — demo test',
        subtitle: '{subject} bo‘yicha bilimlaringizni mustahkamlang.',
        back: 'Olimpiadalarimga qaytish',
        startInfo: 'Boshlanish vaqti',
        durationInfo: 'Davomiyligi',
        questionInfo: 'Savollar soni',
        startCta: 'Testni boshlash',
        unavailable: 'Bu demo test topilmadi yoki hali mavjud emas.'
      }
    },
    items: [
      {
        id: 'olymp-1',
        title: 'Matematika - Respublika bosqichi',
        host: "Oliy va o'rta maxsus ta'lim vazirligi",
        description: "12-sinflar uchun murakkab analiz va kombinatorika bo'yicha tanlov.",
        startAt: '2024-06-12T09:00:00+05:00',
        start: '12-iyun 2024',
        duration: '1 kun',
        format: 'Offline (Toshkent)',
        subject: 'Matematika',
        fee: 120000,
        level: 'success',
        status: 'upcoming',
        overview:
          "Tanlov respublika bo'yicha eng kuchli matematika o'quvchilarini aniqlash va xalqaro bosqichga tayyorlashga yo'naltirilgan.",
        flow: [
          {
            title: "Ro'yxatdan o'tish va arizalarni tasdiqlash",
            description: 'Ta’lim muassasalari orqali ariza topshirish va to‘lovni tasdiqlash.'
          },
          {
            title: 'Nazariy bosqich',
            description: '6 ta murakkab analiz va kombinatorika masalalariga yozma yechim.'
          },
          {
            title: 'Amaliy bosqich',
            description: "YeChimlarni hakamlar hay'ati oldida himoya qilish va savol-javob." 
          }
        ],
        challengeSummary: 'Har bir bosqich yuqori darajadagi matematik mantiq va qat’iy dalillarni talab etadi.',
        challenges: [
          'Kompleks analiz va kombinatorikadan nazariy isbotlar.',
          'Vaqt chegarasi ostida yechimlarni asoslab berish.',
          "Hakamlar savollariga aniq va asosli javob qaytarish."
        ],
        questionCount: '6 ta',
        participantCount: '180 nafar',
        difficultyLevel: 'advanced',
        difficultyNote: 'Final bosqichida nazariy ishlanmalar himoyasi talab qilinadi.',
        prizeSummary: 'MacBook Air M2, oltin medal va 12 oylik stipendiya.',
        prizes: [
          {
            place: '1-o‘rin',
            reward: 'MacBook Air M2',
            description: 'MacBook, oltin medal va xalqaro bosqichga grant.'
          },
          {
            place: '2-o‘rin',
            reward: 'iPad Air + kumush medal',
            description: 'IELTS tayyorgarlik kursi va 50% chegirma bilan.'
          },
          {
            place: '3-o‘rin',
            reward: 'Kindle va bronza medal',
            description: 'Matematika bo‘yicha o‘quv to‘plami va murabbiylik sessiyalari.'
          }
        ]
      },
      {
        id: 'olymp-2',
        title: 'English Challenge',
        host: 'UzEdu International',
        description: "Speaking va writing bo'yicha IELTS formatidagi xalqaro tanlov.",
        startAt: '2024-06-25T10:00:00+05:00',
        start: '25-iyun 2024',
        duration: '2 kun',
        format: 'Online',
        subject: 'Ingliz tili',
        fee: 90000,
        level: 'warning',
        status: 'upcoming',
        overview: 'Tanlov IELTS formatida real intervyu va yozma topshiriqlarni o‘z ichiga oladi.',
        flow: [
          {
            title: 'Onlayn tanishuv sessiyasi',
            description: 'Platforma bo‘yicha yo‘riqnoma va baholash mezonlari.'
          },
          {
            title: 'Speaking imtihoni',
            description: 'Native speakerlar bilan 3 ta modul bo‘yicha suhbat.'
          },
          {
            title: 'Writing laboratoriyasi',
            description: '2 ta esse va 1 ta report uchun 90 daqiqa vaqt beriladi.'
          }
        ],
        challengeSummary: 'Suhbat va yozma ishlar bir kunda o‘tkaziladi, ishtirokchilar tezkor fikrlashi kerak.',
        challenges: [
          'IELTS 7.0 darajasidagi savollar.',
          'Video-intervyuda vaqtni boshqarish.',
          'Yozma ish uchun akademik uslub va struktura.'
        ],
        questionCount: '3 modul',
        participantCount: '240 nafar',
        difficultyLevel: 'intermediate',
        difficultyNote: 'Baholash mezonlari IELTS standartlariga asoslangan.',
        prizeSummary: 'London til maktabida 2 haftalik yozgi lager va sertifikatlar.',
        prizes: [
          {
            place: '1-o‘rin',
            reward: 'London yozgi lageri',
            description: 'Bepul parvoz, turar joy va yakka IELTS konsultatsiyasi.'
          },
          {
            place: '2-o‘rin',
            reward: 'MacBook Air 13"',
            description: '2 oylik speaking klubi va professional mentorlik.'
          },
          {
            place: '3-o‘rin',
            reward: 'Premium IELTS kursi',
            description: '6 haftalik intensiv kurs va sertifikat.'
          }
        ]
      },
      {
        id: 'olymp-3',
        title: 'STEM Juniors',
        host: 'TechnoPark',
        description: "Matematika va fizika uyg'unligi asosida loyihalar taqdimoti.",
        startAt: '2024-07-05T09:30:00+05:00',
        start: '5-iyul 2024',
        duration: '3 kun',
        format: 'Offline (Samarqand)',
        subject: 'STEM',
        fee: 150000,
        level: 'info',
        status: 'upcoming',
        overview: 'Ishtirokchilar 3 kun davomida muammolar yechimi va prototip yaratish ustida ishlaydi.',
        flow: [
          {
            title: 'Hackathon kuni',
            description: 'Jamoalar muammo tanlaydi va yechim konsepsiyasini ishlab chiqadi.'
          },
          {
            title: 'Prototip va laboratoriya ishlari',
            description: 'Mentorlar bilan texnik tahlil va prototip tayyorlash.'
          },
          {
            title: 'Pitch finali',
            description: 'Hakamlarga loyiha taqdimoti va savol-javob.'
          }
        ],
        challengeSummary: 'Texnik bilim, jamoa bilan ishlash va dizayn fikrlashni uyg‘unlashtiradi.',
        challenges: [
          'Cheklangan vaqt ichida prototip yaratish.',
          'Texnik hujjatlashtirish va pitch tayyorlash.',
          'Jamoaviy qarorlar va rollarni muvofiqlashtirish.'
        ],
        questionCount: '4 ta muammo',
        participantCount: '32 ta jamoa',
        difficultyLevel: 'intermediate',
        difficultyNote: 'Har bir jamoa uchun mentorlar bilan kunlik chek-inlar mavjud.',
        prizeSummary: 'TechnoPark inkubatsiyasi va 50 mln so‘mlik grant fondi.',
        prizes: [
          {
            place: '1-o‘rin',
            reward: '50 mln so‘mlik grant',
            description: 'TechnoParkda 6 oylik inkubatsiya va laboratoriyalardan foydalanish.'
          },
          {
            place: '2-o‘rin',
            reward: '30 mln so‘mlik grant',
            description: 'Mentorlik dasturi va texnik jihozlar to‘plami.'
          },
          {
            place: '3-o‘rin',
            reward: '10 mln so‘mlik grant',
            description: 'STEM laboratoriyalariga 1 yillik a’zolik.'
          }
        ]
      },
      {
        id: 'olymp-4',
        title: 'Math Ninja Online',
        host: 'Global Math Club',
        description: "Yevropa darajasidagi kombinatorika masalalari bo'yicha online musobaqa.",
        startAt: '2024-07-18T11:00:00+05:00',
        start: '18-iyul 2024',
        duration: '4 soat',
        format: 'Online',
        subject: 'Matematika',
        fee: 60000,
        level: 'info',
        status: 'finished',
        overview: 'To‘rt soatlik intensiv sessiya davomida kombinatorika va ehtimollar nazariyasidan masalalar yechiladi.',
        flow: [
          {
            title: 'Onlayn platformaga kirish',
            description: '2 kun avval sinov kirish testlari va yo‘riqnoma.'
          },
          {
            title: 'Asosiy raund',
            description: '30 ta masala, vaqt chegarasi — 240 daqiqa.'
          },
          {
            title: 'Natijalarni e’lon qilish',
            description: 'Avtomatik baholash va top 20 ishtirokchi uchun sharh sessiyasi.'
          }
        ],
        challengeSummary: 'Masalalar murakkab kombinatorik konstruksiyalar va ehtimollik usullarini talab qiladi.',
        challenges: [
          'Bir nechta bosqichli kombinatorik konstruksiyalar.',
          'Vaqtni to‘g‘ri taqsimlash va tezkor yechim yozish.',
          'Natijalarni tekshirish uchun Python skriptlaridan foydalanish.'
        ],
        questionCount: '30 ta savol',
        participantCount: '520 nafar',
        difficultyLevel: 'advanced',
        difficultyNote: 'Top 20 ishtirokchi bilan qo‘shimcha tahlil sessiyasi o‘tkazildi.',
        prizeSummary: 'Pro matematiklar bilan mentorluk va xalqaro sertifikatlar.',
        prizes: [
          {
            place: '1-o‘rin',
            reward: '$1 000 grant',
            description: 'MIT talabalari bilan 3 oylik onlayn mentorlik va oltin sertifikat.'
          },
          {
            place: '2-o‘rin',
            reward: '$600 grant',
            description: 'Matematika bo‘yicha master-klasslar va kumush sertifikat.'
          },
          {
            place: '3-o‘rin',
            reward: '$300 grant',
            description: 'Bronza sertifikat va premium onlayn kurslarga obuna.'
          }
        ],
        results: [
          { name: 'Ziyodulla Xolmatov', score: 298 },
          { name: 'Dilshoda Karimova', score: 287 },
          { name: 'Bekmurod Akbarov', score: 279 },
          { name: 'Mahliyo Sodiqova', score: 266 },
          { name: 'Jahongir Rahimov', score: 254 }
        ]
      },
      {
        id: 'olymp-5',
        title: 'Public Speaking Marathon',
        host: 'British Council',
        description: "Ingliz tilida ochiq nutq so'zlash bo'yicha marafon.",
        startAt: '2024-08-02T09:00:00+05:00',
        start: '2-avgust 2024',
        duration: '1 kun',
        format: 'Offline (Toshkent)',
        subject: 'Ingliz tili',
        fee: 110000,
        level: 'success',
        status: 'upcoming',
        overview: 'Marafon davomida ishtirokchilar improvizatsiya, bahs va TED uslubidagi nutq tayyorlaydi.',
        flow: [
          {
            title: 'Storytelling sessiyasi',
            description: '2 daqiqalik improvizatsion hikoya va savol-javob.'
          },
          {
            title: 'Debat raundi',
            description: 'Juftliklar bilan bahs va hakamlar savollari.'
          },
          {
            title: 'Final nutq',
            description: 'TED uslubidagi 5 daqiqalik nutq va feedback.'
          }
        ],
        challengeSummary: 'Scenariysiz chiqishlar va auditoriya bilan ishlash bo‘yicha murakkab mashqlar.',
        challenges: [
          'Nutq vaqtida tana tili va ovoz balandligini boshqarish.',
          'Debat paytida tezkor argument tayyorlash.',
          'Feedback asosida nutqni optimallashtirish.'
        ],
        questionCount: '3 bosqich',
        participantCount: '150 nafar',
        difficultyLevel: 'intermediate',
        difficultyNote: 'Baholash kriteriyalari: mazmun, ifoda, ta’sir.',
        prizeSummary: 'British Council sertifikatlari va stipendiyalar.',
        prizes: [
          {
            place: '1-o‘rin',
            reward: 'Chevening tayyorgarlik granti',
            description: 'Professional spiker bilan 5 seans mentorlik va oltin sertifikat.'
          },
          {
            place: '2-o‘rin',
            reward: 'Professional studiya yozuvi',
            description: 'Podcast studiyasida nutq yozib olish va kumush sertifikat.'
          },
          {
            place: '3-o‘rin',
            reward: 'Speaking club a’zoligi',
            description: '12 oylik premium klub a’zoligi va bronza sertifikat.'
          }
        ]
      },
      {
        id: 'olymp-6',
        title: 'Future Innovators',
        host: 'Inha University',
        description: "STEM loyihalar bo'yicha pitching va mentorlik sessiyalari.",
        startAt: '2024-08-16T09:30:00+05:00',
        start: '16-avgust 2024',
        duration: '2 kun',
        format: 'Hybrid',
        subject: 'STEM',
        fee: 140000,
        level: 'warning',
        status: 'upcoming',
        overview: 'Innovatsion g‘oyalarni biznes model va texnik prototipga aylantirish bo‘yicha intensiv dastur.',
        flow: [
          {
            title: 'Problem framing laboratoriyasi',
            description: 'Muammoni aniqlash, mijoz xaritasini chizish va hipoteza yaratish.'
          },
          {
            title: 'Prototip va MVP',
            description: 'Mentorlar bilan texnik talablarni ishlab chiqish va MVP yig‘ish.'
          },
          {
            title: 'Pitch day',
            description: 'Investorlar oldida taqdimot va savol-javob.'
          }
        ],
        challengeSummary: 'Texnik yechim bilan birga biznes modeli va monetizatsiyani ham asoslash zarur.',
        challenges: [
          'Foydalanuvchi intervyularini o‘tkazish va xulosalarni himoya qilish.',
          'MVP uchun texnik ko‘rsatkichlarni belgilash.',
          'Pitch formatida qisqa va lo‘nda taqdimot tayyorlash.'
        ],
        questionCount: '3 sprint',
        participantCount: '24 ta jamoa',
        difficultyLevel: 'advanced',
        difficultyNote: 'Har bir jamoaga xalqaro mentorlar biriktiriladi.',
        prizeSummary: 'Inha University akseleratori va 75 mln so‘mlik sarmoya.',
        prizes: [
          {
            place: '1-o‘rin',
            reward: '75 mln so‘mlik investitsiya',
            description: 'Inha University akseleratorida 4 oylik dastur va ofis.'
          },
          {
            place: '2-o‘rin',
            reward: '40 mln so‘mlik investitsiya',
            description: 'Sanoat mutaxassislari bilan 6 ta konsultatsiya.'
          },
          {
            place: '3-o‘rin',
            reward: '20 mln so‘mlik grant',
            description: 'Cloud kreditlari va texnik jihozlar to‘plami.'
          }
        ]
      }
    ]
  },
  profile: {
    overview: {
      title: "Profil ma'lumotlari",
      subtitle: "Shaxsiy ma'lumotlaringiz va o'quv statistikasi.",
      editAction: 'Sozlamalarni tahrirlash',
      roleLabel: 'Talaba',
      cohortLabel: 'Cohort: {cohort}',
      statsTitle: "O'quv statistikasi",
      stats: {
        points: {
          label: 'Umumiy ball'
        },
        streak: {
          label: 'Oylik davomiylik',
          suffix: ' kun'
        },
        sessions: {
          label: 'Mentor seanslari',
          suffix: ' ta'
        },
        completed: {
          label: 'Yakunlangan kurslar'
        }
      },
      quickInfo: {
        title: "Tezkor ma'lumot",
        timezone: 'Time-zone',
        joined: "Qo'shilgan sana",
        lastLogin: 'Oxirgi kirish',
        lastLoginValue: 'Bugun 08:15',
        joinedValue: '2023-09-01'
      },
      security: {
        title: 'Xavfsizlik',
        twoFactor: 'Ikki faktorli himoya',
        twoFactorValue: 'Faol',
        devices: 'Qurilmalar',
        devicesValue: '3 ta',
        sessions: 'Sessionlar',
        sessionsValue: '1 ta faol'
      },
      fallback: {
        name: 'Mehmon foydalanuvchi',
        email: 'student@example.com',
        phone: '+998 -- --- -- --',
        cohort: 'Matematika intensiv'
      }
    },
    settings: {
      title: 'Sozlamalar',
      subtitle: "Ma'lumotlaringizni yangilang va xavfsizlik sozlamalarini boshqaring.",
      fields: {
        fullName: {
          label: "To'liq ism",
          placeholder: 'Ism Familiya'
        },
        email: {
          label: 'Email',
          placeholder: 'student@example.com'
        },
        phone: {
          label: 'Telefon',
          placeholder: '+998 90 000 00 00'
        },
        timezone: {
          label: 'Time-zone',
          placeholder: 'Asia/Tashkent'
        }
      },
      password: {
        title: 'Parolni yangilash',
        current: {
          label: 'Joriy parol',
          placeholder: '********'
        },
        next: {
          label: 'Yangi parol',
          placeholder: '********'
        }
      },
      saveHint: "O'zgarishlar xavfsiz saqlanishi uchun barcha maydonlarni to'ldiring.",
      saveAction: 'Saqlash',
      devicesTitle: 'Qurilmalar',
      revoke: 'Sessiyani yopish',
      deviceList: [
        {
          name: 'MacOS Safari',
          meta: 'Toshkent · Oxirgi kirish: 10 daqiqa avval'
        },
        {
          name: 'iPhone 14',
          meta: "Qo'shilgan: 2024-02-11"
        }
      ],
      securityNote:
        '2FA sozlamalarini hisobingizdan boshqarishingiz mumkin. Maxfiy kalitni hech kim bilan ulashmang.'
    }
  },
  notFound: {
    title: 'Sahifa topilmadi',
    description:
      "Kiritilgan manzil mavjud emas yoki sizda ushbu bo'limni ko'rish uchun ruxsat yo'q. Iltimos, bosh sahifaga qayting.",
    action: 'Bosh sahifa'
  },
  components: {
    appShell: {
      openMenu: 'Menyuni ochish',
      closeMenu: 'Menyuni yopish'
    },
    dataTable: {
      defaultTitle: 'Jadval'
    },
    statCard: {
      trendSuffix: 'so\'nggi oy'
    },
    courseCard: {
      mastery: "O'zlashtirish",
      growth: "Oylik o'sish",
      action: "Kursga o'tish",
      companionAlt: 'Guruhdosh'
    },
    olympiadCard: {
      action: 'Qatnashish',
      feeLabel: 'Ishtirok narxi'
    }
  },
  directions: {
    title: "Yo'nalishlar",
    subtitle: "O'quv yo'nalishlari va fanlari boshqaruvi",
    addNew: "Yo'nalish qo'shish",
    empty: "Hech qanday yo'nalish topilmadi",
    labels: {
      students: "o'quvchi",
      courses: 'kurs',
      status: 'Status'
    },
    stats: {
      total: "Jami yo'nalishlar",
      active: "Aktiv yo'nalishlar",
      students: "Jami o'quvchilar",
      courses: 'Jami kurslar'
    },
    filters: {
      searchPlaceholder: "Yo'nalish nomi...",
      allStatuses: 'Barchasi',
      sortBy: {
        label: 'Tartib',
        name: "Nom bo'yicha",
        displayOrder: 'Tartib raqami',
        createdAt: 'Yaratilgan sana'
      },
      clear: 'Tozalash'
    },
    status: {
      active: 'Aktiv',
      inactive: 'Noaktiv'
    },
    form: {
      title: {
        create: "Yangi yo'nalish",
        edit: "Yo'nalishni tahrirlash"
      },
      subtitle: "Yo'nalish haqidagi asosiy ma'lumotlarni kiriting",
      name: 'Nomi',
      description: 'Tavsif',
      color: 'Rang',
      icon: 'Ikonka',
      status: 'Status',
      displayOrder: 'Tartib raqami',
      save: 'Saqlash',
      cancel: 'Bekor qilish',
      required: 'Majburiy maydon',
      preview: 'Ko\'rinish',
      previewPlaceholder: "Yo'nalish nomi",
      previewDescription: "Qisqa tavsif bu yerda paydo bo'ladi"
    },
    colors: {
      blue: "Ko'k",
      purple: 'Binafsharang',
      orange: "To'q sariq",
      green: 'Yashil',
      red: 'Qizil',
      indigo: 'Indigo',
      pink: 'Pushti',
      yellow: 'Sariq'
    },
    icons: {
      book: 'Kitob',
      beaker: 'Laboratoriya',
      laptop: 'Kompyuter',
      globe: 'Globus',
      calculator: 'Kalkulyator',
      atom: 'Atom',
      dna: 'DNK',
      palette: 'Palitra',
      microscope: 'Mikroskop'
    },
    actions: {
      edit: 'Tahrirlash',
      view: "Ko'rish",
      delete: "O'chirish",
      activate: 'Aktivlashtirish',
      deactivate: 'Faolsizlantirish'
    },
    delete: {
      title: "Yo'nalishni o'chirish",
      message: "Rostdan ham ushbu yo'nalishni o'chirmoqchimisiz?",
      confirm: "O'chirish",
      cancel: 'Bekor qilish'
    },
    subjects: {
      title: 'Fanlar',
      add: 'Fan qo\'shish',
      empty: 'Fanlar mavjud emas',
      manage: 'Fanlarni boshqarish',
      description: "Yo'nalish fanlarini qo'shing yoki olib tashlang",
      placeholder: 'Fan nomi...',
      addButton: 'Qo\'shish',
      pending: 'Qo\'shilayotgan fanlar',
      current: 'Mavjud fanlar',
      remove: "O'chirish",
      save: 'Saqlash'
    },
    teachers: {
      title: "O'qituvchilar",
      assign: "O'qituvchi tayinlash",
      empty: "O'qituvchilar tayinlanmagan",
      manage: "O'qituvchilarni boshqarish",
      description: "Yo'nalishga mas'ul o'qituvchilarni tanlang",
      search: 'Qidiruv',
      searchPlaceholder: "Ism yoki email...",
      available: 'Mavjud o\'qituvchilar',
      assigned: 'Tayinlangan o\'qituvchilar',
      remove: "O'chirish",
      emptySearch: 'O\'qituvchi topilmadi'
    },
    messages: {
      createSuccess: "Yo'nalish muvaffaqiyatli yaratildi",
      updateSuccess: "Yo'nalish muvaffaqiyatli yangilandi",
      deleteSuccess: "Yo'nalish muvaffaqiyatli o'chirildi",
      error: 'Xatolik yuz berdi'
    }
  },
  courses: {
    title: 'Kurslar',
    addNew: 'Kurs qo\'shish',
    createFirst: 'Birinchi kursni yarating',
    empty: 'Hozircha kurslar mavjud emas',
    students: 'o\'quvchi',
    lessons: 'dars',
    view: 'Ko\'rish',
    description: 'Tavsif',

    stats: {
      modules: 'Modullar',
      lessons: 'Darslar',
      duration: 'Davomiyligi',
      students: 'O\'quvchilar'
    },

    actions: {
      edit: 'Tahrirlash',
      delete: 'O\'chirish'
    },

    pricingType: {
      label: 'Narx turi',
      subscription: 'Obuna ichida',
      individual: 'Alohida sotiladi'
    },

    form: {
      title: {
        create: 'Yangi kurs',
        edit: 'Kursni tahrirlash'
      },
      name: 'Kurs nomi',
      level: 'Daraja',
      description: 'Tavsif',
      price: 'Narxi (so\'m)',
      teacher: 'O\'qituvchi',
      teacherUnassigned: 'Tayinlanmagan',
      status: 'Status',
      save: 'Saqlash',
      cancel: 'Bekor qilish'
    },

    status: {
      active: 'Aktiv',
      inactive: 'Noaktiv',
      draft: 'Qoralama'
    },

    levels: {
      beginner: 'Boshlang\'ich',
      elementary: 'Elementar',
      intermediate: 'O\'rta',
      upperIntermediate: 'Yuqori o\'rta',
      advanced: 'Ilg\'or',
      proficiency: 'Mukammal'
    },

    delete: {
      title: 'Kursni o\'chirish',
      message: 'Rostdan ham ushbu kursni o\'chirmoqchimisiz?',
      warning: 'Diqqat!',
      warningMessage: 'Bu kurs bilan bog\'liq barcha ma\'lumotlar o\'chiriladi. Bu amalni qaytarib bo\'lmaydi.',
      confirm: 'O\'chirish',
      cancel: 'Bekor qilish'
    },

    modules: {
      title: 'Modullar',
      add: 'Modul qo\'shish',
      empty: 'Modullar mavjud emas',
      emptyDescription: 'Birinchi modulni yarating',
      createFirst: 'Birinchi modulni yarating',
      lessonsCount: 'dars',
      edit: 'Tahrirlash',
      view: 'Ko\'rish',
      delete: 'O\'chirish',
      moveUp: 'Yuqoriga',
      moveDown: 'Pastga',
      description: 'Tavsif',

      form: {
        title: {
          create: 'Yangi modul',
          edit: 'Modulni tahrirlash'
        },
        name: 'Modul nomi',
        namePlaceholder: 'Modul nomini kiriting',
        description: 'Tavsif',
        descriptionPlaceholder: 'Modul tavsifini kiriting',
        save: 'Saqlash',
        cancel: 'Bekor qilish'
      },

      delete: {
        title: 'Modulni o\'chirish',
        message: 'Rostdan ham ushbu modulni o\'chirmoqchimisiz?',
        warning: 'Diqqat!',
        warningMessage: 'Bu modul bilan bog\'liq barcha darslar o\'chiriladi. Bu amalni qaytarib bo\'lmaydi.',
        confirm: 'O\'chirish',
        cancel: 'Bekor qilish'
      },

      messages: {
        createSuccess: 'Modul muvaffaqiyatli yaratildi',
        updateSuccess: 'Modul muvaffaqiyatli yangilandi',
        deleteSuccess: 'Modul muvaffaqiyatli o\'chirildi',
        error: 'Xatolik yuz berdi'
      }
    },

    lessons: {
      title: 'Darslar',
      add: 'Dars qo\'shish',
      empty: 'Darslar mavjud emas',
      emptyDescription: 'Birinchi darsni yarating',
      createFirst: 'Birinchi darsni yarating',
      edit: 'Tahrirlash',
      view: 'Ko\'rish',
      delete: 'O\'chirish',
      moveUp: 'Yuqoriga',
      moveDown: 'Pastga',
      files: 'fayl',
      tests: 'test',
      description: 'Tavsif',
      filesTitle: 'Fayllar',
      noFiles: 'Fayllar mavjud emas',
      noVideo: 'Video mavjud emas',
      directVideo: 'To\'g\'ridan-to\'g\'ri video',
      videoNotSupported: 'Brauzeringiz bu video formatini qo\'llab-quvvatlamaydi',

      form: {
        title: {
          create: 'Yangi dars',
          edit: 'Darsni tahrirlash'
        },
        name: 'Dars nomi',
        namePlaceholder: 'Dars nomini kiriting',
        description: 'Tavsif',
        descriptionPlaceholder: 'Dars tavsifini kiriting',
        videoUrl: 'Video URL',
        videoUrlPlaceholder: 'https://youtube.com/watch?v=... yoki direct video URL',
        videoHint: 'YouTube link yoki to\'g\'ridan-to\'g\'ri video URL',
        videoPreview: 'Video oldindan ko\'rish',
        duration: 'Davomiyligi',
        durationUnit: 'daqiqa',
        files: 'Fayllar',
        addFile: 'Fayl qo\'shish',
        save: 'Saqlash',
        cancel: 'Bekor qilish'
      },

      delete: {
        title: 'Darsni o\'chirish',
        message: 'Rostdan ham ushbu darsni o\'chirmoqchimisiz?',
        warning: 'Diqqat!',
        warningMessage: 'Bu dars bilan bog\'liq barcha fayllar va testlar o\'chiriladi. Bu amalni qaytarib bo\'lmaydi.',
        confirm: 'O\'chirish',
        cancel: 'Bekor qilish'
      },

      messages: {
        createSuccess: 'Dars muvaffaqiyatli yaratildi',
        updateSuccess: 'Dars muvaffaqiyatli yangilandi',
        deleteSuccess: 'Dars muvaffaqiyatli o\'chirildi',
        fileDeleteSuccess: 'Fayl o\'chirildi',
        fileDeleteError: 'Faylni o\'chirishda xatolik',
        error: 'Xatolik yuz berdi'
      }
    },

    tests: {
      title: 'Testlar',
      add: 'Test qo\'shish',
      empty: 'Testlar mavjud emas'
    },

    messages: {
      createSuccess: 'Kurs muvaffaqiyatli yaratildi',
      updateSuccess: 'Kurs muvaffaqiyatli yangilandi',
      deleteSuccess: 'Kurs muvaffaqiyatli o\'chirildi',
      error: 'Xatolik yuz berdi'
    }
  },
  users: {
    title: 'Foydalanuvchilar',
    subtitle: 'Barcha foydalanuvchilarni boshqarish va monitoring',
    addNew: 'Foydalanuvchi qo\'shish',
    empty: 'Hech qanday foydalanuvchi topilmadi',

    stats: {
      total: 'Jami foydalanuvchilar',
      active: 'Aktiv',
      students: 'O\'quvchilar',
      teachers: 'O\'qituvchilar'
    },

    filters: {
      searchPlaceholder: 'Ism yoki email...',
      allRoles: 'Barcha rollar',
      allStatuses: 'Barcha statuslar',
      clear: 'Tozalash'
    },

    table: {
      user: 'FOYDALANUVCHI',
      role: 'ROL',
      status: 'STATUS',
      registered: 'RO\'YXATDAN O\'TGAN',
      lastActivity: 'OXIRGI FAOLIYAT',
      actions: 'AMALLAR',
      noData: 'Ma\'lumot topilmadi'
    },

    roles: {
      student: 'O\'quvchi',
      teacher: 'O\'qituvchi',
      admin: 'Admin'
    },

    status: {
      active: 'Aktiv',
      inactive: 'Noaktiv',
      blocked: 'Bloklangan'
    },

    form: {
      title: {
        create: 'Yangi foydalanuvchi',
        edit: 'Foydalanuvchini tahrirlash'
      },
      firstName: 'Ism',
      lastName: 'Familiya',
      email: 'Email',
      phone: 'Telefon',
      password: 'Parol',
      role: 'Rol',
      status: 'Status',
      save: 'Saqlash',
      cancel: 'Bekor qilish',
      required: 'Majburiy maydon'
    },

    delete: {
      title: 'Foydalanuvchini o\'chirish',
      message: 'Rostdan ham ushbu foydalanuvchini o\'chirmoqchimisiz?',
      confirm: 'O\'chirish',
      cancel: 'Bekor qilish'
    },

    block: {
      title: 'Foydalanuvchini bloklash',
      message: 'Bloklash sababini kiriting:',
      reasonPlaceholder: 'Sabab...',
      confirm: 'Bloklash',
      cancel: 'Bekor qilish'
    },

    messages: {
      createSuccess: 'Foydalanuvchi muvaffaqiyatli yaratildi',
      updateSuccess: 'Foydalanuvchi muvaffaqiyatli yangilandi',
      deleteSuccess: 'Foydalanuvchi muvaffaqiyatli o\'chirildi',
      blockSuccess: 'Foydalanuvchi bloklandi',
      error: 'Xatolik yuz berdi'
    },

    pagination: {
      showing: 'Ko\'rsatilmoqda',
      to: 'dan',
      of: 'jami',
      results: 'ta natija',
      previous: 'Oldingi',
      next: 'Keyingi',
      page: 'Sahifa'
    }
  }
};
