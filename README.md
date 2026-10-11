# Baby Due Date Calculator

A production-ready pregnancy due-date calculator built with Next.js App Router, React, TypeScript, Redux Toolkit, Tailwind CSS v4, and Framer Motion.

The application allows users to estimate due date and pregnancy progress based on:

- last period date and cycle length
- conception date
- due date from scan

It also surfaces trimester phase, key milestone dates, day-count progression, fetal size cues, and facts about pregnancy continuously in rotation.

---

## Table of Contents

- [1. Overview](#1-overview)
- [2. Framework & Technology Details](#2-framework--technology-details)
- [3. Local Development](#3-local-development)
- [4. Scripts](#4-scripts)
- [5. Folder Architecture](#5-folder-architecture)
- [6. System Design](#6-system-design)
- [7. Architectural Decisions](#7-architectural-decisions)
- [8. Testing Strategy](#8-testing-strategy)
- [9. Non-Functional Considerations](#9-non-functional-considerations)
- [10. Disclaimer](#10-disclaimer)

---

## 1. Overview

This project is a client-centric health utility focused on fast, privacy-aware date calculations.

### Core user flow

1. User chooses a calculation method.
2. User enters a date (and cycle length for period-based calculations).
3. App validates date bounds based on method and current date.
4. App computes pregnancy timeline.
5. App renders results and supporting context (milestones, trimester, baby size, fact card).
6. Optional: user enables "Remember my inputs", which stores state in browser cookies.

### Key features

- Multi-method due-date calculation (`period`, `conception`, `due`)
- Method-specific input boundaries
- Trimester-aware progress and week/day granularity
- Key milestone timeline
- "Remember my inputs" via browser cookies (no server persistence)
- Responsive layout and motion-enhanced transitions
- Light/dark theme tokens using Tailwind v4 + CSS custom properties

---

## 2. Framework & Technology Details

### Runtime and framework

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript** (strict mode)

### State and data

- **Redux Toolkit** for centralized calculator state and selectors
- **React-Redux** typed hooks for dispatch and selection

### UI and styling

- **Tailwind CSS v4** (`@import "tailwindcss"` + `@theme inline`)
- **Framer Motion** for animated transitions and conditional UI
- **next/font** for self-hosted Google font integration with CSS variables

### Persistence and utilities

- **js-cookie** for optional client-only cookie persistence
- Utility helpers for UTC-safe date parsing/formatting and pluralization

### Quality and tooling

- **Jest + Testing Library** for unit/component and integrationnpm install -g npm@latest tests
- **ESLint (Next core-web-vitals + TypeScript config)** for linting
- **pnpm** as package manager

---

## 3. Local Development

### Prerequisites

- Node.js LTS (recommended)
- pnpm 12+

### Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 4. Scripts

```bash
pnpm dev         # Start Next.js dev server
pnpm build       # Production build
pnpm start       # Start production server
pnpm lint        # Run ESLint
pnpm test        # Run Jest test suite
pnpm test:watch  # Run Jest in watch mode
```

---

## 5. Folder Architecture

```text
babyduedate/
├─ public/
│  └─ icons/                        # Fruit/size comparison images used in baby-size card
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                 # Root HTML shell, global fonts, Redux provider wrapper
│  │  ├─ page.tsx                   # Home route composition
│  │  ├─ globals.css                # Tailwind + design tokens + base styles
│  ├─ components/
│  │  ├─ Calculator.tsx             # Main form, cookies hydration/persistence, submission trigger
│  │  ├─ Result.tsx                 # Computed pregnancy output and week progression UI
│  │  ├─ KeyDates.tsx               # Milestone schedule rendering
│  │  ├─ BabySize.tsx               # Week-based fetal size card
│  │  ├─ Facts.tsx                  # Rotating educational fact section
│  ├─ hooks/
│  │  └─ useIsMobile.tsx            # Mobile breakpoint hook for adaptive animation patterns
│  ├─ libs/
│  │  ├─ constants.ts               # Domain constants, date formats, milestones, legends
│  │  ├─ methods.ts                 # Method metadata and UX copy
│  │  ├─ types.ts                   # Shared type contracts
│  │  ├─ utils.ts                   # UTC parsing/formatting helper functions
│  │  ├─ babySize.ts                # Week->size comparison dataset
│  │  └─ facts.ts                   # Rotating facts dataset
│  └─ store/
│     ├─ index.ts                   # Redux store configuration
│     ├─ hooks.ts                   # Typed selector/dispatch hooks
│     ├─ StoreProvider.tsx          # React provider bridge for App Router
│     └─ calculatorSlice.ts         # Slice, reducers, selectors, derived calculations
├─ next.config.ts                   # Next config (React Compiler enabled)
├─ eslint.config.mjs                # ESLint configuration
├─ jest.config.ts                   # Jest + next/jest integration
└─ postcss.config.mjs               # Tailwind PostCSS plugin config
```

---

## 6. System Design

### High-level architecture

The app follows a **single-page client computation model**:

- **Presentation Layer**: route and UI components (form, output, timeline, informational cards)
- **State Layer**: Redux Toolkit slice managing inputs, submit state, and derived selectors
- **Domain/Data Layer**: constants, method definitions, datasets, and pure utility functions

There is no backend API in the current design; all calculations run on the client.

### Data flow (unidirectional)

1. UI dispatches input updates (`setMethod`, `setDate`, `setCycle`, `setRememberMe`).
2. Slice updates canonical state.
3. Memoized selectors derive:
   - current method details
   - valid date bounds
   - computed pregnancy result object
4. UI re-renders from selector outputs.
5. Cookie side-effects run in component effects only after hydration readiness.

### Calculation model

The calculation normalizes to a "pregnancy start reference" and then derives timeline metrics:

- `period` method: start = selected date + `(cycleLength - 28)` days
- `conception` method: start = selected date - `14` days
- `due` method: start = selected date - `280` days

Then:

- current day index from start
- week + days after completed weeks
- due date (`start + 280 days`)
- days remaining/past due
- trimester classification
- warnings for future/unusually old/late ranges

### Validation boundaries

Date boundaries are dynamic and method-aware:

- For `due`: bounded around today with forward tolerance
- For other methods: bounded to realistic retrospective windows up to current date

Cycle length is clamped in reducer logic to a safe domain (`21..45`) for consistency.

### Persistence design

"Remember my inputs" stores only non-sensitive calculator fields in client cookies:

- method
- date
- cycle
- remember flag

No server writes, accounts, or remote tracking are used in this flow.

---

## 7. Architectural Decisions

| Decision                                             | Why it was chosen                                              | Trade-off                                                              |
| ---------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Use App Router + client components for calculator UX | Fast interactive rendering and simple route structure          | Heavier client execution than server-driven rendering                  |
| Centralize state in Redux Toolkit                    | Predictable transitions, memoized selectors, testable reducers | More boilerplate than local-only state                                 |
| Keep all computation client-side                     | Zero backend dependency, low latency, simpler deployment       | Logic is shipped to browser and cannot enforce server-side consistency |
| Persist inputs with cookies (opt-in)                 | Familiar browser behavior and user convenience                 | Cookie lifecycle depends on client browser policies                    |
| Tailwind v4 + CSS variables                          | Consistent tokens and rapid UI iteration                       | Requires team familiarity with utility-first styling                   |
| Framer Motion for transitions                        | Smooth, maintainable animation primitives                      | Additional runtime dependency size                                     |

---

## 8. Testing Strategy

Current automated coverage includes:

- route rendering smoke test for home page
- calculator behavior test for method-switch hint updates
- baby-size component tests across all supported weeks, including out-of-range guards and image/detail rendering assertions

Recommended expansion areas:

- reducer/selectors unit tests for edge-case date logic
- integration tests for full calculate flow
- cookie hydration/persistence behavior tests
- broader accessibility assertions for form controls and dynamic content

---

## 9. Non-Functional Considerations

- **Performance**: local calculations are lightweight; memoized selectors reduce unnecessary recomputations.
- **Accessibility**: semantic headings/labels, `aria-live` updates, and switch semantics are used in key components.
- **Maintainability**: domain constants and datasets are isolated from UI rendering logic.
- **Privacy**: no remote storage of user-entered dates in current architecture.

---

## 10. Disclaimer

This tool provides **estimates** and educational guidance only. It is not a medical device and should not replace professional clinical advice. Always confirm due-date and pregnancy milestones with qualified healthcare providers.
