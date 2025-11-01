export default {
  app: {
    brand: {
      strapline: 'Правовое просвещение',
      name: 'LMS Study Studio',
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
      menuLabel: 'Меню',
      dashboard: 'Панель',
      courses: 'Курсы',
      coursesOverview: 'Обзор курсов',
      olympiads: 'Олимпиады',
      olympiadsAll: 'Все олимпиады',
      myOlympiads: 'Мои олимпиады',
      olympiadsMy: 'Мои олимпиады',
      finance: 'Финансовый раздел',
      financeTransactions: 'Транзакции',
      financeCoins: 'История монет',
      profile: 'Профиль',
      profileOverview: 'Обзор профиля',
      profileSettings: 'Настройки',
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
  teacher: {
    header: {
      greeting: 'Здравствуйте, наставник!',
      lastUpdated: 'Последняя синхронизация',
      subtitle: 'План уроков и мониторинг'
    },
    navigation: {
      dashboard: 'Панель преподавателя'
    },
    brand: {
      infoTitle: 'Центр наставника',
      infoDescription: 'Управляйте занятиями, отслеживайте прогресс учеников и планируйте уроки.'
    },
    dashboard: {
      title: 'Панель преподавателя',
      subtitle: 'Актуальные занятия и активные ученики',
      highlights: [
        {
          id: 'next-lesson',
          label: 'Следующий урок',
          value: '10:00 · Алгебра',
          accent: 'primary',
          description: '7 класс, аудитория 204'
        },
        {
          id: 'assignments',
          label: 'Непроверенные работы',
          value: '12',
          accent: 'amber',
          description: 'Сданы сегодня'
        },
        {
          id: 'attendance',
          label: 'Посещаемость',
          value: '96%',
          accent: 'emerald',
          description: 'Средний показатель недели'
        }
      ],
      schedule: {
        title: 'Расписание уроков',
        subtitle: 'Сегодняшние занятия и подготовка',
        rows: [
          {
            id: 'lesson-1',
            time: '09:00 – 09:45',
            subject: 'IELTS Speaking',
            group: 'Advanced Cohort',
            location: 'Studio A',
            status: 'Онлайн'
          },
          {
            id: 'lesson-2',
            time: '10:15 – 11:00',
            subject: 'Математика — Алгебра',
            group: '7 класс',
            location: 'Аудитория 204',
            status: 'Офлайн'
          },
          {
            id: 'lesson-3',
            time: '12:30 – 13:15',
            subject: 'STEM лаборатория',
            group: 'Maker Club',
            location: 'Лаборатория 3',
            status: 'Гибрид'
          }
        ]
      },
      actions: {
        title: 'Быстрые действия',
        items: [
          {
            id: 'plan',
            title: 'Открыть план урока',
            description: 'Проверьте темы и интерактивные задания на сегодня.'
          },
          {
            id: 'grade',
            title: 'Обновить журнал оценок',
            description: 'Внесите результаты последних работ.'
          },
          {
            id: 'mentor',
            title: 'Назначить менторскую сессию',
            description: 'Запланируйте 1:1 встречу для активных учеников.'
          }
        ]
      }
    }
  },
  control: {
    header: {
      greeting: 'Здравствуйте, админ!',
      lastUpdated: 'Время обновления',
      subtitle: 'Статистика системы'
    },
    navigation: {
      dashboard: 'Контрольная панель'
    },
    brand: {
      infoTitle: 'Аналитика системы',
      infoDescription: 'Контролируйте пользователей, контент и процессы в едином окне.'
    },
    dashboard: {
      title: 'Контрольная панель',
      subtitle: 'Ключевые показатели платформы',
      metrics: [
        {
          id: 'students',
          label: 'Активные ученики',
          value: '1 240',
          change: '+12 за неделю',
          tone: 'success'
        },
        {
          id: 'teachers',
          label: 'Наставники',
          value: '48',
          change: '+3 новых',
          tone: 'primary'
        },
        {
          id: 'courses',
          label: 'Активные курсы',
          value: '32',
          change: '1 новый модуль',
          tone: 'info'
        }
      ],
      updates: {
        title: 'Последние обновления',
        items: [
          {
            id: 'update-1',
            title: 'Новый курс утверждён',
            timestamp: 'Сегодня · 09:20',
            description: 'Курс подготовки к SAT готов к запуску.'
          },
          {
            id: 'update-2',
            title: 'Обновлена система наставничества',
            timestamp: 'Вчера · 18:40',
            description: 'Оптимизирован алгоритм оценивания и уведомления.'
          }
        ]
      },
      audit: {
        title: 'Журнал аудита',
        subtitle: 'Последние события системы',
        rows: [
          {
            id: 'audit-1',
            actor: 'Оператор 3',
            action: 'Изменил роль пользователя',
            time: '08:45',
            status: 'Успешно'
          },
          {
            id: 'audit-2',
            actor: 'Админ',
            action: 'Добавлен новый преподаватель',
            time: '08:10',
            status: 'Успешно'
          },
          {
            id: 'audit-3',
            actor: 'Мониторинг',
            action: 'Проверка платёжной системы',
            time: '07:55',
            status: 'В процессе'
          }
        ]
      }
    }
  },
  finance: {
    transactions: {
      title: 'Финансовые операции',
      subtitle: 'Отслеживайте поступления и расходы баланса.',
      tableSubtitle: 'История всех операций за последние 30 дней.',
      columns: [
        { key: 'date', label: 'Дата' },
        { key: 'type', label: 'Тип' },
        { key: 'description', label: 'Описание' },
        { key: 'amount', label: 'Сумма' },
        { key: 'balanceAfter', label: 'Баланс' },
        { key: 'method', label: 'Способ оплаты' }
      ],
      rows: [
        {
          id: 'txn-001',
          date: '02.06.2024',
          type: 'Поступление',
          description: 'STEM стипендия',
          amount: 150000,
          direction: 'in',
          balanceAfter: 275000,
          method: 'Банковская карта'
        },
        {
          id: 'txn-002',
          date: '05.06.2024',
          type: 'Списание',
          description: 'Модуль IELTS Writing',
          amount: 85000,
          direction: 'out',
          balanceAfter: 190000,
          method: 'Онлайн-оплата'
        },
        {
          id: 'txn-003',
          date: '09.06.2024',
          type: 'Поступление',
          description: 'Кэшбэк наставника',
          amount: 35000,
          direction: 'in',
          balanceAfter: 225000,
          method: 'Промокод'
        },
        {
          id: 'txn-004',
          date: '12.06.2024',
          type: 'Списание',
          description: 'Взнос за олимпиаду',
          amount: 60000,
          direction: 'out',
          balanceAfter: 165000,
          method: 'Кошелёк'
        }
      ]
    },
    coins: {
      title: 'Активность монет',
      subtitle: 'Следите за накоплением и использованием монет.',
      tableSubtitle: 'Подробности по геймификации и вознаграждениям.',
      columns: [
        { key: 'date', label: 'Дата' },
        { key: 'source', label: 'Источник' },
        { key: 'description', label: 'Описание' },
        { key: 'amount', label: 'Монеты' },
        { key: 'category', label: 'Категория' }
      ],
      rows: [
        {
          id: 'coin-001',
          date: '01.06.2024',
          source: 'Недельная серия',
          description: 'Награда за 7-дневный стрик',
          amount: 25,
          direction: 'in',
          category: 'Активность'
        },
        {
          id: 'coin-002',
          date: '04.06.2024',
          source: 'Тест по математике',
          description: 'Результат в топ-10%',
          amount: 40,
          direction: 'in',
          category: 'Академия'
        },
        {
          id: 'coin-003',
          date: '06.06.2024',
          source: 'Сессия с наставником',
          description: 'Оставлена обратная связь',
          amount: 15,
          direction: 'in',
          category: 'Сотрудничество'
        },
        {
          id: 'coin-004',
          date: '08.06.2024',
          source: 'Купон олимпиады',
          description: 'Скидка на участие',
          amount: 30,
          direction: 'out',
          category: 'Расход'
        },
        {
          id: 'coin-005',
          date: '11.06.2024',
          source: 'Домашнее задание',
          description: 'Все задачи выполнены вовремя',
          amount: 20,
          direction: 'in',
          category: 'Активность'
        }
      ]
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
  notifications: {
    success: {
      generic: {
        title: 'Успех',
        message: 'Действие успешно выполнено.'
      },
      login: {
        title: 'Добро пожаловать, {name}!',
        message: 'Вы успешно вошли в систему.'
      },
      logout: {
        title: 'Выход выполнен',
        message: 'Вы покинули аккаунт.'
      },
      localeChange: {
        title: 'Язык обновлён',
        message: 'Интерфейс переключён на {language}.'
      }
    },
    error: {
      generic: {
        title: 'Ошибка',
        message: 'При выполнении действия произошла ошибка.'
      },
      login: {
        title: 'Не удалось войти',
        message: 'Проверьте данные и попробуйте снова.'
      }
    }
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
  courseDetails: {
    backToCourses: 'Вернуться к курсам',
    notFoundTitle: 'Курс не найден',
    notFoundSubtitle: 'Выбранный курс недоступен. Пожалуйста, вернитесь к списку и выберите другой урок.',
    tabs: [
      { key: 'materials', label: 'Материалы' },
      { key: 'tests', label: 'Тесты' },
      { key: 'homework', label: 'Домашние задания' }
    ],
    player: {
      module: '2',
      duration: '42 минуты',
      poster: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80',
      sources: [
        {
          type: 'video/mp4',
          url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
        }
      ],
      nextLesson: {
        title: 'Тема 3: Применение интегралов',
        description: 'Разбираем задачи и геометрические интерпретации на практике.'
      },
      moduleLabel: 'Модуль {{ module }}',
      mentorLabel: 'Наставник: {{ mentor }}',
      nextLessonLabel: 'Следующая тема',
      continueAction: 'Продолжить урок',
      videoNotSupported: 'Ваш браузер не поддерживает данный формат видео.'
    },
    resources: {
      viewAction: 'Открыть',
      materials: [
        {
          title: 'Конспект — основы интегрального исчисления (PDF)',
          description: 'Ключевые формулы и таблицы из урока.',
          duration: '12 страниц',
          type: 'pdf'
        },
        {
          title: 'Презентация — работа с графиками',
          description: 'Слайды для визуального понимания геометрии интегралов.',
          duration: '18 слайдов',
          type: 'presentation'
        },
        {
          title: 'Дополнительное видео — практические примеры',
          description: 'Короткий разбор сложных задач.',
          duration: '16 минут',
          type: 'video'
        }
      ],
      tests: [
        {
          id: 'quick-review',
          title: 'Быстрый тест — повторение модуля',
          description: 'Короткий тест из 10 вопросов.',
          duration: '15 минут',
          type: 'test'
        },
        {
          id: 'midterm',
          title: 'Промежуточный контроль — интегралы',
          description: '20 вопросов для проверки прогресса.',
          duration: '30 минут',
          type: 'test'
        }
      ],
      homework: [
        {
          title: 'Домашнее задание №4',
          description: '8 практических задач по интегралам.',
          duration: 'Сдать до 14 мая',
          type: 'assignment'
        },
        {
          title: 'Проект для портфолио',
          description: 'Исследование по вычислению площадей с помощью интегралов.',
          duration: 'Сдать до 20 мая',
          type: 'assignment'
        }
      ]
    },
    testDetails: {
      'quick-review': {
        id: 'quick-review',
        title: 'Быстрый тест — повторение модуля',
        topic: 'Основы интегрального исчисления',
        durationMinutes: 15,
        totalQuestions: 5,
        attempts: 1,
        deadline: 'Доступен до конца дня',
        description:
          'Подборка вопросов для закрепления ключевых формул и геометрических интерпретаций интегралов.',
        questions: [
          {
            id: 'q1',
            number: 1,
            title: 'Определённый интеграл',
            prompt:
              '<p>Вычислите определённый интеграл: <span class="font-semibold">∫<sub>0</sub><sup>1</sup> 3x<sup>2</sup> dx</span>.</p>',
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
            title: 'Формула Ньютона — Лейбница',
            prompt:
              '<p>Пусть <span class="font-semibold">F(x) = x<sup>3</sup></span>, тогда <span class="font-semibold">F\'(x) = 3x<sup>2</sup></span>. Найдите <span class="font-semibold">∫<sub>1</sub><sup>2</sup> 3x<sup>2</sup> dx</span>.</p>',
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
            title: 'Экспоненциальный интеграл',
            prompt:
              '<p>Найдите первообразную функции <span class="font-semibold">e<sup>2x</sup></span>.</p>',
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
            title: 'Тригонометрический интеграл',
            prompt:
              '<p>Вычислите интеграл: <span class="font-semibold">∫ sin(x) dx</span>.</p>',
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
            title: 'Площадь под графиком',
            prompt:
              '<p>Найдите площадь под графиком функции: <span class="font-semibold">∫<sub>0</sub><sup>π</sup> sin(x) dx</span>.</p>',
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
        title: 'Промежуточный контроль — интегралы',
        topic: 'Расширенный курс интегрирования',
        durationMinutes: 30,
        totalQuestions: 8,
        attempts: 1,
        deadline: 'Сдать до пятницы, 18:00',
        description:
          'Контрольная работа охватывает различные техники интегрирования и прикладные задачи.',
        questions: [
          {
            id: 'm1',
            number: 1,
            title: 'Интегрирование по частям',
            prompt:
              '<p>Используя формулу интегрирования по частям, вычислите <span class="font-semibold">∫ x e<sup>x</sup> dx</span>.</p>',
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
            title: 'Тригонометрическая подстановка',
            prompt:
              '<p>Выполните замену <span class="font-semibold">x = sin(t)</span> и найдите <span class="font-semibold">∫ x / √(1 - x²) dx</span>.</p>',
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
            title: 'Дифференциальное уравнение',
            prompt:
              '<p>Решите уравнение <span class="font-semibold">dy/dx = y</span> при начальном условии <span class="font-semibold">y(0) = 2</span>.</p>',
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
            title: 'Логарифмический интеграл',
            prompt:
              '<p>Вычислите интеграл: <span class="font-semibold">∫ 1/x dx</span>.</p>',
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
            title: 'Площадь круга',
            prompt:
              '<p>Через интеграл выразите площадь круга: <span class="font-semibold">S = ∫<sub>-r</sub><sup>r</sup> 2√(r² - x²) dx</span>.</p>',
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
            title: 'Предел функции',
            prompt:
              '<p>Найдите предел: <span class="font-semibold">lim<sub>x→0</sub> sin(x) / x</span>.</p>',
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
            title: 'Геометрическая прогрессия',
            prompt:
              '<p>Вычислите сумму ряда: <span class="font-semibold">∑<sub>n=0</sub><sup>∞</sup> (½)<sup>n</sup></span>.</p>',
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
            title: 'Двойной интеграл',
            prompt:
              '<p>Найдите значение двойного интеграла: <span class="font-semibold">∬<sub>D</sub> (x + y) dA</span>, где <span class="font-semibold">D</span> — единичный квадрат <span class="font-semibold">[0,1] × [0,1]</span>.</p>',
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
      backToCourse: 'Вернуться к курсу',
      notFoundTitle: 'Тест не найден',
      notFoundDescription: 'Выбранный тест недоступен или был удалён из курса.',
      finishButton: 'Завершить тест',
      finishSuccessTitle: 'Тест завершен',
      finishSuccessDescription: 'Ваши ответы сохранены, результаты будут доступны в ближайшее время.',
      finishAutoDescription: 'Время истекло. Тест завершён автоматически.',
      timerLabel: 'Оставшееся время',
      answeredLabel: 'Отвечено на',
      unansweredLabel: 'Без ответа',
      questionNavigationTitle: 'Список вопросов',
      questionCounter: 'Вопрос {{current}} из {{total}}',
      previousQuestion: 'Предыдущий вопрос',
      nextQuestion: 'Следующий вопрос',
      stats: {
        overviewTitle: 'Информация о тесте',
        durationLabel: 'Общее время',
        questionsLabel: 'Количество вопросов',
        topicLabel: 'Тема',
        attemptsLabel: 'Попытки',
        deadlineLabel: 'Дедлайн'
      },
      results: {
        modalTitle: 'Результаты опубликованы',
        modalDescription: 'Вы правильно ответили на {{correct}} из {{total}} вопросов.',
        latestAttemptTitle: 'Последняя попытка',
        overallScore: 'Итоговый результат: {{score}}% · {{correct}} / {{total}}',
        downloadPdf: 'Скачать PDF',
        scoreLabel: 'Общий балл',
        correctLabel: 'Верные ответы',
        incorrectLabel: 'Ошибки',
        timeSpentLabel: 'Затраченное время',
        completedAttempts: 'Выполненные попытки',
        viewDetails: 'Просмотреть детали',
        viewHistory: 'История попыток',
        previousAttemptScore: 'Предыдущая попытка: {{score}}%',
        completedAttemptsMessage: 'Вы завершили {{count}} попыт(ок).',
        close: 'Закрыть',
        closeHistory: 'Закрыть историю',
        historyTitle: 'Архив попыток',
        historySubtitle: 'Тест «{{title}}»',
        noAttempts: 'Пока нет завершённых попыток.',
        attemptName: '{{index}}-я попытка',
        defaultTitle: 'Результат теста',
        attemptDate: 'Время',
        selectedAnswer: 'Выбранный ответ',
        correctAnswer: 'Правильный ответ',
        noAnswer: 'Без ответа',
        untitledQuestion: 'Вопрос',
        durationFormat: '{{minutes}} мин {{seconds}} с'
      },
      attemptDetails: {
        backToTest: 'Вернуться к тесту',
        title: 'Детали попытки',
        titleWithScore: '{{title}} — {{score}}%',
        subtitle: 'Дата: {{date}} · Время: {{duration}} · Вопросов: {{total}}',
        notFound: 'Попытка не найдена или была удалена.',
        summaryTitle: 'Сводка результата',
        summaryDescription: 'Итоговый результат — {{score}}%',
        tableTitle: 'Аналитика по вопросам',
        tableSubtitle: 'Ответы и обучающие видео по каждому вопросу',
        questionColumn: 'Вопрос',
        answerColumn: 'Ваш ответ',
        correctColumn: 'Верный ответ',
        videoColumn: 'Видеоразбор',
        noAnswer: 'Без ответа',
        noAnswerDescription: 'Ответ не был выбран.',
        watchSolution: 'Смотреть видео',
        noVideo: 'Видео отсутствует',
        closeVideo: 'Закрыть видео',
        solutionTitle: 'Разбор вопроса {{number}}'
      }
    },
    modules: {
      title: 'Модули и темы',
      subtitle: 'Ваш прогресс по разделам',
      status: {
        completed: 'Завершён',
        'in-progress': 'В процессе',
        locked: 'Заблокирован'
      }
    },
    results: {
      title: 'Мои результаты',
      subtitle: 'Персональная статистика',
      milestonesTitle: 'Ближайшие цели',
      summary: [
        {
          label: 'Общий прогресс',
          value: '78%',
          hint: 'По текущему модулю'
        },
        {
          label: 'Учебная серия',
          value: '5 дней',
          hint: 'Без пропусков'
        },
        {
          label: 'Средний тест',
          value: '86%',
          hint: 'Последние 3 теста'
        }
      ],
      milestones: [
        {
          title: 'Завершить тест модуля 2',
          description: 'Сдать промежуточный тест до 12 мая.'
        },
        {
          title: 'Домашнее задание №4',
          description: 'Загрузить решения 14 мая.'
        },
        {
          title: 'Поднять средний балл до 90%',
          description: 'Просмотрите дополнительные материалы и перепройдите тест.'
        }
      ]
    },
    modulesData: [
      {
        id: 'module-1',
        title: 'Модуль 1. Пределы и непрерывность',
        description: 'Базовые определения и ключевые формулы.',
        status: 'completed',
        lessons: [
          { title: 'Введение в пределы', duration: '25 минут', status: 'completed' },
          { title: 'Непрерывность функций', duration: '30 минут', status: 'completed' }
        ]
      },
      {
        id: 'module-2',
        title: 'Модуль 2. Введение в интегралы',
        description: 'Смысл интеграла и первые методы.',
        status: 'in-progress',
        lessons: [
          { title: 'Неопределённый интеграл', duration: '28 минут', status: 'in-progress' },
          { title: 'Базовые правила интегрирования', duration: '32 минуты', status: 'locked' },
          { title: 'Геометрическая интерпретация', duration: '24 минуты', status: 'locked' }
        ]
      },
      {
        id: 'module-3',
        title: 'Модуль 3. Практика и применение',
        description: 'Использование интегралов в задачах.',
        status: 'locked',
        lessons: [
          { title: 'Применение в физике', duration: '26 минут', status: 'locked' },
          { title: 'Экономические задачи', duration: '22 минуты', status: 'locked' }
        ]
      }
    ]
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
      action: 'Участвовать',
      viewResults: 'Смотреть результаты'
    },
    details: {
      back: 'Вернуться к списку олимпиад',
      overviewTitle: 'Об олимпиаде',
      flowTitle: 'Как проходит',
      challengesTitle: 'Сложности и ожидания',
      metricsTitle: 'Ключевые показатели',
      metrics: {
        questions: 'Количество заданий',
        participants: 'Число участников',
        difficulty: 'Уровень сложности',
        prizes: 'Главные призы'
      },
      prizesTitle: 'Распределение призов',
      resultsTitle: 'Результаты участников',
      resultsSubtitle: 'Финальные баллы отсортированы по убыванию.',
      resultsTable: {
        rank: 'Место',
        participant: 'ФИО',
        score: 'Баллы'
      },
      noResults: 'Результаты пока не опубликованы.',
      notFoundTitle: 'Олимпиада не найдена',
      notFoundSubtitle: 'Возможно, событие удалено или еще не создано. Выберите подходящую олимпиаду из списка.',
      statusTag: {
        upcoming: 'Открыта регистрация',
        finished: 'Олимпиада завершена'
      },
      difficultyLabels: {
        beginner: 'Базовый',
        intermediate: 'Средний',
        advanced: 'Продвинутый'
      }
    },
    my: {
      title: 'Мои олимпиады',
      subtitle: 'Управляйте зарегистрированными олимпиадами и их демо-тестами.',
      empty: 'Вы еще не зарегистрированы ни на одну олимпиаду.',
      browseAction: 'Смотреть олимпиады',
      viewDetails: 'Подробнее об олимпиаде',
      demoTitle: 'Готовьтесь с помощью демо-тестов',
      demoSubtitle: 'Стоимость каждого демо-теста составляет 10% от основного взноса ({price}).',
      tableSubtitle: 'Мини-тесты помогут набрать больше баллов.',
      tableColumns: {
        title: 'Мини-тест',
        duration: 'Время / вопросы',
        price: 'Стоимость'
      },
      buyAction: 'Купить',
      purchased: 'Приобретено',
      solveAction: 'Перейти к решению',
      detailsAction: 'Показать детали',
      hideDetails: 'Скрыть',
      confirmPurchase: "Подтвердите покупку мини-теста «{title}»?",
      countdown: {
        label: 'До старта',
        text: 'Осталось {time}',
        started: 'Уже началось',
        soon: 'Меньше минуты до старта',
        days: '{count} д.',
        hours: '{count} ч.',
        minutes: '{count} мин.'
      },
      solvePage: {
        title: '{title} — мини-тест',
        subtitle: 'Проверьте свои знания по предмету: {subject}.',
        back: 'Вернуться к моим олимпиадам',
        startInfo: 'Время начала',
        durationInfo: 'Продолжительность',
        questionInfo: 'Количество вопросов',
        startCta: 'Начать тест',
        unavailable: 'Мини-тест не найден или пока недоступен.'
      }
    },
    items: [
      {
        id: 'olymp-1',
        title: 'Математика — республиканский этап',
        host: 'Министерство высшего и среднего специального образования',
        description: 'Конкурс по сложному анализу и комбинаторике для 12-х классов.',
        startAt: '2024-06-12T09:00:00+05:00',
        start: '12 июня 2024',
        duration: '1 день',
        format: 'Оффлайн (Ташкент)',
        subject: 'Математика',
        fee: 120000,
        level: 'success',
        status: 'upcoming',
        overview:
          'Цель конкурса — отобрать сильнейших математиков страны и подготовить их к международному этапу.',
        flow: [
          {
            title: 'Регистрация и подтверждение',
            description: 'Подача заявки через учебные заведения и подтверждение оплаты.'
          },
          {
            title: 'Теоретический тур',
            description: 'Письменное решение 6 задач по анализу и комбинаторике.'
          },
          {
            title: 'Защита решений',
            description: 'Презентация решений перед жюри и сессия вопросов-ответов.'
          }
        ],
        challengeSummary: 'Каждый этап требует глубоких знаний, строгих доказательств и устойчивости к стрессу.',
        challenges: [
          'Теоретические доказательства в комплексном анализе.',
          'Обоснование решений в ограниченное время.',
          'Ответы на уточняющие вопросы жюри.'
        ],
        questionCount: '6 заданий',
        participantCount: '180 участников',
        difficultyLevel: 'advanced',
        difficultyNote: 'На финале обязательна устная защита решений.',
        prizeSummary: 'MacBook Air M2, золотая медаль и 12-месячная стипендия.',
        prizes: [
          {
            place: '1 место',
            reward: 'MacBook Air M2',
            description: 'Ноутбук, золотая медаль и грант на международный этап.'
          },
          {
            place: '2 место',
            reward: 'iPad Air и серебряная медаль',
            description: 'Подготовительный IELTS-курс со скидкой 50%.'
          },
          {
            place: '3 место',
            reward: 'Kindle и бронзовая медаль',
            description: 'Набор математических пособий и менторские сессии.'
          }
        ]
      },
      {
        id: 'olymp-2',
        title: 'English Challenge',
        host: 'UzEdu International',
        description: 'Международный конкурс в формате IELTS по speaking и writing.',
        startAt: '2024-06-25T10:00:00+05:00',
        start: '25 июня 2024',
        duration: '2 дня',
        format: 'Онлайн',
        subject: 'Английский',
        fee: 90000,
        level: 'warning',
        status: 'upcoming',
        overview: 'Формат максимально приближен к реальному IELTS, включает устные и письменные задания.',
        flow: [
          {
            title: 'Организационная сессия',
            description: 'Знакомство с платформой и критериями оценивания.'
          },
          {
            title: 'Speaking-тур',
            description: 'Три модуля интервью с носителями языка.'
          },
          {
            title: 'Writing-лаборатория',
            description: 'Два эссе и один отчет в течение 90 минут.'
          }
        ],
        challengeSummary: 'Все задания выполняются в один день, важно управлять временем и стрессом.',
        challenges: [
          'Задания уровня IELTS 7.0 и выше.',
          'Онлайн-интервью в режиме живого диалога.',
          'Академический стиль и структура письменных работ.'
        ],
        questionCount: '3 модуля',
        participantCount: '240 участников',
        difficultyLevel: 'intermediate',
        difficultyNote: 'Оценивание строго по шкале IELTS.',
        prizeSummary: 'Двухнедельный летний лагерь в Лондоне и именные сертификаты.',
        prizes: [
          {
            place: '1 место',
            reward: 'Летний лагерь в Лондоне',
            description: 'Перелет, проживание и индивидуальные консультации по IELTS.'
          },
          {
            place: '2 место',
            reward: 'MacBook Air 13"',
            description: 'Двухмесячный speaking-клуб и наставничество.'
          },
          {
            place: '3 место',
            reward: 'Премиум-курс IELTS',
            description: 'Шестинедельная интенсивная программа и сертификат.'
          }
        ]
      },
      {
        id: 'olymp-3',
        title: 'STEM Juniors',
        host: 'TechnoPark',
        description: 'Презентации проектов на стыке математики и физики.',
        startAt: '2024-07-05T09:30:00+05:00',
        start: '5 июля 2024',
        duration: '3 дня',
        format: 'Оффлайн (Самарканд)',
        subject: 'STEM',
        fee: 150000,
        level: 'info',
        status: 'upcoming',
        overview: 'Команды работают над решением задач и созданием прототипов в течение трех дней.',
        flow: [
          {
            title: 'Хакатон-день',
            description: 'Выбор проблемы и разработка концепции решения.'
          },
          {
            title: 'Прототипирование',
            description: 'Технический анализ с менторами и создание MVP.'
          },
          {
            title: 'Финальный питч',
            description: 'Презентация проекта перед жюри и ответы на вопросы.'
          }
        ],
        challengeSummary: 'Необходимо совместить инженерные навыки, дизайн-мышление и командную работу.',
        challenges: [
          'Создание прототипа в сжатые сроки.',
          'Подготовка технической документации и презентации.',
          'Эффективное распределение ролей в команде.'
        ],
        questionCount: '4 задачи',
        participantCount: '32 команды',
        difficultyLevel: 'intermediate',
        difficultyNote: 'Для каждой команды предусмотрены ежедневные сессии с наставником.',
        prizeSummary: 'Инкубация в TechnoPark и грантовый фонд 50 млн сум.',
        prizes: [
          {
            place: '1 место',
            reward: 'Грант 50 млн сум',
            description: 'Шестимесячная инкубация и доступ к лабораториям.'
          },
          {
            place: '2 место',
            reward: 'Грант 30 млн сум',
            description: 'Наставническая программа и набор оборудования.'
          },
          {
            place: '3 место',
            reward: 'Грант 10 млн сум',
            description: 'Годовой доступ в STEM-лаборатории.'
          }
        ]
      },
      {
        id: 'olymp-4',
        title: 'Math Ninja Online',
        host: 'Global Math Club',
        description: 'Онлайн-соревнование по европейскому уровню комбинаторики.',
        startAt: '2024-07-18T11:00:00+05:00',
        start: '18 июля 2024',
        duration: '4 часа',
        format: 'Онлайн',
        subject: 'Математика',
        fee: 60000,
        level: 'info',
        status: 'finished',
        overview: 'Интенсивная сессия из 30 задач по комбинаторике и теории вероятностей за 4 часа.',
        flow: [
          {
            title: 'Подготовительный доступ',
            description: 'За два дня до старта — тестовый вход и инструктаж.'
          },
          {
            title: 'Основной раунд',
            description: '30 заданий, лимит времени — 240 минут.'
          },
          {
            title: 'Публикация результатов',
            description: 'Автоматическая проверка и разбор для топ-20 участников.'
          }
        ],
        challengeSummary: 'Задачи требуют глубокой комбинаторной интуиции и грамотного распределения времени.',
        challenges: [
          'Многоступенчатые комбинаторные конструкции.',
          'Необходимо быстро писать аккуратные решения.',
          'Использование скриптов для проверки гипотез.'
        ],
        questionCount: '30 заданий',
        participantCount: '520 участников',
        difficultyLevel: 'advanced',
        difficultyNote: 'Для топ-20 проводилась дополнительная аналитическая сессия.',
        prizeSummary: 'Менторство от профессиональных математиков и международные сертификаты.',
        prizes: [
          {
            place: '1 место',
            reward: 'Грант $1 000',
            description: 'Трехмесячное онлайн-наставничество с магистрантами MIT и золотой сертификат.'
          },
          {
            place: '2 место',
            reward: 'Грант $600',
            description: 'Мастер-классы по математике и серебряный сертификат.'
          },
          {
            place: '3 место',
            reward: 'Грант $300',
            description: 'Подписка на премиальные онлайн-курсы и бронзовый сертификат.'
          }
        ],
        results: [
          { name: 'Зиёдулла Холматов', score: 298 },
          { name: 'Дилшода Каримова', score: 287 },
          { name: 'Бекмурод Акбаров', score: 279 },
          { name: 'Махлиё Содикова', score: 266 },
          { name: 'Жахонгир Рахимов', score: 254 }
        ]
      },
      {
        id: 'olymp-5',
        title: 'Public Speaking Marathon',
        host: 'British Council',
        description: 'Марафон по публичным выступлениям на английском языке.',
        startAt: '2024-08-02T09:00:00+05:00',
        start: '2 августа 2024',
        duration: '1 день',
        format: 'Оффлайн (Ташкент)',
        subject: 'Английский',
        fee: 110000,
        level: 'success',
        status: 'upcoming',
        overview: 'Участники готовят импровизационные истории, дебаты и финальное выступление в стиле TED.',
        flow: [
          {
            title: 'Сессия сторителлинга',
            description: 'Импровизация на заданную тему и вопросы жюри.'
          },
          {
            title: 'Дебатный раунд',
            description: 'Парные дебаты и перекрестные вопросы.'
          },
          {
            title: 'Финальная речь',
            description: 'Пятиминутное выступление и обратная связь экспертов.'
          }
        ],
        challengeSummary: 'Большой акцент на работу с аудиторией и уверенное выступление без сценария.',
        challenges: [
          'Контроль языка тела и голоса.',
          'Быстрое построение аргументов в дебатах.',
          'Использование обратной связи для улучшения речи.'
        ],
        questionCount: '3 этапа',
        participantCount: '150 участников',
        difficultyLevel: 'intermediate',
        difficultyNote: 'Критерии: содержание, подача и влияние на аудиторию.',
        prizeSummary: 'Стипендии British Council и международные сертификаты.',
        prizes: [
          {
            place: '1 место',
            reward: 'Подготовительный грант Chevening',
            description: 'Пять менторских сессий с профессиональным спикером и золотой сертификат.'
          },
          {
            place: '2 место',
            reward: 'Профессиональная студийная запись',
            description: 'Запись речи в подкаст-студии и серебряный сертификат.'
          },
          {
            place: '3 место',
            reward: 'Членство в speaking club',
            description: '12 месяцев премиум-членства и бронзовый сертификат.'
          }
        ]
      },
      {
        id: 'olymp-6',
        title: 'Future Innovators',
        host: 'Inha University',
        description: 'Питчинг и сессии наставничества по STEM-проектам.',
        startAt: '2024-08-16T09:30:00+05:00',
        start: '16 августа 2024',
        duration: '2 дня',
        format: 'Гибрид',
        subject: 'STEM',
        fee: 140000,
        level: 'warning',
        status: 'upcoming',
        overview: 'Интенсивный курс по превращению идеи в работающий прототип и бизнес-модель.',
        flow: [
          {
            title: 'Лаборатория проблематики',
            description: 'Определение боли клиента, customer journey и гипотез.'
          },
          {
            title: 'Прототип и MVP',
            description: 'Работа с менторами над техническими требованиями и сборка MVP.'
          },
          {
            title: 'Pitch day',
            description: 'Презентация перед инвесторами и Q&A.'
          }
        ],
        challengeSummary: 'Нужно защитить не только технологию, но и экономическую модель проекта.',
        challenges: [
          'Проведение пользовательских интервью и анализ инсайтов.',
          'Формирование технических метрик MVP.',
          'Подготовка емкого питча для инвесторов.'
        ],
        questionCount: '3 спринта',
        participantCount: '24 команды',
        difficultyLevel: 'advanced',
        difficultyNote: 'Каждой команде закрепляются международные наставники.',
        prizeSummary: 'Акселерация в Inha University и инвестиции 75 млн сум.',
        prizes: [
          {
            place: '1 место',
            reward: 'Инвестиции 75 млн сум',
            description: 'Четырехмесячная программа акселератора и коворкинг.'
          },
          {
            place: '2 место',
            reward: 'Инвестиции 40 млн сум',
            description: 'Шесть консультаций с отраслевыми экспертами.'
          },
          {
            place: '3 место',
            reward: 'Грант 20 млн сум',
            description: 'Облачные кредиты и комплект техники.'
          }
        ]
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
    appShell: {
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню'
    },
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
  },
  users: {
    title: 'Пользователи',
    subtitle: 'Управление и мониторинг всех пользователей',
    addNew: 'Добавить пользователя',
    empty: 'Пользователи не найдены',

    stats: {
      total: 'Всего пользователей',
      active: 'Активных',
      students: 'Учеников',
      teachers: 'Учителей'
    },

    filters: {
      searchPlaceholder: 'Имя или email...',
      allRoles: 'Все роли',
      allStatuses: 'Все статусы',
      clear: 'Очистить'
    },

    table: {
      user: 'ПОЛЬЗОВАТЕЛЬ',
      role: 'РОЛЬ',
      status: 'СТАТУС',
      registered: 'ЗАРЕГИСТРИРОВАН',
      lastActivity: 'ПОСЛЕДНЯЯ АКТИВНОСТЬ',
      actions: 'ДЕЙСТВИЯ',
      noData: 'Данные не найдены'
    },

    roles: {
      student: 'Ученик',
      teacher: 'Учитель',
      admin: 'Админ'
    },

    status: {
      active: 'Активный',
      inactive: 'Неактивный',
      blocked: 'Заблокирован'
    },

    form: {
      title: {
        create: 'Новый пользователь',
        edit: 'Редактировать пользователя'
      },
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Email',
      phone: 'Телефон',
      password: 'Пароль',
      role: 'Роль',
      status: 'Статус',
      save: 'Сохранить',
      cancel: 'Отмена',
      required: 'Обязательное поле'
    },

    delete: {
      title: 'Удалить пользователя',
      message: 'Вы действительно хотите удалить этого пользователя?',
      confirm: 'Удалить',
      cancel: 'Отмена'
    },

    block: {
      title: 'Заблокировать пользователя',
      message: 'Введите причину блокировки:',
      reasonPlaceholder: 'Причина...',
      confirm: 'Заблокировать',
      cancel: 'Отмена'
    },

    messages: {
      createSuccess: 'Пользователь успешно создан',
      updateSuccess: 'Пользователь успешно обновлен',
      deleteSuccess: 'Пользователь успешно удален',
      blockSuccess: 'Пользователь заблокирован',
      error: 'Произошла ошибка'
    },

    pagination: {
      showing: 'Показано',
      to: 'до',
      of: 'из',
      results: 'результатов',
      previous: 'Предыдущая',
      next: 'Следующая',
      page: 'Страница'
    }
  }
};
