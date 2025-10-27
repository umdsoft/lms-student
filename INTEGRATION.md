# Backend API Integration - LMS Student Frontend

Backend API (`http://localhost:5000`) bilan Vue 3 frontend integratsiyasi to'liq amalga oshirildi.

## 📋 Qilingan Ishlar

### ✅ 1. API Base URL Sozlash

- **`.env` fayli yaratildi** - Backend URL konfiguratsiyasi
- **`src/api.js` yangilandi** - Mock data o'chirildi, real backend URL qo'shildi
- **`src/api.csrf.js` yaxshilandi** - CSRF token avtomatik yuborish uchun

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### ✅ 2. Authentication Sistemasi (OTP)

**Qo'shilgan fayllar:**
- `src/shared/stores/auth.js` - Real API bilan ishlash
- `src/shared/composables/useAuth.js` - OTP metodlar qo'shildi
- `src/shared/pages/LoginPage.vue` - OTP login UI

**Backend endpoints:**
- `POST /auth/send-otp` - OTP yuborish
- `POST /auth/verify-otp` - Login/Register
- `GET /auth/me` - User ma'lumotlari
- `POST /auth/logout` - Logout
- `PUT /auth/profile` - Profile yangilash
- `PUT /auth/profile/avatar` - Avatar upload

**Login jarayoni:**
1. User telefon raqam kiritadi → OTP yuboriladi
2. User OTP kodni kiritadi → tasdiqlash
3. Session cookie avtomatik saqlanadi
4. User role'ga qarab dashboard ochiladi

### ✅ 3. CSRF Token

`csrfApi` barcha mutatsiya operatsiyalarda (POST, PUT, PATCH, DELETE) avtomatik CSRF token yuboradi.

```javascript
import { csrfApi } from '@/api.csrf';

// ✅ To'g'ri
await csrfApi.post('/olympiads', data);
await csrfApi.put('/profile', updates);
```

### ✅ 4. Olympiads Moduli

**Yangi API service:** `src/api/services/olympiads.js`

**Admin store:** `src/modules/admin/stores/olympiads.js`
- Mock API o'chirildi
- Real backend API qo'shildi
- CRUD operatsiyalar ishlaydi

**Student store:** `src/modules/student/stores/olympiads.js`
- Olympiadlarni fetch qilish
- Ro'yxatdan o'tish/chiqish
- Mening olimpiadalarim

**Student sahifalar:**
- `src/modules/student/pages/olympiads/OlympiadsPage.vue` - Real API bilan ishlaydi
- Loading va Error states qo'shildi

### ✅ 5. API Error Handling

**`src/api.js` interceptor:**
- 401 (Unauthorized) → Login sahifasiga yo'naltirish
- 403 (Forbidden) → Console warning
- Network errors → Foydalanuvchiga xabar

### ✅ 6. Router Guard

**`src/router/index.js`:**
- Autentifikatsiya tekshiruvi
- Role-based access control
- Login'dan keyin redirect

## 🚀 Boshlash

### Backend

```bash
cd /path/to/lms-back
npm install
npm run dev  # Port 5000'da ishga tushadi
```

### Frontend

```bash
cd /path/to/lms-student
npm install
npm run dev  # Port 5173'da ishga tushadi
```

## 🧪 Test Qilish

### 1. Authentication

1. `http://localhost:5173/login` ga boring
2. Telefon raqam kiriting: `+998901234567` (yoki istalgan raqam)
3. Backend console'da OTP kodni ko'ring
4. OTP kodni frontend'ga kiriting
5. Login muvaffaqiyatli bo'lishi kerak
6. Role'ga qarab dashboard ochilishi kerak (admin/teacher/student)

### 2. Olympiads

**Student:**
1. Login qiling (student role)
2. `/student/olympiads` ga boring
3. Olimpiadalar ro'yxati ko'rinishi kerak (backend'dan)
4. Loading state ishlayotganini tekshiring

**Admin:**
1. Login qiling (admin role)
2. `/control/olympiads` ga boring
3. Olimpiadalar CRUD operatsiyalarini bajaring
4. Filter va pagination ishlashi kerak

### 3. Logout

1. Header'dagi user menu'dan "Logout" bosing
2. Session tozalanishi va login sahifasiga yo'naltirilishi kerak

### 4. Session Persistence

1. Login qiling
2. Sahifani refresh qiling (`F5`)
3. Session saqlanishi va logout bo'lmasligi kerak
4. User ma'lumotlari ko'rinishi kerak

## 📁 Struktura

```
src/
├── api/
│   ├── api.js              # Asosiy axios instance (real backend)
│   ├── api.csrf.js         # CSRF token helper
│   ├── services/           # Real API service'lar
│   │   ├── olympiads.js    # Olimpiadalar API
│   │   ├── notifications.js # Notification'lar API
│   │   └── index.js        # Export
│   └── mock/               # Mock data (faqat referans uchun)
├── shared/
│   ├── stores/
│   │   └── auth.js         # Auth store (OTP bilan)
│   ├── composables/
│   │   └── useAuth.js      # Auth composable
│   └── pages/
│       └── LoginPage.vue   # OTP login UI
├── modules/
│   ├── admin/
│   │   └── stores/
│   │       └── olympiads.js # Admin olympiads store
│   └── student/
│       ├── stores/
│       │   └── olympiads.js # Student olympiads store
│       └── pages/
│           └── olympiads/
│               └── OlympiadsPage.vue
└── router/
    └── index.js            # Auth guard
```

## ⚠️ Muhim Eslatmalar

1. **Backend ishlab turishi shart**: Frontend backend'siz ishlamaydi
2. **CORS sozlangan**: Backend'da `credentials: true`
3. **Cookie'lar avtomatik**: Session cookie'si avtomatik saqlanadi
4. **CSRF token**: Barcha mutatsiyalarda `csrfApi` ishlatiladi
5. **Error handling**: 401 error'larda avtomatik login'ga yo'naltiradi

## 🐛 Muammolar

### Backend'ga ulanmayapti
```
Error: Network error - Backend may be offline
```
**Yechim**: Backend ishlab turganini tekshiring (`http://localhost:5000`)

### OTP kelmayapti
**Yechim**: Backend console'ni tekshiring, u yerda OTP kod chiqadi (development)

### 401 error
**Yechim**: Logout qiling va qayta login qiling

### CORS error
**Yechim**: Backend CORS sozlamalarini tekshiring:
```javascript
credentials: true
origin: 'http://localhost:5173'
```

## 📝 Keyingi Qadamlar

Quyidagi modullar ham integratsiya qilinishi kerak:

- [ ] Courses moduli
- [ ] Lessons moduli
- [ ] Quizzes moduli
- [ ] Assignments moduli
- [ ] Notifications (polling yoki websocket)
- [ ] Profile page (avatar upload)
- [ ] Dashboard statistika
- [ ] Payments moduli

## 🔗 Backend API

Backend repository: https://github.com/umdsoft/lms-back

API base URL: `http://localhost:5000/api/v1`

## 👨‍💻 Ishlatilgan Texnologiyalar

- Vue 3 (Composition API)
- Pinia (State management)
- Axios (HTTP client)
- Vue Router (Navigation & Guards)
- Tailwind CSS (Styling)

---

**Muvaffaqiyatli integratsiya!** 🎉

Agar savollar bo'lsa, issue oching yoki PR yuboring.
