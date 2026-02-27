# Git Branch Workflow

## Golden Rules

- **Never work directly on `main`**
- **One feature = One branch**
- **Always push your branch before merging to main**
- **Commit often with clear messages**

---

## Branch Map

| Branch | What it owns | Path in app |
|--------|-------------|-------------|
| `feat/foundation` | Shared UI, Supabase config, auth guards, utilities | `src/shared/` |
| `feat/auth` | Login page, sign in/out | `/login` |
| `feat/dashboard-shell` | Sidebar, header, main layout | `src/app/(dashboard)/layout.tsx` |
| `feat/dashboard` | Dashboard home, stats, recent activities | `/dashboard` |
| `feat/customers` | Customer list, add/edit, detail page | `/customers` |
| `feat/activities` | Activity logging, timeline, edit/delete | `/activities` |
| `feat/follow-ups` | Follow-ups dashboard (overdue, today, upcoming) | `/follow-ups` |
| `feat/reports` | Reports, analytics, charts, leaderboard | `/reports` |
| `feat/admin` | User management, roles, DB migrations | `/admin` |
| `feat/polish` | Loading states, error pages, mobile UI | `loading.tsx`, `error.tsx` |

---

## Daily Workflow

### 1. Start your work — switch to the right branch

```bash
git checkout feat/customers   # example: working on customers
```

### 2. Make your changes, then commit

```bash
git add .
git commit -m "Add export to CSV button on customer list"
```

### 3. Push to your branch

```bash
git push origin feat/customers
```

That's it. Repeat steps 2–3 as you work.

---

## How to Merge to Main (when feature is done)

Only do this when the feature is tested and ready.

```bash
git checkout main
git pull origin main
git merge feat/customers --no-ff -m "Merge feat/customers: add CSV export"
git push origin main
```

---

## Which Branch Do I Use?

**Not sure which branch?** Use this guide:

- Changing a **form or page component**? → use that feature's branch (e.g. editing customer form → `feat/customers`)
- Changing a **shared button, input, or card**? → `feat/foundation`
- Changing the **sidebar or header**? → `feat/dashboard-shell`
- Changing the **login page**? → `feat/auth`
- Adding **loading or error states**? → `feat/polish`
- Changing **database schema** (SQL files)? → `feat/admin`

---

## Commit Message Format

Keep it short and clear. Start with a verb.

```
Add search filter to customer list
Fix overdue count on dashboard
Update activity card layout
Remove unused imports in auth actions
```

---

## Quick Reference

```bash
# See which branch you're on
git branch

# Switch branch
git checkout feat/[branch-name]

# See what files you changed
git status

# Save your changes
git add .
git commit -m "Your message here"

# Push to GitHub
git push origin feat/[branch-name]

# Pull latest changes from GitHub
git pull origin feat/[branch-name]
```

---

## Project File Structure (Quick Guide)

```
src/
├── app/                   # Pages (routes)
│   ├── (auth)/login/      # Login page         → feat/auth
│   └── (dashboard)/       # All dashboard pages
│       ├── dashboard/     #                    → feat/dashboard
│       ├── customers/     #                    → feat/customers
│       ├── activities/    #                    → feat/activities
│       ├── follow-ups/    #                    → feat/follow-ups
│       ├── reports/       #                    → feat/reports
│       └── admin/         #                    → feat/admin
│
├── features/              # Feature logic (queries, actions, components)
│   ├── auth/              #                    → feat/auth
│   ├── dashboard/         #                    → feat/dashboard
│   ├── customers/         #                    → feat/customers
│   ├── activities/        #                    → feat/activities
│   ├── follow-ups/        #                    → feat/follow-ups
│   ├── reports/           #                    → feat/reports
│   └── admin/             #                    → feat/admin
│
└── shared/                # Shared code        → feat/foundation
    ├── components/ui/     # Buttons, inputs, cards, etc.
    ├── components/layout/ # Sidebar, header
    ├── lib/supabase/      # Database clients
    ├── lib/auth/          # Auth guards
    └── types/             # TypeScript types
```
