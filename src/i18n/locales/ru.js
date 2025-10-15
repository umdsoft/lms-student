export default {
  app: {
    brand: {
      strapline: 'Правовое просвещение',
      name: 'Система оценивания',
      infoTitle: 'Математика и английский язык',
      infoDescription:
        'На этой панели вы быстро получаете информацию о курсах, динамике прогресса и предстоящих олимпиадах.'
    },
    header: {
      greeting: 'Здравствуйте!',
      lastUpdated: 'Последнее обновление',
      coinsLabel: 'Монеты',
      coinsValue: '{value} монет',
      balanceLabel: 'Баланс',
      balanceValue: '{value} сум',
      logout: 'Выйти',
      cohortFallback: 'Курс пока не выбран',
      guestName: 'Гость',
      noSync: 'еще не синхронизировано'
    },
    navigation: {
      dashboard: 'Панель',
      courses: 'Курсы',
      olympiads: 'Олимпиады',
      profile: 'Профиль',
      ariaLabel: 'Основная навигация'
    },
    language: {
      label: 'Язык',
      options: {
        uz: 'O‘zbekcha',
        ru: 'Русский'
      }
    }
  },
  authLayout: {
    strapline: 'Правовое просвещение',
    headline: 'Начните путь к знаниям уже сегодня',
    description:
      'Через нашу LMS вы достигнете новых результатов по математике и английскому. Занятия, тесты и статистика в реальном времени уже готовы.',
    footer: '© 2024 Министерство юстиции Республики Узбекистан. Все права защищены.'
  },
  login: {
    title: 'Вход в систему',
    subtitle: 'Введите свои данные, чтобы продолжить обучение.',
    loginLabel: 'Логин',
    loginPlaceholder: 'email или телефон',
    passwordLabel: 'Пароль',
    passwordPlaceholder: '********',
    remember: 'Запомнить меня',
    forgot: 'Забыли пароль?',
    submit: 'Войти',
    error: 'Произошла ошибка при входе. Попробуйте снова.'
  },
  dashboard: {
    title: 'Панель',
    subtitle: 'Обзор активности, изменений по курсам и предстоящих задач.',
    weeklyPlan: 'Недельный план',
    stats: [
      {
        label: 'Учебные часы',
        value: '42 часа',
        trendValue: 12,
        description: 'Накоплено за текущий месяц',
        icon: '⏱️'
      },
      {
        label: 'Новые достижения',
        value: '7 значков',
        trendValue: 4,
        description: 'Активность по модулю математики',
        icon: '🏅'
      },
      {
        label: 'Результаты тестов',
        value: '86%',
        trendValue: 8,
        description: 'Средний результат последних 10 тестов',
        icon: '🧠'
      },
      {
        label: 'Обратная связь наставника',
        value: '4.8/5',
        trendValue: 2,
        description: 'Оценка сессий наставничества',
        icon: '💬'
      }
    ],
    tasks: {
      title: 'Еженедельные задачи',
      items: [
        {
          id: 'task-1',
          title: 'Математика — тест по тригонометрии',
          description: 'Мини-тест из 9 вопросов, завершите до воскресенья',
          tone: 'info',
          label: 'В процессе'
        },
        {
          id: 'task-2',
          title: 'Английский — speaking club',
          description: 'В четверг в 19:00, ссылка Zoom отправлена на email',
          tone: 'success',
          label: 'Подтверждено'
        },
        {
          id: 'task-3',
          title: 'Подготовка к олимпиаде',
          description: '5 сложных задач по математике, обсудите с наставником',
          tone: 'warning',
          label: 'Важно'
        }
      ]
    },
    activity: {
      title: 'Журнал активности',
      subtitle: 'Отслеживайте важные изменения через audit log.',
      tableSubtitle: 'Последние события',
      actionLabel: 'Подробнее',
      columns: [
        { key: 'event', label: 'Событие' },
        { key: 'module', label: 'Модуль' },
        { key: 'status', label: 'Статус' },
        { key: 'action', label: 'Время' }
      ],
      rows: [
        {
          id: 'log-1',
          event: 'Тест завершён',
          module: 'Математика / Логарифмы',
          status: '86% результат',
          timestamp: 'Сегодня 14:20'
        },
        {
          id: 'log-2',
          event: 'Отзыв наставника',
          module: 'Английский / IELTS Speaking',
          status: 'Оценка 4.9/5',
          timestamp: 'Вчера 19:05'
        },
        {
          id: 'log-3',
          event: 'Файл загружен',
          module: 'Математика / Тригонометрия',
          status: 'Homework.pdf',
          timestamp: '3 дня назад'
        }
      ]
    },
    chart: {
      title: 'Рост за месяц',
      subtitle: 'Уровень освоения по предметам',
      subjectOptions: {
        math: 'Математика',
        english: 'Английский'
      },
      labels: ['1-я неделя', '2-я неделя', '3-я неделя', '4-я неделя'],
      datasets: {
        math: {
          label: 'Математика',
          data: [72, 78, 84, 91]
        },
        english: {
          label: 'Английский',
          data: [65, 70, 74, 82]
        }
      }
    }
  },
  courses: {
    title: 'Мои курсы',
    subtitle: 'Управляйте текущими, завершёнными и рекомендованными курсами.',
    tabs: [
      { key: 'active', label: 'Текущие курсы' },
      { key: 'completed', label: 'Завершённые курсы' },
      { key: 'recommended', label: 'Рекомендованные курсы' }
    ],
    statusMap: {
      active: 'Текущий',
      completed: 'Завершён',
      recommended: 'Рекомендация'
    },
    items: [
      {
        id: 'math-101',
        title: 'Математика — интегральное исчисление',
        mentor: 'Рустам ака',
        description: 'Интенсивный модуль по пониманию и применению интегралов.',
        progress: 78,
        monthlyGrowth: 12,
        statusLabel: 'Текущий',
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
        title: 'Английский — IELTS Writing',
        mentor: 'Мадина опа',
        description: 'Стратегии для высоких баллов по Writing Task 1 и Task 2.',
        progress: 64,
        monthlyGrowth: 9,
        statusLabel: 'Текущий',
        statusTone: 'info',
        statusKey: 'active',
        companions: [
          'https://api.dicebear.com/7.x/initials/svg?seed=DD&backgroundColor=e0f7f4',
          'https://api.dicebear.com/7.x/initials/svg?seed=EE&backgroundColor=b3ebe2'
        ]
      },
      {
        id: 'math-050',
        title: 'Математика — комбинаторика',
        mentor: 'Улугбек ака',
        description: 'Комбинаторика и вероятность для подготовки к олимпиадам.',
        progress: 100,
        monthlyGrowth: 18,
        statusLabel: 'Завершён',
        statusTone: 'success',
        statusKey: 'completed',
        companions: [
          'https://api.dicebear.com/7.x/initials/svg?seed=FF&backgroundColor=e0f7f4',
          'https://api.dicebear.com/7.x/initials/svg?seed=GG&backgroundColor=b3ebe2'
        ]
      },
      {
        id: 'eng-090',
        title: 'Английский — Grammar Boost',
        mentor: 'Нилуфар опа',
        description: '30-дневный челлендж для укрепления intermediate грамматики.',
        progress: 100,
        monthlyGrowth: 22,
        statusLabel: 'Завершён',
        statusTone: 'success',
        statusKey: 'completed',
        companions: [
          'https://api.dicebear.com/7.x/initials/svg?seed=HH&backgroundColor=e0f7f4'
        ]
      },
      {
        id: 'math-220',
        title: 'Математика — дифференциальные уравнения',
        mentor: 'Ботир ака',
        description: 'Курс по дифференциальным уравнениям для подготовки к вузу.',
        progress: 0,
        monthlyGrowth: 0,
        statusLabel: 'Рекомендация',
        statusTone: 'warning',
        statusKey: 'recommended',
        companions: [
          'https://api.dicebear.com/7.x/initials/svg?seed=II&backgroundColor=e0f7f4',
          'https://api.dicebear.com/7.x/initials/svg?seed=JJ&backgroundColor=b3ebe2'
        ]
      },
      {
        id: 'eng-330',
        title: 'Английский — Advanced Speaking Lab',
        mentor: 'Камола опа',
        description: 'Практика с носителями языка два раза в неделю.',
        progress: 0,
        monthlyGrowth: 0,
        statusLabel: 'Рекомендация',
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
      progressLabel: 'Освоение',
      growthLabel: 'Рост за месяц',
      viewAction: 'Перейти к курсу',
      companionAlt: 'Одногруппник'
    }
  },
  olympiads: {
    title: 'Олимпиады',
    subtitle: 'Выбирайте ближайшие олимпиады и конкурсы, изучайте условия участия и взносы.',
    levelLabels: {
      success: 'Республиканский',
      warning: 'Международный',
      info: 'Школьный'
    },
    card: {
      start: 'Начало',
      duration: 'Продолжительность',
      format: 'Формат',
      subject: 'Предмет',
      feeLabel: 'Взнос за участие',
      action: 'Участвовать'
    },
    items: [
      {
        id: 'olymp-1',
        title: 'Математика — республиканский этап',
        host: 'Министерство высшего и среднего специального образования',
        description: 'Конкурс по сложному анализу и комбинаторике для 12-х классов.',
        start: '12 июня 2024',
        duration: '1 день',
        format: 'Оффлайн (Ташкент)',
        subject: 'Математика',
        fee: 120000,
        level: 'success'
      },
      {
        id: 'olymp-2',
        title: 'English Challenge',
        host: 'UzEdu International',
        description: 'Международный конкурс в формате IELTS по speaking и writing.',
        start: '25 июня 2024',
        duration: '2 дня',
        format: 'Онлайн',
        subject: 'Английский',
        fee: 90000,
        level: 'warning'
      },
      {
        id: 'olymp-3',
        title: 'STEM Juniors',
        host: 'TechnoPark',
        description: 'Презентации проектов на стыке математики и физики.',
        start: '5 июля 2024',
        duration: '3 дня',
        format: 'Оффлайн (Самарканд)',
        subject: 'STEM',
        fee: 150000,
        level: 'info'
      },
      {
        id: 'olymp-4',
        title: 'Math Ninja Online',
        host: 'Global Math Club',
        description: 'Онлайн-соревнование по европейскому уровню комбинаторики.',
        start: '18 июля 2024',
        duration: '4 часа',
        format: 'Онлайн',
        subject: 'Математика',
        fee: 60000,
        level: 'info'
      },
      {
        id: 'olymp-5',
        title: 'Public Speaking Marathon',
        host: 'British Council',
        description: 'Марафон по публичным выступлениям на английском языке.',
        start: '2 августа 2024',
        duration: '1 день',
        format: 'Оффлайн (Ташкент)',
        subject: 'Английский',
        fee: 110000,
        level: 'success'
      },
      {
        id: 'olymp-6',
        title: 'Future Innovators',
        host: 'Inha University',
        description: 'Питчинг и сессии наставничества по STEM-проектам.',
        start: '16 августа 2024',
        duration: '2 дня',
        format: 'Гибрид',
        subject: 'STEM',
        fee: 140000,
        level: 'warning'
      }
    ]
  },
  profile: {
    overview: {
      title: 'Профиль',
      subtitle: 'Личные данные и учебная статистика.',
      editAction: 'Редактировать настройки',
      roleLabel: 'Студент',
      cohortLabel: 'Когорта: {cohort}',
      statsTitle: 'Учебная статистика',
      stats: {
        points: {
          label: 'Всего баллов'
        },
        streak: {
          label: 'Учебный стаж месяца',
          suffix: ' дней'
        },
        sessions: {
          label: 'Сессии с наставником',
          suffix: ' шт.'
        },
        completed: {
          label: 'Завершённые курсы'
        }
      },
      quickInfo: {
        title: 'Быстрая информация',
        timezone: 'Часовой пояс',
        joined: 'Дата подключения',
        lastLogin: 'Последний вход',
        lastLoginValue: 'Сегодня 08:15',
        joinedValue: '01.09.2023'
      },
      security: {
        title: 'Безопасность',
        twoFactor: 'Двухфакторная защита',
        twoFactorValue: 'Активна',
        devices: 'Устройства',
        devicesValue: '3 шт.',
        sessions: 'Сессии',
        sessionsValue: '1 активна'
      },
      fallback: {
        name: 'Гость',
        email: 'student@example.com',
        phone: '+998 -- --- -- --',
        cohort: 'Интенсив по математике'
      }
    },
    settings: {
      title: 'Настройки',
      subtitle: 'Обновляйте данные и управляйте безопасностью.',
      fields: {
        fullName: {
          label: 'Полное имя',
          placeholder: 'Имя Фамилия'
        },
        email: {
          label: 'Email',
          placeholder: 'student@example.com'
        },
        phone: {
          label: 'Телефон',
          placeholder: '+7 (___) ___-__-__'
        },
        timezone: {
          label: 'Часовой пояс',
          placeholder: 'Asia/Tashkent'
        }
      },
      password: {
        title: 'Смена пароля',
        current: {
          label: 'Текущий пароль',
          placeholder: '********'
        },
        next: {
          label: 'Новый пароль',
          placeholder: '********'
        }
      },
      saveHint: 'Заполните все поля, чтобы сохранить изменения безопасно.',
      saveAction: 'Сохранить',
      devicesTitle: 'Устройства',
      revoke: 'Завершить сессию',
      deviceList: [
        {
          name: 'MacOS Safari',
          meta: 'Ташкент · Последний вход: 10 минут назад'
        },
        {
          name: 'iPhone 14',
          meta: 'Добавлено: 11.02.2024'
        }
      ],
      securityNote:
        'Настройки 2FA доступны в вашем аккаунте. Не делитесь секретным ключом с третьими лицами.'
    }
  },
  notFound: {
    title: 'Страница не найдена',
    description:
      'Адрес не существует или у вас нет доступа к этому разделу. Пожалуйста, вернитесь на главную страницу.',
    action: 'На главную'
  },
  components: {
    dataTable: {
      defaultTitle: 'Таблица'
    },
    statCard: {
      trendSuffix: 'за последний месяц'
    },
    courseCard: {
      mastery: 'Освоение',
      growth: 'Рост за месяц',
      action: 'Перейти к курсу',
      companionAlt: 'Одногруппник'
    },
    olympiadCard: {
      action: 'Участвовать',
      feeLabel: 'Взнос за участие'
    }
  }
};
