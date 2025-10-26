# LMS Student Frontend — System Overview

This document summarises the current state of the LMS Student frontend after the minimalistic UI refresh. It is meant to help new contributors understand the structure, navigation flow, and supporting utilities that power the application.

## High-level architecture

- **Framework**: Vue 3 (Composition API) bootstrapped with Vite (`src/main.js`).
- **Styling**: Tailwind CSS with a light-weight neutral palette defined in `tailwind.config.js` and applied through utility-first classes.
- **Routing**: Vue Router configured in `src/router/index.js` with role-aware route guards and module-specific route bundles (`src/modules/*/routes.js`).
- **State management**: Pinia stores located under `src/shared/stores` and module-level directories such as `src/modules/student/stores/olympiads.js`.
- **Charts & UI helpers**: Chart.js integrations live in `src/modules/student/components/charts`, while shared UI atoms/molecules live in `src/shared/components/ui`.
- **Testing**: Jest with @testing-library/vue and a custom setup file `tests/setupTests.js`.

## Layout system

All authenticated layouts (student, teacher, admin) now share the new [`AppShell`](../src/shared/components/layout/AppShell.vue) component. It renders:

1. A responsive sidebar (with mobile overlay) that consumes navigation trees provided by each layout.
2. A clean header with locale switching, logout, and role-specific quick actions supplied through slots.
3. A content container that standardises spacing and card appearance across modules.

Each role-specific layout prepares its own navigation items, profile summary and localized copy:

- [`StudentLayout`](../src/layouts/StudentLayout.vue) wires student routes (dashboard, courses, olympiads, finance, profile) including nested links for every detailed view.
- [`TeacherLayout`](../src/layouts/TeacherLayout.vue) exposes the educator dashboard and inherits locale/logout handling via the shell.
- [`AdminLayout`](../src/layouts/AdminLayout.vue) presents the control panel entry point.

Authentication-related screens use the refreshed [`AuthLayout`](../src/layouts/AuthLayout.vue) that balances a brand-focused hero panel with a centred minimalist form card.

## Navigation structure

The sidebar navigation is driven by simple objects with `{ id, label, to, icon, badge, active, children }` shape. Student navigation covers all registered routes:

| Section      | Child routes                                                                   |
| ------------ | ------------------------------------------------------------------------------- |
| Dashboard    | `/student`                                                                     |
| Courses      | `/student/courses`, `/student/courses/:id`, `/student/courses/:id/tests/...`    |
| Olympiads    | `/student/olympiads`, `/student/olympiads/my`, `/student/olympiads/:id/...`     |
| Finance      | `/student/finance/transactions`, `/student/finance/coins`                      |
| Profile      | `/student/profile`, `/student/profile/settings`                                |

Teacher and admin shells currently surface their respective dashboard routes but are ready to accept more entries by extending the `navItems` computed property.

## Visual language

Key UI primitives were updated to align with the new minimal aesthetic:

- [`StatCard`](../src/modules/student/components/dashboard/StatCard.vue) now uses subtle borders, neutral typography, and a condensed information layout.
- [`DataTable`](../src/shared/components/ui/DataTable.vue) employs neutral separators, improved padding, and consistent typography.
- [`ProgressBadge`](../src/shared/components/ui/ProgressBadge.vue) features bordered pills with tone-specific accents.
- Global base styles (`src/main.css`) ensure antialiased text, neutral backgrounds, and consistent heading weights.

The login page (`src/shared/pages/LoginPage.vue`) mirrors the subdued palette with simplified form controls.

## Internationalisation

The application ships with Uzbek (`src/i18n/locales/uz.js`) and Russian (`src/i18n/locales/ru.js`) translations. Both locales now include the expanded navigation dictionary and shell accessibility strings.

Locale changes propagate through the Pinia-backed i18n store and instantly update the interface. The shell exposes the selector whenever more than one locale is available.

## Testing & tooling

- Jest configuration: `jest.config.cjs`
- Global test setup: `tests/setupTests.js` (initialises optional jest-dom matchers and Vue compiler globals).
- Sample layout test: `tests/unit/AppLayout.spec.js` (verifies the student shell renders financial summaries).

Run the suite with `npm test`.

## Development checklist

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Execute unit tests: `npm test`
4. Build for production: `npm run build`

## Next steps

- Extend teacher and admin navigation trees as their modules grow.
- Add screenshots or visual regression tests to capture the new minimalist styling.
- Integrate real API endpoints once backend services are available (current data is mock-driven).
