# EDULIFE - Frontend (LMS Platform)

<div align="center">

![EDULIFE Logo](https://via.placeholder.com/200x80?text=EDULIFE)

**Interactive Online Education Platform for Uzbekistan**

[![Vue 3](https://img.shields.io/badge/Vue-3.4.21-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Pinia](https://img.shields.io/badge/Pinia-2.1.7-FFD859?logo=pinia)](https://pinia.vuejs.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

[Live Demo](#) · [Report Bug](https://github.com/umdsoft/lms-student/issues) · [Request Feature](https://github.com/umdsoft/lms-student/issues)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Project Structure](#-project-structure)
- [Development Guide](#-development-guide)
- [Architecture](#-architecture)
- [Component Library](#-component-library)
- [Internationalization](#-internationalization)
- [Authentication](#-authentication)
- [API Integration](#-api-integration)
- [State Management](#-state-management)
- [Routing](#-routing)
- [Styling Guide](#-styling-guide)
- [Testing](#-testing)
- [Build & Deployment](#-build--deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📋 Project Overview

**EDULIFE** is a comprehensive Learning Management System (LMS) designed for students, teachers, and educational institutions in Uzbekistan. The platform provides:

- 📚 Interactive course catalog (Mathematics, English, Programming, Science)
- 🎥 Video lessons with progress tracking
- 📝 Interactive tests and olympiads with instant feedback
- 📊 Student analytics dashboard
- 🏆 Competition and certification system
- 💳 Integrated payment gateway (Payme, Click, Uzum)
- 🌐 Multi-language support (Uzbek, Russian, Karakalpak)
- 👥 Role-based access (Student, Teacher, Admin)

**Current Status**: Version 0.1.0 (Development)
**Target Market**: Uzbekistan Education Sector
**Languages**: Uzbek (uz), Russian (ru), Karakalpak (kr - planned)

---

## 🛠 Tech Stack

### Core Framework
- **[Vue 3.4.21](https://vuejs.org/)** - Progressive JavaScript framework (Composition API)
- **[Vite 5.x](https://vitejs.dev/)** - Next-generation frontend tooling
- **[Pinia 2.1.7](https://pinia.vuejs.org/)** - Intuitive state management for Vue

### UI & Styling
- **[Tailwind CSS 3.4.3](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Heroicons](https://heroicons.com/)** - Beautiful hand-crafted SVG icons
- **[Lucide Icons](https://lucide.dev/)** - Additional icon library
- **[Notivue](https://notivue.smastrom.io/)** - Toast notification system

### Data & Visualization
- **[Chart.js 4.4.3](https://www.chartjs.org/)** - Simple yet flexible charting
- **[vue-chartjs 5.3.1](https://vue-chartjs.org/)** - Vue wrapper for Chart.js

### HTTP & Utilities
- **[Axios 1.6.8](https://axios-http.com/)** - Promise-based HTTP client
- **[Vue I18n 9.13.1](https://vue-i18n.intlify.dev/)** - Internationalization plugin
- **[DOMPurify 3.0.8](https://github.com/cure53/DOMPurify)** - XSS sanitizer
- **[jsPDF 2.5.1](https://github.com/parallax/jsPDF)** - PDF generation

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Jest](https://jestjs.io/)** - JavaScript testing framework
- **[@testing-library/vue](https://testing-library.com/docs/vue-testing-library/intro/)** - Vue component testing

---

## ✨ Features

### 🎓 For Students
- ✅ Course catalog with advanced filtering
- ✅ Video lessons with progress tracking
- ✅ Interactive quizzes with instant feedback
- ✅ Olympiad participation system
- ✅ Performance analytics dashboard
- ✅ Certificate download (PDF)
- ✅ Transaction history
- ✅ Coin/rewards system
- ✅ Profile management

### 👨‍🏫 For Teachers
- ⚠️ Basic dashboard (minimal implementation)
- 🚧 Course creation (planned)
- 🚧 Student management (planned)
- 🚧 Analytics (planned)

### 🔐 For Administrators
- ✅ Comprehensive admin dashboard
- ✅ User management (CRUD)
- ✅ Olympiad management
- ✅ Payment tracking & refunds
- ✅ Learning direction management
- ✅ Subscription plan configuration
- ✅ Advanced analytics with charts
- ✅ KPI monitoring

### 🔒 Security Features
- ✅ Cookie-based authentication
- ✅ CSRF protection
- ✅ Role-based access control (RBAC)
- ✅ XSS prevention (DOMPurify)
- ✅ Automatic token refresh
- ✅ Secure session management

### 🌐 Internationalization
- ✅ Uzbek (uz) - Default language
- ✅ Russian (ru)
- 🚧 Karakalpak (kr) - Planned

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 16.x (recommended: 18.x LTS)
- **npm** >= 8.x or **yarn** >= 1.22.x
- **Git** (for version control)
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

**Verify installations:**
```bash
node --version  # Should output v16.x or higher
npm --version   # Should output 8.x or higher
git --version   # Should output 2.x or higher
```

---

## 🚀 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/umdsoft/lms-student.git
cd lms-student
```

### 2. Install Dependencies

```bash
npm install
```

**Note:** If you encounter any errors, try:
```bash
npm install --legacy-peer-deps
```

### 3. Environment Configuration

**Current Status:** This project runs in **development mode with mock APIs**. No `.env` file is required.

For production deployment, create a `.env` file:

```bash
# API Configuration
VITE_API_BASE_URL=https://api.edulife.uz/api
VITE_API_TIMEOUT=10000

# Socket.io (for real-time features)
VITE_SOCKET_URL=https://api.edulife.uz
VITE_SOCKET_PATH=/socket.io

# Payment Gateways
VITE_PAYME_MERCHANT_ID=your_payme_merchant_id
VITE_CLICK_MERCHANT_ID=your_click_merchant_id
VITE_UZUM_MERCHANT_ID=your_uzum_merchant_id

# Feature Flags
VITE_ENABLE_MOCK_API=false
VITE_ENABLE_ANALYTICS=true

# Analytics (Optional)
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### 4. Development Server

```bash
npm run dev
```

The application will start at: **http://localhost:5173**

### 5. Test User Accounts

In development mode, use these credentials:

| Role | Username | Password | Dashboard |
|------|----------|----------|-----------|
| **Student** | `student` or `student@example.com` | any | `/student` |
| **Teacher** | `teacher` or `teacher@example.com` | any | `/teacher` |
| **Admin** | `admin` or `admin@example.com` | any | `/admin` |

**Example:**
1. Navigate to http://localhost:5173
2. Enter `student` as username
3. Enter any password
4. Click "Login"
5. You'll be redirected to the student dashboard

---

## 📁 Project Structure

```
lms-student/
├── src/
│   ├── api/                      # API Layer
│   │   ├── mock/                 # Mock API services
│   │   │   ├── dashboard.js      # Dashboard mock data
│   │   │   ├── olympiads.js      # Olympiad CRUD
│   │   │   ├── users.js          # User management
│   │   │   ├── payments.js       # Payment data
│   │   │   ├── directions.js     # Learning directions
│   │   │   └── subscriptionPlans.js
│   │   ├── api.js                # Axios instance + interceptors
│   │   └── api.csrf.js           # CSRF wrapper
│   │
│   ├── modules/                  # Feature Modules (Modular Architecture)
│   │   ├── admin/                # Admin Panel Module
│   │   │   ├── components/       # Admin-specific components
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── KPICard.vue
│   │   │   │   └── shared/
│   │   │   │       └── StatsCard.vue
│   │   │   ├── pages/            # Admin pages (8 pages)
│   │   │   │   ├── ImprovedDashboardPage.vue
│   │   │   │   ├── OlympiadsListPage.vue
│   │   │   │   ├── UsersListPage.vue
│   │   │   │   ├── PaymentsListPage.vue
│   │   │   │   ├── DirectionsListPage.vue
│   │   │   │   ├── SubscriptionPlansPage.vue
│   │   │   │   └── AnalyticsPage.vue
│   │   │   ├── stores/           # Admin Pinia stores
│   │   │   │   ├── dashboard.js
│   │   │   │   └── olympiads.js
│   │   │   └── routes.js         # Admin routes
│   │   │
│   │   ├── student/              # Student Module
│   │   │   ├── components/       # Student-specific components
│   │   │   │   ├── charts/
│   │   │   │   │   └── MonthlyProgressChart.vue
│   │   │   │   ├── courses/
│   │   │   │   │   └── CourseCard.vue
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── StatCard.vue
│   │   │   │   └── olympiads/
│   │   │   │       ├── OlympiadCard.vue
│   │   │   │       └── OlympiadRegistrationModal.vue
│   │   │   ├── pages/            # Student pages (13 pages)
│   │   │   │   ├── DashboardPage.vue
│   │   │   │   ├── CoursesPage.vue
│   │   │   │   ├── CourseDetailsPage.vue
│   │   │   │   ├── CourseTestSolvePage.vue
│   │   │   │   ├── CourseTestAttemptDetailsPage.vue
│   │   │   │   ├── OlympiadsPage.vue
│   │   │   │   ├── MyOlympiadsPage.vue
│   │   │   │   ├── OlympiadDetailsPage.vue
│   │   │   │   ├── MiniTestSolvePage.vue
│   │   │   │   ├── ProfileOverviewPage.vue
│   │   │   │   ├── ProfileSettingsPage.vue
│   │   │   │   ├── TransactionsPage.vue
│   │   │   │   └── CoinHistoryPage.vue
│   │   │   ├── stores/           # Student stores
│   │   │   │   └── olympiads.js
│   │   │   └── routes.js         # Student routes
│   │   │
│   │   └── teacher/              # Teacher Module (Minimal)
│   │       ├── pages/
│   │       │   └── TeacherDashboardPage.vue
│   │       └── routes.js
│   │
│   ├── shared/                   # Shared Resources
│   │   ├── components/           # Reusable UI Components
│   │   │   ├── ui/               # Base UI components (17)
│   │   │   │   ├── Alert.vue
│   │   │   │   ├── Badge.vue
│   │   │   │   ├── Button.vue
│   │   │   │   ├── Card.vue
│   │   │   │   ├── Checkbox.vue
│   │   │   │   ├── DataTable.vue
│   │   │   │   ├── EmptyState.vue
│   │   │   │   ├── Input.vue
│   │   │   │   ├── Loader.vue
│   │   │   │   ├── Modal.vue
│   │   │   │   ├── Pagination.vue
│   │   │   │   ├── ProgressBadge.vue
│   │   │   │   ├── Radio.vue
│   │   │   │   ├── SafeHtml.vue
│   │   │   │   ├── Select.vue
│   │   │   │   ├── Skeleton.vue
│   │   │   │   └── Textarea.vue
│   │   │   ├── charts/           # Chart components (5)
│   │   │   │   ├── AreaChart.vue
│   │   │   │   ├── BarChart.vue
│   │   │   │   ├── DonutChart.vue
│   │   │   │   ├── LineChart.vue
│   │   │   │   └── PieChart.vue
│   │   │   ├── layout/           # Layout components
│   │   │   │   ├── AppShell.vue
│   │   │   │   └── AppShellNavList.vue
│   │   │   └── common/
│   │   │       └── BrandLogo.vue
│   │   ├── pages/                # Shared pages
│   │   │   ├── LoginPage.vue
│   │   │   └── NotFoundPage.vue
│   │   ├── composables/          # Vue Composables (13)
│   │   │   ├── useApi.js         # API wrapper
│   │   │   ├── useAuth.js        # Authentication
│   │   │   ├── useFilters.js     # Table filtering
│   │   │   ├── usePagination.js  # Pagination logic
│   │   │   ├── useSanitize.js    # XSS prevention
│   │   │   └── ...
│   │   ├── stores/               # Global Pinia Stores
│   │   │   ├── auth.js           # Authentication state
│   │   │   └── i18n.js           # i18n state
│   │   └── utils/                # Utility functions
│   │       ├── fileValidation.js
│   │       └── date.js
│   │
│   ├── layouts/                  # Layout Components (5)
│   │   ├── AppLayout.vue         # Generic layout
│   │   ├── StudentLayout.vue     # Student interface
│   │   ├── AdminLayout.vue       # Admin panel
│   │   ├── TeacherLayout.vue     # Teacher interface
│   │   └── AuthLayout.vue        # Login/404 layout
│   │
│   ├── router/                   # Vue Router Configuration
│   │   └── index.js              # Routes + guards
│   │
│   ├── i18n/                     # Internationalization
│   │   ├── index.js              # Vue I18n setup
│   │   └── locales/
│   │       ├── uz.js             # Uzbek translations (1,678 LOC)
│   │       └── ru.js             # Russian translations (1,643 LOC)
│   │
│   ├── assets/                   # Static Assets
│   │   └── (images, fonts, icons)
│   │
│   ├── App.vue                   # Root component
│   ├── main.js                   # Application entry point
│   └── main.css                  # Global styles (Tailwind)
│
├── tests/                        # Unit Tests
│   ├── unit/
│   │   └── AppLayout.spec.js
│   └── setupTests.js
│
├── docs/                         # Documentation
│   ├── ADMIN_PANEL_README.md
│   ├── FRONTEND_AUDIT.md
│   └── project_goals.md
│
├── index.html                    # Entry HTML
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS config
├── jest.config.cjs               # Jest configuration
├── .eslintrc.cjs                 # ESLint rules
├── .prettierrc                   # Prettier config
├── postcss.config.js             # PostCSS config
├── babel.config.cjs              # Babel config
├── package.json                  # Dependencies
├── README.md                     # This file
└── ADMIN_PANEL_README.md         # Admin panel documentation
```

**Total Source Files**: 100+ Vue and JavaScript files
**Total Lines of Code**: ~17,700 LOC

---

## 💻 Development Guide

### Available Scripts

```bash
# Development server (hot reload)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint

# Fix linting errors automatically
npm run lint:fix

# Run tests
npm test

# Run tests in watch mode
npm test:watch

# Generate test coverage
npm run test:coverage
```

### Code Quality

**Linting:**
```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

**Formatting:**
```bash
npx prettier --write "src/**/*.{vue,js,css}"
```

### Hot Module Replacement (HMR)

Vite provides instant HMR. Changes to `.vue` and `.js` files are reflected immediately without full page reload.

### Browser DevTools

**Vue DevTools**: Install [Vue DevTools](https://devtools.vuejs.org/) for debugging:
- Component tree inspection
- Pinia state inspection
- Router navigation history
- Performance profiling

---

## 🏗 Architecture

### Modular Architecture

This project uses a **feature-based modular architecture**:

```
modules/
  ├── admin/      # Admin panel (self-contained)
  ├── student/    # Student features
  └── teacher/    # Teacher features (minimal)
```

**Benefits:**
- ✅ Clear separation of concerns
- ✅ Easy to maintain and scale
- ✅ Code reusability via shared components
- ✅ Independent development of modules

### Composition API

All components use **Vue 3 Composition API** (`<script setup>`):

```vue
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/shared/stores/auth';

const authStore = useAuthStore();
const count = ref(0);
const doubleCount = computed(() => count.value * 2);

onMounted(() => {
  console.log('Component mounted');
});
</script>
```

**Advantages:**
- Better TypeScript support
- More flexible code organization
- Better code reuse with composables
- Smaller bundle size

### Composables Pattern

Reusable logic extracted into composables:

```javascript
// useApi.js
export function useApi() {
  return {
    get: (url) => api.get(url),
    post: (url, data) => csrfPost(url, data),
  };
}

// In component
const { get, post } = useApi();
const data = await get('/olympiads');
```

### State Management with Pinia

**5 Pinia stores:**

1. **auth** (`shared/stores/auth.js`)
   - User session
   - Login/logout
   - Authentication state

2. **i18n** (`shared/stores/i18n.js`)
   - Current locale
   - Locale switching

3. **adminDashboard** (`modules/admin/stores/dashboard.js`)
   - Admin KPIs
   - Dashboard charts

4. **adminOlympiads** (`modules/admin/stores/olympiads.js`)
   - Olympiad CRUD
   - Registrations

5. **studentOlympiads** (`modules/student/stores/olympiads.js`)
   - Student olympiad view
   - Registration

**Store structure:**
```javascript
export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);
  const status = ref('idle');

  // Getters
  const isAuthenticated = computed(() => !!user.value);

  // Actions
  async function login(payload) {
    // Implementation
  }

  return { user, status, isAuthenticated, login };
});
```

---

## 🎨 Component Library

### Base UI Components

Located in `src/shared/components/ui/`

#### Button Component

```vue
<Button variant="primary" size="md" @click="handleClick">
  Click Me
</Button>
```

**Props:**
- `variant`: `primary | secondary | danger | success | ghost`
- `size`: `sm | md | lg`
- `disabled`: `boolean`
- `loading`: `boolean`

#### Input Component

```vue
<Input
  v-model="email"
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  :error="errors.email"
  required
/>
```

**Props:**
- `modelValue`: `string`
- `type`: `text | email | password | number | tel`
- `label`: `string`
- `placeholder`: `string`
- `error`: `string`
- `required`: `boolean`
- `disabled`: `boolean`

#### Modal Component

```vue
<Modal
  v-model:open="isOpen"
  title="Confirm Action"
  size="md"
>
  <p>Are you sure?</p>
  <template #footer>
    <Button @click="isOpen = false">Cancel</Button>
    <Button variant="danger" @click="confirm">Confirm</Button>
  </template>
</Modal>
```

#### Card Component

```vue
<Card padding="md" hoverable>
  <template #header>
    <h3>Card Title</h3>
  </template>

  <p>Card content goes here.</p>

  <template #footer>
    <Button>Action</Button>
  </template>
</Card>
```

#### DataTable Component

```vue
<DataTable
  :columns="columns"
  :data="users"
  :loading="loading"
  @row-click="handleRowClick"
/>
```

### Chart Components

Located in `src/shared/components/charts/`

#### Line Chart

```vue
<LineChart
  :data="chartData"
  :options="chartOptions"
  height="300px"
/>
```

#### Bar Chart

```vue
<BarChart
  :data="salesData"
  :options="{ responsive: true }"
/>
```

**Available Charts:**
- `LineChart.vue`
- `BarChart.vue`
- `PieChart.vue`
- `DonutChart.vue`
- `AreaChart.vue`

---

## 🌐 Internationalization

### Supported Languages

- **Uzbek (uz)** - Default language (Latin script: O'zbekcha)
- **Russian (ru)** - Русский
- **Karakalpak (kr)** - Planned

### Translation Files

**Location:** `src/i18n/locales/`

- `uz.js` - 1,678 lines of Uzbek translations
- `ru.js` - 1,643 lines of Russian translations

### Structure

```javascript
// uz.js
export default {
  app: {
    brand: {
      name: 'EDULIFE',
      tagline: 'Ta\'lim bilan kelajakka!'
    },
    navigation: {
      dashboard: 'Bosh sahifa',
      courses: 'Kurslar',
      olympiads: 'Olimpiadalar'
    }
  },
  student: {
    dashboard: {
      title: 'Talaba paneli',
      welcomeMessage: 'Xush kelibsiz, {name}!'
    }
  }
}
```

### Usage in Components

```vue
<script setup>
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
</script>

<template>
  <h1>{{ t('app.brand.name') }}</h1>
  <p>{{ t('student.dashboard.welcomeMessage', { name: 'Dilnoza' }) }}</p>

  <!-- Current locale -->
  <p>Current language: {{ locale }}</p>
</template>
```

### Changing Language

```vue
<script setup>
import { useI18nStore } from '@/shared/stores/i18n';

const i18nStore = useI18nStore();

function changeLanguage(newLocale) {
  i18nStore.setLocale(newLocale); // 'uz' or 'ru'
}
</script>

<template>
  <select @change="changeLanguage($event.target.value)">
    <option value="uz">O'zbekcha</option>
    <option value="ru">Русский</option>
  </select>
</template>
```

**Persistence:** Language preference is saved to `localStorage` and persists across sessions.

### Adding New Translations

1. Add key to `src/i18n/locales/uz.js`:
```javascript
export default {
  myFeature: {
    title: 'Yangi funksiya',
    description: 'Bu yangi funksiya tavsifi'
  }
}
```

2. Add same key to `src/i18n/locales/ru.js`:
```javascript
export default {
  myFeature: {
    title: 'Новая функция',
    description: 'Описание новой функции'
  }
}
```

3. Use in component:
```vue
<h1>{{ t('myFeature.title') }}</h1>
```

---

## 🔐 Authentication

### Session Management

**Method:** Cookie-based authentication with JWT
**Storage:** HttpOnly cookies (secure)
**CSRF Protection:** Automatic CSRF token handling

### User Roles

The system supports **3 user roles**:

| Role | Access Level | Dashboard |
|------|--------------|-----------|
| **student** | Student features | `/student` |
| **teacher** | Teacher features | `/teacher` |
| **admin** | Full system access | `/admin` |

### Login Flow

1. User enters credentials on `/login`
2. POST request to `/api/login` with username/password
3. Backend validates and returns user data + sets cookies
4. Frontend stores user in Pinia `authStore`
5. Router redirects to role-based dashboard
6. Session persists in localStorage for auto-login

### Development Mode (Mock API)

**Test Credentials:**

```javascript
// Student
username: 'student' or 'student@example.com'
password: any

// Teacher
username: 'teacher' or 'teacher@example.com'
password: any

// Admin
username: 'admin' or 'admin@example.com'
password: any
```

**Mock Users:**

```javascript
// Student
{
  id: 1,
  username: 'student',
  email: 'student@example.com',
  fullName: 'Dilnoza Rahimova',
  role: 'student',
  avatar: '/avatars/student.png'
}

// Teacher
{
  id: 2,
  username: 'teacher',
  email: 'teacher@example.com',
  fullName: 'Aziza Karimova',
  role: 'teacher',
  avatar: '/avatars/teacher.png'
}

// Admin
{
  id: 3,
  username: 'admin',
  email: 'admin@example.com',
  fullName: 'Sardor Rahmonov',
  role: 'admin',
  avatar: '/avatars/admin.png'
}
```

### Using Authentication in Components

```vue
<script setup>
import { useAuthStore } from '@/shared/stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);

async function logout() {
  await authStore.logout();
}
</script>

<template>
  <div v-if="isAuthenticated">
    <p>Welcome, {{ user.fullName }}!</p>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <router-link to="/login">Login</router-link>
  </div>
</template>
```

### Route Protection

**File:** `src/router/index.js`

**Route Meta:**
```javascript
{
  path: '/student/courses',
  component: CoursesPage,
  meta: {
    requiresAuth: true,        // Requires login
    roles: ['student'],        // Only students
    layout: 'student',         // Use student layout
    title: 'Courses'
  }
}
```

**Navigation Guard:**
```javascript
router.beforeEach(async (to, from, next) => {
  // 1. Ensure session
  await authStore.ensureSession();

  // 2. Check authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } });
  }

  // 3. Check roles
  if (to.meta.roles && !to.meta.roles.includes(authStore.user.role)) {
    return next('/'); // Redirect to default route
  }

  next();
});
```

### Token Refresh

Automatic token refresh on 401 errors:

```javascript
// api.js response interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Attempt token refresh
      await refreshAccessToken();
      // Retry original request
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);
```

---

## 📡 API Integration

### Axios Configuration

**File:** `src/api/api.js`

**Base Configuration:**
```javascript
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,          // Send cookies
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRF-Token',
  timeout: 10000                  // 10 seconds
});
```

### CSRF Protection

**File:** `src/api/api.csrf.js`

**Usage:**
```javascript
import { post, put, patch, del } from '@/api/api.csrf';

// Automatically handles CSRF tokens
await post('/olympiads', olympiadData);
await put('/olympiads/123', updateData);
await del('/olympiads/123');
```

**How it works:**
1. Fetches CSRF token from `/api/csrf`
2. Includes token in mutation requests
3. Prevents CSRF attacks

### Mock API (Development Mode)

**Location:** `src/api/mock/`

**Available Mock APIs:**
- `dashboard.js` - Dashboard KPIs and charts
- `olympiads.js` - Olympiad CRUD operations
- `registrations.js` - Olympiad registrations
- `users.js` - User management
- `payments.js` - Payment tracking
- `directions.js` - Learning directions
- `subscriptionPlans.js` - Subscription plans

**Example Mock API:**
```javascript
// olympiadsApi.js
export const olympiadsApi = {
  async getAll(filters = {}) {
    // Simulate API delay
    await delay(500);

    // Filter and paginate
    let filtered = olympiads.filter(o => {
      if (filters.status && o.status !== filters.status) return false;
      if (filters.search && !o.title.includes(filters.search)) return false;
      return true;
    });

    return {
      olympiads: filtered,
      summary: { total: filtered.length },
      pagination: { page: 1, perPage: 10 }
    };
  },

  async getById(id) {
    return olympiads.find(o => o.id === id);
  },

  async create(data) {
    const newOlympiad = { id: Date.now(), ...data };
    olympiads.push(newOlympiad);
    return newOlympiad;
  }
};
```

### Using API in Components

**Via Composable:**
```vue
<script setup>
import { useApi } from '@/shared/composables/useApi';
import { ref, onMounted } from 'vue';

const { get, post } = useApi();
const olympiads = ref([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await get('/olympiads');
    olympiads.value = response.data;
  } catch (error) {
    console.error('Failed to fetch olympiads:', error);
  } finally {
    loading.value = false;
  }
});

async function createOlympiad(data) {
  await post('/olympiads', data);
}
</script>
```

**Via Pinia Store:**
```vue
<script setup>
import { useAdminOlympiadsStore } from '@/modules/admin/stores/olympiads';
import { onMounted } from 'vue';

const olympiadsStore = useAdminOlympiadsStore();

onMounted(() => {
  olympiadsStore.fetchOlympiads();
});
</script>

<template>
  <div v-if="olympiadsStore.loading">Loading...</div>
  <div v-else>
    <div v-for="olympiad in olympiadsStore.olympiads" :key="olympiad.id">
      {{ olympiad.title }}
    </div>
  </div>
</template>
```

### Migrating to Real API

When ready to connect to a real backend:

1. **Remove mock adapter:**
```javascript
// api.js
// Comment out or remove:
// import MockAdapter from 'axios-mock-adapter';
// const mock = new MockAdapter(api, { delayResponse: 500 });
```

2. **Update baseURL in .env:**
```env
VITE_API_BASE_URL=https://api.edulife.uz/api
```

3. **Update Vite config:**
```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://api.edulife.uz',
        changeOrigin: true
      }
    }
  }
}
```

4. **Replace mock API imports in stores:**
```javascript
// Before
import { olympiadsApi } from '@/api/mock/olympiads';

// After
// Use direct API calls via useApi() composable
```

---

## 🗂 State Management

### Pinia Stores

**5 active stores:**

#### 1. Auth Store

**File:** `src/shared/stores/auth.js`

```javascript
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const status = ref('idle'); // idle | loading | ready | error

  const isAuthenticated = computed(() => !!user.value);

  async function login(payload) {
    const response = await api.post('/login', payload);
    user.value = response.data;
    return response.data;
  }

  async function logout() {
    await api.post('/logout');
    user.value = null;
  }

  return { user, status, isAuthenticated, login, logout };
});
```

**Usage:**
```javascript
const authStore = useAuthStore();
await authStore.login({ username: 'student', password: 'pass' });
console.log(authStore.user.fullName); // 'Dilnoza Rahimova'
console.log(authStore.isAuthenticated); // true
```

#### 2. i18n Store

**File:** `src/shared/stores/i18n.js`

```javascript
export const useI18nStore = defineStore('i18n', () => {
  const locale = ref('uz');

  const locales = computed(() => [
    { code: 'uz', label: 'O\'zbekcha' },
    { code: 'ru', label: 'Русский' }
  ]);

  function setLocale(newLocale) {
    locale.value = newLocale;
    localStorage.setItem('lms-student.locale', newLocale);
  }

  return { locale, locales, setLocale };
});
```

#### 3. Admin Dashboard Store

**File:** `src/modules/admin/stores/dashboard.js`

```javascript
export const useAdminDashboardStore = defineStore('adminDashboard', () => {
  const loading = ref(false);
  const data = ref(null);
  const error = ref(null);

  async function fetchDashboard() {
    loading.value = true;
    try {
      data.value = await dashboardApi.getAdminDashboard();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  return { loading, data, error, fetchDashboard };
});
```

#### 4. Admin Olympiads Store

**File:** `src/modules/admin/stores/olympiads.js`

```javascript
export const useAdminOlympiadsStore = defineStore('adminOlympiads', () => {
  const olympiads = ref([]);
  const loading = ref(false);
  const filters = ref({});
  const pagination = ref({});

  async function fetchOlympiads(filterParams = {}) {
    loading.value = true;
    filters.value = filterParams;
    const result = await olympiadsApi.getAll(filterParams);
    olympiads.value = result.olympiads;
    pagination.value = result.pagination;
    loading.value = false;
  }

  async function createOlympiad(data) {
    const newOlympiad = await olympiadsApi.create(data);
    olympiads.value.unshift(newOlympiad);
    return newOlympiad;
  }

  return { olympiads, loading, filters, fetchOlympiads, createOlympiad };
});
```

#### 5. Student Olympiads Store

**File:** `src/modules/student/stores/olympiads.js`

```javascript
export const useStudentOlympiadsStore = defineStore('studentOlympiads', () => {
  const olympiads = ref([]);
  const myOlympiads = ref([]);
  const loading = ref(false);

  async function fetchOlympiads() {
    loading.value = true;
    olympiads.value = await olympiadsApi.getAllPublished();
    loading.value = false;
  }

  async function registerForOlympiad(data) {
    await olympiadsApi.register(data);
    await fetchMyOlympiads();
  }

  return { olympiads, myOlympiads, loading, fetchOlympiads, registerForOlympiad };
});
```

### Store Persistence

**Auth Store:** Persists user session to `localStorage` for auto-login
**i18n Store:** Persists locale preference to `localStorage`

**Implementation:**
```javascript
// On login
localStorage.setItem('lms-student.user', JSON.stringify(user.value));

// On app init
const storedUser = localStorage.getItem('lms-student.user');
if (storedUser) {
  user.value = JSON.parse(storedUser);
}
```

---

## 🚦 Routing

### Route Configuration

**File:** `src/router/index.js`

### Public Routes

```javascript
{
  path: '/login',
  name: 'login',
  component: () => import('@/shared/pages/LoginPage.vue'),
  meta: {
    layout: 'auth',
    publicOnly: true  // Redirect if already authenticated
  }
}
```

### Protected Routes

**Student Routes:**
```javascript
{
  path: '/student',
  redirect: '/student/dashboard',
  meta: { requiresAuth: true, roles: ['student'] }
},
{
  path: '/student/dashboard',
  component: () => import('@/modules/student/pages/DashboardPage.vue'),
  meta: {
    requiresAuth: true,
    roles: ['student'],
    layout: 'student',
    title: 'Dashboard'
  }
},
{
  path: '/student/courses/:id',
  component: () => import('@/modules/student/pages/CourseDetailsPage.vue'),
  meta: {
    requiresAuth: true,
    roles: ['student'],
    layout: 'student'
  }
}
```

**Admin Routes:**
```javascript
{
  path: '/admin',
  redirect: '/admin/dashboard'
},
{
  path: '/admin/dashboard',
  component: () => import('@/modules/admin/pages/ImprovedDashboardPage.vue'),
  meta: {
    requiresAuth: true,
    roles: ['admin'],
    layout: 'control',
    title: 'Admin Dashboard'
  }
},
{
  path: '/admin/users',
  component: () => import('@/modules/admin/pages/UsersListPage.vue'),
  meta: {
    requiresAuth: true,
    roles: ['admin'],
    layout: 'control'
  }
}
```

### Route Guards

**Global Navigation Guard:**
```javascript
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // 1. Ensure session is loaded
  await authStore.ensureSession();

  // 2. Redirect authenticated users from public-only pages
  if (to.meta.publicOnly && authStore.isAuthenticated) {
    const defaultRoute = getDefaultRouteForRole(authStore.user.role);
    return next(defaultRoute);
  }

  // 3. Require authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
  }

  // 4. Check role-based access
  if (to.meta.roles && !to.meta.roles.includes(authStore.user.role)) {
    const defaultRoute = getDefaultRouteForRole(authStore.user.role);
    return next(defaultRoute);
  }

  next();
});
```

**Default Routes by Role:**
```javascript
function getDefaultRouteForRole(role) {
  const routes = {
    student: '/student',
    teacher: '/teacher',
    admin: '/admin'
  };
  return routes[role] || '/login';
}
```

### Programmatic Navigation

```vue
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToCourse(id) {
  router.push(`/student/courses/${id}`);
}

function goBack() {
  router.back();
}
</script>
```

### Route Meta

**Available meta fields:**
- `requiresAuth` - Requires user to be logged in
- `publicOnly` - Only accessible to guests (not logged in)
- `roles` - Array of allowed roles
- `layout` - Layout to use (`student`, `admin`, `teacher`, `auth`)
- `title` - Page title

---

## 🎨 Styling Guide

### Tailwind CSS

**Custom Theme:**

**Colors:**
```javascript
// Primary (Teal)
bg-primary-500      // #00A392
text-primary-600
border-primary-300

// Secondary (Navy)
bg-secondary        // #21516A

// Accent (Amber)
bg-accent          // #FFB74D

// Surface
bg-surface         // #F5F7FA

// Semantic Colors
bg-success         // #2ECC71 (Green)
bg-warning         // #F6C343 (Yellow)
bg-danger          // #F87171 (Red)
```

**Usage:**
```vue
<template>
  <div class="bg-primary-500 text-white p-4 rounded-lg">
    Primary background
  </div>

  <button class="bg-success hover:bg-green-600 text-white px-4 py-2 rounded">
    Success Button
  </button>
</template>
```

### Responsive Design

**Tailwind Breakpoints:**
```javascript
sm:   640px   // Mobile landscape, small tablets
md:   768px   // Tablets
lg:   1024px  // Desktop
xl:   1280px  // Large desktop
2xl:  1536px  // Extra large
```

**Example:**
```vue
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 1 column on mobile, 2 on tablet, 3 on desktop -->
</div>

<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">
  <!-- Responsive font size -->
</h1>
```

### Component Styling

**Scoped Styles:**
```vue
<template>
  <div class="card">
    <h2>Title</h2>
  </div>
</template>

<style scoped>
/* Only applies to this component */
.card {
  @apply bg-white rounded-lg shadow-md p-6;
}

.card h2 {
  @apply text-xl font-semibold text-slate-900;
}
</style>
```

### Dark Mode (Planned)

Tailwind dark mode classes are ready but not implemented:

```vue
<div class="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
  <!-- Will work when dark mode is enabled -->
</div>
```

---

## 🧪 Testing

### Test Framework

- **Jest** - JavaScript testing framework
- **@testing-library/vue** - Vue component testing utilities

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Example Test

**File:** `tests/unit/AppLayout.spec.js`

```javascript
import { mount } from '@testing-library/vue';
import { createPinia } from 'pinia';
import AppLayout from '@/layouts/AppLayout.vue';

describe('AppLayout', () => {
  it('renders correctly', () => {
    const wrapper = mount(AppLayout, {
      global: {
        plugins: [createPinia()],
        stubs: ['router-link', 'router-view']
      }
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('shows user name when authenticated', async () => {
    const wrapper = mount(AppLayout, {
      global: {
        plugins: [createPinia()],
        stubs: ['router-link', 'router-view']
      }
    });

    // Set user in store
    const authStore = useAuthStore();
    authStore.user = { fullName: 'Dilnoza Rahimova' };

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Dilnoza Rahimova');
  });
});
```

### Writing Component Tests

```javascript
import { render, fireEvent } from '@testing-library/vue';
import Button from '@/shared/components/ui/Button.vue';

describe('Button', () => {
  it('emits click event', async () => {
    const { getByRole, emitted } = render(Button, {
      props: { variant: 'primary' },
      slots: { default: 'Click Me' }
    });

    const button = getByRole('button');
    await fireEvent.click(button);

    expect(emitted().click).toHaveLength(1);
  });

  it('disables button when disabled prop is true', () => {
    const { getByRole } = render(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled' }
    });

    const button = getByRole('button');
    expect(button).toBeDisabled();
  });
});
```

### Test Coverage

**Current Coverage:** Limited (1 test file)
**Target:** > 70% coverage

---

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

**Output:** `dist/` directory

**Build Optimizations:**
- ✅ Code splitting by route
- ✅ Minification (Terser)
- ✅ Tree-shaking
- ✅ CSS extraction
- ✅ Asset hashing

### Preview Build

```bash
npm run preview
```

Preview the production build locally at http://localhost:4173

### Deployment Options

#### 1. Static Hosting (Vercel, Netlify, GitHub Pages)

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**GitHub Pages:**
```bash
npm run build
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages
```

#### 2. Docker

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build and run:**
```bash
docker build -t edulife-frontend .
docker run -p 80:80 edulife-frontend
```

#### 3. Traditional Server (Apache/Nginx)

**Build:**
```bash
npm run build
```

**Upload `dist/` contents to server:**
```bash
scp -r dist/* user@server:/var/www/edulife
```

**Nginx config:**
```nginx
server {
  listen 80;
  server_name edulife.uz;
  root /var/www/edulife;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api {
    proxy_pass https://api.edulife.uz;
  }
}
```

### Environment Variables for Production

Create `.env.production`:

```env
VITE_API_BASE_URL=https://api.edulife.uz/api
VITE_ENABLE_MOCK_API=false
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Module Not Found

**Error:**
```
Cannot find module '@/components/...'
```

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 2. Port Already in Use

**Error:**
```
Port 5173 is already in use
```

**Solution:**
```bash
# Kill process on port 5173
npx kill-port 5173

# Or specify different port
npm run dev -- --port 3000
```

#### 3. Build Fails

**Error:**
```
Build failed with errors
```

**Solution:**
```bash
# Check for linting errors
npm run lint

# Fix linting errors
npm run lint:fix

# Try build again
npm run build
```

#### 4. API Requests Failing

**Error:**
```
Network Error / CORS Error
```

**Solution:**
- Check if backend is running
- Verify API base URL in `api.js`
- Check browser console for CORS errors
- Ensure `withCredentials: true` is set

#### 5. i18n Keys Not Found

**Warning:**
```
[vue-i18n] Not found 'some.key' key in 'uz' locale messages.
```

**Solution:**
- Add missing key to `src/i18n/locales/uz.js`
- Add same key to all locale files (uz, ru)
- Check for typos in key path

---

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```
4. **Push to branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open Pull Request**

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new olympiad filter
fix: resolve login redirect issue
docs: update README installation steps
style: format code with prettier
refactor: simplify auth store logic
test: add Button component tests
chore: update dependencies
```

### Code Style

**ESLint rules enforced:**
- No `console.log` in production
- Vue 3 essential rules
- Security rules (no `eval`, `v-html` warnings)
- Prettier integration

**Before committing:**
```bash
npm run lint:fix
npm test
```

### Pull Request Guidelines

- ✅ Write clear PR description
- ✅ Include screenshots for UI changes
- ✅ Update documentation if needed
- ✅ Ensure all tests pass
- ✅ No console errors or warnings
- ✅ Follow existing code style

---

## 📄 License

**Proprietary** - © 2025 UMD Soft. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or modification is strictly prohibited.

---

## 📞 Support

### Documentation
- **Main README:** [README.md](README.md)
- **Admin Panel Guide:** [ADMIN_PANEL_README.md](ADMIN_PANEL_README.md)
- **Frontend Audit:** [docs/FRONTEND_AUDIT.md](docs/FRONTEND_AUDIT.md)
- **Project Goals:** [project_goals.md](project_goals.md)

### Contact
- **Email:** support@edulife.uz
- **Telegram:** @edulife_support
- **Website:** https://edulife.uz
- **GitHub Issues:** [Report an issue](https://github.com/umdsoft/lms-student/issues)

### Resources
- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Vue I18n Documentation](https://vue-i18n.intlify.dev/)

---

<div align="center">

**Built with ❤️ by [UMD Soft](https://umdsoft.uz)**

**EDULIFE** - Ta'lim bilan kelajakka! / Образование в будущее!

[⬆ Back to Top](#edulife---frontend-lms-platform)

</div>
