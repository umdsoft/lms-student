# API Specification - LMS Platform

## 📋 Overview

This document provides a comprehensive specification of all API endpoints in the LMS platform.

### Base URLs

```
Development: http://localhost:3000/api
Staging:     https://staging-api.lmsplatform.uz/api
Production:  https://api.lmsplatform.uz/api
```

### Authentication

Most endpoints require JWT authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Response Format

All responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Success message",
  "timestamp": "2024-03-20T10:30:00Z"
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": { ... }
  },
  "timestamp": "2024-03-20T10:30:00Z"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

---

## 🔐 Authentication Endpoints

### POST /auth/register

Register a new user account.

**Request:**
```json
{
  "email": "student@example.com",
  "password": "SecurePass123!",
  "fullName": "Alisher Karimov",
  "phone": "+998901234567",
  "role": "student"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@example.com",
      "fullName": "Alisher Karimov",
      "role": "student",
      "emailVerified": false
    },
    "tokens": {
      "accessToken": "jwt_token",
      "refreshToken": "refresh_token",
      "expiresIn": 900
    }
  }
}
```

---

### POST /auth/login

Authenticate user and receive tokens.

**Request:**
```json
{
  "email": "student@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "student@example.com",
      "fullName": "Alisher Karimov",
      "role": "student",
      "avatar": "https://..."
    },
    "tokens": {
      "accessToken": "jwt_token",
      "refreshToken": "refresh_token",
      "expiresIn": 900
    }
  }
}
```

---

### POST /auth/refresh-token

Refresh access token using refresh token.

**Request:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_token",
    "expiresIn": 900
  }
}
```

---

### POST /auth/verify-email

Verify email address using token sent to email.

**Request:**
```json
{
  "token": "verification_token"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

## 🌍 Public Endpoints (No Auth Required)

### GET /public/olympiads

Get list of public olympiads.

**Query Parameters:**
- `direction` - Filter by direction (math, english, programming)
- `status` - Filter by status (upcoming, ongoing, completed)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Request:**
```
GET /public/olympiads?direction=math&status=upcoming&page=1&limit=10
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "olympiads": [
      {
        "id": "uuid",
        "title": "Spring Math Competition 2024",
        "description": "Annual mathematics competition...",
        "direction": "math",
        "entryFee": 75000,
        "currency": "UZS",
        "startDate": "2024-03-25T10:00:00Z",
        "endDate": "2024-03-25T11:30:00Z",
        "registrationDeadline": "2024-03-20T23:59:59Z",
        "durationMinutes": 90,
        "maxParticipants": 500,
        "currentParticipants": 234,
        "difficulty": "medium",
        "isPublished": true
      }
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
}
```

---

### GET /public/olympiads/:id

Get olympiad details.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "olympiad": {
      "id": "uuid",
      "title": "Spring Math Competition 2024",
      "description": "Annual mathematics competition...",
      "direction": "math",
      "entryFee": 75000,
      "currency": "UZS",
      "startDate": "2024-03-25T10:00:00Z",
      "endDate": "2024-03-25T11:30:00Z",
      "registrationDeadline": "2024-03-20T23:59:59Z",
      "durationMinutes": 90,
      "maxParticipants": 500,
      "currentParticipants": 234,
      "difficulty": "medium",
      "totalQuestions": 40,
      "maxScore": 100
    },
    "sampleQuestions": [
      {
        "id": "uuid",
        "questionText": "Solve the equation: 2x² + 5x - 3 = 0",
        "questionType": "mcq",
        "options": ["x = 1 or x = -3", "x = 0.5 or x = -3"],
        "difficulty": "medium"
      }
    ],
    "stats": {
      "totalRegistrations": 234,
      "availableSlots": 266,
      "averageMockScore": 76.5
    }
  }
}
```

---

### POST /public/olympiads/:id/register

Register for a public olympiad (guest registration).

**Request:**
```json
{
  "fullName": "Alisher Karimov",
  "schoolName": "25-son maktab",
  "grade": 9,
  "direction": "math",
  "parentPhone": "+998901234567",
  "email": "alisher@example.com"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "registrationId": "uuid",
    "olympiadId": "uuid",
    "fullName": "Alisher Karimov",
    "email": "alisher@example.com",
    "paymentRequired": true,
    "paymentAmount": 75000,
    "paymentUrl": "https://payment-gateway.com/pay/xxx",
    "registeredAt": "2024-03-15T14:23:00Z"
  },
  "message": "Registration created. Please complete payment."
}
```

---

### GET /public/olympiads/:id/leaderboard

Get olympiad leaderboard (public).

**Query Parameters:**
- `limit` - Number of entries (default: 100)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "olympiad": {
      "id": "uuid",
      "title": "Spring Math Competition 2024",
      "completedAt": "2024-03-25T11:30:00Z"
    },
    "leaderboard": [
      {
        "rank": 1,
        "participantName": "Sardor Toshmatov",
        "schoolName": "25-son maktab",
        "direction": "math",
        "score": 100,
        "maxScore": 100,
        "achievement": "gold"
      },
      {
        "rank": 2,
        "participantName": "Alisher Karimov",
        "schoolName": "25-son maktab",
        "direction": "math",
        "score": 98,
        "maxScore": 100,
        "achievement": "silver"
      }
    ],
    "stats": {
      "totalParticipants": 234,
      "averageScore": 74.5,
      "passingScore": 70
    }
  }
}
```

---

### POST /public/payments/verify

Verify payment status.

**Request:**
```json
{
  "paymentId": "payment_uuid",
  "transactionId": "gateway_transaction_id"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "paymentId": "uuid",
    "status": "completed",
    "amount": 75000,
    "currency": "UZS",
    "paidAt": "2024-03-15T14:25:00Z",
    "receiptUrl": "https://api.../receipts/xxx.pdf"
  }
}
```

---

## 👤 Student Endpoints (Auth Required)

### GET /student/subscriptions/plans

Get available subscription plans.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "plans": [
      {
        "id": "uuid",
        "name": "Oylik obuna",
        "slug": "monthly",
        "durationDays": 30,
        "price": 99000,
        "currency": "UZS",
        "features": [
          "Barcha kurslar va testlarga kirish",
          "AI feedback",
          "Olimpiadalar (bepul)",
          "Progress tracking"
        ],
        "isActive": true
      },
      {
        "id": "uuid",
        "name": "Yillik obuna",
        "slug": "yearly",
        "durationDays": 365,
        "price": 990000,
        "currency": "UZS",
        "savings": 198000,
        "features": [
          "Barcha kurslar va testlarga kirish",
          "AI feedback",
          "Olimpiadalar (bepul)",
          "Progress tracking",
          "2 oy bepul",
          "20% tejash"
        ],
        "isActive": true,
        "recommended": true
      }
    ]
  }
}
```

---

### POST /student/subscriptions/subscribe

Subscribe to a plan.

**Request:**
```json
{
  "planId": "uuid",
  "paymentMethod": "payme"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "subscriptionId": "uuid",
    "planId": "uuid",
    "userId": "uuid",
    "startDate": "2024-03-20T00:00:00Z",
    "endDate": "2024-04-20T00:00:00Z",
    "isActive": true,
    "paymentUrl": "https://payment-gateway.com/pay/xxx"
  },
  "message": "Please complete payment to activate subscription"
}
```

---

### GET /student/subscriptions/current

Get current active subscription.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "uuid",
      "plan": {
        "name": "Yillik obuna",
        "durationDays": 365
      },
      "startDate": "2024-01-01T00:00:00Z",
      "endDate": "2025-01-01T00:00:00Z",
      "isActive": true,
      "autoRenew": true,
      "daysRemaining": 286
    }
  }
}
```

---

### GET /student/directions

Get available learning directions.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "directions": [
      {
        "id": "uuid",
        "name": "Matematika",
        "slug": "math",
        "description": "Algebra, Geometriya, Trigonometriya",
        "iconUrl": "https://...",
        "colorPrimary": "#3B82F6",
        "colorSecondary": "#1D4ED8",
        "totalCourses": 25,
        "isActive": true
      },
      {
        "id": "uuid",
        "name": "Ingliz tili",
        "slug": "english",
        "description": "Speaking, Writing, Reading, Listening",
        "iconUrl": "https://...",
        "colorPrimary": "#10B981",
        "colorSecondary": "#059669",
        "totalCourses": 30,
        "isActive": true
      }
    ]
  }
}
```

---

### GET /student/directions/:id/courses

Get courses for a direction.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "direction": {
      "id": "uuid",
      "name": "Matematika",
      "slug": "math"
    },
    "courses": [
      {
        "id": "uuid",
        "title": "Algebra Fundamentals",
        "description": "Basic algebra concepts...",
        "level": "beginner",
        "thumbnailUrl": "https://...",
        "totalTopics": 15,
        "completedTopics": 3,
        "progressPercentage": 20,
        "isPublished": true
      }
    ]
  }
}
```

---

### GET /student/progress

Get student's overall progress.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "overall": {
      "totalTopics": 70,
      "completedTopics": 12,
      "progressPercentage": 17,
      "averageScore": 82.5
    },
    "byDirection": [
      {
        "directionId": "uuid",
        "directionName": "Matematika",
        "totalTopics": 25,
        "completedTopics": 3,
        "progressPercentage": 12,
        "averageScore": 85
      },
      {
        "directionId": "uuid",
        "directionName": "Ingliz tili",
        "totalTopics": 30,
        "completedTopics": 2,
        "progressPercentage": 7,
        "averageScore": 78
      }
    ],
    "currentTopics": [
      {
        "topicId": "uuid",
        "topicTitle": "Kvadrat tenglamalar",
        "courseTitle": "Algebra Fundamentals",
        "progressPercentage": 45,
        "lastActivityAt": "2024-03-20T10:30:00Z"
      }
    ]
  }
}
```

---

### GET /student/progress/topic/:id

Get progress for a specific topic.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "topic": {
      "id": "uuid",
      "title": "Kvadrat tenglamalar",
      "description": "Learn to solve quadratic equations",
      "minScoreToPass": 75
    },
    "progress": {
      "isCompleted": false,
      "score": 45,
      "attempts": 2,
      "startedAt": "2024-03-15T10:00:00Z",
      "lockedUntil": null
    },
    "requirements": [
      {
        "id": "uuid",
        "requirementType": "theory",
        "title": "Nazariya",
        "isCompleted": true,
        "score": 90,
        "minScore": 70
      },
      {
        "id": "uuid",
        "requirementType": "practice",
        "title": "Amaliy masalalar",
        "isCompleted": false,
        "score": 50,
        "minScore": 75,
        "completedCount": 5,
        "totalCount": 10
      }
    ]
  }
}
```

---

### POST /student/progress/topic/:id/start

Start working on a topic.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "progressId": "uuid",
    "topicId": "uuid",
    "startedAt": "2024-03-20T10:30:00Z"
  },
  "message": "Topic started successfully"
}
```

---

### POST /student/skills/submit

Submit a skill test (for English topics).

**Request (Speaking):**
```json
{
  "topicId": "uuid",
  "requirementId": "uuid",
  "skillType": "speaking",
  "submissionType": "audio",
  "contentUrl": "https://s3.../audio/submission123.mp3",
  "metadata": {
    "duration": 105,
    "fileSize": 2048000
  }
}
```

**Request (Writing):**
```json
{
  "topicId": "uuid",
  "requirementId": "uuid",
  "skillType": "writing",
  "submissionType": "text",
  "content": "My essay text goes here...",
  "metadata": {
    "wordCount": 250
  }
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "submissionId": "uuid",
    "status": "pending",
    "estimatedEvaluationTime": "2-3 minutes",
    "submittedAt": "2024-03-20T10:35:00Z"
  },
  "message": "Submission received. AI evaluation in progress."
}
```

---

### GET /student/skills/:id/feedback

Get AI feedback for a skill submission.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "submission": {
      "id": "uuid",
      "skillType": "speaking",
      "status": "evaluated",
      "score": 85,
      "maxScore": 100
    },
    "feedback": {
      "overall": "Very good! Clear and natural pronunciation.",
      "breakdown": {
        "pronunciation": {
          "score": 90,
          "comment": "Excellent pronunciation. Clear articulation."
        },
        "grammar": {
          "score": 80,
          "comment": "Good grammar. Minor errors with articles.",
          "errors": [
            {
              "text": "I went to the school",
              "correction": "I went to school",
              "rule": "No article needed for general places"
            }
          ]
        },
        "vocabulary": {
          "score": 85,
          "comment": "Good range of vocabulary used."
        },
        "fluency": {
          "score": 85,
          "comment": "Natural pace with few pauses."
        }
      },
      "suggestions": [
        "Practice using 'since' and 'for' with Present Perfect",
        "Work on article usage (a/an/the)"
      ]
    },
    "transcript": "I have visited the park recently. I went there last week...",
    "evaluatedAt": "2024-03-20T10:37:00Z"
  }
}
```

---

### GET /student/olympiads/mine

Get student's olympiad registrations.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "upcoming": [
      {
        "registrationId": "uuid",
        "olympiad": {
          "id": "uuid",
          "title": "Spring Math Competition 2024",
          "startDate": "2024-03-25T10:00:00Z",
          "durationMinutes": 90,
          "direction": "math"
        },
        "direction": "math",
        "registeredAt": "2024-03-15T14:23:00Z",
        "paymentStatus": "paid",
        "daysRemaining": 5
      }
    ],
    "ongoing": [],
    "completed": [
      {
        "registrationId": "uuid",
        "olympiad": {
          "id": "uuid",
          "title": "Winter English Challenge 2024",
          "completedAt": "2024-02-15T12:00:00Z"
        },
        "score": 85,
        "rank": 12,
        "achievement": "participant",
        "certificateUrl": "https://...certificate.pdf"
      }
    ]
  }
}
```

---

### GET /student/mocks/available

Get available mock exams for registered olympiads.

**Query Parameters:**
- `registrationId` - Filter by olympiad registration

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "registration": {
      "id": "uuid",
      "olympiadTitle": "Spring Math Competition 2024"
    },
    "availableMocks": [
      {
        "id": "uuid",
        "title": "Mock Exam #1",
        "totalQuestions": 30,
        "durationMinutes": 60,
        "price": 15000,
        "currency": "UZS",
        "difficulty": "medium"
      }
    ],
    "packageOffer": {
      "mockCount": 5,
      "regularPrice": 75000,
      "packagePrice": 40000,
      "savings": 35000,
      "savingsPercentage": 47
    },
    "purchasedMocks": [
      {
        "purchaseId": "uuid",
        "mockExams": [
          {
            "id": "uuid",
            "title": "Mock Exam #1",
            "attempts": 1,
            "bestScore": 85,
            "status": "completed"
          },
          {
            "id": "uuid",
            "title": "Mock Exam #2",
            "attempts": 0,
            "status": "available"
          }
        ],
        "purchaseType": "package",
        "purchasedAt": "2024-03-16T10:00:00Z"
      }
    ]
  }
}
```

---

### POST /student/mocks/purchase

Purchase mock exams.

**Request (Single):**
```json
{
  "registrationId": "uuid",
  "mockExamIds": ["uuid"],
  "purchaseType": "single"
}
```

**Request (Package):**
```json
{
  "registrationId": "uuid",
  "mockExamIds": ["uuid1", "uuid2", "uuid3", "uuid4", "uuid5"],
  "purchaseType": "package"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "purchaseId": "uuid",
    "mockExamIds": ["uuid1", "uuid2", "uuid3", "uuid4", "uuid5"],
    "purchaseType": "package",
    "amount": 40000,
    "currency": "UZS",
    "paymentUrl": "https://payment-gateway.com/pay/xxx"
  },
  "message": "Please complete payment"
}
```

---

### GET /student/mocks/:id/start

Start a mock exam.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "attemptId": "uuid",
    "mockExam": {
      "id": "uuid",
      "title": "Mock Exam #1",
      "durationMinutes": 60,
      "totalQuestions": 30
    },
    "questions": [
      {
        "id": "uuid",
        "questionText": "Solve: 2x² + 5x - 3 = 0",
        "questionType": "mcq",
        "options": [
          "x = 1 or x = -3",
          "x = 0.5 or x = -3",
          "x = -1 or x = 3",
          "x = -0.5 or x = 3"
        ],
        "points": 2,
        "difficulty": "medium",
        "displayOrder": 1
      }
    ],
    "startedAt": "2024-03-20T11:00:00Z",
    "endsAt": "2024-03-20T12:00:00Z"
  }
}
```

---

### POST /student/mocks/:id/submit

Submit mock exam answers.

**Request:**
```json
{
  "attemptId": "uuid",
  "answers": [
    {
      "questionId": "uuid",
      "answer": "x = 0.5 or x = -3"
    },
    {
      "questionId": "uuid",
      "answer": "42"
    }
  ],
  "timeSpentSeconds": 3420
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "attemptId": "uuid",
    "score": 25,
    "totalQuestions": 30,
    "correctAnswers": 25,
    "wrongAnswers": 5,
    "percentage": 83,
    "timeSpentSeconds": 3420,
    "submittedAt": "2024-03-20T11:57:00Z",
    "resultsUrl": "/student/mocks/attempts/uuid/results"
  },
  "message": "Mock exam submitted successfully"
}
```

---

### GET /student/mocks/attempts/:id/results

Get detailed results for a mock exam attempt.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "attempt": {
      "id": "uuid",
      "mockExamTitle": "Mock Exam #1",
      "score": 25,
      "totalQuestions": 30,
      "correctAnswers": 25,
      "wrongAnswers": 5,
      "percentage": 83,
      "timeSpentSeconds": 3420,
      "submittedAt": "2024-03-20T11:57:00Z"
    },
    "analysis": {
      "byDifficulty": {
        "easy": {
          "total": 10,
          "correct": 10,
          "percentage": 100
        },
        "medium": {
          "total": 15,
          "correct": 12,
          "percentage": 80
        },
        "hard": {
          "total": 5,
          "correct": 3,
          "percentage": 60
        }
      },
      "byTopic": {
        "Algebra": {
          "total": 10,
          "correct": 8,
          "percentage": 80
        },
        "Geometriya": {
          "total": 10,
          "correct": 9,
          "percentage": 90
        },
        "Trigonometriya": {
          "total": 10,
          "correct": 8,
          "percentage": 80
        }
      },
      "timeAnalysis": {
        "averageTimePerQuestion": 114,
        "fastestQuestion": 30,
        "slowestQuestion": 252
      }
    },
    "strengths": [
      "Geometrik masalalar",
      "Tenglamalar yechish"
    ],
    "weaknesses": [
      "Murakkab funksiyalar",
      "Logarifmlar"
    ],
    "recommendations": [
      "Logarifm mavzusini qayta ishlang",
      "Qiyin savollarga ko'proq vaqt ajrating"
    ],
    "wrongAnswers": [
      {
        "questionId": "uuid",
        "questionText": "Solve: log₂(x) = 3",
        "yourAnswer": "6",
        "correctAnswer": "8",
        "explanation": "log₂(x) = 3 means 2³ = x, therefore x = 8",
        "videoExplanationUrl": "https://..."
      }
    ],
    "pdfReportUrl": "https://...report.pdf"
  }
}
```

---

### GET /student/olympiads/:id/start

Start taking an olympiad test.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "participantId": "uuid",
    "olympiad": {
      "id": "uuid",
      "title": "Spring Math Competition 2024",
      "durationMinutes": 90,
      "totalQuestions": 40,
      "maxScore": 100
    },
    "questions": [
      {
        "id": "uuid",
        "questionText": "Calculate the derivative of f(x) = x³",
        "questionType": "mcq",
        "options": ["3x²", "x²", "3x", "x³"],
        "points": 2,
        "displayOrder": 1
      }
    ],
    "startedAt": "2024-03-25T10:00:00Z",
    "endsAt": "2024-03-25T11:30:00Z"
  }
}
```

---

### POST /student/olympiads/:id/submit

Submit olympiad answers.

**Request:**
```json
{
  "participantId": "uuid",
  "answers": [
    {
      "questionId": "uuid",
      "answer": "3x²"
    }
  ],
  "timeSpentSeconds": 5200
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "participantId": "uuid",
    "submittedAt": "2024-03-25T11:26:40Z",
    "estimatedResultsDate": "2024-03-26T10:00:00Z"
  },
  "message": "Olympiad submitted successfully. Results will be available within 24 hours."
}
```

---

### GET /student/olympiads/:id/results

Get olympiad results.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "olympiad": {
      "id": "uuid",
      "title": "Spring Math Competition 2024",
      "completedAt": "2024-03-25T11:30:00Z"
    },
    "result": {
      "score": 98,
      "maxScore": 100,
      "percentage": 98,
      "rank": 2,
      "totalParticipants": 234,
      "achievement": "silver",
      "certificateUrl": "https://...certificate.pdf"
    },
    "feedback": {
      "overall": "Excellent performance! You scored 98 out of 100.",
      "strengths": ["Algebra", "Geometry"],
      "weaknesses": ["Complex numbers"],
      "recommendations": ["Review complex number operations"]
    }
  }
}
```

---

### GET /student/certificates

Get all certificates earned by student.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "certificates": [
      {
        "id": "uuid",
        "olympiadTitle": "Spring Math Competition 2024",
        "certificateType": "winner",
        "rank": 2,
        "achievement": "silver",
        "certificateUrl": "https://...certificate.pdf",
        "verificationCode": "CERT-2024-001234",
        "issuedAt": "2024-03-26T10:00:00Z"
      }
    ]
  }
}
```

---

### GET /student/certificates/:id/download

Download certificate PDF.

**Response:** `200 OK` (PDF file)

---

## 👨‍🏫 Teacher Endpoints

### GET /teacher/profile

Get teacher profile.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "uuid",
      "userId": "uuid",
      "bio": "Experienced math teacher with 10 years...",
      "expertise": ["Matematika", "Fizika"],
      "education": "Master's in Mathematics Education",
      "experienceYears": 10,
      "hourlyRate": 50000,
      "currency": "UZS",
      "rating": 4.9,
      "totalReviews": 15,
      "totalStudents": 45,
      "totalHoursTaught": 120,
      "isVerified": true,
      "isAvailable": true,
      "videoIntroUrl": "https://..."
    }
  }
}
```

---

### PUT /teacher/profile

Update teacher profile.

**Request:**
```json
{
  "bio": "Updated bio...",
  "expertise": ["Matematika", "Fizika", "Algebra"],
  "hourlyRate": 55000,
  "isAvailable": true
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "profile": { ... }
  },
  "message": "Profile updated successfully"
}
```

---

### GET /teacher/bookings

Get teacher's bookings.

**Query Parameters:**
- `status` - Filter by status (pending, confirmed, completed, cancelled)
- `from` - Date from
- `to` - Date to

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "uuid",
        "student": {
          "id": "uuid",
          "fullName": "Alisher Karimov",
          "avatar": "https://..."
        },
        "scheduledAt": "2024-03-20T14:00:00Z",
        "durationMinutes": 60,
        "price": 50000,
        "status": "confirmed",
        "meetingLink": "https://meet.jit.si/room-xxx",
        "notes": "Need help with quadratic equations",
        "createdAt": "2024-03-18T10:00:00Z"
      }
    ],
    "summary": {
      "total": 24,
      "pending": 2,
      "confirmed": 5,
      "completed": 15,
      "cancelled": 2
    }
  }
}
```

---

### PUT /teacher/bookings/:id/confirm

Confirm a booking.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "uuid",
      "status": "confirmed",
      "meetingLink": "https://meet.jit.si/room-xxx",
      "confirmedAt": "2024-03-20T10:30:00Z"
    }
  },
  "message": "Booking confirmed successfully"
}
```

---

### GET /teacher/earnings

Get teacher's earnings.

**Query Parameters:**
- `from` - Date from
- `to` - Date to

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalEarnings": 1200000,
      "platformFee": 240000,
      "netEarnings": 960000,
      "pendingPayouts": 120000,
      "currency": "UZS"
    },
    "monthly": [
      {
        "month": "2024-03",
        "earnings": 450000,
        "platformFee": 90000,
        "netEarnings": 360000,
        "bookings": 9
      }
    ],
    "recentPayouts": [
      {
        "id": "uuid",
        "amount": 360000,
        "paidAt": "2024-03-01T00:00:00Z",
        "method": "bank_transfer"
      }
    ]
  }
}
```

---

## 🛡️ Admin Endpoints

### GET /admin/olympiads

Get all olympiads (admin view).

**Query Parameters:**
- `type` - Filter by type (platform, public)
- `status` - Filter by status
- `page`, `limit` - Pagination

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "olympiads": [
      {
        "id": "uuid",
        "title": "Spring Math Competition 2024",
        "olympiadType": "public",
        "direction": "math",
        "entryFee": 75000,
        "startDate": "2024-03-25T10:00:00Z",
        "isPublished": true,
        "stats": {
          "totalRegistrations": 234,
          "paidRegistrations": 230,
          "revenue": 17250000,
          "mocksSold": 89
        }
      }
    ],
    "summary": {
      "totalOlympiads": 45,
      "upcoming": 12,
      "ongoing": 2,
      "completed": 31,
      "totalRevenue": 95000000
    }
  }
}
```

---

### POST /admin/olympiads

Create a new olympiad.

**Request:**
```json
{
  "title": "Spring Math Competition 2024",
  "description": "Annual mathematics competition...",
  "directionId": "uuid",
  "olympiadType": "public",
  "entryFee": 75000,
  "startDate": "2024-03-25T10:00:00Z",
  "endDate": "2024-03-25T11:30:00Z",
  "registrationDeadline": "2024-03-20T23:59:59Z",
  "durationMinutes": 90,
  "maxParticipants": 500,
  "difficulty": "medium"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "olympiadId": "uuid",
    "title": "Spring Math Competition 2024",
    "isPublished": false
  },
  "message": "Olympiad created successfully. Add questions and publish."
}
```

---

### POST /admin/olympiads/:id/mocks/generate

Generate mock exams for an olympiad.

**Request:**
```json
{
  "mockCount": 5,
  "questionsPerMock": 30,
  "durationMinutes": 60,
  "mockPrice": 15000,
  "packagePrice": 40000,
  "difficultyDistribution": {
    "easy": 40,
    "medium": 40,
    "hard": 20
  }
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "mocksGenerated": [
      {
        "id": "uuid",
        "title": "Mock Exam #1",
        "totalQuestions": 30,
        "price": 15000
      }
    ],
    "packageOffer": {
      "regularPrice": 75000,
      "packagePrice": 40000,
      "savings": 35000
    }
  },
  "message": "5 mock exams generated successfully"
}
```

---

### GET /admin/olympiads/:id/registrations

Get registrations for an olympiad.

**Query Parameters:**
- `paymentStatus` - Filter by payment status
- `direction` - Filter by direction
- `school` - Filter by school name
- `grade` - Filter by grade
- `page`, `limit` - Pagination

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "olympiad": {
      "id": "uuid",
      "title": "Spring Math Competition 2024"
    },
    "stats": {
      "total": 234,
      "paid": 230,
      "pending": 4,
      "totalRevenue": 17250000,
      "mocksSold": 89,
      "mockRevenue": 3560000
    },
    "registrations": [
      {
        "id": "uuid",
        "fullName": "Alisher Karimov",
        "schoolName": "25-son maktab",
        "grade": 9,
        "direction": "math",
        "email": "alisher@example.com",
        "parentPhone": "+998901234567",
        "paymentStatus": "paid",
        "paymentAmount": 75000,
        "paidAt": "2024-03-15T14:25:00Z",
        "mocksPurchased": {
          "type": "package",
          "count": 5,
          "completed": 2
        },
        "registeredAt": "2024-03-15T14:23:00Z"
      }
    ],
    "pagination": {
      "total": 234,
      "page": 1,
      "limit": 20,
      "totalPages": 12
    }
  }
}
```

---

### GET /admin/payments

Get all payments.

**Query Parameters:**
- `type` - Filter by payment type
- `status` - Filter by status
- `from`, `to` - Date range
- `page`, `limit` - Pagination

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalAmount": 187680000,
      "totalTransactions": 3159,
      "byType": {
        "subscription": 87360000,
        "olympiad_entry": 90150000,
        "mock_exam": 5720000,
        "teacher_booking": 4450000
      },
      "byStatus": {
        "completed": 3100,
        "pending": 45,
        "failed": 14
      }
    },
    "payments": [
      {
        "id": "uuid",
        "userId": "uuid",
        "userName": "Alisher Karimov",
        "paymentType": "olympiad_entry",
        "amount": 75000,
        "currency": "UZS",
        "paymentMethod": "payme",
        "transactionId": "payme_1234567890",
        "status": "completed",
        "paidAt": "2024-03-20T14:23:45Z"
      }
    ]
  }
}
```

---

### POST /admin/olympiads/:id/generate-certificates

Generate certificates for olympiad participants.

**Request:**
```json
{
  "template": "classic",
  "criteria": {
    "gold": { "topN": 3, "minScore": 95 },
    "silver": { "topN": 10, "minScore": 85 },
    "bronze": { "topN": 20, "minScore": 75 },
    "participant": { "all": true }
  }
}
```

**Response:** `202 Accepted`
```json
{
  "success": true,
  "data": {
    "jobId": "uuid",
    "estimatedTime": "5-10 minutes",
    "totalCertificates": 234
  },
  "message": "Certificate generation started"
}
```

---

### GET /admin/analytics/dashboard

Get admin dashboard analytics.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "kpis": {
      "totalUsers": 1456,
      "activeSubscriptions": 1200,
      "monthlyRevenue": 15620000,
      "totalOlympiads": 45
    },
    "recentActivity": [
      {
        "type": "new_registration",
        "user": "Alisher Karimov",
        "olympiad": "Spring Math Competition",
        "timestamp": "2024-03-20T14:23:00Z"
      }
    ],
    "alerts": [
      {
        "type": "low_stock",
        "message": "Spring Math Competition - only 20 slots remaining",
        "severity": "warning"
      }
    ]
  }
}
```

---

## 📊 Error Codes

| Code | Description |
|------|-------------|
| `AUTH_INVALID_CREDENTIALS` | Invalid email or password |
| `AUTH_TOKEN_EXPIRED` | Access token has expired |
| `AUTH_TOKEN_INVALID` | Invalid or malformed token |
| `USER_NOT_FOUND` | User does not exist |
| `USER_ALREADY_EXISTS` | Email already registered |
| `SUBSCRIPTION_REQUIRED` | Active subscription required |
| `SUBSCRIPTION_EXPIRED` | Subscription has expired |
| `PAYMENT_FAILED` | Payment processing failed |
| `PAYMENT_PENDING` | Payment is pending |
| `OLYMPIAD_NOT_FOUND` | Olympiad does not exist |
| `OLYMPIAD_FULL` | Olympiad has reached max participants |
| `OLYMPIAD_CLOSED` | Registration deadline passed |
| `REGISTRATION_NOT_FOUND` | Registration does not exist |
| `MOCK_NOT_PURCHASED` | Mock exam not purchased |
| `MOCK_ALREADY_TAKEN` | Mock exam already completed |
| `TEST_NOT_STARTED` | Test has not started yet |
| `TEST_ALREADY_SUBMITTED` | Test already submitted |
| `INSUFFICIENT_SCORE` | Score below minimum required |
| `TOPIC_LOCKED` | Previous topic not completed |
| `VALIDATION_ERROR` | Input validation failed |
| `SERVER_ERROR` | Internal server error |

---

## 🔒 Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Public endpoints**: 100 requests per 15 minutes per IP
- **Authenticated endpoints**: 500 requests per 15 minutes per user
- **Payment endpoints**: 10 requests per minute per user

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1616161200
```

---

## 📚 Pagination

List endpoints support pagination with the following query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

Pagination information is included in responses:

```json
{
  "pagination": {
    "total": 234,
    "page": 1,
    "limit": 10,
    "totalPages": 24,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 🔍 Filtering & Sorting

Many list endpoints support filtering and sorting:

**Filtering:**
```
GET /api/student/olympiads?direction=math&status=upcoming
```

**Sorting:**
```
GET /api/admin/payments?sort=amount&order=desc
```

Available sort orders: `asc`, `desc`

---

This API specification provides a comprehensive guide for integrating with the LMS platform. For additional support or questions, contact the development team.
