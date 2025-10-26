# User Flows - LMS Platform

## 🎯 Overview

This document details all major user flows in the LMS platform, organized by user type and feature.

## 📱 User Types

1. **Guest User** - No account, can browse public olympiads
2. **Student (Subscribed)** - Paid subscription, access to all learning features
3. **Student (Olympiad Only)** - Registered for olympiad, no subscription
4. **Teacher** - Provides private lessons via marketplace
5. **Admin** - Manages entire platform

---

## Flow 1: Guest User - Public Olympiad Registration

### Step 1: Discovery

```
┌─────────────────────────────────────┐
│ Landing Page                        │
│                                     │
│ [Home] [Kurslar] [Olimpiadalar] [Kirish] │
└─────────────────────────────────────┘
```

User actions:
- Clicks "Olimpiadalar" in navigation
- No login required

### Step 2: Browse Olympiads

```
┌──────────────────────────────────────────┐
│ Olimpiadalar                             │
│                                          │
│ Filters:                                 │
│ [Matematika ▼] [Keyingi ▼] [Barchasi ▼] │
│                                          │
│ ┌──────────────┐ ┌──────────────┐       │
│ │ Spring Math  │ │ English Pro  │       │
│ │ Competition  │ │ Challenge    │       │
│ │              │ │              │       │
│ │ 📅 25-Mart   │ │ 📅 10-Aprel  │       │
│ │ 💰 75,000    │ │ 💰 50,000    │       │
│ │ 👥 234/500   │ │ 👥 89/300    │       │
│ │              │ │              │       │
│ │ [Batafsil]   │ │ [Batafsil]   │       │
│ └──────────────┘ └──────────────┘       │
└──────────────────────────────────────────┘
```

### Step 3: Olympiad Detail Page

```
┌──────────────────────────────────────────┐
│ Spring Math Competition 2024             │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ 📅 25-Mart 2024, 10:00                   │
│ ⏱️ Davomiyligi: 90 daqiqa                │
│ 🎯 Yo'nalish: Matematika                 │
│ 💰 Qatnashish: 75,000 so'm               │
│ 👥 Ro'yxatga olingan: 234/500           │
│ ⏰ Ariza topshirish: 20-Mart gacha       │
│                                          │
│ 📝 Tavsif:                               │
│ Lorem ipsum dolor sit amet...            │
│                                          │
│ 📚 Namunaviy savollar:                   │
│ [Savol 1 preview]                        │
│ [Savol 2 preview]                        │
│ [Savol 3 preview]                        │
│                                          │
│ 🏆 Mukofotlar:                           │
│ • 1-3 o'rin: Medallar                    │
│ • Top 10: Sertifikatlar                  │
│                                          │
│ 🎯 Mock imtihonlar mavjud!              │
│ Tayyorgarlik ko'ring: 5 ta mock          │
│                                          │
│ [Ro'yxatdan o'tish] [Orqaga]            │
└──────────────────────────────────────────┘
```

User clicks: "Ro'yxatdan o'tish"

### Step 4: Registration Form (Multi-step)

#### Step 4.1: Personal Information

```
┌──────────────────────────────────────────┐
│ Olimpiadaga ro'yxatdan o'tish  (1/3)    │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Shaxsiy ma'lumotlar                      │
│                                          │
│ To'liq ismingiz: *                       │
│ [___________________________]            │
│                                          │
│ Maktab nomi: *                           │
│ [___________________________]            │
│                                          │
│ Sinf: *                                  │
│ [7 ▼]                                    │
│                                          │
│ Yo'nalish: *                             │
│ ○ Matematika                             │
│ ○ Ingliz tili                            │
│ ○ Dasturlash                             │
│                                          │
│ Ota-ona telefon raqami: *                │
│ [+998 __ ___ __ __]                      │
│                                          │
│ Email: *                                 │
│ [___________________________]            │
│                                          │
│ [Keyingi →]                              │
└──────────────────────────────────────────┘
```

Validation:
- All fields required
- Phone format: +998XXXXXXXXX
- Email format validation

#### Step 4.2: Review & Confirm

```
┌──────────────────────────────────────────┐
│ Olimpiadaga ro'yxatdan o'tish  (2/3)    │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Ma'lumotlarni tekshiring                 │
│                                          │
│ Olimpiada: Spring Math Competition       │
│ Yo'nalish: Matematika                    │
│ Ism: Alisher Karimov                     │
│ Maktab: 25-son maktab                    │
│ Sinf: 9                                  │
│ Telefon: +998 90 123 45 67               │
│ Email: alisher@email.com                 │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Qatnashish to'lovi: 75,000 so'm          │
│                                          │
│ ☐ Men shartlar va qoidalarga roziman    │
│                                          │
│ [← Ortga] [To'lovga o'tish →]           │
└──────────────────────────────────────────┘
```

#### Step 4.3: Payment

```
┌──────────────────────────────────────────┐
│ To'lov                         (3/3)    │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Olimpiada: Spring Math Competition       │
│ To'lov summasi: 75,000 so'm              │
│                                          │
│ To'lov usulini tanlang:                  │
│                                          │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│ │Payme │ │Click │ │Uzcard│ │ Humo │    │
│ │ [○]  │ │ [○]  │ │ [○]  │ │ [○]  │    │
│ └──────┘ └──────┘ └──────┘ └──────┘    │
│                                          │
│ [← Ortga] [To'lash]                     │
└──────────────────────────────────────────┘
```

User clicks "To'lash" → Redirects to payment gateway

### Step 5: Payment Gateway

External payment provider interface (Payme/Click/etc.)
- User completes payment
- Gateway redirects back to platform

### Step 6: Success Page

```
┌──────────────────────────────────────────┐
│          ✅ Tabriklaymiz!                │
│                                          │
│ Siz muvaffaqiyatli ro'yxatdan o'tdingiz! │
│                                          │
│ Registration ID: OLY-2024-001234         │
│                                          │
│ Email va SMS orqali tasdiq xabari        │
│ yuborildi.                               │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ 📌 Keyingi qadamlar:                     │
│                                          │
│ 1️⃣ Mock imtihonlar bilan tayyorlaning   │
│    (Ixtiyoriy, lekin tavsiya etiladi)    │
│                                          │
│ 2️⃣ Olimpiada kunida platformaga kiring  │
│    (25-Mart 2024, 9:45 dan)              │
│                                          │
│ 3️⃣ Test topshiring va natijani kuting   │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ [Mock imtihonlarni ko'rish]              │
│ [Dashboard'ga o'tish]                    │
└──────────────────────────────────────────┘
```

### Step 7: Email Confirmation

```
Subject: Olimpiadaga muvaffaqiyatli ro'yxatdan o'tdingiz! 🎉

Hurmatli Alisher Karimov,

Siz Spring Math Competition 2024 olimpiadasiga muvaffaqiyatli
ro'yxatdan o'tdingiz!

📋 Registration ID: OLY-2024-001234
📅 Sana: 25-Mart 2024, 10:00
⏱️ Davomiyligi: 90 daqiqa
💰 To'langan: 75,000 so'm

🎯 Tayyorgarlik uchun:
Mock imtihonlar sotib oling va bilimingizni sinab ko'ring.
5 ta mock paket: 40,000 so'm (35,000 so'm tejash!)

[Mock imtihonlarni ko'rish]
[Dashboard'ga kirish]

---
Savollaringiz bormi? support@lmsplatform.uz
```

---

## Flow 2: Olympiad Participant - Mock Exam Purchase & Practice

### Step 1: Access Mock Exams

User logs into dashboard (simple dashboard created automatically)

```
┌──────────────────────────────────────────┐
│ Salom, Alisher Karimov!                  │
│                                          │
│ Mening olimpiadalarim                    │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ Spring Math Competition 2024       │  │
│ │ 📅 25-Mart, 10:00                  │  │
│ │ ⏰ 5 kun qoldi                     │  │
│ │                                    │  │
│ │ Tayyorgarlik:                      │  │
│ │ 🎯 Mock imtihonlar: 0/5 topshirildi│  │
│ │                                    │  │
│ │ [Mock sotib olish]                 │  │
│ │ [Olimpiada haqida]                 │  │
│ └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

User clicks: "Mock sotib olish"

### Step 2: Mock Exams Offer Page

```
┌──────────────────────────────────────────┐
│ Mock Imtihonlar - Olimpiadaga tayyorgarlik│
│                                          │
│ Olimpiadaga yaxshi tayyorgarlik ko'ring! │
│ Mock imtihonlar sizga yordam beradi.     │
│                                          │
│ ┌─────────────────┐ ┌─────────────────┐ │
│ │ Bitta Mock     │ │ 5 ta Mock Paketi│ │
│ │                │ │                 │ │
│ │ 15,000 so'm    │ │ 40,000 so'm     │ │
│ │                │ │                 │ │
│ │ ✓ 30 savol     │ │ ✓ 150 savol     │ │
│ │ ✓ 60 daqiqa    │ │ ✓ To'liq tayyorlik│ │
│ │ ✓ Batafsil     │ │ ✓ 35,000 tejash │ │
│ │   tahlil       │ │ ✓ Eng yaxshi    │ │
│ │                │ │   tanlov!       │ │
│ │ [Sotib olish]  │ │ [Sotib olish]   │ │
│ └─────────────────┘ └─────────────────┘ │
│                                          │
│ 📊 Statistika:                           │
│ Mock topshirganlar o'rtacha 15% yuqori   │
│ natija ko'rsatmoqda!                     │
│                                          │
│ [Keyinroq] [Dashboard]                   │
└──────────────────────────────────────────┘
```

User clicks: "5 ta Mock Paketi - Sotib olish"

### Step 3: Payment for Mocks

```
┌──────────────────────────────────────────┐
│ Mock Paket To'lovi                       │
│                                          │
│ Mahsulot: 5 ta Mock Imtihon              │
│ Olimpiada: Spring Math Competition       │
│ Narx: 40,000 so'm                        │
│                                          │
│ To'lov usuli:                            │
│ ○ Payme  ○ Click  ○ Uzcard  ○ Humo      │
│                                          │
│ [← Ortga] [To'lash]                     │
└──────────────────────────────────────────┘
```

After successful payment:

```
┌──────────────────────────────────────────┐
│ ✅ To'lov muvaffaqiyatli!                │
│                                          │
│ Siz 5 ta mock imtihon sotib oldingiz.   │
│                                          │
│ Endi mock imtihonlarni topshirishingiz   │
│ mumkin.                                  │
│                                          │
│ [Mock'larni boshlash]                    │
└──────────────────────────────────────────┘
```

### Step 4: Mock Exams Dashboard

```
┌──────────────────────────────────────────┐
│ Mock Imtihonlar                          │
│                                          │
│ Tayyorgarlik darajangiz: 0%              │
│ [░░░░░░░░░░░░░░░░░░░░]                   │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ Mock 1                             │  │
│ │ 30 savol | 60 daqiqa               │  │
│ │ Status: 🔓 Tayyor                  │  │
│ │ [Boshlash]                         │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ Mock 2                             │  │
│ │ 30 savol | 60 daqiqa               │  │
│ │ Status: 🔒 Yopiq                   │  │
│ │ (Mock 1 ni tugating)               │  │
│ └────────────────────────────────────┘  │
│                                          │
│ [Mock 3, 4, 5 - Locked]                 │
│                                          │
│ 💡 Maslahat: Har bir mock'ni diqqat bilan│
│ topshiring va xatolaringizni o'rganing.  │
└──────────────────────────────────────────┘
```

User clicks: "Boshlash" on Mock 1

### Step 5: Mock Exam Instructions

```
┌──────────────────────────────────────────┐
│ Mock Imtihon #1 - Boshlash               │
│                                          │
│ ⚠️ Diqqat!                               │
│                                          │
│ • Bu test 60 daqiqa davom etadi          │
│ • 30 ta savol                            │
│ • Vaqt tugagach avtomatik yuboriladi     │
│ • Test boshlanganidan keyin to'xtata     │
│   olmaysiz                               │
│ • Browser'dan chiqmang                   │
│                                          │
│ Tayyormisiz?                             │
│                                          │
│ [Ha, testni boshlash]                    │
│ [Yo'q, keyinroq]                         │
└──────────────────────────────────────────┘
```

User clicks: "Ha, testni boshlash"

### Step 6: Taking Mock Exam

```
┌──────────────────────────────────────────┐
│ Mock Imtihon #1            ⏱️ 58:34 qoldi│
│                                          │
│ Savol 1/30                      [🚩 Flag]│
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Quyidagi tenglamani yeching:             │
│ 2x² + 5x - 3 = 0                         │
│                                          │
│ ○ A) x = 1 yoki x = -3                   │
│ ○ B) x = 0.5 yoki x = -3                 │
│ ○ C) x = -1 yoki x = 3                   │
│ ○ D) x = -0.5 yoki x = 3                 │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Savol navigatsiyasi:                     │
│ [1][2][3][4][5][6]...[30]               │
│                                          │
│ Legend:                                  │
│ [#] = Joriy | [✓] = Javob berildi       │
│ [?] = Belgilandi | [ ] = Bo'sh           │
│                                          │
│ [← Oldingi] [Keyingi →] [Test yakunlash]│
└──────────────────────────────────────────┘
```

### Step 7: Submit Mock Exam

After answering all or when time is up:

```
┌──────────────────────────────────────────┐
│ Test yakunlash                           │
│                                          │
│ ⚠️ Diqqat!                               │
│                                          │
│ Javob berilgan savollar: 28/30           │
│ Bo'sh qolgan: 2                          │
│                                          │
│ Haqiqatan ham yakunlashni xohlaysizmi?   │
│                                          │
│ Bu amalni bekor qilish mumkin emas!      │
│                                          │
│ [Yo'q, qaytish] [Ha, yakunlash]         │
└──────────────────────────────────────────┘
```

User clicks: "Ha, yakunlash"

Processing screen:
```
┌──────────────────────────────────────────┐
│                                          │
│         ⏳ Natijalar hisoblanmoqda...    │
│                                          │
│         [Loading animation]              │
│                                          │
└──────────────────────────────────────────┘
```

### Step 8: Mock Exam Results

```
┌──────────────────────────────────────────┐
│ Mock Imtihon #1 - Natija                 │
│                                          │
│      🎯 Sizning natijangiz               │
│                                          │
│            25/30 (83%)                   │
│       ████████████████░░░░░              │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ 📊 Batafsil tahlil                       │
│                                          │
│ Qiyinlik bo'yicha:                       │
│ Oson:     10/10 ████████████ (100%)      │
│ O'rta:    12/15 ████████░░░░ (80%)       │
│ Qiyin:     3/5  ██████░░░░░░ (60%)       │
│                                          │
│ Mavzu bo'yicha:                          │
│ Algebra:       8/10 (80%)                │
│ Geometriya:    9/10 (90%)                │
│ Trigonometriya: 8/10 (80%)               │
│                                          │
│ ⏱️ Vaqt sarfi:                           │
│ O'rtacha: 1.8 min/savol                  │
│ Eng tez: 0.5 min                         │
│ Eng sekin: 4.2 min                       │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ ✅ Kuchli tomonlar:                      │
│ • Geometrik masalalar                    │
│ • Tenglamalar yechish                    │
│                                          │
│ ⚠️ Zaif tomonlar:                        │
│ • Murakkab funksiyalar                   │
│ • Logarifmlar                            │
│                                          │
│ 💡 Tavsiyalar:                           │
│ • Logarifm mavzusini qayta ishlang       │
│ • Qiyin savollarga ko'proq vaqt ajrating │
│                                          │
│ [Xato javoblarni ko'rish]                │
│ [PDF yuklab olish]                       │
│ [Keyingi Mock'ni boshlash]               │
│ [Dashboard]                              │
└──────────────────────────────────────────┘
```

---

## Flow 3: Subscribed Student - Learning Journey

### Step 1: Sign Up & Choose Subscription

```
┌──────────────────────────────────────────┐
│ Ro'yxatdan o'tish                        │
│                                          │
│ Email: [________________]                │
│ Parol: [________________]                │
│ Parolni tasdiqlang: [________________]   │
│                                          │
│ To'liq ism: [________________]           │
│ Telefon: [+998 __ ___ __ __]             │
│                                          │
│ [Ro'yxatdan o'tish]                      │
│                                          │
│ Akkauntingiz bormi? [Kirish]             │
└──────────────────────────────────────────┘
```

After registration:

```
┌──────────────────────────────────────────┐
│ Obuna rejasini tanlang                   │
│                                          │
│ ┌─────────────────┐ ┌─────────────────┐ │
│ │ Oylik           │ │ Yillik          │ │
│ │                 │ │                 │ │
│ │ 99,000 so'm/oy  │ │ 990,000 so'm    │ │
│ │                 │ │ (2 oy bepul!)   │ │
│ │                 │ │                 │ │
│ │ ✓ Barcha kurslar│ │ ✓ Barcha kurslar│ │
│ │ ✓ Cheksiz testlar│ │ ✓ Cheksiz testlar│ │
│ │ ✓ AI feedback   │ │ ✓ AI feedback   │ │
│ │ ✓ Olimpiadalar  │ │ ✓ Olimpiadalar  │ │
│ │   (bepul)       │ │   (bepul)       │ │
│ │                 │ │ ✓ 20% tejash    │ │
│ │                 │ │                 │ │
│ │ [Tanlash]       │ │ [Tanlash] ⭐    │ │
│ └─────────────────┘ └─────────────────┘ │
└──────────────────────────────────────────┘
```

After payment:

### Step 2: Choose Directions

```
┌──────────────────────────────────────────┐
│ Qaysi yo'nalishlarda o'rganmoqchisiz?    │
│                                          │
│ (Bir yoki bir nechtasini tanlang)        │
│                                          │
│ ┌──────────────────────────────────────┐│
│ │ ☑ 📐 Matematika                      ││
│ │   Algebra, Geometriya, Trigonometriya││
│ └──────────────────────────────────────┘│
│                                          │
│ ┌──────────────────────────────────────┐│
│ │ ☑ 🌍 Ingliz tili                     ││
│ │   Speaking, Writing, Reading, Listening││
│ └──────────────────────────────────────┘│
│                                          │
│ ┌──────────────────────────────────────┐│
│ │ ☐ 💻 Dasturlash                      ││
│ │   Python, JavaScript, Algorithms     ││
│ └──────────────────────────────────────┘│
│                                          │
│ [Davom etish]                            │
└──────────────────────────────────────────┘
```

### Step 3: Placement Test (Optional)

```
┌──────────────────────────────────────────┐
│ Darajangizni aniqlash                    │
│                                          │
│ Biz sizning hozirgi bilim darajangizni   │
│ aniqlash uchun qisqa test o'tkazamiz.    │
│                                          │
│ Bu sizga mos keladigan mavzulardan       │
│ boshlashga yordam beradi.                │
│                                          │
│ Test: 15-20 daqiqa                       │
│ Savollar: 20 ta                          │
│                                          │
│ [Testni boshlash]                        │
│ [O'tkazib yuborish - Boshidan boshlash]  │
└──────────────────────────────────────────┘
```

### Step 4: Dashboard & Learning Path

```
┌──────────────────────────────────────────┐
│ Dashboard                      [Profile▼]│
│                                          │
│ Xush kelibsiz, Alisher! 👋               │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ 📊 Mening yutuqlarim                     │
│                                          │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │📐 Math   │ │🌍 English│ │💻 Code   │ │
│ │          │ │          │ │          │ │
│ │ 12%      │ │ 8%       │ │ -        │ │
│ │██░░░░░░░│ │█░░░░░░░░│ │░░░░░░░░░│ │
│ │          │ │          │ │          │ │
│ │3/25 mavzu│ │2/30 mavzu│ │0/20 mavzu│ │
│ └──────────┘ └──────────┘ └──────────┘ │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ 🎯 Joriy mavzular                        │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ 📐 Matematika: Kvadrat tenglamalar │  │
│ │ Progress: 45% ████████░░░░░░░      │  │
│ │ [Davom etish]                      │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ 🌍 English: Present Perfect        │  │
│ │ Progress: 25% ████░░░░░░░░░░       │  │
│ │ [Davom etish]                      │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ 🏆 Yaqinlashayotgan olimpiadalar         │
│ • Spring Math Competition (3 kun qoldi)  │
│   [Ro'yxatdan o'tish - BEPUL]           │
│                                          │
│ 👨‍🏫 O'qituvchilar bilan                 │
│   [Dars band qilish]                     │
└──────────────────────────────────────────┘
```

### Step 5: Topic Learning

User clicks "Davom etish" on a topic:

```
┌──────────────────────────────────────────┐
│ Kvadrat tenglamalar                      │
│                                          │
│ Progress: 45% ████████░░░░░░░            │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ 📚 1. Nazariya (✅ Tugallandi)           │
│    Video: 15 min                         │
│    [Qayta ko'rish]                       │
│                                          │
│ 📝 2. Amaliy masalalar (⏳ Jarayonda)    │
│    5/10 masala yechildi                  │
│    [Davom etish]                         │
│                                          │
│ ✏️ 3. Test (🔒 Yopiq)                    │
│    Amaliy masalalarni tugating           │
│                                          │
│ 🎯 4. Final Test (🔒 Yopiq)              │
│    Minimal 75% kerak                     │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ 💡 Maslahat: Har bir bosqichni yaxshilab │
│ o'zlashtirib keting!                     │
└──────────────────────────────────────────┘
```

### Step 6: English Skill Test (Example: Speaking)

For English topics, 4 skills required:

```
┌──────────────────────────────────────────┐
│ Present Perfect - Speaking Test          │
│                                          │
│ Task 1/3: Describe a recent experience   │
│                                          │
│ 🎤 Record your answer (Max 2 minutes)    │
│                                          │
│ Question:                                │
│ "Tell me about a place you have visited  │
│ recently. What did you do there?"        │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ ⏺️ [Start Recording]                     │
│                                          │
│ Tips:                                    │
│ • Speak clearly                          │
│ • Use Present Perfect tense              │
│ • Speak for at least 1 minute            │
│                                          │
│ [← Back] [Skip] [Next →]                 │
└──────────────────────────────────────────┘
```

After recording:

```
┌──────────────────────────────────────────┐
│ Recording complete! ✅                    │
│                                          │
│ 🎧 [▶️ Play recording]  Duration: 1:45   │
│                                          │
│ Satisfied with your answer?              │
│                                          │
│ [Re-record] [Submit]                     │
└──────────────────────────────────────────┘
```

After submission, AI evaluation:

```
┌──────────────────────────────────────────┐
│ ⏳ AI baholash jarayoni...               │
│                                          │
│ [Loading animation]                      │
│                                          │
│ Bu 1-2 daqiqa davom etishi mumkin        │
└──────────────────────────────────────────┘
```

Results:

```
┌──────────────────────────────────────────┐
│ Speaking Test - Natija                   │
│                                          │
│ Ball: 85/100 ⭐⭐⭐⭐                      │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ 📊 Tahlil:                               │
│                                          │
│ ✅ Pronunciation: 90%                    │
│    Very good! Clear and natural.         │
│                                          │
│ ✅ Grammar: 80%                          │
│    Good use of Present Perfect.          │
│    Minor errors detected.                │
│                                          │
│ ✅ Vocabulary: 85%                       │
│    Good range of words used.             │
│                                          │
│ ✅ Fluency: 85%                          │
│    Natural pace with few pauses.         │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ 💡 Tavsiyalar:                           │
│ • Practice using "since" and "for"       │
│ • Work on article usage (a/an/the)       │
│                                          │
│ [Transcript ko'rish]                     │
│ [Keyingi skill: Writing]                 │
└──────────────────────────────────────────┘
```

---

## Flow 4: Teacher - Marketplace Journey

### Step 1: Apply as Teacher

```
┌──────────────────────────────────────────┐
│ O'qituvchi bo'lish uchun ariza           │
│                                          │
│ Shaxsiy ma'lumotlar:                     │
│ To'liq ism: [________________]           │
│ Telefon: [+998 __ ___ __ __]             │
│ Email: [________________]                │
│                                          │
│ Professional ma'lumotlar:                │
│ Mutaxassislik: [Select multiple]         │
│ ☑ Matematika                             │
│ ☐ Ingliz tili                            │
│ ☐ Dasturlash                             │
│                                          │
│ Tajriba (yillar): [5]                    │
│                                          │
│ Bio (o'zingiz haqingizda): [TextArea]    │
│                                          │
│ Ma'lumot:                                │
│ [___________________________]            │
│                                          │
│ Soatlik narx: [50,000] so'm              │
│                                          │
│ Video tanishtirish (ixtiyoriy):          │
│ [Upload video]                           │
│                                          │
│ Hujjatlar:                               │
│ • Diplom [Upload]                        │
│ • Sertifikatlar [Upload]                 │
│                                          │
│ [Arizani yuborish]                       │
└──────────────────────────────────────────┘
```

After submission:

```
┌──────────────────────────────────────────┐
│ ✅ Ariza yuborildi!                      │
│                                          │
│ Arizangiz admin tomonidan ko'rib         │
│ chiqilmoqda.                             │
│                                          │
│ Javob 1-3 ish kuni ichida keladi.       │
│                                          │
│ [Bosh sahifa]                            │
└──────────────────────────────────────────┘
```

### Step 2: Teacher Dashboard (After Approval)

```
┌──────────────────────────────────────────┐
│ Teacher Dashboard            [Profile ▼] │
│                                          │
│ Xush kelibsiz, Nodira Azimova! 👨‍🏫      │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ 📊 Bu oy                                 │
│                                          │
│ ┌────────┐ ┌────────┐ ┌────────┐       │
│ │Darslar │ │O'quvchilar│Daromad │       │
│ │   24   │ │    8     │450,000 │       │
│ │ soat   │ │          │ so'm   │       │
│ └────────┘ └────────┘ └────────┘       │
│                                          │
│ Reyting: ⭐⭐⭐⭐⭐ 4.9/5.0 (15 ta sharh) │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ 📅 Yaqinlashayotgan darslar              │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ Bugun, 14:00 - 15:00               │  │
│ │ O'quvchi: Alisher Karimov          │  │
│ │ Mavzu: Kvadrat tenglamalar         │  │
│ │ [Darsga kirish] [Detallar]         │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ Ertaga, 10:00 - 11:30              │  │
│ │ O'quvchi: Malika Sobirova          │  │
│ │ Mavzu: Grammar review              │  │
│ │ [Detallar]                         │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ 🔔 Yangi so'rovlar: 2                    │
│ [Ko'rish]                                │
│                                          │
│ [Profil] [Jadval] [Daromad] [Sharhlar]  │
└──────────────────────────────────────────┘
```

---

## Flow 5: Admin - Olympiad Management

### Step 1: Create New Olympiad

```
┌──────────────────────────────────────────┐
│ Yangi Olimpiada Yaratish                 │
│                                          │
│ Tab: [Asosiy Ma'lumotlar] Savollar       │
│      Mock'lar Sertifikatlar              │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Olimpiada nomi: *                        │
│ [Spring Math Competition 2024]           │
│                                          │
│ Tavsif:                                  │
│ [RichTextEditor...]                      │
│                                          │
│ Yo'nalish: *                             │
│ ○ Matematika ○ Ingliz ○ Dasturlash      │
│                                          │
│ Turi: *                                  │
│ ○ Platform (Bepul - faqat obunachilarga) │
│ ● Ommaviy (Pullik - hammaga ochiq)      │
│                                          │
│ Qatnashish to'lovi: *                    │
│ [75,000] so'm                            │
│                                          │
│ Boshlanish sanasi: *                     │
│ [25-03-2024] [10:00]                     │
│                                          │
│ Davomiyligi (daqiqa): *                  │
│ [90]                                     │
│                                          │
│ Ro'yxatdan o'tish muddati: *             │
│ [20-03-2024] [23:59]                     │
│                                          │
│ Maksimal ishtirokchilar:                 │
│ [500]                                    │
│                                          │
│ Qiyinlik darajasi:                       │
│ ○ Oson ● O'rta ○ Qiyin                  │
│                                          │
│ [Keyingi: Savollar →]                    │
└──────────────────────────────────────────┘
```

### Step 2: Add Questions

```
┌──────────────────────────────────────────┐
│ Yangi Olimpiada - Savollar               │
│                                          │
│ Tab: Asosiy Ma'lumotlar [Savollar]       │
│      Mock'lar Sertifikatlar              │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Savollar soni: 15/40                     │
│                                          │
│ [+ Savol qo'shish] [Savollar bazasidan]  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ 1. Kvadrat tenglamani yeching...   │  │
│ │    Type: MCQ | Qiyinlik: O'rta     │  │
│ │    Ball: 2                         │  │
│ │    [Edit] [Delete] [Preview]       │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ 2. Uchburchak yuzasini toping...   │  │
│ │    Type: MCQ | Qiyinlik: Oson      │  │
│ │    Ball: 1                         │  │
│ │    [Edit] [Delete] [Preview]       │  │
│ └────────────────────────────────────┘  │
│                                          │
│ [... more questions]                     │
│                                          │
│ [← Oldingi] [Keyingi: Mock'lar →]       │
└──────────────────────────────────────────┘
```

### Step 3: Generate Mock Exams

```
┌──────────────────────────────────────────┐
│ Mock Imtihonlar                          │
│                                          │
│ Tab: Asosiy Ma'lumotlar Savollar         │
│      [Mock'lar] Sertifikatlar            │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Mock yaratish usuli:                     │
│ ● Avtomatik generatsiya                  │
│ ○ Manual yaratish                        │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Mock'lar soni: [5]                       │
│                                          │
│ Har bir mock'da savollar: [30]           │
│                                          │
│ Davomiyligi (daqiqa): [60]               │
│                                          │
│ Mock narxi (birlik): [15,000] so'm       │
│                                          │
│ Paket narxi (5 ta): [40,000] so'm        │
│ Chegirma: 35,000 so'm (47%)              │
│                                          │
│ ☑ Savollarni tasodifiy tanlash           │
│ ☑ Har bir mock turli qiyinlikda          │
│                                          │
│ Qiyinlik taqsimoti:                      │
│ Oson: 40% | O'rta: 40% | Qiyin: 20%     │
│                                          │
│ [Mock'larni generatsiya qilish]          │
│                                          │
│ [← Oldingi] [Keyingi: Sertifikatlar →]  │
└──────────────────────────────────────────┘
```

### Step 4: Certificate Settings

```
┌──────────────────────────────────────────┐
│ Sertifikatlar va Mukofotlar             │
│                                          │
│ Tab: Asosiy Ma'lumotlar Savollar Mock'lar│
│      [Sertifikatlar]                     │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Shablon:                                 │
│ [Classic ▼] [Preview]                    │
│                                          │
│ Mukofotlar mezonlari:                    │
│                                          │
│ 🥇 Oltin medal:                          │
│ ☑ Top 3 ishtirokchi                      │
│ ☑ Ball > 95%                             │
│                                          │
│ 🥈 Kumush medal:                         │
│ ☑ 4-10 o'rin                             │
│ ☑ Ball > 85%                             │
│                                          │
│ 🥉 Bronza medal:                         │
│ ☑ 11-20 o'rin                            │
│ ☑ Ball > 75%                             │
│                                          │
│ 📜 Qatnashganlik sertifikati:            │
│ ☑ Barcha ishtirokchilar                  │
│                                          │
│ Avtomatik generatsiya:                   │
│ ☑ Natijalar e'lon qilingandan keyin      │
│                                          │
│ Xabar matni (ixtiyoriy):                 │
│ [Congratulations on your achievement...] │
│                                          │
│ [← Oldingi] [Saqlash va chiqish]        │
│ [Saqlash va e'lon qilish]                │
└──────────────────────────────────────────┘
```

### Step 5: Manage Registrations

```
┌──────────────────────────────────────────┐
│ Spring Math Competition - Ro'yxatganlar │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ KPI:                                     │
│ Jami: 234 | To'langan: 230 | Kutilmoqda: 4│
│ Daromad: 17,250,000 so'm                 │
│ Mock sotildi: 89 paket                   │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Filters:                                 │
│ To'lov: [Barchasi▼] Maktab: [________]   │
│ Sinf: [Barchasi▼] Mock: [Barchasi▼]     │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ ☐ ID   Ism      Maktab  Sinf To'lov Mock│
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ ☐ 001 Alisher K. 25-son  9   ✅    Paket│
│ ☐ 002 Malika S.  Pres.   10  ✅    2 ta │
│ ☐ 003 Sardor T.  17-son  9   ✅    Yo'q │
│ ☐ 004 Dilnoza R. 25-son  8   ⏳    -    │
│ ...                                      │
│                                          │
│ ☑ Tanlangan: 0                           │
│ Bulk actions: [Action ▼] [Apply]        │
│                                          │
│ [Export Excel] [Send Notification]       │
└──────────────────────────────────────────┘
```

---

This concludes the major user flows. Each flow is designed to be intuitive, guide users through complex processes, and provide clear feedback at every step.
