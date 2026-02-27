# CRM SAM — Improvement Roadmap

**Last Updated:** February 27, 2026  
**Status:** Post-build review — all Phase 0–10 features complete  
**Purpose:** Identifies gaps and actionable next steps across code quality, testing, features, UX, security, performance, and developer experience.

---

## Table of Contents

1. [Code Quality](#1-code-quality)
2. [Testing](#2-testing)
3. [Missing CRM Features](#3-missing-crm-features)
4. [UX Improvements](#4-ux-improvements)
5. [Security](#5-security)
6. [Performance](#6-performance)
7. [Developer Experience](#7-developer-experience)
8. [Priority Summary](#8-priority-summary)

---

## 1. Code Quality

### 1.1 Missing error handling on data-fetching pages

All dashboard pages call async Supabase queries with no `try/catch`. If the database is unreachable or returns an unexpected error, the Server Component will throw an unhandled exception. The shared `error.tsx` boundary only catches render-phase errors, not async fetch errors.

**Affected files:**
- `src/app/(dashboard)/admin/page.tsx`
- `src/app/(dashboard)/customers/page.tsx`
- `src/app/(dashboard)/dashboard/page.tsx`
- `src/app/(dashboard)/follow-ups/page.tsx`
- `src/app/(dashboard)/reports/page.tsx`

**Fix:** Wrap data fetching in `try/catch` and return a fallback UI, or have query functions return `{ data, error }` tuples instead of throwing.

---

### 1.2 Weak TypeScript — `any` in `searchParams`

`src/app/(dashboard)/customers/page.tsx` types its `searchParams` prop as `Promise<any>`. Next.js 15 has a proper type:

```ts
searchParams: Promise<{ [key: string]: string | string[] | undefined }>
```

Using `any` disables type checking on all filter values derived from the URL.

---

### 1.3 Missing null guards before property access

`src/app/(dashboard)/follow-ups/page.tsx` accesses `followUps.total` and `followUps.overdue` without first checking that `followUps` is not null or undefined. If the query returns nothing (empty database, RLS block, network error), this throws at runtime.

**Fix:** Add an early return or null check:
```ts
if (!followUps) return <EmptyState ... />;
```

---

### 1.4 Use `.safeParse()` instead of `.parse()` for user input

`src/app/(dashboard)/customers/page.tsx` uses `CustomerFiltersSchema.parse(params)` which throws a `ZodError` on invalid URL params. Since URL params are user-controlled, malformed input will crash the page.

**Fix:** Replace with `.safeParse()` and fall back to default filter values on failure:
```ts
const result = CustomerFiltersSchema.safeParse(params);
const filters = result.success ? result.data : defaultFilters;
```

---

### 1.5 Hardcoded emoji icons

Emoji icons (`👥`, `📋`, `📞`, `⚠️`, `⚙️`, `📢`) are scattered directly in page and component files. This makes restyling difficult and creates inconsistency across the app.

**Fix:** Replace with [Lucide React](https://lucide.dev/) (already common in the Next.js ecosystem) or at minimum extract to a shared `constants/icons.ts` file.

---

### 1.6 Missing `metadata` exports

None of the dashboard pages export a `metadata` object. Even for internal tools, browser tab titles and bookmarks benefit from descriptive page names.

**Fix:** Add to each page:
```ts
export const metadata = { title: 'Customers — CRM SAM' };
```

---

## 2. Testing

There are **zero test files** in the project. This is the largest single gap for long-term maintainability.

### 2.1 Unit tests — Vitest

Test Zod schemas, utility functions, and permission helpers. These are pure functions with no side effects and are the easiest to test.

**Recommended tool:** [Vitest](https://vitest.dev/) (integrates with Next.js and Vite toolchain)

**Priority targets:**
- `src/features/customers/schemas/` — validate schema rules
- `src/shared/lib/auth/permissions.ts` — verify `canEditCustomer()`, `canManageUsers()` logic
- `src/shared/lib/utils/` — any formatting or date utilities

---

### 2.2 Integration tests — Server Actions

Test that Server Actions correctly validate input, interact with the database, and call `revalidatePath`.

**Priority targets:**
- `createCustomer` / `updateCustomer` / `deleteCustomer`
- `createActivity` / `updateActivity`
- `signIn` / `signOut`

---

### 2.3 End-to-end tests — Playwright

Test critical user flows against a real (staging) or mocked Supabase instance.

**Recommended tool:** [Playwright](https://playwright.dev/)

**Priority flows:**
1. Login → Dashboard loads with stats
2. Create customer → appears in customer list
3. Log activity → appears in customer timeline
4. Follow-up overdue alert → shows on dashboard
5. Admin: change user role → role updates in list

---

## 3. Missing CRM Features

### 3.1 Customer pipeline / status

Customers currently have no status field. A CRM without pipeline stages is missing its core concept.

**Suggested statuses:** `Lead → Prospect → Active → At Risk → Churned`

This requires:
- A new `status` column on the `customers` table
- A filter on the customers list page
- A status badge on customer detail pages
- A pipeline board view (optional, Kanban-style)

---

### 3.2 Global search

Currently search only works on the customers page. Users cannot search across customers, activities, and follow-ups from a single input.

**Implementation:** A search bar in the shared `Header` component that queries across `customers.name`, `contacts.name`, and `activities.notes` using Supabase full-text search (`to_tsvector` / `websearch_to_tsquery`).

---

### 3.3 Email / push notifications for follow-ups

Follow-ups exist in the database but there is no mechanism to alert users when one is due. A sales rep only sees overdue items if they manually open the app.

**Implementation options:**
- Supabase Edge Function (cron) that runs daily, finds due follow-ups, and sends emails via [Resend](https://resend.com/) or SendGrid
- In-app notification badge in the sidebar (poll `getFollowUps()` count on layout)

---

### 3.4 CSV import / export

No way to bulk-import customers or export data for offline reporting.

**Import:** File upload form → parse CSV → batch insert via Server Action  
**Export:** Server Action that queries all filtered customers → returns CSV string → triggers browser download

---

### 3.5 Audit log

No history of who changed what on a record. This is critical for enterprise accountability.

**Implementation:** An `audit_logs` table with `(table_name, record_id, changed_by, changed_at, old_values, new_values)`. Populate it inside Server Actions before/after mutations.

---

### 3.6 Notes and attachments on customers

There is no free-text notes field or file attachment capability per customer. Sales reps typically need to record meeting summaries, proposals, or contracts.

**Notes:** A `notes` text column on `customers`, editable inline on the detail page.  
**Attachments:** Supabase Storage bucket with file upload on the customer detail page.

---

### 3.7 Activity filtering on the activities list page

The activities list page (`/dashboard/activities`) likely has no filters. As activity volume grows, users will need to filter by type, date range, user, or customer.

---

### 3.8 Dashboard date range selector

Dashboard stats (`getDashboardStats()`) appear to be all-time aggregates. A date range filter (Last 7 / 30 / 90 days / custom) makes the dashboard actionable rather than a vanity metric display.

---

## 4. UX Improvements

### 4.1 Per-page Suspense boundaries

The project uses a single shared `loading.tsx` at the route group level. When navigating between pages, the entire layout shell flickers. Adding `<Suspense>` boundaries around individual data-fetching components on each page would provide targeted skeleton loaders without removing the navigation chrome.

---

### 4.2 Optimistic UI for mutations

Adding an activity or editing a customer currently requires a full server round-trip before any visual feedback. React 19's `useOptimistic` hook allows the UI to update immediately while the Server Action runs in the background, then reconcile with the server result.

---

### 4.3 Confirm dialogs for destructive actions

Deleting a customer, activity, or user should show a confirmation dialog before proceeding. Currently it is unclear if this is consistently implemented across all delete flows.

---

### 4.4 Keyboard navigation and accessibility

No evidence of ARIA labels, focus management, or keyboard shortcut support. At minimum, all interactive elements should have proper ARIA roles and the modal dialogs should trap focus.

---

## 5. Security

### 5.1 Verify RLS policies are active

`BUILD_STATUS.md` notes that RLS migrations need to be applied manually. It is critical to confirm that Row Level Security is enforced in the live Supabase project, otherwise any authenticated user can read or write any row.

**Check:** In Supabase dashboard → Authentication → Policies — all tables should have policies listed.

---

### 5.2 Rate limiting on authentication

The login Server Action (`signIn`) has no rate limiting. An attacker can attempt unlimited password guesses. Supabase Auth has built-in rate limiting on the `/auth/v1/token` endpoint, but any custom auth logic should also be protected.

**Fix:** Enable Supabase Auth rate limiting in project settings, or add an IP-based rate limiter middleware using `next-rate-limit` or Upstash Redis.

---

### 5.3 Environment variable validation at startup

If `.env.local` is missing `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`, the app will fail with cryptic runtime errors instead of a clear message at startup.

**Fix:** Add a startup validation file, e.g. `src/shared/lib/env.ts`:
```ts
import { z } from 'zod';

const EnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

export const env = EnvSchema.parse(process.env);
```

---

### 5.4 Supabase anon key scope

Confirm the Supabase anon key exposed to the browser cannot bypass RLS. The anon key should only be able to perform operations that RLS policies explicitly allow for unauthenticated users (in practice, none for this CRM).

---

## 6. Performance

### 6.1 ISR revalidation is a blunt instrument

All pages use `export const revalidate = 30`, meaning cached pages can be up to 30 seconds stale. When a user creates a customer and immediately navigates to the list, they may not see their own record if the page was cached.

The project already uses `revalidatePath()` in Server Actions, which correctly invalidates the cache on mutation. The ISR fallback is therefore a safety net, not a primary strategy. Consider reducing `revalidate` to `0` (no ISR) and relying entirely on on-demand revalidation via Server Actions — this ensures consistency.

---

### 6.2 Reports page: 4 parallel queries vs. 1 RPC call

`reports/page.tsx` fires 4 parallel Supabase queries. As data grows, consolidating these into a single Postgres RPC function (`supabase.rpc('get_reports_data')`) reduces round-trips and allows the database to optimize the full query plan.

---

### 6.3 No image optimization

If customer logos or user avatars are added, use `next/image` for automatic format conversion (WebP/AVIF), lazy loading, and CDN caching. Plain `<img>` tags will not benefit from Next.js image optimization.

---

### 6.4 No pagination on follow-ups

The follow-ups page fetches all follow-up records at once. For large datasets this will become slow. Add pagination consistent with the customers page (50 per page).

---

## 7. Developer Experience

### 7.1 No CI/CD pipeline

There is no GitHub Actions workflow. With multiple contributors working on this project, there is no automated gate preventing broken code from reaching `main`.

**Recommended `.github/workflows/ci.yml` steps:**
1. `npm run build` — catches TypeScript and Next.js build errors
2. `npm run lint` — ESLint checks
3. `npx tsc --noEmit` — strict type checking without building
4. Run tests (once tests exist)

---

### 7.2 No Prettier configuration

The project has ESLint but no Prettier. Code formatting will drift over time across contributors. Add a `.prettierrc` and integrate it with ESLint via `eslint-config-prettier`.

---

### 7.3 No component development environment

The shared UI components (`Button`, `Card`, `Input`, `Dialog`, etc. in `src/shared/components/ui/`) have no isolated development or documentation environment. Consider [Storybook](https://storybook.js.org/) or the lighter-weight [Ladle](https://ladle.dev/) to develop and document components in isolation.

---

### 7.4 Magic numbers and string literals

Pages reference hardcoded values like `getRecentActivities(5)` and `revalidate = 30` without named constants. Extract these to a shared `constants.ts` file to make changes easier to track and reason about.

---

## 8. Priority Summary

| Priority | Area | Action |
|---|---|---|
| **Critical** | Security | Verify RLS policies are active in Supabase |
| **High** | Code Quality | Add try/catch to all data-fetching pages |
| **High** | Code Quality | Fix `any` types and add null guards |
| **High** | Testing | Add Vitest unit tests for schemas and permissions |
| **High** | Testing | Add Playwright E2E for login and core CRUD flows |
| **High** | CRM Features | Add customer pipeline status field |
| **Medium** | CI/CD | GitHub Actions: build + lint + typecheck on every push |
| **Medium** | CRM Features | Global search across customers and activities |
| **Medium** | CRM Features | Follow-up email notifications via Supabase Edge Function |
| **Medium** | UX | Per-page Suspense boundaries for targeted loading states |
| **Medium** | Security | Rate limiting on authentication actions |
| **Medium** | Security | Environment variable validation at startup |
| **Low** | CRM Features | CSV import/export |
| **Low** | CRM Features | Audit log for record changes |
| **Low** | CRM Features | Notes and file attachments on customer detail |
| **Low** | Performance | Consolidate reports queries into a single RPC call |
| **Low** | DX | Prettier config + ESLint integration |
| **Low** | DX | Named constants for magic numbers and strings |

---

*This document reflects the state of the codebase as of the Phase 10 (polish) completion on February 27, 2026. Re-evaluate after each improvement sprint.*
