export default {
  app: {
    brand: {
      strapline: "Huquqiy targ'ibot",
      name: 'LMS Study Studio',
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
      olympiads: 'Olimpiadalar',
      profile: 'Profil',
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
      viewResults: 'Natijalar'
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
    items: [
      {
        id: 'olymp-1',
        title: 'Matematika - Respublika bosqichi',
        host: "Oliy va o'rta maxsus ta'lim vazirligi",
        description: "12-sinflar uchun murakkab analiz va kombinatorika bo'yicha tanlov.",
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
  }
};
