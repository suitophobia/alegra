# Alegra - Family Volunteering Travel Platform

## Overview

Alegra is a full-stack web application for a family volunteering travel company. It showcases travel packages (called "Journeys") that combine volunteering with family travel experiences, features a blog ("Impact Stories"), and allows visitors to submit inquiries to plan their trips. The app is a content-driven marketing site with a contact/inquiry form.

The stack is a monorepo with a React frontend (Vite) and an Express backend, using PostgreSQL via Drizzle ORM for data persistence. The database is seeded with initial package and blog post data on server startup.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (`client/`)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query for server state management
- **Styling**: Tailwind CSS with CSS custom properties for theming (light/dark mode support)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives, stored in `client/src/components/ui/`
- **Animations**: Framer Motion for page transitions and scroll animations
- **Forms**: React Hook Form with Zod validation via `@hookform/resolvers`
- **Build Tool**: Vite with HMR in development

**Key Pages**:
- `/` — Home page with featured packages and posts
- `/journeys` — List of all travel packages
- `/journeys/:slug` — Individual package detail
- `/stories` — Blog listing
- `/stories/:slug` — Individual blog post
- `/mission` — About/mission page
- `/plan` — Contact/inquiry form

**Path Aliases**:
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

### Backend (`server/`)
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript, run with `tsx` in development
- **API Pattern**: RESTful JSON API under `/api/` prefix
- **Build**: esbuild bundles server code to `dist/index.cjs` for production

**API Endpoints**:
- `GET /api/packages` — List all travel packages
- `GET /api/packages/:slug` — Get single package by slug
- `GET /api/posts` — List all blog posts
- `GET /api/posts/:slug` — Get single post by slug
- `POST /api/inquiries` — Submit a contact inquiry (validated with Zod)

**Dev vs Prod**:
- Development: Vite dev server is attached as middleware to Express (`server/vite.ts`)
- Production: Static files served from `dist/public/` with SPA fallback (`server/static.ts`)

### Shared Code (`shared/`)
- **Schema** (`shared/schema.ts`): Drizzle ORM table definitions and Zod insert schemas
- **Routes** (`shared/routes.ts`): API route definitions with types, shared between client and server

### Database
- **Engine**: PostgreSQL (required, connection via `DATABASE_URL` env var)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation bridging
- **Migration**: `drizzle-kit push` (schema push approach, not migration files)
- **Tables**:
  - `alegra_packages` — Travel packages (title, slug, description, location, duration, price range, volunteer focus, content, featured flag)
  - `alegra_posts` — Blog posts (title, slug, summary, content, cover image, author, published date, tags array)
  - `alegra_inquiries` — Contact form submissions (name, email, message, package name, number of adults/children)
  - `users` — Legacy users table (preserved but not actively used in current features)
- **Seeding**: The `DatabaseStorage.seed()` method auto-populates packages and posts if the tables are empty on server startup

### Storage Layer
- `server/storage.ts` defines an `IStorage` interface and `DatabaseStorage` implementation
- This abstraction allows swapping storage backends if needed

### Key Design Decisions

1. **Monorepo with shared types**: The `shared/` directory ensures type safety between frontend and backend without code duplication. Schema definitions and API route types are shared.

2. **Table name prefixing**: Tables use `alegra_` prefix to avoid conflicts with any pre-existing schemas in the database.

3. **Slug-based routing**: Both packages and posts use URL slugs for SEO-friendly URLs, matched on both client routes and API endpoints.

4. **Auto-seeding**: Database is seeded on every server start if tables are empty, making setup frictionless.

5. **SPA with server-side API**: Classic SPA architecture where the React app handles all rendering and fetches data from the Express API.

## External Dependencies

- **PostgreSQL**: Required database. Must have `DATABASE_URL` environment variable set.
- **Unsplash Images**: Package and post images reference Unsplash URLs (no local image hosting).
- **Google Fonts**: DM Sans, Architects Daughter, Fira Code, Geist Mono loaded via Google Fonts CDN.
- **No authentication required**: The current app is public-facing with no login/auth flow (the users table exists but isn't used).
- **No external API integrations**: No payment processing, email sending, or third-party APIs are currently active (though Stripe, Nodemailer, and OpenAI are listed in build allowlist for future use).