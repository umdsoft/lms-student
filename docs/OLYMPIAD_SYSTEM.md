# Olympiad System - Complete Specification

## 🎯 Overview

The Olympiad System is a comprehensive examination and competition platform designed to:
1. Monetize the platform through public olympiad entry fees
2. Provide free olympiads for subscribed users
3. Offer mock exams for preparation
4. Generate certificates and rankings
5. Create engagement and motivation

---

## 📊 System Architecture

### Two Types of Olympiads

#### 1. Platform Olympiads (Internal)
- **Target Audience**: Subscribed users only
- **Cost**: FREE (included in subscription)
- **Frequency**: Weekly/Monthly
- **Purpose**: Engagement, practice, internal leaderboard
- **Registration**: Automatic for subscribed users
- **Certificates**: Digital certificates for top performers

#### 2. Public Olympiads (External)
- **Target Audience**: Anyone (including non-users)
- **Cost**: Entry fee (50,000 - 100,000 UZS)
- **Frequency**: Quarterly/Special events
- **Purpose**: Revenue generation, brand awareness
- **Registration**: Manual registration with payment
- **Certificates**: Official certificates, medals for winners
- **Mock Exams**: Available for purchase

---

## 💰 Revenue Model

### Public Olympiad Monetization

**Direct Revenue:**
1. **Entry Fees**: 50,000 - 100,000 UZS per participant
2. **Mock Exams**:
   - Single mock: 15,000 UZS
   - 5-pack bundle: 40,000 UZS (47% discount)

**Example Calculation:**
```
Olympiad: Spring Math Competition 2024
Entry fee: 75,000 UZS
Target participants: 500

Revenue from entries: 500 × 75,000 = 37,500,000 UZS

Mock exam sales (estimated 40% purchase rate):
- 30% buy single mock (150 students): 150 × 15,000 = 2,250,000 UZS
- 10% buy package (50 students): 50 × 40,000 = 2,000,000 UZS

Total mock revenue: 4,250,000 UZS

TOTAL OLYMPIAD REVENUE: 41,750,000 UZS
```

**Annual Projection (4 olympiads/year):**
- Total revenue: ~167,000,000 UZS/year
- This is supplementary to subscription revenue

---

## 🎓 Registration Flow

### For Public Olympiads (Non-subscribers)

#### Step 1: Discovery
- User browses public olympiad listings (no login required)
- Can filter by: direction, date, price, difficulty
- Sees olympiad details, sample questions, stats

#### Step 2: Registration Form
**Required Information:**
```json
{
  "fullName": "Required - Student's full name",
  "schoolName": "Required - Current school",
  "grade": "Required - 1-11",
  "direction": "Required - math/english/programming",
  "parentPhone": "Required - +998XXXXXXXXX",
  "email": "Required - For notifications",
  "preferredLanguage": "Optional - uz/ru/en"
}
```

#### Step 3: Payment
- Entry fee displayed prominently
- Multiple payment gateways:
  - Payme
  - Click
  - Uzcard
  - Humo
- Secure payment processing
- Immediate payment confirmation

#### Step 4: Confirmation
- Registration ID generated (e.g., OLY-2024-001234)
- Confirmation email sent
- SMS notification sent
- Access to simple dashboard created
- Mock exams offer displayed

### For Subscribed Users (Platform Olympiads)

#### Simplified Flow:
1. User sees upcoming olympiad in dashboard
2. One-click registration (no payment needed)
3. Confirmation notification
4. Olympiad appears in "My Olympiads"

---

## 🎯 Mock Exam System

### Purpose
- Help students prepare for main olympiad
- Additional revenue stream
- Improve overall performance (better marketing)
- Reduce anxiety on exam day

### Mock Exam Features

#### Pricing Strategy
- **Single Mock**: 15,000 UZS
- **5-Pack Bundle**: 40,000 UZS
  - Regular price: 75,000 UZS
  - Savings: 35,000 UZS (47% off)
  - Better value messaging

#### Mock Exam Structure
```javascript
{
  mockExam: {
    id: "uuid",
    olympiadId: "uuid",
    title: "Mock Exam #1",
    description: "Practice test in olympiad format",
    durationMinutes: 60, // Same as actual olympiad
    totalQuestions: 30, // Proportional to actual
    price: 15000,
    difficulty: "medium",
    passingScore: 70
  }
}
```

#### Question Distribution
- 40% Easy questions
- 40% Medium questions
- 20% Hard questions

Questions are randomly selected from a larger pool to ensure variety.

#### Mock Exam Access Rules
1. Only purchasers can access
2. Can be taken anytime before olympiad
3. Single attempt per mock (or unlimited - TBD)
4. Must complete one mock before accessing next
5. Expires after olympiad completion

### Mock Exam Results & Analytics

#### Immediate Feedback
After submission, students receive:

1. **Score Breakdown**
   - Overall score (X/30)
   - Percentage
   - Pass/Fail status

2. **Performance Analysis**
   ```javascript
   {
     byDifficulty: {
       easy: { total: 12, correct: 11, percentage: 92 },
       medium: { total: 12, correct: 9, percentage: 75 },
       hard: { total: 6, correct: 2, percentage: 33 }
     },
     byTopic: {
       algebra: { total: 10, correct: 8 },
       geometry: { total: 10, correct: 9 },
       trigonometry: { total: 10, correct: 7 }
     },
     timeAnalysis: {
       averagePerQuestion: 114, // seconds
       fastestQuestion: 30,
       slowestQuestion: 252
     }
   }
   ```

3. **Strengths & Weaknesses**
   - Automatically identified based on performance
   - Example: "Strong in Geometry, weak in Logarithms"

4. **Recommendations**
   - Personalized study suggestions
   - Topic review links
   - Video explanations for wrong answers

5. **Wrong Answer Review**
   - See all incorrect answers
   - Correct answer with explanation
   - Video solution (optional premium feature)

6. **PDF Report**
   - Downloadable comprehensive report
   - Can be shared with teachers/parents
   - Includes all analytics

### Mock Exam Impact on Performance

**Statistical Tracking:**
- Track correlation between mock completion and olympiad performance
- Marketing data: "Students who complete all 5 mocks score 15% higher!"

---

## 📝 Olympiad Exam Day

### Pre-Exam (Day Before)

**Automated Reminders:**
- Email: 24 hours before
- SMS: 24 hours before
- Email: 1 hour before
- SMS: 15 minutes before

**Reminder Content:**
```
Subject: Olimpiada ertaga! - Tayyor bo'ling

Hurmatli Alisher Karimov,

Spring Math Competition 2024 ertaga boshlanadi!

📅 Sana: 25-Mart 2024
⏰ Vaqt: 10:00 (aniq vaqtda kirish tavsiya etiladi)
⏱️ Davomiyligi: 90 daqiqa

📌 Eslatmalar:
• Internetingizni tekshiring
• Tinch muhitda bo'ling
• Browser'dan chiqmang
• Vaqtni yaxshi boshqaring

[Platformaga kirish]

Omad tilaymiz! 🍀
```

### Exam Interface

#### Pre-Start Screen
```
┌──────────────────────────────────────────┐
│ Spring Math Competition 2024             │
│                                          │
│ ⏰ Boshlanish vaqti yetdi!               │
│                                          │
│ 📋 Test haqida:                          │
│ • Savollar: 40 ta                        │
│ • Vaqt: 90 daqiqa                        │
│ • Maksimal ball: 100                     │
│                                          │
│ ⚠️ Muhim qoidalar:                       │
│ • Test bir marta boshlanadi              │
│ • Vaqt tugagach avtomatik yuboriladi     │
│ • Browser'dan chiqmang                   │
│ • Internet uzilsa qayta ulanish mumkin   │
│ • Har 30 sekundda avtomatik saqlanadi    │
│                                          │
│ Tayyormisiz?                             │
│                                          │
│ [Ha, testni boshlash]                    │
│ [Yo'q, hali tayyor emasman]              │
└──────────────────────────────────────────┘
```

#### During Exam

**Key Features:**
1. **Timer Display**: Prominent countdown timer
2. **Question Navigator**: Grid showing all questions
3. **Flag for Review**: Mark questions to revisit
4. **Auto-save**: Every 30 seconds
5. **Progress Indicator**: X of 40 answered
6. **Warning Messages**: Time warnings at 30, 15, 5 minutes

**Question Interface:**
```
┌──────────────────────────────────────────┐
│ Spring Math Competition      ⏱️ 58:34    │
│                                          │
│ Savol 15/40              [🚩 Belgilash] │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Calculate the derivative of:             │
│ f(x) = x³ + 2x² - 5x + 3                │
│                                          │
│ ○ A) 3x² + 4x - 5                        │
│ ○ B) 3x² + 2x - 5                        │
│ ○ C) x² + 4x - 5                         │
│ ○ D) 3x² + 4x + 5                        │
│                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                          │
│ Navigatsiya:                             │
│ [1✓][2✓][3?][4✓]...[15][16]...[40]      │
│                                          │
│ Legend:                                  │
│ [✓] Javob berildi  [?] Belgilandi       │
│ [#] Joriy savol    [ ] Bo'sh             │
│                                          │
│ [← Oldingi] [Keyingi →]                  │
│                              [Yakunlash] │
└──────────────────────────────────────────┘
```

#### Time Warnings

**30 Minutes Remaining:**
```
┌──────────────────────────────────────────┐
│ ⚠️ Diqqat!                               │
│                                          │
│ 30 daqiqa qoldi!                         │
│                                          │
│ Tezligingizni oshiring.                  │
│ Belgilangan savollarni ko'rib chiqing.   │
│                                          │
│ [Tushundim]                              │
└──────────────────────────────────────────┘
```

**5 Minutes Remaining:**
```
┌──────────────────────────────────────────┐
│ 🚨 Vaqt tugayapti!                       │
│                                          │
│ Faqat 5 daqiqa qoldi!                    │
│                                          │
│ Bo'sh savollar: 8                        │
│                                          │
│ [Bo'sh savollarga o'tish]                │
└──────────────────────────────────────────┘
```

#### Submission

**Manual Submission:**
```
┌──────────────────────────────────────────┐
│ Test yakunlash                           │
│                                          │
│ ⚠️ Diqqat! Bu amalni bekor qilish        │
│ mumkin emas!                             │
│                                          │
│ Holat:                                   │
│ • Javob berilgan: 38/40                  │
│ • Bo'sh qolgan: 2                        │
│ • Belgilangan: 3                         │
│ • Qolgan vaqt: 12:45                     │
│                                          │
│ Haqiqatan ham yakunlashni xohlaysizmi?   │
│                                          │
│ [Yo'q, qaytish] [Ha, yakunlash]         │
└──────────────────────────────────────────┘
```

**After Submission:**
```
┌──────────────────────────────────────────┐
│ ✅ Test muvaffaqiyatli yakunlandi!       │
│                                          │
│ Rahmat! Siz testni topshirdingiz.       │
│                                          │
│ 📊 Natijalar 24 soat ichida e'lon        │
│ qilinadi.                                │
│                                          │
│ Email va SMS orqali xabar beramiz.       │
│                                          │
│ [Dashboard'ga qaytish]                   │
└──────────────────────────────────────────┘
```

### Anti-Cheating Measures

#### Technical Implementation:

1. **Browser Lockdown**
   - Detect tab switching
   - Detect window minimizing
   - Warn on first offense
   - Auto-submit on repeated offenses

2. **Question Randomization**
   - Shuffle question order per student
   - Shuffle option order (for MCQ)
   - Different students get different sequences

3. **IP Tracking**
   - Record IP address
   - Detect multiple submissions from same IP
   - Flag suspicious activity

4. **Time Tracking**
   - Track time per question
   - Flag unusually fast submissions
   - Detect patterns suggesting copying

5. **Webcam Monitoring (Optional)**
   - Request webcam access
   - Periodic snapshots (with consent)
   - AI-based behavior analysis
   - Privacy-compliant implementation

6. **Copy-Paste Prevention**
   - Disable right-click
   - Disable copy-paste
   - Disable inspect element

---

## 📊 Results & Evaluation

### Automated Grading

**Supported Question Types:**

1. **Multiple Choice (MCQ)**
   - Instant automated grading
   - Clear correct answer

2. **True/False**
   - Instant automated grading

3. **Numerical Answer**
   - Automated with tolerance
   - Example: Accept 3.14 or 3.1416 for π

4. **Code Submission** (for Programming olympiads)
   - Automated test case execution
   - Hidden test cases
   - Time/Space complexity check

5. **Essay/Written** (for English olympiads)
   - AI-assisted grading
   - Manual review for top performers
   - Rubric-based evaluation

### Results Processing

**Timeline:**
- MCQ/Auto-gradable: Within 1 hour
- Manual review required: Within 24 hours

**Process:**
1. Auto-grade all MCQ questions
2. AI evaluation for essays/speaking
3. Manual review for edge cases
4. Calculate final scores
5. Generate rankings
6. Assign achievements (medals)
7. Generate certificates
8. Publish results

### Results Publication

**Email Notification:**
```
Subject: Olimpiada natijalari e'lon qilindi! 🎉

Hurmatli Alisher Karimov,

Spring Math Competition 2024 natijalari tayyor!

🎯 Sizning natijangiz:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ball: 98/100 (98%)
O'rin: 2 / 234 ishtirokchi
Mukofot: 🥈 Kumush medal

Tabriklaymiz! Ajoyib natija!

📜 Sertifikat platformada tayyor.

[Batafsil natijalarni ko'rish]
[Sertifikatni yuklab olish]
[Leaderboard'ni ko'rish]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Keyingi olimpiadalar:
• Summer English Challenge - 15-Iyun
• Code Masters 2024 - 1-Iyul

Yana ishtirok eting! 🚀
```

---

## 🏆 Leaderboard & Rankings

### Ranking Algorithm

**Factors:**
1. **Primary**: Total score (out of 100)
2. **Tiebreaker 1**: Submission time (earlier is better)
3. **Tiebreaker 2**: Time spent (less is better)

**Example:**
```javascript
function calculateRank(participants) {
  return participants.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score; // Higher score first
    }
    if (a.submittedAt !== b.submittedAt) {
      return a.submittedAt - b.submittedAt; // Earlier submission first
    }
    return a.timeSpent - b.timeSpent; // Less time first
  });
}
```

### Achievement Levels

**Criteria:**

1. **Gold Medal (🥇)**
   - Rank: Top 3
   - OR Score: ≥ 95%

2. **Silver Medal (🥈)**
   - Rank: 4-10
   - OR Score: 85-94%

3. **Bronze Medal (🥉)**
   - Rank: 11-20
   - OR Score: 75-84%

4. **Certificate of Excellence**
   - Rank: 21-100
   - OR Score: 70-74%

5. **Participation Certificate**
   - All participants who completed the olympiad

### Leaderboard Display

**Public Leaderboard:**
```
┌──────────────────────────────────────────────────────────┐
│ Spring Math Competition 2024 - Leaderboard              │
│                                                          │
│ Total Participants: 234 | Average Score: 74.5%          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                          │
│ Rank | Name              | School        | Score | Time │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  🥇1 | Sardor Toshmatov  | 25-son maktab | 100   | 82m  │
│  🥈2 | Alisher Karimov   | 25-son maktab |  98   | 78m  │
│  🥉3 | Malika Ergasheva  | Presidential  |  97   | 85m  │
│    4 | Javohir Alimov    | 17-son maktab |  96   | 80m  │
│    5 | Dilnoza Rahimova  | 25-son maktab |  95   | 75m  │
│  ... | ...               | ...           | ...   | ...  │
│                                                          │
│ [Download Full Rankings] [Share]                        │
└──────────────────────────────────────────────────────────┘
```

**Features:**
- Real-time updates (during results publication)
- Filter by school/grade
- Search by name
- Export to PDF/Excel
- Social media sharing

---

## 📜 Certificate Generation

### Automatic Certificate Generation

**Triggered by:**
- Results publication
- Achievement assignment

**Process:**
1. Generate PDF for each achiever
2. Add verification QR code
3. Upload to secure storage
4. Send email with certificate
5. Make available in dashboard

### Certificate Template

**Elements:**

```
┌─────────────────────────────────────────────────┐
│                   [LOGO]                        │
│                                                 │
│        🏆 CERTIFICATE OF ACHIEVEMENT            │
│                                                 │
│            This is to certify that              │
│                                                 │
│              ALISHER KARIMOV                    │
│                                                 │
│      from 25-son maktab, Grade 9               │
│                                                 │
│         has secured 2nd Position                │
│              with a score of 98%                │
│                                                 │
│              in the competition                 │
│                                                 │
│      Spring Math Competition 2024               │
│                                                 │
│         held on 25th March 2024                 │
│                                                 │
│                                                 │
│  [QR Code]                         [Signature]  │
│  Verify at:                        Principal    │
│  verify.lms/CERT123                             │
│                                                 │
│  Certificate ID: CERT-2024-001234               │
│  Issued: 26-Mar-2024                            │
└─────────────────────────────────────────────────┘
```

**Technical Specs:**
- Format: PDF (A4 size)
- Quality: High-resolution (300 DPI)
- File size: < 500 KB
- Watermark: Official logo
- Security: Unique QR code for verification

### Certificate Verification

**Public Verification Page:**
```
URL: https://lmsplatform.uz/verify/CERT-2024-001234

┌──────────────────────────────────────────┐
│ Certificate Verification                 │
│                                          │
│ ✅ Valid Certificate                     │
│                                          │
│ Certificate ID: CERT-2024-001234         │
│ Issued to: Alisher Karimov              │
│ Olympiad: Spring Math Competition 2024   │
│ Achievement: Silver Medal (2nd Position) │
│ Score: 98/100                            │
│ Issued Date: 26-March-2024               │
│                                          │
│ This is an official certificate issued   │
│ by LMS Platform.                         │
│                                          │
│ [Download Certificate]                   │
└──────────────────────────────────────────┘
```

---

## 📈 Analytics & Reporting

### For Participants

**Individual Performance Report:**
- Overall score and rank
- Question-by-question breakdown
- Time analysis
- Comparison with average
- Strengths and weaknesses
- Improvement suggestions

**PDF Report Includes:**
- Cover page with score and rank
- Detailed analytics
- Charts and graphs
- Certificate (if applicable)
- Next steps and recommendations

### For Admin

**Olympiad Analytics Dashboard:**

1. **Registration Metrics**
   - Total registrations over time
   - Conversion rate (views → registrations)
   - Payment success rate
   - Revenue generated

2. **Mock Exam Metrics**
   - Purchase rate
   - Completion rate
   - Average scores
   - Impact on final performance

3. **Participation Metrics**
   - Completion rate
   - Average time spent
   - Question difficulty analysis
   - Drop-off points

4. **Performance Metrics**
   - Score distribution
   - Average score by school/grade
   - Question-wise difficulty
   - Topic-wise performance

5. **Revenue Metrics**
   - Entry fee revenue
   - Mock exam revenue
   - Total revenue
   - Cost per acquisition
   - ROI

**Sample Dashboard:**
```
Spring Math Competition 2024 - Analytics

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
KPIs:
┌──────────────┬──────────────┬──────────────┐
│ Registrations│ Completion   │ Revenue      │
│     234      │    230 (98%) │ 41,750,000   │
└──────────────┴──────────────┴──────────────┘

Registration Funnel:
Viewed: 1,250 → Clicked: 680 (54%) → Started: 456 (67%)
→ Paid: 234 (51%) → Completed: 230 (98%)

Mock Sales:
• Single: 150 purchases (64% of sales)
• Package: 50 purchases (21% of participants)
• Revenue: 4,250,000 UZS

Performance:
• Average Score: 74.5%
• Median: 76%
• Passing Rate: 85%
• Top Score: 100%

Top Schools:
1. 25-son maktab: 45 participants
2. Presidential: 32 participants
3. 17-son maktab: 28 participants
```

---

## 🔧 Admin Management Features

### Olympiad Creation Wizard

**Step-by-Step Process:**

1. **Basic Information**
   - Title, Description
   - Direction (Math/English/Programming)
   - Type (Platform/Public)
   - Entry fee (if public)
   - Dates and duration
   - Max participants

2. **Question Bank**
   - Import from existing
   - Create new questions
   - Set difficulty levels
   - Assign points
   - Preview and test

3. **Mock Exam Configuration**
   - Auto-generate or manual
   - Set pricing
   - Configure bundle discount
   - Set availability rules

4. **Certificate Settings**
   - Choose template
   - Set achievement criteria
   - Configure auto-generation

5. **Notifications**
   - Email templates
   - SMS templates
   - Reminder schedule

6. **Review & Publish**
   - Preview everything
   - Test olympiad flow
   - Publish or save as draft

### Registration Management

**Features:**
- View all registrations
- Filter and search
- Export to Excel/CSV
- Bulk actions (approve, reject, refund)
- Send custom notifications
- Track payment status
- Monitor mock exam purchases

**Individual Registration Actions:**
- View full details
- Contact participant
- Issue refund
- Resend confirmation
- Generate receipt
- Flag for review

### Results Management

**Features:**
- Upload results (if not auto-graded)
- Review and adjust scores
- Resolve disputes
- Generate rankings
- Publish results
- Generate certificates
- Send notifications

---

## 🚀 Marketing & Promotion

### Pre-Launch (2-4 weeks before)

**Channels:**
- Email to existing users
- Social media posts
- School partnerships
- Influencer collaborations
- Banner on website

**Messaging:**
- Early bird discount (if applicable)
- Limited slots
- Mock exam bundle offer
- Previous winners' testimonials

### During Registration Period

**Tactics:**
- Daily social media updates
- Countdown to registration deadline
- Showcase sample questions
- Highlight prizes
- Share registration numbers (social proof)

### Post-Olympiad

**Content:**
- Results announcement
- Winner interviews
- Performance statistics
- Next olympiad teaser
- Mock exam case studies

---

## 🔐 Security & Fair Play

### Security Measures

1. **Data Protection**
   - Encrypted storage
   - Secure transmission
   - GDPR-compliant

2. **Payment Security**
   - PCI DSS compliance
   - Secure gateways
   - No card data storage

3. **Access Control**
   - Role-based permissions
   - Audit logs
   - Admin activity tracking

### Fair Play Enforcement

1. **Detection**
   - Automated cheating detection
   - Manual review of flagged cases
   - Pattern analysis

2. **Penalties**
   - Warning for minor offenses
   - Disqualification for serious violations
   - Ban from future olympiads
   - Refund denial for cheaters

3. **Appeals Process**
   - Participants can appeal
   - Evidence review
   - Final decision by admin
   - Communication of outcome

---

## 📅 Olympiad Calendar

### Recommended Schedule

**Annual Plan:**
- Q1: Winter Challenge (January)
- Q2: Spring Competition (March-April)
- Q3: Summer Championship (June-July)
- Q4: Autumn Cup (September-October)

**Per Direction:**
- Math: 2-3 major olympiads/year
- English: 2-3 major olympiads/year
- Programming: 2-3 major olympiads/year

**Platform Olympiads:**
- Weekly mini-contests for subscribers
- Monthly major contests
- Special themed contests

---

## 🎯 Success Metrics

### Key Performance Indicators

1. **Registration KPIs**
   - Registration rate
   - Conversion rate
   - Average fee per participant

2. **Engagement KPIs**
   - Completion rate
   - Mock exam purchase rate
   - Time spent on platform

3. **Revenue KPIs**
   - Total revenue per olympiad
   - Mock exam revenue
   - Average revenue per user (ARPU)

4. **Quality KPIs**
   - Participant satisfaction (surveys)
   - Net Promoter Score (NPS)
   - Repeat participation rate

5. **Brand KPIs**
   - Social media reach
   - Media coverage
   - School partnerships

---

This comprehensive olympiad system is designed to provide value to participants while generating significant revenue for the platform. The combination of quality content, fair competition, and excellent user experience will drive success and growth.
