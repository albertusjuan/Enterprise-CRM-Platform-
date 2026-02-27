# CRM SAM v2.0

Enterprise-grade Customer Relationship Management system for B2B businesses.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript + React 19
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod validation
- **Architecture:** Feature-first modular structure

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Features

- Role-based access control (Admin, Marketing)
- Customer management with CRUD operations
- Activity logging with 9 activity types
- Follow-ups tracking dashboard
- Reports and analytics
- Admin panel for user management
- Mobile responsive design

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── features/         # Feature-first modules (auth, customers, activities, etc.)
└── shared/          # Shared components, utilities, types
```

## License

© 2026 CRM SAM
