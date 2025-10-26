# Design System - LMS Platform

## 🎨 Overview

This document defines the visual language, design principles, and component specifications for the LMS Platform. Consistency across all interfaces is crucial for user experience and brand identity.

---

## 🎯 Design Principles

### 1. Clarity
- Clear visual hierarchy
- Obvious interactive elements
- Straightforward navigation
- Minimal cognitive load

### 2. Consistency
- Uniform patterns across the platform
- Predictable interactions
- Coherent visual language
- Reusable components

### 3. Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast ratios
- Responsive design

### 4. Performance
- Fast loading times
- Smooth animations
- Optimized assets
- Progressive enhancement

### 5. Engagement
- Motivational design
- Gamification elements
- Progress visualization
- Positive feedback

---

## 🎨 Color System

### Primary Colors (Direction-Based)

#### Mathematics
```css
--math-primary: #3B82F6;     /* Blue 500 */
--math-primary-dark: #1D4ED8; /* Blue 700 */
--math-primary-light: #60A5FA; /* Blue 400 */
--math-background: #EFF6FF;   /* Blue 50 */
```

Gradient:
```css
background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
```

#### English
```css
--english-primary: #10B981;     /* Green 500 */
--english-primary-dark: #059669; /* Green 700 */
--english-primary-light: #34D399; /* Green 400 */
--english-background: #ECFDF5;   /* Green 50 */
```

Gradient:
```css
background: linear-gradient(135deg, #10B981 0%, #059669 100%);
```

#### Programming
```css
--programming-primary: #8B5CF6;     /* Purple 500 */
--programming-primary-dark: #6D28D9; /* Purple 700 */
--programming-primary-light: #A78BFA; /* Purple 400 */
--programming-background: #F5F3FF;   /* Purple 50 */
```

Gradient:
```css
background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
```

#### Olympiad
```css
--olympiad-primary: #F59E0B;     /* Amber 500 */
--olympiad-secondary: #DC2626;   /* Red 600 */
--olympiad-light: #FCD34D;       /* Amber 300 */
--olympiad-background: #FFFBEB;  /* Amber 50 */
```

Gradient:
```css
background: linear-gradient(135deg, #F59E0B 0%, #DC2626 100%);
```

### Neutral Colors

```css
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;

--white: #FFFFFF;
--black: #000000;
```

### Semantic Colors

```css
/* Success */
--success-50: #ECFDF5;
--success-500: #10B981;
--success-700: #047857;

/* Warning */
--warning-50: #FFFBEB;
--warning-500: #F59E0B;
--warning-700: #B45309;

/* Error */
--error-50: #FEF2F2;
--error-500: #EF4444;
--error-700: #B91C1C;

/* Info */
--info-50: #EFF6FF;
--info-500: #3B82F6;
--info-700: #1D4ED8;
```

### Usage Guidelines

**Primary Actions:**
- Use direction-specific primary colors
- Example: "Start Learning" button in Math section uses `--math-primary`

**Secondary Actions:**
- Use gray-600 or gray-700
- Example: "Cancel" or "Back" buttons

**Danger Actions:**
- Use error-500
- Example: "Delete Account", "Submit and Finalize"

**Text Colors:**
- Primary text: gray-900
- Secondary text: gray-600
- Disabled text: gray-400
- Link text: Direction primary color

---

## 📐 Typography

### Font Families

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
                sans-serif;
--font-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
                sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

### Font Sizes

```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
```

### Font Weights

```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Line Heights

```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### Typography Scale

```css
/* Headings */
.heading-1 {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
}

.heading-2 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}

.heading-3 {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
}

.heading-4 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
}

.heading-5 {
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
}

/* Body */
.body-large {
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
}

.body-base {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.body-small {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

/* Labels */
.label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: 0.01em;
}

/* Code */
.code {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
}
```

---

## 📏 Spacing System

### Spacing Scale

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Component Spacing

**Buttons:**
- Padding: `12px 24px` (space-3 space-6)
- Gap between buttons: `16px` (space-4)

**Cards:**
- Padding: `24px` (space-6)
- Gap between cards: `16px` (space-4)

**Forms:**
- Label margin-bottom: `8px` (space-2)
- Input padding: `12px 16px` (space-3 space-4)
- Field gap: `16px` (space-4)

**Sections:**
- Section padding: `48px 0` (space-12)
- Container padding: `16px` (space-4) mobile, `24px` (space-6) desktop

---

## 🎭 Shadows & Elevation

### Shadow System

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
             0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
             0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
             0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
             0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Elevation Levels

**Level 0 (Flat):**
- No shadow
- Usage: Background, surfaces

**Level 1 (Raised):**
- `shadow-sm`
- Usage: Cards, inputs

**Level 2 (Floating):**
- `shadow-md`
- Usage: Dropdowns, popovers

**Level 3 (Modal):**
- `shadow-lg`
- Usage: Modals, dialogs

**Level 4 (Above All):**
- `shadow-xl` or `shadow-2xl`
- Usage: Tooltips, notifications

---

## 🔲 Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 0.75rem;   /* 12px */
--radius-2xl: 1rem;     /* 16px */
--radius-3xl: 1.5rem;   /* 24px */
--radius-full: 9999px;
```

**Usage:**
- Buttons: `--radius-lg`
- Cards: `--radius-xl`
- Input fields: `--radius-md`
- Badges: `--radius-full`
- Modals: `--radius-2xl`

---

## 🎬 Animation & Transitions

### Timing Functions

```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Durations

```css
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 350ms;
--duration-slower: 500ms;
```

### Common Transitions

```css
/* Buttons */
.button {
  transition: background-color var(--duration-base) var(--ease-in-out),
              transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-base) var(--ease-in-out);
}

.button:hover {
  transform: translateY(-2px);
}

.button:active {
  transform: translateY(0);
}

/* Cards */
.card {
  transition: box-shadow var(--duration-base) var(--ease-in-out),
              transform var(--duration-base) var(--ease-in-out);
}

.card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

/* Modals */
.modal-enter-active {
  animation: modal-enter var(--duration-slow) var(--ease-out);
}

@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

---

## 🎨 Component Specifications

### Buttons

#### Primary Button
```css
.btn-primary {
  padding: 12px 24px;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: white;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border: none;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--duration-base) var(--ease-in-out);
}

.btn-primary:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

#### Secondary Button
```css
.btn-secondary {
  padding: 12px 24px;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--gray-700);
  background: white;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--duration-base) var(--ease-in-out);
}

.btn-secondary:hover {
  background: var(--gray-50);
  border-color: var(--gray-400);
}
```

#### Button Sizes
```css
.btn-sm {
  padding: 8px 16px;
  font-size: var(--text-sm);
}

.btn-md {
  padding: 12px 24px;
  font-size: var(--text-base);
}

.btn-lg {
  padding: 16px 32px;
  font-size: var(--text-lg);
}
```

### Cards

#### Basic Card
```css
.card {
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  padding: var(--space-6);
  transition: all var(--duration-base) var(--ease-in-out);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card-header {
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--gray-200);
}

.card-body {
  margin-bottom: var(--space-4);
}

.card-footer {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--gray-200);
}
```

#### Direction Card (with gradient)
```css
.direction-card {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}

.direction-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  pointer-events: none;
}
```

### Input Fields

```css
.input {
  width: 100%;
  padding: 12px 16px;
  font-size: var(--text-base);
  color: var(--gray-900);
  background: white;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  transition: all var(--duration-base) var(--ease-in-out);
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input:disabled {
  background: var(--gray-100);
  cursor: not-allowed;
}

.input-error {
  border-color: var(--error-500);
}

.input-error:focus {
  border-color: var(--error-500);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.input-label {
  display: block;
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--gray-700);
}

.input-helper {
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  color: var(--gray-500);
}

.input-error-text {
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  color: var(--error-500);
}
```

### Progress Bars

#### Linear Progress
```css
.progress {
  width: 100%;
  height: 8px;
  background: var(--gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: var(--radius-full);
  transition: width var(--duration-slow) var(--ease-out);
}

/* With percentage label */
.progress-wrapper {
  position: relative;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--gray-700);
}
```

#### Circular Progress
```css
.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring-circle {
  stroke: var(--gray-200);
  fill: transparent;
}

.progress-ring-value {
  stroke: var(--primary);
  fill: transparent;
  stroke-linecap: round;
  transition: stroke-dashoffset var(--duration-slow) var(--ease-out);
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border-radius: var(--radius-full);
}

.badge-success {
  background: var(--success-50);
  color: var(--success-700);
}

.badge-warning {
  background: var(--warning-50);
  color: var(--warning-700);
}

.badge-error {
  background: var(--error-50);
  color: var(--error-700);
}

.badge-info {
  background: var(--info-50);
  color: var(--info-700);
}

.badge-primary {
  background: var(--primary);
  color: white;
}
```

### Modals

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
}

.modal {
  background: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--gray-900);
}

.modal-close {
  padding: var(--space-2);
  color: var(--gray-500);
  cursor: pointer;
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  transition: all var(--duration-base) var(--ease-in-out);
}

.modal-close:hover {
  background: var(--gray-100);
  color: var(--gray-700);
}

.modal-body {
  padding: var(--space-6);
}

.modal-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--gray-200);
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
}
```

### Alerts/Notifications

```css
.alert {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: start;
  gap: var(--space-3);
}

.alert-success {
  background: var(--success-50);
  border-left: 4px solid var(--success-500);
  color: var(--success-700);
}

.alert-warning {
  background: var(--warning-50);
  border-left: 4px solid var(--warning-500);
  color: var(--warning-700);
}

.alert-error {
  background: var(--error-50);
  border-left: 4px solid var(--error-500);
  color: var(--error-700);
}

.alert-info {
  background: var(--info-50);
  border-left: 4px solid var(--info-500);
  color: var(--info-700);
}

.alert-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-weight: var(--font-medium);
  margin-bottom: var(--space-1);
}

.alert-message {
  font-size: var(--text-sm);
}
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Media Queries

```css
/* Mobile (default) */
.container {
  padding: var(--space-4);
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: var(--space-6);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: var(--space-8);
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Grid System

```css
.grid {
  display: grid;
  gap: var(--space-4);
}

/* Responsive columns */
.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }

@media (min-width: 640px) {
  .grid-cols-sm-2 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 768px) {
  .grid-cols-md-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-cols-md-3 { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1024px) {
  .grid-cols-lg-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-cols-lg-4 { grid-template-columns: repeat(4, 1fr); }
}
```

---

## 🎯 Icon System

### Icon Library
- **Primary**: Heroicons (https://heroicons.com)
- **Alternative**: Lucide Icons (https://lucide.dev)

### Icon Sizes

```css
.icon-xs { width: 12px; height: 12px; }
.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 20px; height: 20px; }
.icon-lg { width: 24px; height: 24px; }
.icon-xl { width: 32px; height: 32px; }
```

### Common Icons

**Navigation:**
- Home: `home`
- Dashboard: `squares-2x2`
- Settings: `cog-6-tooth`
- Profile: `user-circle`

**Actions:**
- Add: `plus`
- Edit: `pencil`
- Delete: `trash`
- Save: `check`
- Cancel: `x-mark`

**Status:**
- Success: `check-circle`
- Warning: `exclamation-triangle`
- Error: `x-circle`
- Info: `information-circle`

**Directions:**
- Math: `calculator`
- English: `language`
- Programming: `code-bracket`

---

## 🎨 Special Components

### Olympiad Card

```css
.olympiad-card {
  background: linear-gradient(135deg, #F59E0B 0%, #DC2626 100%);
  color: white;
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}

.olympiad-card::before {
  content: '🏆';
  position: absolute;
  font-size: 120px;
  opacity: 0.1;
  right: -20px;
  top: -20px;
  transform: rotate(15deg);
}

.olympiad-card-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-2);
}

.olympiad-card-meta {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
  font-size: var(--text-sm);
}

.olympiad-card-price {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-4);
}

.olympiad-card-cta {
  background: white;
  color: var(--olympiad-primary);
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  border: none;
  cursor: pointer;
  width: 100%;
  transition: all var(--duration-base) var(--ease-in-out);
}

.olympiad-card-cta:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}
```

### Mock Exam Offer

```css
.mock-offer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.mock-option {
  background: white;
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  text-align: center;
  transition: all var(--duration-base) var(--ease-in-out);
  cursor: pointer;
}

.mock-option:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-md);
}

.mock-option-recommended {
  border-color: var(--primary);
  position: relative;
}

.mock-option-badge {
  position: absolute;
  top: -12px;
  right: 16px;
  background: var(--primary);
  color: white;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
}

.mock-option-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-2);
}

.mock-option-price {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--primary);
  margin-bottom: var(--space-1);
}

.mock-option-savings {
  font-size: var(--text-sm);
  color: var(--success-500);
  font-weight: var(--font-medium);
  margin-bottom: var(--space-4);
}

.mock-option-features {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-4) 0;
  text-align: left;
}

.mock-option-features li {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
}

.mock-option-features li::before {
  content: '✓';
  color: var(--success-500);
  font-weight: var(--font-bold);
}
```

### Timer/Countdown

```css
.countdown {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--warning-50);
  border: 1px solid var(--warning-200);
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
}

.countdown-icon {
  color: var(--warning-500);
}

.countdown-time {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  color: var(--warning-700);
}

.countdown-warning {
  background: var(--error-50);
  border-color: var(--error-200);
}

.countdown-warning .countdown-icon {
  color: var(--error-500);
}

.countdown-warning .countdown-time {
  color: var(--error-700);
}
```

### Leaderboard

```css
.leaderboard {
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.leaderboard-header {
  padding: var(--space-6);
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
}

.leaderboard-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-2);
}

.leaderboard-stats {
  display: flex;
  gap: var(--space-6);
  font-size: var(--text-sm);
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
}

.leaderboard-table thead {
  background: var(--gray-50);
}

.leaderboard-table th {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--gray-600);
}

.leaderboard-table td {
  padding: var(--space-4);
  border-bottom: 1px solid var(--gray-200);
}

.leaderboard-row {
  transition: background var(--duration-base) var(--ease-in-out);
}

.leaderboard-row:hover {
  background: var(--gray-50);
}

.leaderboard-row-highlight {
  background: var(--primary-light);
  font-weight: var(--font-semibold);
}

.leaderboard-rank {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--gray-400);
}

.leaderboard-medal {
  font-size: var(--text-3xl);
}
```

---

## ♿ Accessibility Guidelines

### Color Contrast
- Text on background: minimum 4.5:1 ratio
- Large text (18px+): minimum 3:1 ratio
- UI components: minimum 3:1 ratio

### Focus States
```css
*:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

*:focus:not(:focus-visible) {
  outline: none;
}

*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order should be logical
- Skip navigation links for screen readers
- Escape key closes modals

### ARIA Labels
- Use semantic HTML when possible
- Add ARIA labels for icon-only buttons
- Proper heading hierarchy (h1, h2, h3...)
- Form labels associated with inputs

### Screen Reader Support
- Alt text for all images
- Descriptive link text
- Status messages announced
- Loading states communicated

---

## 📐 Layout Patterns

### Dashboard Layout

```css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: var(--gray-900);
  color: white;
  padding: var(--space-6);
}

.main-content {
  padding: var(--space-6);
  background: var(--gray-50);
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: fixed;
    left: -250px;
    top: 0;
    bottom: 0;
    z-index: 100;
    transition: left var(--duration-base) var(--ease-in-out);
  }

  .sidebar.open {
    left: 0;
  }
}
```

### Card Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-4);
}
```

### Form Layout

```css
.form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: var(--space-4);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
```

---

## 🎨 Dark Mode (Future Consideration)

```css
[data-theme="dark"] {
  --bg-primary: var(--gray-900);
  --bg-secondary: var(--gray-800);
  --text-primary: var(--gray-100);
  --text-secondary: var(--gray-400);
  --border-color: var(--gray-700);
}
```

---

This design system ensures consistency, accessibility, and a great user experience across the entire LMS platform. All components should adhere to these specifications for a cohesive look and feel.
