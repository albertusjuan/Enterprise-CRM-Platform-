# CRM SAM - Structured Rebuild Prompt

> Copy this entire prompt and paste it into a fresh Cursor/AI session to rebuild the CRM with clean architecture

---

## 🎯 PROJECT OVERVIEW

Build a professional enterprise CRM system called **CRM SAM** for managing customer relationships in a B2B business (rubber roller manufacturing). The system manages 2,300+ customers and 16,000+ activities imported from historical Excel data.

**Key Requirements:**
- Role-based access: Admin (full access) vs Marketing (read-only customers, can log activities)
- Customer management: CRUD operations, contact persons, activity history
- Activity logging: 9 activity types, 7 outcome types, follow-up scheduling
- Follow-ups dashboard: Track overdue/upcoming customer contacts
- Reports & analytics: Activity breakdowns, user performance, trends
- Admin panel: User management (activate/deactivate, change roles)
- Mobile responsive, professional UI, production-ready

**Critical Constraints:**
- Use **feature-first architecture** (not layer-first)
- Use **Server Actions** for mutations (no direct Supabase in UI)
- Use **Zod + React Hook Form** for all forms
- Split large components into focused modules (<200 lines each)
- Follow **branch-based workflow** (see below)
- Create **clean commits** after each feature addition

**Git Workflow:**
```
1. Setup:    main branch (3 commits)
2. Branches: Create 10 feature branches from main
3. Develop:  Build each feature independently (commit only additions)
4. Merge:    After ALL features complete, merge all branches to main
5. Result:   Clean history with ~59 commits total
```

---

## 📚 TECH STACK (EXACT VERSIONS)

Use these exact versions for consistency:

```json
{
  "dependencies": {
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.39.7",
    "zod": "^3.22.4",
    "react-hook-form": "^7.49.3",
    "@hookform/resolvers": "^3.3.4",
    "next": "^15.1.6",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.6",
    "@types/react-dom": "^19.0.2",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.18.0",
    "eslint-config-next": "^15.1.6",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.2"
  }
}
```

**Framework:** Next.js 15 (App Router) + TypeScript + React 19  
**Database:** Supabase (PostgreSQL + Auth + RLS)  
**Styling:** Tailwind CSS (custom design system)  
**Forms:** React Hook Form + Zod validation  
**State:** None (use Server Actions + URL params)  
**Data Fetching:** Server Components + Server Actions (no React Query needed)

---

## 🏗️ PROJECT STRUCTURE (FEATURE-FIRST)

Create this exact folder structure from the start:

```
crm-sam/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── error.tsx
│   │   │   ├── customers/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── error.tsx
│   │   │   ├── activities/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── follow-ups/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── reports/
│   │   │   │   ├── page.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── users/[id]/page.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── layout.tsx
│   │   │   └── error.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/LoginForm.tsx
│   │   │   ├── actions/auth.actions.ts
│   │   │   ├── schemas/auth.schema.ts
│   │   │   └── index.ts
│   │   ├── customers/
│   │   │   ├── components/
│   │   │   │   ├── CustomerList.tsx
│   │   │   │   ├── CustomerFilters.tsx
│   │   │   │   ├── CustomerTable.tsx
│   │   │   │   ├── CustomerCards.tsx
│   │   │   │   ├── CustomerProfile.tsx
│   │   │   │   ├── AddCustomerDialog.tsx
│   │   │   │   └── EditCustomerDialog.tsx
│   │   │   ├── actions/customers.actions.ts
│   │   │   ├── queries/customers.queries.ts
│   │   │   ├── schemas/customers.schema.ts
│   │   │   ├── hooks/useCustomerForm.ts
│   │   │   └── index.ts
│   │   ├── activities/
│   │   │   ├── components/
│   │   │   │   ├── ActivityTimeline.tsx
│   │   │   │   ├── ActivityCard.tsx
│   │   │   │   ├── ActivityList.tsx
│   │   │   │   ├── AddActivityDialog.tsx
│   │   │   │   └── EditActivityDialog.tsx
│   │   │   ├── actions/activities.actions.ts
│   │   │   ├── queries/activities.queries.ts
│   │   │   ├── schemas/activities.schema.ts
│   │   │   ├── constants.ts
│   │   │   └── index.ts
│   │   ├── follow-ups/
│   │   │   ├── components/
│   │   │   │   ├── FollowUpsList.tsx
│   │   │   │   └── FollowUpCard.tsx
│   │   │   ├── queries/follow-ups.queries.ts
│   │   │   └── index.ts
│   │   ├── reports/
│   │   │   ├── components/
│   │   │   │   ├── ActivityBreakdown.tsx
│   │   │   │   ├── OutcomeStats.tsx
│   │   │   │   └── TopPerformers.tsx
│   │   │   ├── queries/reports.queries.ts
│   │   │   └── index.ts
│   │   ├── admin/
│   │   │   ├── components/
│   │   │   │   ├── UserList.tsx
│   │   │   │   └── EditUserForm.tsx
│   │   │   ├── actions/users.actions.ts
│   │   │   ├── queries/users.queries.ts
│   │   │   ├── schemas/users.schema.ts
│   │   │   └── index.ts
│   │   └── dashboard/
│   │       ├── components/
│   │       │   ├── StatsCard.tsx
│   │       │   ├── QuickActions.tsx
│   │       │   └── RecentActivityList.tsx
│   │       ├── queries/dashboard.queries.ts
│   │       └── index.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Dialog.tsx
│   │   │   │   ├── Skeleton.tsx
│   │   │   │   └── index.ts
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   └── MobileNav.tsx
│   │   │   └── feedback/
│   │   │       ├── EmptyState.tsx
│   │   │       └── ErrorMessage.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── usePermissions.ts
│   │   ├── lib/
│   │   │   ├── supabase/
│   │   │   │   ├── server.ts
│   │   │   │   ├── client.ts
│   │   │   │   ├── middleware.ts
│   │   │   │   └── index.ts
│   │   │   ├── auth/
│   │   │   │   ├── guards.ts
│   │   │   │   └── permissions.ts
│   │   │   ├── utils/
│   │   │   │   ├── cn.ts
│   │   │   │   ├── dates.ts
│   │   │   │   └── format.ts
│   │   │   └── errors/
│   │   │       ├── handlers.ts
│   │   │       └── types.ts
│   │   └── types/
│   │       ├── database.ts
│   │       └── common.ts
│   │
│   └── middleware.ts
│
├── supabase/
│   └── migrations/
│       ├── 00000_schema.sql
│       ├── 00001_rls_policies.sql
│       └── 00002_functions.sql
│
└── [config files]
```

---

## 🎨 DESIGN SYSTEM

**Color Palette:**
- Primary: Slate/charcoal (`slate-800`, `slate-900`)
- Accent: Gold/amber (`amber-500`, `amber-600`)
- Background: Light gray (`slate-50`)
- Cards: White with subtle shadows
- Borders: `slate-200`

**UI Patterns:**
- Smooth transitions (150-200ms)
- Custom scrollbars
- Card-based layout
- Professional SaaS aesthetic
- Mobile-first responsive (hamburger menu <1024px)

**Component Styles:**
```css
/* Buttons */
.btn-primary: slate-800 bg, white text, hover:slate-900
.btn-secondary: white bg, slate-700 text, border

/* Inputs */
.input: h-11, rounded-md, border-slate-300, focus:border-slate-800

/* Cards */
.card: white bg, rounded-lg, border-slate-200, shadow-sm
```

---

## 💾 DATABASE SCHEMA

Create these tables in Supabase (via migrations):

### Tables:
1. **user_profiles** (extends auth.users)
   ```sql
   id UUID (FK to auth.users)
   full_name VARCHAR(255)
   role VARCHAR(50) CHECK (role IN ('admin', 'marketing'))
   is_active BOOLEAN DEFAULT TRUE
   timestamps
   ```

2. **customers** (main entity)
   ```sql
   id UUID PRIMARY KEY
   company_name VARCHAR(255) NOT NULL
   industry_type VARCHAR(100)
   city VARCHAR(100)
   district VARCHAR(100)
   address TEXT
   phone VARCHAR(100)
   email VARCHAR(255)
   machine_type VARCHAR(255)
   status VARCHAR(20) DEFAULT 'active'
   last_contact_date DATE
   notes TEXT
   timestamps
   
   INDEX: company_name, city
   ```

3. **contacts** (contact persons per customer)
   ```sql
   id UUID PRIMARY KEY
   customer_id UUID FK → customers(id) CASCADE
   name VARCHAR(255) NOT NULL
   role VARCHAR(100)
   mobile VARCHAR(100)
   email VARCHAR(255)
   is_primary BOOLEAN DEFAULT FALSE
   created_at TIMESTAMP
   
   INDEX: customer_id
   ```

4. **activities** (interaction history)
   ```sql
   id UUID PRIMARY KEY
   customer_id UUID FK → customers(id) CASCADE
   user_id UUID FK → auth.users(id) SET NULL
   activity_type VARCHAR(50) -- call, visit, meeting, email, whatsapp, quotation, service, complaint, follow-up
   activity_date DATE NOT NULL
   contact_person VARCHAR(255)
   notes TEXT
   outcome VARCHAR(50) -- has_need, no_need, follow_up, service_request, quotation_sent, order_placed, no_response
   next_contact_date DATE  -- ⚠️ IMPORTANT: Add this column!
   is_imported BOOLEAN DEFAULT FALSE
   timestamps
   
   INDEX: customer_id, activity_date DESC, next_contact_date
   ```

### RLS Policies:
```sql
-- For development: disable RLS
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- For production: enable with policies
-- (Allow authenticated users to read/write all data)
-- (Add more granular policies later if needed)
```

---

## 🔨 BUILD INSTRUCTIONS (GIT WORKFLOW)

### Git Strategy: Feature Branches → Main

**Workflow Overview:**
1. Create `main` branch with initial setup
2. Create ALL feature branches from `main`
3. Develop each feature independently (commit only feature additions)
4. At the END, merge all branches to `main` in sequence
5. NO intermediate merges, NO fix commits (only feature additions)

**Visual Branch Structure:**
```
main (initial setup - 3 commits)
├── feat/foundation (7 commits)
├── feat/auth (3 commits)
├── feat/dashboard-shell (1 commit)
├── feat/dashboard (3 commits)
├── feat/customers (13 commits)
├── feat/activities (9 commits)
├── feat/follow-ups (4 commits)
├── feat/reports (5 commits)
├── feat/admin (6 commits)
└── feat/polish (5 commits)

After all features complete:
main ← merge all feature branches (10 merge commits)

Final: main branch has ~59 commits (3 initial + 51 feature commits + 10 merge commits)
```

---

### PHASE 0: Initial Setup (Branch: main)

```bash
# Create project
npx create-next-app@latest crm-sam --typescript --tailwind --app --no-src-dir
cd crm-sam

# Initialize git
git init
git add .
git commit -m "Initial commit: Next.js 15 + TypeScript + Tailwind"

# Install dependencies
npm install @supabase/ssr @supabase/supabase-js zod react-hook-form @hookform/resolvers

git add package.json package-lock.json
git commit -m "Add core dependencies: Supabase, Zod, React Hook Form"

# Create folder structure
mkdir -p src/features/{auth,customers,activities,follow-ups,reports,admin,dashboard}/{components,actions,queries,schemas,hooks}
mkdir -p src/shared/{components/{ui,layout,feedback},hooks,lib/{supabase,auth,utils,errors},types}
mkdir -p supabase/migrations

git add .
git commit -m "Create feature-first folder structure"
```

**Branch:** `main`  
**Commits:** 3  
**Status:** ✅ Initial setup complete

---

### CREATE ALL FEATURE BRANCHES (Do This BEFORE Development)

```bash
# From main, create all feature branches
git checkout -b feat/foundation
git checkout main

git checkout -b feat/auth
git checkout main

git checkout -b feat/dashboard-shell
git checkout main

git checkout -b feat/dashboard
git checkout main

git checkout -b feat/customers
git checkout main

git checkout -b feat/activities
git checkout main

git checkout -b feat/follow-ups
git checkout main

git checkout -b feat/reports
git checkout main

git checkout -b feat/admin
git checkout main

git checkout -b feat/polish
git checkout main
```

**Result:** 10 feature branches created, all based on `main`

---

### 🚨 IMPORTANT: "No Fix Commits" Rule

**What This Means:**
- Build each feature correctly THE FIRST TIME with all fixes already applied
- Commit only when a component/task is COMPLETE and WORKING
- Don't commit broken code that needs fixing later

**Critical Fixes to Apply From Start:**
1. ✅ Use `next_contact_date` column in activities table (add to schema)
2. ✅ Use LEFT JOIN (not INNER) for contacts in follow-ups queries
3. ✅ Use aggregation queries in reports (don't fetch all activities)
4. ✅ Use batch query for users in admin (Postgres function)
5. ✅ Name Supabase clients clearly (`createServerSupabaseClient`, `createBrowserSupabaseClient`)
6. ✅ Use Server Actions for ALL mutations (no direct Supabase in UI)
7. ✅ Validate all forms with Zod schemas

**If You Find a Bug:**
- Fix it in the current feature branch BEFORE committing
- Don't create separate fix commits
- Make sure the feature works end-to-end before moving on

---

### PHASE 1: Foundation (Branch: feat/foundation)

**What This Branch Builds:** Supabase setup, auth guards, shared UI library, layouts

```bash
# Switch to foundation branch
git checkout feat/foundation
```

#### Task 1.1: Environment Setup

Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Create `src/shared/lib/env.ts`:
```ts
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
})

export const env = envSchema.parse(process.env)
```

**Commit:**
```bash
git add .
git commit -m "Add environment variable validation with Zod"
```

#### Task 1.2: Supabase Client Setup

Create `src/shared/lib/supabase/server.ts`:
```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

Create `src/shared/lib/supabase/client.ts`:
```ts
import { createBrowserClient } from '@supabase/ssr'

export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

Create `src/shared/lib/supabase/middleware.ts`:
```ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })
  
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user && !request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (user && request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return response
  }
}
```

Create `src/middleware.ts`:
```ts
import { type NextRequest } from 'next/server'
import { updateSession } from '@/shared/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

**Commit:**
```bash
git add .
git commit -m "Set up Supabase clients and middleware auth"
```

#### Task 1.3: Auth Guards

Create `src/shared/lib/auth/guards.ts`:
```ts
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '../supabase/server'

export async function requireAuth() {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }
  
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  const supabase = await createServerSupabaseClient()
  
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }
  
  return { user, profile }
}

export async function getUserProfile() {
  const user = await requireAuth()
  const supabase = await createServerSupabaseClient()
  
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  return { user, profile }
}
```

Create `src/shared/lib/auth/permissions.ts`:
```ts
export function canEditCustomer(role?: string): boolean {
  return role === 'admin'
}

export function canManageUsers(role?: string): boolean {
  return role === 'admin'
}

export function canDeleteActivity(role?: string): boolean {
  return role === 'admin'
}

export function canLogActivity(role?: string): boolean {
  return role === 'admin' || role === 'marketing'
}
```

**Commit:**
```bash
git add .
git commit -m "Add auth guards and permission helpers"
```

#### Task 1.4: Database Types

Create `src/shared/types/database.ts`:
```ts
export type Customer = {
  id: string
  company_name: string
  industry_type?: string
  city?: string
  district?: string
  address?: string
  phone?: string
  email?: string
  machine_type?: string
  status: 'active' | 'inactive' | 'dormant'
  last_contact_date?: string
  notes?: string
  created_at: string
  updated_at: string
}

export type Contact = {
  id: string
  customer_id: string
  name: string
  role?: string
  mobile?: string
  email?: string
  is_primary: boolean
  created_at: string
}

export type Activity = {
  id: string
  customer_id: string
  user_id?: string
  activity_type: 'visit' | 'call' | 'email' | 'meeting' | 'quotation' | 'service' | 'complaint' | 'follow-up' | 'whatsapp'
  activity_date: string
  contact_person?: string
  notes?: string
  outcome?: 'no_need' | 'has_need' | 'follow_up' | 'service_request' | 'order_placed' | 'quotation_sent' | 'no_response'
  next_contact_date?: string
  is_imported?: boolean
  created_at: string
}

export type UserProfile = {
  id: string
  full_name: string
  role: 'admin' | 'marketing'
  is_active: boolean
  created_at: string
  updated_at: string
}
```

**Commit:**
```bash
git add .
git commit -m "Add TypeScript types for database entities"
```

#### Task 1.5: Shared UI Components

Create `src/shared/lib/utils/cn.ts`:
```ts
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
```

Create `src/shared/components/ui/Button.tsx`:
```tsx
import { cn } from '@/shared/lib/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  isLoading?: boolean
}

export function Button({ variant = 'primary', isLoading, className, children, ...props }: ButtonProps) {
  const variantStyles = {
    primary: 'bg-slate-800 text-white hover:bg-slate-900 border border-slate-700',
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
    ghost: 'text-slate-700 hover:bg-slate-100',
  }
  
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-all duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'flex items-center justify-center gap-2',
        variantStyles[variant],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}
```

Create `src/shared/components/ui/Input.tsx`, `Card.tsx`, `Dialog.tsx`, `Select.tsx`, `Badge.tsx`, `Skeleton.tsx` similarly.

Create `src/shared/components/ui/index.ts`:
```ts
export * from './Button'
export * from './Input'
export * from './Card'
export * from './Dialog'
export * from './Select'
export * from './Badge'
export * from './Skeleton'
```

**Commit:**
```bash
git add .
git commit -m "Add shared UI component library (Button, Input, Card, Dialog)"
```

#### Task 1.6: Layout Components

Create `src/shared/components/layout/Sidebar.tsx`:
```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

interface SidebarProps {
  userRole?: string
  userName?: string
  onLogout: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'Follow-ups', href: '/dashboard/follow-ups', icon: '🔔' },
  { name: 'Customers', href: '/dashboard/customers', icon: '👥' },
  { name: 'Activities', href: '/dashboard/activities', icon: '📋' },
  { name: 'Reports', href: '/dashboard/reports', icon: '📊' },
]

export function Sidebar({ userRole, userName, onLogout }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-slate-900 rounded-md flex items-center justify-center text-white"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed lg:static z-40 transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-md flex items-center justify-center border border-amber-500/30">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">CRM SAM</h1>
              <p className="text-xs text-slate-500">v2.0</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-medium text-sm transition-all ${
                isActive(item.href)
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}

          {userRole === 'admin' && (
            <Link
              href="/dashboard/admin"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-medium text-sm transition-all ${
                isActive('/dashboard/admin')
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>⚙️</span>
              <span>Admin</span>
            </Link>
          )}
        </nav>

        {/* User profile */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">{userName}</div>
              <div className="text-xs text-slate-500 capitalize">{userRole}</div>
            </div>
            <button onClick={onLogout} className="text-red-400 hover:text-red-300 text-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
```

Create `src/shared/components/layout/Header.tsx`:
```tsx
interface HeaderProps {
  userName?: string
}

export function Header({ userName }: HeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-6 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="ml-12 lg:ml-0">
          <h2 className="text-xl font-semibold text-slate-900">
            {getGreeting()}, {userName?.split(' ')[0] || 'User'}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5 hidden sm:block">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </header>
  )
}
```

**Commit:**
```bash
git add .
git commit -m "Add layout components (Sidebar and Header)"
```

#### Task 1.7: Global Styles

Update `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-50 text-slate-900 antialiased;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-slate-100;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-slate-400 rounded-full hover:bg-slate-500;
  }
}

@layer utilities {
  .transition-smooth {
    transition: all 150ms ease-in-out;
  }
}
```

**Commit:**
```bash
git add .
git commit -m "Add global styles with custom scrollbar and transitions"
```

**Branch Status:** `feat/foundation` complete with **7 commits**  
**Ready to merge:** ✅ (will merge at the end)

---

### PHASE 2: Authentication (Branch: feat/auth)

**What This Branch Builds:** Login page, auth forms, Server Actions for sign in/out

```bash
# Switch to auth branch
git checkout feat/auth
```

#### Task 2.1: Auth Schema & Actions

Create `src/features/auth/schemas/auth.schema.ts`:
```ts
import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginInput = z.infer<typeof LoginSchema>
```

Create `src/features/auth/actions/auth.actions.ts`:
```ts
'use server'

import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import { LoginSchema } from '../schemas/auth.schema'

export async function signIn(credentials: LoginInput) {
  const validated = LoginSchema.parse(credentials)
  const supabase = await createServerSupabaseClient()
  
  const { error } = await supabase.auth.signInWithPassword(validated)
  
  if (error) {
    return { error: error.message }
  }
  
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect('/login')
}
```

**Commit:**
```bash
git add .
git commit -m "Add login schema and Server Actions"
```

#### Task 2.2: Login Form Component

Create `src/features/auth/components/LoginForm.tsx`:
```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { LoginSchema, type LoginInput } from '../schemas/auth.schema'
import { signIn } from '../actions/auth.actions'
import { Button } from '@/shared/components/ui'

export function LoginForm() {
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    setError('')
    const result = await signIn(data)
    if (result?.error) {
      setError(result.error)
    }
  })

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          className="w-full h-11 px-3 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
          placeholder="you@company.com"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          className="w-full h-11 px-3 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
          placeholder="Enter password"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-full py-3">
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
```

Create `src/features/auth/index.ts`:
```ts
export * from './components/LoginForm'
export * from './actions/auth.actions'
export * from './schemas/auth.schema'
```

**Commit:**
```bash
git add .
git commit -m "Add LoginForm with React Hook Form and Zod validation"
```

#### Task 2.3: Login Page

Create `src/app/(auth)/login/page.tsx`:
```tsx
import { LoginForm } from '@/features/auth'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-md flex items-center justify-center border border-amber-500/30">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CRM SAM</h1>
              <p className="text-slate-400 text-sm">Customer Management</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Enterprise-grade<br />customer management
          </h2>
          <p className="text-slate-300 text-lg">
            Professional CRM solution for managing customer relationships.
          </p>
        </div>
        <p className="text-slate-500 text-sm">© 2026 CRM SAM</p>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-600">Sign in to continue</p>
          </div>
          <LoginForm />
          <p className="text-center text-sm text-slate-500 mt-6">
            Need access? Contact your administrator
          </p>
        </div>
      </div>
    </div>
  )
}
```

Create `src/app/(auth)/layout.tsx`:
```tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

**Commit:**
```bash
git add .
git commit -m "Add login page with split-screen design"
```

**Branch Status:** `feat/auth` complete with **3 commits**  
**Ready to merge:** ✅ (will merge at the end)

---

### PHASE 3: Dashboard Shell (Branch: feat/dashboard-shell)

**What This Branch Builds:** Dashboard layout, navigation, placeholder pages

```bash
# Switch to dashboard shell branch
git checkout feat/dashboard-shell
```

#### Task 3.1: Dashboard Layout

Create `src/app/(dashboard)/layout.tsx`:
```tsx
import { getUserProfile } from '@/shared/lib/auth/guards'
import { Sidebar } from '@/shared/components/layout/Sidebar'
import { Header } from '@/shared/components/layout/Header'
import { signOut } from '@/features/auth'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getUserProfile()

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar 
        userRole={profile?.role} 
        userName={profile?.full_name}
        onLogout={signOut}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName={profile?.full_name} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
```

Create `src/app/(dashboard)/dashboard/page.tsx` (simple placeholder):
```tsx
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Overview</h1>
      <p className="text-slate-600 mt-1">Dashboard coming soon</p>
    </div>
  )
}
```

Create placeholder pages for:
- `src/app/(dashboard)/customers/page.tsx`
- `src/app/(dashboard)/activities/page.tsx`
- `src/app/(dashboard)/follow-ups/page.tsx`
- `src/app/(dashboard)/reports/page.tsx`
- `src/app/(dashboard)/admin/page.tsx`

**Commit:**
```bash
git add .
git commit -m "Add dashboard layout with sidebar, header, and placeholder pages"
```

**Branch Status:** `feat/dashboard-shell` complete with **1 commit**  
**Ready to merge:** ✅ (will merge at the end)

---

### PHASE 4: Dashboard Feature (Branch: feat/dashboard)

**What This Branch Builds:** Dashboard home page with stats, recent activities, quick actions

```bash
# Switch to dashboard feature branch
git checkout feat/dashboard
```

#### Task 4.1: Dashboard Queries

Create `src/features/dashboard/queries/dashboard.queries.ts`:
```ts
import { createServerSupabaseClient } from '@/shared/lib/supabase/server'

export async function getDashboardStats() {
  const supabase = await createServerSupabaseClient()
  const today = new Date().toISOString().split('T')[0]

  const [customerCount, activityCount, contactCount] = await Promise.all([
    supabase.from('customers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('activities').select('*', { count: 'exact', head: true }),
    supabase.from('contacts').select('*', { count: 'exact', head: true }),
  ])

  // Get follow-up counts
  const { data: followUps } = await supabase
    .from('activities')
    .select('customer_id, next_contact_date')
    .not('next_contact_date', 'is', null)
    .lte('next_contact_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])

  const uniqueCustomers = new Map()
  followUps?.forEach(f => {
    const existing = uniqueCustomers.get(f.customer_id)
    if (!existing || f.next_contact_date! > existing) {
      uniqueCustomers.set(f.customer_id, f.next_contact_date)
    }
  })

  const overdueCount = Array.from(uniqueCustomers.values()).filter(date => date < today).length
  const todayCount = Array.from(uniqueCustomers.values()).filter(date => date === today).length

  return {
    customerCount: customerCount.count || 0,
    activityCount: activityCount.count || 0,
    contactCount: contactCount.count || 0,
    overdueCount,
    todayCount,
  }
}

export async function getRecentActivities(limit = 5) {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('activities')
    .select('*, customers!inner(company_name)')
    .order('activity_date', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}
```

**Commit:**
```bash
git add .
git commit -m "Add dashboard data queries for stats and recent activities"
```

#### Task 4.2: Dashboard Components

Create `src/features/dashboard/components/StatsCard.tsx`, `QuickActions.tsx`, `RecentActivityList.tsx`.

**Commit:**
```bash
git add .
git commit -m "Add dashboard UI components (StatsCard, QuickActions, RecentActivityList)"
```

#### Task 4.3: Dashboard Page

Update `src/app/(dashboard)/dashboard/page.tsx` to use queries and components.

**Commit:**
```bash
git add .
git commit -m "Implement dashboard home page with stats and recent activities"
```

**Branch Status:** `feat/dashboard` complete with **3 commits**  
**Ready to merge:** ✅ (will merge at the end)

---

### PHASE 5: Customers Feature (Branch: feat/customers)

**What This Branch Builds:** Customer list, filters, pagination, add/edit forms, detail page

```bash
# Switch to customers feature branch
git checkout feat/customers
```

#### Task 5.1: Customer Constants & Schema

Create `src/features/customers/schemas/customers.schema.ts`:
```ts
import { z } from 'zod'

export const CustomerSchema = z.object({
  company_name: z.string().min(1, 'Company name is required').max(255),
  industry_type: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().regex(/^[0-9-+()\\s]*$/, 'Invalid phone format').optional().or(z.literal('')),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  machine_type: z.string().optional(),
  status: z.enum(['active', 'inactive', 'dormant']).default('active'),
  notes: z.string().optional(),
})

export const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  is_primary: z.boolean().default(false),
})

export const CustomerFiltersSchema = z.object({
  search: z.string().optional(),
  city: z.string().optional(),
  industry: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
})

export type CustomerInput = z.infer<typeof CustomerSchema>
export type ContactInput = z.infer<typeof ContactSchema>
export type CustomerFilters = z.infer<typeof CustomerFiltersSchema>
```

**Commit:**
```bash
git add .
git commit -m "Add customer Zod schemas for validation"
```

#### Task 5.2: Customer Queries

Create `src/features/customers/queries/customers.queries.ts`:
```ts
import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import type { CustomerFilters } from '../schemas/customers.schema'
import { cache } from 'react'

export const getCustomers = cache(async (filters: CustomerFilters) => {
  const supabase = await createServerSupabaseClient()
  const pageSize = 20

  let query = supabase.from('customers').select('*, contacts(name, mobile)', { count: 'exact' })

  if (filters.search) {
    query = query.or(`company_name.ilike.%${filters.search}%,address.ilike.%${filters.search}%`)
  }
  if (filters.city) {
    query = query.eq('city', filters.city)
  }
  if (filters.industry) {
    query = query.eq('industry_type', filters.industry)
  }

  const from = (filters.page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, count, error } = await query
    .order('company_name', { ascending: true })
    .range(from, to)

  if (error) throw error

  return { data: data || [], count: count || 0, pageSize }
})

export const getCustomer = cache(async (id: string) => {
  const supabase = await createServerSupabaseClient()

  const [customerResult, contactsResult, activitiesResult] = await Promise.all([
    supabase.from('customers').select('*').eq('id', id).single(),
    supabase.from('contacts').select('*').eq('customer_id', id).order('is_primary', { ascending: false }),
    supabase.from('activities').select('*').eq('customer_id', id).order('activity_date', { ascending: false }),
  ])

  if (customerResult.error) throw customerResult.error

  return {
    customer: customerResult.data,
    contacts: contactsResult.data || [],
    activities: activitiesResult.data || [],
  }
})

export async function getCities() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('customers').select('city').not('city', 'is', null).order('city')
  return Array.from(new Set(data?.map((c) => c.city).filter(Boolean))) as string[]
}

export async function getIndustries() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('customers').select('industry_type').not('industry_type', 'is', null).order('industry_type')
  return Array.from(new Set(data?.map((c) => c.industry_type).filter(Boolean))) as string[]
}
```

**Commit:**
```bash
git add .
git commit -m "Add customer query layer with caching"
```

#### Task 5.3: Customer Actions

Create `src/features/customers/actions/customers.actions.ts`:
```ts
'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import { requireAuth } from '@/shared/lib/auth/guards'
import { CustomerSchema, ContactSchema } from '../schemas/customers.schema'

export async function createCustomer(input: { customer: any, contacts: any[] }) {
  const user = await requireAuth()
  const supabase = await createServerSupabaseClient()

  const validatedCustomer = CustomerSchema.parse(input.customer)
  const validatedContacts = input.contacts.map(c => ContactSchema.parse(c))

  // Insert customer
  const { data: customer, error: customerError } = await supabase
    .from('customers')
    .insert(validatedCustomer)
    .select()
    .single()

  if (customerError) throw customerError

  // Insert contacts
  if (validatedContacts.length > 0) {
    const contactsToInsert = validatedContacts.map(c => ({
      ...c,
      customer_id: customer.id,
    }))
    await supabase.from('contacts').insert(contactsToInsert)
  }

  // Create initial activity
  await supabase.from('activities').insert({
    customer_id: customer.id,
    user_id: user.id,
    activity_type: 'visit',
    activity_date: new Date().toISOString().split('T')[0],
    notes: 'Initial contact - customer added to system',
  })

  revalidatePath('/dashboard/customers')
  return customer
}

export async function updateCustomer(id: string, input: { customer: any, contacts: any[] }) {
  await requireAuth()
  const supabase = await createServerSupabaseClient()

  const validatedCustomer = CustomerSchema.parse(input.customer)

  const { error } = await supabase
    .from('customers')
    .update(validatedCustomer)
    .eq('id', id)

  if (error) throw error

  // Handle contacts (delete old, insert new - or implement upsert)
  // ... (similar pattern)

  revalidatePath(`/dashboard/customers/${id}`)
  revalidatePath('/dashboard/customers')
}
```

**Commit:**
```bash
git add .
git commit -m "Add customer Server Actions for create and update"
```

#### Task 5.4-5.8: Build Customer Components

Build ALL customer components (CustomerList, CustomerTable, CustomerCards, CustomerFilters, AddCustomerDialog, EditCustomerDialog, CustomerProfile).

**Commit each component separately:**
```bash
git add src/features/customers/components/CustomerList.tsx
git commit -m "Add CustomerList component"

git add src/features/customers/components/CustomerTable.tsx
git commit -m "Add CustomerTable component"

git add src/features/customers/components/CustomerCards.tsx
git commit -m "Add CustomerCards component for mobile"

git add src/features/customers/components/CustomerFilters.tsx
git commit -m "Add CustomerFilters with URL sync"

git add src/features/customers/components/AddCustomerDialog.tsx
git commit -m "Add AddCustomerDialog with validation"

git add src/features/customers/components/EditCustomerDialog.tsx
git commit -m "Add EditCustomerDialog"

git add src/features/customers/components/CustomerProfile.tsx
git commit -m "Add CustomerProfile component"
```

#### Task 5.9: Customer Pages

Update `src/app/(dashboard)/customers/page.tsx`:
```tsx
import { getCustomers, getCities, getIndustries } from '@/features/customers'
import { CustomerList } from '@/features/customers'
import { CustomerFiltersSchema } from '@/features/customers/schemas/customers.schema'

export const revalidate = 30

export default async function CustomersPage({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams
  const filters = CustomerFiltersSchema.parse(params)

  const [customersData, cities, industries] = await Promise.all([
    getCustomers(filters),
    getCities(),
    getIndustries(),
  ])

  return <CustomerList data={customersData} cities={cities} industries={industries} filters={filters} />
}
```

**Commit:**
```bash
git add .
git commit -m "Implement customer list page with filters and pagination"
```

Update `src/app/(dashboard)/customers/[id]/page.tsx` similarly.

**Commit:**
```bash
git add .
git commit -m "Implement customer detail page with profile and activities"
```

**Branch Status:** `feat/customers` complete with **13 commits**  
**Ready to merge:** ✅ (will merge at the end)

---

### PHASE 6: Activities Feature (Branch: feat/activities)

**What This Branch Builds:** Activity logging, timeline, edit/delete, activity types/outcomes

```bash
# Switch to activities feature branch
git checkout feat/activities
```

#### Task 6.1: Activity Constants

Create `src/features/activities/constants.ts`:
```ts
export const ACTIVITY_TYPES = [
  { value: 'call', label: 'Phone Call', icon: '📞', color: 'bg-green-100 text-green-700' },
  { value: 'visit', label: 'Visit', icon: '🏢', color: 'bg-blue-100 text-blue-700' },
  { value: 'meeting', label: 'Meeting', icon: '🤝', color: 'bg-purple-100 text-purple-700' },
  { value: 'email', label: 'Email', icon: '📧', color: 'bg-pink-100 text-pink-700' },
  { value: 'whatsapp', label: 'WhatsApp', icon: '💬', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'quotation', label: 'Quotation', icon: '💰', color: 'bg-amber-100 text-amber-700' },
  { value: 'service', label: 'Service', icon: '🔧', color: 'bg-cyan-100 text-cyan-700' },
  { value: 'complaint', label: 'Complaint', icon: '⚠️', color: 'bg-red-100 text-red-700' },
  { value: 'follow-up', label: 'Follow Up', icon: '🔄', color: 'bg-indigo-100 text-indigo-700' },
] as const

export const OUTCOMES = [
  { value: 'has_need', label: 'Has Need', icon: '✅' },
  { value: 'no_need', label: 'No Need', icon: '❌' },
  { value: 'follow_up', label: 'Follow Up', icon: '🔄' },
  { value: 'service_request', label: 'Service Request', icon: '🔧' },
  { value: 'quotation_sent', label: 'Quotation Sent', icon: '💰' },
  { value: 'order_placed', label: 'Order Placed', icon: '🎉' },
  { value: 'no_response', label: 'No Response', icon: '😶' },
] as const

export type ActivityType = typeof ACTIVITY_TYPES[number]['value']
export type ActivityOutcome = typeof OUTCOMES[number]['value']
```

**Commit:**
```bash
git add .
git commit -m "Add activity type and outcome constants"
```

#### Task 6.2: Activity Schema, Queries, Actions

Create schema, queries, and actions files following the same pattern as customers.

**Commits:**
```bash
git add src/features/activities/schemas/
git commit -m "Add activity Zod schema for validation"

git add src/features/activities/queries/
git commit -m "Add activity query layer"

git add src/features/activities/actions/
git commit -m "Add activity Server Actions for create, update, delete"
```

#### Task 6.3: Activity Components

Build ActivityTimeline, ActivityCard, ActivityList, AddActivityDialog, EditActivityDialog.

**Commits (one per component):**
```bash
git add src/features/activities/components/ActivityTimeline.tsx
git commit -m "Add ActivityTimeline component"

git add src/features/activities/components/ActivityCard.tsx
git commit -m "Add ActivityCard component"

git add src/features/activities/components/AddActivityDialog.tsx
git commit -m "Add AddActivityDialog with validation"

git add src/features/activities/components/EditActivityDialog.tsx
git commit -m "Add EditActivityDialog"

git add src/features/activities/components/ActivityList.tsx
git commit -m "Add ActivityList component"
```

#### Task 6.4: Activity Pages

Create `src/app/(dashboard)/activities/page.tsx` (NEW - was missing in MVP).

**Commit:**
```bash
git add .
git commit -m "Add activities list page"
```

**Branch Status:** `feat/activities` complete with **9 commits**  
**Ready to merge:** ✅ (will merge at the end)

---

### PHASE 7: Follow-ups Feature (Branch: feat/follow-ups)

**What This Branch Builds:** Follow-ups dashboard with overdue/today/upcoming sections

```bash
# Switch to follow-ups feature branch
git checkout feat/follow-ups
```

Build follow-ups dashboard with proper queries (FIX: use left join for contacts, not inner join).

**Commits:**
```bash
git add src/features/follow-ups/queries/
git commit -m "Add follow-ups query layer with LEFT join for contacts"

git add src/features/follow-ups/components/FollowUpCard.tsx
git commit -m "Add FollowUpCard component"

git add src/features/follow-ups/components/FollowUpsList.tsx
git commit -m "Add FollowUpsList component"

git add src/app/\(dashboard\)/follow-ups/
git commit -m "Implement follow-ups dashboard with overdue/today/upcoming sections"
```

**Branch Status:** `feat/follow-ups` complete with **4 commits**  
**Ready to merge:** ✅ (will merge at the end)

---

### PHASE 8: Reports Feature (Branch: feat/reports)

**What This Branch Builds:** Reports dashboard with aggregated analytics (no fetching all data)

```bash
# Switch to reports feature branch
git checkout feat/reports
```

Build reports with **aggregation queries** (NOT fetching all activities).

**Key Fix:** Use PostgREST aggregation or Postgres functions for stats.

**Commits:**
```bash
git add src/features/reports/queries/
git commit -m "Add aggregation queries for reports dashboard"

git add src/features/reports/components/ActivityBreakdown.tsx
git commit -m "Add ActivityBreakdown component"

git add src/features/reports/components/OutcomeStats.tsx
git commit -m "Add OutcomeStats component"

git add src/features/reports/components/TopPerformers.tsx
git commit -m "Add TopPerformers component"

git add src/app/\(dashboard\)/reports/
git commit -m "Implement reports page with aggregated analytics"
```

**Branch Status:** `feat/reports` complete with **5 commits**  
**Ready to merge:** ✅ (will merge at the end)

---

### PHASE 9: Admin Feature (Branch: feat/admin)

**What This Branch Builds:** Admin panel with optimized user management (no N+1 queries)

```bash
# Switch to admin feature branch
git checkout feat/admin
```

Build admin panel with **batch user query** (FIX: no N+1).

**Key Fix:** Create Postgres function to join user_profiles + auth.users.

**Commits:**
```bash
# Add migration file first
git add supabase/migrations/00003_user_functions.sql
git commit -m "Add Postgres function for batch user fetch"

git add src/features/admin/queries/
git commit -m "Add user management queries"

git add src/features/admin/actions/
git commit -m "Add user management Server Actions"

git add src/features/admin/components/UserList.tsx
git commit -m "Add UserList component"

git add src/features/admin/components/EditUserForm.tsx
git commit -m "Add EditUserForm component"

git add src/app/\(dashboard\)/admin/
git commit -m "Implement admin panel and edit user page"
```

**Branch Status:** `feat/admin` complete with **6 commits**  
**Ready to merge:** ✅ (will merge at the end)

---

### PHASE 10: Polish (Branch: feat/polish)

**What This Branch Builds:** Loading states, error boundaries, empty states, mobile responsive

```bash
# Switch to polish feature branch
git checkout feat/polish
```

Final improvements:
- Add loading states
- Add error boundaries
- Add empty states
- Mobile responsive tweaks
- Performance optimizations

**Commits:**
```bash
# Add all loading.tsx files
git add app/\(dashboard\)/*/loading.tsx
git commit -m "Add loading skeletons for all pages"

# Add all error.tsx files
git add app/\(dashboard\)/*/error.tsx app/\(dashboard\)/not-found.tsx
git commit -m "Add error boundaries with user-friendly messages"

# Add empty states to components
git add src/features/*/components/*
git commit -m "Add empty states throughout app"

# Mobile responsive improvements
git add src/shared/components/layout/* src/features/customers/components/*
git commit -m "Mobile responsive improvements (hamburger menu, card layouts)"

# Performance optimizations
git add app/\(dashboard\)/*/page.tsx
git commit -m "Performance optimizations (dynamic imports, ISR caching)"
```

**Branch Status:** `feat/polish` complete with **5 commits**  
**Ready to merge:** ✅ (will merge at the end)

---

## 🔀 FINAL MERGE: All Features → Main

**Now that all features are complete, merge them to main in sequence:**

```bash
# Switch to main branch
git checkout main

# Merge foundation (Supabase setup, auth guards, shared UI)
git merge feat/foundation --no-ff -m "Merge feat/foundation: Supabase setup, auth guards, shared UI library"

# Merge auth (Login page, Server Actions)
git merge feat/auth --no-ff -m "Merge feat/auth: Authentication with Server Actions"

# Merge dashboard shell (Layout, navigation)
git merge feat/dashboard-shell --no-ff -m "Merge feat/dashboard-shell: Dashboard layout and navigation"

# Merge dashboard (Home page with stats)
git merge feat/dashboard --no-ff -m "Merge feat/dashboard: Dashboard home with stats and recent activities"

# Merge customers (CRUD, filters, pagination)
git merge feat/customers --no-ff -m "Merge feat/customers: Customer management with CRUD and filters"

# Merge activities (Activity logging)
git merge feat/activities --no-ff -m "Merge feat/activities: Activity logging with timeline"

# Merge follow-ups (Follow-ups dashboard)
git merge feat/follow-ups --no-ff -m "Merge feat/follow-ups: Follow-ups dashboard"

# Merge reports (Analytics)
git merge feat/reports --no-ff -m "Merge feat/reports: Reports dashboard with analytics"

# Merge admin (User management)
git merge feat/admin --no-ff -m "Merge feat/admin: Admin panel with user management"

# Merge polish (Production ready)
git merge feat/polish --no-ff -m "Merge feat/polish: Production polish with loading/error states"

# View the final git history
git log --oneline --graph --all

# Clean up feature branches (optional)
git branch -d feat/foundation feat/auth feat/dashboard-shell feat/dashboard feat/customers feat/activities feat/follow-ups feat/reports feat/admin feat/polish
```

**Final Result:**
- ✅ `main` branch has all features integrated
- ✅ Clean merge commits showing feature integration points
- ✅ Complete git history showing what was built and when
- ✅ ~50+ commits total across all branches
- ✅ Production-ready CRM application

---

## 🗄️ DATABASE MIGRATIONS (Run in Supabase Dashboard)

### Migration 1: Schema
```sql
-- Create all tables (customers, contacts, activities, user_profiles)
-- (Full schema provided in earlier sections)
```

### Migration 2: RLS Policies
```sql
-- For dev: Disable RLS
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- For prod: Enable with policies
-- (Allow authenticated users full access)
```

### Migration 3: Helper Functions
```sql
-- Function to batch fetch users with emails
CREATE OR REPLACE FUNCTION get_users_with_emails(user_ids UUID[])
RETURNS TABLE (
  id UUID,
  full_name VARCHAR,
  role VARCHAR,
  email VARCHAR,
  is_active BOOLEAN,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT up.id, up.full_name, up.role, au.email, up.is_active, up.created_at
  FROM user_profiles up
  LEFT JOIN auth.users au ON au.id = up.id
  WHERE up.id = ANY(user_ids);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 📋 CONVENTIONS TO FOLLOW

### File Naming
- Components: PascalCase (`CustomerList.tsx`)
- Actions: camelCase + .actions.ts (`customers.actions.ts`)
- Queries: camelCase + .queries.ts (`customers.queries.ts`)
- Schemas: camelCase + .schema.ts (`customers.schema.ts`)

### Component Size
- Max 200 lines per component
- If larger, split into sub-components

### Data Access Rules
- ✅ Pages can import from `features/<feature>/queries`
- ✅ Components call Server Actions from `features/<feature>/actions`
- ❌ Never import `lib/supabase` directly in components
- ❌ No direct Supabase queries in UI code

### Form Pattern (Every Form Must Follow)
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SomeSchema } from '../schemas/some.schema'
import { someAction } from '../actions/some.actions'

export function SomeForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(SomeSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    await someAction(data)
  })

  return (
    <form onSubmit={onSubmit}>
      <input {...register('field')} />
      {errors.field && <p>{errors.field.message}</p>}
      <Button type="submit" isLoading={isSubmitting}>Submit</Button>
    </form>
  )
}
```

### Server Action Pattern (Every Action Must Follow)
```ts
'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import { requireAuth } from '@/shared/lib/auth/guards'
import { SomeSchema } from '../schemas/some.schema'

export async function someAction(input: unknown) {
  const user = await requireAuth() // throws if not logged in
  const data = SomeSchema.parse(input) // throws if invalid
  
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('table').insert({ ...data, user_id: user.id })
  
  if (error) throw error
  
  revalidatePath('/relevant/path')
}
```

### Git Commit Messages

**Keep commits simple and descriptive** (no conventional commit prefixes needed within feature branches):

**Within Feature Branches:**
- ✅ `"Add customer list with pagination"` - Clear, simple
- ✅ `"Add LoginForm with React Hook Form validation"` - Descriptive
- ✅ `"Add activity type and outcome constants"` - Specific
- ❌ `"feat(customers): Add customer list with pagination"` - Too verbose for feature branch
- ❌ `"update customer page"` - Too vague
- ❌ `"wip"` - Not descriptive

**Merge Commits (to main):**
- Use descriptive merge messages that summarize the feature
- Example: `"Merge feat/customers: Customer management with CRUD and filters"`

### Branch Naming
- `feat/<feature-name>` - Features
- `fix/<issue-name>` - Fixes
- `refactor/<area>` - Refactoring

---

## 🎯 COMPLETE FEATURE LIST (What to Build)

Build these features IN THIS ORDER:

### ✅ Phase 1-3: Foundation (Weeks 1-2)
1. ✅ Project setup + folder structure
2. ✅ Supabase clients + middleware
3. ✅ Auth guards + permissions
4. ✅ Shared UI components (Button, Dialog, Input, Card, etc.)
5. ✅ Layout components (Sidebar, Header)
6. ✅ Authentication (login/logout with Server Actions)
7. ✅ Dashboard shell (empty pages with navigation)

### ✅ Phase 4-6: Core Features (Week 2-3)
8. ✅ Dashboard home (stats cards, recent activities, quick actions)
9. ✅ Customer list (table + mobile cards, filters, pagination, search)
10. ✅ Customer detail (profile, contacts, activity timeline)
11. ✅ Add customer (modal with contacts, creates initial activity)
12. ✅ Edit customer (modal with contacts manager)
13. ✅ Activity logging (9 types, 7 outcomes, follow-up scheduling)
14. ✅ Activity timeline (visual display with icons, edit/delete on hover)
15. ✅ Activities list page (NEW - paginated list of all activities)

### ✅ Phase 7-8: Advanced Features (Week 3-4)
16. ✅ Follow-ups dashboard (overdue, today, upcoming sections)
17. ✅ Reports & analytics (activity breakdown, outcomes, top performers)
18. ✅ Admin panel (user management, role changes, activate/deactivate)
19. ✅ Edit user (admin can change roles and status)

### ✅ Phase 9: Production Polish (Week 4)
20. ✅ Loading states (skeleton loaders for all pages)
21. ✅ Error handling (error.tsx boundaries, user-friendly messages)
22. ✅ Empty states (informative messages with CTAs)
23. ✅ Mobile responsive (hamburger menu, card layouts)
24. ✅ Performance (ISR caching, dynamic imports, code splitting)

---

## 🎨 UI IMPLEMENTATION DETAILS

### Sidebar Navigation Items (with role-based visibility)
- Dashboard (all users)
- Follow-ups (all users)
- Customers (all users)
- Activities (all users)
- Reports (all users)
- Admin (admin only) ⚠️ Hide from marketing users

### Customer List Features
- Search: Company name, address (ilike query)
- Filters: City dropdown, Industry dropdown
- Active filter badges (removable)
- Desktop: Table layout with columns (Company, Location, Industry, Last Contact, Actions)
- Mobile: Card layout with icons
- Pagination: 20 per page, prev/next buttons

### Customer Detail Features
- Breadcrumb navigation
- Action buttons: "Edit" (admin only), "Log Activity" (all users)
- Profile card: All company details, contact persons
- Activity timeline: Visual timeline with colored icons, dates, notes, outcomes
- Edit/Delete buttons on activities (appear on hover, admin only)

### Activity Logging Features
- 9 activity types: call, visit, meeting, email, whatsapp, quotation, service, complaint, follow-up
- 7 outcomes: has_need, no_need, follow_up, service_request, quotation_sent, order_placed, no_response
- Contact person: Dropdown (if contacts exist) or free text
- Outcome "Follow Up" → Shows "Next Contact Date" field (conditional)
- Auto-updates customer.last_contact_date

### Follow-ups Dashboard Features
- 3 sections: Overdue (red), Due Today (amber), Upcoming (7 days)
- Each shows: Customer name, city, last activity notes, contact info
- "View" button links to customer detail
- Alert banner on main dashboard if overdue items exist

### Reports Features
- Key metrics: Total activities, Last 30 days, Active customers, Follow-ups count
- Activity type breakdown: Horizontal bars with percentages
- Outcome statistics: Count + percentage
- Top performers: Leaderboard of users by activity count
- Quick action links to other pages

### Admin Panel Features
- Stats cards: Total users, Admins count, Marketing users count
- User table: Name, Email, Role (badge), Status (badge), Joined date, Edit link
- Edit user modal: Change full name, role (admin/marketing), activate/deactivate
- Protection: Cannot edit own role or status

---

## 🚨 CRITICAL FIXES (Must Include from Start)

### 1. Add next_contact_date Column
```sql
ALTER TABLE activities ADD COLUMN next_contact_date DATE;
CREATE INDEX idx_activities_next_contact_date ON activities(next_contact_date);
```

### 2. Fix Contacts Join in Follow-ups Query
```ts
// Use LEFT join (not INNER) and correct column names
.select(`
  *,
  customers!inner(company_name, city),
  contacts(name, mobile)  // ⚠️ Remove !inner, use correct columns
`)
```

### 3. Use Aggregation in Reports (Not Select All)
```ts
// ❌ BAD: Fetches all activities
const { data } = await supabase.from('activities').select('*')

// ✅ GOOD: Use aggregation
const { data } = await supabase
  .from('activities')
  .select('activity_type, count')
  .gte('activity_date', startDate)
  .lte('activity_date', endDate)
```

### 4. Batch User Email Query in Admin
Use Postgres function (provided above) instead of N+1 queries.

### 5. Proper Function Naming
- Server: `createServerSupabaseClient()` (not `createClient()`)
- Browser: `createBrowserSupabaseClient()` (not `createClient()`)

---

## ✅ TESTING CHECKLIST (After Each Feature)

After merging each feature branch, test:

**Login & Auth:**
- [ ] Login with valid credentials → Dashboard
- [ ] Login with invalid credentials → Error message
- [ ] Logout → Redirects to login
- [ ] Access /dashboard without login → Redirects to login

**Customers:**
- [ ] Customer list loads with data
- [ ] Search by company name works
- [ ] Filter by city works
- [ ] Filter by industry works
- [ ] Pagination works (next/prev)
- [ ] Click customer → Detail page loads
- [ ] Add customer → Modal opens → Submit → Redirects to new customer
- [ ] Edit customer → Modal opens → Submit → Updates

**Activities:**
- [ ] Log activity from customer detail → Modal opens → Submit → Appears in timeline
- [ ] Activity types: All 9 types selectable
- [ ] Outcomes: All 7 outcomes selectable
- [ ] Follow-up outcome → Next contact date field appears
- [ ] Edit activity (admin) → Hover shows buttons → Edit works
- [ ] Delete activity (admin) → Confirms → Deletes

**Follow-ups:**
- [ ] Follow-ups page loads
- [ ] Overdue section shows correct customers
- [ ] Due today section works
- [ ] Upcoming section shows next 7 days
- [ ] Empty state when no follow-ups

**Reports:**
- [ ] Reports page loads quickly (<3s)
- [ ] Activity breakdown chart shows correct data
- [ ] Outcome stats accurate
- [ ] Top performers list shows users

**Admin:**
- [ ] Admin page loads (admin only)
- [ ] User list shows all users with emails
- [ ] Edit user → Change role → Saves
- [ ] Activate/deactivate user → Updates
- [ ] Cannot edit own role/status
- [ ] Marketing user: Cannot access admin page (403)

**Permissions:**
- [ ] Marketing user: Cannot see "Add Customer" button
- [ ] Marketing user: Cannot see "Edit" button on customer detail
- [ ] Marketing user: CAN see "Log Activity" button
- [ ] Marketing user: Cannot see "Edit/Delete" on activities
- [ ] Marketing user: Cannot see "Admin" in sidebar

---

## 🎬 FINAL INSTRUCTIONS FOR AI ASSISTANT

When building this project:

1. **Create `main` branch** with initial setup (3 commits)
2. **Create ALL 10 feature branches** from `main` before starting development
3. **Work on each feature independently** - switch between branches as needed
4. **Commit ONLY feature additions** - no fix commits, no debugging commits
5. **Make small, focused commits** - one commit per component or task
6. **Use simple commit messages** - clear and descriptive (no prefixes needed)
7. **After ALL features are built** - merge all branches to `main` in sequence
8. **Use `--no-ff` for merges** - preserve branch history with merge commits
9. **Apply critical fixes from the start** - next_contact_date column, LEFT joins, aggregation queries
10. **Keep components small** - max 200 lines, split if larger

**Key Principles:**
- Feature-first architecture (not layer-first)
- Server Actions for all mutations (no client-side DB calls)
- Zod validation on all forms
- React Hook Form for form state
- Small, focused components (<200 lines)
- Clean git history with meaningful commits

---

## 📦 DELIVERABLES

At the end, you should have:

✅ Clean feature-based architecture  
✅ ~120 files (more but smaller)  
✅ ~12,000 lines of code (with proper separation)  
✅ 40+ commits (one per feature/component)  
✅ 10 feature branches merged  
✅ All 24 features working  
✅ Mobile responsive  
✅ Production-ready  
✅ Clean git history  
✅ Easy to onboard new developers

---

## 📋 BRANCH & COMMIT SUMMARY

| Branch | What It Builds | Commits |
|--------|----------------|---------|
| `main` (initial) | Next.js setup, dependencies, folder structure | 3 |
| `feat/foundation` | Supabase clients, auth guards, shared UI, layouts | 7 |
| `feat/auth` | Login page, Server Actions, validation | 3 |
| `feat/dashboard-shell` | Dashboard layout, navigation, placeholders | 1 |
| `feat/dashboard` | Dashboard home with stats and recent activities | 3 |
| `feat/customers` | Customer CRUD, filters, pagination, detail page | 13 |
| `feat/activities` | Activity logging, timeline, edit/delete | 9 |
| `feat/follow-ups` | Follow-ups dashboard (overdue/today/upcoming) | 4 |
| `feat/reports` | Reports dashboard with aggregated analytics | 5 |
| `feat/admin` | Admin panel with user management | 6 |
| `feat/polish` | Loading states, error boundaries, mobile responsive | 5 |
| **Merge commits** | Merging all feature branches to main | 10 |
| **TOTAL** | | **59 commits** |

**Development Order:**
1. Create `main` with setup
2. Create all 10 feature branches
3. Build features independently (switch between branches as needed)
4. After all complete, merge to `main` in sequence
5. Result: Production-ready CRM with clean git history

---

## 🚀 START HERE

Copy this prompt and say:

**"Build CRM SAM following the exact specifications in this prompt. Important workflow rules:
1. Create main branch with initial setup (3 commits)
2. Create ALL 10 feature branches from main before starting
3. Build each feature in its own branch (commit only feature additions, NO fixes)
4. After ALL features are complete, merge all branches to main in sequence
5. Use feature-first architecture, Server Actions, Zod validation
6. Keep me updated on progress."**

---

## 📊 PROJECT SUMMARY

**Prompt Version:** 2.0 (Feature Branch Workflow)  
**Created:** February 23, 2026  
**Updated:** February 23, 2026  

**Deliverables:**
- ✅ 10 feature branches (independently developed)
- ✅ ~59 total commits (3 setup + 51 features + 10 merges + 5 polish)
- ✅ Feature-first architecture (clean boundaries)
- ✅ All forms use Zod + React Hook Form
- ✅ All mutations use Server Actions
- ✅ Mobile responsive, production-ready
- ✅ Clear git history showing feature development

 
**Target:** Production-ready, maintainable, team-friendly CRM system  
**Architecture:** Feature-first with clear module boundaries  
**Workflow:** Independent feature branches → merge all to main at end
