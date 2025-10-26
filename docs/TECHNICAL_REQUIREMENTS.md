# Technical Requirements - LMS Platform

## 🏗️ System Architecture

### Stack Overview

**Frontend:**
- Framework: Vue 3 (Composition API)
- State Management: Pinia
- Routing: Vue Router
- UI Framework: Tailwind CSS + Custom Components
- Build Tool: Vite
- Type Safety: TypeScript (recommended)

**Backend:**
- Runtime: Node.js
- Framework: Express.js / NestJS
- Database: PostgreSQL (primary)
- Cache: Redis
- File Storage: AWS S3 / MinIO
- Real-time: Socket.io

**Additional Services:**
- Payment Gateway: Payme, Click, Uzcard APIs
- Video Calls: Jitsi Meet / Agora
- Email: SendGrid / AWS SES
- SMS: Playmobile / Eskiz
- AI Services: OpenAI API (for feedback)

## 📊 Database Schema

### Core Entities

#### 1. Users & Authentication

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(50) NOT NULL, -- student, teacher, admin
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

#### 2. Directions (Subjects)

```sql
CREATE TABLE directions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL, -- Math, English, Programming
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon_url TEXT,
    description TEXT,
    color_primary VARCHAR(7), -- Hex color
    color_secondary VARCHAR(7),
    is_active BOOLEAN DEFAULT true,
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_directions_slug ON directions(slug);
```

#### 3. Subscription System

```sql
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    duration_days INT NOT NULL, -- 30 for monthly, 365 for yearly
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'UZS',
    features JSONB, -- Array of features
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES subscription_plans(id),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT true,
    auto_renew BOOLEAN DEFAULT true,
    payment_id UUID, -- Reference to payments table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_active ON subscriptions(is_active, end_date);
```

#### 4. Courses & Topics

```sql
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    direction_id UUID REFERENCES directions(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    level VARCHAR(50), -- beginner, intermediate, advanced
    thumbnail_url TEXT,
    is_published BOOLEAN DEFAULT false,
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content JSONB, -- Video URLs, materials, etc.
    display_order INT NOT NULL,
    min_score_to_pass INT DEFAULT 70, -- Percentage
    is_locked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_topics_course_id ON topics(course_id);
CREATE INDEX idx_topics_order ON topics(course_id, display_order);
```

#### 5. Topic Requirements

```sql
CREATE TABLE topic_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    requirement_type VARCHAR(50) NOT NULL,
    -- For English: speaking, writing, reading, listening
    -- For Math: theory, practice, test
    -- For Programming: algorithm, code, contest
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content JSONB, -- Questions, materials, etc.
    min_score INT DEFAULT 70,
    max_attempts INT,
    time_limit_minutes INT,
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_requirements_topic ON topic_requirements(topic_id);
```

#### 6. Student Progress

```sql
CREATE TABLE student_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT false,
    score INT, -- Overall score for the topic
    attempts INT DEFAULT 0,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    locked_until TIMESTAMP, -- If failed, lock for some time
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, topic_id)
);

CREATE INDEX idx_progress_user ON student_progress(user_id);
CREATE INDEX idx_progress_topic ON student_progress(topic_id);
```

#### 7. Skill Submissions (for English)

```sql
CREATE TABLE skill_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    requirement_id UUID REFERENCES topic_requirements(id) ON DELETE CASCADE,
    skill_type VARCHAR(50) NOT NULL, -- speaking, writing, reading, listening
    submission_type VARCHAR(50), -- text, audio, video
    content TEXT, -- Text content or URL to audio/video
    score INT,
    max_score INT DEFAULT 100,
    ai_feedback JSONB, -- Structured feedback from AI
    evaluated_at TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending', -- pending, evaluated, failed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_submissions_user ON skill_submissions(user_id);
CREATE INDEX idx_submissions_requirement ON skill_submissions(requirement_id);
```

#### 8. Code Submissions (for Programming)

```sql
CREATE TABLE code_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    requirement_id UUID REFERENCES topic_requirements(id) ON DELETE CASCADE,
    language VARCHAR(50) NOT NULL, -- python, javascript, cpp, java
    code TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, running, passed, failed
    test_results JSONB, -- Array of test case results
    execution_time_ms INT,
    memory_used_kb INT,
    score INT,
    max_score INT DEFAULT 100,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    evaluated_at TIMESTAMP
);

CREATE INDEX idx_code_submissions_user ON code_submissions(user_id);
CREATE INDEX idx_code_submissions_requirement ON code_submissions(requirement_id);
```

### Olympiad System

#### 9. Olympiads

```sql
CREATE TABLE olympiads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    direction_id UUID REFERENCES directions(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    olympiad_type VARCHAR(50) NOT NULL, -- platform, public
    difficulty VARCHAR(50), -- easy, medium, hard
    entry_fee DECIMAL(10, 2), -- NULL for platform olympiads
    currency VARCHAR(3) DEFAULT 'UZS',
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    registration_deadline TIMESTAMP NOT NULL,
    duration_minutes INT NOT NULL,
    max_participants INT,
    max_score INT DEFAULT 100,
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_olympiads_type ON olympiads(olympiad_type);
CREATE INDEX idx_olympiads_dates ON olympiads(start_date, end_date);
CREATE INDEX idx_olympiads_direction ON olympiads(direction_id);
```

#### 10. Olympiad Questions

```sql
CREATE TABLE olympiad_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    olympiad_id UUID REFERENCES olympiads(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL, -- mcq, code, essay, true_false
    options JSONB, -- For MCQ: array of options
    correct_answer TEXT,
    explanation TEXT,
    points INT DEFAULT 1,
    difficulty VARCHAR(50),
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_questions_olympiad ON olympiad_questions(olympiad_id);
```

#### 11. Olympiad Registrations

```sql
CREATE TABLE olympiad_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    olympiad_id UUID REFERENCES olympiads(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- NULL for guest
    full_name VARCHAR(255) NOT NULL,
    school_name VARCHAR(255),
    grade INT,
    parent_phone VARCHAR(20),
    email VARCHAR(255) NOT NULL,
    direction VARCHAR(50), -- math, english, programming
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed
    payment_amount DECIMAL(10, 2),
    payment_id UUID, -- Reference to payments
    paid_at TIMESTAMP,
    application_status VARCHAR(50) DEFAULT 'approved', -- pending, approved, rejected
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(olympiad_id, email)
);

CREATE INDEX idx_registrations_olympiad ON olympiad_registrations(olympiad_id);
CREATE INDEX idx_registrations_payment ON olympiad_registrations(payment_status);
CREATE INDEX idx_registrations_user ON olympiad_registrations(user_id);
```

#### 12. Olympiad Participants

```sql
CREATE TABLE olympiad_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id UUID REFERENCES olympiad_registrations(id) ON DELETE CASCADE,
    started_at TIMESTAMP,
    submitted_at TIMESTAMP,
    score INT,
    max_score INT,
    rank INT,
    answers JSONB, -- Array of {question_id, answer, is_correct, points}
    time_spent_seconds INT,
    certificate_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(registration_id)
);

CREATE INDEX idx_participants_registration ON olympiad_participants(registration_id);
CREATE INDEX idx_participants_rank ON olympiad_participants(rank);
```

### Mock Exam System

#### 13. Mock Exams

```sql
CREATE TABLE mock_exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    olympiad_id UUID REFERENCES olympiads(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INT NOT NULL,
    total_questions INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'UZS',
    difficulty VARCHAR(50),
    passing_score INT DEFAULT 70,
    is_active BOOLEAN DEFAULT true,
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_mocks_olympiad ON mock_exams(olympiad_id);
```

#### 14. Mock Exam Questions

```sql
CREATE TABLE mock_exam_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mock_exam_id UUID REFERENCES mock_exams(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL,
    options JSONB,
    correct_answer TEXT,
    explanation TEXT,
    points INT DEFAULT 1,
    difficulty VARCHAR(50),
    topic_tags JSONB, -- Array of topic tags
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_mock_questions_exam ON mock_exam_questions(mock_exam_id);
```

#### 15. Mock Exam Purchases

```sql
CREATE TABLE mock_exam_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id UUID REFERENCES olympiad_registrations(id) ON DELETE CASCADE,
    mock_exam_ids UUID[], -- Array of mock exam IDs
    purchase_type VARCHAR(50) NOT NULL, -- single, package
    amount_paid DECIMAL(10, 2) NOT NULL,
    payment_id UUID, -- Reference to payments
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);

CREATE INDEX idx_mock_purchases_registration ON mock_exam_purchases(registration_id);
```

#### 16. Mock Exam Attempts

```sql
CREATE TABLE mock_exam_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES mock_exam_purchases(id) ON DELETE CASCADE,
    mock_exam_id UUID REFERENCES mock_exams(id),
    registration_id UUID REFERENCES olympiad_registrations(id),
    started_at TIMESTAMP NOT NULL,
    submitted_at TIMESTAMP,
    score INT,
    total_questions INT,
    correct_answers INT,
    wrong_answers INT,
    time_spent_seconds INT,
    answers JSONB, -- Array of {question_id, answer, is_correct, points}
    detailed_results JSONB, -- Analysis by difficulty, topic, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_mock_attempts_purchase ON mock_exam_attempts(purchase_id);
CREATE INDEX idx_mock_attempts_registration ON mock_exam_attempts(registration_id);
```

### Leaderboard & Achievements

#### 17. Olympiad Leaderboard

```sql
CREATE TABLE olympiad_leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    olympiad_id UUID REFERENCES olympiads(id) ON DELETE CASCADE,
    registration_id UUID REFERENCES olympiad_registrations(id) ON DELETE CASCADE,
    participant_name VARCHAR(255) NOT NULL,
    school_name VARCHAR(255),
    direction VARCHAR(50),
    score INT NOT NULL,
    rank INT NOT NULL,
    achievement VARCHAR(50), -- gold, silver, bronze, participant
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(olympiad_id, registration_id)
);

CREATE INDEX idx_leaderboard_olympiad ON olympiad_leaderboard(olympiad_id, rank);
CREATE INDEX idx_leaderboard_achievement ON olympiad_leaderboard(achievement);
```

#### 18. Platform Leaderboard (for subscribed users)

```sql
CREATE TABLE platform_leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    direction_id UUID REFERENCES directions(id),
    total_points INT DEFAULT 0,
    rank INT,
    achievements JSONB, -- Array of achievement objects
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, direction_id)
);

CREATE INDEX idx_platform_leaderboard_rank ON platform_leaderboard(direction_id, rank);
```

### Certificates

#### 19. Certificates

```sql
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    olympiad_id UUID REFERENCES olympiads(id),
    registration_id UUID REFERENCES olympiad_registrations(id) ON DELETE CASCADE,
    certificate_type VARCHAR(50) NOT NULL, -- winner, participant
    rank INT,
    achievement VARCHAR(50), -- gold, silver, bronze
    certificate_url TEXT NOT NULL, -- PDF URL
    verification_code VARCHAR(50) UNIQUE NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_certificates_verification ON certificates(verification_code);
CREATE INDEX idx_certificates_registration ON certificates(registration_id);
```

### Payment System

#### 20. Payments

```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    registration_id UUID REFERENCES olympiad_registrations(id) ON DELETE SET NULL,
    payment_type VARCHAR(50) NOT NULL, -- subscription, olympiad_entry, mock_exam, teacher_booking
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'UZS',
    payment_method VARCHAR(50), -- card, cash, paypal
    payment_gateway VARCHAR(50), -- payme, click, uzcard
    transaction_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
    metadata JSONB, -- Additional payment info
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_type ON payments(payment_type);
CREATE INDEX idx_payments_transaction ON payments(transaction_id);
```

### Teacher Marketplace

#### 21. Teacher Profiles

```sql
CREATE TABLE teacher_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    bio TEXT,
    expertise JSONB, -- Array of subjects/topics
    education TEXT,
    experience_years INT,
    hourly_rate DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'UZS',
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    total_students INT DEFAULT 0,
    total_hours_taught INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    availability_json JSONB, -- Schedule availability
    video_intro_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_teacher_profiles_user ON teacher_profiles(user_id);
CREATE INDEX idx_teacher_profiles_verified ON teacher_profiles(is_verified);
CREATE INDEX idx_teacher_profiles_rating ON teacher_profiles(rating DESC);
```

#### 22. Bookings

```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMP NOT NULL,
    duration_minutes INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, completed, cancelled
    meeting_link TEXT,
    payment_id UUID REFERENCES payments(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_student ON bookings(student_id);
CREATE INDEX idx_bookings_teacher ON bookings(teacher_id);
CREATE INDEX idx_bookings_scheduled ON bookings(scheduled_at);
```

#### 23. Booking Reviews

```sql
CREATE TABLE booking_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE UNIQUE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_teacher ON booking_reviews(teacher_id);
CREATE INDEX idx_reviews_booking ON booking_reviews(booking_id);
```

## 🔧 API Architecture

### REST API Structure

```
/api
  /auth
    POST   /register
    POST   /login
    POST   /logout
    POST   /refresh-token
    POST   /verify-email
    POST   /forgot-password
    POST   /reset-password

  /public
    /olympiads
      GET    /           # List public olympiads
      GET    /:id        # Olympiad details
      POST   /:id/register
      GET    /:id/leaderboard
    /payments
      POST   /verify
      GET    /:id/receipt

  /student
    /subscriptions
      GET    /plans
      POST   /subscribe
      GET    /current
      PUT    /cancel
    /directions
      GET    /
      GET    /:id/courses
    /progress
      GET    /
      GET    /topic/:id
      POST   /topic/:id/start
    /skills
      POST   /submit
      GET    /:id/feedback
    /olympiads
      GET    /mine
      GET    /:id/start
      POST   /:id/submit
      GET    /:id/results
    /mocks
      GET    /available
      POST   /purchase
      GET    /:id/start
      POST   /:id/submit
      GET    /:id/results
    /certificates
      GET    /
      GET    /:id/download
    /marketplace
      GET    /teachers
      POST   /bookings
      GET    /bookings
      POST   /reviews

  /teacher
    /profile
      GET    /
      PUT    /
      PUT    /availability
    /bookings
      GET    /
      PUT    /:id/confirm
      PUT    /:id/complete
    /earnings
      GET    /
      GET    /stats

  /admin
    /directions
      CRUD operations
    /courses
      CRUD operations
    /olympiads
      CRUD operations
      POST   /:id/publish
      POST   /:id/mocks/generate
    /registrations
      GET    /
      GET    /:id
      PATCH  /:id/approve
      POST   /bulk-action
      GET    /export
    /mocks
      CRUD operations
      GET    /:id/analytics
    /payments
      GET    /
      GET    /:id
      POST   /:id/refund
      GET    /analytics
    /certificates
      POST   /olympiads/:id/generate
      GET    /generation-status/:jobId
      POST   /send-bulk
    /teachers
      GET    /pending
      PATCH  /:id/approve
    /analytics
      GET    /dashboard
      GET    /olympiads
      GET    /revenue
```

## 🔐 Security Requirements

### Authentication
- JWT-based authentication
- Access tokens (15 min expiry)
- Refresh tokens (7 days expiry)
- Password hashing with bcrypt (10+ rounds)

### Authorization
- Role-based access control (RBAC)
- Permission middleware
- Route guards

### Data Protection
- HTTPS only
- SQL injection prevention (parameterized queries)
- XSS protection
- CSRF tokens
- Rate limiting
- Input validation and sanitization

### Payment Security
- PCI DSS compliance
- Secure payment gateway integration
- No storage of card details
- Transaction encryption

## 📡 Real-time Features

### WebSocket Events

```javascript
// Student events
student:progress:updated
student:test:submitted
student:olympiad:started

// Olympiad events
olympiad:leaderboard:updated
olympiad:time:warning
olympiad:completed

// Marketplace events
booking:confirmed
booking:reminder
```

## 🎯 Performance Requirements

### Response Times
- API endpoints: < 200ms (95th percentile)
- Page load: < 2s (First Contentful Paint)
- Search queries: < 100ms

### Scalability
- Support 10,000+ concurrent users
- Handle 100+ requests/second
- Database query optimization (proper indexing)

### Caching Strategy
- Redis for session storage
- Cache frequently accessed data
- CDN for static assets

## 📦 File Storage Structure

```
/uploads
  /avatars
    /{user_id}/avatar.jpg
  /courses
    /{course_id}/thumbnail.jpg
    /{course_id}/videos/
  /submissions
    /audio/{submission_id}.mp3
    /video/{submission_id}.mp4
  /certificates
    /{certificate_id}.pdf
  /receipts
    /{payment_id}.pdf
```

## 🧪 Testing Requirements

### Unit Tests
- All business logic
- Utility functions
- Target: 80%+ code coverage

### Integration Tests
- API endpoints
- Database operations
- Payment flows

### E2E Tests
- Critical user journeys
- Olympiad flow
- Subscription flow
- Payment processing

## 🚀 Deployment Architecture

### Development
- Local development environment
- Docker Compose setup
- Hot reload enabled

### Staging
- AWS/DigitalOcean
- Separate database
- Payment gateway test mode

### Production
- Load-balanced servers
- PostgreSQL with replication
- Redis cluster
- S3 for file storage
- CloudFront CDN
- Automated backups
- Monitoring & logging

## 📊 Monitoring & Analytics

### Application Monitoring
- Error tracking (Sentry)
- Performance monitoring (New Relic / DataDog)
- Uptime monitoring

### Business Analytics
- User behavior tracking
- Conversion funnels
- Revenue tracking
- A/B testing capability

### Logging
- Centralized logging (ELK stack)
- Request/Response logging
- Error logging
- Audit trails for admin actions

## 🔄 Data Backup & Recovery

- Daily automated backups
- Point-in-time recovery
- Backup retention: 30 days
- Disaster recovery plan
- Regular backup testing

## 🌍 Internationalization (Future)

- Multi-language support (Uzbek, Russian, English)
- Currency handling
- Date/Time localization
- RTL support (if needed)
