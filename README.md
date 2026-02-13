<div align="center">

# FinTrack

### Personal Finance Tracker

A modern, full-stack personal finance application built with Next.js 16, Prisma, and shadcn/ui. Track expenses, manage budgets, and gain insights into your spending habits.

[Getting Started](#getting-started) &bull; [Features](#features) &bull; [Tech Stack](#tech-stack) &bull; [Project Structure](#project-structure)

</div>

---

## Features

**Expense Management** &mdash; Add, edit, and delete expenses with category tagging, date tracking, and filtering by category or date range.

**Budget Tracking** &mdash; Set monthly overall or per-category budgets and monitor spending against your limits with visual progress indicators.

**Dashboard & Analytics** &mdash; View monthly spending totals, 6-month trend charts, category breakdowns, recent transactions, and budget overviews at a glance.

**Category System** &mdash; Create custom categories with color coding. Default categories are seeded automatically on signup.

**Authentication** &mdash; Secure email/password authentication powered by Better Auth with session management and protected routes.

**Responsive UI** &mdash; Mobile-first design with dark mode support, smooth transitions, and a collapsible sidebar navigation.

---

## Tech Stack

| Layer            | Technology                                          |
| ---------------- | --------------------------------------------------- |
| **Framework**    | Next.js 16 (App Router)                             |
| **Language**     | TypeScript 5                                        |
| **Styling**      | Tailwind CSS 4, shadcn/ui (New York)                |
| **Database**     | PostgreSQL with Prisma 7 ORM + Prisma Accelerate    |
| **Auth**         | Better Auth                                         |
| **State**        | Zustand                                             |
| **Charts**       | Recharts                                            |
| **Forms**        | React Hook Form + Zod                               |
| **Notifications**| Sonner                                              |

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** database (local or hosted)
- **npm**, **yarn**, or **pnpm**

### 1. Clone the repository

```bash
git clone https://github.com/VibeCodersDev/fin-track.git
cd fin-track
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/fintrack"
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Set up the database

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login & signup pages
│   ├── (app)/               # Protected app routes
│   │   ├── dashboard/       # Analytics & overview
│   │   ├── expenses/        # Expense management
│   │   ├── categories/      # Category management
│   │   └── settings/        # Budget settings & profile
│   └── api/                 # API routes (REST endpoints)
│       ├── auth/            # Better Auth handler
│       ├── expenses/        # Expense CRUD
│       ├── categories/      # Category CRUD
│       ├── budgets/         # Budget CRUD
│       └── dashboard/       # Dashboard data aggregation
├── components/
│   ├── ui/                  # shadcn/ui base components
│   ├── forms/               # Expense, category & budget forms
│   ├── dashboard/           # Charts, stats cards, budget overview
│   └── layout/              # Sidebar navigation
├── lib/
│   ├── auth.ts              # Auth server configuration
│   ├── db.ts                # Prisma client
│   ├── utils.ts             # Utility functions
│   └── validations/         # Zod schemas
├── stores/                  # Zustand state management
│   ├── expense-store.ts
│   ├── category-store.ts
│   └── budget-store.ts
├── middleware.ts             # Route protection
└── generated/               # Prisma generated client
```

---

## Database Schema

The app uses **6 core models**:

- **User** &mdash; Accounts with email, name, and profile image
- **Session** / **Account** / **Verification** &mdash; Better Auth internals
- **Expense** &mdash; Tracked expenses with amount, date, description, and category
- **Category** &mdash; Color-coded expense categories (default + custom)
- **Budget** &mdash; Monthly spending limits (overall or per-category)

---

## Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start development server   |
| `npm run build`   | Build for production       |
| `npm run start`   | Start production server    |
| `npm run lint`    | Run ESLint                 |

---

## License

This project is for personal use. Feel free to fork and adapt it for your own needs.
