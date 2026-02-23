# VersaDocs

VersaDocs is a Next.js App Router project for building resumes and biodata documents with live PDF preview and PDF export.

## Current Functionality

- Landing page at `/` with product messaging and navigation.
- Auth via Clerk (`/sign-in`, `/sign-up`) with protected routes enforced in middleware.
- Resume editor at `/editor`:
  - Live form editing (React Hook Form + Zod).
  - Dynamic sections: personal info, experience, skills, education, projects, biodata fields, character references.
  - Template switcher (`formal` and `biodata`).
  - Live PDF preview using `@react-pdf/renderer`.
  - PDF download with dynamic filename.
  - Local autosave to `localStorage` (`versadocs-resume-data`) with debounced writes.
- Dashboard at `/dashboard` for authenticated users (currently uses mock resume cards).
- Clerk webhook endpoint at `/api/webhooks/clerk` with Svix signature verification and event handling for `user.created` and `user.deleted` (currently logs/simulates persistence).

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript
- Clerk authentication
- React Hook Form + Zod validation
- Zustand state management
- React PDF renderer
- Tailwind CSS v4 + Radix UI primitives

## Project Structure

- `src/app`: Route entry points and API routes.
- `src/features/resume-editor`: Resume domain schema, state, PDF template registry, editor workspace.
- `src/features/auth`: Public-route matcher and webhook verification/handlers.
- `src/components`: Form sections, preview/download UI, layout UI components.
- `src/templates`: PDF templates (`formal-template.tsx`, `biodata-template.tsx`).
- `docs/architecture`: Project conventions and refactor guardrails.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` and set Clerk environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/editor
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/editor
CLERK_WEBHOOK_SECRET=... # required for validating /api/webhooks/clerk
```

3. Run the app:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Development Commands

- `npm run dev`: Start local dev server.
- `npm run build`: Production build.
- `npm run start`: Run production server.
- `npm run lint`: Run ESLint.

## Route Map

- Public:
  - `/`
  - `/sign-in`
  - `/sign-up`
  - `/api/webhooks/clerk`
- Protected (requires Clerk session):
  - `/editor`
  - `/dashboard`

## Current Gaps / In Progress

- Dashboard data is mock data; no persistent resume storage is wired yet.
- Webhook handlers verify and parse events but only log actions (no DB write).
- Landing page links to `/examples`, and navbar links to `/templates` and `/Pricing`; these routes are not present in `src/app` yet.

## Architecture Notes

- Resume schema and defaults are centralized in `src/features/resume-editor/schema/resume.ts`.
- Template rendering is centralized in `src/features/resume-editor/pdf/template-registry.tsx`.
- Local storage key and template IDs are treated as stability contracts (see `docs/architecture/refactor-plan.md`).
