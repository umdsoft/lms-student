# LMS Platform - Admin Panel Documentation

## 📋 Overview

This is a comprehensive admin panel for the LMS Platform, built as a **reference for backend development**. The frontend is fully functional with mock data and demonstrates all CRUD operations, UI patterns, and expected API behaviors.

## 🎯 Purpose

This admin panel serves as:
1. **Frontend Reference** - Complete UI implementation ready for backend integration
2. **API Specification** - Clear demonstration of expected API endpoints and data structures
3. **Design System** - Consistent UI components and patterns
4. **User Experience Guide** - Workflows and interactions

## 🏗️ Architecture

### Tech Stack
- **Framework**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Charts**: Chart.js (via custom components)

### Directory Structure

```
src/
├── modules/
│   └── admin/
│       ├── components/          # Admin-specific components
│       │   ├── dashboard/       # Dashboard components (KPI cards, charts)
│       │   └── shared/          # Shared admin components
│       ├── pages/               # Admin pages
│       │   ├── ImprovedDashboardPage.vue
│       │   ├── olympiads/       # Olympiads management
│       │   ├── users/           # Users management
│       │   ├── payments/        # Payments management
│       │   ├── directions/      # Directions management
│       │   ├── plans/           # Subscription plans
│       │   └── analytics/       # Analytics pages
│       ├── stores/              # Pinia stores
│       │   ├── dashboard.js
│       │   └── olympiads.js
│       └── routes.js            # Admin routing
│
├── api/
│   └── mock/                    # Mock API (temporary, replace with real API)
│       ├── dashboard.js
│       ├── olympiads.js
│       ├── registrations.js
│       ├── users.js
│       ├── payments.js
│       ├── directions.js
│       └── subscriptionPlans.js
│
└── shared/
    └── components/              # Reusable components
        ├── ui/                  # UI components (Button, Input, Modal, etc.)
        └── charts/              # Chart components
```

## 📱 Admin Panel Features

### 1. Dashboard
**Route**: `/admin/dashboard`
**File**: `src/modules/admin/pages/ImprovedDashboardPage.vue`

**Features**:
- KPI Cards (Users, Subscriptions, Revenue, Olympiads)
- Revenue chart (multi-dataset line chart)
- Direction statistics (bar chart)
- Recent activity feed
- Alerts and notifications

**API Endpoints Needed**:
```javascript
GET /api/admin/dashboard
Response: {
  kpis: {
    totalUsers: { value: 1456, change: '+12.5%', trend: 'up' },
    activeSubscriptions: { value: 1200, change: '+8.3%', trend: 'up' },
    monthlyRevenue: { value: 113724000, change: '+15.2%', trend: 'up' },
    totalOlympiads: { value: 45, change: '+3', trend: 'up' }
  },
  revenueChart: { labels: [...], datasets: [...] },
  recentActivity: [...],
  alerts: [...]
}
```

### 2. Olympiads Management
**Route**: `/admin/olympiads`
**File**: `src/modules/admin/pages/olympiads/OlympiadsListPage.vue`

**Features**:
- List all olympiads with filters
- Filter by type (public/platform), status, direction
- Search functionality
- Pagination
- CRUD operations
- View registrations
- Publish/unpublish

**API Endpoints Needed**:
```javascript
// List olympiads
GET /api/admin/olympiads?type=public&status=upcoming&page=1&limit=10
Response: {
  olympiads: [...],
  summary: {
    totalOlympiads: 45,
    upcoming: 12,
    completed: 31,
    totalRevenue: 95000000
  },
  pagination: { total: 45, page: 1, limit: 10, totalPages: 5 }
}

// Get single olympiad
GET /api/admin/olympiads/:id
Response: { olympiad: {...} }

// Create olympiad
POST /api/admin/olympiads
Body: {
  title: "Spring Math Competition 2024",
  directionId: "dir-1",
  olympiadType: "public",
  entryFee: 75000,
  startDate: "2024-04-25T10:00:00Z",
  durationMinutes: 90,
  ...
}

// Update olympiad
PUT /api/admin/olympiads/:id
Body: { title: "Updated Title", ... }

// Delete olympiad
DELETE /api/admin/olympiads/:id

// Publish olympiad
POST /api/admin/olympiads/:id/publish
```

### 3. Users Management
**Route**: `/admin/users`

**Features**:
- List all users
- Filter by role (student/teacher/admin)
- Filter by subscription status
- Search by name or email
- View user details
- Edit user information
- Suspend/activate users

**API Endpoints Needed**:
```javascript
// List users
GET /api/admin/users?role=student&page=1&limit=20
Response: {
  users: [...],
  summary: {
    total: 1456,
    students: 1410,
    teachers: 24,
    admins: 2,
    activeSubscribers: 1200
  },
  pagination: {...}
}

// Get user details
GET /api/admin/users/:id
Response: {
  user: {
    id, email, fullName, role, phone,
    subscription: {...},
    progress: {...},
    createdAt, lastLoginAt
  }
}

// Update user
PUT /api/admin/users/:id
Body: { fullName: "...", isActive: true, ... }

// Delete user
DELETE /api/admin/users/:id
```

### 4. Payments Management
**Route**: `/admin/payments`

**Features**:
- List all payments
- Filter by type, status, date range
- View payment details
- Refund processing
- Revenue analytics

**API Endpoints Needed**:
```javascript
// List payments
GET /api/admin/payments?type=subscription&status=completed&from=2024-01-01
Response: {
  payments: [...],
  summary: {
    totalAmount: 187680000,
    totalTransactions: 3159,
    byType: {
      subscription: 87360000,
      olympiad_entry: 90150000,
      mock_exam: 5720000,
      teacher_booking: 4450000
    },
    byStatus: {
      completed: 3100,
      pending: 45,
      failed: 14
    }
  },
  pagination: {...}
}

// Get payment details
GET /api/admin/payments/:id

// Refund payment
POST /api/admin/payments/:id/refund
```

### 5. Registrations Management
**Route**: `/admin/olympiads/:id/registrations`

**Features**:
- View all registrations for an olympiad
- Filter by payment status, school, grade
- Export to Excel/CSV
- Bulk actions (approve, send notifications)
- View individual registration details

**API Endpoints Needed**:
```javascript
// List registrations
GET /api/admin/olympiads/:olympiadId/registrations?paymentStatus=paid
Response: {
  registrations: [...],
  stats: {
    total: 234,
    paid: 230,
    pending: 4,
    totalRevenue: 17250000,
    mocksSold: 89
  },
  pagination: {...}
}

// Bulk actions
POST /api/admin/registrations/bulk-action
Body: {
  ids: ["reg-1", "reg-2", ...],
  action: "send_notification"
}
```

### 6. Directions Management
**Route**: `/admin/directions`

**Features**:
- List all directions (Math, English, Programming)
- Create new directions
- Edit direction details
- Set colors and icons
- Activate/deactivate

**API Endpoints Needed**:
```javascript
// List directions
GET /api/admin/directions
Response: {
  directions: [
    {
      id: "dir-1",
      name: "Matematika",
      slug: "math",
      colorPrimary: "#3B82F6",
      colorSecondary: "#1D4ED8",
      isActive: true,
      totalCourses: 25,
      totalStudents: 456
    },
    ...
  ]
}

// CRUD operations
POST /api/admin/directions
PUT /api/admin/directions/:id
DELETE /api/admin/directions/:id
```

### 7. Subscription Plans Management
**Route**: `/admin/subscription-plans`

**Features**:
- List all subscription plans
- Create new plans
- Edit plan details (price, features, duration)
- Activate/deactivate plans
- View subscriber statistics

**API Endpoints Needed**:
```javascript
// List plans
GET /api/admin/subscription-plans
Response: {
  plans: [
    {
      id: "plan-1",
      name: "Oylik obuna",
      slug: "monthly",
      durationDays: 30,
      price: 99000,
      currency: "UZS",
      features: [...],
      isActive: true,
      totalSubscribers: 856,
      monthlyRevenue: 85344000
    },
    ...
  ],
  summary: {
    totalPlans: 2,
    activePlans: 2,
    totalSubscribers: 1200,
    monthlyRevenue: 113724000
  }
}

// CRUD operations
POST /api/admin/subscription-plans
PUT /api/admin/subscription-plans/:id
DELETE /api/admin/subscription-plans/:id
```

## 🎨 Design System

### Colors
The admin panel uses a consistent color system based on directions:

```javascript
const colors = {
  math: { primary: '#3B82F6', secondary: '#1D4ED8' },      // Blue
  english: { primary: '#10B981', secondary: '#059669' },    // Green
  programming: { primary: '#8B5CF6', secondary: '#6D28D9' }, // Purple
  olympiad: { primary: '#F59E0B', secondary: '#DC2626' },  // Orange

  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6'
};
```

### Components

All reusable components are in `src/shared/components/ui/`:
- `Button.vue` - Buttons with variants
- `Input.vue` - Form inputs
- `Select.vue` - Dropdown selects
- `Modal.vue` - Modal dialogs
- `Badge.vue` - Status badges
- `Card.vue` - Card containers
- `DataTable.vue` - Data tables
- `Pagination.vue` - Pagination controls
- `Alert.vue` - Alert messages
- `Loader.vue` - Loading indicators

## 📊 State Management (Pinia Stores)

All stores follow a consistent pattern:

```javascript
// Example: olympiads.js
export const useOlympiadsStore = defineStore('olympiads', {
  state: () => ({
    loading: false,
    error: null,
    olympiads: [],
    currentOlympiad: null,
    filters: {},
    pagination: {}
  }),

  getters: {
    isLoading: (state) => state.loading,
    olympiadsList: (state) => state.olympiads
  },

  actions: {
    async fetchOlympiads(filters) {
      // Fetch from API
    },
    async createOlympiad(data) {
      // Create via API
    },
    // ... other CRUD operations
  }
});
```

## 🔄 Migration from Mock to Real API

### Step 1: Replace Mock Imports

**Current (Mock)**:
```javascript
import { olympiadsApi } from '@/api/mock';
```

**Future (Real API)**:
```javascript
import { olympiadsApi } from '@/api'; // Real API service
```

### Step 2: Update API Service

Create `src/api/services/olympiads.js`:

```javascript
import axios from 'axios';

const BASE_URL = '/api/admin';

export const olympiadsApi = {
  async getAll(filters) {
    const response = await axios.get(`${BASE_URL}/olympiads`, { params: filters });
    return response.data;
  },

  async getById(id) {
    const response = await axios.get(`${BASE_URL}/olympiads/${id}`);
    return response.data;
  },

  async create(data) {
    const response = await axios.post(`${BASE_URL}/olympiads`, data);
    return response.data;
  },

  async update(id, data) {
    const response = await axios.put(`${BASE_URL}/olympiads/${id}`, data);
    return response.data;
  },

  async delete(id) {
    const response = await axios.delete(`${BASE_URL}/olympiads/${id}`);
    return response.data;
  }
};
```

### Step 3: No Store Changes Needed!

The Pinia stores are already designed to work with real APIs. Just replace the mock API imports with real API services.

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 16.x
npm or yarn
```

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Access Admin Panel
1. Navigate to `http://localhost:3000/admin/dashboard`
2. Use admin credentials (if auth is implemented)

## 📝 API Response Format

All API endpoints should follow this standard format:

### Success Response
```json
{
  "success": true,
  "data": { /* actual data */ },
  "message": "Operation successful",
  "timestamp": "2024-03-20T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { /* additional error info */ }
  },
  "timestamp": "2024-03-20T10:30:00Z"
}
```

### Pagination Format
```json
{
  "data": [...],
  "pagination": {
    "total": 234,
    "page": 1,
    "limit": 20,
    "totalPages": 12,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🔐 Authentication & Authorization

The admin panel expects JWT-based authentication:

```javascript
// Request headers
headers: {
  'Authorization': 'Bearer <access_token>',
  'Content-Type': 'application/json'
}

// User roles
roles: ['admin', 'teacher', 'student']

// Route protection
meta: {
  requiresAuth: true,
  roles: ['admin']
}
```

## 📊 Mock Data

All mock data is located in `src/api/mock/`:
- Realistic data structures
- Proper relationships
- Pagination support
- Filter/search capabilities
- Delayed responses (simulate network latency)

Replace these files with real API services when backend is ready.

## 🎯 Next Steps for Backend Integration

1. **Review Mock Data Structures** - Understand expected data formats
2. **Implement API Endpoints** - Follow the endpoints documented above
3. **Test with Postman** - Verify API responses match expected format
4. **Replace Mock Imports** - Switch from mock APIs to real services
5. **Add Error Handling** - Implement proper error responses
6. **Add Validation** - Server-side validation for all inputs
7. **Add Pagination** - Implement pagination for large datasets
8. **Add Filtering** - Implement filter/search logic
9. **Add Authentication** - JWT-based auth system
10. **Add Authorization** - Role-based access control

## 📞 Support & Questions

For questions about the admin panel structure or API requirements:
- Review the mock API files for data structure examples
- Check component props for expected data formats
- Look at store actions for API call patterns

## ✅ Completed Features

- ✅ Dashboard with KPIs and charts
- ✅ Olympiads CRUD management
- ✅ Users management
- ✅ Payments tracking
- ✅ Registrations management
- ✅ Directions management
- ✅ Subscription plans management
- ✅ Mock data for all modules
- ✅ Pinia stores for state management
- ✅ Routing configuration
- ✅ Reusable UI components
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Pagination
- ✅ Filtering and search

## 🎨 UI/UX Notes

- Mobile-responsive design (tested on mobile, tablet, desktop)
- Loading states for all async operations
- Error messages for failed operations
- Success notifications for completed actions
- Empty states for zero data scenarios
- Confirmation dialogs for destructive actions
- Keyboard navigation support
- Accessible components (ARIA labels)

---

**Built with ❤️ for LMS Platform**
**Version**: 1.0.0
**Last Updated**: March 2024
